# 2026-08-16 — Rurubu V6 AI/AJ editorial binding experiment

Scope: Rurubu WEDDING only
Status: `VERIFIED_LOCAL`

## Visible problem

AF/AG had removed many obvious Web/UI patterns, but fresh live Figma screenshots still showed residual template rhythm: profile facts floated like a form, Q&A remained close to six equal modules, chronology events still separated into photo-caption islands, and the final WEDDING event lacked enough thumbnail dominance.

## Principle tested

Use **unequal photo hierarchy + stronger native headline scale + a minimum number of purposeful flat editorial anchors** before adding more decoration.

The test intentionally avoided new cards, rounded containers, generic shadows, gradients, or a return to route-diagram UI.

## Expected improvement

- more recognizable Japanese travel-magazine rhythm at thumbnail scale;
- stronger hierarchy and reading path;
- less template/grid feeling;
- preserve native text and replaceable photo roles;
- avoid fragile Figma micro-decoration.

## Regression risks

- accent rules becoming UI dividers;
- arbitrary rotation reading as fake scrapbook randomness;
- dominant photos crowding copy/safe area;
- WEDDING endpoint treatment colliding with chronology content.

## Bounded tests

### AJ `1364:2`

- enlarged profile hero;
- unequal overlapping snapshot cluster;
- compact profile data rail;
- lower pull-quote anchor;
- staggered native Q&A without cards;
- dominant Memories image with overlapping support crop.

### AI `1363:125`

- stronger title scale and feature-photo cluster;
- unequal event photo scale/position/rotation;
- short semantic color rules instead of card/diagram containers;
- WEDDING converted into the dominant endpoint with native caption strip + large final photo;
- old route rail remained hidden.

## QA / corrections

The first structure audit found:

- AJ profile label/value intersections and right-edge safe-area risks;
- AJ question/answer edge intersections;
- AI endpoint collisions around event 4 / WEDDING / `06`.

All were repaired before promotion.

Final:

- AJ Profile: 18 native text / 4 IMAGE / 0 text collisions / 0 safe risks
- AJ Q&A: 22 native text / 2 IMAGE / 0 text collisions / 0 safe risks
- AI chronology: 27 native text / 9 IMAGE / 0 text collisions / 0 safe risks

Three-scale screenshot QA passed at 500 px, 1400 px, and actual 794×1123 page size.

## Decision

ADOPT:

- AJ `1364:2` as preferred Profile/Q&A
- AI `1363:125` as preferred Story/chronology

KEEP FOR COMPARISON:

- AF `1355:2` hidden
- AG `1356:2` hidden

Start Here now reads:

`V5 FU/FX · V6 M + AJ/AI INSIDE STUDIES · V7 HOLD`

## Generated-asset status

No new generation was counted as progress. Existing Rurubu V6 Drive section masters were re-read, but quality-preserving binary transport remains unresolved; none of those masters is claimed as newly placed or visually adopted in AJ/AI.

## Next application

Continue judging V6 as an editorial system, not a sequence of isolated modules. Before adding decoration, test whether scale contrast, photo overlap, native typography, and one or two semantic anchors can solve the visible defect. Keep V7 on HOLD until V6 is genuinely coherent.
