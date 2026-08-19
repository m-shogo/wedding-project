# ADD-04 受付サイン — V3 Route Endpoint Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Date: 2026-08-19
Start authority SHA: `5f046247a54c464de5cf687a9ee80c5fb8ede344`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `qWlF9THLR1G76hLcx1zYOx`
- groom selected: `16:2 / CLEANROOM_V3_ADD04_GROOM_TYPO_BAND`
- bride selected: `16:17 / CLEANROOM_V3_ADD04_BRIDE_TYPO_BAND`
- groom long-copy proof: `16:32` (hidden after QA)
- bride long-copy proof: `16:47` (hidden after QA)
- Drive authority: `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r / ADD-04_受付サイン`

## Visible problem

Fresh whole-item and actual-size screenshots showed that the lower direction route ended in an L-shaped destination tick/cap on both groom and bride signs. The line already had a clear semantic role as the direction field baseline, while the extra vertical tick plus short cap did not encode a confirmed destination, turn, stand edge, cut, or other physical instruction.

At whole-item scale the added endpoint made the simple route read closer to a slider/progress/control glyph than a restrained print rule. This matched the already-promoted neutral project rule that non-semantic endpoint/checkpoint markers should be tested for subtraction when a line or arrow already carries the functional meaning.

## Bounded change

Preserved unchanged:

- black reception band;
- Japanese `新郎側受付 / 新婦側受付` hierarchy;
- bilingual `GROOM RECEPTION / BRIDE RECEPTION` artifact labels;
- date/location context;
- native optional-name auto-layout;
- native `[方向]` field;
- functional horizontal `PATH_DIRECTION_ROUTE` line;
- all sizes, colors, typography, safe-area behavior and long-copy reflow.

Hidden only:

- groom selected `16:14 / NODE_DESTINATION`
- groom selected `16:15 / NODE_DESTINATION_CAP`
- bride selected `16:29 / NODE_DESTINATION`
- bride selected `16:30 / NODE_DESTINATION_CAP`
- matching nodes in groom stress `16:44 / 16:45`
- matching nodes in bride stress `16:59 / 16:60`

Rollback copies created before mutation:

- `25:2 / ROLLBACK_ADD04_V3_PRE_ROUTE_ENDPOINT_SUBTRACTION_GROOM_SELECTED_2026-08-19`
- `25:17 / ...BRIDE_SELECTED...`
- `25:32 / ...GROOM_STRESS...`
- `25:47 / ...BRIDE_STRESS...`

All rollbacks are hidden.

## QA

Three-scale review on groom selected:

- whole / 500px: PASS; reception hierarchy remains immediate and the lower field reads less like a UI control;
- reading scale: PASS;
- actual/native `740×1050`: PASS; the remaining route is a simple, purposeful print rule.

Long-copy proof:

- groom stress was temporarily shown at native `740×1050` after the change;
- long optional name and long direction copy still reflow without clipping;
- visible text outside root: `0`;
- proof returned to hidden state after inspection.

Structure readback after adoption:

- groom selected: visible native texts `6`, outside `0`;
- bride selected: visible native texts `6`, outside `0`;
- groom stress: outside `0`, hidden;
- bride stress: outside `0`, hidden;
- all eight endpoint/cap nodes are hidden;
- IMAGE fills added: `0`;
- generated assets required: `0`;
- Drive writes: `0`.

## Decision

`ADOPTED`.

The route line itself is retained because it still groups and visually anchors the direction role. Only the non-semantic L-shaped endpoint was removed. This is not a blanket rule to remove destination markers: real wayfinding nodes, station markers, trim/punch semantics, or confirmed directional endpoints must remain when they carry actual meaning.

## Learning status

This run independently applies an already promoted cross-item rule rather than creating a new lesson. No new shared-learning entry is needed.
