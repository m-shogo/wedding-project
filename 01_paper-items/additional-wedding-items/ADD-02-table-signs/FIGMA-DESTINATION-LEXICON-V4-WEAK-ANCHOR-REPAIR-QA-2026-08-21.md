# ADD-02 — Destination Lexicon V4 weak-anchor repair QA

Date: 2026-08-21
State: `V4_WEAK_ANCHOR_REPAIR_VERIFIED / FAMILY_RHYTHM_IMPROVED / CURRENT_PRODUCTION_RETAINED / NOT_PROMOTED`
Authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start/latest main before write: `32fe5920701bae4fa2a84f18bc9a61542231af74`
Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
Drive writes: `0`
Generated assets: `0`

## Why this run changed method

The prior six-anchor review established that SPAIN / TAIWAN / FRANCE had begun escaping the original rounded-shape template grammar, while HAWAII / JAPAN / ITALY still converged on muted edge-field / upper-title skeletons. The next high-value work was therefore not a seventh destination, but blank-frame repair of the three weak anchors.

No existing production or V3 visual node was duplicated as a new design source. Only verified non-visual requirements were carried forward: 1000×1480 canvas, destination/table/date roles, native editable theme/description roles, and the corresponding table numbers.

## 1. JAPAN V4 — CELEBRATION PAPER PARADE

Three blank-frame studies were authored first:

- `160:2 / CELEBRATION RIBBON FIELD`
- `160:13 / WASHI TYPE PARADE`
- `160:25 / FOLDING LIGHT PANELS`

The second direction gave the strongest balance of Japanese-first typography, celebratory color, open editorial space and a materially different mass distribution from the old V3. A fresh full candidate was then rebuilt from blank rather than promoting the study clone:

- selected candidate: `161:2 / VNEXT_V4 / JAPAN / CELEBRATION PAPER PARADE / CLEANROOM SELECTED CANDIDATE`
- long-copy stress: `161:15 / QA / JAPAN V4 / CELEBRATION PAPER PARADE / LONG COPY STRESS`

Visual language:
- cobalt upper paper field;
- offset vermilion folded sheet;
- one gold fold edge;
- two lower paper swatches rather than a repeated edge spine;
- large native `日本` as the primary destination voice.

Three-scale QA:
- family/thumbnail board: PASS;
- reading scale 1000px: PASS;
- actual 1000×1480 render: PASS;
- long-copy stress: PASS.

Structure:
- selected native text: `6/6 auto-height`;
- stress native text: `6/6 auto-height`;
- outside text: `0` selected / `0` stress;
- IMAGE fills: `0`.

Current production `2:47` was opened only after the V4 candidate was mature enough for comparison. V4 is more Japanese-first, materially more distinct at family scale, and more celebratory than the muted Japan V3. Production is nevertheless retained until the whole 11-sign family has enough mature V4 anchors for a coherent winner decision.

## 2. HAWAII V4 — TRADE WIND BROADSIDE

The prior Hawaii V3 had destination-specific atmosphere but still read as a quiet edge-field composition. A new full-width diagonal skeleton was built from blank:

- selected candidate: `163:2 / VNEXT_V4 / HAWAII / TRADE WIND BROADSIDE / CLEANROOM SELECTED CANDIDATE`
- long-copy stress: `163:16 / QA / HAWAII V4 / TRADE WIND BROADSIDE / LONG COPY STRESS`

Visual language:
- wide lagoon wind field crossing the upper page;
- cobalt / white breeze marks used as movement rather than an icon cluster;
- open cream editorial center;
- coral horizon + sunny corner as the lower physical color field;
- Japanese theme text remains native and editable.

Three-scale QA:
- family/thumbnail board: PASS;
- reading scale 1000px: PASS;
- actual 1000×1480 render: PASS;
- realistic long-copy stress: PASS.

Structure:
- selected native text: `6/6 auto-height`;
- stress native text: `6/6 auto-height`;
- outside text: `0` selected / `0` stress;
- IMAGE fills: `0`.

This is substantially more energetic than the previous muted V3 while avoiding a return to the current production's large-circle + rounded-bar grammar.

## 3. ITALY V4 — PIAZZA POSTER RHYTHM

