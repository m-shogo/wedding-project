# V30 P01 production assets

Status: `P01_PROMOTED_CURRENT_WITH_CARRYOVER_DEBT / FINAL_PHOTO_QA_PENDING`

P01 is the V30 pilot page.

The targeted REWORK was a clear improvement over FIRST BUILD and remains the valid CURRENT at Figma node `3535:7`. Do **not** roll back to FIRST BUILD.

However, subsequent owner feedback and direct live Figma inspection found that multiple visible FIRST BUILD production assets were intentionally carried into CURRENT. The live frame is structurally clean; this is **not** a hidden-layer/graveyard failure. It is a visual carry-over/coherence issue.

Therefore:

- `PROMOTION = VALID`
- `BEST_CURRENT = REWORK`
- `VISUAL_CARRYOVER_PASS = NO / AUDIT OPEN`
- `FINAL REFERENCE_DELTA_PASS = REOPENED`
- `FIGMA_DESIGN_COMPLETE = NO`
- `FINAL_PHOTO_QA_PENDING = YES`

Required authorities:
- `assets/rurubu-v30/visual-polish-manifest.json`
- `assets/rurubu-v30/p01/polish-manifest.json`
- `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`

## Current page role

- Cover: `るるぶ WEDDING`
- One open, dominant hero-photo slot plus three independent Feature 1/2/3 photo slots
- Locked facts: `Shogo`, `Shiori`, `2026`, `2026.10.24`, `PAGE 01`
- Figma page/frame: `V30_FINAL_PRODUCTION` / `3535:7`
- Physical intent: A5 portrait `148 × 210 mm`; Figma trim frame `559 × 794 px`

## What the promoted REWORK successfully improved

The REWORK remains materially better than FIRST BUILD in:
- `るるぶ` identity anchor;
- `Shogo & Shiori` display treatment;
- people-led Hero visual mass;
- `2026` badge;
- overall first impression and title/Hero hierarchy.

Promoted additions include:

| Asset | Role | Status |
| --- | --- | --- |
| `V30_P01_MASTHEAD_RURUBU_REWORK_FINAL_RGBA.png` | るるぶ identity-anchor display art | CURRENT / TRUE ALPHA VERIFIED |
| `V30_P01_NAMES_LOCKUP_REWORK_FINAL_RGBA.png` | exact `Shogo & Shiori` expressive display art | CURRENT / TRUE ALPHA VERIFIED |
| `V30_P01_HERO_VISUAL_PROXY_FROM_MASTER_CALIBRATION.png` | temporary people-led Hero calibration proxy | CURRENT VISUAL QA / REPLACE BEFORE FINAL PRINT |
| `V30_P01_FEATURE_1_VISUAL_PROXY_FROM_MASTER_CALIBRATION.png` | temporary Feature 1 proxy | CURRENT VISUAL QA / REPLACE BEFORE FINAL PRINT |
| `V30_P01_FEATURE_2_VISUAL_PROXY_FROM_MASTER_CALIBRATION.png` | temporary Feature 2 proxy | CURRENT VISUAL QA / REPLACE BEFORE FINAL PRINT |
| `V30_P01_FEATURE_3_VISUAL_PROXY_FROM_MASTER_CALIBRATION.png` | temporary Feature 3 proxy | CURRENT VISUAL QA / REPLACE BEFORE FINAL PRINT |

Generated candidates that only looked transparent because checkerboard pixels were baked into RGB were rejected. Actual alpha-channel inspection remains mandatory.

## New lesson: layer cleanliness is not visual freshness

The FIRST BUILD reset/cleanup worked as intended:
- no hidden rejected graveyard was found;
- obsolete generic masthead/year/names/Hero candidates were removed from CURRENT;
- the only intentionally hidden source layer is the exact `Shogo & Shiori` native source-of-truth.

But several visible FIRST BUILD production assets were deliberately reused. Because they are visible, valid assets, a stale-layer scan cannot flag them.

