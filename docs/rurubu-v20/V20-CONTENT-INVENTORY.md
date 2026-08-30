# V20 Content Inventory

Status: `GROUNDING_AUTHORITY_BEFORE_LAYOUT / SEATED_GUEST_CONTEXT`

V20 is a clean-slate visual redesign. This file may recover factual content from older project records, but it does not inherit any prior page structure, composition, Figma geometry, color assignment, or visual rule.

Primary reading context: guests are already at the wedding/reception venue and seated. V20 is therefore a table-side editorial booklet, not a pre-arrival logistics guide.

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

### E. Today's wedding discoveries / seated guest guide
Purpose: reward guests who are already seated by making the wedding's travel concept more discoverable and enjoyable.

This supersedes the previous assumption that P07 should be a schedule-first utility page.

Strong candidate content:
- confirmed table/décor destination themes;
- travel motifs guests can physically notice around the room;
- 2–4 wedding details that have real meaning to the couple;
- small `LOOK AROUND` / `EDITOR'S PICK` discoveries;
- one small photo/detail illustration only when useful.

Current project context contains an 11-table destination/theme concept. Final destination wording/order and any table-specific facts remain TODO before final copy lock.

Architecture implication:
- build P07 as a visual editorial discovery page, not a timetable/table UI;
- the point is not to tell guests where to sit; they are already seated;
- use route/map/travel-magazine language as visual storytelling, not navigation instructions;
- this page should create conversation and encourage guests to look around the venue.

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

## Known schedule facts — retained but de-prioritized in V20

Confirmed project facts remain:
- Ceremony `14:10–14:40`;
- `14:40–15:00` wording unresolved;
- Reception `15:00–17:30`.

These remain valid project facts but do NOT automatically justify a dedicated Rurubu page because the primary V20 reading moment is after guests have arrived and are seated.

Default treatment:
- no schedule-first P07;
- do not feature ceremony timing just because it is known;
- if a time later supports a specific editorial moment, keep it native and minor;
- dedicated timetable/logistics belong in another artifact if needed.

DO NOT INFER:
- opening time;
- exact gate/floor;
- transport credentials;
- flight number;
- QR destination;
- unresolved 14:40–15:00 instructions.

## Explicitly out of scope for seated V20

Do not allocate meaningful page space to:
- dress code;
- access directions;
- nearest station / transit guidance;
- parking information;
- check-in/arrival instructions;
- what to bring;
- RSVP information;
- generic wedding etiquette;
- other pre-arrival reminders.

## Duplication boundary with other paper items

If another wedding paper item already carries functional information, V20 should not duplicate it as filler.

By default do not repeat:
- food menu;
- drink menu;
- seating chart;
- escort-card function;
- functional ticket data.

They may appear only as tiny thematic/editorial references if useful.

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
Use only when tied to a real memory.

Decision:
- food is supporting editorial material, not a mandatory page theme;
- do not repeat reception menu content already owned by another paper item.

## Recommended content budget

The purpose of the budget is to prevent late-stage shrinking and overcrowding.

- total unique photo target: about 24–32 usable images across the booklet;
- intentional repeat of the same image: maximum 1 repeat unless it is a deliberate cover/back-cover reprise;
- body-copy blocks: short; avoid any page whose design only works because body text is forced below comfortable A5 size;
- destination/story paragraphs: roughly 45–100 Japanese characters per module as a working target;
- gallery captions: roughly 10–35 Japanese characters;
- profile facts: short label/value pairs rather than long prose;
- P07 discovery callouts: usually 1–3 lines each, visually scannable from the table;
- P08 closing message: approximately 40–100 Japanese characters if used.

These are layout budgets, not forced copy lengths.

## Content architecture gate result

The strongest architecture should be built around:
1. cover;
2. profile;
3. relationship story;
4. center-spread travel memories;
5. photo-led life/best shots;
6. seated wedding-day discoveries / travel-theme guide;
7. closing.

This structure remains useful even when Q&A and minor profile facts arrive late. It also avoids wasting premium A5 magazine space on information the guest needed before arriving.

## Hard anti-fabrication rule

When content is missing:
- leave a semantic placeholder;
- reduce the module;
- substitute a verified photo-led module;
- or remove the module.

Never solve missing personal content by inventing a date, memory, quote, preference, venue fact, schedule fact, decor fact, or relationship detail.