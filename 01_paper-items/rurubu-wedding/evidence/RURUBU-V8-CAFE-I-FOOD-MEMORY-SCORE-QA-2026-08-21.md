# Rurubu WEDDING V8 — Cafe I Food-Memory Score QA

Date: 2026-08-21
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current candidate: `2178:2`
Previous rollback: `2164:53`
Scope: Rurubu WEDDING only

## Visible problem

The prior V8 Cafe/Table used generated role `2164:57` / Drive `1aqjC7cMXymK7r5MqABiNHjL207OY3XKP`. At spread scale it read as a schematic plate/menu composition rather than destination/sensory food photography or an independently meaningful editorial image. The image was technically legitimate provenance, but its editorial contribution was weaker than its visual mass.

## New professional research used

The Gourmand's editorial/art-direction practice treats image-making as its own contribution to a food story, not merely illustration attached to text. David Lane has described the magazine's imagery as needing its own idea and as something that should add to the text while the text adds to the imagery. This was used as a criterion for semantic ownership, not as permission to copy The Gourmand's layouts.

Neutral cross-scope learning was also consumed only as a hypothesis: changing palette/material without changing the composition skeleton can preserve template feeling. No non-Rurubu layout, palette, asset or production state was copied.

## Root-cause hypothesis

The defect was **schematic image-shaped mass without a sufficiently specific food/place/sensory idea**. Keeping it because it was already generated would reward transport success rather than editorial quality. Replacing it with unrelated photography would be equally weak.

## Bounded test

1. Duplicate current Cafe/Table `2164:53` to rollback-safe candidate `2178:2`.
2. Hide only the generated TABLE_ESSAY image.
3. Preserve existing factual/sensory text; invent no dish, restaurant, price or menu facts.
4. Build a materially different skeleton:
   - left page as a sensory score from existing phrases `カップの音 / 窓の光 / 次の店を決める会話`;
   - functional horizontal rule and the existing close `何気ないひと休みまで、今日の味になる。`;
   - right page as a quieter dinner score using existing copy `料理、皿、手元、店の空気` and `一皿ずつ分け合いながら。夜の横浜を、ゆっくり味わう。`.
5. Remove/reduce decorative English rather than using it to simulate editorial density.
6. Preserve former Cafe/Table F `2164:53` as hidden rollback at `x=7200 / y=4550`; promote I to live comparison position `x=1800 / y=4550`.

## Three-scale QA

### Whole-item / thumbnail — 500px

PASS.

The left page has a clear sensory rhythm, and the right page reads as a different night/dinner tempo rather than a repeated module grid. The large empty areas are interrupted by purposeful text beats and section indices, not generic luxury spacing alone.

### Reading scale — 1400px

PASS.

The headline, sensory sequence, dinner material list and closing phrase remain distinct. No dashboard cards, rounded modules or fake photo slot remains.

### Actual size — 1588×1123

PASS.

Small labels and folios remain readable, the long Japanese lines remain controlled, and the right-page quietness reads as pacing rather than an unfinished image placeholder.

## Structural readback

- visible native text: `13`
- visible IMAGE fill nodes: `0`
- same-parent text intersections: `0`
- 18px safe-area risks: `0`
- visible internal/process-language fingerprints: `0`
- whole-page flattening: `0`

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new Figma image placement: `0`
- V6/V7 image reuse: `0`
- previous V8 generated TABLE_ESSAY master: preserved only in hidden rollback/history, not claimed by current Cafe I

This pass does **not** claim generation → Drive → Figma closure. A future genuinely role-valid food/destination image should still be compared against I. The current decision only rejects the idea that a previously generated schematic image must remain visible because it was successfully transported.

## Result

`2178:2` promoted to current V8 Cafe/Table.

State: `DESIGN_QA_PASS / VERIFIED_LOCAL / NOT_GLOBAL_WINNER / NOT_PRINT_READY`.

## Learning

`RSL-190 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Failure fingerprint: `F-RSL-190-FOOD-IMAGE-AS-SCHEMATIC-PLACEHOLDER-WITHOUT-INDEPENDENT-EDITORIAL-IDEA`

Transferable hypothesis: in food/editorial work, an image should carry a specific sensory, documentary, place or conceptual idea. If a schematic generated visual has no such ownership, test a different native editorial skeleton or a genuinely role-specific replacement rather than preserving generic image mass.

Must remain Rurubu-specific: exact headline/copy, 04/夜 composition, type scale, colors, coordinates, pacing and V8 current-state declaration.
