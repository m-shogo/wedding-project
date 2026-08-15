# Rurubu FU — source fidelity before macro layout

Date: 2026-08-15
Scope: project-wide learning feedback from Rurubu WEDDING only

## Problem observed

A visually successful composition can conceal an asset-role mismatch. FL used a `352×368` street raster as a `515×822.5` dominant surface. Thumbnail hierarchy looked energetic, but intrinsic-size audit showed that the layout itself depended on enlarging a weak source beyond a credible print role.

## Principle tested

Treat intrinsic/role-sized source fidelity as an upstream composition constraint. If a raster cannot sustain the intended printed area, change its role or the macro-composition before trying more crop polish, overlays, cards or sharpening.

## Experiment and evidence

- FT `1208:2`: moved a higher-resolution waterfront image into the dominant role. Rejected because front/back repeated the same city image and lower-page closure weakened.
- FU `1209:2`: used existing verified `944×608` travel-object image as dominant `793.7×512`, bounded the street image to `226×304`, retained `732×498` dining as support, and retained exact Q60 skyline at `230×211` from intrinsic `240×220`.
- 500 px whole-item PASS.
- 1000 px reading spread PASS.
- 794×1123 front PASS.
- ≈798×1123 back PASS.
- final absolute text collisions 0; 18 px text-safe risks 0.

## Regression caught before adoption

Actual-size QA found white Feature 03 type escaping its dark photo, an inherited white footer disappearing on cream, one right-edge safe-area violation, and a final 1 px Feature 02 text-box collision. All were corrected before promotion.

## Adopted state

FU promoted as Best Outer; FL hidden rollback; FT hidden rejected study; FO remains Best Inside; Current production candidates remain untouched.

## Cross-item applicability

Generalizable hypothesis: any print item with photography should compare intrinsic source dimensions and intended physical display role before increasing photo area for hierarchy. A technically valid raster should not be promoted to hero simply because the layout needs more visual mass.

Do not transfer Rurubu's travel-object image, giant `横浜`, palette, overlap geometry, or magazine-specific grammar. Receiving items must test the source-fidelity principle in their own visual language.
