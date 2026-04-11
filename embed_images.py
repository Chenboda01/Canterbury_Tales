#!/usr/bin/env python3
import re
from pathlib import Path

def extract_summary(content):
    summary_match = re.search(r'## Summary\s*\n+(.*?)(?=\n##|\Z)', content, re.DOTALL)
    if summary_match:
        summary = summary_match.group(1).strip()
        summary = re.sub(r'\*\*|\*|`', '', summary)
        summary = ' '.join(summary.split())
        return summary
    return ""

def extract_title(content):
    title_match = re.search(r'^# Scene \d+\s*\n+(.*?)$', content, re.MULTILINE)
    if title_match:
        return title_match.group(1).strip()
    return ""

def add_image_embed(filepath, image_path, summary, scene_num):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '![' in content and 'assets/scenes/' in content:
        print(f"  Image already embedded in {filepath.name}")
        return False
    
    title = extract_title(content)
    if not title:
        title = f"Scene {scene_num}"
    
    caption = summary.split('.')[0] + '.' if '.' in summary else summary
    image_markdown = f'\n![Scene {scene_num}: {title}]({image_path})\n*{caption}*\n'
    
    lines = content.splitlines(keepends=True)
    new_lines = []
    
    inserted = False
    for i, line in enumerate(lines):
        new_lines.append(line)
        if line.startswith('# Scene ') and not inserted:
            new_lines.append(image_markdown)
            inserted = True
    
    if not inserted:
        new_lines.insert(1, image_markdown)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(''.join(new_lines))
    
    return True

def main():
    wiki_dir = Path("wiki")
    scene_files = sorted(wiki_dir.glob("Scene-*.md"))
    
    if not scene_files:
        print("No Scene-*.md files found.")
        return
    
    print(f"Found {len(scene_files)} scene files.")
    
    embedded_count = 0
    for scene_file in scene_files:
        match = re.search(r'Scene-(\d+)', scene_file.stem)
        if not match:
            continue
        
        scene_num = int(match.group(1))
        image_file = wiki_dir / "assets" / "scenes" / f"scene-{scene_num:02d}.jpg"
        
        if not image_file.exists():
            print(f"  Image not found for Scene {scene_num:02d}: {image_file}")
            continue
        
        with open(scene_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        summary = extract_summary(content)
        image_path = f"assets/scenes/scene-{scene_num:02d}.jpg"
        
        if add_image_embed(scene_file, image_path, summary, scene_num):
            print(f"  Embedded image in {scene_file.name}")
            embedded_count += 1
    
    print(f"Embedded images in {embedded_count} scene files.")

if __name__ == "__main__":
    main()