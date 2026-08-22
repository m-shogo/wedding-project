# RSL-206 — Back-cover reading gate vs equal functional index

Date: 2026-08-22
Source scope: Rurubu WEDDING
Source role: V8 Outer / back cover
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Outer AA's back-cover navigation was functionally correct and already free of cards, but all five entries had equal scale/cadence. The navigation therefore read as a generic list detached from the publication's editorial hierarchy.

## Root-cause hypothesis

Removing UI containers is not enough. When a functional index contains a genuine entry point but all entries receive identical visual weight, the reading path can remain template-like.

## Professional principle tested

Fresh professional references emphasized that book covers should culminate the book's internal concept/system and that typographic hierarchy should come from content, logic and clarity rather than surface decoration.

Test principle: before adding decorative marks, let a functional navigation system expose the publication's real entry hierarchy when the content genuinely supports it.

## Bounded test

Outer AB `2218:2`:

- added native reader-facing label `この本の中身`;
- preserved all five native entries and order;
- enlarged only `01 ふたり` because it is the reader's first editorial role;
- moved the existing functional rule so it binds label and index rather than crossing the first entry;
- kept the front cover unchanged;
- added no new image or decorative module.

First draft failure: the moved/enlarged first entry crossed the existing rule. The draft was not promoted. The rule was repositioned and QA repeated.

## Evidence

- 500px whole-item: PASS
- 1400px reading scale: PASS
- 1587×1123 actual size: PASS
- visible native text: 12
- IMAGE: 1
- text intersections: 0
- 18px safe risk: 0
- Japanese one-character explicit-line heuristic: 0
- rollback: AA `2216:2` hidden and preserved

Detailed evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V8-OUTER-AB-BACK-COVER-READING-GATE-QA-2026-08-22.md`

## Failure fingerprint

`F-RSL-206-FUNCTIONAL-INDEX-REMAINS-GENERIC-WHEN-EVERY-ENTRY-HAS-EQUAL-VISUAL-WEIGHT`

Operation/capability: editorial hierarchy of functional navigation
Environment: Figma V8 Outer back cover
Symptom: correct index reads as a generic equal list
Likely cause: semantic entry role not represented in visual hierarchy
Replacement method: test reader-entry weighting before adding decoration
Stop condition: do not force unequal weighting when the content has no defensible entry/priority distinction

## What must NOT transfer

Do not transfer:

- the exact navy field;
- the 34px/20px scale relationship;
- the line position;
- `この本の中身` wording;
- Rurubu section order;
- V8 cover composition.

## Cross-item applicability hypothesis

Other physical editorial artifacts with functional indexes/navigation may benefit from checking whether equal visual weighting conflicts with a genuine reading-entry hierarchy. Receiving items must independently verify this and must not invent priority merely to create visual variation.

## Next receiving-item experiment

Only test in another item where a real reader-entry distinction exists. If all entries are semantically equal, preserve equality rather than forcing hierarchy.