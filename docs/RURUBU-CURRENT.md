# Rurubu WEDDING — CURRENT POINTER

Status: `V30_ONLY / P01-P02_LOCKED / P03_STYLE_REALIGNMENT_REOPENED / 2026-09-03`

V30 is the sole current production version. V20 is history/reference only. Do not create V31 unless explicitly requested.

## Required read set — before production writes

1. `docs/RURUBU-CURRENT.md`
2. actual target-page Visual Master
3. `assets/rurubu-v30/manifest.json`
4. `assets/rurubu-v30/visual-polish-manifest.json`
5. `assets/rurubu-v30/ornament-art-direction-manifest.json`
6. `assets/rurubu-v30/publication-display-system-manifest.json`
7. `docs/rurubu-v30/TRUE-ALPHA-ASSET-GENERATION-POLICY.md`
8. target page manifest / polish manifest / latest page override
9. `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`
10. page README/production evidence when relevant

Newest explicit owner feedback wins.

Current precedence:
`owner feedback → latest page-specific authority → publication display system / page ornament authority → global ornament art direction → visual-polish → true-alpha policy → older generic/root/page-main language`

## Workflow ownership

### ChatGPT
- owner feedback / Visual Master / live Figma review
- Root/shared/page authority improvement
- stale-rule/contradiction cleanup
- Codex handoff
- post-build live Figma review

### Codex
- production ImageGen
- true-alpha/cutout preparation
- Figma writes/cleanup/components
- screenshots/exports
- Drive/Git production evidence

ChatGPT does not perform production Figma/ImageGen writes unless explicitly reassigned.

## Figma authority

File: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `V30_FINAL_PRODUCTION`

- P01 `3535:7`
- P02 `3535:9`
- P03 `3535:11`
- P04 `3535:13`
- P05 `3535:15`
- P06 `3535:17`
- P07 `3535:19`
- P08 `3535:21`

## V30 CROSS-PAGE STYLE FAMILY — HARD

P01 `3535:7` and P02 `3535:9` are the current **V30 style anchors**.

They are **not layout templates**. Later pages must not copy their composition, module count or cover/profile structure.

They do define the active publication family for major display art, editorial papers and travel/tropical ornament treatment.

### Active V30 style DNA

- bright, high-saturation travel-magazine energy;
- crisp printed/sticker-like silhouettes;
- strong dark outlines or equivalent high-contrast edge definition for high-saliency display art;
- white/yellow/bright keylines and controlled dimensional shadows where useful;
- clean cream/white editorial paper rather than aged parchment;
- bold pink / blue / yellow / green / cyan relationships;
- tropical/travel motifs used as lively editorial cutouts/stickers rather than fine-art illustrations;
- restrained tactile print texture, never a new vintage/watercolor genre;
- mixed media is allowed only within a bounded realism/texture range that still looks art-directed by one V30 publication team.

### HARD REJECT — cross-page style drift

Do not allow a later page to become:
- watercolor / painterly tropical art;
- vintage/sepia scrapbook or aged parchment;
- retro travel-poster illustration;
- realistic botanical illustration plate;
- a generic Canva/SVG icon system;
- a mixture of painterly vintage blocks and flat flowchart/SVG parts.

`ANTI_CANVA` does **not** mean “switch to watercolor/vintage.”

The correct target is:

`P01/P02 V30 GRAPHIC FAMILY + TARGET PAGE'S OWN COMPOSITION`

Gate before design lock:

`CROSS_PAGE_STYLE_FAMILY_PASS`

A page may not reach `FIGMA_DESIGN_COMPLETE = YES` until a direct side-by-side review against at least the locked P01/P02 style anchors confirms it still looks like the same publication.

## System architecture — current

Ornament/art direction:
`RURUBU_EDITORIAL_DNA → V30_ART_DIRECTION → CROSS_PAGE_STYLE_FAMILY → PAGE_VISUAL_LANGUAGE → ORNAMENT_FAMILY → ASSET_INSTANCE`

Production strategy:
`PLAN_GLOBALLY_CALIBRATE_UPFRONT_PRODUCE_CONTEXTUALLY`

Display roles:
- `GENERATED_DISPLAY_ASSET`
- `NATIVE_TEXT`
- `SHARED_PUBLICATION_COMPONENT`
- `PAGE_SPECIFIC_ORNAMENT`
- `PHOTO`

Before design lock:
- `LIVE_ROLE_IMPLEMENTATION_PASS`
- `CROSS_PAGE_STYLE_FAMILY_PASS`
- `PAGE_SPECIFIC_ASSET_FINGERPRINT_PASS`

Floating generated art follows true-alpha preflight; checkerboard RGB is never accepted as transparency.

## Shared PAGE badge — HARD

PAGE 01 / 02 / 03... uses one real Figma component system:

`PAGE_BADGE_SHARED_MASTER = 3772:2`

Only the controlled page-number property changes. Do not independently generate/redraw PAGE badges per page.

## P01 — DESIGN LOCKED

Frame `3535:7`.

Use as a V30 style anchor, not as a composition template.

- `FIGMA_DESIGN_COMPLETE = YES`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

## P02 — DESIGN LOCKED

Frame `3535:9`.

Use as a V30 inside-page style anchor, not as a composition template.

- `FIGMA_DESIGN_COMPLETE = YES`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

## P03 — REOPENED FOR V30 STYLE REALIGNMENT + GROUPED STORY ECOLOGY

