# WEDDING PASSPORT — Front Japanese Note Line-Break Polish

Date: 2026-08-14
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / JA_LINEBREAK_POLISH_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority before write

- observed latest `main`: `c0e499dbd3dddf15bf357e5b9d23849a086210f5`
- Current: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- production front: `18:2 / FRAME_FRONT_COVER`
- Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`

## Fresh visual defect

Fresh front-cover review at thumbnail, reading and 1480×2100 scale found the lower-left Japanese note visually breaking as three lines because the 48px text did not fit its 360px measure:

- intended copy: `きょうの景色を、\n一冊に。`
- visible result before polish: `きょうの景色 / を、 / 一冊に。`

The orphaned `を、` weakened Japanese typography and made the rail feel mechanically wrapped rather than intentionally composed.

## Clean-room comparison

Created `133:2 / QA_FRONT_COVER_JA_NOTE_LINEBREAK_2026_08_14` and changed only `V2_NOTE` to 42px with 58px line height. Fresh screenshot comparison showed the same approved wording fitting as two intentional lines without changing the rail, title, index, contour artwork or factual copy.

The comparison was hidden after promotion.

## Rollback-safe production change

Created full hidden rollback:

- `134:2 / ROLLBACK_PASSPORT_FRONT_PRE_JA_NOTE_LINEBREAK_2026_08_14`

Production root `18:2` was preserved. Only native text `103:130 / V2_NOTE` changed:

- copy unchanged: `きょうの景色を、\n一冊に。`
- font: `Noto Serif JP Bold`
- font size: `48 → 42`
- line height: `66 → 58`
- text width unchanged: `360`

No final facts or new decorative content were introduced.

## Screenshot QA

Fresh 1480×2100 production screenshot: PASS.

- the note now reads as two intentional Japanese lines;
- no line-head orphan `を、` remains;
- left-rail hierarchy and negative space remain balanced;
- `旅のはじまり`, date rail, index, contour composition and folio are unchanged.

## Structural readback

Production front `18:2` after the edit:

- size: `1480×2100`
- `clipsContent=true`
- native text: `18`
- visible native text: `18`
- visible IMAGE-fill role: `121:2 / IMG_PAPER_TEXTURE_REPLACEABLE`, opacity about `0.16`
- visible text outside root: `0`
- `103:130`: native editable text, `360×74`, 42px / 58px line-height
- rollback `134:2`: exists and hidden
- comparison `133:2`: exists and hidden

## Image / Drive

`IMAGE_GENERATION_NOT_REQUIRED`.

The quality bottleneck was Japanese line composition, not missing imagery. Drive write: `0`.

## Decision

WEDDING PASSPORT remains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / JA_LINEBREAK_POLISH_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
