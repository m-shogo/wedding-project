# RURUBU V6 EG — 1DAY Preferred Liveness Reconciliation QA

Date: 2026-08-18
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

## Observed problem

GitHub durable status declared EC `1723:63` as the preferred 1DAY Plan, with right page `1723:90`. A fresh live-Figma read before writing found `1723:2`, `1723:63`, and `1723:90` missing entirely, while verified rollback DX `1714:2` remained intact and hidden.

This was an authority/liveness defect, not permission to improvise a new 1DAY composition. Per authority order, live Figma outranked the stale GitHub declaration.

## Root-cause hypothesis

A durable status file can remain correct historically while its referenced preferred node is later removed or lost from the live Figma file. Continuing from the durable declaration without checking node liveness would risk writing against a nonexistent/stale authority.

## Bounded recovery test

Created rollback-safe EG `1739:2` from verified DX `1714:2` and restored only the already-verified RSL-098 practical metadata treatment:

- `MOVE / WALK　　MOOD / MORNING`
- `BREAK / CAFE　　PACE / SLOW`
- `MOVE / WALK　　STYLE / DETOUR`
- `TABLE / DINNER　　MOOD / RELAX`

The four metadata nodes are native text and were explicitly reparented/read back inside `1739:29 / PAGE / V6_1DAY_RIGHT`:

- `1739:63`
- `1739:64`
- `1739:65`
- `1739:66`

No photo, image hash, route, STOP time/title/copy, crop, color field, or binary asset was changed.

## Production-copy leak correction

Actual-size review of the restored left page found visible internal copy:

`TRIP DATA / EDITABLE`

This was replaced in native text with reader-facing:

`TRIP DATA / YOKOHAMA`

A subsequent scan of all live preferred V6 spreads for visible production terms such as `EDITABLE`, `PLACEHOLDER`, `REPLACEABLE`, `DUMMY`, `QA`, `NATIVE`, `TEST`, `PROOF`, `TODO`, `TBD`, `差し替え`, and `ダミー` returned no hits.

## Three-scale visual evidence

- whole spread `1739:2`, 1200px: PASS;
- left page `1739:3`, actual size `794×1123`: PASS;
- right page `1739:29`, actual size `794×1123`: PASS;
- metadata remains subordinate to STOP number/title and does not create card/grid reading.

## Structure QA

Left page:

- visible native text: `19`;
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`.

Right page:

- visible native text: `25`;
- visible replaceable photo roles: `4`;
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`.

Whole spread preserves the verified DX/EC five-photo model-course system: one dominant left-page hero plus four independently replaceable right-page STOP images. Image hashes remain the verified DX hashes.

## Figma preferred promotion

EG was promoted to:

`1739:2 / PREFERRED / V6_INSIDE_EG_1DAY_PLAN_RESTORED_PRACTICAL_METADATA_2026_08_18`

Start Here `845:27` was updated to:

`V5 FU/FX · V6 EE + DN/DO + EB MEMORY SPOTS + EF CAFE & TABLE + EG 1DAY PLAN · V7 HOLD`

DX `1714:2` remains hidden rollback. V7 was not edited.

## Preferred-canvas organization

Fresh readback also found EB `1721:2` and EF `1734:2` almost exactly overlapping at the same page-level canvas position, reducing human editability even though their internal page designs were valid.

Only top-level positions were changed; no internal design nodes were modified:

- EB remains at x `249387.75`;
- EF moved to x `251155.15625`;
- EG moved to x `252922.5625`.

The preferred middle spreads are now readable side-by-side on the Figma canvas.

## Asset lifecycle truth

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new binary uploads: `0`;
- new image hashes: `0`;
- new external photography: `0`;
- native editable text preserved: `YES`;
- replaceable photo roles preserved: `YES`;
- rollback preserved: `YES`.

## Decision

`VERIFIED_LOCAL / ADOPTED`.

EG restores the previously verified EC practical-density behavior into the actual live Figma authority, removes a visible production-copy leak, and restores a human-readable preferred-spread canvas without inventing new visual authority.

## Failure fingerprint

`PREFERRED_STATUS_POINTS_TO_MISSING_LIVE_NODE`

A durable preferred declaration is not sufficient evidence that the preferred object still exists live. Before writes, resolve the current live node ID/visibility/semantic root. If the declared preferred node is missing, recover only from verified rollback/evidence or stop; do not silently create a new composition under the old status name.

## What remains Rurubu-specific

Do not transfer the 1DAY layout, STOP positions, metadata words, route geometry, Yokohama photography, colors, page coordinates, or Rurubu editorial treatment.

## Cross-item applicability hypothesis

Other Figma print workflows may independently adopt the liveness check as a QA method: durable status → live preferred-node existence/visibility/readback → write. A missing preferred node should trigger reconciliation from verified rollback/evidence before new production edits.