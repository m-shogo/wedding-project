# V5 Q&A Top-Tape Subtraction QA

Date: 2026-08-06
Status: `VERIFIED / ADOPTED FOR CURRENT V5`

## Visible problem

The inside-left profile page already had the native heading `3 QUESTIONS` and the explanatory line `旅の途中で聞いてみました`. A yellow tape immediately above it repeated the same function with `ふたりに聞きました！`, adding another wide color field without unique factual, navigational, provenance, or structural value.

## Quality-over-legacy question

If the yellow tape did not already exist, it would not be selected for this composition. The heading and explanatory line already establish the Q&A section more clearly and with stronger typographic hierarchy.

## Hypothesis

Hide only the redundant tape rectangle and its native-text label. Preserve `3 QUESTIONS`, the explanatory line, all three question modules, native text, semantic nodes, image fills, fold guide, geometry, and rollback frames.

## Live Figma experiment

- file key: `bfM0d4c9dCeBv5pCkJ3TNM`
- target frame: `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`
- `77:339 / QA_TOP_TAPE`: `visible true → false`
- `77:340 / QA_TOP_TAPE_TXT`: `visible true → false`
- preserved `77:308 / IA_QA_HEADING` (`3 QUESTIONS`)
- no deletion, text rewrite, geometry edit, crop edit, image replacement, or hierarchy change

## Three-scale QA

### Whole item / thumbnail

The left page is quieter and reads more directly from the profile section into `3 QUESTIONS`. Removing the extra yellow bar reduces repeated color-field density without creating an empty hole or disturbing balance against the history page.

### Reading / page scale

The reading order remains:

`OUR PROFILE / ABOUT US → two profile modules → 3 QUESTIONS + explanatory line → Q1 lead module → Q2/Q3 supporting modules → shared interests → TRAVEL NOTE`

No section identification or content was lost.

### Detail / actual-size and structure

Verified after the change:

- `77:339` and `77:340` remain in the file but are hidden
- `77:308 / IA_QA_HEADING` remains visible and native text
- all question text remains visible and editable
- no text reflow, clipping, collision, mask exposure, crop regression, or semantic-node loss observed
- fold guide and rollback frames remain untouched
- all existing image fills and hashes remain unchanged

## Result

`ADOPTED FOR CURRENT V5`

The subtraction improves editorial hierarchy and reduces UI/sticker-like density while preserving all unique information and rollback safety.

## Failure / regression limit

This does not establish that all section tapes should be removed. A tape can remain when it adds unique navigation, required contrast, or a semantic label not already provided by the adjacent heading and explanatory copy.

## Gate impact

This is an editorial-density improvement only. It does not close any Drive-ID → Figma-node → image-hash evidence gap and does not change:

- `INTENDED_SOURCE_APPLIED`
- `PHOTO_ROLE_PASS`
- V5 dummy-design completion gate
- V6 start gate

## Next safe application

Return priority to unresolved dominant-photo provenance and quality evidence. Continue subtraction only where a remaining element demonstrably duplicates an existing semantic function.
