# Rurubu shared-learning append — RSL-247

Date: 2026-08-23
Source scope: Rurubu WEDDING

## RSL-247 — Unverified folios simulate final pagination before the book sequence exists

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Fingerprint: `F-RSL-247-UNVERIFIED-FOLIOS-SIMULATE-FINAL-PAGINATION-BEFORE-PAGE-COUNT-AND-IMPOSITION-EXIST`

### Professional research observation

Fresh research rotated to book pagination/folio production rather than reusing recent photography, grid or divider references. Adobe InDesign book-numbering guidance treats page and section numbers as production/navigation data that update with document order, added/removed pages and section settings. That means a visible folio is not neutral decorative furniture: it makes a claim about actual sequence, recto/verso and book structure.

### Visible / truth problem

The current V8 six-role study displayed plausible fixed folios even though final page count, intervening pages, imposition and printer template are explicitly unresolved:

- AV2 `2347:20` = `001`
- AW3 `2357:10` / `2357:24` = `006` / `007`
- AL2 `2332:12` / `2332:32` = `014` / `015`
- AQ3 `2337:10` / `2337:29` = `020` / `021`
- AS4 `2355:34` / `2355:40` = `026` / `027`
- AT3 `2342:23` / `2342:29` = `032` / `033`

Those numbers implied unverified missing/intervening pages. The current six spreads are role-comparison studies, not an authoritative paginated book sequence.

### Root-cause hypothesis

The book-designer direction treated folios partly as visual evidence of editorial-monograph authenticity. This allowed plausible-looking micro-furniture to outrun production truth. The error is semantic, not typographic: polishing a false page number cannot make the claim valid.

### Corrected method

Before mutation, all current roots and folio nodes were re-read from live Figma. Six hidden rollback copies were created, then only the 11 unverified numeric folio nodes were hidden on current roots. Section kickers, headings, content, photography, grid, crop, palette and root geometry were not changed.

Hidden rollback roots:

- AV2 rollback `2363:2`
- AW3 rollback `2363:24`
- AL2 rollback `2363:58`
- AQ3 rollback `2363:96`
- AS4 rollback `2363:131`
- AT3 rollback `2363:156`

Current roots remain `2347:2 / 2357:2 / 2332:2 / 2337:2 / 2355:27 / 2342:2` and are explicitly named as `UNPAGINATED-STUDY` states.

### Evidence

All six current spreads passed after folio removal at:

- whole-item / 500 px: PASS
- reading / 1400 px: PASS
- actual-size canvas / `1587×1123`: PASS for DESIGN QA

Post-change structure:

| Role | Visible native text | IMAGE | Text intersections | 18px edge/safe risk |
| --- | ---: | ---: | ---: | ---: |
| AV2 | 11 | 1 | 0 | 0 |
| AW3 | 21 | 1 | 0 | 0 |
| AL2 | 23 | 0 | 0 | 0 |
| AQ3 | 15 | 2 | 0 | 0 |
| AS4 | 11 | 1 | 0 | 0 |
| AT3 | 17 | 1 | 0 | 0 |

Page-level current-root overlap pairs remain `0`. Japanese line-start/line-end punctuation, accidental one-character lines and Japanese font-assignment probes found no new issue. All 11 target folio nodes read back `visible=false`; all six rollback roots read back hidden on the Rurubu study page.

### Transferable principle

When final page count, section order, recto/verso behavior or imposition is not authoritative, do not use plausible fixed page numbers merely to make a study look like a finished book. Keep the editorial system readable without them, then restore folios systematically only when pagination truth exists.

### What must not transfer

This is **not** a rule to remove folios from finished publications. Verified page numbers can have strong navigation, reference and sequencing jobs. Other items must independently test whether visible numbering is authoritative before applying this lesson. Do not transfer V8 node IDs, coordinates, typography, page count assumptions or layout.

### Before / after learning check

`YES`. Without the fresh pagination-production research, the likely next move would have been to refine folio typography as part of the V8 book identity. New knowledge changed the live decision from styling the numbers to withholding unverified production metadata.

### Promotion boundary

Remain `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`. Project-wide promotion requires materially different item evidence under the shared-learning system. Final Rurubu folios remain blocked until real page order/count, section starts, imposition and printer requirements are verified.