# Rurubu WEDDING V8 — Cafe/Table AC lived-in sensory rhythm QA

Date: 2026-08-22
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current candidate: `2226:2`
Previous current / rollback: `2212:2`
Scope: Rurubu WEDDING only

## Why this changed

Cafe/Table X had already removed the semantically weak historical `TABLE_ESSAY` generated image and preserved clean native text, but the spread still read too much like a polished wireframe: one large title, one even three-line sensory block, one close, and broad neutral whitespace. The structure was correct but the human event of stopping for a cafe and sharing dinner was not producing enough editorial rhythm.

Fresh professional reference used for the hypothesis:

- Apartamento / Omar Sosa, reported by magCulture: the magazine deliberately rejected sterile, over-styled interiors and valued signs of real human occupation and everyday life.
- Apartamento at Here 2016, reported by It's Nice That: the publication explicitly preferred lived-in clutter/life over empty perfection.

This was not copied as surface styling. Rurubu hypothesis: a quiet spread can remain restrained while giving article-owned sensory details unequal emphasis according to their semantic job; the goal is lived presence, not random decoration.

## Rollback-safe experiment

Created AC from current X without editing X in place.

Left page:

- preserved `食べたものより、食卓を覚えている。` as the main editorial premise;
- replaced one evenly weighted three-line block with three native text beats using the exact existing content:
  - `カップの音。` = strong immediate sensory entry;
  - `窓の光。` = quieter middle beat;
  - `次の店を決める会話。` = stronger human/relational close;
- kept the functional divider and existing closing copy;
- no card, badge, shadow, gradient, sticker, decorative English, fake photograph, or invented factual event was added.

Right page:

- preserved the semantic sequence `料理、皿、 / 手元、店の空気。`;
- moved `一皿ずつ分け合いながら。` closer to the semantic headline so the human action belongs to the food/table observation instead of floating as an isolated caption;
- preserved the functional rule and the strong close `夜の横浜を、ゆっくり味わう。`.

## Visual QA

Compared against X before promotion.

- 500px whole-spread / thumbnail: PASS — left page no longer collapses into one generic text block; the three sensory moments remain legible as one sequence.
- 1200px reading scale: PASS — hierarchy is content-owned rather than decorative; no arbitrary color alternation or pseudo-collage was introduced.
- 1587×1123 actual size: PASS — headline, sensory beats, divider and closing text remain optically distinct without collision or weak one-character Japanese wraps.

## Structural QA after promotion

Current AC `2226:2`:

- parent page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
- current position: `x=1800 / y=9850`
- visible native text: `13`
- visible IMAGE roles: `0`
- text intersections: `0`
- 18px safe-area risks: `0`
- one-character explicit Japanese line heuristic: `0`
- variable content remains native editable text
- whole-spread flattening: `0`

Rollback X `2212:2`:

- renamed to `ROLLBACK / V8 CAFE X / EDITORIAL SEMANTIC SEQUENCE / HIDDEN / 2026-08-22`
- hidden at `x=7200 / y=9850`

## Professional critique

- Art director: PASS locally — there is now a clear idea of a lived pause and shared table, not only typographic restraint.
- Editorial designer: PASS — reading order remains clear while semantic beats are no longer equally weighted.
- Book designer: PASS locally — the spread is still a quiet V8 chapter but contains more internal tempo, reducing the repeated type-only skeleton effect.
- Typographer: PASS at current dummy-copy scale — semantic Japanese line breaks and spacing remain controlled.
- Photo editor: NOT APPLICABLE for Current AC — no legitimate role-specific photo is available and no unrelated image was inserted.
- Print designer: DESIGN QA only — final printer template, final copy, effective PPI for future images, PDF preflight and physical proof remain separate gates.

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new Figma image placement: `0`
- V6/V7 image reuse: `0`
- historical `TABLE_ESSAY` remains hidden provenance only and was not re-adopted
- V8 Drive authority folder re-read: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo / RURUBU_V8_EDITORIAL_MONOGRAPH_2026-08-21`

Known Drive→Figma transport blocker `F-RSL-208-MCP-FIGMA-UPLOAD-SUBMIT-DNS-UNRESOLVED-AFTER-DRIVE-RAW-READ` was not retried because no material network/capability change was observed.

## Decision

`AC 2226:2 = VERIFIED_LOCAL / CAFE_CURRENT`

AC is locally stronger than X for human/editorial presence without adding synthetic imagery or arbitrary decoration. This does not make V8 the global winner and does not make the publication print-ready.
