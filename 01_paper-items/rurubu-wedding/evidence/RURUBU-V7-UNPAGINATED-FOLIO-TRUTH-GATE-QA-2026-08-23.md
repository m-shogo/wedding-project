# Rurubu WEDDING V7 — Unpaginated Folio Truth-Gate QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Figma page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Authority order used: live Figma → verified Drive → Rurubu evidence → GitHub current status

## Why this pass existed

V8 had already verified `RSL-247 / F-RSL-247-UNVERIFIED-FOLIOS-SIMULATE-FINAL-PAGINATION-BEFORE-PAGE-COUNT-AND-IMPOSITION-EXIST`: fixed page numbers are production/navigation data, not generic book-like decoration, and should not imply a final sequence while page count, intervening pages, section order, recto/verso behavior, imposition and printer requirements remain unknown.

This run independently checked whether the materially different V7 high-energy travel-magazine system had the same defect rather than assuming the V8 result applied automatically.

Fresh professional research also rotated to chronology and publication sequence rather than repeating recent photo/grid/cover research. Useful observations included: a chronology can use a strict visual system to control many dates/images; a book is experienced as a sequence of spaces/moments; and monotonous presentation rhythm should be changed when the content calls for it. These observations informed broader sequencing judgment, but they are not treated as direct authority for removing folios.

## Live before state

The current V7 comparison set remained:

- C5 `2314:2` — Outer/Cover
- K `2303:2` — Profile/Q&A
- F2 `2351:2` — Story/Chronology
- G2 `2299:2` — Memory/Guide
- H3 `2311:2` — Cafe/Table
- C6 `2316:2` — Island Picks + 1DAY

A read-only numeric-folio audit found:

- C5: no visible three-digit numeric folio
- K: no visible three-digit numeric folio
- F2: `2351:31 / 014`, `2351:32 / 015`
- G2: `2299:12 / 020`, `2299:33 / 021`
- H3: `2311:13 / 026`, `2311:21 / 027`
- C6: no visible three-digit numeric folio

The six visible values implied intervening pages that are not authoritative in the current six-role study. Final page count and imposition remain unknown.

## Rollback-safe bounded write

Before mutation, all six current roots and all target folio nodes were re-read from live Figma.

Hidden rollback copies were created only for the three affected roots:

- F2 rollback `2368:2`
- G2 rollback `2368:34`
- H3 rollback `2368:67`

All three are `visible=false`, parented to `2052:2`, and moved to `x=300000` with separated y positions.

Only the six fixed numeric folio nodes were hidden on the current roots:

- `2351:31`, `2351:32`
- `2299:12`, `2299:33`
- `2311:13`, `2311:21`

All six current V7 root names were explicitly marked `UNPAGINATED-STUDY` so the live canvas does not imply final pagination authority.

No factual/native copy characters, image fills, image hashes, crops, palette, page dimensions or editorial composition were changed. V6 and V8 were not mutated.

## Three-scale visual QA

The three affected roles were visually rechecked after the write.

### Story / Chronology F2 `2351:2`

- whole-item / 500 px: PASS
- reading / 1400 px: PASS
- actual-size canvas / `1587×1123`: PASS for DESIGN QA

Removing `014 / 015` does not weaken chronology reading or bottom-page balance. Year/event hierarchy and the final reflection still close the right page.

### Memory / Guide G2 `2299:2`

- whole-item / 500 px: PASS
- reading / 1400 px: PASS
- actual-size canvas / `1587×1123`: PASS for DESIGN QA

Removing `020 / 021` does not damage the large Memory headline, photo hierarchy, or four-stop Guide scan.

### Cafe / Table H3 `2311:2`

- whole-item / 500 px: PASS
- reading / 1400 px: PASS
- actual-size canvas / `1587×1123`: PASS for DESIGN QA

Removing `026 / 027` does not weaken the food-first title, photo-led right page, or closing copy. The lower field remains intentionally quiet rather than looking unfinished.

## Structural QA after folio removal

| Current role | Visible native text | IMAGE fills | Same-parent text intersections | bounded 18 px text edge risks | visible numeric folios |
| --- | ---: | ---: | ---: | ---: | ---: |
| C5 `2314:2` | 18 | 6 | 0 | 0 | 0 |
| K `2303:2` | 30 | 5 | 0 | 0 | 0 |
| F2 `2351:2` | 22 | 4 | 0 | 0 | 0 |
| G2 `2299:2` | 20 | 6 | 0 | 0 | 0 |
| H3 `2311:2` | 11 | 5 | 0 | 0 | 0 |
| C6 `2316:2` | 20 | 6 | 0 | 0 | 0 |

Readback also verified:

- all six current roots remain `visible=true / parent=2052:2`;
- all six current root names include `UNPAGINATED-STUDY`;
- all three new rollback roots remain hidden on `2052:2`;
- no visible three-digit numeric folio remains in the six current V7 roots.

## Professional critique

- **Art director:** PASS — removing unsupported folios does not weaken V7 personality.
- **Editorial designer:** PASS — actual hierarchy, dates, captions and route information continue to carry reader navigation.
- **Book designer:** PASS — publication furniture no longer pretends a sequence that has not been authored.
- **Typographer:** PASS — no text content, line breaks, type scale or Japanese composition was changed.
- **Photo editor:** unchanged; structural photo dummies remain non-final and legitimate Hawaii photography is still a separate bottleneck.
- **Print designer:** improvement in production truth only. Final pagination, imposition, printer template, bleed/trim/fold, PDF preflight and proof remain unverified.

## Learning decision

This is not a new fingerprint. It is a materially different local reproduction of existing `RSL-247` inside the V7 high-energy travel-magazine system after the same principle was first verified in the V8 restrained book system.

State after this reproduction:

`RSL-247 = VERIFIED_LOCAL_MULTI-SYSTEM / CROSS_ITEM_CANDIDATE`

Do **not** call this `VERIFIED_CROSS_ITEM`, because V7 and V8 are different systems of the same Rurubu WEDDING item. Wedding-project-wide promotion still requires evidence in a materially different item or a correctness/safety authority that justifies promotion.

Transferable principle:

> Fixed folios are publication sequence data. Until page order/count and physical pagination behavior are authoritative, keep a comparison study explicitly unpaginated rather than inventing plausible page numbers for visual authenticity.

What remains Rurubu-specific and must not transfer: V7 node IDs, positions, visual grammar, palette, photo density and exact role set.

## Drive / asset truth

V7 authority folder was re-read before the write:

`1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x / RURUBU_V7_HAWAII_PRO_CLEANROOM_2026-08-21`

It still exposes the same seven recorded PNG children. Existing evidence classifies the inspected examples as structural graphic placeholders rather than legitimate Hawaii photography.

This pass made:

- image-model generation: `0`
- Drive write: `0`
- new Drive master: `0`
- new image hash: `0`
- final photography adoption: `0`
- factual/native copy character changes: `0`
- V6 changes: `0`
- V8 changes: `0`

## Completion boundary

V7 remains a six-role comparison study, not preferred and not print-ready. DESIGN QA for this bounded truth gate passed. REAL CONTENT QA remains blocked by legitimate role-specific photography. Final pagination/imposition, printer template/preflight and physical proof remain separate unresolved gates.