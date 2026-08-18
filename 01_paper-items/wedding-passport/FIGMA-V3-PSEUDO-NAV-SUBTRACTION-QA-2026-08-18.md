# WEDDING PASSPORT — V3 pseudo-navigation subtraction QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_SELECTED_FAMILY_CANDIDATE / PSEUDO_NAV_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-18
Start authority SHA: `c9d36b92d35611afb75a663f82fe1614269594d1`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- selected clean-room V3 front: `144:3`
- selected clean-room V3 back: `144:26`
- V3 front long-copy stress: `145:4`
- V3 back long-copy stress: `145:29`
- Drive authority: `01_パスポート風_メニュー・ドリンク・座席表` / `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- retained legacy production remains untouched.

## Visible issue

Fresh whole-item review found two pieces of microcopy that behaved more like template/interface metadata than reader-facing print content:

1. front `144:22 / TEXT / INDEX / MENU + DRINK / SEATING / MESSAGE` acted like pseudo-navigation on a physical cover even though the actual booklet pages already provide those roles;
2. back `144:29 / TEXT / BRAND / WEDDING PASSPORT / END NOTE` added an implementation-like `END NOTE` suffix with no reader-facing job.

The defect was not missing decoration. It was unnecessary metadata competing with an already sufficient physical-object hierarchy.

## Bounded comparison

Rollback-safe comparison clones were created before selected mutation:

- `157:44 / QA / PASSPORT V3 / SUBTRACTION CANDIDATE FRONT / 2026-08-18`
- `157:69 / QA / PASSPORT V3 / SUBTRACTION CANDIDATE BACK / 2026-08-18`

Comparison change only:

- front: hide `TEXT / INDEX`;
- back: change `WEDDING PASSPORT / END NOTE` to `WEDDING PASSPORT`.

No date, location, couple-name placeholder, final-message placeholder, route/vector artwork, page structure, font scale, color field, or image role changed.

The comparison was stronger at thumbnail and native scale: the front reads as `WEDDING PASSPORT → 10.24 → 旅の手帖 → route field → [新郎新婦名] / YOKOHAMA` without a fake navigation strip, while the back keeps the small product label without an authoring-like suffix.

## Promotion / rollback

Selected nodes were updated only after comparison QA.

- front index hidden: `144:22`
- back brand simplified: `144:29`
- matching stress nodes updated where present.

Hidden rollback copies:

- selected front pre-change: `158:2`
- selected back pre-change: `158:27`
- front stress pre-change: `158:44`
- back stress pre-change: `158:69`

The comparison clones `157:44 / 157:69` were hidden after promotion.

## Three-scale / structural QA

- whole item / 500px: PASS on selected front/back after promotion;
- reading scale: PASS; Japanese title/body hierarchy remains dominant;
- actual size: front rendered at native `1480×2100` after promotion; PASS; the full-size comparison candidate was also inspected before promotion and is visually identical to the promoted delta;
- comparison structure before promotion: front visible native text `7`, back `5`;
- comparison outside visible text: `0 / 0`;
- comparison proof-language leakage: `0 / 0`;
- comparison fixed 10–12px text boxes: `0 / 0`;
- comparison text-to-text collisions: `0 / 0`;
- IMAGE fills: `0 / 0`.

No generated asset or Drive write was required because imagery was not the bottleneck.

## Decision

`PSEUDO_NAV_SUBTRACTION_PASS`.

This is a bounded polish of the already-selected zero-reuse clean-room V3 cover pair, not a return to legacy production. The clean-room selected family remains the current visual candidate with legacy preserved and final factual/vendor proof deferred.
