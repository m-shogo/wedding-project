# BOARDING PASS — Placeholder Hierarchy Polish

Date: 2026-08-13
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before this evidence write: `20fe2a95edbb3d7085c40b6256720d8165d322b2`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `P2PtpMyhyZqHYe1ZBBCD13`
- production front: `8:5 / FRAME_FRONT`
- production back: `8:73 / FRAME_BACK`
- Drive authority: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`

## Fresh visual diagnosis

A fresh native-size 1200×550 screenshot confirmed the V2 editorial ticket composition remains strong, but the explicit semantic placeholders were still visually too loud. In particular `[氏名 · LAYOUT DUMMY]`, reception/table/venue values, and the detachable-stub placeholders read almost like final guest-facing content. The large `LAYOUT DUMMY` suffixes gave the otherwise sellable ticket a proofreading-sheet / implementation-state feel.

This was a hierarchy problem, not an image or composition problem.

## Rollback-safe proof

Created hidden front rollback before the edit:

- `25:2 / ROLLBACK_BOARDING_FRONT_PRE_PLACEHOLDER_HIERARCHY_POLISH_2026_08_13`
- size: `1200×550`

Production root remained `8:5`.

## Production change

Kept every variable role explicit and native-editable, but separated the semantic field name from the production-state suffix:

- `21:108 / TXT_GUEST_NAME`: `[氏名]  LAYOUT DUMMY`, with suffix reduced to 15px warm gray;
- `21:110 / TXT_FROM_VALUE`: `[受付情報]  LAYOUT DUMMY`, suffix 10px warm gray;
- `21:112 / TXT_TO_VALUE`: `[卓情報]  LAYOUT DUMMY`, suffix 10px warm gray;
- `21:123 / TXT_VENUE_VALUE`: `[会場名]  LAYOUT DUMMY`, suffix 9px warm gray;
- `21:126 / TXT_TABLE_VALUE`: retained `[卓番号]\nLAYOUT DUMMY`, suffix reduced to 7px warm gray;
- `21:127 / TXT_STUB_NAME`: `[ローマ字氏名]  LAYOUT DUMMY`, suffix 7px warm gray;
- `21:129 / TXT_STUB_GATE`: `[最終案内]  LAYOUT DUMMY`, suffix 8px warm gray.

The suffix fill uses a restrained warm gray (`opacity 0.72`) so Current's explicit placeholder semantics remain readable without competing with the field values.

No factual guest name, romanization, table, reception instruction, venue, or final guidance was invented.

## Screenshot QA

Post-write native-size 1200×550 screenshot: PASS.

- `[氏名]` is again the dominant editorial anchor rather than the implementation suffix;
- reception / seating / venue roles remain legible but read as fields rather than production notes;
- detachable stub remains physically distinct through perforation and edge treatment;
- date `2026.10.24` and ceremony time `14:10` hierarchy is unchanged;
- no new clipping, collision, fake airline data, barcode, plane, stamp, gradient, or web-UI treatment was introduced.

## Structural readback

Front `8:5` after edit:

- `1200×550`, `clipsContent=true`;
- native text nodes: `24` total / `21` visible;
- text outside root: `0`;
- replaceable image role remains `23:2 / IMG_TICKET_STOCK_TEXTURE_REPLACEABLE`, opacity `0.14`, blend `MULTIPLY`;
- rollback `25:2` exists and is hidden;
- all seven placeholder roles listed above remain native editable text.

## Image / Drive

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated image was needed: the screenshot-supported defect was placeholder hierarchy, while the existing ticket-stock texture and V2 composition remain appropriate. Drive write: `0`.

## Decision

BOARDING PASS remains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

Deferred finalization remains final guest/table/venue wording, final approved back copy, vendor geometry/export profile, and physical 100% proof.
