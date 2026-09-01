# V20 Content Inventory

Status: `GROUNDING_AUTHORITY / CURRENT_PAGE_ARCHITECTURE_ALIGNED_2026-09-01`

This file inventories real content for the current page map. It does not grant authority to old page structures.

Highest page-role authority: `V20-CURRENT-PAGE-ARCHITECTURE.md`.

## Fixed production constraints

- A5 portrait;
- trim 148 x 210 mm;
- 8 pages;
- wedding date `2026.10.24`;
- numeric date `20261024`;
- P08 barcode digits `2026102400000` exactly;
- editable Figma master;
- replaceable people/travel/family/friend/life photos;
- factual/personal text stays native/editable;
- whole-page flattening is not the editable master.

## Grounding states

- `FIXED`: sufficiently grounded.
- `GROUNDED_CANDIDATE`: project evidence exists but exact wording/photo selection may still change.
- `TODO`: user/source confirmation needed before final copy lock.
- `DO_NOT_INFER`: AI must never fabricate it.

## Identity / event facts

- `SHOGO`: FIXED display name.
- `SHIORI`: FIXED display name.
- wedding date `2026.10.24`: FIXED.
- location label `YOKOHAMA`: FIXED where used.
- marriage registration date `2026.02.11`: FIXED.
- overall concept `TRAVEL`: FIXED.

Do not recover wrong historical date variants.

# Current content blocks

## A. P01 Cover

Purpose: open the booklet with immediate magazine energy.

Grounded:
- names;
- wedding date;
- current approved `るるぶ WEDDING` masthead direction;
- verified couple/Hawaii photo sources already exist in the project.

TODO:
- final exact cover hooks if any.

Do not force detailed contents onto the cover.

## B. P02 Couple profile

Purpose: let guests understand each person quickly.

Grounded:
- display names;
- couple/dog-life material exists elsewhere in the project;
- dogs Cookie/Melon are project-grounded.

TODO where published:
- birthdays;
- hometowns;
- jobs;
- favorite foods;
- person-specific hobbies/preferences/personality copy.

Architecture implication:
- page must work with only 3–5 short facts per person;
- maximum 1–2 short Q&A snippets;
- no timeline or travel archive here.

## C. P03 Relationship story

Purpose: explain the emotional path to the wedding day.

Grounded candidate roles:
- meeting / early outings;
- relationship progression;
- Hawaii proposal;
- marriage registration;
- wedding day arrival.

TODO:
- exact meeting date/year;
- exact dating start;
- exact proposal date/year;
- any anecdotal wording not already sourced.

Architecture implication:
- 3–4 chapters max;
- dates are optional metadata unless confirmed;
- destination-photo detail belongs mainly on P04.

## D. P04 Travel memories

Purpose: gather the couple's travel memories on one page.

Grounded candidate destinations include:
- Okinawa;
- Korea;
- Hawaii;
- other real trip material supplied/verified later.

Hawaii is no longer reserved for P05.

Architecture implication:
- this is the strongest travel-editorial interior page;
- target 5–7 unequal photos;
- 2–4 memory/destination clusters;
- no generic destination facts;
- proposal may be referenced as a Hawaii memory, while relationship meaning remains on P03.

Current source gap:
- P04 still needs verified real travel-photo selection beyond the already verified Hawaii material.

## E. P05 Family & friends memories

Purpose: show the people and relationships that have surrounded the couple.

This is now a fixed page role.

Current state:
- exact family/friend photo assignment and captions are TODO/source-dependent;
- no person names, relationship labels or anecdotes should be inferred from faces alone.

Architecture implication:
- target 5–7 real photos;
- one anchor + supporting family/friend memories;
- FAMILY and FRIENDS clusters may be used if the real source pool supports them;
- faces must remain readable at A5;
- old P05 Hawaii/proposal assets have no current role authority.

## F. P06 Real life / favorites / best shots

Purpose: show everyday personality that does not belong in formal profile/story/travel pages.

Expected grounded source types:
- candid couple photos;
- daily-life photos;
- dog photos;
- food/activity/hobby details where personally meaningful.

Architecture implication:
- target 4–6 photos;
- one candid hero;
- very short captions;
- do not duplicate P04 travel imagery.

Current source gap:
- real LIFE / FOOD / PET-LIFE / FUN source pool remains incomplete.

## G. P07 Closing message

Purpose: emotionally close the interior pages.

Grounded:
- names/date/location;
- strong real closing-photo candidates may be recovered from prior P08 source evidence.

TODO:
- final thank-you/closing wording.

Architecture implication:
- one strong photo;
- roughly 40–100 Japanese characters if a personal message is used;
- deliberately low density.

Explicitly obsolete here:
- `TODAY'S TRAVEL GUIDE`;
- `11 DESTINATIONS`;
- table/destination discovery guide;
- `LOOK AROUND`;
- `EDITOR'S PICK`;
- timetable/schedule.

## H. P08 Magazine back cover

Purpose: finish the physical booklet like a restrained magazine back cover.

Fixed:
- barcode human-readable digits `2026102400000`.

Allowed:
- 0–1 calm photo/background;
- tiny issue/meta mark;
- optional small names/date;
- one tiny travel/wedding mark;
- decorative barcode.

Barcode rule:
- preserve exact digits;
- use Code 128-compatible/decorative treatment if encoded;
- do not silently alter the last digit for EAN-13 checksum.

Do not put:
- main thank-you message;
- feature collage;
- old P07 discovery content;
- QR unless explicitly supplied;
- fake real publisher/price/ISBN/JAN claims.

# Q&A

No dedicated Q&A page.

If strong real answers arrive:
- maximum 1–2 short snippets on P02;
- optionally one tiny life-oriented snippet on P06 if it materially helps.

Never fabricate answers.

# Travel-theme wedding details / old P07 material

Table destinations, decor discoveries, `11 DESTINATIONS`, `LOOK AROUND`, `EDITOR'S PICK` and similar material are **not part of the current fixed eight-page architecture**.

They may remain in historical project records for provenance, but do not assign them page space unless the user explicitly reopens that idea.

# Known schedule facts

Existing wedding schedule facts remain project facts but have no dedicated Rurubu page role.

Do not use them to recreate an old P07 itinerary/timetable.

# Explicitly out of scope

Do not allocate meaningful V20 space to:
- dress code;
- access/transit directions;
- parking;
- check-in/arrival instructions;
- what to bring;
- RSVP;
- generic wedding etiquette;
- duplicated menu/drink/seating/escort utility.

# Working photo budget

Current rough target:
- P01: 1–3;
- P02: 2–3;
- P03: 2–4;
- P04: 5–7;
- P05: 5–7;
- P06: 4–6;
- P07: 1–2;
- P08: 0–1.

Total unique-photo target: approximately 20–30, adjusted after real source review.

# Hard anti-fabrication rule

When content is missing:
- leave a semantic placeholder;
- reduce the module;
- substitute a verified photo-led treatment;
- or remove the module.

Never invent a date, memory, quote, preference, relationship label, person identity, venue fact, decor fact or travel fact to satisfy a layout.