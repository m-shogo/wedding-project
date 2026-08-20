# Rurubu WEDDING V6 — GK Cafe/Table reader-facing closing QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Source preferred: GJ `1954:2`
Adopted preferred: GK `1991:2`
Right page: `1991:33 / PAGE / GOURMET_TABLE_GUIDE`

## Visible problem

GJ's Table-page lower closing still used the small generic/template-like label `3 WAYS / ENJOY` plus `SWEETS / 甘いもの`, `VIEW / 景色`, `TALK / 会話`. The surrounding page had already matured into reader-facing Japanese editorial copy, so this last micro-module read more like a reusable template component than finished travel-magazine content.

## Root-cause hypothesis

The defect was not missing imagery, missing containment, or insufficient density. It was lexical hierarchy: an internal/generic English micro-label was carrying a closing role that should be reader-facing. Adding another card, photo, raster decoration, or line would increase UI/module reading without solving that mismatch.

## Bounded rollback-safe test

A duplicate of GJ was created as candidate GK and only four native text nodes were changed:

- `TEXT / THREE_WAYS_KICK`: `3 WAYS / ENJOY` → `ふたりの、3つの楽しみ。`
- `TEXT / WAY_LABEL_01`: `SWEETS / 甘いもの` → `甘いもの`
- `TEXT / WAY_LABEL_02`: `VIEW / 景色` → `景色`
- `TEXT / WAY_LABEL_03`: `TALK / 会話` → `会話`

After the first screenshot, the closing headline was still too small/cyan and behaved like annotation. A second bounded refinement changed only that native headline to 23 px and the existing navy body/title color. No image, crop, photo geometry, page geometry, card, shadow, gradient or raster changed.

## Expected improvement

Make the bottom of the Table page read as a finished Japanese editorial closing rather than a template affordance while preserving the existing dense travel-guide rhythm.

## Regression risk

A stronger closing title could collide with the three numbered columns or consume folio/safe-area reserve. Removing the English category labels could also reduce scan clarity if the Japanese labels were too small.

## Three-scale / structure evidence

- whole spread, ~1100 px render: PASS; GK is cleaner and more reader-facing than GJ;
- reading/page scale: PASS;
- actual-size right page `1991:33 / 794×1123`: PASS;
- native visible text on right page: `22`;
- absolute visible text collisions: `0`;
- 18 px text safe-area risks: `0`;
- image-role set/geometry/hash compared with GJ: unchanged;
- visible image hashes remain:
  - composed Cafe texture `691a6ceed471a5d8efa144052a10564eed177b4f` (`720×448`),
  - Dining hero `d76eb07d83d042f15044c8bc6bf68d73a73cd77d` (`732×498`),
  - Yokohama view `644f449c3bf2001a94d4b822d2b55e2614c11042` (`238×218`).

## Adoption / rollback

- GK `1991:2`: `PREFERRED / V6_INSIDE_GK_CAFE_TABLE_READER_CLOSING_2026_08_20`, visible at review-board x `273800`, y `1300`.
- GJ `1954:2`: preserved as hidden rollback.
- Start Here `845:27` updated to `... + GK CAFE & TABLE ...`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

## Asset lifecycle truth

- newly generated images: `0`;
- newly adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- native text editability: preserved;
- replaceable image roles: preserved;
- Drive root reverified before promotion: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Cross-item boundary

Transfer only the method: when a finished print layout still exposes a generic/internal micro-label at an editorial closing, test a reader-facing native-text rewrite before adding visual modules. Do not transfer Rurubu's exact copy, colors, page geometry, number treatment, dining photography, or travel-magazine art direction.
