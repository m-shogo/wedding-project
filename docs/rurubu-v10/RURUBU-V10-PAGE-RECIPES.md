# Rurubu WEDDING V10 — 8-Page Recipe Book

Status: `V10_CANONICAL_PAGE_RECIPE`

Format: A5 portrait, 148 × 210 mm trim, 3 mm bleed, 8 pages.

Live Figma production page: `09_RURUBU_V10_A5_8P_PRODUCTION` (`2787:2`).

Purpose: remove blank-canvas ambiguity for Figma AI. These are composition recipes, not rigid templates. The page-role mapping below is synchronized to the live V10 production skeleton and should be rechecked against Figma before every structural write.

Global rule: first get all eight pages to ~60–80% with existing organized Drive assets. Do not finish one page to 100% while the rest are empty.

## Live page map

| Page | Figma frame | Live role |
|---|---|---|
| P01 | `2787:3` | COVER |
| P02 | `2787:9` | PROFILE |
| P03 | `2787:15` | Q&A |
| P04 | `2787:22` | STORY |
| P05 | `2787:28` | TIMELINE + MEMORY |
| P06 | `2787:35` | MEMORY SPOTS + GALLERY |
| P07 | `2787:42` | 1DAY + CAFE TABLE |
| P08 | `2787:49` | BACK COVER |

If this live mapping changes later, Figma live state wins and this file must be updated rather than silently applying stale page numbers.

---

## P01 — COVER

### Page job
Within 3 seconds: `This is Rurubu WEDDING, this is the couple's joyful travel-themed wedding booklet, and it feels worth opening.`

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
- optional `ROUTE_*` × 1 only if it creates real compositional movement.

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
1. profile title.
2. Bride/Groom photo pair with differentiated but balanced treatment.
3. names + core profile facts.
4. short personality facts.
5. small playful accents.

### Asset recipe
- `TITLE_PROFILE_*` × 1.
- verified real profile photos where available; otherwise `DUMMY_PHOTO_PROFILE_*` only for layout.
- `FRAME_PROFILE_*` or selected global portrait frames × 2.
- `DECORATION_*` × 2–4.
- optional personal/travel motif × 1 only if it supports the story rather than filling a hole.

### Layout behavior
- two people need equal editorial respect but not necessarily symmetric rectangles.
- vary frame shape/angle/scale slightly while maintaining a clean reading spine.
- keep factual text on calm light fields.

### Color behavior
Dominant: `PAPER` / `WARM_CREAM`.
Support: `PINK_STRONG` + `LAGOON_CYAN` as person/section accents only with explicit labels.
Body: `INK`.
Do not rely on color alone to identify each person.

### Anti-patterns
- gender-coded color being the only label;
- two identical profile cards that feel like employee profiles;
- long body copy inside decorative image assets.

---

## P03 — Q&A

### Page job
Make the couple feel human and playful while questions remain highly scannable and answers comfortable to read.

### Hierarchy
1. Q&A title.
2. 4–6 question anchors.
3. answers / comparison.
4. supporting photo or cutout.

### Asset recipe
- `TITLE_PROFILE_QA_*` × 1.
- `FRAME_PROFILE_QA_*` × 0–1 as visual construction support only; authoritative Q&A stays native text.
- supporting photo/cutout × 1–2.
- selected callout/speech-bubble frames × 1–3; do not box every answer.
- `DECORATION_*` × 1–3.

### Typography
- question labels: 10–13 pt equivalent, bold/display.
- answers: BODY range.
- maintain strong vertical spacing between question groups.

### Color behavior
One question accent and one support accent are enough. Labels/position must also identify structure.
Long answers remain `INK` on `PAPER`/`WARM_CREAM`.

### Anti-patterns
- six equal rounded cards;
- every answer in a different color;
- tiny answer copy to fit decorative frames.

---

## P04 — STORY

### Page job
Tell the relationship story emotionally before the reader reaches the more structured chronology on P05.

### Hierarchy
1. `ふたりのこと` / story title.
2. one emotional hero photo or story anchor.
3. short narrative blocks / memorable episodes.
4. 1–2 supporting photos/cutouts.
5. restrained editorial accents.

