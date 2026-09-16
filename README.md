# Firm AI — Opportunity Intelligence

Complete static website, continuing Jalen's original Firm AI project. No framework migration or build step is required.

## Open locally

1. Extract the complete project ZIP into a new folder.
2. Open that folder in VS Code.
3. Open `dist/index.html` in your browser, or serve the `dist` folder with VS Code Live Server.
4. Select **Explore Firm AI** to open the Colorado River Civic Waterfront opportunity.

Keep the entire `dist` folder together, including `sources`. The flagship product is `dist/app.html`; the earlier working Atlas demo is preserved at `dist/atlas.html`.

## Project structure

- `dist/index.html`, `style.css`, `script.js`: existing landing page and shared original demo styling/behavior.
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

Browser checks passed on September 15, 2026: eight score drawers, nested project/person evidence, seven tabs, source navigation, keyboard/history, 164 projects, 47 people, six-stage analysis, export, print, mobile menus, landing page and Atlas regression. Nine principal routes were checked at 320, 390, 768, 1024 and 1440 pixels with no horizontal overflow. No browser runtime or failed-resource errors were found.

## Hosting

Publish the contents of `dist` as a static website. No install command, build command, API key or environment variable is needed. Preserve the existing Vercel project and domain when deploying. Do not upload local authentication files or `node_modules`.

Production website: https://firm-ai-jalen7.vercel.app

Direct opportunity: https://firm-ai-jalen7.vercel.app/app.html

Vercel is configured by `vercel.json` to serve `dist` with no build or install step. This release was deployed directly to the existing Vercel project; the connected GitHub repository was not changed. Future GitHub-triggered deployments must include this complete project and configuration to avoid restoring an older version.
