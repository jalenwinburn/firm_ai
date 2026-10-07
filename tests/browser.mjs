import fs from "node:fs";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { startServer } from "./server.mjs";

const changed = JSON.parse(
  fs.readFileSync("tests/fixtures/changed-analysis.json", "utf8"),
);
const { server, base } = await startServer();
const browser = await chromium.launch({
  executablePath: process.env.BROWSER_PATH || undefined,
  args: process.env.BROWSER_ARGS ? JSON.parse(process.env.BROWSER_ARGS) : [],
  headless: true,
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  acceptDownloads: true,
});
page.setDefaultTimeout(6000);
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("response", (response) => {
  if (response.status() >= 400)
    errors.push(`${response.status()} ${response.url()}`);
});
const frame = () =>
  page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
async function nav(hash) {
  await page.evaluate((hash) => {
    location.hash = hash;
  }, hash);
  await frame();
}
async function switchResult(result) {
  await page.evaluate(
    (result) => window.FIRM_APP.setAnalysisResult(result),
    result,
  );
  await frame();
}
const text = (selector) => page.locator(selector).textContent();
const stale =
  /Colorado River|City of Austin|Waterloo Commons|Eastline Greenway|Trinity Civic Plaza|Elena Marquez|Noah Williams|Priya Shah|\$72M|\$1\.4|October 16|January 2027|PURSUE 87/;
