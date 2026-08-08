# ADD-06 Design QA Pass With Placeholders — 2026-08-09

Authority: GitHub `main`
Start main SHA: `8158537ec2c7083f17963e9df2a8633e0eb5af43`
Write-preflight main SHA: `8158537ec2c7083f17963e9df2a8633e0eb5af43`

## Scope

ADD-06 フォトブースサイン only. RURUBU / るるぶ was not searched, read, edited, QA'd, generated, or written.

## Live authority cross-check

- Current authority remains `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED`.
- Figma production: `Wedding Paper ADD 06 Photo Booth Sign`, file key `SVMALDUyhc2chxHa4fvdjx`, page `ADD-06_PHOTO_BOOTH_SIGN`.
- Drive production folder live readback: `ADD-06_フォトブースサイン`, folder ID `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb`.
- Drive change: none; the visible defect was native Figma typography/composition.

## Highest-value visible defect

The initial A3/A4 design still relied on a very large generic Inter heading plus a right-edge route line, endpoint dot and sparkle. At whole-item scale this read as a sparse AI/editorial template with travel-decoration tokens rather than a deliberately art-directed physical photo-spot sign.

## Rollback-safe proof

Before the material edit, full production duplicates were created:

- `2:2` — `QA_PRE_EDITORIAL_REFINE_2026_08_09_A3`
- `2:12` — `QA_PRE_EDITORIAL_REFINE_2026_08_09_A4`

The earlier rollback proof `1:22` remains untouched.

## Figma changes

### A3 production `1:2`

- changed `PHOTO SPOT` into a two-line `PHOTO / SPOT` editorial display using `DM Serif Display Regular` at 122 px;
- kept the subtitle native and subordinate in Inter Regular at 28 px;
- retained the note and location as explicit semantic layout dummies;
- reduced the date to tracked 17 px Inter Medium;
- hid the decorative endpoint dot and sparkle non-destructively;
- repurposed the former right-edge route line into a restrained 1 px horizontal metadata rule;
- preserved the large central negative field as intentional usable sign space rather than filling it with generated imagery or decoration.

The first screenshot pass exposed a title/subtitle collision. The subtitle was then moved down and a second fresh screenshot confirmed the defect was closed.

### A4 reflow `1:12`

- independently reflowed the title at 86 px rather than scaling A3 proportionally;
- set subtitle to 21 px, note to 17 px, date/location to 14 px;
- converted the route edge to a horizontal bottom metadata rule;
- hid endpoint dot and sparkle non-destructively.

No new card UI, badge, plane, passport stamp, gradient, shadow, fake route data, QR, hashtag, venue fact, people, or generated photo was introduced.

## Screenshot QA

Fresh post-fix screenshots were captured at natural production scale:

- A3 `1:2`: 990 × 1400;
- A4 `1:12`: 700 × 990.

Visual readback confirms:

- title now behaves as a poster/editorial anchor rather than a web hero heading;
- A3 title/subtitle no longer collide;
- A3/A4 preserve intentional negative space while maintaining clear reading order;
- note and location dummies remain obviously subordinate and replaceable;
- bottom metadata line creates a print-like baseline without route/UI semantics;
- A4 is a genuine editorial reflow rather than a proportional shrink.

## Structure QA readback

A3 `1:2`:

- 990 × 1400;
- 5 native editable text nodes;
- hidden `GUIDE_SAFE` retained at 40 px inset;
- image-fill count 0;
- visible overflow 0.

A4 `1:12`:

- 700 × 990;
- 5 native editable text nodes;
- hidden `GUIDE_SAFE` retained at 40 px inset;
- image-fill count 0;
- visible overflow 0.

Rollback frames `2:2` and `2:12` retain the exact pre-refine production structures. No flattening or raster replacement was introduced.

## Completion state

`DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NATIVE_EDITABLE_PASS / WHOLE_READING_DETAIL_QA_PASS / A4_REFLOW_PASS / NOT_PRINT_READY`

Do not keep polishing this item hourly unless new live evidence demonstrates a major defect. Advance to ADD-07.

## DEFERRED_FINALIZATION

- final photo-booth note wording;
- final location wording;
- final A3/A4 installation choice;
- venue lighting / 1.5–3 m physical readability confirmation;
- printer bleed/template/profile;
- 100% physical print proof.

These do not block progression to ADD-07.
