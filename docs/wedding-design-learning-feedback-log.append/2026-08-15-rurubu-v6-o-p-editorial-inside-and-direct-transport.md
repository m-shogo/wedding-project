# Rurubu V6 O/P visual experiment feedback — 2026-08-15

Scope: Rurubu WEDDING only.
GitHub authority before write: `cc1a56e2ad9d474897b009253cf9b40863ba7daa`.

## Experiment 1 — N → O chronology

- Visible problem: N broke the equal card grid but still stopped visually around the upper/middle page, leaving a dead lower quarter.
- Principle tested: use the final/high-value milestone as a dominant editorial closing image before adding decorative filler.
- Expected improvement: full-page reading rhythm, clearer story ending, less template feel.
- Regression risk: cramped final copy, safe-area collisions, or over-weighting the last event.
- Result: ADOPTED as preferred chronology study.
- Figma: `1318:2 / V6_INSIDE_O_FULL_HEIGHT_EDITORIAL_CHRONOLOGY_2026_08_15`.
- Evidence: 500px whole spread PASS; 794×1123 actual-size right page PASS; 28 native texts; 9 IMAGE fills; 18px safe-area risk 0; text collision 0 after structural repair.
- Next application: keep the same principle available for other Rurubu narrative pages, but do not copy the exact six-event geometry.

## Experiment 2 — L → P profile/Q&A/memories

- Visible problem: L looked like a clean wireframe rather than a Japanese travel-magazine inside; six Q&A groups were too vertically dispersed and the memories images were tiny.
- Principle tested: increase editorial density by compacting semantic text rhythm and enlarging photo fields rather than adding UI-like cards/boxes.
- Expected improvement: stronger magazine scan path and lower-page closure while preserving editable copy.
- Regression risk: text-box collisions after compaction.
- Result: ADOPTED as preferred profile/Q&A study.
- Figma: `1318:43 / V6_INSIDE_P_DENSE_PROFILE_QA_MEMORIES_2026_08_15`.
- Evidence: 1400×990 whole spread PASS; 794×1123 Q&A page PASS; 40 native texts; 4 IMAGE fills; 18px safe-area risk 0; text collision 0 after repair.
- Next application: generated section decoration should be aligned to these semantic roles, not laid underneath unrelated legacy geometry.

## Experiment 3 — Drive generated profile master → direct Figma Plugin API transport

- Visible problem: `upload_assets` remained blocked by the already-known DNS failure fingerprint.
- Method tested: materialize Drive/source bytes and pass a supported raster derivative to `figma.createImage(Uint8Array)`.
- WebP result: REJECTED / unsupported by `createImage` in the current environment.
- JPEG result: TRANSPORT PASS, image hash `7c93168e6262004013942224016fce7a71f72a16`.
- Visual result: REJECTED. The bounded study derivative was too soft at page scale and the generated blank-frame geometry did not align closely enough with existing native photo/text roles.
- Figma evidence: `1320:2` renamed `REJECTED_VISUAL_V6_INSIDE_Q_GENERATED_PROFILE_DECOR_TRANSPORT_STUDY_2026_08_15` and hidden.
- Drive master: `1MfLObNcvsWhQ8nQqgZHeFiDBdjPzj1w8`.
- Learning: transport, placement, and visual adoption are separate states. Direct JPEG/PNG `createImage` is now a viable method switch, but production use requires a sufficiently high-resolution role-sized derivative and native replaceable masks/text built to the generated section geometry.

## Current Rurubu Start Here

Figma status label updated to:

`V5 FU/FX · V6 M + O/P INSIDE STUDIES · V7 D/D STUDY`

V7 was not advanced in this run.
