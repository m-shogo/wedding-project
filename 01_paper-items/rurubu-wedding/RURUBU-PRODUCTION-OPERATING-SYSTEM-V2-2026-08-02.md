# るるぶWEDDING — Production Operating System V2

Date: 2026-08-02
Repository: `m-shogo/wedding-project`
Scope: V5 completion, V6 clean-room production, later editorial paper-item work
Authority order: live Figma → Drive readback → asset evidence ledger → GitHub `CURRENT-STATUS.md`

## 1. Why V2 is required

The previous workflow improved truthfulness, but it still optimized too strongly for whether a technical operation succeeded.

The clearest example is the first inline Figma import:
- the Drive source was correct
- the semantic node was correct
- a Figma image hash was created
- but the imported derivative was only `5,927 bytes`
- the resulting large cover role remains visually below the quality target

Therefore, `transport success` is not `asset success`.

V2 separates:
1. source/master quality
2. transfer/derivative quality
3. live placement identity
4. visual editorial quality
5. structure/editability
6. print production readiness

A role completes only when all applicable gates pass.

## 2. Improvements found from multiple viewpoints

### A. Editorial / art-direction viewpoint

Problem:
- visual QA can become a checklist of defects without judging whether the page feels professionally edited
- repeated cards, equal padding, badges, and shadows can technically pass but still feel like Web UI

Improvement:
- every page must have one dominant focal point
- every information cluster must have an intentional large / medium / small hierarchy
- irregularity must serve reading order, not decoration
- after every addition pass, run a subtraction pass
- no element survives merely because time was spent making it

### B. Photography viewpoint

Problem:
- role-unmatched aspect ratios force severe crops
- a technically imported image may be too compressed, too small, or compositionally unsuitable
- recognizable generated faces can look like false substitutes for the couple

Improvement:
- generate or select images for the target role aspect ratio and text-safe zone
- large hero roles use dedicated hero compositions, not recycled portrait images
- profile dummy photos should use back view, side view, hands, travel objects, or silhouette rather than a clearly recognizable fictional face
- factual/iconic locations must be visually plausible; generated geography is dummy-only and never proof of a real destination

### C. Image-engineering viewpoint

Problem:
- Drive masters and Figma transfer derivatives are conflated
- base64 payload size pressure encourages destructive over-compression

Improvement:
- preserve a high-quality master in Drive
- create a separate role-sized Figma derivative
- record source dimensions, derivative dimensions, byte size, and checksum where available
- use one role per import call for large images
- reject any derivative that visibly pixelates at whole-page screenshot scale

Dummy-design derivative floor:
- large roles: at least `2×` the Figma box width and height
- profile / circular roles: preferably `4×` the Figma box dimensions for crop flexibility
- small memory roles: at least `4×` the box dimensions
- never exceed Figma's current automatic image downscaling boundary unnecessarily; official Figma guidance notes that images over `4096 × 4096` are proportionally reduced

These floors are for editable dummy-design QA only. Final print images are recalculated from the exact physical size and printer requirement.

### D. Figma architecture viewpoint

Problem:
- one page currently contains Current, Working, rollback, and system material, increasing navigation and accidental-edit risk
- Auto Layout can be overused for editorial collage or underused for variable copy

Improvement:
- organize by pages or clearly named canvas sections:
  - `00_CURRENT`
  - `10_V5_WORKING`
  - `20_V5_ROLLBACK`
  - `30_V6_RESEARCH`
  - `40_V6_WORKING`
  - `90_EDITORIAL_SYSTEM`
- retain semantic photo-role names
- use Auto Layout only for variable-length labels, repeated information rows, folios, and text modules
- keep hero photography, route lines, collage, diagonal placement, and optical overlaps manually editable
- use named styles and variables only where they reduce inconsistency; do not turn every one-off editorial decision into a token

Figma's official guidance supports:
- non-destructive image cropping
- image fills with Fill / Fit / Crop / Tile modes
- descriptions on components, styles, and variables
- named version-history checkpoints and restoration

### E. Japanese editorial typography viewpoint

Problem:
- visual hierarchy alone does not guarantee professional Japanese composition
- small text, punctuation, Latin/Japanese spacing, and line starts/ends can reveal template quality

Improvement:
- maintain five explicit text roles: display, section, body, caption, micro/folio
- run realistic and long-copy stress tests, not only short dummy copy
- manually review line starts/ends, punctuation, parentheses, numbers, dates, and Latin/Japanese spacing
- use a baseline or character-grid concept even when the final placement is intentionally irregular
- align body-copy baselines across neighboring modules where doing so improves reading rhythm

Adobe's Japanese-layout guidance treats layout grids, Mojikumi, Yakumono, and Kinsoku as core professional composition controls. Figma does not replace that judgment, so the final Japanese text pass must be manual and print-oriented.

### F. Print / prepress viewpoint

Problem:
- Figma structural QA is not a substitute for print preflight
- dummy design quality and commercial print readiness were too close in the status language

Improvement:
- use separate gates:
  - `DESIGN_QA_PASS`
  - `REAL_CONTENT_QA_PASS`
  - `PRINT_TEMPLATE_PREFLIGHT_PASS`
  - `PHYSICAL_PROOF_PASS`
