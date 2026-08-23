# Rurubu WEDDING V8 AQ2 — Memory/Guide nonlinear-browse QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Current candidate/adopted root: `2335:2`
Previous current root preserved as rollback: `2256:2`

## New professional research used

This run deliberately moved away from the recent V8 prose-divider, interview-field, photo-selection and quiet-grid references and studied information/book design through Joost Grootens / Studio Joost Grootens.

Relevant observations:

- Grootens describes an atlas as a collection of information integrated into a theme-based information system rather than merely a stack of maps.
- He describes many of his information books as tools that readers complete through their own discovery and comparison rather than strictly linear reading.
- His monograph documents grids, formats, paper, color, type and book structure together rather than treating layout as surface decoration.

Sources consulted:

- Domus, `I swear I use no art at all` — interview with Joost Grootens.
- Studio Joost Grootens archive.
- nai010 publishers, `I swear I use no art at all`.

These are observations, not permanent Rurubu rules.

## Rurubu-specific hypothesis

AQ's right page is titled `寄り道案内` and is intended to be browsable by meaningful day-part labels: `朝 / 昼 / 夕 / 夜`. The extra ordinal labels `01 / 02 / 03 / 04` add a second navigation system and imply a stricter linear step sequence than the editorial role requires.

Hypothesis:

> In a browse-oriented editorial guide, an ordinal should remain only if its order is meaningful to retrieval or sequence. If semantic labels already provide the reader's entry points and the order is optional, ordinal numbering can turn a book-like guide into a step/UI grammar.

This differs from the earlier V7 timeline lesson: that case removed redundant numbering where time already encoded chronological sequence. AQ2 tests a different issue — ordinal affordance contradicting a deliberately non-linear browse role.

## Bounded Figma experiment

Created rollback-safe clone from current AQ `2256:2`:

- candidate: `2335:2`
- candidate initial position: `x=5400 / y=9850`
- page parent: `2052:2`

Changed only four exact text nodes in the clone from visible to hidden:

- `2335:13 / 01`
- `2335:17 / 02`
- `2335:21 / 03`
- `2335:25 / 04`

Unchanged:

- all Japanese factual/editorial copy;
- `朝 / 昼 / 夕 / 夜` labels;
- typography, sizes, positions and colors;
- left-page memory copy;
- folios and spine;
- images: none;
- V6 control and all V7 roots.

No card, box, pill, shadow, gradient, decorative English, photo or new motif was introduced.

## Three-scale visual QA

### 500px whole-item

PASS.

The right page reads immediately as four semantic day-part entry points rather than numbered steps. Removing the red ordinals reduces UI/checklist residue without making the route ambiguous. The existing size variation — large `朝`, compact `昼/夕`, large `夜` — still carries rhythm.

### 1400px reading scale

PASS.

Descriptions remain correctly attached to their day-part labels. The absence of ordinals does not damage grouping or reading order. The guide is calmer and better aligned with V8's book/monograph identity.

### Native 1587×1123 actual-size

PASS.

Japanese copy remains readable with no new wrap, collision or clipping. The change is visible as editorial behavior, not merely screenshot-scale polish.

## Structural QA before promotion

Readback from `2335:2`:

- parent: `2052:2`
- size: `1587.4 × 1123`
- visible native text: `17`
- visible IMAGE fill nodes: `0`
- text intersections: `0`
- bounded 18px safe risks: `0`
- Japanese semantic font mismatch: `0`
- ordinals `01/02/03/04`: all hidden

Intentional one-character day-part words `朝 / 昼 / 夕 / 夜` are content, not accidental one-character wrap defects.

## Professional critique

- **Art director:** PASS — the page has a clearer editorial idea: memory can be revisited by time-of-day rather than by an interface-like step count.
- **Editorial designer:** PASS — semantic browse labels do the navigation job; ordinal scaffolding was unnecessary.
- **Book designer:** PASS — the right page behaves more like a browsable printed guide and less like a step component while retaining page rhythm.
- **Typographer:** PASS — Japanese hierarchy, line breaks, punctuation and spacing are unchanged.
- **Photo editor:** PASS by responsibility — no dummy photo was promoted or added to fill whitespace.
- **Print designer:** DESIGN QA PASS only — no new safe-area defect; exact printer template, preflight and physical proof remain unverified.

## Promotion / rollback state

After QA, promotion re-read verified both source and candidate before mutation.

Current:

- `2335:2 / V8 CLEANROOM AQ2 / BOOK EDITION / MEMORY+GUIDE / NONLINEAR BROWSE / CURRENT / VERIFIED_LOCAL / 2026-08-23`
- visible: true
- position: `x=0 / y=9850`
- parent: `2052:2`

Rollback:

- `2256:2 / ROLLBACK / V8 AQ / MEMORY+GUIDE / PRE-NONLINEAR-BROWSE / HIDDEN`
- visible: false
- storage: `x=300000 / y=9850`

## Before/after learning check

PASS.

Fresh information-design research changed the live design decision. Without it, the likely next move would have been spacing or visual-density adjustment. The new knowledge instead exposed a mismatch between the guide's intended non-linear editorial use and an ordinal step affordance.

## Learning state

`RSL-238 / F-RSL-238-BROWSE-GUIDE-USES-ORDINAL-STEPS-WHEN-SEMANTIC-ENTRY-POINTS-ARE-NONLINEAR`

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

This is **not** a `remove numbering` rule. Ordinals remain valid when sequence, cross-reference, map lookup, itinerary order, chronology, or reader retrieval actually depends on them.

## Asset / truth boundary

- new image-model generation: `0`
- new Drive masters: `0`
- production photo placements: `0`
- native/factual copy changed: `0`
- V6 changed: NO
- V7 changed: NO
- DESIGN QA: PASS
- REAL CONTENT QA: unchanged/incomplete where final photography remains unresolved
- PRINT TEMPLATE/PREFLIGHT: NOT VERIFIED
- PHYSICAL PROOF: NOT VERIFIED
