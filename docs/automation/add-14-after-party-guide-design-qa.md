# ADD-14 二次会案内 — Figma Design QA

Date: 2026-08-10
Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Git main before write: `c5734f16e051acf06436bf289471a71b9f629e12`
- Figma production file key: `IygEr140Yqk12LsGL3TFrT`
- Production nodes: A6 `1:2`, A5 `1:18`
- Clean-room comparison nodes: A6 `3:2`, A5 `3:27`
- Long-copy stress nodes: A6 `4:2`, A5 `4:27`
- Pre-V2 rollback nodes: A6 `5:2`, A5 `5:18`
- Drive folder: `ADD-14_二次会案内` / `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`

## Reopened visual audit
The previous dark one-column layout remained structurally valid but looked like a sparse information template: venue, times, fee, access, RSVP, QR and contact were compressed into a single left-aligned stack, while the replaceable QR area read like an admin/UI block. That earlier structural PASS was therefore not reused as sellable-visual evidence.

A materially different clean-room direction was built on `99_QA`: warm paper field, deep-night side rail, restrained rust/mint accents, a Japanese serif editorial headline, three-column reception/start/end itinerary rhythm, and a separate bottom information band. The QR role remains a native replaceable frame and is intentionally not a scannable/fabricated code.

Image generation was not required for this item: the screenshot-supported bottleneck was information hierarchy and typography, not missing hero art. No raster asset was generated or added to Drive.

## Screenshot QA and correction loop
- Legacy A6/A5 whole-item inspection: visual reopen required.
- Clean-room A6/A5 first screenshot: materially stronger editorial hierarchy, but venue-name/address collision was visible.
- Corrected venue block still failed an intentionally long venue-name stress case.
- Address was therefore moved into the itinerary band and the time row reflowed downward.
- Final clean-room A6/A5 whole-item and reading-scale screenshots: PASS.
- Long-copy stress screenshot with extended venue, address, fee, access, RSVP, contact and notice copy: PASS after the reflow.
- Production screenshots after promotion: PASS at A6 and A5 scales.

## Production promotion
The legacy production was preserved on `99_QA` before promotion. Clean-room V2 was then promoted into the existing production root IDs (`1:2` and `1:18`) so downstream references remain stable.

Final production art direction:
- warm off-white paper field rather than full dark fill;
- navy night rail with Japanese-first secondary label;
- `披露宴のあと、もう少しだけ。` as the editorial hierarchy anchor;
- venue as a distinct top-right authority block;
- address separated into the itinerary band to improve long-name resilience;
- reception/start/end presented as three readable columns rather than a stacked form;
- fee/access/RSVP/contact grouped as print information, not card UI;
- QR remains a native, replaceable, non-scannable placeholder;
- no rounded dashboard cards, shadows, gradients, fake transport data, or decorative stock travel motifs.

## Structural readback
Final production:
- A6 `1:2`: 592×420, 18 native text nodes, 0 image fills, 0 text nodes outside frame bounds.
- A5 `1:18`: 840×592, 18 native text nodes, 0 image fills, 0 text nodes outside frame bounds.
- Replaceable QR frames: A6 `5:54`, A5 `5:78`.
- Clean-room and long-copy stress variants also read back with 0 image fills and 0 text outside frame bounds.
- No flatten/raster replacement introduced; variable information remains native editable text.

## Drive readback
- Folder ID: `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`
- Folder title: `ADD-14_二次会案内`
- MIME: `application/vnd.google-apps.folder`
- Current files: 0
- Drive write: none; no justified raster production asset exists for this item.

## Deferred / blocked required input
- Confirm whether an after-party will actually be held. If not, change item state to `NOT_REQUIRED`.
- Official venue name/address/floor.
- Reception/start/end times.
- Fee/payment method.
- Access/realistic travel time.
- RSVP method/deadline and contact permission.
- Final official QR URL and device scan test.
- Printer template/profile, exact physical bleed/safe-area verification, 100% A6/A5 proof.

These inputs block finalization, not design progression. ADD-14 now satisfies the reopened visual target and may progress to ADD-15.

## 2026-08-12 fresh production spot-check — QR placeholder polish

Observed latest `main` immediately before the Figma write: `1fc11f364b19a241d8f5861c14083c43447dd63c`.

Fresh A6/A5 screenshots found one remaining production-facing implementation note inside the QR role: `QR / FINAL URL / REQUIRED`. Although structurally harmless, it read like an internal admin label rather than sellable stationery and conflicted with the Current rule that unknown QR destinations remain explicit semantic layout dummies.

Rollback-safe production change:
- hidden rollback A6: `7:2 / ROLLBACK_ADD14_A6_PRE_QR_PLACEHOLDER_JA_FIX_2026_08_12`
- hidden rollback A5: `7:27 / ROLLBACK_ADD14_A5_PRE_QR_PLACEHOLDER_JA_FIX_2026_08_12`
- A6 native text `5:55 / TXT_QR_PLACEHOLDER`: changed to `QR\n[QRリンク先 ·\nLAYOUT DUMMY]`
- A5 native text `5:79 / TXT_QR_PLACEHOLDER`: changed to the same semantic placeholder
- production root IDs remained A6 `1:2`, A5 `1:18`

Post-write screenshot QA: PASS at A6 592×420 and A5 840×592. The QR box remains clearly replaceable but no longer displays internal-looking English production instructions.

Post-write structure readback:
- A6: 18 native text, 0 IMAGE fill nodes, 0 text outside root, `clipsContent=true`
- A5: 18 native text, 0 IMAGE fill nodes, 0 text outside root, `clipsContent=true`
- both rollback copies are hidden
- no flatten/raster replacement introduced

Drive live readback before the Figma write confirmed `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs / ADD-14_二次会案内`. Drive write: 0. Image generation was not required because the defect was semantic placeholder typography, not missing imagery.
