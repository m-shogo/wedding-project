# るるぶWEDDING — Postmortem / Continuous Improvement / V6 Guardrails

Date: 2026-08-02
Repository: `m-shogo/wedding-project`
Authority: live Figma + Drive readback + asset evidence ledger + GitHub `main`

Operational companion:
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`

Progress authority:
- `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`

## Purpose

This document exists to prevent the same production and reporting mistakes from recurring in V5, V6, or later wedding-paper work.

The objective is not merely to add more rules. The objective is to preserve design quality while making every completion claim reproducible from live evidence.

## What went wrong

### 1. Completion was reported before the live Figma state was proven

A prior report stated that realistic dummy photos had been applied, but the live canvas and fill audit did not initially support that claim.

Root cause:
- conversational memory and intended operations were treated as evidence
- screenshots and node-fill inspection were not both completed before reporting
- `generated`, `saved`, and `applied` were treated as if they were the same state

Corrective action:
- never use chat memory as completion evidence
- inspect the live target frame and semantic nodes before every status transition
- require both structural inspection and screenshot evidence for visual work

### 2. `IMAGE fill exists` was confused with `the intended high-resolution image is applied`

The live Figma roles did contain IMAGE fills, but some were older, low-resolution, reassigned, or visually unsuitable. An IMAGE fill count alone does not prove that the selected Drive asset is in the correct node.

Corrective action:
- record the source asset role, Drive file ID, target node ID, and resulting Figma image hash
- validate crop and visual quality after placement
- distinguish these states explicitly:
  - `IMAGE_FILL_PRESENT`
  - `SOURCE_VERIFIED`
  - `DERIVATIVE_QA_PASS`
  - `CROP_QA_PASS`
  - `PHOTO_ROLE_PASS`

### 3. GitHub completion was described before write/readback was fully verified

A write attempt and an actual committed, readable file are not the same thing.

Corrective action:
- every GitHub write must return a commit SHA
- re-fetch the changed file or inspect the latest main commit before claiming the record exists
- never invent a SHA, node ID, Drive ID, or completed file

### 4. Image generation turns appeared to stop the workflow

Image generation produces user-visible output and can end that interaction step. Generating one image at a time created the appearance of repeated stopping and increased duplicate-generation risk.

Corrective action:
- prepare a complete semantic asset queue before generation
- batch-generate distinct roles where possible
- save each accepted generation to Drive before starting Figma placement
- use a scheduled continuation task for later ingestion/QA rather than promising invisible background execution
- never regenerate an accepted role merely because the conversation moved to a new turn

### 5. The transfer path was not proven with one small end-to-end sample first

Several upload paths were attempted before a minimal working path was established. The proven route is compressed inline binary import through `figma.base64Decode()` and `figma.createImage()`.

Corrective action:
- prove one role end-to-end first:
  1. generate
  2. save master to Drive
  3. read back Drive ID
  4. create a role-sized derivative
  5. inspect derivative dimensions and quality
  6. apply to one semantic Figma node
  7. screenshot
  8. inspect fill/hash
  9. record in Git
- only after that proof may the method be scaled to the remaining roles

### 6. A roadmap contained checked items that no longer matched Current truth

The earlier nonstop roadmap marked all 13 photo roles and final QA as complete, while later Current evidence showed otherwise.

Corrective action:
- Current status and the asset ledger outrank historical roadmaps
- checkboxes must be changed when later evidence disproves them
- a document timestamp does not make its claims authoritative
- progress counts are derived from the ledger, not copied manually between prose documents

### 7. Transport success was mistaken for visual-quality success

The first proven inline import used a `5,927-byte` derivative for the cover hero. It created a valid Figma image hash and proved that the transfer mechanism worked, but it did not meet the visual quality bar for a dominant magazine image.

Root cause:
- payload minimization was prioritized over image quality
- no derivative dimension / byte / visible-quality floor existed
- `FIGMA_APPLIED` was too close to `PHOTO_ROLE_PASS`

Corrective action:
- preserve the Drive master separately
- create and record a role-sized Figma derivative
- large dummy-design roles must normally be at least approximately `2×` their Figma box dimensions
- profile, circle, and small roles should normally be `4×` for crop flexibility
- a derivative that transmits but pixelates is rejected
- `FIGMA_APPLIED` is never a visual-quality completion state

### 8. Clearly recognizable generated people can imply false identity

A realistic generated profile person may look polished while still being unsuitable as a stand-in for the real bride or groom.

Corrective action:
- profile dummies should prefer back view, side view, hands, travel objects, silhouette, or face-obscured composition
- no generated person is described or visually presented as the real couple, guest, or family member
- recognizable generated faces require replacement or safe cropping before photo-role pass

### 9. Figma design QA was not sufficiently separated from print preflight

A visually strong editable spread can still fail commercial output because of low effective resolution, overset text, bleed, color, PDF, fold, or trim issues.

Corrective action:
- maintain independent gates:
  - `DESIGN_QA_PASS`
  - `REAL_CONTENT_EDITORIAL_QA_PASS`
  - `PRINT_TEMPLATE_PREFLIGHT_PASS`
  - `PHYSICAL_PROOF_PASS`
- never jump from dummy design QA to `PRINT_READY`

## Mandatory asset lifecycle V2

Every generated visual asset must move through this state machine:

`PLANNED`
→ `MASTER_GENERATED`
→ `MASTER_VISUAL_QA_ACCEPTED`
→ `MASTER_DRIVE_SAVED`
→ `MASTER_DRIVE_READBACK_VERIFIED`
→ `FIGMA_DERIVATIVE_CREATED`
→ `DERIVATIVE_QA_PASS`
→ `FIGMA_APPLIED`
→ `SOURCE_NODE_HASH_VERIFIED`
→ `SCREENSHOT_QA_PASS`
→ `STRUCTURE_QA_PASS`
→ `GIT_RECORDED`
→ `ROLE_COMPLETE`

No state may be skipped.

### Completion rule

An asset is not complete when it is merely generated.

An asset is not complete when it is merely in Drive.

An asset is not complete when an arbitrary IMAGE fill exists in its Figma node.

An asset is not complete when a low-quality derivative successfully creates a Figma hash.

`ROLE_COMPLETE` requires:
- exact intended master identified
- Drive ID recorded
- derivative dimensions and byte size recorded
- derivative quality accepted
- exact semantic target node identified
- image hash or equivalent live-placement evidence recorded
- screenshot crop/contrast review passed
- structure/editability review passed
- GitHub main records the verified state

## Drive-first rule

For V5, V6, and later versions:

1. generate the visual master
2. reject or accept it visually
3. save accepted master to a version-specific Drive folder
4. list/read back the folder and record file ID
5. create a role-sized derivative without overwriting the master
6. only then import into Figma
7. do not treat temporary local paths as Current authority

Recommended version folder structure:
- `00_MANIFEST_AND_LICENSE`
- `10_MASTER_ACCEPTED`
- `20_FIGMA_DERIVATIVES`
- `30_REJECTED_CANDIDATES`
- `40_QA_SCREENSHOTS`
- `90_ARCHIVE`

File naming must express version, semantic role, and artifact type.

Examples:
- `V6_01_COVER_HERO_HAWAII_MASTER.png`
- `V6_01_COVER_HERO_HAWAII_FIGMA_Q85.jpg`
- `V6_05_HISTORY_RESORT_MASTER.png`

## Live-evidence reporting contract

Every progress report must separate:

### Verified completed
Operations proven by live Drive, Figma, ledger, or GitHub evidence.

### In progress
Operations started but not yet through their completion gate.

### Blocked
The precise failed operation, blocker fingerprint, and safe retry path.

### Not started
Work that has not begun, even if a plan or prompt exists.

Forbidden wording without evidence:
- `complete`
- `final`
- `all applied`
- `QA pass`
- `print ready`

## V5 recovery rule V2

V5 must finish before V6 becomes the Current candidate.

V5 remaining verified sequence:
1. re-derive and re-import the cover hero because the current derivative is rejected
2. apply back-main and history masters with quality-passing derivatives
3. screenshot both spreads and confirm the dominant-image gate
4. apply the remaining profile, cover-snap, lead-memory, Friends & Family, and small-memory roles in bounded batches
5. update the asset ledger after each role/batch
6. verify Drive ID → semantic node → Figma image hash mapping
7. run whole-spread, page, and detail screenshots
8. identify and repair the weakest three areas
9. remove at least one unnecessary visual element
10. re-run screenshot and structural QA
11. update GitHub main with actual node IDs, hashes, counts, and remaining work

Current truthful counts are defined only by `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`.

## V6 clean-room rule

V6 is a new Hawaii / tropical-resort editorial direction, not a recolor or reskin of V5.

### V6 must not reuse

- V5-generated photographs
- V5 dummy image hashes
- V5 hero composition as a template
- V5 card arrangement copied with tropical colors
- V5 completion claims or node mappings without live re-audit

Accepted Current decorative assets may be reused only when they remain appropriate to the wedding identity, not merely because they already exist.

### V6 must create separately

- version-specific research report
- Hawaii/resort reference taxonomy
- new image-generation queue with target aspect ratios and text-safe zones
- new Drive folder and evidence ledger
- new semantic placement map
- separate Figma working frames/page
- screenshot comparison against V5
- separate Current-candidate decision

## V6 research standard

Research must compare multiple sources and extract principles rather than trace a single commercial page.

Required study areas:
- Hawaii and tropical-resort travel guide covers and spreads
- Japanese travel-magazine hierarchy and density
- resort hotel and destination editorial layouts
- modern Japanese and international magazine typography
- photographic cropping, captions, maps, itineraries, sidebars, and cover-line rhythm
- print-oriented Japanese composition and small-text legibility
- common AI-generated editorial failures

Research output must record:
- source category
- observed principle
- adopted principle
- rejected trend
- reason for adoption/rejection
- exact V6 implementation

## V6 visual-quality bar

V6 should feel like a professionally edited tropical travel special while remaining an original wedding profile book.

Required qualities:
- dominant photography with intentional text-safe zones
- high-impact cover hierarchy
- asymmetric but controlled spread rhythm
- large / medium / small information scale
- fewer generic cards and pills
- native Japanese text with editorial line breaks
- varied image ratios and crops
- coherent ocean / sky / foliage / sand / sunset palette without cheap tropical clichés
- restraint in stickers, tape, badges, hibiscus, palm, and gradient use
- clear distinction between wedding identity and destination-guide content

## QA gates for all future versions

### Gate 1 — source and rights
- source recorded
- dummy/final clearly identified
- no unauthorized real-person substitution
- no baked-in editorial text

### Gate 2 — Drive master
- master saved
- folder listed
- ID and filename match semantic role
- master not overwritten by derivative

### Gate 3 — derivative
- target dimensions recorded
- byte size recorded
- no visible quality failure
- correct color/orientation

### Gate 4 — Figma structure
- intended source-node-hash mapping verified
- native text preserved
- semantic role preserved
- no flattening of important layers
- rollback candidate preserved

### Gate 5 — visual QA
- whole spread
- page level
- detail level
- crop, contrast, density, fold, repetition, and AI artifacts reviewed

### Gate 6 — truthfulness
- ledger matches live state
- Current status summarizes ledger
- commit SHA recorded
- incomplete work remains explicitly incomplete

### Gate 7 — print
- exact template and product verified
- effective image resolution checked
- bleed, fold, trim, color, PDF, and small text checked
- actual-size proof passed

## Continuous-improvement expectation

Every failure should produce one of the following durable improvements:
- a corrected Current document
- an updated asset ledger
- a new validator or audit step
- a tighter state transition
- a reusable script or proven import route
- a clearer naming convention
- removal of a misleading or obsolete instruction

Do not preserve a rule merely because it already exists. Keep it only when it improves quality, truthfulness, recoverability, or speed.
