# V20 Greybox First-Pass Evidence — 2026-08-30

Status: `LIVE_FIGMA_STRUCTURAL_PROOF / NO DECORATIVE POLISH YET`

Purpose: record what has actually been built and visually reviewed in the new clean-slate V20 Figma surface so later work does not regress to pre-proof assumptions.

## 1. Live V20 Figma surface

Figma file key:
- `bfM0d4c9dCeBv5pCkJ3TNM`

New clean-slate page:
- page `3287:2`
- `13_RURUBU_V20_GREYBOX`

This page was created new. V10/V11/V12 production geometry was not copied into it.

Production-greybox frames:
- P01 `3287:5`
- P02 `3287:9`
- P03 `3287:13`
- P04 `3287:17`
- P05 `3287:21`
- P06 `3287:25`
- P07 `3287:29`
- P08 `3287:33`

Each page uses the V20 physical working model:
- full-bleed A5 frame approximately `582.05 × 816.38 px`;
- trim guide inset approximately `11.34 px`;
- safe-copy guide inset approximately `34.02 px`.

No final palette, flower/sticker decoration, final title art or production photo placement is part of this pass.

## 2. Whole-book silhouette result

The 8-page book-thumbnail review currently shows materially different silhouettes:

- P01: dominant cover hero + masthead + small cover hooks;
- P02: asymmetric person/profile structure;
- P03: story anchor + episodes + calm narrative field;
- P04: multiple destination zones with source-unknown elasticity;
- P05: one major Hawaii hero + emotional support + proposal calm field;
- P06: irregular photo-led mosaic;
- P07: large-time chronology;
- P08: one calm closing image + message.

First-pass result: `PASS WITH TARGETED QA STILL REQUIRED`.

There is no evidence at this stage that all eight pages are one repeated card/template grammar.

## 3. Logical spread previews

Actual-size side-by-side QA previews were created for:
- P02–P03: `WHO → STORY`;
- P04–P05: `CENTER JOURNEY → PEAK`;
- P06–P07: `LIFE → TODAY`.

These are QA clones only, not export masters.

### P02–P03
Current result: `PASS FIRST STRUCTURAL REVIEW`.

Observed:
- P02 is scan-oriented and portrait/fact-led;
- P03 is narrative and episode-led;
- shared publication identity exists without mirror symmetry;
- the pair does not read as two employee/profile cards.

### P04–P05
Initial result exposed a real structural failure:
- P04 route exited near the lower fold;
- P05 route originally entered much higher;
- therefore the journey line did not visually survive the fold.

Correction performed:
- production P05 route-entry node `3289:23` moved to lower fold alignment;
- QA preview route-entry node `3291:71` matched;
- P04 unresolved Okinawa/Korea image zones were given visible neutral image weight while retaining dashed `SOURCE UNKNOWN` semantics.

Post-correction result: `PASS FIRST STRUCTURAL REVIEW`.

Current intended spread hierarchy:
`P04 EXPLORE → fold route → P05 HAWAII PEAK → ARRIVAL YOKOHAMA`.

Important:
- unresolved Okinawa/Korea source masks are still elastic;
- their visible grey weight is only for composition evaluation;
- no fake memory image was inserted.

### P06–P07
Current result: `PASS FIRST STRUCTURAL REVIEW`.

Observed:
- P06 reads photo-led / human / irregular;
- P07 reads information-led / chronological;
- adjacent pages are strongly differentiated;
- P07 does not need photography to communicate its job.

## 4. P01 source-behavior silhouette test

QA container:
- `3295:2 / QA / P01 COVER SOURCE-BEHAVIOR VARIANTS`

Full-size variants:
- A `3295:5` — `OPEN ENVIRONMENT / 031`
- B `3295:19` — `TROPICAL FRAME / 035`
- C `3295:33` — `DRAMATIC SCALE / 023`

The variants are based on visually inspected real Hawaii source behavior, not invented placeholder-photo assumptions.

### Structural read

A — OPEN ENVIRONMENT:
- strongest straightforward masthead capacity;
- clear separation between title, environmental hero and cover hooks;
- robust and readable;
- risk: can become conventional if later decoration/overlap stays too safe.

B — TROPICAL FRAME:
- strongest current match to V20's desired energetic editorial behavior;
- hero/environment and masthead overlap more naturally;
- supports page-edge tension and future layered parts;
- still leaves a clean lower hook cluster;
- current provisional favorite for the next proof stage.

C — DRAMATIC SCALE:
- strongest editorial/nature scale contrast;
- visually distinctive and potentially beautiful;
- current greybox is deliberately less information-dense;
- risk: may drift toward premium travel/photo-book minimalism rather than the joyful high-density travel-magazine target if supporting editorial language is too restrained.

Current provisional direction:
`B / TROPICAL FRAME / 035` first, `A / 031` fallback, `C / 023` experimental alternate.

