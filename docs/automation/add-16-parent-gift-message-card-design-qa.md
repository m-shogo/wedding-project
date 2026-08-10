# ADD-16 両親贈呈品メッセージカード — Figma Design QA

Date: 2026-08-10
Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Git main immediately before write: `0e99b5162f1defaa930022a948410b08fa0d3d85`
- Item spec: `01_paper-items/additional-wedding-items/ADD-16-parent-gift-message-card/SPEC.md`
- Figma production file key: `ylmVBbwNcnjueYrymNpa3c`
- Production nodes: front `1:2`, back `1:13`
- Reopened clean-room comparison: front `3:2`, back `3:13`
- Reopened long-copy stress: front `3:22`, back `3:33`
- Pre-V2 rollback copies: front `4:2`, back `4:24`
- Drive folder: `ADD-16_両親贈呈品メッセージカード` / `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`
- Drive child items at audit/write time: none

## Reopened visual audit
The earlier structural production remained editable and overflow-safe, but the actual screenshots still read as a generic sparse stationery template: `HOME PORT` and `THE JOURNEY BEGAN HERE` functioned mainly as decorative English, while the large unstructured blank field made the front feel more like a neutral template than a purpose-built parent-gift enclosure card. The old `DESIGN_QA_PASS_WITH_PLACEHOLDERS` was therefore retained only as structural evidence.

A materially different native clean-room pair was built and compared. The reopened direction treats the item as a small gift-enclosure correspondence piece rather than a travel-template derivative:
- Japanese-first front headline `ありがとうを、手渡す日。`;
- narrow navy binding strip rather than a generic top hairline;
- rust occasion kicker and restrained mint/date accents;
- clearer recipient / message-lead / gift-context rhythm;
- back side structured as a real letter surface with body, signature rule, signature/date and understated closing copy;
- all unknown family-specific information remains explicit native `LAYOUT DUMMY` text.

Image generation was not required: the screenshot-supported defect was typography, authorship and paper composition rather than missing imagery. No family image, decorative raster, or fabricated documentary content was generated.

## Screenshot QA
- Legacy production front/back: reopened because of sparse/generic-template appearance.
- Clean-room V2 front/back: PASS at whole-item and reading scale; Japanese hierarchy is materially stronger and the gift-enclosure role is clearer.
- Long-copy stress front `3:22`: long recipient plus multi-line message lead remains readable without collision.
- Long-copy stress back `3:33`: multi-paragraph body plus long signature remains inside the frame without collision.
- Post-promotion production front/back screenshots: PASS.

## Production promotion
The previous production was duplicated as rollback proof before promotion. The reopened V2 children were then promoted into the existing stable production root IDs (`1:2`, `1:13`) so external references remain valid.

## Structure QA
Final production front `1:2`:
- 400.63×582.05 px canvas equivalent;
- native text: 7;
- image fills: 0;
- text outside frame: 0.

Final production back `1:13`:
- 400.63×582.05 px canvas equivalent;
- native text: 5;
- image fills: 0;
- text outside frame: 0.

Reopened long-copy stress:
- front `3:22`: native text 7, image fills 0, text outside frame 0;
- back `3:33`: native text 5, image fills 0, text outside frame 0.

No flatten/raster replacement was introduced. Recipient, message, signature, date and gift-format placeholders remain native editable text.

## Drive
Exact Drive folder metadata was re-read immediately before production promotion. Folder remains empty and unchanged:
- ID: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`
- title: `ADD-16_両親贈呈品メッセージカード`
- MIME: `application/vnd.google-apps.folder`
- files: 0

No raster was added because no screenshot-supported production asset need exists.

## Deferred / blocked required input
- one card per family vs shared card;
- gift size/wrapping/attachment and handoff method;
- printed name policy and final recipient/signature copy;
- full vs short message, vertical vs horizontal writing, and overlap with any read-aloud letter;
- printer template/profile, exact vendor bleed/safe requirements and 100% physical proof.

These remain `DEFERRED_FINALIZATION` / `BLOCKED_REQUIRED_INPUT`; maintain `NOT_PRINT_READY` until physical/vendor checks are complete.

ADD-16 now satisfies the reopened sellable-visual gate. ADD-15 remains blocked before Figma production because the authoritative Model A / Model B / NOT_REQUIRED decision and an exact live Figma file key/page/node are not present. Next safe target is ADD-17 read-only requirement/neutral-template review without inventing child attendance facts.
