# 2026-08-10 — V5 AR rejection + AS memory collage + Q60 upload audit

## Scope
Rurubu WEDDING only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not touched.

## Authorities re-read before writes
- project paper-items entry point and global Figma quality standard
- live Figma page `01_RURUBU_WEDDING`
- Current outer `77:18`
- Current inside `77:290`
- prior best outer `715:2 / AP`
- prior best inside `716:2 / AQ`
- `CURRENT-STATUS.md`
- latest AP/AQ learning run
- Rurubu editorial lessons, including the prior guarded binary-transfer lesson
- Google Drive Q60 master readback
- GitHub main at start: `7f05ef6a80b9cb7bc40c4f148778ec3d600583fc`

## Q60 authority / fresh Drive evidence
Fresh raw Drive readback produced a real runtime file reference for:
- `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME `image/jpeg`
- bytes `155,439`
- dimensions `1330 × 1220`
- SHA-256 reverified locally: `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

The master was visually inspected again and remains the correct higher-quality Yokohama waterfront source. It is selected and Drive-verified, but is still **not placed in Figma**.

### New transport method tested
The newer first-class `Figma.upload_assets` path was tested only against rollback-safe duplicate hero `719:130`. The tool issued a valid single-use submit endpoint, but the execution environment could not resolve `mcp.figma.com` before any bytes were sent. No Figma image hash changed and the transport attempt is not counted as visual progress.

The existing named Q60 staging node `538:132` was separately audited. Its live IMAGE hash is still `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`, i.e. the old Current hero, so it cannot be reused as a hidden Q60 source.

The exact Q60 bytes can be locally base64-encoded with the expected total length, but this runtime does not expose a reliable large-binary boundary from the local file into `use_figma` without manually model-transcribing a 155 KB JPEG. That would violate the integrity-first rule established by the successful history-photo transfer. The route was therefore stopped rather than risking silent corruption or falsely claiming placement.

## Outer AR — full-bleed coverline experiment
Created rollback-safe duplicate:
- `719:2 / V5_OUTER_RURUBU_CLEANROOM_AR_Q60_NATIVE_STAGING_2026_08_10`
- hero target `719:130 / AR_Q60_HERO_STAGING`

### Visible problem
AP is stronger than Current but its lower feature field can still read as a highly designed navigation area rather than a genuinely integrated travel-magazine cover.

### Principle tested
Remove the separate lower field and push toward a single full-bleed photographic cover with direct coverlines, unequal feature hierarchy and overlapping travel-photo teasers.

### Expected improvement
A less panel-like, more continuous newsstand-cover silhouette.

### Regression risk
The photograph can become too busy for direct coverlines; support photography and feature text can compete rather than form one hierarchy.

### Result
**REJECTED.** Whole-item screenshot review showed the lower coverlines losing contrast against the waterfront and the two teaser photographs making the lower half busier without enough editorial control. AP remains the stronger outer comparator. AR remains preserved for comparison; Current was not changed.

## Inside AS — asymmetric Memory Spots collage
Created rollback-safe duplicate:
- `721:2 / V5_INSIDE_RURUBU_CLEANROOM_AS_MEMORY_COLLAGE_2026_08_10`
- right page `721:126 / INSIDE_RIGHT_AS_EDITORIAL_COLLAGE`

### Visible problem
AQ's Memory Spots section was readable but the large lead photo plus two small right-side photos still felt too close to a tidy module/grid. At thumbnail scale, the three photos did not create enough editorial tension.

### Principle tested
Keep the verified image sources and factual/native text, but change only hierarchy and crop geometry: one large lead destination photograph, two unequal overlapping support photographs, fewer branch/grid decorations, and direct article-style captions.

### Expected improvement
More unmistakable Japanese travel-magazine rhythm without adding cards, gradients, shadows or generated filler.

### Changes
- promoted `IA_MEMORY_1_PHOTO` to `500 × 282` with a slight editorial rotation
- enlarged/repositioned `IA_MEMORY_2_PHOTO` and `IA_MEMORY_4_PHOTO` as overlapping support stories
- promoted `思い出スポット` heading and retained one magenta editorial rule
- removed/hid obsolete branch dots and rigid support rules that reinforced a diagram/grid reading
- kept native article numbers/titles/body copy
- kept all verified image hashes; no new imagery was introduced

### Screenshot-driven correction
The first actual-size review exposed a genuine defect that was not obvious at thumbnail scale: support story 02 body text and the 03 photograph competed in the same vertical zone. The support photographs and captions were re-spaced while preserving overlap. A later fresh structure audit also exposed a `4.5 px` same-parent intersection between the existing `ふたりの共通点` kicker and promoted pull quote on the left page. The pull quote was moved down before re-running QA.

### Three-scale result
- whole spread: AS reads more like a photo-led travel editorial page and less like an equal module grid than AQ
- thumbnail: lead coast photograph remains dominant while 02/03 survive as visible supporting stories
- actual-size/detail: support captions remain readable after re-spacing; no detected same-parent native-text intersections remain

### Fresh structure evidence
- visible native text: `54`
- visible IMAGE-fill nodes: `6`
- same-parent native-text intersections: `0`
- fold guide: `721:274 / 2 × 1122.5`
- profile A hash `a39dd297eb9de572317a5ce57f0af12e8597b156`
- profile B hash `2359f635b4926a83e22ca1f9214e75c709291152`
- history hash `539c259be8036b481d06b4f76db9a39b407d90e8`
- memory lead hash `adbb8e529451a81dd25e4eb29bf068655569ce25`
- memory 02 hash `439a719d73f28e8dd2889f2026cccb15f345ec63`
- visible memory 03 hash `c09aa82e7b2ac75708707345c6f845452bf67663`

Status: **AS adopted as strongest inside clean-room comparator of this run. Current is not promoted.**

## Current / gate truth after the run
- Current outer `77:18` unchanged
- Current inside `77:290` unchanged
- AP remains strongest outer comparator; AR rejected
- AS is strongest inside comparator of this run
- Q60 master is generated/selected/Drive-verified and locally visually verified, but **not Figma placed and not Figma visually verified**
- V5 photo-role gate remains `9/10 active`
- dominant-photo gate remains `2/3`
- V5 completion is not claimed
- V6 production remains gated and was not started

## Reusable learning
1. Full-bleed cover photography is not automatically more magazine-authentic: if coverlines and support photography lose a controlled reading order, a single purposeful print field can be stronger.
2. A photo-led article section gains editorial energy when support photographs overlap a dominant lead image but captions remain outside the lead-image reading field at actual size.
3. Thumbnail comparison is necessary but insufficient; AS looked acceptable early, while actual-size QA found a real text/photo crowding defect.
4. Structure QA remains useful after visual QA because promoted native Japanese text can create small intersections not obvious at spread scale.
5. A named staging frame is not source evidence. Existing `538:132` was correctly rejected as Q60 reuse after hash audit proved it still carried the old hero.
6. For a dominant 155 KB JPEG, do not substitute model-visible hand transcription for a binary-safe bridge merely to close a checklist count.

Status: `AP_OUTER_RETAINED / AR_REJECTED / AS_INSIDE_BEST_THIS_RUN / CURRENT_UNCHANGED / Q60_DRIVE_VERIFIED_NOT_FIGMA_PLACED / V5_GATE_OPEN / V6_NOT_STARTED`