This is NOT final photo selection. Actual-image-in-layout comparison is still required before final cover crop is frozen.

### Tooling limitation encountered

An attempt was made to upload the raw local `031 / 035 / 023` files directly into the QA hero nodes. The local execution environment could not resolve the Figma upload host, so the upload POST did not execute.

No Figma corruption occurred.

A read-only search for already-imported matching image fills on `00_RURUBU_START_HERE` returned no matching named image fill.

Decision:
- do not waste time mining old layout pages merely to force the images into this QA now;
- retain the source-behavior geometry proof;
- perform actual-image comparison when reliable image transfer is available.

## 5. P06 photo-count resilience test

QA container:
- `3297:2 / QA / P06 PHOTO-COUNT RESILIENCE`

Variants:
- MIN `3297:5` — 3 meaningful photos;
- IDEAL `3297:21` — 5 meaningful photos;
- MAX `3297:39` — 7 meaningful photos.

All variants preserve the same title/caption type-size intent.

### MIN / 3
Result: `PASS`.

The page still feels intentionally composed with:
- one dominant personality hero;
- two meaningful supports;
- a larger caption/shared-life field.

It does not require filler photos to look complete.

### IDEAL / 5
Result: `PASS`.

The irregular mosaic has enough variety without weakening the hero.

### MAX / 7
Initial result: `FAIL — EQUAL TILE DRIFT`.

Observed failure:
- lower supporting images started forming a quasi-equal horizontal tile row;
- this reproduced the UI/Instagram-grid behavior V20 explicitly rejects.

Correction performed:
- lower support/detail roles were varied in size and vertical position;
- one support was raised into controlled overlap territory;
- micro photo and caption field were separated into unequal roles;
- hero remained dominant.

Post-correction result: `PASS FIRST STRUCTURAL REVIEW`.

This is important V20 evidence: extra available photos must not automatically create a denser equal-card grid.

## 6. Page-specific status after first pass

### P01
`STRUCTURE READY FOR SOURCE-AWARE COVER PROOF`
- three source-behavior variants exist;
- B/035 is provisional first direction;
- final choice waits for actual-image comparison.

### P02
`STRUCTURE PASS / CONTENT + PHOTO INTAKE STILL OPEN`
- works without requiring a fake/nonexistent Shogo solo portrait;
- Shiori solo source `010.jpg` is available if desired;
- can later switch to a two-solo solution only if a real Shogo source surfaces.

### P03
`STRUCTURE PASS / STORY SOURCE MAPPING STILL OPEN`
- story order works without exact dates;
- Hawaii emotional sources can demonstrate image role;
- courtship/non-Hawaii activity sources remain unmapped.

### P04
`STRUCTURE PROVISIONAL / SOURCE-DEPENDENT`
- Okinawa/Korea masks are deliberately elastic and marked unknown;
- do not freeze exact orientation/frame treatment yet.

### P05
`STRUCTURE PASS FIRST REVIEW`
- Hawaii has enough visually reviewed real-photo depth to support hero/emotion roles;
- proposal copy has a distinct calm field;
- staged romantic photos remain factually separate from actual proposal-event claims.

### P06
`CHANGE-RESILIENCE PASS FIRST REVIEW`
- 3/5/7 image states tested;
- 7-image equal-tile failure found and repaired.

### P07
`STRUCTURE PASS FIRST REVIEW / FINAL COPY NOT FROZEN`
- chronology hierarchy is visible without photo dependency;
- 14:10 and 15:00 are major anchors;
- 14:40–15:00 remains unresolved native-copy territory;
- current greybox includes a deliberately long multi-line copy support.

### P08
`STRUCTURE PASS FIRST REVIEW`
- deliberately quieter than P06/P07;
- source behavior based on calm `001.jpg` closing/transition role;
- final image selection waits for whole-book photo repetition review.

## 7. Remaining high-value blockers before decorative production

Photo/content gaps remain more important than new governance:
1. real Okinawa photo pool;
2. real Korea photo pool;
3. non-Hawaii casual/everyday photos for P06;
4. actual Cookie/Melon photos only if photographic dog inclusion is desired;
5. Shogo solo portrait only if later P02 composition truly needs it;
6. non-Hawaii/courtship story-image mapping;
7. final P07 14:40–15:00 wording;
8. actual-image cover comparison for 031/035/023.

## 8. No-decoration gate remains active

Do NOT begin final flowers/stickers/stamps/display-art polish merely because this first greybox looks coherent.

Next valid work:
- continue source-photo discovery;
- source-aware page-manual updates;
- actual photo-in-mask proof where sources are reliable;
- P01 provisional selection validation;
- P07 copy stress / zero-photo confirmation;
- then greybox freeze review.

Only after the greybox freeze passes should V20 Parts System placement become a production priority.
