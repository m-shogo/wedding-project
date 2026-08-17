# Rurubu WEDDING V6 — Y + CP/CO Editorial Flow QA

Date: 2026-08-17
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
State: `VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`

## Authority / scope check

Before writes, re-read:

- `AGENTS.md`;
- `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md`;
- `docs/design-learning/rurubu-shared-learning-feed.md`;
- `docs/design-learning/non-rurubu-shared-learning-feed.md` as neutral learning only;
- `01_paper-items/rurubu-wedding/RURUBU-V6-CURRENT-STATUS.md`;
- live Figma preferred set;
- Drive root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`;
- GitHub main `839c4b499fa7309838c6c54432de5eb833d37502` before this run's evidence writes.

No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, ADD item, or V7 production state was inspected or edited.

## Current preferred set after this run

- Outer Y `1542:2` — retained unchanged.
- Profile / Q&A CP `1567:18` — promoted from CN.
- Story / chronology CO `1566:2` — promoted from CM.
- Start Here: `V5 FU/FX · V6 Y + CP/CO INSIDE STUDIES · V7 HOLD`.

Rollbacks preserved:

- CN `1562:2` → `ROLLBACK_HIDDEN / V6_INSIDE_CN_PRE_CP_PROFILE_TEXTURE_2026_08_17`;
- CM `1559:2` → `ROLLBACK_HIDDEN / V6_INSIDE_CM_PRE_CO_CHRONOLOGY_2026_08_17`.

## CO — chronology major-photo / minor-notes rail

### Observed problem

CM had already separated major and minor milestones, but Event 1/3/5 photography and Event 2/4 text still occupied the same central field. At reading scale the chronology felt dense because reading paths crossed, not because it had useful magazine density.

### Root-cause hypothesis

For a photo-led travel chronology, major photographic events and minor bridge events need different spatial roles, not merely different font sizes. A narrow quiet rail can carry minor facts while the main field is reserved for large editorial photographs.

### Bounded test

Created rollback-safe CO `1566:2` from CM and changed only chronology lower-field composition:

- lower travel texture narrowed to a quiet left rail (`226×506`, opacity `0.22`);
- Event 2 / 4 moved into the left rail as text-only bridge events;
- Event 1 / 3 / 5 retained replaceable photography and were arranged as a right/center major-photo flow;
- redundant crossing magenta/cyan rules hidden;
- title copy remained native and unchanged, but width was corrected so `ふたりの旅、6つの景色。` reads on one intentional line;
- Event 03 typography was corrected after QA to stay inside the 18px right safe area;
- WEDDING terminal retained.

No new image generation, Drive save, binary upload, image hash, card, shadow, or gradient was introduced.

### Visual / structure verification

- whole spread ~1200px: PASS and clearer than CM;
- chronology actual-size `1566:27` = `794×1123`: PASS;
- visible native text: `30`;
- text collisions: `0`;
- 18px text safe-area risks: `0`;
- outside visible nodes: `0`;
- replaceable / composed image intrinsic checks: all PASS.

Relevant image checks:

- top hero `801×430` ≤ source `944×608`;
- Event 1 `455×218` ≤ source `1356×560`;
- Event 3 `345×230` ≤ source `352×368`;
- Event 5 `455×154` ≤ source `732×498`;
- bounded texture `226×506` ≤ source `720×860`.

### Result

`VERIFIED_LOCAL → ADOPTED AS CO PREFERRED`.

CM remains hidden rollback.

## CP — bounded Profile route texture

### Observed problem

CN's three lower snapshots had useful native captions and good photo hierarchy, but at whole-item scale they still floated on a large cream field. The page read as a strong hero plus a separate placed-photo cluster rather than one continuous editorial profile page.

### Root-cause hypothesis

A single low-opacity composed texture behind the whole cluster can visually bind overlapping replaceable photos without turning each photo into a new card and without sacrificing native editable text.

### Bounded test

Created rollback-safe CP `1567:18` from CN and added only one Rurubu-internal, already-verified composed travel texture behind the lower snapshot cluster:

- texture role `1567:95 / DECOR / PROFILE_ROUTE_TEXTURE_COMPOSED_RASTER`;
- Figma image hash `691a6ceed471a5d8efa144052a10564eed177b4f`;
- opacity `0.16`;
- final size `720×430`, corrected from an initial `770×430` after intrinsic QA;
- existing native captions, Profile text, photos, photo borders, image hashes, and replaceable semantics remained unchanged.

The initial 770px texture width was not accepted because source intrinsic width is 720px. It was corrected before promotion.

### Visual / structure verification

- whole Profile/Q&A thumbnail 500px: PASS;
- Profile actual-size `1567:19` = `794×1123`: PASS;
- Profile native text: `22`;
- text collisions: `0`;
- 18px text safe-area risks: `0`;
- all four replaceable Profile photos remain intrinsic-safe;
- texture final `720×430` ≤ source `720×860`;
- photo image hashes changed: `0`.

### Result

`VERIFIED_LOCAL → ADOPTED AS CP PREFERRED`.

CN remains hidden rollback.

## Asset lifecycle truth

- newly generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new raster bytes: `0`;
- existing composed raster reused in a new bounded semantic role: `YES`;
- replaceable photo semantics preserved: `YES`;
- native variable text preserved: `YES`;
- generated Profile/Q&A/Timeline/Memories masters remain Drive-authoritative but unadopted;
- V7 touched: `NO`.

## Remaining completion gates

Do not call V6 complete or print-ready until final legitimate photos and personal copy are inserted and re-stressed, the exact printer/product template is applied, bleed/trim/fold/page order is verified, exported PDF preflight passes, and a physical proof passes.
