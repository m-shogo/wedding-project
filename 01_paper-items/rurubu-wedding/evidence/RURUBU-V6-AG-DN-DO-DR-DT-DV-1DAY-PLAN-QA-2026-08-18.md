# Rurubu WEDDING V6 — DV 1DAY PLAN QA

Date: 2026-08-18
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
State: `VERIFIED_LOCAL / PREFERRED_MIDDLE_FEATURE_STUDY / V7_HOLD / NOT_PRINT_READY`

## Source problem

The preferred V6 set already had outer cover, profile/Q&A, story/chronology, Memory Spots, and Gourmet/Cafe roles. It still lacked another canonical travel-guide editorial job: an explicit model-course / itinerary spread that tells the reader how a day flows from morning to night.

Current official Rurubu Yokohama publishing material continues to feature 1DAY/half-day model-course content and walking-map content as representative travel-guide roles. This justified testing a new editorial role instead of applying another round of local decoration to existing spreads.

Reference used only for genre-role research, not copied layout/content:

- https://books.jtbpublishing.co.jp/book/60001-202509131339-000/
- https://rurubu.jp/andmore/article/15811

## Clean-room experiment

DU/DV was built from scratch on the Rurubu page rather than duplicating an existing V6 spread.

Preferred DV root:

- `1701:2 / PREFERRED / V6_INSIDE_DV_YOKOHAMA_1DAY_PLAN_2026_08_18`
- left page `1701:3`
- right page `1701:4`

Editorial structure:

### Left page

- native headline: `朝から夜まで、ふたりの横浜。`;
- one dominant replaceable waterfront hero;
- native `10:00` opening beat and feature copy;
- native `POINT!` closing note;
- compact native practical-info layer (`MOVE / PACE / BEST / MOOD`) instead of another large UI-like card.

### Right page

- native headline: `寄り道しながら、夜まで。`;
- four-stop native itinerary rail with 10:00 / 12:30 / 16:00 / 19:00;
- four independently replaceable photo roles;
- one simple functional route line plus milestone dots;
- no rounded cards, shadows, gradients, dashboard grid, or new decorative raster.

All wording is editable native Figma text and is dummy editorial copy, not final personal/location authority.

## Photo roles / hashes

- left hero: `PHOTO / PLAN_HERO_REPLACEABLE` — hash `539c259be8036b481d06b4f76db9a39b407d90e8`;
- stop 01: same verified waterfront hash;
- stop 02: cafe hash `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- stop 03: night-walk hash `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- stop 04: dining hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`.

No new image hash was created. All image roles remain independently replaceable.

## Iteration / failure correction

The first practical-info refinement exposed real structure issues and was not accepted as-is:

1. the native `10:00` and opening title overlapped;
2. `MOVE/PACE/BEST/MOOD` labels collided with their values;
3. the final `MOOD` value initially entered the 18px right safe area.

Each issue was corrected before promotion. No cosmetic retry loop was used; the same candidate was structurally repaired and rechecked.

## Three-scale evidence

- whole spread / 1200px: PASS;
- left page `1701:3` actual `794×1123`: PASS;
- right page `1701:4` actual `794×1123`: PASS.

Final structural QA:

- left native text: `19`;
- right native text: `21`;
- left same-page absolute text collisions: `0`;
- right same-page absolute text collisions: `0`;
- left 18px text safe-area risks: `0`;
- right 18px text safe-area risks: `0`;
- both page frames use `clipsContent=true`.

Visual result:

- left page reads photo-first and uses practical metadata only in the formerly underused lower field;
- right page reads as a true morning-to-night model course rather than another spot-card list;
- route geometry has an actual sequencing function;
- the new spread is materially different from DR destination spots and DT Gourmet/Cafe.

## Start Here / publication state

Start Here `845:27` now reads:

`V5 FU/FX · V6 AG + DN/DO + DR MEMORY SPOTS + DT CAFE & TABLE + DV 1DAY PLAN · V7 HOLD`

DV is a preferred middle-feature **study** only. Final pagination/imposition is not settled.

## Asset lifecycle truth

- newly image-generated assets: `0`;
- newly adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new raster/image hashes: `0`;
- existing verified Rurubu images reused: `YES`;
- clean-room layout created: `YES`;
- native editable text preserved: `YES`;
- replaceable photos preserved: `YES`;
- V7 touched: `NO`.

Drive authority readback:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Status

`DV VERIFIED_LOCAL / PREFERRED_1DAY_PLAN_MIDDLE_FEATURE_STUDY / ROLLBACK_SAFE / NOT_PRINT_READY`.

Do not call V6 complete from this addition alone. Final page count, real itinerary copy, destination-semantic photography, printer template, PDF preflight and physical proof remain separate gates.