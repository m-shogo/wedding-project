# V30 P01 production assets

Status: `P01_PROMOTED_CURRENT_WITH_CARRYOVER_AND_PROXY_DEBT / FINAL_PHOTO_QA_PENDING`

P01 is the V30 pilot page.

The targeted REWORK remains materially better than FIRST BUILD and stays the valid CURRENT at Figma node `3535:7`. **Do not roll back to FIRST BUILD.**

However, later owner feedback exposed two additional issues that reopen final visual acceptance:

1. several visible FIRST BUILD production assets were intentionally carried into CURRENT and still show older visual language; and
2. Hero + Feature 1–3 temporary photo proxies were cropped from the P01 Visual Master, which can bake page background/decorations into the photo slot and make photo-vs-page-part boundaries unclear.

Therefore:

- `PROMOTION = VALID`
- `BEST_CURRENT = REWORK`
- `CLEAN_PROXY_PASS = NO / ACTIVE PROXY METHOD DEPRECATED`
- `BUNDLED_DISPLAY_MODULE_PASS = NO / REBUILD OPEN`
- `VISUAL_CARRYOVER_PASS = NO / AUDIT OPEN`
- `FINAL REFERENCE_DELTA_PASS = REOPENED`
- `FIGMA_DESIGN_COMPLETE = NO`
- `FINAL_PHOTO_QA_PENDING = YES`

Required authorities:
- `docs/RURUBU-CURRENT.md`
- `assets/rurubu-v30/manifest.json`
- `assets/rurubu-v30/visual-polish-manifest.json`
- `assets/rurubu-v30/p01/manifest.json`
- `assets/rurubu-v30/p01/polish-manifest.json`
- `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`

## Current page / Figma authority

- Cover: `るるぶ WEDDING`
- CURRENT frame: `3535:7`
- A5 logical frame: `559 × 794 px`
- physical intent: `148 × 210 mm`

### Known temporary Figma cleanup for Codex

An accidental duplicate exists:

- `3708:2` — `V30 P01 / CARRYOVER REWORK / TEMP`

It overlaps the P02 area and is not production authority.

**Codex must delete `3708:2` at the beginning of the next P01 production pass.**

Do not delete or overwrite the real P02 frame `3535:9`.

## What the promoted REWORK successfully improved

The current P01 is still better than FIRST BUILD in:
- `るるぶ` identity anchor;
- `Shogo & Shiori` display treatment;
- people-led Hero hierarchy;
- `2026` treatment;
- overall title/Hero first impression.

Current accepted identity art includes:

| Asset | Role | Current status |
| --- | --- | --- |
| `V30_P01_MASTHEAD_RURUBU_REWORK_FINAL_RGBA.png` | `るるぶ` display art | CURRENT / TRUE ALPHA VERIFIED |
| `V30_P01_NAMES_LOCKUP_REWORK_FINAL_RGBA.png` | exact `Shogo & Shiori` display art | CURRENT / TRUE ALPHA VERIFIED |

Generated candidates that only *looked* transparent because checkerboard pixels were baked into RGB remain rejected. Actual alpha-channel inspection is mandatory.

## Visual-Master crop proxies — DEPRECATED

The following files were useful historical calibration experiments but are **not valid active photo proxies for the next production pass**:

- `V30_P01_HERO_VISUAL_PROXY_FROM_MASTER_CALIBRATION.png`
- `V30_P01_FEATURE_1_VISUAL_PROXY_FROM_MASTER_CALIBRATION.png`
- `V30_P01_FEATURE_2_VISUAL_PROXY_FROM_MASTER_CALIBRATION.png`
- `V30_P01_FEATURE_3_VISUAL_PROXY_FROM_MASTER_CALIBRATION.png`

Status:
`QA_HISTORY_ONLY / DO_NOT_USE_AS_ACTIVE_PROXY`.

Reason:
- a crop from `P01.png` can contain sky/background, flower decoration, borders, frames, labels or other layout art;
- decoration can then appear both inside the photo proxy and as a separate page layer;
- it becomes difficult to tell which pixels belong to the photo and which belong to the page design;
- Reference Delta may look better for the wrong reason because target layout information is already baked into the photo fill.

### Next active proxy sources

