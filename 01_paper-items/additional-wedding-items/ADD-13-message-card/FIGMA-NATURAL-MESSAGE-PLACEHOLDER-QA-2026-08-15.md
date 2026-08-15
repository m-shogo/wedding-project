# ADD-13 メッセージカード — Natural Message Placeholder QA

Date: 2026-08-15
Authority: latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`
Result: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NATURAL_MESSAGE_PLACEHOLDER_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Visible problem

Fresh native-size review of the front face showed that the existing semantic placeholders `［書き出し · LAYOUT DUMMY］` and `［本文 · LAYOUT DUMMY］` were structurally valid but still read like authoring/workflow field names. The paper already had a strong Japanese-first correspondence direction, so those labels added unnecessary internal-production language to the visible surface.

This was treated as a receiving-item application of the already verified non-Rurubu shared lesson `NRSL-004`: placeholder wording should describe the artifact/content role rather than the authoring workflow. No layout, palette, typography system, or other item-specific treatment was transferred from another item.

## Live authority before write

- GitHub main observed before promotion: `1d903da8da54e76315c34727ae7c7124dc3b3285`
- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- production front: `1:3 / ADD13/A6/FRONT`
- Drive folder: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`
- item QA: `QA.md`

## Rollback-safe comparison

Candidate:

- `14:2 / QA_ADD13_FRONT_NATURAL_MESSAGE_PLACEHOLDERS_2026_08_15`

Only two native text values changed in the duplicate:

- `ADD13V2/Intro`: `［書き出し · LAYOUT DUMMY］` → `［ひとこと · LAYOUT DUMMY］`
- `ADD13V2/Body`: `［本文 · LAYOUT DUMMY］` → `［メッセージ · LAYOUT DUMMY］`

The existing mixed hierarchy was preserved:

- intro semantic role 22px + suffix 8px muted warm-gray
- body semantic role 27px + suffix 9px muted warm-gray

Actual-size 700×990 comparison: `PASS`. The new wording is more reader-facing and less like CMS/proof metadata while preserving the semantic distinction between the opening line and main message.

## Promotion / rollback

Full pre-promotion rollback:

- `15:2 / ROLLBACK_ADD13_FRONT_PRE_NATURAL_MESSAGE_PLACEHOLDERS_2026_08_15` (`visible=false`)

Production root remained stable at `1:3`.

Production mutations:

- `4:29 / ADD13V2/Intro` → `［ひとこと · LAYOUT DUMMY］`
- `4:30 / ADD13V2/Body` → `［メッセージ · LAYOUT DUMMY］`

The comparison `14:2` was returned to `visible=false` after promotion.

## Post-write screenshot / structure QA

Native 700×990 screenshot: `PASS`.

Structure readback:

- root: `700×990`, `clipsContent=true`
- native text: `8`
- visible native text: `7`
- IMAGE fill nodes: `0`
- visible text outside root: `0`
- intro mixed style preserved: 22px semantic + 8px suffix, suffix opacity ≈0.76
- body mixed style preserved: 27px semantic + 9px suffix, suffix opacity ≈0.76
- rollback `15:2`: hidden, 13 children
- comparison `14:2`: hidden
- no flattening or raster replacement introduced

This change shortens/clarifies placeholder wording without moving or enlarging the text boxes, so it does not consume additional long-copy or safe-area reserve.

## Drive / image decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The screenshot-supported defect was wording semantics, not missing imagery or decoration. Drive writes: `0`. The exact Drive authority folder was read back immediately before the Figma promotion.

## Deferred finalization

Final recipient/use-case policy, real message copy, signer naming convention, paper/vendor template, bleed/export settings, and 100% physical handwriting/print proof remain deferred. No final personal message or factual copy was invented.
