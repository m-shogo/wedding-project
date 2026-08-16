# ADD-13 Message Card — Clean-room V4 Diagonal Field QA

Status: `CLEANROOM_V4_STRUCTURAL_PASS / LONG_COPY_STRESS_PASS / LEGACY_COMPARISON_LOSS / NO_PROMOTION / LEGACY_PRESERVED`
Date: 2026-08-17
Start authority SHA: `b28f5164715b99b6a4ee1e8986e341256a0ec696`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- Drive folder: `ADD-13_Message_Card` / `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`
- retained production: front `1:3`, back `1:13`
- clean-room page: `19:2 / CLEANROOM / ADD-13 / V4 DIAGONAL FIELD / 2026-08-17`
- V4 front: `19:3`
- V4 back: `19:17`
- stress front: `19:32`
- stress back: `19:46`

## Clean-room contract

V4 was created from a new blank page before opening or visually inspecting retained production or V3. No previous frame, old layout group, ornamental vector, rule, icon, asset, crop, image, or generated visual was duplicated or used as a visual reference.

Only non-visual requirements were carried forward: 700×990 working canvas; front/back message-card roles; editable title, prompt, name, and date roles; a large handwriting surface; native editable text; and explicit LAYOUT DUMMY treatment for unresolved copy.

## V4 direction

The V4 direction was intentionally different from the prior marginal-letter experiment:

- one broad diagonal fixed-art gesture rather than a narrow margin axis;
- warm paper field with a small offset orbit;
- large open handwriting area with only corner/edge markers;
- native title/prompt/name/date separated from fixed decorative art;
- no image fills, rounded cards, shadows, gradients, travel icons, ticket UI, or rasterized variable copy.

The first visual read showed that the initial diagonal gesture consumed too much of the writable surface and caused a weak title/prompt relationship. Before any legacy comparison, the diagonal band was narrowed and pushed to the outer edge, semantic dummy labels were simplified, the orbit was reduced, and the writing surface was restored as the dominant functional area.

## Structural QA

Post-repair clean candidates:

- front `19:3`: 700×990, 5 native text nodes, IMAGE fills 0, visible text outside root 0; handwriting field 515×360;
- back `19:17`: 700×990, 6 native text nodes, IMAGE fills 0, visible text outside root 0; handwriting field 500×360.

Long-copy stress:

- front `19:32`: 700×990, 5 native text nodes, IMAGE fills 0, visible text outside root 0; prompt 470×185; handwriting field 515×360;
- back `19:46`: 700×990, 6 native text nodes, IMAGE fills 0, visible text outside root 0; prompt 470×160; handwriting field 500×360.

The stress copies preserve a writable region while keeping name/date roles inside the root. Structure and long-copy behavior pass.

## Three-scale visual QA and legacy comparison

The V4 front/back were visually reviewed at whole-item and native 700×990 scale before any retained production was opened. Only after V4 repair and structural QA were complete were retained production `1:3` / `1:13` opened for comparison.

V4 is materially different from retained production and the previous V3. It provides a clear writing surface and stronger graphic asymmetry, but it does **not** beat retained production overall. The retained production has stronger Japanese headline art direction, better resolved editorial copy hierarchy, and a more convincing correspondence-product finish. V4's diagonal gesture is visually distinctive but adds less product value than the retained typography system.

Decision: `LEGACY_COMPARISON_LOSS`. Do not promote V4. Do not mutate retained production. Preserve V4 as rejected comparison evidence.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`. The observed gap is typography/editorial composition, not missing photography or illustration. Drive authority was read back successfully; Drive writes: 0.

## Next safe action

Do not create another ADD-13 direction after this comparison in the same run. A future fresh clean-room run may create a new blank-frame direction without opening production/V3/V4 first. Do not iterate the diagonal gesture cosmetically; switch grammar if another ADD-13 attempt is warranted.