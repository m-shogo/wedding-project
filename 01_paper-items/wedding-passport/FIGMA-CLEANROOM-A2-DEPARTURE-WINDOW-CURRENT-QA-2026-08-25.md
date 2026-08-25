# WEDDING PASSPORT — Clean-room A2 Departure Window Current QA / 2026-08-25

State: `CURRENT_SELECTED / SELLABLE_VISUAL_QA_REOPENED / DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_A2_RETAINED / ACTUALSIZE_VISUAL_DEFECTS_OBSERVED / REPAIR_PENDING / LONG_COPY_EVIDENCE_RETAINED / AUTO_HEIGHT_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

## Live authority

- original clean-room run start `main`: `5ca1003c8e1d494b84c505339bd44bc365a75e05`
- latest `main` before the actual-size visual reopen evidence: `46d98452e26e4bb7aac3a0371764d87156aa5f40`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- assembly authority: `FIGMA-CLEANROOM-A2-B2-ASSEMBLY-SPEC-2026-08-25.md`
- new reopen evidence: `CURRENT-ACTUALSIZE-VISUAL-REOPEN-2026-08-25.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- exact Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- Drive metadata/title re-read on the visual-reopen pass: PASS; Drive writes `0`.

## Clean-room construction retained as valid evidence

The A2/B2 studies were built on a new Figma page from blank `1480×2100` frames. No existing production node, old V2/V3 frame, layout group, crop, ornament, badge, rail, image, or generated asset was duplicated as construction input.

Allowed inherited requirements only:

- canvas `1480×2100` front/back;
- wedding-keepsake/passport-inspired artifact role;
- confirmed `2026.10.24` and `YOKOHAMA`;
- native editable `[新郎新婦名]` role;
- no fake passport/immigration/airline credential data;
- verified font capability (`Noto Sans JP`, `Inter`).

Fixed art came only from the refined 2026-08-25 clean-room SVG studies:

- A2 front: `studies/vnext-2026-08-25/departure-window-v2-fixed-art.svg`
- A2 back: `studies/vnext-2026-08-25/departure-window-v2-return-fixed-art.svg`
- B2 front/back were independently assembled from the matching Island Field Guide v2 SVG pair.

This provenance remains valid. The current reopen is about visible production quality, not clean-room integrity.

## Hybrid authoring split

- reader-facing/factual/emotional copy: native Figma text;
- fixed atmosphere/booklet support: editable SVG node tree imported with `createNodeFromSvg`;
- raster/image fills: `0`;
- generated raster: `0`;
- replaceable photography: `0`;
- variable text baked into SVG/raster: `0`.

No image generation is required for the newly observed defects. They are native Japanese typography / fixed-art optical-collision problems.

## Original A2/B2 selection evidence retained

Clean-room study page:

- A2 front `199:3`
- A2 back `199:15`
- B2 front `199:27`
- B2 back `199:36`

The original 500px comparison found A2 stronger for artifact specificity + travel anticipation, while B2 carried more gallery-poster risk. A2 was matured and promoted after reading/detail, long-copy and structural QA. B2 remains `HOLD`, not production.

This historical selection decision is retained. It does **not** override later live evidence from the promoted Current nodes.

## Original long-copy / structure evidence retained

Dedicated hidden QA duplicates:

- front `202:2 / QA / A2 FRONT / LONG COPY STRESS`
- back `202:20 / QA / A2 BACK / LONG COPY STRESS`

Those proofs corrected earlier mechanical wrapping and cream/dark-field copy-lane failures. Their structural evidence remains useful:

- fixed-height text `0`;
- visible text outside root `0`;
- text-text collisions `0`;
- IMAGE fills `0`;
- semantic text uses `textAutoResize=HEIGHT` after width assignment.

However, those proofs do not cover every final fixed-art/native-copy optical relationship on the promoted `205:*` Current page.

## Promoted Current retained, not overwritten

- Current page: `205:2 / CURRENT_SELECTED / PASSPORT / DEPARTURE WINDOW V2 / 2026-08-25`
- Current front: `205:3 / CURRENT_SELECTED / PASSPORT FRONT / DEPARTURE WINDOW V2`
- Current back: `205:21 / CURRENT_SELECTED / PASSPORT BACK / RETURN WINDOW V2`
- study page: `199:2 / STUDY / PASSPORT / A2-B2 / 2026-08-25`
- B2 `HOLD`: `199:27 / 199:36`
- stress proofs: `202:2 / 202:20`
- previous FIELD JOURNAL Current remains preserved unchanged: `181:52 / 181:80`.

No Figma production mutation was made during the actual-size reopen audit.

## 2026-08-25 actual-size visual reopen

