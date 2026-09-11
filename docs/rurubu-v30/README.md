# Rurubu WEDDING V30 — FINAL PRODUCTION GUIDE

Status: `CURRENT_SUPPORTING_GUIDE / V30_ONLY / 2026-09-02`

This file preserves the broader editorial/design/print knowledge for V30. It is **not the first authority to read**.

Current read order is defined by `docs/RURUBU-CURRENT.md` and `assets/rurubu-v30/manifest.json`.

If this guide ever conflicts with newer Root / visual-polish / page-polish / Acceptance rules, the newer authority wins.

## One-rule summary

**V30 is the only current production version.**

- Do not create V31 unless explicitly requested.
- V20 and earlier are frozen history/reference only.
- Do not revive old geometry/assets because work was already spent.
- `CONTENT ROLE LOCKED / VISUAL EXECUTION UNLOCKED`.

## Current production workflow ownership

Current user-locked division:

### ChatGPT
- feedback analysis;
- Root/shared/page manifest updates;
- contradiction cleanup;
- review/acceptance design;
- Codex handoff prompt;
- post-build review.

### Codex
- production ImageGen;
- keyed-background generation / cutout / alpha QA;
- Figma writes/cleanup;
- clean proxy installation;
- screenshots/exports;
- Drive/Git production evidence when instructed.

Do not begin Codex production while implementation-affecting feedback is still missing from authority.

## Git / Figma authority

Branch:
`rurubu/v30-final-production-20260901`

PR:
`#878`

Figma file:
`bfM0d4c9dCeBv5pCkJ3TNM`

Page:
`V30_FINAL_PRODUCTION`

Board:
`3535:2`

Frames:
- P01 `3535:7`
- P02 `3535:9`
- P03 `3535:11`
- P04 `3535:13`
- P05 `3535:15`
- P06 `3535:17`
- P07 `3535:19`
- P08 `3535:21`

Known temporary cleanup is documented in `docs/RURUBU-CURRENT.md`; do not infer P02 from overlapping temporary nodes.

## Fixed physical facts

- A5 portrait
- trim `148 × 210 mm`
- 8 pages
- bleed working default `3 mm`
- wedding date `2026.10.24`
- P08 decorative barcode digits exactly `2026102400000`
- barcode remains decorative; do not claim JAN/ISBN/EAN commerce meaning.

## Visual calibration

- `RURUBU FEEL = 100%`
- `EDITORIAL INFORMATION LOAD ≈ 75% OF MAXIMUM-CLUTTER TESTS`
- `READABILITY = HIGH`

75% means edit information overload, **not** dilute Rurubu personality.

Keep:
- strong display headlines;
- vivid travel-magazine color;
- unequal photo hierarchy;
- title/photo/frame collision;
- paper/ticket/stamp/ribbon tactility;
- authored asymmetry;
- selected calm space;
- deliberate editorial surprise.

Reduce:
- meaningless microcopy;
- equal-size grids;
- filler stickers;
- too many simultaneous mini-features;
- generic UI-card repetition.

`FULL-STRENGTH MAGAZINE CHARACTER, EDITED INFORMATION LOAD.`

## What “Rurubu-like” means

Rurubu feeling is not a sticker kit or copied commercial layout.

Desired editorial behavior:

`EDITORIAL IDEA`
→ `CLEAR PAGE PROMISE`
→ `FIRST READ`
→ `STRONG TITLE/PHOTO GESTURE`
→ `UNEQUAL PHOTO HIERARCHY`
→ `ASYMMETRIC CLUSTERS`
→ `PURPOSE-BUILT PRINT OBJECTS`
→ `MEANINGFUL COLLISION`
→ `HUMAN/APPROVED COPY`
→ `SELECTIVE DISCOVERY`
→ `CALM SPACE`
→ `PAGE TEMPO`.

Every object should help tell, frame or organize something.

## Hierarchy correction order

When hierarchy is weak, fix in this order:

1. `SCALE`
2. `IMAGE WEIGHT / CROP`
3. `POSITION`
4. `CONTRAST`
5. `GROUPING`
6. `OVERLAP`
7. `COLOR`
8. `DECORATION`

Never repair weak hierarchy by adding more stickers.

## Five visual levels

Energetic pages may use:

