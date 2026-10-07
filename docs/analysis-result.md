# AnalysisResult v1 — Phase 1

The application renders one selected, validated `AnalysisResult`. `dist/analysis-contract.js` exports its JSON Schema as `FIRM_ANALYSIS_CONTRACT.schema` and validates both structure and links to the loaded Firm Data. This is a fixture contract, not an AI response format or production API.

## Ownership

| Owner                   | Contents                                                                                                                                                   |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fieldwork-data.js`     | Immutable prepared firm facts, projects, people, relationships, staffing periods, original document URLs, extracted pages, workbook locators, hashes       |
| `fieldwork-analysis.js` | Primary curated result: opportunity facts, conclusions, match values, selected records, narratives, dates, requirements, financial assumptions, provenance |
| `analysis-contract.js`  | Canonical JSON Schema and runtime shape/reference validation                                                                                               |
| `intelligence-model.js` | Firm availability/relationship helpers and six cancellable local fixture checks; no inference or authored recommendation                                   |
| `opportunity.js`        | Safe rendering, routing, drawers, selected-result state, source access, summary export                                                                     |
| `app.html` and CSS      | Presentation shell, layout, navigation labels, styling, and print rules                                                                                    |

Load order: Firm Data → contract → primary result → local model → renderer. No runtime dependencies or build step are required.

The legacy `FIELDWORK_DATA.opportunity` object and prepared RFQ pages remain in the recovered data asset for integrity/compatibility. The renderer and local model do not use that opportunity object. All opportunity answers come from the selected result. Original source documents and historical firm facts may naturally mention the old opportunity's places or people; these are evidence, not stale conclusions.

## Contract

- `schemaVersion`, `id`, `kind`, `firmSnapshotId`: result identity and provenance. Phase 1 uses the supplied dataset's `snapshot` date as its snapshot identifier and rejects a mismatch. Only `curated-demo` and `test-fixture` are supported; live analyses require a later explicit contract decision.
- `opportunity`: identity, scope, client/location, budget, dates, area, display labels and primary source ID.
- `recommendation`, `scores`: values, confidence labels, reasoning, evidence text, referenced project/person IDs, and citations. Overall score uses the stable UI ID `pursuit`; component IDs are data-driven.
- `overview`, `requirements`, `procurement`, `deadlines`, `selection`, `risks`: section content and procurement facts. Featured requirements use IDs; featured dates use a flag, not particular dates.
- `experience`: evaluated count, ordered candidates, lead IDs, match values, signals, reasons, citations.
- `team`: evaluated count, recommended IDs/roles, match values, capacity flags, comparison periods, discipline coverage and limitations. Availability values resolve from the firm snapshot.
- `financials`: explicit fee assumption or null, confidence/limitations, comparable IDs, guardrails and references. Ratios and fee coverage are calculated from firm facts.
- `strategy`: positioning, themes, ordered project IDs and supporting references.
- `sources`: analysis-scoped IDs mapped to original document identifiers. A citation is `{sourceId, page, label}`; workbook citations use page 1 and retain the existing sheet/row locators.
- `firmEvidence`: default source references for firm projects/people opened outside the selected shortlist.
- `disclosure`: scenario labels and limitations used on screen and in exports.

Text and display labels are plain text, never HTML. Display date labels and authored narrative are part of the result so timezone wording and nuanced assumptions are preserved; validation does not claim that prose is factually correct or that repeated facts in prose are consistent. Phase 3+ must verify those against extracted evidence.

Unknown scores/matches and budgets use `null`, not zero. A fee range can be null. Zero is rendered as a real score. Missing fields, unsupported versions, duplicate/unsafe IDs, invalid source pages, unknown records, invalid numeric values and mismatched snapshots are rejected. Citation validation establishes that a document/page exists, not that it supports the claim.

## Selection and lifecycle

`FIRM_APP.setAnalysisResult(result)` validates before replacing the screen, copies/freezes the selected object, aborts any previous local run, and clears old drawers, hidden source/workspace panels, status messages and analysis logs. A generation guard prevents late events from an old run from touching the new result. `getAnalysisResult()` provides a frozen inspection snapshot; `summaryText()` returns the same result's plain-text export.

All seven opportunity sections, the shell header, workspace opportunity cards/financial signals, workbench, drawers, export and print use this selected object. The app still defaults to the primary Fieldwork fixture after reload; no persistence was introduced. Navigation, run/rerun/cancel, keyboard interactions and original-source downloads remain available.

## Changed test fixture

`tests/fixtures/changed-analysis.json` is a synthetic Juniper Library Retrofit review result: different title/client/location/dates, REVIEW 42, renamed component/source IDs, null budget/fee, zero and null matches, two different projects and people, two requirements, changed criteria/risks/strategy and reordered references. It deliberately reuses the existing strategic-plan PDF as its test primary document to exercise source remapping. It is **not** a real RFQ or a valid assessment of that PDF. Original bytes are never altered.

The test fixture stays outside `dist`. The local test server can select it at `/app.html?fixture=changed`; production contains no fixture picker or additional feature.

## Verification and manual review

From the repository root with a current Node.js LTS installation:

```sh
npm ci
npm test
npx playwright install chromium
npm run test:browser
npm run preview
```

Open `http://127.0.0.1:8766/app.html` and `http://127.0.0.1:8766/app.html?fixture=changed`. Review desktop and narrow screens, each tab, scores and nested evidence, source page controls, exported summaries and print preview. The changed result must show REVIEW 42, March 2028, different records and unknown budget/fee. Firm Data still contains all 164 projects and 47 people.

For a same-page manual switch, use browser DevTools:

```js
const fieldwork = FIRM_APP.getAnalysisResult();
await import("/__fixtures/changed-analysis.js");
FIRM_APP.setAnalysisResult(window.FIELDWORK_ANALYSIS);
// Restore without reloading:
FIRM_APP.setAnalysisResult(fieldwork);
```

The test server is local-only and is not a backend or deployment artifact. Browser tests start their own server, save review screenshots under ignored `test-results/`, and shut it down. If the environment supplies Chromium instead, set `BROWSER_PATH`; optional `BROWSER_ARGS` is a JSON array. These settings do not affect application code.

Phase 1 does not upload/parse new PDFs, authenticate users, save analyses, call AI, derive predictive scores, or implement onboarding. The original machine-specific preparation and verification tools have not been reconstructed. These are new portable tests for the contract and its integration.

## Phase 1 verification record

The final implementation passed six Node test groups (including malformed-result cases, reference validation, cancellation, unchanged Firm Data and all six original-file hashes). Browser verification passed 260 checks: both fixtures across 13 application routes at 320, 360, 375, 390, 600, 768, 800, 850, 1024 and 1440 pixels, with no document overflow or clipped recommendation content. Desktop/narrow screenshots were visually reviewed.

Interaction coverage included every score, candidate/person drawers, nested evidence, source remapping/page selection/downloads, workspace counts, summary downloads, print visibility, rerun/cancel, hot switching during an active run, invalid-result rejection, safe text rendering, caller-mutation isolation, keyboard/history, mobile navigation, the landing page and Atlas routes. No browser runtime/resource errors were recorded. These checks used Chromium; Firefox, Safari and a formal accessibility audit remain outside this phase's verified coverage. Print pagination should still receive manual review.
