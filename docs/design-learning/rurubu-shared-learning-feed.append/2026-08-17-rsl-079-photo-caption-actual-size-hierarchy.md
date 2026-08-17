# RSL-079 — Photo clusters need actual-size caption hierarchy, not metadata residue

Source scope/item: Rurubu WEDDING V6
Date: 2026-08-17
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Several Rurubu photo roles were structurally correct and already passed image/provenance checks, but their captions still reduced perceived finish:

1. Profile's three-photo memory cluster used 9px English metadata, so the photos read partly like placed assets rather than a deliberate editorial sequence.
2. Outer cover's small rotated postcard used a 9px dark caption over photography, making the caption barely readable at actual size.
3. Story's small `NEXT DESTINATION / YOKOHAMA` support-photo caption was only 8.5px and became too weak beside the dominant hero and large Japanese story typography.

## Root-cause hypothesis

A photo can be correctly cropped, replaceable, intrinsic-safe, and visually strong while its nearby caption still exposes template/production residue. Before adding another card, sticker, or generated decoration, test whether native caption scale, contrast, placement, and sequence can give the image a clear editorial role.

## Bounded tests

### Profile / DA

Rollback-safe DA changed only the three native snapshot captions to a visible numbered Japanese sequence at 12px. No photo geometry, hashes, cards, decoration, or factual Profile/Q&A content changed.

The first 03-caption placement failed structural QA by colliding with profile data. That placement was rejected; the caption was moved to a safe lower-right gap and revalidated.

### Outer / AC

Rollback-safe AC changed only the small postcard caption: 9px dark → 10.5px white with restrained shadow and a better in-photo position. No photo geometry, image hash, masthead, cover hierarchy, or back cover changed.

### Story / DB — receiving role verification inside the same Rurubu item

After AC/DA, the same hypothesis was tested on a materially different photo role rather than copied blindly. DB changed only Story's small support-photo caption:

- 8.5px → 10.5px;
- native text remained editable;
- white text + restrained shadow improved contrast over photography;
- photo geometry, image hash, Story hero, lower feature photo, chronology page, and all factual copy remained unchanged.

This independently reproduced the benefit on a different page/role while preserving the existing Story composition.

## Expected improvement

- make support photos read as intentional magazine beats rather than anonymous placed images;
- improve caption readability at actual print scale;
- preserve native editability and replaceable image roles;
- avoid solving a micro-hierarchy defect by adding another UI-like container.

## Regression risk

- enlarged captions can collide with adjacent facts or photos;
- in-photo captions can fail contrast on a future replacement image;
- numbering/caption copy can become an item-specific style signature if transferred literally.

Therefore any material caption reposition or image replacement requires fresh actual-size and collision/contrast QA.

## Three-scale evidence

Profile DA:

- whole spread 500×354 PASS;
- reading spread 1000×708 PASS;
- actual-size Profile 794×1123 PASS after correcting the rejected collision;
- final Profile text collisions 0;
- 18px text safe-area risks 0.

Outer AC:

- whole outer 500×354 PASS;
- reading outer 1000×708 PASS;
- actual-size front 794×1123 PASS;
- front text collisions 0;
- 18px text safe-area risks 0.

Story DB:

- reading spread 1000×708 PASS;
- actual-size Story 794×1123 PASS;
- Story text collisions 0;
- 18px text safe-area risks 0;
- chronology geometry/content unchanged from CY.

## Figma / Drive / GitHub evidence

Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

- AC `1614:2`, front `1614:47`, postcard caption `1614:58`;
- DA `1612:2`, Profile `1612:3`, captions `1612:32 / 1612:33 / 1612:34`;
- DB `1615:2`, Story `1615:3`, support caption `1615:19`;
- prior Outer AB `1607:2`, Profile/Q&A CZ `1609:2`, and Story/Chronology CY `1601:81` preserved as hidden rollback.

Drive authority re-read:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AC-DA-CY-PHOTO-CAPTION-HIERARCHY-QA-2026-08-17.md`;
- DB-specific Story support-caption evidence is recorded in the same run feedback/current-status chain.

## Adopted / rejected / blocked

- DA: adopted after one rejected caption placement and correction.
- AC: adopted.
- DB: adopted after actual-size + structural QA.
- new image generation: 0.
- new Drive write: 0.
- generated decoration adoption: 0.

## What must remain Rurubu-specific

Do not transfer the exact `01/02/03` wording, magenta/cyan/navy palette, postcard placement, Story caption placement, Japanese travel-magazine grammar, photo choices, or specific caption coordinates.

## Cross-item applicability hypothesis

On another print artifact, if a support photo or photo cluster is structurally correct but still feels like an unresolved template, independently test native caption hierarchy and actual-size contrast before adding a new container or decorative asset. Re-run collision/safe-area/contrast QA after the change; do not assume a caption that works over one photo will work over a replacement.