1. `FIRST READ` — title / primary visual event
2. `SECOND READ` — main photo/story cluster
3. `EDITORIAL SUPPORT` — secondary photos/modules
4. `FACTUAL / VARIABLE COPY`
5. `MICRO DISCOVERY`

P07 and P08 intentionally use fewer levels.

If 4+ objects compete at similar scale/contrast, hierarchy is weak.

## Truth / editorial boundary

### FACT
Must come from confirmed/canonical data.

Examples:
- names;
- wedding date;
- real destinations/events;
- approved profile answers;
- real-photo provenance.

Never invent missing FACT.

### EDITORIAL COPY
May creatively frame grounded facts without adding false claims.

### DECORATIVE FICTION
Allowed only when clearly non-operational/non-factual.

Never fabricate:
- flight numbers;
- booking codes;
- exact unconfirmed dates;
- addresses/gates/room details;
- ungrounded restaurants/rankings;
- relationship facts;
- Q&A answers;
- functional-looking fake QR/barcodes.

Unknown guest-facing text origin = fail.

## Fixed short display art vs variable text — CURRENT RULE

The old blanket rule “names/dates/captions must always stay native/editable” is **superseded**.

### Fixed authored display module

When short approved text/numbers visually belong to a single authored object with:
- background/vessel;
- badge;
- icon;
- route/doodle;
- flower/heart/sparkle;
- outline/shadow;
- local fixed accent;

the complete visible object may be generated/prepared as **one production asset**.

Visible fixed text does **not** need to remain editable in Figma.

Exact approved strings/numbers are retained in:
- Root/page manifest; or
- production asset metadata.

Generated visible spelling/numbering must be QA-checked.

Examples:
- `るるぶ` / `WEDDING` / `OUR STORY`;
- `Shogo & Shiori` fixed lockup;
- year/date badge;
- Feature number + heading + icon + vessel;
- Q-number shell;
- short story hook;
- stamp/postmark;
- PAGE badge;
- P08 barcode bars + exact fixed digits when approved as one object.

### Keep native/editable/separate

- long body copy;
- unapproved/TBD Q&A;
- personal facts still changing;
- guest names/relationships;
- captions likely to change;
- long closing message until copy lock;
- any frequently changing text.

`FIXED SHORT AUTHORED DISPLAY ≠ BODY COPY.`

## Figma = compositor, not personality generator

Figma should primarily:
- place/crop real photos;
- maintain replaceable masks;
- place generated/prepared editorial objects/modules;
- control z-order, scale, rotation, overlap;
- maintain native **variable/long** text where needed;
- maintain trim/bleed/safe guides;
- perform contact-sheet/spread/A5 QA;
- prepare editable sRGB production master for print handoff.

Figma should not create publication personality from generic rectangles, pills, cards and generic type merely to maximize editability.

Simple native geometry is fine for genuinely simple technical needs.

### No whole-page flattening

Final master must not become one page raster.

Keep at least these jobs independently controllable:
- background/environment;
- replaceable photos;
- photo masks/frames where necessary;
- independent display modules;
- variable/native copy;
- independently movable foreground accents;
- trim/meta/QA.

A fixed display module itself may be a single image if it behaves as one authored object.

## Photo proxy rule — CLEAN STANDALONE ONLY

Visual Master images are **comparison authority**, not photo-slot source material.

Do not crop `P01.png`, `P02.png`, etc. into photo slots.

Do not use page screenshots as photo proxies.

Why:
- background/decorations can be baked inside the photo;
- page assets can appear twice;
- it becomes unclear what is photo vs page art;
- Reference Delta can falsely improve.

Allowed proxy sources:
1. suitable user real photo;
2. clean standalone representative photo;
3. clean generated standalone proxy photo without page-layout decoration.

A VISUAL_PROXY must still match hierarchy-relevant semantics:
- subject class/count;
- orientation;
- scale;
- focal position;
- face/gesture mass;
- major light/dark mass.

A STRUCTURAL_PROXY may be semantically looser but must still be a clean standalone photo and cannot prove Reference Delta.

### Proxy contamination hard rejects

Proxy must not contain:
- page border;
- page title/page number;
- ticket/stamp/Q shell;
- decorative sticker/flower/route copied from the page;
- page-designed frame/backing;
- screenshot of the composed page.

## Photo-role system

