# Rurubu V5 — FB nonrepetitive-front clean-room rejection — 2026-08-13

Status: `REJECTED_VISUAL_REGRESSION / FA_EO_AUTHORITY_RETAINED / CURRENT_UNTOUCHED / V5_NOT_COMPLETE`

## Authority before experiment
- live Figma page: `01_RURUBU_WEDDING`
- Best Outer FA Working: `1161:2`
- Best Outer Review: `1167:2`
- Best Outer Start Here: `1168:2`
- Best Inside EO: `1107:285` / Review `1111:188`
- Current: outer `77:18`, inside `77:290`
- latest Rurubu authority commit observed: `83a224683f53ab6b5380aa3ba625677c71a36d12`

## Fresh diagnosis
FA remains substantially stronger than legacy Current, but a fresh 500 px screenshot showed two unresolved front-cover issues: the accepted coast image appears as both the dominant back-cover travel field and a large lower-right front fragment, and Feature 02 retains a broad cyan caption-paper treatment that reads slightly like a photo card.

Asked from scratch, this justified a materially different clean-room subtraction test rather than polishing FA in place.

## Experiment
Created FB `1172:2` as a safe duplicate of FA. Current, Review and Start Here were not changed.

Successful first pass:
- hid `1172:133 / AB_TEASER_COAST_VERIFIED`
- enlarged `1172:177 / BM_TEASER_PHOTO_02` to `436 × 332` at approximately `-4.2°`
- expanded/repositioned the existing native Feature 02 caption group (`1172:178–180`)
- preserved the exact secondary Yokohama Q60 destination image `1172:189`, hash `644f449c3bf2001a94d4b822d2b55e2614c11042`
- generated asset count `0`
- external binary placement count `0`

## Visual result
FB 500 px whole-item screenshot: **FAIL versus FA**.

The coast subtraction successfully removed front/back image repetition, but the lower-right of the front became a large unstructured cream field. Feature 02 could not replace the lost visual mass with the first safe geometry change. The page lost the dense-but-readable closure required for a travel-information magazine cover.

Because the experiment failed at thumbnail scale, it was not promoted to Review or Start Here and was not treated as progress. FA / EO remain Best.

## Runtime boundary
A follow-up attempt to repurpose an existing hidden Feature 03 note as a lower-right print anchor was blocked before execution by the runtime safety-status guard. A different geometry-only refinement was also blocked before execution. A later cleanup attempt to hide the rejected FB node was blocked in the same way. Readback confirmed these blocked calls caused no mutation.

The repeated blocked write fingerprint was not retried further. FB remains present in live Figma and should be hidden / marked rejected as the first safe mutation in the next run. Its presence does not change Best authority because it was never promoted.

## Q60 reconciliation
Fresh Drive reads during this run:
- master: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, `155,439` bytes
- 560 role derivative: `1YwRdAauE1-CtXV3VD08CEvn7b-lFYlGX`, JPEG, `33,725` bytes

A live-Figma audit of nodes whose names mention Q60 / cover hero found:
- Current hero `77:148`: hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- FA dominant wide image `1161:134`: history derivative hash `539c259be8036b481d06b4f76db9a39b407d90e8`
- exact secondary Q60 destination image: hash `644f449c3bf2001a94d4b822d2b55e2614c11042`
- no proven exact 560-role derivative placement was found

Therefore dominant Q60 master provenance remains OPEN.

## Decision
**FB REJECTED. FA `1161:2` / EO `1107:285` remain authoritative.**

V5 remains incomplete and V6 production remains closed. Next safe work is first to clean the rejected FB canvas evidence if mutation capability returns, then continue only with a materially stronger visual hypothesis or a genuinely binary-safe dominant Q60 provenance path.
