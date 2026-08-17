# RSL-070 — Bind major photo milestones; name secondary rails explicitly

Date: 2026-08-17
Source scope/item: Rurubu WEDDING / V6 chronology
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

CO had already separated major photo events from minor notes, but Event 03 was still split into a photograph plus detached native copy while Events 01/05 were integrated photo+copy beats. Event 02/04 also sat in a pale supporting rail without an explicit editorial role, so that rail could read as leftover space.

## Root-cause hypothesis

A photo-led editorial chronology becomes more coherent when:

- major milestones bind their native number/date/title/copy directly to the photograph that carries the event;
- minor milestones are grouped into one clearly named supporting rail instead of appearing as loose leftovers;
- hierarchy is solved through role binding and reading order before adding cards, badges, or new decorative assets.

## Bounded test

Rollback-safe CQ `1569:2` was cloned from CO `1566:2`.

- Event 03 photo source/hash was preserved;
- Event 03 native number/date/title/copy moved onto the existing photograph;
- Event 02/04 stayed native text on the existing bounded texture rail;
- one native label `寄り道メモ / 02・04` clarified the rail's editorial role;
- no new external asset, generated image, Drive save, card, shadow, gradient, or image hash was introduced.

Two failures were corrected before adoption:

1. Event 03 title/copy initially fell behind Event 05 due to overlap/z-order — corrected by moving the copy fully within Event 03's photo region.
2. Event 03 number/date then overlapped by 6px — corrected and QA rerun.

## Expected improvement

- make Event 03 read at the same editorial level as Event 01/05 without making all milestones geometrically identical;
- make Event 02/04 intentional quiet notes rather than empty-space residue;
- preserve native text and replaceable images while increasing travel-magazine reading rhythm.

## Regression risk

- text over photography can lose contrast or become covered by later overlapping images;
- explicit rail labels can become unnecessary metadata clutter;
- forcing every event to use the same photo-overlay treatment would recreate a repetitive template.

## Three-scale evidence

- whole spread 500px: PASS and stronger than CO;
- reading scale ~1000px: PASS;
- chronology actual size `1569:27` = `794×1123`: PASS;
- native text collisions `0` after correction;
- 18px text safe-area risks `0`;
- visible text overflow `0`.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- preferred CQ: `1569:2`;
- chronology page: `1569:27`;
- hidden rollback CO: `1566:2`;
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CP-CQ-EVENT03-BINDING-QA-2026-08-17.md`.

## Adopted / rejected / blocked status

`VERIFIED_LOCAL`: adopted in CQ after two bounded corrections. No external binary transport or generated-asset adoption was involved.

## What must remain Rurubu-specific

Do not transfer:

- the exact chronology layout;
- `寄り道メモ` wording;
- magenta/cyan/yellow/navy palette;
- photo choices/crops;
- Event 01/03/05 hierarchy;
- Japanese travel-magazine art direction.

## Cross-item applicability hypothesis

On another print artifact with a photo-led sequence, independently test whether a visually important image and its related native copy should be treated as one editorial beat, and whether quiet secondary information needs an explicit semantic rail. Do not copy this layout; transfer only the binding test.

## Next receiving-item experiment

Use this hypothesis only when a different artifact visibly shows a photo and its explanatory text behaving as separate modules or a secondary information strip reading as accidental empty space. If photo-overlay contrast or editability degrades, reject the transfer.
