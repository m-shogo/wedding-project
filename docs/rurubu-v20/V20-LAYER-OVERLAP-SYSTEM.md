# V20 Layer / Overlap System

Status: `CANONICAL / IMAGEGEN_FIRST / FULL_EDITORIAL_COLLISION / CURRENT_P07_DISCOVERY`

Purpose: make V20 feel like a professionally edited Japanese travel magazine rather than a web UI, wedding template or AI sticker sheet. Figma assembles already-designed page-aware editorial assets and keeps real photos / factual copy editable.

## 1. Core principle

V20 intentionally uses strong overlap, depth, occlusion and edge intrusion.

Background, photography, frames, title art, subtitle art, vessels, routes, stamps and decoration may overlap heavily when hierarchy improves.

The constraint is not an overlap percentage. Ask:
- is FIRST / SECOND / THIRD read clear?;
- is important copy readable at A5?;
- are important faces/gestures protected intentionally?;
- does occlusion create tactile editorial depth rather than random clutter?;
- does the page look like a real edited magazine rather than arranged components?

`COLLISION MAY BE STRONG; HIERARCHY MUST BE STRONGER.`

## 2. Canonical bottom-to-top production stack

Use the detailed authority in `V20-PRIVATE-HOMAGE-AND-LAYERED-PAGE-GENERATION-RULE.md`.

Working stack:
1. PAPER / BASE
2. LARGE BACKGROUND / ENVIRONMENT COMPOSITE
3. HERO REAL PHOTO
4. UNEQUAL SUPPORT / DETAIL REAL PHOTOS
5. PHOTO FRAME / PAPER BACKING UNITS
6. ROUTE BACK / LARGE FLOW ART
7. DISPLAY TITLE / MASTHEAD
8. SUBTITLE / SECOND-READ UNIT
9. ARTICLE / PROFILE / EPISODE / DISCOVERY VESSELS
10. CAPTION / LABEL / TICKET / STAMP UNITS
11. ROUTE FRONT / FOREGROUND COLLISION
12. NATIVE AUTHORITATIVE TEXT
13. MICRO DISCOVERIES
14. FOLIO / META / EDGE ACCENTS
15. HIDDEN QA / GUIDES

This is semantic, not a rigid z-index law. A title may sit behind a cutout subject; route may disappear behind a photo and return in front; frame art may sit both behind and above the photo through split assets.

## 3. Figma's job

Figma primarily:
- places approved assets;
- crops/replaces real photos;
- controls z-order, scale and rotation;
- keeps names, dates, captions, profile/story/wedding-detail facts native/editable;
- adjusts final line breaks and local support;
- manages trim/safe/fold geometry;
- performs page/spread/contact/A5 QA.

Figma is not primarily responsible for inventing:
- decorative clusters atom by atom;
- flower/travel illustration from primitives;
- page personality from generic rectangles/pills/polygons;
- a generic sticker library;
- the page layout from a vague style prompt.

## 4. Prefer coherent editorial units

Prefer page-specific units over unrelated atoms.

Examples:
- `P01_MASTHEAD_FEATURE_UNIT`;
- `P02_PROFILE_ANNOTATION_UNIT`;
- `P03_EPISODE_UNIT`;
- `P45_ROUTE_BACK / ROUTE_FRONT`;
- `P05_PROPOSAL_ARTICLE_UNIT`;
- `P06_BEST_SHOTS_UNIT`;
- `P07_DESTINATION_DISCOVERY_UNIT`;
- `P08_CLOSING_EDGE_UNIT`.

A unit should include deliberate quiet/transparent areas for native text/photo interaction.

## 5. Asset granularity

### LARGE COMPOSITE
Normally 0–3 per page/spread.
Examples: broad edge environment, center-spread route atmosphere, map/background fragment, large color/paper shape.

### MEDIUM EDITORIAL UNIT
Normally several per page.
Examples: masthead/title, subtitle holder, article vessel, photo-frame unit, destination vessel, proposal highlight, LOOK AROUND / EDITOR'S PICK unit.

### MICRO DISCOVERY
Added after hierarchy passes.
Examples: tiny camera/plane/paw/food cue, mini stamp, route node, small number, issue mark, arrow, tiny flower.

Dense reference-like pages may contain many visible micro discoveries, but they are unequal and often partly hidden. Never use them to rescue weak title/photo structure.

## 6. Full editorial collision

Explicitly valid:
- photo behind title, frame above photo, stamp above title;
- title crossing photo + paper + background at once;
- support photo covering HERO corner;
- article field covering a meaningful photo region;
- route passing under one object and over another;
- destination label crossing route + photo + frame;
- giant numeral behind title/vessel;
- edge object mostly cropped;
- caption half inside / half outside a photo;
- title partly hidden by a subject when silhouette remains legible.

Do not present every generated asset fully visible like a sticker catalogue.

## 7. Text readability is solved locally

Do not automatically separate text from photography.

