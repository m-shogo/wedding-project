# ADD-02 Bali — Lower Register Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / ROLLBACK_SAFE`
Date: 2026-08-20
Start authority SHA: `197657513fe09795bb31bbadc715d4a14a4c2a53`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production Bali root: `2:74`
- exact Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- Drive writes: `0`
- image generation: `0`

## Visible problem

Fresh current-family review showed the short ochre `BA_REGISTER` floating near the bottom-left of the cream information field. After the earlier gate simplification, the split-gate architecture, clay/black fields, ochre sun, Japanese country name and large `09` already carried the Bali-specific composition. The short lower register did not bind a caption, number, trim edge or physical role and read as a repeated template underline.

## Bounded test

Rollback-safe comparison:

- page: `119:2 / QA / ADD-02 BALI / LOWER REGISTER SUBTRACTION / 2026-08-20`
- comparison: `119:3 / QA_ADD02_BALI_NO_LOWER_REGISTER_2026_08_20`
- changed only: `BA_REGISTER` visibility → hidden

Retained unchanged:

- outer two split-gate pairs;
- clay/black fields;
- ochre sun;
- `BALI`, `バリ`, `[国テーマ説明]`, large `09`;
- one tiled print-grain IMAGE role.

The no-register version was stronger at whole/read scale: the lower field became an open editorial block instead of ending with a generic decorative underline.

## Adoption / rollback

Pre-change hidden rollback:

- `119:27 / ROLLBACK / ADD-02 BALI / PRE_LOWER_REGISTER_SUBTRACTION / 2026-08-20`

Adopted:

- production `21:410 / BA_REGISTER`: hidden
- comparison `119:3`: hidden after adoption

No other country root was changed by this test.

## Three-scale / structure QA

- whole/read screenshot: PASS
- native canvas: `1000×1480`
- visible native text: `4`
- visible IMAGE-fill nodes: `1`
- visible text outside root: `0`
- `BA_REGISTER` visible: `false`
- rollback exists: `true`

## Decision

`VERIFIED_LOCAL / ADOPTED`.

This is another local application of the existing binding-function check. It does not establish a family rule that every lower line must disappear; a line remains valid when it binds a number, caption, trim, direction, physical edge or other real role.

## Deferred

Final country-description copy, stand/holder obstruction, vendor bleed/safe-area, paper/profile and physical print proof remain deferred. No final/factual copy was fabricated.