Classify photo by editorial job before forcing geometry:
- `HERO`
- `EMOTION`
- `PLACE`
- `ACTION`
- `DETAIL`
- `COMEDY`
- `PORTRAIT`
- `FRIEND_MEMORY`
- `CUTOUT_CANDIDATE`
- `TRANSITION`

Rules:
- old slot geometry never dictates current photo choice;
- Hero is not mandatory on every page;
- real autobiographical photos outrank generated substitutes;
- clean proxies are temporary visual/structural tools only;
- do not fill pages with near-identical poses.

## Replaceable photo contract

For every real-photo slot:
- dedicated clipped/masked photo container;
- photo content separate from display module/frame/decoration;
- non-destructive crop;
- no spill outside mask;
- swapping photo does not rebuild page decoration;
- swapping photo does not remove any intended flower/badge/frame/title.

P05 remains 4 SHOGO FRIENDS + 4 SHIORI FRIENDS = 8 independent slots unless the explicit current authority changes.

## Anti-AI / anti-template gate

Immediate revise symptoms:
- 3+ equal cards in clean grid;
- same radius everywhere;
- everything centered;
- generic gradient;
- SaaS shadow on every object;
- repeated pills;
- identical frame recipes everywhere;
- equal spacing everywhere;
- whole page controlled like responsive UI;
- random sticker filling;
- meaningless English/Japanese;
- mathematical symmetry;
- luxury-brochure emptiness with no editorial event.

Anti-AI target is **authored irregularity**, not random mess.

## Composition grammar

Use:
- asymmetric clusters;
- strong large/medium/small contrast;
- partial overlap;
- 2–3 meaningful anchor zones;
- selected edge cropping;
- one calm/readable field on busy pages;
- different print-object jobs with page-specific geometry.

Avoid:
- equal grids;
- exact symmetry;
- repeated filler;
- one component merely recolored many times.

### Rotation discipline

Normally keep paper/photo tilts roughly within `0–6°` unless stronger angle has composition reason.

Do not rotate everything to manufacture scrapbook energy.

## Invisible structure

Freeform does not mean random.

Maintain:
- trim;
- bleed;
- safe margins;
- fold awareness where relevant;
- hidden alignment logic;
- intentional recovery space.

Break grid deliberately, not accidentally.

## Color grammar

Use color by job, not quota.

Possible family:
- ocean blue/cyan;
- hot coral/pink;
- sun yellow;
- navy/ink;
- warm cream/paper;
- limited natural accents.

No generic gradients unless a specific Visual Master truly requires one.

## Typography grammar

Japanese is primary.

Working A5 ranges before actual-size proof:
- page title roughly `22–34 pt` equivalent;
- section title `13–20 pt`;
- body `9–10.5 pt`;
- caption `8–9 pt`;
- noncritical micro meta around `7.5 pt` floor.

These are working guides, not rigid tokens.

Rules:
- do not shrink important copy just to preserve an overloaded layout;
- long body copy is never baked before lock;
- Q&A content remains native until approved;
- fixed short display art may ignore native-editability requirement under the bundled-module policy;
- fake paragraph text is forbidden.

## Editorial object ecology

Useful families:

### PAPER / PRINT
- torn/clean paper note;
- postcard;
- printed-photo caption foot;
- taped memo;
- ticket/notch form;
- stamp frame.

### DISPLAY / PROMO
- irregular slab;
- burst;
- ribbon;
- strip;
- marker backplate;
- badge;
- asymmetric enclosure.

### READING / FACTUAL
- quiet article field;
- fact strip;
- Q&A shell;
- caption vessel;
- back-cover meta plate.

### IMAGE-BOUND
- label crossing photo edge;
- title partly behind/over photo;
- frame edge supporting copy.

Related publication DNA does not mean identical component geometry.

## One part = one image — CURRENT DEFINITION

`ONE INDEPENDENT EDITORIAL OBJECT = ONE PRODUCTION IMAGE.`

A **bundled fixed display module counts as one editorial object**, even if internally it contains:
- fixed text;
- number;
- background/vessel;
- icon;
- local decorative accents.

This does **not** permit:
- unrelated modules packed into one sprite;
- several independently movable stickers in one PNG;
- replaceable photos flattened into display modules;
- packed multi-page production sheets.

Proof/contact sheets are reference only.

## Generated-part/module brief contract

