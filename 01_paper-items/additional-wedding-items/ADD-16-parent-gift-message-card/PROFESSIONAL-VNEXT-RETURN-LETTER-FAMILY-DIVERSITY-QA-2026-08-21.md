# ADD-16 両親贈呈品メッセージカード — Professional vNext Return Letter / Family Diversity QA

Date: 2026-08-21
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / LONG_COPY_VISUAL_PASS / HANDWRITING_FIELD_PRINT_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `ddd787819bf0ce1a85d481b3a87ca64027d0fe64`
Current: `docs/automation/non-rurubu-figma-quality-current.md`
Professional quality authority: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`

## Why this pass reopened ADD-16 again

A fresh suite-level thumbnail audit compared current non-Rurubu vNext items with materially different roles, including ADD-12 `55:3`, ADD-14 `52:3`, ADD-16 `45:32 / 45:42`, and ADD-17 `48:2`.

The individual items were structurally healthy, but a cross-item visual weakness became visible only at family scale: deep navy + warm cream + coral/mint/yellow and repeated large circles/capsule sweeps were recurring often enough that unrelated artifacts risked reading as one AI/system template rather than a family of separately art-directed print objects.

This did not invalidate prior structural QA. It reopened only the family-fit / item-specific art-direction ceiling for ADD-16.

## Clean-room inputs

No current ADD-16 frame was duplicated to author the new direction.

Only verified non-visual requirements were carried forward:

- physical working canvas `700×1036`;
- parent-gift message-card role;
- native editable recipient, message, date and couple-signature roles;
- optional physical handwriting role on the reverse;
- no generated parent/family/person imagery;
- long-copy and print-writing-surface constraints;
- unresolved final copy/package/vendor inputs remain deferred.

Existing HOMEWARD JOURNEY, HOME HORIZON and legacy compositions/assets remained intact and were not used as construction material.

Hybrid split:

- variable/factual copy: native Figma text;
- fixed paper/envelope fields: simple native fixed geometry because their structure is low-complexity and physically meaningful;
- handwriting lines: native functional rules;
- generated/composed raster: `0`;
- SVG: `0`;
- replaceable image roles: `0`.

## Three blank-frame art-direction studies

Figma file: `ylmVBbwNcnjueYrymNpa3c`
Study page: `51:2 / QA / ADD-16 / FAMILY DIVERSITY CLEANROOM / 2026-08-21`

Three materially different blank-frame directions were authored:

1. `51:3 / POSTCARD HOME` — cobalt / terracotta / papaya, strong block rhythm; clearer than the old family palette but slightly poster-like.
2. `51:15 / RETURN LETTER` — plum / apricot / sky / warm paper, envelope/letter physicality; strongest emotional fit and clearest departure from repeated suite motifs.
3. `51:27 / HORIZON LETTER` — ultramarine / guava / sand, bolder journey energy but more corporate/editorial than intimate.

`RETURN LETTER` was selected for full development.

## Mature clean-room candidate

Pre-promotion candidate:

- front `52:2 / VNEXT_DIVERSITY_CANDIDATE / ADD16 / FRONT / RETURN LETTER`
- back `52:14 / VNEXT_DIVERSITY_CANDIDATE / ADD16 / BACK / LETTER HOME`
- long-copy front/back `52:26 / 52:38`

Final promoted Current page:

- page `54:2 / CURRENT_SELECTED / ADD-16 / RETURN LETTER HOME / 2026-08-21`
- front `54:3 / CURRENT_SELECTED / ADD16 / FRONT / RETURN LETTER HOME`
- back `54:15 / CURRENT_SELECTED / ADD16 / BACK / LETTER HOME`
- hidden long-copy `54:31 / 54:43`

The direction uses a plum letter/envelope field, apricot fold/footer, warm letter paper, a narrow sky-blue paper edge and Japanese-first message typography. It avoids the repeated sunrise-circle + capsule-sweep vocabulary seen elsewhere in the current suite while retaining travel/homecoming meaning through a physical letter-home artifact rather than airport cosplay.

## Screenshot-driven corrections

### 1. Floating color block looked UI-like

The first mature front used a standalone sky-blue square. Actual-size QA showed it reading as arbitrary interface decoration. It was replaced with a narrow right-edge paper accent, which now has a clearer physical binding role and removes the card/widget impression.

### 2. Long copy entered fixed decoration

The first realistic long-copy front passed root containment but the extended message entered the sky-blue fixed field. The body measure was reduced from 480px to 430px, keeping a stable native text lane without shrinking type.

### 3. Back optional copy collided with handwriting guidance

The first stress back showed the long optional family line colliding with the handwriting hint. The hint and four functional writing rules were moved down, and the semantic writing role was resized/repositioned. The corrected stress screenshot is visually clear.

These are screenshot-visible failures; they were not inferred only from bounding-box counts.

## Three-scale visual QA

Front:

- ~500px whole-item: PASS;
- ~700px reading/stress: PASS after decoration-lane correction;
- native `700×1036`: PASS.

Back:

- ~500px whole-item: PASS;
- ~700px realistic stress: PASS after writing-lane separation;
- native `700×1036`: PASS.

The final front/back feel like one physical letter object, but no longer repeat the same navy/coral/mint/yellow circle/capsule system used by several other vNext items.

## Structure QA

Final pre-promotion candidate + realistic stress readback:

- front: native text `7`, fixed-height text `0`, outside visible text `0`, text collisions `0`, IMAGE fills `0`;
- back: native text `7`, fixed-height text `0`, outside `0`, collisions `0`, IMAGE `0`;
- stress front: native text `7`, fixed-height `0`, outside `0`, collisions `0`, IMAGE `0`;
- stress back: native text `7`, fixed-height `0`, outside `0`, collisions `0`, IMAGE `0`.

Stress frames were returned hidden after QA.

## Mature comparison with previous selected

Only after the new direction passed whole/read/detail, realistic stress and structure QA was the previous selected HOMEWARD JOURNEY re-opened for final comparison.

The previous design remains structurally strong, but at family scale its deep-ocean field, yellow/coral circles and mint/yellow capsule sweeps repeat visual vocabulary already used by multiple unrelated vNext items. The new RETURN LETTER direction is more item-specific, more tactile, warmer for parents and easier to distinguish as its own keepsake while remaining part of the broader travel story.

Professional Design Council score: `92/100 / PASS / NO VETO`.

Score rationale:

- concept clarity / ownability `14/15`;
- emotional excitement `14/15`;
- Japanese typography `14/15`;
- composition / rhythm `14/15`;
- travel integration without cliché `8/10`;
- item functionality `9/10`;
- physical print credibility `9/10`;
- editability `5/5`;
- family fit without template sameness `5/5`.

## Drive / generated-asset decision

Exact Drive authority live-confirmed:

- `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`

Drive writes: `0`.

Image generation: `0`. The visible defect was suite-level motif/palette repetition and physical-letter art direction, not missing photography/illustration. Generating people, family scenes or generic tropical stock would have reduced truth and specificity.

## Deferred finalization

Still unresolved and not fabricated:

- one card per family vs one shared card;
- actual gift/package/attachment method;
- whether names appear on front;
- final body copy / signatures / forms of address;
- paper stock, vendor template/profile, bleed/export settings;
- physical attachment and 100% print proof.

Current result:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROFESSIONAL_VNEXT_RETURN_LETTER_SELECTED / FAMILY_DIVERSITY_PASS / LONG_COPY_VISUAL_PASS / HANDWRITING_FIELD_PRINT_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`.
