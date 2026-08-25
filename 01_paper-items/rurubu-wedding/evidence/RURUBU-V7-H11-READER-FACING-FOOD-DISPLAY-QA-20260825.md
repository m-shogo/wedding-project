# Rurubu V7 H11 — Reader-facing food display QA

Date: 2026-08-25
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Problem observed

H10 `2467:2` used a large fixed Table display reading `料理、皿、手元、店の空気。`. The underlying idea was useful for photo art direction, but at reader-facing display scale the wording read like an internal shot list/checklist rather than publication voice. V8 AS8 had independently exposed the same root class in a restrained book system.

## New professional input

Fresh references were used for the decision rather than repeating the prior V8 rationale:

- Society of Publication Designers, *Food & Wine's Photography Issue*: the creative team describes photography as the lead and design/type as a flexible supporting system; the successful cover came from treating the photograph as the cover rather than placing generic cover furniture over it. https://www.spd.org/behind-the-scenes/food-and-wines-photography-issue
- Bon Appétit redesign announcement: maintain playfulness while reducing visual noise and letting the publication voice come from a coherent editorial system rather than generic decorative language. https://www.bonappetit.com/story/bon-appetit-redesign-announcement
- Bon Appétit 2025 Innovation Issue making-of: visual concept and simplified treatment were developed around the story idea, not a generic checklist of production terms. https://www.bonappetit.com/story/innovation-issue-behind-the-scenes-2025

Rurubu-specific hypothesis: V7 should keep its high-energy Japanese travel-magazine voice, but internal food-photo evaluation nouns should be translated into a reader-facing promise rather than shown as the headline itself.

## Bounded experiment

Rollback-safe candidate: H11 `2537:2` cloned from H10.

Only the fixed Table display role changed:

- old visible fixed display hidden in H11; H10 preserved intact as rollback;
- new editable source `2537:25`;
- native source copy: `ひと皿から、` + `旅が深まる。`;
- native source font: `Noto Sans JP Bold`;
- one coral vertical rule used as the second-beat binder;
- source exported inside Figma at 4× (`2080×600`);
- fixed raster node `2537:29`, displayed `520×150`;
- imageHash `0ffb0b20579b07230ce643665adb2b61d68fd882`;
- editable source retained hidden;
- no variable/factual copy change;
- no photo/crop/hash change;
- no new card, pill, badge, shadow or gradient.

## Three-scale review

### Whole-item / thumbnail

PASS. The right-page opening now reads as an editorial invitation rather than production schema. The high-energy V7 personality remains distinct from V8 AS8.

### Reading / 1400px

PASS. `ひと皿から、旅が深まる。` reads naturally before the dominant dining image and the following `一皿ずつ分け合いながら。` body. The coral rule is functional as the secondary beat rather than decorative noise.

### Actual-size / 1587×1123

DESIGN QA PASS. The fixed display remains sharp because its intrinsic raster is `2080×600` for a `520×150` role. Photo content remains structural dummy, so REAL CONTENT QA is still blocked.

## Structure QA

- effectively visible native text: `11`;
- visible image roles: `5`;
- text intersections: `0`;
- Japanese→Inter mismatch: `0`;
- parent: `2052:2`;
- V7/V8 current roots: `12/12` visible on `2052:2`;
- current-root pairwise overlap: `0`.

## Professional critique

- Art director: PASS — clearer idea and more publication-specific voice.
- Editorial designer: PASS — right-page read order is title → food image → shared-meal body → close.
- Book designer: PASS for V7 sequence — this remains a strong high-tempo beat rather than borrowing V8 restraint.
- Typographer: PASS — Japanese line breaks and scale are intentional; fixed source remains editable.
- Photo editor: composition-only PASS; image truth remains blocked because current photos are dummies.
- Print designer: display graphic itself is high-resolution enough for current role; final photography/printer proof remain blocked.

## Failure learning

No new failure ID. This independently reproduces RSL-272 in a materially different V7 high-energy system.

State update for RSL-272: `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE` within Rurubu WEDDING. It is not `VERIFIED_CROSS_ITEM` because V7 and V8 are still the same Rurubu item.

## High-resolution Outer transport recheck

A material capability change existed this run: official Figma `upload_assets` was available. Drive master `1NsFR25Q963Nk847fTMB3elwWy689P8XY` was materialized locally successfully, and one official upload target was requested for C12 hero `2486:51`. The POST failed with the already-known DNS fingerprint `Could not resolve host: mcp.figma.com`.

Per RSL-005, no identical retry followed. C12 remained unchanged and not current.

## Promotion

H11 `2537:2` promoted current at `x=19500 / y=13000`.
H10 `2467:2` preserved hidden rollback at `x=300000`.

Completion truth: `DESIGN QA PASS / REAL-PHOTO-BLOCKED / NOT PRINT READY`.
