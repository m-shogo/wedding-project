# Rurubu V5 — V5-04 bride identity-safe Q30 promotion (2026-08-08)

Status: `VERIFIED / CURRENT_PROMOTED / LEDGER_CLOSED`

## Scope

Rurubu WEDDING V5 only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not modified.

## Authorities reread before action

Project-wide Figma production system, asset-generation memory, AI continuous-learning system, central learning log, project memory, quality-over-legacy decision, Current Status, V5 asset evidence ledger, editorial knowledge base, Rurubu lessons log, V5 operating system, postmortem, and V6 research/asset queue were reread before mutation.

## Visible problem

Current `77:302 / IA_PROFILE_B_PHOTO` used a `128×160` source inside a `122×122` profile role and retained a recognizable generated face. Even if visually attractive, that face could imply that an invented person was the real bride.

## Tested principle

Prefer a non-identifying role crop from a verified high-resolution master before regenerating. Do not accept generation, Drive save, or transport as completion; require duplicate-first visual QA, exact image hash verification, structure QA, Current promotion, ledger update, and Git readback.

## Verified asset

Master:
- Drive ID: `1xOhG8tOmhUclfUchGzFOlrWP2vb9yPfO`
- file: `04_PROFILE_BRIDE_CAFE_DUMMY.png`
- bytes: `2,196,328`

Accepted derivative:
- Drive ID: `1OJLOs_17GCNrED-oUAWtCHknmx0v2cub`
- file: `RURUBU_V5_04_BRIDE_IDENTITY_SAFE__FIGMA_488x488_Q30.jpg`
- dimensions: `488×488`, exactly `4×` the `122×122` role
- bytes: `11,932`
- SHA-256: `cb099eb490d840e07413d246a4b4b9e8f95bdeba2a22199713da108787d287c9`

The crop excludes the face while retaining hair/earring, bridal lace/back silhouette, warm architecture, and the intended elegant travel/cafe atmosphere. It is identity-safe for a dummy-design role and is not presented as the real bride.

## Transport experiment and failures

Two oversized/direct transfer attempts were rejected atomically by encoded-length guards before any canvas mutation:
- an intended `8,000`-character Q30 segment arrived as `7,521`
- a direct Q15 `9,912`-character payload arrived as `9,576`

The method was changed instead of repeating the blocker. Q30 was staged in four bounded shared-plugin-data chunks with exact readback lengths:
- `4000`
- `4000`
- `4000`
- `3912`

Reassembly verified exact base64 length `15,912`, decoded JPEG length `11,932`, and valid JPEG SOI/EOI before image creation.

## Duplicate-first Figma QA

Rollback-safe comparison:
- frame `484:2 / V5_04_BRIDE_IDENTITY_SAFE_Q30_QA_2026_08_08`
- target `484:14 / IA_PROFILE_B_PHOTO`
- comparison image hash `2359f635b4926a83e22ca1f9214e75c709291152`

Three-scale evidence:
- whole spread: PASS — profile hierarchy and overall editorial rhythm remain coherent
- reading/page: PASS — bride role reads clearly beside SHI-CHAN metadata without becoming a false portrait
- actual-size detail: PASS — lace/back/hair remain readable; face is absent; no obvious compression defect at role size

Pre-promotion structure QA:
- comparison native text nodes: `92`
- comparison IMAGE-fill nodes: `9`
- Current native text nodes: `92`
- Current IMAGE-fill nodes: `9`
- comparison fold guide `484:261`: visible
- Current fold guide `77:540`: visible
- rollback outer `59:2`: preserved
- rollback inside `59:178`: preserved

## Current promotion

Current target `77:302` was guarded against stale state before mutation:
- previous hash: `1c6a3d54817e2ca8e25a3d9b700e7ab9cb4ff4fd`
- promoted hash: `2359f635b4926a83e22ca1f9214e75c709291152`
- geometry preserved: `122×122`

Post-promotion whole-spread, left-page reading, and actual-size detail screenshots all passed. Final structure readback confirmed:
- Current image hash `2359f635b4926a83e22ca1f9214e75c709291152`
- native text `92`
- IMAGE-fill nodes `9`
- fold guide visible
- V4 rollback preserved
- comparison `484:2` preserved

## Adoption / learning state

- Identity-safe crop approach for this role: `VERIFIED`
- Four-chunk bounded transfer method for this specific `15,912`-character asset: `VERIFIED`
- General payload threshold or JPEG Q-value rule: **not** promoted to `PROJECT_RULE`

The verified gain is that a good master can often be preserved by a role-specific non-identifying crop, and integrity guards must remain mandatory for binary transport. The exact chunk size and JPEG quality remain evidence-specific.

## Ledger result

V5-04 is now `PHOTO_ROLE_PASS / ROLE_COMPLETE`.

Formal V5 counts after closure:
- intended source applied: `10/11 active`
- PHOTO_ROLE_PASS: `9/11 active`
- ROLE_COMPLETE: `9/11 active`
- dominant: `2/3`

Remaining active roles are V5-01 cover hero and V5-13 dining. V6 production remains gated.