# WEDDING PASSPORT — selected clean-room family native text auto-height QA

Date: 2026-08-17
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_SELECTED_FAMILY_CANDIDATE / NATIVE_TEXT_AUTOHEIGHT_REPAIRED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `72d3e06f8a5622514e7e7b53706229152f62cd8f`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- selected family: V3 front `144:3`, V3 back `144:26`, V2 menu `138:43`, V2 seating `138:89`
- Drive authority: `01_パスポート風_メニュー・ドリンク・座席表` / `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- retained legacy production: unchanged

## Observed defect

Fresh structural audit applied the project-level native-text sizing check after the prior proof-language cleanup. All four selected pages looked correct in screenshots, but their native text geometry still contained small fixed-height nodes with `textAutoResize=NONE` at approximately 10 px.

Observed selected roles included:

- V3 front: brand, large date, year, Japanese title, subtitle, index;
- V3 back: brand, Japanese title, message body, route/date line, route subline, issue placeholder, folio;
- V2 menu: kicker and Japanese title;
- V2 seating: kicker, Japanese title, head-table label.

The defect was latent rather than immediately visible: Figma can render text beyond a tiny fixed box while future copy/font/edit/export behavior remains fragile.

## Rollback

Exact hidden rollback copies were created before mutation.

V3 page `144:2`:

- `151:2` — front pre-autoheight
- `151:27` — back pre-autoheight

V2 page `138:6`:

- `151:86` — menu pre-autoheight
- `151:152` — seating pre-autoheight

All remain hidden. Older clean-room studies, previous proof-cleanup rollbacks, and legacy production remain intact.

## Figma changes

Only native text sizing was repaired. No composition, visual motif, vector artwork, placeholder meaning, guest count, raster, or legacy production changed.

Selected V3 repaired native text:

`144:5, 144:6, 144:7, 144:8, 144:9, 144:22, 144:29, 144:30, 144:31, 144:39, 144:40, 144:41, 144:42`

Selected V2 header/support roles repaired:

`138:45, 138:46, 138:47, 138:88, 138:91, 138:92, 138:93, 138:95, 138:142`

Affected fixed-height native text now follows content height instead of retaining a 10 px fixed box.

## Fresh V3 long-copy stress

Fresh hidden stress clones were created from the repaired selected V3 rather than reusing stale pre-repair evidence:

- `151:44 / STRESS / PASSPORT V3 FRONT / LONG NAMES`
- `151:69 / STRESS / PASSPORT V3 BACK / LONG MESSAGE`

Front stress uses a materially longer couple-name string while preserving the native lower issue block. Back stress uses a longer multi-paragraph Japanese closing message plus a longer issue-information placeholder.

Readback after stress:

- front stress: fixed-height suspicious text `0`; proof-language `0`; outside text `0`; text-text collisions `0`; long-name node expands to 100 px; deepest native note bottom `1986 / 2100`;
- back stress: fixed-height suspicious text `0`; proof-language `0`; outside text `0`; text-text collisions `0`; long body expands to 468 px; long issue placeholder expands to 56 px; folio bottom `1974 / 2100`.

## Selected-family structure QA

Post-write selected roots:

- V3 front `144:3`: suspicious fixed-height text `0`; proof-language `0`; outside text `0`; text collisions `0`; IMAGE fills `0`;
- V3 back `144:26`: suspicious fixed-height text `0`; proof-language `0`; outside text `0`; text collisions `0`; IMAGE fills `0`;
- V2 menu `138:43`: suspicious fixed-height text `0`; proof-language `0`; outside text `0`; text collisions `0`; IMAGE fills `0`;
- V2 seating `138:89`: suspicious fixed-height text `0`; proof-language `0`; outside text `0`; text collisions `0`; IMAGE fills `0`.

Seating integrity after repair:

- exactly 11 guest-registry table nodes;
- every table still contains exactly 7 guest lines;
- no eighth guest was added.

## Three-scale screenshot QA

Fresh post-repair screenshots:

- whole/thumbnail: 500 px renders for all four selected roots PASS;
- V3 front/back hierarchy and archival-port/end-note visual direction remain unchanged;
- menu and seating remain readable at 500 px without proof-sheet language;
- menu/seating actual-size `1480×2100` renders PASS after auto-height repair.

This change therefore hardens editability without changing the selected clean-room art direction or Sellable Visual judgment.

## Drive / generated asset decision

Drive authority metadata was re-read before the audit. New Drive assets: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the screenshot-supported issue was native text geometry, not a missing visual asset.

## Decision

`NATIVE_TEXT_AUTOHEIGHT_REPAIRED / LONG_COPY_STRESS_PASS`.

The clean-room family remains the current selected sellable visual candidate. Legacy production remains untouched and available for rollback/reference. Keep `NOT_PRINT_READY` until final names, menu/drink copy, seating assignments, issue information, printer/export conditions, and physical proof are authoritative.
