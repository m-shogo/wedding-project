# NRSL-004 — Destination specificity does not substitute for art direction

Source scope/item: non-Rurubu / ADD-02 11卓の国別テーブルサイン

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

ADD-02 V7 proved that abstract raster atmosphere alone did not beat retained production. V8 therefore added recognizable destination-semantic detail through clean-room rasterized scenes: Hawaii volcanic coastline, Italy arcade/travertine, and Japan timber/eave/shoji structure.

The new candidates became more obviously destination-specific, but completion-only comparison showed that retained production still had stronger typography, hierarchy, negative-space control, long-distance readability and overall sellable graphic finish.

## Root-cause hypothesis

A design can solve `generic destination atmosphere` while still becoming weaker overall if semantic detail is treated literally rather than art-directed into the hierarchy. Recognizable architecture, landscape or material cues are not a substitute for editorial selection, typographic authority and visual restraint.

## Bounded test

- Figma page: `55:2 / CLEANROOM / ADD-02 / V8 DESTINATION DETAIL / 2026-08-16`
- candidates authored before retained production was opened:
  - `55:3 / COMPARE_ONLY / V8 / HAWAII / VOLCANIC COAST`
  - `55:188 / COMPARE_ONLY / V8 / ITALY / ARCADE & TRAVERTINE`
  - `55:355 / COMPARE_ONLY / V8 / JAPAN / TIMBER & SHOJI SHADOW`
- each candidate used one fixed full-resolution raster role plus five native editable text roles;
- variable/factual copy baked into raster: `0`;
- long-copy stress clones: `57:2 / 57:11 / 57:20`;
- all stress roots: `1000×1480`, native text `5`, outside visible text `0`, info-stack bottom `1420 / 1480`.

## Expected improvement

Increase destination identity and material depth without returning to abstract blur/color-field-only raster, while preserving native semantic copy and structural text-fit behavior.

## Result

- Hawaii: semantic identity increased, but illustrative treatment was coarse and retained production remained stronger at distance.
- Italy: strongest V8 material/detail result, but retained production remained more edited and more convincing as a professional table sign.
- Japan: semantic cues were clear, but literal architecture reduced the restrained graphic authority of the retained design.

All V8 candidates remain `COMPARE_ONLY`. No retained production node was changed.

## Regression risk

When a weak generic design is diagnosed as lacking destination-specific imagery, the next attempt may over-correct by adding literal landmarks, architecture, materials or scenic detail. This can produce a more descriptive but less designed artifact, especially if typography and negative space lose authority.

## Three-scale evidence

- family/thumbnail: V8 clearly communicates three different destinations, but the retained designs are still more composed as a family;
- reading scale: native hierarchy remains readable, yet literal scene detail competes with the typography in Hawaii/Japan;
- actual-size/detail: raster and native text structure are technically sound; the failure is art-direction quality, not resolution or overflow;
- long-copy stress: PASS on all three V8 candidates.

## Evidence

- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`
- item evidence: `01_paper-items/additional-wedding-items/ADD-02-table-signs/FIGMA-CLEANROOM-V8-DESTINATION-SEMANTIC-2026-08-16.md`
- item evidence commit: `b1de7e4b28b33a8c5b6d61cfddd2da4daa6683b5`

## What must remain item-specific

Do not transfer Hawaii volcano/palm geometry, Italy arcade/terracotta treatment, Japan shoji/eave treatment, colors, proportions, title placement or table-sign layout into another item.

## Cross-item applicability hypothesis

When another print item needs stronger image-driven identity, test whether the new asset improves **hierarchy and editorial selection**, not just whether it is more recognizable or more detailed. A generated/photo/illustrative asset should be rejected if it increases semantic specificity but weakens typography, negative space, physical-role clarity or thumbnail readability.

## Next receiving-item experiment

On a different print artifact that genuinely needs imagery, compare one high-quality non-person image/composed asset against a restrained no-image baseline. Judge the asset by whether it strengthens the artifact-level reading path at thumbnail and reading scale, not by realism/detail alone.

Failure fingerprint: `DESTINATION_SEMANTIC_LITERALISM_WITHOUT_ART_DIRECTION`.
