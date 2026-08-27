# ADD-17 子ども向けミニカード — Back Cobalt Header → OPEN_LABEL Promotion QA / 2026-08-27

State: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS_RESTORED`
Scope: non-Rurubu only
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- run start / pre-write latest `main`: `429671f5ec2d98f80510ff9cafab1a1248312369`
- Figma file: `PAvkRggJiRuXVypi3RgZCN`
- Current page: `67:2 / VNEXT_PRO / ADD-17 / EXPEDITION FIELD SHEET / 2026-08-23`
- Current front: `67:3`
- Current back: `67:4`
- realistic stress: `69:2 / 69:40`
- exact Drive authority: `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB / ADD-17_子ども向けミニカード_ぬりえ`
- Drive live ID/title readback: PASS
- image generation: `0`
- Drive write: `0`

No Rurubu item-specific Figma, Drive, asset, ledger, layout or GitHub path was inspected or modified.

## Visible problem

Fresh whole / reading / native-size renders showed the back `67:4` full-width cobalt header (`67:24 / DECOR / COBALT TOP BAND`, `1110×160`) reading before the physical writing sheet. The band resembled a web/app header or status bar even though the reader-facing native label `きょうの発見 / 02` was legitimate.

The front already carries `きょうの発見 / 01` as open native typography without a full-width carrier, so full-width containment was not required for identity continuity.

## Bounded Figma test

Only the reopened role was tested. Writing rules, title, prompt, guide, optional name/date, star, paper field and dimensions were unchanged.

OPEN_LABEL comparisons:
- Current back comparison: `83:2 / QA / ADD17 / BACK / OPEN_LABEL / 2026-08-27`
- realistic long-copy comparison: `83:21 / QA / ADD17 / BACK / OPEN_LABEL / REALISTIC LONG COPY / 2026-08-27`

Comparison delta:
- hide only `DECOR / COBALT TOP BAND`;
- retain `TEXT / KICKER` as native `Noto Sans JP Bold 25`;
- recolor kicker from white to the existing navy display-text color so it belongs to the cream sheet;
- no replacement decoration was added.

## Three-scale visual QA

### Whole / thumbnail (~500px)

PASS. OPEN_LABEL removes the web-header read and the page reads first as an open physical discovery/writing sheet. `きょうの発見 / 02` remains visible as a quiet identity cue.

### Reading (~1000px)

PASS. The hierarchy is cleaner: kicker → Japanese display title → prompt → writing field. The cobalt band no longer dominates the first read.

### Actual size / native `1110×1540`

PASS. The open kicker remains optically stable with the cream sheet; writing rules, star, guide and bottom name/date geometry remain unchanged.

### Realistic long-copy

PASS on `83:21`. Longer prompt, guide and optional-name stress remain readable and do not require the header band.

## Promotion / rollback

After comparison PASS, complete pre-change rollbacks were saved before Current mutation:
- Current back rollback: `83:40 / ROLLBACK / ADD17 / BACK / PRE-OPEN-LABEL / 2026-08-27`
- long-copy rollback: `83:59 / ROLLBACK / ADD17 / BACK / REALISTIC LONG COPY / PRE-OPEN-LABEL / 2026-08-27`

Promoted Current changes:
- Current back `67:24 / DECOR / COBALT TOP BAND` → hidden
- Current back `67:26 / TEXT / KICKER` → native navy text retained
- stress back `69:41 / DECOR / COBALT TOP BAND` → hidden
- stress back `69:43 / TEXT / KICKER` → native navy text retained
- comparison roots `83:2 / 83:21` → hidden after QA

Front `67:3` was not changed.

## Structure readback

Current back `67:4`:
- visible native text: `6`
- fixed-height visible text: `0`
- visible text outside root: `0`
- IMAGE fills: `0`
- cobalt top band: hidden
- kicker: native `Noto Sans JP Bold 25`, visible, navy

Stress back `69:40`:
- visible native text: `6`
- fixed-height visible text: `0`
- visible text outside root: `0`
- IMAGE fills: `0`
- cobalt top band: hidden
- kicker: native `Noto Sans JP Bold 25`, visible, navy

## Hybrid / image decision

- variable/semantic/factual copy: native Figma text;
- route/star: existing editable vector roles;
- writing rules: native simple geometry;
- full-width cobalt header: removed after bounded QA;
- generated/composed raster: `0`;
- replaceable image role: `0`;
- image generation: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the bottleneck was containment grammar, not missing photography/illustration. No child/person imagery was generated.

## Learning state

`VERIFIED_LOCAL`: a valid identity label does not justify a full-width carrier when the carrier becomes the dominant artifact reading. Test label semantics and containment geometry separately.

Do **not** promote a blanket `remove headers` rule. Full-width bands remain valid where they have reader-facing, binding, trim, navigation, or deliberate emotional work. Do not transfer ADD-17 palette, route, star, composition or cue count to other items.

## Result

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / BACK_OPEN_LABEL_PROMOTION_PASS / ROLLBACK_SAFE / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`

Final wedding adoption remains blocked on authoritative child attendance/count/age/activity-use information; printer/material/handling proof remains deferred.