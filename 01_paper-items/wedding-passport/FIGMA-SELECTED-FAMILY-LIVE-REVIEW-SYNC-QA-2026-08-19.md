# WEDDING PASSPORT — selected-family live review-board sync QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_SELECTED_FAMILY_CANDIDATE / LIVE_REVIEW_SYNC_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

## Live authority

- start/latest `main` immediately before this write: `11ac138b31e5abb0d5ef85e9aff1602ef0db58da`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- Drive metadata was read back live before the Figma write; no Drive write was required.

## Visible problem

The selected-family QA board `146:2` had drifted behind the live selected roots. Its four embedded QA copies still rendered older states (including visual elements already removed from current production), so the board could no longer be trusted as same-scale visual truth even though the actual selected roots were current.

This was an authority/QA defect rather than a reason to mutate healthy production again.

## Bounded repair

The selected production roots were not redesigned in this repair:

- V3 front `144:3`
- V3 back `144:26`
- V2 menu `138:43`
- V2 seating `138:89`

Before changing the review board, the complete stale board was cloned to hidden rollback:

- `173:2 / ROLLBACK / CLEANROOM SELECTED FAMILY REVIEW / PRE-LIVE-SYNC 2026-08-19`

Only the four stale QA copies inside `146:2` were removed and replaced with fresh clones of the current selected roots at the same review positions:

- front clone `173:193`
- back clone `173:218`
- menu clone `173:235`
- seating clone `173:301`

Board renamed:

- `146:2 / QA / CLEANROOM SELECTED FAMILY REVIEW / LIVE SYNC 2026-08-19`

This duplication is review evidence only. It is not a new V2/V3 authoring source and does not violate the clean-room rebuild rule; production V2/V3 remains the independently blank-built selected family documented in `FIGMA-CLEANROOM-V2-V3-REBUILD-2026-08-15.md`.

## Visual QA

Fresh same-scale board screenshot after sync: PASS.

At whole-family scale the board now reflects current production rather than historical copies:

- front route endpoint dots and pseudo-nav/index treatment are absent as in current selected front;
- back generic brand/grid/endpoint treatment is absent and the quieter current route trace is reflected;
- menu current hidden metadata/footer state is reflected;
- seating current hidden metadata/footer state is reflected.

The family remains coherent as a dark archival cover pair plus warm editorial menu/seating interior. No new generated imagery or decoration was introduced merely to create activity.

## Structure / rollback QA

- selected roots remain unchanged and editable;
- variable/factual copy remains native Figma text;
- fixed route graphics remain editable vector roles;
- IMAGE fills added: `0`;
- generated assets added: `0`;
- Drive writes: `0`;
- old review state preserved as hidden rollback `173:2`;
- legacy production and earlier V2/V3 history remain preserved.

## Decision

`LIVE_REVIEW_SYNC_PASS`.

The WEDDING PASSPORT selected family continues to hold `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`; this run repaired the visual review authority so future whole-family decisions are based on current Figma truth rather than stale QA duplicates.

Next progression target: BOARDING PASS fresh live review / authority audit before any further design write.
