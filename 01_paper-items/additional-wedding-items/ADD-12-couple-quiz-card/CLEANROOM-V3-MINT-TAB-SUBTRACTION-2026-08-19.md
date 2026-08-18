# ADD-12 新郎新婦クイズカード — Clean-room V3 mint-tab subtraction QA

Status: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-19
Start authority SHA: `37f08c2a4c76d91a0cbb8e6e34ff95c38926e8b2`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `oZ24SbwGkeAfFJcXlbxCoD`
- selected front/back: `26:3 / 26:4`
- hidden long-copy back: `27:83`
- retained legacy: `1:2 / 1:26` — unchanged
- Drive folder: `ADD-12_新郎新婦クイズカード` / `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`

## Visible problem

Fresh actual-size review of selected back `26:4` found a short mint `DECOR / MINT TAB` attached to the top-right edge of the otherwise borderless open message field. The semantic writing area, `ひとこと`, `[メッセージ]`, and the faint handwriting hint already communicate the writable role. The extra tab had no trim, binding, answer, writing, or navigation function and read as a small interface/accent control inside an intentionally open stationery surface.

## Bounded comparison

A rollback-safe comparison `39:2 / QA / ADD12 / BACK / NO_MINT_TAB / 2026-08-19` hid only `DECOR / MINT TAB` and preserved:

- the `536×216` semantic open-message field geometry;
- native `[メッセージ]` and handwriting hint;
- mint opening field at the top of the card;
- name and answer-method roles;
- all spacing and typography.

The borderless/no-tab candidate was visibly quieter and more stationery-like at native `620×875`; the writing region remained immediately understandable without the ornamental tab.

## Adoption / rollback

Before selected-family mutation, hidden rollback copies were created:

- selected back rollback: `39:19`;
- long-copy back rollback: `39:36`.

Adopted mutation:

- selected `26:4`: `26:48 / DECOR / MINT TAB` hidden;
- stress `27:83`: `27:97 / DECOR / MINT TAB` hidden;
- comparison `39:2` returned to hidden QA state.

No legacy node was changed or deleted.

## Three-scale / structure QA

- whole/native back `26:4`: PASS at `620×875`;
- actual-size back `26:4`: PASS; open writing field reads without widget-like accent;
- realistic long-copy stress `27:83`: PASS at `620×875`; no visible overlap introduced;
- selected visible native text: `8`;
- selected/stress outside visible text: `0`;
- selected/stress IMAGE fills: `0`;
- selected/stress visible mint-tab count: `0`;
- native variable text and writing-area geometry remain editable/unchanged.

## Image / Drive decision

Image generation and Drive write were not required. The defect was a non-semantic native decoration, not missing imagery. Exact Drive authority was live-read before the Figma write; no assets were added.

## Learning state

`VERIFIED_LOCAL` only. The transferable hypothesis is not “remove mint accents.” It is: after a functional field has already become visually open, re-check any residual tab/corner marker for an actual binding or physical function; remove it only when spacing/labels already make the role clear. Exact color, placement, and quiz-card composition remain ADD-12-specific.
