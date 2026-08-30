# V20 Greybox / Silhouette Specification

Status: `MANDATORY_BEFORE_V20_FIGMA_DECORATION`

Purpose: prove the 8-page editorial architecture with only hierarchy, photo geometry, copy supports and reading flow before V20 visual parts are placed.

This is not a low-fidelity version of an old design. It is the first structural proof of the clean-slate V20 design.

## 1. Greybox principle

A page must work when all of the following are removed:
- tropical flowers;
- stickers;
- stamps;
- decorative airplanes;
- expressive final colors;
- shadows;
- texture;
- generated display artwork.

If the page becomes weak after those are removed, the composition is not ready.

Greybox proves:
- first read;
- second read;
- image weight;
- text calm zones;
- asymmetry;
- spread rhythm;
- editability;
- source-photo compatibility.

## 2. Physical geometry

Use `V20-PRODUCTION-GEOMETRY.md`.

Per-page full-bleed Figma frame:
- approximately `582.05 x 816.38 px`;
- trim inset approximately `11.34 px`;
- critical-copy safe guide approximately `34.02 px` from full-bleed edge;
- fold-side critical content receives additional caution.

Logical spread preview:
- two page frames adjacent with zero visual gap for review;
- P02–P03;
- P04–P05 center spread;
- P06–P07.

The individual production page remains independently exportable. Spread preview is a QA view, not one flattened production image.

## 3. Greybox visual language

Use neutral structural fills only.

Recommended semantic tones:
- `GB_BG_LIGHT` — page/paper field;
- `GB_HERO_DARK` — dominant photo mask;
- `GB_SUPPORT_MID` — supporting photo mask;
- `GB_COPY_LIGHT` — text calm field;
- `GB_TITLE_DARK` — title silhouette;
- `GB_ROUTE_LINE` — route/chronology only;
- `GB_UNKNOWN` — unresolved content/photo role, visually distinct with dashed border.

No final palette judgment in this pass.

Photo mask labels must show semantic role, for example:
- `PHOTO / HERO / PLACE / P01`;
- `PHOTO / EMOTION / P03`;
- `PHOTO / OKINAWA / UNKNOWN SOURCE`.

Do not insert a generic stock photo simply to make greybox attractive.

## 4. Source-aware rule

Known source pools may influence aspect behavior.

Example Hawaii evidence:
- `031.jpg` / `035.jpg` support wide environmental hero geometry;
- `023.jpg` supports unusual environmental scale with a tiny couple;
- `022.jpg` supports portrait/environment satellite geometry;
- `004.jpg` / `018.jpg` support close emotional crops;
- `036.jpg` supports personality/casual crop;
- `001.jpg` supports calm closing/transition crop.

Unresolved Okinawa/Korea/daily-life roles remain elastic `GB_UNKNOWN` masks. Their dimensions must not become rigid production assumptions.

## 5. Book-level silhouette targets

At thumbnail scale, without reading text, the 8 pages should approximately read as:

- P01: `BIG TITLE + BIG ENVIRONMENT/COUPLE + SMALL BURSTS`;
- P02: `TWO PEOPLE, OFFSET / ASYMMETRIC`;
- P03: `ONE STORY ANCHOR + 2–3 EPISODE CLUSTERS`;
- P04–P05: `ONE WIDE JOURNEY FEATURE WITH MULTIPLE DESTINATIONS + ONE EMOTIONAL PEAK`;
- P06: `IRREGULAR HUMAN PHOTO MOSAIC`;
- P07: `DISCOVERY MAP / TODAY DETAILS / LOOK-AROUND CLUSTERS`;
- P08: `ONE CALM IMAGE + MESSAGE`.

If two adjacent pages have the same silhouette, redesign before decoration.

## 6. P01 COVER greybox

### Goal
Prove that masthead + real-photo hero + cover hooks create a magazine cover before any decorative travel parts are added.

