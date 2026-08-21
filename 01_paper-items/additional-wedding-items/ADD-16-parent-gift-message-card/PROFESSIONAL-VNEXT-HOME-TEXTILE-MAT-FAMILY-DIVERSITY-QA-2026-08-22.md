# ADD-16 両親贈呈品メッセージカード — Professional vNext `HOME TEXTILE MAT` / Family Diversity QA

Date: 2026-08-22
Start authority SHA: `23ea8de8ccfe10cb11d946a00f4476cd1bd8a793`
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / HOME_TEXTILE_MAT_SELECTED / FAMILY_DIVERSITY_PASS / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

## Live authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`.
- Professional quality authority: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`.
- Shared learning: `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` plus the neutral feeds only.
- Hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`.
- Figma file: `ylmVBbwNcnjueYrymNpa3c`.
- Drive authority: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`; live metadata readback PASS; Drive write `0`.

## Why the previous Current reopened

The retained `RETURN LETTER HOME` was individually strong and already passed family-diversity QA. A later suite-level audit exposed a higher-order repetition: several unrelated selected items had converged on letter/envelope/paper-insert metaphors. This is the already `VERIFIED_CROSS_ITEM` failure fingerprint `F-NRSL-PHYSICAL-METAPHOR-CONVERGENCE`.

ADD-16 was a valid receiving-item test because its actual function is not “send a letter”; it is to give parents a tactile keepsake carrying gratitude at the moment of departure/homecoming. The question was whether a more item-specific physical grammar could improve family diversity without losing warmth or writing usability.

## Clean-room boundary

No `54:*`, `45:*`, `18:*`, legacy, prior V2/V3, or previous Current visual node was duplicated or used as construction material.

Only verified non-visual requirements were carried forward:

- canvas `700×1036`;
- front/back message-card role;
- native editable parent-message, signature and date roles;
- reverse writing surface;
- realistic long-copy and long-name resilience;
- no generated parents/family/person imagery;
- final copy, attachment method and print/vendor details remain unresolved.

## Three materially different blank-frame directions

Study page:

- `56:2 / VNEXT_STUDY / ADD-16 / POST-LETTER FAMILY DIVERSITY / 2026-08-22`

Directions:

1. `56:3 / THANK-YOU BROADSIDE`
   - commemorative typographic broadside;
   - deep-ink column + warm paper + ochre register;
   - rejected after screenshot exposed an unstable oversized date wrap/crop and weaker tactile/home specificity.
2. `56:14 / HOME TEXTILE MAT`
   - oat paper with forest selvage, rust/saffron weave bars and one thread-like vertical rule;
   - selected because the physical metaphor is a woven keepsake / home textile rather than another letter or envelope.
3. `56:28 / MEMORY ARCHIVE SLIP`
   - archival label / collection-card grammar;
   - visually clean, but rejected as too museum/archive-like and emotionally cooler for a parent gift.

## Mature selected direction

Promoted page:

- `57:2 / CURRENT_SELECTED / ADD-16 / HOME TEXTILE MAT / 2026-08-22`
- front `57:3 / CURRENT_SELECTED / ADD16 / FRONT / HOME TEXTILE MAT`
- back `57:17 / CURRENT_SELECTED / ADD16 / BACK / HOME TEXTILE MAT WRITING`
- hidden realistic stress `57:36 / 57:50`
- retained previous Current page `54:2`, visual content preserved and relabeled as retained history only.

### Front

Emotional idea: `育ててもらった時間を、これからの暮らしへ持っていく。`

The front uses:

- dark forest selvage as the dominant tactile anchor;
- oat/warm paper field;
- rust + saffron short weave bands rather than floating capsules;
- one vertical thread/binding gesture;
- Japanese-first display `育ててくれた時間を、これからの力に。`;
- open native message role and signature;
- restrained date at the lower edge.

It avoids envelope flaps, paper inserts, giant circles, transport credentials, fake stamps, route UI and tropical clip-art.

### Back

The reverse is an open writing mat rather than a letter sheet inside an envelope:

- same selvage/weave language;
- Japanese-first `ことばを、持って帰ろう。`;
- broad unboxed writing surface;
- seven functional writing rules;
- separate guide and signature footer lanes;
- no visible form/card container around the writing role.

## Screenshot QA and real failures

Selected front/back were reviewed at native `700×1036` and ~1000px reading render.

Realistic stress duplicates were then created.

### Front stress failure and repair

Initial long-copy stress exposed two real defects despite valid root geometry:

1. display copy mechanically wrapped so final `に。` became an orphan line;
2. the tall body message collided with the fixed signature position.

The repair did not shrink copy into microtype. It changed the content-flow method:

- explicit semantic two-line display;
- display set to 44px / 60px line-height in the stress-capable layout;
- display, body and signature moved into a fixed-height vertical Auto Layout stack;
- body remains native `textAutoResize=HEIGHT`;
- a flexible spacer yields first as the message grows, keeping the signature at the bottom of the semantic content zone.

The first repair attempt failed before mutation because the Figma Plugin API font was not loaded. The input contract was corrected by explicitly `loadFontAsync` for all written font styles, then the bounded repair succeeded. This was not repeated as cosmetic retry.

Final front long-copy screenshot: PASS.

### Back stress failure and repair

The first back stress used a deliberately longer guide string that produced a mechanical final-word break and metadata collision between guide and signature lanes. The stress contract was corrected to realistic semantic wording, and the footer lanes were separated by width/x-position rather than reducing font size.

Final back long-copy screenshot: PASS.

## Structure readback

Final selected + stress readback:

- selected front `57:3`: native visible text `5`; fixed-height `0`; outside `0`; text collisions `0`; IMAGE fills `0`.
- selected back `57:17`: native visible text `5`; fixed-height `0`; outside `0`; collisions `0`; IMAGE fills `0`.
- stress front `57:36`: native visible text `5`; fixed-height `0`; outside `0`; collisions `0`; IMAGE fills `0`.
- stress back `57:50`: native visible text `5`; fixed-height `0`; outside `0`; collisions `0`; IMAGE fills `0`.

Stress roots were returned hidden after review.

## Mature comparison with retained `RETURN LETTER HOME`

Only after HOME TEXTILE MAT passed selected/stress screenshot and structure QA was `54:3 / 54:15` reopened for comparison.

`RETURN LETTER HOME` remains attractive, warm and fully retained, but its envelope + letter-paper construction now overlaps a successful physical metaphor already used across other unrelated Current items. HOME TEXTILE MAT is stronger under the current suite-level quality bar because:

- its tactile weave/selvage metaphor is more specific to “home / upbringing / keepsake” than “another letter”;
- it preserves warmth without copying another paper-insert construction;
- it gives the reverse an equally strong writable function;
- it remains simple, native, editable and physically plausible;
- it improves family diversity without forcing novelty for novelty's sake.

Professional Design Council: `93/100 / PASS / NO VETO`.

- Concept clarity / ownability: `14/15`
- Emotional excitement / want-to-pick-up: `14/15`
- Typography / Japanese editorial craft: `14/15`
- Composition / hierarchy / rhythm: `13/15`
- Travel/homecoming integration without cliché: `8/10`
- Item-specific functionality: `10/10`
- Physical print credibility: `10/10`
- Editability / content resilience: `5/5`
- Family fit without template sameness: `5/5`

## Hybrid / image decision

- variable/factual copy: native Figma text;
- weave/selvage/writing rules: simple native functional geometry;
- generated/composed raster: `0`;
- editable SVG: `0`;
- replaceable image role: `0`.

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_PASS`.

The visible problem was metaphor convergence, not missing imagery. Generated parents/family are prohibited, and generic tropical/home imagery would weaken specificity and handwriting area rather than solve the diagnosed defect.

## Deferred finalization

Still unresolved and intentionally not fabricated:

- one card per family vs one shared card;
- actual gift/package/attachment method;
- whether names appear on front;
- final body copy / signatures / forms of address;
- paper stock and whether the textile effect should be achieved through stock/ink/finish rather than more digital decoration;
- printer template/profile, bleed/export settings;
- physical attachment and 100% print proof.

Result:

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / HOME_TEXTILE_MAT_SELECTED / FAMILY_DIVERSITY_PASS / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.
