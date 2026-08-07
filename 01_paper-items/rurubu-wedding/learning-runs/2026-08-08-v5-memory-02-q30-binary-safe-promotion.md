# V5-07 Memory Spot 02 — Q30 binary-safe promotion

Date: 2026-08-08
Scope: Rurubu WEDDING V5 only
Role: `V5-07 / IA_MEMORY_2_PHOTO`
Current target: `77:438`
Comparison frame: `421:2 / V5_07_OLD_TOWN_DERIVATIVE_TEST_2026_08_08`
Comparison target: `421:156`

## Authorities

The project-wide production system, asset-generation memory, continuous-learning system, feedback log, project memory, quality-over-legacy decision, Current Status, V5 asset ledger, editorial knowledge base, lessons log, V5 operating system/postmortem, and V6 boundary files were re-read before execution.

## Visible problem

The Current semantic node had an IMAGE fill, but the ledger did not prove that the intended Drive source for the old-town role was applied. The role therefore remained `PENDING_FIGMA_IMPORT` and could not count as PHOTO_ROLE_PASS.

## Source / role brief

Master:
- `07_MEMORY_SPOT_02_OLD_TOWN_DUMMY.png`
- Drive ID `1z7pV8BzSaqrvChCbmotTRoEptTaQZMLw`
- 2,591,213 bytes
- vertical old stone-street scene at dusk with warm lamps
- no identifiable person and no final text/logo baked into the image

Target:
- `77:438 / IA_MEMORY_2_PHOTO`
- `88 × 92`
- dummy derivative floor `352 × 368` (`4×` target)

The source was visually inspected before derivation. It has a clear street-axis focal path and enough centered crop tolerance for the small portrait-like target.

## Derivative experiments

A role crop was made from the master and resized to the exact `352 × 368` floor.

Prepared variants:
- Q82 — 32,801 bytes, Drive ID `1VNy7kMe9OjhH5qgc0srE45wx8Y030VhH`
- Q60 — 18,814 bytes, Drive ID `1vwFHLHNqhZ9en_zVtjesTCTXCl2-qEkP`
- Q30 single-call candidate — 12,186 bytes, Drive ID `1ZsLOgZbZWyfYgDfvKvYPqOsbMJrSf1J5`

Accepted dummy-design derivative:
- `RURUBU_V5_07_MEMORY_OLD_TOWN__FIGMA_352x368_Q30_SINGLECALL.jpg`
- `352 × 368`
- 12,186 bytes
- SHA-256 `a957431f3b6177661d03e8ddec93a784a1a7fa86bfa4ecba0cf959ec557939be`

Why Q30 can be accepted here: this is an `88 × 92` small-memory role and the derivative is exactly four times the target dimensions. Visual inspection at source derivative size and the final natural Figma node size showed the intended architecture, lamps and street path remain distinct. This does not establish Q30 as a general project compression rule.

## Transport failure and method switch

`upload_assets` returned a valid single-use `mcp.figma.com` endpoint, but the execution environment again failed DNS resolution. This matched the known blocker fingerprint and was not retried.

Changed method:
1. duplicate Current inside spread
2. guard exact base64 encoded length (`16,248`)
3. `figma.base64Decode()` and guard decoded length (`12,186`)
4. verify JPEG SOI/EOI markers
5. `figma.createImage(bytes)`
6. apply only to duplicate `421:156`
7. screenshot and structure QA
8. promote the verified image hash to Current only after the duplicate passed

Duplicate result image hash:
- `439a719d73f28e8dd2889f2026cccb15f345ec63`

## Three-scale QA

### Whole spread

PASS. The old-town image now reads as a distinct supporting destination under `MEMORY SPOTS / MINI MAP` without upsetting the established history → lead memory → supporting-memory hierarchy.

### Reading/page scale

PASS. The warm, dark old-town image clearly differentiates memory spot 02 from the bright lead coast image and memory spot 03. The small-image sequence remains scannable and the intended destination/story role is clearer than the previous unverified fill.

### Actual-size/detail

PASS for V5 dummy-design QA. At natural `88 × 92`, the central street, lit façades and perspective remain recognizable; no visually damaging JPEG block structure is apparent at the actual node size.

## Structure QA

Before promotion on duplicate:
- semantic target remained `IA_MEMORY_2_PHOTO`
- target geometry remained `88 × 92`
- comparison frame native text nodes: `92`
- IMAGE-fill nodes: `9`
- fold guide `77:288` preserved and visible
- rollback frames `59:2` and `59:178` preserved

After Current promotion:
- Current node `77:438` geometry/name unchanged
- previous Current hash `27ad4cfab8fd579b8452540ce954f8b36edc77fb`
- Current hash `439a719d73f28e8dd2889f2026cccb15f345ec63`
- inside native text nodes `92`
- visible text nodes `57`
- IMAGE-fill nodes `9`
- fold guide and both rollback frames preserved
- comparison `421:2` preserved

## Result

`PROTOTYPED → VERIFIED / CURRENT_PROMOTED / PHOTO_ROLE_PASS / ROLE_COMPLETE`

This advances V5 counts from `2 / 12` to `3 / 12` active PHOTO_ROLE_PASS and ROLE_COMPLETE, and intended-source-applied from `3 / 12` to `4 / 12`.

It does **not** change the dominant-photo count: cover hero remains open, while history and back main remain the two dominant passes.

## Reusable lesson

For genuinely small photo roles, a carefully cropped derivative that meets the required `4×` pixel floor can use stronger JPEG compression than a hero role if—and only if—it passes actual-size visual QA. Compression quality is role-dependent, not a single global number.

Also, when the external binary-upload route repeats the same DNS blocker, switching to a guarded single-call in-runtime image decode is preferable to repeating the blocked network method, provided the encoded payload remains safely inside the Figma execution limit.

## Next application

Proceed to V5-08 and V5-09 using the same bounded small-role workflow, but independently verify each source crop and final actual-size quality. Do not assume the same compression setting or crop works automatically.