# RSL-122 — Container subtraction must revalidate inherited text context and containment

Source scope/item: Rurubu WEDDING / V6 Outer FH

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The preferred EZ back-cover chronology still used several short colored rules and a filled navy WEDDING terminal field. Under an otherwise photo-led back cover, the lower chronology read closer to a UI/timeline module than a Japanese travel-magazine closing page.

## Evidence before change

- live preferred Outer EZ `1836:2`
- back page `1836:3`
- filled terminal field `V6_A_YEAR_RAIL_5`
- terminal date and `WEDDING` were white native text because they lived on the dark field
- whole-spread review showed the chronology region as the screenshot-visible weak point among the current V6 spreads

## Root-cause hypothesis

The sequence already had enough order through native milestone numbers, dates and titles. The container/rules were no longer required for binding. However, removing a container changes the visual and structural context of all copy that depended on it, so the text cannot be assumed safe merely because it remains native.

## Bounded test

Rollback-safe FH `1854:2` was cloned from EZ and changed only on the back chronology:

- hide redundant magenta/cyan/yellow chronology rules;
- hide the filled navy WEDDING terminal field and its yellow top rule;
- preserve `01 / 03 / 05` as large unequal milestones;
- preserve `02 / 04` as quiet bridge beats;
- rebuild `06 / 2026.10.24 / WEDDING` as native typography on the cream field;
- preserve photos, photo hashes, front-cover composition and factual chronology copy.

## Failure fingerprint observed during the test

`CONTAINER_SUBTRACTION_INHERITED_TEXT_CONTEXT_FAILURE`

Symptoms:

1. `2026.10.24` and `WEDDING` inherited white fills from the removed dark terminal context and became too low-contrast on cream.
2. A cloned `06` text node initially existed at Figma-page level rather than inside the back-page frame.

A first repair script also failed atomically because one name lookup was wrong; no mutation was applied. Direct node-ID readback was used before the next write.

Likely cause class:

- typography/contrast assumptions encoded by the former container;
- clone/reparent semantics not verified after node creation;
- selector/name assumptions used before direct readback.

Replacement method / stop condition:

- after container subtraction, explicitly re-check text fill/contrast against the new background;
- verify created/cloned text parent IDs rather than assuming containment;
- if a write fails atomically, inspect direct node IDs before retrying instead of cosmetic repetition.

## Final bounded repair

- reparented `06` into back page `1854:3`;
- reused existing Rurubu magenta for `06`;
- reused existing Rurubu navy for date and `WEDDING`;
- added a typographic gutter between `06` and the date/WEDDING stack.

## Expected improvement

Reduce the timeline/UI feeling without weakening chronology comprehension or editability, while keeping all facts native and later-changeable.

## Regression risk

- low contrast when text inherited from a removed dark/light field;
- newly cloned text escaping the semantic page/frame;
- excessive subtraction making chronology too quiet;
- larger native milestones creating hidden text collisions.

## Three-scale evidence

- 700px whole spread: PASS
- 1200px whole spread: PASS
- back actual-size `1854:3` = `794×1123`: PASS
- back native text: `25`
- front native text: `13`
- final text collisions: `0`
- 18px text safe-area risks: `0`
- page-level stray milestone nodes after repair: `0`

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted FH: `1854:2`
- back page: `1854:3`
- rollback EZ: `1836:2` hidden after promotion
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FH-FG-LIVE-RESTORE-CHRONOLOGY-QA-2026-08-19.md`

## Adopted / rejected / blocked status

- initial subtraction state: `REJECTED_AS_IS`
- final repaired FH: `VERIFIED_LOCAL / ADOPTED`
- no generated asset, Drive write, binary placement or new image hash was used

## What must remain Rurubu-specific

Do not transfer the exact magenta/cyan/yellow/navy palette, milestone sizes, Yokohama chronology, back-cover coordinates, WEDDING treatment, or travel-magazine art direction.

## Cross-item applicability hypothesis

When another print artifact removes a filled field, banner, card or other container, independently revalidate the copy that depended on that field for contrast, position, grouping and containment. The transferable rule is not “remove containers”; it is “subtraction changes context, so revalidate inherited text and parent structure before adoption.”

## Next receiving-item experiment

On a materially different wedding print artifact, if a non-functional filled field is removed, compare retained vs removed at whole-item scale and explicitly inspect text color/contrast, parent containment, dynamic-copy safety and actual-size readability before promotion.
