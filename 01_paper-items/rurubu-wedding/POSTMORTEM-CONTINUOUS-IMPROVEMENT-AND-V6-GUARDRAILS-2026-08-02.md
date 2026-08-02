# るるぶWEDDING — Postmortem / Continuous Improvement / V6 Guardrails

Date: 2026-08-02
Repository: `m-shogo/wedding-project`
Authority: live Figma + Drive readback + GitHub `main`

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

Several upload paths were attempted before a minimal working path was established. The proven route is now compressed inline binary import through `figma.base64Decode()` and `figma.createImage()`.

Corrective action:
- prove one role end-to-end first:
  1. generate
  2. save to Drive
  3. read back Drive ID
  4. resize/compress
  5. apply to one semantic Figma node
  6. screenshot
  7. inspect fill/hash
  8. record in Git
- only after that proof may the method be scaled to the remaining roles

### 6. A roadmap contained checked items that no longer matched Current truth

The earlier nonstop roadmap marked all 13 photo roles and final QA as complete, while the later Current status correctly stated only `1 / 13` generated high-resolution assets had been applied through the verified path.

Corrective action:
- Current status outranks historical roadmaps
- checkboxes must be changed when later evidence disproves them
- a document timestamp does not make its claims authoritative

## Mandatory asset lifecycle

Every generated visual asset must move through this exact state machine:

`PLANNED`
→ `GENERATED`
→ `VISUAL_QA_ACCEPTED`
→ `DRIVE_SAVED`
→ `DRIVE_READBACK_VERIFIED`
→ `FIGMA_APPLIED`
→ `SCREENSHOT_QA_PASS`
→ `STRUCTURE_QA_PASS`
→ `GIT_RECORDED`
→ `ROLE_COMPLETE`

No state may be skipped.

### Completion rule

An asset is not complete when it is merely generated.

An asset is not complete when it is merely in Drive.

An asset is not complete when an arbitrary IMAGE fill exists in its Figma node.

`ROLE_COMPLETE` requires:
- exact intended asset identified
- Drive ID recorded
- exact semantic target node identified
- image hash or equivalent live-placement evidence recorded
- screenshot crop/contrast review passed
- GitHub main records the verified state

## Drive-first rule

For V5, V6, and later versions:

1. generate the visual asset
2. reject or accept it visually
3. save accepted files to a version-specific Drive folder
4. list/read back the folder and record file IDs
5. only then import into Figma
6. do not treat temporary local paths as Current authority

File naming must express version and semantic role.

Examples:
- `V6_01_COVER_HERO_HAWAII_DUMMY.png`
- `V6_05_HISTORY_RESORT_DUMMY.png`
- `V6_11_FRIENDS_FAMILY_SUNSET_DINNER_DUMMY.png`

## Live-evidence reporting contract

Every progress report must separate:

### Verified completed

Operations proven by live Drive, Figma, or GitHub evidence.

### In progress

Operations started but not yet through their completion gate.

### Blocked

The precise failed operation and the safe retry path.

### Not started

Work that has not begun, even if a plan or prompt exists.

Forbidden wording without evidence:
- `complete`
- `final`
- `all applied`
- `QA pass`
- `print ready`

## V5 recovery rule

V5 must finish before V6 becomes the Current candidate.

V5 remaining verified sequence:
1. apply the remaining `12 / 13` Drive photos through the proven inline path
2. verify Drive ID → semantic node → Figma image hash mapping
3. run whole-spread screenshots
4. run page and detail screenshots
5. identify and repair the weakest three areas
6. remove at least one unnecessary visual element
7. re-run screenshot and structural QA
8. update GitHub main with actual node IDs, hashes, counts, and remaining work

## V6 clean-room rule

V6 is a new Hawaii / tropical resort editorial direction, not a recolor or reskin of V5.

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
- new image-generation queue
- new Drive folder and asset register
- new semantic placement map
- separate Figma working frames/page
- screenshot comparison against V5
- separate Current-candidate decision

## V6 research standard

Research must compare multiple sources and extract principles rather than trace a single commercial page.

Required study areas:
- Hawaii and tropical-resort travel guide covers and spreads
- Japanese travel magazine hierarchy and density
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

### Gate 2 — Drive
- file saved
- folder listed
- ID and filename match semantic role

### Gate 3 — Figma structure
- native text preserved
- semantic role preserved
- no flattening of important layers
- rollback candidate preserved

### Gate 4 — visual QA
- whole spread
- page level
- detail level
- crop, contrast, density, fold, and repetition reviewed

### Gate 5 — truthfulness
- Current status matches live state
- checklist matches Current status
- commit SHA recorded
- incomplete work remains explicitly incomplete

## Continuous-improvement expectation

Every failure should produce one of the following durable improvements:
- a corrected Current document
- a new validator or audit step
- a tighter state transition
- a reusable script or proven import route
- a clearer naming convention
- removal of a misleading or obsolete instruction

Do not preserve a rule merely because it already exists. Keep it only when it improves quality, truthfulness, recoverability, or speed.
