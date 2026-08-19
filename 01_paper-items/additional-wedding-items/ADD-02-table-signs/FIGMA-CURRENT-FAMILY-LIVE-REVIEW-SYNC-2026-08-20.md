# ADD-02 — Current Family Live Review Sync

Status: `LIVE_REVIEW_SYNC_PASS / CURRENT_PRODUCTION_FAMILY_RECONFIRMED / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Date: 2026-08-20
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Authority

- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production roots: `2:2`, `2:11`, `2:20`, `2:29`, `2:38`, `2:47`, `2:56`, `2:65`, `2:74`, `2:83`, `2:92`
- exact Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- Drive write: `0`
- image generation: `0`

## Why the review board was refreshed

A same-scale family board was created earlier in the run, then Italy, Singapore, Bali and Maldives received independently verified production polish. That made the board stale as review evidence even though production itself was correct.

The stale review state was therefore preserved and the board was refreshed from the current live production roots rather than manually patching its individual clones.

## Rollback-safe sync

- current review page: `116:2 / QA / ADD-02 / CURRENT FAMILY REVIEW / 2026-08-20`
- current review board: `116:3 / QA_ADD02_CURRENT_FAMILY_REVIEW_LIVE_SYNC_2026_08_20`
- hidden pre-sync board rollback: `122:2 / ROLLBACK / ADD-02 CURRENT FAMILY REVIEW / PRE_SYNC 2026-08-20`

The board contains fresh clones of all 11 current production roots at a common scale. It is QA evidence only and is not a new clean-room authoring source.

## Current production changes reflected by the synced board

The board now includes the latest adopted states from this run:

- Italy: repeated masonry/grid scaffold hidden; architectural arches retained;
- Singapore: orphan lower rule hidden; botanical/color-field composition retained;
- Bali: orphan lower register hidden; simplified split-gate architecture retained;
- Maldives: orphan lower register hidden; water-current line retained.

Earlier verified country-specific reductions remain reflected as well. No country was mechanically normalized to another country's layout.

## Whole-family review

Fresh board screenshot at approximately 1400 px: `PASS`.

The current family still reads as 11 materially different destination graphics rather than one template with palette swaps. Country/Japanese labels, semantic `[国テーマ説明]` placeholders and large table numbers remain native/editable. Existing tiled print grain remains the only IMAGE role per sign.

Residual rules on other signs were not removed merely for consistency; they remain candidates for future bounded testing only if fresh item-specific review shows they have lost their binding, physical or destination-art role.

## Decision

`LIVE_REVIEW_SYNC_PASS`.

The selected production family remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. Future family-level decisions should use `116:3` rather than the hidden pre-sync board.
