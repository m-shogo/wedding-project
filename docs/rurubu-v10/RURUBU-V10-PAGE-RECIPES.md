# Rurubu WEDDING V10 — 8-Page Recipe Book

Status: `V10_CANONICAL_PAGE_RECIPE`

Format: A5 portrait, 148 × 210 mm trim, 3 mm bleed, 8 pages.

Purpose: remove blank-canvas ambiguity for Figma AI. These are composition recipes, not rigid templates. Live confirmed content wins if a semantic page role changes, but the hierarchy/density/readability principles remain.

Global rule: first get all eight pages to ~60–80% with existing organized Drive assets. Do not finish one page to 100% while the rest are empty.

---

## P01 — COVER

### Page job
Within 3 seconds: `This is Rurubu WEDDING, this is Shogo + Shiori's joyful travel-themed wedding booklet, and it feels worth opening.`

### Hierarchy
1. Rurubu/Wedding hero logo or title.
2. Main couple photo.
3. Date/name badge or strong factual line.
4. 3–5 coverline hooks / small editorial teasers.
5. Supporting cutouts / travel details.

### Asset recipe
- `LOGO_COVER_*` × 1 primary.
- `REAL_PHOTO_COVER_*` × 1 hero when verified; otherwise `DUMMY_PHOTO_COVER_*` only for layout.
- `PHOTO_CUTOUT_*` × 1–2.
- `BADGE_COVER_DATE_*` × 1.
- `DECORATION_*` × 2–4 purposeful accents.
- optional `ROUTE_*` × 1 if it creates real compositional movement.

### Scale
- hero photo: ~60–85% of page width or equivalent visual area.
- hero logo/title: ~55–85% width depending on asset proportions.
- supporting visual elements must be clearly smaller than hero.

### Color behavior
Suggested dominant: `LAGOON_CYAN` or `PINK_STRONG`.
Support: `SUNNY_YELLOW` / `PAPER`.
Structure/body: `INK`.
Do not place white small text on cyan/yellow/coral.

### Anti-patterns
- three identical photo cards along the bottom;
- giant title + giant photo + giant badge all competing equally;
- web-hero layout with one centered card;
- coverlines too small to read at A5.

---

## P02 — PROFILE

### Page job
Let a guest understand who the two people are quickly, then discover small personality details.

### Hierarchy
1. `ふたりのプロフィール` / profile title.
2. Bride/Groom photo pair with differentiated but balanced treatment.
3. Names + core profile facts.
4. short personality facts.
5. small playful accents.

### Asset recipe
- `TITLE_PROFILE_*` × 1.
- verified real profile photos where available; otherwise `DUMMY_PHOTO_PROFILE_*` only for layout.
- `FRAME_PROFILE_*` or selected global portrait frames × 2.
- `DECORATION_*` × 2–4.
- optional corgi/travel motif × 1 only if it supports the couple's story rather than filling a hole.

### Layout behavior
- two people need equal editorial respect but not necessarily symmetric rectangles.
- vary frame shape/angle/scale slightly while maintaining a clean reading spine.
- keep factual text on calm light fields.

### Color behavior
Dominant: `PAPER` / `WARM_CREAM`.
Support: `PINK_STRONG` + `LAGOON_CYAN` as person/section accents if labels remain explicit.
Body: `INK`.
Do not rely on pink=bride / blue=groom as the only identification.

### Anti-patterns
- gender-coded color being the only label;
- two identical profile cards that feel like employee profiles;
- long body copy inside decorative image assets.

---

## P03 — Q&A / TWO-PERSON DETAILS

### Page job
Make the couple feel human, playful, and easy to read; questions should be scannable and answers comfortable.

### Hierarchy
1. Q&A title.
2. 4–6 question anchors.
3. answers / comparison.
4. supporting photo or cutout.

### Asset recipe
- `TITLE_PROFILE_QA_*` × 1.
- `FRAME_PROFILE_QA_*` × 1 only as a visual support/reference if its text is not authoritative; keep final Q&A native.
- supporting photo/cutout × 1–2.
- `FRAME_GLOBAL_CALLOUT_*` / speech-bubble family × 1–3, but do not box every answer.
- `DECORATION_*` × 1–3.

