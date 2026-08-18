# 2026-08-18 — Rurubu V6 DT Gourmet / Cafe Middle Feature

Scope: Rurubu WEDDING only
Status: `VERIFIED_LOCAL / ADOPTED_AS_PREFERRED_MIDDLE_FEATURE_STUDY`

## Visible problem

After Memory Spots DR added a true destination-information feature, V6 still depended mostly on cover/profile/story/chronology/spot-guide roles. The booklet needed another publication-native travel-magazine role rather than more decorative polish on the same pages.

## Hypothesis

A dedicated cafe / dining feature can make the publication feel more like a real Japanese travel-information magazine because it adds a materially different editorial rhythm: dominant food photography, short numbered features, compact practical metadata, and a closing scan layer.

## Bounded test

- DS `1694:2`: new clean-room cafe/table spread built from scratch using only existing verified Rurubu image hashes and native text.
- DT `1695:2`: rollback-safe refinement that added only native closing typography to use the lower physical page fields more intentionally.
- No V7 work and no non-Rurubu item inspection/editing.

## Expected improvement

- stronger genre authenticity through editorial-role variety;
- more energetic photo-led middle pages;
- less dependence on repeated profile/timeline grammar;
- preserve easy future copy/photo replacement.

## Regression risks

- a food spread can become menu-card UI if every fact is boxed;
- compact metadata can become too small at actual size;
- reused photography can repeat too visibly across the booklet;
- page count/imposition may later exclude the spread from the printed artifact.

## Evidence

Whole spread:

- DT `1695:2` ≈1400px: PASS and stronger closing cadence than DS.

Actual size:

- left `1695:3` = `794×1123`: PASS;
- right `1695:23` = `794×1123`: PASS.

Structure after fixes:

- left: 14 native texts / 2 replaceable IMAGE roles / text collisions 0 / 18px safe risks 0;
- right: 19 native texts / 2 replaceable IMAGE roles / text collisions 0 / 18px safe risks 0.

Initial DT was **not** accepted blindly: title/deck overlap and three number/label overlaps were detected by structural QA and fixed before promotion.

## Asset evidence

Existing verified hashes only:

- cafe `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- Yokohama view `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- dining `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- travel flatlay `e3738476f760932bb5b09c9d60f174dd6c84049d`.

Drive authority readback:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

New generation / upload / raster hash: none.

## Rejected experiment

DR SPOT 03 was separately tested with existing alternate hash `c09aa82e7b2ac75708707345c6f845452bf67663` in `1692:2` to repair its foreign-looking alley semantic mismatch.

The alternate rendered as a tropical-resort sunset, so it was **REJECTED** rather than adopted merely because the asset was technically verified. The test frame is hidden and DR remains unchanged until a legitimate Yokohama source exists.

## Adopted state

- `1695:2 / PREFERRED / V6_INSIDE_DT_GOURMET_CAFE_TABLE_2026_08_18`;
- DS `1694:2` hidden rollback;
- semantic swap `1692:2` hidden rejected evidence;
- Start Here: `V5 FU/FX · V6 AG + DN/DO + DR MEMORY SPOTS + DT CAFE & TABLE · V7 HOLD`.

## What remains Rurubu-specific

Do not transfer the Yokohama/cafe wording, color palette, photo choices, exact two-page geometry, numbered feature count, masthead language, or travel-magazine art direction to other wedding items.

## Next application

Continue V6 as one publication. Compare AG + DN/DO + DR + DT at whole-book rhythm; next improvements should target duplicated photo semantics and final legitimate photography/copy, not cosmetic governance or V7 expansion.