# Scene Illustration Prompt Template

This template generates consistent **Ink and Wash Medieval** style images for each scene, optimized for black‑and‑white printing.

## Style Keywords (include in every prompt)

```
Ink and Wash Medieval, line‑heavy ink drawing, parchment texture, black and white, grayscale, high contrast, suitable for monochrome printing, 16:9 landscape, no text, no watermark, medieval manuscript illustration style, cross‑hatching, wash shading, subtle paper grain, aged paper feel.
```

## Character Consistency

Refer to these descriptions to maintain visual continuity:

- **Chanticleer**: rooster with bright red comb, slender legs, proud posture, detailed feather texture.
- **Dame Partlet (Pertelote)**: hen with softer feather texture, attentive posture.
- **Widow**: elderly woman in humble, worn medieval clothing, simple head covering.
- **Cottage**: small, timber‑frame, thatched roof, smoke from chimney.
- **Yard**: dry, dusty enclosure with wooden fence, sparse vegetation.
- **Fox**: sly expression, bushy tail, lurking posture.
- **Chaucer**: bearded man in medieval traveler’s attire, riding a lean horse.
- **Host**: plain clothing, standing posture.

## Prompt Structure

```
Scene {number}: {title}. {description} Ink and Wash Medieval style, line‑heavy ink drawing on parchment texture, black and white, grayscale, high contrast, suitable for monochrome printing, 16:9 landscape, medieval manuscript illustration, cross‑hatching, wash shading, no text, no watermark.
```

### Example (Scene 00)

```
Scene 0: Chaucer and the Host. The host and Chaucer are talking to each other while Chaucer was riding an old lean, bony, and sorry horse but that does not hinder him from telling him a merry story. Ink and Wash Medieval style, line‑heavy ink drawing on parchment texture, black and white, grayscale, high contrast, suitable for monochrome printing, 16:9 landscape, medieval manuscript illustration, cross‑hatching, wash shading, no text, no watermark.
```

## File Naming Convention

Save generated images as:

```
scene-{NN}-{slug}.jpg
```

Where:
- `{NN}`: two‑digit scene number (00, 01, …, 34).
- `{slug}`: short lowercase dash‑separated identifier (e.g., `chaucer‑host`, `widow‑cottage`).

Example: `scene-00-chaucer-host.jpg`

## Asset Location

Place all scene images in:

```
wiki/assets/scenes/
```

## Generation Log

Record each generation in `wiki/scene‑images‑log.md` with:

- Timestamp (ISO)
- Scene number
- Prompt snippet (first 50 chars)
- File name
- Notes (style match, issues, re‑generation needed)

## Quality Guardrails

- **Avoid anachronisms**: no modern objects, clothing, or architecture.
- **Maintain grayscale**: ensure image is black‑and‑white/grayscale; no color dominance.
- **Clear line work**: ink lines should be distinct, not muddy.
- **Consistent character depictions**: refer to the character sheet above.
- **Ink wash texture**: visible wash shading, not flat digital shading.

## Usage

1. For each scene (00‑34), extract the **title** and **description** from `wiki/Scene-{NN}.md` (the “Summary” section).
2. Fill the template.
3. Generate image via ChatGPT/DALL‑E (or other GPT‑based image generator).
4. Save file with correct naming.
5. Log entry.

---

*This template ensures visual coherence across all 35 scenes and aligns with the black‑and‑white picture‑book printing goal.*