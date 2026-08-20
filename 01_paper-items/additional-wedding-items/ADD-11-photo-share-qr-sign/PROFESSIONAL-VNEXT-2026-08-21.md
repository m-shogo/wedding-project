# ADD-11 写真共有 / QR案内 — Professional vNext 2026-08-21

Status: `VNEXT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A5_A4_REFLOW_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_READBACK_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

## Live authority

- start `main`: `b2d1133416f0e68750128a864364e394c06f38f2`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `VISUAL_REOPENED`
- Figma file: `PWQ5ygJJt0IlOqj5ri5jng`
- exact Drive authority: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb / ADD-11_写真共有_QR案内サイン`
- prior selected V2 preserved: A5 `18:19`, A4 `19:34`
- retained legacy preserved: `1:31 / 1:45 / 3:2`
- Drive writes: `0`

## Clean-room inputs only

No prior visual composition was used during authoring. The new work carried only verified semantic/physical requirements:

- A5 working size `875×1240`;
- A4 working size `1240×1754`;
- photo-sharing / QR guidance role;
- unresolved QR remains a non-scannable semantic placeholder;
- verified QR-role geometry: A5 `290×290` with invisible `230×230` quiet-zone reserve, A4 `420×420` with invisible `332×332` quiet-zone reserve;
- privacy / sharing method / expiry / hashtag remain native semantic placeholders because final facts are unresolved;
- no sharing URL, account ownership, access scope, consent wording, hashtag, expiry or real QR was fabricated.

## Three fresh blank-frame art directions

New page: `44:2`.

- `44:3 / MEMORY SUN` — warm cream, oversized sun, bright daytime memory-collection direction.
- `44:12 / NIGHT ALBUM` — deep-ocean field, strong Japanese headline, cream QR interaction field, coral/lagoon signals.
- `44:22 / POSTCARD BREEZE` — coral postcard field, lagoon organic counterform, explicit 3-step sharing rhythm.

Council critique:

- MEMORY SUN is warm and friendly but remained slightly generic at thumbnail scale.
- POSTCARD BREEZE has strong travel warmth but the large color split and numbered steps compete with the QR interaction point.
- NIGHT ALBUM best balances emotional keepsake language, QR trust, high contrast, pop energy and professional print presence without scanner-widget styling.

## Selected clean-room family — NIGHT ALBUM

Fresh full-size frames were authored from blank frames rather than duplicating concept thumbnails or old production:

- page `44:2 / VNEXT_SELECTED / ADD-11 PHOTO SHARE / NIGHT ALBUM / 2026-08-21`
- A5 `45:2 / VNEXT_SELECTED / ADD-11 / NIGHT ALBUM / A5`
- A4 `45:15 / VNEXT_SELECTED / ADD-11 / NIGHT ALBUM / A4`
- hidden long-copy stress: A5 `46:2`, A4 `46:15`

One-sentence concept:

> 写真共有を「スキャンする掲示」ではなく、今日の一日を持って帰るための夜のアルバム入口として見せる。

Visual system:

- deep-ocean navy as the dominant memory/night field;
- Japanese-first cream headline `この一日を、持って帰ろう。`;
- coral `撮った写真を、ここへ。` as the action cue;
- lagoon accent for motion/energy;
- cream QR role as a future interaction zone, not fake QR UI;
- no camera icon, scanner ring, fake QR destination, orbit, dashboard card, shadow, gradient, stock photo or decorative travel English.

A5/A4 are independent reflows, not proportional scaling.

## Hybrid authoring split

- headline / instructions / privacy / expiry / hashtag / date: native editable Figma text;
- future QR: semantic replaceable role with preserved invisible quiet-zone geometry;
- fixed accents: native geometry;
- generated/composed raster: `0`;
- person imagery: `0`;
- IMAGE fills: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the diagnosed bottleneck is trustworthy QR hierarchy plus emotional participation, not missing photography. Decorative imagery would dilute the interaction point and increase stock/AI-template risk.

## Immediate text-geometry readback

The promoted project rule `AI_TEXT_RENDER_OK_BUT_BOUNDS_INVALID` was applied immediately after first full-size authoring rather than waiting for final QA.

Initial selected A5/A4 readback:

