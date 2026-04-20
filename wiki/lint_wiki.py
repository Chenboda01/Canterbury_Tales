#!/usr/bin/env python3

"""Simple lint script for the wiki folder.

Checks implemented:
- every wiki link ([[...]] form) resolves to an existing wiki file
- required core files exist
- scene page coverage is contiguous from Scene-00 to Scene-34
- every page (except Home) is linked from index.md
"""

from __future__ import annotations

import re
from pathlib import Path


WIKI_DIR = Path(__file__).resolve().parent
REQUIRED_FILES = {
    "Home",
    "index",
    "Project-Overview",
    "Story-Outline",
    "Characters-and-Roles",
    "Source-Notes",
    "Schema",
    "Log",
    "Scene-Index",
}

LINK_RE = re.compile(r"\[\[([^\]\[]+)\]\]")


def md_pages() -> dict[str, Path]:
    pages = {}
    for path in WIKI_DIR.glob("*.md"):
        pages[path.stem] = path
    return pages


def normalize_link(link: str) -> str:
    return link.strip().replace(' ', '-').replace('_', '-').lower()


def links_in_file(path: Path) -> set[str]:
    text = path.read_text(encoding="utf-8")
    links = {normalize_link(match) for match in LINK_RE.findall(text)}

    # intentionally keep links that look like prose placeholders out of lint scope
    links.discard("page")
    links.discard("...")
    return links


def main() -> int:
    pages = md_pages()
    ok = True

    # Required files
    missing_required = sorted(r for r in REQUIRED_FILES if f"{r}.md" not in {p.name for p in pages.values()})
    if missing_required:
        ok = False
        print("Missing required pages:")
        for name in missing_required:
            print(f"  - {name}.md")

    # Gather link edges and unresolved links
    unresolved = set()
    index_links = set()
    canonical = {normalize_link(k): k for k in pages}

    for stem, path in sorted(pages.items()):
        links = links_in_file(path)
        for link in links:
            if link not in canonical:
                unresolved.add((path.name, link))
            if path.stem == "index":
                index_links.update(links)

    if unresolved:
        ok = False
        print("Unresolved wiki links:")
        for source, link in sorted(unresolved):
            print(f"  - {source} -> [[{link}]]")

    # Scene coverage check
    scene_nums = []
    scene_re = re.compile(r"^Scene-(\d{2})$")
    for stem in pages:
        m = scene_re.fullmatch(stem)
        if m:
            scene_nums.append(int(m.group(1)))

    if scene_nums:
        missing = [n for n in range(0, 35) if n not in scene_nums]
        if missing:
            ok = False
            print("Missing scene pages:")
            for n in missing:
                print(f"  - Scene-{n:02d}.md")

    # Orphan check against index links (best effort)
    missing_from_index = []
    for stem in sorted(pages):
        if stem == "Home":
            continue
        if stem == "index":
            continue
        if normalize_link(stem) not in index_links:
            missing_from_index.append(stem)

    if missing_from_index:
        ok = False
        print("Pages not linked from [[index]]:")
        for stem in missing_from_index:
            print(f"  - [[{stem}]]")

    if ok:
        print("Wiki lint passed.")
        return 0
    print("Wiki lint found issues.")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
