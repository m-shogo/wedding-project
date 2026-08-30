# Rurubu WEDDING V20

Status: `CLEAN_SLATE_CANONICAL / SPEC_FIRST / ASSET_FIRST / FULL_EDITORIAL_COLLISION / SEATED_GUEST_EDITORIAL`

V20 is a complete redesign track.

It does NOT inherit V10/V11 page composition, Figma layout, page-role mapping, old reference nodes, old AI-look scoring, old prompts, frame geometry, component grammar or color assignment as design authority.

## Fixed production facts

- A5 portrait;
- trim 148 x 210 mm;
- 8 pages fixed;
- 3 mm bleed is the current working assumption until printer-specific template overrides it;
- editable Figma master;
- replaceable real photos;
- variable/authoritative text remains native.

## Reading context

V20 is primarily read after guests have arrived and are seated at the wedding/reception venue.

It is a table-side travel magazine about the couple and today's wedding experience, not a pre-arrival logistics leaflet.

Therefore V20 does NOT spend premium page space on dress code, access, transit, parking, arrival/check-in instructions, RSVP, what-to-bring reminders or other information the guest needed before arriving.

If another paper item owns menu/drink/seating/escort utility, V20 does not duplicate that content merely to fill space.

See `V20-SEATED-GUEST-CONTENT-CONTRACT.md`.

## North Star

Google Drive image:
- file ID `12ppT-SV-8OmOgz_a0MuhrkT3gNOOKsY3`;
- file `0c570e8f-ebc5-42c6-8512-b05644a8aa6a.png`.

This is taste/energy calibration only. It is NOT a template or page-coordinate authority.

## V20 canonical chain

Read in this order:

1. `V20-NORTH-STAR-IMAGE.md`
2. `V20-SEATED-GUEST-CONTENT-CONTRACT.md`
3. `V20-CONTENT-INVENTORY.md`
4. `V20-TRUTH-EDITORIAL-BOUNDARY.md`
5. `V20-CONTENT-ARCHITECTURE-GATE.md`
6. `V20-SPREAD-ARCHITECTURE.md`
7. `V20-READING-PATH-SYSTEM.md`
8. `V20-VISUAL-GRAMMAR.md`
9. `V20-PAGE-DIFFERENTIATION-MATRIX.md`
10. `V20-EDITORIAL-BUDGETS-AND-CHANGE-RESILIENCE.md`
11. `V20-PHOTO-ROLE-SYSTEM.md`
12. `V20-PHOTO-INVENTORY-FIRST-PASS.md`
13. `V20-HAWAII-RAW-PHOTO-REVIEW.md`
14. `V20-PHOTO-GAP-MATRIX.md`
15. `V20-PRODUCTION-GEOMETRY.md`
16. `V20-PAGE-MANUALS.md`
17. page-role overrides/addenda such as `V20-P07-SEATED-GUEST-PRODUCTION-BRIEF.md` when present;
18. `V20-GREYBOX-SILHOUETTE-SPEC.md`
19. `V20-ASSET-FIRST-ASSEMBLY-CONTRACT.md`
20. `V20-LAYER-OVERLAP-SYSTEM.md`
21. `V20-EDITORIAL-CONTAINER-AND-TITLE-GRAMMAR.md`
22. `V20-PARTS-SYSTEM.md`
23. `V20-P01-COVER-PRODUCTION-BRIEF.md`
24. `V20-P45-CENTER-SPREAD-PRODUCTION-BRIEF.md`
25. `V20-ASSET-PRODUCTION-QUEUE.md`
26. `V20-QUALITY-GATES.md`
27. `V20-ACCEPTANCE-EVIDENCE.md`
28. only then derive exact asset-generation and Figma placement instructions.

`V20-IDEA-BANK.md` is a controlled idea pool, not a mandatory design authority.

## Current preferred 8-page spine

