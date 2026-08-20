# RSL-158 — Photo-boundary overlap can turn a split timeline into one editorial sequence

Source scope/item: Rurubu WEDDING / V6 Story + Chronology
Date: 2026-08-20
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

HJ chronology had a strong dominant photographic hero, but its lower page still separated native milestones from the 03 travel photo. The result passed structure checks yet still read partly like a timeline template: text events on the left, one photo module on the right, and a hard hero/cream boundary.

## Root-cause hypothesis

The page did not need more imagery or containment. The existing legitimate replaceable 03 photo could carry more editorial responsibility by crossing the hero/paper boundary, with its native ordinal/title/copy bound directly to the photograph. Unequal major/minor event mass could then create a travel-magazine staircase without a rail/card system.

## Bounded test

Rollback-safe HR `2033:111` from HJ `2024:2`:

- Story page unchanged;
- lower weak composed texture hidden;
- existing 03 photo retained at `350×260` and moved upward across the hero/cream boundary;
- native 03/title/copy bound to that image;
- 01 kept dominant as opening milestone;
- 02 and 04 retained as quiet bridge events;
- 05 repositioned as a separate right-side milestone;
- 06/WEDDING rebuilt as a page-width terminal beat;
- no new card, rail, image source, generated asset, Drive save, binary placement or image hash.

## Expected improvement

One continuous photo-led chronology, reduced module/UI reading, clearer 01 → 03 → 05 → WEDDING hierarchy, and stronger magazine rhythm while preserving native editability and photo replaceability.

## Regression risk

Boundary overlap can create copy/photo collisions, weak contrast or excessive visual crowding. A photo must also remain source-safe; this method must not be used as permission to enlarge a weak raster.

## Three-scale evidence

- 1200px whole spread: PASS; HR preferred over HJ.
- page/reading context: PASS; 03 acts as a bridge between hero and lower chronology.
- actual-size timeline `2033:137 / 794×1123`: PASS.
- visible native text: `28`.
- visible image roles: `2`.
- final text collisions: `0`.
- final 18px text safe-area risks: `0`.
- stray text: `0`.
- 03 photo remains `350×260`; no new hash.

## Failure fingerprint / method change

`FIGMA_TEXT_MUTATION_UNLOADED_FONT`: the first copy-edit attempt tried to mutate `Noto Sans JP Bold` before `figma.loadFontAsync`. Figma rejected the write; live readback confirmed no partial candidate. The method was changed before retry.

The first successful HR geometry also exposed three actual-size text contacts around Events 05/06. Those were corrected before promotion; screenshot acceptance alone was not treated as completion.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted HR: `2033:111`
- timeline right: `2033:137`
- hidden rollback HJ: `2024:2`
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
- QA evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-HR-PHOTO-BOUNDARY-TIMELINE-QA-2026-08-20.md`

## Adopted / rejected status

`VERIFIED_LOCAL`, adopted as preferred HR. HJ preserved hidden for rollback. No generation/Drive/binary lifecycle activity was involved.

## What must remain Rurubu-specific

Exact chronology, Yokohama/travel imagery, photo positions, overlap amount, Japanese copy, magenta/cyan/yellow/navy palette and Rurubu-like editorial grammar.

## Cross-item applicability hypothesis

On a materially different print artifact, if a timeline/story page is structurally valid but still reads as separated text and photo modules, independently test whether an already-legitimate source-safe photo can overlap an internal section boundary and carry its native major-event copy. Compare against the original at whole, reading and actual size. Reject if contrast, chronology clarity, safe area, source fidelity or editability regresses.
