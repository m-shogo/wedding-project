# RSL-266 — V8 AW10 reproduction

Date: 2026-08-25
Source scope/item: Rurubu WEDDING / V8 Profile+Q&A

Fingerprint: `F-RSL-266-SHORT-PLACEHOLDER-HIDES-VARIABLE-PROFILE-COPY-WRAP-FRAGILITY`

State: `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`

## Visible problem

V8 AW9 used short native `回答待ち` placeholders. Its current screenshot looked safe, but a rollback-safe synthetic Japanese long-copy stress exposed rendered overflow from fixed-height `220×32` person-answer text boxes and weak semantic wraps in Q1–Q3.

Most importantly, bounding-box collision QA alone did not catch the worst defect: glyphs visibly extended beyond the fixed-height text node and ran into the nearby photo while the node's own geometry remained only 32px high.

## Root-cause hypothesis

A short placeholder can hide both insufficient text measure and fixed-height clipping/overflow. Geometry-only QA can therefore produce a false sense of safety when rendered text exceeds the node's nominal box.

## Consumed neutral learning

`NRSL-001` was consumed only as a neutral QA-method hypothesis: after a material spatial decision involving dynamic copy, rerun realistic stress at the new geometry. No non-Rurubu production layout, palette, node, Drive asset or item-specific path was inspected or copied.

## Bounded experiment

Failed AW9 stress:

- `2553:2 / REJECTED QA STRESS / ... / FIXED-SHORT-ANSWER-BOX OVERFLOW / HIDDEN`
- synthetic test only; never factual content.

AW10 `2555:2` changed only native variable-copy reserve:

- person answer boxes: `220×32 → 270×90` and `350×90`;
- couple photo moved down 50px to preserve a clear answer/photo relationship;
- closing note moved down 44px;
- Q1/Q2/Q3 answer widths increased to `295 / 330 / 620` after the first AW10 stress still showed weak Japanese phrase breaks;
- no font-size reduction, visible container, fabricated answer or imageHash change.

Verified AW10 stress:

- `2555:36 / VERIFIED QA STRESS / V8 AW10 / SYNTHETIC LONG COPY / NOT FACT / HIDDEN`.

## Evidence

Production-copy AW10:

- 500px: PASS;
- 1400px: PASS;
- 1587×1123: DESIGN QA PASS;
- native text `20`;
- text intersections `0`;
- 18px edge risks `0`;
- Japanese→Inter mismatch `0`.

Synthetic stress:

- 500px: PASS;
- 1400px: PASS;
- rendered person answers no longer run into the photo;
- Q1–Q3 line breaks improved after bounded width correction;
- text intersections `0`;
- edge risks `0`;
- Japanese→Inter mismatch `0`.

Promotion:

- AW10 `2555:2` current at `x=1800 / y=8500`;
- AW9 `2550:2` hidden rollback at `x=302000`;
- AW8 remains earlier hidden rollback;
- all 12 V7/V8 current roots remain on page `2052:2`, visible and non-overlapping.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-AW10-PROFILE-LONG-COPY-RESILIENCE-QA-2026-08-25.md`.

## Why this strengthens RSL-266

The method now improved two materially different Rurubu profile systems:

- V7 K4/K8: high-energy travel-magazine profile fields needed realistic Japanese copy reserve.
- V8 AW10: restrained book profile needed fixed-height answer reserves and semantic line-measure correction without adding visible modules.

The shared lesson is not a width, coordinate or style. It is that placeholder fit is not variable-content readiness, and screenshot truth must accompany geometry checks when fixed-height text is involved.

## Limits / do not transfer

Do not transfer AW10's exact widths, coordinates, Q&A wording, portrait position, navy/cream styling or `036.jpg` to other items. Actual final answers still require fresh REAL CONTENT QA; this stress does not guarantee arbitrary text length.

## Cross-item applicability hypothesis

A materially different Wedding print item with short unresolved placeholders can independently test:

`short placeholder → realistic language-specific stress → rendered screenshot + geometry QA → bounded measure/space correction → current-copy revalidation`.

Cross-item promotion requires independent receiving-item evidence.
