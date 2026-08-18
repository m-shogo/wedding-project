# ADD-10 会場案内サイン — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V4_SELECTED / SEMANTIC_COPY_HARDENING_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-18
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

The reopened visual program supersedes the older legacy-node listing below for **which family is current**. The retained `2:*` production family remains preserved as rollback/comparison history and must not be treated as the selected clean-room design.

- Figma file: `ADD-10_会場案内サイン`
- Figma file key: `mMfoBkoZ7eVbuerSRHePLV`
- selected clean-room V4 left/right/forward: `32:3 / 32:15 / 32:27`
- selected-family long-copy stress: `33:3 / 33:15 / 33:27`
- retained legacy family: `2:2 / 2:13 / 2:24 / 2:35 / 2:46 / 2:57`
- Drive folder: `ADD-10_会場案内サイン`
- Drive folder ID: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`
- Drive parent: `0ADXt8irGMFGnUk9PVA`
- clean-room V4 design evidence: `CLEANROOM-V4-STUDY-2026-08-15.md`
- latest semantic-copy / structure evidence: `FIGMA-CLEANROOM-V4-SEMANTIC-COPY-HARDENING-2026-08-18.md`

## Clean-room V4 result

V4 was built from blank frames under the current clean-room mandate and does not use the retained legacy split-field composition as an authoring base.

Current art direction:

- oversized Japanese destination is the primary first-glance cue;
- English destination is support only;
- one editable direction axis performs the functional wayfinding job;
- warm paper field and restrained mint/rust accents avoid dashboard/card UI;
- left/right/forward are optically balanced rather than blindly mirrored;
- variable destination / floor / room / direction content stays native editable text;
- no raster imagery, fake transport metadata, gradients, shadows, decorative planes or equal card stacks are required.

Fresh 2026-08-18 screenshot review of selected left `32:3` passed at whole/thumbnail and actual-size scales. The visible hierarchy is `会場案内 → 受付 → RECEPTION → [階数・部屋名] → direction axis`. No internal export instructions or `LAYOUT DUMMY` suffixes remain on the selected family.

## Semantic-copy hardening — 2026-08-18

Live readback found three defects in the selected V4 family:

- guest-facing `[階数・部屋名 · LAYOUT DUMMY]`;
- a visible internal authority/export note;
- category/context native text in fragile ~10px fixed-height boxes.

Before mutation, six hidden rollback clones were saved: `38:2 / 38:15 / 38:28 / 38:40 / 38:53 / 38:66`.

The selected family and its stress evidence were repaired without changing the direction-axis vector, destination hierarchy, spacing grammar, palette or retained legacy:

- floor/room selected copy → `[階数・部屋名]`;
- stress floor/room copy remains semantic stress text without implementation suffixes;
- internal authority/export note hidden;
- category/context converted to native auto-height text.

Post-write selected `32:3 / 32:15 / 32:27`:

- guest-facing proof language: `0`;
- fixed ~10px text roles: `0`;
- outside visible text: `0`;
- text-to-text collision: `0`;
- IMAGE fills added: `0`.

Post-write stress `33:3 / 33:15 / 33:27`:

- proof language: `0`;
- fixed ~10px text roles: `0`;
- outside visible text: `0`;
- text-to-text collision: `0`.

Stress frames remain hidden QA evidence after review.

## Long-copy / editability gate

Long destination / room-name stress remains required because the destination stack and the functional direction vector share physical page space. The selected V4 stress family passed after the direction graphic was structured to follow variable copy instead of relying on a brittle absolute-position relationship.

Current structural gate:

- selected left/right/forward: outside visible text `0`;
- long-copy left/right/forward: outside visible text `0`;
- native variable copy remains editable;
- direction axis remains an editable vector role;
- no unintended flatten/raster replacement introduced;
- retained legacy and rollback evidence remain intact.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED` for the current V4 direction. Wayfinding quality depends on destination hierarchy, direction recognition and physical sign readability; generated imagery would compete with the sign's functional job.

Live Drive readback on 2026-08-18:

- folder ID: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`;
- parent: `0ADXt8irGMFGnUk9PVA`;
- Drive writes in this reconciliation: `0`.

## Information accuracy gate — BLOCKED_REQUIRED_INPUT

The design is visually complete with placeholders, but the following may not be fabricated:

- official destination names and venue terminology;
- exact left/right/forward direction at each installation point;
- floor / room labels;
- sign count and installation locations.

## DEFERRED_FINALIZATION

- final venue route facts / installation points;
- final room/floor wording;
- stand/frame/wall-mount interference check;
- matte/low-glare check under venue lighting;
- route walk-through by a first-time visitor;
- printer template/profile, bleed/trim confirmation;
- 100% physical print proof;
- final PDF export and Drive storage.

## Current result

- Clean-room selected visual: `V4`
- Reopened sellable visual QA: `PASS`
- Long-copy structural QA: `PASS`
- Native editability: `PASS`
- Semantic guest-copy hardening: `PASS`
- Legacy preservation: `PASS`
- Physical proof: `NOT_RUN`
- Print-ready: `NO`
- Completion state: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`
