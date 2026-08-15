# るるぶWEDDING V6 — O + AM/AI QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Observed GitHub main before write: `1266f1f12a211774bbcb8d068e756ebfd469e6a2`
Drive root readback: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`

## Result

`OUTER_O_UNCHANGED / PROFILE_QA_AM_PROMOTED / STORY_CHRONOLOGY_AI_UNCHANGED / THREE_SCALE_VISUAL_QA_PASS / STRUCTURE_QA_PASS / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`

## Visible problem

Preferred AL (`1373:2`) was structurally sound, intrinsic-safe and readable, but its Q&A page still read as six text islands floating over a large lower image. At thumbnail and reading scale it felt closer to a manually arranged Figma information page than a decisive Japanese travel-magazine editorial page.

The problem was not missing imagery. AL already had two verified replaceable image roles and native editable question/answer copy. The weak point was the page-level reading path.

## Root-cause hypothesis

For an interview/Q&A page, six questions do not need to occupy six spatially independent modules. A stronger magazine reading path can be created by assigning one continuous vertical text column and one dominant photographic anchor, while preserving feature/support number hierarchy and native copy.

This is a subtraction/recomposition test, not a decoration-addition test.

## Bounded clean-room test

Source rollback:

- AL `1373:2 / PREFERRED / V6_INSIDE_AL_INTRINSIC_SAFE_PROFILE_EDITORIAL_2026_08_16`

New candidate:

- AM `1380:18 / PREFERRED / V6_INSIDE_AM_VERTICAL_QA_EDITORIAL_2026_08_16`
- Q&A page `1380:46`

Profile page is inherited unchanged from AL except for cloned node IDs. The bounded change is the Q&A page only.

### Subtraction

AM hides AL's three native decorative separators:

- `DECOR / QA_TOP_RULE`
- `DECOR / QA_LEFT_RAIL`
- `DECOR / MEMORIES_RULE`

No new card, badge, gradient, shadow or generated decoration was added.

### Q&A hierarchy

Six editable native Q&A blocks are now one continuous left editorial column:

- `01` and `04` remain larger feature anchors;
- `02 / 03 / 05 / 06` remain smaller support beats;
- questions and answers remain native editable text;
- rendered number wrapping discovered in the first AM screenshot was corrected before promotion;
- text bounding boxes were then separated until programmatic collision count reached `0`.

### Photography

Existing verified resident image sources were reused without new binary transport:

- hero `1380:71 / PHOTO / QA_MEMORY_HERO_REPLACEABLE`
  - hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
  - display `340×460`
  - registered source `732×498`
  - `FILL`
- support `1380:72 / PHOTO / QA_MEMORY_SUPPORT_REPLACEABLE`
  - hash `644f449c3bf2001a94d4b822d2b55e2614c11042`
  - display `185×215`
  - registered source `240×220`
  - `FILL`

Both remain below registered intrinsic width and height and remain replaceable IMAGE roles.

A native closing anchor was added below the image cluster:

- `1380:75 / TEXT / QA_CLOSING_PULLQUOTE`
- `1380:76 / TEXT / QA_CLOSING_NOTE`

These are editable copy, not baked raster text.

## Three-scale evidence

### Whole item / thumbnail

AM `1380:18` at 500 px long edge: PASS.

Compared with AL, the Q&A page has a more immediate left-to-right reading split: interview column first, dominant memories photography second, closing statement last. The six-question grid impression is materially reduced.

### Reading / spread scale

AM `1380:18` at 1400 px long edge: PASS.

The page remains dense enough to read as editorial rather than a dashboard, while the two-photo cluster retains one dominant and one supporting role.

### Actual-size/detail

Q&A `1380:46` rendered at native `794×1123`: PASS.

Programmatic readback after the final geometry fix:

- native visible text: `24`
- replaceable IMAGE roles: `2`
- text/text bounding-box collisions: `0`
- 18 px text safe-area risks: `0`
- visible outside-page nodes: `0`

## Promotion / rollback

Promoted:

- AM `1380:18` renamed `PREFERRED / V6_INSIDE_AM_VERTICAL_QA_EDITORIAL_2026_08_16`

Rollback preserved:

- AL `1373:2` renamed `ROLLBACK / V6_INSIDE_AL_INTRINSIC_SAFE_PROFILE_EDITORIAL_2026_08_16`
- AL hidden, not deleted

Start Here `845:27` updated to:

`V5 FU/FX · V6 O + AM/AI INSIDE STUDIES · V7 HOLD`

Outer O `1370:2` and Story/chronology AI `1363:125` were not visually changed in this experiment.

## Asset lifecycle truth

- generated this run: `0`
- new Drive save: `0`
- new external binary upload: `0`
- existing verified photos recomposed: `YES`
- generated section decoration adopted: `NO`
- native editable Q&A preserved: `YES`
- three-scale visual QA: `YES`
- structure/safe-area QA: `YES`
- rollback preserved: `YES`

Drive section masters remain readback-visible but unadopted. The known quality-preserving generated-decoration transport fingerprint did not materially change, so it was not retried.

## Decision

`AM VERIFIED_LOCAL / ADOPTED AS CURRENT PROFILE_QA STUDY`.

This does not make V6 print-ready. Final real copy, final real photography, printer template, bleed/trim/fold, PDF preflight and physical proof remain required.