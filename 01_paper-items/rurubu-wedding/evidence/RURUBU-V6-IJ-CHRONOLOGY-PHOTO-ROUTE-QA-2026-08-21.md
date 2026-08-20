# Rurubu V6 IJ — Chronology Photo Route QA

Date: 2026-08-21
Scope: Rurubu WEDDING V6 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

## Visible problem

Common-scale comparison of the preferred V6 set showed the IF chronology right page as the next useful visual bottleneck. IF was structurally clean, but below the hero field the 03 photo, 05 registration beat and 06 wedding closure read as separated islands with more quiet cream field than the surrounding travel-guide spreads. The page was closer to a sparse timeline poster than a dense photo-led travel-magazine chronology.

## Root-cause hypothesis

The issue was not missing facts or missing decoration. The lower chronology needed a stronger continuous editorial event: one larger photographic beat followed by compact, asymmetrically scaled 05 and 06 anchors. Increasing photo-role dominance and tightening the vertical route should improve continuity without adding another card, asset or UI container.

## Bounded clean-room test

- Source preferred: IF `2067:2`; right page `2067:28`.
- Created rollback-safe candidate IJ `2080:2`; right page `2080:28`.
- Left story page preserved unchanged.
- Existing `PHOTO / EVENT_3_FEATURE_REPLACEABLE_EDITORIAL` was enlarged and deepened using the same verified image hash `439a719d73f28e8dd2889f2026cccb15f345ec63`.
- Existing native 03 title/copy remained over the photo.
- Existing 05 and 06 native number/date/title/copy groups were repositioned to form a stronger photo → registration → wedding descent.
- Existing functional route rail was shortened to match the new closure rhythm.
- No wording, date, image source, palette family, external asset or generated asset changed.
- No new card, shadow, gradient or decorative containment was added.

## Expected improvement

A more continuous Japanese travel-magazine chronology: hero image → route → strong 03 photo event → 05 milestone → 06 terminal, with less empty poster-like spacing.

## Regression risk

- Enlarged EVENT_3 raster could expose softness or an awkward crop.
- 05/06 repositioning could create text collisions or unsafe trim proximity.
- A shortened route rail could stop reading as a functional chronology binder.
- Increased photo dominance could overpower chronology facts at reading scale.

## Three-scale evidence

- Whole spread / 500px: PASS; IJ is denser and more continuous than IF without becoming card-like.
- Reading spread / 1400px: PASS; 03 photo and 05/06 sequence remain legible and asymmetric.
- Actual-size right / `2080:28` ≈ 794×1123: PASS.
- Visible native text on right: `27`.
- Visible IMAGE fills on right: `2`.
- Same-parent absolute text intersections: `0`.
- 18px text safe-area risks: `0`.
- Whole-page flattening: NO.
- Replaceable image roles preserved: YES.

## Promotion

- IJ `2080:2` → `PREFERRED / V6_INSIDE_IJ_CHRONOLOGY_PHOTO_ROUTE_2026_08_21`, x=`275600`, y=`0`, visible.
- IF `2067:2` → `ROLLBACK_HIDDEN / V6_INSIDE_IF_CHRONOLOGY_VERTICAL_ROUTE_2026_08_21`, hidden, not deleted.

Decision: `IJ ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## Asset lifecycle

- newly generated assets: `0`;
- adopted newly generated assets: `0`;
- new Drive saves: `0`;
- new external uploads: `0`;
- new image hashes: `0`;
- reused hero hash: `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- reused EVENT_3 hash: `439a719d73f28e8dd2889f2026cccb15f345ec63`.

## Scope / learning boundary

Only Rurubu production nodes were inspected or edited. Neutral non-Rurubu learning was consumed only as method-level guidance. Exact chronology geometry, image choice, palette and Rurubu editorial treatment remain Rurubu-specific.
