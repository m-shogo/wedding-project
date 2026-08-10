# ADD-11 写真共有 / QR案内サイン — Reopened Visual QA — 2026-08-10

Authority at write: GitHub latest `main` = `38df1ded541010b8ec00ebd2dd21970eb04a0f2b`; Current remains `VISUAL_REOPENED`.

## Live authority

- Figma file: `ADD-11 写真共有・QR案内サイン`
- Figma file key: `PWQ5ygJJt0IlOqj5ri5jng`
- production: `1:31 / ADD11_A5_TABLETOP`, `1:45 / ADD11_A6_MINI`, `3:2 / ADD11_A4_POSTER`
- Drive folder: `ADD-11_写真共有_QR案内サイン` / `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`
- prior structural authority retained: `01_paper-items/additional-wedding-items/ADD-11-photo-share-qr-sign/QA.md`
- RURUBU/るるぶ area was not read or written.

## Reopened visual diagnosis

The prior production was structurally careful and correctly avoided fabricating a real QR, but the fresh A5 screenshot still read too much like an instruction sheet with a bordered UI-card-like QR square in the lower-right. The large title and steps were usable, yet the QR role looked appended rather than art-directed as part of a physical print object.

The previous `DESIGN_QA_PASS_WITH_PLACEHOLDERS` and long-copy evidence were retained only as structural proof.

## Clean-room family

Created on `99_QA`:

- section: `5:2 / QA_ADD_11_REOPENED_CLEANROOM_FAMILY_2026_08_10`
- A5: `5:3 / QA_ADD11_A5_V2_QR_AUTHORITY_FIELD`
- A6: `5:19 / QA_ADD11_A6_V2_QR_AUTHORITY_FIELD`
- A4: `5:35 / QA_ADD11_A4_V2_QR_AUTHORITY_FIELD`

Art direction:

- Japanese-first category label `写真共有` replaces decorative English hierarchy;
- headline becomes `今日の思い出を、みんなで一枚ずつ。` in native `Noto Serif JP`;
- the unresolved QR is treated as a deliberate deep-navy authority field rather than a bordered web-card box;
- the QR placeholder itself stays deliberately non-scannable: only `QR CODE` plus `［確定リンク待ち · LAYOUT DUMMY］` on an ivory reserved square;
- A5/A4 use a right-side navy QR field; A6 independently reflows the QR role into a bottom navy field rather than proportional scaling;
- the sharing sequence remains native editable text and native vertical auto-layout;
- privacy/public-scope copy remains an explicit semantic placeholder;
- one restrained rust seam marks the boundary between editorial copy and QR authority field;
- no fake finder patterns, scannable modules, stock icons, generated people, QR-like decoration, rounded cards, pills, badges, gradients, shadows, or transport-roleplay.

The first family-board screenshot exposed a Japanese word-break defect in the A5 headline (`一枚ず / つ。`). It was corrected before promotion by reducing the title to 46 px and widening its measure to 430 px. Full-size A5 screenshot then confirmed a clean two-line title.

## Image generation

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated asset was claimed or stored. More importantly, generated imagery is not the bottleneck for this sign and could compete with the eventual real QR. Drive writes: `0`.

## V2 long-copy stress

Created:

- section: `5:51 / QA_ADD_11_V2_LONG_COPY_STRESS_2026_08_10`
- A5 stress: `5:52 / QA_ADD11_A5_V2_LONG_COPY_STRESS`
- A6 stress: `5:68 / QA_ADD11_A6_V2_LONG_COPY_STRESS`
- A4 stress: `5:84 / QA_ADD11_A4_V2_LONG_COPY_STRESS`

Expanded native copy tested:

- longer sharing explanation;
- longer privacy/public-scope/retention explanation;
- longer QR instruction.

The family stress screenshot showed the expanded copy stays in its assigned editorial/QR fields without collision. Auto-layout flow readback:

- A5 flow bottom `758` inside `875 × 1240`;
- A6 flow bottom `442.8` inside `620 × 875`;
- A4 flow bottom `895` inside `1240 × 1754`.

## Rollback-safe promotion

Before promotion all three live production frames were preserved:

- rollback section: `6:2 / ROLLBACK_ADD_11_PRE_REOPENED_QR_FIELD_2026_08_10`
- A5 rollback: `6:3 / ROLLBACK_ADD11_A5_TABLETOP_PRE_V2`
- A6 rollback: `6:33 / ROLLBACK_ADD11_A6_MINI_PRE_V2`
- A4 rollback: `6:63 / ROLLBACK_ADD11_A4_POSTER_PRE_V2`

Production IDs `1:31`, `1:45`, and `3:2` were preserved while their contents were replaced with the approved V2 family.

## Post-promotion structure QA

A5 `1:31`:

- `875 × 1240`, `clipsContent=true`
- native text count: `10`
- IMAGE fills: `0`
- `CONTENT_FLOW_VARIABLE_COPY` = vertical auto-layout, `400 × 408`, bottom `758`
- QR placeholder remains `310 × 310`, explicitly non-scannable.

A6 `1:45`:

- `620 × 875`, `clipsContent=true`
- native text count: `10`
- IMAGE fills: `0`
- variable flow = vertical auto-layout, bottom `442.8`
- QR placeholder remains `217 × 217`, explicitly non-scannable.

A4 `3:2`:

- `1240 × 1754`, `clipsContent=true`
- native text count: `10`
- IMAGE fills: `0`
- variable flow = vertical auto-layout, bottom `895`
- QR placeholder remains `360 × 360`, explicitly non-scannable.

Rollback A5/A6/A4 remain intact with the prior native text, auto-layout flow, zero IMAGE fills, and non-scannable placeholders.

## Status

- structural: `DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / NATIVE_EDITABLE_PASS / AUTO_LAYOUT_PASS / ROLLBACK_SAFE / ACTUAL_SIZE_QA_PASS`
- reopened visual: `SELLABLE_VISUAL_QA_PASS`
- combined: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`

## BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION

Still intentionally unresolved:

- authoritative photo-sharing destination URL;
- confirmed service/account ownership and access permissions;
- public/private scope, retention/expiry and privacy/consent wording;
- final format adoption among A5/A4 and whether A6 is needed;
- generation of the real QR from the exact final URL;
- URL readback, iPhone/Android scans, physical-size/low-light/oblique scan proof;
- printer bleed/template/profile and final Drive deliverables.

No real QR will be generated before those authoritative inputs exist.

## Next

Proceed to ADD-12 新郎新婦クイズカード for reopened visual-art-direction audit.
