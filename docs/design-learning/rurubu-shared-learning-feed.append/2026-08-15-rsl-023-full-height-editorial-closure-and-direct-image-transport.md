# RSL-023 — Full-height editorial closure + direct Plugin API raster transport

Date: 2026-08-15
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE` for the editorial-closure principle; `VERIFIED_LOCAL` for JPEG direct transport capability.
Source scope: Rurubu WEDDING only.
GitHub authority before this write: `17c2de202d0cf05ca34dbe771869023bc1cc4e3c`.

## OBSERVED

Two Rurubu V6 inside defects remained after earlier clean-room work:

1. V6 N's chronology had irregular photo sizing but still clustered most visual weight in the upper/middle page, leaving the lower quarter editorially dead.
2. V6 L's profile/Q&A spread remained sparse and wireframe-like. Q&A occupied large empty rows while the memories photography was too small to close the page.
3. Generated section masters already existed in Drive, but the known `FIGMA_MCP_UPLOAD_DNS_UNRESOLVED` fingerprint made repeated `upload_assets` retries invalid under RSL-005.

## ROOT_CAUSE_HYPOTHESIS

- A chronology page can still feel templated even after breaking a uniform grid if all milestones have similar closure weight. A high-value final milestone should sometimes become a dominant closing image so reading rhythm reaches the page bottom.
- Sparse profile/Q&A pages do not automatically need more cards or ornaments. Tighter semantic rhythm plus stronger supporting photography can create editorial density while preserving native text and image replaceability.
- Figma binary transport is not synonymous with `upload_assets`. If source bytes can be materialized from Drive, supported raster bytes may be inserted with `figma.createImage(Uint8Array)` and used as an IMAGE fill.

## TESTED_LOCAL

### A. Chronology O

Source: `1315:2 / V6 N`
Candidate: `1318:2 / V6_INSIDE_O_FULL_HEIGHT_EDITORIAL_CHRONOLOGY_2026_08_15`

Bounded change:
- preserve all native event copy;
- preserve all six replaceable event image roles;
- redistribute image sizes/positions across the full page;
- make the final `WEDDING` milestone a wide closing image rather than adding a decorative footer.

Expected improvement: eliminate the dead lower quarter and give the chronology a real editorial ending.
Regression risk: later events could become cramped or safe-area/text collisions could appear.

### B. Profile/Q&A P

Source: `1283:42 / V6 L`
Candidate: `1318:43 / V6_INSIDE_P_DENSE_PROFILE_QA_MEMORIES_2026_08_15`

Bounded change:
- enlarge the dominant profile photo;
- tighten profile facts;
- compress six Q&A groups vertically without rasterizing copy;
- enlarge two memories photos substantially;
- add no new UI-like cards, shadows, or decorative micro-geometry.

Expected improvement: make the spread read as a magazine inside rather than a sparse wireframe.
Regression risk: native text boxes could collide after compaction.

### C. Direct generated-profile transport Q

Source: Drive profile master `1MfLObNcvsWhQ8nQqgZHeFiDBdjPzj1w8`.
Study candidate: `1320:2`.

Method switch:
- materialize Drive/source raster bytes;
- create a bounded study derivative;
- decode bytes inside `use_figma`;
- call `figma.createImage(Uint8Array)`;
- place the resulting hash as an IMAGE fill behind native Figma content.

A WebP derivative failed with `FIGMA_CREATEIMAGE_WEBP_UNSUPPORTED`.
A corrected JPEG derivative succeeded and produced image hash `7c93168e6262004013942224016fce7a71f72a16` without using the failing MCP submit URL.

## VERIFIED_LOCAL EVIDENCE

### O
- whole spread thumbnail: PASS;
- reading scale: PASS;
- actual-size right page 794×1123: PASS;
- native text: 28;
- IMAGE fills: 9;
- 18px safe-area risks: 0;
- text collision pairs after structural repair: 0.

The final WEDDING image now closes the page visually instead of leaving a large dead lower field.

### P
- whole spread 1400×990: PASS;
- Q&A actual-size 794×1123: PASS;
- native text: 40;
- IMAGE fills: 4;
- 18px safe-area risks: 0;
- text collision pairs after structural repair: 0.

The memories field now carries real visual weight; the six Q&A groups remain native and readable.

### Q transport study

Transport: PASS.
Visual adoption: REJECTED.

The low-resolution study derivative became visibly soft when enlarged, and its generated blank-frame geometry did not align tightly enough with the existing native photo/text roles. The study was renamed `REJECTED_VISUAL...` and hidden. Transport success was not counted as visual progress.

## FAILURE FINGERPRINTS

- existing: `FIGMA_MCP_UPLOAD_DNS_UNRESOLVED` — do not retry unchanged `upload_assets` route;
- new: `FIGMA_CREATEIMAGE_WEBP_UNSUPPORTED` — `figma.createImage` rejected this WebP derivative in the current environment;
- replacement method: supported JPEG/PNG bytes via `figma.createImage(Uint8Array)`;
- stop condition: do not promote a directly transported generated section asset until derivative resolution and its blank-role geometry match the actual native text/image contract.

## CROSS_ITEM_CANDIDATE

Potentially transferable principle:

> When a chronology or narrative page still dies before the bottom, first test whether the final/high-value milestone can become a dominant editorial closing image before adding decorative filler.

Potentially transferable capability:

> When one binary transport route repeatedly fails, source bytes can be inserted through a different supported Figma API path, but transport and visual adoption must remain separate states.

## MUST REMAIN RURUBU-SPECIFIC

Do not transfer:
- the exact six-milestone chronology geometry;
- Rurubu photo sizes/rotations;
- the Hawaii/travel palette or generated tropical scrapbook art;
- exact Q&A positions or Japanese headline treatment;
- any current Rurubu production-state conclusion.

## NEXT RURUBU APPLICATION

Use the direct Plugin API raster route only with a role-sized, sufficiently high-resolution generated section derivative, then reconstruct the native replaceable photo/text roles to match that generated section visual rather than simply placing decoration beneath unrelated legacy geometry.
