# RSL-008 reproduction — V7 Cafe photo/caption binding

Date: 2026-08-24
Source scope/item: Rurubu WEDDING / V7 Cafe+Table H4
Existing lesson: `RSL-008 — Subtraction needs a binding-function check; small timeline modules still carry visual mass`
Existing state: `VERIFIED_CROSS_ITEM`
This entry does **not** create a new RSL ID and does not change the existing promotion state.

## Visible problem

V7 H3 `2311:2` showed native `11:40 / ひと休み` inside the cobalt title field even though its semantic owner was the dominant cafe photograph. At whole-item scale the metadata read as floating magazine microcopy rather than information bound to the photographed cafe moment.

## Root-cause hypothesis

A caption/time label can be typographically legible yet editorially weak when spatial placement does not make its semantic owner obvious. The relevant transferable principle is not a fixed caption coordinate; it is the binding-function test already represented by RSL-008.

## Bounded test

Rollback-safe H4 `2401:2` moved only the existing native caption directly below the dominant cafe photo:

- H3 caption local position: `x=492 / y=290`, inside cobalt title field;
- H4 caption local position: `x=40 / y=578`, immediately below photo bottom `y=565`;
- wording, font size, photo geometry/crop, fixed display graphics and other copy preserved.

No container was added. The relation is carried by proximity and page structure.

## Failure deduplication

The first H4 render retained the caption's inherited yellow fill. Yellow had worked on cobalt but was weak on cream after the move.

This is not registered as a new failure fingerprint because RSL-122 already captures the same cause class:

`CONTAINER_SUBTRACTION_INHERITED_TEXT_CONTEXT_FAILURE`

Replacement method used:

- direct font/fill readback;
- preserve `Noto Sans JP Bold / 14px`;
- switch only the fill to existing V7 navy;
- rerun whole/reading/actual-size visual QA.

This is evidence that the failure-learning system prevented duplicate fingerprint growth and produced a faster correction.

## Three-scale evidence

- 500px whole-item: PASS and clearer binding than H3;
- 1400px reading: PASS;
- `1587×1123` actual size: PASS for DESIGN QA.

Structure:

- native text `11`;
- IMAGE-fill nodes `5`;
- text-text intersections `0`;
- 18px edge risks `0`;
- Japanese font mismatch `0`;
- no new text/image intersection versus H3 baseline;
- current V7 root overlap `0`.

## Adoption

- H4 `2401:2`: current V7 Cafe/Table comparison / `VERIFIED_LOCAL`.
- H3 `2311:2`: hidden rollback at `x=300000`.

## What must remain Rurubu-specific

Do not transfer the cobalt/cream palette, `11:40` wording, exact coordinates, Hawaii travel-magazine density, fixed display title treatment, photo choices or crop geometry.

## Cross-item applicability

The already-promoted RSL-008 method remains the transferable element: when metadata, caption, rule or accent appears near a visual, verify at whole-item scale whether it actually binds related information. If the semantic owner is unclear, test proximity/alignment/sequence before adding another container.

The RSL-122 context-revalidation lesson also remains applicable whenever the test moves text across materially different backgrounds.

## Truth boundary

H4's photography remains STRUCTURAL PHOTO DUMMY only. This local binding improvement does not verify final Hawaii imagery, print resolution, printer template, PDF preflight or physical proof.
