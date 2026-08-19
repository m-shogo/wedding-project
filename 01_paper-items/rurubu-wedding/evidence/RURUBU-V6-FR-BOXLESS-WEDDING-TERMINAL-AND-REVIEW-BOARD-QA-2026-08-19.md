# Rurubu V6 — FR boxless WEDDING terminal + live 3×2 review-board QA

Date: 2026-08-19
State: `VERIFIED_LOCAL / ADOPTED / ROLLBACK_SAFE / REVIEW_BOARD_DRIFT_REPAIRED / V7_HOLD / NOT_PRINT_READY`
Start GitHub main: `bd8fde3e88d78dc29778192638c4ec2e9595cb7a`
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Drive root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

## Authority read before write

Read project-wide shared-learning/hybrid-authoring authorities, Rurubu current status, Production Operating System V2, Failure Memory & Preflight, and the neutral non-Rurubu shared feed. No non-Rurubu item-specific Figma/Drive/GitHub paths were inspected or edited.

Fresh Drive readback confirmed the existing Profile/Q&A/Timeline/Memories generated V1 masters remain present. No Drive write was needed.

## Live-state drift discovered

Before mutation, exact Figma readback showed all six GitHub-declared preferred spreads existed and were visible, but they did not actually share one review page:

- FO `1891:18`, FP `1895:18`, FQ `1898:125` were on `47:2 / 02_RURUBU_AUTHENTIC` at y=0.
- EW `1826:18`, FN `1866:2`, FM `1879:71` were on `845:2 / 00_RURUBU_START_HERE` at y=1300.

Therefore the existing GitHub sentence claiming one compact 3×2 board was false live state.

## Visible problem

At same-scale review, FQ chronology was mostly photo + native typography, but the final WEDDING endpoint remained inside a 742×124 dark navy field (`DECOR / WEDDING_CAPTION_STRIP`). The large container no longer had a unique contrast/grouping job and visually reverted the mature editorial chronology back toward timeline UI at the final beat.

## Root-cause hypothesis

The endpoint semantics had remained bound to an older full-width box even after the surrounding page hierarchy became strong enough to communicate order and closure through number/date/type scale alone.

## Bounded test

Created rollback-safe clone:

- `1904:18 / CANDIDATE / V6_INSIDE_FR_BOXLESS_WEDDING_TERMINAL_2026_08_19`.

Changed only the WEDDING terminal:

- hide `DECOR / WEDDING_CAPTION_STRIP`;
- keep/reposition a 5px yellow terminal rule;
- keep `06`, `2026.10.24`, `WEDDING`, and closing copy native/editable;
- switch the previous white-on-navy terminal copy to dark navy on cream;
- add native magenta `FINAL DESTINATION / 06` kicker;
- no new photo/raster/card/generated asset/image hash.

Expected improvement: preserve a strong final destination while making the bottom read as the same editorial system as 01/03/05.

Regression risk: loss of contrast, weak endpoint closure, bottom-safe-area pressure, or pale page-ending dead space.

## Visual evidence

### Whole / thumbnail

FR at ~700–1000px: PASS. WEDDING remains visually distinct, but the full-width UI-like box disappears. The right page reads as one cream editorial field below the dominant hero rather than `chronology + footer module`.

### Reading scale

PASS. `05 入籍` flows into a thin yellow terminal line, then native final-destination copy. Reading order remains clear without the navy container.

### Actual size

`1904:44 / right page` rendered at exact `794×1123`: PASS. Native WEDDING/date/copy remain readable, contrast is sufficient on cream, and terminal hierarchy is preserved.

## Structure QA

FR right page:

- visible native text: `32`;
- visible IMAGE fills: `3`;
- absolute text collisions: `0`;
- 18px safe-area risks: `0`;
- page-level stray nodes inside candidate bounds: `0`;
- existing image hashes preserved:
  - travel texture `691a6ceed471a5d8efa144052a10564eed177b4f`;
  - hero `e3738476f760932bb5b09c9d60f174dd6c84049d`;
  - event-03 photo `439a719d73f28e8dd2889f2026cccb15f345ec63`.

No image source/hash changes were introduced.

## Adoption / rollback

Adopted:

- FR renamed `PREFERRED / V6_INSIDE_FR_BOXLESS_WEDDING_TERMINAL_2026_08_19`.

Preserved rollback:

- FQ `1898:125` renamed `ROLLBACK / V6_INSIDE_FQ_EVENT5_NATIVE_TYPE_FEATURE_2026_08_19` and hidden on `47:2`.

## Review-board repair

After FR passed visual and structural QA, live review authority was repaired:

- FO `1891:18` → parent `845:2`, x=272000 y=0;
- FP `1895:18` → parent `845:2`, x=273800 y=0;
- FR `1904:18` → parent `845:2`, x=275600 y=0;
- EW remains x=272000 y=1300;
- FN remains x=273800 y=1300;
- FM remains x=275600 y=1300.

Fresh readback: all six preferred spreads visible, all parent `845:2 / 00_RURUBU_START_HERE`. FO screenshot after reparent matched its prior appearance. Internal design was not modified by the page reparent.

Start Here status updated to:

`V5 FU/FX · V6 FO + FP/FR + EW MEMORY SPOTS + FN CAFE & TABLE + FM 1DAY PLAN · V7 HOLD`

## Asset lifecycle truth

- generated this run: `0`;
- generated adopted this run: `0`;
- Drive saves: `0`;
- external binary placements: `0`;
- new image hashes: `0`;
- native variable text preserved: YES;
- replaceable photos preserved: YES;
- screenshot verified: YES;
- structure verified: YES;
- rollback preserved: YES.

## Decision

`FR_BOXLESS_WEDDING_TERMINAL_ADOPTED / REVIEW_BOARD_DRIFT_REPAIRED / VERIFIED_LOCAL / ROLLBACK_SAFE`.

The exact navy/magenta/yellow typography, WEDDING wording, coordinates and chronology layout remain Rurubu-specific. Cross-item candidate is the judgment method: re-test a container after surrounding hierarchy matures; remove it only if contrast, grouping and closure survive without it.