### Required objects
- one `TITLE / MASTHEAD` silhouette;
- one hero photo mask;
- 0–2 support-photo masks;
- one date/location factual block;
- 2–4 cover-hook text strips;
- no decorative objects required for pass.

### Hero variants to compare
Do not freeze one cover immediately. Build three silhouette candidates using the actual Hawaii source behaviors:

A. `OPEN ENVIRONMENT`
- inspired by 031 behavior;
- hero occupies roughly 60–72% perceived page weight;
- couple may be relatively small;
- masthead uses upper sky/environment field.

B. `TROPICAL FRAME`
- inspired by 035 behavior;
- palms/edge environment creates natural framing;
- stronger travel-postcard silhouette.

C. `DRAMATIC SCALE`
- inspired by 023 behavior;
- huge natural environment + small human moment;
- more editorial, less conventional wedding-cover behavior.

Compare at thumbnail and A5 reading scale.

### Pass condition
One candidate must clearly outperform others for:
- masthead readability;
- couple recognition appropriate to cover intent;
- travel energy;
- cover-hook placement capacity;
- crop resilience.

Do not select based only on which photo is prettiest.

## 7. P02 PROFILE greybox

### Goal
Prove two-person identity without employee-card symmetry.

### Preferred first test
Use a deliberately non-symmetrical grammar so a missing Shogo solo portrait does not block progress.

Test structure:
- one larger couple/personality image zone;
- one Shiori individual role zone based on 010 behavior;
- one second couple/profile role zone rather than inventing a fake Shogo solo;
- facts attach around image zones instead of forming one form/table;
- one shared-life mini-zone remains optional.

### Elasticity
If a real Shogo solo portrait later surfaces, the page may convert to two individual portrait anchors without rebuilding the entire page.

### Pass condition
- SHOGO and SHIORI receive equal editorial importance without equal rectangles;
- 3–6 facts/person can fit without tiny text;
- replacing one photo with a different orientation does not collapse the page.

## 8. P03 STORY greybox

### Goal
Story order must work without exact dates.

### Objects
- story title;
- one emotional anchor photo;
- 3 episode clusters maximum in initial greybox;
- one proposal/registration/arrival emphasis zone;
- one quiet narrative field occupying roughly 20–30% of page.

### Source-aware behavior
Hawaii emotional sources may demonstrate image hierarchy, but story episode masks must stay semantically generic until courtship/non-Hawaii sources are mapped.

### Pass condition
Reader can infer start → development → emotional peak → today without a corporate timeline line.

## 9. P04–P05 CENTER SPREAD greybox

This is the most important structural proof.

### Spread job
`EXPLORE → CONNECT → PEAK → ARRIVE`

### P04 provisional zones
- `OKINAWA HERO / SOURCE UNKNOWN`: large elastic zone, roughly 35–50% of P04 perceived visual weight;
- `KOREA PEOPLE/ACTION / SOURCE UNKNOWN`: 1–3 smaller elastic zones;
- destination title/short-copy fields;
- route begins and approaches fold.

### P05 anchored zones
Use actual Hawaii behavior to test:
- one major environmental or emotional Hawaii hero;
- one close emotional support crop;
- proposal copy calm field;
- arrival/Yokohama fact marker.

### Important rule
Because Okinawa/Korea sources are unresolved, do not design P04 as three exact polaroid holes that assume orientation. Use broad role zones that can later become landscape, portrait, cutout, or paired images.

### Fold
Only route/atmosphere may cross the fold.
No critical text, face, destination number or exact photo border depends on cross-fold registration.

### Pass condition
At small spread preview:
- P04 visually launches the journey;
- eye naturally continues to P05;
- P05 is visibly the emotional peak;
- no equal destination cards;
- Hawaii does not consume so much area that Okinawa/Korea become token labels.

## 10. P06 OFF THE MAP greybox

### Current uncertainty
Non-Hawaii everyday source count is unknown.

Therefore test a responsive mosaic rather than one fixed 8-photo layout.

