# WEDDING PASSPORT — Seating Clean-Room V3 Promotion QA

Date: 2026-08-09
State: `VISUAL_REOPENED / V3_PROMOTED_TO_PRODUCTION / SELLABLE_VISUAL_QA_PASS / STRUCTURE_QA_PASS / NOT_PRINT_READY`

## Live authority

- Start `main`: `8070584c6e0a92527940d634aeed25c6a3c557e7`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Production frame preserved at exact ID: `02_INSIDE / 18:131 / FRAME_SEATING`
- V2 comparison retained: `78:2 / QA_SEATING_CLEANROOM_V2_EDITORIAL_2026_08_09`
- V3 comparison retained: `81:69 / QA_SEATING_CLEANROOM_V3_EDITORIAL_2026_08_09`
- V3 long-name stress proof retained: `82:2 / QA_SEATING_CLEANROOM_V3_LONGNAME_STRESS_2026_08_09`
- Pre-promotion production rollback: `83:2 / QA_SEATING_PRODUCTION_ROLLBACK_BEFORE_V3_2026_08_09`
- Drive authority folder: `01_パスポート風_メニュー・ドリンク・座席表`
- Drive folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- RURUBU / るるぶ scope: not read or modified.

## Visible defect closed

The previous production seating chart used eleven repeated bordered cards in a regular grid plus a boxed head-table banner. At thumbnail scale it read like a dashboard / admin-card system rather than sellable wedding editorial stationery.

V2 removed the boxes but still left the page too sparse and mechanically columnar. V3 made a second material composition change before promotion:

- Japanese-first serif hierarchy;
- two-column staggered directory instead of a 3-column card grid;
- six tables on the left and five on the right with non-mirrored vertical rhythm;
- enlarged guest-name width from the legacy 336 px blocks to 442 px;
- thin editorial hairlines instead of box borders;
- a restrained central divider and narrow navy page edge;
- head table expressed through type + rules rather than a dark UI container;
- no gradients, shadows, pills, badges, fake transport data, decorative icons, or generic travel stock motifs.

## Promotion

The verified V3 direction was promoted into the existing production frame `18:131` rather than replacing the production frame wholesale. Existing production guest text node IDs were retained:

- `18:171`, `18:175`, `18:179`, `18:183`, `18:187`, `18:191`, `18:195`, `18:199`, `18:203`, `18:207`, `18:211`

This preserves the production frame authority and the native guest-text anchors while materially changing the visual composition.

## Screenshot QA

Whole-item production screenshot after promotion:

- no repeated bordered-card / dashboard impression remains;
- Japanese title and head-table hierarchy read clearly at thumbnail and reading scale;
- 11 table groups remain easy to scan;
- the staggered two-column rhythm fills the sheet more intentionally than V2 without becoming dense;
- no generated imagery was forced into this page because the diagnosed weakness was composition and typography, not a missing image role.

Actual-size table detail was also inspected on the V3 proof. Rules, large table numerals and guest text remain clean at native scale.

## Long-name stress

V3 stress proof `82:2` replaced each table with seven long Japanese layout-test names.

Measured result for all eleven guest blocks:

- width: `442 px`
- height: `189 px`
- parent height: `216 px`
- seven rows each
- bottom edge: `189 px`
- remaining vertical clearance: `27 px`
- all within parent: `true`

No 8-person assumption was introduced.

## Production structural readback

Post-promotion `18:131`:

- frame: `1480 × 2100`
- `clipsContent=true`
- V3 table frames: `11`
- guest rows: `77`
- all seven rows per table: `true`
- all guest nodes `textAutoResize=HEIGHT`: `true`
- all guest text blocks within table parents: `true`
- guest text: Noto Sans JP Regular, 19 px, 27 px line height
- guest text width: `442 px`
- native text nodes: `53`
- IMAGE-fill nodes: `0`
- production raster/flatten replacement: `0`
- rollback frame `83:2`: present

## Drive / generated assets

- Drive changes: `0`
- generated assets adopted: `0`
- reason: adding imagery to this seating page would have been decorative rather than solving the evidenced defect. The reopened Current still requires image generation to be used on later targets when it has a concrete editorial role.

## Decision

`SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

This visual PASS applies to the seating-chart page only. Other WEDDING PASSPORT pages remain in the reopened visual audit until separately evidenced.

## Deferred finalization

- final guest names
- final table assignments
- confirmed venue room geometry / table mapping
- printer template, bleed, trim and safe-area confirmation
- 100% physical print proof
- final PDF preflight

## Next

Continue the reopened WEDDING PASSPORT visual audit on the next highest-value live page. Do not return to micro-polishing this seating chart unless a new visible or structural regression is evidenced.
