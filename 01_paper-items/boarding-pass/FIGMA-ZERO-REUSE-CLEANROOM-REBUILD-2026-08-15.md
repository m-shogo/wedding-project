# BOARDING PASS — zero-reuse clean-room rebuild

Date: 2026-08-15
State: `SELLABLE_VISUAL_QA_REOPENED / CLEANROOM_V3_STRUCTURAL_PASS / LEGACY_COMPARISON_FRONT_INCONCLUSIVE / LEGACY_PRESERVED / NOT_PRINT_READY`

Authority: latest main `c31b09503bd190bd8cc61b62889f491fb4a71b2b`, Current `docs/automation/non-rurubu-figma-quality-current.md`.
Figma: `P2PtpMyhyZqHYe1ZBBCD13`.
Drive: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`.

## Clean-room inputs

Only non-visual facts/constraints were manually re-authored: `1200×550` front/back, `2026.10.24`, ceremony `14:10`, `YOKOHAMA`, and native semantic roles for guest name, romanized name, reception, table and final message. No old frame, layout group, ornament, barcode, crop, image asset or SVG was copied.

Hybrid split: variable content = native text; fixed abstract graphics = new editable SVG; generated/raster imagery = none; variable facts baked into SVG = 0. `IMAGE_GEN_UNAVAILABLE_THIS_RUN`; Drive writes 0.

## Rejected first attempt

`32:2 / V2_REJECTED_AUTHORITY_CONTAMINATION_RISK_2026_08_15` is preserved. It began from blank frames but its color-field language overlapped too closely with visual fingerprints described in mandatory historical QA text. It is not a candidate.

## Independent V3

Page `33:2 / V3_ZERO_REBUILD_2026_08_15`.

- front `33:3 / V3 / FRONT / EDITORIAL ENTRY SLIP`
- back `33:34 / V3 / BACK / THANK-YOU FIELD`
- SVG `33:10 / VECTOR / EDITORIAL RIBBON TRACE`
- SVG `33:40 / VECTOR / MEMORY ORBIT`

V3 was authored from blank frames without a giant header band, full-height side rail, detachable right stub, barcode, fake airline route/class/gate data or giant date numeral.

Structural readback:

- front: `1200×550`, 16 native text, IMAGE 0, outside visible text 0, `clipsContent=true`;
- back: `1200×550`, 5 native text, IMAGE 0, outside visible text 0, `clipsContent=true`.

Long-copy proofs:

- `34:2 / QA / V3 FRONT LONG COPY STRESS_2026_08_15`;
- `34:33 / QA / V3 BACK MESSAGE LONG COPY STRESS_2026_08_15`.

Front stress after repair: long guest text bottom `285`, rule `y=305`, ledger `y=330`; outside visible text 0. Back stress body bottom `365`, orbit begins at `x=730`; outside visible text 0. Stress proofs are retained hidden after QA.

## Legacy comparison

Only after V3 structural QA passed were retained production `8:5 / 8:73` viewed at actual `1200×550`.

- V3 back is visually competitive/preferred.
- V3 front is cleaner and more editorial but does not yet clearly beat the retained front in immediate physical ticket-object identity.
- Therefore no production promotion and no `SELLABLE_VISUAL_QA_PASS` claim.

## Preserved V4 experiment

`37:2 / V4_REJECTED_POST_COMPARISON_SIMILARITY_RISK_2026_08_15` is preserved as a rejected experiment. It strengthened ticket-object identity, but after the legacy comparison its large side-field treatment was too close to a historical field fingerprint to count as strong clean-room evidence.

## Decision

`SELLABLE_VISUAL_QA_REOPENED / CLEANROOM_V3_STRUCTURAL_PASS / LEGACY_COMPARISON_FRONT_INCONCLUSIVE / LEGACY_PRESERVED / NOT_PRINT_READY`.

Next run should continue BOARDING PASS with another blank-frame direction before progressing to 青春ふたりきっぷ. Retained production remains untouched.
