# BOARDING PASS — Stub Name Stress QA — 2026-08-03

Status: `LIVE_STRUCTURE_CLEANUP_PASS / STUB_NAME_STRESS_QA_PASS / FINAL_CONTENT_PENDING / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/P2PtpMyhyZqHYe1ZBBCD13
Starting/write-check main SHA: `a5dfc8c0ff223fb7e66346061a0c827663cda679`

## Live state checked

- GitHub `main` was read before work and immediately before this write.
- Google Drive BOARDING PASS root `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql` was confirmed live as `03_航空チケット風_エスコートカード`.
- Live Figma production front `8:5` and native text nodes were inspected directly.
- RURUBU Figma, Drive scope, and item-specific GitHub paths were not read or modified.

## Concrete defect

Production stub name `8:48` (`TXT_STUB_NAME`) used `textAutoResize=WIDTH_AND_HEIGHT`, width `111`, and font size `18`. A realistic long international name expanded horizontally beyond the stub and was visibly clipped at the right edge.

The main passenger field `8:29` already had a bounded width of `790` with height-only resizing and retained the stress value without clipping, so it was not changed.

## Safe proof and evidence

A non-production duplicate `12:2` (`QA_STRESS_FRONT_LONG_NAMES_2026_08_03`) was created from production front `8:5`.

Proof values:

- main: `髙橋 アレクサンダー・クリストファー 様`
- stub: `ALEXANDER CHRISTOPHER / TAKAHASHI-MONTGOMERY`

The original stub settings clipped the proof name. On the duplicate, a bounded native-text geometry was tested:

- width: `190`
- font size: `14`
- `textAutoResize=HEIGHT`

Screenshot QA showed the long stub value wrapping to three readable lines inside the stub, without colliding with table number, date, gate, or barcode.

## Production change

Only production text node `8:48` was changed:

- width `111 → 190`
- font size `18 → 14`
- auto resize `WIDTH_AND_HEIGHT → HEIGHT`

Preserved:

- node ID and semantic name;
- native editable text;
- production frame and all other nodes;
- date, gate, table number, barcode, perforation cue, plane vector, fills, and layout.

No node was deleted, flattened, rasterized, or replaced.

## Post-change screenshot QA

Production front `8:5` was rendered at natural `1200 × 550` size after the change.

Verified:

- current dummy stub name remains readable on two lines;
- no clipping, overlap, or unintended disappearance;
- main passenger hierarchy remains unchanged;
- table number, date, gate, barcode, route, venue, and stamp remain visible;
- production frame geometry remains `1200 × 550`.

## Drive and asset decision

- Drive writes: `0`
- asset regeneration: `0`

No asset defect was found; this was a native-text resilience issue.

## Remaining blockers

- final guest names and table assignments;
- final venue/copy confirmation;
- vendor-authoritative trim, bleed, safe-area, and export contract;
- actual-size inspection and one physical proof before bulk printing.

## Next safe priority

Continue BOARDING PASS with print-geometry audit and any remaining bounded-text checks that do not require inventing vendor specifications. If no independent visual defect remains, retain the documented print/final-data blockers and move to 青春ふたりきっぷ.