### Asset recipe
- `TITLE_STORY_FUTARI_NO_KOTO_*` × 1.
- story real/dummy photos × 2–3 according to verification state.
- `FRAME_GLOBAL_*` or story-appropriate frame × 1–3.
- stamp/camera/heart/travel decoration × 1–3.
- no timeline-specific graphic unless it genuinely belongs to a story teaser.

### Layout behavior
- let one image or one sentence act as the emotional anchor.
- narrative text needs a calm reading field.
- asymmetry is encouraged, but reading order must remain obvious.
- leave chronology-heavy dates to P05 instead of making P04 another stepper.

### Color behavior
Dominant: `PAPER` or `WARM_CREAM`.
Emotional accent: `CORAL` / `PINK_STRONG`.
Secondary travel accent: `LAGOON_CYAN` or `MINT`.
Body: `INK`.

### Anti-patterns
- corporate timeline UI on P04;
- every story paragraph in its own card;
- decorative travel objects competing with the actual story.

---

## P05 — TIMELINE + MEMORY

### Page job
Make the chronological path unmistakable while mixing in selective memory highlights so it reads like an editorial journey, not a project roadmap.

### Hierarchy
1. timeline title / date entry point.
2. chronological spine or obvious sequence.
3. milestone dates.
4. short milestone descriptions.
5. selected memory photo highlights.

### Asset recipe
- `TITLE_STORY_TIMELINE_*` × 1 when suitable.
- `FRAME_STORY_TIMELINE_*` × 0–1 as construction/reference support; final facts remain native text.
- memory/story photos × 2–4.
- `ROUTE_*` × 0–1 only if it improves true chronological order.
- stamp/camera/heart accents × 1–3.

### Layout behavior
- timeline may bend, step or alternate, but order must be unmistakable.
- dates should be visually stronger than long descriptions.
- one milestone can be intentionally enlarged as the emotional peak.
- memory photos should interrupt or support chronology, not obscure it.

### Color behavior
Dominant: `PAPER`.
Sequence accent: `COBALT` or `PINK_STRONG`.
Highlight milestone: `SUNNY_YELLOW` with `INK`.
Do not color every milestone differently.

### Anti-patterns
- corporate roadmap/stepper UI;
- identical timeline nodes;
- ornamental airplane route that does not match chronology;
- too many photos making the time order ambiguous.

---

## P06 — MEMORY SPOTS + GALLERY

### Page job
Combine the useful browseability of a compact travel feature with an emotional photo gallery. Guests should understand memorable places first, then enjoy the imagery.

### Hierarchy
1. `MEMORY SPOT` title.
2. one largest destination/photo anchor.
3. 2–4 smaller memory/destination stories.
4. `BEST SHOT` / gallery accent where useful.
5. short labels/captions.

### Asset recipe
- `TITLE_MEMORY_MEMORY_SPOT_*` × 1 primary.
- `TITLE_MEMORY_BEST_SHOT_*` or `BADGE_MEMORY_BEST_SHOT_*` × 0–1 secondary.
- `TITLE_MEMORY_GALLERY_*` × 0–1 if hierarchy remains clean.
- `GENERATED_PHOTO_MEMORY_*` / verified real travel photos × 3–6.
- mixed photo frames × 2–5.
- `MAP_*` / `ROUTE_*` × 0–1 only when semantically useful.
- camera/stamp/travel decoration × 1–3.

### Layout behavior
- one image clearly dominates.
- supporting photos use mixed shape/scale; avoid four equal cards even if placeholder masks started that way.
- destination name/caption stays close to its image.
- photography should carry more of the visual weight than stickers.

### Color behavior
Let photography lead. Use `PAPER` with either `COBALT`/`LAGOON_CYAN` or `PINK_STRONG` as the main graphic accent.
Warm counterpoint: `CORAL` / `SUNNY_YELLOW` sparingly.
Body: `INK`.

### Anti-patterns
- equal destination cards;
- same frame repeated everywhere;
- labels detached from photos;
- stickers filling every gap;
- gallery images too small to enjoy at A5.

---

## P07 — 1DAY + CAFE TABLE

### Page job
Make the 1DAY sequence understandable while using cafe/food/table content as visual rewards inside the itinerary rather than a disconnected second page.

### Hierarchy
1. 1DAY title.
2. route/sequence spine.
3. 4–6 timed/place stops where confirmed.
4. strongest cafe/food/table visual.
5. supporting food/place photos and practical labels.

