# 2026-08-13 — V5 EV dense travel-cover promotion

Scope: Rurubu WEDDING only.

## Visible problem
EU was stronger than the legacy composition but still too close to a poster: giant destination image + stacked labels. The cover needed denser editorial hierarchy without reverting to cards or generic decorative panels.

## Experiment
Created rollback-safe EV from EU. Kept the verified photo set, enlarged the exact Yokohama Q60 derivative to a bounded postcard role, changed `ふたり旅。` from a broad banner into native type plus a thin cyan rule, enlarged and rebalanced 01/02/03, and tightened the photo-overlap rhythm. Renamed the dominant hero to state that its current hash is not Q60 exact.

## Rejected / repaired states
Initial structural QA found three absolute text-box intersections: subtitle/detail, kicker/01, and 01/title. The giant `横浜` also sat 16px from the left edge, below the 18px bounded safe-area rule. These were repaired before promotion.

## Evidence
- Working: `1139:2`
- Review: `1140:2`
- Exact Yokohama derivative node: `1139:189`
- Exact derivative image hash: `644f449c3bf2001a94d4b822d2b55e2614c11042`
- Thumbnail 500px: PASS
- Whole-item: PASS
- Actual-size front 794×1123: PASS
- Visible native text: 37
- Visible IMAGE fills: 7
- Absolute text intersections: 0
- 18px safe-area risks: 0
- Fold preserved: x=792.7, width=2

## Asset lifecycle status
Fresh Drive master readback/materialization succeeded: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155,439 bytes. Fresh Figma upload target issuance succeeded, but binary POST failed again at DNS resolution for `mcp.figma.com` before any mutation. The same failed transport fingerprint will not be repeated. Exact secondary derivative evidence remains valid; dominant hero provenance remains OPEN.

## Navigation reconciliation
Start Here was stale (`ER` text and `ET` status). It was re-read and updated to `EV outer / EO inside`; prior ES outer review was hidden as rollback evidence.

## Decision
ADOPT EV. Current `77:18 / 77:290` remains untouched. V5 is not complete. V6 production stays closed until dominant hero provenance plus final print/fold/ledger reconciliation are verified.