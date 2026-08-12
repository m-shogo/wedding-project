# Rurubu V5 — EG solid history typography promotion — 2026-08-12

Scope: `RURUBU WEDDING ONLY`.

## Visible problem

EE's Memory Spots composition was strong, but actual-size inspection exposed a remaining digital/UI-like treatment in the upper journey-history photograph: the `ふたりの旅年表` heading and subtitle used drop shadows, and the year labels used white type with navy strokes. The effect preserved contrast but looked less print-native than the rest of the redesigned spread.

## Principle / capability tested

Preserve the accepted photo hierarchy and semantic content, but remove outline/shadow compensation. Let the photograph's tonal zones determine solid native text color:

- heading: solid deep navy, no effect;
- history subtitle: solid magenta, no effect;
- events 1–5: solid deep navy over the light sky, no strokes/effects;
- final wedding date/event: solid white over the darker right-side city/walkway, no strokes/effects;
- `NEXT DESTINATION`: solid white native microcaption, no shadow.

Expected improvement: less composited/digital typography and a flatter, more believable Japanese print-editorial treatment without adding cards, gradients, or shadow fields.

Regression risk: removing effects can reduce contrast on photographic backgrounds. Every change was therefore checked against the rendered crop at actual size, not only structural collision checks.

## Experiment and repair

Clean-room comparator: `1057:2 / V5_INSIDE_EG_SOLID_HISTORY_TYPE_CLEANROOM_2026_08_12`.

Initial solid-type pass made `NEXT DESTINATION` deep navy and it became too weak on the sunset image. This state was not accepted. After fresh node readback, only that native text was changed to solid white with no shadow.

## Evidence

- thumbnail whole spread: `500 px` long edge PASS;
- reading spread: `1000 px` long edge PASS;
- actual-size right page: `794 × 1123` PASS;
- left page is unchanged from visually verified EE and retains its prior actual-size QA;
- structural readback: `53` visible native text nodes, `6` visible IMAGE-fill nodes, `0` same-parent text collisions, `0` bounded side safe-area text risks;
- fold guide preserved as `1057:283`, x `792.7`, width `2`, height `1122.5`;
- Current outer `77:18` and Current inside `77:290` were not modified.

## Selection

`ADOPTED / PROMOTED`.

EG was selected over EE because the right-page history now reads like solid ink placed on a photograph rather than outlined/shadowed screen text, while retaining the stronger EE memory-photo hierarchy.

Review promotion:

- old EE Review snapshot `1050:2` → hidden rollback;
- new visible Best Inside `1058:2 / BEST INSIDE — EG — source 1057:2`;
- Best Outer remains `1054:2 / EF`;
- Start Here updated to `EF outer / EG inside`.

## Asset / provenance classification

- generated this experiment: `0`;
- new generated asset adopted: `0`;
- new external binary placed: `0`;
- existing verified Figma photography reused: `YES`;
- image geometry/crops intentionally preserved;
- Q60 exact Drive binary placement remains unrelated/open.

## Next application

Prefer solid ink colors chosen from local image luminance zones over outline or drop-shadow compensation. Actual-size rendered contrast decides acceptance; a no-effect treatment is not automatically better if it becomes unreadable.