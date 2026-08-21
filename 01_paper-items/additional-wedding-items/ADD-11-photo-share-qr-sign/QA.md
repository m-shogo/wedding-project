# ADD-11 写真共有 / QR案内サイン — QA

Status: `CURRENT / PROFESSIONAL_VNEXT_DARKROOM_DEVELOPING_TRAY_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_IMPROVED / A5_A4_REFLOW_PASS / LONG_COPY_STRESS_PASS / JAPANESE_SEMANTIC_LINEBREAK_PASS / STRUCTURE_READBACK_PASS / LEGACY_AND_PRIOR_VNEXT_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-22
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

- latest `main` before this sync: `9d7418b19213cca55731062e8c64d75ca86929ff`
- Figma file: `PWQ5ygJJt0IlOqj5ri5jng`
- Current page: `53:34 / CURRENT_SELECTED / ADD-11 / DARKROOM DEVELOPING TRAY / 2026-08-22`
- Current A5: `52:2 / CURRENT / ADD-11 / DARKROOM DEVELOPING TRAY / A5` — `875×1240`
- Current A4: `53:2 / CURRENT / ADD-11 / DARKROOM DEVELOPING TRAY / A4` — `1240×1754`
- hidden realistic long-copy stress: `52:18 / 53:18`
- exact Drive authority verified live: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb / ADD-11_写真共有_QR案内サイン`
- Drive writes for this pass: `0`

Canonical current evidence:

- `PROFESSIONAL-VNEXT-DARKROOM-DEVELOPING-TRAY-QA-2026-08-22.md`

## Current visual direction — DARKROOM DEVELOPING TRAY

ADD-11 now uses a photographic-processing physical metaphor instead of an envelope/letter metaphor:

- deep-ink darkroom environment;
- black developing tray;
- one slightly rotated warm print sheet;
- coral safelight edge;
- narrow cyan process/chemistry edge;
- Japanese-first headline `今日の写真を、みんなで現像しよう。`;
- semantic native placeholders for sharing method, access/privacy scope, retention/expiry, hashtag/notice and QR;
- yellow size/index tab and native date as production-label details.

No fake URL, fake QR destination, fake film metadata, scanner UI, generated wedding photography, gradients, shadows or stock-looking decorative imagery are used.

The previous `PHOTO LAB ENVELOPE` remains a strong retained rollback/history design. It was not deleted or used as construction material for the new clean-room work.

## Why this replaced PHOTO LAB ENVELOPE

`PHOTO LAB ENVELOPE` remained a legitimate `92/100` design, but its own earlier council record scored only `3/5` for family fit without template sameness. Later suite work introduced several unrelated letter/envelope/paper-insert artifacts. The new direction preserves photographic specificity while moving the dominant object to a developing tray / print-in-process, improving family diversity without sacrificing QR trust.

Professional Design Council: `93/100 / PASS / NO VETO`.

- concept clarity / ownability: `15/15`
- emotional excitement / pick-up appeal: `13/15`
- Japanese editorial typography: `14/15`
- composition / hierarchy / rhythm: `14/15`
- travel / memory integration without cliché: `8/10`
- photo-share functionality / QR trust: `10/10`
- print credibility: `9/10`
- editability / content resilience: `5/5`
- family fit without template sameness: `5/5`

## Clean-room / preservation

This pass started from new blank frames using only verified non-visual requirements:

- A5 / A4 physical roles;
- photo-sharing / QR guidance purpose;
- confirmed date `2026.10.24`;
- native semantic placeholders;
- unresolved URL/privacy/expiry/hashtag facts remain unresolved.

New study page: `51:2`.

Materially different studies:

1. `51:3 / CONTINUOUS PROOF STRIP` — rejected after screenshot exposed a Japanese semantic line-break failure and lead/headline collision.
2. `51:32 / DARKROOM DEVELOPING TRAY` — selected for mature development.
3. `51:44 / PRINT ARCHIVE TAPE` — rejected because it drifted toward system/UI information-panel grammar.

Prior Current PHOTO LAB ENVELOPE remains untouched at `49:39 / 49:74` in its original page. Prior NIGHT ALBUM, earlier V2 and legacy evidence also remain preserved.

## Three-scale screenshot QA

### A5

- whole / thumbnail: PASS;
- reading: PASS;
- native actual `875×1240`: PASS.

The developing tray + rotated print read as one photographic physical object. Headline, sharing roles and QR hierarchy remain clear.

### A4

- whole / thumbnail: PASS;
- reading: PASS;
- native actual `1240×1754`: PASS.

A4 is an independently rebuilt reflow rather than a scaled A5 clone.

## Long-copy / Japanese semantic line-break QA

Stress roots: `52:18 / 53:18`.

The first stress passes caught bad Japanese visual wrapping even though structural overflow was zero. Artificially overlong bracket labels produced splits such as `案 / 内` and `注意事 / 項`.

The stress contract was corrected to realistic semantic placeholders without inventing facts:

- `[公開範囲に関する案内文]`
- `[保存・削除時期に関する案内文]`
- `[写真共有時の注意事項]`

Copy lanes were widened where needed without shrinking type. Final A5/A4 stress screenshots: PASS. Stress roots were returned hidden after review.

## Structure / hybrid QA

Current A5 `52:2`:

- native visible text `8`;
- fixed-height text `0`;
- visible text outside root/role `0`;
- IMAGE fills `0`.

Current A4 `53:2`:

- native visible text `8`;
- fixed-height text `0`;
- visible text outside root/role `0`;
- IMAGE fills `0`.

Stress A5/A4:

- fixed-height text `0 / 0`;
- outside `0 / 0`;
- IMAGE fills `0 / 0`.

Responsibility split:

- variable/factual/emotional copy: native Figma text;
- QR: independent semantic native placeholder on replaceable white paper role;
- tray / print / safelight / process edge / size tab: simple native fixed geometry with explicit physical meaning;
- SVG `0`;
- generated/composed raster `0`;
- IMAGE fills `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the diagnosed defect was family-level physical-metaphor convergence, not missing photography. Decorative generated photos would reduce truth/QR trust and add stock/AI risk.

## QR quiet-zone/container decision

The mature candidate initially had a thin visible border around the white QR paper. A bounded application of the existing verified quiet-zone/container-subtraction method removed only that stroke while preserving the white paper and geometry. The QR role remained obvious but read less like a UI widget.

The real QR is still unresolved. Its final quiet zone and scan behavior must be revalidated with the approved URL.

## BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION

Still required and intentionally not fabricated:

- sharing service / URL and account ownership;
- access scope / permissions / privacy wording;
- retention / expiration;
- hashtag decision;
- final A5/A4 installation choice and whether A6 is required;
- real QR from the approved URL;
- iPhone/Android + low-light/oblique physical scan proof;
- printer template/profile, bleed/safe area, stock, frame/stand interference, export and physical print proof.

## Previous Current evidence retained

The 2026-08-21 `PHOTO LAB ENVELOPE` Current and its long-copy repair remain valid historical/rollback evidence in Git history and Figma `49:39 / 49:74 / 49:109 / 49:144`. No prior Figma production or rollback node was deleted.
