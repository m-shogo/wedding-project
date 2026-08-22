# RSL-228 — Hidden fixed-art source can export as an empty raster

Date: 2026-08-23
Scope: Rurubu WEDDING local learning
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Fingerprint

`F-RSL-228-HIDDEN-EDITABLE-SOURCE-EXPORTS-EMPTY-RASTER`

## Operation attempted

Re-export a fixed display-title graphic from its preserved editable Figma source after changing the Japanese line break.

Context:
- candidate: `2286:2 / V7 C4 / Island Picks+1DAY`;
- editable source: `2286:36 / SOURCE / V7 ISLAND PICKS FIXED DISPLAY TITLE / EDITABLE`;
- fixed image role: `2286:41`.

## Symptom

The source frame was already hidden (`visible=false`) when `exportAsync({format:'PNG', constraint:{type:'SCALE', value:4}})` was called.

Observed result:
- export byte length: `149`;
- new image hash was technically created;
- next 500px screenshot showed the fixed title had disappeared visually.

This is a dangerous failure because the Plugin API operation itself can succeed while the exported visual is effectively empty.

## Root-cause hypothesis

A hidden Figma source frame is not a safe authority for raster export in this write path. The source content can remain editable and individually visible while the parent frame's hidden state suppresses the rendered export.

## Corrected method

For fixed-display rasterization from a preserved hidden editable source:

1. read the exact source/candidate on the same Plugin API surface immediately before mutation;
2. set only that exact source frame `visible=true`;
3. export at the required scale;
4. require a non-trivial byte-length guard before adoption;
5. immediately restore the source frame to `visible=false`;
6. create/update the image from the verified bytes;
7. run a screenshot gate immediately after placement;
8. keep the editable source hidden but preserved for future corrections.

Verified corrected C4 export:
- byte length: `31,757`;
- final image hash: `b117664119fd4d87edfc4c76e0b49df4b38a2099`;
- 500 / 1400 / 1587×1123 screenshot QA: PASS;
- source returned to hidden state.

The same temporary-visible export method was then used successfully for the independent V7 Story fixed title:
- source `2290:35`;
- placed role `2290:39`;
- final image hash `7169f05eaaed092b588e2608efa7c157a482bced`;
- three-scale QA: PASS.

## Where this applies

Applies to rollback-safe Figma workflows that intentionally keep exact editable fixed-art source frames hidden after rasterization.

Does **not** imply:
- all hidden nodes always export empty in every Figma environment;
- source frames should remain visible in production;
- the byte-length threshold alone proves visual correctness.

Screenshot/readback QA is still mandatory.

## Relationship to existing rules

- complements RSL-005: once the hidden-export fingerprint was observed, the same method was not repeated;
- complements RSL-226: guard and mutation use the same Plugin API coordinate/write surface;
- complements RSL-227: fixed display copy can remain editable while the placed production/study role is rasterized.

## Promotion boundary

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE` only. Cross-item verification is required before this becomes a project rule.