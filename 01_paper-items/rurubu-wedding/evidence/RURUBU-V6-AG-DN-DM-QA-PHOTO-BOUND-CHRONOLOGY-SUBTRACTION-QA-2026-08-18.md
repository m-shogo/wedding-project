# Rurubu WEDDING V6 — AG / DN / DM Visual QA

Date: 2026-08-18
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
State after this experiment: Outer AG + Profile/Q&A DN + Story/Chronology DM; V7 HOLD

## Experiment A — DN Q&A photo-bound Q04

### OBSERVED

DL had already removed most form-like Q&A geometry, but the middle Q04 feature still read as an isolated text block beside the lower memory photo. At page and thumbnail scale, the cream gap between photo and Q04 weakened the intended magazine overlap/rhythm.

### ROOT_CAUSE_HYPOTHESIS

The page did not need another card, sticker, image, or generated decoration. The existing replaceable dining photo had enough intrinsic source size and semantic relevance to act as the visual anchor for Q04 if its field was widened. Only the ordinal needed to overlap the photo edge; the question/answer should stay on cream for reliable readability.

### TESTED_LOCAL

Rollback-safe duplicate:

- source DL: `1659:2`;
- candidate / promoted DN: `1675:2`;
- Q&A page: `1675:42`.

Bounded changes:

- `PHOTO / QA_MEMORY_SUPPORT_REPLACEABLE`: widened to `545×372`, same image hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`, `FILL` preserved;
- `TEXT / QA_NUM_4`: shifted 24px left so the yellow `04` overlaps the photo edge;
- first iteration placed `04` behind the photo because of z-order and was rejected;
- only the ordinal was brought to front; Q04 question/answer, Q01–03, Q05/06, hero image, Profile page, image hashes, and native editability remained unchanged.

Known source for the dining role is `732×498`; DN display `545×372` remains intrinsic-safe.

### EXPECTED IMPROVEMENT

- make Q04 feel attached to the photo narrative instead of floating in leftover cream space;
- create a stronger asymmetric Japanese travel-magazine beat without another container;
- preserve copy readability and replaceable-photo behavior.

### REGRESSION RISK

- ordinal can disappear behind the photo if z-order is wrong — observed and fixed before promotion;
- widening the photo could collide with Q04 copy — DN retains a clean gap between the image edge and Q04 native copy;
- long-copy behavior should remain governed by the existing native auto-height stack; DN does not alter that stack.

### THREE-SCALE / STRUCTURAL EVIDENCE

DN passed:

- whole inside spread `1675:2` at 500px thumbnail;
- whole inside spread `1675:2` at 1200px reading scale;
- Q&A actual-size `1675:42` at `794×1123`.

Structural readback on `1675:42`:

- visible native text: 30;
- text/text collisions: 0;
- 18px text safe-area risks: 0;
- visible-node overflow: 0;
- hero replaceable image: `699×330`, hash `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- support replaceable image: `545×372`, hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`.

Result: `VERIFIED_LOCAL / PREFERRED`.

DL `1659:2` remains hidden as rollback.

## Experiment B — AG back-cover chronology subtraction

### OBSERVED

AF back cover had strong photo-led upper content and a useful major/minor chronology hierarchy, but the thin horizontal chronology rail plus detached `201X — 2026` year-range ghost reintroduced a diagram/timeline-UI feeling in the lower third.

### ROOT_CAUSE_HYPOTHESIS

The native 01–05 ordinals, dates/copy, spatial ordering and strong WEDDING terminal already communicated sequence. The rail and year-range ghost were no longer doing enough semantic work to justify their visual scaffolding.

### TESTED_LOCAL

Rollback-safe duplicate:

- source AF: `1655:2`;
- candidate / promoted AG: `1676:2`;
- back cover: `1676:3`.

Bounded changes:

- hid `DECOR / BACK_CHRONOLOGY_BINDING_RAIL_AF`;
- hid `TEXT / BACK_YEAR_RANGE_GHOST`;
- kept all photos, image hashes, front cover, chronology dates/copy, major/minor ordinal hierarchy and WEDDING terminal unchanged;
- structural scan exposed two pre-existing 1px contacts between milestone 05 and the `2026.02.11 / 入籍` copy; date and label were nudged 6px right before promotion.

### EXPECTED IMPROVEMENT

- reduce diagram/UI residue without making the back cover timid;
- let the photo hierarchy, 01/03/05 major beats and WEDDING terminal carry the editorial rhythm;
- preserve reader sequence through native ordinals and spatial order rather than an extra line.

### REGRESSION RISK

- too much subtraction can remove information-magazine energy; AG was kept only after thumbnail, reading and actual-size comparison showed the chronology remained legible;
- the rotated café photo has an edge-led transformed bounding box beyond the nominal page rectangle, but the existing clipped visual result is unchanged from AF and is not a new AG regression.

### THREE-SCALE / STRUCTURAL EVIDENCE

AG passed:

- whole outer spread `1676:2` at 500px thumbnail;
- whole outer spread `1676:2` at 1200px reading scale;
- back cover `1676:3` at `794×1123`.

Structural readback on `1676:3` after correction:

- native text: 23;
- text/text collisions: 0;
- 18px text safe-area risks: 0;
- image hashes unchanged from AF.

Result: `VERIFIED_LOCAL / PREFERRED`.

AF `1655:2` remains hidden as rollback.

## Final live Figma state

- Outer AG `1676:2` — `PREFERRED / V6_OUTER_AG_CHRONOLOGY_SUBTRACTION_2026_08_18`;
- Profile / Q&A DN `1675:2` — `PREFERRED / V6_INSIDE_DN_QA_PHOTO_BOUND_Q04_2026_08_18`;
- Story / chronology DM `1665:2` — unchanged preferred;
- Start Here `845:27`: `V5 FU/FX · V6 AG + DN/DM INSIDE STUDIES · V7 HOLD`;
- V7 not edited.

## Asset lifecycle truth

- newly generated images: 0;
- newly adopted generated assets: 0;
- new Drive saves: 0;
- new external binary placements: 0;
- new image hashes: 0;
- existing replaceable photo geometry changed: YES, one Q&A support role;
- native text preserved: YES;
- rollback preserved: YES;
- visually verified at three scales: YES;
- print-ready: NO.

Final personal copy/photos, exact printer template, PDF preflight and physical proof remain separate completion gates.
