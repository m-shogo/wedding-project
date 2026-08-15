# Rurubu V6 AD / AE visual experiment feedback — 2026-08-16

Scope: Rurubu WEDDING only.
GitHub authority before write: `49fd2d59e7bf363dfdaa1f75bfa8d9f18997791e`.

## Experiment 1 — U → AD chronology

- Visible problem: U remained too infographic-like because a route rail and milestone dots imposed a diagram before the photography.
- Principle tested: preserve semantic chronology with native dates/numbers, but remove the literal route line and let unequal photos + endpoint dominance create the sequence.
- Expected improvement: stronger travel-magazine scan path and less template/grid feeling.
- Regression risk: chronology ambiguity, collisions, lower-page safe-area failure.
- Result: **ADOPTED / VERIFIED_LOCAL**.
- Figma: `1348:2 / PREFERRED / V6_INSIDE_AD_TRAVEL_MAG_CHRONOLOGY_2026_08_16`.
- U retained hidden as `1339:2 / COMPARISON / V6_INSIDE_U_EDITORIAL_TIMELINE_DESTINATION_2026_08_16`.
- Three-scale evidence: 500px thumbnail PASS; 1400×990 whole-spread PASS; 794×1123 actual-size right page PASS.
- Structure: native text 27; replaceable IMAGE roles 9; 18px safe-area risk 0; outside visible text/images 0.
- Next application: continue using photo hierarchy before decorative diagrams when chronology remains semantically clear from native copy.

## Experiment 2 — high-resolution generated Profile v2 → role-aligned Figma study

- Visible problem: AC Profile/Q&A is usable and clean but still visually restrained versus the intended Japanese travel-magazine / scrapbook density.
- Drive master: `RURUBU_V6_PROFILE_SECTION_ROLE_v2.png`, ID `1IL1L8MWzaqkwVQv9CkLen4EkTccq-5cm`, 2,308,995-byte PNG readback.
- Existing repeated `upload_assets` DNS method was intentionally not retried.
- Alternative transport: fetched Drive master → bounded inline derivative → `figma.createImage(Uint8Array)`.
- New Figma hash: `7a4c99c3235a073ff9afe468651d6f3ccbcd43a6`.
- Study: `1350:2 / REJECTED_VISUAL / V6_INSIDE_AE_GENERATED_PROFILE_ALIGNED_INLINE_JPEG_2026_08_16`.
- Semantic result: generated blank photo/profile/snapshot zones could be aligned to real replaceable photos and native editable copy.
- Visual result: **REJECTED** because the code-sized JPEG derivative was visibly blocky/soft at page scale.
- Important distinction: Drive PNG master is not rejected; this transport derivative is.
- New fingerprint: `INLINE_IMAGE_PAYLOAD_COMPRESSION_QUALITY_LIMIT`.
- Stop condition: no more cosmetic low-quality compression retries; require a materially better binary transport path or higher-quality derivative budget.

## Current Rurubu Start Here

`V5 FU/FX · V6 M + AC/AD INSIDE STUDIES · V7 HOLD`

V7 was not advanced.

Canonical QA evidence:

- `01_paper-items/rurubu-wedding/RURUBU-V6-AC-AD-QA-2026-08-16.md`
- RSL-027 append entry under `docs/design-learning/rurubu-shared-learning-feed.append/`.
