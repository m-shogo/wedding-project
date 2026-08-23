# RSL-235 — Quiet spread content-owned grid variation

Date: 2026-08-23
Source scope/item: Rurubu WEDDING / V8 Cafe+Table
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Failure fingerprint

`F-RSL-235-QUIET-SPREAD-EQUALIZES-SENSORY-BEATS-INTO-ONE-AXIS-TEMPLATE`

Operation/capability: restrained editorial composition / grid variation
Environment: live Figma `bfM0d4c9dCeBv5pCkJ3TNM`, page `2052:2`
Symptom family: semantically different short text beats share one repeated rail/spacing pattern; thumbnail reads as template-like quietness rather than authored pacing
Likely cause class: publication coherence confused with identical positional grammar
Last verified: 2026-08-23
Replacement method: preserve master identity and factual copy; make a rollback-safe content-owned field/grid variation; verify whole-item, reading and actual-size before promotion
Stop condition: reject if the variation becomes arbitrary asymmetry, damages reading order, creates print risk, or requires invented/decorative content to justify itself

## Visible problem

V8 Cafe AS `2261:2` was structurally clean, but its left daytime sequence placed `カップの音。`, `窓の光。`, and `次の店を決める会話。` as a repeated single-axis stack. Those phrases do not have the same editorial role: the first two are quick sensory observations; the third is a broader social-memory beat.

At thumbnail scale the positional sameness made restraint drift toward `quiet = uniformly empty` and repeated-module thinking.

## Evidence before change

AS `2261:2`:

- `2261:8 / カップの音。` x54 y410
- `2261:24 / 窓の光。` x54 y510
- `2261:25 / 次の店を決める会話。` x54 y585
- structural state was otherwise valid; IMAGE `0`.

## Fresh professional observation

Walker Art Center's account of the *Lifelike* catalogue describes a master grid with materially different grid variations for essays, plates and object lessons because those content types perform different jobs.

MoMA's record of Irma Boom's *SHV Think Book* documents a book architecture in which typography, layout, materials, printing and nonlinear navigation form one information experience rather than one repeated page template.

Observation only: professional book coherence can be systemic while individual content roles vary materially.

## Root-cause hypothesis

A restrained spread becomes mechanical when one visual rail equalizes content with materially different semantic scale. Variation should be earned by content role rather than added as decoration.

## Bounded experiment

Rollback-safe clone AS2 `2325:2` preserved all copy, fonts, right-page hierarchy and factual content. Only five positional relationships changed:

- `2325:8 / カップの音。` → x54 y420
- `2325:24 / 窓の光。` → x430 y426
- `2325:25 / 次の店を決める会話。` → x54 y565
- `2325:19 / functional rule` → y660
- `2325:16 / reflective close` → x300 y710

The first two become a paired observational field; the third remains wider and returns to the main rail before the reflection.

## Expected improvement

Make the quiet page feel intentionally edited rather than merely sparse, while keeping the publication identity, Japanese hierarchy and reader path intact.

## Regression risk

- arbitrary asymmetry could repeat RSL-211's fake choreography failure;
- a receiving item could mistakenly copy the two-up arrangement as a new template;
- moving variable-height copy near fixed boundaries would require fresh long-copy stress under the shared dynamic-copy rule;
- a future photo insertion could invalidate the current optical balance.

## Three-scale evidence

- whole-item / 500px: PASS; sensory pair → social beat → reflection reads more clearly than the single-axis AS stack.
- reading / 1400px: PASS; secondary `窓の光。` remains legible and does not falsely compete with `カップの音。`.
- actual-size / 1587×1123: PASS; Japanese wraps and punctuation remain intentional.

## Structure evidence

AS2 `2325:2` final:

- parent `2052:2`
- native text `13`
- IMAGE `0`
- text intersections `0`
- bounded 18px safe risk `0`
- accidental explicit one-character lines `0`
- Japanese semantic font mismatch `0`

Old AS `2261:2` is preserved hidden as rollback.

## Adopted / rejected / blocked status

`VERIFIED_LOCAL`: AS2 `2325:2` promoted to current V8 Cafe/Table comparison. AS `2261:2` hidden rollback.

## What must remain item-specific

Do not transfer:

- exact x/y values;
- Cafe copy;
- Noto Sans JP sizes used here;
- V8 cream/navy/rust palette;
- paired `カップ / 窓` treatment;
- rule length or close position;
- the conclusion that every quiet page needs spatial irregularity.

## Cross-item applicability hypothesis

When another editorial print role uses a repeated rail for content with materially different semantic scales, test whether a content-owned grid/field variation improves hierarchy and pacing without losing reading order or master identity.

The transferable method is **content-owned variation inside a coherent system**, not `make it asymmetric`.

## Next receiving-item experiment

Use only on a materially different Rurubu role or, through the neutral feed, a different item where repeated positional grammar is visibly flattening meaning. Compare retained master rail vs content-owned variation at thumbnail first. If variation looks merely decorative, reject it.

## Evidence

- Figma current: `2325:2`
- rollback: `2261:2`
- item QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-AS2-CAFE-CONTENT-OWNED-GRID-VARIATION-QA-2026-08-23.md`
- V8 status: `01_paper-items/rurubu-wedding/RURUBU-V8-CURRENT-STATUS.md`

## Asset truth

No image generation, Drive master write, photo adoption or Figma image placement was used to create the improvement.
