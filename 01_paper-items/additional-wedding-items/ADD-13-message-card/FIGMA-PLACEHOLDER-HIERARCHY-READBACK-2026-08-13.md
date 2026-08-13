# ADD-13 メッセージカード — Placeholder Hierarchy Readback — 2026-08-13

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PLACEHOLDER_HIERARCHY_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- GitHub `main` immediately before this evidence write: `8746cb7ed8fe6f2802d06385ace489bb301bc829`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `8ad7bEPAc8I88gs1JxsWhe`
- production front: `1:3 / ADD13/A6/FRONT`
- production back: `1:13 / ADD13/A6/BACK`
- Drive folder: `ADD-13_Message_Card` / `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`
- Drive metadata readback confirmed the exact folder ID and parent `1iJGIzmNSlzwqrcv7P6UsNbstwBki1523`.

## Fresh live readback

The earlier placeholder-hierarchy follow-up is already present in live production. A fresh native text-range readback confirmed that semantic field text remains the visible content while only proof-only `LAYOUT DUMMY` suffixes are demoted.

Front production `1:3`:

- `［宛名 · LAYOUT DUMMY］`: field `16 px`; suffix `7 px`, warm-gray, opacity about `0.76`.
- `［書き出し · LAYOUT DUMMY］`: field `22 px`; suffix `8 px`, warm-gray, opacity about `0.76`.
- `［本文 · LAYOUT DUMMY］`: field `27 px`; suffix `9 px`, warm-gray, opacity about `0.76`.
- `［差出人名 · LAYOUT DUMMY］`: field `20 px`; suffix `8 px`, warm-gray, opacity about `0.76`.

Back production `1:13`:

- `［自由記入の案内 · LAYOUT DUMMY］`: field `20 px`; suffix `8 px`, warm-gray, opacity about `0.76`.
- `［用途・記名方針等 · LAYOUT DUMMY］`: field `13 px`; suffix `6 px`, warm-gray, opacity about `0.76`.

This matches the bounded follow-up targets recorded previously while keeping all variable content native editable text.

## Screenshot QA

Fresh actual-size screenshots were captured for front and back at their native `700 × 990` size.

- Front: recipient, intro, body and signature fields read clearly as correspondence content; proof metadata is visibly subordinate and no longer gives the card a CMS/form appearance.
- Back: the title, open writing area and footer hierarchy remain intact; the suffix treatment is quiet enough not to compete with the message-writing role.
- No new collision, clipping, excessive symmetry, web-UI feel or raster artifact was observed.

## Rollback / structure

The hidden rollback created before the earlier follow-up remains available:

- section `8:2 / ROLLBACK_ADD13_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`
- front rollback `8:3 / ROLLBACK_ADD13_FRONT_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`
- back rollback `8:17 / ROLLBACK_ADD13_BACK_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`

Production roots remain `1:3 / 1:13`.

Live structure remains:

- front `700 × 990`, native text `8`, IMAGE fills `0`, `clipsContent=true`
- back `700 × 990`, native text `4`, IMAGE fills `0`, `clipsContent=true`
- no flattening or raster replacement introduced

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The quality issue was proof-metadata typography rather than missing imagery. Drive writes: `0`.

## Result

ADD-13 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`, and its placeholder-hierarchy follow-up is now verified live as `PLACEHOLDER_HIERARCHY_PASS`.