Use, in order:
1. suitable user-provided real photo;
2. clean standalone representative photo;
3. clean generated standalone proxy photo with **no P01 page-layout decoration**.

Roles:
- Hero → clean standalone two-person couple/wedding proxy;
- Feature 1 → clean standalone couple/profile proxy;
- Feature 2 → clean standalone travel/place proxy;
- Feature 3 → clean standalone group/friends proxy.

A proxy must not contain:
- P01 border;
- `WEDDING` / `るるぶ` / page label;
- Feature number/heading;
- Date ticket;
- stamp/page badge;
- flower/route/sticker copied from the P01 layout;
- already-designed photo frame/backing.

The Visual Master remains the **comparison authority**, not photo-slot source material.

## P01 fixed display modules — COMPLETE MODULE GENERATION

For these short fixed elements, the visible text does **not** need to remain editable in Figma.

The exact approved string/number is preserved in the manifest / asset metadata and must be QA-checked after generation.

### 1. Year module

Exact fixed text:
- `2026`

May be one generated/prepared object containing:
- `2026`;
- yellow cloud/burst backing;
- outline/depth;
- attached heart / airplane / dotted-route accents when they visually behave as one year cluster.

### 2. Date Ticket module

Exact fixed text:
- `WEDDING DATE`
- `2026.10.24`
- `SAT.`

Generate as one complete visible module:
- postal/ticket paper;
- all three text lines;
- cancellation/wave lines;
- small fixed flower/accent;
- printed edge/shadow.

Do **not** rebuild this as old backing + generic editable Figma text merely for editability.

### 3. Feature 1 module

Exact visible content:
- `1`
- `ふたりのプロフィール`

One module may include:
- number badge + `1`;
- fixed heading;
- camera icon;
- vessel/background;
- fixed local decoration.

Keep separate:
- Feature 1 replaceable photo;
- its mask/frame where required for photo swapping.

### 4. Feature 2 module

Exact visible content:
- `2`
- `旅の思い出`

One module may include:
- number badge + `2`;
- fixed heading;
- airplane / dotted route;
- vessel/background;
- fixed local decoration.

Keep Feature 2 replaceable travel/place photo separate.

### 5. Feature 3 module

Reference visible content:
- `3`
- `家族と友達`

One module may include:
- number badge + `3`;
- approved fixed heading;
- flower/leaf iconography;
- vessel/background;
- fixed local decoration.

Keep Feature 3 replaceable group/friends photo separate.

`家族と友達` here is P01 Visual-Master reference wording; it does **not** change the current P05 FRIENDS-only page role.

### 6. Bottom Story module

Exact fixed text:
- `ふたりの“楽しい!”を詰めこんだ`
- `わたしたちの旅ストーリー`

May be one generated/prepared object containing:
- irregular white story vessel;
- both fixed lines;
- heart;
- sparkles;
- local fixed outline/shadow accents.

Keep the large bottom floral closure separate where independent overlap/placement is needed.

### 7. OUR JOURNEY stamp module

Exact fixed text:
- `OUR JOURNEY`
- `TAKE A TRIP`

One module may contain:
- stamp circle;
- fixed lettering;
- cancellation/wave lines;
- fixed iconography.

### 8. PAGE 01 module

Exact fixed text:
- `PAGE`
- `01`

One module may contain:
- page badge backing;
- `PAGE`;
- `01`;
- attached small heart/accent.

### Other fixed identity art

These may also remain complete display art:
- `るるぶ`
- `WEDDING`
- `Shogo & Shiori`

The exact strings remain controlled in manifest/metadata. A hidden duplicate Figma text layer is **optional**, not mandatory.

## What must still stay separate/native

Do not bake into fixed generated modules:
- replaceable real/proxy photographs;
- long body copy;
- personal/TBD facts;
- frequently changing text;
- unapproved Q&A / story copy.

## Visual carry-over debt

`NO OLD HIDDEN LAYERS` does not imply `NO OLD VISUAL LANGUAGE`.

Current inherited-asset decisions are controlled by `p01/polish-manifest.json`.

### Rebuild / replace as bundled display modules

- old Date ticket backing;
- old Feature 1 vessel;
- old Feature 2 vessel;
- old Feature 3 vessel;
- old Bottom Story vessel;
- OUR JOURNEY stamp treatment;
- PAGE 01 treatment.

