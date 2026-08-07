# V5 FEATURE 01 field subtraction + binary upload loop-break

Date: 2026-08-07
Scope: Rurubu WEDDING V5 only
Status: `PROTOTYPED → VERIFIED / CURRENT_ADOPTED / BINARY_UPLOAD_PATH_STOP_RETRY`

## Authorities read before execution

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `CURRENT-STATUS.md`
- `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`
- `RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`

## A. Dominant-photo transport attempt

### Visible problem

The live V5 dominant-photo gate remains open. `77:24 / BACK_VISUAL_MAIN_MEMORY_PHOTO` is a `472 × 304` box but its live Figma source image is only `176 × 220`, causing obvious blur and destructive upscale in the whole-outer screenshot.

### Changed method tested

To avoid the previously rejected model-visible/base64 transcription route, this run tested a different binary path:

1. Drive metadata readback for accepted derivative `1L-SQiPuNHrCMuTbb_yaf9FNPg5iuf8uN`
2. verified filename `RURUBU_V5_10_BACK_MAIN_TRAVEL_FLATLAY__FIGMA_944x608_Q70_TRANSPORT.jpg`
3. verified `image/jpeg`, `95,542 bytes`, parent folder `1tAvBO9TodEKVHVZnABD73rEPUGG8iu0N`
4. streamed raw Drive file to a mounted local file reference
5. requested a fresh Figma `upload_assets` single-use endpoint targeted directly at semantic node `77:24` with `FILL`
6. attempted raw JPEG POST rather than base64 text transfer

### Result

`BLOCKED / SAME NETWORK FINGERPRINT`

The raw POST failed before Figma placement with:

`curl: (6) Could not resolve host: mcp.figma.com`

The current Figma node was not mutated. `77:24` remains on hash `2cfd19cf1701db58039a4fc645e4279832ec465a` and intrinsic source size `176 × 220`.

### Loop-break decision

This DNS fingerprint has now been observed enough times that it must not be retried from the same execution network merely with a fresh single-use URL. Future work must use a genuinely different transport capability or continue non-blocked V5 work. No photo-role count or intended-source-applied count was advanced.

## B. FEATURE 01 full-field subtraction experiment

### Visible problem

On the front cover, `FEATURE_BOX_1 / 77:209` formed a `430 × 74` saturated pink field behind `01 思い出スポット / SPECIAL GUIDE`. At whole-cover scale it became the strongest object below the hero image, despite being only one of six cover lines. This produced a web-dashboard/CTA-bar silhouette and competed with the hero photograph and masthead.

### Hypothesis

Keep the semantic feature number and native text, but remove the large color field. If the first feature is expressed as the same direct editorial type rhythm as the remaining cover lines—with only the numbered circle carrying the accent color—the cover should retain hierarchy without a CTA-like bar.

Expected improvement:
- less Web UI/card feel
- stronger hero-photo authority
- more coherent six-feature editorial rhythm
- reduced color-field area without losing navigation

Possible regression:
- feature 01 could lose too much emphasis
- navy copy on pale-blue paper could become weak at actual size
- the number circle could look detached from its text

Evidence required:
- rollback-safe duplicate comparison
- whole-outer screenshot
- front-cover reading/detail screenshot
- native-text/semantic-node audit
- rollback/comparison preservation

### Prototype

Created comparison frame:

- `345:2 / V5_OUTER_FEATURE01_FIELD_SUBTRACTION_TEST_2026_08_07`

Comparison mutations only:
- `345:193 / FEATURE_BOX_1`: visible → false
- `345:196 / FEATURE_TXT_1`: native text preserved, fill → dark navy
- `345:194 / FEATURE_NO_1`: accent circle preserved as pink
- `345:195 / FEATURE_NO_TXT_1`: native white number preserved

No characters, image fills, crop, geometry, hero content, masthead, date badge, fold guide, or rollback frames were changed.

### Three-scale result

`VERIFIED / ADOPTED`

Whole-item:
- the lower front cover no longer contains one oversized CTA-like color bar
- the hero photograph and masthead regain clearer visual dominance
- the six cover lines read as one editorial index rather than one button plus five secondary links

Reading/page:
- feature 01 remains the first and clearest entry because the pink `01` circle is retained
- direct dark type aligns visually with the other feature entries
- feature 02 and the route marker retain their distinct semantic jobs

Detail/actual-size proxy:
- `思い出スポット / SPECIAL GUIDE` remains readable on the pale-blue background
- no clipping, reflow, text loss, or accidental overlap was observed

### Current adoption

Applied the verified comparison to Current:

- `77:209 / FEATURE_BOX_1`: visible → false
- `77:212 / FEATURE_TXT_1`: native text preserved, dark navy fill
- `77:210 / FEATURE_NO_1`: pink circle retained
- `77:211 / FEATURE_NO_TXT_1`: white native number retained

Preserved evidence:
- comparison frame `345:2`
- V4 outer rollback `59:2`
- V4 inside rollback `59:178`
- provisional fold guide `77:540`

Structural post-check:
- outer native text nodes: `85`
- inside native text nodes: `92`
- `77:212` characters unchanged: `思い出スポット\nSPECIAL GUIDE`
- dominant image hashes unchanged:
  - cover hero `77:148`: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
  - back main `77:24`: `2cfd19cf1701db58039a4fc645e4279832ec465a`
  - history `77:422`: `1bfd7f1fa601206bfed1594a140b40554e85d77a`

## Learning status

The specific V5 change is `VERIFIED` and adopted. The generalized rule is **not** promoted to `PROJECT_RULE` from this single case.

Candidate lesson:

> When one item in a multi-entry editorial index is emphasized by a large saturated field, test whether hierarchy can be preserved with number/typographic emphasis alone. A full-width field should survive only if it carries a distinct semantic role, not merely because it is the first item.

Next application:
- do not continue decorative micro-polish ahead of dominant-photo repair
- do not retry the same `mcp.figma.com` DNS upload path from the same runtime
- next safe run should either use a genuinely different binary placement capability or continue a bounded, evidence-backed V5 typography/crop/identity task while keeping V6 gate closed
