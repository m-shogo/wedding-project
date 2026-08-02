# るるぶWEDDING — CURRENT STATUS

Date: 2026-08-02
Current authority: live Figma + GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

## Current declaration

`RURUBU_V5_CURRENT_CANDIDATE / REALISTIC_DUMMY_PACK_READY_IN_DRIVE / INLINE_FIGMA_IMAGE_IMPORT_PATH_PROVEN / 1_OF_13_HIGH_RES_DUMMIES_APPLIED / REAL_CONTENT_PENDING / PRINT_TEMPLATE_PENDING / NOT_PRINT_READY`

## Current live Figma

Page: `01_RURUBU_WEDDING`

Current candidates:
- `01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE` — node `77:18`
- `02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE` — node `77:290`

Rollback evidence remains preserved:
- outer V4 — node `59:2`
- inside V4 — node `59:178`

## Verified structure

- semantic photo roles: `13 / 13`
- IMAGE fills: `13 / 13`
- gradient-only photo roles: `0`
- ordinary copy remains native Figma text
- semantic role names remain intact
- V4 rollback remains available

## Verified new progress

A safe inline binary-import path into live Figma was proven on 2026-08-02:
- source image was resized and JPEG-compressed locally
- bytes were base64-encoded
- `figma.base64Decode()` + `figma.createImage()` created a new Figma image hash
- the existing semantic cover hero node `77:148` was updated without flattening text or changing the frame hierarchy
- shared metadata records the Drive source role

Verified live result:
- cover hero `IMG_HERO` — generated Yokohama dummy applied
- imported byte length: `5,927`
- Figma image hash: `a776d183a5ea8715f6fe9186c4c0749973df06b4`
- screenshot QA completed after placement

This resolves the earlier assumption that all binary import paths were blocked. The direct `upload_assets` URL remains inaccessible from the local container, but inline compressed image insertion works.

## Important visual truth

The cover hero now uses the generated Yokohama dummy rather than the previous in-file reassignment. However, only `1 / 13` generated high-resolution dummy roles has been applied through the proven path so far.

The remaining large-role images—especially back main memory and history—still require replacement and screenshot QA. Do not claim the full realistic generated 13-image pack is applied or that photo QA has passed.

## Realistic dummy photo pack

Drive folder:
- `RURUBU_V5_DUMMY_PHOTOS_2026-08-02`
- ID: `1tAvBO9TodEKVHVZnABD73rEPUGG8iu0N`

The folder contains 13 individually named, realistic generated dummy photos for:
- cover hero and cover snap
- groom and bride profiles
- history
- four memory spots
- back main image
- three Friends & Family images

Full file IDs and execution evidence are recorded in:
- `FIGMA-DESIGN-RESEARCH-AND-V5-BRUSHUP-2026-08-02.md`

## Current transfer strategy

Use the proven inline path incrementally:
1. resize each source to a role-appropriate pixel size
2. JPEG-compress to keep the base64 payload safely below the `use_figma` code limit
3. insert one or a small group of images per call
4. preserve each semantic photo node and native text
5. run screenshots after large-role groups
6. record only verified image hashes and node IDs

The direct upload URL route is still unavailable because the container cannot resolve `mcp.figma.com`; do not rely on it.

## Next required work

1. Apply the remaining `12 / 13` Drive images through the proven inline path.
2. Prioritize back main memory and history before small roles.
3. Re-run crop, contrast, text-overlay, and fold QA after each large-role group.
4. Fix the weakest three visual areas identified by screenshots.
5. Reduce remaining Web UI card/badge density where it improves editorial rhythm.
6. Re-run whole/page/detail screenshots and structural audit.
7. Replace dummy photos and copy with approved real content.
8. Apply the exact print-vendor template.
9. Export PDF, print at actual size, and complete physical proof QA.

## Stop conditions

Do not claim `DESIGN_FINAL`, `PHOTO_QA_PASS`, or `PRINT_READY` while:
- the remaining generated photos are not applied and audited,
- large images remain pixelated,
- dummy content remains,
- the exact print template is not applied,
- final PDF and physical proof QA are incomplete.
