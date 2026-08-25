# RSL-271 — Intended auto-height text can remain fixed and clip inside generated auto-layout rows

Date: 2026-08-25
Scope: Rurubu WEDDING Figma production learning
State: `VERIFIED_LOCAL`
Fingerprint: `F-RSL-271-AUTO-LAYOUT-TEXT-INTENDED-AUTOHEIGHT-REMAINS-FIXED-AND-CLIPS`

## Operation attempted

Create a new non-production V8 Cafe/Table photo-art-direction authority sheet using nested auto-layout rows. Each text node was configured with `textAutoResize='HEIGHT'` and then resized to its target width with a temporary height of `10px` before being placed in the row.

## Symptom

The write call succeeded and all nodes existed, but screenshot QA showed every title/body clipped into a thin horizontal stripe. Metadata/readback confirmed the text nodes and row containers had remained at `10px` height.

Figma evidence: first-pass `2527:2`, text nodes `2527:3`–`2527:32`.

## Root-cause hypothesis

The intended auto-height contract did not materialize after the explicit `resize(width, 10)` / nested auto-layout sequence. Treating the setter intent as proof of final geometry was unsafe. The failure class is **fixed-height text truncation hidden behind a successful API mutation**.

## Corrected method

Do not repeat the same auto-height construction. Switch method:

1. re-read live metadata/design context;
2. load the exact existing fonts;
3. set explicit safe row heights and explicit text heights;
4. remove unintended default row fills;
5. keep fixed widths;
6. screenshot the complete authority sheet;
7. read back text geometry/intersections and bottom reserve.

## Verification

Repaired `2527:2`:
- screenshot `1400×1080`: PASS;
- visible text `20`;
- text intersections `0`;
- bottom reserve `214px`;
- parent `2052:2`;
- current V7/V8 production roots unchanged and pairwise overlap `0`.

## Transfer boundary

This is **not** a rule to avoid auto-layout or always use fixed-height text. Auto-layout remains preferred when it is structurally appropriate. The transferable production rule is narrower:

> after programmatic auto-layout/text authoring, verify the **resulting text and row geometry**, not only the requested `textAutoResize`/layout settings; if the intended auto-height contract fails once in the observed construction pattern, switch construction method before continuing.

Do not transfer V8 colors, dimensions, typography, or authority-sheet composition.
