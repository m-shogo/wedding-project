# RURUBU V8 AV3 — Semantic Contents Truth Gate QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Research observation

This run rotated to table-of-contents / publication-navigation practice rather than repeating photo, section-marker or Japanese line-break research.

Professional editorial examples treat a table of contents as a portal/navigation device into a volume, while some book structures intentionally omit conventional chapter divisions or relocate TOC machinery when those conventions do not serve the reading experience.

Rurubu hypothesis: semantic overview can remain useful in an unpaginated study, but ordinal prefixes should not imply final chapter order until that order is authoritative.

## Before

Current V8 Outer AV2 `2347:2` contained native label `この本の中身` plus native `BACK_INDEX`:

- `01  ふたり`
- `02  物語`
- `03  記憶`
- `04  食卓`
- `05  一日旅`

The publication is still `UNPAGINATED_STUDY`; final page count, section order and imposition are unresolved.

## Bounded experiment

Rollback-safe clone AV3 `2431:2` changed exactly one visible native text role:

- node `2431:9 / BACK_INDEX`
- before: numbered five-item list
- after: `ふたり / 物語 / 記憶 / 食卓 / 一日旅`

Preserved unchanged:

- `この本の中身` label;
- all front/back cover geometry;
- typography style and text box geometry;
- destination title and masthead;
- photo role, crop and image hash;
- palette;
- all factual/native copy other than unsupported ordinal prefixes.

## Three-scale visual QA

- whole-item / 500 px: PASS. Contents remain immediately scannable; back becomes less falsely chapterized and remains recognizably book-like.
- reading/page / 1400 px: PASS. Semantic list hierarchy remains clear.
- actual-size / 1587×1123: PASS for DESIGN QA.

## Structure QA

AV3 after promotion:

- root: `2431:2`
- parent: `2052:2`
- current position: `x=0 / y=8500`
- visible: true
- visible native text: `11`
- visible IMAGE fills: `1`
- text-text intersections: `0`
- 18 px text edge risks: `0`
- current V8 six-root pairwise overlap: `0`

Back index:

- `2431:9`
- chars: `ふたり\n物語\n記憶\n食卓\n一日旅`
- local box: `x=60 / y=630 / w=520 / h=248`

Rollback:

- AV2 `2347:2`
- name: `ROLLBACK / V8 AV2 / OUTER / PRE-SEMANTIC-CONTENTS-TRUTH-GATE / HIDDEN`
- parent: `2052:2`
- visible: false
- x: `300000`

## Six-viewpoint critique

- Art director: PASS — publication personality remains restrained and confident; reduction is tied to truth, not generic minimalism.
- Editorial designer: PASS — reader-facing overview remains; unsupported sequence metadata is removed.
- Book designer: PASS — the object no longer simulates final chapter architecture before final order exists.
- Typographer: PASS — list rhythm and hierarchy survive without changing type scale or box geometry.
- Photo editor: DESIGN PASS / REAL CONTENT BLOCKED — photo is unchanged structural dummy.
- Print designer: DESIGN PASS / PRINT GATES OPEN — no pagination, imposition, bleed or proof claim is added.

## Learning

No new failure ID.

This strengthens existing **RSL-251**:

`F-RSL-251-PROMINENT-EDITORIAL-NUMBER-SIMULATES-STRUCTURE-WITHOUT-A-READER-FACING-REFERENT`

New evidence is materially different from the V7 top-level section-marker test: V8 retained a semantic contents/navigation list but removed only unsupported ordinal structure.

State after this reproduction:

`VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`

Not `VERIFIED_CROSS_ITEM`: both V7 and V8 are systems within Rurubu WEDDING.

The principle is not “remove TOC numbers.” Ordinals are valid when actual section order/finding logic is authoritative and useful.

## Asset truth

- generated images: `0`
- Drive writes: `0`
- new masters: `0`
- new image hashes: `0`
- photo/crop changes: `0`
- final photography adopted: `0`
- V6 changes: `0`
- V7 production changes: `0`

## State

AV3: `VERIFIED_LOCAL_DUMMY_DESIGN / REAL-CONTENT-BLOCKED / NOT_PRINT_READY`.
