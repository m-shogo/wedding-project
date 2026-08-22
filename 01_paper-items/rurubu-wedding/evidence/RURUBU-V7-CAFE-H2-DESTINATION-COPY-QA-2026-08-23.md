# Rurubu WEDDING V7 Cafe/Table H2 — destination-copy QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Study page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
V6 control: unchanged `JC + IX + JB + IZ + IT + JA`

## Trigger

V7 Cafe/Table H `2296:2` is explicitly a Hawaii clean-room study, but its reader-facing close still said:

`夜の横浜を、\nゆっくり味わう。`

This was a semantic carry-over from the Yokohama control direction. It was not a photo-dummy issue: the native reader-facing copy itself contradicted the V7 destination.

## New professional research used

Fresh reference: FLUX Hawaii.

- FLUX describes its editorial goal as honest storytelling, timeless design and insightful photography around Hawai‘i rather than generic destination polish.
- Its founding/editorial reflection explicitly rejects the picture-perfect façade as the only representation of Hawai‘i and aims to reveal lived local culture.
- Its redesign notes treat readability, photography priority, grid, paper feel and publication rhythm as one system rather than decoration added after content.

Rurubu-specific hypothesis:

> a clean-room destination edition must audit not only photographs and labels but every reader-facing phrase for destination-semantic leakage; an attractive spread is still false if copy names the control destination.

This is a local hypothesis, not a claim that FLUX layout/style should be copied.

## Rollback-safe test

Source:
- H `2296:2`
- parent `2052:2`
- structural photo dummies retained unchanged

Candidate:
- H2 `2308:2`
- close text node `2308:19`
- changed only `夜の横浜を、\nゆっくり味わう。` → `夜のハワイを、\nゆっくり味わう。`
- no photo, crop, layout, color, typography scale, variable facts or V6/V8 content changed

## Figma production failure / method switch

The first `clone()` created H2 on the plugin current page (`845:2`) instead of the source page even though the source H parent was `2052:2`.

This matches the already-known parent/page-placement failure family. The method was switched immediately rather than repeated:

1. resolve target PageNode `2052:2` in the same Plugin API surface;
2. `await figma.setCurrentPageAsync(page)`;
3. `page.appendChild(candidate)`;
4. restore intended position;
5. read back candidate parent and require `2052:2` before continuing.

Verified correction: H2 parent read back as `2052:2`.

## Three-scale visual QA

- 500 px whole spread: PASS
- 1400 px reading scale: PASS
- 1587×1123 actual-size render: PASS

The Hawaii close remains legible and retains the original two-line rhythm.

## Structure QA

H2:
- visible native text: `14`
- visible IMAGE fills: `4` (all remain structural photo dummies)
- text intersections: `0`
- parent page: `2052:2`
- close readback: `夜のハワイを、\nゆっくり味わう。`

A simple 18 px edge check reports the left-page folio at `13.7 px` from the outer page edge. The exact same condition exists in source H and therefore is not introduced by H2. It is not silently called print-safe; final printer trim/safe authority remains a separate gate.

## Decision

`H2 ADOPTED AS CURRENT V7 CAFE COMPARISON / VERIFIED_LOCAL DESIGN QA / NOT PREFERRED / NOT PRINT READY`

Old H `2296:2` is hidden rollback evidence.

Photography truth is unchanged:
- generated Hawaii photography: 0
- adopted Hawaii photography: 0
- new Drive masters: 0
- new production photo placements: 0

## Learning

`RSL-230 / F-RSL-230-CONTROL-DESTINATION-COPY-LEAKS-INTO-CLEANROOM-DIRECTION`

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Do not generalize this into mechanical search/replace. The transferable check is semantic: before promoting a clean-room destination/version, audit dominant photography, captions, closes, kickers and small furniture for control-version place/story residue.
