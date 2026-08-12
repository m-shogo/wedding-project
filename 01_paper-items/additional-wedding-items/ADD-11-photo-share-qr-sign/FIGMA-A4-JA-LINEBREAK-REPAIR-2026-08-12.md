# ADD-11 A4 Japanese line-break repair — 2026-08-12

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority before write

- GitHub `main`: `01adec402256821ddf0e82d6ab80b173a735f247`
- Figma file key: `PWQ5ygJJt0IlOqj5ri5jng`
- production A4: `3:2 / ADD11_A4_POSTER`
- repaired native text: `6:89 / INTRO_JA`
- Drive folder: `ADD-11_写真共有_QR案内サイン` / `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`

## Fresh actual-size defect

After the A5 typography repair, the remaining A6 and A4 production variants were checked at their natural sizes. A6 remained acceptable. A4 still auto-wrapped the polite sentence ending as `嬉しいで / す。`, which is an unacceptable Japanese word break even though there was no geometric overflow.

## Rollback-safe Figma repair

Before editing A4, production `3:2` was cloned as a hidden full-size rollback:

- `9:2 / ROLLBACK_ADD11_A4_PRE_JA_LINEBREAK_FIX_2026_08_12`
- size: `1240 × 1754`

`INTRO_JA / 6:89` remained native editable text and was changed from automatic wrapping to deliberate semantic lines:

- `撮影した写真を、こちらから共有できます。`
- `たくさんの思い出を`
- `残していただけたら嬉しいです。`

The text box remains `620 × 156` with `textAutoResize=HEIGHT`. No font size, QR role, placeholder, image asset, layout width, or copy meaning was changed.

## Screenshot QA

Natural-size `1240 × 1754` production screenshot: `PASS`.

- `嬉しいで / す。` is eliminated;
- the three lines now end at natural Japanese phrase boundaries;
- left editorial field / right navy QR field balance is unchanged;
- QR placeholder remains deliberately non-scannable and separate from variable copy.

## Structure readback

A4 production `3:2` after repair:

- native text: `10`;
- IMAGE fills: `0`;
- text outside production root: `0`;
- `clipsContent=true`;
- `INTRO_JA / 6:89`: native editable, `620 × 156`;
- rollback `9:2`: hidden and intact.

No generated asset was needed or added. `IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

ADD-11 remains sellable-pass; this was a Japanese typography correctness repair, not a reason to reopen the approved art direction.
