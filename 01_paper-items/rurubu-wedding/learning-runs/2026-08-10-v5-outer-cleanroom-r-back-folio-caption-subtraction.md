# V5 outer clean-room R — back folio / caption subtraction

Date: 2026-08-10
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Status: `TESTED / VISUALLY_VERIFIED_COMPARATOR / CURRENT_NOT_PROMOTED / Q60_STILL_NOT_PLACED`

## Authority and safety refresh

Before writes, the run re-read project-wide authorities (`AGENTS.md`, `CLAUDE.md`), Rurubu Current Status, V6 gate, Q clean-room evidence, latest GitHub main, Drive Q60 source, and live Figma Q/Current state.

Only Rurubu WEDDING was changed. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not touched. Current outer `77:18` and Current inside `77:290` were not mutated.

## Scratch selection decision

Legacy Current would not be selected from scratch against the stronger clean-room direction. Q remained the leading outer comparator, so the next safe experiment was built from Q in a duplicate rather than polishing legacy Current.

## Visible problem

Q's front-cover bottom folio had already been successfully reduced to a thin print rule, but the back cover still retained two UI-like visual leftovers:

1. Friends captions sat inside large yellow/cyan solid bars even though the photographs already supplied strong grouping and the captions were readable as native type.
2. The back footer remained a `692 × 24` navy bar while the front had already proven that a thin print rule could close the page more naturally.

The journey timeline also occupied only a shallow strip and read more like a diagram widget than a magazine closing feature.

## Principle tested

Subtraction + editorial rebalance:

`solid caption field → direct native caption + thin accent rule`

`heavy footer field → thin print rule + direct native microtype`

Then use the freed hierarchy for one compact Japanese editorial deck and a small count tag rather than adding new cards.

Expected improvement:
- less app/dashboard geometry on the back page
- stronger photo-led continuity through Friends & Family
- more intentional printed-magazine ending
- clearer journey section context without duplicating a full module

Regression risks:
- caption text could lose contrast after the colored fields are reduced
- footer copy could become unreadable against the warm paper
- new journey text could become detached from the back page's semantic frame
- timeline staggering could introduce text collisions

## Figma implementation

Created from Q:
- `665:2 / V5_OUTER_RURUBU_CLEANROOM_R_BACK_FOLIO_CAPTION_SUBTRACTION_2026_08_10`
- back page `665:3`
- temporary front hero comparator `665:130`
- fold guide `665:161`

Back-cover changes:
- `BACK_VISUAL_FRIEND_2_CAP_BG`: `306 × 42` field → `306 × 5` accent rule
- `BACK_VISUAL_FRIEND_3_CAP_BG`: `244 × 42` field → `244 × 5` accent rule
- both caption text nodes preserved as native editable text
- `BACK_BOTTOM_BAR`: `692 × 24` field → `692 × 3` print rule
- footer text preserved as native text and recolored to dark navy after screenshot QA caught insufficient contrast
- six journey dots/labels were vertically staggered to follow the existing zig-zag route more directly
- added one compact native Japanese deck: `出会いから今日まで、ふたりの旅を6つの節目でたどります。`
- added one small native count tag: `6つの節目`
- no image replacement, no crop change, no new card, no pill, no gradient, no generated image

## QA-caught regressions and repair

### Footer contrast regression

The first R whole-item screenshot showed the footer text becoming effectively white-on-warm-paper after the heavy navy bar was reduced. This version was not accepted.

Repair:
- preserved the thin 3 px rule
- changed only the existing footer native text fill to dark navy
- re-ran whole screenshot QA

### Semantic parent regression

The first back-page-only screenshot did not show the new journey deck/tag even though they were visible in the whole-root screenshot. Inspection showed that the two text nodes had been appended to the outer root instead of `665:3 / BACK_COVER_PRESERVED_COMPARATOR`.

Repair:
- moved `666:2 / BACK_VISUAL_HISTORY_DECK_R` and `666:3 / BACK_VISUAL_HISTORY_TAG_R` into parent `665:3`
- preserved their visual coordinates
- re-ran back-page screenshot QA

This repair is important because a whole-root screenshot alone could have hidden an export/semantic grouping defect.

## Three-scale visual QA

Whole-item:
- R retains Q's materially stronger photo/title/collage front-cover silhouette
- back Friends captions no longer look like large UI buttons
- back footer now closes like print folio rather than a status bar
- journey closing area has clearer hierarchy without new containers

Reading/page:
- back-page screenshot after parent repair includes the new deck/tag inside `665:3`
- reading sequence remains main memory → Friends → journey timeline → folio
- Friends photographs remain visually dominant over their captions

Actual-size/detail:
- direct Friends captions remain readable
- yellow/cyan 5 px rules continue to associate each caption with its corresponding photograph
- dark navy footer microtype is readable after the contrast repair
- journey labels remain legible and no text clipping was observed

## Fresh structure QA

R readback after repair:
- root `665:2`
- back `665:3`
- hero comparator `665:130`: `766 × 904`, hash `539c259be8036b481d06b4f76db9a39b407d90e8`
- fold `665:161`: visible, `2 × 1122.5`
- native text count: `44`
- same-parent text overlaps: `0`
- new journey deck/tag parent: `665:3`

Verified image hashes remain unchanged for the protected image roles:
- back main `665:6` → `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Friends cafe `665:18` → `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends dining `665:22` → `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- logo `665:135` → `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- date badge `665:136` → `0cbbf09357938365c2550f08928be1db33fa6060`

## Q60 transport recheck

Drive readback again verified:
- file: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME: `image/jpeg`
- bytes: `155,439`
- exact raw file successfully materialized in the execution environment

A new Figma single-use upload URL was issued for `665:130`. Posting the raw JPEG bytes failed before transfer because the execution container could not resolve `mcp.figma.com` (`curl: (6) Could not resolve host`). This failed transport is not counted as placement or progress, and the same route was not repeated again in this run.

The temporary R hero therefore remains the verified history image used only to judge composition. It is not the V5-01 cover source.

## Adoption state

- new image generated: no
- Q60 Drive source verified/materialized: yes
- Q60 placed in Figma: no
- R duplicate placed: yes
- Friends/footer subtraction placed: yes
- whole-item visually verified: yes
- back-page visually verified after semantic-parent repair: yes
- structure verified: yes
- Current outer promotion: no
- Current inside change: no
- V5 photo gate: unchanged at `9/10`, dominant `2/3`
- V6 production: remains closed

## Learning result

**Visible problem:** after one side of a spread has been successfully stripped of UI-like footer geometry, the opposite side can retain inconsistent heavy bars and caption fields that weaken the overall print-native impression.

**Principle/capability tested:** reduce redundant solid fields to direct native type + thin accent rules, then use the recovered hierarchy for compact editorial context rather than new cards.

**Expected improvement:** more continuous photo-led editorial rhythm and a quieter, more credible printed-magazine closing area.

**Regression risk:** removing fields can reveal contrast problems; whole-root screenshots can also hide semantic-parent/export problems.

**Screenshot/structure evidence:** R whole screenshot, R back-page screenshot before/after parent repair, final overlap `0`, fold preserved, protected image hashes unchanged.

**Status:** `TESTED / STRONGER_BACK_COVER_THAN_Q / CURRENT_NOT_PROMOTED`.

**Next application:** keep R as the leading back-cover refinement while Q60 placement remains blocked. Do not decorate the footer further. The decisive outer step is still binary-safe placement of the real Q60 hero followed by crop/sharpness/contrast and three-scale comparison before any Current promotion.