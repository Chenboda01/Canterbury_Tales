# Wiki Schema

## Why this schema

This wiki follows the idea of a persistent, compounding markdown knowledge base:

- **Raw layer**: `README.md` scene text.
- **Wiki layer**: files in `wiki/`.
- **Schema**: this page + page-level conventions.

## Required files

- `Home.md` — entry point.
- `index.md` — inventory of pages.
- `Project-Overview.md` — scope, state, assumptions.
- `Story-Outline.md` — narrative structure.
- `Characters-and-Roles.md` — major entities.
- `Source-Notes.md` — provenance and cleanup status.
- `log.md` — chronological audit trail.

## Conventions

- Use concise summaries and keep one conceptual claim per paragraph.
- Use wiki links (`[[...]]`) for cross-reference.
- Do not duplicate full scene text in every page; point to `README.md` for canonical text.
- When a source change occurs, create an entry in [[Log]].

## Quality checks

- Run `python wiki/lint_wiki.py` from repo root to validate:
  - required pages exist,
  - all wiki links resolve,
  - all pages are linked from `index`,
  - all required scene pages `Scene-00` through `Scene-34` are present.

## Operations

### Ingest

When new source text is added:

1. Update `Story-Outline.md` with new beats.
2. Update `Characters-and-Roles.md` if entities are added.
3. Refresh this index if page coverage changes.
4. Add one `log.md` entry describing the ingest.

### Query usage

For future LLM-assisted work, prefer this sequence:

1. [[index]]
2. Target topic page
3. `README.md`

### Linting check

- Orphan page check: every page should be reachable from index or linked from another page.
- Naming consistency check: especially recurring characters.
- Stale note check: no claim should conflict silently across pages.
