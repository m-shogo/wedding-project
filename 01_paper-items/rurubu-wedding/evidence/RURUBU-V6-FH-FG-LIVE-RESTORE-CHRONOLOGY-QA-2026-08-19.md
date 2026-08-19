# Rurubu WEDDING V6 — FH / FG live restore + chronology QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Starting live-state defect

GitHub `RURUBU-V6-CURRENT-STATUS.md` declared Profile / Q&A FC `1846:18` as preferred, but a fresh live Figma lookup returned `null` for that exact node. The verified rollback ET `1817:2` still existed and remained structurally intact.

At the same time, the preferred Outer EZ `1836:2` still showed a screenshot-visible weakness on the back cover: the lower chronology read as scattered milestone numbers plus a dark WEDDING terminal bar, which reintroduced a timeline/UI rhythm beneath an otherwise photo-led back cover.

## FG — preferred Profile / Q&A liveness restoration

Rollback-safe restoration source: ET `1817:2`.

New preferred root: FG `1851:2 / PREFERRED / V6_INSIDE_FG_PROFILE_QA_RESTORED_JAPANESE_EDITORIAL_CAPTIONS_2026_08_19`.

Only the already-verified FC editorial-copy changes were reapplied:

- `MEMORIES FROM OUR JOURNEY` → `ふたりの旅の記憶`
- `DINNER NOTE / FAVORITE SCENE` → `旅の途中の、好きな一皿。`
- `NEXT TRIP / FEATURE` → `つぎの旅で、やりたいこと。`
- `OUR NEXT CHAPTER` → `ふたりの次の章へ`
- `TO BE CONTINUED / OUR JOURNEY` → `これからも、ふたりの旅はつづく。`

The support-photo caption was restored onto the cream field below the photo for actual-size readability. Q&A answers, photo fills, crops, image hashes, Profile geometry and replaceable-photo semantics were not changed.

### FG evidence

- whole spread screenshot: PASS
- Q&A actual-size `1851:47` = `794×1123`: PASS
- Profile `1851:3`: native text `25`, IMAGE `4`, text collisions `0`, 18px safe-area risks `0`
- Q&A `1851:47`: native text `30`, IMAGE `2`, text collisions `0`, 18px safe-area risks `0`
- generated assets: `0`
- new Drive saves: `0`
- new image hashes: `0`

Status: `LIVE_PREFERRED_LIVENESS_RESTORED / VERIFIED_LOCAL`.

## FH — back-cover chronology clean-room subtraction

Rollback-safe source: preferred EZ `1836:2`.

Candidate/adopted root: FH `1854:2 / PREFERRED / V6_OUTER_FH_BACK_NATIVE_EDITORIAL_CHRONOLOGY_2026_08_19`.

### Visible problem

The large flatlay photograph already gave the back cover strong editorial mass, but the chronology below it still used several short colored rules plus a filled navy WEDDING terminal field. At thumbnail scale, this lower region read closer to an interface/timeline module than a travel-magazine closing page.

### Root-cause hypothesis

The chronology facts already had enough order through native numerals, dates and titles. The filled terminal field and extra rule fragments were carrying redundant containment rather than necessary binding.

### Bounded test

On FH only:

- hide the magenta/cyan/yellow short chronology rules;
- hide the filled navy WEDDING terminal field and its yellow top rule;
- keep `01 / 03 / 05` as large unequal native milestones;
- keep `02 / 04` as quiet bridge beats;
- rebuild `06 / 2026.10.24 / WEDDING` as native typography directly on the cream field;
- preserve the dominant back photo, headline, memory-route copy, footer and all front-cover content.

### Failure caught before adoption

The first FH render was **rejected as-is** for two reasons:

1. `06` was cloned from an existing milestone and landed as a page-level node instead of inside `V6_A_BACK`.
2. `2026.10.24` and `WEDDING` inherited white text fills from the old dark terminal field, becoming too low-contrast on cream.

The failed color-fix script was atomic and made no changes because one name lookup was wrong. A direct node readback then identified the real node IDs. The repair:

- reparented `06` into back page `1854:3`;
- restored `06` to magenta using existing Rurubu native type color;
- changed date and WEDDING to the existing navy text color;
- added a clean typographic gutter between `06` and the date/WEDDING stack.

### FH three-scale / structure evidence

- whole spread 700px: PASS and stronger than EZ chronology region
- whole spread 1200px: PASS
- back page `1854:3` actual-size `794×1123`: PASS
- back native text: `25`
- front native text: `13`
- back text collisions after repair: `0`
- front text collisions: `0`
- 18px text safe-area risks: `0` on both pages
- visible page-level stray milestone nodes after repair: `0`
- image-source/hash changes: `0`
- new generated assets: `0`
- new Drive saves: `0`
- new external binary placements: `0`

Status: `OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL → ADOPTED_FH`.

## Live preferred set after promotion

- Outer FH `1854:2`
- Profile / Q&A FG `1851:2`
- Story / chronology EN `1773:2`
- Memory Spots EW `1826:18`
- Cafe / Table FB `1843:2`
- 1DAY Plan FA `1840:2`

Start Here `845:27`:

`V5 FU/FX · V6 FH + FG/EN + EW MEMORY SPOTS + FB CAFE & TABLE + FA 1DAY PLAN · V7 HOLD`

Superseded/stray visible Outer studies were cleaned without deletion:

- EZ `1836:2` → hidden rollback
- AH `1683:2` → hidden study
- ES `1811:2` → hidden candidate

V7 was not edited.

## Drive readback

Verified Drive root remains:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

No Drive write was required in this experiment.

## Completion boundary

This is verified dummy-design progress only. It does not establish final photography, final personal copy, final page imposition, exact printer template, PDF preflight, or physical-proof readiness.
