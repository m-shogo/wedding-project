# RURUBU V7 F4 / G8 / H8 — Semantic Section Marker QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
V6 control: frozen; no writes
V8 production: unchanged; comparator only

## New professional knowledge

This run studied publication section/chapter marker mechanics rather than reusing the recent photo, JLREQ, folio or map research.

Adobe InDesign treats section prefixes, section markers and chapter numbers as structural publication data. Chapter numbering can follow document/book order and update according to the book structure; running headers can resolve current section/title information from real styled content.

Rurubu-specific hypothesis:

> A top-level number should not imply a finalized chapter/section sequence when final page/section order is not authoritative. Preserve the semantic section name, and preserve numbers only where they perform a real local reader job such as quantity, time, browse order or finding.

This is not a rule to remove all numbers.

## Live defect observed

The current V7 system was explicitly `UNPAGINATED-STUDY`, but three neighboring roles exposed a partial top-level publication sequence:

- F3 `2387:5`: `02 / 物語`
- G7 `2424:3`: `03 / 記憶`
- H7 `2407:23`: `04 / 食卓`

At the same time:

- Profile K2 had no corresponding top-level `01` marker;
- C6D had no corresponding top-level `05` marker;
- final page count, section order and imposition remain unresolved.

The partial numbering therefore visually simulated a finished publication architecture without a complete authority.

Important counterexample retained: G7/G8 internal `01–04` Memory Guide numbers remain because they function as useful high-energy browse anchors inside the spread. Removing them previously reduced scan rhythm.

## Rollback-safe tests

### Story F4

Source: F3 `2387:2`
Candidate/current: F4 `2427:2`
Changed node: `2427:5`

- before: `02 / 物語`
- after: `物語`
- same Noto Sans JP Bold / 15px / same position and geometry
- chronology, photos, fixed title graphic, copy and colors unchanged

### Memory G8

Source: G7 `2424:2`
Candidate/current: G8 `2428:2`
Changed node: `2428:3`

- before: `03 / 記憶`
- after: `記憶`
- internal `01–04` guide numbers retained
- grounded route, semantic-wrap fixes, photo roles and fixed display title unchanged

### Cafe H8

Source: H7 `2407:2`
Candidate/current: H8 `2428:35`
Changed node: `2428:56`

- before: `04 / 食卓`
- after: `食卓`
- right-side `夜 / 食卓` retained as semantic/contextual copy
- photo-caption binding, secondary-photo transition role and truth-safe time wording unchanged

## Three-scale QA

All three candidates were visually reviewed before promotion.

| Candidate | 500px whole-item | 1400px reading/page | 1587×1123 actual-size |
|---|---|---|---|
| F4 `2427:2` | PASS | PASS | PASS |
| G8 `2428:2` | PASS | PASS | PASS |
| H8 `2428:35` | PASS | PASS | PASS |

Observed result:

- removing the unsupported top-level numeric prefix did not reduce V7 energy or reading order;
- semantic labels became clearer at small scale;
- internal functional numbers retained their scan/navigation role;
- no new “luxury whitespace”, UI-card grammar or decorative substitute was added.

## Structure QA after promotion

Current V7 roots:

- C8 `2381:2`
- K2 `2391:2`
- F4 `2427:2`
- G8 `2428:2`
- H8 `2428:35`
- C6D `2413:2`

Readback:

- all current roots parent `2052:2`
- all current roots visible `true`
- current V7 root pairwise overlap `0`
- F4/G8/H8 text-text intersections `0`
- semantic markers read back exactly as `物語 / 記憶 / 食卓`

Rollback evidence:

- F3 `2387:2`: hidden, x=`300000`, parent `2052:2`
- G7 `2424:2`: hidden, x=`300000`, parent `2052:2`
- H7 `2407:2`: hidden, x=`300000`, parent `2052:2`

## Six-view professional critique

### A. Art director
PASS. V7 remains a high-energy Japanese travel-information system; this is not a generic-minimalist subtraction exercise.

### B. Editorial designer
PASS. The top-level markers now state actual editorial roles. Internal browse numbering with a demonstrated reader job remains intact.

### C. Book designer
PASS. An unfinished study no longer visually claims a complete chapter sequence that has not been established by page order.

### D. Typographer
PASS. No font, size, line-height or composition system was changed; only unsupported numeric prefixes were removed.

### E. Photo editor
UNCHANGED / BLOCKED. No photos, crops or image hashes changed. Existing image layers remain structural dummies unless separately source-verified.

### F. Print designer
DESIGN QA PASS only. No claim is made about final pagination, imposition, printer template, binding, bleed, preflight or physical proof.

## Learning result

No new fingerprint was created.

This is a stronger multi-role reproduction of existing **RSL-251**:

`F-RSL-251-PROMINENT-EDITORIAL-NUMBER-SIMULATES-STRUCTURE-WITHOUT-A-READER-FACING-REFERENT`

Clarification added by this experiment:

- a publication-level section number requires a stable structural referent, not merely visual continuity;
- semantic-only section labels are valid while section order remains unresolved;
- numbers with real local jobs (browse anchor, quantity, time, finding) remain valid and should not be removed mechanically.

RSL-247 remains adjacent evidence for pagination truth, but no duplicate failure ID is needed.

State: `VERIFIED_LOCAL_MULTI-ROLE → CROSS_ITEM_CANDIDATE` within Rurubu. This is not `VERIFIED_CROSS_ITEM` because the evidence is still inside Rurubu WEDDING.

## Asset / truth

This run:

- image generation: `0`
- Drive writes: `0`
- new Drive masters: `0`
- new image hashes: `0`
- photo/crop changes: `0`
- V6 changes: `0`
- V8 production changes: `0`

V7/V8 remain study candidates, not print-ready.
