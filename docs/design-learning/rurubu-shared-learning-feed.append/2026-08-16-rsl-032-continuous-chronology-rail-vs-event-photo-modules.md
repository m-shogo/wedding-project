# RSL-032 — A chronology can read more editorially when not every event owns a photo module

Date: 2026-08-16
Source scope/item: Rurubu WEDDING / V6 Story-Chronology
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The previous AI chronology was structurally safe but gave all six events their own photo/module treatment. At thumbnail and actual size this created repeated islands and weakened one continuous reading path.

## Root-cause hypothesis

A chronology does not need one equally explicit photo container per semantic event. When all events have equal visual treatment, the page can become a diagram or card grid even without visible card backgrounds. Native text can carry the full chronology while a smaller number of large photo anchors provide editorial mass.

## Bounded tests

1. AN `1382:132` increased stagger and retained many competing photo modules. Result: `REJECTED`; crowding and text/image competition increased.
2. AO `1383:2` used one continuous native 01–05 rail, only three supporting event-photo anchors, the existing feature-photo cluster, and a WEDDING endpoint band. Result: visually stronger than AI at all three scales.
3. AP `1384:2` retained AO chronology and separately enlarged/rebalanced the Story page photo hierarchy, reducing the lower dead field without adding new decoration.

## Expected improvement

- clearer chronological reading at thumbnail scale;
- less implicit dashboard/grid semantics;
- stronger photo-led editorial hierarchy;
- preserve every date/title/copy as editable native text;
- fewer visible image roles without losing chronology.

## Regression risk

Reducing event photos too aggressively can make a chronology feel like a plain list or newspaper column. The remaining photographs must be large and meaningfully placed. A dark endpoint band can become UI-like if it does not genuinely close the reading sequence.

## Three-scale evidence

AP current preferred:

- whole spread / 500 px: PASS;
- reading spread / 1400 px: PASS;
- actual Story / native 794×1123: PASS;
- actual chronology / native 794×1123: PASS;
- chronology native text: `27`;
- chronology visible IMAGE roles: `6`;
- chronology text collisions: `0`;
- chronology 18 px text safe-area risks: `0`;
- Story native text: `7`;
- Story visible IMAGE roles: `3`;
- Story text collisions: `0`;
- Story 18 px text safe-area risks: `0`.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- rejected AN: `1382:132`, hidden
- AO chronology proof: `1383:2`, hidden rollback after AP promotion
- preferred AP: `1384:2`
- AP Story page: `1384:3`
- AP chronology page: cloned verified AO right page
- previous AI rollback: `1363:125`, hidden
- Start Here: `845:27` = `V5 FU/FX · V6 O + AM/AP INSIDE STUDIES · V7 HOLD`
- Drive Timeline v2 master: `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8`
- evidence: `01_paper-items/rurubu-wedding/RURUBU-V6-O-AM-AP-QA-2026-08-16.md`
- evidence commit: `9d46000eeaa9368a30bac09c6c6b3caeacad46df`

## Generated-asset transport observation

A new Drive raw-download path successfully materialized the high-resolution Timeline master, but Figma single-use upload submission still failed at `mcp.figma.com` DNS resolution. This confirms the source master is reachable and the remaining failure is the Figma submit network boundary, not asset absence. No generated decoration was adopted from transport alone.

## Adopted / rejected / blocked status

- AN: `REJECTED`
- AO chronology principle: `VERIFIED_LOCAL`
- AP combined Story/chronology: `VERIFIED_LOCAL`, current preferred
- quality-preserving generated Timeline binary placement: `BLOCKED` by repeated DNS fingerprint

## What must remain Rurubu-specific

Do not transfer the exact 01–05 coordinates, event colors, WEDDING band, photo choices, Japanese copy, cream field, cover/inside relationship, or Rurubu-like travel-magazine grammar.

## Cross-item applicability hypothesis

For another print artifact with a repeated chronological or sequential story, independently compare:

1. one visual module/photo per event;
2. a continuous native text sequence with fewer, stronger visual anchors.

Judge whole-item hierarchy first. Preserve one-photo-per-event when each image has real semantic necessity; do not turn this into a universal subtraction rule.