- verify links/assets, missing fonts, low-resolution images, overset text, color handling, bleed, and trim before final PDF
- package final inputs and retain the exact exported PDF used for ordering
- run actual-size physical proof; screen-only approval cannot produce `PRINT_READY`

Adobe's current print guidance recommends resolving missing/modified links, missing fonts, low-resolution images, overset text, bleed, color conversion, and PDF preset issues before commercial output.

### G. Rights / identity viewpoint

Problem:
- generated profile people can be mistaken for the real couple
- web references can drift into imitation or uncertain usage

Improvement:
- every image is tagged `DUMMY_GENERATED`, `REFERENCE_ONLY`, `REAL_APPROVED`, or `LICENSED_FINAL`
- no recognizable generated person is presented as the bride, groom, guest, or family member
- research images are used for analysis only
- final images require origin, consent/permission status, and replacement role
- no reference spread is traced one-to-one

### H. Reliability / automation viewpoint

Problem:
- repeating a blocked method wastes hourly runs
- long monolithic tasks increase partial completion and false summaries
- stale roadmaps can disagree with Current truth

Improvement:
- asset ledger becomes the progress source; prose roadmaps describe sequence only
- work in bounded batches:
  - Batch A: cover hero, back main, history
  - Batch B: two profiles, cover snap, lead memory
  - Batch C: three Friends & Family
  - Batch D: three small memory roles
- screenshot after each large-role batch, not after every tiny role
- if the same blocker fingerprint occurs twice, stop retrying that path and switch to a proven alternative or non-blocked work
- no status count is manually inferred from old checkboxes

### I. Human-review / cognitive-bias viewpoint

Problem:
- sunk-cost bias favors keeping decorative work
- knowing which version is newer biases comparison

Improvement:
- compare V5 and V6 exports without version labels during final preference review
- score both using the same rubric
- require one subtraction after QA
- distinguish `I like it` from `it reads better`, `it looks more authentic`, and `it prints safely`

### J. Performance / cost viewpoint

Problem:
- regenerating accepted assets and running whole-file QA too frequently wastes time and Figma operations

Improvement:
- generate by semantic queue, not conversational turn
- reuse accepted masters inside the same version only
- create derivatives rather than regenerating masters for size changes
- prioritize high-area images because they dominate perceived quality
- defer tiny decorative polish until photography and hierarchy pass

## 3. New authority model

### Progress authority

`RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`

The ledger is authoritative for:
- Drive identity
- Figma target identity
- import state
- image hash
- derivative quality
- screenshot QA
- role completion count

### Status authority

`CURRENT-STATUS.md`

It summarizes the ledger and live state. It must not invent counts independently.

### Process authority