### Typography
- question labels: 10–13 pt equivalent, bold/display.
- answers: BODY range.
- maintain strong vertical spacing between question groups.

### Color behavior
Use one question-accent color and one answer-accent color only if labels/position also identify structure.
Long answers remain `INK` on `PAPER`/`WARM_CREAM`.

### Anti-patterns
- six equal rounded cards;
- every answer in a different color;
- tiny answer copy to fit decorative frames.

---

## P04 — STORY + TIMELINE

### Page job
Tell the relationship story as a sequence, not as a spreadsheet.

### Hierarchy
1. Story title.
2. one emotional photo/visual anchor.
3. chronological line / timeline milestones.
4. short narrative captions.

### Asset recipe
- `TITLE_STORY_FUTARI_NO_KOTO_*` × 1.
- `TITLE_STORY_TIMELINE_*` × 1 secondary if needed.
- `FRAME_STORY_TIMELINE_*` × 1 as a visual construction aid; final facts/copy remain native.
- story photo/cutout × 2–3.
- `ROUTE_*` × 0–1 only if it helps sequence.
- stamp/camera/heart decoration × 2–4.

### Layout behavior
- timeline may bend/step/alternate, but reading order must remain unmistakable.
- dates should be visually stronger than long description text.
- one milestone may be enlarged as the emotional peak.

### Color behavior
Dominant: `PAPER`.
Sequence accent: `PINK_STRONG` or `COBALT`.
Highlight milestone: `SUNNY_YELLOW` with `INK` text.
Do not color every milestone differently.

### Anti-patterns
- corporate roadmap/stepper UI;
- identical timeline nodes;
- ornamental airplane route that does not match chronology.

---

## P05 — MEMORY SPOTS / TRAVEL GUIDE

### Page job
Make guests want to browse memorable places as if reading a compact travel feature.

### Hierarchy
1. Memory Spot title.
2. largest destination image.
3. 2–4 smaller destination stories.
4. short place labels/captions.
5. travel-guide accents.

### Asset recipe
- `TITLE_MEMORY_MEMORY_SPOT_*` × 1.
- `GENERATED_PHOTO_MEMORY_*` / verified real travel photos × 3–5.
- `FRAME_MEMORY_*` / postcard or travel frames × 2–4.
- `MAP_*` or `ROUTE_*` × 0–1 where semantically useful.
- travel/camera/stamp decoration × 2–4.

### Layout behavior
- one image clearly dominates.
- remaining photos use mixed shapes/scale.
- destination name must remain close to its image.
- supporting captions should not cross confusingly between photos.

### Color behavior
Dominant: `LAGOON_CYAN` or `COBALT` accents against `PAPER`.
Warm counterpoint: `CORAL` or `SUNNY_YELLOW`.
Body: `INK`.

### Anti-patterns
- equal destination cards;
- labels detached from their photos;
- too much blue text on blue photography.

---

## P06 — BEST SHOT / GALLERY

### Page job
Create the most photo-driven, emotional page: a visual pause with selective captions, not another information grid.

### Hierarchy
1. `BEST SHOT` title/badge.
2. hero photo.
3. 3–6 supporting photos.
4. tiny number of short captions.

### Asset recipe
- `TITLE_MEMORY_BEST_SHOT_*` or `BADGE_MEMORY_BEST_SHOT_*` × 1.
- `TITLE_MEMORY_GALLERY_*` optional secondary.
- photo frames × 3–6, deliberately mixed.
- hero/support photos × 4–7.
- decoration × 1–3 only; photography carries the page.

### Layout behavior
- collage is allowed, but avoid random rotation everywhere.
- hero image should feel intentional and largest.
- use breathing room around at least one photo cluster.

### Color behavior
Let photography dominate.
Use `PAPER` + one strong accent, often `PINK_STRONG` or `COBALT`.
If photo colors are already saturated, reduce surrounding chroma.