### Asset recipe
- `TITLE_1DAY_*` × 1 primary.
- `TITLE_CAFE_*` × 0–1 secondary.
- `TITLE_MAP_*` × 0–1 only if a real map section exists.
- `ROUTE_GLOBAL_*` × 0–1.
- `MAP_GLOBAL_*` × 0–1.
- `GENERATED_FOOD_*` / cafe/table photo candidates × 1–3.
- travel photos × 1–3.
- frames/callouts × 1–3.
- small travel/food accents × 1–3.

### Layout behavior
- route is semantic: it must connect actual ordered stops, not decorate randomly.
- time/place text stays native and close to each stop.
- food/table imagery can be a high-impact interruption in the route, but sequence must remain recoverable immediately.
- cafe information should feel integrated into the day, not bolted on as a separate dashboard card.

### Color behavior
Dominant: `LAGOON_CYAN` / `PAPER`.
Route/structure: `COBALT` or `DEEP_TEAL`.
Food highlight: `CORAL` / `SUNNY_YELLOW` with `INK`.

### Anti-patterns
- fake transit-map complexity;
- route dots unrelated to content;
- tiny itinerary copy around oversized food art;
- one half page = route UI, other half = unrelated cafe card UI.

---

## P08 — BACK COVER

### Page job
Close the booklet warmly and memorably. This is a back cover, not a dumping ground for leftover sections.

### Hierarchy
1. closing visual or restrained closing title.
2. short final message.
3. optional date/name reprise.
4. 1–2 supporting photos or small guide/cafe remnant only when genuinely useful.
5. minimal closing decoration.

### Asset recipe
- `TITLE_BACK_*` × 0–1.
- closing hero/support photo × 1–3.
- `BADGE_COVER_DATE_*` × 0–1 for a subtle reprise.
- `GENERATED_FOOD_*` / table visual only if final content authority explicitly requires it here.
- callout/frame × 0–2.
- closing decoration × 1–2.

### Layout behavior
- reduce density from P05/P07 so the booklet has a closing cadence.
- final message needs a calm reading field.
- essential message should not sit directly over busy photography.
- preserve a clear back-cover silhouette at thumbnail scale.

### Color behavior
Dominant: `WARM_CREAM` / `PAPER`, or one verified dark field if reversed type passes.
Support: `PINK_STRONG` / `CORAL`.
Optional surprise: `MINT` / `SUNNY_YELLOW`.
Body: `INK` on light fields.

### Anti-patterns
- treating P08 as a junk drawer;
- every remaining asset forced in;
- low-contrast sentimental copy;
- giant decorative title that leaves no room for the actual closing message.

---

# Whole-book rhythm

The eight pages should not all have the same density.

Recommended live-V10 tempo:
- P01 COVER: very high impact / high energy.
- P02 PROFILE: medium-high, structured.
- P03 Q&A: medium, reading-oriented.
- P04 STORY: medium-high, emotional narrative.
- P05 TIMELINE + MEMORY: high, sequential information.
- P06 MEMORY SPOTS + GALLERY: high, browseable and photo-led.
- P07 1DAY + CAFE TABLE: high, information + food/travel reward.
- P08 BACK COVER: medium/quiet, warm closing.

The publication should feel like `impact → know them → read them → feel the story → follow the journey → browse memories → enjoy the day → close warmly`, not eight repetitions of one dashboard grammar.

# Cross-page color rhythm

Do not assign an unrelated palette to every page. Use the shared token family, but rotate dominance:
- strong blue/cyan page next to a warmer cream/pink page;
- photo-heavy page with reduced graphic color after a dense information page;
- reserve `SUNNY_YELLOW` as a burst/highlight, not a full-book body background;
- never rely on page color alone to communicate page role.

# AI completion gate per page

Before marking a page at `ASSET_FIRST_80`:
- live Figma page role still matches this recipe;
- page job is obvious at 3-second scan;
- required major asset roles are placed;
- semantic filenames + Drive IDs are recorded;
- photo hierarchy is visible;
- body copy has a stable readable zone;
- dominant/support/accent colors are selected;
- no accidental low-contrast pair is present;
- no `REFERENCE_` is used as production art;
- no `DUMMY_` is described as final real imagery;
- masks/clips are in place for replaceable images;
- no known low-res asset is silently enlarged;
- page still contributes the intended whole-book rhythm.