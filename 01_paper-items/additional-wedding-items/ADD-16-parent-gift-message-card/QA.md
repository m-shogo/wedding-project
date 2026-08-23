# ADD-16 両親贈呈品メッセージカード — QA

Status: `CURRENT / PROFESSIONAL_VNEXT_HOME_TEXTILE_MAT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / JAPANESE_KICKER_FONT_ASSIGNMENT_PASS / GENERIC_ENGLISH_KICKER_SUBTRACTION_PASS / WRITING_SURFACE_PASS / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-23
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Professional quality authority: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`

## Current selected authority

- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- Current page: `57:2 / CURRENT_SELECTED / ADD-16 / HOME TEXTILE MAT / 2026-08-22`
- Current front: `57:3 / CURRENT_SELECTED / ADD16 / FRONT / HOME TEXTILE MAT`
- Current back: `57:17 / CURRENT_SELECTED / ADD16 / BACK / HOME TEXTILE MAT WRITING`
- hidden realistic long-copy stress: `57:36 / 57:50`
- pre-font-repair front rollback: `66:2`
- pre-font-repair front-stress rollback: `66:18`
- pre-English-kicker-subtraction back rollback: `68:2`
- pre-English-kicker-subtraction back-stress rollback: `68:21`
- no-English-kicker comparison: `67:2` — hidden after adoption
- three-direction blank-frame study: `56:2`
- retained previous Current RETURN LETTER HOME: `54:2 / 54:3 / 54:15` — comparison/history only
- retained HOMEWARD JOURNEY: `45:2 / 45:32 / 45:42` — comparison/history only
- retained HOME HORIZON: `18:3 / 18:14` — comparison/history only
- retained legacy: `1:2 / 1:13` — comparison/history only
- exact Drive authority: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`
- Drive write for the latest pass: `0`

Canonical current evidence:
- `PROFESSIONAL-VNEXT-HOME-TEXTILE-MAT-FAMILY-DIVERSITY-QA-2026-08-22.md`
- `FIGMA-JAPANESE-KICKER-FONT-ASSIGNMENT-QA-2026-08-23.md`
- `FIGMA-BACK-GENERIC-ENGLISH-KICKER-SUBTRACTION-QA-2026-08-23.md`
- item Current entry point: `CURRENT.md`

## Current visual direction — HOME TEXTILE MAT

Emotional brief: `育ててもらった時間を、これからの暮らしへ持っていく。`

### Front `57:3`

- dark forest selvage as the tactile anchor;
- warm oat paper field;
- rust + saffron short weave bands;
- one thread-like vertical rule;
- Japanese-first `育ててくれた時間を、これからの力に。`;
- native Japanese kicker `両親へ` explicitly assigned `Noto Sans JP Bold`;
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
- former English microcopy `FOR THE WORDS WE WANT TO KEEP` is now hidden after a bounded test showed it had no reader-facing artifact/function/factual job and duplicated the Japanese message;
- no visible form/card container around the writing role.

## Three-scale screenshot QA

Current front/back have passed whole-item, reading and native actual-size review at `700×1036`.

The 2026-08-23 back cleanup was re-reviewed at native size after adoption. Removing the generic English kicker improved the first read from textile structure → Japanese emotional headline → writing prompt without weakening the textile/homecoming identity.

## Japanese kicker font-assignment repair — 2026-08-23

Fresh native-text readback found the front Japanese kicker `両親へ` assigned to `Inter Bold` and relying on fallback glyphs.

Bounded repair:
- Current kicker `57:10`: `Inter Bold → Noto Sans JP Bold`;
- stress kicker `57:43`: `Inter Bold → Noto Sans JP Bold`;
- characters, size, line-height, position, width, color and surrounding layout unchanged;
- complete pre-repair rollback roots: `66:2 / 66:18`.

Post-repair Current and long-copy screenshots: PASS.

## Generic English back-kicker subtraction — 2026-08-23

Fresh native-size review found `57:24 / TEXT / KICKER = FOR THE WORDS WE WANT TO KEEP` above the Japanese back display.

The phrase did not identify the artifact, destination, function, factual information, or an intentional bilingual reader-facing role. It read as internal art-direction microcopy and duplicated `ことばを、持って帰ろう。`.

Bounded comparison:
- `67:2 / QA / ADD-16 / BACK / NO GENERIC ENGLISH KICKER / 2026-08-23`;
- only `TEXT / KICKER` visibility changed.

Result: no-kicker comparison was stronger at native `700×1036`, so complete hidden rollbacks were created and the cleanup was promoted:
- rollback Current back `68:2`;
- rollback back stress `68:21`;
- Current kicker `57:24`: hidden;
- stress kicker `57:57`: hidden;
- comparison `67:2`: hidden after adoption.

Fresh Current and realistic long-copy screenshots: PASS. This applies the already promoted `GENERIC_ENGLISH_INTERNAL_CONCEPT_LABEL` rule; it is not a new project-wide rule.

## Real failures caught before / after selection

1. `THANK-YOU BROADSIDE` oversized date wrap/crop → rejected.
2. first HOME TEXTILE display mechanically orphaned Japanese phrase → corrected with semantic line breaking.
3. realistic front stress caused growing copy/signature collision → rebuilt as native auto-height stack with flexible spacer.
4. first stack mutation failed due unloaded fonts → corrected with explicit font loading before retry.
5. realistic back stress exposed guide/footer collision → lanes separated without shrinking type.
6. Japanese semantic front kicker relied on Latin-family fallback → repaired to explicit `Noto Sans JP Bold`.
7. generic English back kicker had no reader-facing job → removed after rollback-safe comparison.

## Structure / long-copy QA

Final selected + stress readback after the latest cleanup:

- selected front `57:3`: native visible text `5`; fixed-height `0`; outside `0`; collisions `0`; IMAGE fills `0`; kicker `Noto Sans JP Bold`.
- selected back `57:17`: native visible text `4`; fixed-height `0`; outside `0`; IMAGE fills `0`; generic English kicker hidden.
- stress front `57:36`: native visible text `5`; fixed-height `0`; outside `0`; collisions `0`; IMAGE fills `0`; kicker `Noto Sans JP Bold`.
- stress back `57:50`: native visible text `4`; fixed-height `0`; outside `0`; IMAGE fills `0`; generic English kicker hidden.

The back long-copy stress was temporarily revealed after the cleanup, visually reverified, then re-hidden. All final/variable copy remains native editable text.

## Hybrid / image decision

- variable/factual/emotional copy: native Figma text;
- weave/selvage/writing rules: simple native functional geometry;
- generated/composed raster: `0`;
- editable SVG: `0`;
- replaceable image role: `0`;
- image generation: `0`;
- Drive write: `0`.

The diagnosed quality gap was editorial language hierarchy, not missing photography/illustration. Generated parents/family are prohibited, and generic home/travel imagery would weaken specificity and writing function.

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

The latest cleanup removes unsupported English microcopy without changing the artifact concept, writing function or score.

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

`PROFESSIONAL_VNEXT_HOME_TEXTILE_MAT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / JAPANESE_KICKER_FONT_ASSIGNMENT_PASS / GENERIC_ENGLISH_KICKER_SUBTRACTION_PASS / WRITING_SURFACE_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.
