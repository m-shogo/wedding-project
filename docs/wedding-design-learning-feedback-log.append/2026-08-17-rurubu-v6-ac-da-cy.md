# Rurubu V6 feedback — AC + DA/DB

Date: 2026-08-17
Scope: Rurubu WEDDING only

## Observation

After AB + CZ/CY, the next visible weakness was not image selection or page geometry. It was photo-caption finish:

- Profile's lower three-photo cluster still used tiny 9px implementation-like metadata;
- the front-cover postcard caption was too dark/small over photography at actual size;
- Story's small destination-support caption remained only 8.5px and disappeared beside the dominant hero and large Japanese story typography.

## Hypothesis

Native caption hierarchy and contrast could make existing valid photos read as stronger editorial beats without adding cards, generated decoration, image bytes, or new photo roles.

## Bounded experiments

### DA Profile

Changed only the three snapshot captions to a numbered 12px Japanese micro-sequence with Rurubu-specific accent colors. First 03 placement collided with Profile data and was rejected. Final placement moved into the lower-right safe gap.

Expected improvement: photo cluster reads as `01 → 02 → 03` travel memories rather than anonymous thumbnails.

Regression risk: caption collisions; future replacement-photo contrast mismatch.

Result: adopted after correction.

### AC Outer

Changed only the small top-right postcard caption from 9px dark to 10.5px white with restrained shadow and a better in-photo position.

Expected improvement: readable support-image caption without another label box.

Regression risk: future photo replacement may require contrast reposition/review.

Result: adopted.

### DB Story

Applied the same principle to a materially different Rurubu photo role rather than copying the exact treatment. Changed only `NEXT DESTINATION / YOKOHAMA` from 8.5px to 10.5px white native text with a restrained shadow and slightly better in-photo position.

Expected improvement: small destination photo remains subordinate but readable at actual size, preserving the page's hero/support hierarchy.

Regression risk: future replacement photo can change local contrast and require revalidation.

Result: adopted after Story actual-size and structural QA.

## Evidence

Figma:

- AC `1614:2`, front `1614:47`;
- DA `1612:2`, Profile `1612:3`;
- DB `1615:2`, Story `1615:3`;
- prior AB `1607:2`, CZ `1609:2`, CY `1601:81` hidden rollback;
- Start Here readback: `V5 FU/FX · V6 AC + DA/DB INSIDE STUDIES · V7 HOLD`.

Three-scale / actual-size QA:

- AC whole 500×354 PASS;
- AC reading 1000×708 PASS;
- AC front actual-size 794×1123 PASS;
- DA whole 500×354 PASS;
- DA reading 1000×708 PASS;
- DA Profile actual-size 794×1123 PASS after collision correction;
- DB reading spread 1000×708 PASS;
- DB Story actual-size 794×1123 PASS.

Structure:

- AC front text collisions 0;
- AC front 18px safe-area risks 0;
- DA Profile text collisions 0;
- DA Profile 18px safe-area risks 0;
- DA Q&A unchanged and retained verified structure;
- DB Story text collisions 0;
- DB Story 18px safe-area risks 0;
- DB chronology geometry/content unchanged from CY.

Asset lifecycle:

- generated 0;
- Drive saves 0;
- binary placements 0;
- raster bytes 0;
- image hashes changed 0;
- photo geometry changed 0;
- native text styling/content edits only.

## Learning status

RSL-079: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`, now reproduced across Profile cluster, Outer support postcard, and Story support-photo roles within Rurubu.

Transfer only the principle: support photos that still feel templated or unreadable may need stronger native caption hierarchy/contrast before any new container or decoration is added. Do not transfer Rurubu layout, coordinates, palette, copy, imagery, or exact shadow treatment.
