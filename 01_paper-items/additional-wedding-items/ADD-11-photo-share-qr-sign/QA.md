# ADD-11 写真共有 / QR案内サイン — QA

Status: `CURRENT / FAMILY_DIVERSITY_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A5_A4_REFLOW_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_READBACK_PASS / LEGACY_AND_PRIOR_VNEXT_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-21
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

- latest `main` immediately before promotion: `414cc83a8470965381459e93c07db44f4e9ea82f`
- Figma file: `PWQ5ygJJt0IlOqj5ri5jng`
- family-diversity page: `49:2 / FAMILY_DIVERSITY / ADD-11 PHOTO SHARE / 2026-08-21`
- current A5: `49:39 / CURRENT / ADD-11 / PHOTO LAB ENVELOPE / A5 / FAMILY DIVERSITY 2026-08-21` — `875×1240`
- current A4: `49:74 / CURRENT / ADD-11 / PHOTO LAB ENVELOPE / A4 / FAMILY DIVERSITY 2026-08-21` — `1240×1754`
- hidden long-copy stress: A5 `49:109`, A4 `49:144`
- prior Professional vNext preserved: A5 `45:2`, A4 `45:15`, renamed rollback and hidden
- prior clean-room V2 and legacy remain preserved
- exact Drive authority verified live: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb / ADD-11_写真共有_QR案内サイン`
- Drive writes: `0`

## Why the family-scale pass reopened ADD-11

The prior `NIGHT ALBUM` family remained a legitimate 90/100 single-item design. At suite scale, however, its dominant navy field plus lagoon rounded capsule plus coral/yellow accent system was close to the already-promoted `FAMILY_SCALE_TEMPLATE_REPETITION` fingerprint.

The defect was not QR clarity and not missing imagery. It was that the visual language still belonged to the same repeated abstract-color-field family as several other vNext items.

## Clean-room method

New work began from blank frames and did not duplicate or reuse NIGHT ALBUM, prior V2, legacy production, old color fields, old geometry, old QR container, old accent vectors, or old layout groups.

Only verified non-visual requirements were carried forward:

- A5 `875×1240` and A4 `1240×1754` physical roles;
- photo-sharing / QR guidance function;
- semantic placeholders for QR, sharing method, privacy, expiry and hashtag;
- native date `2026.10.24`;
- final service URL, access scope, privacy wording, expiry and hashtag remain unresolved.

## Three blank-frame directions

Created on `49:2`:

1. `49:3 / PHOTO LAB ENVELOPE`
2. `49:20 / CONTACT SHEET WALL`
3. `49:30 / SUNSET FILM SLEEVE`

`PHOTO LAB ENVELOPE` was selected for full-size development because it makes the artifact about a recognizable photographic object: film edge + photo-paper insert + QR paper, rather than an abstract poster with a scanner widget.

`CONTACT SHEET WALL` risked becoming a repeated panel/grid system. `SUNSET FILM SLEEVE` was visually warm but more decorative and less immediately legible for QR use.

The A5/A4 candidates were rebuilt separately from blank full-size frames rather than duplicating the thumbnails.

## Current art direction — PHOTO LAB ENVELOPE

First read:

`今日の景色を、みんなで一冊に。`

Visual system:

- warm sand/kraft-like outer field;
- black film edge with sprocket rhythm as a photography-specific physical cue;
- large warm photo-paper insert;
- coral paper tab and cyan photo-paper edge;
- cream QR paper role with an invisible quiet-zone reserve;
- native Japanese action/operational copy;
- yellow date strip as a small print-lab label;
- no camera icon, scanner orbit, route motif, fake QR destination, card UI, shadows, gradients or stock/generated wedding imagery.

This gives ADD-11 a photography/print-lab grammar distinct from the guest ledger, baggage-ticket, hanging escort rack and other sign/poster artifacts while keeping the broader travel/keepsake family.

## Hybrid authoring roles

- variable guidance/privacy/expiry/hashtag: native editable Figma text;
- QR: semantic native placeholder in a replaceable paper role with invisible quiet-zone geometry;
- operational information stack: native Auto Layout;
- fixed film/photo-paper construction: simple native geometry;
- editable SVG: `0` — no reusable silhouette required a separate vector asset;
- generated/composed raster: `0`;
- IMAGE fills: `0`;
- rasterized variable copy: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the screenshot-supported problem was suite-level abstract-shape repetition, not missing photography. Adding decorative photographs would weaken QR authority and could create fake-documentary or stock/AI risk.

## Three-scale screenshot QA

A5 `49:39`:

- whole / ~500px: PASS — film edge and photo-paper insert read immediately as an item-specific photographic artifact;
- reading / `706×1000`: PASS — title, QR, four semantic roles, closing and date are clear;
- actual `875×1240`: structure and type scale remain credible.

A4 `49:74`:

- whole / ~500px: PASS;
- reading/detail reflow: PASS;
- actual `1240×1754`: physical paper and QR roles remain proportionate rather than simply scaling the A5 UI.

Only after the new family matured was prior `NIGHT ALBUM` re-opened at thumbnail scale. NIGHT ALBUM remains valid history, but its full navy field and rounded lagoon gesture repeat the suite fingerprint more strongly. PHOTO LAB ENVELOPE wins the current family-diversity gate.

## Long-copy stress / defect caught during this run

Stress frames:

- A5 `49:109`
- A4 `49:144`

The first metadata readback caught a real failure before promotion.

### Initial A5 failure

- dynamic info stack `49:128`: y `520`, height `556`, bottom `1076`;
- closing copy was y `930`;
- photo-paper field ended near y `830`.

Long operational copy therefore escaped the intended physical paper and collided with the closing region.

### Initial A4 failure

- dynamic info stack `49:163`: y ≈`735.5`, height ≈`794`, bottom ≈`1529.5`;
- closing copy was y ≈`1315.5`;
- photo-paper field ended near y `1174`.

The same failure reproduced in the independent A4 reflow.

### Bounded correction

A5 selected/stress:

- photo-paper and cyan edge height → `900`;
- close → y `1100`;
- date strip/text → y `1165/1177`.

A4 selected/stress:

- photo-paper and cyan edge height → `1320`;
- close → y `1580`;
- date strip/text → y `1660/1677`.

No font shrink, no QR shrink and no fake summary copy was used to make the stress fit.

Final live stress screenshots:

- A5 `706×1000`: PASS — four long semantic roles stay inside the photo-paper field; close/date remain separated below;
- A4 `707×1000`: PASS — long-copy hierarchy remains intact inside the enlarged paper role with closing/date clear below.

This is an item-local application of the already-known rule that material movement/expansion of dynamic copy must be freshly revalidated against fixed physical boundaries.

## Structure / editability QA

Current A5 metadata:

- QR paper `49:55`, nested quiet-zone reserve `49:57`;
- native Auto Layout info stack `49:58`;
- semantic text remains native auto-height;
- IMAGE fills `0`.

Current A4 metadata:

- QR paper `49:90`, quiet-zone reserve `49:92`;
- native Auto Layout info stack `49:93`;
- semantic text remains native auto-height;
- IMAGE fills `0`.

Stress readback confirms Auto Layout expands naturally under long copy instead of clipping, and the corrected photo-paper role now contains that expansion.

## Professional Design Council

Score: **92 / 100**.

- Concept clarity / ownability: `15/15`
- Emotional excitement / pick-up appeal: `13/15`
- Japanese editorial typography: `14/15`
- Composition / hierarchy / rhythm: `14/15`
- Travel / memory integration without cliché: `9/10`
- Item-specific functionality / QR trust: `10/10`
- Physical print credibility: `9/10`
- Editability / content resilience: `5/5`
- Family fit without template sameness: `3/5`

No Executive Creative Director, Japanese Editorial or Print Production veto remains after the long-copy paper-field correction.

## Preservation

Promotion is rollback-safe:

- A5/A4 PHOTO LAB ENVELOPE become current;
- prior NIGHT ALBUM A5/A4 are hidden and retained as rollback/history;
- earlier V2 and legacy remain retained;
- three blank-frame concepts and stress frames are hidden evidence, not authoring sources for future clean-room work.

## BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION

Still requires authoritative:

- sharing service / URL and account ownership;
- access scope, permissions, retention/expiration and consent/privacy wording;
- hashtag decision;
- final A5/A4 installation selection and whether A6 is needed;
- real QR generated from the approved URL;
- iPhone/Android + low-light/oblique physical scan proof;
- printer template/profile, bleed/safe area, stand/frame interference, export and delivery.

The quiet-zone role must be revalidated with the real QR. No URL, permission, hashtag or expiry fact may be fabricated.

## Current result / next

`FAMILY_DIVERSITY_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A5_A4_REFLOW_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_READBACK_PASS / LEGACY_AND_PRIOR_VNEXT_PRESERVED / NOT_PRINT_READY`

Next high-value target: family-scale audit of `ADD-12 新郎新婦クイズカード`; redesign only if its dominant visual grammar materially repeats the promoted family-template fingerprint.