This created a different failure mode:

`NO OLD HIDDEN LAYERS`

but

`OLD VISUAL LANGUAGE STILL VISIBLE`.

From now on every inherited visible asset must pass `VISUAL_CARRYOVER_PASS` in the current composition.

## Confirmed visible inherited production assets

Direct live Figma inspection confirmed visible inherited items including:

- `P01_NAMES_RIBBON / PRODUCTION_RGBA`
- `P01_DATE_TICKET / PRODUCTION_RGBA`
- `P01_FEATURE_1_VESSEL / PRODUCTION_RGBA`
- `P01_FEATURE_2_VESSEL / PRODUCTION_RGBA`
- `P01_FEATURE_3_VESSEL / PRODUCTION_RGBA`
- `P01_JOURNEY_STAMP / PRODUCTION_RGBA`
- `P01_BOTTOM_STORY_VESSEL / PRODUCTION_RGBA`
- `P01_PAGE_BADGE / PRODUCTION_RGBA`
- `P01_BOTTOM_FLORAL_CLUSTER / PRODUCTION_RGBA`
- `P01_AIRMAIL_BORDER / PRODUCTION_RGBA`

These are not automatically bad. They are simply **not grandfathered**.

Detailed KEEP / REWORK / REVIEW decisions are tracked in:
`assets/rurubu-v30/p01/polish-manifest.json`.

## Highest-priority carry-over debt

### Feature 1 / 2 / 3 vessels — REWORK REQUIRED

The current white/pink, white/blue and white/green vessels are still FIRST BUILD assets.

They remain structurally useful, but the visual language still reads more like compact UI/callout components than the richer Visual Master magazine teaser system.

Rebuild/rework the vessels while preserving:
- independent replaceable photos;
- Feature-specific color/icon roles;
- non-identical dimensions/rhythm;
- exact/source-controlled headings.

Do not rebuild them as one equal component with color variants.

### Date ticket — REWORK REQUIRED

The current backing is still the FIRST BUILD ticket asset. Earlier feedback already identified insufficient physical/printed-object presence.

Rework toward:
- stronger postal/ticket object silhouette;
- appropriate paper/material depth;
- cancellation/wave-line character;
- flower accent;
- current title/Hero quality level;
- exact native `2026.10.24` source remains controlled.

### Bottom story vessel — REWORK REQUIRED

The current backing is still FIRST BUILD-derived and now looks weaker beside the improved Hero/title system.

Rework toward:
- stronger occupied area;
- irregular white cloud/paper character;
- clearer cover-hook hierarchy;
- stronger relationship with bottom floral cluster;
- no flattening with editable story copy.

### Names ribbon backing — explicit requalification required

The visible `Shogo & Shiori` lockup is improved and accepted, but its older ribbon backing was carried forward. Review the backing as part of the new names/title/Hero system rather than assuming it passes because the lettering improved.

### OUR JOURNEY / PAGE 01 — local requalification required

They are subordinate and may remain valid, but must be rechecked after any bottom-story rebuild because adjacency changes can make previously acceptable assets stale.

## Assets provisionally requalified

Current review supports retaining, subject to recheck if adjacent systems change:
- `WEDDING` display title;
- right destination cluster;
- left tropical cluster;
- airmail border;
- bottom floral cluster (recheck with bottom-story revision).

`KEEP_REQUALIFIED` means explicitly checked in CURRENT — not merely unchanged.

## Fixed short display text — P01 rule

Short fixed display text may use image-generated/prepared art when that is visually stronger than generic native text.

This includes P01:
- `るるぶ`
- `WEDDING`
- `Shogo & Shiori`
- `2026`
- `OUR JOURNEY`
- `PAGE 01` when display treatment needs it

Keep the exact approved string separately as native/source-of-truth data and QA the visible result against it.

Long body/caption/Q&A text stays native/editable.

## Feature irregularity rule

Feature 1/2/3 are a related editorial family, not an equal-card UI component.

