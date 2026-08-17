# RSL-087 — Bind correct secondary information before adding another module

Source scope/item: Rurubu WEDDING / V6 Story + chronology

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

In V6 DK, the Story lower secondary photo was visually weaker than its adjacent cream text field, while chronology events 02/04 were semantically correct but visually floated in open paper. The page was structurally sound yet still retained traces of an assembled-template reading.

## Evidence before change

- preferred source: DK `1647:2`;
- Story lower photo: `PHOTO / STORY_SUPPORT_2_REPLACEABLE`, 515×350;
- 02/04 already had native event copy but no strong visual binder between them;
- whole/page QA was previously safe, so the problem was editorial binding rather than missing information.

## Root-cause hypothesis

When existing secondary content is already correct, adding another card, generated decoration, or image can increase module/UI reading. A smaller intervention may be enough:

- strengthen an already-legitimate visual anchor within its role;
- add only minimal functional geometry that clearly binds related secondary information.

## Bounded test

Rollback-safe DM `1665:2` duplicated DK.

- Story secondary photo: `515×350 → 545×370`, same source/hash and replaceable role;
- one short cyan rule added between Story photo and native headline;
- one thin magenta rail plus tiny event ticks added to bind chronology 02/04;
- no new image, card, shadow, gradient, generated asset, or factual copy.

A first DM iteration also enlarged the Story headline. That caused body-copy collision and was rejected. The final candidate restored the proven DK headline/body scale before promotion.

## Expected improvement

- make the Story lower half read as one photo/type editorial beat;
- turn 02/04 from floating leftover copy into an intentional quiet side-trip path;
- increase print/editorial continuity without adding a new module.

## Regression risk

- a rail with no actual binding function becomes decoration/UI;
- enlarging a secondary photo may expose weak source fidelity;
- typography enlargement can consume variable-copy reserve and create collisions.

## Three-scale evidence

- whole spread DM `1665:2` at 900px: PASS;
- Story `1665:3`, native 794×1123: PASS;
- chronology `1665:27`, native 794×1123: PASS.

Structural evidence:

- Story: 12 native text, 4 visible IMAGE roles, absolute text collision 0, 18px text safe-area risk 0;
- chronology: 31 native text, 5 visible IMAGE roles, absolute text collision 0, 18px text safe-area risk 0.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- adopted: DM `1665:2`;
- Story page: `1665:3`;
- chronology page: `1665:27`;
- rollback: DK `1647:2` hidden after promotion;
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- QA evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AF-DL-DM-STORY-PHOTO-SIDE-TRIP-BINDING-QA-2026-08-18.md`.

## Adopted / rejected status

- enlarged-photo + minimal-binding treatment: `VERIFIED_LOCAL / ADOPTED`;
- over-enlarged Story headline: `REJECTED`, because it collided with body copy.

Normalized failure fingerprint:

`EDITORIAL_HIERARCHY_ENLARGEMENT_COPY_COLLISION`

If type enlargement hits the same bounded-copy reserve again without a structural change, stop enlarging typography and change the photo/type relationship instead.

## What must remain Rurubu-specific

Do not transfer the magenta/cyan colors, rail position, event numbering, travel-magazine chronology arrangement, exact photo choices, type scale, or wording.

## Cross-item applicability hypothesis

On another print artifact, when correct secondary information visually floats or looks like leftover template content, independently test whether a minimal binding treatment to an existing photo/text path improves whole-item reading before adding another card, field, image, or decorative module.

The receiving item must prove that the binder has a real function at whole-item scale; otherwise reject it.
