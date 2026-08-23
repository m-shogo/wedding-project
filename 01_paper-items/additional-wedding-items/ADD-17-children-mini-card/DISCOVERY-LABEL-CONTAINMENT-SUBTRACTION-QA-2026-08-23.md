# ADD-17 Discovery Label Containment Subtraction QA — 2026-08-23

Status: `VERIFIED_LOCAL / ADOPTED / ROLLBACK_SAFE`
Authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Visible problem

Current front `67:3 / EXPEDITION FIELD SHEET` used a large rounded coral rectangle behind the native reader-facing kicker `きょうの発見 / 01`.

At native `1110×1540` and whole-item scale, the label itself was useful, but the rounded background read as a generic UI/pill/banner and competed with the intentionally open activity field. This repeated a failure mode already avoided elsewhere in ADD-17: playfulness scattered into rounded containment rather than concentrated in the discovery-route gesture.

## Bounded test

Figma file: `PAvkRggJiRuXVypi3RgZCN`

- Current front: `67:3`
- realistic front stress: `69:2`
- no-rounded-flag comparison: `78:2`
- no-rounded-flag stress comparison: `78:40`
- complete pre-change Current rollback: `78:78`
- complete pre-change stress rollback: `78:116`

Only the discovery-label support changed:

- `DECOR / CORAL CORNER FLAG` hidden;
- native `TEXT / KICKER` retained with identical wording, size, position and font;
- kicker fill changed from white to coral so it remains a deliberate, reader-facing label on the mint paper field.

Title, lead, route SVG, star/wave/spark cues, prompt, optional name/date, activity area and footer were unchanged.

## Result

The no-flag version is stronger:

- whole-item: less web/UI containment and clearer open-paper reading;
- reading scale: `きょうの発見 / 01` remains immediately legible as artifact identity;
- actual/native size: coral text has sufficient contrast on mint and no longer needs a large decorative carrier;
- realistic long-copy: PASS with the same treatment.

After adoption:

- Current front `67:3`: native text `7`, fixed-height text `0`, outside text `0`, IMAGE fills `0`, coral corner flag hidden;
- stress front `69:2`: native text `7`, fixed-height text `0`, outside text `0`, IMAGE fills `0`, coral corner flag hidden;
- QA comparisons hidden after verification;
- rollback roots hidden and preserved.

Back `67:4` was not changed.

## Hybrid / asset decision

- variable/semantic copy: native editable text;
- route/star/wave/spark: existing editable vector roles;
- generated raster: `0`;
- replaceable image role: `0`;
- Drive write: `0`.

Exact Drive authority was re-read live before adoption:
`1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB / ADD-17_子ども向けミニカード_ぬりえ`.

`IMAGE_GENERATION_NOT_REQUIRED`: the diagnosed defect was UI-like containment around a valid native label, not missing illustration or photography.

## Learning state

`VERIFIED_LOCAL` only. This does **not** mean all colored labels or banners should be removed. The transferable QA question is whether a visible container performs a physical, grouping, navigation or reader-facing job that the native label cannot perform on its own. If not, test subtraction rollback-safely at whole-item scale.

## Finalization

ADD-17 remains `BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY` for real child attendance/use, final activity copy, paper/pen/crayon handling and physical proof. Those blockers do not invalidate this visual improvement.
