# ADD-11 写真共有 / QR案内サイン — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V2_SELECTED / A5_JAPANESE_FIRST_HEADLINE_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-18
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

The reopened clean-room program supersedes the older legacy-node listing for **which family is current**. Legacy production remains preserved as comparison / rollback history only.

- Figma file: `ADD-11 写真共有・QR案内サイン`
- Figma file key: `PWQ5ygJJt0IlOqj5ri5jng`
- clean-room page: `18:18 / CLEANROOM / ADD-11 / V2 MEMORY ORBIT / 2026-08-16`
- selected A5: `18:19 / FRAME_ADD11_A5_CLEANROOM_V2` — `875×1240`
- selected A4: `19:34 / FRAME_ADD11_A4_CLEANROOM_V2` — `1240×1754`
- hidden A5 long-copy stress: `19:4`
- hidden A4 long-copy stress: `19:56`
- retained legacy: `1:31 / 1:45 / 3:2` — unchanged history/comparison only
- Drive folder: `ADD-11_写真共有_QR案内サイン`
- Drive folder ID: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`
- Drive parent: `1iJGIzmNSlzwqrcv7P6UsNbstwBki1523`
- detailed clean-room evidence: `CLEANROOM-V2-MEMORY-ORBIT-QA-2026-08-16.md`
- authority reconciliation: `FIGMA-CLEANROOM-V2-AUTHORITY-RECONCILIATION-2026-08-18.md`
- guest-copy cleanup: `FIGMA-CLEANROOM-V2-GUEST-COPY-CLEANUP-2026-08-17.md`

## Current art direction

The selected clean-room family is a quiet editorial photo-sharing sign, not a dashboard or enlarged QR widget.

- Japanese category / headline hierarchy leads the page;
- the unresolved QR remains a non-scannable semantic role until an authoritative URL exists;
- A5 uses a compact tabletop composition; A4 is an independent larger poster reflow rather than proportional scaling;
- privacy/access/hashtag/expiry roles remain native editable semantic placeholders;
- decorative rust seam from the legacy family is not part of the selected clean-room V2;
- no generated person imagery, rounded cards, pills, shadows, gradients, fake operational controls or fake QR destination is used.

## A5 Japanese-first headline refinement — 2026-08-18

Fresh whole-item review of selected A5 `18:19` found that the oversized English headline `SHARE YOUR JOURNEY` read more like generic travel-template copy than an item-specific Japanese wedding-stationery title. The A4 selected reflow already demonstrated a stronger Japanese editorial voice with `旅の記憶を、ひとつに。`.

A rollback-safe comparison `26:2 / QA_ADD11_A5_JAPANESE_FIRST_HEADLINE_2026_08_18` changed only two fixed guest-facing roles:

- `TXT_SHARE_TITLE`: `SHARE YOUR JOURNEY` → `旅の記憶を、\nひとつに。`;
- decorative footer `MEMORY DESK / 2026.10.24` → hidden.

The QR role, three-step instructions, privacy/access/hashtag/expiry placeholders, camera vector, cream/mint fields, geometry and all variable copy were unchanged.

The comparison was stronger at 500px and native `875×1240`: Japanese category → Japanese headline → guidance → steps/QR now reads directly without decorative English filler.

Before selected-family mutation, hidden rollback copies were saved:

- `26:32 / ROLLBACK_ADD11_A5_PRE_JAPANESE_FIRST_HEADLINE_2026_08_18`;
- `26:62 / ROLLBACK_ADD11_A5_STRESS_PRE_JAPANESE_FIRST_HEADLINE_2026_08_18`.

The same fixed-title/footer change was applied to hidden long-copy stress `19:4` so the QA proof matches selected production.

Post-write A5 stress verification:

- outside visible text: `0`;
- text-to-text collision: `0`;
- QR role unchanged;
- stress returned to hidden QA state after actual-size screenshot review.

## Structural QA

Fresh selected-family readback remains healthy:

### A5 `18:19`
- `875×1240`;
- native editable text preserved;
- guest-facing proof-language `0`;
- fixed 10/12px variable text roles `0`;
- outside visible text `0`;
- QR role remains replaceable semantic geometry;
- IMAGE fills `0`.

### A4 `19:34`
- `1240×1754`;
- native editable text preserved;
- guest-facing proof-language `0`;
- fixed 10/12px variable text roles `0`;
- outside visible text `0`;
- IMAGE fills `0`.

Hidden long-copy stress `19:4 / 19:56` remains the structural evidence for variable guidance/privacy/hashtag/expiry copy.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`. The current bottleneck was generic decorative English hierarchy, not missing imagery. Generated art would compete with the future real QR and add no functional value.

Live Drive readback on 2026-08-18 confirmed:

- folder ID: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`;
- parent: `1iJGIzmNSlzwqrcv7P6UsNbstwBki1523`;
- Drive writes in this run: `0`.

## BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION

These are finalization boundaries only and do not invalidate the visual pass:

- authoritative photo-sharing service / URL and account ownership;
- final public/private access scope, permission model, retention/expiration and consent/privacy wording;
- final hashtag decision;
- final A5/A4 installation selection and whether an A6 derivative is required;
- real QR generation from the approved URL and iPhone/Android scan proof;
- physical-size / low-light / oblique-angle scan proof;
- printer template/profile, bleed, safe-area, frame/stand interference, final export and Drive delivery.

## Current result

- Clean-room selected visual: `V2`
- A5 Japanese-first headline refinement: `PASS`
- Reopened sellable visual QA: `PASS`
- Whole / reading / actual-size visual QA: `PASS_WITH_PLACEHOLDERS`
- Long-copy structural QA: `PASS`
- Native editability: `PASS`
- Legacy preservation: `PASS`
- Physical/device scan proof: `NOT_RUN`
- Print-ready: `NO`
- Completion state: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`
