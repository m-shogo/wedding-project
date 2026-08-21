# RSL-192 — Nominal semantic ownership is not enough; a visual must earn editorial space

Source: Rurubu WEDDING / V8 Memory+Guide K
Date: 2026-08-21
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A legitimate generated/composed image had an explainable concept (`contour/orbit/atlas` for memory/navigation), but at whole-item and reading scale it still read as abstract image-shaped mass and contributed little destination specificity, documentary evidence, atmosphere, or actual navigation.

## Root-cause hypothesis

`Has a concept` is a weaker gate than `performs an editorial job`. A visual can have nominal semantic ownership and still fail to justify its area in the publication.

## Bounded experiment

On rollback-safe V8 Memory/Guide only, hide the generated contour image and unrelated solid block; preserve the spread's distinct role using a sensory native-text memory essay + compact four-scene score on the left and a four-part guide/index on the right. Do not copy V6/V7 composition or imagery.

## Evidence

Figma current: `2181:30`.
Previous: `2164:25` hidden rollback.
500px whole-item PASS; 1400px reading PASS; 1587×1123 actual-size PASS; native text 21; IMAGE 0; text intersections 0; 18px safe risk 0.

Detailed evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-MEMORY-K-MEMORY-ESSAY-INDEX-QA-2026-08-21.md`.

## Design failure fingerprint

`F-RSL-192-ABSTRACT-IMAGE-WITH-NOMINAL-SEMANTIC-OWNER-BUT-WEAK-EDITORIAL-PAYOFF`

Before retaining a generated/composed visual, ask what concrete job it performs: specific meaning, evidence, atmosphere, navigation, identity, or useful visual rhythm. If the answer is only a concept label, compare a rollback-safe alternative.

## Figma execution fingerprint

`F-RSL-192-FIGMA-TEXT-WRITE-WITHOUT-LOADING-EXISTING-FONT-STYLE`

Symptom: `Cannot write to node with unloaded font "Noto Sans JP Bold"` when changing `characters`.

Corrected method: before mutating text in a cloned source root, scan all text nodes, deduplicate every non-mixed `fontName`, await `figma.loadFontAsync` for each exact family/style, then perform text writes. Verified on the immediate retry.

## What must NOT transfer

Do not transfer V8 copy, four-scene geometry, spacing, palette, typography scale, or a blanket `remove images` rule. The transferable hypothesis is only the stronger editorial-payoff gate and the exact-font-loading execution method.

## Next receiving-item experiment

On another materially different print artifact, when an image/illustration is technically valid and has a stated concept but appears generic or synthetic, independently compare whether a different visual or native structure performs the content role more specifically. Promote further only with cross-item evidence.
