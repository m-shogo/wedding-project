# V5 Journey Ribbon Subtraction QA

Date: 2026-08-06
Status: `VERIFIED / ADOPTED FOR CURRENT V5`

## Visible problem

The back-cover journey module already had the native heading `OUR JOURNEY ROUTE`, a six-point route graphic, dates, labels, and a footer. Directly above it, a yellow ribbon repeated the same section meaning with `6つの出来事でたどる OUR JOURNEY`. The ribbon added another wide color field and UI-like badge silhouette without adding navigation, factual content, provenance, or hierarchy.

## Quality-over-legacy question

If the yellow ribbon did not already exist, it would not be chosen for this composition. The route heading and route geometry already communicate the module clearly, while the extra ribbon competes with the photo and Friends & Family section above.

## Hypothesis

Hide only the redundant ribbon rectangle and native-text label. Preserve the route heading, route graphic, dates, labels, footer, semantic nodes, image fills, fold guide, and rollback frames.

## Live Figma experiment

- target frame: `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`
- `77:98 / HISTORY_RIBBON`: `visible true → false`
- `77:99 / HISTORY_RIBBON_TXT`: `visible true → false`
- preserved `77:47 / BACK_VISUAL_HISTORY_TITLE` with text `OUR JOURNEY ROUTE`
- no deletion, text rewrite, geometry edit, image replacement, crop edit, or hierarchy change

## Three-scale QA

### Whole item / thumbnail

The lower-left back-cover area is quieter and the visual transition from Friends & Family into the route module is cleaner. No empty hole or balance regression appeared. The cover side remains unchanged.

### Reading / page scale

The reading order remains:

`main memory photo → Friends & Family → two supporting photos and captions → OUR JOURNEY ROUTE → six route events → footer`

The route section remains clearly identifiable through its native heading and connected event geometry.

### Detail / actual-size and structure

Verified after the change:

- native text nodes: `85`
- visible text nodes: `47`
- IMAGE-fill nodes: `14`
- fold guide `77:288 / PROVISIONAL_FOLD_GUIDE`: preserved and visible
- rollback frames `59:2` and `59:178`: preserved and visible
- all existing image hashes unchanged
- no text reflow, clipping, collision, mask exposure, crop regression, or semantic-node loss

## Result

`ADOPTED FOR CURRENT V5`

The subtraction improves editorial hierarchy and reduces decorative density while retaining all unique information and rollback safety.

## Failure / regression limit

This does not establish that all ribbons should be removed. A ribbon may remain when it supplies unique section identification, necessary contrast, or intentional magazine navigation. It was rejected here because a native heading and complete route module already supplied the same function.

## Gate impact

This is an editorial-density improvement only. It does not close any Drive-ID → Figma-node → image-hash evidence gap and does not change:

- `INTENDED_SOURCE_APPLIED`
- `PHOTO_ROLE_PASS`
- V5 dummy-design completion gate
- V6 start gate

## Next safe application

Continue auditing remaining decorative fields for duplicated semantic function, but do not let subtraction work outrank the unresolved dominant-photo evidence and quality gates.