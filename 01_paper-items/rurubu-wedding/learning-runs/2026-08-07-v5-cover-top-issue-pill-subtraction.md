# V5 cover top issue-pill subtraction

Date: 2026-08-07
Item/version: Rurubu WEDDING V5
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current outer candidate: `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`

## Visible problem

The front cover carried two issue-identification systems at once:

- top pill: `77:171 / ISSUE_BAR` and `77:172 / ISSUE_TEXT` (`横浜・みなとみらい 保存版`)
- bottom folio strip: `77:233 / BOTTOM_ISSUE_STRIP` and `77:234 / BOTTOM_ISSUE_TEXT`

The top pill repeated issue-level framing already supplied by the logo/date system and the persistent bottom issue strip. It added another rounded badge near the cover masthead without unique factual or navigational value.

## Tested principle

Apply subtraction before adding or redesigning decoration. A badge should remain only when it performs a unique editorial function that is not already served elsewhere on the same face.

## Hypothesis

Hiding the duplicate top issue pill should reduce template/UI badge density and let the masthead, date badge, and dominant photograph establish the opening hierarchy more directly. The bottom issue strip should retain issue metadata and magazine framing.

## Bounded experiment

Changed only visibility:

- `77:171 / ISSUE_BAR`: `visible true → false`
- `77:172 / ISSUE_TEXT`: `visible true → false`

No nodes were deleted. No text, geometry, crop, image fill, hierarchy, or semantic names were changed. Rollback therefore remains immediate.

## Expected improvement

- quieter masthead zone
- less rounded-pill repetition
- stronger logo/date/hero hierarchy
- preserved magazine issue metadata through the bottom strip

## Possible regression

The cover could lose a small amount of local-location framing at the top. Adoption therefore requires confirming that the Yokohama context remains clear through the logo, cover headlines, hero, and bottom strip.

## Verification evidence

Post-change screenshot was generated for the full outer spread.

Structure readback confirmed:

- top issue bar visible: `false`
- top issue text visible: `false`
- bottom issue bar visible: `true`
- bottom issue text visible: `true`
- bottom issue text: `RURUBU WEDDING 2026 • YOKOHAMA • ISSUE 1024`
- native text nodes: `85`
- visible text nodes: `43`
- IMAGE-fill nodes: `14`
- cover hero `77:148`: visible, `FILL`
- cover hero image hash: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- fold guide `77:288`: preserved and visible
- rollback outer `59:2`: preserved
- rollback inside `59:178`: preserved

No photo role, Drive mapping, crop, or provenance evidence changed.

## Decision

`PROTOTYPED → VERIFIED / ADOPTED FOR V5 CURRENT / GLOBAL RULE NOT PROMOTED`

The change is accepted as a bounded V5 editorial-density improvement. It does not justify removing every location or issue label; labels with unique navigation, factual value, or necessary authenticity remain valid.

## Reusable lesson candidate

When a print cover repeats issue metadata in both a top pill and a persistent folio strip, test the top pill by subtraction first. Preserve the lower system when it already completes the issue-identification role.

## Next application

Return priority to unresolved dominant-photo provenance and quality evidence. Continue subtractive work only where semantic duplication is concrete.

## Gate impact

No change to:

- `INTENDED_SOURCE_APPLIED`
- `PHOTO_ROLE_PASS`
- V5 dummy-design completion gate
- V6 start gate
