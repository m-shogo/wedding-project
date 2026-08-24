# RSL-251 — V8 contents-navigation authority reproduction

Date: 2026-08-24
Source scope/item: Rurubu WEDDING / V8 Outer
Existing fingerprint: `F-RSL-251-PROMINENT-EDITORIAL-NUMBER-SIMULATES-STRUCTURE-WITHOUT-A-READER-FACING-REFERENT`
State after this test: `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`

## Visible problem

V8 AV2 `2347:2` showed a useful semantic contents overview, but prefixed it with `01–05` even though final publication section order is not yet authoritative and V8 is explicitly an unpaginated study.

## Root-cause hypothesis

Numbers can add apparent editorial structure without adding reader value. When final order does not exist, ordinals can make a study look more production-final than it is. The semantic labels may still be useful for orientation.

## Bounded test

On rollback-safe AV3 `2431:2`, change only native `BACK_INDEX` `2431:9`:

- before: `01 ふたり / 02 物語 / 03 記憶 / 04 食卓 / 05 一日旅`
- after: `ふたり / 物語 / 記憶 / 食卓 / 一日旅`

Retain the label `この本の中身`, all type geometry, photo/crop/hash, palette and cover structure.

## Evidence

- 500px whole-item: PASS
- 1400px reading/page: PASS
- 1587×1123 actual-size: DESIGN QA PASS
- visible native text: `11`
- IMAGE fills: `1`
- text intersections: `0`
- 18px edge risks: `0`
- V8 current root overlap: `0`
- AV3 parent: `2052:2`
- AV2 hidden rollback: `2347:2 / x=300000`

Detailed evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V8-AV3-SEMANTIC-CONTENTS-TRUTH-GATE-QA-2026-08-24.md`

## Why this is new evidence for RSL-251

Earlier V7 evidence removed unsupported top-level section-number prefixes while preserving local browse numbers that had a verified scanning job. V8 now independently reproduces the same decision principle in a materially different restrained book system and a different surface: a back-cover contents/navigation overview.

The outcome is not “remove numbers.” It is:

- keep numbers when real order, quantity, time, issue/finding, or another reader-facing job exists;
- keep semantic navigation labels when useful even if numbering is not yet authoritative;
- withhold ordinal structure that exists mainly to simulate finished publication architecture.

## Regression risk

Some real books need numbered chapters or TOC references. Once final order or cross-reference logic becomes authoritative, numbering may be restored and should then be tested as functional navigation rather than decoration.

## What must remain Rurubu/V8-specific

Do not transfer V8 navy/cream palette, cover split, typography scale, exact contents labels, photo geometry, destination title or book-monograph composition.

## Cross-item applicability hypothesis

A different Wedding item may independently test whether a visible number actually refers to verified order/quantity/finding logic before retaining it as decorative structure. This entry does not authorize any non-Rurubu production edit.
