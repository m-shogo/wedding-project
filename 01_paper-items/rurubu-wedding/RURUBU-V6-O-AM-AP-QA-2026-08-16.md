# Rurubu WEDDING V6 — O + AM/AP QA — 2026-08-16

Scope: Rurubu WEDDING only. V7 remained HOLD. No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD item was inspected or mutated.

Observed GitHub main before evidence write: `3e2f7442d12ba0443d1c277f735491dcfa44d880`.

## Starting authority

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- Start Here before this run: `V5 FU/FX · V6 O + AM/AI INSIDE STUDIES · V7 HOLD`
- Outer O: `1370:2`
- Profile/Q&A AM: `1380:18`
- Story/chronology AI: `1363:125`
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`

## Visible problem

The AI chronology page was structurally safe but still read as a collection of six photo/event modules. At actual size the eye jumped between repeated numbered islands, image boxes, and labels rather than following one editorial chronology. The Story page also left roughly the lower fifth of the page visually inactive.

## Failed comparison — AN

Rollback-safe AN `1382:132` tested a more aggressively staggered six-photo chronology. It increased crowding and text/image competition, so it was rejected and hidden as:

`REJECTED / V6_INSIDE_AN_OVERBUSY_CHRONOLOGY_2026_08_16`

This is not counted as progress.

## Adopted chronology change — AO

AO `1383:2` replaced the six-photo-per-event idea with:

- one continuous native chronology rail for events 01–05;
- only three supporting event-photo anchors;
- the existing top feature-photo cluster;
- a full-width dark WEDDING endpoint band;
- no new cards, shadows, gradients, badges, or generated decoration;
- all dates, titles and copy remain native editable text;
- all visible photos remain replaceable IMAGE roles.

AO actual chronology page `1383:14`:

- native text: `27`;
- visible replaceable IMAGE roles: `6`;
- text/text collisions: `0`;
- 18 px text safe-area risks: `0`;
- outside visible nodes: `0`.

Three-scale visual evidence:

- whole spread / 500 px: PASS and materially clearer than AI;
- reading spread / 1400 px: PASS;
- actual chronology / native `794×1123`: PASS.

AI `1363:125` was preserved as a hidden rollback after AO verification.

## Adopted Story change — AP

AP `1384:2` cloned verified AO and changed only the Story page:

- hero photo `650×455`, slight editorial rotation;
- support photo 1 `205×188`, overlapping hero edge;
- support photo 2 `300×255`, enlarged and moved lower;
- anchor/body copy retained as native text and tightened around the photo cluster;
- no new image source, card, badge, shadow, gradient, or generated decoration.

AP Story page `1384:3`:

- native text: `7`;
- replaceable IMAGE roles: `3`;
- text/text collisions: `0`;
- 18 px safe-area risks: `0`.

Registered-source sanity:

- story hero hash `539c259be8036b481d06b4f76db9a39b407d90e8`, display `650×455`, registered source `1356×560`;
- story support 1 hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, display `205×188`, registered source `240×220`;
- story support 2 hash `c1ada11205bc3978bf426b304d683f1c1566cac2`, display `300×255`, registered source `810×552`.

All remain at or below the registered intrinsic dimensions in both axes.

Three-scale AP evidence:

- whole spread / 500 px: PASS;
- reading spread / 1400 px: PASS;
- actual Story / native `794×1123`: PASS.

AO `1383:2` remains hidden as rollback. AP is current preferred Story/chronology spread.

## Current live Figma state

Start Here `845:27`:

`V5 FU/FX · V6 O + AM/AP INSIDE STUDIES · V7 HOLD`

Preferred:

- Outer O `1370:2`
- Profile/Q&A AM `1380:18`
- Story/chronology AP `1384:2`

## Generated section master transport re-check

A materially different transport prerequisite was available this run: Google Drive raw download successfully materialized the high-resolution Timeline master locally.

- Drive master: `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8`
- filename: `RURUBU_V6_TIMELINE_SECTION_ROLE_v2.png`
- bytes: `1,242,829`
- Drive raw download: PASS

Figma `upload_assets` issued a valid single-use submit URL, but POST from the execution container again failed with DNS resolution for `mcp.figma.com`.

Therefore:

`DRIVE_MASTER_MATERIALIZED / FIGMA_UPLOAD_SUBMIT_BLOCKED_BY_DNS / NO_CANVAS_MUTATION_FROM_GENERATED_MASTER`

Per the repeated-fingerprint rule, the same upload path was not retried again.

## Asset lifecycle truth

- newly generated: `0`
- new Drive saves: `0`
- Drive raw master materialized: `YES`
- new Figma binary placement: `0`
- existing verified image roles recomposed: `YES`
- generated section decoration adopted: `NO`
- native editable copy preserved: `YES`
- three-scale visual QA: `YES`
- rollback-safe comparisons preserved: `YES`
- V7 touched: `NO`

## Decision

`V6 O + AM/AP = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / AP_VISUALLY_PREFERRED_OVER_AI_AND_AO / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.
