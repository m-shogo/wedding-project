# Rurubu WEDDING V8 — Story/Chronology typographic-essay pass

Date: 2026-08-21
Scope: Rurubu WEDDING only
State: `VERIFIED_LOCAL / CURRENT_V8_STORY_ROOT_PROMOTED / NOT_FINAL_WINNER / NOT_PRINT_READY`

## Why this pass existed

The current V8 Story/Chronology spread still contained three large flat color rectangles named as photo roles even though no legitimate Story-specific V8 image master existed. At whole-spread scale those blocks read as unresolved template slots, contradicting the existing anti-AI learning that a serious editorial comparison should not preserve fake image grammar merely to simulate completeness.

The goal of this pass was not to fabricate photography. It was to test whether Story could perform a deliberately quiet, typography-led opening role while Chronology remained the factual timeline page.

## New professional research applied

New/deeper research in this pass focused on Japanese composition rather than repeating the previous grid/photobook sources.

- W3C `Requirements for Japanese Text Layout` / JLREQ: Japanese publication quality depends on the relationship of Japanese characters, Latin characters, numerals and punctuation, and on page/illustration/heading treatment as part of hanmen design.
- Adobe InDesign 2026 Japanese composition guidance: Kinsoku prevents prohibited line-start/line-end characters; Mojikumi controls spacing relationships among Japanese text, Roman text, numerals and punctuation rather than treating Japanese spacing as Western tracking.

Local hypothesis: in a text-led Japanese spread, professionalism comes from controlled line endings, mixed-script rhythm, asymmetrical measure and sequence role—not from replacing absent photography with decorative containers.

## Live Figma change

File: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `07_RURUBU_V7_V8_PRO_STUDIES`

Previous Story root:
- `2163:22`
- previous name: `V8 CLEANROOM F / BOOK EDITION / STORY+CHRONOLOGY / GRID+PACING / 2026-08-21`
- now preserved hidden as rollback at `x=5400 / y=3200`
- rollback name explicitly marks the fake-photo-slot version

New current Story root:
- `2171:2`
- name: `V8 CLEANROOM F / BOOK EDITION / STORY+CHRONOLOGY / TYPOGRAPHIC ESSAY / CURRENT / 2026-08-21`
- placed in the current six-role row at `x=1800 / y=3200`

### Left-page editorial correction

The three unverified flat photo slots and their dependent captions were hidden rather than falsely promoted as imagery.

A new native-text essay structure was added:
- small red editorial anchor rule;
- pull quote: `同じ景色を何度も見て、それが、ふたりの景色になった。`;
- two unequal prose measures to avoid a repeated card/grid rhythm;
- closing transition: `出会いから、今日まで。` plus short reader-facing prose.

The right Chronology page was intentionally preserved so the spread now has theme + variation: emotional opening essay on the left, factual time structure on the right.

All new copy remains native editable Figma text. No variable user content was baked into a raster.

## Three-scale and structure QA

Screenshots were re-read at:
- whole-item thumbnail: 500px max dimension;
- reading scale: 1400px max dimension;
- natural/actual spread: 1588 × 1123 render against 1587 × 1123 canvas.

Final structural readback on `2171:2`:
- visible native text: `25`
- text intersections: `0`
- 18px safe-area risks: `0`
- visible old fake photo slots `L_PHOTO_1/2/3`: `0`
- visible internal design/schema language fingerprint: `0`
- whole-page flattening: `0`

## Professional critique

### Art director
PASS for a bounded study improvement. The spread now has a defensible idea: Story is an emotional pause before the factual chronology, rather than a placeholder photo gallery.

### Editorial designer
PASS locally. Reading order is headline → intro → pull quote → two prose measures → closing line, then chronological structure across the gutter.

### Book designer
PASS locally. This adds a deliberately quiet beat to V8 instead of forcing equal visual density across every spread.

### Typographer
PASS for current dummy copy. Mixed Japanese/Latin/numeral material remains native; no accidental text collisions were found. Final mojikumi/kinsoku must still be rechecked when real copy replaces dummy text.

### Photo editor
NEUTRAL rather than PASS. No semantically wrong image was inserted. This spread still lacks legitimate destination-specific photography; that is now an honest content gap rather than a fake slot.

### Print designer
STRUCTURAL PASS only. Safe-area geometry passed, but printer template, bleed/trim/fold, export/preflight, effective PPI and physical proof remain separate gates.

## Asset truth

This pass performed:
- new image-model generations: `0`
- new Drive masters: `0`
- new Figma image placements: `0`
- V6 image hashes reused: `0`
- unrelated image substituted into Story: `0`

This is not counted as success for the generation → Drive → Figma pipeline. The environment available in this run did not expose a free image-generation route that could create a role-valid new Story master and close Drive storage safely. Instead of ending at a blocked fake photo slot, the design method switched to a legitimate typography-led sequence solution and preserved the need for future role-specific imagery as a separate asset task.

## Decision

Promote `2171:2` as the current V8 Story/Chronology study root. Preserve `2163:22` hidden as rollback.

Do not promote V8 globally over V6/V7 yet.

## Next highest-value work

1. Keep `2171:2` as the honest current Story root unless a genuinely role-valid new image clearly beats the typographic version.
2. When image generation is available, create Story-specific candidates from a role brief rather than generic travel photography; close generation → Drive master → Drive ID → Figma placement → crop/hash → three-scale QA.
3. Use final Japanese copy to run a deliberate mojikumi/kinsoku line-ending pass, not only collision detection.
4. Re-run all-six V6/V7/V8 comparison after Story receives either a verified role-valid visual or a final decision to remain deliberately text-led.
