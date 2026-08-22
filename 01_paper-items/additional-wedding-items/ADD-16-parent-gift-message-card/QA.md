# ADD-16 両親贈呈品メッセージカード — QA

Status: `CURRENT / PROFESSIONAL_VNEXT_HOME_TEXTILE_MAT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / JAPANESE_KICKER_FONT_ASSIGNMENT_PASS / WRITING_SURFACE_PASS / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-23
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Professional quality authority: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`

## Current selected authority

- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- Current page: `57:2 / CURRENT_SELECTED / ADD-16 / HOME TEXTILE MAT / 2026-08-22`
- Current front: `57:3 / CURRENT_SELECTED / ADD16 / FRONT / HOME TEXTILE MAT`
- Current back: `57:17 / CURRENT_SELECTED / ADD16 / BACK / HOME TEXTILE MAT WRITING`
- hidden realistic long-copy stress: `57:36 / 57:50`
- pre-2026-08-23 front rollback: `66:2`
- pre-2026-08-23 front-stress rollback: `66:18`
- three-direction blank-frame study: `56:2`
- retained previous Current RETURN LETTER HOME: `54:2 / 54:3 / 54:15` — comparison/history only
- retained HOMEWARD JOURNEY: `45:2 / 45:32 / 45:42` — comparison/history only
- retained HOME HORIZON: `18:3 / 18:14` — comparison/history only
- retained legacy: `1:2 / 1:13` — comparison/history only
- exact Drive authority: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`
- Drive write for this pass: `0`

Canonical current evidence:
- `PROFESSIONAL-VNEXT-HOME-TEXTILE-MAT-FAMILY-DIVERSITY-QA-2026-08-22.md`
- `FIGMA-JAPANESE-KICKER-FONT-ASSIGNMENT-QA-2026-08-23.md`
- item Current entry point: `CURRENT.md`

## Why Current changed after RETURN LETTER HOME

A later family-scale audit found a higher-order repetition: after abstract circles/capsules were removed, several unrelated Current items had independently converged on letter/envelope/paper-insert metaphors. ADD-16's primary action is not sending a letter; it is giving parents a tactile keepsake carrying gratitude at a departure/homecoming moment.

The replacement therefore had to improve family diversity through a more item-specific physical grammar without sacrificing warmth, writing usability or native editability.

The selected direction was authored from blank frames using only verified non-visual requirements: `700×1036`, front/back message-card role, native editable parent-message/signature/date roles, reverse writing surface, realistic long-copy/long-name resilience and unresolved-input boundaries.

## Current visual direction — HOME TEXTILE MAT

Emotional brief: `育ててもらった時間を、これからの暮らしへ持っていく。`

### Front `57:3`

- dark forest selvage as the tactile anchor;
- warm oat paper field;
- rust + saffron short weave bands;
- one thread-like vertical rule;
- Japanese-first `育ててくれた時間を、これからの力に。`;
- native Japanese kicker `両親へ` explicitly assigned `Noto Sans JP Bold` after the 2026-08-23 fallback-font repair;
- open native parent-message role and signature;
- restrained date at the lower edge;
- no envelope flap, paper insert, giant circle/capsule, fake airline credential, barcode, route UI, tropical clip-art or generated family/person imagery.

### Back `57:17`

- open writing mat rather than a letter sheet inside an envelope;
- same selvage/weave language;
- Japanese-first `ことばを、持って帰ろう。`;
- broad unboxed writing surface;
- seven functional writing rules;
- separate guide and signature footer lanes;
- no visible form/card container around the writing role.

## Three-scale screenshot QA

Live re-audit on 2026-08-23 reconfirmed the Current front at native `700×1036`; promoted evidence already records front/back whole-item, reading and native actual-size PASS.

The Current retains a strong tactile/homecoming identity without returning to the suite's old rounded-shape or letter/envelope convergence fingerprints.

## Japanese kicker font-assignment repair — 2026-08-23

Fresh native-text readback found that the Japanese front kicker `両親へ` was authored as `Inter Bold` on both Current and the front stress proof. Figma still displayed readable Japanese fallback glyphs, so screenshot-only review had hidden the font-contract mismatch.

Bounded repair:

- Current kicker `57:10`: `Inter Bold → Noto Sans JP Bold`;
- stress kicker `57:43`: `Inter Bold → Noto Sans JP Bold`;
- characters, `16 px` size, `24 px` line-height, position, width, color and all surrounding layout remain unchanged;
- complete pre-repair rollback roots: `66:2 / 66:18`.

Post-repair Current screenshot: PASS at whole, reading and native `700×1036`.

Front stress `57:36` was temporarily revealed after the change and re-hidden after verification. The realistic long Japanese message remains collision-free and does not enter the thread, lower weave, date or trim lanes.

Cross-item read-only probes on WEDDING PASSPORT, BOARDING PASS and ADD-09 found no equivalent Japanese-on-Inter assignment, so the new fingerprint remains `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`, not a project-wide rule.

## Real failures caught before / after selection

The professional vNext pass caught and repaired actual failures rather than counting draft creation as progress:

1. `THANK-YOU BROADSIDE` had an unstable oversized date wrap/crop → rejected.
2. first HOME TEXTILE display mechanically orphaned `を、` → corrected with semantic Japanese line breaking.
3. realistic front stress orphaned final `に。` and allowed growing body copy to collide with a fixed signature → display/body/signature were rebuilt as native auto-height roles in a vertical stack with a flexible spacer.
4. first stack mutation attempt failed because required Figma fonts were not loaded → corrected input contract with explicit font loading before retry.
5. realistic back stress exposed mechanical guide-word breaking / footer-lane collision → guide/signature widths and positions were separated without shrinking type.
6. later readback found Japanese semantic kicker text assigned to Latin-family `Inter` and relying on fallback → repaired to explicit `Noto Sans JP Bold` with rollback and fresh stress QA.

## Structure / long-copy QA

Final selected + stress readback after the latest repair:

- selected front `57:3`: native visible text `5`; fixed-height `0`; outside `0`; text collisions `0`; IMAGE fills `0`; kicker `Noto Sans JP Bold`.
- selected back `57:17`: native visible text `5`; fixed-height `0`; outside `0`; collisions `0`; IMAGE fills `0`.
- stress front `57:36`: native visible text `5`; fixed-height `0`; outside `0`; collisions `0`; IMAGE fills `0`; kicker `Noto Sans JP Bold`.
- stress back `57:50`: native visible text `5`; fixed-height `0`; outside `0`; collisions `0`; IMAGE fills `0`.

Stress roots remain hidden after proof review. All family-specific/final copy stays native editable text.

## Hybrid / image decision

- variable/factual copy: native Figma text;
- weave/selvage/writing rules: simple native functional geometry;
- generated/composed raster: `0`;
- editable SVG: `0`;
- replaceable image role: `0`.

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_PASS`: the diagnosed quality gap was a native typography assignment defect, not missing photography/illustration. Generated parents/family are prohibited, and generic tropical/home imagery would weaken specificity and writing function.

## Professional Design Council

Score remains `93/100 / PASS / NO VETO`.

- Concept clarity / ownability: 14/15
- Emotional excitement / want-to-pick-up: 14/15
- Japanese editorial craft: 14/15
- Composition / hierarchy / rhythm: 13/15
- Travel/homecoming integration without cliché: 8/10
- Item-specific functionality: 10/10
- Physical print credibility: 10/10
- Editability / content resilience: 5/5
- Family fit without template sameness: 5/5

The latest font-assignment repair corrects authored Japanese typography without changing the established visual direction or score.

## Deferred finalization

Still unresolved and intentionally not fabricated:

- one card per family vs one shared card;
- actual gift/package/attachment method;
- whether names appear on front;
- final body copy / signatures / forms of address;
- paper stock and whether textile character should be reinforced through stock/ink/finish rather than more digital decoration;
- printer template/profile, bleed/export settings;
- physical attachment and 100% print proof.

These remain `BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION` and do not invalidate the current visual/design selection.

## Result

`PROFESSIONAL_VNEXT_HOME_TEXTILE_MAT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / JAPANESE_KICKER_FONT_ASSIGNMENT_PASS / WRITING_SURFACE_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.
