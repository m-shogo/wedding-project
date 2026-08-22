# NRSL — Japanese semantic copy assigned Latin font fallback — 2026-08-23

Source scope/item: non-Rurubu / ADD-16 両親贈呈品メッセージカード

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Fingerprint: `JAPANESE_SEMANTIC_COPY_ASSIGNED_LATIN_FONT_FALLBACK`

## Visible / authored problem

Live Current screenshots looked acceptable, but native Figma readback found the Japanese kicker `両親へ` authored with `Inter Bold` on both Current and realistic stress. Figma rendered Japanese fallback glyphs, hiding the authored font mismatch from screenshot-only QA.

Source nodes:
- Current `57:10`
- stress `57:43`
- file `ylmVBbwNcnjueYrymNpa3c`

## Root-cause hypothesis

A helper, copy/style operation, or manual pass can assign a Latin font family to Japanese semantic text. Because Figma still displays fallback glyphs, visual review alone may not reveal that the actual `fontName` contract is wrong. This can make glyph metrics, editorial character, export behavior, or cross-environment rendering less deterministic.

## Bounded test / repair

Complete pre-change rollbacks were preserved:
- `66:2 / ROLLBACK / ADD16 / FRONT / PRE-JP-KICKER-FONT-REPAIR / 2026-08-23`
- `66:18 / ROLLBACK / ADD16 / FRONT STRESS / PRE-JP-KICKER-FONT-REPAIR / 2026-08-23`

After explicitly loading the intended Japanese font, only the two font-family assignments changed:
- `57:10`: `Inter Bold → Noto Sans JP Bold`
- `57:43`: `Inter Bold → Noto Sans JP Bold`

Characters, size, line-height, width, position, color, hierarchy and surrounding fixed art were unchanged.

## Expected improvement

Make the authored Japanese typography explicit and deterministic instead of relying on fallback glyph selection, while preserving the already-verified composition and hierarchy.

## Regression risk

A blanket replacement of all Inter or all mixed-script text would be wrong. Numeric dates, intentional English artifact identity, and other Latin roles may correctly use Inter. The check applies to Japanese semantic copy that is unintentionally assigned a Latin family.

## Three-scale / structure evidence

Current front after repair:
- whole-item: PASS
- reading: PASS
- native `700×1036`: PASS
- native visible text `5`
- fixed-height text `0`
- outside visible text `0`
- IMAGE fills `0`

Realistic front stress was temporarily revealed after repair:
- long Japanese display/body/signature: PASS
- no new collision with thread, lower weave, date or trim
- native visible text `5`
- fixed-height text `0`
- outside visible text `0`
- IMAGE fills `0`
- stress re-hidden after QA

## Evidence

- Figma: `ylmVBbwNcnjueYrymNpa3c / 57:3 / 57:36`
- Drive authority: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`
- Drive writes: `0`
- generated assets: `0`
- item evidence: `01_paper-items/additional-wedding-items/ADD-16-parent-gift-message-card/FIGMA-JAPANESE-KICKER-FONT-ASSIGNMENT-QA-2026-08-23.md`
- evidence commit: `9848cd9a085220ff7630e121974fdf2541d61f1f`
- canonical QA sync commit: `f22b651d1da03c8f7cfc268f49d8c2590b394446`

## Cross-item probes

The same normalized read-only probe was applied to materially different non-Rurubu Current artifacts:
- WEDDING PASSPORT `181:52 / 181:80`: no Japanese text assigned to Inter found
- BOARDING PASS `63:41 / 63:72`: no Japanese text assigned to Inter found
- ADD-09 Guest Book `41:56 / 41:76`: no Japanese text assigned to Inter found
- ADD-14 MIDNIGHT ZINE: Japanese roles are Noto Sans JP; intentional `AFTER PARTY`/numeric roles remain Inter
- ADD-17 EXPEDITION FIELD: Japanese roles are Noto Sans JP; numeric date remains Inter

Therefore this is not yet `VERIFIED_CROSS_ITEM` and must not become a blanket project-wide font replacement rule.

## What must remain item-specific

Do not transfer ADD-16's textile palette, composition, exact font sizes, coordinates, copy, or message-card art direction. Do not prohibit Latin fonts in bilingual designs.

## Cross-item applicability hypothesis

For future Japanese native-text QA, supplement screenshot review with a lightweight authored-font readback for semantic Japanese roles. If Japanese copy is assigned to a Latin family and merely renders via fallback, test explicit Japanese-family assignment in a rollback-safe bounded role, then rerun reading/actual-size and realistic-copy QA.

## Next receiving-item experiment

Continue the font-assignment audit only when a future Current exposes Japanese semantic text whose assigned family is Latin/mixed unexpectedly. A second independent reproduction in a materially different artifact is required before considering `VERIFIED_CROSS_ITEM`.
