# WEDDING PASSPORT — Repair Execution Matrix / 2026-08-26

State: `REPAIR_PENDING / METHOD_ORDER_FROZEN / FIGMA_AUTHORING_BLOCKED / NO_MORE_PRE_FIGMA_CANDIDATE_CHURN`

## Live authority

- run start / pre-write latest `main`: `3e4ac37b68e351fe208e8d0a44924240f9704333`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- Current front/back: `205:3 / 205:21`
- exact Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- canonical reopen evidence: `CURRENT-ACTUALSIZE-VISUAL-REOPEN-2026-08-25.md`
- canonical Current QA: `FIGMA-CLEANROOM-A2-DEPARTURE-WINDOW-CURRENT-QA-2026-08-25.md`

## Fresh three-scale confirmation

Fresh Current screenshots were re-rendered from the live promoted nodes before this matrix was written.

### Whole-item / ~500 px

- front: the composition still reads as the intended Departure Window booklet; the semantic intro break is small at thumbnail scale and therefore easy to miss;
- back: `RETURN NOTE` is visibly truncated even at thumbnail scale and the turquoise line visibly passes through the factual-date zone.

### Reading / ~1000 px

- front: `今日という一日を、ふたりの旅の記 / 録に。` is visibly split mid-word;
- back: only a partial `RETUR...` is visible because the navy identity text exits the cream aperture into a navy field;
- back: the turquoise fixed-art gesture crosses `2026.10.24`.

### Actual-size / 1480×2100

- back identity field-ownership failure is confirmed, not a thumbnail artifact;
- turquoise/date optical collision is confirmed at native render size;
- the fixed-art/native-text problem therefore remains a real sellable-visual blocker.

## Repair principle

Do not create additional clean-room concepts or more fallback SVGs before the existing bounded repair sequence has been executed in live Figma. The design problem is now sufficiently diagnosed. More PRE-FIGMA variations would be candidate churn rather than new evidence.

Variable/factual copy must stay native. Fixed-art candidates remain editable SVG. No raster/image generation is justified for this repair.

## Frozen execution order after Figma authoring recovery

### Test 1 — front semantic Japanese repair

Target: `205:17 / TEXT / COVER INTRO`.

First candidate:

`今日という一日を、`  
`ふたりの旅の記録に。`

Keep the role native. Do not rasterize and do not solve the problem by indiscriminate type shrinking.

Pass only if whole / reading / native-size retain the cream-lane rhythm without creating a new aperture collision.

### Test 2 — back artifact-identity field ownership

Target: `205:33 / TEXT / BACK KICKER`.

First candidate: move the native `RETURN NOTE` into the stable cream aperture around `x≈176 / y≈340 / w≈320` without changing wording.

Pass only when the complete identity remains readable at 500 / 1000 / 1480×2100 and no new competition with the Japanese hero is introduced.

### Test 3 — grouped factual-cluster move

Targets: DATE / PLACE / COUPLE `205:36–38`.

Move the three factual roles as one group into a stable navy lane before modifying fixed-art. Initial comparison range:

- date `y≈1230`
- place `y≈1328`
- couple `y≈1425`

Do not optimize one fact independently while leaving the other two detached. The three roles form one factual cluster.

Pass only if the cluster reads as a deliberate footer/factual lane and avoids both coral/turquoise gestures at all three visual scales and under realistic long-copy/name stress.

### Test 4 — fixed-art fallback comparison only if Test 3 loses

Use already-prepared editable SVG candidates; do not create another fallback first:

1. `departure-window-v2-return-fixed-art-date-clear-fallback.svg`
2. aperture-safe short-turquoise fallback already recorded in item evidence
3. `departure-window-v2-return-fixed-art-aperture-safe-coral-only-fallback.svg`

Compare only after native factual-cluster movement has been tested. Prefer the smallest fixed-art intervention that keeps travel energy and removes factual interference.

Reject a shortened turquoise gesture if it looks amputated/decorative. Reject coral-only if the back becomes too static. Do not force front/back motif parity merely for consistency.

## Mandatory rollback and QA gate

Before any mutation:

1. preserve Current `205:3 / 205:21` as rollback copies;
2. edit only the bounded role under test;
3. inspect ~500 px whole item;
4. inspect ~1000 px reading scale;
5. inspect native `1480×2100`;
6. rerun realistic long-copy / long-name stress because text lanes or fixed-art ownership changed;
7. read back `textAutoResize`, fixed-height count, outside text, vector editability and IMAGE fills;
8. restore `SELLABLE_VISUAL_QA_PASS` only when all three reopened defects are closed simultaneously.

## Authoring blocker / stop condition

The connected Figma write tool requires `figma-use` guidance before mutation. On this run the canonical guidance resource again returned `ResourceNotReadable`.

This is the same capability fingerprint already observed repeatedly. Per the Shared Design Learning System failure-dedup rule, do not blind-retry the same write path and do not create further fallback concepts to simulate progress.

Retry the mutation path only after a material authoring-capability/environment change. Until then, the useful work is limited to live visual confirmation or another independent non-Rurubu target that can be safely advanced without violating the write contract.

## Result

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_REOPENED / DESIGN_QA_PASS_WITH_PLACEHOLDERS / REPAIR_PENDING / METHOD_ORDER_FROZEN / NO_MORE_PRE_FIGMA_CANDIDATE_CHURN / PRODUCTION_UNCHANGED / DRIVE_UNCHANGED / NOT_PRINT_READY`
