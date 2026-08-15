# RURUBU WEDDING V6 — O / AK / AI Editorial QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
GitHub main immediately before this evidence write: `04b692e581dd85d26255d60cd94a37aaff6c6657`
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Result

V6 preferred studies advanced to:

- Outer O: `1370:2 / PREFERRED / V6_OUTER_O_VERIFIED_PNG_MASTHEAD_2026_08_16`
- Profile / Q&A AK: `1367:2 / PREFERRED / V6_INSIDE_AK_FEATURE_QUESTION_RHYTHM_2026_08_16`
- Story / chronology AI: `1363:125 / PREFERRED / unchanged this run`

Previous preferred frames remain preserved as rollback/comparison:

- Outer M `1241:2` — hidden comparison
- Profile / Q&A AJ `1364:2` — hidden comparison

Start Here `845:27` now reads:

`V5 FU/FX · V6 O + AK/AI INSIDE STUDIES · V7 HOLD`

V7 was not edited or advanced.

## AK — feature/support Q&A rhythm

### Visible problem

Fresh 1400 px and actual-size review of AJ showed that the Q&A page was structurally safe but six questions still read as nearly equal information modules. The result was cleaner than a card grid but still too close to a template rhythm at thumbnail and reading scale.

### Root-cause hypothesis

Removing cards is insufficient when every repeated semantic unit keeps approximately equal number scale, width and vertical weight. The page needs explicit editorial role differences between feature questions and supporting questions.

### Bounded test

AK was cloned rollback-safely from AJ. No photo, image hash, answer semantics, card, rounded rectangle, shadow or generated asset was added.

Native Q&A typography was redistributed so that:

- `01` and `04` become large feature-question anchors;
- `02`, `03` and `05` remain smaller support beats;
- `06` becomes a stronger closing beat;
- question and answer widths/positions are staggered instead of preserving a uniform two-column grid;
- the existing Memories photo field remains the dominant lower-page visual;
- the existing top rule and left rail remain functional but were shortened rather than multiplied.

The first AK render exposed wrapped `01` and `04` numerals due to insufficient text-box width. That state was rejected. The number boxes were widened and all resulting number/question/answer overlaps were repaired before promotion.

### Three-scale evidence

- 500 px whole spread: PASS — `01 / 04 / 06` survive reduction as intentional reading anchors and the page no longer reads as six equal modules.
- 1400 px whole spread: PASS — the Q&A half now has visible feature/support hierarchy while the Memories image remains dominant.
- actual-size Q&A page `1367:30`, `794×1123`: PASS — Japanese questions and answers remain readable and optically separated.

### Structure QA

Q&A `1367:30`:

- visible native text: `22`
- absolute text/text intersections after repair: `0`
- 18 px text safe-area risks: `0`
- photos remain the existing replaceable IMAGE roles; no image flattening or new binary placement occurred.

### Variable-copy stress

Hidden proof:

- `1368:2 / QA_HIDDEN / V6_AK_LONG_COPY_STRESS_2026_08_16`
- Q&A page `1368:30`

All six answer fields were replaced with realistic two-line Japanese answer copy and switched to height-growing native text.

Result:

- text/text intersections: `0`
- 18 px text safe-area risks: `0`
- no card/background regeneration was required.

This reapplies the project-wide dynamic-copy lesson: visual spatial polish must be revalidated after variable copy changes.

### Decision

`AK = VERIFIED_LOCAL / PREFERRED V6 PROFILE-QA STUDY / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`.

## O — verified PNG masthead reuse

### Visible problem

Outer M remained strong in photography and destination hierarchy, but the front cover used only a small native `旅する WEDDING` line as its masthead. At whole-spread and thumbnail scales it lacked a distinct magazine-identity entry point, even though the large `横浜` headline and hero photo were already strong.

### Authority / format check

Rurubu-specific production authority was re-read before the comparison:

- historical SVG identity assets are `NON_PRODUCTION / DO_NOT_USE`;
- current fixed identity candidates are transparent PNG only.

Therefore no SVG was used.

Current PNG logo A authority:

- file: `rurubu_wedding_logo_A_v1.png`
- Drive ID: `1opK9BSoL8rCeoYxuPWUyKZZsu0-Q165b`
- Drive readback on 2026-08-16: PNG, `629,061` bytes
- queue state: `CURRENT_CANDIDATE / ALPHA_VERIFIED / DRIVE_VERIFIED`

A previously verified Figma-resident logo node already carried image hash:

`0bdbf47904ea5865c71b1555dc73689b2c7b2126`

This same hash is recorded in earlier Rurubu outer QA evidence.

### Bounded test

Outer O was cloned from M. The tiny native masthead was hidden only on O and the already-resident verified PNG candidate node was cloned into the front cover:

- placed node: `1370:55 / FIXED PNG / MASTHEAD CANDIDATE`
- position: `x=435 / y=18`
- size: `330×106.7`
- scale mode: `FIT`
- image hash: `0bdbf47904ea5865c71b1555dc73689b2c7b2126`

No new generation, Drive write, upload or binary transport was required.

The first attempt to construct a new image-fill rectangle from the hash was tool-safety blocked before mutation. The method was changed instead of repeated: the already verified resident Figma node was cloned. That second method succeeded.

### Three-scale evidence

- 500 px whole spread: PASS — the masthead reads as a magazine identity without defeating the dominant `横浜` destination headline.
- 1400 px whole spread: PASS — logo, destination, postcard and hero photography form a denser but controlled cover entry.
- actual-size front page `1370:34`, `794×1123`: PASS — masthead remains sharp and separated from the postcard; no visible clipping or overlap was introduced.

### Asset lifecycle truth

For this run:

- generated: NO
- new Drive save: NO
- Drive readback: YES, existing authoritative logo A
- new binary upload: NO
- Figma placed: YES by cloning existing verified resident node
- Figma image hash verified: YES
- screenshot verified: YES at three scales
- visual adoption: YES for Outer O

Literal logo artwork, colors and placement remain Rurubu-specific and must not transfer to other wedding items.

### Decision

`O = VERIFIED_LOCAL / PREFERRED V6 OUTER STUDY / EXISTING_VERIFIED_PNG_REUSED / ROLLBACK_SAFE / NOT_PRINT_READY`.

## AI chronology continuity

AI `1363:125` was re-read and screenshot-reviewed this run but not modified. It remains the preferred Story/chronology study. No filler change was made merely to consume runtime.

## Final live readback

Fresh Figma readback after promotion:

- Outer O `1370:2`: visible / preferred
- Profile/Q&A AK `1367:2`: visible / preferred
- Story/chronology AI `1363:125`: visible / preferred
- Start Here `845:27`: `V5 FU/FX · V6 O + AK/AI INSIDE STUDIES · V7 HOLD`
- Outer M and Profile/Q&A AJ: retained hidden as comparisons
- V7: HOLD

## Overall declaration

`V6_O_AK_AI = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / NOT_PRINT_READY`.

V6 is not complete. Final real copy, real photography, exact print template/preflight, physical proof, and any later fixed-decoration adoption remain separate gates.
