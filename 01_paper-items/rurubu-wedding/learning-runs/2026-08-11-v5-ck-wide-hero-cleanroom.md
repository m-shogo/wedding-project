# V5 CK wide-hero clean-room comparison

Date: 2026-08-11
Scope: Rurubu WEDDING only
Authority: live Figma + verified Drive Q60 + GitHub main

## Pre-write truth

- Current outer `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE` was re-read and left untouched.
- Current inside `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE` was left untouched.
- Previous strongest comparators were outer CE `801:284` and inside CC `801:2`.
- V5 remains `PHOTO_ROLE_PASS 9/10`, dominant-photo gate `2/3`; exact cover role V5-01 remains open.
- V6 production remains closed.

## Visible problem

CE improved feature hierarchy, but its front hero used verified image hash `539c259be8036b481d06b4f76db9a39b407d90e8` inside a `793.7 × 700` box. That image comes from the accepted V5 history derivative (`1356 × 560`), so the tall FILL geometry both crops aggressively and scales the source height beyond its native derivative. At actual-size review the upper cover therefore remained visibly soft even though the underlying image is otherwise usable.

The lower CE feature zone also still behaved as a large ivory field with two comparatively small supporting photos. Further decorative badges/cards would have treated the symptom rather than the hierarchy.

## Principle tested

1. Treat placed geometry as part of raster QA: if a verified image is made soft primarily by an unsuitable box, first test a box that respects the source aspect instead of adding decoration or pretending the raster passed.
2. Rebuild density using unequal photography and typography rather than containers.
3. Preserve a clear `01 >> 02/03` feature hierarchy while letting the secondary photos invade the editorial field.
4. Keep this as composition evidence only when the reused source does not match the final semantic photo-role provenance.

## Safe clean-room progression

All work occurred in rollback-safe duplicates. Current remained untouched.

- CF `803:2` — Q60-safe staging duplicate from CE.
- CG `809:2` — hero changed to a wide `793.7 × 345` placement using the already verified waterfront hash; 02/03 rebuilt lower on the page.
- CH `810:2` — supporting photographs enlarged to reduce the remaining empty field.
- CI `811:2` — lower 03 destination photo expanded toward full width.
- CJ `812:2` — 03 pulled upward to create stronger photo/text overlap; actual-size QA exposed readability pressure around feature 01.
- CK `813:2` — repaired 01/02/03 readability while preserving the denser photo-led composition.

Rejected intermediate states remain preserved as comparison/rollback evidence.

## CK accepted comparator evidence

Frame:
- `813:2 / V5_OUTER_RURUBU_CLEANROOM_CK_READABILITY_REPAIR_2026_08_11`
- front page `813:131 / FRONT_COVER_CK_READABILITY_REPAIR`

Hero comparator:
- node `813:133 / CG_HERO_YOKOHAMA_WIDE_VERIFIED_Q18`
- geometry `793.7 × 345`
- image hash `539c259be8036b481d06b4f76db9a39b407d90e8`
- this is an already verified history derivative reused for layout comparison, not V5-01 cover-role completion

Supporting photographs:
- `813:153 / BM_TEASER_PHOTO_02` — hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`, `368 × 252`
- `813:167 / BM_TEASER_PHOTO_03` — hash `439a719d73f28e8dd2889f2026cccb15f345ec63`, `698 × 386`

Final structure QA:
- visible native text: `37`
- visible IMAGE-fill nodes: `7`
- same-parent text intersections: `0`
- fold guide `813:184`, x `792.7000122070312`, `2 × 1122.5`, visible
- back-main/friends/date/support image hashes preserved
- Current outer `77:18` remained present with its semantic name intact

Screenshot QA:
- whole-item / thumbnail: CK has a clearer travel-magazine silhouette than CE because the top photograph is a panoramic editorial anchor and the lower 03 photo supplies a second strong visual mass instead of a large empty card-like field.
- reading/page: `01` remains the primary feature; 02 is a tilted secondary story; 03 becomes the largest supporting destination story. The path is intentionally asymmetric but readable.
- actual-size: the wide hero is materially sharper than the same source stretched into CE's 700px-tall box. Feature-01 descriptor was separated after a 2px structural intersection was detected; final intersection count is zero.

Status: **ADOPT CK AS STRONGEST OUTER COMPARATOR, NOT CURRENT.**

CC `801:2` remains the strongest inside comparator in this run.

## Exact Q60 gate — still open

Verified Drive derivative:
- `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- JPEG
- `1330 × 1220`
- `155,439 bytes`
- SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

Fresh transport findings:

1. A safe CF hero target `803:133` was prepared.
2. Direct Drive URL ingestion through `figma.createImageAsync()` failed atomically because this runtime does not support that API. No canvas mutation occurred.
3. A long manually transcribed base64 staging attempt failed its encoded-length guard before mutation. This confirms that manual large-payload transcription remains unsafe.
4. The proven document-root namespace `rurubu_v5_binary` was inspected. It contains only partial historic Q60 chunks (`hero_q60_s00`, `hero_q60_s01`, `hero_q60_0`, `q60_0`), not enough verified bytes to reconstruct the exact 155,439-byte derivative.
5. The live Figma page was searched for existing Q60/hero fills. No image hash corresponding to a proven exact Q60 placement was found.

Therefore:
- Q60 Drive verified: YES
- Q60 exact Figma placement: NO
- Q60 screenshot/crop QA: NO
- V5-01 PHOTO_ROLE_PASS: NO
- V5 completion: NO
- V6 production start: NO

No completion count was advanced.

## Generated / adopted / placed distinction

- newly generated images: `0`
- newly accepted generated masters: `0`
- newly imported external image binaries: `0`
- existing verified Figma image reused in new geometry: YES (`539c259...`, comparator only)
- CK layout placed: YES
- CK whole/page/actual-size visual QA: YES
- CK structure QA: YES
- exact Q60 placed/verified: NO

## Regression risk and next application

CK demonstrates a stronger composition, but the waterfront hash belongs to the history role and cannot satisfy the cover role's provenance/evidence chain. Do not promote CK to Current merely because it looks sharper.

Next safe high-value step:
- reconstruct exact Q60 from machine-sourced bytes using deterministic small guarded chunks, not a hand-pasted long string;
- apply exact Q60 first to a rollback-safe CK-derived target;
- compare exact-Q60 CK-style wide composition against a taller cover treatment at whole-item, reading, and actual-size scales;
- only after Drive ID → exact node → image hash → screenshot → structure evidence agrees may V5-01 advance.
