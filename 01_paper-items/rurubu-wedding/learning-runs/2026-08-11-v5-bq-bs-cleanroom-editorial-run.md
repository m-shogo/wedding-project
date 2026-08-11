# 2026-08-11 — V5 BQ/BR/BS clean-room editorial run

Scope: Rurubu WEDDING only. No WEDDING PASSPORT / BOARDING PASS / 青春ふたりきっぷ / ADD mutation.

## Authority and pre-write state

Fresh reads used before mutation:
- live Figma file `bfM0d4c9dCeBv5pCkJ3TNM`, page `01_RURUBU_WEDDING`
- Current outer `77:18`, Current inside `77:290` — intentionally unchanged
- latest GitHub main before write: `96d33995a50883a1cef19066387c82e0d207f081`
- `RURUBU-V6-CURRENT-STATUS.md`
- prior BO/BP learning evidence and feedback
- Google Drive Q60 cover derivative exact readback

V6 production remains closed until the V5 dummy-photo design gate is genuinely verified.

## Experiment A — BQ inside pull-quote editorial clean-room

Visible problem:
- BP left page had improved photography, but the lower half still read partly as a balanced Q&A/form grid.
- The broad yellow common-point tape consumed width without creating enough editorial hierarchy.

Principle tested:
- keep all factual/native text and accepted profile photography;
- promote one existing Q1 answer into an editorial pull quote rather than adding a card;
- keep Q2/Q3 as compact secondary stories;
- compress the common-point content into a smaller angled print tape;
- use one restrained magenta rule as a print anchor instead of a container.

Live Figma evidence:
- inside `783:282 / V5_INSIDE_RURUBU_CLEANROOM_BQ_PULLQUOTE_EDITORIAL_2026_08_11`
- left `783:283 / INSIDE_LEFT_BQ_PULLQUOTE_EDITORIAL`
- pull quote existing semantic text `783:308`, x `54`, y `808`, width `350`, height `78`, font size `25`
- pull-quote rule `784:2`, x `42`, y `804`, `5 × 88`
- common-point text `783:348`: `旅 × 写真 × HAWAII\n好きが重なるところ。`
- common tape `783:284`: x `28`, y `924`, `430 × 74`, rotation `-1.2°`

Visual QA and regression repair:
- first whole-spread screenshot showed the common-point phrase wrapping awkwardly.
- the existing native text was given an intentional two-line break and the tape height/width was rebalanced.
- actual-size left-page review then showed the enlarged Q1 answer needed an editorial anchor; the narrow magenta rule was added without a card or shadow.
- whole-spread and actual-size left-page screenshots were rechecked after repair.

