# NRSL — Current-promotion QA pointer drift

Date: 2026-08-22
Source scope: non-Rurubu
State: `PROMOTED_PROJECT_RULE`
Failure fingerprint: `CURRENT_PROMOTION_QA_POINTER_DRIFT`

## Visible problem

A newer selected Figma Current and newer promotion/current evidence can exist while an older canonical or operational QA entry point still describes a superseded selected design. This has now been independently reproduced in four materially different non-Rurubu items:

1. ADD-13 Message Card — canonical `QA.md` still named SUNSHINE POSTCARD `48:*` after `RESORT DESK LETTER 52:72 / 52:91` had become Current.
2. ADD-16 Parent Gift Message Card — canonical `QA.md` still named HOME HORIZON `18:*` after `HOME TEXTILE MAT 57:3 / 57:17` had become Current and `CURRENT.md` already reflected it.
3. ADD-17 Children Mini Card — operational `docs/automation/add-17-children-mini-card-design-qa.md` still described V5 `2:2 / 2:5` after `FOLDOUT DISCOVERY MAP 62:2 / 62:22` had become Current.
4. ADD-03 Timetable Board — canonical `QA.md` still named `TIDE DAY` as Current after the later family-diversity promotion had already replaced the same stable production roots with `DAY BROADSHEET 14:2 / 15:40`.

In all four cases the Figma designs themselves were healthy. The defect was authority drift: a future worker following a stale QA pointer could reopen, compare, stress-test or mutate the wrong historical root.

## Root cause

Promotion evidence and live Figma can advance without every older operational/canonical QA entry point being reconciled in the same bounded transaction. Because historical evidence is deliberately retained, old node IDs remain valid and therefore do not fail loudly. A stale document can look authoritative while pointing at a superseded visual generation.

The ADD-03 reproduction is especially strong evidence because the stable production root IDs did not change; only their selected content/name advanced. A pointer that remembered the old art-direction name therefore became semantically stale even though the node IDs still resolved.

## Project-wide rule

**Promotion is not complete until the Current authority chain is reconciled.**

After any meaningful Figma promotion or replacement of a selected visual generation, verify and reconcile this chain before leaving the item:

`live selected Figma root(s) → newest CURRENT/promotion evidence → canonical QA / automation pointer → exact Drive authority`

Required behavior:

1. re-read latest GitHub `main` immediately before reconciliation;
2. verify the exact selected Figma root IDs and current node names/properties live;
3. verify the newest item Current/promotion evidence points to those same selected roots;
4. verify the exact Drive authority folder/file ID and title live;
5. update only stale Current-facing QA/automation pointers;
6. preserve old designs and historical evidence as history/rollback rather than deleting or rewriting them;
7. read back the GitHub reconciliation write;
8. if the authority chain disagrees, repair it before starting another visual mutation on that item.

A file named `QA.md`, a recent timestamp, or a still-valid Figma node ID is not sufficient proof that the pointer is Current.

## Bounded verification / repair evidence

### ADD-13

- Figma Current: `8ad7bEPAc8I88gs1JxsWhe / 52:72 / 52:91`.
- Drive authority: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`.
- Current evidence: `01_paper-items/additional-wedding-items/ADD-13-message-card/FAMILY-DIVERSE-RESORT-DESK-LETTER-QA-2026-08-21.md`.
- repaired entry point: `01_paper-items/additional-wedding-items/ADD-13-message-card/QA.md`.
- repair commit: `941c331044c86635e2df0e2903e7505a9c5d804b`.

### ADD-16

- Figma Current: `ylmVBbwNcnjueYrymNpa3c / 57:3 / 57:17`.
- Drive authority: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`.
- Current evidence: `01_paper-items/additional-wedding-items/ADD-16-parent-gift-message-card/CURRENT.md` and `PROFESSIONAL-VNEXT-HOME-TEXTILE-MAT-FAMILY-DIVERSITY-QA-2026-08-22.md`.
- repaired entry point: `01_paper-items/additional-wedding-items/ADD-16-parent-gift-message-card/QA.md`.
- repair commit: `5eb806fea5fc857615745ba6a2f802b2e0ba8f30`.

### ADD-17

- Figma Current: `PAvkRggJiRuXVypi3RgZCN / 62:2 / 62:22`.
- Drive authority: `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB / ADD-17_子ども向けミニカード_ぬりえ`.
- Current evidence: `01_paper-items/additional-wedding-items/ADD-17-children-mini-card/CURRENT.md`.
- repaired entry point: `docs/automation/add-17-children-mini-card-design-qa.md`.
- repair commit: `32cda336609332d553b98bfd5c7a4de723cf098d`.

### ADD-03 — fourth independent reproduction / promotion trigger

- Figma file: `woFUHUqZcvNkih8o42xeH4`.
- live Current A2: `14:2 / VNEXT_PRO_ADD03_DAY_BROADSHEET_A2_SELECTED`.
- live Current A3: `15:40 / VNEXT_PRO_ADD03_DAY_BROADSHEET_A3_SELECTED`.
- structure readback: A2/A3 each native visible text `14`, auto-height `14/14`, fixed-height `0`, IMAGE fills `0`.
- three-scale live screenshot review: PASS; no new material visual defect justified a Figma mutation.
- Drive authority live-readback: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`.
- current promotion evidence: `01_paper-items/additional-wedding-items/ADD-03-timetable-board/FIGMA-FAMILY-DIVERSITY-DAY-BROADSHEET-PROMOTION-2026-08-21.md`.
- stale entry point repaired: `01_paper-items/additional-wedding-items/ADD-03-timetable-board/QA.md`.
- repair commit: `181ecb8b1ac1dcaccc69602f84c28de263e259e8`.

The stale ADD-03 QA had continued to call the stable roots `TIDE DAY` even though the later family-diversity promotion had replaced those same roots with `DAY BROADSHEET`. This independently reproduces the fingerprint under a different artifact and promotion topology, satisfying the project-wide promotion gate.

## Expected improvement

Future runs following documented authority now reach the actually selected Figma generation instead of silently auditing retained history. This reduces:

- wrong-root mutation;
- duplicate clean-room redesign prompted by stale status;
- use of superseded long-copy evidence;
- false visual regressions;
- accidental reintroduction of a rejected/superseded art direction.

## Regression risk / exclusions

Do not solve authority drift by deleting historical evidence or rewriting all old files to pretend previous designs never existed. History and rollback remain valuable.

Do not mechanically update every historical QA document after promotion. Only Current-facing canonical/operational entry points must reconcile to live truth; dated evidence should remain accurate to the generation it documented.

Do not infer Current from modification time alone. New uploads/copies or later documentation edits do not override live Figma + explicit Current/promotion authority.

## Transfer boundary

Safe to transfer project-wide:

- authority-pointer reconciliation is part of promotion completion;
- selected Figma node IDs **and current node names/semantic generation** must be read back after promotion;
- canonical QA/automation pointer drift is a correctness defect even when the visual design is healthy;
- exact Drive authority must be verified as part of the chain.

Must remain item-specific:

- exact node IDs and filenames;
- layout, palette, art direction and assets;
- Drive folder IDs;
- deferred final inputs.

## Status

`PROMOTED_PROJECT_RULE` — independently reproduced in ADD-13, ADD-16, ADD-17 and ADD-03, with live Figma/Drive reconciliation and bounded Git repairs.
