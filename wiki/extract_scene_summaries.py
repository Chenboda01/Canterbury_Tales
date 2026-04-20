#!/usr/bin/env python3
"""
Extract scene summaries from wiki/Scene-*.md for prompt generation.
Outputs CSV with scene number, title, summary, and generated prompt.
"""

import csv
import re
import sys
from pathlib import Path

WIKI_DIR = Path(__file__).resolve().parent

# Style template (matches wiki/prompt-template.md)
STYLE_KEYWORDS = (
    "Ink and Wash Medieval style, line‑heavy ink drawing on parchment texture, "
    "black and white, grayscale, high contrast, suitable for monochrome printing, "
    "16:9 landscape, medieval manuscript illustration, cross‑hatching, wash shading, "
    "no text, no watermark."
)

def extract_scene_info(path: Path):
    """Return (scene_num, title, summary) from a scene markdown file."""
    text = path.read_text(encoding='utf-8')
    
    # Extract scene number from filename
    stem = path.stem  # e.g., "Scene-00"
    match = re.search(r'Scene-(\d+)', stem)
    if not match:
        return None
    scene_num = match.group(1).zfill(2)  # "00"
    
    # Extract title from first line after "# Scene N"
    title_match = re.search(r'^# Scene \d+\s*\n+(.*?)$', text, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else ""
    
    # Extract summary (content after "## Summary" until next heading or end)
    # Using a simple regex that captures until next "##" or end of file
    summary_match = re.search(r'## Summary\s*\n+(.*?)(?=\n##|\Z)', text, re.DOTALL)
    if summary_match:
        summary = summary_match.group(1).strip()
        # Clean up: remove markdown formatting, extra whitespace
        summary = re.sub(r'\*\*|\*|`', '', summary)
        summary = ' '.join(summary.split())
    else:
        summary = ""
    
    return scene_num, title, summary

def generate_prompt(scene_num: str, title: str, summary: str) -> str:
    """Generate a prompt using the template."""
    # Use first sentence of summary if it's long; otherwise whole summary
    first_sentence = summary.split('.')[0] + '.' if '.' in summary else summary
    return f"Scene {scene_num}: {title}. {first_sentence} {STYLE_KEYWORDS}"

def main():
    scene_files = sorted(WIKI_DIR.glob("Scene-*.md"))
    if not scene_files:
        print("No Scene-*.md files found.", file=sys.stderr)
        sys.exit(1)
    
    rows = []
    for path in scene_files:
        info = extract_scene_info(path)
        if info is None:
            continue
        scene_num, title, summary = info
        prompt = generate_prompt(scene_num, title, summary)
        rows.append([scene_num, title, summary, prompt])
    
    # Output CSV to stdout
    writer = csv.writer(sys.stdout)
    writer.writerow(["scene", "title", "summary", "prompt"])
    writer.writerows(rows)
    
    # Also write a human-readable checklist to a file
    checklist_path = WIKI_DIR / "scene-summary-checklist.md"
    with open(checklist_path, 'w', encoding='utf-8') as f:
        f.write("# Scene Summary Checklist\n\n")
        f.write("Use this list to verify each scene's summary and generate prompts.\n\n")
        for scene_num, title, summary, prompt in rows:
            f.write(f"## Scene {scene_num}: {title}\n")
            f.write(f"**Summary:** {summary}\n")
            f.write(f"**Prompt:** `{prompt}`\n")
            f.write(f"**File:** `scene-{scene_num}-{title.lower().replace(' ', '-').replace('.', '')}.jpg`\n")
            f.write("\n---\n\n")
    
    print(f"\n✅ Extracted {len(rows)} scenes.", file=sys.stderr)
    print(f"✅ Checklist written to {checklist_path}", file=sys.stderr)

if __name__ == "__main__":
    main()