A fresh audit of the **promoted Current nodes**, not only the study/stress roots, found three material defects. The former `SELLABLE_VISUAL_QA_PASS` is therefore reopened until repair + fresh three-scale verification.

Canonical evidence: `CURRENT-ACTUALSIZE-VISUAL-REOPEN-2026-08-25.md`.

### 1. Front intro Japanese semantic break — FAIL

At reading/native scale the Current front shows:

`今日という一日を、ふたりの旅の記`
`録に。`

`記録` is split mid-word.

Live node:
- `205:17 / TEXT / COVER INTRO`
- x `264`, y `690`, width `500`, height `96`.

Required repair: keep copy native and test a bounded measure / explicit semantic line-break correction that stays inside the stable cream reading lane. Do not rasterize or blindly shrink type.

### 2. Back artifact identity clipping — FAIL

The intended `RETURN NOTE` kicker is not fully visible at the upper-left aperture; fresh reading/native screenshots show a clipped partial identity.

Live node:
- `205:33 / TEXT / BACK KICKER`
- x `176`, y `260`, width `320`, height `34`.

Required repair: keep the identity native and move it into an unobstructed stable lane, or adjust only the responsible fixed-art field in a rollback-safe comparison.

### 3. Fixed-art gesture crosses factual date — FAIL

The turquoise lower gesture visibly crosses the confirmed factual `2026.10.24` on the Current back. This is a fixed-art/native-text optical collision even though text-text collision counts are zero.

Live nodes / geometry:
- `205:36 / TEXT / DATE`: x `760`, y `1660`, width `560`, height `84`;
- lower fixed-art vectors include `205:30` and `205:31`;
- `205:31` spans approximately y `1540.5 → 1888` and visibly intersects the date lane.

Required repair: the date remains native/authoritative. Prefer rerouting/repositioning the subordinate turquoise fixed-art gesture or moving the whole factual cluster into a genuinely stable lane. Do not bake the date into SVG.

### Evidence scale

- front ~1000px reading: FAIL on semantic `記 / 録` break;
- back ~1000px reading: FAIL on clipped identity and gesture/date interference;
- back native `1480×2100`: FAIL, confirming the defects are real actual-size/detail defects rather than thumbnail artifacts.

## Current structure readback

Front `205:3` metadata:
- `205:4 / VECTOR / FIXED ART`;
- semantic native text `205:15` through `205:20`;
- intro remains native `205:17`.

Back `205:21` metadata:
- `205:22 / VECTOR / FIXED ART`;
- semantic native text `205:33` through `205:38`;
- date remains native `205:36`.

Thus the correct repair path remains Hybrid Authoring: native copy correction + editable fixed-art geometry adjustment. No raster/image generation is justified.

## Authoring-path blocker

The connected Figma write action requires `figma-use` guidance before mutation. In the current connector environment the skill resource is exposed by name but returns `ResourceNotReadable` when loaded. Under the Figma tool contract, do not bypass that guidance and do not execute speculative production mutation.

This blocks the repair write only. Read-only screenshot/metadata, exact Drive authority and Git evidence remain available.

If the same capability state remains unchanged on the next run, do not repeat blind write probes. Resume the exact bounded repairs when the guidance resource becomes readable.

## Required repair / post-repair gate

1. preserve `205:3 / 205:21` as rollback before mutation;
2. repair front intro semantic line break without aperture regression;
3. restore full `RETURN NOTE` identity visibility;
4. remove turquoise fixed-art collision from `2026.10.24` without flattening factual copy;
5. whole-item / ~500px review;
6. reading / ~1000px review;
7. native `1480×2100` review;
8. fresh realistic long-copy stress because text measures / fixed-art lanes changed;
9. structure readback for native text, fixed-height, outside text, vector editability and IMAGE fills;
10. restore `SELLABLE_VISUAL_QA_PASS` only after all three defects are visibly closed.

## Professional Design Council status

The earlier `92/100 / PASS / NO VETO` score is historical pre-reopen evidence, not the current completion gate. Do not use it to override the fresh actual-size failures.

Re-score after repair. Until then the Current remains selected as the working clean-room design, but visual completion is reopened.

## Deferred finalization

`NOT_PRINT_READY` remains until final couple names/copy, exact printer template/profile, stock/finishing, binding behavior and physical proof are authoritative.

## Result

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_REOPENED / DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_A2_RETAINED / ACTUALSIZE_VISUAL_DEFECTS_OBSERVED / REPAIR_PENDING / LONG_COPY_EVIDENCE_RETAINED / AUTO_HEIGHT_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.

## Next action

Repair the three bounded Current defects as soon as the required Figma authoring guidance path is readable. Do not restart the design from the old production and do not use the retained FIELD JOURNAL as construction input. After repair, rerun the full visual gate before proceeding based on a restored PASS.
