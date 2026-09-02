# V30 P01 production assets

Status: `P01_DESIGN_LOCKED / GIT_BINARY_SYNC_COMPLETE / FINAL_PHOTO_QA_PENDING`

P01 CURRENT remains Figma node `3535:7`. Do not roll back to FIRST BUILD and do not create another P01 frame.

The large REWORK plus 2026-09-02 targeted micro-polish are visually accepted.

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

## Micro-polish resolution — PASS

Feature 1–3 interior opacity, left-edge safety and top-left ring/diamond/sparkle fidelity were fixed and reviewed from the fresh Figma CURRENT screenshot.

Reported checks:
- intended Feature paper-core samples: alpha `255`;
- outside transparency retained;
- Figma node/image opacity: `1.0`;
- Hero/background no longer visually bleeds through intended white Feature paper;
- Feature badges/headings no longer read as accidentally clipped by the airmail border;
- ring support cue now reads as gold wedding rings + visible diamond + yellow sparkles;
- hidden obsolete layers: `0`;
- duplicate same-job layers: `0`;
- P02 `3535:9`: untouched.

## Design gate state

- `FIGMA_STRUCTURE_READY = PASS`
- `CLEAN_PROXY_PASS = PASS`
- `BUNDLED_DISPLAY_MODULE_PASS = PASS`
- `MICRO_POLISH_DEBT = CLOSED`
- `INTERNAL_OPACITY_PASS = YES`
- `ALPHA_INTEGRITY_PASS = PASS`
- `EDGE_SAFETY_PASS = PASS`
- `RING_CLUSTER_PASS = YES`
- `IDENTITY_ANCHOR_PASS = PASS`
- `VISUAL_CARRYOVER_PASS = PASS`
- `REFERENCE_DELTA_PASS = PASS_AFTER_MICRO_POLISH`
- `PHOTO_SWAP_PASS = PASS`
- `A5_GRAYSCALE_PASS = PASS`
- `HUMAN_FEEDBACK_REVIEWED = PASS`
- `FIGMA_DESIGN_COMPLETE = YES`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

## Repository sync — COMPLETE

The PR branch contains the four production PNGs:

- `V30_P01_FEATURE_1_MODULE_MICRO_POLISH_OPAQUE_PAPER_RGBA.png`
- `V30_P01_FEATURE_2_MODULE_MICRO_POLISH_OPAQUE_PAPER_RGBA.png`
- `V30_P01_FEATURE_3_MODULE_MICRO_POLISH_OPAQUE_PAPER_RGBA.png`
- `V30_P01_TOP_LEFT_RING_DIAMOND_SPARKLE_MICRO_POLISH_RGBA.png`

Accepted positions are Feature x `21 / 23 / 22` and ring node `3681:137` at `27,40,92×76`. Fresh screenshot SHA-256: `f83e608d943fb15131042edb43d59a503b171ca427902428e140789b134989a3`. QA Drive folder: `1WCUtnm_trU9tEeuZ3tMFjN-PP0KEGw4d`.

## Fast-fail rule retained

For future V30 generated-asset defects:

`one quick discriminator → asset-side failureなら即 regenerate/re-cut → replace affected module only → one integrated final QA`.

Do not waste repeated diagnosis/context on a cheap asset-side defect when regeneration is faster.

## Next P01 work

No further P01 design work is required until owner-approved final photographs arrive.

Then replace only the four photo fills and run final-photo crop/face-safe/effective-resolution/A5/print QA.

**P02 production may begin.**
