# BOARDING PASS — zero-reuse clean-room rebuild

Date: 2026-08-15
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V5_SELECTED_FAMILY / LEGACY_PRESERVED / LONG_COPY_STRESS_PASS / NOT_PRINT_READY`

Authority: latest `main`, Current `docs/automation/non-rurubu-figma-quality-current.md`.
Figma: `P2PtpMyhyZqHYe1ZBBCD13`.
Drive: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`.

## Clean-room inputs

Only non-visual facts/constraints were manually re-authored: `1200×550` front/back, `2026.10.24`, ceremony `14:10`, `YOKOHAMA`, and native semantic roles for guest name, romanized name, reception, table and final message. No old frame, layout group, ornament, barcode, crop, image asset or old SVG was copied into the clean-room rebuild.

Hybrid split: variable content = native text; fixed abstract graphics = newly authored editable SVG/vector; generated/raster imagery = none; variable facts baked into SVG = 0. Drive writes 0.

## Rejected first attempt

`32:2 / V2_REJECTED_AUTHORITY_CONTAMINATION_RISK_2026_08_15` is preserved. It began from blank frames but its color-field language overlapped too closely with visual fingerprints described in mandatory historical QA text. It is not a candidate.

## Independent V3

Page `33:2 / V3_ZERO_REBUILD_2026_08_15`.

- front `33:3 / V3 / FRONT / EDITORIAL ENTRY SLIP`
- back `33:34 / V3 / BACK / THANK-YOU FIELD`
- SVG `33:10 / VECTOR / EDITORIAL RIBBON TRACE`
- SVG `33:40 / VECTOR / MEMORY ORBIT`

V3 was authored from blank frames without reusing old production nodes/assets.

Structural readback:

- front: `1200×550`, 16 native text, IMAGE 0, outside visible text 0, `clipsContent=true`;
- back: `1200×550`, 5 native text, IMAGE 0, outside visible text 0, `clipsContent=true`.

Long-copy proofs:

- `34:2 / QA / V3 FRONT LONG COPY STRESS_2026_08_15`;
- `34:33 / QA / V3 BACK MESSAGE LONG COPY STRESS_2026_08_15`.

Front stress after repair: long guest text bottom `285`, rule `y=305`, ledger `y=330`; outside visible text 0. Back stress body bottom `365`, orbit begins at `x=730`; outside visible text 0. Stress proofs are retained hidden after QA.

## Legacy comparison after V3 completion

Only after V3 structural QA passed were retained production `8:5 / 8:73` viewed at actual `1200×550`.

- V3 back was visually competitive/preferred.
- V3 front was cleaner and more editorial but did not clearly beat the retained front in immediate physical ticket-object identity.
- Therefore V3 did not receive `SELLABLE_VISUAL_QA_PASS` as a complete family.

## Preserved V4 experiment

`37:2 / V4_REJECTED_POST_COMPARISON_SIMILARITY_RISK_2026_08_15` is preserved as a rejected experiment. It strengthened ticket-object identity, but after the legacy comparison its large side-field treatment was too close to a historical field fingerprint to count as strong clean-room evidence.

## Independent V5 — selected clean-room family

Section: `39:21 / SELECTED CLEANROOM / BOARDING PASS / V5 OFFSET COUPON / LEGACY PRESERVED / 2026-08-15`.

V5 was started from a blank frame without opening retained production or V3 during construction. It used only the verified facts/semantic roles above.

### Front

- `39:22 / V5 / FRONT / OFFSET TYPOGRAPHIC COUPON`
- size: `1200×550`
- native text: `12`
- visible native text: `12`
- IMAGE fills: `0`
- outside visible text: `0`
- `clipsContent=true`
- new editable vector roles include `VECTOR / EDITABLE GUILLOCHE SIGNATURE`, `VECTOR / EDITABLE ENTRY ROSETTE`, print boundary and event-ledger rail.
- four corner cut/notch roles plus a restrained outer print boundary create physical ticket semantics without a detachable old-style stub or fake route/gate/class data.
- the right information area was initially boxed; actual-size review found the box too UI-card-like, so the box stroke was removed and replaced by an open ledger with one functional rust rail.

### Front long-copy stress

- `40:2 / QA / V5 FRONT LONG COPY STRESS / 2026-08-15`, hidden after QA.
- first stress exposed a real regression: a long guest name collided with the romanized-name role.
- repair: production and stress now use native `LAYOUT / GUEST IDENTITY` auto-layout; guest text uses `HEIGHT` auto-resize and romanized-name follows structurally rather than by fixed absolute y-position.
- repaired long name renders without overlap; long reception/table/final-note placeholders remain contained; outside visible text `0`.

### Back

- `41:2 / V5 / BACK / THANK-YOU COUPON`
- authored as a separate blank frame in the same V5 family, not by duplicating retained production or V3 back.
- size: `1200×550`
- native text: `6`
- visible native text: `6`
- IMAGE fills: `0`
- outside visible text: `0`
- `clipsContent=true`
- fixed art uses a newly authored editable `VECTOR / EDITABLE MEMORY ORBIT V5`; final thank-you copy remains native.

### Back long-copy stress

- `41:19 / QA / V5 BACK LONG COPY STRESS / 2026-08-15`, hidden after QA.
- long Japanese thank-you copy wraps naturally inside the native message role with outside visible text `0` and no collision with date/location/closing copy.

## Three-scale visual QA

V5 front:

- thumbnail / 500 px: PASS;
- reading / 1000 px: PASS;
- actual size / `1200×550`: PASS;
- long-copy actual-size stress: PASS after auto-layout repair.

V5 back:

- thumbnail / 500 px: PASS;
- reading / 1000 px: PASS;
- actual size / `1200×550`: PASS;
- long-copy actual-size stress: PASS.

## Completion-only comparison with retained designs

Only after V5 front/back construction, three-scale QA and stress QA were complete were retained front/back and V3 viewed for comparison.

- retained front `8:5` remains a valid historical/rollback artifact but its visual grammar is not reused by V5;
- V3 front `33:3` is cleaner than retained production but reads more as a flat editorial card at whole-item scale;
- V5 front carries stronger physical-paper/ticket identity through edge semantics, print boundary, open information ledger and editable guilloche without copying the retained detachable-field layout;
- retained back `8:73` and V3 back `33:34` remain preserved; V5 back provides the strongest front/back family cohesion with the selected V5 front while keeping semantic copy native.

Decision: V5 is the first complete clean-room family in this item that clearly beats the retained front/back as a combined sellable direction while remaining structurally editable.

## Asset / Drive state

Drive authority live-readback: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`.

- generated raster imagery: 0;
- Drive writes: 0;
- newly authored SVG/vector roles live natively/editably in Figma;
- no final names, venue fields, table assignments, QR, or other variable facts are baked into vectors/images.

## Preserved history

Retained production `8:5 / 8:73`, V2 rejection, V3, V4 rejection, prior QA and rollback/history remain intact. V5 selection does not delete or overwrite previous design work.

## Decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V5_SELECTED_FAMILY / LEGACY_PRESERVED / LONG_COPY_STRESS_PASS / NOT_PRINT_READY`.

Remaining deferred work is final factual copy/physical printer proof only. Next clean-room target is 青春ふたりきっぷ, started from a blank frame without visual reference to its retained production.
