const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const crypto = require("node:crypto");
const ctx = { window: {}, setTimeout, DOMException };
vm.createContext(ctx);
for (const file of [
  "fieldwork-data.js",
  "analysis-contract.js",
  "fieldwork-analysis.js",
  "intelligence-model.js",
]) {
  vm.runInContext(fs.readFileSync(`dist/${file}`, "utf8"), ctx);
}
const {
  FIELDWORK_DATA: data,
  FIELDWORK_ANALYSIS: fixture,
  FIRM_ANALYSIS_CONTRACT: contract,
  FIRM_INTELLIGENCE: model,
} = ctx.window;
const changed = JSON.parse(
  fs.readFileSync("tests/fixtures/changed-analysis.json", "utf8"),
);
const copy = (value) => JSON.parse(JSON.stringify(value));
test("both fixtures satisfy the complete contract and six local checks", async () => {
  for (const result of [fixture, changed]) {
    assert.equal(contract.validate(result, data), result);
    const events = [];
    const output = await model.analyze(
      result,
      data,
      (event) => events.push(event),
      new AbortController().signal,
    );
    assert.equal(output, result);
    assert.equal(events.filter((e) => e.state === "complete").length, 6);
    assert.ok(events.at(-1).message.includes(result.recommendation.decision));
  }
});
test("all original source bytes retain their integrity hashes", () => {
  for (const source of data.sources) {
    assert.equal(
      crypto
        .createHash("sha256")
        .update(fs.readFileSync(`dist/${source.url}`))
        .digest("hex"),
      source.sha256,
    );
  }
});
test("invalid schema, references, numeric values, and unsupported versions are rejected", () => {
  const cases = [
    (x) => {
      x.schemaVersion = 2;
    },
    (x) => {
      x.firmSnapshotId = "missing";
    },
    (x) => {
      delete x.financials;
    },
    (x) => {
      x.surprise = true;
    },
    (x) => {
      x.recommendation.value = 101;
    },
    (x) => {
      x.recommendation.value = "87";
    },
    (x) => {
      x.recommendation.components = [["bad", 120]];
    },
    (x) => {
      x.scores[0].id = 'unsafe"';
    },
    (x) => {
      x.sources[0].documentId = "missing.pdf";
    },
    (x) => {
      x.sources.push(x.sources[0]);
    },
    (x) => {
      x.overview.sources[0].page = 100;
    },
    (x) => {
      x.overview.sources[0].sourceId = "missing";
    },
    (x) => {
      x.overview.requirementIds = ["missing"];
    },
    (x) => {
      x.experience.candidates[0].projectId = "missing";
    },
    (x) => {
      x.team.members[0].personId = "missing";
    },
    (x) => {
      x.risks[0].score = "missing";
    },
    (x) => {
      x.team.comparison.periodIndices = [999, 2];
    },
    (x) => {
      x.team.comparison.personIds = ["FW-E047"];
    },
    (x) => {
      x.experience.leadProjectIds = ["FW-P164"];
    },
  ];
  for (const mutate of cases) {
    const result = copy(fixture);
    mutate(result);
    assert.throws(
      () => contract.validate(result, data),
      /Invalid analysis result/,
    );
  }
});
test("unknown scores and fees remain null; zero is a legitimate match", () => {
  assert.equal(changed.financials.feeRange, null);
  assert.equal(
    changed.scores.find((s) => s.id === "test-financial").value,
    null,
  );
  assert.equal(changed.experience.candidates[0].match, 0);
  assert.equal(changed.experience.candidates[1].match, null);
});
test("local analysis respects cancellation", async () => {
  const controller = new AbortController();
  await assert.rejects(
    model.analyze(fixture, data, () => controller.abort(), controller.signal),
    { name: "AbortError" },
  );
});
test("changing the result does not change the supplied Firm Data", async () => {
  const before = JSON.stringify(data);
  await model.analyze(changed, data, () => {}, new AbortController().signal);
  assert.equal(JSON.stringify(data), before);
  assert.equal(data.projects.length, 164);
  assert.equal(
    model.evaluatePeople(data).find((p) => p.id === "FW-E004").available[0],
    9,
  );
});
