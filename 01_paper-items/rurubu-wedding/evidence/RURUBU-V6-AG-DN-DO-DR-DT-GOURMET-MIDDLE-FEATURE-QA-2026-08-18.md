# RURUBU WEDDING V6 — DT Gourmet / Cafe Middle-Feature QA

Date: 2026-08-18
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
State: `VERIFIED_LOCAL / PREFERRED_MIDDLE_FEATURE_STUDY / V7_HOLD / NOT_PRINT_READY`

## Starting authority

Live preferred V6 at the start of this experiment:

- Outer AG `1676:2`;
- Profile / Q&A DN `1675:2`;
- Story / chronology DO `1679:2`;
- Memory Spots DR `1689:2`;
- V7 HOLD.

The new spread is additive as a **candidate editorial role** only. Physical page count and imposition remain unresolved, so DT is not proof that the final printed booklet will contain pages 08–09.

## Visible problem

DR successfully added a destination-information / memory-spots middle feature, but the publication still relied on cover/profile/story/chronology/spot-guide roles. At whole-publication scale it lacked another characteristic Japanese travel-information-magazine role: a food / cafe / table feature with dominant food photography, compact native practical metadata, and a different reading rhythm from the spot guide.

The problem was editorial-role completeness rather than missing decorative micro-geometry.

## Root-cause hypothesis

A recognizable publication genre becomes more convincing when its **editorial role set** varies, not merely when every page receives more surface styling. A dedicated cafe / dining spread could increase travel-magazine plausibility while preserving the project-wide hybrid authoring rule:

- variable/factual copy remains native;
- photography remains independently replaceable;
- only simple fixed labels/rules are native geometry;
- no new raster master is required when existing verified Rurubu imagery can establish the role safely.

## Clean-room bounded test

### DS — first clean-room gourmet spread

Created from scratch as `1694:2 / QA_STUDY / V6_INSIDE_DS_GOURMET_CAFE_TABLE_2026_08_18` rather than cloning a legacy inside composition.

Structure:

- left page: cafe guide with dominant cafe photo, feature 01, smaller Yokohama-view support, native practical metadata;
- right page: dominant dining photo, feature 03, travel-object support, compact `CHECK! / 2 FAVORITES` information;
- four independent replaceable IMAGE roles;
- all editorial text native.

DS established the role but the lower physical page fields still read slightly unfinished.

### DT — refined closing cadence

Rollback-safe duplicate `1695:2` added **native typography only** to the lower fields:

- left closing: `好きな店が、旅の目的地になる。` + small `OUR FAVORITE / YOKOHAMA`;
- right closing: `3 WAYS / ENJOY` with `01 SWEETS / 甘いもの`, `02 VIEW / 景色`, `03 TALK / 会話`.

No photo source/hash changed between DS and DT.

## Structural failures caught before adoption

Initial DT structural scan found:

1. `TEXT / GOURMET_TITLE` intersecting `TEXT / GOURMET_DECK`;
2. the three bottom `01/02/03` number glyphs intersecting their adjacent labels.

These states were **not** treated as passes. The deck was moved below the auto-height title and the three labels were separated from the numeric glyphs. Final scan returned zero same-parent text intersections.

## Final DT image roles

All are existing verified Rurubu image hashes and remain independently replaceable:

### Left `1695:3`

- `1695:9 / PHOTO / GOURMET_CAFE_HERO_REPLACEABLE`
  - `565×430`
  - hash `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- `1695:17 / PHOTO / GOURMET_VIEW_REPLACEABLE`
  - `260×220`
  - hash `644f449c3bf2001a94d4b822d2b55e2614c11042`.

### Right `1695:23`

- `1695:25 / PHOTO / GOURMET_DINING_HERO_REPLACEABLE`
  - `793.7×500`
  - hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- `1695:36 / PHOTO / GOURMET_TRAVEL_OBJECT_REPLACEABLE`
  - `286×220`
  - hash `e3738476f760932bb5b09c9d60f174dd6c84049d`.

No new image hash was created.

## Three-scale / structural evidence

### Whole spread

- DT `1695:2` at ~1400px: PASS;
- compared with DS `1694:2`, DT has stronger bottom-page closure and better scan density without adding cards or a new decorative system.

### Actual size

- left `1695:3` rendered at native `794×1123`: PASS;
- right `1695:23` rendered at native `794×1123`: PASS;
- dominant food/cafe images remain the first read;
- lower metadata remains legible without becoming dashboard UI.

### Structure

Left page:

- native visible text: `14`;
- IMAGE roles: `2`;
- same-parent absolute text collisions: `0`;
- 18px text safe-area risks: `0`.

Right page:

- native visible text: `19`;
- IMAGE roles: `2`;
- same-parent absolute text collisions: `0`;
- 18px text safe-area risks: `0`.

Both physical page frames use `clipsContent=true`.

## Separate rejected semantic-photo experiment

Before building DT, DR SPOT 03's foreign-looking alley was diagnosed as a destination-semantic mismatch with `OUR YOKOHAMA`.

Rollback-safe test `1692:2` replaced only that image with an already-verified alternate hash `c09aa82e7b2ac75708707345c6f845452bf67663`.

Result: **REJECTED**. The alternate was a tropical-resort sunset and was also semantically wrong for Yokohama. This proves that `existing verified asset` does not mean `valid for every role`.

The rejected frame is preserved hidden as:

`1692:2 / REJECTED_HIDDEN / V6_INSIDE_DS_MEMORY_SPOTS_ALT_SEMANTIC_SWAP_2026_08_18`.

DR itself remains unchanged and preferred until legitimate final Yokohama photography is available.

## Promotion / rollback state

Promoted:

- `1695:2 / PREFERRED / V6_INSIDE_DT_GOURMET_CAFE_TABLE_2026_08_18`.

Rollback:

- `1694:2 / ROLLBACK_HIDDEN / V6_INSIDE_DS_GOURMET_CAFE_TABLE_2026_08_18`.

Start Here `845:27`:

`V5 FU/FX · V6 AG + DN/DO + DR MEMORY SPOTS + DT CAFE & TABLE · V7 HOLD`

## Asset lifecycle truth

- newly image-generated assets: `0`;
- newly adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new raster/image hashes: `0`;
- existing verified Rurubu image hashes reused: `YES`;
- native editable text: `YES`;
- replaceable photos: `YES`;
- whole-spread visual QA: `PASS`;
- actual-size page QA: `PASS`;
- structural collision/safe-area QA: `PASS`;
- rollback preserved: `YES`;
- V7 touched: `NO`.

Drive root was read back during the run:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Result

`DT VERIFIED_LOCAL / PREFERRED_GOURMET_CAFE_MIDDLE_FEATURE_STUDY / NATIVE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`

DT improves the **editorial role variety** of V6. It does not settle final booklet page count, final destination photography, printer template, PDF preflight, or physical proof.