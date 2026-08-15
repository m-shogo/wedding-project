# ADD-01 ウェルカムボード — zero-reuse clean-room V3

Date: 2026-08-15
State: `SELLABLE_VISUAL_QA_REOPENED / CLEANROOM_V3_STRUCTURAL_PASS / LONG_COPY_STRESS_PASS / LEGACY_COMPARISON_INCONCLUSIVE / REAL_HERO_PHOTO_REQUIRED / LEGACY_PRESERVED / NOT_PRINT_READY`

Authority: latest `main`, Current `docs/automation/non-rurubu-figma-quality-current.md`.
Figma: `XyyTGuz6BMf8XRhPZZfdoT`.
Drive: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg / ADD-01_ウェルカムボード`.

## Clean-room inputs

Only current non-visual requirements were carried forward:

- working frame `852×1200`, corresponding to A2 portrait `426×600 mm` including 3 mm bleed;
- trim `420×594 mm`;
- recommended safe area `20 mm`;
- final hero must be a real-couple photograph in a replaceable image role;
- couple names, venue/location, welcome title/subcopy remain native editable content;
- confirmed date `2026.10.24` and location-level `YOKOHAMA` may remain native;
- final couple photograph, couple-name notation, venue name, subtitle choice and physical A2/A3/vendor proof are deferred.

No retained background, route line, badge, compass, photo crop, generated asset, existing SVG, layout group or production frame was copied into the new candidate. Historical WB assets remain untouched and were not used.

Hybrid split: variable/semantic content = native text; final real photograph = stable replaceable photo container; fixed abstract art = newly authored editable SVG/vector; generated/raster imagery = 0; Drive writes = 0.

## V3 blank-frame candidate

Section: `19:2 / CANDIDATE / ADD-01 / V3 PHOTO WINDOW / REAL PHOTO COMPARISON REQUIRED / LEGACY PRESERVED / 2026-08-15`.
Root: `19:3 / V3 / ADD-01 / PHOTO WINDOW POSTER / 852x1200`.
Photo role: `19:4 / PHOTO / REAL COUPLE / REPLACEABLE`, `514×720`, `clipsContent=true`.

The current candidate was authored from a blank frame before retained production was opened for comparison.

New visual roles:

- large left-side stable real-photo window;
- native Japanese welcome hierarchy;
- open right-side information flow instead of a boxed/card UI;
- newly authored editable `VECTOR / EDITABLE DAY ARC` binding photo and information regions;
- native date/location/venue/couple-name/subcopy roles;
- hidden non-export safe/focal guides only.

The actual couple photo is intentionally not fabricated or AI-generated.

## Iteration / actual-size corrections

Initial actual-size QA found two defects in the new candidate itself:

1. the decorative day-arc entered the couple-name area too strongly;
2. `LAYOUT DUMMY` suffixes were too visually equal to the semantic content.

Corrections:

- day arc moved toward the photo/information boundary rather than crossing the right copy column;
- venue, couple-name and subcopy proof suffixes were reduced/muted while native semantic text remained editable.

## Long-copy stress

Stress proof: `19:21 / QA / V3 ADD-01 LONG COPY STRESS / 2026-08-15`, hidden after QA.

Stress content covered:

- long venue name;
- very long couple names;
- longer guest-facing subcopy.

The first stress exposed a real regression: absolute right-column text allowed the long couple name and subcopy to collide even though no text escaped the root.

Repair:

- candidate and stress now use native `LAYOUT / RIGHT INFO FLOW` vertical auto-layout;
- date, location, venue, anchor rule, couple names and subcopy flow structurally;
- couple-name text uses 24px / 34px line height with height auto-resize;
- subcopy uses native height auto-resize;
- decorative arc is positioned at the photo/info boundary so variable copy remains unobstructed.

Post-repair stress actual-size screenshot: PASS for text-to-text collision and root containment.

## Three-scale QA

Candidate `19:3`:

- thumbnail `355×500`: PASS;
- reading `568×800`: PASS;
- actual `852×1200`: PASS for typography, information separation and stable photo-role geometry;
- long-copy stress actual-size: PASS after auto-layout repair.

Structural readback:

- root `852×1200`, `clipsContent=true`;
- native text nodes `10`, visible `10`;
- visible IMAGE fills `0`;
- vector-ish nodes `5`;
- outside visible text `0`;
- real-photo role `514×720`, stable and clipped, currently no image fill;
- stress proof hidden after QA.

## Completion-only comparison with retained production

Only after the blank candidate, three-scale QA, long-copy stress and structure readback were complete was retained production `1:3` opened.

The retained production remains visually strong and already contains a large replaceable-photo-led editorial composition. The new V3 is materially independently authored and structurally valid, but without the approved real couple photograph there is not enough evidence to claim that V3 clearly beats retained production as a finished welcome board.

Therefore V3 is preserved as a serious clean-room candidate but is **not promoted** and does not receive a new `SELLABLE_VISUAL_QA_PASS` claim in this evidence.

Current state for the new candidate:

`SELLABLE_VISUAL_QA_REOPENED / CLEANROOM_V3_STRUCTURAL_PASS / LONG_COPY_STRESS_PASS / LEGACY_COMPARISON_INCONCLUSIVE / REAL_HERO_PHOTO_REQUIRED / LEGACY_PRESERVED / NOT_PRINT_READY`.

Retained production remains untouched.

## Image / Drive decision

No AI-generated bride/groom likeness is allowed. The remaining hero role requires the real couple photograph, so generated people are not a valid substitute.

- generated raster imagery: 0;
- new Drive assets: 0;
- Drive authority live-readback: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg / ADD-01_ウェルカムボード`;
- final hero-photo crop comparison remains `BLOCKED_REQUIRED_INPUT` / `DEFERRED_FINALIZATION` until the real selected photograph is authoritative.

This input blocker applies only to final selection between V3 and retained production. It does not block progression to the next non-Rurubu clean-room target.

## Next target

Proceed to `ADD-02 11卓の国別テーブルサイン` from blank frames using only size/print/table/theme facts and semantic constraints. Do not use retained ADD-02 production as visual reference during construction.
