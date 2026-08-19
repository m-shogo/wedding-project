# RSL-123 — A typographic opening beat can replace a nonessential repeated support photo

Source scope/item: Rurubu WEDDING / V6 1DAY Plan
Date: 2026-08-19
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A travel-itinerary page had four sequential stops, each carrying its own photo role. STOP01's small skyline photograph was semantically valid but nonessential: the spread already had a dominant destination photograph, and the same skyline source was repeated elsewhere in the Rurubu photo pool. At whole-item scale the four photo-attached stops still read slightly like equal itinerary modules.

## Root-cause hypothesis

Photo repetition is not only an asset-diversity problem. When every repeated information beat is given a photo regardless of editorial responsibility, the page can become modular even if the photographs are individually valid. If the first beat is primarily temporal/navigational rather than evidentiary, strong native typography may carry that role better than another support image.

## Bounded test

On rollback-safe FI `1863:18`, hide only STOP01's repeated skyline photo and promote the existing native `10:00` into a large typographic opening beat. Preserve native `01`, title, copy and metadata. Preserve STOP02/03/04 images, hashes, crops and geometry unchanged.

No replacement image was introduced.

## Expected improvement

- reduce repeated-image mass without semantic substitution;
- strengthen unequal editorial responsibility among sequential beats;
- move the page away from four equal image modules;
- preserve editability because time/title/copy remain native text.

## Regression risk

- dead space if the removed photo was performing real destination/binding work;
- timetable/UI feeling if the time becomes oversized without a broader editorial hierarchy;
- reduced place context if the remaining spread does not already establish destination strongly.

## Evidence

Whole-item / thumbnail:
- 900px whole spread: PASS, FI stronger than FA for the targeted module/repetition defect.

Reading/page:
- 1200px whole spread: PASS.

Actual size:
- right page `1863:49`, `794×1123`: PASS;
- native text `25`;
- text collisions `0`;
- 18px safe-area risks `0`;
- page-level STOP strays `0`.

Figma:
- adopted FI `1863:18`;
- hidden rollback FA `1840:2`;
- STOP01 photo hidden;
- STOP02/03/04 hashes unchanged.

Drive:
- V6 authority `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` reverified;
- no Drive write.

GitHub evidence:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FI-1DAY-TYPOGRAPHIC-START-QA-2026-08-19.md`.

## Failure / stop condition

If removing a repeated photo produces dead space, weakens factual/place evidence, or makes the beat look like a timetable widget, do not continue subtracting photos cosmetically. Restore the photo or change the information hierarchy instead.

## What must remain Rurubu-specific

Exact time scale, magenta/cyan/yellow/navy palette, Yokohama itinerary, stop copy, photo choices, coordinates, crop/rotation and travel-magazine art direction.

## Cross-item applicability hypothesis

On another print artifact with repeated content beats, independently test whether a nonessential repeated support image can be replaced by a stronger native typographic beat when the artifact already has sufficient visual/context evidence. Do not transfer the layout or assume all repeated photos are expendable.
