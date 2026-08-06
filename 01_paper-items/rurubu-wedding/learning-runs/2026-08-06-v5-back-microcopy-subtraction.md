# V5 Back Microcopy Subtraction — 2026-08-06

## Scope

Rurubu WEDDING V5 only. No Passport, Boarding Pass, 青春ふたりきっぷ, or ADD item nodes were touched.

## Authority readback

The run re-read the live-authority chain beginning with `docs/wedding-figma-production-system.md`, `docs/wedding-asset-generation-memory.md`, the current Rurubu status, and the current editorial lessons/feedback records before changing the live file.

## Visible problem

On the V5 outer candidate, the lower-right back-page microcopy `旅の記録を、次の旅へ。` sat immediately above `OUR JOURNEY ROUTE`. It added no factual, navigational, provenance, or caption value and competed with the route heading as an isolated decorative sentence.

## Tested principle

Attempt subtraction before adding or restyling decoration. A microcopy line should remain only when it contributes unique editorial meaning or materially improves reading order.

## Hypothesis

Hiding only the redundant microcopy would make the transition from Friends & Family to `OUR JOURNEY ROUTE` quieter and clearer without changing photos, crop, geometry, native text content, semantic structure, fold guidance, or rollback history.

## Live Figma change

- file: `bfM0d4c9dCeBv5pCkJ3TNM`
- page: `01_RURUBU_WEDDING`
- current outer frame: `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`
- node: `77:142 / AUTH_BACK_MICRO_1`
- text preserved: `旅の記録を、次の旅へ。`
- change: `visible: true -> false`
- node deletion: none
- rollback: immediate by restoring visibility

## Expected improvement

- less decorative noise above the route module
- clearer route-heading priority
- quieter editorial rhythm on the lower back page
- no loss of guest-facing facts

## Possible regression

The lower-right area could feel too empty or the route transition could lose a useful tonal bridge. Adoption therefore required whole-item screenshot and structure checks rather than relying on mutation success.

## Verification

Post-change live checks:

- whole-item screenshot generated at `1588 x 1123`
- target node remains native text and is hidden, not deleted
- native text nodes in outer candidate: `85`
- visible text nodes in outer candidate: `46`
- image-fill nodes remain: `14`
- dominant and supporting image hashes unchanged, including:
  - `77:24`: `2cfd19cf1701db58039a4fc645e4279832ec465a`
  - `77:39`: `2005b91ce26ead7d8128f547c293fe4a510f5d24`
  - `77:43`: `3abe9ce228d2252b847860ac895f2c178b6b3ddd`
  - `77:148`: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- fold guide `77:288 / PROVISIONAL_FOLD_GUIDE` preserved and visible
- rollback frames `59:2` and `59:178` preserved
- no image replacement, crop edit, geometry edit, text rewrite, or semantic-node deletion

## Result

`PROTOTYPED -> VERIFIED / ADOPTED_FOR_V5_CURRENT`

The isolated sentence was not strong enough to justify its presence if the existing design had not already contained it. The native node remains available for rollback.

## Failure / boundary

This does not establish a project rule to remove all atmospheric microcopy. Such copy can remain when it supplies unique context, supports a caption, or provides a deliberate pacing beat that survives whole-item and actual-size review.

## Next application

Return priority to unresolved dominant-photo provenance and derivative-quality closure. Continue subtraction only where semantic duplication is concrete. Do not advance V5 completion or V6 start gates from this change alone.
