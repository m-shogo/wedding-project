# RSL-232 — Duplicate cover taxonomy can simulate magazine-ness without adding reader value

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Source scope: Rurubu WEDDING / V7 Outer
Date: 2026-08-23

## Visible problem

V7 Outer C2 `2282:2` used a small `SUN / SWEETS / DINNER / MEMORY` strip near the top of the cover while the lower cover already contained a four-line service/index describing essentially the same semantic jobs. `SPECIAL ISSUE` also functioned as generic magazine-sounding furniture rather than wedding-publication information.

## Root-cause hypothesis

A high-energy magazine does not become more editorial merely by adding a second taxonomy layer in English. When the same content role is already carried by a reader-facing index, the duplicate strip becomes decorative schema leakage and competes with the real hierarchy.

## Principle tested

Give each small cover label one defensible editorial job. If an English taxonomy duplicates an already-readable service/index, test removing the duplicate and letting the remaining microcopy use the publication's actual reader-facing language.

This is NOT a rule to remove all English. Media names, destinations, proper nouns, genuinely useful bilingual navigation and fixed identity language may legitimately remain English/Latin.

## Bounded experiment

On rollback-safe C5 `2314:2` cloned from C2:

- hide `SUN / SWEETS / DINNER / MEMORY`;
- convert the lower service/index labels to Japanese `海辺 / 甘い午後 / 夜の食卓 / 寄り道`;
- convert `SPECIAL ISSUE` to `結婚記念号`;
- preserve the HAWAII fixed lockup, masthead, photo roles, layout geometry, palette and all V6 control work.

## Evidence

Three-scale result:

- 500 px whole-item PASS
- 1400 px reading PASS
- 1587×1123 actual-size PASS

Structure:

- parent `2052:2`
- visible native text `18`
- visible IMAGE-fill nodes `6`
- text intersections `0`
- 18 px safe risks `0`
- page flattening NO

C2 was preserved as hidden rollback.

## Fresh research observation used

POPEYE's own editorial history distinguishes a stable, meaningful publication identity from issue-specific content discovered through direct engagement with a place. The useful transfer is that cover language should express actual publication identity/content, not merely sound like magazine furniture. Current Tokyo TDC Japanese type work also supports treating Japanese language as an active display voice rather than assuming Latin labels are necessary for sophistication.

## Failure fingerprint

`F-RSL-232-DUPLICATE-COVER-TAXONOMY-SIMULATES-MAGAZINE-VOICE-WITHOUT-NEW-READER-JOB`

## Transfer boundary

May be tested in another print item when multiple micro-label systems repeat the same semantic job. Do not transfer V7's coral/cyan/yellow palette, Hawaii title treatment, cover composition, image roles, exact labels or magazine density.

## Drive truth note

The V7 Drive authority was re-listed during this run. Files named `v7_hawaii_beach_master.png` and `v7_food_field_note_master.png` were fetched and visually inspected; both are structural graphic placeholders rather than legitimate destination/food photography. Filename alone is not photo-role authority.
