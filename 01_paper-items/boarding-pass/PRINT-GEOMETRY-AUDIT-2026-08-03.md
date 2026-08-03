# BOARDING PASS — Print Geometry Audit — 2026-08-03

Status: `LIVE_STRUCTURE_CLEANUP_PASS / STUB_NAME_STRESS_QA_PASS / LIVE_PRINT_GEOMETRY_AUDITED / FINAL_CONTENT_PENDING / VENDOR_TEMPLATE_UNRECORDED / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/P2PtpMyhyZqHYe1ZBBCD13
Starting/write-check main SHA: `cd1db230da312a35906becf230a9868f4020e536`

## Live state checked

- GitHub `main` was checked before work and immediately before this write.
- Google Drive BOARDING PASS root `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql` was checked live.
- Live production Figma front `8:5` and back `8:73` were inspected programmatically and rendered for screenshot QA.
- RURUBU Figma, Drive scope, and item-specific GitHub paths were not read or modified.

## Production geometry observed

Both production frames are:

- size: `1200 × 550` Figma units;
- `clipsContent=true`;
- frame-level export settings: none;
- dedicated named `BLEED`, `TRIM`, `SAFE`, or `FOLD` guide nodes: none detected.

Front `8:5` contains a decorative perforation cue at the stub boundary, but it is not a vendor-authoritative cut/perforation contract.

Observed minimum text sizes:

- front: `11` Figma units;
- back: `13` Figma units.

These values cannot honestly be converted to physical point size until the final intended millimetre dimensions and export scale are recorded.

## Screenshot QA

Front `8:5`:

- main passenger name remains readable;
- corrected stub name remains inside the stub;
- date, gate, boarding time, venue, table number, barcode decoration, route, and stamp remain visible;
- no new clipping, overlap, or unintended disappearance was found.

Back `8:73`:

- title and Japanese thank-you copy remain readable;
- date/location line, stamp, route decoration, folio band, and footer remain visible;
- no independent visual defect requiring a safe Figma change was found in this run.

No production node was edited because the remaining print uncertainty is a missing external contract, not a confirmed canvas defect.

## Drive audit

The live BOARDING PASS root currently exposes:

- `20_制作素材` — folder ID `1QgPsr8nmMeWoHMBK2GubDWIWi64l9UYE`;
- `10_参考画像・リサーチ` — folder ID `13Lr2OTYj1uWWO2812mCHR0fDIED6uj0d`;
- `02_航空チケット風_デザイン言語化・再現プロンプト.md` — file ID `1mUUJ5V37mOmZsmrEBD85991h2-g5eG0C`.

A Drive search for a BOARDING PASS print template, bleed specification, or print-vendor contract returned no matching document.

Drive writes: `0`.
Asset regeneration: `0`.

## Honest blocker

Do not infer physical dimensions, bleed, safe area, cut line, perforation line, minimum type size, color profile, or PDF export preset from the current `1200 × 550` canvas alone.

Before `PRINT_READY`, record or obtain:

1. final physical width and height in millimetres;
2. print vendor or printer-authoritative template;
3. required bleed and safe area;
4. whether the stub is decorative, cut, or perforated;
5. minimum accepted text size at 100% output;
6. export PDF preset/color contract;
7. one 100% physical proof.

## Next safe priority

BOARDING PASS has no newly confirmed independent visual defect after structure and native-text stress QA. Retain the final-data and vendor-template blockers, and move to `青春ふたりきっぷ` for its next live structural/visual audit without claiming BOARDING PASS is print-ready.
