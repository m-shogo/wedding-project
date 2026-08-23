# RSL-248 — Generated travel photography must not inherit unearned documentary authority

Date: 2026-08-23
Source scope/item: Rurubu WEDDING / V7 Cafe+Table photo-art-direction authority

State: `OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL (AUTHORITY-ONLY)`

Fingerprint:

`F-RSL-248-GENERATED-TRAVEL-PHOTO-IMPLIES-DOCUMENTARY-AUTHORITY-FOR-UNVERIFIED-SPECIFIC-PLACE`

## Visible / production problem

The V7 Cafe/Table photo brief already rejected fake readable signage and generic tropical stock grammar, but did not explicitly distinguish a specific real venue/place photograph from a non-specific generated atmosphere image. A generated storefront, landmark-like façade or venue scene could therefore look editorially convincing while falsely implying that the publication had actually observed or photographed that real place.

## New professional observation

D&DEPARTMENT's primary-source `d design travel` editorial concept emphasizes actual local use/research, honest recommendations based on what the editors verified, local specificity, and photography that does not exaggerate the subject with special lenses. The transferable decision principle is not its visual style. It is that **travel-guide documentary authority is earned through observation/source truth rather than simulated by plausible imagery**.

Primary references:

- https://www.d-department.com/item/DDESIGNTRAVEL.html
- https://www.d-department.com/item/DD_TEXT_REPORT_6872.html
- https://www.d-department.com/item/DD_EVENT_67235.html

## Root-cause hypothesis

In a travel publication, native place-oriented copy can make an adjacent plausible generated image inherit more factual/documentary meaning than the image actually deserves. Merely banning fake text is insufficient. The photo role also needs an explicit truth classification:

- `SPECIFIC REAL PLACE` — requires real/licensed/official/reference-grounded image authority and factual verification;
- `GENERATED ATMOSPHERE` — may support a generic food/table/street mood but must not invent or imply a named real venue, distinctive real landmark, logo, readable sign or characteristic façade presented as documentary evidence.

## Bounded local test

Live V7 Cafe/Table photo authority `2305:2` received a new `SOURCE TRUTH` gate after a hidden rollback was created.

Figma evidence:

- current authority: `2305:2`
- hidden rollback: `2371:2`
- new source-truth label: `2371:27`
- new source-truth body: `2371:28`
- candidate selection `2305:26` now explicitly scores `source truth` as one of six dimensions
- current production Cafe/Table H3 `2311:2` was not mutated

Final authority-panel structure QA:

- visible text nodes: `26`
- text-box intersections: `0`
- panel: `1200×1098`
- text bottom: `1010`
- bottom reserve: `88 px`
- 500 px panel read: PASS
- native-size panel read: PASS

## Why this is not VERIFIED_LOCAL yet

The authority/process itself is implemented and QA'd, but no real Hawaii candidate set has yet been generated/selected and no final image has passed Drive → Figma → crop/hash/effective-PPI → three-scale production verification. Therefore this lesson must not be promoted as a proven photographic outcome.

## Regression risk

An over-broad interpretation could wrongly prohibit all generated travel atmosphere, or force a generic publication to source a named venue when the content does not require one. The gate is about **truth of the claim**, not format ideology.

## What remains Rurubu-specific

Do not transfer:

- Hawaii palette;
- Cafe/Table slot geometry;
- V7 high-energy travel-magazine grammar;
- food/title treatment;
- exact prompt negatives or candidate A/B/C structure.

## Cross-item applicability hypothesis

Any print/editorial item that presents a real location, venue, product, person or artifact beside generated imagery may independently test whether the generated image is acquiring documentary/factual authority it has not earned. The receiving item must use its own authority and facts; this entry does not authorize inspecting non-Rurubu production.

## Next local verification

Test actual materially different Cafe/Table photo candidates. A successful receiving candidate must prove source classification, semantic role, crop resilience, image quality and actual-size plausibility before this lesson may advance to `VERIFIED_LOCAL`.
