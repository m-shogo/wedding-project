# Rurubu WEDDING V6 — T + BG/BH chronology QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Result

`BH_PROMOTED / OUTER_T_AND_BG_UNCHANGED / OUTER_U_REJECTED_AS_MARGINAL / V7_HOLD / NOT_PRINT_READY`

Preferred live state after this run:

- Outer T `1447:2 / PREFERRED / V6_OUTER_T_PHOTO_LED_BACK_COVER_2026_08_16`
- Profile/Q&A BG `1439:58 / PREFERRED / V6_INSIDE_BG_QA_EDITORIAL_BEATS_2026_08_16`
- Story/chronology BH `1451:2 / PREFERRED / V6_INSIDE_BH_PHOTO_EVENT_INTEGRATED_CHRONOLOGY_2026_08_16`
- Start Here `845:27`: `V5 FU/FX · V6 T + BG/BH INSIDE STUDIES · V7 HOLD`

BE `1433:2` is preserved hidden as rollback. Outer U `1455:2` was a bounded comparison and is hidden because it did not materially outperform T.

## Visible problem

BE had already removed the old card-grid chronology, but its lower chronology still read as two systems: event text occupied the central cream field while the three event photographs sat mainly as a separate lower strip. At thumbnail scale this preserved a timeline/infographic feeling instead of making the milestones feel like a travel-magazine photo story.

## Root-cause hypothesis

The next improvement should not add more cards, badges, shadows, route diagrams, or generated decoration. The event copy and a few strong replaceable photos should be composed as the same editorial beats: major events 01/03/05 paired spatially with photography, minor events 02/04 acting as compact bridges, and the existing WEDDING band remaining the terminal destination.

## Bounded test

Created BH from BE as a rollback-safe duplicate. Story page was left unchanged. Only the chronology page changed.

BH lower chronology:

- event 01 retained as a major beat and is paired with a larger waterfront photo `350×190`;
- event 02 is compressed as a text-only support beat below 01;
- event 03 remains major and is attached to the small Yokohama photo, corrected to `238×148` after a first-pass width of `250` exceeded the registered `240×220` source width;
- event 04 is a compact support beat beside the event-03 photo rather than another equal module;
- event 05 remains major and is paired with a wide dining/photo-memory field `410×155`;
- event 06 / `2026.10.24 WEDDING` remains the existing full-width navy terminal band;
- no new generated asset, card, gradient, shadow, sticker, or Figma decorative micro-geometry was added;
- all chronology facts remain native editable Figma text;
- all visible photographs remain replaceable IMAGE roles using existing verified Rurubu image hashes.

## Three-scale evidence

### Whole spread / thumbnail

BE and BH were compared at `500px` renders from native `1587.4×1122.5`.

BH: PASS and preferred. The lower chronology now reads as a left-to-right/upper-to-lower sequence of text-plus-photo beats rather than text grid plus detached photo strip. 01/03/05 remain visibly dominant while 02/04 are subordinate.

### Reading scale

BH `1451:2` at `1200px`: PASS. Story remains unchanged from BE, and chronology maintains a clear route from the feature hero through 01–05 to the WEDDING band.

### Actual size

Chronology page `1451:21` at native `794×1123`: PASS.

Final structure readback:

- visible native text: `31`
- visible replaceable IMAGE roles: `6`
- absolute text/text collisions: `0`
- 18px text safe-area risks: `0`
- small Yokohama source hash `644f449c3bf2001a94d4b822d2b55e2614c11042`: final display `238×148`, within registered `240×220` intrinsic bounds
- event-photo hashes were reused from already verified resident Rurubu roles; no external transport was reopened.

## Outer U comparison

A second rollback-safe test, Outer U `1455:2`, increased major/minor hierarchy in the back-cover chronology without changing imagery. At 500px and 1200px the difference from T was too small to justify a new preferred state. U was therefore marked `COMPARISON_HIDDEN` and T remains preferred.

This prevents version churn from a change that is technically valid but visually marginal.

## Drive readback

Fresh V6 root readback:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
- Profile generated master `1MfLObNcvsWhQ8nQqgZHeFiDBdjPzj1w8`
- Q&A generated master `1M4X4ELmau3_GrCDb6n72xv13R_CszDKR`
- Timeline generated master `1KzAiPYc3HrvUL75Kkv9cPcAN2blQt8MV`
- Memories generated master `1WhO8iIIx1G9oAxU5-lWSnBEHx_AQpZe0`

No generated section master was placed or adopted in this pass. The known unchanged transport fingerprint remains `DRIVE_RAW_MASTER_REACHABLE / FIGMA_SUBMIT_DNS_BLOCKED`; that mechanism was not retried.

## Lifecycle truth

- newly generated images: `0`
- new Drive saves: `0`
- new external binary placement: `0`
- existing verified Figma image hashes reused: `YES`
- native editable copy preserved: `YES`
- replaceable photo roles preserved: `YES`
- screenshot QA: `PASS`
- structure/safe-area QA: `PASS`
- rollback preserved: `YES`
- V7 touched: `NO`

## Decision

BH is `VERIFIED_LOCAL` and promoted over BE. This is dummy-design progress only. V6 remains `NOT_PRINT_READY` until final real photography/copy, exact printer template, bleed/trim/fold checks, PDF preflight and physical proof are completed.