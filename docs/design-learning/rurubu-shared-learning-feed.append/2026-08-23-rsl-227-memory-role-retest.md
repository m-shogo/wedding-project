# RSL-227 reinforcement — Memory/Guide cross-role retest

Date: 2026-08-23
Scope: Rurubu WEDDING / V7 Hawaii
Parent learning: `RSL-227 — Fixed identity copy can be tested as an authored graphic while exact editable source is preserved`
State remains: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Why this is reinforcement, not a new rule

RSL-227 was first verified on V7 Outer and subsequently tested on inside roles. This run deliberately retested the same authoring-responsibility hypothesis on a materially different editorial role: Memory+Guide.

The goal was not to repeat the same visual lockup. The question was whether a fixed, short, identity-bearing Japanese opener could gain clearer editorial ownership as a dedicated fixed graphic while body/service copy stayed native and exact editable source remained preserved.

## Memory/Guide evidence

Baseline:
- `2295:2 / V7 Memory+Guide G`;
- native title `2295:4 / 場所より先に、\n記憶が戻ってくる。`.

Rollback-safe candidate:
- `2299:2 / V7 Memory+Guide G2 / FIXED DISPLAY TITLE / TESTED_LOCAL`.

Exact editable source:
- `2299:34 / SOURCE / V7 MEMORY FIXED DISPLAY TITLE / EDITABLE`;
- preserved hidden after export.

Fixed placed role:
- `2299:39 / FIXED PNG / V7 MEMORY DISPLAY TITLE / 4X / SOURCE PRESERVED`;
- image hash `f310f1b1cd9521f6752f2f0b6d1792358c127921`;
- export bytes `48,055`.

QA:
- 500 px whole-item: PASS;
- 1400 px reading: PASS;
- 1587×1123 actual-size: PASS;
- visible native text: 22;
- unintended text-box intersections: 0;
- 18 px text safe risks: 0;
- source/candidate parent readback: correct page `2052:2`.

## Learning change

The evidence is now stronger that the useful principle is about **authoring responsibility**, not a particular cover effect:

- fixed identity/display copy may be tested as an authored visual role;
- variable, factual, descriptive and reader-service copy remains native by default;
- exact editable wording must remain recoverable;
- spelling/glyph/semantic line-break QA remains mandatory after rasterization;
- the treatment must still win in the specific editorial role at thumbnail, reading and actual-size scales.

The Memory test also clarifies the stop condition: do not turn every spread into the same fixed-title system. Theme+variation is required; a role that is already strong as native typography should remain native rather than being rasterized for consistency.

## What remains unverified

- this is still one Rurubu item, so it is **not** `VERIFIED_CROSS_ITEM`;
- no project-wide promotion from this evidence;
- coral/yellow accents, dimensions and exact title composition remain V7-specific;
- final Hawaii photography is still missing;
- printer template, preflight and physical proof are unresolved.

Dedicated evidence:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V7-G2-MEMORY-FIXED-DISPLAY-QA-2026-08-23.md`.
