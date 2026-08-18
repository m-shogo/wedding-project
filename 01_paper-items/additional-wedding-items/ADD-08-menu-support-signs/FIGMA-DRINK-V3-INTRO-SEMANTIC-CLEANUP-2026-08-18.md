# ADD-08 Drink Menu V3 — Intro Semantic Cleanup QA

Status: `VERIFIED_LOCAL / ADOPTED_IN_SELECTED_DRINK_V3 / LONG_COPY_REVALIDATED / LEGACY_PRESERVED`
Date: 2026-08-18
Start authority SHA: `1103dc0fbd74a6701a809fdfc281ea03b2c075dc`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- selected Drink V3: `21:3 / CLEANROOM_ADD08_V3_A4_DRINK_LEDGER`
- long-copy stress: `23:34 / QA_CLEANROOM_ADD08_V3_DRINK_LONG_COPY_STRESS_FINAL_2026_08_15`
- exact Drive authority: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`
- Allergy/Dietary V2 `18:19` and World Trip V3 `21:43` were reviewed but not changed in this bounded fix.

## Visible problem

Fresh actual-size review found the selected Drink V3 still printed this sentence directly under the title:

`お飲み物の内容は当日の確定情報に合わせて更新します。`

The sentence describes the production/update process rather than information intended for wedding guests. It therefore read like authoring/proof copy on an otherwise guest-facing menu sign.

The visual bottleneck was not missing imagery or layout hierarchy. The current navy title field, cream ledger, and teal fixed-art field remain appropriate.

## Bounded change

A hidden rollback page was created:

- `28:85 / QA / ADD-08 / DRINK INTRO SEMANTIC CLEANUP / 2026-08-18`
- pre-change selected rollback: `28:86`
- pre-change stress rollback: `28:127`

Selected Drink V3 changed only the intro role:

- before: `お飲み物の内容は当日の確定情報に合わせて更新します。`
- after: `[ドリンクメニューに関するご案内]`

This keeps the unresolved information explicit and native/editable without printing implementation language.

The hidden long-copy proof was also normalized to semantic long placeholders so its stress content no longer depends on `LAYOUT DUMMY` suffixes while preserving realistic text mass.

No title, section geometry, teal fixed-art field, rules, date, or selected family authority changed.

## QA

Selected Drink V3 after change:

- whole / reading screenshot: PASS
- native canvas: `1400×1980`
- raster IMAGE fills added: `0`
- variable copy remains native Figma text

Long-copy stress `23:34` was temporarily exposed and revalidated:

- text outside root: `0`
- text-to-text collisions: `0`
- long copy remains readable at actual-size screenshot
- stress returned to hidden state after verification

## Drive / image decision

Drive authority was live-read before the change. Drive writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED` — the screenshot-supported defect was guest-facing implementation language, not missing photography, illustration, or texture.

## Decision

The selected family retains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / CLEANROOM_SELECTED_FAMILY / LEGACY_PRESERVED / NOT_PRINT_READY`

Drink V3 additionally gains `GUEST_FACING_INTRO_SEMANTIC_CLEANUP_PASS`.
