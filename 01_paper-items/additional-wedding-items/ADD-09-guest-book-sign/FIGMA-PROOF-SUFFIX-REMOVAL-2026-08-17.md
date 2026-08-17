# ADD-09 Guest Book Sign — Proof Suffix Removal QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROOF_LANGUAGE_REMOVAL_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-17
Start main SHA: `2c9ab7757d0c652b16139d55b482ff7f80d82aa9`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- production: `1:3 / FRAME_ADD09_GUEST_BOOK_SIGN`
- Drive authority: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`

## Visible issue

Fresh live screenshot review found that the already-selected guest-book composition still exposed production proof-language inside both guest-facing semantic placeholders:

- `5:38 / TXT_INSTRUCTION`: `[記入案内 · LAYOUT DUMMY]`
- `5:42 / TXT_NOTE`: `[ご記入のご案内 · LAYOUT DUMMY]`

The semantic uncertainty itself is legitimate and must remain editable, but the `LAYOUT DUMMY` suffix is internal authoring metadata and made the sign read like a proof sheet rather than a finished stationery product.

## Rollback-safe change

Before mutation, a complete hidden rollback was created:

- `18:2 / ROLLBACK_ADD09_PRE_PROOF_SUFFIX_REMOVAL_2026_08_17`

Only the two native editable text strings were changed:

- `[記入案内 · LAYOUT DUMMY]` → `[記入案内]`
- `[ご記入のご案内 · LAYOUT DUMMY]` → `[ご記入のご案内]`

No headline, writing rules, spine field, date, place label, geometry, image role, or legacy history was changed.

## Three-scale visual QA

Post-write production `1:3` was reviewed at:

- whole / thumbnail: 500 px max dimension — PASS;
- reading scale: 1000 px max dimension — PASS;
- actual size: 1000×1419 — PASS.

The Japanese headline remains the first visual event, the navy spine still provides physical guest-book identity, and the two placeholders now read as guest-facing unresolved content rather than implementation metadata.

## Structure QA

Live readback after mutation:

- root: `1000×1419`, `clipsContent=true`;
- visible native text: `7`;
- visible proof-language matches (`LAYOUT DUMMY / PROOF / QA / TEMP / DUMMY`): `0`;
- IMAGE fill nodes: `0`;
- visible text outside root: `0`;
- rollback `18:2`: hidden and preserved.

## Drive / image decision

- exact Drive authority readback: PASS;
- Drive writes: `0`;
- image generation: `NOT_REQUIRED`.

The bottleneck was visible production metadata, not missing media.

## Result

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROOF_LANGUAGE_REMOVAL_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

Final writing method, installation wording, printer profile/bleed and physical proof remain deferred. Retained production history was not deleted or overwritten.