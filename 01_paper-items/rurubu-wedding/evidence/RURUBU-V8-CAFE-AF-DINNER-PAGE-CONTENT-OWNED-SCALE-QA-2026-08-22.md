# RURUBU V8 Cafe/Table AF — Dinner Page Content-Owned Scale QA

Date: 2026-08-22
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Canonical page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Starting GitHub main observed before write: `d4e01d9069e70bfba35549d7af2b0f9185913d4a`

## Authority / preserved controls

- V6 control remains frozen: `JC + IX + JB + IZ + IT + JA`.
- V7 six-role comparison set remains preserved and not preferred.
- Prior V8 Cafe Current: AC `2226:2`.
- AC is preserved as hidden rollback, not overwritten.
- No Passport / Boarding Pass / 青春ふたりきっぷ / ADD production path was inspected or changed.

## Professional research applied

This run deliberately looked beyond the previously used references and treated the publication as a physical sequence rather than a set of isolated Figma frames.

- MoMA's description of Irma Boom's `SHV Think Book 1996–1896` emphasizes that typography, layout, materials, printing and nonlinear navigation were designed as one book system after extensive editorial research.
- D&AD's Donna Payne book-design discussion emphasizes page-turn experience and physicality: strong work succeeds because its concept belongs specifically to the book medium.
- `Designing With Type / Double-Page Spread` frames publication design as a coordinated decision across display type, body type, heads, captions, folios, illustrations and grid placement across a spread.

Rurubu-specific hypothesis: **facing-spread unity should be earned by semantic roles and pacing, not simulated by arbitrary geometric drift.** A quiet spread may remain quiet if each page has a distinct editorial job and scale relationship.

## Visible problem in AC

AC had already improved the left Cafe page through article-owned sensory hierarchy, but the right Dinner page still read slightly like a restrained wireframe:

- `料理、皿、手元、店の空気。` was strong but not sufficiently differentiated from the closing beat;
- `一皿ずつ分け合いながら。` and a short green rule created an intermediate module whose binding function was weak;
- `夜の横浜を、ゆっくり味わう。` was semantically the emotional close but visually underweighted.

The problem was **not** missing decoration. The problem was the right page's hierarchy and page-turn cadence.

## Rejected test — AE `2230:2`

A rollback-safe AE candidate was first created to test a stronger left-to-right sensory progression by progressively shifting left-page lines toward the gutter and enlarging the dinner page.

Result: `REJECTED`.

Why:

- the diagonal movement was not sufficiently owned by content;
- it felt like a graphic-design gesture added to demonstrate 'spread choreography';
- the left closing copy produced an awkward Japanese line break (`何気ないひと休みま / で、 / 今日の味になる。`);
- the spread became more poster-like without improving the reader's understanding.

AE remains hidden as rejected evidence.

## Adopted test — AF `2230:26`

AF returned to AC as the source and changed **only the right Dinner page**:

- preserved the proven left Cafe sensory rhythm unchanged;
- removed the short green `EDITORIAL RULE / DINNER MEMORY` because it did not prove a necessary binding function at whole-spread scale;
- strengthened `料理、皿、手元、店の空気。` to a clearer opening mass;
- kept `一皿ずつ分け合いながら。` as a quieter action line;
- strengthened and repositioned `夜の横浜を、ゆっくり味わう。` as the emotional closing beat;
- added no card, badge, gradient, shadow, decorative English, generated placeholder, or unrelated image.

Promotion state in live Figma:

- AF `2230:26`: `CURRENT`, visible, parent `2052:2`, positioned at the former AC Current location.
- AC `2226:2`: hidden rollback.
- AE `2230:2`: hidden rejected comparison.

## Three-scale QA

AF after promotion:

- whole spread / 500 px: `PASS`
- reading scale / 1000 px: `PASS`
- actual size / 1587×1123: `PASS`

Structural readback:

- visible native text: `13`
- IMAGE fills: `0`
- text intersections: `0`
- 18 px safe-area risks: `0`
- accidental explicit one-character Japanese line candidates: `0`
- parent page: `2052:2`
- variable/factual copy remains native editable text
- no whole-spread flattening

## Six professional critique views

### Art director

PASS locally. The spread has a clearer idea: daytime sensory pause on the left, dinner/ending on the right. The improvement comes from editorial weighting rather than extra styling.

### Editorial designer

PASS. The left sequence remains stable; the right hierarchy is now opening → action → emotional close. The short rule was removed only after checking that it did not bind otherwise disconnected information.

### Book designer

PASS locally. AF improves the facing spread by giving the right page a stronger terminal cadence without forcing a decorative bridge across the gutter.

### Typographer

PASS. Japanese line breaks remain intentional at 500 / 1000 / actual size; the rejected AE demonstrates that forced choreography is stopped when it creates poor semantic wrapping.

### Photo editor

No new photography was adopted. The spread deliberately does not invent a food image role merely to fill space. This remains a limitation versus V6's photographic travel desire.

### Print designer

Structural bounds and 18 px safe checks pass, but this is **not** print-ready. Final printer template, bleed/trim/fold, final copy, effective image resolution where applicable, PDF preflight and physical proof remain separate gates.

## Asset truth

Drive V8 authority re-read:

`1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo / RURUBU_V8_EDITORIAL_MONOGRAPH_2026-08-21`

Existing five masters remain present. This run:

- new image-model generation: `0`
- new Drive master: `0`
- new production Figma image placement: `0`
- V6/V7 image reuse: `0`
- `generation → Drive → Figma` closure: **not claimed**

RSL-208 remains active: the unchanged DNS-blocked `mcp.figma.com` upload-submit path was not repeated merely to consume a run.

## Decision

`AF ADOPTED / AC HIDDEN_ROLLBACK / AE REJECTED_HIDDEN / THREE_SCALE_PASS / STRUCTURE_PASS / VERIFIED_LOCAL / NOT_GLOBAL_WINNER / NOT_PRINT_READY`

V8 remains stronger than earlier V8 studies for book/editorial restraint, while V6 remains stronger for immediate destination-specific photographic desire.