# Rurubu WEDDING V7 — Cafe/Table H3 food-first fixed-title QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Study page: `2052:2`
V6 control: unchanged `JC + IX + JB + IZ + IT + JA`

## Result

Cafe/Table H2 `2308:2` was preserved as hidden rollback and H3 `2311:2` was promoted as the current V7 Cafe comparison after a rollback-safe A/B test.

H3 keeps the same structural photo roles, crop geometry, sensory copy, closing copy and page rhythm as H2. The tested change is limited to the fixed, non-variable Table display headline.

- old visible native headline: `料理、皿、 / 手元、店の空気。`
- H3 fixed display hierarchy: `料理` is the primary appetite beat; `皿、手元、店の空気。` is the secondary place/context beat.
- editable source: `2311:24 / SOURCE / V7 TABLE FIXED DISPLAY TITLE / FOOD-FIRST HIERARCHY / EDITABLE`
- fixed placed raster: `2311:29 / FIXED PNG / V7 TABLE DISPLAY TITLE / FOOD-FIRST 4X / SOURCE PRESERVED`
- Figma image hash: `5a21222289076f5240eb74e3a47e355d3e251968`
- hidden native rollback headline inside H3: `2311:15`
- previous H2 root: `2308:2`, now hidden rollback

The source frame was exported internally at 4× (`520×150` placement from a `2080×600` export), then placed as a raster role. Variable/factual text was not flattened.

## Fresh professional research used

This run did not repeat FLUX/dancyu/TRANSIT as the deciding reference.

New/adjacent observations:

1. **HAWAIʻI Magazine** describes food as a way to experience place and explicitly relies on locally knowledgeable writers and photography. The useful principle is that food and place context should not be separated into unrelated decorative layers.
2. **Pit / magCulture** highlights Bobby Doherty's food photography as bold, fun and sometimes treated as a graphic object rather than only as appetite glamour. The useful principle is not to copy the photographic style, but to allow the food subject to own a stronger visual beat when the editorial role supports it.

Rurubu-specific hypothesis tested:

> On the V7 Table page, the fixed headline can encode the same editorial responsibility as the planned photography: food first, then the surrounding plate/hand/place context. A dedicated fixed display treatment should beat equal-weight ordinary title text at thumbnail scale without becoming a generic sticker or flattening variable content.

## Before / after learning check

H2 treated all title nouns at roughly the same display weight. H3 changed the decision because of the new food/place responsibility model:

- `料理` is now the clear first beat;
- `皿、手元、店の空気。` remains visible but subordinate;
- coral/yellow accents support the two semantic roles rather than adding unrelated tropical decoration;
- no new decorative English, card, badge, shadow, rounded container or fake sticker was added.

This is a real decision change, not a citation-only research note.

## Three-scale visual QA

- whole-item / 500 px: PASS; H3 is more immediately food-led than H2 while remaining recognizably the same publication.
- reading / 1400 px: PASS; secondary context line remains clearly readable and does not compete with the photo.
- actual-size / `1587×1123`: PASS; title hierarchy, accents and line breaks are stable.

## Structure QA

H3 `2311:2`:

- parent page: `2052:2`
- visible native text: `13`
- visible IMAGE fills: `5` total = 3 structural photo dummies + existing Cafe fixed title + new Table fixed title
- native text intersections: `0`
- 18 px text edge risks: `0` in this bounded audit
- whole-page flattening: `0`
- editable source preserved: YES
- replaceable structural photos remain independent roles: YES

## Six-view professional critique

- **Art director:** PASS — stronger table identity and clearer publication personality without unrelated decoration.
- **Editorial designer:** PASS — headline now communicates food-first → context second before the dominant photo.
- **Book designer:** PASS — the right page gains energy while the left Cafe page remains a different tempo; spread is not made uniformly loud.
- **Typographer:** PASS — Japanese hierarchy and line breaks remain intentional; no accidental one-character break was introduced.
- **Photo editor:** PASS WITH TRUTH GATE — headline hierarchy now matches the intended future photo brief, but the photos are still structural dummies and cannot validate final Hawaii authenticity.
- **Print designer:** DESIGN QA PASS ONLY — 4× fixed title has ample raster density for the current placement, but exact printer template/preflight/physical proof are still unknown.

## Asset truth

- newly generated Hawaii photography: `0`
- newly adopted Hawaii photography: `0`
- new Drive master: `0`
- production photo replacement: `0`
- new Figma fixed display raster: `1`
- structural photo dummies called final Hawaii assets: NO

## Decision

`H3 ADOPTED AS CURRENT V7 CAFE COMPARISON / VERIFIED_LOCAL DESIGN QA / NOT PREFERRED / NOT PRINT READY`.

This does **not** mean every fixed headline should become a raster treatment. The method is only justified when the copy is fixed, identity-bearing, and a bounded comparison shows a real editorial gain.
