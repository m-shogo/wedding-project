# RSL-027 — Rail-free photo chronology + generated-role alignment

Date: 2026-08-16
Source scope: Rurubu WEDDING / V6 inside
GitHub authority before this write: `6143c6306fbc637338e9a72e63de47ea008e4721`

## Learning A — chronology hierarchy

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

### OBSERVED

V6 chronology U was structurally correct but still visually read as a diagram because the horizontal route rail and milestone dots organized the page more strongly than the photography.

### ROOT_CAUSE_HYPOTHESIS

For an editorial chronology, chronological comprehension does not require a literal line if dates, native number anchors and photo sequence remain legible. Removing the rail should allow unequal photography and semantic endpoint dominance to create a more magazine-native scan path.

### TESTED_LOCAL

Rollback-safe AD `1348:2`:

- hid route rail + milestone dots;
- retained all factual copy as native text;
- retained all nine photos as independent replaceable IMAGE roles;
- used large native `01–06` anchors;
- staggered event images vertically/horizontally at materially unequal sizes;
- made the final WEDDING milestone a larger destination photo rather than an equal card.

Expected improvement: less infographic/template feeling; stronger Japanese travel-magazine photo rhythm.

Regression risks: chronology becoming unclear, WEDDING endpoint competing with earlier events, text/image collisions, print safe-area failure.

### VERIFIED_LOCAL

Evidence:

- Figma preferred: `1348:2 / PREFERRED / V6_INSIDE_AD_TRAVEL_MAG_CHRONOLOGY_2026_08_16`;
- whole spread 1400×990: PASS;
- 500px thumbnail: PASS;
- actual-size right page 794×1123: PASS;
- visible native text: 27;
- replaceable IMAGE roles: 9/9;
- 18px safe-area risk: 0;
- outside-page visible text/images: 0;
- QA evidence: `01_paper-items/rurubu-wedding/RURUBU-V6-AC-AD-QA-2026-08-16.md`.

AD was promoted; U was preserved hidden as comparison/rollback.

### What remains Rurubu-specific

Do NOT transfer the exact event geometry, photo sizes, 01–06 coloring, wording, palette, Japanese headline treatment or wedding endpoint composition. These are Rurubu art direction.

### Cross-item applicability hypothesis

Potentially transferable principle only: when a chronology is readable from semantic dates/labels, removing a diagrammatic rail and using unequal photo hierarchy can improve editorial rhythm. A receiving item must reproduce the benefit independently before promotion.

## Learning B — generated section asset role alignment and transport

State: `TESTED_LOCAL / REJECTED_VISUAL`

### OBSERVED

The existing Profile/Q&A AC is structurally strong but visually restrained. A high-resolution generated Profile section master exists in Drive and is materially closer to the desired scrapbook/travel-magazine decorative language.

### ROOT_CAUSE_HYPOTHESIS

A generated section module can function as fixed decoration while native Figma text and replaceable image roles remain above it, provided the module's blank photo/text zones align semantically with those editable roles.

### TESTED_LOCAL

Drive master:

- `RURUBU_V6_PROFILE_SECTION_ROLE_v2.png`
- Drive ID `1IL1L8MWzaqkwVQv9CkLen4EkTccq-5cm`
- source size readback `2,308,995 bytes`

The already-repeated `upload_assets` DNS failure method was not retried. The master was fetched and a bounded derivative was passed through `figma.createImage(Uint8Array)`, producing new image hash `7a4c99c3235a073ff9afe468651d6f3ccbcd43a6`.

AE `1350:2` aligned native profile text + replaceable real photos to generated blank zones.

Expected improvement: obtain high-quality fixed decoration without reconstructing leaves/tape/stamps/frame details as fragile Figma micro-geometry.

Regression risks: transport compression, mismatch between generated blank zones and real copy, rasterized semantic content, print softness.

### Result

Semantic role alignment: PASS locally.
Transport into Figma: PASS.
Production visual quality: REJECTED.

The code-sized inline JPEG derivative was visibly blocky/soft at page scale, so AE was renamed `REJECTED_VISUAL` and hidden. The original Drive PNG master is not rejected; the loss occurred in this constrained transport derivative.

Failure fingerprint: `INLINE_IMAGE_PAYLOAD_COMPRESSION_QUALITY_LIMIT`.

Stop condition: do not keep cosmetically retrying lower-quality inline compression. Retry only when a materially better binary transport path or sufficiently high-quality code-sized derivative becomes available.

### What remains Rurubu-specific

The tropical floral treatment, paper textures, tape, postal stamp, exact photo windows, palette and profile-page visual grammar remain Rurubu-specific.

### Cross-item applicability

Do not promote from this failed visual result. The already-promoted project-wide hybrid-authoring rule remains valid; this experiment only confirms that **semantic alignment is necessary but not sufficient—actual placed raster quality is a separate adoption gate**.