Build three states:
- `MIN`: 3 meaningful photos;
- `IDEAL`: 5 meaningful photos;
- `MAX`: 7 meaningful photos.

The same page architecture should adapt across all three without changing title/body sizes.

### Role mix target
When sources exist:
- 1 personality/candid hero;
- 1 action/food/life;
- 1 detail/dog/shared-life;
- additional images only if they add a new role.

### Pass condition
Page remains intentional in MIN state. If it only looks good with seven fillers, architecture fails.

## 11. P07 TODAY'S TRAVEL GUIDE / LOOK AROUND greybox

### Goal
Prove a seated-guest discovery page that makes guests look around today's wedding and notice verified details. P07 is not a timetable or pre-arrival logistics page.

### Required editorial hierarchy
- page title / short TODAY context;
- one dominant `LOOK AROUND` or discovery-map gesture;
- 3–5 elastic discovery zones for verified wedding details such as table-country themes, décor, flowers, cake, travel motifs, or small hidden details;
- one optional `TODAY'S DESTINATION` / location marker only when the exact copy is verified;
- photos are optional and must remain secondary to the discovery structure unless a verified venue/detail photo deserves editorial weight.

### Greybox stress tests
- page must still work with zero photos;
- one discovery item may grow to 3–4 lines without shrinking body type;
- one or two discovery modules may disappear if the corresponding wedding detail is not verified;
- a portrait or landscape detail photo can be introduced later without rebuilding the page;
- no empty space may be filled with invented wedding facts.

### Pass condition
- thumbnail reads as active discovery/editorial information rather than schedule chronology;
- one primary discovery gesture is obvious;
- supporting discovery modules have intentionally unequal weights rather than equal cards;
- no dress code/access/RSVP/check-in/timetable-first information consumes premium space;
- page works with zero photos and remains useful to a guest who is already seated;
- P06 → P07 creates a clear `REAL LIFE → TODAY` transition.

## 12. P08 BACK COVER greybox

### Goal
Prove calm closure after P07.

### First source-aware test
Use 001 behavior:
- broad calm environment;
- couple facing away / journey-continuation feeling;
- large stable message field;
- very few secondary objects.

Alternative can test 031 if whole-book photo repetition remains acceptable.

### Pass condition
P08 is visibly quieter than P06/P07 and does not look unfinished.

## 13. Three-scale proof

Every greybox state must be reviewed at:

1. `BOOK THUMBNAIL`
   - 8 pages visible as a sequence;
   - page silhouettes visibly differ.

2. `SPREAD VIEW`
   - P02–P03, P04–P05, P06–P07;
   - visual bridge and fold behavior.

3. `A5 READING SIZE`
   - copy field widths;
   - labels/captions;
   - safe area;
   - realistic replacement room.

## 14. Stress conditions before decoration

Greybox fails if any of these break the page:
- profile copy grows by ~30%;
- one expected support photo disappears;
- one photo orientation changes;
- P06 has only 3 usable photos;
- one P07 discovery note becomes 3–4 lines or one/two discovery modules are removed because the detail is unverified;
- P04 Okinawa hero later turns out to be portrait rather than landscape.

The correction is reflow/role adaptation, not smaller type.

## 15. Greybox freeze gate

Do not proceed to decorative parts until:
- P01 one hero silhouette is provisionally selected;
- P02 works without requiring a nonexistent Shogo solo source;
- P03 story order works without exact dates;
- P04–P05 works with P04 unresolved photo geometry;
- P06 passes MIN/IDEAL/MAX photo-count states;
- P07 passes removable/long-copy discovery stress with a zero-photo fallback and contains no schedule-first logistics structure;
- P08 closes calmly;
- adjacent page silhouettes differ materially;
- all photo masks remain independently replaceable;
- no source gap has been hidden by fake/generated autobiographical imagery.

After this gate, parts placement can begin. Decoration is a second-order enhancement, not structural rescue.
