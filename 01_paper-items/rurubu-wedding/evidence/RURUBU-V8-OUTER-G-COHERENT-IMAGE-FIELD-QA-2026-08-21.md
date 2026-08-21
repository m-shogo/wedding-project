# Rurubu WEDDING V8 — Outer G coherent image-field QA

Date: 2026-08-21
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Current Outer after this pass: `2174:2`
Rollback Outer: `2163:2` hidden at `x=5400 / y=5800`
Drive master preserved: `1L5bMXy7IhPWGgIH6yDJ9mzOpveFYTZYB`
Figma image hash preserved: `be21a846e961b3a13c24c7476f6a01b12b8d07ff`

## Visible problem

Previous V8 Outer used one legitimate generated ocean-light image plus two unrelated solid-color crop blocks. At reading scale the extra blocks read as synthetic collage decoration rather than editorial information and amplified prototype/AI-template feeling.

## New professional research applied

- Lonely Planet Artifact (2026): travel print can retain utility while expressing a distinct personality; visual heritage should be used deliberately rather than as decorative nostalgia.
- Claire Huss publication work: crop, pairing and sequencing are editorial decisions, not just image placement.
- Contemporary editorial practice: publication identity is carried by image treatment, typography and pacing together rather than by piling on modules.

Bounded hypothesis: when one image already carries the visual role, additional unowned decorative blocks should be removed before generating more decoration. Let the legitimate visual become a coherent field and let type/image contrast carry hierarchy.

## Figma experiment

Rollback-safe duplicate created from previous Outer, then:

- current root promoted to `2174:2`;
- generated image role `2174:14` expanded to one coherent `647×520` field;
- previous solid crop blocks `2174:16` and `2174:17` hidden;
- destination changed from decorative English-only `YOKOHAMA` to native `横浜 / YOKOHAMA`;
- headline moved onto the darker upper image bands;
- deck moved back to the cream paper field after the first overlay test produced weak contrast;
- no new generated image, no new Drive master, no new image hash, no V6 image reuse.

## Failure / correction

First candidate placed both headline and deck on the generated image. The deck crossed lighter beige/green bands and became visually weak. This was rejected before promotion. Corrected method: keep the headline as the image-bound editorial voice, but move supporting copy into the high-contrast paper field below.

Failure fingerprint: `F-RSL-188-DECORATIVE-COLLAGE-WITHOUT-SEMANTIC-OWNER`.

## QA

Three-scale visual review:

- thumbnail / whole item: PASS — cleaner and less template-like than previous Outer;
- reading scale 1400px: PASS;
- actual/natural 1587×1123: PASS.

Structural readback for current Outer G:

- native text: `12`
- IMAGE fills: `1`
- text intersections: `0`
- 18px text safe-area risks: `0`
- visible internal process-language fingerprint: `0`
- whole-page flattening: `0`

## Decision

`VERIFIED_LOCAL / OUTER_G_CURRENT / V8_NOT_GLOBAL_WINNER / NOT_PRINT_READY`

The improvement is anti-template and publication-authenticity oriented. It does not solve V8's remaining destination-specificity weakness because the existing ocean-light master is still abstract. A genuinely role-valid destination image may later beat this composition, but unrelated imagery or fake collage blocks must not be substituted merely to add visual activity.
