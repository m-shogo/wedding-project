# RSL-168 — Unequal photo roles can convert a route list into an editorial journey

Date: 2026-08-21
Source scope/item: Rurubu WEDDING / V6 Yokohama 1DAY Plan
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The 1DAY right page had valid native itinerary content and three visible verified photos, but the page still read primarily as four repeated stop rows with large cream intervals. Compared at the same thumbnail scale with other preferred V6 spreads, it felt closer to a route dashboard than a Japanese travel-magazine page.

## Evidence before change

IG `2073:2`, right `2073:33`. STOP 01's verified skyline image existed but was hidden. STOP 02/03/04 photos were visible but assigned to repeated row-like beats. All factual itinerary text was already native and editable.

## Root-cause hypothesis

Repeated semantic items do not require repeated visual geometry. When every stop receives similar text-row treatment, the eye reads the template before the journey. Existing legitimate photos can carry chronology by receiving unequal roles—opener, dominant anchor, secondary beat, closing beat—while the native times/numbers maintain order.

## Principle / capability tested

For a print itinerary or sequence with authorized photography, test **role asymmetry before adding assets or decorative routing UI**: one dominant image, one compact opener, and unequal supporting images can preserve sequence while replacing dashboard rhythm.

## Exact bounded change

On rollback-safe IM `2087:2`, preserve IG's accepted left page and rebuild only right `2087:33`:

- reveal existing STOP 01 skyline image as a compact morning opener;
- enlarge STOP 02 café image to the dominant upper-right field;
- use STOP 03 street image as a medium lower-left beat;
- use STOP 04 dining image as a smaller lower-right closing beat;
- retain all stop numbers, times, titles, copy and metadata as native text;
- keep route rail/dots hidden;
- generate/add zero assets.

A first reading-scale pass exposed occluded STOP 02 copy and STOP 04 timing attachment; those were corrected. Structural QA then exposed four small text intersections; the candidate was not promoted until all four were removed.

## Expected improvement

More immediate travel-magazine reading, stronger photographic hierarchy, less repeated-module/template feel, and better journey rhythm without introducing new imagery or losing chronology.

## Regression risk

- Sequence can become ambiguous if numbers/times are visually detached from their corresponding image.
- A dominant photo can overtake useful itinerary facts.
- Dense mosaics can create text collisions or false attachment between neighboring stops.
- This is not a rule to maximize image count; source fidelity and semantic coherence still gate enlargement.

## Three-scale evidence

- whole spread / 500px: PASS; IM visibly stronger and less list-like than IG.
- reading spread / 1400px: PASS after text-placement correction.
- actual-size right / 794×1123: PASS.
- final visible native text: `43` across spread.
- final visible IMAGE fills: `5` across spread.
- text intersections: `0`.
- 18px right-page text safe-area risks: `0`.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`.
- preferred IM: `2087:2`.
- right page: `2087:33`.
- hidden rollback IG: `2073:2`.
- reused image hashes: `644f449c...`, `c1ada112...`, `439a719d...`, `d76eb07...` on right page; no new hashes.
- Drive V6 root re-read: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IM-1DAY-PHOTO-MOSAIC-ROUTE-QA-2026-08-21.md`.

## Adopted / rejected status

`IM ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## What must remain Rurubu-specific

Do not transfer Yokohama photo choices, cyan/magenta/yellow palette, exact image sizes, 01–04 placement, travel-magazine headline treatment, or this page's specific mosaic geometry.

## Cross-item applicability hypothesis

A materially different print item with repeated steps/stops may independently test whether **semantic repetition can remain in native numbering/copy while visual roles become intentionally unequal**. The receiving item should verify sequence clarity at thumbnail and reading scales and should not copy this mosaic.

## Next receiving-item experiment

On a future print artifact whose repeated modules feel dashboard-like, compare the existing equal-role layout against a rollback-safe candidate that preserves information order but assigns different visual weights based on semantic importance. Reject the method if chronology becomes harder to follow.