The prior Italy V3 was especially quiet and vertically column-led. V4 method-switched to horizontal mass distribution:

- selected candidate: `164:2 / VNEXT_V4 / ITALY / PIAZZA POSTER RHYTHM / CLEANROOM SELECTED CANDIDATE`
- long-copy stress: `164:15 / QA / ITALY V4 / PIAZZA POSTER RHYTHM / LONG COPY STRESS`

Visual language:
- sienna canopy at the top;
- large open cream information square;
- cobalt evening band across the lower middle;
- three offset color sheets/tile-like paper pieces as a single celebratory lower rhythm;
- no old V3 vertical column skeleton reused.

### Real failure caught during stress

The first stress screenshot showed the fixed sienna binding rule visually crossing the second line of the expanded native headline even though text bounds themselves did not report a collision.

Bounded repair:
- binding rule moved to `y=695`;
- description moved to `y=755`;
- selected and stress candidates both updated;
- stress screenshot rerun and PASS.

This independently reinforces the existing fixed-art stress QA lesson: native text collision checks are insufficient when non-text decoration can cross variable copy.

Three-scale QA:
- family/thumbnail board: PASS;
- reading scale 1000px: PASS after repair;
- actual 1000×1480 render: PASS;
- long-copy stress: PASS after repair.

Structure:
- selected native text: `6/6 auto-height`;
- stress native text: `6/6 auto-height`;
- outside text: `0` selected / `0` stress;
- IMAGE fills: `0`.

## Updated family-scale comparison

Review board:

- `163:30 / QA / ADD-02 / SIX DESTINATION V3-V4 VS CURRENT / HAWAII+JAPAN V4 / 2026-08-21`

Before final read, its Italy candidate was updated to the repaired V4 while preserving proportional review scaling (`rescale(0.22)`, not root `resize()`).

Top row:
- HAWAII V4 `163:2`
- JAPAN V4 `161:2`
- ITALY V4 `164:2`
- SPAIN V3 `153:2`
- TAIWAN V3 `154:3`
- FRANCE V3 `157:3`

Bottom row retained current production:
- HAWAII `2:2`
- JAPAN `2:47`
- ITALY `2:11`
- SPAIN `2:29`
- TAIWAN `2:38`
- FRANCE `2:20`

Result:
- the previous weak-anchor convergence is materially reduced;
- HAWAII / JAPAN / ITALY now use three different mass-distribution grammars rather than edge-field variants;
- the candidate row has stronger theme + variation and less obvious AI-template repetition;
- current production still has stronger single-system immediacy, so bulk promotion is premature;
- do not replace individual production signs yet merely because a local V4 wins. The 11-sign set should reach a coherent family decision rather than becoming a half-old / half-new hybrid accidentally.

The QA-only stress frames and review boards were hidden after readback. Selected V4 candidates remain visible as comparison candidates; current production roots were not edited.

## Image / Drive decision

No image generation was justified in this run. The visible bottleneck was layout skeleton / mass distribution / celebration energy, not missing hero imagery or texture. Adding generated tropical or destination art would not have solved the family-grammar problem and could have introduced stock/AI artifacts.

No Drive asset was created.

## Learning state

Strengthened locally within ADD-02:

- `DESTINATION_FAMILY_DIVERSITY_REQUIRES_SKELETON_AND_ENERGY_VARIATION` — `VERIFIED_LOCAL`;
- `MATERIAL_DIVERSITY_CAN_STILL_CONVERGE_ON_ONE_LAYOUT_SKELETON` — `VERIFIED_LOCAL`;
- existing fixed-art-vs-dynamic-copy screenshot QA lesson was independently reproduced on Italy V4 and should continue to be consumed as a QA method, not as a visual-style rule.

No new project-wide rule is promoted from this run because the evidence is still within one item family.

## Decision / next work

`CURRENT_PRODUCTION_RETAINED / V4_SERIOUS_COMPARISON_SET_EXPANDED`.

The highest-value next step is to extend the V4 method to one materially different remaining destination only if it introduces a new place-derived skeleton rather than copying HAWAII/JAPAN/ITALY. After 7–8 mature destination anchors exist, rebuild the same-scale board and decide whether the V4 family has enough coherent celebration energy to justify completing all eleven and eventually promoting as a set.
