# Rurubu WEDDING V7 — Fixed Hawaii display lockup QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
State: `TESTED_LOCAL → VERIFIED_LOCAL / STUDY CANDIDATE / NOT PREFERRED / NOT PRINT READY`

## Purpose

Test the project-wide hybrid-authoring direction on a real Rurubu cover role: a fixed, non-variable destination/display phrase may be treated as an authored graphic rather than ordinary native type when that produces stronger editorial identity, while the exact editable source remains preserved and the page is not flattened.

This is a bounded V7 study. It does not change V6 control, V8 current, other Wedding items, or the existing V7 source study.

## Before

Source root: `2055:2 / V7 PRO STUDY C / HAWAII POP EDITORIAL / OUTER / STRUCTURAL PHOTO DUMMIES / TYPOGRAPHY QA`.

Front title roles were separate native text:
- `2055:23 / TEXT / V7_FRONT_HAWAII` = `ハワイ`, Noto Sans JP Bold 96, plain white over the photo;
- `2055:24 / TEXT / V7_FRONT_SUB` = `旅するWEDDING`, Noto Sans JP Bold 34, yellow.

At whole-item/reading scale the cover had useful travel-magazine density, but the fixed destination title behaved like ordinary text laid on top of a photograph. Against the bright sky it had weaker identity and weaker visual ownership than the existing Rurubu WEDDING masthead.

## New professional research used

Fresh 2026 Tokyo TDC research reinforced that editorial/book typography and lettering can be an authored visual object rather than merely neutral typesetting. The current TDC annual itself treats cover typography as a deliberate challenge in balancing decoration, restraint, geometry and freer form. Contemporary Japanese type work such as Takashi Funayama's `Shuren kana` also re-examines historical Japanese letter relationships for present-day editorial use rather than treating Japanese display text as an interchangeable font choice.

The decision principle extracted for this Rurubu experiment was not to imitate any specific TDC work. It was: **when the copy is fixed and identity-bearing, test whether the typography itself should carry a designed editorial role instead of remaining plain interface-like text.**

## Bounded experiment

Candidate root:
- `2282:2 / V7 PRO STUDY C2 / HAWAII POP EDITORIAL / OUTER / FIXED DISPLAY LOCKUP / TESTED_LOCAL / 2026-08-23`

The original `2055:2` remains visible and unchanged for direct comparison.

Fixed display source:
- `2282:32 / SOURCE / V7 FIXED DISPLAY LOCKUP / ハワイ + 旅するWEDDING / EDITABLE`
- hidden after export;
- exact editable Japanese source preserved;
- source size `560×190`.

Composed roles:
- `ハワイ` — exact native text in the hidden source, white fill + bounded coral outline;
- cyan baseline accent;
- `旅するWEDDING` — exact native text in the hidden source, yellow with a very thin dark edge for separation.

The source was exported inside Figma as transparent PNG at `4×`:
- raster: `2240×760 px`;
- exported bytes: `78,818`;
- placed role: `2282:36 / FIXED PNG / V7 HAWAII DISPLAY LOCKUP / 4X / SOURCE PRESERVED`;
- image hash: `8366653cf107cc809effb5e53f7dfaddb85842d6`;
- placement: `560×190` Figma px.

The cloned plain native display roles are hidden only inside candidate `2282:2`. They remain untouched in original `2055:2`.

No whole-page flattening was performed. Small service copy and all variable/semantic copy remain native text.

## Three-scale visual QA

- whole-item / 500 px: **PASS** — destination identity is clearer and the title survives the sky/photograph at thumbnail scale;
- reading / 1400 px: **PASS** — title, Rurubu masthead and hero image have distinguishable roles; no collision or illegible edge treatment;
- actual-size / 1587×1123: **PASS** — exact Japanese letterforms remain clear; the lockup is visually intentional rather than a generic plain-text overlay.

The treatment is deliberately energetic and remains a V7-specific Hawaii/pop hypothesis. It is not evidence that every fixed title should receive an outline, underline or bright palette.

## Structural QA

Candidate `2282:2` readback:
- parent: `2052:2`;
- visible native text nodes: `19`;
- visible image-fill roles: `6` including existing structural-photo dummies and the new fixed lockup;
- unintended text-box intersections: `0`;
- 18px text safe-area risks: `0`;
- editable fixed-lockup source `2282:32`: preserved, hidden, parent `2052:2`;
- fixed lockup image `2282:36`: visible, image hash read back successfully.

The source root was guarded using Plugin API-local parent/x/y/visibility immediately before mutation, following RSL-226.

## Working print-resolution comparison

Under the current working physical geometry of `420 mm` spread width, a `560 px` Figma role spans about `148.2 mm`. The `2240 px` 4× export therefore corresponds to approximately `384 ppi` at that working width before any downstream resampling.

This is only a comparison/preflight check. Exact printer template, export behavior, color conversion and printer specification remain final authority. This does **not** make the study print-ready.

## Asset truth

- image-model generation: `0`;
- newly created Drive master: `0`;
- new production/preferred Figma image placement: `0`;
- new V7 study fixed graphic placement: `1` (`2282:36`);
- exact editable source preserved in Figma: `1` (`2282:32`);
- V6/V7 existing photo roles were not re-authoritatively promoted by this test.

This was an in-Figma composed/rasterized display experiment, not an external AI-image generation claim. If the treatment is later adopted into a real V7 production candidate, the accepted graphic should go through the normal asset lifecycle/Drive authority rather than treating this study raster as a final master by default.

## Decision

`VERIFIED_LOCAL` as a **method and bounded V7 study**, not as a preferred cover and not as a project-wide visual style.

What appears to improve:
- fixed destination identity;
- thumbnail readability;
- stronger separation from generic native-text overlay behavior;
- clearer distinction between publication masthead and destination feature title.

What does not transfer automatically:
- coral outline;
- cyan rule;
- yellow subhead;
- exact stroke weights;
- Hawaii/Rurubu pop grammar;
- this cover's placement or scale.

## Next test

Before any preferred promotion, compare this composed-lockup method against at least one independently art-directed fixed-title alternative (for example a more restrained but still authored typographic lockup) on a rollback-safe V7 candidate. The winner must still pass whole/reading/actual-size QA and retain exact editable source truth.
