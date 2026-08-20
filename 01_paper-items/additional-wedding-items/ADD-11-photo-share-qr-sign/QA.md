# ADD-11 写真共有 / QR案内サイン — QA

Status: `CURRENT / VNEXT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A5_A4_REFLOW_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_READBACK_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-21
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

- Figma file key: `PWQ5ygJJt0IlOqj5ri5jng`
- selected vNext page: `44:2 / VNEXT_SELECTED / ADD-11 PHOTO SHARE / NIGHT ALBUM / 2026-08-21`
- selected A5: `45:2 / VNEXT_SELECTED / ADD-11 / NIGHT ALBUM / A5` — `875×1240`
- selected A4: `45:15 / VNEXT_SELECTED / ADD-11 / NIGHT ALBUM / A4` — `1240×1754`
- hidden long-copy stress: A5 `46:2`, A4 `46:15`
- prior clean-room V2 preserved: A5 `18:19`, A4 `19:34`
- retained legacy preserved: `1:31 / 1:45 / 3:2`
- exact Drive authority: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb / ADD-11_写真共有_QR案内サイン`
- Drive writes: `0`

## Professional vNext direction

Three materially different blank-frame directions were created before selecting a full-size family:

- `44:3 / MEMORY SUN`
- `44:12 / NIGHT ALBUM`
- `44:22 / POSTCARD BREEZE`

`NIGHT ALBUM` was selected because it most clearly reframes photo sharing from a scanner-widget task into an emotional keepsake action while preserving a trustworthy QR interaction hierarchy.

Selected art direction:

- deep-ocean navy dominant field;
- Japanese-first cream headline `この一日を、持って帰ろう。`;
- coral action cue `撮った写真を、ここへ。`;
- lagoon accent for movement;
- cream semantic QR role with invisible quiet-zone reserve;
- no camera icon, scanner orbit, fake QR destination, cards, shadows, gradients, fake controls, stock photography or decorative travel English.

A5 and A4 are independently authored reflows rather than proportional scaling.

## Three-scale visual QA

A5:

- whole/thumbnail ~500px: PASS;
- reading scale: PASS;
- actual `875×1240`: PASS.

A4:

- whole/thumbnail ~500px: PASS;
- reading scale: PASS;
- actual `1240×1754`: PASS.

The first A4 full-size readback caught an oversized headline wrapping to three lines and colliding with the coral subhead. It was corrected before selection to an intentional two-line headline with explicit separation.

## Long-copy stress

Stress copy intentionally expands unresolved operational roles for sharing method, privacy/access, expiry and hashtag status.

First stress screenshots failed:

- A5 method copy expanded into the fixed lagoon accent;
- A4 method/privacy/expiry roles collided with adjacent semantic copy.

The final selected/stress family uses native Auto Layout semantic groups:

- `AUTO / SHARE INSTRUCTIONS` for action/method flow;
- `AUTO / FOOT META` for privacy/expiry/hashtag flow.

Final A5 stress `46:2`:

- instruction group bottom `742`;
- lagoon sweep y `815` → `73px` clearance;
- footer bottom `1081`;
- outside visible text `0`;
- PASS.

Final A4 stress `46:15`:

- instruction group bottom `996`;
- lagoon sweep y `1080` → `84px` clearance;
- footer bottom `1470`;
- outside visible text `0`;
- PASS.

## Structure / editability QA

- all selected/stress semantic text: native + `textAutoResize=HEIGHT`;
- selected A5 QR role `290×290`, invisible quiet-zone reserve `230×230`;
- selected A4 QR role `420×420`, invisible quiet-zone reserve `332×332`;
- IMAGE fills: `0`;
- generated/composed raster: `0`;
- person imagery: `0`;
- no full-page flatten/raster replacement.

Auto Layout readback caught a programmatic authoring ordering defect: creating a container as AUTO and then calling `resize()` left `primaryAxisSizingMode=FIXED` with `10px` clipping. Final repair sets width/temporary size first, then applies `primaryAxisSizingMode='AUTO'` after the last resize and verifies real container height.

## Mature comparison against retained V2

The prior selected V2 was opened only after the new family passed structure, long-copy and three-scale QA.

V2 remains elegant and functional but is intentionally quiet. The vNext family wins the current professional brief on:

- emotional invitation;
- first-glance interaction hierarchy;
- color/contrast memorability;
- wedding-night excitement without fake scanner UI;
- family fit with the current joyful travel/departure direction.

Prior V2 and legacy remain untouched for rollback/history.

## Professional Design Council

Score: `90 / 100`.

No Executive Creative Director, Japanese Editorial, or Print Production veto remains.

Detailed evidence: `PROFESSIONAL-VNEXT-2026-08-21.md`.

## Hybrid / image decision

- variable guidance/privacy/expiry/hashtag: native editable text;
- future QR: replaceable semantic role with invisible quiet-zone geometry;
- fixed accents: native geometry;
- generated/composed raster: `0`;
- Drive asset writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the quality bottleneck was QR trust, operational resilience and emotional participation rather than missing imagery. Decorative image generation would dilute the QR role and add stock/AI-template risk.

## BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION

Still requires authoritative:

- sharing service / URL and account ownership;
- public/private access scope, permissions, retention/expiration and consent/privacy wording;
- hashtag decision;
- final A5/A4 installation selection and whether A6 is needed;
- real QR generated from the approved URL;
- iPhone/Android and physical low-light/oblique scan proof;
- printer template/profile, bleed/safe area, stand/frame interference, export and Drive delivery.

The invisible quiet-zone reserve must be revalidated with the real QR. No URL, QR destination, permission rule, hashtag or expiry fact may be fabricated.

## Current result

`VNEXT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A5_A4_REFLOW_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_READBACK_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Next progression target: `ADD-12 新郎新婦クイズカード` professional vNext clean-room reset.