Before production generation define:
- page;
- semantic job;
- module boundary;
- exact fixed visible strings/numbers;
- what remains separate;
- replaceable photo relationship;
- physical/aspect target;
- transparent vs opaque requirement;
- overlap/z-order expectation;
- visual family;
- variable/native fields;
- forbidden fake facts;
- forbidden legacy assets/roles.

Do not use vague `make Rurubu sticker` prompts.

## Canonical generated-asset pipeline

For isolated/bundled generated editorial objects:

1. page Visual Master understood;
2. PASS A + PASS B complete;
3. bundled module boundaries / variable copy / clean proxy roles classified;
4. page part/module brief locked;
5. generate one object/module on removable solid key background when alpha is needed;
6. Python edge-connected key-background cutout;
7. real alpha QA;
8. save `SOURCE_KEYED` + `PRODUCTION_RGBA`;
9. Drive/Git traceability;
10. Codex places in layered Figma;
11. page/spread/A5 QA;
12. regenerate only weak units.

### Key-background requirements

- choose key color that does not overlap artwork colors;
- clean outer connected background;
- no scenic/gradient/textured background when intended for alpha extraction;
- preserve intentional whites/creams/interior colors;
- avoid unwanted cast shadow into key field.

### Alpha QA

Must verify:
- actual alpha channel exists;
- outer canvas transparent;
- no baked checkerboard;
- no key-color halo;
- no accidental holes;
- intentional internal colors preserved;
- edges acceptable on light and dark temporary backgrounds.

Checkerboard-looking preview alone is not proof.

## Production asset metadata

For adopted assets record where applicable:
- semantic asset/module ID;
- page/job;
- source type/provenance;
- exact fixed text/numbers baked into module;
- generation prompt/version;
- intended size;
- transparency mode;
- pixel dimensions / visual bounds;
- SHA-256 when available;
- status (`SOURCE_KEYED`, `PRODUCTION_RGBA`, `ADOPTED`, `REFERENCE_ONLY`, `SUPERSEDED`, `REJECTED`).

Avoid anonymous filenames.

## Visual Carry-over Audit

Hidden-layer cleanup is not enough.

Every visible inherited asset after a targeted rework must be requalified as:
- `KEEP_REQUALIFIED`
- `REWORK_REQUIRED`
- `REPLACE_REQUIRED`
- `SUPERSEDED`

until reviewed:
`UNREVIEWED_CARRYOVER`.

`ADOPTED` / prior PASS / unchanged is not permanent visual approval.

After a high-saliency improvement, reopen nearby objects because the raised quality bar can expose old parts.

Question:
> Does the page look like one authored magazine page, or new high-quality anchors placed over an older draft?

## P01–P08 roles

### P01 — COVER
- `るるぶ WEDDING`
- one dominant people-led Hero
- names/date
- teaser modules
- dense bright cover personality

Current P01 is **best CURRENT but not complete**. See P01 polish manifest/README.

### P02 — PROFILE + Q1/Q2
- paired Shogo/Shiori portraits;
- blue/pink semantic pairing;
- profile information;
- Q1/Q2 only;
- Q1 inset photo / Q2 no photo;
- avoid symmetric employee-profile UI.

### P03 — OUR STORY + Q3/Q4
- OUR STORY title;
- top-right Hero;
- left 1–5 timeline;
- steps 1–4 supporting photos, step 5 no photo;
- Q3/Q4 non-identical paper modules.

### P04 — ALL TRAVEL MEMORIES / OUR JOURNEY
- strongest interior travel-magazine energy;
- real verified travel memories;
- unequal photo hierarchy;
- exact module list remains blocked until actual Visual Master review.

### P05 — FRIENDS MEMORIES ONLY
Required role:
- SHOGO FRIENDS;
- SHIORI FRIENDS;
- friend/group memories;
- no family page role;
- no Hawaii/proposal/arrival role;
- no giant page-wide Hero.

### P06 — REAL LIFE / FAVORITES / BEST SHOTS + Q5/Q6
- lively daily-life/candid role;
- Q5/Q6 only;
- exact module list blocked until actual Visual Master review.

### P07 — CLOSING MESSAGE / THANK YOU
- calmer closing role;
- no old travel-guide / 11 destinations / timetable system.

### P08 — MAGAZINE BACK COVER
- sparse intentional back-cover role;
- decorative barcode digits exactly `2026102400000`;
- not primary thank-you page.

## Q&A lock

