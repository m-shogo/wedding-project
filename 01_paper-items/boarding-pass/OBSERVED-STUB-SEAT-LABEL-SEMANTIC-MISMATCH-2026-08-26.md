# BOARDING PASS — Stub label semantic mismatch / 2026-08-26

State: `OBSERVED → ROOT_CAUSE_HYPOTHESIS / BOUNDED_FIGMA_TEST_PENDING / CURRENT_UNCHANGED`

## Live authority

- latest `main` immediately before write: `8111409c0579a1f332a9323053261b1edc3e628c`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `P2PtpMyhyZqHYe1ZBBCD13`
- current front/back: `63:41 / 63:72`
- Drive authority: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`
- Drive authority metadata re-read live on 2026-08-26; Drive write `0`.

## Visible problem

Fresh reading-scale screenshot of current front `63:41` shows an internal semantic inconsistency on the detachable stub:

- main body table label reads `卓` above `[卓番号]`;
- detachable stub uses the label `席` above the same `[卓番号]` value.

The stub therefore names a table-number field as a seat field. This is not an overflow or styling problem: the wording changes the meaning of the information carried by the detachable stub.

The current metadata also confirms separate semantic roles:

- `63:62 / TEXT / TABLE LABEL`
- `63:63 / TEXT / TABLE`
- `63:68 / TEXT / STUB SEAT LABEL`
- `63:69 / TEXT / STUB TABLE`

## Root-cause hypothesis

The clean-room ticket structure correctly preserved the table-number value on both the main body and stub, but the stub label inherited a generic transport-ticket concept (`seat`) instead of the actual wedding semantic role (`table`). Because the artifact intentionally avoids fake airline credentials, leaving `席` here creates the exact kind of transport-authenticity overreach the current visual policy is meant to prevent.

## Required bounded test

Do not redesign the ticket and do not change `[卓番号]` geometry.

When Figma authoring guidance is readable again, create rollback-safe retained-vs-corrected comparison changing only `63:68 / TEXT / STUB SEAT LABEL`:

1. current `席`;
2. candidate `卓`.

Verify:

- whole / thumbnail: stub still scans instantly;
- reading scale: main body and stub use consistent semantics without becoming redundant/noisy;
- native `1200×550`: no new collision with `[卓番号]`;
- long-copy stress `64:2`: matching stub label remains correct;
- `textAutoResize=HEIGHT`, fixed-height count `0`, outside text `0`, IMAGE fill `0` remain unchanged.

Do not replace with `SEAT`, fake seat-number wording, flight credentials, barcode, gate, or airline terminology.

## Current visual status

The broader `BAGGAGE RIBBON / RETURN LABEL` art direction remains visually strong and current `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` is not revoked by this single bounded semantic defect before the comparison is executed.

Front/back fresh screenshots otherwise preserve the verified ticket/stub/perforation hierarchy. No image-generation role is justified for this issue.

## Authoring blocker

The connected Figma write action requires `figma-use` guidance before mutation. The canonical guidance resource again returned `ResourceNotReadable` on this run. This is the same known authoring-path fingerprint; per the shared failure-dedup rule, do not blind-retry or bypass the contract.

## Result

`CURRENT_UNCHANGED / SEMANTIC_STUB_LABEL_MISMATCH_OBSERVED / BOUNDED_FIGMA_TEST_PENDING / DRIVE_UNCHANGED / IMAGE_GENERATION_NOT_REQUIRED / NOT_PRINT_READY`
