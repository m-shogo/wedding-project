# V5 history Q18 binary-safe promotion

Date: 2026-08-08
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Visible problem

Current `77:422 / IA_HISTORY_MEMORY_PHOTO` still used a visibly blocky/pixelated waterfront placeholder. The role was a dominant history photograph, so its quality/provenance remained one of the three explicit V5 dominant-photo gates.

## Source and verified derivative

Master:
- `05_HISTORY_WATERFRONT_DUMMY.png`
- Drive ID `1LO9rwdFuWMD2TZvSa6efn-gjbdyRBYt3`
- `2,201,647 bytes`

Role-sized derivative:
- `RURUBU_V5_05_HISTORY__FIGMA_1356x560_Q18_SINGLECALL.jpg`
- Drive ID `1ndvJShFDKPO6OmUD3JeIRvPwpS8V1v8x`
- `1356 × 560`
- `29,582 bytes`
- SHA-256 `f6642e7fd43e5058221bf6937d3e8428d8e2b89c35196ec43570aed4f8dd24da`
- exactly `2×` target geometry `678 × 280`

The derivative was not regenerated in this run because it already met the declared dimension floor and its visible quality could be tested directly.

## Hypothesis

If the exact Drive-readback Q18 bytes can be transferred without truncation, the intended waterfront source should materially outperform the old Current placeholder while preserving the existing history layout, caption, crop box, native text and reading order.

Expected improvement:
- sharper dominant history photograph
- clearer waterfront/path/light/mountain detail
- source identity and role-sized derivative evidence closed
- no layout rewrite required

Possible regression:
- Q18 compression could still show artifacts at natural size
- new photograph could pull too much attention from the timeline or memory-spots section
- a corrupted inline payload could create the wrong image despite correct node targeting

Required adoption evidence:
- exact encoded and decoded length guards
- duplicate-frame Figma image hash
- detail and whole-spread screenshots
- Current promotion only after duplicate passes
- post-promotion structure QA
- Drive ID → node ID → image hash record

## Failed/blocked methods

### External upload — rejected repeated blocker

`Figma.upload_assets` provided a submit endpoint, but the execution environment again could not resolve `mcp.figma.com` for the required POST. This matches the prior blocker fingerprint. Per the two-strike rule, this route was not retried further.

### One-shot manually pasted base64 — rejected

A single `use_figma` attempt using a manually copied long base64 string failed with `Invalid base64 string`. Figma reported an atomic failure, so no canvas mutation occurred.

Root cause: very long hand-copied payloads are not a reliable binary transport boundary.

## Changed method — verified

The exact local bytes fetched from Drive were base64-encoded and split into six deterministic chunks:
- `7000`
- `7000`
- `7000`
- `7000`
- `7000`
- `4444`

Each chunk was staged in document-root shared plugin data under stable namespace `rurubu_v5_binary`. Before any image creation the runtime verified:
- joined base64 length = `39,444`
- decoded byte length = `29,582`
- JPEG SOI = `FF D8`
- JPEG EOI = `FF D9`

Only then was the image created.

## Rollback-safe prototype

Comparison frame:
- `383:2 / V5_HISTORY_Q18_DRIVE_DERIVATIVE_TEST_2026_08_08`

Comparison semantic target:
- `383:140 / IA_HISTORY_MEMORY_PHOTO`

Verified image hash:
- `539c259be8036b481d06b4f76db9a39b407d90e8`

Current remained untouched during reconstruction and first screenshot QA.

## Three-scale QA

### Actual-size/detail — PASS for dummy-design QA

Natural node screenshot: `678 × 280`.

Visible result:
- sunset gradient remains smooth enough for dummy design
- mountain/horizon edge is legible
- waterfront rocks/path are distinct
- path lights remain individually readable
- right tree/building edge has materially more detail than the old blocky Current source

### Reading/page — PASS

In comparison spread `383:2`, the intended order remains:
`OUR HISTORY` → timeline → history hero → caption → `MEMORY SPOTS / MINI MAP`.

The new image is stronger but does not break the hierarchy.

### Whole-spread — PASS

The right-page history lead now reads as deliberate travel editorial photography instead of a low-resolution placeholder. The left profile page and lower memory section retain their prior balance.

## Current promotion

After the duplicate passed, the verified IMAGE fill was copied to Current:
- Current node `77:422`
- previous hash `1bfd7f1fa601206bfed1594a140b40554e85d77a`
- promoted hash `539c259be8036b481d06b4f76db9a39b407d90e8`

No text, geometry or unrelated image nodes were modified.

## Post-promotion structure QA

Verified:
- Current inside `77:290` still exists with semantic name intact
- native text nodes in inside frame: `92`
- IMAGE-fill nodes in inside frame: `9`
- history node remains named `IA_HISTORY_MEMORY_PHOTO`
- history geometry remains `678 × 280`
- fold guide `77:288` remains visible
- rollback outer `59:2` remains present
- rollback inside `59:178` remains present
- comparison `383:2` remains present

## Result

`V5-05 / PHOTO_ROLE_PASS / ROLE_COMPLETE / DOMINANT_PHOTO_PASS`

Ledger counts advance:
- intended source applied `2 → 3`
- PHOTO_ROLE_PASS `1 → 2`
- ROLE_COMPLETE `1 → 2`
- dominant pass `1/3 → 2/3`

The remaining dominant blocker is cover hero `77:148`.

## Learning state

**PROTOTYPED → VERIFIED for this binary-transfer case.**

Do not promote chunked shared-plugin-data transport into a universal project rule yet. It is a successful fallback for a bounded binary payload after direct upload fails, but should be tested on another role before broader promotion.

Reusable candidate lesson:
> For small verified Drive derivatives whose direct upload endpoint is unavailable, deterministic chunk staging plus joined-length/decoded-length/file-marker guards can preserve exact binary integrity better than a single manually pasted payload. Always apply to a duplicate first and screenshot-QA before Current promotion.

## Next application

1. Prioritize the final open dominant role `77:148 / IMG_HERO`.
2. Use its existing master/accepted Drive derivative if a quality-passing role-sized derivative already exists; regenerate only for a concrete defect.
3. If binary fallback is necessary again, use deterministic chunk staging rather than manual one-shot payload copying.
4. Keep V6 production blocked until V5 reaches the full dummy-design gate.
