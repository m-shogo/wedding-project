# Rurubu V5 — Back Friends Caption JLREQ QA

Date: 2026-08-09
Status: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_PROMOTED`
Scope: Rurubu WEDDING V5 only

## Authorities and boundary

This run followed the project-wide Figma production system, asset-generation memory, continuous-learning system, design-learning feedback log, project memory, quality-over-legacy decision, Rurubu Current Status, asset evidence ledger, editorial knowledge base, lessons log, Production Operating System V2, postmortem/V6 guardrails, and V6 research/asset queue.

No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD item was modified.

V6 production remains gated behind verified `RURUBU_V5_DUMMY_PHOTO_DESIGN_QA_PASS`.

## Visible problem

At actual-size/back-page review of Current outer frame `77:18`, the native caption `77:42 / BACK_VISUAL_FRIEND_2_CAP` rendered the sentence:

`これからも変わらず一緒に遊んでください！`

with an accidental break after `くださ`, leaving only `い！` on the second line.

The copy itself was correct. The defect was the inherited `220 px` text-box width and fixed-height behavior, not insufficient decoration or missing content. If this module were designed from scratch, the two-character orphan would not be chosen when the existing caption footprint can accommodate a clean line without reducing type size.

## Tested principle / hypothesis

Principle tested:
- Japanese typography is reading infrastructure, not decoration.
- Preserve native text and semantic structure.
- Fix hierarchy/line composition before adding containers or visual effects.
- Do not preserve legacy geometry only because it already exists.

Hypothesis:
- widen only the native caption box from `220 px` to `244 px`;
- change `textAutoResize` from `NONE` to `HEIGHT`;
- preserve exact characters, `12 px` type size, position, photo geometry, crop, colors, and all surrounding modules.

Expected improvement:
- remove the orphaned `い！`;
- preserve a natural single-line reading rhythm under Friends 01;
- avoid shrinking text or adding a larger card.

Possible regression:
- the longer line could collide with the neighboring Friends module;
- it could exceed the existing caption/photo footprint;
- auto-height could alter vertical rhythm.

Adoption evidence required:
- whole-item screenshot;
- back-page reading screenshot;
- actual native text geometry/readback;
- unchanged key image hashes, fold guide, rollback, and semantic structure.

## Rollback-safe prototype

Created comparison frame:
- `556:2 / V5_BACK_FRIENDS_CAPTION_JLREQ_QA_2026_08_09`
- back page: `556:3`
- tested caption: `556:26`

Prototype before:
- width: `220 px`
- height: `48 px`
- font size: `12 px`
- `textAutoResize=NONE`
- characters unchanged

Prototype after:
- native width: `244 px`
- auto height: `17 px`
- font size: `12 px`
- `textAutoResize=HEIGHT`
- characters unchanged

Whole-item and back-page screenshots showed the full sentence on one line with no collision, clipping, hierarchy loss, or change to the neighboring Friends 02 caption.

## Current promotion

After the comparison passed, the same bounded change was promoted to:
- `77:42 / BACK_VISUAL_FRIEND_2_CAP`

Current before:
- `220 × 48`
- `12 px`
- `textAutoResize=NONE`

Current after:
- `244 × 17`
- `12 px`
- `textAutoResize=HEIGHT`
- exact copy preserved

A fresh Current whole-item screenshot confirmed the orphan was eliminated without visible regression.

## Structure QA after promotion

Readback from live Current outer `77:18`:
- native text nodes: `85`
- IMAGE-fill nodes: `14`
- caption `77:42`: `x=82`, `y=786`, native `244 × 17`, `12 px`, `textAutoResize=HEIGHT`
- fold guide `77:288 / PROVISIONAL_FOLD_GUIDE`: visible and preserved
- rollback frames preserved: `59:2`, `59:178`
- comparison frame preserved: `556:2`

Key image hashes remained unchanged:
- cover hero `77:148`: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- back main `77:24`: `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Friends 01 photo `77:39`: `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends 02 photo `77:43`: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`

No photograph, crop, image hash, semantic node, fold geometry, factual copy, or provenance record changed.

## Result

**VERIFIED / ADOPTED FOR CURRENT V5.**

The improvement is context-specific evidence that a small native-text geometry correction can be preferable to accepting an accidental Japanese orphan or shrinking type. It does not become a project-wide fixed width rule.

Knowledge state:
`DISCOVERED → PROTOTYPED → VERIFIED`

It is **not** promoted directly to `PROJECT_RULE`.

## Failure / process learning

The first attempted Figma write in this run used a stale connector argument shape (`nodeId` / `execute`) and failed schema validation before execution. The operation was atomic and made no canvas change. The live `figma-use` skill/schema was re-read, the call was corrected to the current `{fileKey, code, description, skillNames}` contract, and the experiment proceeded safely.

Adopted process lesson:
- when a connector write schema rejects an operation, treat it as a tooling-contract mismatch, re-read the live skill/schema, and do not infer that any design mutation occurred.

This is a tooling-process observation, not an editorial PROJECT_RULE.

## Cover hero / V6 gate remains unchanged

The Q60 cover derivative remains a valid Drive artifact:
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- file: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- MIME: `image/jpeg`
- bytes: `155,439`
- parent V5 dummy-photo folder: `1tAvBO9TodEKVHVZnABD73rEPUGG8iu0N`

The known Figma binary-upload/DNS path was not retried in this run.

Official photo gate remains:
- intended source applied: `11 / 11 active`
- PHOTO_ROLE_PASS: `10 / 11 active`
- ROLE_COMPLETE: `10 / 11 active`
- dominant photo pass: `2 / 3`
- only active photo blocker: `V5-01 / 77:148 / IMG_HERO`

Therefore V5 dummy-photo design QA is **not** declared complete and V6 production remains closed.

## Canonical learning-log sync

The available GitHub connector exposes complete-file replacement for existing files rather than an atomic append operation. Because both canonical learning logs are large and partial-read/truncation would risk destructive replacement, this run does not overwrite them unsafely.

This learning-run is the complete, rollback-safe evidence record for later safe synchronization into:
- `docs/wedding-design-learning-feedback-log.md`
- `01_paper-items/rurubu-wedding/RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`

## Next safe application

Continue the V5 actual-size typography/density/fold audit where a concrete visible defect exists. Do not retry the already-repeated cover upload mechanism unless the transport method actually changes. V6 production must remain gated until the cover hero and all final V5 dummy-design evidence genuinely pass.