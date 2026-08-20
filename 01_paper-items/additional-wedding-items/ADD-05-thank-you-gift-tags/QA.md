# ADD-05 サンキュータグ / プチギフトタグ — QA

Status: `CURRENT / CLEANROOM_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PHYSICAL_CLEARANCE_PASS / V2_AND_LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-20
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

Current selected clean-room V3:

- Figma file: `kAdkOMuAMcFQtTSP8NtWil`
- selected section: `22:2 / SELECTED CLEANROOM V3 / ADD-05 / OFFSET TYPOGRAPHIC GIFT TAG / 2026-08-20`
- 50×80 front: `22:3 / SELECTED V3 / FRONT 50X80 / OFFSET THANK-YOU TAG` — `500×800`
- 50×80 optional back: `22:11 / SELECTED V3 / BACK 50X80 / SAFE-TRIP TAG` — `500×800`
- 45×70 front reflow: `22:17 / SELECTED V3 / FRONT 45X70 / OFFSET REFLOW` — `450×700`
- prior selected V2 preserved: `9:2 / 9:13 / 9:20`
- retained legacy preserved: `1:2 / 1:12 / 1:19`
- exact Drive authority: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`

Current V3 evidence: `FIGMA-CLEANROOM-V3-OFFSET-TYPOGRAPHIC-QA-2026-08-20.md`.

## Why V3 supersedes V2 visually

Fresh native-size and thumbnail review found that V2 remained structurally sound, but its centered `Thank you` + support line + one horizontal rule + date read too close to generic minimalist wedding-tag styling at whole-item scale.

V3 was built on blank frames without duplicating V2/legacy layout groups, centered headline composition, route line, endpoint, SVG, bitmap, generated asset or crop. It re-authors only the confirmed copy, physical sizes and punch constraints.

V3 uses an offset typographic gift-label direction:

- warm ivory front field;
- rust signal bar kept outside the punch-safe area;
- large split `Thank / you` serif hierarchy;
- confirmed support copy stays native and subordinate;
- deep navy lower print field carries the native date;
- optional back uses a distinct dark field with an ivory punch tab and large safe-trip message;
- 45×70 is independently reflowed rather than mechanically scaled;
- no fake ticket/passport data, icons, stamps, badges, route endpoint, shadow or gradient.

At the same ~250×400 whole-item scale V3 has a more authored print silhouette and avoids V2's generic centered-minimal treatment while remaining simple enough for a physical gift tag.

## Clean-room physical correction

The initial 45×70 V3 build placed the provisional punch center at `70px`. Physical readback caught this before selection and corrected the punch only to the verified provisional `80px` center (`8 mm` from top trim at the current 10px/mm canvas scale).

No styling or copy changed during that correction.

## Three-scale visual QA

50×80 front `22:3`:

- whole-item / ~250×400: PASS;
- reading / native `500×800`: PASS;
- actual-size composition review: PASS.

50×80 optional back `22:11`:

- whole-item / ~250×400: PASS;
- native `500×800`: PASS;
- punch/tab relationship: PASS.

45×70 front `22:17`:

- whole-item / ~225×350: PASS;
- native `450×700`: PASS;
- independent reflow after punch correction: PASS.

Completion-only comparison against preserved V2 `9:2` at the same thumbnail scale: V3 preferred.

## Structure / physical QA

### 50×80 front `22:3`

- visible native text `4`;
- IMAGE fills `0`;
- outside visible text `0`;
- visible text collisions `0`;
- punch `50×50`, center `(250,80)`;
- first text begins `y=210`, leaving `105px` from punch bottom to first text;
- text left safe inset >= `102px`;
- date bottom `710`, leaving `90px` bottom clearance.

### 50×80 optional back `22:11`

- visible native text `2`;
- IMAGE fills `0`;
- outside visible text `0`;
- visible text collisions `0`;
- punch `50×50`, center `(250,80)`.

### 45×70 front `22:17`

- visible native text `4`;
- IMAGE fills `0`;
- outside visible text `0`;
- visible text collisions `0`;
- punch `50×50`, center `(225,80)`;
- date bottom `626`, leaving `74px` bottom clearance.

All reader-facing copy/date remains native editable Figma text. Variable guest/product/venue/QR/SNS facts are absent rather than fake-filled. No full-page flattening or baked variable information was introduced.

## Hybrid authoring / asset decision

- confirmed text/date: native editable Figma text;
- fixed art: simple native paper/color fields and signal bars;
- punch: native physical ellipse role;
- editable SVG: not required;
- generated/composed raster: not required;
- replaceable image role: not required.

`IMAGE_GENERATION_NOT_REQUIRED`: the visual bottleneck was generic composition, and typography/physical print fields solved it without decorative imagery.

Drive authority was live-read immediately before this QA write and confirmed as `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`. Drive write `0`.

## Confirmed copy / exclusions

Confirmed only:

- `Thank you for traveling with us.`;
- `Have a safe trip home.`;
- `2026.10.24`.

Do not invent names, venue, gift/product name, SNS, QR, flight/gate/seat/barcode data or other credentials.

## Deferred finalization / print gate

Keep `NOT_PRINT_READY` until authoritative physical production inputs exist:

- final choice between 50×80 and 45×70;
- actual gift/package dimensions;
- attachment/string/ribbon width;
- final punch/tool diameter and stock thickness;
- printer bleed/safe template;
- duplex registration if optional back is used;
- 100% physical attachment/rotation proof;
- warm venue-light and rub/ink proof.

V2 and legacy remain intact for rollback/history. Do not reopen V3 for cosmetic churn unless a fresh screenshot or authoritative physical input exposes a concrete defect. Next progression target: `ADD-06 フォトブースサイン`.
