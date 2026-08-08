# BOARDING PASS — AI/template cleanup QA — 2026-08-08

Status: `MEANINGFUL_DESIGN_QA_ADVANCE / NATIVE_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- Start `main`: `f909e6fe14bb77f8444b3693f09b813124554ef1`
- Write-time `main`: `f909e6fe14bb77f8444b3693f09b813124554ef1`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED`
- Figma: `P2PtpMyhyZqHYe1ZBBCD13`, production front `8:5 / FRAME_FRONT`
- Drive: `03_航空チケット風_エスコートカード`, folder `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql`
- RURUBU/るるぶ scope was not read or modified.

## Highest-value visible defect

Live front still presented plausible but non-authoritative passenger/travel facts and decorative airline language as if final: a realistic Japanese guest name, `YOKOHAMA → HAPPINESS`, `GATE W24`, `S&S WEDDING AIRLINES`, a route-plane icon, red destination stamp, and generic `VALID FOR ONE UNFORGETTABLE JOURNEY · NON-TRANSFERABLE` filler. These made the piece read like an AI-generated airline-ticket template rather than an intentionally authored wedding escort card and could be mistaken for confirmed data.

## Rollback proof

Before production mutation, cloned the full `1200 × 550` front into `99_QA`:

- `15:2 / QA_BOARDING_FRONT_PRE_AI_CLEANUP_2026_08_08`

No deletion, flattening, raster replacement, or destructive crop was used.

## Figma change

Preserved the ticket geometry, perforated stub, date, time, native typography and editable structure, while removing unsupported decorative/fake content:

- header airline fiction → `WEDDING RECEPTION · ESCORT CARD`;
- plausible passenger name → `[氏名 · DUMMY]`;
- route values → `[FROM · DUMMY]` / `[DEST · DUMMY]`;
- gate → `[GATE · DUMMY]`;
- venue → `[VENUE · DUMMY]`;
- stub roman name → `[ROMAN NAME · DUMMY]`;
- table value → `--` pending authoritative assignment;
- generic journey microcopy removed;
- header plane, route plane, route line, red destination stamp and stamp text hidden non-destructively.

The first placeholder pass exposed a collision between long semantic dummy strings in the route row. Screenshot QA caught it; production was immediately corrected to shorter explicit dummy tokens and the route line was suppressed.

## Screenshot QA

Post-fix whole-item render: `1200 × 550` at natural size.

Verified visually:

- no FROM/DEST collision after correction;
- passenger field remains dominant;
- stub remains clearly detachable and table-led;
- date/time hierarchy remains intact;
- fake stamp/plane clutter no longer competes with variable information;
- no plausible guest identity or fake gate/venue/route is presented as final.

## Structural readback

- production frame: `1200 × 550`, `clipsContent=true`;
- native text nodes: `23`;
- explicit dummy text remains native editable text;
- hidden non-destructive decoration: `8:26`, `8:34`, `8:35`, `8:71`, `8:72` all `visible=false`;
- rollback proof `15:2` exists at `1200 × 550`;
- no flatten/raster conversion introduced.

## Drive

Drive metadata was read live and matched the recorded folder ID. Drive changes: `0`; no asset defect required regeneration.

## Deferred finalization

`DEFERRED_FINALIZATION`: final guest names, table assignments, confirmed route/venue/gate semantics if retained, vendor trim/bleed/safe-area contract, actual-size physical proof, final export preflight.

## Next

Continue BOARDING PASS with back-side whole/reading/detail quality audit. If no major defect remains after front/back audit, promote to `DESIGN_QA_PASS_WITH_PLACEHOLDERS` and move to 青春ふたりきっぷ rather than micro-polishing the front.
