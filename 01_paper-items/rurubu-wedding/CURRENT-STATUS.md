# るるぶWEDDING — CURRENT STATUS

Date: 2026-08-02
Current authority: live Figma + GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

## Current declaration

`RURUBU_V5_CURRENT_CANDIDATE / REALISTIC_DUMMY_PACK_READY_IN_DRIVE / FIGMA_HIGH_RES_PHOTO_IMPORT_BLOCKED / REAL_CONTENT_PENDING / PRINT_TEMPLATE_PENDING / NOT_PRINT_READY`

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

## Important visual truth

Although all 13 roles technically contain IMAGE fills, screenshot QA shows that the current large-role images are low-resolution or visibly pixelated. The cover hero, back main memory image, and history image are not acceptable as final commercial-quality photographs.

Do not claim the realistic generated 13-image pack is already applied to Figma.

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

## Current blocker

The high-resolution pack could not be transferred into Figma from this execution environment.

Verified causes:
- Figma returned single-use upload URLs, but the local container could not resolve `mcp.figma.com`.
- `figma.createImageAsync` is unavailable.
- `fetch` is unavailable inside the current `use_figma` runtime.
- large inline base64 payloads were truncated.

This blocks the final high-resolution dummy-photo placement pass, not the underlying layout structure.

## Work already performed

- V5 working frames renamed to Current candidates.
- live fill audit completed.
- three large/weak roles and one empty-looking small role reviewed and reassigned using existing in-file images.
- generated realistic photo set saved to Drive.
- whole-spread screenshots reviewed.
- truthful GitHub execution log created.

The in-file reassignment did not eliminate all large-image pixelation, so the item remains below the intended market-ready level.

## Next required work

1. Recover a working binary asset-upload path into Figma.
2. Place the 13 Drive images into their matching semantic roles.
3. Re-run crop, contrast, text-overlay, and fold QA.
4. Reduce remaining Web UI card/badge density.
5. Re-run whole/page/detail screenshots.
6. Replace dummy photos and copy with approved real content.
7. Apply the exact print-vendor template.
8. Export PDF, print at actual size, and complete physical proof QA.

## Stop conditions

Do not claim `DESIGN_FINAL`, `PHOTO_QA_PASS`, or `PRINT_READY` while:
- high-resolution photo import remains blocked,
- large images remain pixelated,
- dummy content remains,
- the exact print template is not applied,
- final PDF and physical proof QA are incomplete.
