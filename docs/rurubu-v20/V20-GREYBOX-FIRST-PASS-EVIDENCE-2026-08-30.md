# V20 Greybox First-Pass Evidence — 2026-08-30

Status: `LIVE_FIGMA_STRUCTURAL_PROOF / P07_DISCOVERY_ROLE / P01_SOURCE_AWARE / NO FINAL DECORATIVE POLISH YET`

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

No final palette, final title art or final production photo placement is claimed by this evidence.

## 2. Whole-book silhouette result

The 8-page book-thumbnail review currently shows materially different silhouettes:

- P01: dominant cover hero + masthead + colliding cover hooks;
- P02: asymmetric person/profile structure;
- P03: story anchor + episodes + calm narrative field;
- P04: multiple destination zones with source-unknown elasticity;
- P05: one major Hawaii hero + emotional support + proposal calm field;
- P06: irregular photo-led mosaic;
- P07: discovery/map field with destination/theme collisions rather than chronology;
- P08: one calm closing image + message.

First-pass result: `PASS WITH TARGETED QA STILL REQUIRED`.

There is no evidence at this stage that all eight pages are one repeated card/template grammar.

## 3. Logical spread previews

Actual-size side-by-side QA previews exist for:
- P02–P03: `WHO → STORY`;
- P04–P05: `CENTER JOURNEY → PEAK`;
- P06–P07: `REAL LIFE → TODAY`.

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

Correction performed earlier:
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
The old schedule-first P07 evidence is superseded.

Current P07 production frame:
- `3287:29`;
- `P07_V20_GREYBOX / TODAY'S TRAVEL GUIDE / FIND THE JOURNEY`.

Current P07 preview clone:
- `3311:2`.

Current result: `PASS FIRST STRUCTURAL REVIEW`.

Observed:
- P06 reads photo-led / human / irregular;
- P07 reads graphic / discovery / map-and-destination-led;
- the spread now creates `REAL LIFE → TODAY` rather than `PHOTO MOSAIC → TIMETABLE`;
- P07 can communicate its job without photography;
- schedule-first/pre-arrival utility is no longer production authority.

See `V20-P07-SEATED-GUEST-GREYBOX-EVIDENCE-2026-08-30.md` for the dedicated replacement evidence.

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

### New direct `035.jpg` source evidence

On 2026-08-30 the raw `035.jpg` source was downloaded and pixel-opened.

Verified:
- source raster `4500 × 3000 px`;
- 3:2 landscape;
- bright Hawaii waterfront/park environment;
- couple is small and low/near center;
- large real palm geometry already enters from the top and sides;
- broad sky/water field gives title/copy room;
- foreground grass can support lower editorial vessels without covering faces.

Print consequence:
- full 4500 px width across 148 mm is roughly 772 ppi before crop;
- resolution is not the current P01 blocker;
- crop/recognition and title/photo interaction are the actual design constraints.

REAL → GENERATED bridge consequence:
- generated tropical art must extend/counterbalance the real palms instead of creating a second symmetrical palm wreath;
- keep generated density away from the small couple and masthead quiet zones;
- let the real source drive green/sky/warm accent weighting without flattening the whole cover into one sampled palette.

### Live P01 source-aware update

Production-greybox P01 `3287:5` was re-read live.

The hero slot was updated without claiming an image placement:
- hero node `3288:6` renamed to `PHOTO / HERO / 035 PROVISIONAL / REAL SOURCE 4500x3000`;
- hero annotation node `3288:7` changed to `HERO / 035 PROVISIONAL • 4500×3000 • COUPLE LOW-CENTER`;
- post-write P01 screenshot was captured for verification.

This is a semantic/source-aware production correction only. The actual raster is not yet placed in the Figma hero node.

### Image-transfer limitation

A fresh attempt to use Figma's raster upload slot for the raw local `035.jpg` reached the upload-URL allocation step, but the execution container could not resolve `mcp.figma.com` for the actual byte POST.

Observed error class:
- DNS resolution failure at upload host;
- no Figma mutation from the failed upload.

Decision:
- do not fake or claim image placement;
- preserve the verified local source evidence and live semantic hero binding;
- retry actual raster placement on a later run when the upload host is reachable;
- do not mine old V10/V11/V12 image fills as a workaround.

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

Correction performed earlier:
- lower support/detail roles were varied in size and vertical position;
- one support was raised into controlled overlap territory;
- micro photo and caption field were separated into unequal roles;
- hero remained dominant.

Post-correction result: `PASS FIRST STRUCTURAL REVIEW`.

This remains important V20 evidence: extra available photos must not automatically create a denser equal-card grid.

## 6. Page-specific status after current pass

### P01
`STRUCTURE READY / 035 SOURCE VERIFIED / ACTUAL IMAGE TRANSFER PENDING`
- three source-behavior variants exist;
- B/035 remains provisional first direction;
- raw 035 dimensions/composition were verified;
- live hero slot is source-aware;
- actual-image crop proof still waits for reliable Figma raster transfer.

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
`SEATED-GUEST DISCOVERY STRUCTURE PASS FIRST REVIEW / FINAL DETAILS NOT FROZEN`
- old timetable structure retired;
- discovery/map grammar is live in frame `3287:29`;
- final table/destination wording and 2–4 real wedding details still need verification before native-copy lock.

### P08
`STRUCTURE PASS FIRST REVIEW`
- deliberately quieter than P06/P07;
- source behavior based on calm `001.jpg` closing/transition role;
- final image selection waits for whole-book photo repetition review.

## 7. Remaining high-value blockers before final decorated production

Current high-value gaps:
1. actual-image P01 placement/crop proof when raster transfer is reachable;
2. real Okinawa photo pool;
3. real Korea photo pool;
4. non-Hawaii casual/everyday photos for P06;
5. actual Cookie/Melon photos only if photographic dog inclusion is desired;
6. Shogo solo portrait only if later P02 composition truly needs it;
7. non-Hawaii/courtship story-image mapping;
8. final verified P07 destination/theme wording and wedding-detail discoveries.

These source/content gaps remain more important than expanding governance.

## 8. Decoration / production gate

P01/P04–P05 may proceed with page-specific prepared asset work where source behavior is already verified, but decoration must not hide unresolved source gaps.

Valid next work:
- retry actual 035 image placement when transfer is available;
- compare real 035 crop against 031/023 only when their pixels can also be inspected/placed reliably;
- continue real-photo discovery;
- build only P01/P04–P05 page-specific generated/composed assets grounded in the verified sources;
- validate each important asset in the live composition before promotion;
- feed back only durable production lessons.

Do not produce a giant generic sticker library or resurrect a schedule-first P07.