Frame: `3535:11`
Role: `OUR STORY + Q3/Q4 / STORY_TIMELINE_EDITORIAL_PAGE`
Visual Master: `assets/rurubu-v30/p03/P03.png`
Current authority: `assets/rurubu-v30/p03/polish-manifest.json`

### Why P03 is reopened

A direct P01/P02/P03 live comparison found two simultaneous style failures:

1. grouped-regeneration blocks drifted too far into painterly / vintage / parchment / botanical illustration language;
2. preserved timeline pieces remained Canva/SVG/flowchart-like.

So P03 currently contains **two different non-V30 genres on one page**.

The prior grouped-regeneration PASS declarations are superseded by the latest owner feedback and live cross-page review.

### Rework targets

REWORK:
- `P03_HEADER_ECOLOGY / GROUPED_REGENERATION / COPY_LOCKED`
- `P03_Q3_EDITORIAL_FAMILY / GROUPED_REGENERATION / Q3_ONLY`
- `P03_Q4_EDITORIAL_FAMILY / GROUPED_REGENERATION / Q4_ONLY`
- `P03_BOTTOM_CLOSURE_ECOLOGY / GROUPED_REGENERATION / P03_SPECIFIC`
- `P03_STEP3_CAMERA / P03_SPECIFIC`
- `P03_HERO_LOWER_PLUMERIA / P03_SPECIFIC`
- `P03_CONTINUOUS_TIMELINE_ROUTE / ONE_ROUTE`
- `P03_STEP2_PALM / P03_SPECIFIC`
- `P03_TIMELINE_STEP_1_LABEL / GENERATED_DISPLAY_ASSET`
- `P03_TIMELINE_STEP_2_LABEL / GENERATED_DISPLAY_ASSET`
- `P03_TIMELINE_STEP_3_LABEL / GENERATED_DISPLAY_ASSET`
- `P03_TIMELINE_STEP_4_LABEL / GENERATED_DISPLAY_ASSET`
- `P03_TIMELINE_STEP_5_LABEL / GENERATED_DISPLAY_ASSET`
- `P03_WEDDING_DAY_CARD / GENERATED_DISPLAY_ASSET / 2026.10.24`

### Correct new grouping

#### A. Header ecology

One V30-aligned grouped block:
- OUR STORY
- `ふたりのこれまで♡`
- ribbon / airplane / heart-route logic
- necessary tropical accents

Must match P01/P02 graphic/sticker/print energy. No watercolor/vintage genre drift.

#### B. Q3/Q4 editorial family

Calibrate one bright V30 paper family, then create two non-mirrored blocks.

Keep question/answer copy native until approved.

Use clean bright paper comparable to the V30/P02 publication family. No aged parchment/scrapbook treatment.

#### C. Story timeline ecology — one block

Group together:
- `1 出会い`
- `2 デート`
- `3 旅`
- `4 プロポーズ`
- `5 今日`
- route/movement logic
- step-number/headline family
- camera/palm and only required fixed accents
- `Wedding Day`
- `2026.10.24` as the terminal story endpoint

Keep separate:
- all personal/body copy;
- four support photo fills;
- Hero;
- Step5 remains no-photo.

Reject the current orange dotted connector + separate heart-label/icon grammar.

#### D. Bottom closure

One V30-aligned support block.

Use bold editorial cutout/sticker language compatible with P01/P02, not watercolor church / realistic botanical / retro travel-poster language.

PAGE03 shared instance remains separate.

### Micro ornament rule

Do not regenerate rejected isolated icons as new isolated icons.

`P03_STEP3_CAMERA`, `P03_STEP2_PALM`, `P03_HERO_LOWER_PLUMERIA` and similar accents must either:
- be integrated into the nearest grouped ecology; or
- be removed if not necessary.

### Preserve

- Hero role and main geometry;
- five total photo roles;
- Step5 no-photo behavior;
- personal/native pending body copy;
- PAGE03 `3782:16` / master `3772:2` / value `03`;
- airmail border;
- overall P03 information architecture.

### Current P03 gates

- `CROSS_PAGE_STYLE_FAMILY_PASS = FAIL_CURRENT_P03`
- `ECOLOGY_FIT_PASS = REOPENED`
- `ANTI_FLOWCHART_PASS = FAIL_CURRENT_TIMELINE`
- `ANTI_CANVA_SVG_PASS = REOPENED`
- `ANTI_CLIPART_PASS = REOPENED`
- `ORNAMENT_FAMILY_PASS = REOPENED`
- `REFERENCE_DELTA_PASS = REOPENED_AFTER_STYLE_REALIGNMENT`
- `FIGMA_DESIGN_COMPLETE = NO`
- `FINAL_COPY_QA_PENDING = YES`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

P03 may relock only after a direct P01/P02/P03 side-by-side review confirms:

1. same V30 publication family;
2. no painterly/vintage genre drift;
3. no flowchart/SVG timeline feel;
4. target P03 composition remains intact;
5. photos/body copy remain independently replaceable/editable.

## P04-P08 — before production

Do not start final production until each page Visual Master is directly reviewed and current page authority is prepared.

For every future page, before broad ImageGen:

1. inspect target Visual Master for local composition;
2. inspect locked P01/P02 CURRENT for V30 style family;
3. define grouped ecologies before generating small ornaments;
4. generate one calibration sample first;
5. fail immediately if it drifts into watercolor/vintage/Canva/SVG/another unrelated genre;
6. only then produce the page-specific assets.

The target page may have a different layout, density and motif selection, but it must still pass `CROSS_PAGE_STYLE_FAMILY_PASS` before `FIGMA_DESIGN_COMPLETE = YES`.
