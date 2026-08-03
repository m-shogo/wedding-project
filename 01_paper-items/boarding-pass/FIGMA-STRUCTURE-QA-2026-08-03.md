# BOARDING PASS — Live Structure QA — 2026-08-03

Status: `LIVE_STRUCTURE_CLEANUP_PASS / DESIGN_QA_PASS / FINAL_CONTENT_PENDING / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/P2PtpMyhyZqHYe1ZBBCD13
Starting/write-check main SHA: `6fb8117fa42cbaeed7e2a7ca1b12f8d9786fba10`

## Live state checked

- GitHub `main` was read before work and immediately before this write.
- Google Drive BOARDING PASS root `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql` was checked; the expected `20_制作素材` and `10_参考画像・リサーチ` folders remain present.
- Live Figma pages were inspected through the Plugin API: `00_README`, `01_FRONT`, `02_BACK`, `99_QA`.
- The RURUBU file, Drive scope, and item-specific GitHub paths were not read or modified.

## Concrete defect found

Both production pages contained two visible top-level frames with the same semantic production name and the same canvas origin:

### Front

- Current frame: `8:5` — `FRAME_FRONT`, `1200 × 550`
- Legacy frame: `1:5` — `FRAME_FRONT`, `1260 × 610`

### Back

- Current frame: `8:73` — `FRAME_BACK`, `1200 × 550`
- Legacy frame: `1:50` — `FRAME_BACK`, `1260 × 610`

The larger legacy frames were visually covered by the Current frames, but remained visible and shared the same semantic names. This created a real risk of selecting or exporting the wrong frame and made automated semantic lookup ambiguous.

## Safe non-destructive fix

No node was deleted, flattened, rasterized, or replaced.

- `1:5` renamed to `ARCHIVE_LEGACY_FRAME_FRONT` and set to `visible=false`.
- `1:50` renamed to `ARCHIVE_LEGACY_FRAME_BACK` and set to `visible=false`.

Current production node IDs, native editable text, vector plane artwork, layout, and fills were preserved.

## Post-change screenshot QA

Front `8:5` and back `8:73` were rendered again at their natural `1200 × 550` size.

Verified:

- no clipping, overlap, or unintended disappearance caused by hiding the legacy frames;
- front passenger hierarchy remains readable;
- long-name stress value remains within the main passenger field;
- route, date, gate, boarding time, venue, dominant table number, stub, perforation cue, and decorative barcode remain visible;
- back title, Japanese thank-you copy, date/location, route line, plane vector, stamp, folio band, and footer remain visible;
- only one Current production frame remains visible on each production page.

## Drive and asset decision

- Drive writes: `0`
- asset regeneration: `0`

No concrete resolution, provenance, crop, aspect-ratio, or AI-quality defect was found in the existing assets during this structure pass, so no asset was regenerated merely to create activity.

## Remaining blockers

- final guest names and table assignments;
- final venue/copy confirmation;
- vendor-authoritative trim, bleed, safe-area, and export contract;
- actual-size inspection and one physical proof before bulk printing.

## Next safe priority

Continue BOARDING PASS with native-text stress QA for the main passenger name and stub name, then audit physical print geometry without inventing a vendor scale. Do not mark the item print-ready until those checks and the final data are complete.
