# Rurubu V7 F5 — Story verified-couple evidence / chronology truth QA

Date: 2026-08-25
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Professional research used

New/deeper reference axis for this pass: photographic storytelling, editing and sequencing rather than another typography or color pass.

- International Center of Photography (ICP), `Focus on Photography` picture-story curriculum: context/action/sequence/close-up are different photographic jobs, and sequencing changes what story the viewer reads.
- ICP Karen Marshall interview: individual good photographs do not automatically make a coherent narrative; editing and sequencing are where the story takes shape.
- Magnum contact-sheet practice: adjacent frames reveal how photographers refine subject, light and framing before selecting the final image.

Local hypothesis: a chronology is an especially sensitive narrative context. A photograph placed inside the event rail can be read as evidence for the nearby milestone. Verified subject identity alone is not enough to make that photograph verified event evidence.

## Before — F4 `2427:2`

F4 was structurally sound and had passed earlier three-scale design QA, but three visible photos were structural dummies:

- opening `2427:3` — generic still-life;
- Story secondary `2427:9` — generic street;
- Chronology `2427:22` — generic cafe/food photograph placed inside the milestone area.

The right-side image had no authority tying it to `201x / 202x / 同棲 / 入籍 / WEDDING DAY`. Its proximity risked giving illustrative stock/dummy imagery documentary authority over the relationship timeline.

## Bounded experiment — F5 `2568:2`

Rollback-safe clone from F4. No chronology copy, milestone values, title, palette, typography, fixed display graphic or overall spread dimensions changed.

Changes:

1. Story opening `2568:3` now uses verified real-couple Hawaii `004.jpg` screen evidence, hash `b77012f2eb0a832acfe6fecd883775832ba029c6`.
   - role explicitly says `NOT EVENT-SPECIFIC / NOT FINAL PRINT`;
   - it belongs to the general Story essay, not a dated milestone.
2. Story secondary `2568:9` now uses verified real-couple Hawaii `036.jpg` screen evidence, hash `c80602f1881db70f3a005651f982a0f38b294a9d`.
   - also explicitly not event-specific.
3. Chronology image `2568:22` is hidden and renamed `WITHHELD / UNVERIFIED CHRONOLOGY PHOTO DUMMY / HIDDEN / NO EVENT AUTHORITY`.
4. The chronology remains type-led rather than replacing the removed image with decorative filler.

## Three-scale result

- whole-item / 500px: PASS; F5 reads more immediately as the couple's publication rather than generic lifestyle illustration.
- reading / 1400px: PASS; left Story essay gains real human evidence and the right chronology remains legible without a fake documentary image.
- actual-size / 1587×1123: DESIGN COMPOSITION PASS, but HIRES PHOTO QA remains BLOCKED because current Figma `004/036` are low-resolution screen derivatives.

Structure readback before promotion:

- visible native text: `22`;
- visible image roles: two verified-couple screen derivatives + one fixed display raster;
- text-text intersections: `0`;
- 18px edge risks: `0`;
- Japanese→Inter mismatch: `0`;
- parent: `2052:2`.

Promotion:

- F5 `2568:2` → current at `x=5300 / y=13000`;
- F4 `2427:2` → hidden rollback at `x=300000 / visible=false`.

## Six-view critique

- Art director: PASS — the page idea becomes `relationship story with real subject presence`, not generic travel filler.
- Editorial designer: PASS — Story photos and chronology milestones now have different evidence responsibilities.
- Book designer: PASS — the sequence still alternates photo-led Story and type-led chronology rather than equalizing both pages.
- Typographer: PASS — no type geometry or Japanese line-break regression.
- Photo editor: DESIGN PASS / HIRES BLOCKED — subject truth is better, but screen derivatives are not final print assets and are not event-specific evidence.
- Print designer: BLOCKED for photo detail until high-resolution source placement / effective resolution / proof is verified.

## Learning

New normalized fingerprint:

`F-RSL-275-VERIFIED-SUBJECT-PHOTO-IS-MISTAKEN-FOR-VERIFIED-EVENT-EVIDENCE-BY-CHRONOLOGY-PROXIMITY`

State: `VERIFIED_LOCAL_DESIGN / HIRES-ASSET-BLOCKED → CROSS_ITEM_CANDIDATE`.

Principle: a photo can be verified as the correct people or place and still be unverified for a particular dated event. In chronology/timeline layouts, use proximity and captions carefully: subject-level evidence may support the general story, but event-level placement requires event authority. If event authority does not exist, prefer type-led chronology or clearly separated non-event-specific imagery rather than illustrative filler.

Do NOT transfer V7's blue/coral palette, photo sizes, positions, couple images or chronology composition.

## Truth gates

- `004/036` are real-couple Hawaii screen derivatives, not final high-resolution Figma assets.
- They do not prove any specific milestone.
- The six chronology milestones remain truth-safe dummy/replacement roles pending final real history.
- DESIGN QA is separate from REAL CONTENT, HIRES PHOTO, PRINT TEMPLATE/PREFLIGHT and PHYSICAL PROOF.