- all semantic text nodes already `textAutoResize=HEIGHT`;
- outside visible text `0`;
- IMAGE fills `0`;
- A5 QR role `290×290`, invisible quiet-zone `230×230`;
- A4 QR role `420×420`, invisible quiet-zone `332×332`.

The readback also caught an A4 visual collision before promotion: the first headline reflow wrapped to three lines and overlapped the coral subhead. The A4 headline was re-authored as an intentional two-line composition and the subhead moved below it. Fresh actual-size screenshot: PASS.

## Long-copy stress and Auto Layout repair

Stress roles intentionally use long unresolved operational copy for:

- sharing method;
- privacy/access explanation;
- expiry language;
- hashtag status.

First stress screenshots exposed two real failures:

1. A5 long `[共有方法]` expanded into the fixed lagoon accent;
2. A4 long method/privacy/expiry roles collided with adjacent semantic copy.

The selected/stress family was hardened with native Auto Layout semantic groups:

- `AUTO / SHARE INSTRUCTIONS` vertically flows the action/method copy;
- `AUTO / FOOT META` vertically flows privacy, expiry and hashtag copy;
- fixed lagoon accent is positioned below the dynamic instruction block with measured clearance.

A second implementation failure was caught during structural readback: creating the Auto Layout frame as AUTO and then calling `resize()` left `primaryAxisSizingMode=FIXED` with `10px` height and clipped children. The repair order mirrors the text-geometry lesson:

1. establish width / temporary frame size;
2. set `clipsContent=false`;
3. set `primaryAxisSizingMode='AUTO'` **after the final resize call**;
4. read back container height;
5. screenshot stress again.

Final stress evidence:

### A5 `46:2`

- instruction group height `182`, bottom `742`;
- lagoon sweep y `815` → `73px` clearance;
- footer group height `156`, bottom `1081`;
- outside text `0`;
- screenshot PASS.

### A4 `46:15`

- instruction group height `276`, bottom `996`;
- lagoon sweep y `1080` → `84px` clearance;
- footer group height `180`, bottom `1470`;
- outside text `0`;
- screenshot PASS.

Selected A5/A4 and stress proofs all retain `allAutoHeight=true` for semantic text and IMAGE fills `0`.

## Three-scale QA

A5:

- thumbnail ~500px: PASS — headline → QR → action cue is immediate;
- reading scale: PASS;
- actual `875×1240`: PASS.

A4:

- thumbnail ~500px: PASS;
- reading scale: PASS;
- actual `1240×1754`: PASS after headline/subhead reflow correction.

Long-copy stress A5/A4: PASS.

## Mature comparison against retained V2

The old selected V2 was opened only after vNext passed structure, long-copy and screenshot QA.

Retained V2 remains elegant and functional, but at thumbnail scale it is deliberately quiet and reads closer to editorial information signage. NIGHT ALBUM better satisfies the current professional reset by adding:

- stronger emotional invitation;
- clearer first-glance interaction hierarchy;
- more memorable color/contrast;
- greater wedding-night excitement without fake scanner UI;
- stronger family fit with the current joyful travel/departure direction while remaining item-specific.

The old V2 and legacy family remain untouched as rollback/history.

## Professional Design Council score

`90 / 100`

- Concept clarity / ownability: 14/15
- Emotional excitement / participation: 14/15
- Japanese typography / editorial craft: 13/15
- Composition / hierarchy / rhythm: 14/15
- Travel/destination integration without cliché: 7/10
- Item-specific QR/photo-share functionality: 9/10
- Physical print credibility: 9/10
- Editability / content resilience: 5/5
- Family fit without template sameness: 5/5

No Executive Creative Director, Japanese Editorial, or Print Production veto remains.

## DEFERRED_FINALIZATION / BLOCKED_REQUIRED_INPUT

Still requires authoritative:

- sharing service / URL and account ownership;
- public/private access scope, permissions, retention/expiration and consent/privacy wording;
- hashtag decision;
- final A5/A4 installation selection and whether A6 is needed;
- real QR generated from approved URL;
- iPhone/Android + physical low-light/oblique scan proof;
- printer template/profile, bleed/safe area, stand/frame interference, export and Drive delivery.

## Result

`VNEXT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A5_A4_REFLOW_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_READBACK_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Next target: `ADD-12 新郎新婦クイズカード` professional vNext clean-room reset.
