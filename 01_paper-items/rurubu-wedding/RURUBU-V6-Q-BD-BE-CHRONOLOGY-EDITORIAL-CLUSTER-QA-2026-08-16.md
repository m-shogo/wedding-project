# Rurubu WEDDING V6 — Q / BD / BE chronology editorial cluster QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
State: `Q_BD_BE_PREFERRED / VERIFIED_LOCAL / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`

## Live authority before work

- GitHub main observed before durable write: `1fe8b371a425b7e3cc96009324b5b8720618856e`
- Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
- prior preferred: Outer Q `1426:2`, Profile/Q&A BD `1430:2`, Story/chronology BC `1420:2`
- Drive V6 root readback: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
- V7 remained HOLD.

At run start the shared system, Rurubu feed, neutral non-Rurubu feed, current Rurubu evidence, live Figma, Drive root and GitHub main were re-read. No non-Rurubu item-specific Figma/Drive/ledger/path was inspected.

## Visible problem

BC chronology had a strong full-width travel flatlay hero and a clear WEDDING endpoint, but the middle `01–05` field still read as sparse coordinates scattered over a large cream area. At whole-item scale the chronology was legible, yet the milestone field felt closer to a layout diagram than a Japanese travel-magazine feature.

## Root-cause hypothesis

The problem was not missing imagery. It was insufficient **editorial grouping and scale contrast** inside the milestone field. If major milestones become larger native number anchors, minor milestones remain compact, and only a small number of rules bind those groups, the page can become denser and more magazine-like without introducing cards, shadows, gradients, generated decoration, or baked copy.

## Bounded rollback-safe test

Source: BC `1420:2`.

Created:

- BE `1433:2 / V6_INSIDE_BE_CHRONOLOGY_EDITORIAL_CLUSTER_2026_08_16`

Story page remained unchanged from BC after an initial prototype mistake was detected and fully restored from the live BC source.

Chronology-only changes:

- `01`, `03`, `05` promoted to stronger native number anchors;
- `02`, `04` retained as smaller support milestones;
- date/title/copy blocks tightened around those anchors;
- three existing replaceable event photos reorganized into a deliberate lower diagonal rhythm;
- two thin functional editorial rules added above the milestone groups: magenta and cyan;
- WEDDING endpoint preserved unchanged;
- full-width hero and support-photo roles preserved;
- all event facts remain native/editable text;
- no new raster, card, shadow, gradient, sticker, or generated decoration was added.

## Failure / correction evidence

The first BE prototype exposed two concrete errors and was not adopted:

1. a generic `TEXT / TITLE` lookup accidentally changed the Story-side title instead of only the chronology title;
2. enlarged milestone numerals wrapped because their original text boxes were too narrow.

Correction:

- Story geometry/style was restored from BC node-for-node;
- chronology lookup was scoped to the event-number parent frame;
- large number boxes were widened;
- remaining text overlaps were detected structurally and corrected;
- event 05 text was pulled inside the 18 px safe-area boundary.

No failed state was promoted.

## Three-scale evidence

Reviewed after correction:

- whole spread / thumbnail: `500 px` — PASS and stronger than BC;
- reading scale: `1400×990` spread — PASS;
- actual chronology page: `794×1123` — PASS.

Actual-size reading path:

`hero + native title → 01/03/05 major anchors → 02/04 support anchors → lower photo rhythm → WEDDING endpoint`.

## Final structure readback

BE Story page:

- visible native text: `11`
- replaceable IMAGE roles: `3`
- text/text collision: `0`
- 18 px text safe-area risks: `0`

BE chronology page:

- visible native text: `32`
- replaceable IMAGE roles: `6`
- text/text collision: `0`
- 18 px text safe-area risks: `0`

Photo hashes/roles remain the same verified BC set; this pass changed composition, not source authority.

## Promotion

Live Figma after readback:

- Outer Q `1426:2` — preferred, unchanged
- Profile/Q&A BD `1430:2` — preferred, unchanged
- Story/chronology BE `1433:2` — preferred
- BC `1420:2` — hidden rollback
- Start Here `845:27`: `V5 FU/FX · V6 Q + BD/BE INSIDE STUDIES · V7 HOLD`

## Drive / generated-master truth

Fresh Drive root readback confirms generated section masters still exist, including:

- Timeline V1 `1KzAiPYc3HrvUL75Kkv9cPcAN2blQt8MV`
- Profile V1 `1MfLObNcvsWhQ8nQqgZHeFiDBdjPzj1w8`
- Q&A V1 `1M4X4ELmau3_GrCDb6n72xv13R_CszDKR`
- Memories V1 `1WhO8iIIx1G9oAxU5-lWSnBEHx_AQpZe0`

This pass:

- new generation: `0`
- new Drive write: `0`
- new external binary placement: `0`
- generated section decoration adopted: `0`
- existing verified photo hashes reused: `YES`
- native editable text preserved: `YES`
- replaceable photo roles preserved: `YES`
- rollback preserved: `YES`
- V7 touched: `NO`

Known unchanged binary-submit failure fingerprint was not retried.

## Decision

`Q + BD/BE = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

BE is preferred over BC because it retains BC's photo-led opening and endpoint while giving the middle chronology a clearer major/minor editorial hierarchy at thumbnail and actual size.
