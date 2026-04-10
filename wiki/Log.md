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

- Updated `index.md` to include all scene pages.
- Updated wiki navigation links in `Home.md`/`Schema.md` to reduce dead links.
- Ran `python wiki/lint_wiki.py` and resolved issues; lint now passes.
