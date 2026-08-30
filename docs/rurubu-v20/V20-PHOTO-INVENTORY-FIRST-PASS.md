# V20 Photo Inventory — First Pass

Status: `FIRST_PASS / METADATA_SHORTLIST_ONLY / PIXEL_REVIEW_REQUIRED`

Purpose: prevent V20 from designing photo slots that cannot be filled with real personal material.

This pass searches existing Drive organization as a source pool only. It does NOT inherit any old page assignment or old crop decision.

## Important evidence rule

Filename and file size are shortlist signals only.

No candidate becomes a V20 final photo until:
- actual pixels are visually inspected;
- subject identity/role is correct;
- orientation/crop is viable;
- source pixel dimensions are checked;
- final intended print size is known;
- effective resolution is acceptable.

## Real-photo candidates currently easy to locate

### Hawaii / couple

1. `REAL_PHOTO_COVER_HAWAII_PALMS_COUPLE_WIDE_02.jpg`
   - Drive ID: `1G-8t1JbX-GyqeMhuPLCPjsLKT_oue4Rb`
   - file size: ~11.9 MB
   - filename suggests wide couple image;
   - possible roles: P01 hero, P04–P05 Hawaii hero;
   - do not assign until pixel/crop review.

2. `REAL_PHOTO_COVER_HAWAII_BEACH_COUPLE_FULLBODY_01.jpg`
   - Drive ID: `1QWhFJPWHhwF6tfShyYzWULMGc8YDm55P`
   - file size: ~5.3 MB
   - filename suggests full-body beach couple image;
   - possible roles: P01 support/hero, P05 Hawaii support;
   - pixel/crop review required.

3. `REAL_PHOTO_PROFILE_HAWAII_COUPLE_KISS_01.jpg`
   - Drive ID: `1sIghnrqtfs0WxwBiVdmsZopsQ29tIpiw`
   - file size: ~5.0 MB
   - filename suggests close couple moment;
   - possible roles: P03 story, P05 proposal/Hawaii support, P06 candid;
   - do not assume it is a suitable individual profile portrait.

4. `REAL_PHOTO_PROFILE_HAWAII_COUPLE_SHAKA_02.jpg`
   - Drive ID: `1eTF3D0qS7qocpCWDVCXkSdTFBwJQzW-o`
   - file size: ~4.2 MB
   - filename suggests playful couple image;
   - possible roles: P02 shared-life support, P06 best shots;
   - pixel/crop review required.

Drive also contains older duplicate/candidate-master copies of the same Hawaii images. V20 should use one canonical source per underlying photograph and avoid duplicate-file confusion.

## Non-real / supporting visual sources found

Examples include:
- generated Hawaii scenery;
- generated table/reception imagery;
- dummy couple imagery;
- Hawaii/Waikiki cutout scenery;
- corgi decorative illustrations.

These are NOT proof of a personal memory and must never silently replace a missing real couple/travel photo.

Possible legitimate use after QA:
- decorative background/cutout;
- non-personal atmosphere;
- small illustrative support.

They should be labeled GENERATED / DECORATIVE, not REAL MEMORY PHOTO.

## Current gaps from metadata search

### P01 Cover
Minimum real-photo source viability: `PARTIAL PASS`.

There are several Hawaii couple candidates. Need:
- pixel review;
- determine whether one has enough clean crop/headroom for masthead overlap;
- decide whether V20 cover should be Hawaii-heavy or use a more neutral wedding/couple hero if available elsewhere.

### P02 Profile
Status: `GAP / NEEDS SOURCE REVIEW`.

The easily located real photos are couple photos, not clearly individual SHOGO/SHIORI portrait sources.

Need:
- one strong SHOGO portrait or crop-viable source;
- one strong SHIORI portrait or crop-viable source;
- 1–2 personality/detail sources.

Do not build two fixed portrait frames until source feasibility is checked.

### P03 Story
Status: `PARTIAL / NEEDS STORY SOURCES`.

Hawaii couple images can support later story moments, but the early-outing/relationship story needs real source photos if available.

No `REAL_PHOTO_STORY` metadata hit was found in the first search.

### P04–P05 Center Journey
Status: `HAWAII STRONG / OKINAWA + KOREA GAP`.

Hawaii has multiple real candidates.

First metadata searches for `OKINAWA` / `沖縄` / `KOREA` did not surface clearly named real personal-photo files; results were mostly references/frames/generated material.

Need:
- real Okinawa photo set;
- real Korea photo set;
- ideally 2–3 strong source candidates per destination so layout is not forced by one photo.

Do not fill destination memory modules with generated scenic art and present them as the couple's actual photographs.

### P06 Best Shots / Real Life
Status: `GAP`.

Need real candidates for:
- daily-life/candid couple;
- dogs Cookie/Melon if included;
- activities/food/details that actually belong to the couple.

Search for the dog names did not immediately find real-photo metadata. Corgi illustrations exist, but those are decoration only.

### P07 Wedding Day Guide
Status: `NOT BLOCKING`.

The page can function with typography/route/verified facts and 0–2 photos.

Real venue/detail photos are optional and should be added only if they improve the page.

### P08 Back Cover
Status: `NOT BLOCKING`.

Can use:
- one unique calm real photo;
- or one deliberate reprise after the rest of the book photo selections are known.

Do not select P08 first.

## Photo acquisition priority

Highest-value missing sources:

1. individual/crop-viable profile photos for both people;
2. Okinawa real photos;
3. Korea real photos;
4. early-story/courtship photos;
5. candid/daily-life photos;
6. real Cookie/Melon photo(s);
7. optional venue/detail photos.

## Source quantity target before V20 greybox polish

Minimum practical source pool before committing detailed masks:
- P01: 2–3 plausible hero/support sources;
- P02: 2 portrait candidates + 2 support candidates;
- P03: 3 story candidates;
- P04–P05: at least 2 candidates per destination, with 1 strong Hawaii hero;
- P06: at least 6 candid/detail candidates;
- P07: no photo minimum if typography-only structure is strong;
- P08: choose later from unused pool.

The source pool should be larger than the number of final slots so the design can choose crops instead of accepting the only available image.

## Next photo action

Before detailed Figma composition:
1. search/browse the couple's broader Drive photo sources, not only the old Rurubu-organized folder;
2. collect exact Drive IDs for Okinawa/Korea/profile/candid/dog candidates;
3. visually inspect top candidates;
4. record dimensions/orientation/focal point;
5. assign provisional V20 roles;
6. only then freeze page mask geometry.

This is a deliberate delay of detailed photo-mask construction, not a design blocker.