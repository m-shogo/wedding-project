# RSL-251 extension — V7 top-level section-marker authority

Date: 2026-08-24
Scope: Rurubu WEDDING
State: `VERIFIED_LOCAL_MULTI-ROLE → CROSS_ITEM_CANDIDATE`
Existing fingerprint: `F-RSL-251-PROMINENT-EDITORIAL-NUMBER-SIMULATES-STRUCTURE-WITHOUT-A-READER-FACING-REFERENT`

## Why this is an extension, not a new fingerprint

RSL-251 already covers editorial numbers that visually simulate structure without a defensible reader-facing referent. The new V7 case is the same underlying failure class expressed at publication-section level, so a duplicate ID would make the failure ledger noisier without improving diagnosis.

Adjacent RSL-247 covers unverified folios/final pagination. This extension stays under RSL-251 because the tested surface is a top-level editorial section marker rather than a page folio.

## New evidence

Live V7 was explicitly `UNPAGINATED-STUDY` with unresolved final section order, but three roles carried a partial top-level sequence:

- Story: `02 / 物語`
- Memory: `03 / 記憶`
- Cafe: `04 / 食卓`

The same current six-role set did not expose a corresponding top-level `01` on Profile or `05` on 1DAY. The numbers therefore implied a stable publication architecture that did not yet exist as authority.

## Professional research observation

Adobe InDesign's section/chapter-numbering model treats section prefixes, markers and chapter numbers as actual document/book structure. Chapter numbering can follow book order and be updated with the document sequence; running-header markers can resolve real current heading/section information.

Rurubu hypothesis tested:

> While page/section order is unresolved, semantic section names can carry identity without pretending a final chapter sequence exists.

## Local tests

Rollback-safe clones changed only the unsupported top-level prefix:

- F4 `2427:2`: `02 / 物語` → `物語`
- G8 `2428:2`: `03 / 記憶` → `記憶`
- H8 `2428:35`: `04 / 食卓` → `食卓`

All three passed 500px / 1400px / 1587×1123 visual review and post-promotion structure QA. No current-root overlap or text-text collision was introduced.

Crucial counterexample: G8 internal `01–04` guide anchors were retained. They perform a demonstrated high-energy browse/scan job inside the spread. The learning is therefore not “remove numbers”.

## Verified principle

Before using a prominent editorial number, ask what stable reader-facing referent it encodes:

- valid examples: quantity, actual sequence, time, issue number, finding/reference, verified section order;
- invalid case: visual simulation of a chapter/section architecture whose order has not been established.

When section order is unresolved, a semantic-only native label is a valid local treatment if comparison shows no navigation or pacing regression.

## What must NOT transfer

Do not transfer V7's exact Japanese labels, font sizes, color, placement, density, or travel-magazine visual grammar to other Wedding items.

Cross-item candidate is the decision test only: a displayed number must have an authoritative reader-facing job.

## Evidence

`01_paper-items/rurubu-wedding/evidence/RURUBU-V7-F4-G8-H8-SEMANTIC-SECTION-MARKER-QA-2026-08-24.md`
