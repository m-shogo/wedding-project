# ADD-16 両親贈呈品メッセージカード — Fixed Recipient Kicker Subtraction QA

Status: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS_MAINTAINED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-18
Start authority SHA: `572f47d55f8937cf862204252655b1567c08864e`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- selected front: `18:3 / FRAME_PARENT_GIFT_CARD_FRONT / V3`
- selected back: `18:14` (unchanged)
- hidden long-copy front: `18:26`
- Drive: `ADD-16_両親贈呈品メッセージカード` / `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`
- retained legacy production: `1:2 / 1:13` — unchanged

## Visible problem

Selected front still printed a fixed rust `両親へ` kicker above the native semantic `[家族への呼びかけ]` role.

Once final copy is supplied, the recipient field itself is expected to carry the real family-facing address such as an approved parent/family salutation. Keeping a second fixed `両親へ` above it duplicates the recipient function and makes the front read more like a labeled template than a personal card.

No family names, relationships or forms of address were fabricated.

## Bounded comparison

Rollback-safe comparison:

- `31:2 / QA / ADD16 / FRONT / NO_FIXED_RECIPIENT_KICKER / 2026-08-18`

Only the fixed `両親へ` native text was hidden. The following remained unchanged:

- native `[家族への呼びかけ]` recipient role;
- large `ありがとうを、帰る場所へ。` headline;
- native `[旅のひとこと]` role;
- mint horizon / rust origin mark;
- native `[日付]` and `[ふたりの署名]` roles;
- all geometry, size and palette.

The comparison was stronger at whole-item and native-size review: the card reads directly from recipient → gratitude headline without a duplicate category label, while the emotional and functional hierarchy remains intact.

## Adoption / rollback

Before selected mutation, hidden rollback copies were saved:

- `31:13 / ROLLBACK / ADD16 / FRONT / PRE_NO_FIXED_RECIPIENT_KICKER / 2026-08-18`
- `31:24 / ROLLBACK / ADD16 / STRESS FRONT / PRE_NO_FIXED_RECIPIENT_KICKER / 2026-08-18`

The fixed kicker was then hidden in selected front `18:3` and long-copy front `18:26`. Comparison `31:2` was hidden after adoption.

Back `18:14` and back stress were not changed.

## Three-scale / structure QA

Fresh selected front review after adoption:

- whole-item / thumbnail: PASS;
- reading/native 700×1036: PASS;
- visible native text: 5;
- IMAGE fills: 0;
- visible fixed `両親へ` count: 0;
- visible text outside root: 0;
- same-parent text-to-text collisions: 0.

Long-copy front `18:26` after matching subtraction:

- visible native text: 5;
- IMAGE fills: 0;
- visible fixed `両親へ` count: 0;
- visible text outside root: 0;
- same-parent text-to-text collisions: 0.

Result: `FIXED_RECIPIENT_KICKER_SUBTRACTION_PASS`.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_CHANGE`.

The defect was duplicate recipient labeling, not missing imagery. Exact Drive authority was live-read; Drive write: `0`.

## Deferred / blocked

One-card-per-family vs shared-card policy, actual recipient wording, gift/package/attachment method, final message/signatures, relation to any read-aloud letter, vendor template, paper stock and physical proof remain unresolved. No factual or family-specific value was invented.

## Result

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED / HOME_PORT_MICROCOPY_SUBTRACTION_PASS / FIXED_RECIPIENT_KICKER_SUBTRACTION_PASS / OPEN_HANDWRITTEN_AREA_POLISHED / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_HARDENED / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
