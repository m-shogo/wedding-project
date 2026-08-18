# RSL-100 — Preferred-node liveness must be reconciled before production writes

Date: 2026-08-18
Source scope/item: Rurubu WEDDING / V6 1DAY Plan
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The durable Rurubu V6 status declared EC `1723:63` as the preferred 1DAY Plan, but fresh live-Figma readback found the EC root and its right page missing. Verified rollback DX `1714:2` remained intact.

## Root-cause hypothesis

A durable status/ledger can become stale relative to the live design file. Treating a recorded preferred node ID as current authority without checking liveness can direct later writes at a nonexistent or superseded object.

## Bounded test

Before further design edits:

1. queried the declared preferred EC IDs in live Figma;
2. confirmed the IDs were missing rather than hidden;
3. located the verified DX rollback;
4. re-read the previous EC evidence/RSL-098 contract;
5. cloned DX rollback-safe;
6. restored only the four already-verified native practical-metadata lines;
7. verified each restored text node's parent inside the new semantic right-page frame;
8. ran whole/read/actual-size and collision/safe-area QA;
9. removed one visible production-facing `EDITABLE` label;
10. promoted the reconciled EG root only after live readback.

## Expected improvement

Restore live production continuity without inventing new design authority or mistaking durable documentation for the current canvas state.

## Regression risk

A recovery clone can drift from the previously verified treatment, place descendants outside the intended frame, or preserve internal/proof wording that was never meant for readers. Recovery therefore requires explicit parent/structure readback and actual-size visual QA.

## Three-scale evidence

- EG whole spread `1739:2`, 1200px: PASS;
- left page `1739:3`, actual `794×1123`: PASS;
- right page `1739:29`, actual `794×1123`: PASS;
- left native text `19`, collisions `0`, 18px safe risks `0`;
- right native text `25`, collisions `0`, 18px safe risks `0`.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- stale durable preferred: EC `1723:63`, missing live;
- verified rollback: DX `1714:2`;
- reconciled preferred: EG `1739:2`;
- EG right page: `1739:29`;
- restored metadata: `1739:63`–`1739:66`;
- Start Here: `845:27`;
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`;
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EG-1DAY-PREFERRED-LIVENESS-RECONCILIATION-2026-08-18.md`.

## Failure fingerprint

`PREFERRED_STATUS_POINTS_TO_MISSING_LIVE_NODE`

Stop condition: do not continue production writes against the recorded ID. Resolve live node existence/visibility and reconcile from verified rollback/evidence first.

## Adopted / rejected / blocked status

`VERIFIED_LOCAL / ADOPTED` for Rurubu V6. No asset generation, Drive write, binary upload, or new image hash was needed.

## What must remain Rurubu-specific

Do not transfer the 1DAY visual grammar, page coordinates, STOP composition, route line, metadata copy, photography, palette, or Rurubu branding.

## Cross-item applicability hypothesis

For any persistent Figma production workflow, independently test a simple liveness gate before writes:

`durable preferred declaration → live node exists + visible/semantic role readback → production write`.

If the durable preferred is missing live, restore only from verified rollback/evidence or stop for reconciliation. Do not silently reinterpret the old ID as permission to create a new design.