# ADD-11 写真共有 / QR案内サイン — Internal Size Tab Cleanup QA

Date: 2026-08-23
State: `VERIFIED_LOCAL / ADOPTED_IN_CURRENT / ROLLBACK_SAFE / SELLABLE_VISUAL_QA_MAINTAINED`
Start authority SHA: `9c65d1f02d3df5c7c019fcf56cf4f65970f70f3d`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Scope and live authority

- Figma file: `PWQ5ygJJt0IlOqj5ri5jng`
- Current A5: `52:2 / CURRENT / ADD-11 / DARKROOM DEVELOPING TRAY / A5`
- Current A4: `53:2 / CURRENT / ADD-11 / DARKROOM DEVELOPING TRAY / A4`
- long-copy proofs: `52:18 / 53:18`
- exact Drive authority: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb / ADD-11_写真共有_QR案内サイン`
- generated assets: `0`
- Drive write: `0`

This run did not reopen the DARKROOM DEVELOPING TRAY art direction. It audited guest-visible production furniture against the existing rule that internal proof/status metadata must not leak into the reader-facing artifact.

## Visible problem

Fresh A5 and A4 screenshots showed a yellow tab printed in the lower-right tray field with literal copy:

- A5: `A5`
- A4: `A4`

These labels identify production paper sizes. They do not tell a guest how to share photos, do not support QR trust, do not reserve a trim/fold/scan function, and do not belong to the emotional/editorial hierarchy.

The size information is useful to authors and printers, but it already exists in Figma node naming, item documentation and physical specification. Printing it on the guest-facing sign made the object read slightly more like a proof sheet or internal template.

## Existing learning consumed

This is an independent receiving-item application of the existing neutral non-Rurubu lesson:

`Internal proof/status labels must not become guest-facing copy` (`VERIFIED_CROSS_ITEM`).

The lesson does **not** authorize hiding unresolved semantic facts. ADD-11 retains explicit native placeholders for sharing method, access scope, retention and QR. Only redundant internal paper-size metadata was tested for removal.

## Bounded comparison

Rollback-safe comparisons were created from Current:

- `57:2 / QA / ADD-11 / NO INTERNAL SIZE TAB / A5 / 2026-08-23`
- `57:18 / QA / ADD-11 / NO INTERNAL SIZE TAB / A4 / 2026-08-23`

Changed only:

- `TRAY / INDEX TAB` visibility → off
- `TEXT / SIZE` (`A5` / `A4`) visibility → off

Unchanged:

- darkroom/tray composition;
- rotated print sheet;
- coral safelight and cyan process edges;
- Japanese headline and body hierarchy;
- date;
- QR reserved paper geometry;
- semantic placeholders;
- all spacing/crop facts.

Both comparison screenshots were stronger. Removing the size furniture reduced proof-sheet/template reading without making the photographic-processing metaphor less understandable.

## Rollback and production change

Full hidden rollback copies were created before Current mutation:

- `58:2` — pre-cleanup A5 Current
- `58:18` — pre-cleanup A4 Current
- `58:34` — pre-cleanup A5 long-copy proof
- `58:50` — pre-cleanup A4 long-copy proof

Production/stress nodes hidden:

- A5 Current: `52:16 / TRAY / INDEX TAB`, `52:17 / TEXT / SIZE`
- A4 Current: `53:16 / TRAY / INDEX TAB`, `53:17 / TEXT / SIZE`
- A5 stress: `52:32`, `52:33`
- A4 stress: `53:32`, `53:33`

Comparison roots `57:2 / 57:18` were hidden after verification.

## Three-scale screenshot QA

### A5 Current `52:2`

- whole / thumbnail: PASS
- reading: PASS
- native `875×1240`: PASS

### A4 Current `53:2`

- whole / thumbnail: PASS
- reading: PASS
- native `1240×1754`: PASS

The tray still reads immediately as a photographic-processing object. Date remains reader-facing factual furniture; only internal size metadata disappeared.

## Long-copy and structure QA

A5 stress `52:18` was temporarily revealed after the cleanup and re-screened. Realistic long Japanese copy remained visually safe and was re-hidden after review.

Post-change structure readback for Current A5/A4 and both stress roots:

- visible native text: `7` per root
- fixed-height visible text: `0`
- IMAGE fills: `0`
- size text visible: `false`
- size tab visible: `false`

The decrease from eight to seven visible text nodes is exactly the hidden internal size label. No semantic/factual guest role was removed.

## Hybrid authoring / asset decision

- variable/factual/emotional copy: native editable Figma text
- QR: independent semantic native placeholder on reserved paper role
- tray / print / safelight / process edge: simple fixed native geometry with item-specific physical meaning
- SVG: not required
- generated/composed raster: not required
- replaceable photography: not required for this defect

`IMAGE_GENERATION_NOT_REQUIRED`: this was a guest-copy/proof-furniture defect, not an image-quality bottleneck.

## Learning state

`VERIFIED_LOCAL` application in ADD-11 of an already `VERIFIED_CROSS_ITEM` learning method.

Do not generalize this into removing all paper-size information from production workflows. Keep A4/A5 in node names, specs, export/preflight documentation and printer communication. The removal applies only to guest-facing print where the size label has no reader-facing function.

## Decision

Current remains `DARKROOM DEVELOPING TRAY`, now without printed A5/A4 proof metadata.

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A5_A4_REFLOW_PASS / LONG_COPY_STRESS_PASS / JAPANESE_SEMANTIC_LINEBREAK_PASS / INTERNAL_SIZE_LABEL_CLEANUP_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`.
