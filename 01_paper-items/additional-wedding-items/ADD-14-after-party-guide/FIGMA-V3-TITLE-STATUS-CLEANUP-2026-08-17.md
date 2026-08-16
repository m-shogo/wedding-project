# ADD-14 二次会案内 — V3 guest-facing title-status cleanup

Status: `CLEANROOM_V3_SELECTED_CANDIDATE / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / TITLE_STATUS_CLEANUP_PASS / A6_A5_LONG_COPY_STRESS_REVALIDATED / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `a55d8c4330152a57d91d64b892ff58f7ee2d737e`

## Authority
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `IygEr140Yqk12LsGL3TFrT`
- selected clean-room page: `32:2 / CLEANROOM / ADD-14 / V3 NIGHT FIELD / 2026-08-17`
- selected A6: `32:3`
- selected A5: `32:29`
- hidden stress A6: `33:2`
- hidden stress A5: `33:28`
- Drive authority: `ADD-14_二次会案内` / `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`
- legacy production remains unchanged: A6 `1:2`, A5 `1:18`

## Visible defect
Fresh selected-candidate screenshots showed a standalone internal `LAYOUT DUMMY` line immediately below the guest-facing title `夜のつづきへ。` on both A6 and A5. The actual unresolved semantic facts already remain explicitly marked in their own native placeholders (`[会場名 · LAYOUT DUMMY]`, address, times, access, fee, RSVP/contact), so this additional title-status line had no reader-facing or semantic purpose. At whole-item scale it read like production/proof metadata and weakened the late-night stationery hierarchy.

## Bounded rollback-safe change
Before mutation, hidden rollback copies were created:
- `37:2` — pre-cleanup A6
- `37:29` — pre-cleanup A5
- `37:56` — pre-cleanup A6 stress
- `37:83` — pre-cleanup A5 stress

Only the four standalone internal status nodes were hidden:
- A6 `32:6 / META / TITLE STATUS`
- A5 `32:32 / META / TITLE STATUS`
- stress A6 `33:5 / META / TITLE STATUS`
- stress A5 `33:31 / META / TITLE STATUS`

No guest-facing factual placeholder, route geometry, time role, venue role, access/fee/RSVP role, typography size, color, or legacy production node was changed.

## Post-change visual QA
A6 and A5 fresh screenshots now read directly:

`二次会のご案内 → 夜のつづきへ。 → venue/address → route/time → lower information`

without a proof-status line interrupting the title-to-venue transition.

- whole / thumbnail: PASS; title hierarchy is cleaner and more product-like.
- reading scale: PASS; unresolved facts remain explicit where they actually belong.
- actual-size native A6 592×420 and A5 840×592: PASS.
- generated/composed imagery: not required; IMAGE fills remain 0.

## Long-copy revalidation
Both hidden stress clones were temporarily shown after the cleanup and inspected again, then returned to hidden state.

- stress A6 `33:2`: visible text outside root = `0`
- stress A5 `33:28`: visible text outside root = `0`
- screenshots confirm the long venue/address, full-form times, access/notice, fee/payment, RSVP/deadline and contact strings still fit without collision or trim escape.

The cleanup therefore preserves the existing `A6_A5_LONG_COPY_STRESS_PASS` evidence.

## Drive / asset decision
No screenshot-supported image or asset defect exists in this selected V3 family. Drive writes: `0`.

## Current gate
The clean-room V3 selected family keeps:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`

Final production still depends on authoritative second-party decision, venue/address/floor, schedule, access/travel time, fee/payment, RSVP/contact policy, QR destination if used, and physical/vendor proof. These facts were not invented in this run.
