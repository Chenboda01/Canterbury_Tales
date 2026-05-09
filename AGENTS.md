# AGENTS.md

## Repository map

- `README.md` is the raw scene-text layer for the picture-storybook draft; do not treat `wiki/` scene summaries as the canonical full text.
- `wiki/` is the structured knowledge layer published by Quartz. Core maintenance rules live in `wiki/Schema.md`; page inventory lives in `wiki/index.md`; scene inventory lives in `wiki/Scene-Index.md`.
- `wiki/Scene-00.md` through `wiki/Scene-34.md` must remain contiguous; `wiki/lint_wiki.py` enforces this.
- Character images and bios are in `wiki/assets/` and character pages such as `wiki/Characters-and-Roles.md`, `wiki/Chanticleer.md`, `wiki/Pertelote.md`, `wiki/Fox.md`, and `wiki/Widow.md`.
- `quartz-site/` is a vendored/customized Quartz 4 site that builds `../wiki`; production output is `quartz-site/public/`.
- `Nuns_Priest_Tales_GATE_Project_Boda/` is a nested/sister slideshow project inside this checkout; avoid confusing it with the Canterbury wiki source layer.

## Commands that matter

- Wiki lint from repo root: `python3 wiki/lint_wiki.py`.
- First-time Quartz setup: `cd quartz-site && npm install` or `npm ci`.
- Local Quartz preview: `cd quartz-site && npm run wiki:dev`.
- Production Quartz build: `cd quartz-site && npm run wiki:build`.
- Type/format check for Quartz code: `cd quartz-site && npm run check`.
- Full local wiki/comment workflow: `./start-wiki.sh`; stop it with `./start-wiki.sh --stop`.

## Wiki maintenance rules

- When adding or renaming wiki pages, update `wiki/index.md`; lint expects pages except `Home` and `index` to be linked from `index.md`.
- Use Obsidian-style links (`[[Page-Name]]`) for cross-references; `wiki/lint_wiki.py` normalizes spaces/underscores to hyphens when checking links.
- Keep one conceptual claim per paragraph in wiki pages; do not copy the full scene text into every derived page.
- Log meaningful content/schema changes in `wiki/Log.md`; existing entries use dated headings and short bullet summaries.
- `Pertelote`, `Partlet`, and `Dame Partlet` are currently mixed; preserve source wording unless doing an explicit naming-normalization pass.

## Quartz and deployment quirks

- GitHub Pages deploys via `.github/workflows/deploy-pages.yml` only on `master`, `new-feature`, or manual `workflow_dispatch`.
- The workflow uses Node 22, runs `npm ci` in `quartz-site`, then `npm run wiki:build`, and uploads `quartz-site/public`.
- `quartz-site/quartz.layout.ts` includes custom components: `PageNavigation`, `CommentRelay({ relayPort: 3333 })`, `Quiz` only on slug `Quiz-Test`, and `Chatbot` only on slug `Chatbot`.
- `start-wiki.sh` creates tmux session `ct-opencode`, starts `comment-relay-server.mjs` on port `3333`, and starts the Quartz dev server; comments in the site are sent into that tmux session.
- `quartz-site/quartz.config.ts` sets `baseUrl` to `Chenboda01.github.io/Canterbury_Tales` and ignores `private`, `templates`, and `.obsidian`.

## Generated and local-only files

- `generate_images.py` requires `OPENAI_API_KEY` and writes scene images to `wiki/assets/scenes/`.
- `embed_images.py` inserts `wiki/assets/scenes/scene-XX.jpg` references into `wiki/Scene-XX.md` files when missing.
- `.gitignore` excludes `.sisyphus/`, `.playwright-cli/`, `quartz-site/public/`, and optimized/original scene-image scratch directories.
