# RSL-020 — Saturated identity fields can turn editorial layouts into posters

Source scope/item: Rurubu WEDDING / V7 Hawaii clean-room outer

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The V7 Hawaii clean-room had strong native Japanese headlines, replaceable image masks and asymmetric photography, but the front cover still read too strongly as a bright campaign/poster because a large saturated pink page field carried much of the tropical identity.

A direct comparison with the already-verified V6 editorial direction showed that the stronger travel-magazine reading came from photography + Japanese type + collage rhythm on a quieter paper-like field, not from maximum color area.

## Root-cause hypothesis

When a saturated background becomes the dominant identity carrier, the viewer may classify the artifact as a poster, landing page or campaign graphic even if the individual elements are editorial. A quieter paper-like field can let photography, headline scale, crop and compact information perform the genre work instead.

This is not a universal rule that editorial design should be cream or low-saturation. The transferable question is **which element is carrying identity at whole-item scale, and whether that field has a real binding/contrast job on that specific page**.

## Bounded test A — reduce the saturated front field

Source candidate: corrected photo-led Outer C `1250:2`.

Created rollback-safe Outer D `1252:2` and changed only:

- front-page solid field: saturated pink → warm ivory;
- native `TRAVEL WEDDING / HAWAII MOOD`: pink;
- native `ハワイ気分で`: navy;
- native `旅する一日。`: pink.

Preserved exactly:

- all six image/mask roles;
- image hashes;
- mask geometry;
- headline sizes and wording;
- photo overlaps/rotations;
- native text semantics;
- back page;
- no new decoration geometry or new binary asset.

Result: D was preferred over C.

## Bounded test B — counter-test the same treatment on the back page

To ensure the result did not become a blanket `ivory is better` rule, Outer E `1256:2` duplicated D and changed only the back-page turquoise field to warm ivory plus native label/date colors.

Result: `REJECTED`.

The back page became too quiet and the white back-title treatment weakened near the photo/paper boundary. In this composition the turquoise field still performed useful page-level binding and contrast around the memory cluster. E was hidden as `V7_HAWAII_CLEANROOM_OUTER_E_REJECTED_OVERQUIET_BACK_CONTRAST_2026_08_15`.

This counter-test narrows the transferable lesson: reduce a large saturated field when it is doing poster-like identity work, but retain one when whole-item evidence shows that it performs a useful binding/contrast function.

## Expected improvement

Recover print/travel-magazine classification without losing tropical energy, by moving the visual burden from an unnecessary giant color field to Japanese typography and photo hierarchy.

## Regression risk

A quiet base can become generic, empty or falsely luxurious if photography and type hierarchy are weak. Removing a saturated field can also destroy useful page-level binding or contrast. The method must therefore be compared at thumbnail and actual-size scales rather than adopted as a palette preference.

## Three-scale evidence

Outer D:

- whole spread / 1200 px: PASS and preferred over C;
- thumbnail / 500 px: PASS; destination/photo/headline hierarchy survives;
- front actual size / 794×1123: PASS;
- corrected C back actual size / 794×1123: PASS and is unchanged in D.

Outer E counter-test:

- whole spread / 1200 px: REJECTED; stronger uniformity but weaker editorial tension and back-page contrast.

Structure after promotion/counter-test:

- Outer D `1252:2`: 20 native text nodes, 6 IMAGE roles, 6 MASK roles, 18px safe-area risk `0`;
- Inside A `1247:2`: 32 native text nodes, 6 IMAGE roles, 6 MASK roles, 18px safe-area risk `0`;
- Start Here `845:27`: `V5 FU/FX · V6 M/I · V7 D/A STUDY`;
- Outer C hidden as rollback;
- Outer E hidden as rejected counter-test;
- Inside B hidden as insufficient-gain rejection.

## Figma / Drive / GitHub evidence

Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`.

Preferred study:

- Outer D `1252:2`;
- Inside A `1247:2`.

Drive live readback:

- Hawaii root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- generated masters `1pkkf4BX3ugKdR1rTkgXdp8xTaNGrQD1p` remains empty;
- no acceptable Hawaii-specific photo master was found.

Existing Hawaii/Waikiki line-art search results with baked store/place wording were rejected rather than adopted. No new Drive file or Figma binary was created.

Git evidence:

- `01_paper-items/rurubu-wedding/RURUBU-V7-HAWAII-PREFERRED-D-A-EDITORIAL-STUDY-2026-08-15.json`
- `docs/wedding-design-learning-feedback-log.append/2026-08-15-rurubu-v7-da-ivory-editorial.md`

## Status

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## What must remain Rurubu-specific

Do not transfer the warm ivory, pink/navy/turquoise palette, Hawaii wording, exact image ratios, rotations, headline scale, Rurubu-like collage grammar or current node geometry to another Wedding item.

## Cross-item applicability hypothesis

When a different print artifact technically has good hierarchy but still reads like a poster/dashboard/landing page, independently test whether a large saturated or decorative field is doing too much identity work. A rollback-safe comparison may reduce that field and let the artifact's own typography, imagery or physical semantics carry identity. Then run a counter-test where appropriate: if removing the field weakens real grouping, binding or contrast, retain it. The transferable method is functional comparison, not a color recipe.
