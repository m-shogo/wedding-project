# WEDDING PASSPORT — Actual-size boundary repair closed / 2026-08-26

State: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS_RESTORED`
Scope: non-Rurubu only
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- run start / pre-write latest `main`: `75f43af6e3c2d129ddce5d56cafbd47d6884f82c`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- Current page: `205:2 / CURRENT_SELECTED / PASSPORT / DEPARTURE WINDOW V2 / 2026-08-25`
- Current front: `205:3`
- Current back: `205:21`
- exact Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- Drive metadata readback: PASS
- image generation: `0`
- Drive write: `0`

No Rurubu item-specific Figma, Drive, asset, ledger, layout or GitHub path was inspected or modified.

## Defects closed

The 2026-08-25 promoted Current had three actual-size defects recorded in `CURRENT-ACTUALSIZE-VISUAL-REOPEN-2026-08-25.md`:

1. `記録` split across a mechanical Japanese line break on the front intro;
2. `RETURN NOTE` lost contrast/field ownership at the top of the back;
3. the lower turquoise fixed-art gesture crossed the factual `2026.10.24` cluster.

A rollback-safe bounded comparison was created first:

- front candidate `206:2`
- back candidate `206:20`
- front long-copy stress `207:2`
- back long-copy stress `207:20`

Only after whole/reading/native-size comparison passed were the repairs promoted to Current.

## Adopted bounded repair

### Front

`205:17 / TEXT / COVER INTRO`

- stays native `Noto Sans JP Medium`;
- width `500 → 540`;
- semantic copy is explicitly broken as:

  `今日という一日を、`
  `ふたりの旅の記録に。`

- `textAutoResize=HEIGHT` retained.

The wider 540px measure also passed a longer intro stress without splitting `記録` or entering the blue aperture.

### Back identity

`205:33 / TEXT / BACK KICKER`

- stays native Inter Bold;
- moved from the unstable cream-curve edge to a stable navy lane: `x=760 / y=260`;
- fill changed to the existing cream paper tone for reliable contrast;
- full `RETURN NOTE` is visible at thumbnail, reading and native size.

### Back message lane

`205:35 / TEXT / BACK MESSAGE`

- stays native `Noto Sans JP`;
- moved to `x=120`;
- width `520 → 450`;
- `textAutoResize=HEIGHT` retained.

This keeps both production and longer message copy inside the cream aperture instead of letting the last characters drift into the navy field.

### Back factual cluster

The DATE / PLACE / COUPLE roles remain native and were moved as one factual group above the coral/turquoise sweeps:

- `205:36 / DATE`: `y=1110`
- `205:37 / PLACE`: `y=1210`
- `205:38 / COUPLE`: `y=1302`

No date, place or couple copy was baked into SVG. The fixed-art vectors remain editable and were not flattened.

## Rollback / QA preservation

Before mutating Current, full hidden rollback copies were created:

- front rollback `209:2 / ROLLBACK / PASSPORT FRONT / PRE-BOUNDARY-REPAIR / 2026-08-26`
- back rollback `209:20 / ROLLBACK / PASSPORT BACK / PRE-BOUNDARY-REPAIR / 2026-08-26`

Comparison and stress roots remain hidden for evidence:

- `206:2 / 206:20`
- `207:2 / 207:20`

Old FIELD JOURNAL and all earlier clean-room studies remain intact.

## Three-scale screenshot QA

### Whole item / thumbnail (~500px)

- Current front `205:3`: PASS; Japanese first read, date and couple remain clear.
- Current back `205:21`: PASS; `RETURN NOTE` is fully visible and the factual cluster is cleanly separated from the sweeps.

### Reading scale (~1000px)

- repaired front candidate/current-equivalent: PASS;
- repaired back candidate/current-equivalent: PASS;
- no `記 / 録` split;
- no kicker clipping;
- no fixed-art/date or fixed-art/couple collision.

### Actual size / 1480×2100

- front: PASS;
- back: PASS;
- the factual cluster remains wholly in the stable navy lane above both lower gestures.

## Realistic long-copy stress

Hidden stress roots were created from the repaired comparison, not from the legacy production.

Front stress `207:2`:

- longer intro plus long couple-name role;
- intro width 540px;
- semantic Japanese line break remains natural;
- outside `0`, text-text collision `0`.

Back stress `207:20`:

- production creative headline retained;
- message expanded to a materially longer Japanese string;
- long couple-name role;
- message lane `x=120 / w=450` expands to 138px height without leaving the cream aperture;
- factual group remains above fixed-art sweeps;
- outside `0`, text-text collision `0`.

## Structure readback

Current front `205:3`:

- visible native text: `6`
- fixed-height text: `0`
- outside visible text: `0`
- text-text collisions: `0`
- IMAGE fills: `0`
- visible vector-like descendants: `10`

Current back `205:21`:

- visible native text: `6`
- fixed-height text: `0`
- outside visible text: `0`
- text-text collisions: `0`
- IMAGE fills: `0`
- visible vector-like descendants: `10`

Stress `207:2 / 207:20` repeats the same structural PASS with all semantic text auto-height.

## Hybrid Authoring result

- final reader-facing/factual copy: native text;
- fixed visual support: editable SVG/vector tree;
- generated raster: `0`;
- replaceable image role: `0`;
- variable/factual copy baked into visual assets: `0`.

The defect did not require photography or image generation. The correct repair was native Japanese typography + stable field ownership + factual-lane placement.

## Visual result

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` is restored for the reopened visual pass.

Professional judgment: the repair does not change the clean-room A2 art direction; it removes three visible production faults while preserving the stronger `DEPARTURE WINDOW V2` travel/keepsake identity.

## Learning state

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Candidate fingerprint: `PROMOTED_CURRENT_FIXED_ART_TEXT_OPTICAL_COLLISION_AND_SEMANTIC_BREAK`.

Transferable hypothesis only: final promoted Current must be re-rendered at native size after the last text/fixed-art placement. Text-text collision `0` is insufficient evidence when a fixed vector field can cross factual native copy, and Japanese semantics must be judged from the rendered result rather than bounding-box containment.

Do not transfer Passport layout, aperture geometry, colors, sweeps, or exact coordinates to another item.

## Deferred finalization

`NOT_PRINT_READY` remains until final couple names/copy, exact printer template/profile, stock/finishing, binding behavior and physical proof are authoritative.

## Result

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_A2_RETAINED / ACTUALSIZE_BOUNDARY_REPAIR_PASS / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / ROLLBACK_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`.
