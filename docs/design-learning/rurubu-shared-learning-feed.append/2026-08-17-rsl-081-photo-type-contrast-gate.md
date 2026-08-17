# RSL-081 — Photo-carried native type requires contrast and intrinsic gates

Source: Rurubu WEDDING V6
Date: 2026-08-17
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Problem

Large dark title fields on the chronology hero and back-cover flatlay made valid photo-led regions read as separate panels. A smaller Q&A strip looked superficially similar.

## Hypothesis

Native title copy may sit directly on a legitimate photograph when actual-size contrast remains strong. A field should be retained when it performs a real contrast or binding function. Photo enlargement used to increase editorial hierarchy must also remain within source fidelity.

## Tests

- Chronology DE `1624:18`: removed the large title field, kept native title/deck on the hero, and redistributed existing replaceable 01/03/05 photos into an asymmetric cascade. The first Event 03 enlargement failed the intrinsic gate (`390×260` vs source `352×368`), so it was corrected to `350×260` before adoption. Final actual-size 794×1123: collision 0, 18px safe-area risk 0, intrinsic violations 0.
- Q&A DF `1626:18`: removed the Q02/Q03 navy strip and used white native text directly on the dining photo. Bright table detail reduced readability, so the candidate was rejected and hidden. DC remains preferred.
- Outer AD `1626:99`: removed the large back-cover navy title field and placed native title/subtitle directly on the existing flatlay. Whole-item and actual-size review passed with collision 0 and 18px safe-area risk 0.

## Evidence

`01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AD-DC-DE-QA-PHOTO-CASCADE-2026-08-17.md`

Drive authority remained `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

No image generation, Drive save, external binary placement, new raster bytes, or image-hash change occurred.

## Transferable method

When a title/caption field looks UI-like:

1. test direct native type on the existing legitimate image in a rollback-safe comparison;
2. review whole-item, reading and actual-size contrast;
3. retain the field when it proves a real contrast/binding/physical role;
4. if images are enlarged for the comparison, rerun intrinsic-source and crop QA before promotion.

Do not transfer Rurubu-specific colors, photos, wording, overlap angles, timeline geometry or visual grammar.
