# NRSL append — ADD-03 travel gesture can over-explain chronology

Source scope/item: non-Rurubu / ADD-03 当日タイムテーブル

State: `TESTED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A clean-room timetable direction correctly tied its travel metaphor to the real event chronology, but the continuous S-shaped route became the dominant visual object when representative native-text mass was overlaid. The timetable started reading like an infographic / transit diagram rather than a joyful printed wedding-day artifact.

## Root-cause hypothesis

A semantic travel cue can still become too literal. If one dominant path explicitly connects each event, the graphic begins explaining the data instead of creating editorial motion and anticipation.

Normalized fingerprint: `TRAVEL_GESTURE_OVER_EXPLAINS_CHRONOLOGY`.

## Bounded experiment

1. V3 proxy: continuous route with three integrated event terminals + representative native-text mass.
2. Method switch scratch: blank-frame `ACCORDION DAY JOURNEY` using large asymmetric paper folds instead of any route line.

No production Figma frame, prior layout group, old decorative vector, crop or generated asset was reused in either experiment.

## Expected improvement

Keep the travel/departure feeling while making typography—not a diagram—the primary chronology carrier.

## Results

### V3 proxy

- whole-item: REJECT; S-route dominates and reads infographic-like;
- reading scale: REJECT; event blocks align too predictably to the route;
- actual-canvas proxy: vector structure itself is clean, but art direction rejected.

### Accordion scratch

- whole-item: REJECT; repeated colored folds become another module system resembling stacked section tabs;
- no further scale maturation because the thumbnail gate failed.

## Regression risk

Removing a literal route can make the artifact lose the requested travel energy. Replacing it with repeated stage modules can merely swap `infographic UI` for `section UI`. The next test must preserve one strong movement gesture without attaching a graphic module to every event.

## Evidence

- live Current Figma: file `woFUHUqZcvNkih8o42xeH4`, A2 `14:2`, A3 `15:40`;
- retained Current remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`;
- exact Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j`;
- V3 fixed-art: `01_paper-items/additional-wedding-items/ADD-03-timetable-board/studies/vnext-2026-08-25/one-day-route-foldout-fixed-art-v3.svg`;
- item evidence: `01_paper-items/additional-wedding-items/ADD-03-timetable-board/V3-PROXY-REVIEW-AND-V4-METHOD-SWITCH-2026-08-25.md`;
- item evidence commit: `5cce870ebb6f86b5cbeb30e9c098557d9f6844b4`.

## What must remain item-specific

Do not transfer ADD-03 event count, schedule positions, headline, colors, exact route/fold geometry, A2/A3 sizes or timetable copy.

## Cross-item applicability hypothesis

On another artifact where the theme has a natural process/path/journey metaphor, test whether the visual metaphor supports the reader's movement without becoming a one-to-one diagram of every information step. If typography remains secondary to the path at thumbnail scale, change method rather than decorating the path further.

## Next receiving-item experiment

Only test on a materially different item that genuinely has sequential semantics. Do not apply this to Passport, tags, message cards or other non-sequential artifacts merely because the wedding theme is travel.
