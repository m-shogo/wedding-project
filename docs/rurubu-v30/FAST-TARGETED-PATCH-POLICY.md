# Rurubu WEDDING V30 — FAST TARGETED PATCH POLICY

Status: `CURRENT_V30_EXECUTION_POLICY / USER_FEEDBACK_2026-09-02`

Purpose: prevent a small, already-bounded correction from turning into a full-page re-audit, repeated screenshot loop, or long evidence/reporting cycle after the actual fix is already complete.

## Core principle

`SMALL PATCH ≠ FULL REBUILD`

`FIX COMPLETE ≠ START ANOTHER AUDIT CYCLE`

`FINAL QA = ONE INTEGRATED PASS`

When the owner asks for a small set of explicit corrections and the accepted baseline is already locked, use **FAST TARGETED PATCH** by default.

## Qualification

Use FAST TARGETED PATCH when all are true:

- scope is explicit and local, normally about 1–4 defects/modules;
- the current page/frame is already the accepted baseline;
- no page-role redesign or large composition change is requested;
- affected nodes/assets can be isolated;
- previously accepted unrelated gates are not implicated by the change.

Examples:

- one or two alpha/material repairs;
- one stale-copy replacement;
- one z-order fix;
- one edge-safety adjustment;
- one small display-module regeneration.

Do not use this mode for a page rebuild, major Hero/title replacement that changes the overall hierarchy, page-role change, or evidence of systemic corruption affecting many modules.

## Execution sequence — HARD

1. Read current authority and identify only the reopened gates.
2. Modify only the affected current nodes/assets.
3. For cheap asset-side defects, use one quick discriminator and regenerate/re-cut immediately when appropriate.
4. Perform any specifically required bounded sibling sweep once.
5. Delete superseded LIVE nodes after replacement.
6. Run **one integrated final visual QA** covering:
   - the explicitly changed items;
   - any directly dependent item;
   - untouched-neighbor safety only where the patch could realistically affect it.
7. Confirm protected frames/pages are untouched when relevant.
8. Commit/push new production binaries if created and verify their remote existence once.
9. Close the reopened gates and stop.

## QA budget — HARD

For a normal FAST TARGETED PATCH:

- final full-page screenshot: **1**;
- A5/actual-size evidence: **1 only when material/readability/edge acceptance needs it**;
- repeated alpha/source diagnosis: **0 after the source defect has been established and repaired**;
- repeated Reference Delta passes: **0 unless the single final integrated pass fails**;
- re-audit of unrelated previously-PASS gates: **prohibited by default**;
- web research: **prohibited unless a real external-information blocker exists**;
- broad repository archaeology after the fix: **prohibited**;
- repeated local/remote HEAD checks: **one final sync check is enough**.

The exact count may expand only if the final integrated pass fails, a destructive-risk inconsistency appears, or the patch unexpectedly affects broader page composition.

## Stop rule — HARD

Once all explicitly reopened gates pass in the single integrated final QA, protected neighboring work is confirmed untouched, and required production files are remotely synchronized:

**STOP.**

Do not continue collecting evidence merely because more checks are possible.

Do not turn a completed 1–4 item patch into a full production certification cycle.

Final print certification remains a separate later stage when final photos/print assets are ready.

## Reporting budget — HARD

For FAST TARGETED PATCH, final report should normally contain only:

1. changed items;
2. reopened gate results;
3. commit / remote sync result;
4. protected page/frame untouched result;
5. LOCK / next-page readiness.

Do not produce a 20+ item checklist unless the owner explicitly asks for it or a real anomaly requires it.

Do not narrate every intermediate tool call.

## Escalation conditions

Exit FAST TARGETED PATCH and widen QA only when one of these occurs:

- final integrated visual QA fails;
- an affected asset reveals a same-family systemic defect beyond the bounded sibling sweep;
- Figma structure appears corrupted or ambiguous;
- protected page/frame changed unexpectedly;
- patch materially changes the page's 3-second hierarchy;
- owner explicitly asks for a broader review.

If none occurs, remain in FAST TARGETED PATCH and close quickly.

## Relationship to existing policies

This policy does not remove:

- canonical fact/copy checks;
- destructive-write safety;
- required sibling sweep after a shared alpha failure;
- superseded LIVE cleanup;
- one final integrated QA;
- required Git/Drive production sync.

It **does** prevent those requirements from expanding into repeated, unrelated, context-heavy QA after a bounded fix is already successful.
