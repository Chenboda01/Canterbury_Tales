# Wiki Log

## [2026-04-10] ingest | Initial wiki scaffold

- Created core wiki structure in `wiki/`.
- Added: `Home`, `index`, `Project-Overview`, `Story-Outline`, `Characters-and-Roles`, `Source-Notes`, `Schema`, `Log`.
- Established page conventions: links, source-of-truth policy, and change-audit behavior.

## [2026-04-10] lint | Cross-link verification pass (initial)

- Verified every page is linked from [[index]].
- Added initial note that characters with spelling variations should be normalized.

## [2026-04-10] ingest | Scene-level wiki decomposition

- Split `README.md` scene blocks into per-scene pages `Scene-00.md` through `Scene-34.md`.
- Added `Scene-Index.md` as the scene catalog.
- Added `lint_wiki.py` to enforce wiki link integrity and page coverage.

## [2026-04-10] lint | Scene index + link health check (automated)

## [2026-04-19] style & content | Font readability improvements and picture book completion

- **CSS improvements**: Enhanced AI Chatbot and Quiz components for better readability
  - Added 5 color options (Red, Blue, Green, White, Gray) and 4 font size options (Small, Medium, Large, Extra Large) for chatbot output
  - Increased contrast ratios to meet WCAG 4.5:1 minimum (verified via browser DevTools)
  - Improved quiz option text contrast and weight
- **Picture book completion**: Populated all 35 scene files with story content from README
  - Added image references, summaries, scene descriptions, source excerpts, entity links, clean-up notes
  - Fixed wiki link issues in Characters-and-Roles.md, Home.md, Chaucer.md, index.md
- **Verification**: Build passes (`npm run wiki:build`), lint passes (`python3 wiki/lint_wiki.py`), Momus review approved
- **Deployment**: Changes committed and pushed to `new-feature` branch, triggering GitHub Pages deployment
- **Lessons learned**:
  - Parallel delegation with DeepSeek Reasoner subagents effective for independent tasks
  - Momus review requires executable verification steps in `.sisyphus/plans/*.md` files
  - CSS accessibility improvements require careful contrast ratio checking against actual background colors
  - Automated population of similar files (35 scenes) can be efficiently done with scripted approaches
  - Git branch naming consistency important (user wrote `new_feature` but actual branch is `new-feature`)

- Updated `index.md` to include all scene pages.
- Updated wiki navigation links in `Home.md`/`Schema.md` to reduce dead links.
- Ran `python wiki/lint_wiki.py` and resolved issues; lint now passes.
