# ADD-12 新郎新婦クイズ V3 — Front Boxless Header QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-19
Start authority SHA: `06471204b1768ae516bdd1da7d9f5ad46be2ac4d`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `oZ24SbwGkeAfFJcXlbxCoD`
- selected front: `26:3 / ADD12/QuizCard/Front/CleanroomV3`
- hidden long-copy front: `27:51 / STRESS / ADD12 / FRONT / V3 LONG COPY`
- Drive authority: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ / ADD-12_新郎新婦クイズカード`
- retained legacy: `1:2 / 1:26`

## Visible problem

The current front had already matured into an open 2×2 editorial answer layout, but the top `620×92` navy field still enclosed only the small category title and date. Against the now-boxless back and open answer quadrants, the field read increasingly like a web/app header rather than a necessary print structure.

Neutral shared-learning input: RSL-130 (`MATURE_EDITORIAL_HIERARCHY_WITH_STALE_TERMINAL_CONTAINER`) was treated only as a hypothesis. No Rurubu item-specific layout, palette, asset, Figma node, Drive item, or GitHub item path was used.

## Bounded test

Rollback-safe comparison:

- `45:2 / QA_ADD12_FRONT_BOXLESS_HEADER_2026_08_19`

Only the header treatment changed:

- `DECOR / TOP FIELD` hidden;
- `ADD12/Title` preserved as native text and changed from off-white to the existing ADD-12 navy;
- `ADD12/Date` preserved as native text in the existing mint accent;
- `Q.01`, question body, question rule, choice prompt, four A–D roles, answer writing rules, answer method, trim guide, and all semantic copy remained unchanged;
- no raster, image, generated asset, new icon, card, rail, shadow, gradient, or factual copy was introduced.

Expected improvement: make the front and back read as one paper-stationery family instead of `web header + form body`, while keeping category/date legibility.

Regression risk: loss of top-level grouping, weak date/category contrast, excessive blank top margin, or long-copy collisions.

## Adoption / rollback

The boxless comparison was stronger at whole-item and actual-size scales and was adopted to selected and stress.

Pre-change hidden rollbacks:

- selected front: `45:34 / ROLLBACK_ADD12_FRONT_PRE_BOXLESS_HEADER_2026_08_19`
- long-copy front: `45:66 / ROLLBACK_ADD12_FRONT_STRESS_PRE_BOXLESS_HEADER_2026_08_19`

Adopted state:

- selected `26:3`: top field hidden; native title navy; native date mint;
- stress `27:51`: same treatment; stress returned hidden after QA;
- comparison `45:2`: hidden after promotion.

## Three-scale / structure QA

Visual evidence after adoption:

- whole / thumbnail at 500px: PASS; title/date remain legible without a dashboard-like header block;
- reading scale: PASS; `Q.01 → [設問] → answer instruction → A–D` remains immediate;
- actual-size `620×875`: PASS;
- realistic long-copy actual-size `620×875`: PASS; long Japanese question and multi-line choices remain inside the root.

Live structure readback:

- selected visible native text: `14`;
- stress visible native text: `14` when inspected;
- selected IMAGE fills: `0`;
- stress IMAGE fills: `0`;
- selected text outside root: `0`;
- stress text outside root: `0`;
- selected/stress top field visible: `false`;
- stress root returned hidden after QA.

No flatten/raster replacement was introduced. All question, choices, date and response instructions remain native editable text.

## Drive / image decision

Drive authority was live-read before the Figma write and matched the exact ADD-12 folder. Drive write: `0`.

Image generation: `0`. The defect was stale containment after hierarchy matured, not missing imagery.

## Learning state

Local result: `VERIFIED_LOCAL`.

This independently supports the neutral RSL-130 hypothesis in a materially different non-Rurubu artifact: a container that was once useful can become unnecessary after native typography, spacing and semantic roles mature. The transferable point is to re-test the container, not to remove boxes mechanically.

Item-specific and non-transferable: ADD-12's navy/mint palette, 620×875 format, exact title/date placement, quiz hierarchy and answer geometry.
