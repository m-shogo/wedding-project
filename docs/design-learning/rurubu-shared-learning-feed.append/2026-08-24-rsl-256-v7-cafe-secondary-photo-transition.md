# RSL-256 — secondary photo needs a sequence job

Date: 2026-08-24
Scope: Rurubu WEDDING
State: `VERIFIED_LOCAL`
Fingerprint: `F-RSL-256-SECONDARY-PHOTO-EXISTS-AS-DECORATIVE-FILLER-WITHOUT-A-SEQUENCE-JOB`

## Observation

Professional photobook editing/sequencing practice treats photographs as an edited sequence, not as independent rectangles used to fill space. Stuart Smith's Aperture workshops emphasize tight edits and removing images that do not support the sequence, while also noting that useful b-roll can provide connective material.

Sources:
- https://aperture.org/workshops/smith2016/
- https://aperture.org/workshops/smith2017/
- https://aperture.org/editorial/how-to-produce-a-photobook/

## Root-cause hypothesis

A secondary image in a magazine spread can become AI/template-like even when the image itself is attractive if its only visible job is `fill the empty rectangle`. The problem is not necessarily image count; it is missing sequence ownership.

## Local test

Rurubu V7 Cafe/Table:

- H4 `2401:2`: secondary street dummy at `500,615 / 260×230`; visually ambiguous between the sensory pair and next-shop beat.
- H5 `2403:2`: image removed; rejected because thumbnail/reading pace weakened and the cream field became under-edited.
- H6 `2404:2`: same image kept but moved/resized to `500,690 / 260×175` and explicitly re-authored as `NEXT-SHOP CONTEXT`; this binds it to `次の店を決める会話。`.

Three-scale result: H6 PASS at 500 / 1400 / native 1587×1123; H5 rejected; H4 retained as hidden rollback.

## Verified local lesson

Before keeping a secondary/b-roll image, identify its editorial job in sequence: for example setting, transition, detail, contrast, closure, evidence, or navigation. If removing it damages pacing, do not restore it at an arbitrary slot; place/crop/scale it so the reader can infer the beat it advances.

This is **not** a rule to add more images, to place small photos beside copy, or to keep b-roll by default.

## Promotion boundary

Remain `VERIFIED_LOCAL` because:

- only one Rurubu page role has been tested;
- photography is structural dummy, not final source-truth-safe Hawaii photography;
- print-resolution and physical-proof gates are unresolved.

Possible next state only after materially different Rurubu roles and legitimate photography reproduce the benefit without hierarchy or print regressions.
