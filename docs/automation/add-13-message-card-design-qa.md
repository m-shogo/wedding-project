# ADD-13 Message Card — Design QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Authority verified 2026-08-10

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Start / pre-write main for reopened promotion: `24191d4cdd8c7f1d072bfcb4b5214fc23eef189c`
- Drive folder: `ADD-13_Message_Card` (`1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`), live metadata readback confirmed; no adopted raster asset added.
- Production Figma: `8ad7bEPAc8I88gs1JxsWhe`
- Production nodes remain front `1:3`, back `1:13`
- Reopened comparison section: `2:2`
- Reopened long-copy stress section: `3:2`
- Pre-promotion rollback section: `4:2`

## Reopened visual diagnosis

The structurally-passed production was re-audited under the sellable visual gate. Whole-item screenshots showed an English-led `MESSAGE CARD / A NOTE FOR YOU` treatment, a single teal edge, and large undifferentiated empty fields. It was functional but still resembled a generic sparse stationery template rather than a strong item-specific correspondence piece.

## Clean-room V2

Created `QA_ADD13_REOPENED_LETTERPRESS_CORRESPONDENCE_V2_2026_08_10` without touching production first.

- front `2:3` — Japanese-first letterpress/correspondence composition with top navy band, rust index, large `ことばを、残す。`, independent recipient field, intro/body hierarchy, signature rule, and date.
- back `2:4` — separate reply-side role with `ひとこと、聞かせてください。`, three restrained writing rules, small semantic footer, and narrow navy edge.

No planes, stamps, badges, rounded cards, gradients, shadows, fake transport data, fake UI, generated people, or rasterized variable copy were introduced.

The first front screenshot exposed a real issue in the recipient area. An attempted geometry adjustment initially targeted the wrong title/label node IDs and visibly broke the title; the error was immediately detected in screenshot QA and repaired in the same run. Final V2 keeps the title at 64/138 with 48 px native serif type, restores the TO label, and uses a widened one-line native recipient field at `2:10`.

## Long-copy stress

Created isolated stress section `3:2` with front `3:3` and back `3:17`.

Stress copy included a longer recipient field, two-to-three-line intro, multi-paragraph-length message body, long signer placeholder, longer free-writing instructions, and longer footer policy copy.

Screenshot QA confirmed:

- the long recipient remains inside its designated top-right field;
- the intro expands without touching the body block;
- the long body remains above the signature rule and does not collide with signature/date;
- the back guide expands to multiple lines without touching the first writing rule;
- the extended footer remains clear of the writing field and rust footer mark.

## Promotion / rollback

Before replacing production, preserved the previous front/back pair under `4:2` — `ROLLBACK_ADD13_PRE_REOPENED_PROMOTION_2026_08_10`, rollback front `4:3`, rollback back `4:13`.

Then promoted V2 into the existing production IDs:

- front remains `1:3`
- back remains `1:13`

Post-promotion whole-item screenshots confirm the Japanese-first letterpress/correspondence direction is now production.

## Structure readback

- production front `1:3`: 700 × 990, clipsContent true, native text 8, IMAGE fill nodes 0, hidden trim guide 1
- production back `1:13`: 700 × 990, clipsContent true, native text 4, IMAGE fill nodes 0, hidden trim guide 1
- variable recipient, intro, body, signer, free-writing guide, and footer policy remain native editable text
- no flatten/raster replacement introduced

## Image generation / Drive

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`. The screenshot-supported bottleneck was typography/composition and correspondence rhythm, not missing hero imagery. Drive changes: 0.

## Decision

ADD-13 now satisfies the reopened second-pass target: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

## Deferred finalization

`DEFERRED_FINALIZATION / NOT_PRINT_READY`: final recipient/use-case policy, final message copy, signer naming convention, date/copy, paper stock, printer template/profile, exact mm/bleed/export settings, and physical proof remain pending.

## Next target

Proceed to ADD-14 二次会案内.