Use page-specific support:
- opaque/near-opaque paper field;
- irregular color slab;
- ribbon/band;
- keyline/outline;
- hard offset shadow;
- local photo darkening/lightening;
- marker backplate;
- quiet photo zone;
- attached caption foot;
- cutout contour.

Long factual/personal text remains native.

## 8. Protected content

Allowed:
- partial face/body overlap when expression/gesture survives;
- title covering landscape/body region;
- article vessel embedded into photography;
- destination labels partly obscured as graphical objects while native name stays readable.

Hard protections:
- do not casually obscure eyes/mouth/critical gestures;
- do not compromise A5 body-copy readability;
- do not hide authoritative facts in decorative noise;
- do not flatten replaceable real photography into generated art.

## 9. Depth hierarchy

Typical visual depth:
- atmosphere/base;
- HERO;
- support images;
- backing/frame;
- title/subtitle mass;
- major editorial vessel;
- route/stamp collision;
- native copy;
- micro discovery.

If every element has identical border/shadow/radius/raised-card treatment, reject it as UI-like.

## 10. Edge intrusion

Energetic pages should frequently activate page edges/bleed with noncritical elements:
- foliage/flowers;
- photo corners;
- route;
- ticket/paper edge;
- travel objects;
- title letters;
- giant numerals;
- broad color slabs.

North-Star calibration indicates roughly 2–4 active edges/corners can be appropriate on dense pages. Calm pages use less.

## 11. Rotation discipline

Rotation is purposeful, not randomized.
- HERO may stay stable;
- support photos may vary;
- paper/ticket/stamp may rotate more;
- title may be diagonal when its silhouette benefits;
- body text normally stays readable even if its vessel rotates slightly.

## 12. Calm island

A calm field is a local recovery/readability zone **inside** the layered world, not detached luxury whitespace.

Examples:
- P03 story/article paper invaded by photo/title edge;
- P05 proposal field embedded in Hawaii photography;
- P07 EDITOR'S PICK or TODAY'S DETAIL field embedded under/among destination/map/route layers;
- P08 closing copy on calm paper over/adjacent to the real closing image.

The obsolete P07 `giant time typography / timetable` example is not current authority.

## 13. Background is active

Background may include paper tone, broad color shape, print texture, giant cropped typography/numeral, route/map fragment, edge illustration and low-information atmospheric marks.

Most may be hidden. That is acceptable.

Do not flatten variable facts or irreplaceable real photography into the background.

## 14. Photo-frame strategy

Frames are optional visual actors, not universal wrappers.

Possible stack:
- backing paper;
- real photo;
- transparent frame overlay;
- tape/stamp/title crossing it;
- native caption attached to frame.

Frame behavior should follow source photo role, not force every source into identical geometry.

## 15. Page intensity rhythm

- P01 COVER: VERY HIGH / immediate authentic travel-magazine cover energy;
- P02 PROFILE: HIGH / lively person feature with readable supports;
- P03 STORY: MEDIUM / quiet high-density narrative;
- P04–P05 JOURNEY: VERY HIGH / book's feature peak;
- P06 OFF THE MAP: HIGH / playful candid collage;
- P07 TODAY'S TRAVEL GUIDE: HIGH / destination-discovery graphic density;
- P08 BACK: LOW–MEDIUM / deliberate release.

Lower intensity never means polite separation.

## 16. Anti-AI / anti-cheap checks

Reject when:
- every photo is an identical card;
- every element has the same shadow/radius;
- legacy flat SVG/icon-pack style appears;
- empty space is filled with arbitrary stickers;
- layers are isolated with no physical interaction;
- every object is fully visible;
- cluster assets look independent/unrelated;
- everything follows one dashboard grid;
- hierarchy depends only on color;
- every text support is the same white rounded rectangle;
- `red + yellow + blue + travel icons` is doing all the work while title/photo hierarchy stays weak.

## 17. Page-specific authenticity

The goal is not generic `Rurubu style` prompts.

Each cluster brief must specify:
- exact page/job;
- surrounding real photos;
- expected overlap and occlusion;
- quiet/transparent zones;
- density gradient;
- physical size;
- front/back interactions;
- forbidden old SVG/reference silhouettes;
- real alpha requirement where needed.

## 18. One-shot proof vs final production

A one-shot page image may test whether the written brief produces the intended complete magazine world.

If successful, decompose its useful behavior into separate production assets. Do not use the whole generated page as an indivisible final master.

## 19. Assembly / QA sequence

For every page:
1. inspect current page/spread and Bible;
2. optionally generate one-shot art-direction proof;
3. define layer plan;
4. assemble base/background;
5. place real photos;
6. place frames/backings and route BACK;
7. add title/subtitle;
8. add major vessels;
9. add route FRONT / stamps / labels;
10. add native text;
11. add micro discoveries only after hierarchy works;
12. review thumbnail;
13. review page/spread/contact;
14. review A5 actual-size;
15. keep candidate only when it clearly beats the safe baseline.

## 20. Final principle

V20 is `controlled editorial collision` in service of an authentic magazine read.

`THE PAGE SHOULD FEEL RICH BEFORE THE BODY COPY IS READ.`
