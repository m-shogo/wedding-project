# ADD-16 両親贈呈品メッセージカード — natural gratitude placeholder polish

Date: 2026-08-15
Authority: `docs/automation/non-rurubu-figma-quality-current.md`
Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NATURAL_SEMANTIC_PLACEHOLDER_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority before write

- observed latest `main`: `be863bcb5bb26e0454ce3e8e65bd812a2800466a`
- Figma: `ylmVBbwNcnjueYrymNpa3c`
- production front/back: `1:2 / 1:13`
- Drive authority: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`
- Drive parent: `0ADXt8irGMFGnUk9PVA`
- image generation: `IMAGE_GENERATION_NOT_REQUIRED`

## Visible problem

Fresh actual-size review of the production front found `[感謝メッセージ導入 · LAYOUT DUMMY]` visually functioning like an implementation/CMS field name rather than a natural semantic placeholder in an intimate parent-gift card. The existing composition itself remained sellable; the defect was the wording of the visible placeholder proof.

## Rollback-safe comparison

Created native clean-room comparison:

- `16:2 / QA_ADD16_FRONT_NATURAL_GRATITUDE_PLACEHOLDER_2026_08_15`
- changed only `TXT_LEAD` wording to `[感謝の言葉 · LAYOUT DUMMY]`
- retained the existing hierarchy: semantic field 13 px; `LAYOUT DUMMY` suffix 7 px, muted warm gray, opacity about 0.78
- whole-item thumbnail and actual-size screenshots preferred the more natural wording without changing layout, facts, geometry, or family-specific content

## Production change

Before promotion, created full hidden rollback:

- `16:13 / ROLLBACK_ADD16_FRONT_PRE_NATURAL_GRATITUDE_PLACEHOLDER_2026_08_15`

Production root remained `1:2`. Only native editable `4:19 / TXT_LEAD` changed:

- before: `[感謝メッセージ導入 · LAYOUT DUMMY]`
- after: `[感謝の言葉 · LAYOUT DUMMY]`

The comparison `16:2` was hidden after promotion.

## Screenshot / structure QA

Post-write actual-size screenshot: PASS.

Fresh readback:

- front: `400.63 × 582.05`, `clipsContent=true`, native text `7`, visible text `5`, IMAGE fills `0`
- back: `400.63 × 582.05`, `clipsContent=true`, native text `5`, visible text `5`, IMAGE fills `0`
- `4:19` reads `[感謝の言葉 · LAYOUT DUMMY]`
- suffix remains 7 px / muted warm gray / opacity about 0.78
- rollback `16:13` hidden with 10 children
- comparison `16:2` hidden after promotion

No final family facts, names, memories, attachment method, QR, or other unresolved information were invented.

## Drive / image lifecycle

Drive write: `0`.

No image was generated because the screenshot-supported bottleneck was semantic placeholder wording in an already-specific native correspondence composition, not missing visual media.

## Result

`NATURAL_SEMANTIC_PLACEHOLDER_PASS`.

The item remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`; final family copy, attachment conditions, vendor/export requirements, and physical proof remain deferred.
