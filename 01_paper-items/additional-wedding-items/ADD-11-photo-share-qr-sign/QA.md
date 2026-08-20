# ADD-11 写真共有 / QR案内サイン — QA

Status: `CURRENT / CLEANROOM_V2_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A5_JAPANESE_FIRST_HEADLINE_PASS / QR_FIELD_SIMPLIFICATION_PASS / QR_ORBIT_SUBTRACTION_PASS / QR_QUIET_ZONE_VISIBILITY_PASS / A4_TOP_RULE_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-20
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

- Figma file key: `PWQ5ygJJt0IlOqj5ri5jng`
- clean-room page: `18:18 / CLEANROOM / ADD-11 / V2 MEMORY ORBIT / 2026-08-16`
- selected A5: `18:19 / FRAME_ADD11_A5_CLEANROOM_V2` — `875×1240`
- selected A4: `19:34 / FRAME_ADD11_A4_CLEANROOM_V2` — `1240×1754`
- hidden A5/A4 long-copy stress: `19:4 / 19:56`
- retained legacy: `1:31 / 1:45 / 3:2` — rollback/history only
- exact Drive authority: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb / ADD-11_写真共有_QR案内サイン`

Drive metadata was live-read during this progression run. Drive write: `0`.

## Current art direction

The selected family is a quiet Japanese-first photo-sharing sign rather than a scanner-widget poster.

- Japanese category/headline leads the page;
- unresolved QR remains a non-scannable native semantic placeholder until an authoritative URL exists;
- A5 and A4 are independent reflows, not proportional scaling;
- privacy/access/hashtag/expiry roles remain native editable semantic placeholders;
- hard QR outer frame, redundant route, camera icon, decorative QR orbit and visible quiet-zone construction border are absent from the guest-facing paper;
- exact QR and quiet-zone geometry remains preserved invisibly for real-QR replacement and scan QA;
- no generated person imagery, card stacks, shadows, gradients, fake controls or fake QR destination.

## Current adopted refinements

### Japanese-first A5 headline

The oversized generic `SHARE YOUR JOURNEY` direction was replaced by native Japanese `旅の記憶を、ひとつに。`; decorative footer language was removed. QR, 3-step flow, privacy and variable placeholder roles remained intact.

Result: `A5_JAPANESE_FIRST_HEADLINE_PASS`.

### QR field simplification

Bounded tests removed the hard visible QR frame and redundant travel route while preserving exact QR/quiet-zone geometry. Guest-facing generic labels were localized where English had no unique functional role.

Result: `QR_FIELD_SIMPLIFICATION_PASS`.

### QR orbit subtraction — 2026-08-19

The remaining decorative QR orbit read as target/scanner UI after the QR role itself was already clear.

Adopted:

- selected A5 `18:25`: hidden;
- stress A5 `19:10`: hidden;
- selected A4 `19:40`: hidden;
- stress A4 `19:62`: hidden;
- rollback roots preserved and hidden.

Result: `QR_ORBIT_SUBTRACTION_PASS`.

### Quiet-zone construction-border subtraction — 2026-08-19

The quiet-zone geometry is required; its visible dashed proof border is not. Only the visible stroke was removed.

Preserved geometry:

- A5 quiet zone `230×230` inside QR role `290×290`;
- A4 quiet zone `332×332` inside QR role `420×420`.

Current selected/stress quiet-zone stroke count: `0`.

Result: `QR_QUIET_ZONE_VISIBILITY_PASS`.

### A4 top-rule subtraction — adopted 2026-08-20

Fresh A4 whole-item review found a thin full-width mint `DECOR_TOP_RULE` directly under the small `写真共有` category label. The Japanese category, large native headline and spacing already grouped the header, so the line no longer performed trim, binding or navigation work and behaved as a residual template separator.

Rollback-safe comparison:

- page `40:2 / QA / ADD-11 A4 / TOP RULE SUBTRACTION / 2026-08-20`;
- candidate `40:3 / QA_ADD11_A4_NO_TOP_RULE_2026_08_20`;
- only `DECOR_TOP_RULE` visibility changed.

Adopted:

- selected A4 `19:35 / DECOR_TOP_RULE`: hidden;
- A4 stress `19:57 / DECOR_TOP_RULE`: hidden;
- pre-change rollbacks `41:2 / 41:24`: hidden;
- comparison hidden after adoption;
- A5 intentionally unchanged.

The open-header A4 was stronger and remained synchronized with long-copy evidence.

Evidence: `FIGMA-A4-TOP-RULE-SUBTRACTION-QA-2026-08-20.md`.

## Fresh live visual audit — 2026-08-20

Fresh screenshots in this progression run:

- selected A5 ~500px: PASS;
- selected A4 ~500px: PASS.

A5 retains a distinct lower mint privacy/hashtag field, while A4 uses a more open reflow with the QR role centered between headline and three-step guidance. The QR placeholder remains intentionally prominent because it is the artifact's actual future interaction point; the page does not add scanner rings, fake UI or decorative imagery to fill space.

The current negative space is functional reserve for a real QR and short operational copy rather than empty premium styling. No fresh defect justifies a new clean-room version in this run.

## Structural QA

### A5 `18:19`

- `875×1240`;
- visible native text `13`;
- QR role `290×290`;
- quiet-zone reserve `230×230`, stroke count `0`;
- hard QR outer frame `0`;
- decorative orbit `0`;
- outside visible text `0`;
- IMAGE fills `0`.

### A4 `19:34`

- `1240×1754`;
- visible native text `13`;
- QR role `420×420`;
- quiet-zone reserve `332×332`, stroke count `0`;
- hard QR outer frame `0`;
- decorative orbit `0`;
- top rule visible `false`;
- outside visible text `0`;
- IMAGE fills `0`.

A4 top-rule adoption evidence further confirms selected/stress IMAGE fills `0`, text outside root `0`, and synchronized long-copy treatment. All variable/factual copy remains native editable; no full-page raster/flatten replacement was introduced.

## Hybrid / image decision

- variable access/privacy/hashtag/expiry/guidance: native editable text;
- future QR: replaceable semantic QR role with invisible preserved quiet-zone geometry;
- fixed minor geometry: native vector/shape;
- generated/composed raster: `0`;
- person imagery: `0`;
- Drive writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the artifact needs trustworthy QR hierarchy and scan geometry, not decorative photography or scanner-like generated visuals.

## BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION

Still requires authoritative:

- sharing service / URL and account ownership;
- public/private access scope, permissions, retention/expiration and consent/privacy wording;
- hashtag decision;
- final A5/A4 installation selection and whether A6 is needed;
- real QR generated from the approved URL;
- iPhone/Android and physical low-light/oblique scan proof;
- printer template/profile, bleed/safe area, stand/frame interference, export and Drive delivery.

The invisible quiet-zone reserve must be revalidated with the real QR. No URL, QR destination, permission rule, hashtag or expiry fact may be fabricated.

## Current result

`CLEANROOM_V2_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A4_TOP_RULE_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Next progression target: `ADD-12 新郎新婦クイズカード`.
