# Rurubu V5 — DZ editorial-interview clean-room

Date: 2026-08-12
Scope: Rurubu WEDDING only
Status: `DZ_ADOPTED_AS_BEST_INSIDE_COMPARATOR / CURRENT_UNCHANGED / V5_OPEN / V6_NOT_STARTED`

## Authority refresh
Before any Figma write, project-wide Figma production guidance, asset-generation memory, quality-over-legacy decision, Rurubu Foundation, Current Status, production OS, postmortem/V6 guardrails, editorial knowledge base, Figma editorial playbook, active-scope reconciliation, asset evidence ledger, latest comparator authority, V6 Current Status, GitHub main, fresh Drive Q60 readback, and live Figma were re-read. Current remained outer `77:18` / inside `77:290`; best comparators were DV `996:2` / DY `1012:2`.

## Visible problem
DY solved the right-page Memory Spots crop hierarchy, but its lower-left Q&A still read as a fairly even information arrangement: one large Q1 plus two similarly formatted right-side questions. At thumbnail scale the interview area lacked the abrupt size contrast and dense asymmetry expected from a Japanese travel-information magazine.

## Scratch-selection test
DY would not be selected unchanged from scratch for the Q&A treatment. The profile photo collage and right-page memory hierarchy were retained because they already won visual comparison, but the interview zone was rebuilt rather than polished around its old geometry.

## Principle / capability tested
Use subtraction and scale contrast instead of additional cards: one oversized `01`, one dominant pull quote, compressed `02/03` as a narrow secondary editorial column, thin semantic color rules, and a compact common-point/travel-note close. Preserve all factual/native text and every accepted production image hash.

Expected improvement:
- stronger thumbnail recognition of the interview story,
- clearer 1 + 2 + micro hierarchy,
- less form/dashboard rhythm,
- better actual-size Japanese reading path.

Regression risks:
- oversized numeral clipping or wrapping,
- Q1 numeral/question collision,
- narrow Q2/Q3 copy becoming too compressed,
- common-point/travel-note crowding.

## Experiment and repair
- Created rollback-safe DZ `1019:2` from DY on Working; Current was never touched.
- Rebuilt only the lower-left Q&A geometry; profile collage, right-page memory composition, fold guide, and accepted image hashes stayed intact.
- Q1 became the dominant interview anchor with an 80px native `01`, direct Japanese question, and a large pull quote.
- Q2 and Q3 became a narrower right editorial column separated by cyan/yellow rules rather than cards.
- Common-point and Travel Note remained native text and were retained at the bottom.
- First structure audit caught one Q1 numeral/question text-box intersection; repaired before promotion.
- Review screenshot then caught a different failure that structure QA alone could not: the `01` box was too narrow, causing the second digit to wrap visually into the pull-quote zone. The bad Review snapshot `1020:2` was hidden and preserved as `REJECTED HIDDEN — DZ Q1 OVERFLOW`.
- Corrected Working `01` to 120×96 at 80px and moved the question to x=152. A fresh Review snapshot was created only after the corrected render passed visual inspection.

## Three-scale evidence
Corrected DZ was reviewed at:
- thumbnail / whole spread: 500px,
- reading / whole spread: 1200px,
- actual-size left page: approximately `804×1123` rendered from the natural page.

Result: DZ is preferred over DY for the inside comparator. The profile photography still dominates the upper page, while the lower interview reads as one principal story plus compressed secondary questions instead of repeated modules. Q2/Q3 remain legible at actual size.

## Final structure evidence
- visible native text: `53`
- visible IMAGE fills: `6`
- same-parent text/text intersections: `0`
- fold guide: `1019:283`, x=`792.7`, width=`2`, height=`1122.5`
- accepted image hashes preserved exactly:
  - profile A `a39dd297eb9de572317a5ce57f0af12e8597b156`
  - profile B `2359f635b4926a83e22ca1f9214e75c709291152`
  - history `539c259be8036b481d06b4f76db9a39b407d90e8`
  - memory 01 `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - memory 02 `439a719d73f28e8dd2889f2026cccb15f345ec63`
  - memory 03 `c09aa82e7b2ac75708707345c6f845452bf67663`

## Promotion / rollback
- Best inside Working comparator: DZ `1019:2`
- Corrected Review snapshot: `1021:2 / BEST INSIDE — DZ — source 1019:2`
- Previous DY Review `1016:2` preserved hidden as rollback.
- Rejected pre-fix DZ snapshot `1020:2` preserved hidden as failure evidence.
- Start Here updated to `DV outer / DZ inside`.
- Current `77:18 / 77:290` remained unchanged.

## Q60 boundary
Fresh Drive readback still verifies `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`, Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155,439 bytes. Exact Drive-binary → Figma node/image-hash placement remains open. The previously repeated DNS upload path and rejected model-visible base64 chunk method were not repeated in this run.

## Result
**DV remains best outer; DZ is promoted as best inside comparator.** V5 is still incomplete because V5-01 exact Q60 provenance/placement/screenshot/structure lifecycle remains open. V6 production remains gated and was not started.
