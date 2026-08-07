# V5 history Q18 transport blocker + Hawaii fidelity V3 study

Date: 2026-08-08
Scope: Rurubu WEDDING V5 only. No passport / boarding pass / 青春ふたりきっぷ / ADD item changes.

## Authorities reviewed before work

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `CURRENT-STATUS.md`
- `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`
- `RURUBU-MAGAZINE-EDITORIAL-DESIGN-KNOWLEDGE-BASE.md`
- `RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`
- V6 current status, reference analysis, and asset queue

## Current truth confirmed

V5 remains at `PHOTO_ROLE_PASS 1/12`, `ROLE_COMPLETE 1/12`, and dominant-photo pass `1/3`. The unresolved dominant roles remain cover hero `77:148` and history `77:422`.

The history target `77:422 / IA_HISTORY_MEMORY_PHOTO` still visibly shows the old low-detail waterfront derivative in live Figma.

## Verified Drive derivative

- file: `RURUBU_V5_05_HISTORY__FIGMA_1356x560_Q18_SINGLECALL.jpg`
- Drive ID: `1ndvJShFDKPO6OmUD3JeIRvPwpS8V1v8x`
- MIME: `image/jpeg`
- bytes: `29,582`
- dimensions: `1356 x 560`
- target node: `77:422`
- target box: `678 x 280`
- derivative is exactly 2x the target box dimensions

Drive metadata/readback succeeded. This is still not counted as Figma completion.

## Safe comparison setup

Created rollback-safe duplicate inside spread:

- frame: `383:2 / V5_HISTORY_Q18_DRIVE_DERIVATIVE_TEST_2026_08_08`
- duplicate target: `383:140 / IA_HISTORY_MEMORY_PHOTO`
- Current `77:290` and target `77:422` were not modified.

## Transport methods tested

### Method A — Figma upload URL + external POST

Hypothesis: current `upload_assets` presigned submit flow might bypass the older import route.

Result: rejected / blocked.

Observed failure:

`curl: (6) Could not resolve host: mcp.figma.com`

This reproduces the known container DNS blocker. It was not retried after confirmation.

### Method B — `figma.createImageAsync()` with Drive URL

Hypothesis: direct Figma runtime URL import could avoid the external POST.

Result: rejected / unsupported.

Observed failure:

`createImageAsync is not a supported API`

Atomic failure; no canvas mutation.

### Method C — runtime `fetch()` + `figma.createImage(bytes)`

Hypothesis: runtime fetch could retrieve the verified Drive derivative, then use the already-proven `createImage(bytes)` path.

Result: rejected / unsupported in this execution runtime.

Observed failure:

`runtime fetch unavailable`

Atomic failure; no canvas mutation.

## Decision

Do not keep retrying the same binary-transport family during this run. Preserve `383:2` as comparison evidence and continue other safe work. History remains OPEN and the V5 ledger is intentionally unchanged.

The next binary method should be the previously proven in-runtime base64 decode + `figma.createImage(bytes)` route, but only when the derivative bytes can be injected into a bounded Figma invocation without reusing the blocked upload/fetch paths.

## Reference research refreshed

Official JTB source rechecked:

- `https://books.jtbpublishing.co.jp/e-book/60001-202506145525-000/`
- release: 2025-06-05
- official description explicitly says the Hawaii '26 cover was renewed and emphasizes many photographs, dense current information, and maps.
- normal edition size confirmed elsewhere on the official JTB site as 25.7 x 21 cm.

The project does not copy the commercial cover as production art. The reference is used only to study hierarchy, density, overlap, framing, and scan rhythm.

## Hawaii cover fidelity study V3

Visible problem in V2 (`377:40`):

- still read too much like a generated template
- bottom labels were pill-shaped UI elements
- hero/photo collage felt too separated vertically
- the cover lacked the controlled overlap and photo dominance associated with Japanese travel-guide covers

Hypothesis:

Increasing hero dominance and photo overlap while subtracting bottom pill plates should produce a more magazine-like, less Web-UI composition without adding decorative noise.

Safe prototype:

- `384:2 / V5_RURUBU_HAWAII26_FIDELITY_STUDY_V3_2026_08_08`
- cloned from V2; Current V5 untouched
- hero enlarged/repositioned
- lower three-photo strip pulled upward to overlap the hero zone more strongly
- bottom white pill plates hidden; native caption text preserved directly on the color field
- supplement badge and issue information rebalanced
- all layers remain editable native Figma nodes; no flattened final labels

## Screenshot review

Whole-item / thumbnail:

- V3 has a clearer dominant hero and stronger cover silhouette than V2.
- removal of the three bottom pills reduces Web-UI feel.
- photo overlap now reads more like editorial collage than stacked sections.

Reading scale:

- left feature copy, hero, vertical hook, lower photos, and supplement badge form a more continuous reading path.
- the current W/E/D series block and large twin-ellipse title field still feel synthetic and remain the weakest reference-study devices.

Actual-size/detail:

- native caption text remains legible and editable.
- no Current semantic node or rollback evidence was destroyed.

## Status

- history Q18 derivative: `DRIVE_READBACK_VERIFIED / FIGMA_IMPORT_BLOCKED / NOT_ROLE_COMPLETE`
- Hawaii fidelity V3: `PROTOTYPED / VISUALLY_BETTER_THAN_V2_IN_HERO_OVERLAP_AND_ANTI_UI / NOT_PROMOTED_TO_CURRENT`
- V5 ledger: unchanged
- V6 production gate: still closed

## Learning

1. A transport method is not new merely because a different URL is used; external upload DNS failure and unavailable runtime network must be treated as one blocked capability family.
2. Once the same capability family is proven blocked, switch to a byte-injection method or continue safe editorial work.
3. In a dense travel-guide cover, subtracting UI containers can actually make the page feel *more* abundant because photography and typography interact directly rather than being partitioned into cards.
4. The current Hawaii-study title/brand area remains too synthetic. The next fidelity pass should improve title silhouette and series-mark behavior without copying proprietary artwork or turning the study into production art.

## Next safe actions

1. Use the proven bounded base64-decode + `figma.createImage(bytes)` route for history on `383:140`, then run whole/read/detail QA before touching `77:422`.
2. If history passes, promote only that verified fill to Current and update ledger/status with Drive ID -> node ID -> image hash evidence.
3. Continue Hawaii fidelity study only as research/comparison until V5 dummy-photo gate passes; do not start V6 production placement early.
