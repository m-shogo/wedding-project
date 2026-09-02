# V30 P01 production assets

Status: `P01_REFERENCE_DELTA_PASS / REWORK_PROMOTED / FINAL_PHOTO_QA_PENDING`

P01 is the V30 pilot page. The live Figma frame was reset before reconstruction; V20-derived debris, hidden graveyards, obsolete placeholders and rejected candidates are not retained in the current frame.

**Current result:** the first rebuild remains historical baseline evidence. A targeted REWORK passed Visual Master / FIRST BUILD / REWORK comparison and was promoted into the existing CURRENT frame `3535:7`. The temporary REWORK frame was removed. `FIGMA_DESIGN_COMPLETE` remains false only because real-photo and final print-raster QA are still pending.

Required post-build acceptance guide:
`docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`

Required visual-polish extensions:
- `assets/rurubu-v30/visual-polish-manifest.json`
- `assets/rurubu-v30/p01/polish-manifest.json`

## Current page role

- Cover: `るるぶ WEDDING`
- One open, dominant hero-photo slot plus three independent Feature 1/2/3 photo slots
- Locked facts: `Shogo`, `Shiori`, `2026`, `2026.10.24`, `PAGE 01`
- Figma page/frame: `V30_FINAL_PRODUCTION` / `3535:7`
- Physical intent: A5 portrait `148 × 210 mm`; Figma trim frame `559 × 794 px`

## What the first build successfully proved

### Structure / editability
- Hero + Feature 1–3 are four separate clipped replaceable photo slots.
- Photo content remains separate from frames/backings/decorations.
- Four-way photo cross-swap was tested without spill, gap or frame reconstruction.
- Locked factual values remain controlled separately from generated decoration.
- Live Figma contains no hidden rejected-asset graveyard.

### Production asset pipeline
- Independently movable editorial parts are separate production files.
- Floating raster assets have transparent production versions and alpha QA.
- Drive/Git traceability exists for source, production, QA and rejected materials.

These are **structural passes only**. They do not prove Visual Master fidelity.

## First-build production assets — historical baseline

These assets document the first rebuild. Current Figma node IDs changed during the approved promotion; the table below is historical evidence rather than the live node map.

## Promoted REWORK additions

| Asset | Role | Status |
| --- | --- | --- |
| `V30_P01_MASTHEAD_RURUBU_REWORK_FINAL_RGBA.png` | るるぶ identity-anchor display art | ADOPTED / TRUE ALPHA VERIFIED |
| `V30_P01_NAMES_LOCKUP_REWORK_FINAL_RGBA.png` | exact `Shogo & Shiori` expressive display art | ADOPTED / TRUE ALPHA VERIFIED |
| `V30_P01_HERO_VISUAL_PROXY_FROM_MASTER_CALIBRATION.png` | temporary people-led Hero calibration proxy | ADOPTED FOR VISUAL QA / REPLACE BEFORE FINAL PRINT |
| `V30_P01_FEATURE_1_VISUAL_PROXY_FROM_MASTER_CALIBRATION.png` | temporary Feature 1 proxy | ADOPTED FOR VISUAL QA / REPLACE BEFORE FINAL PRINT |
| `V30_P01_FEATURE_2_VISUAL_PROXY_FROM_MASTER_CALIBRATION.png` | temporary Feature 2 proxy | ADOPTED FOR VISUAL QA / REPLACE BEFORE FINAL PRINT |
| `V30_P01_FEATURE_3_VISUAL_PROXY_FROM_MASTER_CALIBRATION.png` | temporary Feature 3 proxy | ADOPTED FOR VISUAL QA / REPLACE BEFORE FINAL PRINT |

Rejected generated candidates that only looked transparent because checkerboard pixels were baked into RGB were not committed. Actual alpha-channel inspection is required before adoption.

