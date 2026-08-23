# ADD-11 写真共有 / QR案内サイン — Process Rule Subtraction QA — 2026-08-23

Status: `VERIFIED_LOCAL / ADOPTED / CURRENT_UPDATED / ROLLBACK_SAFE / NOT_PRINT_READY`

Start authority SHA: `84144df18a980e589939e9f7f2fe03a9df943b33`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `PWQ5ygJJt0IlOqj5ri5jng`
- Current A5: `52:2 / CURRENT / ADD-11 / DARKROOM DEVELOPING TRAY / A5`
- Current A4: `53:2 / CURRENT / ADD-11 / DARKROOM DEVELOPING TRAY / A4`
- long-copy stress: `52:18 / 53:18`
- exact Drive authority: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb / ADD-11_写真共有_QR案内サイン`
- Drive write: `0`
- image generation: `0`

## Visible problem

Fresh A5 whole/reading review showed the lower coral `PAPER / PROCESS RULE` as an extra horizontal accent between the QR/information area and closing copy. The current physical metaphor is already carried by the black developing tray, rotated warm print sheet, coral safelight edge, cyan chemistry edge, and QR paper. The extra rule did not perform a scan, trim, fold, binding, caption, navigation, or reader-facing information function and read as leftover graphic punctuation.

This was a visual/editorial issue, not a structure failure. Existing native text, QR role, tray geometry and long-copy behavior were otherwise healthy.

## Bounded comparison

Rollback-safe comparisons were created without changing copy, QR geometry, paper, tray, safelight, chemistry edge, date, rotation, typography or size:

- A5 `60:2 / QA / ADD-11 / NO PROCESS RULE / A5 / 2026-08-23`
- A4 `60:18 / QA / ADD-11 / NO PROCESS RULE / A4 / 2026-08-23`

Only `PAPER / PROCESS RULE` was hidden.

Result:

- A5 whole/native `875×1240`: stronger; headline → sharing/privacy/QR → closing copy reads continuously without a decorative separator.
- A4 reading-scale: stronger for the same reason; the larger reflow does not need the rule to group content.
- darkroom/developing-tray identity remains intact because the coral safelight edge and cyan chemistry edge retain physical/process meaning.

Comparisons were hidden after verification.

## Rollback and production mutation

Before Current mutation, full hidden rollbacks were created:

- `61:2` — A5 Current pre-change
- `61:18` — A4 Current pre-change
- `61:34` — A5 long-copy stress pre-change
- `61:50` — A4 long-copy stress pre-change

Production/stress process-rule nodes now hidden:

- A5 Current `52:13`
- A4 Current `53:13`
- A5 stress `52:29`
- A4 stress `53:29`

No reader-facing semantic text or QR geometry changed.

## Three-scale / long-copy QA

- A5 whole / thumbnail: PASS
- A5 reading / native `875×1240`: PASS
- A4 reading-scale / native reflow: PASS
- A5 realistic long-copy stress `52:18`: temporarily revealed after mutation, fresh screenshot PASS, then returned hidden
- no new collision, clipping or hierarchy regression was observed

## Hybrid / structure result

Responsibility split remains unchanged:

- variable/factual/emotional copy: native Figma text
- QR: independent semantic native placeholder on replaceable white paper role
- tray / print / safelight / chemistry edge: simple native fixed geometry with explicit physical meaning
- `PAPER / PROCESS RULE`: hidden after bounded evidence showed no remaining job
- SVG: `0`
- generated/composed raster: `0`
- IMAGE fills: `0`

No image generation was justified because the diagnosed defect was unsupported fixed punctuation, not missing photography, texture or illustration.

## Learning state

`VERIFIED_LOCAL` application of the existing cross-item QA method:

> A line, rule, rail or edge should be retained only when whole-item review proves a reader-facing, physical, binding, navigational, scan, trim/fold or information-grouping job.

This is not a blanket `remove rules` instruction. The coral safelight edge and cyan chemistry edge remain because they belong to the darkroom/developing-print object grammar; only the redundant lower process rule was removed.

## Result

ADD-11 remains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_IMPROVED / A5_A4_REFLOW_PASS / LONG_COPY_STRESS_PASS / JAPANESE_SEMANTIC_LINEBREAK_PASS / INTERNAL_SIZE_LABEL_CLEANUP_PASS / PROCESS_RULE_SUBTRACTION_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`.

No final URL/privacy/retention/hashtag/QR or printer/physical-proof facts were invented.