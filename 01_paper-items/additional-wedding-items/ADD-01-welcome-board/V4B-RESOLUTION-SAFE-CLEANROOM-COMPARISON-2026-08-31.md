# ADD-01 — V4B resolution-safe clean-room comparison — 2026-08-31

State: `V4B_CLEANROOM_COMPARISON_CREATED / STRUCTURE_QA_PASS / LONG_COPY_STRESS_PASS / CONDITIONAL_RESOLUTION_RISK_MATERIALLY_REDUCED / SELLABLE_VISUAL_QA_IN_PROGRESS / NOT_PROMOTED / NOT_PRINT_READY`

## Live authority

- start/write-time latest `main`: `b4b6719b7e01481d717ad73e74f41941624b6d29`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `XyyTGuz6BMf8XRhPZZfdoT`
- retained V4 current: `24:3 / V4 / ADD-01 / OPEN DOOR / CLEANROOM`
- retained V4 photo role: `24:9` = `310×930 px`
- new clean-room comparison: `58:2 / V4B / ADD-01 / COASTAL GALLERY WINDOW / CLEANROOM / RESOLUTION-SAFE COMPARISON`
- new replaceable photo role: `58:5 / PHOTO / COUPLE / REPLACEABLE / REAL_PHOTO_REQUIRED / 360x500` = `360×500 px`
- hidden V4B long-copy proof: `60:2 / QA / ADD-01 / V4B / LONG COPY STRESS / RESOLUTION-SAFE`
- Drive authority: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg / ADD-01_ウェルカムボード`
- authoritative real-photo candidate remains Drive `1QWhFJPWHhwF6tfShyYzWULMGc8YDm55P / REAL_PHOTO_COVER_HAWAII_BEACH_COUPLE_FULLBODY_01.jpg / 4500×3000 px`
- Drive writes this run: `0`

## Clean-room / visual intent

V4B was built on a new blank frame and did not duplicate or restyle production/V2/V3/V4. Only verified copy roles, date/place, physical 852×1200 working canvas and replaceable-photo requirement were re-authored.

Direction: `COASTAL GALLERY WINDOW` — warm paper, strong Japanese hero, deep-ink side rail, coral entry rule/top edge, a compact framed photo window, and a low sand-paper footer field. The intent is a physical editorial welcome poster rather than a UI/card layout or transport-themed prop.

Role split:

- variable/factual copy: native Figma text;
- couple photo: replaceable frame/mask role, no raster imported yet;
- fixed support art: simple editable native geometry;
- generated/composed raster: none required for this comparison;
- guest-facing internal QA/proof text: none.

## Why V4B was created

The retained V4 uses an extreme `310×930` photo slot. With the known `4500×3000` landscape photo, FILL would use only about `996×3000` source pixels and scenario QA found about `234 ppi` at A3 and `166 ppi` at A2.

V4B changes the photo role to `360×500` while keeping the photo large enough to remain a primary object. A matching FILL crop from the same source can use about `2160×3000` source pixels.

Scenario math, pending final physical-size authority:

- if 852×1200 maps to A3 portrait `297×420 mm`: photo ≈ `125.5×174.3 mm`, effective PPI ≈ **437 ppi**;
- if 852×1200 maps to A2 portrait `420×594 mm`: photo ≈ `177.5×246.5 mm`, effective PPI ≈ **309 ppi**.

Therefore the known 4500×3000 source is no longer conditionally below the current 250 ppi threshold in either already-discussed A3/A2 scenario. Formal `RESOLUTION_WARNING` remains deferred because final physical size and final crop/focal point are not yet authoritative.

## Three-scale / visual comparison

Fresh thumbnail/reading screenshots were taken for retained V4 `24:3` and V4B `58:2`.

- retained V4 remains visually dramatic but relies on the extreme narrow photo silhouette that created the print-resolution problem;
- V4B keeps `hero title → photo → date/place → couple/message` first-read hierarchy while giving the real photo substantially more usable source area;
- V4B avoids equal cards, generic AI background, meaningless badges and internal production language;
- V4B is intentionally kept as a serious comparison rather than promoted prematurely; final judgment should include the real photo once import is available.

## Long-copy / structure QA

Hidden stress proof `60:2` tested longer bride/groom placeholders and a longer Japanese welcome message.

Readback after QA:

- V4B normal `58:2`: visible native text `6`, outside `0`, fixed-height text `0`, raster IMAGE fills `0`;
- V4B stress `60:2`: visible native text `6`, outside `0`, fixed-height text `0`, raster IMAGE fills `0`;
- stress proof returned hidden after review;
- replaceable photo remains independent of text/fixed art.

Current raster effective PPI in Figma is `N/A` because no raster image has yet been imported. The scenario values above are source/crop feasibility calculations only.

## Print-first state

Working canvas remains `852×1200 px`; final A2/A3 physical authority is unresolved, so actual-size typography is still `DEFERRED_FINALIZATION` rather than falsely promoted. Scenario readability remains comfortably display-scale, but final point values must be recalculated after the physical size is selected.

No trim/bleed/safe geometry was guessed. Still deferred:

- final A2/A3 size and printer template;
- trim / bleed / safe area;
- stand/easel/frame occlusion;
- real-photo import, focal crop and 100% photo-detail proof;
- CMYK/profile proof for skin, whites/highlights, blue-green/deep tones, coral and warm paper;
- black construction;
- PDF export, font embedding, transparency, overprint/knockout and preflight;
- 100% or physical proof.

`DESIGN_COMPLETE != PRINT_READY` remains mandatory.

## Decision

V4B is a materially different, print-feasibility-improving clean-room comparison and removes the previously identified conditional A2/A3 resolution failure **in scenario math** without reducing the photo to a token thumbnail.

Do not promote `SELLABLE_VISUAL_QA_PASS` yet. Promotion remains blocked on real-photo placement/crop QA and final visual comparison with the actual image; however, ADD-01 now has a viable geometry path that can meet >=300 ppi in both current A3/A2 scenarios using the already-located 4500×3000 source.