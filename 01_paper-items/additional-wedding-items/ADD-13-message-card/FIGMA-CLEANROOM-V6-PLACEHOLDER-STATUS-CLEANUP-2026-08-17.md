# ADD-13 メッセージカード — Clean-room V6 Placeholder Status Cleanup

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V6_SELECTED_CANDIDATE / PLACEHOLDER_STATUS_COLLISION_REMOVED / LONG_COPY_STRESS_REVALIDATED / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `7085ae94917facaa65a8cd2bbaf34ed90b43d3c9`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- Drive folder: `ADD-13_Message_Card` / `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`
- retained legacy production: front `1:3`, back `1:13`
- selected clean-room page: `27:2 / CLEANROOM / ADD-13 / V6 POSTAL FIELD / 2026-08-17`
- selected front/back: `27:3 / 27:4`
- hidden long-copy stress: `27:35 / 27:51`

## Visible defect found

Fresh live screenshots of the selected V6 exposed a small but real hierarchy defect that the earlier root-overflow QA did not catch: a redundant `LAYOUT DUMMY` status micro-label sat directly under the large Japanese title on both faces and visually collided with the semantic placeholder/title region.

The actual semantic fields already contain explicit `LAYOUT DUMMY` wording, so the extra status label had no guest-facing or authoring value. It read as internal production metadata leaking into the design.

## Rollback-safe repair

Before changing the selected V6, hidden rollback copies were created:

- rollback section: `31:2 / ROLLBACK / ADD-13 V6 PRE PLACEHOLDER STATUS CLEANUP / 2026-08-17`
- rollback front: `31:3`
- rollback back: `31:21`

Selected V6 mutations:

- `28:2 / META / TITLE STATUS` on front → `visible=false`
- `28:3 / META / TITLE STATUS` on back → `visible=false`
- `27:21 / TXT_OPTIONAL_THEME` on back → `textAutoResize=HEIGHT`

No headline wording, prompt wording, writing geometry, safe area, edge accent, date/name placeholder, paper field, or legacy production node was changed.

## Post-repair visual QA

Fresh screenshots after repair:

- front `27:3`: the Japanese title now reads cleanly into the semantic optional-theme placeholder without an extra internal status label occupying the same optical band;
- back `27:4`: the title area is clean and the optional-theme text has native auto-height behavior;
- no new box, badge, English filler, image, or decorative element was introduced.

This is a subtraction/structure repair, not a new art direction.

## Structure / stress revalidation

Live readback after repair:

- front `27:3`: `1400×993`, text count `7`, IMAGE fills `0`, visible text outside root `0`, `META / TITLE STATUS` hidden;
- back `27:4`: `1400×993`, text count `7`, IMAGE fills `0`, visible text outside root `0`, `META / TITLE STATUS` hidden;
- hidden front stress `27:35`: IMAGE fills `0`, visible text outside root `0`;
- hidden back stress `27:51`: IMAGE fills `0`, visible text outside root `0`.

The earlier >55% handwriting-area contract and long-copy repairs remain unchanged. The selected candidate remains native text/vector only.

## Drive / generated asset decision

- new Drive asset: `0`
- image generation: not required
- reason: the defect was leaked status microcopy / local text structure, not missing visual media.

## Current gate

The V6 selected candidate remains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V6_SELECTED_CANDIDATE / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Final title/prompt copy, signer/date policy, paper stock, real pen test, printer template/profile, and physical proof remain deferred. Do not invent final wording.