Exactly six slots:
- P02: Q1/Q2
- P03: Q3/Q4
- P06: Q5/Q6

Questions/answers are not globally locked unless page authority says otherwise. Never fabricate them.

## Current production order

For a page:

`READ CURRENT AUTHORITY`
→ `VIEW ACTUAL VISUAL MASTER`
→ `PASS A / PASS B`
→ `CLASSIFY BUNDLED DISPLAY MODULES`
→ `CLASSIFY VARIABLE/NATIVE COPY`
→ `CLASSIFY CLEAN PHOTO PROXIES`
→ `CLOSE RELEVANT FEEDBACK DEBT`
→ `CODEX IMAGEGEN / ALPHA / FIGMA`
→ `CURRENT SCREENSHOT`
→ `CLEAN_PROXY_PASS`
→ `BUNDLED_DISPLAY_MODULE_PASS`
→ `IDENTITY_ANCHOR_PASS`
→ `VISUAL_CARRYOVER_PASS`
→ `REFERENCE_DELTA_PASS`
→ `PHOTO SWAP / A5 / PRINT QA`
→ `HUMAN FEEDBACK WRITEBACK`.

Do not jump directly from a user FB to Figma before the authority update is complete.

## Quality correction order

When page is weak:
1. source/photo choice;
2. crop/focal point;
3. title hierarchy;
4. composition silhouette;
5. reading path;
6. photo-size relationships;
7. calm field;
8. meaningful overlap;
9. color/contrast job;
10. medium editorial modules;
11. micro discovery last.

## Full-book rhythm

At thumbnail scale, pages should not collapse into same template.

- P01 huge cover gesture
- P02 paired profile
- P03 story/timeline
- P04 travel feature
- P05 friends collage
- P06 irregular real-life page
- P07 calm closing
- P08 sparse back cover

Spread rhythm:
- P02–P03 = `WHO → STORY`
- P04–P05 = `PLACES → FRIENDS`
- P06–P07 = `REAL LIFE → THANK YOU`
- P08 standalone.

## Originality / reference distance

Use travel-magazine editorial principles as calibration, not a license to trace/import official commercial vectors or copy a commercial page pixel-for-pixel.

`REFERENCE STRONGLY; RE-AUTHOR THE PAGE.`

## Print-production handoff

Figma remains editable sRGB compositor/master.

Final workflow:

`FIGMA EDITABLE sRGB`
→ `HIGH-QUALITY PDF`
→ `PRINT/PREFLIGHT SOFTWARE`
→ `PRINTER-SPECIFIED CMYK`
→ `PREFLIGHT`
→ `FINAL PRINT PDF`
→ `PHYSICAL PROOF WHEN POSSIBLE`.

Working defaults only when printer gives no different instruction:
- bleed around 3 mm;
- PDF/X-4 candidate;
- Japan Color 2001 Coated candidate;
- ~300 ppi effective raster resolution.

Printer spec wins.

QA includes:
- trim/bleed/safe zones;
- face/text safety;
- generated fixed display text readability;
- final-photo effective PPI;
- PDF dimensions;
- P08 barcode exactness;
- color/profile/transparency integrity.

## Current completion state

Book-level:
- `DESIGN_COMPLETE = NO`
- `SOURCE_COMPLETE = NO`
- `COPY_LOCKED = NO`
- `PRINT_READY = NO`

P01:
- `BEST_CURRENT = YES`
- `FIGMA_DESIGN_COMPLETE = NO`
- `CLEAN_PROXY_PASS = NO`
- `BUNDLED_DISPLAY_MODULE_PASS = NO`
- `VISUAL_CARRYOVER_PASS = NO`
- `FINAL_PHOTO_QA_PENDING = YES`

The old statement `P01 FIGMA_COMPLETE = YES` is superseded and must not be used as current authority.

## Codex start rule

Codex must **not** start by reading this guide alone.

Start from `docs/RURUBU-CURRENT.md` and follow its required read set.

Before first production write:
- verify current page/node;
- confirm no V31;
- confirm target page PASS A/PASS B state;
- confirm bundled display-module classification;
- confirm native/variable copy classification;
- confirm clean proxy plan contains no Visual Master/page crops;
- confirm relevant feedback debt is modeled;
- then perform production ImageGen/Figma.

**CURRENT = V30. V20 = FROZEN HISTORY.**