- P01 COVER / DEPARTURE
- P02 WHO WE ARE / PROFILE
- P03 OUR STORY / HOW WE GOT HERE
- P04 CENTER SPREAD LEFT / JOURNEY DEPARTURE
- P05 CENTER SPREAD RIGHT / HAWAII PEAK + ARRIVAL
- P06 OFF THE MAP / BEST SHOTS + REAL LIFE
- P07 TODAY'S TRAVEL GUIDE / FIND THE JOURNEY AROUND YOU
- P08 BACK COVER / CONTINUE THE JOURNEY

Physical spread thinking:
- P02–P03;
- P04–P05 center spread = emotional/visual peak;
- P06–P07.

## High-leverage foundation set

These are the final foundation layers before production. Do not add more governance unless real production exposes a missing rule.

1. `SEATED-GUEST VALUE` — every content block must reward someone who is already inside the venue; pre-arrival instructions are removed.
2. `CHANGE RESILIENCE` — copy/photo/aspect changes must not trigger redesign or tiny type.
3. `PHOTO ROLES` — select HERO/EMOTION/PLACE/ACTION/DETAIL/etc before frame geometry.
4. `READING PATH` — define 1st/2nd/3rd/useful-info/micro-discovery hierarchy before decoration.
5. `TRUTH BOUNDARY` — separate FACT / EDITORIAL COPY / DECORATIVE FICTION; never fabricate autobiographical/operational facts.
6. `PAGE DIFFERENTIATION` — adjacent spreads should materially differ across at least four composition axes.
7. `ACCEPTANCE EVIDENCE` — prove scan order, A5 readability, editability, change resilience, provenance and anti-template behavior.
8. `PHOTO GAP MATRIX` — missing real-photo roles remain visible gaps rather than silently becoming generated fake memories or bad placeholder geometry.
9. `SOURCE-PIXEL REVIEW` — important real photos are visually opened and classified; filenames alone are never evidence of role/crop quality.
10. `GREYBOX BEFORE PARTS` — silhouette/hierarchy must pass before decorative assets are allowed to rescue weak layout.
11. `ASSET-FIRST ASSEMBLY` — most visual personality arrives as approved real photography and prepared editorial artwork; Figma behaves mainly as an editable compositor.
12. `FULL EDITORIAL COLLISION` — background, photo, frame, title, vessel, route, stamp and decoration may overlap strongly or nearly completely when hierarchy improves.
13. `TEXT SUPPORT, NOT SEPARATION` — readability is protected by paper fields, slabs, ribbons, keylines, local contrast and other support methods rather than by moving text away from imagery.
14. `EDITORIAL VESSELS, NOT GENERIC UI` — boxes/bands/cards/rounded shapes are welcome when they are page-aware magazine forms; repeated generic UI containers are not.
15. `PHOTO-FIRST GEOMETRY` — strongest real source behavior drives mask/frame geometry; frames never dictate important source cropping merely because they already exist.

## Asset-first rule

V20 should feel authored before the assets reach the final page.

Prepared artwork carries the difficult visual language:
- original masthead art;
- page-specific tropical/flower clusters;
- travel illustrations;
- paper/tape/stamp/ticket/ribbon treatments;
- irregular editorial vessels;
- title support/slab artwork;
- route front/back composites;
- handwritten/print accents;
- page-specific decorative devices.

Figma should mainly:
- place and overlap these assets;
- keep real photos independently replaceable;
- keep authoritative copy native/editable;
- manage masks, z-order, trim/safe geometry and final polish;
- resize text-support geometry when actual copy changes.

Do not build the editorial personality from repeated Figma cards, pills, rounded rectangles, generic gradients, generic icons or full-page Auto Layout.

## Full layer / overlap rule

V20 is NOT based on “small overlaps.”

Background, photography, frames, title art, boxes/bands, stamps, routes and decoration may cover one another heavily. There is no global overlap percentage.

Explicitly valid examples:
- masthead crosses HERO photo and frame;
- a feature box covers most of a photo corner;
- title sits behind a cutout subject while still reading clearly;
- paper field covers a large photo region to hold native text;
- support photo obscures HERO photo corner;
- route runs under one photo and over another through split assets;
- destination label crosses route + photo + frame;
- page-edge illustration is mostly cropped and partly hidden;
- a stamp is intentionally only partly visible.

