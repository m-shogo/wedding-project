# ADD-07 エスコートカード案内ボード — A2 Japanese Footer Line-Break QA

Date: 2026-08-22
State: `VERIFIED_LOCAL / CURRENT_REPAIRED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / NOT_PRINT_READY`
Start authority SHA: `a7965c740c2419bdde81474c4441e0a18cb052b5`

## Live authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`.
- Figma file: `rplj1IWXP4XVKjWDQRg3dU`.
- Current A2: `32:2 / CURRENT / ADD-07 / A2 / HANGING CARD RACK / FAMILY-DIVERSE 2026-08-21`.
- Current A3: `32:16 / CURRENT / ADD-07 / A3 / HANGING CARD RACK / FAMILY-DIVERSE 2026-08-21`.
- A2 long-copy stress: `36:94`.
- Exact Drive authority read back live: `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi / ADD-07_エスコートカード案内ボード`.
- Drive write: `0`.

## Visible problem

Live A2 screenshot review reproduced the already-promoted Japanese semantic line-break failure in the small yellow footer. The native string was:

`カードを見つけたら、次の場所へ。`

With the existing `410 px` measure it rendered visually as:

`カードを見つけたら、次の場所`
`へ。`

The isolated `へ。` was structurally valid and did not overflow, but it read as machine-wrapped Japanese rather than intentional editorial composition.

A3 did **not** reproduce this defect: the same footer role renders on one natural line at the A3 reflow, so A3 was intentionally left unchanged.

## Bounded repair

The layout, type size, width, position, color, artifact grammar and all other copy were preserved. Only the native A2 footer line break was changed to a semantic break:

`カードを見つけたら、`
`次の場所へ。`

Updated nodes:

- Current A2 footer `38:37 / TEXT / FOOTER`.
- Hidden A2 long-copy footer `36:116 / TEXT / FOOTER`.

Both remain:

- `Noto Sans JP / Medium`;
- `28 px`;
- `42 px` line-height;
- width `410 px`;
- height `84 px`;
- `textAutoResize=HEIGHT`.

No font shrink, container, icon, image, SVG, decorative English, or new geometry was added.

## Screenshot / structure QA

Post-repair direct live screenshot of Current A2:

- whole-item / 900 px equivalent: PASS;
- actual-size native `1400×1980`: PASS;
- footer now reads as two intentional semantic lines;
- title, lead, three hanging cards, date/place and footer hierarchy remain unchanged;
- no new visual crowding introduced.

Readback:

- Current footer `38:37`: `カードを見つけたら、\n次の場所へ。`, `410×84`, `textAutoResize=HEIGHT`.
- Stress footer `36:116`: same semantic break, `410×84`, `textAutoResize=HEIGHT`.

A3 `32:16` was separately screenshot-audited and retained because its footer already reads naturally on one line. This size-specific decision avoids mechanically applying A2 typography to an independent A3 reflow.

## Learning state

This is a `VERIFIED_LOCAL` application of the already-promoted project rule:

`Figma text fits structurally ≠ Japanese line breaking is editorially correct.`

No new shared-learning entry is required because the failure family is already project-wide. This run adds another concrete receiving-item application and confirms that the correction must remain size/reflow-specific.

## Image / asset decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The defect was Japanese typography, not missing photography, illustration or fixed decoration. Generated assets would not improve the failing role.

Drive write: `0`.

## Decision

ADD-07 keeps its current `HANGING CARD RACK` family and existing `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` state. The A2 footer typography is repaired; A3 remains unchanged.

Deferred finalization remains limited to final operational wording, installation choice/height, physical print, venue lighting, printer bleed/profile and other real-world checks already recorded in `QA.md`.