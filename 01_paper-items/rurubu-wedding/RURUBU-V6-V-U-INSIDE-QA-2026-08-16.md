# RURUBU WEDDING V6 — V/U Inside QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
State: `V6 V/U PREFERRED_INSIDE_STUDIES / VERIFIED_LOCAL / V7_HOLD / NOT_PRINT_READY`

## Authority / pre-write readback

- GitHub main immediately before evidence write: `aec3556bf8b78720180d62129001aa51c2fa4a3a`.
- Shared learning read at run start:
  - `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md`
  - `docs/design-learning/rurubu-shared-learning-feed.md` + canonical append entries
  - `docs/design-learning/non-rurubu-shared-learning-feed.md`
- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`.
- Existing V6 sources inspected before mutation:
  - R `1327:2 / V6_INSIDE_R_GENERATED_PROFILE_HYBRID_2026_08_15`
  - S `1328:2 / V6_INSIDE_S_PHOTO_ROUTE_TIMELINE_2026_08_15`
- Existing Drive profile generated master read back: `1MfLObNcvsWhQ8nQqgZHeFiDBdjPzj1w8`.
- No non-Rurubu item-specific Figma/Drive/GitHub path was inspected or mutated.

## Visible problems

### R profile/Q&A

Whole-spread and 794×1123 page review showed two defects:

1. the generated profile decoration was acting like a large soft background while the live photo merely overlapped it, so the two systems did not read as one intentional module;
2. six Q&A entries still occupied a sparse 2-column × 3-row rhythm, reading closer to a wireframe than a Japanese travel-magazine inside feature.

### S chronology

S was better than the old uniform grid, but all six events still occupied similar small visual weight. The final wedding milestone did not read as a destination/endpoint strongly enough.

## Bounded experiments

### T — aligned generated profile + denser Q&A

Created rollback-safe duplicate:

- `1338:53 / V6_INSIDE_T_GENERATED_PROFILE_ALIGNED_QA_EDITORIAL_2026_08_16`

Profile page:

- enlarged the existing generated profile module as one bounded semantic support;
- aligned the replaceable main photo to the module's intended large photo well;
- retained native editable profile name/labels/values;
- added three replaceable snapshot roles rather than baking photos into decoration.

Q&A page:

- changed six prompts from sparse 2×3 blocks to a tighter 3×2 typographic reading rhythm;
- kept every question/answer native text;
- rebuilt the lower half around one dominant replaceable memory photo plus one overlapping support photo.

Result:

- Q&A improvement: `VERIFIED_LOCAL`;
- generated-profile alignment concept: structurally valid, but the existing Figma image hash is visibly soft at actual size;
- T therefore remains comparison evidence and is hidden, not preferred.

### V — sharp profile fallback + T Q&A

Created:

- `1339:54 / V6_INSIDE_V_SHARP_PROFILE_EDITORIAL_QA_2026_08_16`
- profile page `1339:55`
- Q&A page `1339:79`

The low-resolution generated decoration was hidden rather than cosmetically sharpened or stretched. Profile hierarchy was rebuilt from:

- one dominant replaceable photo;
- native editable profile labels/values;
- three replaceable snapshot roles;
- native quote/note text.

This is deliberately a sharp fallback until a print-capable generated section master can be transported into Figma.

Structural readback:

- profile page: native text `18`, image roles `4`, 18 px safe-area risks `0`, text/text collisions `0`, text/image collisions `0`;
- Q&A page: native text `22`, image roles `2`, 18 px safe-area risks `0`, text/text collisions `0`, text/image collisions `0`.

Three-scale evidence:

- whole spread 1400 px: PASS for hierarchy/readability;
- reading page scale: PASS;
- actual page `794×1123`: Q&A PASS; profile is sharp and editable but intentionally restrained pending a high-resolution generated support asset.

Decision: `V PREFERRED_PROFILE_QA_STUDY / VERIFIED_LOCAL / NOT_PRINT_READY`.

### U — editorial chronology with destination endpoint

Created:

- `1339:2 / V6_INSIDE_U_EDITORIAL_TIMELINE_DESTINATION_2026_08_16`
- story page `1339:3`
- chronology page `1339:14`

Chronology treatment:

- retained the large feature-photo block at the top;
- changed the lower six milestones to materially varied image sizes and vertical positions;
- preserved a restrained functional route rail;
- made `2026.10.24 / WEDDING` a substantially larger endpoint image rather than a sixth equal card;
- kept all dates/titles/copy native text and all event images replaceable.

First structural QA found:

- final WEDDING copy entering bottom safe area;
- event 4 copy touching the WEDDING image;
- event 4 date overlapping event 5 copy.

All three were corrected before promotion.

Final chronology structure:

- native text `21`;
- image roles `9`;
- 18 px safe-area risks `0`;
- text/text collisions `0`;
- text/image collisions `0`.

Actual-size `794×1123` screenshot: PASS. The endpoint now reads as a destination and breaks the equal-card timeline rhythm.

Decision: `U PREFERRED_TIMELINE_STUDY / VERIFIED_LOCAL / NOT_PRINT_READY`.

## Generated asset transport failure

A fresh high-resolution generated section asset was available locally, so one bounded official `upload_assets` attempt was made after T exposed the low-resolution problem.

Upload URL was issued successfully, but binary POST again failed with:

- `Could not resolve host: mcp.figma.com`

This matches the existing transport failure family. No further cosmetic retries were made. The run switched to V, a sharp semantic fallback using native text + replaceable photos.

State:

- generated high-resolution replacement: available outside Figma;
- adopted in Figma: NO;
- placed in Figma: NO;
- visually verified in production candidate: NO.

Generation/transport is therefore not counted as completion.

## Promotion / rollback state

Start Here changed from:

`V5 FU/FX · V6 M + R/S INSIDE STUDIES · V7 HOLD`

to:

`V5 FU/FX · V6 M + V/U INSIDE STUDIES · V7 HOLD`

Visible preferred studies:

- V `1339:54` — profile/Q&A;
- U `1339:2` — story/timeline.

Hidden comparison/rollback studies:

- R `1327:2`;
- S `1328:2`;
- T `1338:53`.

Nothing was deleted. V7 remains on hold.

## Current limits

V/U are not print-ready and V6 is not declared complete. Remaining high-value work includes:

- replace the restrained V profile treatment with a genuinely print-capable generated section support only when the asset can be transported without softness;
- continue real-copy stress tests once authoritative final copy is available;
- final print/fold/bleed proof and complete provenance/Drive/Figma hash ledger reconciliation before V6 completion.
