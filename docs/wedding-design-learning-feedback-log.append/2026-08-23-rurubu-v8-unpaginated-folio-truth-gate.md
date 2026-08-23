# Rurubu V8 folio truth-gate design-learning feedback

Date: 2026-08-23
Scope: Rurubu WEDDING only

## What changed because of new professional knowledge

Fresh professional research rotated to book pagination and folio production. Adobe InDesign book-numbering guidance treats page/section numbers as actual sequence data that responds to document order, inserted/removed pages and section settings.

That changed the live design decision. Instead of continuing to polish plausible folios as part of the V8 book identity, the current six-role study now withholds fixed numeric page numbers until final page count, intervening pages, recto/verso behavior, imposition and printer requirements are authoritative.

## Verified bounded change

The current V8 roots remain:

`AV2 2347:2 + AW3 2357:2 + AL2 2332:2 + AQ3 2337:2 + AS4 2355:27 + AT3 2342:2`

Only 11 fixed folio nodes were hidden. Six hidden rollback copies were created first (`2363:2 / 2363:24 / 2363:58 / 2363:96 / 2363:131 / 2363:156`). Current roots were explicitly marked `UNPAGINATED-STUDY`.

All six passed at 500px, 1400px and native `1587×1123` after the change. Current-root overlap remains zero; text intersections and bounded 18px edge/safe risks remain zero; no Japanese typography regression was found.

## Learning

`RSL-247 / F-RSL-247-UNVERIFIED-FOLIOS-SIMULATE-FINAL-PAGINATION-BEFORE-PAGE-COUNT-AND-IMPOSITION-EXIST`

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

The lesson is not “remove folios.” It is: do not use plausible fixed page numbers as book-like decoration when the publication sequence is not yet true. Restore final folios systematically only after real pagination authority exists.

## Asset / truth state

- new image generation: 0
- new Drive master: 0
- Drive write: 0
- new image hash: 0
- legitimate final photography adopted: 0
- native/factual copy changed: 0
- V6 changes: 0
- V7 changes: 0
- DESIGN QA for bounded folio change: PASS
- REAL CONTENT QA: still blocked where structural photo dummies remain
- final pagination/imposition: not verified
- PRINT TEMPLATE/PREFLIGHT: not verified
- PHYSICAL PROOF: not verified

No V6/V7/V8 global winner is declared.