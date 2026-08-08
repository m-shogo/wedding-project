# V5-01 Cover Hero — Q15 runtime transport boundary audit

Date: 2026-08-08
Status: `PROTOTYPED / TRANSPORT_METHOD_REJECTED / CURRENT_UNCHANGED`
Scope: Rurubu WEDDING V5 only

## Authority refresh

Before acting, the project-wide Figma production system, asset-generation memory, continuous-learning system, design-learning feedback log, project memory, quality-over-legacy decision, Current Status, recent cover-hero binary-safe run, and live Figma/Drive evidence were re-read. V6 production remains gated behind verified V5 dummy-photo/design completion.

## Visible problem

`V5-01 / 77:148 / IMG_HERO` remains the only active photo-role blocker and final dominant-photo blocker. Current is still below the quality target. The Q60-derived Q15 binary-safe candidate is Drive-verified and visually cleaner than the rejected Q7/Q12 ladder, but it still needs an exact Figma staging placement and three-scale screenshot QA before any promotion.

## Verified source

Q15 candidate:
- Drive ID: `1YuLuYFCnWl6QVU6g9Bfw10WdJG9p0xD4`
- filename: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q15_BINARYSAFE.jpg`
- dimensions: `1330 × 1220`
- bytes: `55,606`
- SHA-256: `6cbd40bd5707c3339b0893c7a724dba2825de0a0043322f3e1ebb4086e82f45a`
- base64 encoded length: `74,144`

Google Drive metadata/readback was repeated in this run and still matches the recorded values.

## Experiment A — host plugin-data capability

### Hypothesis

Persisting one exact bounded base64 chunk at a time on staging node `469:132` could avoid the already-rejected large-payload transport shapes.

### Result

1. `node.setPluginData(...)` was attempted first and rejected by the host runtime as unsupported. The failed Figma script was atomic.
2. Global `figma.setSharedPluginData(...)` was also rejected because that global method does not exist in this runtime. Atomic failure; no visible image mutation.
3. Correct node-scoped `node.setSharedPluginData(namespace,key,value)` succeeded with an exact 4,000-character `c0` chunk and exact same-call readback.

This proves the node-scoped shared-plugin-data API itself works for a bounded payload. It does **not** prove the full image can be transported safely.

## Experiment B — model-visible 4,000-character chunk integrity

The next single 4,000-character chunk was sent through the same model-visible call path with an exact pre-write length guard.

Expected: `4,000` characters.
Observed: `3,998` characters.

The guard threw before shared data or image mutation. No visual Current/staging fill change occurred.

### Decision

`REJECTED` for continued manual/model-visible base64 transcription.

The previous run had already shown truncation at 15k and 10k payload classes. This run proves that even the apparently successful 4k class cannot be assumed reliable when the bytes are manually represented through model-visible tool arguments. Continuing would create false confidence and excessive corruption risk.

## Experiment C — direct public raw fetch inside Figma runtime

To avoid manual transcription entirely, a read-only test attempted to fetch a public `raw.githubusercontent.com` text file directly inside `use_figma`.

Result: `ReferenceError: fetch is not defined`.

No mutation occurred.

### Decision

`REJECTED / RUNTIME_UNAVAILABLE` for this host.

## Current visual comparison note

Fresh screenshots were taken for:
- Current outer `77:18`
- preserved dense clean-room outer `413:2`

Observed:
- Current remains cleaner, calmer, and more readable, with stronger wedding identity and less trade-dress imitation, but its front cover is comparatively sparse.
- `413:2` is materially more travel-magazine-like in cover density and issue/coverline rhythm, but its magenta field, stacked kana treatment, strong issue badge, and vertical yellow cover device are too loud and risk feeling too close to proprietary magazine trade dress if copied literally.

This comparison supports a future hybrid principle test: borrow *editorial density and coverline hierarchy*, not exact commercial silhouettes, color blocks, or logo devices. No Current change was made from this observation.

## Failure / regression check

- Current `77:148` remains unchanged.
- staging image fill was not changed.
- PHOTO_ROLE_PASS remains `10/11`.
- ROLE_COMPLETE remains `10/11`.
- dominant-photo pass remains `2/3`.
- V6 production gate remains closed.
- the only successful mutation was harmless shared-plugin-data test storage on staging; it is not completion evidence.

## Learning state

### Tested principle

Exact guards must verify the actual transport representation, not merely the source asset or intended chunk size.

### Result

`PROTOTYPED → REJECTED` for model-visible manual binary transcription, even at 4k-class chunks.

### Not promoted

This is not automatically a PROJECT_RULE about all Figma binary transport. It is specific evidence about the current host/model-visible path.

## Next safe application

Do not continue hand-copying the remaining Q15 base64 chunks. Use a genuinely binary-safe path that passes a file reference or raw bytes without model-visible transcription. Until that path is available, continue rollback-safe editorial/typographic comparison work that does not require new raster transport, while keeping V5 completion counts unchanged.
