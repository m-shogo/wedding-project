# ADD-13 メッセージカード — Clean-room V6 Postal Field QA

Status: `CLEANROOM_V6_SELECTED_CANDIDATE / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `a4596072b55066c2d1ab84aa120f70d65778b090`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- Drive folder: `ADD-13_Message_Card` / `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`
- retained legacy production: front `1:3`, back `1:13`
- clean-room page: `27:2 / CLEANROOM / ADD-13 / V6 POSTAL FIELD / 2026-08-17`
- V6 front: `27:3`
- V6 back: `27:4`
- hidden stress front: `27:35`
- hidden stress back: `27:51`

## Clean-room contract

V6 was built from a new blank page without duplicating a legacy frame, old layout group, decorative vector, line, badge, crop, image, generated asset, or prior V3/V4/V5 candidate. The authoring input was limited to current non-visual requirements from `SPEC.md`: primary A6 landscape role, front/back message-card semantics, editable title/prompt/name/date roles, 3 mm bleed / 8 mm safe-area intent, and handwriting area >=55% of the finished face.

No legacy screenshot/node was opened for visual comparison until the V6 production-size candidate and long-copy stress were complete.

## V6 direction

`POSTAL FIELD` intentionally uses the primary A6-landscape physical direction instead of continuing portrait correspondence-card grammar.

- front: narrow editorial copy column + dominant open writing field;
- back: compact theme/prompt header + broad writing field;
- no rounded UI cards, shadows, gradients, travel icons, fake stamps, fake transport data, or rasterized copy;
- no image fills;
- fixed visual language is limited to one slim red edge and restrained native writing guides;
- unresolved title/theme text has explicit native `LAYOUT DUMMY` status;
- all variable/factual copy remains native editable Figma text.

Whole-item QA initially found the visible writing-area rectangle and English microcopy (`MESSAGE CARD` / `POSTCARD FOR TWO`) made the card feel more like a form/template. Before legacy comparison, the outline strokes were removed while the measured semantic writing-area frames were retained, and the unnecessary English product-label microcopy was hidden.

## Structural QA

### Front `27:3`

- size: `1400×993` (A6-landscape working ratio)
- native visible text: `6`
- IMAGE fills: `0`
- visible text outside root: `0`
- writing-area semantic frame: `900×870`
- writing-area ratio: `56.32%`

### Back `27:4`

- size: `1400×993`
- native visible text: `6`
- IMAGE fills: `0`
- visible text outside root: `0`
- writing-area semantic frame: `1240×650`
- writing-area ratio: `57.98%`

Both faces exceed the SPEC minimum handwriting-area requirement of 55%.

## Long-copy stress and repairs

Stress used materially longer Japanese title/prompt/name strings rather than only checking root overflow.

The first front stress exposed a real collision between the long title and long prompt. Root-outside count alone was insufficient. The front kicker/title/prompt roles were therefore moved into native vertical auto-layout `27:67 / TEXT / HEADER STACK` on the stress clone and equivalent `27:66` on V6 front. The first auto-layout repair then exposed a second Figma issue: child text had remained 10px-high after resize. Text nodes were repaired to `textAutoResize=HEIGHT` and the stack was set to unclipped hug-height behavior.

The first back stress similarly exposed prompt clipping inside its auto-layout frame. Both current and stress prompt stacks were repaired to unclipped native hug-height text.

Final stress readback:

- front `27:35`: outside visible text `0`, IMAGE fills `0`, writing ratio `56.32%`;
- back `27:51`: outside visible text `0`, IMAGE fills `0`, writing ratio `57.98%`;
- visual screenshots after repair show no title/prompt collision or prompt clipping;
- both stress clones are retained hidden after QA.

Failure learned: `ROOT_OUTSIDE_ZERO_IS_NOT_INTERNAL_COLLISION_PROOF`. Dynamic print copy needs screenshot/intersection review in addition to root overflow counts.

## Three-scale visual QA

- whole / thumbnail: PASS after removing writing-box outline and English product labels;
- reading scale: PASS; Japanese hierarchy and handwriting intent are immediate;
- actual-size `1400×993`: PASS; writing guides remain restrained and usable;
- long-copy visual stress: PASS after the two native auto-layout repairs above.

## Legacy comparison — only after V6 completion

Legacy production was then opened for the first comparison in this run:

- front `1:3`: `700×990` portrait correspondence direction;
- back `1:13`: `700×990` portrait open-reply direction.

Legacy remains visually refined, especially in headline tension and restrained correspondence character. V6 is materially different rather than a restyle: it uses the SPEC primary A6-landscape physical direction and guarantees >55% handwriting surface on both faces while retaining native-copy stress resilience.

At whole/reading/actual-size review, V6 is selected as the clean-room candidate because the writing action is more immediate, the primary physical format aligns with current SPEC, and the layout survives realistic variable copy without reducing the handwriting surface. This selection does **not** mutate or delete retained legacy production.

## Hybrid authoring / asset decision

- native text: all semantic/variable copy;
- native vector: writing guides + minimal edge accent;
- editable SVG: not required;
- generated/composed raster: not required;
- replaceable image role: not required;
- Drive writes: `0`.

The observed defects were typography/format/handwriting-geometry issues, not missing hero imagery. Image generation would add visual mass without solving the item role.

## Deferred finalization

Still unresolved and therefore `NOT_PRINT_READY`:

- final title / prompt choice;
- final signer/name/date policy;
- actual handwriting test with intended pen;
- paper stock and printer template/profile;
- exact bleed/export/vendor proof.

Do not replace semantic placeholders with invented final copy.
