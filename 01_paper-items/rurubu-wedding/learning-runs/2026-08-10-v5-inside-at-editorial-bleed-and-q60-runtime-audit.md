# 2026-08-10 — V5 inside AT editorial bleed + Q60 runtime audit

## Scope
Rurubu WEDDING only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not touched.

## Authorities re-read before writes
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- project-wide wedding asset-generation memory
- latest GitHub main and the AR/AS learning run
- prior proven `2026-08-08-v5-history-q18-binary-safe-promotion.md` binary-transfer lesson
- live Figma page `01_RURUBU_WEDDING`
- Current outer `77:18`, Current inside `77:290`
- strongest outer comparator `715:2 / AP`
- strongest inside comparator `721:2 / AS`
- Google Drive Q60 cover derivative readback

GitHub main before this run: `51b45e2ab63da64fe68c32d310f90a254e4ef7c1`.

## Q60 cover authority / blocker audit
Fresh Drive raw readback again verified:
- filename `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME `image/jpeg`
- bytes `155,439`
- dimensions `1330 × 1220`
- recorded SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

The raw file was materialized again and visually inspected. It remains the correct high-quality Yokohama waterfront source and is visibly superior to the blocky temporary cover imagery.

Two transport capabilities were re-evaluated without touching Current:
1. a fresh first-class Figma asset upload URL for rollback-safe AP hero `715:130` again reached the same environment-side `mcp.figma.com` DNS blocker before bytes could be sent;
2. an in-plugin network fetch experiment failed atomically because this Figma Plugin runtime does not expose global `fetch`.

No AP or Current image hash changed. These transport attempts are not counted as visual progress. The already-proven deterministic shared-plugin-data chunk reconstruction remains the fallback pattern, but a partially staged scratch chunk was not used to create an image because its length guard did not match the intended binary payload. Integrity was preferred over closing a checklist count.

Status remains: Q60 selected + Drive verified + locally visually verified, **not Figma placed**.

## Visible problem selected for safe visual work
With the outer hero transport still externally blocked, the highest-value safe target was the inside clean-room comparator AS.

AS was already stronger than Current, but its right page still contained two visual traits that read too much like an orderly information UI rather than Japanese travel editorial:
- a perfectly straight history timeline baseline;
- a lower Memory Spots composition whose supporting images were asymmetrical but not yet forceful enough at thumbnail scale.

The history photograph also had room to carry more of the page as a genuine editorial image field.

## Principle / capability tested
Create a rollback-safe duplicate and push the right page further toward print editorial grammar through subtraction and scale contrast:
- remove the rigid timeline baseline while retaining dated milestone dots and native text;
- enlarge the history photograph toward page edges;
- keep the history caption as a compact image-overlap tab;
- enlarge the lead Memory Spots image;
- make the two support photos unequal, slightly rotated, white-bordered print fragments;
- remove obsolete route connector remnants;
- preserve native Japanese text, verified image hashes, semantic nodes, fold guide and Current rollback state.

Expected improvement: stronger photo hierarchy and a less diagram/grid-like page at whole-item and thumbnail scales.

Regression risk: rotated support photos could become scrapbook noise; captions could collide with images; removing the timeline line could make chronology ambiguous; larger imagery could crowd the lower-page folio.

## AT implementation
Created rollback-safe duplicate:
- `730:2 / V5_INSIDE_RURUBU_CLEANROOM_AT_EDITORIAL_BLEED_2026_08_10`
- right page `730:126`

Key changes:
- history baseline `IA_HISTORY_LINE` hidden while all milestone dots/year/event native text remain visible;
- history photo `730:149 / IA_HISTORY_MEMORY_PHOTO` enlarged to `738 × 326` with a crisp 5 px white print border;
- history caption reduced to a compact navy overlap tab;
- Memory lead `730:157 / IA_MEMORY_1_PHOTO` enlarged to `530 × 298`, rotation about `-1.1°`, white border;
- support old-town `730:165` enlarged to `218 × 146`, rotation about `+2.2°`, white border;
- support next-destination `730:181` enlarged to `236 × 136`, rotation about `-2.0°`, white border;
- obsolete visible route trunk/branch connectors removed after screenshot review;
- 01 story title promoted to 25 px; 02/03 support labels remain native text and secondary in scale.

No new cards, pills, gradients, generic shadows or generated filler assets were added.

## Screenshot-driven correction
The first actual-size right-page review exposed two real native-text collisions:
- `IA_MEMORY_2_BODY` intersected the visible 03 number by 32 × 18 px;
- `IA_MEMORY_4_CITY` touched `IA_MEMORY_4_BODY` by 2 px.

The 02 body width/position, 03 badge placement and 03 micro-label/body spacing were corrected. A fresh structure audit then reported zero same-parent visible text intersections.

The actual-size screenshot also exposed obsolete route connector marks crossing the collage. Those were hidden rather than decorated around.

## Three-scale result
### Whole-item / thumbnail
`PASS_AS_COMPARATOR`.
At 500 px whole-spread scale, the right page now preserves a clearer hierarchy: history image field → Memory Spots heading → one dominant coast image → two unequal support fragments. The previous UI-like timeline baseline no longer dominates.

### Reading / page scale
`PASS_AS_COMPARATOR`.
The full right-page screenshot keeps chronology legible through the milestone dots/years while giving the photographs more editorial weight. Support photos overlap without becoming an equal grid.

### Actual-size / detail
`PASS_AS_COMPARATOR` after correction.
Captions and support story copy remain readable, the detected collisions were removed, and the page folio remains clear.

## Fresh structure evidence
Final AT readback:
- visible native text: `54`
- visible IMAGE-fill nodes: `6`
- same-parent visible native-text intersections: `0`
- fold guide: `730:274 / PROVISIONAL_FOLD_GUIDE / 2 × 1122.5`

Verified image hashes preserved:
- profile A `730:8` → `a39dd297eb9de572317a5ce57f0af12e8597b156`
- profile B `730:14` → `2359f635b4926a83e22ca1f9214e75c709291152`
- history `730:149` → `539c259be8036b481d06b4f76db9a39b407d90e8`
- memory lead `730:157` → `adbb8e529451a81dd25e4eb29bf068655569ce25`
- memory 02 `730:165` → `439a719d73f28e8dd2889f2026cccb15f345ec63`
- visible memory 03 `730:181` → `c09aa82e7b2ac75708707345c6f845452bf67663`

Current outer `77:18` and Current inside `77:290` were not changed.

## Decision
- outer strongest comparator: `AP / 715:2` retained; cover photo gate still blocked by Q60 placement
- inside: `AT / 730:2` **adopted as the strongest inside comparator of this run**, superseding AS for further clean-room comparison
- Current promotion: `NO`
- V5 complete: `NO`
- V6 production start: `NO`

AT is a visual comparator, not a declaration that V5 is complete. The cover hero remains the only active photo-role blocker and the last dominant-photo blocker.

## Reusable learning
1. A timeline can remain understandable without a continuous baseline when dates, dots and event labels already create a strong sequence; removing the line reduces diagram/UI reading.
2. Travel-magazine collage energy comes from one unmistakable lead image plus unequal support fragments, not simply rotating every image.
3. White photo borders are useful here only as thin print separation against the pale-blue page; they must not turn into card containers.
4. Actual-size screenshot and structure QA remain mandatory after overlap changes; the first AT pass looked plausible at whole-spread scale but contained two measurable text collisions.
5. A transport endpoint or staged binary chunk is not progress until exact byte guards, Figma placement, hash readback and screenshot QA all pass.

## Next application
1. Do not retry the unchanged DNS-blocked upload or unavailable in-plugin fetch path.
2. If Q60 binary reconstruction is resumed, clear scratch shared-data keys first and use deterministic exact-length chunks with joined-length, decoded-byte-length, JPEG SOI/EOI guards on a duplicate hero before any Current mutation.
3. Continue comparing AT vs AS/Current at three scales; only promote if it still wins after final weakest-three/fold/readability review.
4. Keep V6 production gated until the cover-specific Q60 is genuinely placed and V5 dummy-design QA is fully verified.

Status: `AT_INSIDE_BEST_THIS_RUN / AP_OUTER_RETAINED / Q60_DRIVE_VERIFIED_NOT_FIGMA_PLACED / CURRENT_UNCHANGED / V5_GATE_OPEN / V6_NOT_STARTED`.
