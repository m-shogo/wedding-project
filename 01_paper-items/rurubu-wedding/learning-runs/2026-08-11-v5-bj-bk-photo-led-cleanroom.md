# 2026-08-11 — V5 BJ/BK photo-led clean-room

Scope: Rurubu WEDDING only. No passport / boarding pass / 青春ふたりきっぷ / ADD item nodes were touched.

## Scratch-selection decision
BH / BI would not be selected from scratch as final direction. BH still depended on a low-quality temporary cover hero and a lower editorial strip; BI still used a header/stepper-like history region. A materially different safe duplicate was therefore required before more legacy polishing.

## BJ outer — `768:2`

Visible problem:
- BH front cover still read as hero + index rather than a strong travel-magazine cover.
- Existing temporary hero `539c259be8036b481d06b4f76db9a39b407d90e8` was visibly soft/pixelated when used large.

Principle tested:
- Replace the temporary hero with an already-verified destination photograph that exists in the file and can be referenced by its existing image hash.
- Use one dominant full-bleed destination image, native Japanese headline typography, one asymmetric cream editorial slash, and a single yellow secondary callout rather than multiple equal modules.
- Keep logo/date assets and native text editable.

Changes:
- Duplicated BH to rollback-safe clean-room candidate `768:2`.
- Front `768:131` now uses verified coast image node `768:166`, hash `adbb8e529451a81dd25e4eb29bf068655569ce25`, as dominant full-bleed photography.
- Temporary cover hero node `768:132` is hidden, not deleted.
- Removed the previous warm lower strip and teaser duplication from the active composition.
- Added non-rounded `BJ_EDITORIAL_PAPER_SLASH`, `BJ_FEATURE_03_YELLOW_NOTE`, and a short cyan editorial rule.
- Rebuilt cover hierarchy as masthead/date → huge `横浜 ふたり旅。` → photo → 01 dominant feature → 02 secondary → 03 yellow note.

Regression found and repaired:
- Fresh same-parent text intersection QA found feature 02 number/title and feature 03 number/title collisions. Both were repositioned, then re-run.

Final structural evidence:
- visible native text: `37`
- visible IMAGE fills: `6`
- same-parent text intersections: `0`
- fold guide: `792.7`, preserving two `793.7 × 1122.5` pages
- Current outer remains `77:18`; no promotion performed.

Visual evidence:
- Whole-item screenshot: BJ shows a materially different cover silhouette versus BH: full destination photography, larger headline-to-photo relationship, stronger asymmetry, fewer UI-like blocks.
- Reading/page screenshot: front `768:131` verified after intersection repair.
- Actual-size screenshot: native headline, feature copy and date/logo remain legible; no card/pill system introduced.

## BK inside — `768:181`

Visible problem:
- BI right page still began with a light header area and distributed milestone text that read too much like a web timeline before the photography started.

Principle tested:
- Start the history page with photography, then overlay the timeline as editorial annotations.
- Let the Memory Spots section overlap the history photo transition, using an asymmetric cream title strip and unequal photo collage.

Changes:
- Duplicated BI to rollback-safe `768:181`.
- Right `768:308` history image `768:331` was expanded to `793.7 × 492` at page top.
- History title moved onto a slightly rotated cream paper label; milestone years/text were staggered directly on the photograph rather than in a separate stepper/header field.
- Memory Spots title strip now overlaps the photo transition.
- Main Memory Spots photo is `536 × 278`; secondary photos use unequal `230 × 158` and `250 × 150` rotated crops.
- Existing profile-left page and verified image hashes were preserved.

Regression found and repaired:
- Fresh QA found `IA_HISTORY_HEADING` / `IA_HISTORY_SUB` overlap and `IA_MEMORY_2_BODY` / `IA_MEMORY_4_NO` overlap. Both were repaired and QA re-run.

Final structural evidence:
- visible native text: `53`
- visible IMAGE fills: `6`
- same-parent text intersections: `0`
- fold guide: `792.7`
- image hashes preserved: profile A `a39dd297eb9de572317a5ce57f0af12e8597b156`; profile B `2359f635b4926a83e22ca1f9214e75c709291152`; history `539c259be8036b481d06b4f76db9a39b407d90e8`; Memory 01 `adbb8e529451a81dd25e4eb29bf068655569ce25`; Memory 02 `439a719d73f28e8dd2889f2026cccb15f345ec63`; Memory 04 `c09aa82e7b2ac75708707345c6f845452bf67663`.
- Current inside remains `77:290`; no promotion performed.

## Q60 lifecycle truth
Drive raw readback was performed again for `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`:
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME: `image/jpeg`
- bytes: `155,439`
- runtime materialized file: yes

A fresh Figma single-use upload URL was requested for BJ hero `768:132`. The raw JPEG POST failed before upload because `mcp.figma.com` DNS could not resolve from this runtime. The failed upload caused no Figma mutation. Per the repeated-method rule, that transfer method was not retried again in this run; safe visual work continued using verified in-file image hashes.

State distinction:
- newly generated image: NO
- newly adopted generated image: NO
- Q60 Drive verified: YES
- Q60 Figma placed: NO
- Q60 Figma visually verified: NO
- BJ/BK layout placed: YES
- BJ/BK visually verified: YES
- BJ/BK structure QA: YES
- Current promoted: NO
- V5 complete: NO
- V6 started: NO

## Reusable lesson
1. When an external image-transfer path is blocked, a safe clean-room redesign can continue by reusing an already-proven in-file image hash, but this must not be represented as Q60 placement.
2. A travel-magazine page becomes more print-native when the timeline is treated as annotation on photography rather than a detached stepper/header.
3. Full-bleed photography alone is not sufficient: the hierarchy must also use unequal story scale and deliberate paper interruptions.
4. Always run visual and programmatic intersection QA after editorial recomposition; both BJ and BK exposed real collisions that thumbnail review alone could miss.

Status: `VERIFIED_FOR_COMPARATOR / BJ_OUTER_BEST_CANDIDATE / BK_INSIDE_BEST_CANDIDATE / CURRENT_NOT_PROMOTED / V5_GATE_STILL_OPEN`