| Asset | Role | First-build Figma node | Acceptance |
| --- | --- | --- | --- |
| `V30_P01_BG_RESORT_SKY_FIELD_PRODUCTION_RGBA.png` | Resort sky/beach field | `3660:2` | REVIEW |
| `V30_P01_WEDDING_TITLE_PRODUCTION_RGBA.png` | Primary pink title art | `3660:14` | REVIEW / strongest current identity asset |
| `V30_P01_LEFT_TROPICAL_CLUSTER_PRODUCTION_RGBA.png` | Left tropical cluster | `3660:15` | REVIEW |
| `V30_P01_RIGHT_DESTINATION_CLUSTER_PRODUCTION_RGBA.png` | Chapel/sea/palm/flower cluster | `3660:16` | REVIEW |
| `V30_P01_NAMES_RIBBON_PRODUCTION_RGBA.png` | Names backing | `3662:2` | BACKING OK TO REVIEW; VISIBLE NAME TREATMENT FAIL |
| `V30_P01_DATE_TICKET_PRODUCTION_RGBA.png` | Date-ticket backing | `3662:3` | VISUAL REWORK |
| `V30_P01_FEATURE_1_VESSEL_PRODUCTION_RGBA.png` | Pink/profile/camera module | `3662:4` | VISUAL REWORK |
| `V30_P01_FEATURE_2_VESSEL_PRODUCTION_RGBA.png` | Blue/travel/airplane module | `3662:5` | VISUAL REWORK |
| `V30_P01_FEATURE_3_VESSEL_PRODUCTION_RGBA.png` | Green/group module | `3662:6` | VISUAL REWORK |
| `V30_P01_JOURNEY_STAMP_PRODUCTION_RGBA.png` | Journey postmark | `3662:7` | REVIEW |
| `V30_P01_BOTTOM_STORY_VESSEL_PRODUCTION_RGBA.png` | Bottom story cloud | `3662:8` | VISUAL REWORK |
| `V30_P01_PAGE_BADGE_PRODUCTION_RGBA.png` | Page-meta decoration | `3662:9` | REVIEW |
| `V30_P01_BOTTOM_FLORAL_CLUSTER_PRODUCTION_RGBA.png` | Bottom floral closure | `3662:10` | REVIEW |
| `V30_P01_AIRMAIL_BORDER_PRODUCTION_RGBA.png` | Airmail trim border | `3662:11` | REVIEW |

The first-build `るるぶ` masthead, year badge, page-number disc and micro accents include editable Figma/vector work. **Editability does not grant visual acceptance.**

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

## First-build visual feedback — historical calibration record

Direct screenshot review against the user-provided Visual Master found these failures:

### 1. `るるぶ` masthead — FAIL
The first-build native/Figma treatment is too simplified and generic.

The Visual Master depends on:
- distinctive three-block silhouette;
- stronger dimensional white/black edge treatment;
- playful irregularity;
- correct glyph weight and character;
- close integration with surrounding floral/route art.

A generic native block reconstruction is rejected even when the characters are correct.

### 2. `Shogo & Shiori` visible lettering — FAIL
The first build uses a heavy dark/navy sans treatment.

The Visual Master uses a lively **hot-pink script / hand-lettered lockup** on the yellow/blue ribbon, with much more movement and wedding-cover personality.

Hard reject:
`heavy dark sans Shogo & Shiori on P01`.

The factual spelling must remain controlled, but the visible short display lockup may use high-fidelity display art with a separate native source-of-truth if native typography cannot reproduce the reference.

### 3. Hero proxy — INVALID FOR VISUAL QA
The current hero uses unrelated travel objects/map/camera imagery.

That image is acceptable only as a **STRUCTURAL_PROXY** for mask testing. It cannot validate the cover's hierarchy because the Visual Master hero is a large two-person couple image whose faces, bodies, white wedding mass and bouquet create the page's main visual weight.

Before Reference Delta can pass, install either:
1. a suitable user-provided real couple photo; or
2. a temporary crop from the user-provided P01 Visual Master strictly for visual calibration; or
3. another approved two-person visual proxy with similar subject count/scale/focal behavior.

### 4. `2026` badge — FAIL / REWORK
The distinctive yellow cloud/burst cover badge and surrounding heart/plane-route ecology must be preserved. Do not normalize it into a generic oval/circle treatment.

### 5. Feature 1/2/3 — REWORK
The first build trends too much toward compact reusable UI modules.

They share a family but must preserve different local jobs, sizes/rhythm, accents and photo relationships:
- Feature 1: pink / camera / couple-profile
- Feature 2: blue / airplane-route / travel-place
- Feature 3: green / floral-leaf / group memory

The Visual Master itself already gives them slightly different dimensions rather than equal cards:
- Feature 1 approx `310 × 180` reference px
- Feature 2 approx `330 × 190` reference px
- Feature 3 approx `320 × 180` reference px

So do not equalize:
- module height/width;
- thumbnail size;
- padding;
- icon position;
- local spacing/overlap.

