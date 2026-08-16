# ADD-13 Message Card — Clean-room V3 Marginal Letter QA

Status: `CLEANROOM_V3_STRUCTURAL_PASS / LONG_COPY_STRESS_PASS / LEGACY_COMPARISON_MIXED / NO_PROMOTION / LEGACY_PRESERVED`
Date: 2026-08-16
Start authority SHA: `3c13e85587db2ce2265c9aa2ab096deb1193006b`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- Drive folder: `ADD-13_Message_Card` / `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`
- retained production: front `1:3`, back `1:13`
- clean-room page: `16:2 / CLEANROOM / ADD-13 / V3 MARGINAL LETTER / 2026-08-16`
- V3 front: `16:3`
- V3 back: `16:4`
- stress front: `16:27`
- stress back: `16:38`

## Clean-room contract

V3 was created on a new blank page before opening or visually inspecting the retained production. No old frame, layout group, rule, edge treatment, crop, generated asset, vector, badge, icon, or prior V2/V3 node was duplicated or imported.

Only non-visual requirements were carried forward: 700×990 working canvas, front/back message-card roles, editable title/prompt/name/date roles, large handwriting area, native editable text, and unresolved-copy placeholder requirements.

## Direction

The new direction is a `marginal letter` grammar rather than the retained letterpress/correspondence layout:

- asymmetric rust-red vertical margin axis;
- large Japanese-first headline with no top navy band;
- open handwriting field marked only by minimal start/end corner strokes;
- name/date grouped low as native text;
- back uses the opposite-side vertical axis and one open writing surface rather than repeated horizontal writing rules;
- no image fills, rounded cards, shadows, gradients, travel icons, fake ticket UI, or generated decoration.

Unconfirmed title/prompt copy is visibly marked as `LAYOUT DUMMY`; the content-candidate wording remains native editable text.

## QA and repair

Initial screenshot QA found the front/back info auto-layout frames retained a 10 px explicit height and clipped their child text. These were repaired to explicit safe heights with `clipsContent=false` before further visual judgment.

Long-copy stress then exposed prompt-to-writing-area collisions on both faces. The prompt type was normalized to 20 px / 32 px line height and the handwriting regions were moved down / resized before re-checking.

Post-repair stress:

- front `16:27`: 700×990, 5 native text nodes, IMAGE fills 0, visible text outside root 0;
- back `16:38`: 700×990, 5 native text nodes, IMAGE fills 0, visible text outside root 0;
- clean front handwriting role: `16:9`, 520×360;
- clean back handwriting role: `16:19`, 520×440;
- stress front handwriting role: `16:32`, 520×360;
- stress back handwriting role: `16:43`, 520×440.

Whole-item / reading / native 700×990 screenshot QA was completed for the clean candidate and stress copies.

## Legacy comparison

Only after the clean candidate and stress repair were complete were retained production `1:3` / `1:13` opened for comparison.

V3 is materially different and improves the sense of a single open handwriting surface, removes form-like repeated writing rules, and makes the writable field more visually immediate. The retained production still has stronger editorial density and a more resolved correspondence-product finish in parts of the front/back pair.

Decision: `LEGACY_COMPARISON_MIXED`. Do not promote V3 and do not mutate retained production. Preserve both.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`. The item is handwriting-led and the observed gap is typography / paper composition, not missing imagery. Drive writes: 0.

## Next safe action

Do not create another ADD-13 direction in this same run after legacy comparison, because that would contaminate a fresh clean-room iteration. A future fresh run may create a materially different blank-frame direction without opening production/V3 first, then compare only after structure and long-copy QA.
