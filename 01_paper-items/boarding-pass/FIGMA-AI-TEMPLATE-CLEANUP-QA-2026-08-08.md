# BOARDING PASS — AI/template cleanup QA — 2026-08-08

Status: `DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- Initial cleanup start `main`: `f909e6fe14bb77f8444b3693f09b813124554ef1`
- Back-side completion run start `main`: `be83752141a6487c70773c58675c627c0cd39ba0`
- Back-side write-time `main`: `be83752141a6487c70773c58675c627c0cd39ba0`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED`
- Figma: `P2PtpMyhyZqHYe1ZBBCD13`
  - production front `8:5 / FRAME_FRONT`
  - production back `8:73 / FRAME_BACK`
- Drive: `03_航空チケット風_エスコートカード`, folder `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql`
- RURUBU/るるぶ scope was not read or modified.

## Front — highest-value visible defect

The live front originally presented plausible but non-authoritative passenger/travel facts and decorative airline language as if final: a realistic Japanese guest name, `YOKOHAMA → HAPPINESS`, `GATE W24`, `S&S WEDDING AIRLINES`, a route-plane icon, red destination stamp, and generic `VALID FOR ONE UNFORGETTABLE JOURNEY · NON-TRANSFERABLE` filler. These made the piece read like an AI-generated airline-ticket template rather than an intentionally authored wedding escort card and could be mistaken for confirmed data.

### Front rollback proof

Before production mutation, cloned the full `1200 × 550` front into `99_QA`:

- `15:2 / QA_BOARDING_FRONT_PRE_AI_CLEANUP_2026_08_08`

No deletion, flattening, raster replacement, or destructive crop was used.

### Front Figma change

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

### Front screenshot / structure QA

Post-fix whole-item render: `1200 × 550` at natural size.

Verified visually:

- no FROM/DEST collision after correction;
- passenger field remains dominant;
- stub remains clearly detachable and table-led;
- date/time hierarchy remains intact;
- fake stamp/plane clutter no longer competes with variable information;
- no plausible guest identity or fake gate/venue/route is presented as final.

Structural readback:

- production frame `1200 × 550`, `clipsContent=true`;
- native text nodes: `23`;
- explicit dummy text remains native editable text;
- hidden non-destructive decoration: `8:26`, `8:34`, `8:35`, `8:71`, `8:72` all `visible=false`;
- rollback proof `15:2` exists at `1200 × 550`;
- no flatten/raster conversion introduced.

## Back — highest-value visible defect

The live back still carried the same fake-airline/template language even after the front was cleaned: `RETURN JOURNEY`, `S&S 1024`, a dashed route with airplane, a large `THANK YOU FOR FLYING WITH US` stamp, and `MEMORY CLASS · ONE WAY TO OUR NEXT CHAPTER`. At whole-item scale this decoration competed with the actual thank-you message and made the reverse feel like a generated airline-ticket template rather than a deliberate editorial print piece.

### Back rollback proof

Before mutation, cloned the full `1200 × 550` production back into `99_QA`:

- `17:2 / QA_BOARDING_BACK_PRE_AI_CLEANUP_2026_08_08`

### Back Figma change

Kept the existing ticket outline, navy side band, thank-you title/body, date/location, native text structure and overall print geometry while subtracting unsupported transport gimmicks:

- `RETURN JOURNEY` → `THANK / YOU`;
- fake code `S&S 1024` → confirmed date folio `24 OCT 2026`;
- route line `8:82` hidden;
- route airplane `8:83` hidden;
- circular airline stamp `8:85` hidden;
- `THANK YOU FOR FLYING WITH US` `8:86` hidden;
- `MEMORY CLASS · ONE WAY TO OUR NEXT CHAPTER` `8:87` hidden.

No node deletion, flattening, image replacement, or destructive crop was used.

### Back screenshot QA

Post-fix whole-item render: `1200 × 550` at natural size.

Verified visually:

- the thank-you message is now the clear first reading target;
- the navy folio creates asymmetry and suite continuity without reading as an airline UI;
- the right side is intentional negative space rather than a field of badges/stamps/icons;
- no fake flight code, route, plane, class, one-way label, or airline stamp remains visible;
- date/location remains subordinate and legible;
- the back no longer relies on decorative objects to create hierarchy.

### Back structural readback

- production frame `8:73 / FRAME_BACK`: `1200 × 550`, `clipsContent=true`;
- native text nodes: `7`;
- visible production text remains native editable text;
- hidden non-destructive nodes: `8:82`, `8:83`, `8:85`, `8:86`, `8:87`;
- rollback proof `17:2` exists at `1200 × 550`;
- no flatten/raster conversion introduced.

## Drive

Drive metadata was re-read live immediately before Git write and matched folder `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql` / `03_航空チケット風_エスコートカード`.

Drive changes: `0`. No screenshot-supported asset defect required regeneration or replacement.

## Completion judgment

Front and back now pass whole-item / reading-scale / detail-scale visual review for the current placeholder stage, retain native editable structure, preserve rollback proofs, and no longer present unsupported guest/travel data as final. Remaining work is formal input / physical production validation rather than a major design defect.

Therefore BOARDING PASS advances to:

`DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`

Do not spend future hourly runs on micro-decoration unless new live evidence reveals a meaningful regression.

## Deferred finalization

`DEFERRED_FINALIZATION`:

- final guest names and romanization;
- final table assignments;
- confirmed venue/gate/route semantics if any of those fields are retained;
- final approved thank-you wording;
- printer trim / bleed / safe-area contract and export profile;
- 100% actual-size physical proof and final export preflight.

## Next

Proceed to `青春ふたりきっぷ` using the same whole / reading / actual-size audit, native placeholder, rollback-safe, screenshot-QA and structural-readback contract.
