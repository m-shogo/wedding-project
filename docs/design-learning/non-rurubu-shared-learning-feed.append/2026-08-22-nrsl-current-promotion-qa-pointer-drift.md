# NRSL — Current-promotion QA pointer drift

Date: 2026-08-22
Source scope: non-Rurubu
State: `VERIFIED_CROSS_ITEM → CROSS_ITEM_CANDIDATE`
Failure fingerprint: `CURRENT_PROMOTION_QA_POINTER_DRIFT`

## Visible problem

A newer selected Figma Current and newer promotion/current evidence existed, but an older canonical or operational QA entry point still described a superseded selected design. This was independently reproduced in three materially different non-Rurubu items:

1. ADD-13 Message Card — canonical `QA.md` still named SUNSHINE POSTCARD `48:*` after `RESORT DESK LETTER 52:72 / 52:91` had become Current.
2. ADD-16 Parent Gift Message Card — canonical `QA.md` still named HOME HORIZON `18:*` after `HOME TEXTILE MAT 57:3 / 57:17` had become Current and `CURRENT.md` already reflected it.
3. ADD-17 Children Mini Card — operational `docs/automation/add-17-children-mini-card-design-qa.md` still described V5 `2:2 / 2:5` after `FOLDOUT DISCOVERY MAP 62:2 / 62:22` had become Current.

The Figma designs themselves were healthy. The defect was authority drift: a future worker following a stale QA pointer could reopen, compare, stress-test or mutate the wrong historical root.

## Root-cause hypothesis

Promotion evidence and item Current can advance without all older operational/canonical QA entry points being reconciled in the same bounded transaction. Because historical evidence is intentionally preserved, old node IDs remain valid and therefore do not fail loudly; stale documentation can look plausible while pointing at a superseded design.

## Bounded verification / repair

For each reproduced item, the repair used the same authority-safe sequence:

1. read latest GitHub `main` and non-Rurubu Current authority;
2. identify the newer item Current/promotion evidence;
3. verify the exact current Figma node by live screenshot;
4. verify the exact Google Drive authority folder ID/title live;
5. preserve historical design/evidence references as history rather than deleting them;
6. update only the stale QA/operational entry point to the verified Current;
7. read back the GitHub write.

Repairs:

- ADD-13 canonical QA sync commit: `941c331044c86635e2df0e2903e7505a9c5d804b`.
- ADD-16 canonical QA sync commit: `5eb806fea5fc857615745ba6a2f802b2e0ba8f30`.
- ADD-17 operational Design-QA sync commit: `32cda336609332d553b98bfd5c7a4de723cf098d`.

## Evidence

### ADD-13

- Figma Current: `8ad7bEPAc8I88gs1JxsWhe / 52:72 / 52:91`.
- Drive authority: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`.
- Current evidence: `01_paper-items/additional-wedding-items/ADD-13-message-card/FAMILY-DIVERSE-RESORT-DESK-LETTER-QA-2026-08-21.md`.
- repaired entry point: `01_paper-items/additional-wedding-items/ADD-13-message-card/QA.md`.

### ADD-16

- Figma Current: `ylmVBbwNcnjueYrymNpa3c / 57:3 / 57:17`.
- Drive authority: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`.
- Current evidence: `01_paper-items/additional-wedding-items/ADD-16-parent-gift-message-card/CURRENT.md` and `PROFESSIONAL-VNEXT-HOME-TEXTILE-MAT-FAMILY-DIVERSITY-QA-2026-08-22.md`.
- repaired entry point: `01_paper-items/additional-wedding-items/ADD-16-parent-gift-message-card/QA.md`.

### ADD-17

- Figma Current: `PAvkRggJiRuXVypi3RgZCN / 62:2 / 62:22`.
- Drive authority: `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB / ADD-17_子ども向けミニカード_ぬりえ`.
- Current evidence: `01_paper-items/additional-wedding-items/ADD-17-children-mini-card/CURRENT.md`.
- repaired entry point: `docs/automation/add-17-children-mini-card-design-qa.md`.

## Expected improvement

A future run that follows the documented authority chain reaches the actually selected Figma root instead of silently auditing an older retained design. This reduces wrong-root mutation, duplicate redesign, stale stress evidence and false regression reports.

## Regression risk

Do not solve authority drift by deleting historical evidence or rewriting all old files to pretend the previous designs never existed. Current-entry pointers should move; historical evidence remains immutable/clearly historical.

Do not trust timestamps or a file named `QA.md` by itself. A candidate Current must be reconciled against live Figma and the latest item Current/promotion evidence before a pointer is changed.

## Transfer boundary

Safe to transfer:
- promotion-completion should include an authority-pointer reconciliation check;
- current selected node IDs should be read back after promotion;
- stale operational entry points are correctness defects even when the visual design is healthy.

Must remain item-specific:
- exact Figma node IDs;
- item palettes/layouts/art directions;
- Drive folder IDs;
- blocked final inputs.

## Cross-item applicability

Before a future meaningful Figma write, compare the target item's canonical/current QA entry point with its newest `CURRENT.md` or promotion evidence and the live selected Figma root. If they disagree, repair authority drift before making new visual changes.

This is not yet `PROMOTED_PROJECT_RULE`; test the reconciliation check in another promotion lifecycle or observe a fourth independent drift before project-wide promotion unless explicit user direction makes it mandatory.
