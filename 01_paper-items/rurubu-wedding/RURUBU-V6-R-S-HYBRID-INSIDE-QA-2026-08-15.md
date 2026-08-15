# RURUBU V6 — R/S Hybrid Inside QA

Date: 2026-08-15
Scope: Rurubu WEDDING only
GitHub main observed before write: `f145eb7967d1c2f061b1ab97e3c307bc789c2dab`
State: `V6_INSIDE_R/S_VERIFIED_LOCAL_STUDIES / NOT_PRINT_READY`

## Why this run changed direction

V6 O/P were structurally safe but still too sparse/template-like for the intended Japanese travel-information magazine reading. The run did not advance V7. It tested two bounded V6 inside redesigns while preserving native copy, replaceable image roles, fold/safe-area discipline, and rollback history.

## R — generated-profile hybrid

Figma root: `1327:2 / V6_INSIDE_R_GENERATED_PROFILE_HYBRID_2026_08_15`

Source: P `1318:43`.

The prior generated profile transport proof Q had been rejected because the low-resolution derivative was enlarged across almost the whole page. R reuses the already-existing Figma image hash `7c93168e6262004013942224016fce7a71f72a16` at a bounded 440×550 role instead of retransferring or enlarging it as a page background.

- generated fixed decoration: `1327:50 / DECOR / GENERATED_PROFILE_MODULE_REUSED_HASH`
- Drive master authority: `1MfLObNcvsWhQ8nQqgZHeFiDBdjPzj1w8 / RURUBU_V6_SECTION_PROFILE_GENERATED_V1_2026-08-15.png`
- main replaceable profile photo: `1327:7`
- secondary replaceable profile photo: `1327:8`
- profile facts remain native text: `1327:9`–`1327:21`
- Q&A remains native text on right page: `1327:28`–`1327:45`
- memories photos remain replaceable: `1327:46 / 1327:47`

Visual result:
- whole spread 1200px: PASS as a study; materially denser and more magazine-like than P;
- thumbnail 500px: PASS; profile collage reads as a deliberate secondary visual system rather than empty form fields;
- actual-size profile page 794×1123: PASS for composition/readability, but generated decor is still softer than final print authority;
- actual-size Q&A page 794×1123: PASS; six questions remain crisp/native and the lower half is photo-led.

Structure:
- profile page: 18 visible native texts, 3 IMAGE roles, outside bounds 0, fold/safe-area risks 0;
- Q&A page: 22 visible native texts, 2 IMAGE roles, outside bounds 0, fold/safe-area risks 0;
- native profile text intentionally overlays the generated text-support artwork; this is the intended hybrid-authoring contract, not a collision defect.

Decision: `VERIFIED_LOCAL_STUDY`, not final print-ready. Do not promote the generated profile derivative to final asset authority until a higher-fidelity role-sized transport/readback is available.

## S — photo-route chronology

Figma root: `1328:2 / V6_INSIDE_S_PHOTO_ROUTE_TIMELINE_2026_08_15`

Source: O `1318:2`.

A previously generated timeline composition hash `702fe2639cb39189a04d5db1f57bda8d2f054305` was tested as fixed decoration but failed to produce useful visible binding in the live composition. It was hidden rather than retained merely because it was generated.

The adopted study method instead uses:
- one large replaceable feature photo + two support photos at the top: `1328:44`–`1328:46`;
- one functional route rail `1329:2` and six small semantic nodes `1329:3`–`1329:8`;
- six existing replaceable event photos `1328:18 / 22 / 26 / 30 / 34 / 38` with deliberately varied size/vertical rhythm;
- all six dates/titles/copy remain native text `1328:19`–`1328:41`.

Visual result:
- whole spread 1200px: PASS as a study;
- 500px thumbnail: PASS; the chronology reads as `feature story → route → six milestones` rather than a 2×3 card grid;
- actual-size chronology page 794×1123: PASS after vertical compaction;
- empty luxury whitespace between feature imagery and chronology was reduced by moving the route/event group upward.

Structure after repair:
- chronology page: 21 visible native texts, 9 IMAGE roles;
- outside bounds 0;
- 18px safe-area risks 0;
- text/text collision 0;
- text/image collision 0 after narrowing EVENT 5 native text boxes.

Decision: `VERIFIED_LOCAL_STUDY`. Generated timeline decoration is `REJECTED_VISUAL/HIDDEN`; the simple rail was retained only because it performs a clear chronological binding function.

## Transport failures this run

Two new inline `figma.createImage(Uint8Array)` attempts (PNG-derived payload then JPEG-derived payload) returned `Image type is unsupported`. No mutation occurred on either failed invocation. Per the repeated-fingerprint rule, the run stopped retrying that path and reused already-materialized Figma image hashes instead.

Do not reinterpret this as a global statement that PNG/JPEG are unsupported: a prior JPEG direct-image transport already succeeded in this same environment. The current fingerprint is `INLINE_CREATEIMAGE_PAYLOAD_UNSUPPORTED_OR_UNRELIABLE`; next retry requires a materially different byte/materialization contract.

## Current navigation state

`00_RURUBU_START_HERE / INDEX_STATUS` now reads:

`V5 FU/FX · V6 M + R/S INSIDE STUDIES · V7 HOLD`

V7 production/studies were not modified in this run.

## Remaining V6 gate

R/S are comparison studies, not V6 completion. Before final V6 selection: resolve role-sized generated-decoration fidelity/provenance, compare R/S against O/P at all three scales, verify final print/fold/safe-area and photo provenance, then promote only the visual winner with rollback state preserved.
