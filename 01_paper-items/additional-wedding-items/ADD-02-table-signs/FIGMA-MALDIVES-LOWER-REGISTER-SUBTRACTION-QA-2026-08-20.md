# ADD-02 Maldives — Lower Register Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / ROLLBACK_SAFE`
Date: 2026-08-20
Start authority SHA: `96672ddd0cf93fd8e3d397df0832aeab245ca083`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production Maldives root: `2:92`
- exact Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- Drive writes: `0`
- image generation: `0`

## Visible problem

Fresh family-scale review found a short coral `MV_REGISTER` floating near the bottom-left of the cream information field. The Maldives-specific upper composition is already carried by the aqua sky, coral sun, deep-water band, sand horizon and the single retained water-current line. The lower register did not bind the country label, note, large `11`, trim edge or a physical role and read as a repeated template underline.

## Bounded test

Rollback-safe comparison:

- page: `120:2 / QA / ADD-02 MALDIVES / LOWER REGISTER SUBTRACTION / 2026-08-20`
- comparison: `120:3 / QA_ADD02_MALDIVES_NO_LOWER_REGISTER_2026_08_20`
- changed only: `MV_REGISTER` visibility → hidden

Retained unchanged:

- aqua/deep-water/sand fields;
- coral sun;
- `MV_DIAGONAL_CURRENT` water-current line;
- `MALDIVES`, `モルディブ`, `[国テーマ説明]`, large `11`;
- one tiled print-grain IMAGE role.

The no-register version was stronger: the lower information field became a cleaner editorial closure while the destination-specific ocean structure remained intact.

## Adoption / rollback

Pre-change hidden rollback:

- `121:2 / ROLLBACK / ADD-02 MALDIVES / PRE_LOWER_REGISTER_SUBTRACTION / 2026-08-20`

Adopted:

- production `21:450 / MV_REGISTER`: hidden
- comparison `120:3`: hidden after adoption

No other country root was changed by this test.

## Three-scale / structure QA

- whole/read screenshot: PASS
- native canvas: `1000×1480`
- visible native text: `4`
- visible IMAGE-fill nodes: `1`
- visible text outside root: `0`
- `MV_REGISTER` visible: `false`
- rollback exists: `true`

## Decision

`VERIFIED_LOCAL / ADOPTED`.

This is a local application of the existing binding-function check. The single water-current line remains because it carries the ocean motif; the unrelated lower register did not.

## Deferred

Final country-description copy, stand/holder obstruction, vendor bleed/safe-area, paper/profile and physical print proof remain deferred. No final/factual copy was fabricated.