const routes = [
  "opportunity/overview",
  "opportunity/requirements",
  "opportunity/experience",
  "opportunity/team",
  "opportunity/financials",
  "opportunity/strategy",
  "opportunity/source",
  "workspace/overview",
  "workspace/opportunities",
  "workspace/projects",
  "workspace/team",
  "workspace/financials",
  "analysis/run",
];
fs.mkdirSync("test-results", { recursive: true });
let layoutChecks = 0;
try {
  await page.goto(base + "/app.html");
  await page.waitForFunction(() => window.FIRM_APP?.getAnalysisResult());
  const primary = await page.evaluate(() =>
    window.FIRM_APP.getAnalysisResult(),
  );
  const originalFirmData = await page.evaluate(() =>
    JSON.stringify(window.FIELDWORK_DATA),
  );

  for (const fixture of [primary, changed]) {
    await switchResult(fixture);
    const o = fixture.opportunity;
    assert.equal(
      (await page.locator(".fi-opportunity-header h1").innerText()).replace(
        /\s+/g,
        " ",
      ),
      o.titleLines.join(" "),
    );
    assert.ok((await text(".fi-subtitle")).includes(o.client));
    assert.equal(
      await page.locator(".fi-header-actions a.fi-button").getAttribute("href"),
      `#opportunity/source/${o.primarySourceId}/1`,
    );
    assert.ok((await text(".opportunity-facts")).includes(o.dueShort));
    assert.equal(
      await text(".decision-value h2"),
      fixture.recommendation.decision,
    );
    assert.ok(
      (await text(".pursuit-number")).startsWith(
        String(fixture.recommendation.value),
      ),
    );
    assert.equal(
      await page.locator(".component-score").count(),
      fixture.scores.length,
    );
    assert.equal(
      await page.locator(".requirement-row").count(),
      fixture.requirements.length,
    );
    assert.equal(
      await page.locator("#panel-experience .experience-row").count(),
      fixture.experience.candidates.length,
    );
    assert.equal(
      await page.locator("#panel-team .team-person").count(),
      fixture.team.members.length,
    );
    assert.equal(
      await page.locator("#panel-financials tbody tr").count(),
      fixture.financials.comparableProjectIds.length,
    );
    assert.ok(
      (await text("#panel-strategy")).includes(
        fixture.strategy.overviewTitle,
      ) ||
        (await text("#panel-overview")).includes(
          fixture.strategy.overviewTitle,
        ),
    );
    for (const width of [320, 360, 375, 390, 600, 768, 800, 850, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const route of routes) {
        await nav(route);
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          `${fixture.id}: overflow at ${route}/${width}`,
        );
        if (route === "opportunity/overview") {
          const clipped = await page.evaluate(() => {
            const surface = document
              .querySelector(".decision-surface")
              .getBoundingClientRect();
            return [
              ...document.querySelectorAll(
                ".decision-main,.decision-value,.pursuit-number,.decision-value h2,.confidence-label,.decision-statement,.decision-footnote,.decision-drivers",
              ),
            ]
              .filter((el) => {
                const r = el.getBoundingClientRect();
                return (
                  r.right > surface.right + 1 ||
                  r.left < surface.left - 1 ||
                  el.scrollWidth > el.clientWidth + 2
                );
              })
              .map((el) => el.className || el.tagName);
          });
          assert.deepEqual(
            clipped,
            [],
            `${fixture.id}: clipped recommendation at ${width}`,
          );
          if ([320, 1440].includes(width))
            await page.screenshot({
              path: `test-results/${fixture.id}-${width}.png`,
              fullPage: true,
            });
        }
        if (
          fixture.kind === "test-fixture" &&
          ![
            "workspace/projects",
            "workspace/team",
            "opportunity/source",
          ].includes(route)
        ) {
          // Firm records and originals legitimately retain Fieldwork facts; opportunity conclusions must not.
          const selector = route.startsWith("workspace")
            ? "#workspace-view"
            : route === "analysis/run"
              ? "#run-view"
              : "#opportunity-view";
          const content =
            selector === "#opportunity-view"
              ? await page.locator(selector).evaluate((el) => {
                  const copy = el.cloneNode(true);
                  copy.querySelector("#panel-source")?.remove();
                  return copy.textContent;
                })
              : await text(selector);
          assert.doesNotMatch(content, stale, `stale result at ${route}`);
        }
        layoutChecks++;
      }
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await nav("opportunity/overview");
    for (const score of [fixture.recommendation, ...fixture.scores]) {
      await page.locator(`[data-score="${score.id}"]`).first().click();
      assert.equal(await text("#drawer-title"), score.label);
      assert.ok((await text("#drawer-content")).includes(score.reason));
      assert.equal(
        await page.locator("#drawer-content .drawer-source").count(),
        score.sources.length,
      );
      if (fixture.kind === "test-fixture")
        assert.doesNotMatch(await text("#drawer-content"), stale);
      await page.keyboard.press("Escape");
    }
    await nav("opportunity/experience");
    for (const entry of fixture.experience.candidates) {
      await page
        .locator(`#panel-experience [data-project="${entry.projectId}"]`)
        .first()
        .click();
      assert.ok((await text("#drawer-content")).includes(entry.reason));
      assert.equal(
        await page.locator("#drawer-content .drawer-score").count(),
        entry.match == null ? 0 : 1,
      );
      await page.keyboard.press("Escape");
    }
    await nav("opportunity/team");
    for (const entry of fixture.team.members) {
      await page
        .locator(`#panel-team [data-person="${entry.personId}"]`)
        .first()
        .click();
      assert.ok((await text("#drawer-content")).includes(entry.reason));
      assert.equal(
        await page.locator("#drawer-content .drawer-score").count(),
        entry.match == null ? 0 : 1,
      );
      await page.keyboard.press("Escape");
    }
    for (const sourceRef of fixture.sources) {
      await nav(`opportunity/source/${sourceRef.id}/1`);
      assert.equal(await text(".source-toolbar strong"), sourceRef.documentId);
      assert.equal(
        await page.locator(".source-file").count(),
        fixture.sources.length,
      );
      const download = page.waitForEvent("download");
      await page.locator(".source-toolbar a[download]").click();
      assert.equal((await download).suggestedFilename(), sourceRef.documentId);
      if (await page.locator("#source-page").count()) {
        const count = await page.locator("#source-page option").count();
        await page.selectOption("#source-page", String(count));
        await frame();
        assert.match(
          await page.locator("iframe").getAttribute("src"),
          new RegExp(`#page=${count}$`),
        );
      } else assert.ok(await page.locator(".source-locators li").count());
    }
    await nav("analysis/run");
    await page.click("#start-analysis");
    await page.locator("#view-result").waitFor({ state: "visible" });
    assert.ok(
      (await text("#run-recommendation")).includes(
        fixture.recommendation.decision,
      ),
    );
    assert.ok((await text("#run-log")).includes(o.dueLabel));
    await nav("opportunity/overview");
    await nav("analysis/run");
    assert.equal(await text("#run-counter"), "6 / 6 complete");
    await page.click("#start-analysis");
    await page.locator("#view-result").waitFor({ state: "visible" });
    await nav("opportunity/overview");
    const download = page.waitForEvent("download");
    await page.click("#opportunity-actions");
    await page.click("#download-summary");
    const summary = fs.readFileSync(await (await download).path(), "utf8");
    assert.equal(summary, await page.evaluate(() => FIRM_APP.summaryText()));
    assert.ok(summary.includes(o.name));
    assert.ok(summary.includes(fixture.recommendation.reason));
    if (fixture.kind === "test-fixture") assert.doesNotMatch(summary, stale);
    await nav(`opportunity/source/${o.primarySourceId}/1`);
    await page.emulateMedia({ media: "print" });
    assert.equal(await page.locator("#panel-source").isVisible(), false);
    for (const section of [
      "overview",
      "requirements",
      "experience",
      "team",
      "financials",
      "strategy",
    ])
      assert.equal(await page.locator("#panel-" + section).isVisible(), true);
    const printed = await page.locator("#opportunity-view").innerText();
    assert.ok(printed.replace(/\s+/g, " ").includes(o.name));
    if (fixture.kind === "test-fixture") assert.doesNotMatch(printed, stale);
    await page.emulateMedia({ media: "screen" });
  }

  // The manual preview URL must also initialize directly with the changed fixture.
  await page.goto(base + "/app.html?fixture=changed");
  await page.waitForFunction(() => window.FIRM_APP?.getAnalysisResult());
  assert.equal(
    await page.evaluate(() => FIRM_APP.getAnalysisResult().id),
    changed.id,
  );

  // Hot-switch from a populated drawer/source/completed run, without reloading.
  await switchResult(primary);
  await nav("opportunity/source/rfq/4");
  await page.locator('[data-score="pursuit"]').click();
  await switchResult(changed);
  assert.equal(await page.locator("dialog[open]").count(), 0);
  assert.equal(await text("#drawer-content"), "");
  assert.equal(await text("#run-view"), "");
  assert.equal(
    await text(".source-toolbar strong"),
    "Fieldwork_2027_Strategic_Plan.pdf",
  );
  assert.doesNotMatch(await text("#opportunity-view"), /Colorado River|\$72M/);
  // Reject invalid input atomically, and do not allow caller mutation after selection.
  assert.match(
    await page.evaluate(() => {
      try {
        FIRM_APP.setAnalysisResult({ schemaVersion: 2 });
      } catch (e) {
        return e.message;
      }
    }),
    /Invalid analysis result/,
  );
  assert.equal(
    await page.evaluate(() => FIRM_APP.getAnalysisResult().id),
    changed.id,
  );
  await page.evaluate((result) => {
    FIRM_APP.setAnalysisResult(result);
    result.opportunity.name = "MUTATED";
  }, changed);
  assert.equal(
    await page.evaluate(() => FIRM_APP.getAnalysisResult().opportunity.name),
    changed.opportunity.name,
  );
  // Escaping applies to newly supplied prose, metadata, source labels, and score labels.
  const hostile = structuredClone(changed);
  hostile.opportunity.name = '<img src=x onerror="window.injected=1">';
  hostile.recommendation.reason = "<script>window.injected=1</script>";
  hostile.scores[0].label = '" onfocus="window.injected=1';
  await switchResult(hostile);
  await nav("opportunity/overview");
  await page.click('[data-score="pursuit"]');
  assert.equal(await page.evaluate(() => window.injected), undefined);
  assert.ok((await text("#drawer-content")).includes("<script>"));
  await page.keyboard.press("Escape");
  // Cancellation plus hot switching during a run must not allow a stale completion.
  await switchResult(primary);
  await nav("analysis/run");
  await page.evaluate(() => {
    document.querySelector("#start-analysis").click();
    document.querySelector("#cancel-analysis").click();
  });
  await page.waitForFunction(() =>
    document.querySelector("#run-log").textContent.includes("cancelled"),
  );
  await page.evaluate((result) => {
    document.querySelector("#start-analysis").click();
    FIRM_APP.setAnalysisResult(result);
  }, changed);
  await frame();
  assert.equal(await text("#run-counter"), "0 / 6 complete");
  assert.equal(await page.locator("#view-result").isVisible(), false);
  await page.click("#start-analysis");
  await page.locator("#view-result").waitFor({ state: "visible" });
  assert.doesNotMatch(await text("#run-log"), stale);
  // Same-fragment source link closes the drawer and preserves keyboard focus.
  await switchResult(primary);
  await nav("opportunity/source/rfq/2");
  await page.click('[data-score="fit"]');
  await page
    .locator('#reasoning-drawer a[href="#opportunity/source/rfq/2"]')
    .click();
  assert.equal(await page.locator("#reasoning-drawer").isVisible(), false);
  assert.equal(
    await page.evaluate(() => document.activeElement.id),
    "panel-source",
  );
  // Nested firm evidence remains available independently of the selected shortlist.
  await nav("opportunity/overview");
  await page.click('[data-score="pursuit"]');
  await page.locator('#reasoning-drawer [data-project="FW-P001"]').click();
  await page.locator('#reasoning-drawer [data-person="FW-E004"]').click();
  assert.match(await text("#drawer-title"), /Noah/);
  await page.keyboard.press("Escape");
  await switchResult(changed);
  await nav("workspace/projects");
  assert.equal(await page.locator("#workspace-view tbody tr").count(), 164);
  await page.locator('#workspace-view [data-project="FW-P001"]').click();
  assert.equal(await page.locator("#drawer-content .drawer-score").count(), 0);
  await page.keyboard.press("Escape");
  await nav("workspace/team");
  assert.equal(await page.locator("#workspace-view tbody tr").count(), 47);
  assert.equal(
    await page.evaluate(() => JSON.stringify(FIELDWORK_DATA)),
    originalFirmData,
  );
  await nav("opportunity/overview");
  await page.focus("#tab-overview");
  await page.keyboard.press("ArrowRight");
  await frame();
  assert.equal(
    await page.locator("#tab-requirements").getAttribute("aria-selected"),
    "true",
  );
  await page.keyboard.press("End");
  await frame();
  assert.equal(
    await page.locator("#tab-source").getAttribute("aria-selected"),
    "true",
  );
  await page.goBack();
  await frame();
  assert.equal(
    await page.locator("#tab-requirements").getAttribute("aria-selected"),
    "true",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.click(".fi-mobile-menu");
  assert.equal(
    await page.locator(".fi-mobile-menu").getAttribute("aria-expanded"),
    "true",
  );
  await page.keyboard.press("Escape");
  assert.equal(
    await page.locator(".fi-mobile-menu").getAttribute("aria-expanded"),
    "false",
  );
  for (const file of ["index.html", "atlas.html"]) {
    await page.goto(`${base}/${file}`);
    assert.ok(await page.locator("h1").count());
  }
  for (const route of [
    "workspace/overview",
    "workspace/opportunities",
    "workspace/projects",
    "workspace/team",
    "workspace/financials",
    "analysis/overview",
    "analysis/requirements",
    "analysis/projects",
    "analysis/team",
    "analysis/financials",
  ]) {
    await nav(route);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    );
  }
  assert.deepEqual(errors, []);
  console.log(
    JSON.stringify(
      {
        layoutChecks,
        fixtures: 2,
        errors,
        checks:
          "contract-driven panels, drawers, sources/downloads, export, print, cancellation, hot-switch, safety, Firm Data, keyboard/history, mobile, landing and Atlas passed",
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
