# Rurubu V6 Y + CN/CM — Profile Caption + Chronology QA

Date: 2026-08-17
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
V7: HOLD / untouched

## Authority readback before writes

- project-wide shared learning and Hybrid Authoring policy re-read;
- Rurubu production authorities, current status, failure memory and magazine knowledge base re-read;
- live Figma preferred Y + CL/CJ visually re-read;
- Drive V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` re-read live;
- GitHub main status re-read before each promoted write.

## CM — chronology minor-beat numeric anchors

### OBSERVED

CJ already separated major and minor events, but the chronology center-left still looked unfinished at actual size. Event 2 / 4 were semantically present yet visually too silent, leaving composed texture to read as unused paper rather than intentional editorial field.

### ROOT_CAUSE_HYPOTHESIS

Minor events do not need cards or feature photos, but a small native ordinal anchor plus stronger native title rhythm can make them intentional without flattening the major/minor hierarchy.

### TESTED_LOCAL

Rollback-safe clone of CJ:

- candidate root `1559:2`;
- chronology page `1559:27`;
- Event 2 / 4 existing native number nodes re-enabled at small `14px` scale;
- Event 2 / 4 small rule decorations hidden because the number now performs the navigation role;
- Event 2 / 4 title scale raised from `17px` to `22px` while retaining smaller date/copy;
- Event 3 replaceable photo increased from `285×210` to `310×230` and shifted left to strengthen the diagonal reading path;
- Event 3 source remains intrinsic-safe at `352×368`;
- Event 1 / 3 / 5 remain the stronger photographic beats; Event 2 / 4 remain minor;
- no new card, shadow, gradient, generated asset, raster byte or image hash.

### Expected improvement

- make the center-left field look authored rather than leftover;
- preserve clear 01→06 scan order;
- keep 01 / 03 / 05 visually dominant;
- avoid returning to an equal six-card timeline.

### Regression risk

- re-equalizing all six events;
- typography collision after reintroducing 02 / 04;
- low-resolution Event 3 enlargement;
- excess UI-like markers.

### Evidence

- whole spread / ~1200px: PASS;
- chronology actual-size `794×1123`: PASS;
- native text: `30`;
- text collision: `0`;
- 18px text safe-area risk: `0`;
- image intrinsic violations: `0`;
- image hashes changed: `0`;
- only detected page overflow is the already-intentional top hero bleed, not text or accidental geometry.

### Status

`VERIFIED_LOCAL / ADOPTED`

- CM `1559:2` promoted to `PREFERRED / V6_INSIDE_CM_CHRONOLOGY_MINOR_BEAT_NUMERIC_ANCHORS_2026_08_17`;
- CJ `1554:97` preserved as hidden rollback.

## CN — Profile snapshot editorial captions

### OBSERVED

CL Profile had a strong hero and three replaceable overlapping snapshots, but the snapshot cluster still read partly as a placed-photo collage rather than edited magazine content.

### ROOT_CAUSE_HYPOTHESIS

Existing native caption roles can give each photo an editorial purpose without introducing another card, sticker or composed decoration.

### TESTED_LOCAL — attempt 1

Rollback-safe clone of CL:

- candidate root `1562:2`;
- Profile page `1562:3`;
- existing hidden native caption nodes activated with short editable metadata;
- first placement put captions over the photographs.

Result: `REJECTED` because real photo contrast made the 9px metadata too weak and inconsistent.

### TESTED_LOCAL — attempt 2

The same existing native caption nodes were moved outside the photo borders onto the cream page:

- `CAFE MEMORY / FAVORITE SCENE`;
- `NIGHT WALK / PHOTO NOTE`;
- `YOKOHAMA / NEXT VIEW`.

The wording remains editable dummy editorial metadata, not final factual copy.

### Expected improvement

- bind each snapshot to an editorial role;
- reduce generic photo-collage feeling;
- retain clean image replacement and native-text editability;
- add magazine density without another container.

### Regression risk

- captions becoming decorative clutter;
- poor actual-size legibility;
- collision with rotated photo bounds or folio;
- false implication that dummy microcopy is final factual copy.

### Evidence

- Profile actual-size `794×1123`: PASS;
- whole Profile/Q&A spread / ~1200px: PASS;
- visible Profile native text: `22`;
- text collision: `0`;
- 18px text safe-area risk: `0`;
- visible overflow: `0`;
- all Profile images intrinsic-safe:
  - main `793.7×328` / source `1356×560`;
  - snapshot 1 `410×280` / source `810×552`;
  - snapshot 2 `340×245` / source `352×368`;
  - snapshot 3 `238×185` / source `240×220`;
- image hashes changed: `0`;
- Q&A geometry/content remained unchanged from verified CL.

### Status

`VERIFIED_LOCAL / ADOPTED`

- CN `1562:2` promoted to `PREFERRED / V6_INSIDE_CN_PROFILE_SNAPSHOT_CAPTIONS_2026_08_17`;
- CL `1556:2` preserved as hidden rollback.

## Current live preferred set

- Outer Y `1542:2`;
- Profile / Q&A CN `1562:2`;
- Story / chronology CM `1559:2`;
- Start Here: `V5 FU/FX · V6 Y + CN/CM INSIDE STUDIES · V7 HOLD`.

## Asset lifecycle truth

- newly image-generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new raster bytes: `0`;
- image hashes changed: `0`;
- existing replaceable image semantics preserved: `YES`;
- native variable text preserved: `YES`;
- rollback history preserved: `YES`;
- V7 touched: `NO`.

## Completion truth

This is verified dummy-design progress, not completion. Final legitimate photography, final copy stress, exact printer template, bleed/trim/fold verification, PDF preflight and physical proof remain required before `PRINT_READY`.