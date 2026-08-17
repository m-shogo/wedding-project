# RURUBU V6 AF + DL/DM — Story Photo / Side-Trip Binding QA

Date: 2026-08-18
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Result

`DM VERIFIED_LOCAL / PREFERRED`

Current preferred set after this experiment:

- Outer AF `1655:2` — unchanged;
- Profile/Q&A DL `1659:2` — unchanged;
- Story/chronology DM `1665:2` — promoted;
- Story/chronology DK `1647:2` — hidden rollback.

V7 was not edited.

## Visible problem

DK already had a strong photo-led chronology, but two areas still read as assembled Figma content rather than one continuous magazine composition:

- the lower Story photo was visually subordinate to a large cream text field;
- chronology events 02/04 were semantically secondary but visually floated in the cream field.

## Hypothesis

Existing legitimate photography and native copy were sufficient. Before adding another photo/card/generated decoration, bind the existing roles more strongly:

1. enlarge the already-valid lower Story photo within its replaceable role;
2. use a minimal rule between that photo and the native headline;
3. bind 02/04 with one thin side-trip rail so the quiet region reads as deliberate.

## Bounded experiment

Rollback-safe duplicate: DM `1665:2` from DK `1647:2`.

Story:

- `PHOTO / STORY_SUPPORT_2_REPLACEABLE`: `515×350 → 545×370`;
- image hash unchanged: `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- add `DECOR / STORY_TEXT_BINDING_RULE`, 96×5 after correction;
- first attempt enlarged the headline and caused visible body collision; that treatment was rejected and DK headline/body scale restored before promotion.

Chronology:

- add `DECOR / SIDE_TRIP_BINDING_RAIL`, 5px wide;
- add small `SIDE_TRIP_TICK_02` and `SIDE_TRIP_TICK_04` markers;
- 01/03/05 photo-led milestones, dates, native copy and WEDDING endpoint unchanged;
- all image hashes unchanged.

## Three-scale visual evidence

- whole spread `1665:2`, 900px render: PASS and stronger than DK;
- Story `1665:3`, native 794×1123: PASS;
- chronology `1665:27`, native 794×1123: PASS.

The accepted correction keeps the Story headline readable while allowing the lower photo to carry more of the page. On chronology, the thin magenta rail makes 02/04 read as one quiet editorial path without creating cards or another large container.

## Structural QA

Story `1665:3`:

- visible native text: 12;
- visible IMAGE roles: 4;
- absolute text collisions: 0;
- 18px text safe-area risks: 0.

Chronology `1665:27`:

- visible native text: 31;
- visible IMAGE roles: 5;
- absolute text collisions: 0;
- 18px text safe-area risks: 0.

Replaceable image roles and hashes were preserved. No external raster was added.

## Asset lifecycle truth

- generated this run: 0;
- newly adopted generated assets: 0;
- Drive saves: 0;
- external binary placements: 0;
- new image hashes: 0;
- existing replaceable photo geometry changed: 1;
- simple functional Figma geometry created: 4 nodes;
- visually verified: YES;
- structurally verified: YES;
- rollback preserved: YES.

Drive V6 root was re-read before work:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Generated Profile/Q&A/Timeline/Memories masters remain stored but unadopted.

## Failure / correction evidence

Initial DM enlarged `TEXT / STORY_ANCHOR_2` and pushed the native Story body into the headline. This was treated as a failed local iteration, not progress. The accepted DM restores the proven headline/body scale and keeps only the successful photo/binding changes.

Normalized fingerprint:

`EDITORIAL_HIERARCHY_ENLARGEMENT_COPY_COLLISION`

Stop condition: do not solve weak editorial rhythm by repeatedly enlarging native type when existing copy reserve is already bounded. Change photo/type binding or container geometry instead.

## Status

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Only the method may transfer: when correct secondary content visually floats, test minimal functional binding to an existing reading path before adding another card or asset.

Rurubu-specific palette, rail coordinates, photo choices, chronology geometry and typography do not transfer.
