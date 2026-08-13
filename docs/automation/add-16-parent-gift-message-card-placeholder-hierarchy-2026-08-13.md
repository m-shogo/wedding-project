# ADD-16 placeholder hierarchy polish — 2026-08-13

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Git main immediately before Figma write: `251402b989e5a7f396a49dd767a0391d392fdf55`
- Item authority: `docs/automation/add-16-parent-gift-message-card-design-qa.md`
- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- Production front/back: `1:2` / `1:13`
- Drive folder: `ADD-16_両親贈呈品メッセージカード` / `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`

## Visible defect
Fresh whole-item and actual-size screenshots showed that the explicit `LAYOUT DUMMY` markers remained nearly as visually strong as guest-facing copy. The semantic placeholders were correct, but the equal emphasis made the sellable production resemble a proof/CMS sheet more than finished correspondence stationery.

## Rollback-safe Figma change
Hidden rollback copies were created before editing:
- front `11:2 / ROLLBACK_ADD16_FRONT_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`
- back `11:13 / ROLLBACK_ADD16_BACK_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`

Production root IDs remained stable. No placeholder text was removed or factual copy invented. Only the literal `LAYOUT DUMMY` suffix inside six native text nodes was visually demoted to 7 px warm-gray at 0.78 opacity while the semantic field labels retain their existing hierarchy:
- front `4:18 / TXT_RECIPIENT`
- front `4:19 / TXT_LEAD`
- front `4:23 / TXT_NOTE`
- back `4:37 / TXT_BODY` (two occurrences)
- back `4:39 / TXT_SIGNATURE`
- back `4:40 / TXT_DATE`

## Screenshot QA
Post-write front/back actual-size screenshots: PASS. The field meaning remains obvious, but `LAYOUT DUMMY` now reads as a quiet production-state annotation instead of competing with the recipient/message/signature hierarchy.

## Structure readback
- front `1:2`: 7 native text, 0 image-fill nodes, 0 outside text, `clipsContent=true`
- back `1:13`: 5 native text, 0 image-fill nodes, 0 outside text, `clipsContent=true`
- all seven `LAYOUT DUMMY` occurrences read back at 7 px with the intended warm-gray fill
- rollback nodes `11:2` and `11:13` are hidden
- no flattening or raster replacement introduced

## Image / Drive
`IMAGE_GENERATION_NOT_REQUIRED`. The screenshot-supported defect was placeholder hierarchy, not missing imagery. No Drive asset was added or changed; the exact authority folder remains `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`.

## Deferred finalization
Final family-specific message, recipient/signature policy, gift format, printer profile/bleed and physical proof remain deferred. These do not invalidate the reopened sellable-visual pass.