### Anti-patterns
- same frame repeated 6 times;
- stickers on every empty gap;
- captions crossing photo boundaries;
- gallery thumbnails too small to enjoy in print.

---

## P07 — 1DAY MODEL COURSE / MAP

### Page job
Make a playful but genuinely understandable travel-course page where sequence and place are obvious.

### Hierarchy
1. 1DAY title.
2. route/sequence spine.
3. 4–6 timed/place stops.
4. food/place photo highlights.
5. short practical labels.

### Asset recipe
- `TITLE_1DAY_*` × 1.
- `TITLE_MAP_*` × 0–1 secondary.
- `ROUTE_GLOBAL_*` × 0–1.
- `MAP_GLOBAL_*` × 0–1.
- travel/food photos × 2–4.
- frames/callouts × 2–4.
- small travel accents × 1–3.

### Layout behavior
- route is semantic: it must connect actual ordered stops, not merely decorate.
- time/place text remains native and close to each stop.
- strongest food/place image can interrupt the route visually without breaking order.

### Color behavior
Dominant: `LAGOON_CYAN` / `PAPER`.
Route/structure: `COBALT` or `DEEP_TEAL`.
Highlight: `SUNNY_YELLOW` with `INK`.

### Anti-patterns
- fake transit map complexity;
- route dots that do not correspond to content;
- tiny itinerary copy around oversized decoration.

---

## P08 — BACK / CAFE + TABLE / WEDDING GUIDE + MESSAGE

### Page job
Close the booklet warmly. Give the remaining useful guide/cafe/table information without making the back page feel like an appendix dump.

### Hierarchy
1. closing/guide/cafe title depending on final content authority.
2. one useful visual block (food/table/guide).
3. short final message.
4. optional date/name reprise.
5. minimal closing decoration.

### Asset recipe
- `TITLE_BACK_*` / `TITLE_CAFE_*` / `TITLE_GUIDE_*` depending on live content.
- `GENERATED_FOOD_CAFE_*` × 1–2.
- `GENERATED_PHOTO_TABLE_*` × 0–1.
- callout/frame × 1–3.
- closing decoration × 1–2.
- date/name badge optional × 1.

### Layout behavior
- reduce density slightly versus P05/P07 so the booklet has a closing cadence.
- final message needs a calm reading field.
- avoid putting essential final message directly over photography.

### Color behavior
Dominant: `WARM_CREAM` or `PAPER`.
Support: `PINK_STRONG` / `CORAL`.
Optional closing surprise: `MINT` or `SUNNY_YELLOW`.
Body: `INK`.

### Anti-patterns
- treating the back page as a junk drawer;
- every remaining asset forced in;
- low-contrast sentimental copy;
- giant decorative title that leaves no room for the actual message.

---

# Whole-book rhythm

The eight pages should not all have the same density.

Recommended tempo:
- P01: very high impact / high energy.
- P02: medium-high, structured.
- P03: medium, reading-oriented.
- P04: medium-high, sequential.
- P05: high, browseable travel feature.
- P06: photo-led emotional pause.
- P07: high, information + route.
- P08: medium, warm closing.

A good book alternates `impact → read → story → browse → pause → guide → close` rather than repeating one dashboard grammar.

# Cross-page color rhythm

Do not assign a totally unrelated palette to every page. Use the shared token family, but rotate dominance:
- strong blue/cyan page next to a warmer cream/pink page;
- photo-heavy page with reduced graphic color after a dense information page;
- reserve `SUNNY_YELLOW` as a burst/highlight, not a full-book body background.

# AI completion gate per page

Before marking a page at `ASSET_FIRST_80`:
- page job is obvious at 3-second scan;
- required major asset roles are placed;
- semantic filenames are recorded;
- photo hierarchy is visible;
- body copy has a stable readable zone;
- dominant/support/accent colors are selected;
- no accidental low-contrast pair is present;
- no `REFERENCE_` is used as production art;
- no `DUMMY_` is described as final real imagery;
- masks/clips are in place for replaceable images;
- no known low-res asset is silently enlarged.