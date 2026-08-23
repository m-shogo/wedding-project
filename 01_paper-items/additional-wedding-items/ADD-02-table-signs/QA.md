# ADD-02 — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / DESTINATION_V4_FULL_FAMILY_PROMOTED / FRANCE_TABLE_NUMBER_REDUNDANCY_SUBTRACTION_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-24
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Latest `main` observed immediately before this reconciliation: `bbbb15c0e2fa38b6b5270ec0dccf04a979e88e8f`

## Current live authority

- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production roots: `2:2`, `2:11`, `2:20`, `2:29`, `2:38`, `2:47`, `2:56`, `2:65`, `2:74`, `2:83`, `2:92`
- exact Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- current visual family: Destination V4/V3 family promoted on 2026-08-21
- current production IMAGE fills: `0`
- previous archival print-grain master remains historical Drive evidence only; it is **not** a current Figma production dependency.

Canonical full-family promotion evidence:

- `FIGMA-DESTINATION-V4-FULL-FAMILY-PROMOTION-QA-2026-08-21.md`

Latest bounded production polish:

- `FIGMA-FRANCE-TABLE-NUMBER-REDUNDANCY-QA-2026-08-24.md`

## Current family visual state

The current eleven-sign family is the 2026-08-21 Destination V4/V3 promotion, not the older pre-V4 family described by the previous version of this QA file.

All eleven roots remain `1000×1480`, editable, and materially different in layout skeleton rather than being one color-swapped template. Semantic/factual copy remains native Figma text. The family intentionally uses no current raster IMAGE fills.

Current destination/table-number reading is **item-specific**, not one family-wide label rule:

- HAWAII `2:2`: `TABLE 01` is the functional table-number cue.
- ITALY `2:11`: `TABLE 02` is the functional table-number cue.
- FRANCE `2:20`: the large `03` is the functional table-number cue; duplicate top `TABLE 03` is hidden after 2026-08-24 bounded QA.
- SPAIN `2:29`: `TABLE 04` is the functional table-number cue.
- TAIWAN `2:38`: large `05` is the functional table-number cue.
- JAPAN `2:47`: `TABLE 06` is the functional table-number cue.
- HONG KONG `2:56`: `TABLE 07` is the functional table-number cue.
- SINGAPORE `2:65`: `TABLE 08` is the functional table-number cue.
- BALI `2:74`: `TABLE 09` is the functional table-number cue.
- KOREA `2:83`: `TABLE 10` is the functional table-number cue.
- MALDIVES `2:92`: `TABLE 11` is the functional table-number cue.

**Do not mechanically hide `TABLE xx` labels across the family.** A table-number label may be removed only when another stronger cue already performs the same factual role and a rollback-safe visual comparison proves the subtraction improves the item.

## France 2026-08-24 bounded polish

Fresh whole-item review found `TABLE 03` and the large lower `03` competing as duplicate factual cues on France.

Rollback created before mutation:

- `176:2 / ROLLBACK / ADD-02 FRANCE / PRE_TABLE03_REDUNDANCY_SUBTRACTION / 2026-08-24`

Adopted current change:

- `173:67 / TEXT / TABLE NUMBER / TABLE 03` → hidden.
- `173:73 / DECOR / BIG NUMBER / 03` retained as the sole table-number cue.

Three-scale QA:

- whole / ~500 px: PASS;
- reading / ~1000 px: PASS;
- actual / native `1000×1480`: PASS.

Post-change France structure:

- visible native text: `6`;
- fixed-height visible text: `0`;
- IMAGE fill nodes: `0`;
- rollback: hidden and intact.

This is `VERIFIED_LOCAL`; it is not a project or ADD-02 family-wide subtraction rule.

## Current structural gate

Current verified invariants:

- all 11 production roots remain `1000×1480`;
- all current family semantic/factual copy remains native/editable text;
- current IMAGE fill count is `0` for the promoted family;
- no full-page flattening/raster replacement;
- current table-number cue remains visible on every sign after the France subtraction;
- historical V3/V4 candidates, rejected alternatives, stress frames and rollback families remain preserved for evidence/rollback;
- other destinations are not mechanically altered for cosmetic uniformity.

The 2026-08-19 fixed-art subtraction files remain valid **historical method evidence for the older family**, but any structural statement in them or in the pre-reconciliation QA about current IMAGE fills, top table labels, node counts or specific old decorative geometry must not be used as current production truth after the 2026-08-21 Destination V4 promotion.

## Asset / Drive decision

Image generation in the 2026-08-24 polish: `0`.
Drive write: `0`.

The fresh defect was duplicate factual hierarchy on France, not missing photography, illustration or texture. No new asset was justified.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs/proofs exist:

- final `[テーマ名]` / `[国テーマ説明]` copy;
- exact stand/holder dimensions and obstruction proof;
- vendor bleed/trim/safe-area template;
- paper stock/profile and physical actual-size proof;
- venue-lighting review of thin rules, pale fields and dark colors.

Do not reopen healthy signs merely to create activity. Continue only when a fresh screenshot exposes a concrete item-specific defect or a real finalization input becomes available.