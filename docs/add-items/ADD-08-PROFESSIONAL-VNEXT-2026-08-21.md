# ADD-08 Professional vNext — 2026-08-21

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / VNEXT_V3_PROMOTED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- start/latest `main` before production/Git writes: `02d650eaf00ec850fb4f361865b7685b0a58bbe4`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma: `xvJH23nWjWAApd3yOwr4y3`
- canonical production root: `1:3 / FRAME_MENU_SUPPORT_A4 / VNEXT TABLE SUNSET`
- Drive authority verified live: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`

## Clean-room inputs carried forward

Only verified non-visual requirements were carried into the rebuild:

- A4 / `1400×1980` working canvas;
- menu/drink information role;
- allergy information role;
- dietary restriction role;
- staff guidance role;
- date/place role;
- 10 mm safe-area concept.

No old production layout, old V2/V3 composition, decoration, rail, icon, crop or generated asset was used as an authoring source.

## V2 — TASTE JOURNEY

Blank-frame candidate:

- `50:3 / VNEXT_SELECTED_CANDIDATE / ADD-08 / TASTE JOURNEY`
- long-copy stress: `51:2`

The short-copy screenshot was materially brighter than retained production, but the realistic long-copy stress exposed a visual failure that a text-vs-text collision check alone did not catch: the expanded staff message entered the large coral/lagoon fixed-art gesture. Text remained technically in-bounds, but the dynamic-copy reading lane no longer had stable visual clearance.

Decision: **do not promote V2**. Preserve it as hidden evidence and switch direction rather than cosmetically patching the same composition.

## V3 — TABLE SUNSET

A materially different blank-frame direction was authored at:

- `52:2 / VNEXT_V3 / ADD-08 / TABLE SUNSET`
- long-copy stress: `52:24`

Emotional brief:

`旅先の食卓で一皿目を待つ期待感 × 南国の夕日とテーブルの温度 × 結婚式の安心できる食事案内`

V3 uses:

- warm cream paper field;
- a single right-side deep-ocean spine;
- one oversized coral plate/sunset gesture with yellow center;
- a lagoon napkin/breeze gesture;
- Japanese-first display typography;
- direct menu/allergy/dietary information lanes rather than cards;
- a large staff-help message with a separate secondary reassurance line.

No fake airline credentials, barcode, route UI, equal cards, shadow, gradient, stock food photo, or generic decorative English copy was introduced.

## Hybrid authoring roles

- variable/final copy: native editable Figma text;
- semantic placeholders: native editable Figma text;
- fixed art: a small number of simple native geometric fields because their internal editability is trivial and structurally clear;
- editable SVG: `0` — no reusable silhouette justified a separate SVG asset in this item;
- generated/composed raster: `0` — screenshot diagnosis did not establish photography/illustration as the quality bottleneck;
- replaceable image role: `0`;
- rasterized variable copy: `0`.

## Long-copy stress

Realistic stress copy was inserted for:

- menu/drink information;
- allergy information;
- dietary restrictions;
- staff guidance.

Initial V3 stress found one real text/text conflict: the expanded staff message reached the secondary reassurance line. The bounded correction moved only `TEXT / FOOT NOTE` to `y=1605`; main hierarchy and art direction stayed unchanged.

Final V3 stress:

- outside visible text: `0`;
- text/text intersections: `0`;
- menu stress bottom: `757`;
- allergy stress bottom: `944`;
- dietary stress bottom: `1169`;
- staff stress bottom: `1565`;
- secondary reassurance y: `1605`.

The fixed plate/spine/napkin art remains outside the primary dynamic-copy lanes, so the V2 visual-occlusion failure is not reproduced.

## Three-scale screenshot QA

V3 was inspected from live Figma renders at all required scales:

- whole-item / 500 px: PASS — title, plate/sunset gesture, information hierarchy and staff CTA remain immediately legible; no admin-dashboard/card reading;
- reading / 1000 px: PASS — Japanese hierarchy, menu/allergy/dietary sequencing and color-role differentiation remain clear;
- actual-size / native `1400×1980`: PASS — type/rule thickness, safe spacing and lower-page rhythm remain credible;
- realistic long-copy stress / 1000 px: PASS after the bounded foot-note correction.

## Mature comparison against retained production

Only after V3 reached the three-scale + stress gate was retained production `1:3` opened for visual comparison.

Retained production remained structurally credible but read quieter, more system-like and less aligned with the current `SUNSHINE DEPARTURE` brief. It also still showed tiny implementation-language residue in guest-facing proof copy. V3 provides a clearer emotional first read, stronger joyful color scale, fewer UI-like information divisions, and more direct semantic placeholders.

Decision: **V3 clearly wins the current Professional vNext brief**.

## Professional Design Council score

V3 provisional/final item score: **89/100**.

- Concept clarity / ownability: `13/15`
- Emotional excitement / pick-up appeal: `14/15`
- Japanese editorial typography: `14/15`
- Composition / hierarchy / rhythm: `13/15`
- Travel / destination warmth without cliché: `8/10`
- Item-specific functionality: `10/10`
- Physical print credibility: `9/10`
- Editability / content resilience: `4/5`
- Family fit without template sameness: `4/5`

No Executive Creative Director, Japanese Editorial, or Print Production veto remained after stress correction.

## Promotion / rollback

Immediately before mutating production, the entire prior canonical root was cloned intact to:

- `53:2 / ROLLBACK / ADD-08 / PRE-VNEXT-PROMOTION / 2026-08-21` (hidden)

V3 was then promoted into canonical root `1:3` while preserving the canonical production node identity.

Post-promotion structure readback:

- canvas: `1400×1980`;
- native text nodes: `13`;
- native text with `textAutoResize=HEIGHT`: `13/13`;
- IMAGE fills: `0`;
- outside visible text: `0`;
- candidate/stress frames retained hidden, not deleted.

A fresh post-promotion screenshot of `1:3` matches the selected V3 visual state.

## Drive / generated asset lifecycle

- generated candidates: `0`;
- adopted generated assets: `0`;
- Drive writes: `0`;
- Drive authority was read back live and unchanged.

No asset lifecycle was started because the mature screenshot diagnosis did not show an image/illustration deficit large enough to justify adding food stock/generation noise.

## Deferred finalization

Keep `NOT_PRINT_READY` until unavailable final inputs are closed, including as applicable:

- final menu/drink wording;
- final allergy/dietary wording approved for the event;
- printer/vendor template and physical proof;
- final production color/profile checks.

These do not block progression of the visual pass.

## Next

Proceed to **ADD-09 Guest Book sign** using the same Professional vNext clean-room rule: factual/physical requirements first, blank-frame authoring, old production only after candidate maturity, three-scale + stress/structure QA before promotion.
