# Rurubu V6 feedback — DS Memory Spots semantic truth repair

Date: 2026-08-18
Source: Rurubu WEDDING only

## Visible problem

Preferred DR looked visually convincing, but its SPOT 03 image did not support the page's explicit Yokohama destination claim. The page was therefore aesthetically stronger than its factual visual authority.

## Root-cause hypothesis

Photo QA had emphasized provenance, dimensions, crop and editability, while destination-semantic authority was not yet enforced as an equally hard adoption gate.

## Bounded test

- preserve DR as rollback;
- clone to DS;
- inspect a retired night-view candidate instead of trusting its filename/ledger role;
- reject that preserved night-view after actual pixels showed a non-Yokohama European landmark scene;
- replace only SPOT 03 with the existing verified Yokohama skyline hash;
- keep the truthful skyline small enough to stay intrinsic-safe;
- change dependent copy/metadata to native Minato Mirai/sunset language;
- remove/shrink decoration that depended on the old oversized photo geometry.

## Expected improvement

- eliminate false destination implication;
- make the spot-guide editorial role trustworthy;
- preserve replaceability and native copy.

## Regression risk

The truthful skyline source is small, so the new SPOT 03 is less photographically dramatic. This is accepted until final legitimate destination photography exists.

## Three-scale evidence

- ~500px whole spread: PASS;
- ~1200px reading spread: PASS;
- right page actual `794×1123`: PASS.

Structure:

- right-page native text: `14`;
- right-page image roles: `2`;
- text/text collision: `0`;
- 18px text safe risk: `0`;
- SPOT 03: `238×218`, independently replaceable, existing verified skyline hash `644f449c3bf2001a94d4b822d2b55e2614c11042`.

## Status

`VERIFIED_LOCAL / ADOPTED`

Preferred:

- DS `1709:2 / PREFERRED / V6_INSIDE_DS_MEMORY_SPOTS_YOKOHAMA_TRUTH_REPAIR_2026_08_18`

Rollback:

- DR `1689:2 / ROLLBACK_HIDDEN / V6_INSIDE_DR_PRE_DS_MEMORY_SPOTS_2026_08_18`

## Learning

A smaller truthful image is better than a large destination-wrong image in a factual travel-guide role. File names, historic role labels and technical QA do not establish visual semantic authority; actual pixels must support the named place.

## What remains Rurubu-specific

Do not transfer the Yokohama skyline, Minato Mirai wording, page geometry, palette, spot numbering, photo sizes or exact magazine treatment.
