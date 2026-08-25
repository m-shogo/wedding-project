# RSL-269 — V8 AW9 reproduction

Date: 2026-08-25
Source scope/item: Rurubu WEDDING / V8 Profile+Q&A

Fingerprint: `F-RSL-269-TRUTH-SAFE-PROFILE-REMAINS-ABSTRACT-DESPITE-AVAILABLE-VERIFIED-COUPLE-IMAGERY`

State: `VERIFIED_LOCAL_MULTI-SYSTEM / HIRES-ASSET-BLOCKED → CROSS_ITEM_CANDIDATE`

## Visible problem

V8 AW8 was already safe from fabricated identity claims, but its only visible image was a generic object still-life. After verified real-couple Hawaii imagery existed, the page remained more abstract than necessary for the editorial role `ふたりの輪郭。`.

## Root-cause hypothesis

Avoiding fabricated portraits can become an overcorrection. Once verified subject imagery exists, keeping a generic still-life merely because it is safe may weaken profile specificity and book pacing.

## New professional observations

- SPD / Anna Alexander on *Interview*: Q&A editorial art can be carried by meaningful portraiture rather than generic supporting imagery.
- SPD / *Southern Women*: portrait-heavy books require pacing, varied scale/angles and images that show subjects in their world rather than repeating one profile formula.
- Aperture / Stuart Smith: picture edit and sequence decisions should remove images that do not strengthen the book concept.

These observations are not rules by themselves. They motivated a bounded local test.

## Bounded experiment

AW9 `2550:2` was cloned from AW8 `2459:2`.

Only image role changed:

- old generic object still-life → verified shared-couple Hawaii `036.jpg` screen derivative;
- image node `2550:35`;
- imageHash `c80602f1881db70f3a005651f982a0f38b294a9d`;
- geometry unchanged at `235×190`;
- no copy, Q&A hierarchy, typography, palette or page geometry change;
- image is not assigned as bride-only, groom-only or answer-specific evidence.

## Evidence

Three-scale design QA:

- whole-item / 500px: PASS and more immediately human than AW8;
- reading / 1400px: PASS;
- actual-size / 1587×1123: DESIGN QA PASS;
- native text `20`;
- visible IMAGE `1`;
- text intersections `0`;
- 18px edge risks `0`;
- Japanese→Inter mismatches `0`;
- Figma parent `2052:2`.

Asset truth:

- Figma intrinsic derivative `350×233`;
- high-resolution role placement not verified;
- print approval blocked.

Promotion:

- AW9 `2550:2` current at `x=1800 / y=8500`;
- AW8 `2459:2` hidden rollback at `x=300000`.

Evidence path: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-AW9-VERIFIED-COUPLE-EVIDENCE-QA-2026-08-25.md`.

## Why this strengthens RSL-269

The same principle now improved two materially different Rurubu systems:

- V7 K8: high-energy Japanese travel-magazine profile used verified couple imagery while removing generic Q&A dummies.
- V8 AW9: restrained book profile kept only one small verified couple image as a quiet human evidence beat.

The composition, scale, density and visual grammar are different. The transferable part is the judgment, not the layout.

## What must NOT transfer

Do not copy:

- V7/V8 exact photo positions or sizes;
- `036.jpg` into unrelated Wedding items;
- cream/navy or coral palette;
- Q&A layout;
- the assumption that every profile needs a portrait.

## Cross-item applicability hypothesis

When a materially different Wedding item depicts real people and verified subject imagery becomes available, re-audit generic or abstract placeholder art. Test whether a truth-safe subject image improves specificity without inventing identity claims, flattening item-specific art direction, or compromising print-quality gates.