Visual Master reference dimensions are approximately:
- Feature 1: `310 × 180`
- Feature 2: `330 × 190`
- Feature 3: `320 × 180`

Do not equalize:
- module dimensions;
- thumbnail dimensions;
- padding;
- icon coordinates;
- local spacing/overlap.

Do not add random scrapbook rotation. Any tilt/offset must be supported by the Visual Master or direct comparison.

## Tactile print finish

Priority parts for restrained tactile character:
- `るるぶ` / `WEDDING` display art where appropriate;
- names ribbon;
- Date ticket;
- Feature vessels/photo-frame system;
- OUR JOURNEY stamp/postmark;
- bottom story vessel.

Allowed:
- subtle paper/matte feel;
- slight printed-edge irregularity;
- restrained local depth/shadow;
- small material differences between paper/ticket/ribbon/stamp objects.

Reject:
- uniform full-page grain;
- heavy vintage dirt;
- texture on faces;
- noise that reduces exact text or A5 readability;
- noise used to disguise weak generation.

## Replaceable photo system

Hero + Feature 1–3 remain independent clipped replaceable photo slots. Photo swap QA passed structurally.

This must survive all carry-over rework. Rebuilding a vessel/frame must not destroy independent photo replacement.

## Google Drive traceability

- Source folder: [01_SOURCE_KEYED/P01](https://drive.google.com/drive/folders/1AIbUPb18DFdT035NW_3tSsCgp22Ct1-o)
- Production folder: [02_PRODUCTION_RGBA/P01](https://drive.google.com/drive/folders/1-zfSYIrxrPnwWQuAXO8-toHZEuz-zrNr)
- QA folder: [90_QA_EXPORT/P01](https://drive.google.com/drive/folders/1YQpvXrh8qHyv_LXLXoPYPC90dzQw3bAk)
- FIRST BUILD baseline: [P01_FIRST_BUILD_BASELINE](https://drive.google.com/drive/folders/1ggtQ4j0TCqBKm8O3hwVqkC0wbPDhZAKW)
- Promoted REWORK evidence: [P01_REWORK_CURRENT_QA_20260902](https://drive.google.com/drive/folders/1WCUtnm_trU9tEeuZ3tMFjN-PP0KEGw4d)
- Rejected folder: [99_REJECTED_DO_NOT_USE/P01](https://drive.google.com/drive/folders/1DXJ3gIlZalOiCeytBRnm425s3W9KO-bb)

## Current gate state

- `VISUAL_MASTER_LOCKED = YES`
- `FIGMA_STRUCTURE_READY = YES`
- `PHOTO_SWAP_PASS = YES`
- `REPRESENTATIVE_VISUAL_PROXY_READY = YES` — Visual Master calibration proxy
- `IDENTITY_ANCHOR_PASS = YES`
- `PROMOTION = YES / BEST CURRENT`
- `VISUAL_CARRYOVER_PASS = NO / AUDIT OPEN`
- `REFERENCE_DELTA_PASS = PROVISIONAL / REOPENED FOR COHERENCE`
- `A5_READABILITY = PASS FOR CURRENT`
- `A5_PRINT_QA_PASS = NO` — real-photo raster/export check pending
- `HUMAN_FEEDBACK_REVIEWED = YES / NEW CARRYOVER DEBT WRITTEN BACK`
- `FIGMA_DESIGN_COMPLETE = NO`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

## Next P01 work

1. rework Feature 1/2/3 inherited vessels;
2. rework Date ticket backing;
3. rework Bottom story vessel;
4. requalify names ribbon backing;
5. requalify OUR JOURNEY / PAGE 01 / bottom floral area after bottom-story changes;
6. capture fresh current screenshot;
7. rerun mixed-generation coherence + Visual Master comparison;
8. close `VISUAL_CARRYOVER_PASS`;
9. only after that proceed to final-photo/print QA when real photos arrive.

`BEST CURRENT ≠ FINAL COMPLETE.`
