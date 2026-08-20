# ADD-02 Korea — Bottom Rule Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / ROLLBACK_SAFE`
Date: 2026-08-20
Start authority SHA: `f09fc4ecdb423e4b1c7c30800b6cdcc8e8f83b5f`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production Korea root: `2:83 / FRAME_TABLE_SIGN_KOREA`
- exact Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- Drive metadata readback: folder exists and is the expected ADD-02 authority
- Drive writes: `0`
- image generation: `0`

## Visible problem

Fresh actual-size production review showed the two short blue/red rules at the bottom of the cream information field as a weak repeated-template gesture. They did not bind the country name, explanation placeholder, table number, trim, holder position, or another physical-paper function. Korea already had a strong item-specific composition from the blue/red/black upper fields, the Japanese country name, large `10`, and the remaining upper coral cut/register.

## Bounded test

Rollback-safe comparison page:

- `124:2 / QA / ADD-02 KOREA / BOTTOM RULE SUBTRACTION / 2026-08-20`
- candidate: `124:3 / QA_ADD02_KOREA_NO_BOTTOM_RULE_2026_08_20`
- rollback: `124:25 / ROLLBACK / ADD-02 KOREA / PRE_BOTTOM_RULE_SUBTRACTION / 2026-08-20`

Changed only in the candidate:

- `KR_BOTTOM_BLUE` hidden
- `KR_BOTTOM_RED` hidden

Retained unchanged:

- blue/red/black upper field composition
- upper coral cut/register
- `KOREA`
- `韓国`
- `[国テーマ説明文]`
- large `10`
- tiled print-grain IMAGE role

The no-bottom-rule candidate read cleaner at whole/read scale and removed a decorative underline that was not carrying semantic or physical binding responsibility.

## Adoption

Adopted into production after live comparison:

- `21:429 / KR_BOTTOM_BLUE`: hidden
- `21:430 / KR_BOTTOM_RED`: hidden
- QA comparison `124:3`: hidden after adoption
- rollback `124:25`: preserved hidden

No other country root was changed by this experiment.

## Three-scale / structure evidence

- whole/read live screenshot after adoption: PASS
- native canvas: `1000×1480`
- visible native text: `4`
- visible IMAGE-fill nodes: `1`
- visible text outside root: `0`
- `clipsContent=true`
- bottom rules visible: `false / false`
- rollback exists: `true`

At actual-size review, the composition still has a clear upper-color-field identity and strong lower number/country hierarchy without the bottom decoration.

## Hybrid authoring / asset state

- variable/semantic copy remains native Figma text
- fixed color-field graphics remain native/vector geometry
- print-grain stays a replaceable IMAGE role
- no variable copy was baked into raster/SVG
- no generated asset was required for this bounded defect
- no Drive asset lifecycle was started because no image/SVG bottleneck was diagnosed

## Decision

`VERIFIED_LOCAL / ADOPTED`.

This is a local application of the binding-function check: decorative rules should survive only when they bind text, a number, trim, direction, fold, holder, or another credible paper role. It is not a rule that Korea or all ADD-02 signs must be minimal or line-free.

## Deferred

Final country-description copy, stand/holder obstruction, vendor bleed/safe-area, paper/profile and physical print proof remain deferred. No final/factual copy was fabricated.

## Next

Continue the live ADD-02 family review for the next highest-value item-specific defect. Do not homogenize country signs into the same layout; transfer only the QA judgment and failure fingerprint.