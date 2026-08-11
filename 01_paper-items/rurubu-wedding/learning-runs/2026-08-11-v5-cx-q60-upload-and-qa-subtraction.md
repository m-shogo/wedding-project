# Rurubu V5 — CX editorial Q&A subtraction + Q60 official-upload attempt

Date: 2026-08-11
Scope: Rurubu WEDDING only

## Authority reread
Before writes, re-read project authorities, live Figma Working state, the V5 comparator reconciliation, and the Drive Q60 master. True Current outer `77:18` / inside `77:290` remained untouched.

## Q60 exact-placement attempt
Drive master fresh readback:
- file: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME: `image/jpeg`
- bytes: `155439`
- expected dimensions: `1330×1220`
- expected SHA-256: `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

A rollback-safe CV duplicate was created as `V5_OUTER_CW_Q60_EXACT_2026_08_11` (`854:2`) with hero target `854:133`. The official Figma asset-upload action successfully issued a single-use submit URL for that exact node, but the runtime could not resolve `mcp.figma.com` when posting the local Q60 bytes. No image mutation occurred. The candidate was renamed `STUDY_CW_Q60_UPLOAD_DNS_BLOCKED_2026_08_11` and moved to the Studies page.

Strict status:
- Drive verified: YES
- runtime materialized: YES
- official upload target created: YES
- upload POST completed: NO
- exact Q60 Figma placed: NO
- exact Q60 Figma visual QA: NO

Do not count this transport attempt as image adoption or placement.

## Visible inside problem
CM was visually stronger than legacy V5 but its Q2/Q3 still read as equal form modules because both used full-width colored rules and small uniform number labels. At whole spread and actual size, Q1 had a magazine-like pull-quote hierarchy while Q2/Q3 still looked like UI form sections.

## Principle tested
Use subtraction and unequal typographic scale rather than adding containers:
- remove Q2/Q3 module rules;
- enlarge only their native question numbers;
- keep factual A/B text intact;
- compact Q2/Q3 into a marginal editorial column;
- retain Q1 as the dominant pull quote.

Expected improvement: the page reads as a profile feature article rather than a questionnaire form.
Regression risk: enlarged numbers could collide with titles or destroy common-point/footer spacing.

## CX candidate
Source: CM safe duplicate.
Candidate: `V5_INSIDE_CX_EDITORIAL_QA_SUBTRACTION_2026_08_11` — `854:187`.
Left page: `854:188`.
Right page: `854:317`.

Changes:
- Q2 cyan rule hidden.
- Q3 yellow rule hidden.
- Q2 number enlarged to 28 and moved to the left edge of its marginal column.
- Q3 number enlarged to 28 with the same editorial axis.
- Q2/Q3 titles and A/B answer text tightened beside their numbers.
- Q1 magenta rule shortened; Q1 remains the dominant question/pull quote.
- No cards, pills, shadows, gradients, image replacements, or baked text were added.

## Regression and repair
Programmatic structure QA found one sub-pixel intersection (`AUTH_COMMON_TAPE_TXT` vs `AUTH_COMMON_SUB`, ~0.70 px vertically). The common-point body was nudged 2 px and QA rerun.

## Final CX evidence
- candidate: `854:187`
- left page: `854:188`
- right page: `854:317`
- visible native text: `54`
- visible image fills: `9` including decorative image nodes; production photo-role hashes unchanged
- same-parent visible text intersections: `0`
- fold: `854:468`, x=`792.7000122070312`, y=`0`, `2×1122.5`
- whole-spread screenshot QA: PASS
- actual-size left-page screenshot QA: PASS
- structure QA: PASS
- native text: preserved
- crop/image hash integrity: preserved

Key photo hashes remained unchanged, including profile A `a39dd297eb9de572317a5ce57f0af12e8597b156`, profile B `2359f635b4926a83e22ca1f9214e75c709291152`, history `539c259be8036b481d06b4f76db9a39b407d90e8`, memory lead `adbb8e529451a81dd25e4eb29bf068655569ce25`, and the two supporting memory hashes.

## Adoption decision
- CX: ADOPT as strongest inside comparator over CM.
- CV outer: RETAIN as strongest outer comparator; asset-quality gate still fails on the 640×587 semantic proxy.
- CM: moved to `06_RURUBU_0811_STUDIES` as superseded study, node ID preserved.
- failed CW transport study: moved to Studies, node ID preserved.
- True Current: unchanged.
- newly generated image: NO
- newly adopted generated asset: NO
- exact Q60 placed: NO
- V5 complete: NO
- V6 production started: NO

## Next application
Keep Q2/Q3 as compact marginal editorial units rather than restoring equal rules/cards. The highest-value remaining V5 blocker is still exact high-quality cover-hero placement and crop QA; do not decorate around the low-quality proxy as a substitute for fixing the raster.