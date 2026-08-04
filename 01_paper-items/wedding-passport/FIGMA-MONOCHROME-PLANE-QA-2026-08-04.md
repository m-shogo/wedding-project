# WEDDING PASSPORT — Monochrome Plane QA 2026-08-04

Status: `LIVE_VISUAL_FIX_APPLIED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/UbK8KmuWJcDeGScsN49Uor
Starting and pre-write main SHA: `28ae6e8396d2c7ca7dd554ae25ce467619b76912`

## Live authority verification

- GitHub `main` was checked at run start and immediately before the production Figma write.
- Standard Figma metadata exposed only `00_README`, so completion was not assumed.
- Direct live Figma root inspection confirmed four pages in the same file key: `00_README`, `01_OUTSIDE`, `02_INSIDE`, and `99_QA`.
- Production front-cover frame was confirmed as `18:2 / FRAME_FRONT_COVER` on `01_OUTSIDE`.
- Google Drive parent folder `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw` was read live; `20_制作素材` (`1G4b7Qhtj6Ng7RRREtN_us4eKnwvCbWA6`) and `10_参考画像・リサーチ` (`1w3o1GeLX1SgOFDxWHvhG9sg2KRxsleoH`) remain present.
- No RURUBU/るるぶ Figma page, Drive item, asset, or item-specific Git document was modified.

## Visible defect

The front-cover airplane was stored as native text node `21:8 / EMBLEM_PLANE`, character `✈`, Noto Sans JP Bold, gold fill. The live screenshot rendered this glyph as a multicolour emoji-style aircraft, introducing blue/white photographic colour into an otherwise restrained navy-and-gold passport cover. This weakened the print-authentic, engraved-emblem treatment and was inconsistent with the surrounding monochrome linework.

## Rollback-safe proof

A production duplicate was created on `99_QA`:

- `34:2 / QA_FRONT_COVER_MONOCHROME_PLANE_PROOF_2026_08_04`
- proof vector: `34:67 / EMBLEM_PLANE_VECTOR_PROOF`
- preserved proof text node: `34:52`, hidden only inside the proof

The proof replaced only the rendered airplane appearance with an editable monochrome vector silhouette using the existing gold colour. Screenshot QA confirmed that the plane reads as part of the globe emblem rather than a pasted emoji, while preserving hierarchy, spacing, route line, title, serial, date, and footer.

## Production change

Production frame `18:2`:

- created `34:69 / EMBLEM_PLANE_VECTOR_CURRENT`
- vector size: `64 × 64`
- vector position aligned to the previous glyph area
- fill: `#C79C45`
- preserved original semantic text node `21:8 / EMBLEM_PLANE` for rollback and set it to `visible=false`

No existing node was deleted, flattened, rasterized, or destructively replaced. No variable text, page size, frame size, crop, or asset was changed.

## Post-write screenshot and structure QA

Verified on the live production front cover:

- multicolour emoji rendering is gone
- airplane is monochrome gold and visually integrated with the globe linework
- title, subtitle, emblem initials, route, passport number, date, location, and footer are unchanged
- no clipping, accidental disappearance, or new overlap
- original airplane text node remains available for rollback
- production front-cover frame remains `18:2`

## Drive

Change count: `0`

No source-image defect or regeneration requirement was involved. The defect was confined to Figma glyph rendering.

## Remaining blockers

1. Venue-authoritative menu/drink text and final seating data.
2. Selected printer template and exact page order.
3. Bleed, safe area, fold contract, and minimum printable type/line confirmation.
4. 100% actual-size print proof and navy/gold output review.
5. Final PDF export and physical proof approval.

## Next priority

Continue WEDDING PASSPORT. Audit the remaining outside/inside production frames for the next concrete visual or print-readiness defect; do not declare print readiness until printer geometry and physical proof are complete.
