# ADD-11 写真共有 / QR案内サイン — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V2_SELECTED / A5_JAPANESE_FIRST_HEADLINE_PASS / QR_FIELD_SIMPLIFICATION_PASS / QR_ORBIT_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-19
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

The reopened clean-room program supersedes the retained legacy family for current editing.

- Figma file key: `PWQ5ygJJt0IlOqj5ri5jng`
- clean-room page: `18:18 / CLEANROOM / ADD-11 / V2 MEMORY ORBIT / 2026-08-16`
- selected A5: `18:19 / FRAME_ADD11_A5_CLEANROOM_V2` — `875×1240`
- selected A4: `19:34 / FRAME_ADD11_A4_CLEANROOM_V2` — `1240×1754`
- hidden A5/A4 long-copy stress: `19:4 / 19:56`
- retained legacy: `1:31 / 1:45 / 3:2` — comparison/history only
- Drive folder: `ADD-11_写真共有_QR案内サイン`
- Drive folder ID: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`
- Drive parent: `1iJGIzmNSlzwqrcv7P6UsNbstwBki1523`

Current evidence:

- `CLEANROOM-V2-MEMORY-ORBIT-QA-2026-08-16.md`
- `FIGMA-CLEANROOM-V2-AUTHORITY-RECONCILIATION-2026-08-18.md`
- `FIGMA-CLEANROOM-V2-GUEST-COPY-CLEANUP-2026-08-17.md`
- `CLEANROOM-V2-QR-FIELD-SIMPLIFICATION-2026-08-18.md`
- `CLEANROOM-V2-QR-ORBIT-SUBTRACTION-2026-08-19.md`

## Current art direction

The selected family is a quiet Japanese-first photo-sharing sign rather than an enlarged scanner widget.

- Japanese category/headline leads the page;
- unresolved QR remains a non-scannable semantic placeholder until an authoritative URL exists;
- A5 and A4 are independent reflows, not proportional scaling;
- privacy/access/hashtag/expiry roles remain native editable semantic placeholders;
- hard QR outer-border treatment, redundant travel route, camera icon, and residual decorative QR orbit are not part of the current selected family;
- exact QR role and quiet-zone geometry remain preserved;
- no generated person imagery, rounded card stacks, shadows, gradients, fake controls, or fake QR destination.

## Japanese-first headline refinement

Selected A5 previously used oversized `SHARE YOUR JOURNEY`. It was replaced by `旅の記憶を、ひとつに。`, and the decorative `MEMORY DESK / 2026.10.24` footer was removed. The QR role, 3-step flow, privacy and variable placeholders remained unchanged.

Result: `A5_JAPANESE_FIRST_HEADLINE_PASS`.

## QR-field simplification

Earlier bounded tests removed the visible hard frame from `QR_PHOTO_SHARE` and hid the redundant travel-route layer while preserving exact QR/quiet-zone geometry. Guest-facing hashtag/category labels were also localized where they had no functional English role.

Result: `QR_FIELD_SIMPLIFICATION_PASS`.

## QR-orbit subtraction — 2026-08-19

Fresh whole/native review found one remaining decorative orbit around the already-clear QR role:

- A5: `DECOR_MEMORY_ORBIT_INNER`;
- A4: `DECOR_QR_ORBIT`.

Because the exact QR role and dashed quiet-zone reserve already communicated the unresolved scan role, the orbit read as a scanner/widget target rather than a physical print requirement.

Rollback-safe comparisons:

- A5: `31:2`;
- A4: `31:32`.

Only the orbit visibility was changed. QR geometry, quiet zone, Japanese hierarchy, steps, privacy/hashtag/expiry roles, colors and spacing remained unchanged.

Pre-change hidden rollbacks:

- A5 selected/stress: `32:2 / 32:32`;
- A4 selected/stress: `32:62 / 32:84`.

Adopted visibility changes:

- selected A5 `18:25`: hidden;
- stress A5 `19:10`: hidden;
- selected A4 `19:40`: hidden;
- stress A4 `19:62`: hidden.

The no-orbit version is stronger at whole/native scale: QR discoverability remains immediate without the scan-control graphic.

Result: `QR_ORBIT_SUBTRACTION_PASS`.

## Structural QA

### A5 `18:19`

- `875×1240`;
- visible native text: `13`;
- QR role: `290×290`;
- quiet-zone reserve: `230×230`;
- hard QR outer frame: `0`;
- decorative orbit: `0`;
- outside visible text: `0`;
- IMAGE fills: `0`.

### A4 `19:34`

- `1240×1754`;
- visible native text: `13`;
- QR role: `420×420`;
- quiet-zone reserve: `332×332`;
- hard QR outer frame: `0`;
- decorative orbit: `0`;
- outside visible text: `0`;
- IMAGE fills: `0`.

Hidden long-copy stress `19:4 / 19:56` matches selected treatment. A4 stress was temporarily revealed after orbit subtraction and passed native-size review with long guidance, long step instructions, privacy copy, hashtag and expiry values; it was returned to hidden QA state.

All variable/factual copy remains native editable. No raster/flatten replacement was introduced.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The defect was residual interface-like decoration, not missing imagery. Exact Drive folder `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb` was live-read before the latest Figma write. Drive writes: `0`.

## BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION

Still requires authoritative:

- sharing service / URL and account ownership;
- public/private access scope, permission model, retention/expiration, consent/privacy wording;
- hashtag decision;
- final A5/A4 installation selection and whether A6 is needed;
- real QR generated from approved URL;
- iPhone/Android and physical low-light/oblique scan proof;
- printer template/profile, bleed/safe-area, stand/frame interference, export and Drive delivery.

No URL, QR destination, permission rule, hashtag or expiry fact may be fabricated.

## Current result

- clean-room selected visual: `V2`
- reopened sellable visual QA: `PASS`
- Japanese-first headline: `PASS`
- QR hard-frame simplification: `PASS`
- residual QR orbit subtraction: `PASS`
- whole / reading / actual-size visual QA: `PASS_WITH_PLACEHOLDERS`
- long-copy structural QA: `PASS`
- native editability: `PASS`
- legacy preservation: `PASS`
- physical/device scan proof: `NOT_RUN`
- print-ready: `NO`
- completion state: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`
