/* Rendering and navigation. Source facts and demo evaluation logic live separately. */
(() => {
  "use strict";
  const D = window.FIELDWORK_DATA,
    M = window.FIRM_INTELLIGENCE;
  const $ = (s) => document.querySelector(s),
    $$ = (s) => [...document.querySelectorAll(s)];
  const h = (v) =>
    String(v ?? "").replace(
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
  const money = (v) =>
    v == null
      ? "Not recorded"
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
          maximumFractionDigits: 2,
        }).format(v);
  const matchScores = { "FW-P001": 96, "FW-P002": 91, "FW-P003": 84 };
  const personScores = { "FW-E001": 96, "FW-E004": 93, "FW-E005": 87 };
  const projectList = M.rankProjects(D),
    people = M.evaluatePeople(D);
  const sections = [
    "overview",
    "requirements",
    "experience",
    "team",
    "financials",
    "strategy",
    "source",
  ];
  let sourceKey = "rfq",
    sourcePage = 1,
    runController = null,
    runResult = null,
    runBusy = false;
  let currentRoute = "";
  const source = (key) => D.sources.find((s) => s.file === M.sourceKeys[key]);
  const sourceAnchor = (key, page = 1, label) =>
    `<a class="source-ref" href="#opportunity/source/${key}/${page}">${h(label || M.sourceKeys[key])} <span>↗</span></a>`;
  const sourcePdfLink = (key, page = 1) => `${source(key).url}#page=${page}`;
  const sectionHead = (n, title, link = "", label = "") =>
    `<div class="section-heading"><div><span class="fi-eyebrow">${h(n)}</span><h2>${h(title)}</h2></div>${link ? `<a class="section-link" href="${link}">${h(label)} →</a>` : ""}</div>`;
  const scoreButton = (id, number, label) =>
    `<button class="inline-score" data-score="${id}" aria-label="${h(label)} ${number}. Inspect reasoning">${number}<span>↗</span></button>`;
  const emptyValue = (v) =>
    v === null || v === undefined ? "Not recorded" : h(v);

  function projectRows(list, compact = false) {
    return `<div class="experience-list">${list.map((p, i) => `<div class="experience-row"><div class="project-sequence">${String(i + 1).padStart(2, "0")}</div><div class="experience-description"><button class="plain-title" data-project="${p.id}">${h(p.name)}</button><p>${h(p.city)}, ${h(p.state)} <span>·</span> ${h(p.market || "Market not recorded")} <span>·</span> ${p.end.slice(0, 4)}</p>${compact ? "" : `<p class="project-scope">${h(p.description)}</p><div class="signal-tags">${p.signals.map((s) => `<span>${h(s)}</span>`).join("")}</div>`}</div><div class="experience-value"><strong>${money(p.value)}</strong><small>construction</small></div><div class="experience-match">${matchScores[p.id] ? `<button class="inline-score" data-project="${p.id}" aria-label="${h(p.name)} ${matchScores[p.id]} percent demo match. Inspect evidence">${matchScores[p.id]}<span>% ↗</span></button><small>demo match</small>` : `<button class="evidence-link" data-project="${p.id}">Evidence ↗</button>`}</div></div>`).join("")}</div>`;
  }
  function teamRow(id, role, compact = false) {
    const p = people.find((p) => p.id === id);
    return `<div class="team-person"><div class="person-initials">${p.name
      .split(" ")
      .map((x) => x[0])
      .join(
        "",
      )}</div><div class="person-description"><button class="plain-title" data-person="${id}">${h(p.name)}, PLA</button><p>${h(role)} <span>·</span> ${p.years} years</p>${compact ? "" : `<p>${h(p.skills.replaceAll(";", " ·"))}</p>`}<small class="capacity-label ${id === "FW-E004" ? "constrained" : ""}">${p.available[0]}% current capacity${id === "FW-E004" ? " · Confirmation needed" : ""}</small></div><button class="inline-score" data-person="${id}" aria-label="${h(p.name)} ${personScores[id]} percent demo match">${personScores[id]}<span>% ↗</span></button></div>`;
  }
  function datesMarkup(full = false) {
    const dates = full
      ? M.deadlines
      : M.deadlines.filter((d) =>
          [
            "2026-09-30",
            "2026-10-16",
            "2026-10-30",
            "2026-11-10",
            "2027-01",
          ].includes(d.date),
        );
    return `<ol class="deadline-list">${dates
      .map((d) => {
        let parts = d.date.split("-");
        const month = [
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
        ][Number(parts[1]) - 1];
        return `<li class="${d.primary ? "primary-deadline" : ""}"><time datetime="${d.date}"><span>${month}</span><b>${parts[2] || parts[0]}</b></time><div><strong>${h(d.label)}</strong><small>${h(d.detail)}</small></div></li>`;
      })
      .join("")}</ol>`;
  }
  function selectionMarkup() {
    return `<div class="criteria-list">${M.selection.map(([title, points, position, detail]) => `<div class="criterion"><strong>${points}<small>%</small></strong><div><h3>${h(title)}</h3><p>${h(detail)}</p><div class="criterion-bar"><span style="width:${(points / 30) * 100}%"></span></div></div><span class="position-label">${h(position)}</span></div>`).join("")}</div>`;
  }
  function risksMarkup() {
    return `<div class="risk-list">${M.risks.map((r) => `<div class="risk-row"><span class="risk-level">${h(r.level)}</span><div><h3>${h(r.title)}</h3><p>${h(r.detail)}</p><small>${h(r.action)}</small></div><button class="quiet-button" data-score="${r.score}" aria-label="Inspect ${h(r.title)}">↗</button></div>`).join("")}</div>`;
  }
  function financialStats() {
    return `<div class="financial-signals"><div><span>Construction budget</span><strong>$72M</strong><small>RFQ · planning budget</small></div><div><span>Indicative Fieldwork fee</span><strong>$1.4–2.2M</strong><small>Demo assumption · not validated</small></div><div><span>Usable lead fee precedents</span><strong>03</strong><small>Of 3 proposed lead projects</small></div><div><span>Financial confidence</span><strong class="text-stat">Moderate</strong><small>Fee budget is not disclosed</small></div></div>`;
  }
  function strategyMarkup() {
    return `<div class="strategy-position"><div class="fi-eyebrow">RECOMMENDED POSITION</div><h2>Fieldwork understands Austin’s public realm<br>because it has already delivered it.</h2><p>A pursuit position grounded in demonstrated roles, not a claim of guaranteed selection.</p></div><div class="win-themes"><div><span>01</span><h3>Austin experience, with proof.</h3><p>Lead with Waterloo Commons and Eastline Greenway. Show comparable scale, municipal coordination and the named team’s actual contribution.</p>${sourceAnchor("projects", 1, "Project database")}</div><div><span>02</span><h3>Public realm + resilience.</h3><p>Connect civic-space design with ecology, flood-responsive landscapes and community engagement. Name hydraulic specialists; do not imply that landscape experience covers hydraulic analysis.</p>${sourceAnchor("rfq", 3, "RFQ · scope of services")}</div><div><span>03</span><h3>Proven leadership, confirmed capacity.</h3><p>Position Elena and Noah through their shared delivery record. Confirm commitments and keep Priya as the PM alternative before promising January availability.</p>${sourceAnchor("staffing", 1, "Staffing and capacity")}</div></div><div class="strategy-order"><div class="fi-eyebrow">RECOMMENDED PROJECT ORDER</div>${["Waterloo Commons", "Eastline Greenway", "Trinity Civic Plaza"].map((name, i) => `<button data-project="FW-P00${i + 1}"><span>0${i + 1}</span><strong>${name}</strong><small>${["Lead precedent", "Municipal + ecological precedent", "Civic-space precedent"][i]}</small><b>${[96, 91, 84][i]}% ↗</b></button>`).join("")}</div>`;
  }

  function renderContent() {
    $("#component-scores").innerHTML = M.scores
      .map(
        (s) =>
          `<button class="component-score" data-score="${s.id}" aria-label="${s.label} score ${s.value}. Inspect reasoning"><span>${s.short}</span><strong>${s.value}</strong><span class="intelligence-meter" style="--value:${s.value}%"><i></i></span></button>`,
      )
      .join("");
    $("#panel-overview").innerHTML =
      `<div class="briefing-grid"><div><div class="fi-eyebrow">01 / EXECUTIVE BRIEFING</div><h2>A civic landscape.<br>A strong Fieldwork opportunity.</h2><p>The City of Austin is seeking a multidisciplinary design team for a $72 million transformation of approximately 22 acres of downtown riverfront. Civic open space, ecological restoration, trails and mobility connections form a major resilient public-realm initiative.</p><p>Landscape architecture, urban design and community engagement lead a coordinated effort across civil, ecological, structural and architectural expertise. Comparable public-realm delivery and team qualifications account for 55% of the RFQ evaluation.</p><p>Fieldwork’s Austin portfolio and 2027 priorities support the pursuit. Waterloo Commons and Eastline Greenway are the strongest precedents. Confirm project leadership availability and external discipline coverage before committing.</p>${sourceAnchor("rfq", 2, "RFQ · project & purpose, pp. 2–4")}</div><aside><div class="fi-eyebrow">PROCUREMENT TIMELINE</div>${datesMarkup()}${sourceAnchor("rfq", 6, "RFQ · schedule, p. 6")}</aside></div>
 <div class="overview-pair"><section>${sectionHead("02 / EXPERIENCE", "Proof in the portfolio", "#opportunity/experience", "View 17 candidates")}<p class="section-deck">164 firm projects evaluated · three lead precedents</p>${projectRows(projectList.slice(0, 3), true)}</section><section>${sectionHead("03 / PEOPLE", "Recommended team", "#opportunity/team", "Compare capacity")}${teamRow("FW-E001", "Principal-in-Charge", true)}${teamRow("FW-E004", "Project Manager", true)}${teamRow("FW-E005", "Alternative PM", true)}<p class="micro-note">Capacity is unallocated time at September 12, 2026—not a staffing commitment.</p></section></div>
 <section class="content-section">${sectionHead("04 / QUALIFICATIONS", "Requirements at a glance", "#opportunity/requirements", "View all 17")}<div class="requirements-glance">${M.requirements
   .filter((r) => [1, 2, 4, 10].includes(M.requirements.indexOf(r)))
   .map(
     (r) =>
       `<a href="#opportunity/requirements"><span>${r.id}</span><strong>${h(r.title)}</strong><small>${h(r.type)} ↗</small></a>`,
   )
   .join("")}</div></section>
 <section class="content-section">${sectionHead("05 / FINANCIAL SIGNALS", "A meaningful fee opportunity. An incomplete fee basis.", "#opportunity/financials", "Examine assumptions")}${financialStats()}<p class="micro-note">The indicative range is part of the curated demo scenario. It is not a disclosed fee or a project margin forecast.</p></section>
 <div class="overview-pair lower-pair"><section>${sectionHead("06 / PURSUIT RISKS", "Resolve before committing")}${risksMarkup()}</section><section>${sectionHead("07 / SELECTION", "Where the proposal must perform", "#opportunity/strategy", "Develop the strategy")}${selectionMarkup()}${sourceAnchor("rfq", 4, "RFQ · evaluation criteria, p. 4")}</section></div>
 <section class="content-section">${sectionHead("08 / PROPOSAL STRATEGY", "Lead with the work. Prove the team.", "#opportunity/strategy", "View strategy")}<p class="section-deck">Waterloo Commons → Eastline Greenway → Trinity Civic Plaza. Build the story around Austin delivery, resilient public space and credible leadership commitments.</p></section>`;
    $("#panel-requirements").innerHTML =
      `${sectionHead("RFQ / COMPLIANCE", "Requirements & deadlines")}<p class="section-deck">17 grouped requirements traced to the original seven-page RFQ. These are requirements to address, not an assertion that a response is compliant.</p><div class="requirements-layout"><div><div class="requirements-table">${M.requirements.map((r) => `<div class="requirement-row"><span class="row-id">${r.id}</span><div><h3>${h(r.title)}</h3><p>${h(r.detail)}</p></div><div><span class="requirement-type">${r.type}</span>${sourceAnchor("rfq", r.page, `p. ${r.page}`)}</div></div>`).join("")}</div><div class="callout"><strong>Do not include pricing.</strong><p>The RFQ is qualifications-based. Fees and hourly rates are requested during negotiations, not in the response.</p></div></div><aside class="schedule-aside"><div class="fi-eyebrow">FULL SCHEDULE / CENTRAL TIME</div>${datesMarkup(true)}${sourceAnchor("rfq", 6, "Original schedule · p. 6")}<p class="micro-note">Dates after submission are anticipated. Check written addenda; none accompany the initial issue.</p></aside></div>`;
    $("#panel-experience").innerHTML =
      `${sectionHead("FIRM EXPERIENCE / 164 PROJECTS", "Relevant experience")}<p class="section-deck">Three curated lead precedents, followed by additional candidates from a transparent demo match across location, public realm, municipal work, ecology, engagement and completion status.</p><div class="annotation-line"><span>17 shortlisted candidates</span><span>Similarity percentages are demo judgments, not source facts.</span></div>${projectRows(projectList)}<div class="callout"><strong>Three project sheets are required.</strong><p>The RFQ asks for three projects completed within ten years, including at least one demonstrating public-sector coordination. More candidates do not mean more submission sheets.</p>${sourceAnchor("rfq", 4, "RFQ · comparable experience")}</div>`;
    $("#panel-team").innerHTML =
      `${sectionHead("PEOPLE / 47 EVALUATED", "Recommended pursuit team")}<p class="section-deck">Experience identifies the strongest team. Dated staffing records identify the commitments to resolve.</p><div class="team-grid"><div>${teamRow("FW-E001", "Principal-in-Charge")}${teamRow("FW-E004", "Preferred Project Manager")}${teamRow("FW-E005", "Alternative Project Manager")}<p class="micro-note">Team match percentages are the Product & UX demo scenario. They are not generated by a validated staffing model.</p></div><aside class="capacity-comparison"><div class="fi-eyebrow">PM CAPACITY / UNALLOCATED TIME</div><h3>A stronger match.<br>A tighter calendar.</h3><div class="capacity-columns"><span></span><span>Current</span><span>60 days</span></div>${[
        "FW-E004",
        "FW-E005",
      ]
        .map((id) => {
          const p = people.find((p) => p.id === id);
          return `<button class="capacity-compare-row" data-person="${id}"><strong>${p.name}<small>${id === "FW-E004" ? "Preferred PM" : "Alternative PM"}</small></strong><span>${p.available[0]}%</span><span>${p.available[2]}%</span></button>`;
        })
        .join(
          "",
        )}<p>At the 60-day snapshot, Noah has 37% unallocated capacity and Priya has 46%. Neither figure confirms January availability.</p>${sourceAnchor("staffing", 1, "Staffing · Capacity sheet")}<div class="capacity-dates">Current: Sep 12 · 60 days: Nov 11, 2026<br>Forecast ends Dec 11, 2026</div></aside></div><section class="content-section">${sectionHead("DELIVERY / DISCIPLINE COVERAGE", "Build the consultant team")}<div class="discipline-grid">${["Landscape architecture", "Urban design", "Community engagement"].map((x) => `<div><strong>${x}</strong><span>Fieldwork experience documented</span></div>`).join("")}${["Civil engineering", "Hydrology / hydraulics", "Structural engineering", "Ecological restoration", "Lighting", "Cost estimating"].map((x) => `<div><strong>${x}</strong><span>Confirm named discipline lead / coverage</span></div>`).join("")}</div><p class="micro-note">No external consultant commitments are recorded in the supplied package. Landscape resilience expertise is not a substitute for hydraulic analysis.</p>${sourceAnchor("rfq", 3, "RFQ · team disciplines, p. 3")}</section>`;
    $("#panel-financials").innerHTML =
      `${sectionHead("COMMERCIAL CONTEXT / MODERATE CONFIDENCE", "Financial signals")}${financialStats()}<div class="callout"><strong>Fee not disclosed. Margin not calculable.</strong><p>The $72M construction budget is not a consultant fee. The $1.4M–$2.2M indicative range is an illustrative Product & UX assumption; scope, reimbursables, subconsultant allocations and cost inputs remain unresolved.</p>${sourceAnchor("rfq", 7, "RFQ · commercial assumptions, p. 7")}</div><section class="content-section">${sectionHead("COMPARABLES / SOURCE FACTS", "Historical Fieldwork fees")}<div class="table-wrap"><table><thead><tr><th>Project</th><th>Construction</th><th>Fieldwork fee</th><th>Fee / construction</th><th>Evidence</th></tr></thead><tbody>${D.projects
        .slice(0, 3)
        .map(
          (p) =>
            `<tr><td>${h(p.name)}<small>Delivered construction cost</small></td><td>${money(p.value)}</td><td>${money(p.fee)}</td><td>${((p.fee / p.value) * 100).toFixed(2)}%</td><td><button class="evidence-link" data-project="${p.id}">Inspect ↗</button></td></tr>`,
        )
        .join(
          "",
        )}</tbody></table></div><p class="micro-note">Ratios are calculated from the cited historical values. They do not define the fee for this RFQ.</p></section><div class="overview-pair"><section>${sectionHead("FIRM GUARDRAILS", "What Fieldwork prefers")}<ul class="plain-list"><li>Fees above approximately $500K.</li><li>A strong design role and multi-phase work.</li><li>Texas / Southwest and strategic portfolio value.</li><li>42% target project gross margin—not a forecast for this opportunity.</li></ul>${sourceAnchor("strategy", 3, "Strategic plan · financial guardrails, p. 3")}</section><section>${sectionHead("DATA COVERAGE", "Know the limits")}<div class="coverage-number">113<span>/164 projects with fee data</span></div><p class="section-deck">51 project fees are missing. The three lead precedents have usable fees, but comparable scope and future delivery costs still need review.</p>${sourceAnchor("projects", 1, "Project database · Projects sheet")}</section></div>`;
    $("#panel-strategy").innerHTML =
      `${strategyMarkup()}<section class="content-section">${sectionHead("EVALUATION / 100 POINTS", "Allocate effort to the selection criteria")}${selectionMarkup()}${sourceAnchor("rfq", 4, "RFQ · qualifications & evaluation, p. 4")}</section><section class="content-section">${sectionHead("PRE-SUBMISSION / DECISIONS", "Resolve the pursuit conditions")}${risksMarkup()}</section>`;
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
  function drawerSources(keys, entities = [], page = 1) {
    return `<section class="drawer-section"><div class="drawer-step">04 / SOURCE</div>${keys.map((key) => `<div class="drawer-source">${sourceAnchor(key, key === "rfq" ? page : key === "strategy" ? 2 : 1)}${sourceLocators(key, entities) ? `<ul>${sourceLocators(key, entities)}</ul>` : ""}</div>`).join("")}</section>`;
  }
  function openDrawer(content) {
    $("#drawer-content").innerHTML = content;
    $("#reasoning-drawer").showModal();
    $("#reasoning-drawer").scrollTop = 0;
  }
  function openScore(id) {
    const s = id === "pursuit" ? M.pursuit : M.scores.find((s) => s.id === id);
    if (!s) return;
    openDrawer(
      `<div class="drawer-title-block"><div class="drawer-step">01 / SCORE</div><h2 id="drawer-title">${h(s.label)}</h2><div class="drawer-score">${s.value}<span>/100</span></div><span class="drawer-confidence">${s.confidence} confidence · demo evaluation</span></div><section class="drawer-section"><div class="drawer-step">02 / REASONING</div><p>${h(s.reason)}</p>${s.components ? `<div class="score-factors">${s.components.map(([label, v]) => `<div><span>${label}</span><b>${v}</b><i style="--value:${v}%"></i></div>`).join("")}</div>` : ""}</section><section class="drawer-section"><div class="drawer-step">03 / EVIDENCE</div><ul class="evidence-items">${s.evidence.map((e) => `<li>${h(e)}</li>`).join("")}</ul>${(s.projects || []).map((id) => `<button class="drawer-evidence-button" data-project="${id}">${h(D.projects.find((p) => p.id === id).name)} ↗</button>`).join("")}${(s.people || []).map((id) => `<button class="drawer-evidence-button" data-person="${id}">${h(D.people.find((p) => p.id === id).name)} ↗</button>`).join("")}</section>${drawerSources(s.sources, [...(s.projects || []), ...(s.people || [])], s.page)}<div class="drawer-disclaimer">Scores reproduce the agreed Product & UX demo. They are not a validated probability of winning and are not calculated from RFQ selection weights. Evidence and source facts are separately identified.</div>`,
    );
  }
  function openProject(id) {
    const p = D.projects.find((p) => p.id === id);
    if (!p) return;
    const relations = D.relationships.filter((r) => r.project === id);
    const signals = M.projectSignals(p);
    openDrawer(
      `<div class="drawer-title-block"><div class="drawer-step">01 / ${matchScores[id] ? "DEMO MATCH" : "EXPERIENCE CANDIDATE"}</div><h2 id="drawer-title">${h(p.name)}</h2>${matchScores[id] ? `<div class="drawer-score">${matchScores[id]}<span>% demo match</span></div>` : `<span class="drawer-confidence">${h(p.id)} · source-backed project</span>`}</div><section class="drawer-section"><div class="drawer-step">02 / REASONING</div><p>${h(p.description || "No project description is recorded. Additional review is required.")}</p><div class="signal-tags">${signals.map((s) => `<span>${h(s)}</span>`).join("")}</div></section><section class="drawer-section"><div class="drawer-step">03 / EVIDENCE</div><dl class="evidence-facts"><div><dt>Client</dt><dd>${h(p.client)}</dd></div><div><dt>Location</dt><dd>${h(p.city)}, ${h(p.state)}</dd></div><div><dt>Construction</dt><dd>${money(p.value)}</dd></div><div><dt>Value basis</dt><dd>${h(p.basis)}</dd></div><div><dt>Fieldwork fee</dt><dd>${money(p.fee)}</dd></div><div><dt>Completion</dt><dd>${h(p.end)}</dd></div><div><dt>Services</dt><dd>${h(p.services)}</dd></div></dl><h3>Named project roles</h3>${relations.map((r) => `<button class="drawer-evidence-button" data-person="${r.employee}">${h(r.name)}<small>${h(r.role)}</small></button>`).join("")}</section>${drawerSources(["projects", "qualifications"], [id])}<div class="drawer-disclaimer">${matchScores[id] ? "Similarity is a curated demo judgment." : "Candidate selection uses transparent demo matching rules."} Project facts and historical roles come from the supplied source records.</div>`,
    );
  }
  function openPerson(id) {
    const p = people.find((p) => p.id === id);
    if (!p) return;
    openDrawer(
      `<div class="drawer-title-block"><div class="drawer-step">01 / TEAM ${personScores[id] ? "MATCH" : "EVIDENCE"}</div><h2 id="drawer-title">${h(p.name)}</h2><p>${h(p.role)} · ${h(p.office)}</p>${personScores[id] ? `<div class="drawer-score">${personScores[id]}<span>% demo match</span></div>` : ""}</div><section class="drawer-section"><div class="drawer-step">02 / REASONING</div><p>${h(p.skills.replaceAll(";", " · "))}. ${p.years} years of experience.</p><p>${id === "FW-E004" ? "Preferred PM through direct Waterloo Commons and Eastline Greenway delivery. Current allocation requires an explicit staffing decision." : id === "FW-E005" ? "Alternative PM with greater unallocated capacity. Eastline experience was as Project Designer, not Project Manager." : "Evaluate documented experience together with the dated capacity records."}</p></section><section class="drawer-section"><div class="drawer-step">03 / EVIDENCE</div><h3>Capacity forecast</h3><div class="person-capacity-grid">${D.periods.map((date, i) => `<div><span>${["Current", "30 days", "60 days", "90 days"][i]}</span><strong>${p.available[i]}%</strong><small>unallocated<br>${date}</small></div>`).join("")}</div><p class="micro-note">January availability is unconfirmed. Forecast ends December 11, 2026. Current snapshot: September 12.</p><h3>Project relationships</h3>${p.relationships.length ? p.relationships.map((r) => `<button class="drawer-evidence-button" data-project="${r.project}">${h(D.projects.find((x) => x.id === r.project)?.name || r.project)}<small>${h(r.role)}</small></button>`).join("") : "<p>No project relationships are recorded.</p>"}<p class="micro-note">Resume: ${p.resume ? "included in supplied PDF" : "not supplied"}.</p></section>${drawerSources(["staffing", "projects", "resumes"], [id])}<div class="drawer-disclaimer">Unallocated time is not a confirmed commitment. Match scores are the agreed demo scenario.</div>`,
    );
  }

  function renderSource(key = "rfq", page = 1) {
    if (!M.sourceKeys[key]) key = "rfq";
    const s = source(key);
    sourceKey = key;
    sourcePage = Math.max(1, Math.min(Number(page) || 1, s.pages?.length || 1));
    $("#panel-source").innerHTML =
      `${sectionHead("PROVENANCE / ORIGINAL FILES", "Source & evidence")}<p class="section-deck">Inspect the exact files used in this demo. Prepared text is shown beside the original PDF; workbook facts retain sheet and row references.</p><div class="source-library">${Object.entries(
        M.sourceKeys,
      )
        .map(
          ([k, file]) =>
            `<a class="source-file ${key === k ? "selected" : ""}" href="#opportunity/source/${k}/1"><span>${file.endsWith(".pdf") ? "PDF" : "XLSX"}</span><strong>${h(file.replace("Fieldwork_", "").replaceAll("_", " "))}</strong><small>${k === "rfq" ? "Opportunity" : "Firm data"} ↗</small></a>`,
        )
        .join(
          "",
        )}</div><div class="source-toolbar"><strong>${h(s.file)}</strong><a class="fi-button" href="${s.url}" download>Download original ↓</a><a class="fi-button" href="${s.url}${s.pages ? "#page=" + sourcePage : ""}" target="_blank" rel="noopener">Open original ↗</a></div>${s.pages ? `<div class="source-controls"><label for="source-page">PDF page</label><select id="source-page">${s.pages.map((_, i) => `<option value="${i + 1}" ${i + 1 === sourcePage ? "selected" : ""}>${i + 1} of ${s.pages.length}</option>`).join("")}</select><span>Original source · prepared text extraction</span></div><div class="source-reading"><iframe title="${h(s.file)}, page ${sourcePage}" src="${sourcePdfLink(key, sourcePage)}" loading="lazy"></iframe><div><div class="fi-eyebrow">EXTRACTED TEXT / PAGE ${sourcePage}</div><pre>${h(s.pages[sourcePage - 1])}</pre></div></div>` : `<div class="workbook-source"><div><div class="fi-eyebrow">WORKBOOK CONTENTS</div><ul class="plain-list">${s.sheets.map((w) => `<li>${h(w.name)}</li>`).join("")}</ul></div><div><div class="fi-eyebrow">PRIMARY RECORD LOCATORS</div><ul class="source-locators">${sourceLocators(key, key === "projects" ? ["FW-P001", "FW-P002", "FW-P003"] : ["FW-E001", "FW-E004", "FW-E005"])}</ul><p>Open the original workbook to inspect values and formulas. Missing values remain unknown.</p></div></div>`}<div class="source-integrity"><span>SHA-256 · original file integrity</span><code>${s.sha256}</code></div><p class="micro-note">Source precedence: RFQ for procurement facts; project workbook for project fees and roles; staffing workbook for dated capacity; strategic plan for firm priorities. The fixed scores and indicative fee range belong to the demo evaluation, not the source documents.</p>`;
  }

  function opportunityCard() {
    return `<a class="fi-opportunity-row" href="#opportunity/overview"><div><span class="fi-eyebrow">RFQ / AUSTIN, TX</span><h2>Colorado River Civic Waterfront</h2><p>City of Austin · Due October 16, 2026</p></div><span>$72M<small>construction</small></span><strong>87<small>PURSUE</small></strong><b>↗</b></a>`;
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
      content = `<div class="workspace-overview-stats"><div><strong>164</strong><span>Projects</span></div><div><strong>47</strong><span>People</span></div><div><strong>31</strong><span>Active projects</span></div><div><strong>82%</strong><span>Current allocation</span></div></div>${sectionHead("OPPORTUNITY IN FOCUS", "A strong public-realm pursuit")}${opportunityCard()}`;
    if (view === "opportunities")
      content = `<p class="section-deck">Explore the current Fieldwork opportunity and the analysis behind its recommendation.</p>${opportunityCard()}<a class="fi-button run-entry" href="#analysis/run">Inspect the RFQ analysis →</a><div class="legacy-link">Earlier prototype: <a href="atlas.html">Open the original Atlas Studio demo ↗</a></div>`;
    if (view === "projects")
      content = `<p class="section-deck">All 164 records from the supplied project database. Unknown values remain visible.</p><div class="table-wrap"><table><thead><tr><th>Project</th><th>Location / market</th><th>Status</th><th>Construction</th><th>Evidence</th></tr></thead><tbody>${D.projects.map((p) => `<tr><td>${h(p.name)}<small>${h(p.id)}</small></td><td>${h(p.city)}<small>${h(p.market || "Market not recorded")}</small></td><td>${h(p.status)}</td><td>${money(p.value)}</td><td><button class="evidence-link" data-project="${p.id}">Inspect ↗</button></td></tr>`).join("")}</tbody></table></div>`;
    if (view === "team")
      content = `<p class="section-deck">47 employees · current snapshot September 12, 2026. Availability means unallocated time, not a commitment.</p><div class="table-wrap"><table><thead><tr><th>Person</th><th>Role</th><th>Current availability</th><th>60-day availability</th><th>Evidence</th></tr></thead><tbody>${people.map((p) => `<tr><td>${h(p.name)}<small>${h(p.office)} · ${h(p.id)}</small></td><td>${h(p.role)}</td><td>${p.available[0]}%</td><td>${p.available[2]}%</td><td><button class="evidence-link" data-person="${p.id}">Inspect ↗</button></td></tr>`).join("")}</tbody></table></div>`;
    if (view === "financials")
      content = `<p class="section-deck">Opportunity-specific signals and the limits of the supplied financial data.</p>${financialStats()}<div class="callout"><strong>113 projects have fee data. 51 do not.</strong><p>No project margin is calculated from billing rates. See the complete assumptions and comparable fees for Colorado River Civic Waterfront.</p><a href="#opportunity/financials">Open opportunity financials →</a></div>`;
    $("#workspace-view").innerHTML =
      `<div class="workspace-page-title"><span class="fi-eyebrow">FIELDWORK STUDIO / WORKSPACE</span><h1>${title}</h1></div>${content}`;
  }

  const runStages = [
    ["document", "Document intelligence", "Read the prepared seven-page RFQ"],
    [
      "requirements",
      "Requirements & procurement",
      "Resolve requirements, dates and evaluation criteria",
    ],
    [
      "experience",
      "Firm experience",
      "Compare the complete 164-project record set",
    ],
    [
      "people",
      "People & relationships",
      "Evaluate 47 people and their delivery experience",
    ],
    [
      "capacity",
      "Capacity & constraints",
      "Check dated commitments and identify gaps",
    ],
    [
      "recommendation",
      "Pursuit recommendation",
      "Assemble evidence and the curated demo decision",
    ],
  ];
  function renderRun() {
    $("#run-view").innerHTML =
      `<header class="run-header"><a class="section-link" href="#opportunity/overview">← Back to opportunity</a><span class="fi-eyebrow">FIRM INTELLIGENCE / ANALYSIS WORKSPACE</span><h1>Building opportunity<br>intelligence.</h1><p>Colorado River Civic Waterfront <span>·</span> City of Austin</p></header><div class="analysis-workbench"><div class="run-document"><div class="fi-eyebrow">SOURCE DOCUMENT</div><div class="document-glyph" aria-hidden="true">RFQ<br><span>07 PAGES</span></div><h2>Colorado River<br>Civic Waterfront</h2><p>Landscape Architecture<br>+ Urban Design</p><dl><div><dt>Construction</dt><dd>$72M</dd></div><div><dt>Study area</dt><dd>22 acres</dd></div><div><dt>Due</dt><dd>Oct 16, 2026</dd></div></dl><a href="#opportunity/source/rfq/1">Inspect original RFQ ↗</a></div><div class="run-pipeline"><div class="run-pipeline-heading"><span class="fi-eyebrow">ANALYSIS PIPELINE</span><span id="run-counter">0 / 6 complete</span></div><ol>${runStages.map(([id, title, detail], i) => `<li id="stage-${id}" class="analysis-stage"><span class="stage-index">0${i + 1}</span><div><strong>${title}</strong><p>${detail}</p></div><span class="stage-state">Ready</span></li>`).join("")}</ol><div class="run-progress" role="progressbar" aria-label="Analysis stages completed" aria-valuemin="0" aria-valuemax="6" aria-valuenow="0"><i></i></div><div class="run-control-row"><button class="fi-button primary-fi" id="start-analysis">Run sample analysis →</button><a class="fi-button" href="#opportunity/overview" id="view-result" hidden>View recommendation →</a><button class="fi-button" id="cancel-analysis" hidden>Cancel</button></div><p class="run-disclosure">Prepared demo records · local evidence checks · no live AI or PDF ingestion. Scores follow the agreed demo scenario.</p></div><div class="run-findings"><div class="fi-eyebrow">EVIDENCE LOG</div><div id="run-log" role="log" aria-live="polite"><p class="log-placeholder">Each completed stage records its findings here.</p></div><div id="run-recommendation" hidden><strong>87</strong><span>PURSUE<br><small>High confidence · demo</small></span></div></div></div>`;
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
    try {
      const result = await M.analyze(
        D,
        (event) => {
          if (event.state === "complete") {
            count++;
            messages[event.id] = event.message;
          }
          updateStage(event, count);
        },
        runController.signal,
      );
      runResult = { ...result, messages };
      $("#view-result").hidden = false;
      $("#run-recommendation").hidden = false;
      $("#start-analysis").textContent = "Run checks again";
    } catch (error) {
      const line = document.createElement("p");
      line.textContent =
        error.name === "AbortError"
          ? "Analysis cancelled. Run checks again when ready."
          : `Analysis could not complete: ${error.message}`;
      $("#run-log")?.append(line);
    } finally {
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
        : "Colorado River Civic Waterfront";
    $("#breadcrumb").innerHTML =
      `<a href="#workspace/opportunities">${workspace ? "Workspace" : "Opportunities"}</a><span>/</span><strong>${label}</strong>`;
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
  function downloadSummary() {
    const lines = [
      "FIRM AI / COLORADO RIVER CIVIC WATERFRONT",
      "Fieldwork Studio · Fictional demonstration",
      "PURSUE 87 / 100 · High confidence (curated demo evaluation)",
      "Scores are not a validated probability of winning.",
      "",
      ...M.scores.map(
        (s) => `${s.label}: ${s.value} — ${s.confidence} confidence`,
      ),
      "",
      "RFQ: DEMO-CRCW-2026-01",
      "City of Austin · $72M planning construction budget · approximately 22 acres",
      "Due October 16, 2026 at 2:00 PM CDT",
      "Anticipated start: January 2027",
      "",
      "RECOMMENDATION",
      M.pursuit.reason,
      "",
      "REQUIREMENTS",
      ...M.requirements.map(
        (r) => `${r.id}: ${r.title}. ${r.detail} [RFQ p. ${r.page}]`,
      ),
      "",
      "SCHEDULE",
      ...M.deadlines.map(
        (d) => `${d.date}: ${d.label} — ${d.detail} [RFQ p. 6]`,
      ),
      "",
      "LEAD EXPERIENCE",
      ...D.projects
        .slice(0, 3)
        .map(
          (p) =>
            `${p.name}: ${money(p.value)} construction, ${money(p.fee)} Fieldwork fee. Source ID ${p.id}.`,
        ),
      "",
      "STAFFING",
      "Elena Marquez: 22% current / 39% 60-day unallocated capacity.",
      "Noah Williams: 9% current / 37% 60-day unallocated capacity.",
      "Priya Shah: 33% current / 46% 60-day unallocated capacity.",
      "Snapshot September 12, 2026. Forecast ends December 11; January unconfirmed.",
      "",
      "FINANCIAL LIMITS",
      "No fee disclosed. $1.4M–$2.2M is a demo assumption, not a validated estimate.",
      "No project gross margin calculated. Fieldwork strategy target: 42%.",
      "",
      "RISKS",
      ...M.risks.map((r) => `${r.level}: ${r.title}. ${r.detail} ${r.action}`),
      "",
      "PROPOSAL STRATEGY",
      "Lead with Waterloo Commons, Eastline Greenway and Trinity Civic Plaza.",
      "Prove Austin public-realm experience, resilience and the named team’s historical roles.",
      "Confirm leadership capacity and external discipline coverage.",
      "",
      "SOURCE FILES",
      ...D.sources.map((s) => s.file),
    ];
    const blob = new Blob([lines.join("\n")], {
        type: "text/plain;charset=utf-8",
      }),
      url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = "Fieldwork_Colorado_River_Opportunity_Summary.txt";
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $("#actions-dialog").close();
    $("#status").textContent = "Opportunity summary downloaded.";
    setTimeout(() => {
      $("#status").textContent = "";
    }, 4000);
  }
  renderContent();
  route();
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
  // Keep countdown tied to the source snapshot; this demo does not imply live procurement monitoring.
  $("#days-remaining").textContent = "32 days from issue to deadline";
})();
