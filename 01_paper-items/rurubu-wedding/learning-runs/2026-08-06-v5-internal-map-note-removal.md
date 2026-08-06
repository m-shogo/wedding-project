# V5 Internal Map-Instruction Removal QA

Date: 2026-08-06
Status: `VERIFIED / ADOPTED FOR CURRENT V5`

## Visible problem

The inside-right `MEMORY SPOTS / MINI MAP` area contained a visible production-direction sentence, `1大＋3小で、主役の場所を明確に。`, in node `77:538 / AUTH_MAP_MICRO`. This sentence describes the composition strategy rather than wedding content. It appeared as small cyan copy above the map module and risked being mistaken for guest-facing editorial text.

## Quality-over-legacy question

If the sentence did not already exist, it would not be selected for the finished dummy design. It is an internal layout instruction, not factual content, navigation, provenance, captioning, or atmosphere.

## Hypothesis

Hide only the internal instruction node while preserving its native text and semantic name for rollback. Do not alter the `MEMORY SPOTS / MINI MAP` heading, map imagery, numbered memory modules, captions, crop, image hashes, geometry, fold guide, or rollback frames.

## Live Figma experiment

- file key: `bfM0d4c9dCeBv5pCkJ3TNM`
- target frame: `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`
- `77:538 / AUTH_MAP_MICRO`: `visible true → false`
- preserved native characters: `1大＋3小で、主役の場所を明確に。`
- no deletion, text rewrite, geometry edit, crop edit, image replacement, or hierarchy change

## Three-scale QA

### Whole item / thumbnail

The cyan process note no longer competes with the `MEMORY SPOTS / MINI MAP` heading or create a stray line above the photo hierarchy. The right page remains balanced against the left profile page.

### Reading / page scale

The reading order remains:

`OUR HISTORY → timeline → dominant history photo and caption → MEMORY SPOTS / MINI MAP → dominant memory image → numbered supporting memories → footer`

No guest-facing information or navigation was removed.

### Detail / actual-size and structure

Verified after the change:

- `77:538` remains native `TEXT`, semantically named, and rollback-safe, but is hidden
- native text nodes: `92`
- visible text nodes: `60`
- IMAGE-fill nodes: `9`
- fold guide `77:288 / PROVISIONAL_FOLD_GUIDE` remains visible
- rollback frames `59:2 / 01_RURUBU_AUTHENTIC_OUTER` and `59:178 / 02_RURUBU_AUTHENTIC_INSIDE` remain present
- no text reflow, clipping, collision, mask exposure, crop regression, or semantic-node loss observed in the post-change screenshot

## Result

`ADOPTED FOR CURRENT V5`

The change removes internal production language from the guest-facing design while preserving editability and rollback history.

## Failure / regression limit

This does not justify hiding all microcopy. Editorial captions, explanatory lines, location labels, and factual notes remain when they serve the reader. Only process directions and designer-facing instructions should be excluded from Current presentation frames.

## Gate impact

This is a content-hygiene and editorial-authenticity improvement only. It does not close any Drive-ID → Figma-node → image-hash evidence gap and does not change:

- `INTENDED_SOURCE_APPLIED`
- `PHOTO_ROLE_PASS`
- V5 dummy-design completion gate
- V6 start gate

## Next safe application

Audit Current V5 frames for any remaining process-language, placeholder directions, or QA notes accidentally visible to guests. Then return priority to unresolved dominant-photo provenance and quality evidence.