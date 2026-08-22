# Rurubu WEDDING V8 — AW Profile/Q&A Interview Rail QA

Date: 2026-08-22
Scope: Rurubu WEDDING only

## Authority re-read before write

- GitHub main: `0d0b94411db515856e98326d4a46cee2ab500675`
- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
- V6 frozen control: `JC + IX + JB + IZ + IT + JA`
- V8 before this change: `AV + AK + AL + AQ + AS + AT`
- target current before change: Profile/Q&A AK `2238:2`
- all non-target current roots preserved

## Professional critique

AK's Q&A was already answer-led and structurally clean, but Q2 alone moved right relative to Q1/Q3. That spatial irregularity did not express a different semantic role; it behaved like design variation added for its own sake.

Fresh Eye Magazine editorial research was translated into a local hypothesis: interview personality should be carried primarily by the actual voice/pull-quote hierarchy and pacing; recurring question furniture should stay disciplined unless content justifies breaking the rail.

## Rollback-safe study

Created AW study `2278:2` from AK and changed only the Q2 horizontal rail:

- Q2 label aligned with Q1/Q3 labels;
- Q2 prompt aligned with Q1/Q3 prompts;
- Q2 answer aligned with the shared answer rail;
- Q2 answer size and vertical position preserved;
- left profile page unchanged;
- no image, card, rule, badge, gradient, shadow or decorative English added.

## Visual QA before promotion

AW screenshot review:
- 500px whole spread: PASS
- 1400px reading scale: PASS
- 1587×1123 actual size: PASS

Observed improvement:
- Q&A reads as one coherent interview system;
- Q2 no longer looks deliberately displaced for visual novelty;
- answer wording and size remain the personality carrier;
- quiet-book pacing is preserved without reverting to equal-card grammar.

## Structural QA

Before promotion:
- native text: `23`
- IMAGE: `0`
- text intersections: `0`
- 18px safe risk: `0`
- parent page: `2052:2`

After promotion:
- AW `2278:2` visible current
- plugin-local position: `1800,8500`
- parent page: `2052:2`
- native text: `23`
- IMAGE: `0`
- text intersections: `0`
- 18px safe risk: `0`

Rollback:
- AK `2238:2` hidden
- no deletion

## Figma failure caught safely

The first promotion attempt intentionally guarded the current node position but used coordinates previously observed through metadata. Metadata showed a different coordinate context than Plugin API `node.x/node.y`, so the guard aborted with no mutation.

Method switch:
- read AK/AW coordinates through Plugin API;
- use Plugin API-local `1800,8500` as the coordinate-sensitive write guard;
- promote AW;
- read back current/rollback IDs, parent, visibility and coordinates.

No repeated unsafe attempt was made.

Learning:
`docs/design-learning/rurubu-shared-learning-feed.append/2026-08-22-rsl-225-226-interview-rail-and-figma-coordinate-boundary.md`

## Asset truth

- new image generation: `0`
- new Drive master: `0`
- new Figma IMAGE placement: `0`
- V6/V7 image reuse: `0`
- native variable text preserved: YES

## Verdict

`AW_PROFILE_QA_PREFERRED / THREE_SCALE_PASS / STRUCTURE_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

This is a bounded editorial-typography improvement. It does not change the global V6 vs V8 photography verdict.