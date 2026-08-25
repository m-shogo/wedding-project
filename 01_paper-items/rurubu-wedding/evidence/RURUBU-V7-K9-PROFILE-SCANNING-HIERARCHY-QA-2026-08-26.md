# Rurubu WEDDING V7 K9 — Profile/Q&A Scanning Hierarchy QA

Date: 2026-08-26
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Current after promotion: `2597:2 / V7 PRO STUDY K9`
Rollback: `2546:2 / V7 K8`, hidden
V6 control: untouched
V8: untouched

## New professional research input

This pass deliberately added new external judgment rather than reusing only prior project rules.

- W3C JLREQ / JIS X 4051-derived Japanese composition guidance was revisited specifically for line-start prohibition, Western-word break handling, and Japanese/Latin adjustment behavior.
- JAGDA's current Book & Editorial Design award surface and `Graphic Design in Japan 2026` were used as a current professional benchmark for treating a spread as editorial composition rather than a set of reusable UI modules.

These sources were observations, not automatic project rules.

## Visible problem in K8

K8 was truth-safe and structurally sound, but the Profile/Q&A spread read too quietly at whole-item scale for V7's Hawaii/high-energy Japanese travel-information direction.

The defect was not simply low element count. The page had:

- large cream fields with weak reading momentum;
- small equally weighted profile facts;
- Q1–Q6 questions without a strong scan path;
- verified real-couple evidence present, but not used strongly enough as an editorial hinge;
- no card/UI overuse, but also insufficient print-magazine rhythm.

## Root-cause hypothesis

For this page role, V7 needs density through **hierarchy and scanning rhythm**, not through extra containers or decorative stickers.

Hypothesis:

1. a larger verified photo anchor can bind the coral opener to the factual lower field;
2. large numbered entry points can turn six facts / six questions into a travel-magazine scan path;
3. asymmetry and unequal beats can increase energy without inventing content;
4. unanswered factual fields must stay native and truth-safe instead of being filled with synthetic reader-facing claims.

## Bounded K9 experiment

K9 cloned K8 only as a rollback-safe iterative V7 production candidate; no V6 or V8 composition was copied.

Changed:

- verified Hawaii `004` profile support image enlarged/repositioned as a coral→cream hinge;
- verified Hawaii `036` Q&A image enlarged/repositioned as a top-right counterweight;
- six profile facts reorganized into stronger two-column numbered beats;
- Q1–Q6 reorganized into unequal numbered beats;
- coral/cyan/yellow applied only to semantic numerals for scanning;
- selected text measures narrowed after structure QA exposed collisions.

Unchanged:

- factual copy;
- `回答待ち` truth state;
- question wording;
- image hashes/source meaning;
- page size;
- V6/V8;
- no cards, pills, shadows, gradients, generic stickers, decorative English, invented facts, or new raster assets.

## Failure fingerprint learned in this pass

### `FIGMA_CLONE_HIDDEN_SEMANTIC_NUMBERS`

Operation: clone an existing Rurubu comparison frame and strengthen a previously hidden semantic hierarchy.

Symptom: first K9 screenshot showed no large scan numerals even though positions/fills had been changed.

Root cause: K8's number text nodes were intentionally `visible=false`; cloning preserved that hidden state. Styling hidden nodes did not make them visible.

Corrected method: explicitly read back `visible` after clone, then enable only the semantic numeral nodes intended for the new hierarchy.

Verified: yes, screenshot after correction showed all 12 intended numbered entry points.

Applicability: cloned rollback-safe studies where a prior candidate hid semantic text. Does not justify blindly unhiding all descendants.

### `V7_K9_TEXT_MEASURE_COLLISION`

Symptom: first structure QA found five text intersections after rearranging profile/Q&A roles.

Root cause: legacy placeholder widths were retained after moving adjacent numbered roles into a tighter two-column composition.

Corrected method: reduce only three bounded measures (`profile value 2`, `profile value 4`, `Q2 title`) and rerun structure QA.

Verified: final text intersections `0`; 18px edge risks `0`.

## Three-scale QA

### Whole-item / ~500–700 px

PASS. K9 is stronger than K8 for V7 because:

- the large numerals establish an immediate scan path;
- verified images act as editorial anchors rather than small floating evidence;
- the page reads as one publication spread rather than sparse independent labels;
- no new container grammar was introduced.

### Reading / 1000 px

PASS. Reading order is clear: opener → profile facts → close on left; title/photo → first-question group → future-question group → close on right.

### Actual-size / 1587×1123

DESIGN QA PASS.

- visible native text: `40`
- text intersections: `0`
- 18px edge risks: `0`
- Japanese font mismatch: `0`
- authority parent: `2052:2`
- visible verified screen-derivative images: `2`

Image hashes preserved:

- `004`: `b77012f2eb0a832acfe6fecd883775832ba029c6`
- `036`: `c80602f1881db70f3a005651f982a0f38b294a9d`

## Professional critique

### A. Art director

PASS relative to K8. The idea is clearer: `6 facts / 6 questions` becomes the visual engine, supported by real travel evidence.

### B. Editorial designer

PASS for current unresolved-content state. Hierarchy and scan order improved without container inflation. Density remains intentionally incomplete until real answers exist.

### C. Book designer

PASS for V7 sequence role, but not a V8-like quiet-book solution. It provides a faster, more energetic beat between photo-heavy travel spreads.

### D. Typographer

PASS at current copy. Noto Sans JP remains intact; no Japanese→Inter mismatch. Final answers require fresh line-break and long-copy stress.

### E. Photo editor

PASS only at screen-composition level. `004/036` are verified real-couple Hawaii evidence but remain screen derivatives and are not answer-specific.

### F. Print designer

DESIGN geometry PASS; HIRES/PRINT photo proof remains blocked. No claim of print readiness.

## Decision

`K9 2597:2` promoted to current V7 Profile/Q&A comparison.

`K8 2546:2` preserved as hidden rollback.

State: `VERIFIED_LOCAL_DESIGN / REAL-CONTENT-BLOCKED / SNAP-HIRES-BLOCKED / UNPAGINATED-STUDY / NOT PRINT READY`.

The professional-learning change was real: without the new hierarchy/scanning hypothesis, the design would have retained K8's sparse equal-weight rhythm. The change was not a recolor or decorative pass.
