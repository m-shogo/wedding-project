# ADD-17 placeholder hierarchy polish — 2026-08-13

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / BLOCKED_REQUIRED_INPUT / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Git main immediately before Figma write: `e61c071d16db675e5d63a280ca4910d0d7027dea`
- Item authority: `docs/automation/add-17-children-mini-card-design-qa.md`
- Figma file: `PAvkRggJiRuXVypi3RgZCN`
- Production front/back: `2:2` / `2:5`
- Drive folder: `ADD-17_子ども向けミニカード_ぬりえ` / `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`

## Visible defect
Fresh A6 screenshots confirmed the V5 field-journal composition remains sellable, but the prompt placeholders still showed `LAYOUT DUMMY` at nearly the same visual strength as the guest-facing field label. At actual size this read more like proof markup than a finished neutral activity card.

## Rollback-safe Figma change
Hidden rollback copies were created before editing:
- front `21:2 / ROLLBACK_ADD17_FRONT_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`
- back `21:19 / ROLLBACK_ADD17_BACK_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`

Production root IDs stayed stable. No child facts, names, ages, attendance, interests or venue services were invented. The semantic prompt strings remain unchanged; only the literal `LAYOUT DUMMY` suffix was visually demoted to 12 px warm-gray at 0.74 opacity:
- front `15:43 / TXT_PROMPT` — `[お題 · LAYOUT DUMMY]`
- back `15:61 / TXT_PROMPT` — `[ひとこと案内 · LAYOUT DUMMY]`

## Screenshot QA
Post-write front/back whole-item and actual-size screenshots: PASS. The Japanese activity hierarchy, drawing field, curved writing baselines and optional sketch corner remain intact, while the implementation-state marker no longer competes with the field label.

## Structure readback
- front `2:2`: 6 native text, 0 image-fill nodes, 0 outside text, `clipsContent=true`
- back `2:5`: 7 native text, 0 image-fill nodes, 0 outside text, `clipsContent=true`
- both `LAYOUT DUMMY` suffixes read back at 12 px with the intended warm-gray fill
- rollback nodes `21:2` and `21:19` are hidden
- no flattening or raster replacement introduced

## Image / Drive
`IMAGE_GENERATION_NOT_REQUIRED`. The screenshot-supported defect was placeholder hierarchy, not missing imagery. No Drive asset was added or changed; exact authority remains `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`.

## Deferred / blocked finalization
Final adoption remains `BLOCKED_REQUIRED_INPUT` until authoritative child attendance/count/age and activity-use decisions exist. Printer template/profile, physical proof and real pen/crayon handling also remain deferred.