# RSL-160 — Selective clean-room promotion can beat whole-version replacement

Source scope/item: Rurubu WEDDING / V6 outer
Date: 2026-08-20
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

HN's front cover retained a stacked header → hero → lower-module rhythm that read weaker than the strongest V6 inside spreads, while HN's back cover had already matured into a strong photo-led travel-note + chronology page.

## Evidence before change

- current outer HN: `2029:2`;
- HN 500px whole-item comparison: readable and structurally sound, but front masthead behaved as a full-width section rather than a photo-attached editorial support;
- HN back chronology remained dense, legible and visually stable.

## Root-cause hypothesis

A clean-room redesign should not be promoted or rejected only as one monolithic version. When one page/role is the actual bottleneck, a whole-spread redesign can improve that role while regressing an already-strong neighboring role. The strongest verified result may therefore be a selective hybrid if structure, provenance and rollback remain intact.

## Bounded test

1. IC `2049:47` rebuilt both outer pages in a materially different clean-room composition using existing verified Rurubu image fills and native-text sources.
2. IC front increased dominant-photo ownership, changed the full-width masthead into a bounded support over the photograph, and reduced module/card reading.
3. IC back simplified the chronology too far and lost useful information density.
4. ID `2051:2` therefore retained HN's back and inserted IC's stronger front into a rollback-safe HN duplicate.
5. HN and IC remained hidden comparison/rollback evidence.

## Expected improvement

- stronger thumbnail cover impact;
- less stacked-web-section reading;
- preserve the already-successful back-cover information density;
- avoid sunk-cost preservation without discarding proven neighboring work.

## Regression risk

- hybrids can become incoherent if the two selected halves do not share type/color/photo grammar;
- selective promotion can hide structural duplication if old page roles are not explicitly hidden;
- clean-room fragments must not inherit unverified asset/provenance state merely because they look stronger.

## Three-scale evidence

### Whole-item / thumbnail

ID 500px: PASS and preferred. Front is more photo-led than HN; back retains HN density. IC whole-spread was not preferred because its back became too sparse.

### Reading / page scale

ID 1400px: PASS. Masthead, Feature 01 and lower Feature 03/support-photo hierarchy remain distinct; back chronology remains intact.

### Actual-size / detail

ID ≈1588×1123: PASS for dummy-design QA. Small cover lines/caption remain legible; no obvious crop or type clipping was observed.

## Figma / Drive / GitHub evidence

- preferred ID: `2051:2`;
- HN hidden rollback: `2029:2`;
- IC hidden clean-room comparison: `2049:47`;
- Start Here summary: `845:27` now identifies `V6 ID`;
- effective visible native text: `35`;
- effective visible IMAGE fills: `5`;
- effective text intersections: `0`;
- 18px safe-area risk: `0`;
- Drive V6 root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- new generated assets: `0`;
- new Drive writes: `0`;
- new image-hash claims: `0`;
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-ID-OUTER-CLEANROOM-HYBRID-QA-2026-08-20.md`;
- status commit chain begins at `91ffcb606781d3b851ec7fd85c2da047e75ed44e`.

## Failure fingerprint

`FIGMA_HOST_SETPLUGINDATA_UNSUPPORTED`

Initial IC build ended with unsupported `setPluginData`, causing an atomic rollback. The corrected invocation removed that unsupported metadata call rather than retrying the same failing mechanism.

A separate semantic-name cleanup accidentally matched chronology title names while targeting failed numeral clones; screenshot QA exposed the regression before promotion. The recovery rebuilt explicit number/title/description roles.

## Adopted / rejected status

- ID selective hybrid: `ADOPTED / VERIFIED_LOCAL`.
- IC whole-spread promotion: `REJECTED AS WHOLE / FRONT PRINCIPLE RETAINED`.
- HN whole-spread preferred state: `SUPERSEDED BY ID`, preserved as rollback.

## What must remain Rurubu-specific

Do not transfer:

- HN/IC/ID page geometry;
- Yokohama imagery;
- magenta/cyan/yellow palette;
- current Rurubu WEDDING masthead lockup;
- chronology positions;
- photo ratios;
- Rurubu-like travel-magazine visual grammar.

## Cross-item applicability hypothesis

When a clean-room redesign improves one role/page but weakens another already-strong role/page, another item may independently test selective promotion rather than treating the new candidate as all-or-nothing. The transferable method is:

`identify actual bottleneck → build clean-room alternative → score roles/pages separately → retain proven neighboring work → combine only if visual/system coherence survives three-scale QA → preserve full rollback`.

This is not a rule to mix versions casually. The receiving item must verify coherence, native structure, asset authority and rollback safety in its own context.
