# RURUBU V6 FA — 1DAY photo-led stops QA

Date: 2026-08-19
State: `VERIFIED_LOCAL / ADOPTED / V7_HOLD / NOT_PRINT_READY`

## Scope

Rurubu WEDDING only. Figma file `bfM0d4c9dCeBv5pCkJ3TNM`. No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, ADD item, or V7 production state was inspected or edited.

## Starting authority

- GitHub main at run start: `826e0c268aa49f8873c54eea8bae1ee02a5d3ff3`.
- Current status before write: `EZ + ET/EN + EW + EY + EU`.
- Drive root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.
- Old 1DAY preferred: EU `1818:2`, right `1818:30`.

## Visible problem

Same-scale review of the six preferred V6 spreads showed the 1DAY right page as the weakest remaining page. The information was correct and editable, but each stop still read as a narrow text module on the left paired with a similarly weighted photo on the right. At thumbnail and reading scale this preserved itinerary-template rhythm and unused cream mass compared with the stronger photo-led spreads.

## Neutral learning consumed

The non-Rurubu neutral lesson `2026-08-17-nrsl-unequal-content-mass-columns.md` was consumed only as a structural hypothesis: unequal visual mass should follow semantic/content responsibility rather than equal-grid aesthetics. No non-Rurubu Figma, Drive, asset, ledger, palette, geometry, or item-specific state was inspected or copied.

## Bounded test

Rollback-safe duplicate `1840:2` was created from EU. The left page, all copy, all image hashes, and all four semantic stop roles were preserved. Only the right-page stop/photo geometry was changed:

- STOP01 photo remains compact: `238×210`, source `240×220`.
- STOP02 becomes the dominant mid-page photo: `480×290`, source `810×552`.
- STOP03 becomes a smaller bridge: `290×220`, source `352×368`.
- STOP04 becomes the closing photo field: `480×220`, source `732×498`.
- stop text groups were moved closer to their corresponding photos;
- no card, new rule system, shadow, gradient, generated decoration, new text role, new photo, new image hash, or Drive asset was added.

## Three-scale evidence

- whole-item / 900px: PASS and stronger than EU;
- reading / 1200px: PASS;
- actual-size right page `1840:33`, `794×1123`: PASS;
- visible native text: `25`;
- same-parent absolute text intersections: `0`;
- 18px text safe-area risks: `0`;
- visible image roles: `4`;
- intrinsic-size violations: `0/4`.

The actual-size screenshot preserves the sequence `10:00 → 12:30 → 16:00 → 19:00`, but the photography now reads as dominant/support/bridge/closing rather than four repeated modules.

## Promotion / rollback

Promoted:

- FA `1840:2 / PREFERRED / V6_INSIDE_FA_1DAY_PHOTO_LED_EDITORIAL_STOPS_2026_08_19`
- right page `1840:33`.

Rollback:

- EU `1818:2` renamed to `ROLLBACK / V6_INSIDE_EU_1DAY_LOWER_EDITORIAL_FEATURE_2026_08_19` and hidden.

Start Here `845:27` updated to:

`V5 FU/FX · V6 EZ + ET/EN + EW MEMORY SPOTS + EY CAFE & TABLE + FA 1DAY PLAN · V7 HOLD`

## Asset lifecycle

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- image-source changes: `0`;
- native variable text preserved: `YES`;
- replaceable photo roles preserved: `YES`;
- rollback preserved: `YES`.

## Decision

`VERIFIED_LOCAL / ADOPTED`.

FA is visually stronger than EU because the route page now gets magazine-like photo hierarchy without sacrificing the native schedule, editability, source fidelity, or destination semantics. Final photography/copy, page imposition, printer template, PDF preflight and physical proof remain outside this dummy-design completion state.