# Firm AI — Opportunity Intelligence

Complete static website, continuing Jalen's original Firm AI project. No framework migration or build step is required.

## Open locally

1. Clone this repository and check out the branch you want to review.
2. Open that folder in VS Code.
3. Open `dist/index.html` in your browser, or serve the `dist` folder with VS Code Live Server.
4. Select **Explore Firm AI** to open the Colorado River Civic Waterfront opportunity.

Keep the entire `dist` folder together, including `sources`. The flagship product is `dist/app.html`; the earlier working Atlas demo is preserved at `dist/atlas.html`.

## Project structure

- `dist/index.html`, `dist/style.css`, `dist/script.js`: landing page and shared original demo styling/behavior.
- `dist/app.html`: Fieldwork Studio opportunity and workspace shell.
- `dist/intelligence.css`: flagship typography, layout and intelligence surface.
- `dist/intelligence-content.css`: detail sections, source viewer, drawers, analysis state and print rules.
- `dist/fieldwork-data.js`: prepared Fieldwork Studio records and extracted source text.
- `dist/intelligence-model.js`: curated demo recommendation, requirements, provenance and local comparison logic.
- `dist/opportunity.js`: navigation, rendering, evidence drawers, analysis workflow, export and mobile behavior.
- `dist/atlas.html`: preserved earlier Atlas Studio experience.
- `dist/sources/`: six original Fieldwork PDF and spreadsheet documents.

## Included experience

PURSUE 87 with seven interactive component scores. Overview, Requirements, Experience, Team, Financials, Strategy and Source sections. Score → Reasoning → Evidence → Source navigation. All 164 projects and 47 people are browsable. Analysis runs six local evidence checks against prepared records and displays an inspectable evidence log. Summary download, print, keyboard navigation and responsive layouts remain available.

## What is real and what is a demo

Fieldwork Studio and the procurement package are fictional demonstration data. Source documents govern RFQ dates and requirements. Scores and the pursuit recommendation are the agreed demo scenario, not validated predictive scoring. The analysis compares prepared records locally; it does not upload documents, call an AI model or parse a new PDF. Authentication, live ingestion, persistence and production AI analysis are future product work.

The RFQ does not disclose a design fee. The displayed indicative fee range is labeled as a demo assumption. January 2027 staff availability remains unconfirmed because the supplied forecast ends in December 2026.

## Verification

The original release handoff recorded successful Chromium checks. Recovery verification subsequently identified a 320 px Requirements overflow, clipped recommendation content, and a drawer that stayed open when its source link matched the current URL. These are addressed in the follow-up layout changes; do not rely solely on the original handoff's results.

Follow-up Chromium verification passed 160 page/width checks across 320, 360, 375, 390, 600, 768, 800, 850, 1024, and 1440 px, with no document overflow or clipped recommendation content. The eight score drawers, nested evidence, same-URL source navigation and focus, six source downloads, PDF page controls, complete project/team tables, keyboard/history navigation, analysis/cancellation/rerun, summary export, print rules, mobile menu, and all ten Atlas routes passed. No browser runtime errors or failed HTTP resources were recorded. Desktop and narrow-screen screenshots were also inspected.

Before merging, check all opportunity and workspace routes, the Atlas demo, source downloads, evidence drawers, analysis completion/cancellation, export, print, keyboard/history behavior, and narrow screens. Check content clipping as well as document overflow. The component score strip and data tables intentionally scroll horizontally within their own containers.

The original Windows-only preparation script, browser-test script, and screenshots were not in the recovery ZIP. They have not been recreated. Firefox, Safari, and a formal accessibility audit remain outstanding.

## Development conventions

- `dist/` is the maintained, deployable source directory, not generated output. Keep it in Git; do not introduce a duplicate `src/` tree without a build-system decision.
- Keep source facts in `fieldwork-data.js`, evaluation logic in `intelligence-model.js`, and rendering/interactions in `opportunity.js`.
- Use two-space indentation, UTF-8, LF line endings, and readable CSS/JavaScript. `.editorconfig` supplies editor defaults; avoid unrelated formatting changes to legacy files.
- Do not manually reformat the generated dataset or alter original PDF/XLSX evidence files. Preserve their integrity hashes.
- Keep credentials, deployment-machine linkage, dependencies, and temporary verification output out of Git. See `.gitignore`.
- There is no application install or build step. The three maintained flagship files can be formatted with `npx prettier@3.6.2 --write dist/intelligence.css dist/intelligence-content.css dist/opportunity.js`.

## Hosting

Publish the contents of `dist` as a static website. No install command, build command, API key or environment variable is needed. Preserve the existing Vercel project and domain when deploying. Do not upload local authentication files or `node_modules`.

Production website: https://firm-ai-jalen7.vercel.app

Direct opportunity: https://firm-ai-jalen7.vercel.app/app.html

Vercel is configured by `vercel.json` to serve `dist` with no build or install step. The release has been recovered onto `sync/fieldwork-release-recovery`; it is not yet merged into `main`. Automatic Vercel deployment is disabled for that recovery branch. Merging into `main` may trigger production deployment and requires explicit approval.
