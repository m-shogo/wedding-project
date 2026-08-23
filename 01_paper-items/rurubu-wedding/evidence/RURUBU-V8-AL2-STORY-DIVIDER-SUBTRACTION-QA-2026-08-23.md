# Rurubu WEDDING V8 AL2 — Story/Chronology Divider Subtraction QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
V6 control: unchanged `JC + IX + JB + IZ + IT + JA`
V7 production/comparison: unchanged

## Research observation

Fresh professional research deliberately moved away from the recent interview/grid/photo references.

- `idea No.391` documents Tsutomu Toda's editorial-design evolution: the visibly multilayered graphism of earlier work gradually recedes in later work while editorial structure remains the subject of the design.
- `idea No.381` frames Hitoshi Suzuki's practice around the power/science of page and style and the idea that editing itself is design.
- Pentagram's `OfficeUS Atlas` explicitly rejected a simple one-page-per-project encyclopedia and a simple chronology, instead sequencing the archive to expose thematic structure.

These sources were treated as observations, not rules.

## Rurubu-specific hypothesis

> In restrained V8 story design, an internal rule should remain only if it performs a binding, navigation, physical, or semantic job. If spacing/alignment already make the relationship legible, a visible divider can become residual layout scaffolding rather than editorial meaning.

This also cross-checks the neutral shared-learning method already verified outside Rurubu: `NRSL-002` says a retained line/field should prove a binding function at whole-item scale. The transferable method is not `remove lines`; it is `prove the function`.

## Before

Current Story/Chronology AL `2238:35` was structurally valid and already used unequal chronology emphasis. The visible left-page `L_STORY_DIVIDER / 2238:69` separated two prose roles:

- main story body `2238:68`;
- secondary reflection `2238:70`.

The two text roles already differed by width, column position, type scale, and copy length. The divider did not carry chronology, trim/fold, caption, navigation, or image-binding responsibility.

## Bounded experiment

Rollback-safe clone:

- candidate root: `2332:2`
- candidate name during test: `V8 CLEANROOM AL2 / BOOK EDITION / STORY+CHRONOLOGY / DIVIDER SUBTRACTION TEST / TESTED_LOCAL / 2026-08-23`
- changed node only: cloned `L_STORY_DIVIDER / 2332:36`
- change: `visible=true → false`
- no copy change
- no type change
- no coordinate change
- no color change
- no image generation or placement
- no factual/variable text rasterization

## Three-scale visual result

### Whole-item / 500px

PASS.

Compared with AL, AL2 removes one conspicuous vertical partition from the left story page. The two prose voices remain legible through width, position and type scale, while the page reads less like a two-column form/template.

### Reading / 1400px

PASS.

The secondary reflection remains visually attached to the main body by baseline neighborhood and shared page field. Removing the rule does not create ambiguity, and the left page gains a calmer continuous reading field that better matches the V8 monograph direction.

### Actual-size / 1587×1123

PASS.

No clipping, overlap, accidental wrap or weak microtype introduced by the subtraction.

## Structural QA

Candidate `2332:2` before promotion:

- parent: `2052:2`
- visible native text: `25`
- IMAGE fill nodes: `0`
- text intersections: `0`
- bounded 18px safe risks: `0`
- Japanese semantic font mismatch: `0`
- accidental explicit one-character lines: `0`
- divider `2332:36`: hidden

## Professional critique

- **Art director:** PASS — the idea is clearer: story voice and chronology carry the spread, not residual scaffolding.
- **Editorial designer:** PASS — reading order remains title → intro → pull quote → two prose voices → close; no grouping information is lost.
- **Book designer:** PASS — quieter page construction without converting V8 into empty luxury whitespace.
- **Typographer:** PASS — Japanese wraps, hierarchy, punctuation and line lengths are unchanged.
- **Photo editor:** N/A/PASS by responsibility — no unverified imagery was introduced to fill space.
- **Print designer:** DESIGN QA PASS only — no new trim/fold risk, but exact printer template/preflight/physical proof remain unresolved.

## Before/after learning check

PASS.

The fresh research and the existing neutral `prove the binding function` method changed the live decision from likely typography/spacing polish to a one-element subtraction test. The result is materially simpler without loss of reader function.

## Promotion

Promoted current root:

- `2332:2 / V8 CLEANROOM AL2 / BOOK EDITION / STORY+CHRONOLOGY / DIVIDER SUBTRACTION / CURRENT / VERIFIED_LOCAL / 2026-08-23`
- current position: `x=3600 / y=8500`

Preserved rollback:

- `2238:35 / ROLLBACK / V8 AL / STORY+CHRONOLOGY / PRE-DIVIDER-SUBTRACTION / HIDDEN / 2026-08-23`
- `visible=false`
- rollback storage: `x=300000 / y=8500`

## Learning state

No new global `remove dividers` rule is created.

Local receiving evidence strengthens the existing shared principle:

> Rules, seams and fields should be retained, extended, reduced or removed according to a demonstrable binding/navigation/physical/semantic function at whole-item scale.

State for this V8 application: `TESTED_LOCAL → VERIFIED_LOCAL`.

Item-specific and non-transferable: exact divider position, V8 paper tone, type scale, chronology geometry, copy, and left-page composition.

## Asset truth

- new image-model generation: `0`
- Drive writes: `0`
- new Figma production photo placements: `0`
- native/factual copy changed: `0`
- V6 changed: NO
- V7 changed: NO

## Truth gates

AL2 is a verified design study/current V8 Story role. It is **not** print-ready. Final copy/photo authority, exact printer template, bleed/trim/fold/imposition, effective image resolution where relevant, PDF preflight and physical proof remain separate gates.