### Explicit requalification still needed

- names ribbon backing.

### Provisionally requalified

Subject to adjacency recheck:
- WEDDING title;
- right destination cluster;
- left tropical cluster;
- airmail border;
- bottom floral cluster — recheck after Bottom Story changes.

`KEEP_REQUALIFIED` means explicitly checked in CURRENT; unchanged/old/ADOPTED is not enough.

## Feature irregularity

Feature 1/2/3 are one editorial family, not equal UI cards.

Approx Visual Master sizes:
- Feature 1: `310 × 180` reference px;
- Feature 2: `330 × 190`;
- Feature 3: `320 × 180`.

Preserve differences in:
- module dimensions;
- photo dimensions;
- local spacing;
- icon placement;
- overlap;
- heading treatment.

Do not add random scrapbook rotation.

## Replaceable photo contract

Hero + Feature 1–3 remain independent clipped photo slots.

All bundled display-module work must preserve:
- separate photo content;
- non-destructive crop;
- independent replacement;
- no decoration disappearing when the photo is swapped.

## Google Drive traceability

- Source folder: [01_SOURCE_KEYED/P01](https://drive.google.com/drive/folders/1AIbUPb18DFdT035NW_3tSsCgp22Ct1-o)
- Production folder: [02_PRODUCTION_RGBA/P01](https://drive.google.com/drive/folders/1-zfSYIrxrPnwWQuAXO8-toHZEuz-zrNr)
- QA folder: [90_QA_EXPORT/P01](https://drive.google.com/drive/folders/1YQpvXrh8qHyv_LXLXoPYPC90dzQw3bAk)
- FIRST BUILD baseline: [P01_FIRST_BUILD_BASELINE](https://drive.google.com/drive/folders/1ggtQ4j0TCqBKm8O3hwVqkC0wbPDhZAKW)
- Promoted REWORK evidence: [P01_REWORK_CURRENT_QA_20260902](https://drive.google.com/drive/folders/1WCUtnm_trU9tEeuZ3tMFjN-PP0KEGw4d)
- Rejected folder: [99_REJECTED_DO_NOT_USE/P01](https://drive.google.com/drive/folders/1DXJ3gIlZalOiCeytBRnm425s3W9KO-bb)

The old crop-proxy files may remain as historical QA/provenance, but must not be treated as active proxy authority.

## Current gate state

- `VISUAL_MASTER_LOCKED = YES`
- `PROMOTION = YES / BEST CURRENT`
- `FIGMA_STRUCTURE_READY = YES`
- `IDENTITY_ANCHOR_PASS = YES` for current accepted major anchors
- `CLEAN_PROXY_PASS = NO`
- `BUNDLED_DISPLAY_MODULE_PASS = NO`
- `VISUAL_CARRYOVER_PASS = NO`
- `REFERENCE_DELTA_PASS = REOPENED`
- `PHOTO_SWAP_PASS = STRUCTURAL PASS / RERUN AFTER CLEAN PROXY INSTALLATION`
- `A5_PRINT_QA_PASS = NO`
- `HUMAN_FEEDBACK_REVIEWED = YES / AUTHORITY UPDATED`
- `FIGMA_DESIGN_COMPLETE = NO`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

## Next P01 production work — CODEX ONLY

After authority review is complete, Codex should:

1. delete mistaken TEMP `3708:2` without touching P02 `3535:9`;
2. replace all four Visual-Master-crop proxies with clean standalone proxies;
3. generate/rebuild complete Feature 1/2/3 modules while preserving separate photos;
4. generate complete Date Ticket module;
5. generate complete Bottom Story module;
6. regenerate/requalify OUR JOURNEY and PAGE 01 modules;
7. explicitly requalify the names ribbon backing;
8. recheck bottom floral adjacency;
9. capture fresh CURRENT screenshot;
10. run `CLEAN_PROXY_PASS → BUNDLED_DISPLAY_MODULE_PASS → IDENTITY_ANCHOR_PASS → VISUAL_CARRYOVER_PASS → REFERENCE_DELTA_PASS`;
11. report remaining debt before moving to P02.

`BEST CURRENT ≠ FINAL COMPLETE.`
