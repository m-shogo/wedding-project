# ADD-02 Singapore — Bottom Rule Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / ROLLBACK_SAFE`
Date: 2026-08-20
Start authority SHA: `78916554921dc4b891551f9af74715b00a8f740c`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production Singapore root: `2:65`
- exact Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- Drive writes: `0`
- image generation: `0`

## Family review context

A fresh same-scale review board was rebuilt from the current 11 production roots after recent country-specific polish:

- page: `116:2 / QA / ADD-02 / CURRENT FAMILY REVIEW / 2026-08-20`
- board: `116:3 / QA_ADD02_CURRENT_FAMILY_REVIEW_2026_08_20`

The board is review evidence only. It uses fresh clones of current selected production and is not a new V2/V3 authoring source.

At family scale the lower Singapore rule stood out as one of several residual short rules repeated beneath otherwise independent country compositions. Unlike the large color-field split, botanical ellipse/stem or vertical lower register, `SG_BOTTOM_RULE` did not bind the country name, note, number, trim edge or another physical/semantic role.

## Bounded test

Rollback-safe comparison:

- page: `116:275 / QA / ADD-02 SINGAPORE / BOTTOM RULE SUBTRACTION / 2026-08-20`
- comparison: `116:276 / QA_ADD02_SINGAPORE_NO_BOTTOM_RULE_2026_08_20`
- changed only: `SG_BOTTOM_RULE` visibility → hidden

Retained unchanged:

- dark/jade/sand color fields;
- botanical ellipse and stem;
- vertical `SG_REGISTER`;
- `SINGAPORE`, `シンガポール`, `[国テーマ説明]`, large `08`;
- one tiled print-grain IMAGE role.

The no-rule comparison was stronger: the lower field read as a direct editorial hierarchy rather than a generic template register.

## Adoption / rollback

Pre-change hidden rollback:

- `117:2 / ROLLBACK / ADD-02 SINGAPORE / PRE_BOTTOM_RULE_SUBTRACTION / 2026-08-20`

Adopted:

- production `21:388 / SG_BOTTOM_RULE`: hidden
- comparison `116:276`: hidden after adoption

No other country root was modified by this test.

## Three-scale / structure QA

- family / whole-item review board: PASS
- Singapore reading/native screenshot: PASS
- native canvas: `1000×1480`
- visible native text: `4`
- visible IMAGE-fill nodes: `1`
- visible text outside root: `0`
- `SG_BOTTOM_RULE` visible: `false`
- rollback exists: `true`

## Decision

`VERIFIED_LOCAL / ADOPTED`.

This applies the existing binding-function QA principle rather than creating a new style rule. A short register line should remain when it actually binds a number, caption, trim or physical region; this Singapore line did not. The country-specific botanical/color architecture remains intact.

## Deferred

Final country-description copy, stand/holder obstruction, vendor bleed/safe-area, paper/profile and physical print proof remain deferred. No final/factual copy was fabricated.
