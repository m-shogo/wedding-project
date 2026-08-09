# ADD-03 当日タイムテーブルボード — Reopened Visual Promotion

Date: 2026-08-10
State: `SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_PROMOTED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before evidence write: `d96cb0fba70c0529f7440caa53de1b5529fd179c`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `woFUHUqZcvNkih8o42xeH4`
- production frame retained: `1:5 / FRAME_TIMETABLE_BOARD`
- Drive authority folder: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`

## Reopened diagnosis

The previous production was structurally correct but visually read as a generic vertical timeline / internal infographic: a thin route line, equal circular nodes, text blocks placed to the right, and a very large amount of unarticulated cream space. Under the reopened sellable gate, the earlier structural QA therefore remained useful evidence but was not sufficient visual-completion evidence.

## Clean-room V2

Created `4:2 / QA_ADD_03_CLEANROOM_V2_ITINERARY_EDITORIAL_2026_08_10` on the QA page as a materially different print-editorial direction.

Art direction:

- Japanese headline `本日の旅程` becomes the primary hierarchy rather than an English-only dashboard title;
- a full-height deep-navy date rail carries `2026 / 10.24 / SAT / YOKOHAMA` as a print object rather than a UI sidebar;
- ceremony and reception are composed as large editorial time blocks with intentionally different scale;
- the unconfirmed 14:40–15:00 interval becomes one warm-sand itinerary slip, visually secondary and still explicitly `TBD · LAYOUT DUMMY`;
- red registration rules and folio-like rail details create print rhythm without fake airline controls, badges, cards or transport data;
- no raster imagery, generated person imagery, fake QR, fake gate data, gradients or rounded web cards were introduced.

## Screenshot repair loop

The first clean-room screenshot exposed two real defects:

1. ceremony/reception auto-layout frames inherited white fills and read as web cards;
2. the date rail broke `10 / 24` into two lines and collided with `SATURDAY`.

Both were repaired before promotion:

- removed the white fills from the ceremony and reception groups;
- rebuilt the date hierarchy as `10.24`, `SAT`, `YOKOHAMA` with corrected spacing.

The repaired whole-item screenshot reads as a travel-itinerary print board rather than a timeline application UI.

## Production promotion

Before promotion, a full rollback clone of the old production was created on the production page:

- `6:2 / ROLLBACK_ADD_03_PRE_V2_PROMOTION_2026_08_10`

The existing production frame ID `1:5` was preserved. Its contents were replaced with the selected clean-room V2 structure, so existing references and URLs remain stable.

## Post-promotion visual gate

The final production screenshot passed the reopened sellable visual gate:

- hierarchy is driven by Japanese typography and time scale rather than equal timeline nodes;
- the 14:40–15:00 placeholder remains clearly secondary;
- negative space is structured by the date rail, title register, event blocks and bottom sand field instead of empty premium-looking whitespace;
- no generic admin/dashboard card language remains;
- the design is materially different from the previous production and would be selected independently rather than only because it already existed.

## Structure readback

Live Plugin API readback after promotion:

- production frame: `1400 × 1980`
- native editable text nodes: `19`
- IMAGE fill nodes: `0`
- `GUIDE_BLEED`: hidden, `1400 × 1980`
- `GUIDE_TRIM`: hidden, `1372 × 1952`
- `GUIDE_SAFE`: hidden, `1260 × 1840`
- text outside production root: `0`
- variable/unconfirmed copy remains native editable text and explicit semantic placeholders.

## Image-generation / Drive status

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated image is claimed or adopted. The visible defect was composition/typography, not missing photography, so native graphic construction was the correct method for this pass.

Drive authority was re-read immediately before promotion. Drive changes: `0`. The authority folder is currently empty; no raster master was adopted.

## Decision

`ADD_03_REOPENED_VISUAL_PASS_CLOSED / SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_PROMOTED / ROLLBACK_SAFE / NOT_PRINT_READY`

Deferred finalization remains limited to the confirmed transfer/activity wording, ceremony/reception explanatory notes, A2 vs A3 installation decision, printer/vendor template and physical-distance proof.

Next target: `ADD-04 受付サイン`.