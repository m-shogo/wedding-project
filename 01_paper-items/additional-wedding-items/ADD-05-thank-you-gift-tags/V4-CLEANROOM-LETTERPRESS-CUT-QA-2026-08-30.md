# ADD-05 — V4 clean-room LETTERPRESS CUT QA — 2026-08-30

Status: `V4_CANDIDATE / CLEANROOM_PROVENANCE_VERIFIED / SELLABLE_VISUAL_QA_IN_PROGRESS / STRUCTURE_QA_PASS / NOT_PRINT_READY`

Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start/latest-main observed before write: `20b4e81ca40cbfdf656b7ee5de5689427e56f8a1`

## V4 exclusive correction

This is a new non-Rurubu Figma **V4** direction. It was authored from blank frames on the ADD-05 page and does not duplicate, restyle, or mutate retained production/V2/V3 nodes. The retained V3 `RIBBON FOLD` remains unchanged for comparison/rollback only.

Reference-led intent: replace the retained vertical-ribbon gift-wrap grammar with a materially different small-format editorial/letterpress composition. The V4 uses a deep-ink spine, asymmetrical sage corner notch, coral foot, large two-tone THANK / YOU typography, and a separate reverse-face night field. No fake airline credentials, barcode, stamp, route, guest data, QR, or decorative English filler was added.

## Live authorities

- Figma file: `kAdkOMuAMcFQtTSP8NtWil`
- page: `0:1 / ADD-05_THANK_YOU_GIFT_TAGS`
- V4 50×80 front: `41:2 / V4 / ADD-05 / FRONT 50X80 / LETTERPRESS CUT / CLEANROOM`
- V4 45×70 front: `41:12 / V4 / ADD-05 / FRONT 45X70 / LETTERPRESS CUT REFLOW / CLEANROOM`
- V4 optional 50×80 back: `41:22 / V4 / ADD-05 / BACK 50X80 / NIGHT LETTER / CLEANROOM`
- retained V3 comparison: `31:2 / 31:10 / 31:18` (unchanged)
- exact Drive authority: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`
- Drive write this run: `0` — raster/generated imagery is not required for this small typographic item.

## Hybrid role split

- confirmed copy/date: native editable Figma text
- punch role: native ellipse, provisional 50×50 px geometry retained only as verified physical requirement
- fixed art: simple editable native vector/rectangle geometry
- replaceable photo/image: none required
- generated/composed raster: none required
- raster IMAGE fills: `0`

## Visual comparison / three-scale progress

Retained V3 `31:2` was inspected before V4 construction. V4 is materially different: the hero is one horizontal editorial title block rather than the retained stacked gift-wrap ribbon composition; the dominant vertical element is now a narrow ink spine rather than a coral wrapping ribbon; date information is anchored to the coral foot instead of a navy lower field.

50×80 V4 thumbnail proof was rendered at 100×160 px. At that scale `THANK / YOU.` remains the first read, the punch remains visually isolated, body copy remains subordinate, and the date remains a distinct footnote. This closes the primary thumbnail/template-feel check for the 50×80 face.

Reading/native screenshots were inspected for all three roots. The 45×70 face is an independent reflow, not a scale transform; the reverse face is a separate dark composition rather than a mirrored front.

`SELLABLE_VISUAL_QA_PASS` is intentionally not promoted by this file alone: a final family three-scale comparison and actual attachment/rotation proof remain outstanding.

## Structure QA

Live programmatic readback after the print-size body adjustment:

### 50×80 front `41:2`
- canvas: `500×800 px` = working `50×80 mm` at established ADD-05 `10 px/mm`
- native text: `4`
- fixed-height text: `0`
- outside-root text: `0`
- text/text overlaps: `0`
- IMAGE fills: `0`

### 45×70 front `41:12`
- canvas: `450×700 px` = working `45×70 mm`
- native text: `4`
- fixed-height text: `0`
- outside-root text: `0`
- text/text overlaps: `0`
- IMAGE fills: `0`
- body was hardened from `22 px` to `24 px` before final readback.

### optional 50×80 back `41:22`
- canvas: `500×800 px` = working `50×80 mm`
- native text: `2`
- fixed-height text: `0`
- outside-root text: `0`
- text/text overlaps: `0`
- IMAGE fills: `0`

## Actual-size / print QA

Established physical mapping is `10 px = 1 mm`.

Approximate type sizes at working actual size:

- 50×80 hero 76 px ≈ 7.6 mm em ≈ **21.5 pt**
- 50×80 body 24 px ≈ 2.4 mm ≈ **6.8 pt**
- 50×80 date 26 px ≈ 2.6 mm ≈ **7.4 pt**
- 45×70 hero 66 px ≈ 6.6 mm ≈ **18.7 pt**
- 45×70 body 24 px ≈ 2.4 mm ≈ **6.8 pt** after hardening
- 45×70 date 24 px ≈ 2.4 mm ≈ **6.8 pt**
- back hero 54 px ≈ 5.4 mm ≈ **15.3 pt**
- back date 26 px ≈ **7.4 pt**

Raster effective PPI: `N/A` because V4 contains no raster IMAGE fills. `RESOLUTION_WARNING`: none.

Punch remains provisional `5 mm` diameter under the established 10 px/mm working model. Hole center remains `(25 mm, 8 mm)` for 50×80 and `(22.5 mm, 8 mm)` for 45×70. Copy is kept clear of the punch zone.

The V4 uses edge-running fixed fields (ink spine/coral foot/corner notch), but no printer template is authoritative yet, so production bleed is **not guessed or added**. Final trim/bleed/safe geometry remains `DEFERRED_FINALIZATION`.

CMYK risk: deep near-black navy/ink, coral red, muted sage, and warm cream may shift or lose separation after conversion. Small text black construction, total ink, overprint/knockout and final CMYK values must follow the printer profile; no registration-black assumption is made.

## Deferred finalization

`DESIGN_COMPLETE != PRINT_READY`.

Still required before `PRINT_READY`:

- final choice between 50×80 and 45×70
- real gift/package dimensions
- attachment/string/ribbon method and width
- authoritative punch/tool diameter and stock thickness
- printer trim/bleed/safe template
- duplex registration if back is adopted
- 100% physical attachment + rotation proof
- warm venue-light / rub / ink proof
- printer CMYK/profile and black construction
- PDF export, font embedding, transparency, overprint/knockout and preflight

## Next step

Run final family three-scale comparison (`41:2 / 41:12 / 41:22` against retained `31:2 / 31:10 / 31:18`) and only then decide whether V4 earns `SELLABLE_VISUAL_QA_PASS` and becomes the canonical selected authority.
