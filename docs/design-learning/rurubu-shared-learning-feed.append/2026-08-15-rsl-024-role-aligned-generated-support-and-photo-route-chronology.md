# RSL-024 — Role-aligned generated support + functional photo-route chronology

Date: 2026-08-15
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Source scope: Rurubu WEDDING only
GitHub authority before this write: `68b9c1b4b56c72fcfa15c522d57f759d7e59f9b8`

## OBSERVED

V6 profile/Q&A P and chronology O were structurally valid but still read too much like clean templates rather than a real Japanese travel-information magazine inside. Two different failure modes were present:

1. The profile page needed visual/editorial character, but the earlier generated-profile proof Q had failed because a soft generated derivative was enlarged across almost an entire page without matching native photo/text geometry.
2. The chronology had escaped a uniform grid, but it still lacked a clear route/binding path and a strong feature-to-milestones reading sequence.

## ROOT_CAUSE_HYPOTHESIS

### Generated support

A generated/composed section asset is useful only when it is assigned a bounded visual role and the native/editable responsibilities are rebuilt to align with it. A generated asset should not become a page-sized wallpaper merely because transport succeeded.

### Chronology

A chronology does not need six card containers to feel organized. One functional route rail plus deliberately varied replaceable photo roles can provide sequence while preserving magazine asymmetry. Conversely, a generated timeline background should be rejected when it does not visibly bind the content at whole-item scale.

## TESTED_LOCAL

### R — profile/Q&A hybrid

Figma: `1327:2 / V6_INSIDE_R_GENERATED_PROFILE_HYBRID_2026_08_15`.

Bounded test:
- reuse the already-materialized generated profile image hash `7c93168e6262004013942224016fce7a71f72a16` rather than retrying transport;
- reduce it to a bounded 440×550 decoration/text-support role;
- keep real photography in replaceable IMAGE roles;
- keep profile facts, Q&A and captions native;
- tighten the six-question rhythm and enlarge memories photography rather than introducing card shells.

Expected improvement: stronger travel-magazine character and denser reading rhythm while preserving actual future-edit controls.

Regression risk: generated support can still look soft at actual print size, or native text may appear pasted on if its coordinates do not align with the generated support.

### S — photo-route chronology

Figma: `1328:2 / V6_INSIDE_S_PHOTO_ROUTE_TIMELINE_2026_08_15`.

Bounded test:
- make one large replaceable travel-object feature image and two support images the top editorial field;
- test existing generated timeline decoration hash `702fe2639cb39189a04d5db1f57bda8d2f054305`;
- hide/reject that decoration after screenshot review showed no useful binding contribution;
- replace it with one simple functional route rail and six semantic nodes;
- stagger six existing replaceable event photos and keep all event copy native.

Expected improvement: `feature story → route → milestones` reading instead of a card/grid timeline.

Regression risk: small event copy can become cramped and staggered photos can collide with adjacent labels. A structural collision was found and repaired before verification.

## VERIFIED_LOCAL

### Three-scale evidence

R:
- whole spread 1200px: PASS as study;
- 500px thumbnail: PASS;
- profile actual-size 794×1123: PASS for composition/readability, generated decoration still not final-print fidelity;
- Q&A actual-size 794×1123: PASS.

S:
- whole spread 1200px: PASS as study;
- 500px thumbnail: PASS;
- chronology actual-size 794×1123: PASS after vertical compaction and collision repair.

### Structure evidence

R profile page:
- native text 18;
- IMAGE roles 3;
- outside bounds 0;
- fold/safe-area risks 0.

R Q&A page:
- native text 22;
- IMAGE roles 2;
- outside bounds 0;
- fold/safe-area risks 0;
- text/image collisions 0.

S chronology page:
- native text 21;
- IMAGE roles 9;
- outside bounds 0;
- 18px safe-area risks 0;
- text/text collisions 0;
- text/image collisions 0 after repairing EVENT 5 widths.

Evidence path: `01_paper-items/rurubu-wedding/RURUBU-V6-R-S-HYBRID-INSIDE-QA-2026-08-15.md`.

Drive generated-profile master: `1MfLObNcvsWhQ8nQqgZHeFiDBdjPzj1w8`.

## FAILURE FINGERPRINT

`INLINE_CREATEIMAGE_PAYLOAD_UNSUPPORTED_OR_UNRELIABLE`

During this run two materially similar inline `figma.createImage(Uint8Array)` payload attempts returned `Image type is unsupported`. The operations were atomic and caused no write. This does **not** supersede the prior evidence that a JPEG direct-image transport succeeded; it means the current inline byte construction/materialization path is not reliable enough to retry cosmetically.

Replacement method in this run: reuse image hashes already materialized inside the Rurubu Figma file and continue visual/layout work without another binary transport attempt.

Stop condition: do not retry direct inline byte transport until the byte/materialization contract changes materially.

## CROSS_ITEM_CANDIDATE

Potentially transferable principles:

1. **Generated support should be role-aligned, not page-sized by default.** If variable copy and photos must remain editable, align them to a bounded generated decorative role instead of rasterizing or wallpapering the full layout.
2. **A generated asset must prove visible function.** If a generated border/timeline/background does not improve binding or hierarchy at whole-item scale, reject/hide it even if generation and placement succeeded.
3. **A chronology can use one simple functional route plus asymmetric content.** The rail may provide sequence while photo scale/position supplies editorial energy; repeated cards are not required.

## MUST REMAIN RURUBU-SPECIFIC

Do not transfer:
- tropical/Hawaii decoration;
- flowers, paper textures, palette or postcard motifs;
- exact 440×550 profile support size;
- exact route rail position/color;
- the six-event geometry, event wording or photo crops;
- current V6 production/study state.

## NEXT RURUBU APPLICATION

Before final V6 selection, obtain or materialize a genuinely role-sized high-fidelity profile decoration derivative using a changed transport contract, then compare against R without changing the native text/photo semantics. Continue to treat V7 as hold until V6 inside visual selection and print QA are closed.
