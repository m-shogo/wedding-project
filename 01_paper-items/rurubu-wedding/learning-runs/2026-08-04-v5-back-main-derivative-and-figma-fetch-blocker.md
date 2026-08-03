# V5 back-main derivative preparation and Figma runtime fetch check

Date: 2026-08-04
Item/version: Rurubu WEDDING V5
Scope: dominant-photo Batch A only

## Authorities read

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- live Drive master and live Figma runtime

## Experiment A — Figma-runtime direct fetch

### Visible problem

The cover hero still requires a quality-passing derivative to reach semantic node `77:148`. Container-side upload to the Figma single-use endpoint is blocked by outbound DNS/network restrictions.

### Hypothesis

The Figma Plugin runtime might provide browser `fetch`, allowing the verified Drive derivative to be retrieved inside Figma without container networking or model-visible base64 transfer.

### Result

`REJECTED / API_UNAVAILABLE`

The live Figma runtime returned:

- `typeof fetch`: `undefined`
- error: `ReferenceError: 'fetch' is not defined`

No canvas node, image fill, crop, text, frame hierarchy, or image hash was mutated.

### Next application

Do not retry runtime `fetch`. Continue with a binary-safe connector-native route or bounded chunk transfer whose integrity is independently checked before image creation.

## Experiment B — V5-10 back-cover main derivative

### Source

- role: `V5-10 / BACK_VISUAL_MAIN_MEMORY_PHOTO`
- Drive master ID: `1bBiAcFfHJ3-Ns1gAKn6Bct-q-w2p-AvD`
- master filename: `10_BACK_MAIN_TRAVEL_FLATLAY_DUMMY.png`
- source dimensions: `1122 × 1402`
- target node: `77:24`
- target box: approximately `472 × 304`
- derivative floor: `944 × 608`

### Visible problem

The live back-cover main role is visibly soft and remains unverified against the intended Drive master. A role-sized derivative did not yet exist in verified Drive storage.

### Crop decision

Four full-width crop windows were compared. The adopted candidate uses source vertical origin `y=450` and height `723`, because it preserves the notebook, rings, passport, map, photographs, fabric, and travel-memory narrative without depending on the camera at the top edge.

### Derivative

- filename: `RURUBU_V5_10_BACK_MAIN__FIGMA_944x608_Q85.jpg`
- dimensions: `944 × 608`
- encoding: JPEG quality 85, 4:4:4
- bytes: `184,920`
- SHA-256: `efd5ca24540507066754def8ea01640ba731bc19bb7d30a50feda50acccbcdf1`
- Drive ID: `1Ysumy3RP-Ju62_at6wF0LleOqb1fiqYq`
- verified parent folder: `1tAvBO9TodEKVHVZnABD73rEPUGG8iu0N`

### Visual QA

`DERIVATIVE_QA_PASS / FIGMA_PLACEMENT_NOT_STARTED`

The derivative is sharp at its native derivative size, retains recognizable travel and wedding-memory objects, contains no generated person or false identity, and has no baked-in project text or credentials.

### Status

`MASTER_DRIVE_VERIFIED / ROLE_DERIVATIVE_CREATED / DERIVATIVE_QA_PASS / DRIVE_READBACK_VERIFIED / FIGMA_APPLIED_PENDING / PHOTO_ROLE_PASS_UNCHANGED`

No photo-role completion is claimed until node `77:24` placement, image-hash evidence, screenshot QA, structure QA, ledger update, and GitHub readback all pass.
