# V5 inside Current — print-folio promotion

Date: 2026-08-10
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Status: `TESTED / PROMOTED_TO_CURRENT / ROLLBACK_PRESERVED`

## Authority refresh

The run re-read project-wide authorities, Rurubu Current Status, V6 gate, live Current inside, latest Drive/Q60 state, and latest GitHub main before writing. No non-Rurubu item was touched.

## Visible problem

The G2-derived Current inside was already materially stronger than the legacy layout, but the lower-right page still ended with a `700 × 12` dark `PAGE_BOTTOM_BAR`. Its text sat on/through the field, producing a UI/status-bar silhouette inconsistent with the magazine direction and with the already-proven outer folio subtraction.

## Clean-room test

A rollback-safe duplicate was created first:
- `670:2 / V5_INSIDE_RURUBU_CLEANROOM_H_PRINT_FOLIO_2026_08_10`
- right page `670:125`

Only the footer pair changed:
- `PAGE_BOTTOM_BAR`: `700 × 12` dark field → `700 × 3` thin print rule at `y=1076`
- `PAGE_BOTTOM_BAR_TXT`: preserved native text, moved to `y=1086`, reduced to `8 px`, dark navy on the light page

No image, crop, body copy, heading, timeline, Memory Spot module, fold guide, or semantic photo node changed.

## Three-scale comparison

Whole spread:
- H removes the remaining app/status-bar silhouette at the right-page trim
- profile/history/memory hierarchy remains unchanged

Right-page reading scale:
- the lower edge reads as print folio rather than interface chrome
- the thin line anchors the page without competing with the large Memory Spot imagery

Actual size:
- `8 px` footer microtype remains intentionally subordinate but readable
- no clipping or collision appears around the trim edge

H clearly won the bounded footer comparison against live Current.

## Promotion and rollback

Before mutating Current, the pre-promotion state was preserved as:
- `670:274 / V5_INSIDE_PRE_H_FOLIO_PROMOTION_ROLLBACK_2026_08_10`

The verified H treatment was then promoted into the existing Current semantic nodes:
- `77:486 / PAGE_BOTTOM_BAR` → `700 × 3`, `x=46 / y=1076`
- `77:487 / PAGE_BOTTOM_BAR_TXT` → native `8 px`, `x=54 / y=1086`

Current frame ID remained:
- `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`

## Post-promotion verification

Fresh Current screenshot passed.

Structure readback:
- visible native text: `54`
- visible IMAGE fills: `9`
- same-parent text overlaps: `0`
- fold `77:540`: visible, `2 × 1122.5`
- rollback `670:274` exists
- semantic footer node IDs remain `77:486` and `77:487`

Protected inside image hashes are unchanged:
- groom `77:296` → `a39dd297eb9de572317a5ce57f0af12e8597b156`
- bride `77:302` → `2359f635b4926a83e22ca1f9214e75c709291152`
- history `77:422` → `539c259be8036b481d06b4f76db9a39b407d90e8`
- lead memory `77:430` → `adbb8e529451a81dd25e4eb29bf068655569ce25`
- memory 02 `77:438` → `439a719d73f28e8dd2889f2026cccb15f345ec63`
- visible memory 03 `77:454` → `c09aa82e7b2ac75708707345c6f845452bf67663`

## Asset / gate state

- generated: none
- adopted in duplicate: yes
- promoted to Current: yes, footer pair only
- visually verified post-promotion: yes
- protected image provenance/hash: unchanged
- V5 photo gate: unchanged at `9/10`, dominant `2/3`
- V5 complete: no
- V6 production: remains closed

## Learning result

The same subtraction principle is now supported on both outer and inside folios: when the page background already supplies contrast, repeated identity/navigation text does not need a heavy dark status bar. A thin rule plus native microtype can close a print page more credibly while preserving semantic text and trim anchoring.
