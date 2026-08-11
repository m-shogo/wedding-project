# Rurubu V5 learning run — BY/BZ clean-room subtraction

Date: 2026-08-11
Scope: Rurubu WEDDING only

## Authority state before writes

- GitHub main was re-read from the latest authority state.
- Figma production file was re-read from live candidates and Current frames.
- Google Drive Q60 authority was re-read from Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`.
- Current outer `77:18` and Current inside `77:290` were never mutated.

## Q60 transport decision

A rollback-safe duplicate was prepared as outer frame `794:2`, hero `794:133`. The prior shared-plugin-data continuation was tested only against staging state, not Current. The expected historical chunk keys were absent in the current runtime namespace; a second diagnostic path for private plugin-data key introspection was unsupported by the host. Both calls failed atomically and did not alter the canvas.

Per the rule to switch after two failures, Q60 chunk transport was stopped for this run. Q60 remains authoritative in Drive but **not placed or visually verified in Figma**.

## BY — back cover chronology

Candidate: `796:2` — `V5_OUTER_RURUBU_CLEANROOM_BY_BACK_TRAVELLOG_STAGGER_2026_08_11`

### Visible defect

BW still used six identical colored timeline dots with evenly distributed year/event columns. Even with a zig-zag route line, the result retained a web-stepper/dashboard silhouette.

### Capability / principle tested

Subtraction + asymmetric editorial chronology: remove the controls, keep the route, retain semantic/native chronology text, vary scale and vertical rhythm.

### Changes

- Six dot nodes hidden, not deleted.
- Twelve existing year/event native text nodes re-positioned around the existing journey route.
- `202x`, `2026.02.11`, and `2026.10.24` receive stronger scale hierarchy than transitional events.
- No new card, badge, gradient, image, or generated asset.

### Evidence

- Whole-spread screenshot: chronology no longer reads as six equal controls.
- Back-page/reading review: alternating labels follow the zig-zag and preserve chronology.
- Structure QA bottom zone: `0` text-text intersections.
- Visible IMAGE fills: `7`; hashes preserved, including cover temporary hash `539c259be8036b481d06b4f76db9a39b407d90e8`.
- Fold: provisional guide `x=792.7000122070312`, width `2`, height `1122.5`.

### Decision

**Adopt BY over BW as the outer comparison candidate.** This does not satisfy the Q60 raster gate and does not make V5 complete.

## BZ — direct-on-photo history heading

Candidate: `798:2` — `V5_INSIDE_RURUBU_CLEANROOM_BZ_HISTORY_DIRECTPHOTO_TYPE_2026_08_11`

### Visible defect

BU's right-page history photo was strong, but the large cream `BK_HISTORY_TITLE_PAPER` remained a card-like rectangle that covered the photo and weakened magazine-photo dominance.

### Capability / principle tested

Use the photograph's text-safe sky area as editorial space instead of adding an opaque container. Preserve native text and support readability only with restrained shadow.

### Changes

- `BK_HISTORY_TITLE_PAPER` hidden, not deleted.
- Existing `IA_HISTORY_HEADING` moved to `(36, 28)`, `42px`, white.
- Existing `IA_HISTORY_SUB` moved to `(40, 92)`, `11.5px`, warm white.
- Both receive restrained dark drop-shadow only; no replacement card/gradient/pill.

### Evidence

- Whole-spread screenshot: history photo reads as full-bleed photography first, headline second.
- Right-page screenshot: white title remains legible in the sky text-safe zone.
- Header/history structure QA: `0` text-text intersections.
- Visible native text: `54`.
- IMAGE fills: `6`, all existing hashes preserved:
  - profile A `a39dd297eb9de572317a5ce57f0af12e8597b156`
  - profile B `2359f635b4926a83e22ca1f9214e75c709291152`
  - history `539c259be8036b481d06b4f76db9a39b407d90e8`
  - memory 1 `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - memory 2 `439a719d73f28e8dd2889f2026cccb15f345ec63`
  - memory 4 `c09aa82e7b2ac75708707345c6f845452bf67663`
- Fold remains provisional at `x=792.7000122070312`, width `2`, height `1122.5`.

### Decision

**Adopt BZ over BU as the inside comparison candidate.** It is a safe duplicate, not Current.

## Reusable Rurubu lessons

1. A zig-zag route line cannot by itself rescue six equal dots; if chronology still resembles a stepper, remove the controls and make hierarchy typographic.
2. A strong photograph with a real text-safe zone should be tested with direct native typography before introducing an opaque paper/card.
3. Card subtraction should be judged at whole spread first: the gain is photo dominance and silhouette, not just local cleanliness.
4. Preserve semantic text and image hashes while changing hierarchy. A clean-room visual direction does not require destroying provenance or editability.
5. Transport capability is not asset completion. Q60 remains incomplete until exact Figma placement, hash/readback, screenshot, crop, structure, and ledger verification all close.

## Gate state after run

- Generated new images: `0`.
- Newly adopted generated images: `0`.
- BY outer: placed + screenshot reviewed + structure QA passed.
- BZ inside: placed + screenshot reviewed + structure QA passed.
- Q60: Drive verified; exact Figma placement **NO**; Figma visual QA **NO**.
- V5: **not complete**.
- V6 production: **not started**.
