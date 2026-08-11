# 2026-08-11 — Rurubu WEDDING BU/BV/BW feedback

Scope: Rurubu WEDDING only. WEDDING PASSPORT / BOARDING PASS / 青春ふたりきっぷ / ADD items were not touched.

## Authority/readback used
- Live Figma page `01_RURUBU_WEDDING`.
- Current outer `77:18` and Current inside `77:290` re-read before recording and unchanged.
- Existing best clean-room structure: outer BS `787:2`, inside BQ `783:282`.
- Google Drive exact Q60 derivative re-read: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`, Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, MIME `image/jpeg`, `155439` bytes.
- Process authority re-read: `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`, `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`, `docs/decisions/2026-08-02-quality-over-legacy-design.md`, `CURRENT-STATUS.md`, and the preceding BQ/BS evidence.

## BU — pull-quote answer-prefix repair
- Visible problem: BQ promoted the factual Q1-B answer correctly, but the literal `B  ` answer marker became part of the 25 px pull quote and read like an accidental oversized form label.
- Principle/capability tested: preserve the factual answer while separating form syntax from editorial quotation; keep a tiny native `B` micro-label and let the sentence itself carry the large typography.
- Expected improvement: remove residual questionnaire/UI syntax while preserving editability and factual content.
- Regression risk: changing the answer text could lose semantic provenance or cause Japanese wrapping collisions.
- Live Figma: `790:2 / V5_INSIDE_RURUBU_CLEANROOM_BU_PULLQUOTE_PREFIX_REPAIR_2026_08_11`; left page `790:3`; repaired semantic answer `790:28`; micro-label `790:283`.
- Visual evidence: whole spread and actual-size left-page screenshots rechecked. The quote now reads `話しやすくて、一緒にいると / 自然に笑えました。` with the `B` reduced to microtype.
- Structure evidence: `54` visible native text nodes, `6` visible IMAGE fills, `0` same-parent visible text intersections, fold `790:282` at x `792.7`, height `1122.5`.
- Preserved image hashes: groom `a39dd297eb9de572317a5ce57f0af12e8597b156`; bride `2359f635b4926a83e22ca1f9214e75c709291152`; history `539c259be8036b481d06b4f76db9a39b407d90e8`; memory lead `adbb8e529451a81dd25e4eb29bf068655569ce25`; old town `439a719d73f28e8dd2889f2026cccb15f345ec63`; next destination `c09aa82e7b2ac75708707345c6f845452bf67663`.
- Decision: `ADOPTED_AS_BEST_INSIDE_STRUCTURE_CANDIDATE / NOT_CURRENT`.
- Next application: when a factual Q&A answer is promoted to display typography, separate `A/B` answer syntax into microtype rather than enlarging it with the quote.

## BV — redundant mid-photo copy subtraction
- Visible problem: BS front still stacked a second mid-photo headline (`寄り道メモ / 寄り道したくなる、横浜へ。`) between the dominant cover line and the feature cluster. At thumbnail scale it behaved like marketing landing-page copy rather than magazine cover-line rhythm.
- Principle tested: subtraction before addition; allow the destination photo and main cover line to own the middle of the page, then jump directly to the three unequal feature stories.
- Expected improvement: clearer focal hierarchy, less generic hero-copy stacking, stronger travel-magazine silhouette.
- Regression risk: removing too much copy could leave the bounded hero visually empty before the lower overlap.
- Live Figma: `790:284 / V5_OUTER_RURUBU_CLEANROOM_BV_MIDCOPY_SUBTRACTION_2026_08_11`; redundant native nodes were hidden only inside the safe duplicate.
- Visual evidence: whole-spread screenshot compared against BS. The reading order became `旅するWEDDING → 横浜 ふたり旅。 → 思い出スポット 大特集 → 01/02/03 stories` without the extra marketing-style interruption.
- Decision: `ADOPTED_AS_DIRECTIONAL_IMPROVEMENT / PRESERVED_FOR_COMPARISON / NOT_CURRENT`.
- Next application: do not fill every photographic pause with another headline; cover-line hierarchy benefits when some information is deliberately subordinated or removed.

## BW — feature-01 paper compression
- Visible problem: after BV subtraction, feature 01 still sat on a comparatively large cream paper field, leaving a card-like blank area below the photo boundary.
- Principle tested: compress the pasted-paper field while preserving the dominant `01` scale and unequal 02/03 photo stories.
- Expected improvement: less UI-card geometry and a tighter print-collage relationship at the photo/paper boundary.
- Regression risk: over-compression could make the 01 story cramped or collide with the angled support-photo cluster.
- Live Figma: `790:467 / V5_OUTER_RURUBU_CLEANROOM_BW_FEATURE01_PAPER_COMPRESSION_2026_08_11`; front `790:596`; hero `790:598` remains `793.7 × 820` with hash `539c259be8036b481d06b4f76db9a39b407d90e8`.
- Visual evidence: whole spread plus actual-size front screenshot reviewed. The 01 paper is more compact, while 02/03 retain strong diagonal overlap. Actual-size review also reconfirmed that the old hero raster is visibly pixelated; this layout experiment does not close the photo-quality gate.
- Structure evidence: `37` visible native text nodes, `7` visible IMAGE fills, `0` same-parent visible text intersections, fold at x `792.7`, height `1122.5`.
- Decision: `ADOPTED_AS_BEST_OUTER_STRUCTURE_CANDIDATE_PENDING_Q60 / NOT_CURRENT / RASTER_GATE_OPEN`.
- Next application: stop further outer micro-polish until the exact Q60 raster is actually placed; otherwise layout judgment is increasingly confounded by the rejected old hero source.

## Q60 bridge state
- Drive readback: `YES`, exact ID and byte size above.
- Local materialization available in this runtime: `YES`.
- Existing external raw POST path: not retried.
- Safe Figma staging duplicate created: `789:2 / V5_OUTER_RURUBU_CLEANROOM_BT_EXACT_Q60_BRIDGE_2026_08_11`, hero target `789:133`.
- Fresh plugin-runtime capability check: `figma.createImage`, `figma.createImageAsync`, `figma.base64Decode`, and `atob` are available; global `fetch` is not.
- Exact Q60 bytes fully transported/reassembled/placed: `NO`.
- Exact Q60 Figma visual QA: `NO`.

## Strict progress state
- New image generated this run: `NO`.
- New generated image adopted: `NO`.
- New generated image placed: `NO`.
- BU placed + whole/detail visual QA + structure QA: `YES`.
- BV placed + whole visual QA: `YES`.
- BW placed + whole/detail visual QA + structure QA: `YES`.
- Current outer/inside changed: `NO`.
- V5 gate complete: `NO`.
- V6 production started: `NO`.

Status: `BU_INSIDE_BEST_STRUCTURE / BW_OUTER_BEST_STRUCTURE_PENDING_Q60 / CURRENT_UNCHANGED / V5_RASTER_GATE_OPEN / V6_NOT_STARTED`.