- this document
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`

Historical roadmaps and checkpoints remain evidence, not current progress authority.

## 4. Drive structure V2

Each version gets an isolated folder.

Recommended structure:

- `00_MANIFEST_AND_LICENSE`
- `10_MASTER_ACCEPTED`
- `20_FIGMA_DERIVATIVES`
- `30_REJECTED_CANDIDATES`
- `40_QA_SCREENSHOTS`
- `90_ARCHIVE`

Rules:
- master and derivative use different filenames
- master is never overwritten by a compressed Figma derivative
- rejected assets are moved or clearly marked, not silently reused
- Drive list/readback is mandatory after upload
- filename, Drive ID, dimensions, bytes, and semantic role are recorded in the ledger
- V5 and V6 never share version-specific photo folders

## 5. Image preparation V2

### Master

- preserve the accepted generation or real original at the highest useful quality
- no editorial text, logos, or labels baked into photography
- retain enough crop margin

### Figma derivative

- resize to role-appropriate dimensions
- JPEG for opaque photography; PNG only when transparency or lossless graphics are justified
- use a quality setting that passes screenshot inspection, not the smallest payload that transmits
- record dimensions and byte size

### Quality rejection triggers

Reject or re-derive when:
- visible blockiness or smearing appears in whole-page screenshot
- subject is cropped at joints, face, skyline landmark, or key object
- text-safe zone conflicts with cover lines
- AI artifacts appear in hands, reflections, architecture, map markings, or food
- image lighting makes text contrast dependent on a large generic overlay
- aspect-ratio mismatch destroys the intended composition

## 6. V5 optimized execution sequence

### Batch A — dominant images

1. cover hero `77:148`
2. back main `77:24`
3. history `77:422`

Requirements:
- replace the 5,927-byte hero derivative with a quality-passing derivative
- use one import call per role
- screenshot outer and inside after the batch
- do not proceed to micro-polish while any dominant image remains visibly pixelated

### Batch B — identity and lead editorial images

1. groom profile `77:296`
2. bride profile `77:302`
3. cover snap `77:236`
4. lead memory `77:430`

Requirements:
- avoid recognizable generated-face substitution where possible
- verify circular and portrait crops independently

### Batch C — Friends & Family

1. `77:35`
2. `77:39`
3. `77:43`

Requirements:
- preserve different crop ratios, angles, and caption relationships
- avoid three variants of the same scene

### Batch D — small memory roles

1. `77:438`
2. `77:446`
3. `77:454`

Requirements:
- test at actual displayed size
- reject images whose subject disappears at thumbnail scale

### Final V5 pass

- whole spread QA
- page QA
- detail QA
- identify weakest three areas
- deeply repair only those three
- remove at least one unnecessary element
- repeat screenshot and structural audit

## 7. Editorial QA scorecard

Score each spread from 1–5 on:

1. focal hierarchy
2. travel-magazine authenticity
3. wedding identity
4. photography quality
5. crop quality
6. Japanese typography
7. information density
8. reading path
9. restraint / absence of UI-card feel
10. print plausibility

Rules:
- a total score alone cannot hide a critical failure
- photography, typography, and print plausibility must each be at least 4 before dummy-design QA pass
- `PRINT_READY` still requires the independent print gates

## 8. Figma review modes

Run three review modes because each catches different defects:

### Structure mode
- semantic names
- native text
- image hashes
- geometry
- styles/components
- rollback frames

### Editorial mode
- hide guides
- judge hierarchy, rhythm, repetition, and authenticity
- compare at whole-spread and page scale

### Production mode
- show fold, trim, safe-area, and baseline references
- check small text and edge proximity

Do not combine all three into one visual judgment.

## 9. Print transition rule

Figma is the editable layout authority, but final print output requires a separate preflight stage.

Before `PRINT_TEMPLATE_PREFLIGHT_PASS`:
- exact printer and product selected
- exact current template downloaded
- final page order confirmed
- bleed and fold tolerance confirmed
- final image resolution calculated from physical placement size
- PDF preset and color requirements confirmed

Before `PHYSICAL_PROOF_PASS`:
- actual-size print produced
- fold performed
- small text, dark areas, line weight, trim, and image sharpness reviewed
- at least two human proofreaders review names, dates, and captions

## 10. V6 clean-room production upgrades

V6 research is not a mood-board collection exercise.

For each reference, record:
- source category
- cover or spread
- photography ratio
- headline hierarchy
- caption treatment
- map / route treatment
- whitespace strategy
- color strategy
- what feels authentic
- what feels dated, cheap, or AI-like
- exact principle adopted or rejected

V6 image generation rules:
- create prompts from semantic roles and target aspect ratios
- generate new assets only
- create a V6 Drive folder and ledger before Figma placement
- use Hawaii/resort cues with restraint
- avoid generic hibiscus/palm/sticker overload
- use real-place accuracy only as dummy atmosphere unless a licensed/real image is used

V6 layout experiment:
- create at least two structurally different outer concepts before polish
- select based on hierarchy and magazine authenticity, not color preference
- build inside/back after the outer direction proves its visual grammar
- compare V5/V6 without version labels before promotion

## 11. Automation loop V2

Every hourly run:

1. read Current status, this operating system, postmortem, and asset ledger
2. inspect latest main for concurrent changes
3. choose one bounded batch or one audit
4. execute the full reachable lifecycle
5. update the ledger first
6. update Current status only if the ledger changed
7. return exact evidence or `NO_CHANGE` with blocker fingerprint

Loop breaker:
- never retry the same failed mechanism more than twice without changing the method
- do not generate replacements for roles already accepted in the current version unless a documented defect exists
- no notification for repeated unchanged blockers

## 12. Metrics that matter

Track:
- photo roles passed / total
- dominant photo roles passed / 3
- Drive files with verified IDs / total
- node/hash mappings / total
- screenshot QA pass / total
- structural QA pass / total
- generated candidates rejected
- unnecessary elements removed
- stale status contradictions found and corrected
- repeated blocker attempts prevented

Do not use:
- number of decorative details
- number of generated images
- number of Figma nodes
- number of commits

as quality metrics.

## 13. Immediate decisions from this audit

1. The existing `5,927-byte` cover derivative is a transport proof, not a quality-passing asset.
2. Current truthful count is:
   - source applied: `1 / 13`
   - photo roles fully passed: `0 / 13`
3. V5 progress must be managed from the new asset evidence ledger.
4. Dominant-image quality is the next priority, before additional decoration.
5. V6 must use role-specific aspect ratios and avoid recognizable generated profile stand-ins.
6. Print preflight becomes a separate explicit production phase.

## 14. Research basis

Official references reviewed for V2:

- Figma Help Center — Guide to auto layout
- Figma Help Center — Crop an image
- Figma Help Center — Adjust image properties
- Figma Help Center — Add images and videos to designs
- Figma Help Center — Add descriptions to styles, components, and variables
- Figma Help Center — View a file's version history
- Adobe InDesign — Create and customize layout grids
- Adobe InDesign — Mojikumi and Yakumono in Japanese layout
- Adobe InDesign — Use Kinsoku settings
- Adobe InDesign — Configure and use the Preflight panel
- Adobe InDesign — Produce print-ready PDF files
- Adobe InDesign — Package files for output
- Google Drive API — Manage file metadata and revisions

The resulting rules are adapted to this project. They are not copied mechanically from software documentation, and they remain subordinate to actual visual quality and the final printer's requirements.
