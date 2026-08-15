# ADD-05 サンキュータグ / プチギフトタグ — Clean-room V2 Punched Note QA

Status: `CLEANROOM_V2_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LEGACY_PRESERVED / PHYSICAL_CLEARANCE_PASS / NOT_PRINT_READY`
Date: 2026-08-15
Start authority SHA: `f2bc73f4336855111bf10b4bdb521d08b12f3065`

## Clean-room declaration

The V2 front/back/comparison family was created from new blank frames. Existing production `1:2 / 1:12 / 1:19`, its layout, edge rail, rules, decorative marks and prior assets were not used as authoring references or duplicated into V2. Legacy was opened only after V2 construction and physical/structural QA were complete.

Only verified requirements were re-authored:

- front master `50 × 80 mm`;
- independent front comparison `45 × 70 mm`;
- optional back `50 × 80 mm`;
- provisional punch diameter `5 mm`, center `8 mm` from top trim;
- provisional safe inset `5 mm` and punch clearance;
- approved fixed copy `Thank you for traveling with us.`, `Have a safe trip home.`, `2026.10.24`;
- unconfirmed names, venue, gift product, SNS and QR remain absent.

## Art direction

Direction: `PUNCHED NOTE / QUIET ENDPOINT`.

The physical hole is treated as the composition's first anchor. A restrained horizontal registration rule separates the punch zone from the gratitude text. The front then reads `Thank you` → `for traveling with us.` → one functional journey endpoint → date. The optional back is intentionally quieter and carries only the approved safe-trip message and date.

The first clean-room front draft included the words `LAST STOP`; QA rejected that phrase because it was concept-language, not approved content, and it functioned as decorative English filler. It was removed. The endpoint remains as geometry only.

## Figma authority

File: `kAdkOMuAMcFQtTSP8NtWil`

### 50 × 80 front

- `9:2 / CLEANROOM_V2_ADD05_FRONT_50X80_PUNCHED_NOTE`
- canvas: `500 × 800`
- native text: `3`
- IMAGE fill nodes: `0`
- visible text outside root: `0`
- `clipsContent=true`
- punch geometry: `50 × 50`, top-left `225,55` (center `250,80`)
- first visible text y: `226`
- punch edge → first visible text gap: `121px`

### 50 × 80 optional back

- `9:13 / CLEANROOM_V2_ADD05_BACK_50X80_QUIET_NOTE`
- canvas: `500 × 800`
- native text: `2`
- IMAGE fill nodes: `0`
- visible text outside root: `0`
- `clipsContent=true`
- punch edge → first visible text gap: `165px`

### 45 × 70 comparison front

- `9:20 / CLEANROOM_V2_ADD05_FRONT_45X70_REFLOW`
- canvas: `450 × 700`
- built independently as a reflow, not a scaled/duplicated 50 × 80 frame
- native text: `3`
- IMAGE fill nodes: `0`
- visible text outside root: `0`
- `clipsContent=true`
- punch edge → first visible text gap: `100px`

Hidden safe/punch-clearance guides are retained in each clean-room frame and are non-export QA structure.

## Three-scale / actual-size QA

The 50 × 80 front was reviewed at native `500 × 800`, reading scale, and a `188 × 300` thumbnail. The hierarchy survives thumbnail reduction: hole, `Thank you`, secondary line, endpoint and date remain distinct without a dense icon/rail system.

The 45 × 70 candidate was reviewed at native `450 × 700` and preserves the same content hierarchy through independent spacing/type reflow.

No raster/generated asset or SVG is required for this direction. All approved wording/date remains native Figma text.

## Legacy comparison — after clean-room completion only

Retained legacy `1:2` front and `1:12` back were opened only after V2 physical/structural QA was complete.

Observed comparison:

- legacy retains a strong dark vertical rail and red accents, but its `Thank you.` is split into two large lines and the composition is less directly related to the actual punch/string axis;
- at thumbnail scale, V2 reads the gratitude message faster and preserves a clearer physical sequence from punch to text to endpoint/date;
- V2 removes non-functional secondary accents and does not resemble a miniature ticket, passport or dashboard;
- the optional back is also reduced to the actual approved message/date rather than inheriting front-side branding geometry.

Decision: clean-room V2 clearly wins for the small physical tag and is selected as the new visual candidate. Legacy remains untouched for rollback/history.

## Drive / asset lifecycle

Live Drive authority:

- folder: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV`
- name: `ADD-05_サンキュータグ_プチギフトタグ`
- parent: `0ADXt8irGMFGnUk9PVA`

Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the quality bottleneck is physical punch/string relationship, actual-size typography and trim clearance, not missing imagery.

## Deferred finalization

Still `NOT_PRINT_READY` pending final printer/bleed values, confirmed stock thickness, final punch/tool diameter, string/ribbon width, actual gift-package attachment/rotation test, and physical proof.
