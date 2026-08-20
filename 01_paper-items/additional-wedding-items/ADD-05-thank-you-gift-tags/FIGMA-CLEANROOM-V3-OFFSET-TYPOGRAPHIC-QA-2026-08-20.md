# ADD-05 サンキュータグ / プチギフトタグ — Clean-room V3 Offset Typographic QA

Date: 2026-08-20
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED / PHYSICAL_CLEARANCE_PASS / V2_AND_LEGACY_PRESERVED / NOT_PRINT_READY`

## Live authority

- start/latest `main` immediately before this evidence write: `bf0138910e00ff6cdafe62876d842c3cbdf16a5f`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `kAdkOMuAMcFQtTSP8NtWil`
- selected V3 section: `22:2 / SELECTED CLEANROOM V3 / ADD-05 / OFFSET TYPOGRAPHIC GIFT TAG / 2026-08-20`
- 50×80 front: `22:3 / SELECTED V3 / FRONT 50X80 / OFFSET THANK-YOU TAG`
- 50×80 optional back: `22:11 / SELECTED V3 / BACK 50X80 / SAFE-TRIP TAG`
- 45×70 front: `22:17 / SELECTED V3 / FRONT 45X70 / OFFSET REFLOW`
- prior selected V2 preserved: `9:2 / 9:13 / 9:20`
- retained legacy preserved: `1:2 / 1:12 / 1:19`
- exact Drive authority: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`

Drive metadata was live-read immediately before this write and confirmed the exact folder ID/name. Drive write: `0`.

## Why V2 was reopened

Fresh actual-size and thumbnail review showed that V2 remained structurally sound and physically clear, but the visual result was still close to a generic minimalist wedding tag: centered `Thank you`, one support line, one horizontal rule and date on a large quiet ivory field.

At small whole-item scale it did not carry enough authored print identity to justify keeping V2 as the strongest sellable direction. This is a visual-art-direction issue, not a readability or missing-image issue.

## Clean-room V3 construction

V3 was authored on new blank frames. No V2/legacy frame, centered headline group, journey line, endpoint, rule, layout group, SVG, bitmap, generated asset or crop was duplicated into V3.

Only verified factual/physical requirements were re-authored:

- confirmed front copy: `Thank you for traveling with us.`;
- confirmed optional back copy: `Have a safe trip home.`;
- confirmed date: `2026.10.24`;
- primary physical format: `50×80 mm` represented by `500×800` canvas;
- comparison format: `45×70 mm` represented by `450×700` canvas;
- provisional punch diameter `5 mm` = `50px`;
- provisional punch center `8 mm` from top trim = `y=80px` center;
- no names, venue, gift name, SNS or QR invented.

The 45×70 first build placed the punch center at `70px`; physical QA caught this before selection and corrected it to the verified provisional `80px`. No visual styling changed during that correction.

## V3 art direction

Direction: **offset typographic gift label**.

50×80 front:

- warm ivory field;
- narrow rust signal bar beginning below the punch-safe zone;
- `Thank` and `you` separated into a deliberately offset large-serif composition rather than one centered headline;
- confirmed support copy remains native and subordinate;
- deep navy lower print field carries the native date;
- no fake route, ticket credential, icon, stamp, slider endpoint, shadow or gradient.

50×80 back:

- separate dark-field composition rather than a mirrored front;
- ivory top punch tab preserves physical attachment clarity;
- confirmed `Have a safe trip home.` becomes the primary typographic field;
- one restrained rust signal bar and native date;
- no extra decorative copy.

45×70 front:

- independently reflowed proportions and type sizes;
- not a mechanically scaled 50×80 duplicate;
- same physical/family logic without reusing a duplicated front frame.

## Hybrid authoring split

- confirmed copy/date: native editable Figma text;
- fixed art: native paper fields and simple signal bars;
- physical punch: native ellipse role;
- editable SVG: not required;
- generated/composed raster: not required;
- replaceable image role: not required;
- variable/factual information baked into raster/SVG: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: no screenshot-supported imagery bottleneck existed. Adding generated texture/illustration would have obscured the stronger typography/physical-tag solution.

## Three-scale visual QA

### 50×80 front `22:3`

- whole-item / ~250×400 rendered review: PASS;
- reading / native `500×800`: PASS;
- actual-size composition review: PASS.

The split `Thank / you` remains the first read at thumbnail scale, while the support copy and date remain subordinate but legible.

### 50×80 back `22:11`

- whole-item / ~250×400: PASS;
- native `500×800`: PASS;
- punch/tab relationship remains immediately understandable.

### 45×70 front `22:17`

- whole-item / ~225×350: PASS;
- native `450×700`: PASS;
- independently reflowed type remains balanced after the punch-center correction.

### Completion comparison against V2

V2 `9:2` was re-reviewed at the same ~250×400 whole-item scale only after V3 existed. V3 is preferred because it:

- has a materially stronger authored print silhouette;
- avoids generic centered wedding-tag minimalism;
- creates hierarchy through typography and physical color fields rather than UI boxes or theme icons;
- remains simpler than a mini ticket/passport imitation;
- preserves the punch as a real physical constraint instead of turning it into decoration.

Decision: `V3 SELECTED / SELLABLE_VISUAL_QA_PASS`.

## Structure / physical QA

Live readback:

### 50×80 front `22:3`

- size `500×800`;
- visible native text `4`;
- IMAGE fills `0`;
- outside visible text `0`;
- visible text collisions `0`;
- punch `50×50`, center `(250,80)`;
- first text starts at `y=210`, leaving `105px` from punch bottom to first text;
- text left safe inset >= `102px`;
- date bottom `710`, leaving `90px` bottom clearance.

### 50×80 back `22:11`

- size `500×800`;
- visible native text `2`;
- IMAGE fills `0`;
- outside visible text `0`;
- visible text collisions `0`;
- punch `50×50`, center `(250,80)`.

### 45×70 front `22:17`

- size `450×700`;
- visible native text `4`;
- IMAGE fills `0`;
- outside visible text `0`;
- visible text collisions `0`;
- punch `50×50`, corrected center `(225,80)`;
- date bottom `626`, leaving `74px` bottom clearance.

All text remains native/editable. There is no full-page flattening and no variable information is embedded in fixed graphics.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative physical production inputs exist:

- final choice between 50×80 and 45×70;
- actual gift/package dimensions;
- attachment/string/ribbon width;
- final punch/tool diameter and stock thickness;
- printer bleed/safe template;
- duplex registration if optional back is used;
- 100% physical attachment/rotation proof;
- warm venue-light and rub/ink proof.

V2 and legacy remain intact for rollback/history. Next progression target: `ADD-06 フォトブースサイン`.
