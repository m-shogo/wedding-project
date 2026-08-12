# ADD-06 — native editorial contact-strip promotion — 2026-08-12

State: `SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS_EVIDENCE_RETAINED / NATIVE_EDITORIAL_PRODUCTION_PROMOTED / ROLLBACK_SAFE / NOT_PRINT_READY`

Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Run start `main`: `65a335e402f1e5231d54aa1a761a3ff406b68bec`
Observed latest `main` immediately before this write: `b1d75f42d0331ace1d3c56acea7263e1fa232738`

## Live authority

- Figma file key: `SVMALDUyhc2chxHa4fvdjx`
- page: `0:1 / ADD-06_PHOTO_BOOTH_SIGN`
- production: `1:2 / FRAME_ADD06_A3_PORTRAIT`
- Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`
- RURUBU/るるぶ was not read or written by this task.

## Fresh visual diagnosis

The live `990 × 1400` screenshot confirmed the previous reopened defect: the four right-side `174 × 180` contact windows were blank ivory rectangles. At thumbnail scale the strip read as unfinished placeholders, even though the Japanese typography, asymmetry and print-safe structure were otherwise sound.

A materially different clean-room comparison was therefore created instead of continuing decoration-only polish.

## Generated/image-asset workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN` for the model image generator.

The exact Drive authority was re-read and is no longer empty. Four previously saved non-person masters now exist and were visually inspected:

1. `ADD-06_CONTACT_01_COAST_CONTOUR_v1.png` — Drive ID `1sRk8hdldktwyfEE8JzBx7ILTswzXsvNE`
2. `ADD-06_CONTACT_02_ARCHITECTURAL_SHADOW_v1.png` — Drive ID `1LrksdJHFShLT93kj1ZnhNFXLqJJn4V43`
3. `ADD-06_CONTACT_03_BOTANICAL_CYANOTYPE_v1.png` — Drive ID `1VuXOgQ5_g7rwDCg-G6bZexabZAUwyKPU`
4. `ADD-06_CONTACT_04_NIGHT_HORIZON_v1.png` — Drive ID `1TdrAY2E5MawfPuwyR6hZTwA6HEpKPp6x`

They are serious comparison assets, but this runtime could not complete the final binary transport into Figma: the official Figma `upload_assets` endpoint was issued, then the raw POST failed before upload because `mcp.figma.com` DNS resolution was unavailable from the execution container. No claim is made that those exact Drive binaries were placed in Figma.

## Clean-room comparisons

Two bounded comparisons were created while production remained untouched:

- `8:2 / QA_ADD_06_NATIVE_EDITORIAL_CONTACT_STRIP_2026_08_12`
  - comparison frame `8:3 / COMPARE_ADD06_NATIVE_EDITORIAL_CONTACT_STRIP_V1`
  - four native editable motif frames: print folio, botanical, coast contour, night field
- `9:2 / QA_ADD_06_DRIVE_RASTER_CONTACT_STRIP_2026_08_12`
  - comparison frame `9:3 / COMPARE_ADD06_DRIVE_RASTER_CONTACT_STRIP_V1`
  - reserved for exact Drive raster placement; kept as comparison infrastructure only because binary transport was blocked

The native editorial version won the live screenshot comparison because it removes the empty-placeholder read immediately, keeps the right strip secondary to the Japanese title, avoids fake documentary photography, and remains entirely editable/print-native.

## Rollback and production promotion

Before production write, the pre-promotion state was cloned to:

- section `10:2 / ROLLBACK_ADD_06_PRE_NATIVE_EDITORIAL_PROMOTION_2026_08_12`
- frame `10:3 / ROLLBACK_FRAME_ADD06_PRE_NATIVE_EDITORIAL_PROMOTION`

Production root ID remained `1:2`. Four promoted native motif frames were inserted non-destructively over the existing empty window bases:

- `10:29 / EDITORIAL_FRAGMENT_01_PRINT_FOLIO_PRODUCTION`
- `10:36 / EDITORIAL_FRAGMENT_02_BOTANICAL_PRODUCTION`
- `10:41 / EDITORIAL_FRAGMENT_03_COAST_CONTOUR_PRODUCTION`
- `10:47 / EDITORIAL_FRAGMENT_04_NIGHT_FIELD_PRODUCTION`

`PHOTO_WINDOW_NO_04` remained native editable text and was changed to warm ivory for contrast over the night field. No variable copy was rasterized or baked into the motifs.

## Screenshot QA

Fresh post-promotion screenshots passed at:

- thumbnail: max dimension `500` (`354 × 500` render)
- reading / actual canvas size: `990 × 1400`

Observed result:

- the four-window strip now reads as intentional editorial memory fragments instead of empty placeholders;
- the Japanese title remains dominant at thumbnail and reading scale;
- `01–04` remain legible, including the repaired `04` contrast;
- no fake UI, guest imagery, airplane/passport/stamp cliché, gradients, glow or decorative filler were introduced;
- the production still reads as one print sign rather than a dashboard of equal cards.

## Structure / editability QA

Final live readback on production `1:2`:

- native text count: `11`
- raster IMAGE fill count: `0`
- promoted native motif count: `4`
- each motif: exact `174 × 180`, `clipsContent=true`
- hidden `GUIDE_SAFE`: preserved at `40,40 / 910 × 1320`
- top-level nodes outside production bounds: `0`
- flatten/rasterization introduced: `no`
- variable text remains editable: `yes`

Existing verified long-copy/safe-area/rollback evidence is retained; this run changes the visual-completion portion only.

## Completion decision

ADD-06 regains the reopened visual gate as:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`

The exact Drive raster masters remain optional comparison assets, not required for completion of the promoted native-vector art direction. If Figma binary upload transport becomes available later, they may be tested against the promoted native version, but they must not automatically replace it without whole/reading/detail screenshot comparison.
