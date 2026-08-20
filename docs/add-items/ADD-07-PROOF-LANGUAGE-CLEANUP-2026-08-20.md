# ADD-07 エスコートカード案内ボード — Proof-language cleanup QA

Date: 2026-08-20
State: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS MAINTAINED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- start/latest `main` immediately before Git write: `5591e2dd124a6bbf2b66fc8411d63b1b724748e5`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `rplj1IWXP4XVKjWDQRg3dU`
- A2 production: `1:2 / FRAME_ADD07_A2_PORTRAIT`
- A3 production/reflow: `1:17 / FRAME_ADD07_A3_REFLOW_COMPARE`
- Drive authority folder: `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi / ADD-07_エスコートカード案内ボード`
- Drive metadata was read back live before the Figma write; Drive writes: `0`.

This is a bounded repair on the already selected clean-room ADD-07 pair. It does not create a new V2/V3 direction, does not use retained legacy design as authoring material, and does not alter preserved historical production.

## Visible problem

Fresh live screenshot/readback showed the footer semantic placeholder printed as:

`[カード設置場所 · LAYOUT DUMMY]`

on both A2 and A3. `LAYOUT DUMMY` is internal authoring language, not guest-facing copy. Current explicitly requires implementation state to remain in node names/hidden QA evidence and forbids printing authoring suffixes such as `LAYOUT DUMMY`, `DUMMY`, `QA`, `PROOF`, `TEMP`, `editable`, or `native text` in guest-facing copy.

## Bounded rollback-safe change

Hidden pre-change rollback copies were created first:

- `29:2 / ROLLBACK / ADD-07 A2 / PRE PROOF-LANGUAGE CLEANUP / 2026-08-20`
- `29:22 / ROLLBACK / ADD-07 A3 / PRE PROOF-LANGUAGE CLEANUP / 2026-08-20`

Only two native semantic text nodes changed:

- A2 `4:48 / TXT_META_PLACE`: `[カード設置場所 · LAYOUT DUMMY]` → `[カード設置場所]`
- A3 `4:67 / TXT_META_PLACE`: `[カード設置場所 · LAYOUT DUMMY]` → `[カード設置場所]`

No title, instruction copy, step hierarchy, date, position, line/rule, edge treatment, frame geometry, type size, image role, SVG/vector role, or verified fact changed.

## Hybrid-authoring roles

- semantic/variable location placeholder: native Figma text;
- fixed print structure: existing simple native geometry;
- generated/composed raster added: `0`;
- SVG/vector changes: `0`;
- replaceable image changes: `0`;
- variable/factual copy baked into raster/SVG: `0`.

Image generation was not used because the screenshot-supported defect was proof-language contamination, not missing hero/background artwork.

## Three-scale screenshot QA

Post-change A2:

- whole-item / `354×500`: PASS — primary Japanese instruction and staggered `01→02→03` reading path are unchanged; the footer no longer exposes internal authoring language.
- reading / `990×1400`: PASS — `[カード設置場所]` remains a clear semantic placeholder and does not create a visual hole.
- actual-size / native `1400×1980`: PASS — footer/date/rule remain aligned and legible; no clipping/collision introduced.

Post-change A3:

- actual-size / native `990×1400`: PASS — independent reflow remains visually intact and the footer now uses only the semantic placeholder.

## Structure QA

Fresh readback after the Figma write:

A2 `1:2`:

- `1400×1980`, `clipsContent=true`;
- native text `11`, visible text `11`;
- visible IMAGE fills `0`;
- visible text outside root `0`;
- visible internal-proof-token matches `0`;
- `4:48` remains native editable text with `textAutoResize=HEIGHT`, characters `[カード設置場所]`.

A3 `1:17`:

- `990×1400`, `clipsContent=true`;
- native text `11`, visible text `11`;
- visible IMAGE fills `0`;
- visible text outside root `0`;
- visible internal-proof-token matches `0`;
- `4:67` remains native editable text with `textAutoResize=HEIGHT`, characters `[カード設置場所]`.

Rollback readback:

- `29:2`: exists, hidden, `1400×1980`;
- `29:22`: exists, hidden, `990×1400`.

## Decision

`VERIFIED_LOCAL / ADOPTED`.

ADD-07 maintains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. The correction removes a guest-facing production artifact while preserving the existing clean-room visual direction, native editability, A3 independent reflow, rollback history, and all verified facts.

No new shared-learning lesson is promoted: this is direct enforcement of an existing Current project rule rather than a new cross-item hypothesis.

## Deferred finalization

Unchanged:

- final card arrangement and operational wording;
- final A2/A3 installation choice;
- easel/stand obstruction check;
- venue lighting and 2–4 m physical readability proof;
- printer bleed/template/profile;
- 100% physical print proof.

Next progression target: `ADD-08 メニュー補助サイン`.
