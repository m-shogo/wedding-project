# ADD-08 メニュー補助サイン — Selected Family Inline Proof-Suffix Removal

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_SELECTED_FAMILY / INLINE_PROOF_SUFFIX_REMOVAL_PASS / LONG_COPY_STRESS_RETAINED / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `2a887db2d5838341fc472658598b7facd82b2358`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- selected Drink V3: `21:3 / CLEANROOM_ADD08_V3_A4_DRINK_LEDGER`
- selected Allergy / Dietary V2: `18:19`
- selected World Trip V3: `21:43 / CLEANROOM_ADD08_V3_A4_WORLD_TRIP_CHAPTERS`
- hidden long-copy stress evidence: Drink `23:34`, World Trip `23:75`
- Drive authority: `ADD-08_メニュー補助サイン` / `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG`
- retained legacy production remains unchanged.

## Visible problem

Fresh screenshots of the selected clean-room family showed guest-facing semantic placeholders still carrying the implementation suffix `· LAYOUT DUMMY`.

The uncertainty itself must remain explicit, but the implementation suffix is authoring metadata rather than guest-facing information. At whole/read scale it made all three otherwise-selected designs read like Figma proof sheets rather than finished wedding stationery.

## Rollback

Hidden rollback copies were created before the bounded edit:

- `24:2` — Drink selected root before suffix removal
- `24:43` — Allergy / Dietary selected root before suffix removal
- `24:57` — World Trip selected root before suffix removal

## Bounded change

Only visible selected-family placeholder text was changed. Semantic brackets remain native editable text; no unresolved menu/allergy/operation facts were invented.

### Drink V3

- `[アルコールドリンク一覧 · LAYOUT DUMMY]` → `[アルコールドリンク一覧]`
- `[名称 / 補足情報 · LAYOUT DUMMY]` → `[名称 / 補足情報]`
- `[ソフトドリンク一覧 · LAYOUT DUMMY]` → `[ソフトドリンク一覧]`
- `[提供方法・ご案内 · LAYOUT DUMMY]` → `[提供方法・ご案内]`
- `[会場確認事項 · LAYOUT DUMMY]` → `[会場確認事項]`

### Allergy / Dietary V2

- `[アレルギー案内 · LAYOUT DUMMY]` → `[アレルギー案内]`
- `[食事制限案内 · LAYOUT DUMMY]` → `[食事制限案内]`

### World Trip V3

- `[料理名 · LAYOUT DUMMY]` → `[料理名]`
- `[国・テーマ説明 · LAYOUT DUMMY]` → `[国・テーマ説明]`
- the unresolved operational note retains its semantic bracketed wording but drops the implementation suffix.

The hidden stress strings were intentionally not shortened, because they are QA evidence and their longer text mass remains useful for resilience testing. After readback they were returned to `visible=false`.

## Screenshot QA

Post-write screenshots at 1000px long-edge:

- Drink `21:3`: PASS. The drink ledger now reads as an editorial menu-support sheet rather than a production proof; placeholder uncertainty remains obvious through brackets.
- Allergy / Dietary `18:19`: PASS. Both semantic fields now stay on clean guest-facing lines without `LAYOUT DUMMY` wrapping.
- World Trip `21:43`: PASS. The 01/02/03 chapter rhythm remains intact and no proof-language interrupts the menu hierarchy.

No layout, vector, color, title hierarchy, date/footer, route/orbit artwork or physical canvas geometry was changed.

## Structural readback

After cleanup:

- Drink `21:3`: `1400×1980`, visible native text `17`, visible proof-language nodes `0`, visible text outside root `0`, IMAGE fill nodes `0`.
- Allergy / Dietary `18:19`: `1400×1980`, visible native text `8`, visible proof-language nodes `0`, visible text outside root `0`, IMAGE fill nodes `0`.
- World Trip `21:43`: `1400×1980`, visible native text `16`, visible proof-language nodes `0`, visible text outside root `0`, IMAGE fill nodes `0`.
- Drink stress `23:34`: outside text `0`, retained and hidden after verification.
- World Trip stress `23:75`: outside text `0`, retained and hidden after verification.

No semantic copy was rasterized or flattened.

## Drive / image decision

Drive authority was re-read live as `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG`. The defect was proof-language leakage, not missing imagery, so image generation and Drive asset writes were not required.

## Decision

The existing selected clean-room family remains selected and retains the full visual/structural gate:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED_FOR_DRINK_WORLD / ALLERGY_V2_RETAINED / LEGACY_PRESERVED / NOT_PRINT_READY`.

This iteration adds `INLINE_PROOF_SUFFIX_REMOVAL_PASS` and keeps the verified long-copy evidence intact.