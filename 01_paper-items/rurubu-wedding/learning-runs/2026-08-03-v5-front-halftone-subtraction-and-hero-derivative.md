# V5 front-cover subtraction and hero-derivative experiment

Date: 2026-08-03
Item/version: Rurubu WEDDING V5
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current outer frame: `77:18`
Target front-cover frame: `77:145`

## Authorities read

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- live V5 Current Status and asset ledger
- live Figma structure and screenshot
- verified V5 Drive master folder

## Experiment A — cover-hero role-sized derivative

### Source

- role: `V5-01 / IMG_HERO`
- Drive master ID: `1rS1QpAL-H4Dvg3tzI3NvmPUw-oAiicpv`
- source filename: `01_COVER_HERO_YOKOHAMA_DUMMY.png`
- source dimensions: `1122 × 1402`
- source bytes: `2,089,658`
- Figma target node: `77:148`
- target box: `665 × 610`

### Visible problem

The live cover hero is visibly pixelated because the current applied derivative is only 5,927 bytes and is already marked `REJECT_LOW_QUALITY_DERIVATIVE`.

### Hypothesis

A role-cropped derivative at approximately twice the target-box dimensions, with high-quality JPEG encoding rather than extreme payload minimization, should preserve the skyline, water, and text-overlay space while materially improving sharpness.

### Derivative created and verified

- crop: full source width, `1122 × 1029`, vertical origin `y=230`
- output: `1330 × 1220`
- format: JPEG, quality 95, 4:4:4 subsampling
- output bytes: `667,843`
- filename: `RURUBU_V5_01_IMG_HERO__FIGMA_1330x1220_Q95.jpg`
- Drive derivative ID: `1wcYwYVj3gavM0YGO1_Jn52fL11AvSHIn`
- Drive readback: PASS; parent folder `1tAvBO9TodEKVHVZnABD73rEPUGG8iu0N`

### Figma placement result

`BLOCKED_BINARY_UPLOAD_DNS`

A Figma single-use binary upload endpoint was created for semantic node `77:148`, but the execution container could not resolve `mcp.figma.com`. The upload did not occur, the existing Figma image was not mutated, and no photo-role pass is claimed.

This repeats the previously recorded network-path blocker, so the same method must not be retried blindly. The next method must be connector-native binary transfer, a network-capable uploader, or an official in-editor replacement route.

### Status

`MASTER_VERIFIED / ROLE_DERIVATIVE_CREATED / DRIVE_READBACK_VERIFIED / FIGMA_PLACEMENT_BLOCKED / PHOTO_ROLE_PASS_UNCHANGED`

## Experiment B — bounded decorative subtraction

### Visible problem

The front cover still contained a non-semantic halftone texture near the circular travel snap. At whole-cover scale it competed with the snap, camera icon, star badge, date badge, masthead, and photo headlines without adding information.

### Principle tested

Attempt subtraction before adding decoration. Small decorative marks must be judged cumulatively, not only in isolation.

### Expected improvement

- reduce visual noise around the cover snap
- preserve the snap as the clear secondary photo focus
- improve quiet space without changing the established cover hierarchy

### Possible regression

The cover could lose some playful Rurubu-like energy or make the snap area feel too empty.

### Change

- node `77:259 / AUTH_HALFTONE_TEXTURE`
- `visible: true → false`
- no deletion; rollback remains immediate
- no text, semantic photo node, crop, frame hierarchy, or image hash changed

### Verification

Post-change screenshot at natural cover dimensions confirms:

- snap, camera icon, masthead, date badge, hero, feature hierarchy, and folio remain intact
- the right-middle region is calmer
- no accidental gap, overlap, contrast loss, text loss, or structural damage appeared
- the cover still retains sufficient magazine energy through photography, colored headlines, the snap, masthead, issue bar, and date badge

### Decision

`PROTOTYPED → VERIFIED / ADOPTED_FOR_V5_CURRENT / PROJECT_RULE_NOT_PROMOTED`

### Next application

Continue auditing decorative clusters by cumulative effect. Do not automatically remove the camera icon, plane icon, or star badge; each needs its own role and whole-cover comparison. Dominant-photo replacement remains higher priority than further decoration work.

## Learning summary

- A high-quality hero derivative now exists in Drive with exact provenance, but Figma placement remains blocked by binary transport.
- Successful Drive preparation does not count as visual completion.
- Removing one non-semantic texture improved local hierarchy without reducing the cover’s travel-magazine identity.
- The next safe run should switch image-transfer methods and otherwise continue bounded editorial work rather than repeat the DNS-failed upload path.
