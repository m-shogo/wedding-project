# V30 P01 production assets

Status: `P01_DESIGN_LOCKED / FINAL_PHOTO_QA_PENDING`

P01 CURRENT remains Figma node `3535:7`. Do not roll back to FIRST BUILD and do not create another P01 frame.

The large REWORK plus 2026-09-02 targeted micro-polish are accepted.

Required authority:
- `docs/RURUBU-CURRENT.md`
- `assets/rurubu-v30/manifest.json`
- `assets/rurubu-v30/visual-polish-manifest.json`
- `assets/rurubu-v30/p01/manifest.json`
- `assets/rurubu-v30/p01/polish-manifest.json`
- `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`

## Current accepted structure

Fixed display modules include:
- `るるぶ`
- `WEDDING`
- `Shogo & Shiori` + ribbon
- `2026`
- Date ticket using `WEDDING DATE / 2026.10.24 / SAT`
- Feature 1 / 2 / 3 display shells
- Bottom Story
- `OUR JOURNEY / TAKE A TRIP`
- `PAGE / 01`

Replaceable photo slots remain separate:
- Hero
- Feature 1
- Feature 2
- Feature 3

P01.png/page screenshots remain comparison references only and must never be used as active photo fills.

## Micro-polish resolution — 2026-09-02

### Feature 1–3 interior opacity

Resolved.

Codex identified the defect as source-PNG internal alpha rather than Figma opacity/blend. The affected Feature display assets were repaired/replaced without adding rescue rectangles.

Reported checks:
- intended paper-core samples: alpha `255`;
- outside transparency retained;
- Figma node/image opacity: `1.0`;
- fresh CURRENT screenshot no longer shows Hero/background through the intended white paper vessels.

### Feature 1–3 left-edge safety

Resolved.

The three modules were tuned inward without normalizing their intentionally unequal local spacing/rhythm. Fresh CURRENT review no longer reads the number badges/headings as accidentally clipped by the airmail border.

### Top-left ring cluster

Resolved.

The weak simplified cue was replaced/requalified as a support cluster reading as gold wedding rings + visible diamond + yellow sparkle. It remains subordinate to `るるぶ / WEDDING` hierarchy.

## Current gate state

- `BEST_CURRENT = YES`
- `FIGMA_STRUCTURE_READY = PASS`
- `CLEAN_PROXY_PASS = PASS`
- `BUNDLED_DISPLAY_MODULE_PASS = PASS`
- `ALPHA_INTEGRITY_PASS = PASS`
- `EDGE_SAFETY_PASS = PASS`
- `IDENTITY_ANCHOR_PASS = PASS`
- `VISUAL_CARRYOVER_PASS = PASS`
- `REFERENCE_DELTA_PASS = PASS_AFTER_MICRO_POLISH`
- `PHOTO_SWAP_PASS = PASS`
- `A5_GRAYSCALE_PASS = PASS`
- `HUMAN_FEEDBACK_REVIEWED = PASS`
- `FIGMA_DESIGN_COMPLETE = YES`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

Reported cleanup after the micro-polish:
- hidden obsolete layer count: `0`
- duplicate same-job production layer count: `0`
- P02 `3535:9`: untouched
- TEMP `3708:2`: already deleted

## Fast-fail rule retained

For future P01/V30 generated-asset defects:

`one quick discriminator → asset-side failureなら即 regenerate/re-cut → replace affected module only → one integrated final QA`.

Do not waste repeated diagnosis/context on a cheap asset-side defect when regeneration is faster.

## Next P01 work

No further P01 design work is required now.

When owner-approved final photographs are supplied, replace only the four photo fills while preserving accepted masks, display modules, overlap and CURRENT node `3535:7`.

Then run final-photo:
- crop / face-safe QA
- effective resolution QA
- A5 readability
- print/export QA

Historical baseline/rejected/superseded assets belong in Drive/Git history, not active Figma LIVE.

**P02 production may begin.**
