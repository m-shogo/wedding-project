# V5 back-cover city-overlay subtraction

Date: 2026-08-05
Item/version: Rurubu WEDDING V5
Live Figma page: `01_RURUBU_WEDDING`
Outer candidate: `77:18`
Target semantic photo: `77:24 / BACK_VISUAL_MAIN_MEMORY_PHOTO`

## Source and observed problem

The live outer-spread screenshot showed ten semi-transparent rectangular `BACK_CITY_*` bars placed across the lower portion of the back-cover main photograph. The bars simulated a skyline independently of the image content, obscured the crop, amplified the visible low-resolution appearance, and would conflict with the accepted still-life replacement prepared for this role.

## Hypothesis

Removing the non-semantic skyline overlay before adding any new decoration should return visual area to the photograph, improve crop legibility, and make the frame compatible with the verified still-life derivative. Because the layers are decorative and separate from the semantic photo node, visibility-only subtraction should preserve editability and rollback safety.

## Expected improvement

- clearer main-photo crop
- less artificial/template decoration
- less visible interference over the dominant back-cover image
- cleaner transition to the prepared still-life replacement

## Possible regression

The scrapbook frame could feel too empty or lose some travel-magazine energy after removal. Adoption therefore required whole-spread screenshot review and confirmation that the kicker, torn-paper frame, tape, plant, airplane, heading, and adjacent editorial modules still carried sufficient character.

## Live Figma experiment

Set `visible = false` on:

- `77:76 / BACK_CITY_0`
- `77:77 / BACK_CITY_1`
- `77:78 / BACK_CITY_2`
- `77:79 / BACK_CITY_3`
- `77:80 / BACK_CITY_4`
- `77:81 / BACK_CITY_5`
- `77:82 / BACK_CITY_6`
- `77:83 / BACK_CITY_7`
- `77:84 / BACK_CITY_8`
- `77:85 / BACK_CITY_9`

No nodes were deleted. Semantic image node `77:24`, native text, crop geometry, frame hierarchy, and V4 rollback frames were not changed.

## Verification

Whole-item screenshot QA after the change showed:

- the gray skyline bars were removed cleanly
- no blank hole, exposed mask, or broken frame edge
- the scrapbook frame, kicker, airplane, plant, tape, title, body copy, Friends & Family modules, and route remained intact
- the back-cover photo became easier to read despite its current low-quality source
- the cover side and all semantic nodes remained visually unchanged

Structure QA:

- `77:24` remains `BACK_VISUAL_MAIN_MEMORY_PHOTO`
- all ten changed layers remain available for immediate visibility rollback
- no photo-role PASS count was increased
- V5 is still blocked on the high-quality Batch A image placements

## Result

`PROTOTYPED → VERIFIED / ADOPTED_FOR_V5_CURRENT / VISIBILITY_ROLLBACK_PRESERVED`

## Failure and blocker record

The official Figma upload endpoint was requested again for the Drive-verified JPEG derivative, but the execution environment still could not resolve `mcp.figma.com`. The external POST route is therefore not counted as progress and should not be retried without a changed network method. The prepared Drive derivative remains unapplied.

## Reusable lesson

When a decorative overlay independently redraws subject matter already owned by a photograph, it can reduce editorial clarity and make later asset replacement harder. Subtract the duplicate visual layer first; retain only decoration that frames, labels, or guides the content without competing with the image itself.

Evidence level: `VERIFIED` for this V5 role only. Not yet promoted to a project-wide rule.

## Next application

Return to Batch A binary-safe placement. Apply the accepted back-main derivative to `77:24`, then verify Drive ID → node ID → image hash, whole-spread/page/actual-size screenshot quality, structure, and ledger state. Do not treat this subtraction as a substitute for the required image repair.
