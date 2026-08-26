# WEDDING PASSPORT — Clean-room A2 Departure Window Current QA

State: `CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_A2_RETAINED / ACTUALSIZE_BOUNDARY_REPAIR_PASS / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / ROLLBACK_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`

## Current authority

- project authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- Current page: `205:2 / CURRENT_SELECTED / PASSPORT / DEPARTURE WINDOW V2 / 2026-08-25`
- Current front: `205:3`
- Current back: `205:21`
- exact Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- 2026-08-25 reopen evidence: `CURRENT-ACTUALSIZE-VISUAL-REOPEN-2026-08-25.md`
- 2026-08-26 closure evidence: `FIGMA-BOUNDARY-REPAIR-CLOSED-QA-2026-08-26.md`

## Clean-room provenance retained

The selected A2 design was built from blank `1480×2100` frames. It did not reuse the previous production layout, layout groups, crops, ornament vectors, badges, rails, images, or generated assets as construction input.

Allowed inherited requirements only:

- `1480×2100` front/back;
- wedding-keepsake/passport artifact role;
- confirmed `2026.10.24` and `YOKOHAMA`;
- native editable couple-name role;
- no fake passport/immigration/airline credential data;
- available `Noto Sans JP` / `Inter` fonts.

Hybrid split remains:

- reader-facing/factual/emotional copy: native Figma text;
- fixed atmosphere/booklet support: editable SVG/vector node tree;
- IMAGE fills: `0`;
- generated raster: `0`;
- variable copy baked into visual asset: `0`.

## Actual-size reopen is now closed

The 2026-08-25 live Current audit correctly reopened sellable visual completion after detecting three defects:

1. front `記録` semantic line-break failure;
2. clipped/low-contrast `RETURN NOTE` identity;
3. fixed-art sweep crossing the factual date cluster.

Those defects were repaired in a rollback-safe bounded comparison and promoted only after fresh three-scale + long-copy QA.

### Front repair

`205:17 / TEXT / COVER INTRO`

- native Japanese text retained;
- width `540`;
- semantic break:
  - `今日という一日を、`
  - `ふたりの旅の記録に。`
- `textAutoResize=HEIGHT`.

### Back identity / message repair

`205:33 / TEXT / BACK KICKER`

- `RETURN NOTE` remains native;
- stable navy lane `x=760 / y=260`;
- cream fill for reliable contrast.

`205:35 / TEXT / BACK MESSAGE`

- native Japanese copy retained;
- `x=120 / w=450`;
- `textAutoResize=HEIGHT`;
- longer stress copy stays on the cream aperture.

### Back factual group repair

The DATE / PLACE / COUPLE roles remain native and now occupy a stable navy lane above the lower fixed-art gestures:

- `205:36 / DATE`: `y=1110`
- `205:37 / PLACE`: `y=1210`
- `205:38 / COUPLE`: `y=1302`

No factual copy was baked into SVG and the fixed-art vector tree remains editable.

## Rollback / stress evidence

Hidden full rollback before Current mutation:

- front `209:2`
- back `209:20`

Hidden repair comparisons:

- front `206:2`
- back `206:20`

Hidden fresh long-copy stress:

- front `207:2`
- back `207:20`

Previous FIELD JOURNAL Current and all earlier clean-room A2/B2 studies remain preserved as history/rollback.

## Three-scale visual QA

### Whole item / ~500px

- Current front: PASS
- Current back: PASS
- no web/admin-card reading introduced;
- the travel/keepsake aperture remains the dominant artifact-specific gesture.

### Reading / ~1000px

- front semantic Japanese line breaks: PASS
- full `RETURN NOTE`: PASS
- factual cluster hierarchy: PASS
- fixed-art/native-copy optical separation: PASS

### Actual size / 1480×2100

- front: PASS
- back: PASS
- no `記 / 録` split;
- no kicker clipping/field-ownership failure;
- no fixed-art/date or fixed-art/couple collision.

## Fresh long-copy QA

Front stress `207:2`:

- longer intro + long couple-name role;
- no outside text;
- no text-text collisions;
- semantic intro remains natural at width 540.

Back stress `207:20`:

- production creative headline retained;
- message expanded materially;
- long couple-name role;
- message lane expands to 138px height without leaving cream field;
- factual group stays clear of lower sweeps;
- no outside text;
- no text-text collisions.

## Structure readback

Current front `205:3`:

- visible native text `6`;
- fixed-height text `0`;
- outside visible text `0`;
- text-text collisions `0`;
- IMAGE fill `0`;
- visible vector-like descendants `10`.

Current back `205:21`:

- visible native text `6`;
- fixed-height text `0`;
- outside visible text `0`;
- text-text collisions `0`;
- IMAGE fill `0`;
- visible vector-like descendants `10`.

Stress roots repeat the same structural PASS with semantic text auto-height.

## Sellable visual result

The reopening condition is closed. `DEPARTURE WINDOW V2` is again the selected professional Current.

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`

The repair is deliberately bounded: it does not redesign the clean-room A2 or add image/decoration. It fixes Japanese editorial typography, field ownership, and factual hierarchy while preserving the stronger travel anticipation of the selected art direction.

## Learning state

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Candidate fingerprint: `PROMOTED_CURRENT_FIXED_ART_TEXT_OPTICAL_COLLISION_AND_SEMANTIC_BREAK`.

Transfer only the QA hypothesis: after promotion, re-render the actual Current at native size; text-text collision `0` cannot prove safety against fixed SVG/vector art, and Japanese line-break quality must be judged from the rendered result.

Do not transfer Passport layout, aperture geometry, colors, sweep shapes, or coordinates.

## Deferred finalization

`NOT_PRINT_READY` remains until final couple names/copy, exact printer template/profile, stock/finishing, binding behavior and physical proof are authoritative.

## Next target

Proceed to BOARDING PASS live Current and close only material defects. Existing retained Passport history should not be re-opened again unless new evidence appears.
