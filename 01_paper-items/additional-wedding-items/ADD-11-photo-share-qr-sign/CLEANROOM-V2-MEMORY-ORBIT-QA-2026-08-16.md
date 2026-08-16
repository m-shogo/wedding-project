# ADD-11 Clean-room V2 — Memory Orbit / QR Poster QA — 2026-08-16

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V2_SELECTED / LEGACY_PRESERVED / NOT_PRINT_READY`

Start authority SHA: `63575916d229d93a64acb1714def0fb30a8d669d`

## Scope / clean-room boundary

This is a fresh rebuild of non-Rurubu `ADD-11 写真共有 / QR案内サイン` under the 2026-08-15 clean-room mandate.

The new V2 was authored on a blank Figma page and did not duplicate or reuse the old production frame, old layout groups, QR field, seam, decorative vectors, old crops, old generated assets, or production node geometry. Carried-forward inputs were non-visual requirements only: A5 primary / A4 reflow size, safe/bleed requirements, QR quiet-zone role, semantic text roles, final date, unresolved QR/service/privacy/hashtag/expiry facts, and the prohibition on fake QR / AI people.

Retained old production was left unchanged and was opened only after the fresh V2 had passed its own screenshot + structure + long-copy QA.

## Figma authority

File: `ADD-11 写真共有・QR案内サイン`

File key: `PWQ5ygJJt0IlOqj5ri5jng`

Fresh page:

- `18:18 / CLEANROOM / ADD-11 / V2 MEMORY ORBIT / 2026-08-16`

A5 primary:

- `18:19 / FRAME_ADD11_A5_CLEANROOM_V2` — `875×1240`
- `18:26 / QR_PHOTO_SHARE`
- `18:29 / TXT_ACCESS_STEPS`
- `19:4 / STRESS_ADD11_A5_V2_LONG_COPY` — hidden

A4 independent reflow:

- `19:34 / FRAME_ADD11_A4_CLEANROOM_V2` — `1240×1754`
- `19:41 / QR_PHOTO_SHARE`
- `19:56 / STRESS_ADD11_A4_V2_LONG_COPY` — hidden

## New visual direction

V2 intentionally avoids the retained production's split-field / side-authority-panel grammar.

A5 uses a single paper field with:

- Japanese category `写真共有`;
- large editorial `SHARE YOUR JOURNEY` headline;
- a central-right circular memory-orbit surrounding a deliberately non-scannable QR reserve;
- an open left access-step ledger rather than cards;
- a pale mint lower information field for privacy / hashtag / expiry roles;
- a small clean editable camera mark.

A4 is not a scaled A5 duplicate. It independently reflows into a poster hierarchy:

- Japanese-first `旅の記憶を、ひとつに。` headline;
- central QR orbit;
- three horizontal step columns;
- lower privacy / hashtag / expiry roles.

No generated raster was needed: `IMAGE_GENERATION_NOT_REQUIRED`. The screenshot-supported task was composition / hierarchy / QR role clarity, and native text + editable vector geometry were sufficient.

## Structural QA

A5 final readback:

- root: `875×1240`;
- native text nodes: `14`;
- visible text outside root: `0`;
- IMAGE fills: `0`;
- QR reserve is intentionally non-scannable and contains no fake finder-pattern modules;
- variable roles remain native editable text.

A5 first screenshot exposed two real issues before comparison:

1. the large English title wrapped into three lines and collided with `TXT_SHARE_NOTE`;
2. access-step rows were fixed to `1px` height and clipped their native text.

Repairs:

- headline reduced/reflowed to a stable two-line hierarchy;
- `TXT_SHARE_NOTE` moved below it;
- access-step horizontal rows changed to auto-height / unclipped;
- accidental default white auto-layout fills were removed so steps read as an editorial ledger rather than web cards.

A5 long-copy stress `19:4`:

- root `875×1240`;
- native text `14`;
- visible text outside root `0`;
- IMAGE fills `0`.

A4 final readback:

- root `1240×1754`;
- visible native text `13`;
- visible text outside root `0`;
- IMAGE fills `0`.

A4 QA caught and corrected a targeting mistake during refinement: the native share note was briefly hidden while trying to hide a decorative ghost word. The note was restored, the intended decorative node was hidden, and the hidden stress clone was reconciled before final QA.

A4 long-copy stress also exposed an expiry-role overflow. The expiry and hashtag roles were converted to fixed text columns with auto-height rather than auto-width. Final stress readback:

- root `1240×1754`;
- visible native text `13`;
- visible text outside root `0`;
- IMAGE fills `0`.

## Three-scale visual QA

A5:

- whole/thumbnail (`500px` max): PASS — `SHARE YOUR JOURNEY` + QR orbit are immediately legible; no dashboard/card impression;
- reading: PASS — step ledger, privacy, hashtag and expiry hierarchy remain distinct;
- actual (`875×1240`): PASS — QR reserve / quiet-zone geometry and native text remain crisp.

A4:

- whole/thumbnail (`500px` max): PASS — Japanese headline and central QR orbit survive reduction;
- reading: PASS — three-step flow remains readable without panel segmentation;
- actual (`1240×1754`, reviewed at high-resolution render): PASS — type, rules, QR reserve and spacing remain credible.

## Legacy comparison — performed only after V2 completion

Retained production compared after clean-room completion:

- A5 `1:31 / ADD11_A5_TABLETOP`;
- A4 `3:2 / ADD11_A4_POSTER`.

Retained production is more utilitarian and strongly segmented. Clean-room V2 is materially different and wins the reopened art-direction goal on editorial character, whitespace rhythm, QR-as-purposeful-focal-point, and reduced admin/signage-template feel while maintaining native editability and functional QR reserve clarity.

Decision: `CLEANROOM_V2_SELECTED`.

The retained production is not deleted or overwritten. It remains rollback / history evidence.

## Drive

Exact Drive authority remains:

- folder `ADD-11_写真共有_QR案内サイン`;
- ID `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`.

Drive writes this run: `0`.

Reason: V2 uses no new raster/composed asset, and unresolved operational QR/service values must not be materialized prematurely.

## Deferred finalization

Still required before print-ready output:

- authoritative photo-sharing service / exact URL;
- access scope / posting permission / privacy wording / retention / expiry;
- final hashtag decision;
- real QR generation from the approved URL;
- encoded-URL readback and iPhone/Android scan test;
- final A5/A4 installation choice;
- printer bleed/profile/stand interference / physical-size proof.

These remain `DEFERRED_FINALIZATION` and do not invalidate the clean-room visual + structural pass.

## Result

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V2_SELECTED / LEGACY_PRESERVED / NOT_PRINT_READY`