The rule is: `COLLISION MAY BE STRONG; READABILITY AND HIERARCHY MUST BE STRONGER.`

## Editorial container rule

Do NOT translate anti-UI guidance into “no boxes / no bands / no rounded shapes.”

Use them as editorial forms:
- paper notes;
- tickets;
- ribbons;
- bursts;
- irregular slabs;
- caption tabs;
- postcard fields;
- stamp frames;
- vertical strips;
- quiet article fields;
- photo-bound labels;
- circles/ovals;
- asymmetric enclosures.

What is rejected is repeating the same generic card silhouette everywhere.

## Page-aware prepared assets

Prefer larger `EDITORIAL CLUSTER` assets over dozens of atomic stickers.

Examples:
- `V20_P01_TROPICAL_FRAME_CLUSTER_A`;
- `V20_P01_BOTTOM_EDITORIAL_CLUSTER_A`;
- `V20_P45_ROUTE_BACK_A` / `V20_P45_ROUTE_FRONT_A`;
- `V20_P45_LEFT_EDGE_TRAVEL_CLUSTER_A`;
- `V20_P05_PROPOSAL_HIGHLIGHT_A`;
- `V20_P08_CLOSING_EDGE_CLUSTER_A`.

A cluster may deliberately contain empty/transparent regions for faces/text/photo interaction.

## Current photo evidence consequence

The raw `ハワイ写真` folder has been visually reviewed for multiple source roles. Hawaii currently has enough real-photo depth for environmental hero, emotional, profile/personality and closing roles.

This does NOT mean V20 becomes a Hawaii book.

Current unresolved source gaps include:
- Okinawa real-photo pool;
- Korea real-photo pool;
- non-Hawaii everyday/casual pool;
- actual Cookie/Melon dog photos if used photographically;
- Shogo solo portrait only if P02 ultimately requires a solo-pair structure.

Because of these gaps:
- P01 may proceed to source-aware hero production with alternate source behavior retained;
- P02 should use a non-symmetrical profile grammar that does not require a matched portrait pair;
- P04 Okinawa/Korea masks stay elastic;
- P06 already tests MIN/IDEAL/MAX photo-count states;
- P07 is discovery-first and can succeed with zero or a few verified detail photos.

## What V20 may recover from older project records

Only facts/source assets that remain true, for example:
- confirmed names/date/location/content;
- real photos;
- real schedule facts;
- real decor/theme facts;
- print constraints;
- provenance/source locators.

Recovering a fact is NOT permission to inherit the old layout around that fact.

## Hard workflow rule

`SEATED-GUEST CONTENT VALUE`
→ `CONTENT + PAGE MANUAL`
→ `PHOTO ROLE + SOURCE PIXEL REVIEW + GAP INVENTORY`
→ `GREYBOX / SILHOUETTE`
→ `PAGE-SPECIFIC PREPARED ASSET PRODUCTION + QA`
→ `FIGMA ASSEMBLY / FULL EDITORIAL COLLISION`
→ `NATIVE TEXT + TEXT SUPPORT ADJUSTMENT`
→ `EDITORIAL POLISH`
→ `V20 QA + ACCEPTANCE EVIDENCE`
→ `PRINT PREFLIGHT`

Figma must not be asked to invent the page with prompts like “make this more Rurubu-like.”

Prompts are execution artifacts generated from page manuals and asset briefs, not the source of design intelligence.

## Current production priority

1. P01 Cover prepared assets + first decorated assembly;
2. P04–P05 center-spread major composites + first decorated assembly;
3. replace old P07 schedule greybox with seated-guest discovery concept;
4. learn from those real compositions and feed only proven lessons back into P02/P03/P06/P08;
5. avoid building a giant generic parts library before page evidence exists.

This sequencing is intentional: the goal is to finish authored magazine pages, not to endlessly improve a design system.