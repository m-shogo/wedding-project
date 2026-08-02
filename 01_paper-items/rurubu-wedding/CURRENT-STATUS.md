# るるぶWEDDING — CURRENT STATUS

Date: 2026-08-02
Current authority: live Figma + Drive readback + asset evidence ledger + GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

Process authority:
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`

Progress authority:
- `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`

Sequence reference only:
- `RURUBU-V5-NONSTOP-EXECUTION-ROADMAP-2026-08-02.md`

## Current declaration

`RURUBU_V5_CURRENT_CANDIDATE / REALISTIC_DUMMY_MASTERS_13_OF_13_DRIVE_VERIFIED / INLINE_FIGMA_IMPORT_PATH_PROVEN / INTENDED_SOURCE_APPLIED_1_OF_13 / PHOTO_ROLE_PASS_0_OF_13 / HERO_REIMPORT_REQUIRED / REAL_CONTENT_PENDING / PRINT_TEMPLATE_PENDING / NOT_PRINT_READY`

## Current live Figma

Page: `01_RURUBU_WEDDING`

Current candidates:
- `01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE` — node `77:18`
- `02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE` — node `77:290`

Rollback evidence remains preserved:
- outer V4 — node `59:2`
- inside V4 — node `59:178`

## Verified structure

- semantic photo roles: `13 / 13`
- nodes with an IMAGE fill of some kind: `13 / 13`
- gradient-only photo roles: `0`
- ordinary copy remains native Figma text
- semantic role names remain intact
- V4 rollback remains available

Important distinctions:
- `IMAGE fill present` does not prove that the intended Drive asset is applied
- `intended source applied` does not prove that the derivative is visually acceptable
- only a verified Drive ID → semantic node ID → Figma image hash mapping plus screenshot and structure QA can complete a photo role

## Inline transfer path: proven, but first derivative rejected for quality

A safe inline binary-import path into live Figma was proven on 2026-08-02:
- source image resized and JPEG-compressed locally
- bytes base64-encoded
- `figma.base64Decode()` + `figma.createImage()` produced a Figma image hash
- existing semantic cover node `77:148` updated without flattening text or changing frame hierarchy

Verified transport result:
- role: cover hero `IMG_HERO`
- target node: `77:148`
- imported byte length: `5,927`
- Figma image hash: `a776d183a5ea8715f6fe9186c4c0749973df06b4`

Quality result:
- `REJECT_LOW_QUALITY_DERIVATIVE`
- this proves the transport path only
- it does not count as `PHOTO_ROLE_PASS`
- cover hero must be re-derived at role-appropriate dimensions and compression, re-imported, and re-QA'd

## Realistic dummy master pack

Drive folder:
- `RURUBU_V5_DUMMY_PHOTOS_2026-08-02`
- ID: `1tAvBO9TodEKVHVZnABD73rEPUGG8iu0N`

Verified:
- accepted master files in Drive: `13 / 13`
- Drive list/readback: complete
- exact IDs, filenames, sizes, Figma target nodes, and current role states: `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`

## Mandatory Drive-first workflow V2

For every remaining V5 asset and every future V6 asset:

1. generate or select a role-specific master
2. visual-QA and accept/reject
3. save accepted master to the version-specific Drive folder
4. list/read back Drive and record file ID, filename, dimensions/bytes where available
5. create a separate role-sized Figma derivative
6. apply derivative to the exact semantic Figma node
7. record Figma image hash
8. screenshot-QA crop, contrast, density, and fold safety
9. structurally audit native text, semantic role, and rollback state
10. update the asset ledger
11. update Current status only if the ledger changed

No temporary local file, attempted write, or arbitrary IMAGE fill may be treated as Current.

## Image-quality policy

- Drive master and Figma derivative are different artifacts
- the Drive master is never overwritten by a transfer-compressed derivative
- large dummy-design derivatives must be at least approximately `2×` the target Figma box dimensions
- small/circular/profile derivatives should preferably be `4×` for crop flexibility
- payload size is not minimized below visible quality
- a derivative that transmits but pixelates is rejected
- final print image requirements are recalculated from exact physical placement and printer specifications

Figma currently scales images over `4096 × 4096` down proportionally, so oversized imports are avoided without sacrificing the role quality floor.

## Next required V5 work

### Batch A — dominant images

1. re-import cover hero `77:148` with a quality-passing derivative
2. import back main `77:24`
3. import history `77:422`
4. screenshot outer and inside spreads
5. record Drive ID → node ID → image hash mappings in the ledger

No decorative polish should outrank these dominant-image corrections.

### Batch B — identity and lead images

- groom `77:296`
- bride `77:302`
- cover snap `77:236`
- lead memory `77:430`

Profile dummies must not be presented as recognizable substitutes for the real couple. Crop or replace any overly identifiable generated face.

### Batch C — Friends & Family

- `77:35`
- `77:39`
- `77:43`

### Batch D — small memory roles

- `77:438`
- `77:446`
- `77:454`

### Final V5 design pass

1. whole-spread, page, and detail screenshots
2. identify and deeply repair the weakest three areas
3. remove at least one unnecessary element
4. reduce remaining Web UI card/badge feel where helpful
5. re-run screenshot and structural audit
6. update ledger and GitHub main

Valid dummy-design pass requires:
- intended high-quality derivatives applied: `13 / 13`
- photo role pass: `13 / 13`
- dominant role pass: `3 / 3`
- screenshot QA complete
- structure QA complete
- no false generated-person identity

## V6 sequencing and clean-room boundary

V6 is a separate Hawaii / tropical-resort editorial version.

V6 production may begin only after V5 reaches the verified dummy-photo design gate. Research planning may proceed earlier but must remain separate.

V6 rules:
- no V5-generated photo reuse
- new version-specific Drive folder and evidence ledger before Figma placement
- separate Figma page/frames; never overwrite V5
- role-specific aspect-ratio generation
- at least two structurally different outer concepts before polish
- compare multiple Hawaii, resort, travel-magazine, and editorial references
- extract principles rather than trace one issue
- no generic tropical sticker/hibiscus/palm overload
- independent screenshot, structure, and truthfulness QA

## Print transition

Do not treat Figma design QA as print preflight.

Required future gates:
1. `REAL_CONTENT_EDITORIAL_QA_PASS`
2. `PRINT_TEMPLATE_PREFLIGHT_PASS`
3. `PHYSICAL_PROOF_PASS`
4. `PRINT_READY`

Before print readiness:
- exact printer/product/template verified
- bleed, trim, fold tolerance, page order, color, and PDF requirements verified
- final image resolution calculated from physical placed size
- PDF preflight completed
- actual-size folded proof reviewed
- names, dates, captions, and small text proofread by at least two people

## Stop conditions

Do not claim `DESIGN_FINAL`, `PHOTO_QA_PASS`, or `PRINT_READY` while:
- the ledger has incomplete photo roles
- dominant images remain pixelated or use rejected derivatives
- Drive-to-node-to-hash evidence is missing
- generated dummy people can be mistaken for the real couple
- dummy content remains
- exact print template is not applied
- final PDF and physical proof QA are incomplete