Final BQ structure QA:
- visible native text: `53`
- visible IMAGE fills: `6`
- same-parent visible text intersections: `0`
- fold guide `783:561`: x `792.7000122070312`, width `2`, height `1122.5`
- preserved accepted hashes:
  - groom `a39dd297eb9de572317a5ce57f0af12e8597b156`
  - bride `2359f635b4926a83e22ca1f9214e75c709291152`
  - history `539c259be8036b481d06b4f76db9a39b407d90e8`
  - memory lead `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - old town `439a719d73f28e8dd2889f2026cccb15f345ec63`
  - next destination `c09aa82e7b2ac75708707345c6f845452bf67663`

Decision: `ADOPTED_AS_BEST_INSIDE_STRUCTURE_CANDIDATE / NOT_CURRENT`.

## Experiment B — BR outer alternate-photo test

Visible problem:
- BO's full-height Yokohama sunset raster is visibly soft/pixelated at actual size.
- A layout-quality test was needed that reduced raster stretching before Q60 transport is solved.

Principle tested:
- bound the dominant photo to roughly the upper 70% of the page;
- enlarge/stagger support-photo stories into the photo/paper boundary;
- remove the legacy image masthead from the new clean-room and use original native editorial masthead text instead.

Live Figma evidence:
- outer `785:2 / V5_OUTER_RURUBU_CLEANROOM_BR_Q60_EXACT_TEST_2026_08_11`
- front `785:131`
- test hero used accepted coast hash `adbb8e529451a81dd25e4eb29bf068655569ce25` at `793.7 × 820`
- original native masthead was introduced instead of copying the legacy image masthead.

Visual QA decision:
- whole-spread screenshot was materially sharper and more energetic than the soft full-height sunset treatment.
- however the coast photograph did not satisfy the Yokohama cover role. Visual attractiveness does not override semantic photo-role correctness.

Decision: `REJECTED_FOR_DESTINATION_ROLE_MISMATCH / PRESERVED_AS_COMPARISON`.

## Experiment C — BS bounded Yokohama hero

Visible problem:
- the correct Yokohama sunset role needed to be retained while avoiding BO's full-page stretch.
- the first bounded composition also left too much blank paper below feature 01 and an English-only masthead felt less Japanese-editorial.

Principle tested:
- use the correct existing Yokohama sunset hash but bound it to `793.7 × 820` instead of full `1122.5` height;
- preserve aggressive overlap between the photo edge, feature-01 pasted paper, and unequal 02/03 photo stories;
- replace the clean-room masthead with original native text `旅するWEDDING`;
- compact feature 01 and restore a restrained existing footer rule/microtype as print texture.

Live Figma evidence:
- outer `787:2 / V5_OUTER_RURUBU_CLEANROOM_BS_BOUNDED_YOKOHAMA_HERO_2026_08_11`
- front `787:131 / FRONT_COVER_BS_BOUNDED_YOKOHAMA_HERO`
- hero `787:133 / BS_HERO_YOKOHAMA_BOUNDED`: `793.7 × 820`, hash `539c259be8036b481d06b4f76db9a39b407d90e8`
- native masthead `787:183`: `旅するWEDDING`
- feature-01 paper `787:174`: x `-16`, y `758`, `424 × 246`, rotation `-2.5°`
- existing print footer restored at lower left.

Visual QA:
- whole outer spread reviewed after first bounded layout.
- actual-size front reviewed after masthead/paper/footer repair.
- the bounded sunset remains visibly soft; the change reduces stretching but does not close the raster-quality gate.

Final BS structure QA:
- visible native text: `39`
- visible IMAGE fills: `7`
- same-parent visible text intersections: `0`
- fold guide `787:184`: x `792.7000122070312`, width `2`, height `1122.5`
- hero hash preserved as `539c259be8036b481d06b4f76db9a39b407d90e8`
- Current outer was freshly re-read as `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE` and remained unchanged.

Decision: `ADOPTED_AS_BEST_OUTER_STRUCTURE_CANDIDATE_PENDING_Q60 / NOT_CURRENT / RASTER_GATE_OPEN`.

## Q60 lifecycle and transport state

Fresh Drive readback:
- `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME `image/jpeg`
- bytes `155439`
- exact materialized SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

Different-method capability check:
- live Figma plugin runtime verified `atob` exists and `figma.createImage(Uint8Array)` exists.
- a rollback-safe Q60 target duplicate was created rather than touching Current or BO.
- this establishes a possible in-plugin chunk/reassembly path that does not depend on the previously failing external `mcp.figma.com` raw POST.
- the exact Q60 bytes were **not** fully transported/reassembled during this run, so no placement or visual-QA claim is made.

Strict state:
- generated this run: `NO`
- newly adopted generated image: `NO`
- Q60 Drive verified/materialized: `YES`
- Q60 Figma placed: `NO`
- Q60 Figma visual QA: `NO`
- BQ placed + whole/actual-size visual QA + structure QA: `YES`
- BR placed + visually reviewed: `YES`, rejected
- BS placed + whole/actual-size visual QA + structure QA: `YES`
- Current outer/inside changed: `NO`
- V5 gate complete: `NO`
- V6 production started: `NO`

## Reusable lessons

1. A Q&A page becomes more editorial when one factual answer is allowed to become a pull quote and the remaining questions become secondary reading, rather than giving every question equal module weight.
2. A decorative photograph that is visually stronger must still be rejected when its semantic destination role is wrong.
3. Bounding a low-resolution hero can reduce interpolation damage, but it does not substitute for the exact verified derivative; raster-quality and layout-quality gates remain separate.
4. An original native masthead can carry Japanese travel-magazine energy without reproducing a protected publication logo.
5. Print-native microtype/rules are useful only when they close dead space or anchor reading; they should not be added as filler decoration.

Next highest-value work:
1. finish the in-plugin chunk/reassembly bridge on safe BS/BR duplicate and place the exact Q60 bytes;
2. verify resulting Figma image hash/node ID and crop at whole/front/actual size;
3. compare BO vs BS with identical Q60 raster so the decision is about layout rather than source quality;
4. if Q60 passes, run V5 final print/fold/safe-area/semantic/provenance/rollback/ledger gate before any V6 production work.
