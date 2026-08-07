# V5 inside editorial clean-room B

Date: 2026-08-08
Scope: Rurubu WEDDING V5 only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Candidate: `419:2 / V5_INSIDE_EDITORIAL_CLEANROOM_B_2026_08_08`
Current inside `77:290` was not modified.

## Authorities reviewed
The project-wide Figma production system, generated-asset memory, continuous-learning system, design feedback log, project memory, quality-over-legacy decision, Current Rurubu status, V5 asset ledger, editorial knowledge base, lessons log, V5 operating system, postmortem, and V6 gate/status were re-read before the experiment. The asset ledger remains progress authority.

## Trigger / visible problem
The Current inside spread is significantly improved from earlier versions, but the left-page Q&A still inherits residual interface-like grouping from the old QA panel/rules, and the right-page hierarchy leaves less area than necessary to the now quality-passing history photograph. The quality-over-legacy question was therefore answered explicitly: if this spread did not already exist, the current QA chrome would not be required as the starting point.

## Hypothesis
A clean-room comparison that subtracts QA containment while strengthening the dominant history and lead-memory photographs should feel more like an edited travel/profile magazine and less like a dashboard, without removing useful copy or semantic structure.

Expected gains:
- more direct editorial typography on the profile/Q&A page
- fewer UI/card boundaries
- larger visual authority for the verified history image
- clearer `history → memory spots` hierarchy
- native text and semantic photo nodes remain editable

Possible regressions:
- too much subtraction can make the Q&A page visually empty
- pale question numbers can become too quiet at actual size
- enlarging photos can compress surrounding captions or micro-information

Adoption evidence required:
- whole-spread screenshot
- separate left/right page screenshots
- actual-size dominant-photo render
- structure/semantic-node review
- Current comparison before any promotion

## Prototype
Created rollback-safe duplicate `419:2` from Current `77:290`.

### Left page changes
Subtracted the visible QA panel/chrome instead of adding new decoration:
- hid `IA_QA_PANEL`
- hid `AUTH_QA_HERO_PANEL`
- hid Q1/Q2/Q3 number backgrounds
- hid the Q1 L-shaped rule pair and Q2/Q3 top rules
- retained all Q&A copy as native text
- repositioned the three questions into direct editorial text groups
- kept profiles, names, metadata, semantic photo nodes and shared-interest copy
- retained Travel Note as the already-verified rule/direct-type treatment

### Right page changes
- enlarged `IA_HISTORY_MEMORY_PHOTO` from `678×280` to `678×310` in the duplicate only
- moved the history caption with the image
- slightly increased the lead memory photo from `398×214` to `410×230`
- enlarged the two small active memory images from `88×92` to `96×100`
- retained the timeline, `MEMORY SPOTS / MINI MAP`, semantic roles, native copy and footer

No Current image hash, Drive provenance, role count, or rollback state was changed.

## Three-scale QA

### Whole spread — PASS as comparison direction
The spread has a clearer editorial rhythm: profiles and direct Q&A on the left; timeline → dominant verified history image → memory hierarchy on the right. The removal of card/rule chrome is visible without causing structural holes.

### Reading/page scale — PASS with one watch item
Left page `419:3` reads cleanly from profile → 3 QUESTIONS → shared interests → TRAVEL NOTE. Right page `419:117` reads from OUR HISTORY/timeline → dominant history photo → MEMORY SPOTS lead image → two micro destinations. Watch item: Q1/Q2/Q3 numeric labels are now intentionally quiet and should be checked again after final print-size typography is known.

### Actual-size/detail — PASS for the dominant image, typography still provisional
`419:140 / IA_HISTORY_MEMORY_PHOTO` renders at natural `678×310` with waterfront, promenade lights, skyline edge and people remaining distinct. This verifies that the accepted history derivative has enough crop headroom for the slightly taller comparison placement. Final physical-print typography remains separately gated.

## Asset-transfer blocker encountered
Before this layout experiment, the new V5-01 cover-hero Q30 derivative was targeted to rollback-safe duplicate `418:132` using Figma's new single-use `upload_assets` endpoint. The endpoint was created successfully, but the execution container again could not resolve `mcp.figma.com`. This is the same DNS-class external uploader blocker already seen before, so the method was abandoned immediately rather than retried. No canvas mutation occurred from the failed POST. Cover hero remains OPEN and no photo-role counts changed.

## Result
`DISCOVERED → PROTOTYPED → VERIFIED_COMPARISON_DIRECTION / NOT_CURRENT / NOT_PROJECT_RULE`

The experiment is stronger than simply polishing the inherited card geometry. It does not yet prove the whole inside spread should replace Current; final choice waits for direct Current-vs-clean-room comparison and print/fold/safe-area review.

## Next application
1. Keep cover-hero asset work separate; do not treat this layout gain as a photo-role pass.
2. Compare `419:2` directly against Current `77:290` after the remaining intended-source roles are applied.
3. If the direct-type Q&A treatment still wins with final-length copy, promote the subtraction principle only for this spread first.
4. Preserve `419:2` as rollback/comparison evidence.
5. Keep V6 production gate closed until V5 dummy-photo design QA is actually verified.
