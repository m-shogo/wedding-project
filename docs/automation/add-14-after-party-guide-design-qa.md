# ADD-14 二次会案内 — Figma Design QA

Date: 2026-08-09
Status: `DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Git main before write: `9f2b541eb8e6abfbec390c55a68c2707c1f9d76b`
- Figma production file key: `IygEr140Yqk12LsGL3TFrT`
- Production nodes: A6 `1:2`, A5 `1:18`
- Rollback QA nodes: A6 `1:35`, A5 `1:51`
- Drive folder: `ADD-14_二次会案内` / `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`

## Design change
Created a native-editable conditional after-party guide rather than fabricating venue/event facts. The composition uses a deep navy editorial field, restrained mint route edge and destination node, Japanese-first hierarchy, hairlines, and deliberate negative space. No rounded-card UI, gradients, shadows, fake transport data, generated venue imagery, or provisional QR pattern is used.

All unknown venue, address/floor, reception/start/end time, fee/payment, access, RSVP, contact and notice fields are explicit `LAYOUT DUMMY` native text. QR remains a replaceable placeholder requiring the final official URL.

## Screenshot QA
- A6 whole-item screenshot: PASS
- A5 whole-item/reading-scale screenshot: PASS
- Detail hierarchy: PASS with semantic placeholders; final physical proof remains pending

## Structural readback
- A6: 592×420, 11 native text nodes, 0 image fills, 0 frame-bound text overflow
- A5: 840×592, 11 native text nodes, 0 image fills, 0 frame-bound text overflow
- Replaceable QR areas remain native frames
- Rollback copies preserved on `99_QA`
- No flatten/raster replacement introduced

## Deferred / blocked required input
- Confirm whether an after-party will actually be held. If not, change item state to `NOT_REQUIRED`.
- Official venue name/address/floor
- Reception/start/end times
- Fee/payment method
- Access/realistic travel time
- RSVP method/deadline and contact permission
- Final official QR URL and device scan test
- Printer template/profile, exact physical bleed/safe-area verification, 100% A6/A5 proof

These inputs block finalization, not design progression.
