# ADD-05 サンキュータグ / プチギフトタグ — Reopened Visual QA — 2026-08-10

Authority at write: GitHub latest `main`; `docs/automation/non-rurubu-figma-quality-current.md` status `VISUAL_REOPENED`.

## Live authority

- Figma file: `Wedding Paper ADD 05` / `kAdkOMuAMcFQtTSP8NtWil`
- page: `ADD-05_THANK_YOU_GIFT_TAGS`
- production 50 × 80 front: `1:2 / FRAME_TAG_FRONT_50X80`
- production 45 × 70 front: `1:19 / FRAME_TAG_FRONT_45X70_COMPARE`
- production optional 50 × 80 back: `1:12 / FRAME_TAG_BACK_50X80_OPTIONAL`
- Drive folder: `ADD-05_サンキュータグ_プチギフトタグ` / `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV`
- RURUBU/るるぶ area was not read or written.

## Reopened visual diagnosis

The prior production was structurally sound, but the reopened visual gate rejected its central composition as too sparse and too dependent on empty ivory space. At thumbnail scale, the centered serif `Thank you`, isolated punch hole, single hairline and date read as a tasteful draft rather than a differentiated sellable physical tag. This is exactly the kind of blank-looking faux-premium composition the Current authority requires us to reopen.

The existing `DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains valid for dimensions, native editability, guide retention and actual-size legibility, but was not reused as sellable-visual proof.

## Clean-room comparison

Created a materially different native editorial family in `4:2 / QA_ADD_05_REOPENED_CLEANROOM_2026_08_10`:

- `4:3 / QA_TAG_FRONT_50X80_V2_EDITORIAL`
- `5:2 / QA_TAG_FRONT_45X70_V2_EDITORIAL`
- `5:16 / QA_TAG_BACK_50X80_V2_EDITORIAL`

Art direction:

- asymmetric deep-navy physical rail rather than centered empty-field symmetry;
- punch hole remains physically legible and isolated;
- oversized Cormorant Garamond primary copy is offset from the string axis;
- a restrained rust rule creates one print/editorial accent;
- date and hairline form the lower information anchor;
- no airplane, stamp, badge, fake route, fake UI, gradient, shadow or generated stock imagery;
- 45 × 70 is independently reflowed instead of proportionally scaled.

The first clean-room pass still contained redundant English kicker/footer microcopy. Screenshot review judged those as decorative rather than useful, so `COPY_KICKER` and `COPY_FOOT` were removed from all three candidates and the primary copy was optically moved upward before promotion.

## Visual comparison decision

The reopened family was compared against the legacy production at whole-item/thumbnail scale, reading scale and natural pixel size.

The V2 direction clearly wins because the physical attachment axis and typography now form one composition, the hierarchy does not rely on centered symmetry, and the tag reads as a designed print object rather than an empty premium template. The optional back uses the same family grammar without simply mirroring the front.

Image generation was deliberately not used: `IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`. The bottleneck was typography/composition, not a missing hero/background asset. Drive writes: `0`.

## Rollback-safe promotion

Immediately before promotion, exact pre-V2 production copies were created:

- rollback section: `7:2 / ROLLBACK_ADD_05_PRE_REOPENED_EDITORIAL_2026_08_10`
- old 50 × 80 front: `7:3 / ROLLBACK_TAG_FRONT_50X80_PRE_V2`
- old 45 × 70 front: `7:13 / ROLLBACK_TAG_FRONT_45X70_PRE_V2`
- old optional back: `7:23 / ROLLBACK_TAG_BACK_50X80_PRE_V2`

Production frame IDs `1:2`, `1:19`, and `1:12` were preserved while their contents were replaced with the approved clean-room family.

## Post-promotion screenshot QA

Fresh natural-size production screenshot of `1:2` confirms:

- punch hole does not collide with typography;
- navy rail and rust rule remain subordinate to the primary message;
- primary serif line is crisp and optically left aligned;
- supporting copy and date remain readable at physical-tag working scale;
- no clipping or accidental overlap is visible;
- composition remains usable without raster decoration.

The family comparison screenshot also confirmed that the 50 × 80 front, 45 × 70 front and optional back share visual DNA without being scaled clones.

## Post-promotion structure readback

`1:2 / FRAME_TAG_FRONT_50X80`:

- `500 × 800`
- native text count: `4`
- IMAGE fills: `0`
- text outside frame: `0`
- `clipsContent=true`
- `GUIDE_SAFE` hidden and retained
- `GUIDE_PUNCH_CLEARANCE` hidden and retained

`1:19 / FRAME_TAG_FRONT_45X70_COMPARE`:

- `450 × 700`
- native text count: `4`
- IMAGE fills: `0`
- text outside frame: `0`
- `clipsContent=true`
- safe/punch guides hidden and retained

`1:12 / FRAME_TAG_BACK_50X80_OPTIONAL`:

- `500 × 800`
- native text count: `3`
- IMAGE fills: `0`
- text outside frame: `0`
- `clipsContent=true`
- safe/punch guides hidden and retained

Rollback frames retain the prior structures, native text, hidden guides and zero image fills.

## Status

- structural: `DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NATIVE_EDITABLE_PASS / ACTUAL_SIZE_QA_PASS / 45X70_REFLOW_PASS`
- reopened visual: `SELLABLE_VISUAL_QA_PASS`
- combined: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`

## Deferred finalization

`DEFERRED_FINALIZATION`:

- final stock thickness;
- actual punch diameter/offset and punching tolerance;
- string/ribbon/twist-tie width and attachment method;
- rotation/hiding behavior on the real petit gift;
- final printer bleed/template/profile;
- 100% physical print proof;
- optional back adoption decision using the real attachment method.

These do not block progression.

## Next

Proceed to ADD-06 フォトブースサイン for the reopened visual-art-direction audit.