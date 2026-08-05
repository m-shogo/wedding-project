# V5 journey-route label contrast repair

Date: 2026-08-05
Scope: Rurubu WEDDING V5 only
Status: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_PROMOTED`

## Source and visible problem

Live Figma outer spread `77:18` showed the six event labels beneath `OUR JOURNEY ROUTE` at 10 px in medium gray (`RGB 0.38/0.38/0.38`). At actual-size review, the labels were materially weaker than the dates and surrounding editorial copy, reducing print plausibility and making the route harder to scan.

## Hypothesis

Keeping font size, wording, positions, line breaks, and native text unchanged while darkening only the six event labels would improve actual-size readability without increasing density or disturbing the route rhythm.

## Expected improvement

- clearer date → event reading pairs
- better small-text contrast on the cream paper field
- no new cards, badges, shadows, gradients, or decorative fields
- no geometry or crop regression

## Possible regression

The labels could become too visually loud and compete with the dates or route dots. Adoption therefore required whole-spread screenshot inspection after the mutation.

## Experiment

Changed only the first solid fill color on:

- `77:51 / BACK_VISUAL_HISTORY_1_TEXT`
- `77:54 / BACK_VISUAL_HISTORY_2_TEXT`
- `77:57 / BACK_VISUAL_HISTORY_3_TEXT`
- `77:60 / BACK_VISUAL_HISTORY_4_TEXT`
- `77:63 / BACK_VISUAL_HISTORY_5_TEXT`
- `77:66 / BACK_VISUAL_HISTORY_6_TEXT`

Color changed from approximately `RGB 0.38/0.38/0.38` to `RGB 0.22/0.22/0.22`.

Preserved:

- 10 px font size
- all native text strings
- positions, widths, heights, and line breaks
- dates, route dots, dashed route, ribbons, photos, and all semantic image nodes
- V4 rollback frames

## Verification evidence

### Whole-item / thumbnail

The outer spread remains balanced. The route remains subordinate to the dominant back-cover photo and the cover hero.

### Reading / page

All six date-and-event pairs are easier to scan. No label becomes a competing headline and no route spacing changes.

### Detail / actual-size

The event labels retain their original 10 px size but have visibly stronger contrast against the cream background. No overflow, clipping, overlap, or punctuation change appeared.

### Structure

The six nodes remain native `TEXT` nodes with their original IDs and geometry. Fonts were loaded before mutation. Only cloned fill arrays were reassigned.

## Result

**ADOPTED for the current V5 candidate.** This is a bounded print-legibility correction, not a project-wide rule that all secondary gray text must use this value.

## Failure / limitation

This does not repair the dominant-photo source quality and does not increase `PHOTO_ROLE_PASS`. A direct `upload_assets` attempt for the verified back-cover Q60 WebP again failed at container DNS resolution for `mcp.figma.com`; the external POST path is not retried further.

## Next application

Continue with a different binary-safe placement method for Batch A. Until then, advance only discrete, rollback-safe typography or editorial defects backed by live screenshot evidence; do not substitute endless decoration removal for the blocked photo work.
