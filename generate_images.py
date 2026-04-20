#!/usr/bin/env python3
import os
import re
import time
import requests
from pathlib import Path

api_key = os.environ.get("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY environment variable not set")

OUTPUT_DIR = Path("wiki/assets/scenes")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

STYLE_KEYWORDS = (
    "Ink and Wash Medieval style, line‑heavy ink drawing on parchment texture, "
    "black and white, grayscale, high contrast, suitable for monochrome printing, "
    "16:9 landscape, medieval manuscript illustration, cross‑hatching, wash shading, "
    "no text, no watermark."
)

def extract_scene_info(path):
    text = path.read_text(encoding='utf-8')
    
    stem = path.stem
    match = re.search(r'Scene-(\d+)', stem)
    if not match:
        return None
    scene_num = match.group(1).zfill(2)
    
    title_match = re.search(r'^# Scene \d+\s*\n+(.*?)$', text, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else ""
    
    summary_match = re.search(r'## Summary\s*\n+(.*?)(?=\n##|\Z)', text, re.DOTALL)
    if summary_match:
        summary = summary_match.group(1).strip()
        summary = re.sub(r'\*\*|\*|`', '', summary)
        summary = ' '.join(summary.split())
    else:
        summary = ""
    
    return scene_num, title, summary

def generate_prompt(scene_num, title, summary):
    first_sentence = summary.split('.')[0] + '.' if '.' in summary else summary
    return f"Scene {scene_num}: {title}. {first_sentence} {STYLE_KEYWORDS}"

def extract_prompts():
    wiki_dir = Path("wiki")
    scene_files = sorted(wiki_dir.glob("Scene-*.md"))
    if not scene_files:
        raise FileNotFoundError("No Scene-*.md files found")
    
    prompts = []
    for path in scene_files:
        info = extract_scene_info(path)
        if info is None:
            continue
        scene_num, title, summary = info
        prompt = generate_prompt(scene_num, title, summary)
        prompts.append((int(scene_num), prompt))
    
    return sorted(prompts, key=lambda x: x[0])

def generate_image(prompt, scene_num):
    url = "https://api.openai.com/v1/images/generations"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "dall-e-3",
        "prompt": prompt,
        "size": "1792x1024",
        "quality": "standard",
        "style": "natural",
        "n": 1
    }
    
    print(f"Generating image for Scene {scene_num:02d}...")
    
    try:
        response = requests.post(url, headers=headers, json=data, timeout=120)
        response.raise_for_status()
        result = response.json()
        
        image_url = result['data'][0]['url']
        
        img_response = requests.get(image_url, timeout=120)
        img_response.raise_for_status()
        
        filename = OUTPUT_DIR / f"scene-{scene_num:02d}.jpg"
        with open(filename, 'wb') as f:
            f.write(img_response.content)
        
        print(f"  Saved to {filename}")
        return filename
        
    except Exception as e:
        print(f"  Error: {e}")
        return None

def main():
    print("Generating Canterbury Tales scene illustrations")
    print(f"Output directory: {OUTPUT_DIR}")
    
    prompts = extract_prompts()
    if not prompts:
        print("No prompts found.")
        return
    
    print(f"Found {len(prompts)} scenes to generate.")
    
    successful = 0
    for scene_num, prompt in prompts:
        output_file = OUTPUT_DIR / f"scene-{scene_num:02d}.jpg"
        if output_file.exists():
            print(f"Scene {scene_num:02d} already exists. Skipping.")
            successful += 1
            continue
        
        result = generate_image(prompt, scene_num)
        if result:
            successful += 1
        
        time.sleep(10)
    
    print(f"Generated {successful}/{len(prompts)} images")

if __name__ == "__main__":
    main()