# V5 outer clean-room J — cover density comparison

Date: 2026-08-10
Scope: Rurubu WEDDING V5 only
Starting main before this write: `2ec4e5a72d13a39312ef9ac5bffdb7c4b6b45007`
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Visible problem

Clean-room I (`632:2`) established a much stronger destination-first Japanese cover hierarchy than H, but the lower cover still had conservative scale relationships and the front could push further toward a dense Japanese travel-information-magazine silhouette without adding more cards or decorative objects.

## Hypothesis

Increasing only the existing headline/photo/feature scale differences and overlap should create more editorial energy while preserving editability and keeping the visual system simpler than adding badges or containers.

## Prototype

Created:

- `638:2 / V5_OUTER_RURUBU_CLEANROOM_J_COVER_DENSITY_2026_08_10`
- front child remains the clean-room front structure derived from I

No Current outer node was changed.

Changes from I:

- dominant `横浜 / ふたり旅。` headline: `82 px`, tighter photo contact
- kicker and supporting Japanese subheads strengthened
- hero comparison frame enlarged to `762 × 662`
- three supporting images changed again to intentionally unequal dimensions and rotations
- feature numbers increased to `22 px`
- feature navigation positions staggered more strongly
- interview line rewritten to `ふたりの旅は、ここから次の景色へ。`
- no new card, badge, sticker, shadow, gradient, or color field was introduced

## Visual QA

Whole-outer screenshot and natural-size front screenshot were reviewed.

Observed improvement versus I:

- stronger destination-first silhouette at thumbnail scale
- more obvious Japanese travel-guide hierarchy before wedding details
- cover photography and headline now interact instead of occupying separate zones
- three supporting photographs read as editorial callouts rather than a uniform gallery
- lower feature navigation has more intentional unequal rhythm

Programmatic structure QA:

- visible native text: `40`
- visible IMAGE fills: `9`
- text overlaps: `0`
- fold guide `638:158`: visible, `2 × 1122.5`

## Hero gate remains independent

The prototype hero is still the existing comparison image, not the verified V5-01 cover source:

- node `638:130 / CF_HERO_VERIFIED_EXISTING_ALT`
- Figma hash `539c259be8036b481d06b4f76db9a39b407d90e8`
- intrinsic size `1356 × 560`
- display role `762 × 662`

The intrinsic aspect ratio is fundamentally wrong for the cover role and the natural-size screenshot visibly exposes softness/stretching. Therefore J is **not** a photo-role pass and is **not** promoted to Current.

The live staging node `538:132 / IMG_HERO` was also re-read during this run:

- hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- intrinsic `640 × 587`
- display `665 × 610`

It is the same known low-quality Current image, so it is not a hidden binary-safe substitute for Q60.

## Result

`PROTOTYPED / VISUALLY_STRONGEST_OUTER_COMPARATOR_THIS_RUN / STRUCTURE_QA_PASS / HERO_PROVENANCE_AND_FIT_FAIL / NOT_PROMOTED`

## Lesson candidate

For a travel-guide cover, stronger authenticity can come from **greater scale contrast and photo/type collision using the assets already present**, not from adding more stickers or card components. However, a better composition cannot compensate for a dominant image whose intrinsic aspect ratio and source role are wrong.

## Next safe application

Keep J as the strongest outer comparator and preserve Current outer until a cover-specific binary-safe high-quality hero reaches the actual cover semantic node. Re-run whole/page/detail QA with that image before any Current outer promotion.

V5 remains incomplete; V6 production remains closed.
