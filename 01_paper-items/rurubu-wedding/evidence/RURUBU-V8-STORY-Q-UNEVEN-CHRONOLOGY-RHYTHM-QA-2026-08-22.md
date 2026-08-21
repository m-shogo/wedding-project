# RURUBU V8 Story Q — Uneven Chronology Rhythm QA

Date: 2026-08-22
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
V8 previous Story Current: `2171:2`
V8 new Story Current: `2196:2`
V6 control preserved: Story / Chronology JB `2144:2`

## Why this was selected

A fresh live review of all six V8 Current spreads showed that Story / Chronology still contained one of the clearest remaining template fingerprints: the right-hand chronology treated 2019 / 2021 / 2024 / 2026 as four equal rows separated by equal rules. The content itself says `時間は、均等には進まない。`, but the visual system represented time as mechanically equal modules.

This was not a collision or bounds defect. It was an editorial-rhythm defect.

## New professional research used

This run intentionally used sources not relied on in the immediately preceding V8 decisions.

- Eye Magazine, `Change the pace` (Eye 107, 2025): Roger Black's editorial-design rule is summarized as changing pace to create surprise rather than maintaining monotonous rhythm. The transferable principle used here is page-level variation in visual weight, not any literal layout.
  - https://eyemagazine.com/review/article/change-the-pace
- Eye Magazine, `Mondo magazines`: editorial design can make type and image actively interpret content; minimal typographic ingredients can still create strong thematic drama when scale and sequence change.
  - https://eyemagazine.com/feature/article/mondo-magazines
- It's Nice That, W—E Studio / Office issue 21: a grid can remain the underlying canvas while selected moments deliberately become tighter or more forceful to create tension.
  - https://www.itsnicethat.com/articles/w-e-studio-office-magazine-issue-21-graphic-design-publication-project-030624

Research observation only: `OBSERVED`. These references were used to formulate a local hypothesis; none was promoted directly into a project rule.

## Local hypothesis

If a chronology contains materially different narrative roles, rendering every event with identical row height, rule treatment, type scale and spacing can preserve UI/template rhythm even after cards have been removed.

For this page the roles are not equivalent:

- 2019 is the opening event;
- 2021 and 2024 are middle transitions;
- 2026 is the terminal / present-day event.

The visual rhythm should express that difference without inventing facts or adding decorative imagery.

## Bounded test

Created rollback-safe candidate `2196:2` from the verified V8 Story F root.

Changed only the right chronology:

1. Preserved all four years, event labels and notes as native editable text.
2. Preserved the chronology title, kicker, folio and closing text.
3. Removed visibility of the three equal inter-event rules; retained the single top rule because it still binds title to chronology body.
4. Promoted 2019 to a large opening beat.
5. Reflowed 2021 and 2024 as a compact middle pair.
6. Promoted 2026 to a large terminal beat in the existing rust accent.
7. Kept the Story left page unchanged.
8. Added no image, card, pill, badge, shadow, gradient, decorative English or new factual copy.

After verification, candidate `2196:2` was promoted to Current. Previous `2171:2` was renamed `ROLLBACK / V8 STORY F TYPOGRAPHIC ESSAY / 2026-08-22`, hidden, and preserved.

## Three-scale visual QA

- whole spread / 500 px: **PASS**
  - chronology reads immediately as opening → middle pair → terminal, not four equal rows;
  - 2026 has clear closing weight without overpowering the spread title.
- reading scale / 1400 px: **PASS**
  - event notes remain legible;
  - 2021 / 2024 middle pair is differentiated but still easy to scan;
  - no arbitrary decorative density was introduced.
- actual size / 1587×1123: **PASS**
  - title, 2019, middle pair, 2026 and close retain distinct hierarchy;
  - Japanese lines remain semantically intact.

## Structure QA

- visible native text: `25`
- right-page visible native text: `16`
- visible IMAGE roles: `0`
- text-box intersections: `0`
- 18 px text safe-area risks: `0`
- one-character Japanese line-tail heuristic: `0`
- equal event rules hidden: `R_EVENT_RULE_0 / R_EVENT_RULE_1 / R_EVENT_RULE_2`
- whole-page flattening: `NO`

## Before / after learning check

The new professional research changed the actual design decision. The previous V8 Story already had strong type and adequate whitespace; merely polishing spacing would have repeated the same medium-weight rhythm. The new test instead changed the **temporal hierarchy** itself.

The result also independently reproduces an existing local family of failures (`equal rows can survive card subtraction`) in a different editorial role: chronology rather than guide/index. This is stronger evidence that equal semantic weighting can be an AI/template fingerprint even without visible cards.

## Comparison truth

- V6 JB `2144:2` remains much stronger for photographic travel desire and Rurubu-like immediacy.
- V8 Story Q `2196:2` is stronger than V8 Story F `2171:2` for book/editorial pacing and anti-template chronology.
- This does **not** make V8 the global winner.

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new Figma image placement: `0`
- V6/V7 image reuse: `0`

No generation → Drive → Figma closure is claimed in this run. The improvement is a verified editorial-structure change, not an asset-production claim.

## Decision

`STORY_Q_ADOPTED / VERIFIED_LOCAL / V8_STORY_CURRENT / NOT_GLOBAL_WINNER / NOT_PRINT_READY`
