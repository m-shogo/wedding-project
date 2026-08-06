# V5 History Photo Kicker Subtraction QA

Date: 2026-08-06
Status: `VERIFIED / ADOPTED FOR CURRENT V5`

## Visible problem

The inside-right history page already had the page heading `OUR HISTORY`, a six-point chronological timeline, dates, event labels, and a dominant history photograph. A yellow bar placed partly over the photograph repeated the same meaning with `6つの出来事でたどる ふたり年表`. It introduced another wide color field and label layer without adding unique navigation, factual content, provenance, or hierarchy.

## Quality-over-legacy question

If the yellow kicker did not already exist, it would not be selected for this composition. The timeline and page heading already establish chronology, and the bar partially interrupts the dominant image rather than strengthening the editorial reading order.

## Hypothesis

Hide only the redundant kicker rectangle and its native-text label. Preserve `OUR HISTORY`, the timeline, the dominant history image, its caption strip, memory-spots section, fold guide, semantic nodes, image hashes, native text, and rollback frames.

## Live Figma experiment

- file key: `bfM0d4c9dCeBv5pCkJ3TNM`
- target frame: `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`
- `77:466 / HISTORY_PHOTO_KICKER`: `visible true → false`
- `77:467 / HISTORY_PHOTO_KICKER_TXT`: `visible true → false`
- preserved `77:422 / IA_HISTORY_MEMORY_PHOTO`
- no deletion, text rewrite, geometry edit, crop edit, image replacement, or hierarchy change

## Three-scale QA

### Whole item / thumbnail

The history page now reads more directly from the page heading and timeline into the dominant image. The yellow interruption disappeared without creating an empty hole or upsetting the balance against the profile page.

### Reading / page scale

The reading order remains:

`OUR HISTORY → chronological timeline → dominant history photograph and caption → MEMORY SPOTS / MINI MAP → lead memory → two supporting memories → footer`

Chronology remains explicit through the timeline and dates; no section identification was lost.

### Detail / actual-size and structure

Verified after the change:

- native text nodes: `92`
- visible text nodes: `62`
- IMAGE-fill nodes: `9`
- `77:466` and `77:467`: preserved but hidden
- `77:422 / IA_HISTORY_MEMORY_PHOTO`: visible, geometry unchanged, image hash `1bfd7f1fa601206bfed1594a140b40554e85d77a`
- fold guide `77:288 / PROVISIONAL_FOLD_GUIDE`: preserved and visible
- rollback frames `59:2` and `59:178`: preserved and visible
- all existing image hashes unchanged
- no text reflow, clipping, collision, mask exposure, crop regression, or semantic-node loss observed in the post-change screenshot

## Result

`ADOPTED FOR CURRENT V5`

The subtraction improves editorial continuity, gives the dominant photograph more authority, and reduces UI-like label density while preserving all unique information and rollback safety.

## Failure / regression limit

This does not establish that all image kickers should be removed. A kicker may remain when it adds unique context, required contrast, or necessary navigation not already supplied by the page heading, timeline, caption, or module structure.

## Gate impact

This is an editorial-density improvement only. It does not close any Drive-ID → Figma-node → image-hash evidence gap and does not change:

- `INTENDED_SOURCE_APPLIED`
- `PHOTO_ROLE_PASS`
- V5 dummy-design completion gate
- V6 start gate

## Next safe application

Return priority to unresolved dominant-photo provenance and quality evidence. Continue subtraction audits only when a remaining element demonstrably duplicates an existing semantic function.