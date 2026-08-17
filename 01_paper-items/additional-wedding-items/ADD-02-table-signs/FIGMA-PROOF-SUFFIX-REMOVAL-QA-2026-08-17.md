# ADD-02 11卓テーブルサイン — Proof Suffix Removal QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROOF_LANGUAGE_REMOVAL_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `1b8d2d82916ee8334717d9ec34c78bd1d2b38b01`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production roots: `2:2`, `2:11`, `2:20`, `2:29`, `2:38`, `2:47`, `2:56`, `2:65`, `2:74`, `2:83`, `2:92`
- Drive folder: `ADD-02_11卓の国別テーブルサイン` / `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`
- pre-change rollback section: `80:2 / ROLLBACK / ADD-02 / PRE_PROOF_SUFFIX_REMOVAL / 2026-08-17`
- post-change family QA section: `80:274 / QA / ADD-02 / FAMILY / POST_PROOF_SUFFIX_REMOVAL / 2026-08-17` (hidden after screenshot QA)

## Visible defect

A live structural readback found that all eleven current production signs still printed internal proof language inside their country-description placeholders, for example:

- `［国テーマ説明文 · LAYOUT DUMMY］`
- `［国テーマ説明 · LAYOUT DUMMY］`

This was not needed to communicate that copy is unresolved; the semantic bracket already performs that role. The suffix made otherwise sellable table signs read like Figma proof sheets rather than guest-facing stationery.

## Bounded Figma change

Before mutation, all eleven production frames were cloned into hidden rollback section `80:2`.

Only the visible native country-note strings were changed. The semantic placeholder remains; only the internal suffix was removed:

- `21:218` Hawaii
- `21:259` Italy
- `21:277` France
- `21:299` Spain
- `21:324` Taiwan
- `21:340` Japan
- `21:367` Hong Kong
- `21:386` Singapore
- `21:408` Bali
- `21:427` Korea
- `21:448` Maldives

Examples:

- `海・光・風を感じる卓\n［国テーマ説明文 · LAYOUT DUMMY］` → `海・光・風を感じる卓\n［国テーマ説明文］`
- `［国テーマ説明 · LAYOUT DUMMY］` → `［国テーマ説明］`

No country name, table number, destination-specific artwork, layout geometry, print-grain image role, or unresolved semantic state was changed.

## Screenshot QA

A fresh family proof was created from the updated production roots and reviewed at whole-family scale. The eleven signs remain materially different in typography, geometry and destination rhythm; removing the suffix did not weaken table-number scanning or country identity.

Hawaii `2:2` was also reviewed at reading scale. The hierarchy remains `HAWAII → ハワイ → country-note placeholder → 01`, while the guest-facing proof-sheet smell is removed.

Result: `PASS`.

## Structural readback

All eleven production roots remain:

- `1000×1480`
- native editable text preserved
- exactly one visible IMAGE-fill print-grain role per sign
- visible proof-language count: `0`
- text nodes outside root: `0`

Visible native text counts remain:

- Hawaii 5
- Italy 4
- France 5
- Spain 5
- Taiwan 5
- Japan 5
- Hong Kong 5
- Singapore 5
- Bali 5
- Korea 5
- Maldives 5

The rollback and temporary QA sections are hidden and preserved.

## Drive / image decision

Drive authority was read back successfully. No screenshot-supported image defect was introduced or exposed by this cleanup, so Drive write and image generation remain `0` for this pass.

## Result

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROOF_LANGUAGE_REMOVAL_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

Legacy/rollback evidence remains preserved.