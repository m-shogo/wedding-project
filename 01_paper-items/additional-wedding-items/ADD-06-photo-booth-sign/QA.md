# ADD-06 フォトブースサイン — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NATIVE_EDITORIAL_PRODUCTION_PROMOTED / ROLLBACK_SAFE / NOT_PRINT_READY`
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`
Updated: 2026-08-14

This file began as the 2026-08-02 pre-Figma QA checklist. The live reopened production supersedes the stale `PREPARED_FOR_FIGMA / Visual production QA pending` declaration.

## Live production authority

- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- page: `0:1 / ADD-06_PHOTO_BOOTH_SIGN`
- production: `1:2 / FRAME_ADD06_A3_PORTRAIT`
- Drive folder: `ADD-06_フォトブースサイン` / `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb`
- promoted-production evidence: `FIGMA-NATIVE-EDITORIAL-PROMOTION-2026-08-12.md`

## Current visual / structure QA

Fresh 990×1400 production screenshot and live structural readback reconfirm the promoted editorial direction:

- Japanese headline `旅の記憶を、ここで一枚。` remains the dominant hierarchy;
- the former four blank contact windows are now four intentional native editorial fragments rather than unfinished placeholders;
- promoted motifs remain individually editable and role-specific: print folio, botanical, coast contour and night field;
- production has 11 native text nodes / 10 visible, 0 raster IMAGE fill nodes and 0 visible text outside frame bounds;
- all four promoted motif frames are exactly 174×180 and `clipsContent=true`;
- production root remains 990×1400 with `clipsContent=true`;
- no flatten/raster replacement was introduced and variable text remains native editable;
- screenshot QA still shows no dashboard-card feel, fake guest photography, airplane/passport/stamp cliché, gradient or glow.

## Fresh visual polish — 2026-08-14

Observed latest `main` immediately before the production write: `138f10c2d847c813eb0aecdecb14a017ac7aa6ca`.

Fresh 990×1400 actual-size review found `WEDDING / PHOTO / ARCHIVE` on the lower left navy rail acting as decorative English series filler rather than guest-facing information. The Japanese hero, `PHOTO BOOTH` role label, four editorial fragments, date and placement field already establish the function and hierarchy; keeping the three-line rail mark added template/brand-sticker density without adding meaning.

Rollback-safe proof created before mutation:

- `19:2 / ROLLBACK_ADD06_PRE_RAIL_FILLER_REMOVAL_2026_08_14` (`visible=false`)

Production root remained `1:2`. Only the redundant rail text was hidden:

- `3:61 / TXT_RAIL_MARK / WEDDING\nPHOTO\nARCHIVE` → `visible=false`

Post-write whole/actual-size screenshot: PASS. The left rail now works as a quiet structural field instead of carrying an unnecessary pseudo-brand label, while the asymmetrical Japanese editorial hierarchy and four contact fragments remain intact.

Post-write structure readback:

- 11 native text / 10 visible / IMAGE 0 / visible text outside root 0
- root remains 990×1400, `clipsContent=true`
- four production motifs remain 174×180 and `clipsContent=true`
- `3:61` reads back hidden
- rollback `19:2` reads back hidden
- no flattening, raster replacement or variable-copy invention.

Drive authority was live-read immediately before the Figma write and remains `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`; Drive write 0.

Image decision: `IMAGE_GENERATION_NOT_REQUIRED`. The defect was redundant English filler, not missing imagery.

Current result: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

## Drive / image asset state

The exact Drive authority is live. Four serious non-person raster comparison masters are recorded in `FIGMA-NATIVE-EDITORIAL-PROMOTION-2026-08-12.md`, but the current production deliberately uses the native editorial version because it won the live visual comparison and remains fully editable. Do not auto-replace it with the stored raster candidates without a fresh whole/reading/detail screenshot comparison.

## Deferred finalization

- [ ] final photo-booth wording / placement location
- [ ] actual installation sightline and distance check
- [ ] intended stand / board / mounting method
- [ ] printer template/profile, exact bleed/safe-area proof
- [ ] 100% physical print and venue-lighting check

Keep `NOT_PRINT_READY` until physical/vendor checks and final copy are authoritative.