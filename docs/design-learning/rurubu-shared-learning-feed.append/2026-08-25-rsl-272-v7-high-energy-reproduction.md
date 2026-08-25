# RSL-272 — V7 high-energy reproduction

Date: 2026-08-25
Source scope: Rurubu WEDDING
Source system: V7 high-energy Japanese travel-information editorial
State: `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`

Fingerprint: `F-RSL-272-INTERNAL-PHOTO-BRIEF-VOCABULARY-LEAKS-INTO-READER-FACING-DISPLAY-COPY`

## Reproduction

V8 AS8 first verified this failure in a restrained editorial-monograph system. V7 H10 independently reproduced the same root defect under a materially different high-energy magazine system.

H10's fixed Table title `料理、皿、手元、店の空気。` was semantically valid as photo-art-direction vocabulary, but at display scale it read like an internal shot list/schema rather than reader-facing magazine voice.

Rollback-safe H11 `2537:2` replaced only that fixed display role with `ひと皿から、旅が深まる。`, authored as a 4× Figma-internal raster from preserved editable Noto Sans JP source. Layout, photos, crop, factual/native variable copy and overall V7 visual grammar stayed unchanged.

Three-scale result: PASS at whole-item, reading and actual-size DESIGN QA. Structure: effectively visible native text `11`, text intersections `0`, Japanese→Inter mismatch `0`, authority parent `2052:2`, current-root overlap `0`.

## Generalizable principle

Internal design-brief, shot-list, CMS/schema, production-checklist or evaluation vocabulary may be useful upstream but must not become reader-facing display language by default. Translate the editorial intent into publication voice appropriate to the system being designed.

This does **not** mean that noun lists are forbidden, that V7 should copy V8 wording, or that every fixed title should be rasterized. The receiving design must preserve its own art direction and test a reader-facing formulation locally.

## What remains Rurubu-specific

- `ひと皿から、旅が深まる。`
- 62/34px source typography
- coral second-beat rule
- 520×150 role geometry
- cobalt/coral/yellow V7 grammar
- H11 photo hierarchy

## Why not VERIFIED_CROSS_ITEM

V7 and V8 are materially different systems but still belong to the same Rurubu WEDDING item. Project-wide promotion still requires independent evidence in another wedding item or explicit project-wide direction.
