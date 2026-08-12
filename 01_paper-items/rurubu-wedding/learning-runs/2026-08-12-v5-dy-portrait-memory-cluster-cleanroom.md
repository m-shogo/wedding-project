# Rurubu V5 — DY portrait-memory crop-integrity clean-room

Date: 2026-08-12
Scope: Rurubu WEDDING only
Status: `DY_ADOPTED_AS_BEST_INSIDE_COMPARATOR / CURRENT_UNCHANGED / V5_OPEN / V6_NOT_STARTED`

## Authority refresh
Before writes, project-wide Figma production guidance, quality-over-legacy decision, Rurubu production OS/postmortem, Current Status, active-scope reconciliation, asset evidence ledger, latest comparator authority, GitHub main, Drive Q60 source, and live Figma were re-read. Current remained outer `77:18` / inside `77:290`; outer comparator remained DV `996:2`; inside comparator was DF `899:2`.

## Scratch-selection test
DF would not be selected unchanged from scratch. Its left profile/Q&A page remained strong, but the right-page Memory Spots section still used support-photo crops that read too much like horizontal cards. At actual size, support 02 copy visually intruded into the dominant-photo region and support 03 felt detached from the main editorial rhythm.

## Principle / capability tested
Preserve the proven native/editable content and accepted image hashes, but rebuild the Memory Spots hierarchy around source-aware crop geometry: one dominant landscape image plus portrait/compact support photographs, independent caption bands, and a materially stronger `01`/title anchor. The intent was to improve crop integrity and Japanese travel-magazine asymmetry without adding cards, gradients, shadows, or generated assets.

## Experiment and repairs
- Created rollback-safe DY `1012:2` from DF; Current was never touched.
- Kept the profile/Q&A page and all six accepted production image hashes unchanged.
- Right page final photo geometry:
  - lead `1012:267`: `550×330`, rotation `0.6°`
  - support 02 `1012:268`: `220×230`, rotation `-3.2°`
  - support 03 `1012:269`: `230×170`, rotation `2.4°`
- Strengthened lead `01` to 34px and its Japanese title to 30px while keeping native text.
- Separated support captions from the dominant photograph instead of letting them behave as overlay cards.
- First thumbnail iteration was too sparse; lead authority and headline scale were increased.
- Enlarging `01` initially clipped its text box; the box was widened before adoption.
- Structure QA found accidental text collisions during iteration; all were repaired before promotion.

## Three-scale visual evidence
Compared DF and DY at:
- whole-item / thumbnail: 500px
- reading / spread: 1400px
- actual-size right page: `794×1123`

DY wins. The dominant coast photo still reads first, support 02 becomes a believable vertical editorial inset, and support 03 becomes a separate lower-right destination note rather than a repeated horizontal module. The page is denser and more asymmetric without becoming a dashboard or scrapbook.

## Final structure evidence
- visible native text: `53`
- visible IMAGE fills: `6`
- same-parent text/text intersections: `0`
- text safe-area risks under 18px: `0`
- image hashes preserved:
  - profile A `a39dd297eb9de572317a5ce57f0af12e8597b156`
  - profile B `2359f635b4926a83e22ca1f9214e75c709291152`
  - history `539c259be8036b481d06b4f76db9a39b407d90e8`
  - memory 01 `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - memory 02 `439a719d73f28e8dd2889f2026cccb15f345ec63`
  - memory 03 `c09aa82e7b2ac75708707345c6f845452bf67663`

## Promotion / rollback
- Best inside working comparator: DY `1012:2`
- Review snapshot: `1016:2 / BEST INSIDE — DY — source 1012:2`
- Previous DF Review `904:2` preserved hidden as rollback.
- Start Here updated and screenshot-read back as `DV outer / DY inside`.
- Current `77:18 / 77:290` unchanged.

## Q60 boundary
Drive Q60 remains verified as ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, `1330×1220`, `155,439` bytes, SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`. Existing evidence explicitly rejects manual/model-visible base64 chunk transport because even 4k-class chunks can lose characters. That rejected path was not resumed. No Q60 binary was placed or counted this run.

## Result
**DV remains best outer; DY is promoted as best inside.** V5 remains incomplete because exact Q60 Drive → Figma node/hash → screenshot/structure lifecycle is still open. V6 remains gated.