# 2026-08-12 — DF asymmetric profile feature lesson

## Visible problem

DE improved the lower Q&A but the left profile page still relied on the inherited “two profiles + questions” skeleton. The result was neat but not strong enough as a Japanese travel-magazine feature when judged from scratch.

## Principle tested

**Photo-as-architecture before decoration.** Expand identity-safe photography until crop, overlap, and scale define the page. Put native Japanese display type into a deliberate text-safe field created by that photo geometry. Keep Q1 dominant and Q2/Q3 subordinate; subtract rules and micro-labels that no longer carry editorial meaning.

## Expected improvement

- stronger whole-spread silhouette
- more immediate human/travel focus
- less profile-form / Web-UI feeling
- more varied editorial scale
- clearer reading path at actual size

## Regression risk and evidence

The first DF pass caused headline occlusion under the enlarged groom image. Screenshot QA caught it before adoption. The crop width and z-order were repaired. Final structure QA then caught a Q1 number/micro-label collision, and the redundant micro-label was hidden.

Verified result:
- DF working `899:2`, Review `904:2`
- native text `53`
- same-parent text intersection `0`
- fold `899:283`, x `792.7000122070312`, 2×1122.5
- profile/history/memory image hashes preserved
- thumbnail, reading, and actual-size visual QA passed

## Status

**ADOPTED as best inside comparator; not Current.** Superseded DE is preserved in Studies as node `894:2`. True Current `77:18 / 77:290` was not edited.

## Next application

For V6 and later Rurubu-like spreads, start profile/features by choosing dominant and supporting image scale relationships before creating any decorative fields. If typography needs a heavy overlay to survive, first reconsider crop and text-safe space. A small editorial accent is preferable to a generic card or gradient veil.
