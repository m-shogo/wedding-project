# Rurubu V7/V8 Cafe — Photo Source-Truth Close QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## New professional research

This pass rotated to book-cover/editorial-system thinking and source-truth implications of image+copy. Pentagram's book-design practice frames a book as an orchestrated storytelling experience across typography, layout, production and images; AIGA 50 Books/50 Covers case studies show covers may be typography-led, photography-led, or hybrid when the concept supports it. The relevant Rurubu decision principle was not a visual style: a photographic role should not inherit specific place authority merely because adjacent copy names a destination.

## Live defects

### V7 H8 `2428:35`
The dining photo is explicitly `STRUCTURAL PHOTO DUMMY / V7 TABLE DOMINANT / NOT FINAL HAWAII`, while the nearby close read `夜のハワイを、ゆっくり味わう。`. At reading scale the place-specific wording could make the dummy read as documentary Hawaii evidence.

### V8 AS6 `2434:109`
The dining photo is explicitly `PHOTO_DUMMY / CAFE_TABLE_DINING_ESSAY_REPLACEABLE / NOT FINAL`, while the nearby close read `夜の横浜を、ゆっくり味わう。`. The same source-truth risk existed in a materially different restrained book system.

## Bounded experiments

### V7 H9 `2454:2` — promoted
Changed only the close copy:

- before: `夜のハワイを、\nゆっくり味わう。`
- after: `夜の食卓を、\nゆっくり味わう。`

No photo, crop, image hash, display title, palette, grid, caption, or factual personal copy changed.

### V8 AS7 `2454:25` — promoted
Changed only the close copy:

- before: `夜の横浜を、\nゆっくり味わう。`
- after: `夜の食卓を、\nゆっくり味わう。`

No photo, crop, image hash, grid, typography system, or other copy changed.

### V8 Outer AV4A `2453:2` / AV4B `2453:24` — rejected
Because AV3 also pairs a destination-specific `横浜` cover with an unverified structural photo, two rollback-safe typography-only tests were made.

- AV4A hid the photo only. It failed because white overlay copy became effectively invisible and the front lost a coherent visual field.
- AV4B converted the front headline to navy and enlarged/repositioned existing type. It was source-truth safer, but whole-item comparison showed excessive empty-field reading and materially weaker travel desire than AV3.

Both were hidden as rejected evidence. AV3 remains current until legitimate role-specific destination photography exists; the experiment proves that truth-safe subtraction is not automatically a superior cover.

## Three-scale QA

H9:
- 500px whole-item: PASS
- 1400px reading/page: PASS
- 1587×1123 actual-size: DESIGN QA PASS
- visible native text `11`
- visible IMAGE fills `5`
- text intersections `0`
- 18px text edge risks `0`
- Japanese text assigned to Inter `0`

AS7:
- 500px whole-item: PASS
- 1400px reading/page: PASS
- 1587×1123 actual-size: DESIGN QA PASS
- visible native text `11`
- visible IMAGE fills `1`
- text intersections `0`
- 18px text edge risks `0`
- Japanese text assigned to Inter `0`

Post-promotion page QA:
- all current V7/V8 roots are under `2052:2`
- all are visible
- pairwise current-root overlap `0`

## Professional critique

- Art director: H9 retains V7's high-energy food/travel personality; AS7 retains V8's restrained publication personality.
- Editorial designer: the close now describes the reader-facing food/table role rather than asserting unverified place evidence.
- Book designer: no new module or filler was added; page rhythm is unchanged.
- Typographer: line count, scale, and hierarchy remain stable.
- Photo editor: source-truth improves, but both photos remain structural dummies and REAL PHOTO QA is blocked.
- Print designer: no PPI, separation, printer-template, preflight, or physical-proof claim.

## Promotion / rollback

Current:
- V7 H9 `2454:2` at `19500 / 13000`
- V8 AS7 `2454:25` at `1800 / 9850`

Hidden rollback:
- V7 H8 `2428:35`
- V8 AS6 `2434:109`

Hidden rejected:
- V8 AV4A `2453:2`
- V8 AV4B `2453:24`

## Learning state

This is a new materially different-role reproduction of existing **RSL-262** `F-RSL-262-GROUNDED-SPECIFIC-COPY-ACTS-AS-A-CAPTION-FOR-AN-UNVERIFIED-PHOTO`.

The stronger interpretation is now: source-truth risk is not limited to literal captions. A nearby place-specific close, deck, or headline can also transfer documentary authority to an unverified image. The correction may be to verify/replace the image, separate ownership, or rewrite only the non-factual editorial close to the semantic role actually shown.

State remains `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`; all reproductions are still inside Rurubu WEDDING.

## Asset truth

- new image generation: `0`
- Drive writes: `0`
- new Drive masters: `0`
- new image hashes: `0`
- final photography adopted: `0`
- V6 changes: `0`