Small tilt/offset is allowed only when the Visual Master supports it or direct overlay improves. Do not add random scrapbook rotation by formula.

### 6. Date ticket / bottom story — REWORK
Both are currently weaker/compressed relative to the Visual Master. Their physical print-object character and occupied area must be restored before completion.

## Tactile print finish — P01 rule

P01 should feel like authored travel-magazine print ephemera, not flat digital UI or an AI sticker sheet.

Priority parts for restrained tactile character:
- `るるぶ` / `WEDDING` display art where appropriate;
- names ribbon;
- Date ticket;
- Feature 1/2/3 paper/photo-frame vessels;
- OUR JOURNEY stamp/postmark;
- bottom story vessel.

Allowed:
- subtle paper/matte feel;
- slight printed edge irregularity;
- restrained local depth/shadow;
- small material differences between paper/ticket/ribbon/stamp objects.

Do not use:
- uniform full-page grain;
- heavy vintage dirt;
- texture on faces;
- noise that reduces exact text or A5 readability;
- noise to disguise weak generation.

If texture becomes one of the first things noticed, it is too strong.

## Replaceable photo slots

- Hero: frame `3660:3`, image child `3660:4`
- Feature 1: frame `3660:5`, image child `3660:6`
- Feature 2: frame `3660:7`, image child `3660:8`
- Feature 3: frame `3660:9`, image child `3660:10`

All four passed **PHOTO_SWAP / STRUCTURAL QA**.

That result must not be misreported as visual completion.

## Proxy terminology

### STRUCTURAL_PROXY
May be unrelated imagery when testing only clipping/swap/crop mechanics.

### VISUAL_PROXY
Must be semantically/compositionally representative when judging hierarchy and Reference Delta.

P01 Hero requires a two-person people-led VISUAL_PROXY before visual acceptance.

## Google Drive traceability

- Source folder: [01_SOURCE_KEYED/P01](https://drive.google.com/drive/folders/1AIbUPb18DFdT035NW_3tSsCgp22Ct1-o)
- Production folder: [02_PRODUCTION_RGBA/P01](https://drive.google.com/drive/folders/1-zfSYIrxrPnwWQuAXO8-toHZEuz-zrNr)
- QA folder: [90_QA_EXPORT/P01](https://drive.google.com/drive/folders/1YQpvXrh8qHyv_LXLXoPYPC90dzQw3bAk)
- FIRST BUILD baseline: [P01_FIRST_BUILD_BASELINE](https://drive.google.com/drive/folders/1ggtQ4j0TCqBKm8O3hwVqkC0wbPDhZAKW)
- Promoted REWORK evidence: [P01_REWORK_CURRENT_QA_20260902](https://drive.google.com/drive/folders/1WCUtnm_trU9tEeuZ3tMFjN-PP0KEGw4d)
- Rejected folder: [99_REJECTED_DO_NOT_USE/P01](https://drive.google.com/drive/folders/1DXJ3gIlZalOiCeytBRnm425s3W9KO-bb)

Older QA exports that call the first build `FIGMA_COMPLETE` are historical evidence of the first-build pipeline, **not current visual acceptance evidence**.

## Current gate state

- `VISUAL_MASTER_LOCKED = YES`
- `PART_MAP_APPROVED = YES`
- `ASSETS_GENERATED = YES` for the promoted targeted rework
- `FIGMA_STRUCTURE_READY = YES`
- `PHOTO_SWAP_PASS = YES`
- `REPRESENTATIVE_VISUAL_PROXY_READY = YES` — Visual Master calibration proxy
- `IDENTITY_ANCHOR_PASS = YES`
- `REFERENCE_DELTA_PASS = YES / REWORK PROMOTED`
- `A5_READABILITY = PASS`
- `A5_PRINT_QA_PASS = NO` — real-photo raster/export check pending
- `HUMAN_FEEDBACK_REVIEWED = YES` — systemic lessons are written back to root/page/polish authority
- `FIGMA_DESIGN_COMPLETE = NO`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

## Next P01 work

1. replace the Visual Master calibration crops with user-supplied real photos;
2. recheck face-safe crops and support-photo semantics;
3. verify effective raster resolution and final A5 print export;
4. then set `FINAL_PHOTO_QA_PASS` / `A5_PRINT_QA_PASS` and reconsider `FIGMA_DESIGN_COMPLETE`.

`STRUCTURE READY ≠ VISUAL COMPLETE.`
