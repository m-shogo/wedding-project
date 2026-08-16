# Rurubu WEDDING V6 — O + AT/AS QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
State: `VERIFIED_LOCAL_DUMMY_DESIGN_STUDY / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`

## Authority read before work

Read/re-read before writes:

- `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md`
- `docs/design-learning/rurubu-shared-learning-feed.md` + relevant append entries
- `docs/design-learning/non-rurubu-shared-learning-feed.md` + neutral append `2026-08-16-add02-infile-raster-export.md`
- `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-CURRENT-STATUS.md`
- live Figma preferred O / AR / AQ and live Drive V6 authority.

No non-Rurubu item-specific Figma, Drive, ledger, asset, or item GitHub path was inspected or mutated.

## Before

Live preferred before this run:

- Outer O `1370:2`
- Profile/Q&A AR `1389:2`
- Story/chronology AQ `1387:2`
- Start Here: `V5 FU/FX · V6 O + AR/AQ INSIDE STUDIES · V7 HOLD`

Whole-item review showed a system-level gap: Outer O had stronger print-magazine energy than the two inside spreads. AR still ended in a relatively tidy horizontal thumbnail row, while AQ chronology still read as a left-side numbered list plus right-side photo column.

## Experiment 1 — Profile AT

Source problem: AR's profile page had improved photo authority, but its lower photo roles still read like three separate thumbnails and the pullquote sat outside the dominant visual field.

Root-cause hypothesis: a page already owning a legitimate full-width hero can gain editorial density without more cards or decorative geometry by binding the native pullquote to the hero and treating the three existing replaceable photos as one overlapping memory cluster.

Rollback-safe test:

- duplicate AR → AT `1392:95`
- move native `PROFILE_QUOTE` onto the hero image as white type with a single existing rule beneath;
- enlarge/reposition the same three replaceable snapshot roles with unequal scale and small opposing rotations;
- add only three small native metadata captions (`SCENE 01/02/03`);
- keep Q&A geometry unchanged;
- add no new raster asset, generated decoration, card, shadow, gradient, or factual rasterized copy.

Visual result:

- whole spread / ~794 px render: stronger than AR; hero and lower photo cluster read as one magazine page rather than title + modules;
- actual profile `793.7×1122.5`: PASS; pullquote remains readable on the dark side of the hero;
- lower photo cluster remains legible and editable.

Structure:

- profile native text: `21`
- profile IMAGE roles: `4`
- same-parent text collisions: `0`
- 18 px text safe-area risks: `0`
- Q&A native text: `24`
- Q&A IMAGE roles: `2`
- Q&A same-parent text collisions: `0`
- Q&A 18 px safe-area risks: `0`

Intrinsic correction before promotion:

- snapshot 3 source hash `644f449c3bf2001a94d4b822d2b55e2614c11042` = `240×220`
- first AT test used `250×190`
- corrected before promotion to `238×185`.

Other active profile sources remain at or below intrinsic bounds.

Decision: `AT VERIFIED_LOCAL / ADOPTED AS PREFERRED`.

Rollback:

- AR `1389:2` renamed `ROLLBACK / ...` and hidden, not deleted.

## Experiment 2 — Chronology AS

Source problem: AQ chronology had already removed equal cards, but still visually read as `01–05 vertical rail on left / photo stack on right`.

Root-cause hypothesis: native chronology can keep all facts editable while event groups are distributed asymmetrically across the page. A scattered three-column rhythm plus a few strong photo anchors can read more like a Japanese travel feature than a process/timeline diagram.

Rollback-safe test:

- duplicate AQ → AS `1392:2`
- preserve the top feature-photo cluster and all native event copy;
- distribute events 01–05 across three unequal columns rather than one vertical list;
- keep three replaceable scene photos as staggered narrative anchors;
- preserve the full-width WEDDING endpoint strip;
- add no new image, card, shadow, gradient, decorative sticker, or generated binary.

Visual result:

- whole spread / ~794 px render: chronology no longer reads as a single left rail; event numbers, short native copy, and photos are interleaved across the page;
- actual chronology `793.7×1122.5`: PASS; visual path is feature cluster → 01/03/05 and support beats → WEDDING endpoint;
- spacing remains readable rather than becoming a dense dashboard/grid.

Structure:

- Story page native text: `12`, IMAGE roles `3`, collision `0`, safe risk `0` (unchanged visual authority from AQ)
- Chronology native text: `32`
- Chronology IMAGE roles: `6`
- same-parent text collisions: `0`
- 18 px text safe-area risks: `0`.

Intrinsic correction before promotion:

- event 3 source hash `644f449c3bf2001a94d4b822d2b55e2614c11042` = `240×220`
- first AS test used `245×150`
- corrected before promotion to `238×148`.

Decision: `AS VERIFIED_LOCAL / ADOPTED AS PREFERRED`.

Rollback:

- AQ `1387:2` renamed `ROLLBACK / ...` and hidden, not deleted.

## Live Figma after promotion

- Outer O `1370:2` — unchanged preferred
- Profile/Q&A AT `1392:95` — preferred
- Story/chronology AS `1392:2` — preferred
- AR `1389:2` — hidden rollback
- AQ `1387:2` — hidden rollback
- Start Here `845:27`: `V5 FU/FX · V6 O + AT/AS INSIDE STUDIES · V7 HOLD`

## Drive / generated-asset truth

Fresh Drive readback during this run:

- V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- Profile v2 `1IL1L8MWzaqkwVQv9CkLen4EkTccq-5cm`
- Timeline v2 `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8`

No Drive writes were made.

The neutral non-Rurubu in-file raster-export lesson was read as a capability hypothesis only. This run did not need a new fixed composed raster, so no Rurubu cross-scope reproduction was claimed and no procedural raster was added merely for activity.

## Asset lifecycle statement

- generated this run: `0`
- new Drive masters: `0`
- new external binary Figma placement: `0`
- existing verified replaceable images recomposed: `YES`
- generated section master adopted: `NO`
- native factual/variable text preserved: `YES`
- visible screenshot QA: `YES`
- structure/safe-area QA: `YES`
- rollback history preserved: `YES`
- V7 touched: `NO`

## Completion boundary

This is not print-ready and does not close V6. Final real photography/copy, exact printer template, bleed/trim/fold/page order, PDF preflight and physical proof remain outstanding.
