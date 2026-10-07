/* Presentation consumes one validated result; firm evidence stays in FIELDWORK_DATA. */
(() => {
  "use strict";
  const D = window.FIELDWORK_DATA,
    M = window.FIRM_INTELLIGENCE;
  const $ = (s) => document.querySelector(s),
    $$ = (s) => [...document.querySelectorAll(s)];
  const h = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const money = (value) =>
    value == null
      ? "Not recorded"
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
          maximumFractionDigits: 2,
        }).format(value);
  const percent = (value) => (value == null ? "Not recorded" : `${value}%`);
  const scoreValue = (value) => (value == null ? "—" : value);
  const lines = (values) => values.map(h).join("<br>");
  const emptyValue = (value) => (value == null ? "Not recorded" : h(value));
  const people = M.evaluatePeople(D);
  const sections = [
    "overview",
    "requirements",
    "experience",
    "team",
    "financials",
    "strategy",
    "source",
  ];
  let R,
    sourceKey,
    sourcePage = 1,
    runController = null,
    runResult = null,
    runBusy = false,
    currentRoute = "",
    generation = 0;
  const project = (id) => D.projects.find((p) => p.id === id);
  const person = (id) => people.find((p) => p.id === id);
  const candidate = (id) =>
    R.experience.candidates.find((p) => p.projectId === id);
  const member = (id) => R.team.members.find((p) => p.personId === id);
  const source = (key) =>
    D.sources.find(
      (s) => s.file === R.sources.find((s) => s.id === key)?.documentId,
    );
  const sourceAnchor = (key, page = 1, label) =>
    `<a class="source-ref" href="#opportunity/source/${h(key)}/${page}">${h(label || source(key)?.file)} <span>↗</span></a>`;
  const citations = (refs) =>
    refs
      .map((ref) => sourceAnchor(ref.sourceId, ref.page, ref.label))
      .join(" ");
  const sourcePdfLink = (key, page) => `${source(key).url}#page=${page}`;
  const sectionHead = (n, title, link = "", label = "") =>
    `<div class="section-heading"><div><span class="fi-eyebrow">${h(n)}</span><h2>${h(title)}</h2></div>${link ? `<a class="section-link" href="${h(link)}">${h(label)} →</a>` : ""}</div>`;
  const callout = (data) =>
    `<div class="callout"><strong>${h(data.title)}</strong><p>${h(data.detail)}</p>${citations(data.sources)}</div>`;
  function projectRows(list, compact = false) {
    return `<div class="experience-list">${list
      .map((entry, i) => {
        const p = project(entry.projectId);
        return `<div class="experience-row"><div class="project-sequence">${String(i + 1).padStart(2, "0")}</div><div class="experience-description"><button class="plain-title" data-project="${p.id}">${h(p.name)}</button><p>${h(p.city)}, ${h(p.state)} <span>·</span> ${h(p.market || "Market not recorded")} <span>·</span> ${h(p.end?.slice(0, 4) || "Not recorded")}</p>${compact ? "" : `<p class="project-scope">${h(entry.reason)}</p><div class="signal-tags">${entry.signals.map((s) => `<span>${h(s)}</span>`).join("")}</div>`}</div><div class="experience-value"><strong>${money(p.value)}</strong><small>construction</small></div><div class="experience-match">${entry.match != null ? `<button class="inline-score" data-project="${p.id}" aria-label="${h(p.name)} ${entry.match} percent ${h(R.disclosure.match)}. Inspect evidence">${entry.match}<span>% ↗</span></button><small>${h(R.disclosure.match)}</small>` : `<button class="evidence-link" data-project="${p.id}">Evidence ↗</button>`}</div></div>`;
      })
      .join("")}</div>`;
  }
  function teamRow(entry, compact = false) {
    const p = person(entry.personId);
    return `<div class="team-person"><div class="person-initials">${h(
      p.name
        .split(" ")
        .map((x) => x[0])
        .join(""),
    )}</div><div class="person-description"><button class="plain-title" data-person="${p.id}">${h(p.name)}${p.credential?.startsWith("PLA") ? ", PLA" : ""}</button><p>${h(entry.role)} <span>·</span> ${p.years} years</p>${compact ? "" : `<p>${h(p.skills.replaceAll(";", " ·"))}</p>`}<small class="capacity-label ${entry.constrained ? "constrained" : ""}">${percent(p.available[0])} current capacity${entry.constrained ? " · Confirmation needed" : ""}</small></div><button class="inline-score" data-person="${p.id}" aria-label="${h(p.name)} ${entry.match == null ? "Not assessed" : entry.match + " percent " + h(R.disclosure.match)}">${scoreValue(entry.match)}<span>${entry.match == null ? "" : "%"} ↗</span></button></div>`;
  }
  function datesMarkup(full = false) {
    return `<ol class="deadline-list">${R.deadlines
      .filter((d) => full || d.featured)
      .map((d) => {
        const [year, month, day] = d.date.split("-");
        const label =
          [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ][Number(month) - 1] || "";
        return `<li class="${d.primary ? "primary-deadline" : ""}"><time datetime="${h(d.date)}"><span>${label}</span><b>${h(day || year)}</b></time><div><strong>${h(d.label)}</strong><small>${h(d.detail)}</small></div></li>`;
      })
      .join("")}</ol>`;
  }
  function selectionMarkup() {
    const max = Math.max(1, ...R.selection.map((c) => c.weight));
    return `<div class="criteria-list">${R.selection.map((c) => `<div class="criterion"><strong>${c.weight}<small>%</small></strong><div><h3>${h(c.title)}</h3><p>${h(c.detail)}</p><div class="criterion-bar"><span style="width:${(c.weight / max) * 100}%"></span></div></div><span class="position-label">${h(c.position)}</span></div>`).join("")}</div>`;
  }
  function risksMarkup() {
    return `<div class="risk-list">${R.risks.map((r) => `<div class="risk-row"><span class="risk-level">${h(r.level)}</span><div><h3>${h(r.title)}</h3><p>${h(r.detail)}</p><small>${h(r.action)}</small></div><button class="quiet-button" data-score="${r.score}" aria-label="Inspect ${h(r.title)}">↗</button></div>`).join("")}</div>`;
  }
  function financialStats() {
    const f = R.financials,
      usable = f.comparableProjectIds.filter(
        (id) => project(id).fee != null,
      ).length;
    return `<div class="financial-signals"><div><span>Construction budget</span><strong class="${R.opportunity.constructionBudget == null ? "text-stat" : ""}">${money(R.opportunity.constructionBudget)}</strong><small>${h(R.opportunity.budgetBasis)}</small></div><div><span>Indicative ${h(D.firm.name)} fee</span><strong class="${f.feeRange == null ? "text-stat" : ""}">${h(f.feeRange?.label || "Not assessed")}</strong><small>${h(f.feeRange?.basis || f.confidenceNote)}</small></div><div><span>Usable fee precedents</span><strong>${String(usable).padStart(2, "0")}</strong><small>Of ${f.comparableProjectIds.length} selected comparables</small></div><div><span>Financial confidence</span><strong class="text-stat">${h(f.confidence)}</strong><small>${h(f.confidenceNote)}</small></div></div>`;
  }
  function strategyMarkup() {
    const s = R.strategy;
    return `<div class="strategy-position"><div class="fi-eyebrow">RECOMMENDED POSITION</div><h2>${lines(s.title)}</h2><p>${h(s.subtitle)}</p></div><div class="win-themes">${s.themes.map((t, i) => `<div><span>${String(i + 1).padStart(2, "0")}</span><h3>${h(t.title)}</h3><p>${h(t.detail)}</p>${citations(t.sources)}</div>`).join("")}</div><div class="strategy-order"><div class="fi-eyebrow">RECOMMENDED PROJECT ORDER</div>${s.projectOrder.map((p, i) => `<button data-project="${p.projectId}"><span>${String(i + 1).padStart(2, "0")}</span><strong>${h(project(p.projectId).name)}</strong><small>${h(p.label)}</small><b>${candidate(p.projectId)?.match == null ? "—" : candidate(p.projectId).match + "%"} ↗</b></button>`).join("")}</div>`;
  }
  function renderHeader() {
    const o = R.opportunity,
      p = R.recommendation;
    $(".fi-opportunity-header h1").innerHTML = o.titleLines
      .map(h)
      .join('<br class="desktop-break"> ');
    $(".fi-opportunity-header .fi-eyebrow span").textContent = o.eyebrow;
    $(".fi-header-actions a.fi-button").href =
      `#opportunity/source/${o.primarySourceId}/1`;
    $(".fi-subtitle").textContent =
      `${o.client} · ${o.location} · ${o.disciplines.join(" + ")}`;
    $(".opportunity-facts").innerHTML =
      `<span><b>${h(o.dueShort)}</b> ${h(o.dueYearTime)}</span><span id="days-remaining">${h(o.intervalLabel)}</span><span><b>${money(o.constructionBudget)}</b> construction budget</span><span><b>${h(o.area)}</b> ${h(o.areaContext)}</span><span><b>${h(o.anticipatedStart)}</b> anticipated start</span>`;
    $(".pursuit-number").innerHTML = `${scoreValue(p.value)}<span>/100</span>`;
    $(".pursuit-number").setAttribute(
      "aria-label",
      `Pursuit score ${p.value ?? "not assessed"}. Inspect reasoning`,
    );
    $(".decision-value h2").textContent = p.decision;
    $(".decision-value p").textContent = p.summary;
    $(".confidence-label").textContent = `${p.confidence} confidence`;
    $(".decision-statement").innerHTML = lines(p.statement);
    $(".decision-footnote").textContent =
      `${R.disclosure.evaluation} · Inspect any score for reasoning and evidence.`;
    $(".decision-drivers").innerHTML =
      `<h3>Decision drivers</h3>${p.drivers.map((d) => `<div class="driver ${d.concern ? "concern" : ""}"><span>${d.concern ? "!" : "↗"}</span><p><strong>${h(d.title)}</strong><small>${h(d.detail)}</small></p></div>`).join("")}`;
    $(".demo-chip").textContent = R.disclosure.badge;
    $(".fi-page-footer span:last-child").textContent = R.disclosure.footer;
    $('meta[name="description"]').content =
      `${D.firm.name}'s opportunity intelligence for ${o.name}.`;
  }
  function renderContent() {
    renderHeader();
    const e = R.experience,
      t = R.team,
      f = R.financials,
      cmp = t.comparison;
    $("#component-scores").innerHTML = R.scores
      .map(
        (s) =>
          `<button class="component-score" data-score="${s.id}" aria-label="${h(s.label)} score ${s.value ?? "not assessed"}. Inspect reasoning"><span>${h(s.short)}</span><strong>${scoreValue(s.value)}</strong><span class="intelligence-meter" style="--value:${s.value ?? 0}%"><i></i></span></button>`,
      )
      .join("");
    $("#panel-overview").innerHTML =
      `<div class="briefing-grid"><div><div class="fi-eyebrow">01 / EXECUTIVE BRIEFING</div><h2>${lines(R.overview.title)}</h2>${R.overview.paragraphs.map((p) => `<p>${h(p)}</p>`).join("")}${citations(R.overview.sources)}</div><aside><div class="fi-eyebrow">PROCUREMENT TIMELINE</div>${datesMarkup()}${citations(R.procurement.scheduleSources)}</aside></div>
    <div class="overview-pair"><section>${sectionHead("02 / EXPERIENCE", "Proof in the portfolio", "#opportunity/experience", `View ${e.candidates.length} candidates`)}<p class="section-deck">${h(e.overviewNote)}</p>${projectRows(e.leadProjectIds.map(candidate), true)}</section><section>${sectionHead("03 / PEOPLE", "Recommended team", "#opportunity/team", "Compare capacity")}${t.members.map((m) => teamRow(m, true)).join("")}<p class="micro-note">${h(t.capacityNote)}</p></section></div>
    <section class="content-section">${sectionHead("04 / QUALIFICATIONS", "Requirements at a glance", "#opportunity/requirements", `View all ${R.requirements.length}`)}<div class="requirements-glance">${R.overview.requirementIds
      .map((id) => R.requirements.find((r) => r.id === id))
      .map(
        (r) =>
          `<a href="#opportunity/requirements"><span>${h(r.id)}</span><strong>${h(r.title)}</strong><small>${h(r.type)} ↗</small></a>`,
      )
      .join("")}</div></section>
    <section class="content-section">${sectionHead("05 / FINANCIAL SIGNALS", f.title, "#opportunity/financials", "Examine assumptions")}${financialStats()}<p class="micro-note">${h(f.note)}</p></section>
    <div class="overview-pair lower-pair"><section>${sectionHead("06 / PURSUIT RISKS", "Resolve before committing")}${risksMarkup()}</section><section>${sectionHead("07 / SELECTION", "Where the proposal must perform", "#opportunity/strategy", "Develop the strategy")}${selectionMarkup()}${citations(R.selectionSources)}</section></div>
    <section class="content-section">${sectionHead("08 / PROPOSAL STRATEGY", R.strategy.overviewTitle, "#opportunity/strategy", "View strategy")}<p class="section-deck">${h(R.strategy.overview)}</p></section>`;
    $("#panel-requirements").innerHTML =
      `${sectionHead("RFQ / COMPLIANCE", "Requirements & deadlines")}<p class="section-deck">${h(R.procurement.description)}</p><div class="requirements-layout"><div><div class="requirements-table">${R.requirements.map((r) => `<div class="requirement-row"><span class="row-id">${h(r.id)}</span><div><h3>${h(r.title)}</h3><p>${h(r.detail)}</p></div><div><span class="requirement-type">${h(r.type)}</span>${citations(r.sources)}</div></div>`).join("")}</div>${callout(R.procurement.callout)}</div><aside class="schedule-aside"><div class="fi-eyebrow">${h(R.procurement.scheduleLabel)}</div>${datesMarkup(true)}${citations(R.procurement.scheduleSources)}<p class="micro-note">${h(R.procurement.scheduleNote)}</p></aside></div>`;
    $("#panel-experience").innerHTML =
      `${sectionHead(`FIRM EXPERIENCE / ${e.evaluatedCount} PROJECTS`, "Relevant experience")}<p class="section-deck">${h(e.description)}</p><div class="annotation-line"><span>${e.candidates.length} shortlisted candidates</span><span>${h(e.matchNote)}</span></div>${projectRows(e.candidates)}${callout(e.callout)}`;
    $("#panel-team").innerHTML =
      `${sectionHead(`PEOPLE / ${t.evaluatedCount} EVALUATED`, "Recommended pursuit team")}<p class="section-deck">${h(t.description)}</p><div class="team-grid"><div>${t.members.map((m) => teamRow(m)).join("")}<p class="micro-note">${h(t.matchNote)}</p></div><aside class="capacity-comparison"><div class="fi-eyebrow">CAPACITY / UNALLOCATED TIME</div><h3>${lines(cmp.title)}</h3><div class="capacity-columns"><span></span>${cmp.periodLabels.map((label) => `<span>${h(label)}</span>`).join("")}</div>${cmp.personIds.map((id) => `<button class="capacity-compare-row" data-person="${id}"><strong>${h(person(id).name)}<small>${h(member(id).role)}</small></strong>${cmp.periodIndices.map((i) => `<span>${percent(person(id).available[i])}</span>`).join("")}</button>`).join("")}<p>${h(cmp.detail)}</p>${citations(cmp.sources)}<div class="capacity-dates">${h(cmp.dates)}</div></aside></div><section class="content-section">${sectionHead("DELIVERY / DISCIPLINE COVERAGE", "Build the consultant team")}<div class="discipline-grid">${t.disciplines.map((d) => `<div><strong>${h(d.name)}</strong><span>${h(d.status)}</span></div>`).join("")}</div><p class="micro-note">${h(t.disciplineNote)}</p>${citations(t.disciplineSources)}</section>`;
    const covered = D.projects.filter((p) => p.fee != null).length;
    $("#panel-financials").innerHTML =
      `${sectionHead(`COMMERCIAL CONTEXT / ${f.confidence.toUpperCase()} CONFIDENCE`, "Financial signals")}${financialStats()}${callout(f.callout)}<section class="content-section">${sectionHead("COMPARABLES / SOURCE FACTS", `Historical ${D.firm.name} fees`)}<div class="table-wrap"><table><thead><tr><th>Project</th><th>Construction</th><th>Firm fee</th><th>Fee / construction</th><th>Evidence</th></tr></thead><tbody>${f.comparableProjectIds
        .map((id) => {
          const p = project(id);
          return `<tr><td>${h(p.name)}<small>${h(p.basis)}</small></td><td>${money(p.value)}</td><td>${money(p.fee)}</td><td>${p.fee == null || !p.value ? "Not recorded" : ((p.fee / p.value) * 100).toFixed(2) + "%"}</td><td><button class="evidence-link" data-project="${id}">Inspect ↗</button></td></tr>`;
        })
        .join(
          "",
        )}</tbody></table></div><p class="micro-note">Ratios are calculated from the cited historical values. They do not define the fee for this RFQ.</p></section><div class="overview-pair"><section>${sectionHead("FIRM GUARDRAILS", `What ${D.firm.name} prefers`)}<ul class="plain-list">${f.guardrails.map((g) => `<li>${h(g)}</li>`).join("")}</ul>${citations(f.guardrailSources)}</section><section>${sectionHead("DATA COVERAGE", "Know the limits")}<div class="coverage-number">${covered}<span>/${D.projects.length} projects with fee data</span></div><p class="section-deck">${h(f.coverageNote)}</p>${citations(f.coverageSources)}</section></div>`;
    $("#panel-strategy").innerHTML =
      `${strategyMarkup()}<section class="content-section">${sectionHead(`EVALUATION / ${R.selection.reduce((n, c) => n + c.weight, 0)} POINTS`, "Allocate effort to the selection criteria")}${selectionMarkup()}${citations(R.selectionSources)}</section><section class="content-section">${sectionHead("PRE-SUBMISSION / DECISIONS", "Resolve the pursuit conditions")}${risksMarkup()}</section>`;
  }
  function sourceLocators(key, entities = []) {
    const s = source(key);
    if (!s?.locators) return "";
    return entities
      .flatMap((id) =>
        (s.locators[id] || [])
          .filter((l) =>
            ["Projects", "Project Details", "Roster", "Capacity"].includes(
              l.sheet,
            ),
          )
          .slice(0, 5)
          .map((l) => `<li>${h(id)} · ${h(l.sheet)} · row ${l.row}</li>`),
      )
      .join("");
  }
  function drawerSources(refs, entities = []) {
    return `<section class="drawer-section"><div class="drawer-step">04 / SOURCE</div>${refs.map((ref) => `<div class="drawer-source">${citations([ref])}${sourceLocators(ref.sourceId, entities) ? `<ul>${sourceLocators(ref.sourceId, entities)}</ul>` : ""}</div>`).join("")}</section>`;
  }
  function openDrawer(content) {
    $("#drawer-content").innerHTML = content;
    if (!$("#reasoning-drawer").open) $("#reasoning-drawer").showModal();
    $("#reasoning-drawer").scrollTop = 0;
  }
  function openScore(id) {
    const s =
      id === "pursuit" ? R.recommendation : R.scores.find((s) => s.id === id);
    if (!s) return;
    openDrawer(
      `<div class="drawer-title-block"><div class="drawer-step">01 / SCORE</div><h2 id="drawer-title">${h(s.label)}</h2><div class="drawer-score">${scoreValue(s.value)}<span>/100</span></div><span class="drawer-confidence">${h(s.confidence)} confidence · ${h(R.disclosure.evaluation)}</span></div><section class="drawer-section"><div class="drawer-step">02 / REASONING</div><p>${h(s.reason)}</p>${s.components.length ? `<div class="score-factors">${s.components.map(([label, value]) => `<div><span>${h(label)}</span><b>${scoreValue(value)}</b><i style="--value:${value ?? 0}%"></i></div>`).join("")}</div>` : ""}</section><section class="drawer-section"><div class="drawer-step">03 / EVIDENCE</div><ul class="evidence-items">${s.evidence.map((e) => `<li>${h(e)}</li>`).join("")}</ul>${s.projects.map((id) => `<button class="drawer-evidence-button" data-project="${id}">${h(project(id).name)} ↗</button>`).join("")}${s.people.map((id) => `<button class="drawer-evidence-button" data-person="${id}">${h(person(id).name)} ↗</button>`).join("")}</section>${drawerSources(s.sources, [...s.projects, ...s.people])}<div class="drawer-disclaimer">${h(R.disclosure.score)}</div>`,
    );
  }
  function openProject(id) {
    const p = project(id),
      match = candidate(id);
    if (!p) return;
    const relations = D.relationships.filter((r) => r.project === id);
    openDrawer(
      `<div class="drawer-title-block"><div class="drawer-step">01 / ${match?.match != null ? h(R.disclosure.match).toUpperCase() : "PROJECT EVIDENCE"}</div><h2 id="drawer-title">${h(p.name)}</h2>${match?.match != null ? `<div class="drawer-score">${match.match}<span>% ${h(R.disclosure.match)}</span></div>` : `<span class="drawer-confidence">${h(p.id)} · source-backed project</span>`}</div><section class="drawer-section"><div class="drawer-step">02 / REASONING</div><p>${h(match?.reason || p.description || "No project description is recorded. Additional review is required.")}</p><div class="signal-tags">${(match?.signals || []).map((s) => `<span>${h(s)}</span>`).join("")}</div></section><section class="drawer-section"><div class="drawer-step">03 / EVIDENCE</div><dl class="evidence-facts"><div><dt>Client</dt><dd>${h(p.client)}</dd></div><div><dt>Location</dt><dd>${h(p.city)}, ${h(p.state)}</dd></div><div><dt>Construction</dt><dd>${money(p.value)}</dd></div><div><dt>Value basis</dt><dd>${h(p.basis)}</dd></div><div><dt>Firm fee</dt><dd>${money(p.fee)}</dd></div><div><dt>Completion</dt><dd>${h(p.end)}</dd></div><div><dt>Services</dt><dd>${h(p.services)}</dd></div></dl><h3>Named project roles</h3>${relations.map((r) => `<button class="drawer-evidence-button" data-person="${r.employee}">${h(r.name)}<small>${h(r.role)}</small></button>`).join("")}</section>${drawerSources(match?.sources || R.firmEvidence.projects, [id])}<div class="drawer-disclaimer">${h(match ? R.disclosure.project : "Project facts and historical roles come from the supplied firm records.")}</div>`,
    );
  }
  function openPerson(id) {
    const p = person(id),
      match = member(id);
    if (!p) return;
    openDrawer(
      `<div class="drawer-title-block"><div class="drawer-step">01 / TEAM ${match?.match != null ? "MATCH" : "EVIDENCE"}</div><h2 id="drawer-title">${h(p.name)}</h2><p>${h(p.role)} · ${h(p.office)}</p>${match?.match != null ? `<div class="drawer-score">${match.match}<span>% ${h(R.disclosure.match)}</span></div>` : ""}</div><section class="drawer-section"><div class="drawer-step">02 / REASONING</div><p>${h(p.skills.replaceAll(";", " ·"))}. ${p.years} years of experience.</p><p>${h(match?.reason || "Evaluate documented experience together with the dated capacity records.")}</p></section><section class="drawer-section"><div class="drawer-step">03 / EVIDENCE</div><h3>Capacity forecast</h3><div class="person-capacity-grid">${D.periods.map((date, i) => `<div><span>${i === 0 ? "Current" : `${i * 30} days`}</span><strong>${percent(p.available[i])}</strong><small>unallocated<br>${h(date)}</small></div>`).join("")}</div><p class="micro-note">${h(match ? R.team.forecastNote : `Firm snapshot: ${D.periods[0]}. Forecast ends ${D.periods.at(-1)}.`)}</p><h3>Project relationships</h3>${p.relationships.length ? p.relationships.map((r) => `<button class="drawer-evidence-button" data-project="${r.project}">${h(project(r.project)?.name || r.project)}<small>${h(r.role)}</small></button>`).join("") : "<p>No project relationships are recorded.</p>"}<p class="micro-note">Resume: ${p.resume ? "included in supplied PDF" : "not supplied"}.</p></section>${drawerSources(match?.sources || R.firmEvidence.people, [id])}<div class="drawer-disclaimer">${h(match ? R.disclosure.person : "Unallocated time is not a confirmed commitment.")}</div>`,
    );
  }
  function renderSource(key = R.opportunity.primarySourceId, page = 1) {
    if (!R.sources.some((s) => s.id === key))
      key = R.opportunity.primarySourceId;
    const s = source(key);
    sourceKey = key;
    sourcePage = Math.max(1, Math.min(Number(page) || 1, s.pages?.length || 1));
    const entities = [
      ...R.experience.leadProjectIds,
      ...R.team.members.map((p) => p.personId),
    ];
    $("#panel-source").innerHTML =
      `${sectionHead("PROVENANCE / ORIGINAL FILES", "Source & evidence")}<p class="section-deck">Inspect the exact files referenced by this result. Prepared text is shown beside the original PDF; workbook facts retain sheet and row references.</p><div class="source-library">${R.sources
        .map((entry) => {
          const file = source(entry.id).file;
          return `<a class="source-file ${key === entry.id ? "selected" : ""}" href="#opportunity/source/${entry.id}/1"><span>${file.endsWith(".pdf") ? "PDF" : "XLSX"}</span><strong>${h(file.replaceAll("_", " "))}</strong><small>${entry.kind === "opportunity" ? "Opportunity" : "Firm data"} ↗</small></a>`;
        })
        .join(
          "",
        )}</div><div class="source-toolbar"><strong>${h(s.file)}</strong><a class="fi-button" href="${h(s.url)}" download>Download original ↓</a><a class="fi-button" href="${h(s.url)}${s.pages ? "#page=" + sourcePage : ""}" target="_blank" rel="noopener">Open original ↗</a></div>${s.pages ? `<div class="source-controls"><label for="source-page">PDF page</label><select id="source-page">${s.pages.map((_, i) => `<option value="${i + 1}" ${i + 1 === sourcePage ? "selected" : ""}>${i + 1} of ${s.pages.length}</option>`).join("")}</select><span>Original source · prepared text extraction</span></div><div class="source-reading"><iframe title="${h(s.file)}, page ${sourcePage}" src="${h(sourcePdfLink(key, sourcePage))}" loading="lazy"></iframe><div><div class="fi-eyebrow">EXTRACTED TEXT / PAGE ${sourcePage}</div><pre>${h(s.pages[sourcePage - 1])}</pre></div></div>` : `<div class="workbook-source"><div><div class="fi-eyebrow">WORKBOOK CONTENTS</div><ul class="plain-list">${s.sheets.map((w) => `<li>${h(w.name)}</li>`).join("")}</ul></div><div><div class="fi-eyebrow">PRIMARY RECORD LOCATORS</div><ul class="source-locators">${sourceLocators(key, entities)}</ul><p>Open the original workbook to inspect values and formulas. Missing values remain unknown.</p></div></div>`}<div class="source-integrity"><span>SHA-256 · original file integrity</span><code>${h(s.sha256)}</code></div><p class="micro-note">${h(R.disclosure.source)}</p>`;
  }
  function opportunityCard() {
    const o = R.opportunity,
      p = R.recommendation;
    return `<a class="fi-opportunity-row" href="#opportunity/overview"><div><span class="fi-eyebrow">${h(o.eyebrow)} / ${h(o.location)}</span><h2>${h(o.name)}</h2><p>${h(o.client)} · Due ${h(o.dueLabel)}</p></div><span>${money(o.constructionBudget)}<small>construction</small></span><strong>${scoreValue(p.value)}<small>${h(p.decision)}</small></strong><b>↗</b></a>`;
  }
  function renderWorkspace(view) {
    const title = {
      overview: "Workspace overview",
      opportunities: "Opportunities",
      projects: "Project experience",
      team: "People & capacity",
      financials: "Financial outlook",
    }[view];
    let content = "";
    if (view === "overview")
      content = `<div class="workspace-overview-stats"><div><strong>${D.projects.length}</strong><span>Projects</span></div><div><strong>${D.people.length}</strong><span>People</span></div><div><strong>${D.projects.filter((p) => p.status === "Active").length}</strong><span>Active projects</span></div><div><strong>${percent(D.firm.currentAllocation)}</strong><span>Current allocation</span></div></div>${sectionHead("OPPORTUNITY IN FOCUS", R.recommendation.summary)}${opportunityCard()}`;
    if (view === "opportunities")
      content = `<p class="section-deck">Explore the current opportunity and the analysis behind its recommendation.</p>${opportunityCard()}<a class="fi-button run-entry" href="#analysis/run">Inspect the RFQ analysis →</a><div class="legacy-link">Earlier prototype: <a href="atlas.html">Open the original Atlas Studio demo ↗</a></div>`;
    if (view === "projects")
      content = `<p class="section-deck">All ${D.projects.length} records from the supplied project database. Unknown values remain visible.</p><div class="table-wrap"><table><thead><tr><th>Project</th><th>Location / market</th><th>Status</th><th>Construction</th><th>Evidence</th></tr></thead><tbody>${D.projects.map((p) => `<tr><td>${h(p.name)}<small>${h(p.id)}</small></td><td>${h(p.city)}<small>${h(p.market || "Market not recorded")}</small></td><td>${h(p.status)}</td><td>${money(p.value)}</td><td><button class="evidence-link" data-project="${p.id}">Inspect ↗</button></td></tr>`).join("")}</tbody></table></div>`;
    if (view === "team")
      content = `<p class="section-deck">${D.people.length} employees · current snapshot ${h(D.periods[0])}. Availability means unallocated time, not a commitment.</p><div class="table-wrap"><table><thead><tr><th>Person</th><th>Role</th><th>Current availability</th><th>60-day availability</th><th>Evidence</th></tr></thead><tbody>${people.map((p) => `<tr><td>${h(p.name)}<small>${h(p.office)} · ${h(p.id)}</small></td><td>${h(p.role)}</td><td>${percent(p.available[0])}</td><td>${percent(p.available[2])}</td><td><button class="evidence-link" data-person="${p.id}">Inspect ↗</button></td></tr>`).join("")}</tbody></table></div>`;
    if (view === "financials") {
      const coverage = D.projects.filter((p) => p.fee != null).length;
      content = `<p class="section-deck">Opportunity-specific signals and the limits of the supplied financial data.</p>${financialStats()}<div class="callout"><strong>${coverage} projects have fee data. ${D.projects.length - coverage} do not.</strong><p>${h(R.financials.note)} See the complete assumptions and comparable fees for ${h(R.opportunity.name)}.</p><a href="#opportunity/financials">Open opportunity financials →</a></div>`;
    }
    $("#workspace-view").innerHTML =
      `<div class="workspace-page-title"><span class="fi-eyebrow">${h(D.firm.name.toUpperCase())} / WORKSPACE</span><h1>${title}</h1></div>${content}`;
  }
  const runStages = [
    [
      "document",
      "Document intelligence",
      "Inspect the selected prepared source",
    ],
    [
      "requirements",
      "Requirements & procurement",
      "Check requirements, dates and evaluation criteria",
    ],
    ["experience", "Firm experience", "Check selected project evidence"],
    [
      "people",
      "People & relationships",
      "Check people and their delivery experience",
    ],
    [
      "capacity",
      "Capacity & constraints",
      "Inspect dated commitments and identified gaps",
    ],
    [
      "recommendation",
      "Pursuit recommendation",
      "Inspect the structured fixture decision",
    ],
  ];
  function renderRun() {
    const o = R.opportunity,
      p = R.recommendation,
      s = source(o.primarySourceId);
    $("#run-view").innerHTML =
      `<header class="run-header"><a class="section-link" href="#opportunity/overview">← Back to opportunity</a><span class="fi-eyebrow">FIRM INTELLIGENCE / ANALYSIS WORKSPACE</span><h1>Building opportunity<br>intelligence.</h1><p>${h(o.name)} <span>·</span> ${h(o.client)}</p></header><div class="analysis-workbench"><div class="run-document"><div class="fi-eyebrow">SOURCE DOCUMENT</div><div class="document-glyph" aria-hidden="true">RFQ<br><span>${String(s.pages?.length || 0).padStart(2, "0")} PAGES</span></div><h2>${lines(o.titleLines)}</h2><p>${o.disciplines.map(h).join("<br>+ ")}</p><dl><div><dt>Construction</dt><dd>${money(o.constructionBudget)}</dd></div><div><dt>Study area</dt><dd>${h(o.area)}</dd></div><div><dt>Due</dt><dd>${h(o.dueLabel)}</dd></div></dl>${sourceAnchor(o.primarySourceId, 1, "Inspect original RFQ")}</div><div class="run-pipeline"><div class="run-pipeline-heading"><span class="fi-eyebrow">ANALYSIS PIPELINE</span><span id="run-counter">0 / 6 complete</span></div><ol>${runStages.map(([id, title, detail], i) => `<li id="stage-${id}" class="analysis-stage"><span class="stage-index">0${i + 1}</span><div><strong>${title}</strong><p>${detail}</p></div><span class="stage-state">Ready</span></li>`).join("")}</ol><div class="run-progress" role="progressbar" aria-label="Analysis stages completed" aria-valuemin="0" aria-valuemax="6" aria-valuenow="0"><i></i></div><div class="run-control-row"><button class="fi-button primary-fi" id="start-analysis">Run sample analysis →</button><a class="fi-button" href="#opportunity/overview" id="view-result" hidden>View recommendation →</a><button class="fi-button" id="cancel-analysis" hidden>Cancel</button></div><p class="run-disclosure">${h(R.disclosure.run)}</p></div><div class="run-findings"><div class="fi-eyebrow">EVIDENCE LOG</div><div id="run-log" role="log" aria-live="polite"><p class="log-placeholder">Each completed stage records its findings here.</p></div><div id="run-recommendation" hidden><strong>${scoreValue(p.value)}</strong><span>${h(p.decision)}<br><small>${h(p.confidence)} confidence · ${h(R.disclosure.evaluation)}</small></span></div></div></div>`;
    if (runResult) showCompletedRun();
  }
  function showCompletedRun() {
    let i = 0;
    for (const [id] of runStages) {
      updateStage(
        { id, state: "complete", message: runResult.messages[id] },
        ++i,
      );
    }
    $("#view-result").hidden = false;
    $("#start-analysis").textContent = "Run checks again";
    $("#run-recommendation").hidden = false;
  }
  function updateStage(event, count) {
    const li = $("#stage-" + event.id);
    if (!li) return;
    li.dataset.state = event.state;
    li.querySelector(".stage-state").textContent =
      event.state === "running" ? "Checking" : "Complete";
    if (event.message) {
      li.querySelector("p").textContent = event.message;
      $("#run-log .log-placeholder")?.remove();
      const entry = document.createElement("p");
      entry.textContent = event.message;
      $("#run-log").append(entry);
      $("#run-counter").textContent = `${count} / 6 complete`;
      $(".run-progress").setAttribute("aria-valuenow", String(count));
      $(".run-progress i").style.width = `${(count / 6) * 100}%`;
    }
  }
  async function startRun() {
    if (runBusy) return;
    runBusy = true;
    runResult = null;
    runController = new AbortController();
    renderRun();
    $("#start-analysis").disabled = true;
    $("#cancel-analysis").hidden = false;
    let count = 0;
    const messages = {};
    const runGeneration = generation;
    try {
      const result = await M.analyze(
        R,
        D,
        (event) => {
          if (runGeneration !== generation) return;
          if (event.state === "complete") {
            count++;
            messages[event.id] = event.message;
          }
          updateStage(event, count);
        },
        runController.signal,
      );
      if (runGeneration !== generation) return;
      runResult = { result, messages };
      $("#view-result").hidden = false;
      $("#run-recommendation").hidden = false;
      $("#start-analysis").textContent = "Run checks again";
    } catch (error) {
      if (runGeneration !== generation) return;
      const line = document.createElement("p");
      line.textContent =
        error.name === "AbortError"
          ? "Analysis cancelled. Run checks again when ready."
          : `Analysis could not complete: ${error.message}`;
      $("#run-log")?.append(line);
    } finally {
      if (runGeneration !== generation) return;
      runBusy = false;
      if ($("#start-analysis")) $("#start-analysis").disabled = false;
      if ($("#cancel-analysis")) $("#cancel-analysis").hidden = true;
    }
  }

  function closeNav() {
    $(".fi-sidebar").classList.remove("is-open");
    $(".fi-mobile-menu").setAttribute("aria-expanded", "false");
  }
  function route() {
    let parts = location.hash.replace(/^#/, "").split("/");
    if (parts[0] === "analysis" && parts[1] !== "run") {
      parts = [
        "opportunity",
        parts[1] === "projects" ? "experience" : parts[1] || "overview",
      ];
    }
    if (parts[0] === "main-content") return;
    const workspace =
      parts[0] === "workspace" &&
      ["overview", "opportunities", "projects", "team", "financials"].includes(
        parts[1],
      );
    const run = parts[0] === "analysis" && parts[1] === "run";
    const tab = sections.includes(parts[1]) ? parts[1] : "overview";
    if (runBusy && !run) runController?.abort();
    $("#workspace-view").hidden = !workspace;
    $("#run-view").hidden = !run;
    $("#opportunity-view").hidden = workspace || run;
    if (workspace) renderWorkspace(parts[1]);
    else if (run) renderRun();
    else if (tab === "source")
      renderSource(parts[2] || sourceKey, parts[3] || sourcePage);
    $$(".fi-tabs a").forEach((a) => {
      const active = a.id === "tab-" + tab;
      a.setAttribute("aria-selected", String(active));
      a.tabIndex = active ? 0 : -1;
    });
    sections.forEach((id) => {
      $("#panel-" + id).hidden = id !== tab;
    });
    $$(".fi-primary-nav a").forEach((a) => {
      const active =
        a.hash === `#workspace/${workspace ? parts[1] : "opportunities"}`;
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    const label = workspace
      ? {
          overview: "Overview",
          opportunities: "Opportunities",
          projects: "Projects",
          team: "Team",
          financials: "Financials",
        }[parts[1]]
      : run
        ? "RFQ analysis"
        : R.opportunity.name;
    $("#breadcrumb").innerHTML =
      `<a href="#workspace/opportunities">${workspace ? "Workspace" : "Opportunities"}</a><span>/</span><strong>${h(label)}</strong>`;
    document.title = `${label} — Firm AI`;
    $$("dialog[open]").forEach((d) => d.close());
    closeNav();
    const routeKind = workspace
      ? "workspace/" + parts[1]
      : run
        ? "run"
        : "opportunity";
    if (currentRoute && currentRoute !== routeKind)
      window.scrollTo({ top: 0, behavior: "instant" });
    currentRoute = routeKind;
  }
  function summaryText() {
    const o = R.opportunity,
      p = R.recommendation,
      f = R.financials;
    const refs = (items) =>
      items
        .map((ref) => `[${source(ref.sourceId).file} p. ${ref.page}]`)
        .join(" ");
    const scoreLines = (s) => [
      `${s.label}: ${s.value ?? "Not assessed"} / 100 · ${s.confidence}`,
      s.reason,
      ...s.evidence,
      refs(s.sources),
    ];
    return [
      `FIRM AI / ${o.name}`,
      `${D.firm.name} · ${R.disclosure.evaluation}`,
      `Analysis: ${R.id} · Schema ${R.schemaVersion} · Firm snapshot ${R.firmSnapshotId}`,
      `${p.decision} ${p.value ?? "Not assessed"} / 100 · ${p.confidence} confidence`,
      R.disclosure.score,
      "",
      o.id,
      `${o.client} · ${o.location} · ${o.disciplines.join(" + ")}`,
      `${money(o.constructionBudget)} construction · ${o.budgetBasis} · ${o.area} ${o.areaContext}`,
      `Due ${o.dueLabel} · Anticipated start ${o.anticipatedStart}`,
      o.intervalLabel,
      "",
      "EXECUTIVE BRIEFING",
      ...R.overview.title,
      ...R.overview.paragraphs,
      refs(R.overview.sources),
      "",
      "RECOMMENDATION",
      ...scoreLines(p),
      ...p.statement,
      ...p.drivers.map((d) => `${d.title}: ${d.detail}`),
      "",
      "COMPONENT SCORES",
      ...R.scores.flatMap(scoreLines),
      "",
      "REQUIREMENTS",
      ...R.requirements.map(
        (r) => `${r.id}: ${r.title}. ${r.detail} ${refs(r.sources)}`,
      ),
      R.procurement.callout.title,
      R.procurement.callout.detail,
      "",
      "SCHEDULE",
      ...R.deadlines.map((d) => `${d.date}: ${d.label} — ${d.detail}`),
      R.procurement.scheduleNote,
      refs(R.procurement.scheduleSources),
      "",
      "EXPERIENCE",
      R.experience.description,
      ...R.experience.candidates.map((entry) => {
        const x = project(entry.projectId);
        return `${x.name} [${x.id}] · ${entry.match == null ? "Not assessed" : entry.match + "% " + R.disclosure.match} · ${money(x.value)} construction · ${money(x.fee)} firm fee. ${entry.reason} ${refs(entry.sources)}`;
      }),
      R.experience.callout.detail,
      "",
      "TEAM",
      ...R.team.members.map((entry) => {
        const x = person(entry.personId);
        return `${x.name} [${x.id}] — ${entry.role} · ${entry.match == null ? "Not assessed" : entry.match + "% " + R.disclosure.match}. ${entry.reason}\n${D.periods.map((date, i) => `${date}: ${percent(x.available[i])} unallocated`).join(" · ")} ${refs(entry.sources)}`;
      }),
      R.team.capacityNote,
      R.team.forecastNote,
      ...R.team.disciplines.map((d) => `${d.name}: ${d.status}`),
      R.team.disciplineNote,
      "",
      "FINANCIAL SIGNALS",
      f.title,
      `Indicative fee: ${f.feeRange?.label || "Not assessed"} · ${f.feeRange?.basis || f.confidenceNote}`,
      `${f.confidence} confidence · ${f.confidenceNote}`,
      f.callout.title,
      f.callout.detail,
      refs(f.callout.sources),
      ...f.comparableProjectIds.map((id) => {
        const x = project(id);
        return `${x.name}: ${money(x.fee)} fee / ${money(x.value)} construction [${id}]`;
      }),
      ...f.guardrails,
      f.coverageNote,
      "",
      "SELECTION CRITERIA",
      ...R.selection.map(
        (c) => `${c.weight}% ${c.title}: ${c.position}. ${c.detail}`,
      ),
      refs(R.selectionSources),
      "",
      "RISKS",
      ...R.risks.map((r) => `${r.level}: ${r.title}. ${r.detail} ${r.action}`),
      "",
      "STRATEGY",
      ...R.strategy.title,
      R.strategy.subtitle,
      R.strategy.overview,
      ...R.strategy.themes.map(
        (t) => `${t.title}: ${t.detail} ${refs(t.sources)}`,
      ),
      ...R.strategy.projectOrder.map(
        (x, i) => `${i + 1}. ${project(x.projectId).name}: ${x.label}`,
      ),
      "",
      "SOURCE FILES",
      ...R.sources.map(
        (s) => `${source(s.id).file} · SHA-256 ${source(s.id).sha256}`,
      ),
      R.disclosure.source,
      R.disclosure.footer,
    ].join("\n");
  }
  function downloadSummary() {
    const blob = new Blob([summaryText()], {
        type: "text/plain;charset=utf-8",
      }),
      url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = `${R.opportunity.name.replace(/[^A-Za-z0-9]+/g, "_")}_Opportunity_Summary.txt`;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $("#actions-dialog").close();
    $("#status").textContent = "Opportunity summary downloaded.";
  }
  function setAnalysisResult(result) {
    // Validate before touching the current screen. Copy so callers cannot mutate it later.
    window.FIRM_ANALYSIS_CONTRACT.validate(result, D);
    const next = JSON.parse(JSON.stringify(result));
    const freeze = (value) => {
      if (value && typeof value === "object") {
        Object.values(value).forEach(freeze);
        Object.freeze(value);
      }
      return value;
    };
    runController?.abort();
    generation++;
    runBusy = false;
    runResult = null;
    R = freeze(next);
    sourceKey = R.opportunity.primarySourceId;
    sourcePage = 1;
    $$("dialog[open]").forEach((d) => d.close());
    for (const id of [
      "drawer-content",
      "workspace-view",
      "run-view",
      "panel-source",
      "status",
    ])
      $("#" + id).replaceChildren();
    renderContent();
    route();
    $("#opportunity-view").removeAttribute("data-loading");
  }
  // A narrow development/test seam, also usable by a future saved-result loader.
  window.FIRM_APP = Object.freeze({
    setAnalysisResult,
    getAnalysisResult: () => R,
    summaryText,
  });
  window.addEventListener("hashchange", route);
  document.addEventListener("click", (e) => {
    const sourceLink = e.target.closest("#reasoning-drawer a.source-ref");
    // An unchanged hash does not fire hashchange, but must still dismiss the drawer.
    if (sourceLink && sourceLink.hash === location.hash) {
      e.preventDefault();
      route();
      $("#panel-source").focus();
    }
    const score = e.target.closest("[data-score]"),
      project = e.target.closest("[data-project]"),
      person = e.target.closest("[data-person]"),
      close = e.target.closest("[data-close]");
    if (score) openScore(score.dataset.score);
    if (project) openProject(project.dataset.project);
    if (person) openPerson(person.dataset.person);
    if (close) document.getElementById(close.dataset.close).close();
    if (e.target.closest("#start-analysis")) startRun();
    if (e.target.closest("#cancel-analysis")) runController?.abort();
  });
  document.addEventListener("change", (e) => {
    if (e.target.id === "source-page")
      location.hash = `opportunity/source/${sourceKey}/${e.target.value}`;
  });
  $(".fi-mobile-menu").addEventListener("click", () => {
    const open = $(".fi-mobile-menu").getAttribute("aria-expanded") !== "true";
    $(".fi-mobile-menu").setAttribute("aria-expanded", String(open));
    $(".fi-sidebar").classList.toggle("is-open", open);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && $(".fi-sidebar").classList.contains("is-open")) {
      closeNav();
      $(".fi-mobile-menu").focus();
    }
  });
  $$(".fi-tabs a").forEach((a, i) =>
    a.addEventListener("keydown", (e) => {
      let next;
      if (e.key === "ArrowRight") next = (i + 1) % 7;
      if (e.key === "ArrowLeft") next = (i + 6) % 7;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = 6;
      if (next !== undefined) {
        e.preventDefault();
        const target = $$(".fi-tabs a")[next];
        target.focus();
        location.hash = target.hash;
      }
    }),
  );
  $("#opportunity-actions").addEventListener("click", () =>
    $("#actions-dialog").showModal(),
  );
  $("#download-summary").addEventListener("click", downloadSummary);
  $("#print-summary").addEventListener("click", () => {
    $("#actions-dialog").close();
    window.print();
  });
  $$("dialog").forEach((d) =>
    d.addEventListener("click", (e) => {
      if (e.target !== d) return;
      const r = d.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        d.close();
    }),
  );
  try {
    setAnalysisResult(window.FIELDWORK_ANALYSIS);
  } catch (error) {
    $("#opportunity-view").hidden = true;
    $("#status").textContent = `Unable to display analysis: ${error.message}`;
    console.error(error);
  }
})();
