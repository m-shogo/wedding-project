# V20 Content Inventory

Status: `GROUNDING_AUTHORITY_BEFORE_LAYOUT`

V20 is a clean-slate visual redesign. This file may recover factual content from older project records, but it does not inherit any prior page structure, composition, Figma geometry, color assignment, or visual rule.

## Fixed production constraints

- format: A5 portrait;
- trim: 148 x 210 mm;
- page count: 8 pages fixed;
- working bleed assumption: 3 mm each side until printer template overrides it;
- production master: editable, page-by-page Figma source;
- replaceable people/travel/venue photos stay replaceable;
- changing guest-facing facts remain native text;
- whole-page flattening is not allowed as the editable master.

## Grounding states

- `FIXED`: sufficiently grounded for structural planning.
- `GROUNDED_CANDIDATE`: real project evidence exists, but wording/detail still needs final editorial confirmation.
- `TODO`: must be supplied/confirmed before final copy lock.
- `DO_NOT_INFER`: AI must never fill this from assumptions, photo metadata, generic wedding copy, or fabricated memory.

## Identity / event facts

- `SHOGO`: FIXED display name.
- `SHIORI`: FIXED display name.
- wedding date `2026.10.24`: FIXED.
- location label `YOKOHAMA`: FIXED.
- marriage registration date `2026.02.11`: FIXED.
- overall concept `TRAVEL`: FIXED.
- Japanese kanji spelling/glyph choice for final printed names: TODO before print if used.

## Strong content blocks

### A. Couple profile
Purpose: let guests quickly understand the two people.

Available now:
- display names: FIXED;
- couple/dog-life material exists as grounded candidate content;
- dogs `くっきー` / `めろん`: grounded project fact.

Still TODO if published:
- birthdays;
- hometowns;
- jobs;
- favorite foods;
- individual favorite places;
- person-specific hobbies/personality copy.

Architecture implication:
- profile deserves space, but V20 must not depend on many unconfirmed profile fields;
- build an elastic profile page that works with 3–7 facts per person;
- do not create a rigid employee-card grid.

### B. Relationship story
Purpose: explain the emotional path rather than only dates.

Grounded candidate material exists for:
- early outings such as bowling / board-game cafe / yakiniku / teamLab;
- relationship progression toward dating;
- Hawaii proposal;
- marriage registration;
- wedding day destination.

Still TODO:
- exact meeting date/year;
- exact dating start date;
- exact proposal date/year;
- exact cohabitation timing.

Architecture implication:
- use episode-led storytelling, not a date-heavy corporate timeline;
- missing dates must not weaken the design.

### C. Travel memories
Purpose: make the travel concept factual and personal rather than decorative.

Grounded candidate destinations:
- Okinawa;
- Korea;
- Hawaii;
- Yokohama as the current/final destination.

Hawaii has especially strong emotional material because the proposal episode is grounded.

Architecture implication:
- this is the strongest candidate for the center spread;
- use destination-led storytelling and photo hierarchy;
- exact sub-location/date stays native and optional until confirmed.

### D. Photo-led life / best shots
Purpose: show personality that prose cannot.

Expected source types:
- candid couple photos;
- travel photos not already acting as destination heroes;
- daily-life photos;
- dog photo(s);
- food/activity detail photos where real and relevant.

Architecture implication:
- create one highly visual page with very short captions;
- this page is the safety valve when factual profile/Q&A copy is still incomplete;
- it must not become a duplicate of the destination-led center spread.

### E. Wedding-day guide
Purpose: give guests useful information while continuing the travel-magazine concept.

Confirmed schedule facts in current project records:
- Ceremony `14:10–14:40`;
- `14:40–15:00` wording unresolved;
- Reception `15:00–17:30`;
- date/location label as above.

DO NOT INFER:
- opening time;
- exact gate/floor;
- transport credentials;
- flight number;
- QR destination;
- unresolved 14:40–15:00 instructions.

Architecture implication:
- deserves a dedicated utility page because the information is real and guest-useful;
- itinerary should read like an editorial travel plan, not a transit-app UI.

### F. Closing / thank-you
Purpose: close the physical booklet with emotional calm.

Available:
- names/date/location;
- travel/journey framing can support editorial copy.

TODO:
- final thank-you copy if a personal message is wanted;
- any QR/social/website destination.

Architecture implication:
- keep P08 deliberately calmer than the interior;
- no leftover-section dumping.

## Conditional content blocks

### Q&A
Current project evidence does not yet contain enough reliable paired answers for a full page.

Decision:
- do NOT allocate a fixed V20 page to Q&A;
- if strong answers arrive, insert 2–4 short Q&A modules into P02 profile or P06 life/best-shots without changing the book architecture;
- never fabricate answers to fill a predesigned module.

### Friends / family
Not enough grounded copy/photo assignment currently exists to justify a fixed page.

Decision:
- optional micro-caption/photo roles only if actual material is later supplied;
- no fixed V20 page allocation now.

### Food / cafe
Use only when tied to a real memory or wedding-day utility.

Decision:
- food is supporting editorial material, not a mandatory page theme.

## Recommended content budget

The purpose of the budget is to prevent late-stage shrinking and overcrowding.

- total unique photo target: about 24–32 usable images across the booklet;
- intentional repeat of the same image: maximum 1 repeat unless it is a deliberate cover/back-cover reprise;
- body-copy blocks: short; avoid any page whose design only works because body text is forced below comfortable A5 size;
- destination/story paragraphs: roughly 45–100 Japanese characters per module as a working target;
- gallery captions: roughly 10–35 Japanese characters;
- profile facts: short label/value pairs rather than long prose;
- P08 closing message: approximately 40–100 Japanese characters if used.

These are layout budgets, not forced copy lengths.

## Content architecture gate result

The strongest architecture should be built around:
1. cover;
2. profile;
3. relationship story;
4. center-spread travel memories;
5. photo-led life/best shots;
6. wedding-day utility;
7. closing.

This structure remains useful even when Q&A and minor profile facts arrive late. That resilience is intentional.

## Hard anti-fabrication rule

When content is missing:
- leave a semantic placeholder;
- reduce the module;
- substitute a verified photo-led module;
- or remove the module.

Never solve missing personal content by inventing a date, memory, quote, preference, venue fact, schedule fact, or relationship detail.