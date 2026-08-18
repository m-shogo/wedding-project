# Rurubu V6 EG — live preferred reconciliation feedback

Date: 2026-08-18
Scope: Rurubu WEDDING only

## Visible problem

GitHub said the preferred 1DAY Plan was EC `1723:63`, but live Figma no longer contained the EC root/right-page IDs. The verified DX rollback remained available. The preferred middle-feature frames EB and EF also overlapped almost exactly on the Figma canvas, reducing human editability.

## Root-cause hypothesis

Durable status had drifted from live Figma. Continuing from documentation alone would risk stale/nonexistent writes. The safest recovery was to rebuild only the already-verified EC delta from the verified rollback rather than invent a new composition.

## Bounded test

- cloned DX `1714:2` rollback-safe;
- restored only RSL-098's four native STOP metadata lines;
- verified their parent inside the right-page frame;
- actual-size review found and removed visible internal wording `TRIP DATA / EDITABLE`, replacing it with reader-facing `TRIP DATA / YOKOHAMA`;
- ran whole spread and both actual-size page QA;
- scanned all preferred V6 visible text for production/proof terminology;
- promoted EG `1739:2` only after clean readback;
- moved only the top-level EF/EG spread positions so EB/EF/EG no longer overlap; internal page layouts were unchanged.

## Expected improvement

Restore the intended verified 1DAY travel-guide density in the actual live authority, eliminate production-copy leakage, and make preferred spreads easier for a human to inspect/edit later.

## Regression risk

Recovery clones can drift visually, escape their intended semantic parent, or inherit stale proof copy. A canvas-position cleanup can accidentally change internal geometry if the wrong node level is moved.

## Evidence

- Figma EG: `1739:2`;
- left page: `1739:3`;
- right page: `1739:29`;
- metadata: `1739:63`–`1739:66`;
- Start Here: `845:27`;
- whole spread 1200px: PASS;
- left actual `794×1123`: PASS;
- right actual `794×1123`: PASS;
- left collision / safe risk: `0 / 0`;
- right collision / safe risk: `0 / 0`;
- all preferred-visible production-term scan: `0 hits` after correction;
- Drive authority unchanged: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.

## Asset lifecycle

- generated: `0`;
- adopted generated: `0`;
- Drive saves: `0`;
- binary uploads: `0`;
- new image hashes: `0`;
- existing replaceable photos preserved: `YES`.

## Decision

`VERIFIED_LOCAL / ADOPTED`.

EG replaces the missing durable EC reference as the live preferred 1DAY Plan. V7 remains HOLD.

## Next application

Before future Rurubu writes, resolve the durable preferred IDs against live Figma first. Continue visual improvement from the live preferred set, with final legitimate distinct Yokohama photography still a higher-value bottleneck than extra surface decoration.