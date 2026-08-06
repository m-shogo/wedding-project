# Cover straps must justify unique editorial work

Date: 2026-08-06
Scope: Rurubu V5/V6 and later editorial paper items
Status: `PROTOTYPED / VERIFIED ON ONE BOUNDED ROLE / NOT PROJECT_RULE`

## Source

The V5 front cover contained a yellow strap (`77:175`, `77:176`) stating `ふたりの旅をまるごと大特集！` between the masthead and hero photograph. The same editorial premise was already communicated by the masthead, issue label, feature headlines, contents list, and travel/wedding imagery.

## Hypothesis

A cover strap that contributes no unique fact, navigation, or hierarchy can become decorative duplication. Removing it should improve the masthead-to-hero transition and reduce color-field density without weakening comprehension.

## Result

The strap rectangle and native text were hidden non-destructively. Whole-item, reading-scale, and actual-size screenshot QA showed a cleaner cover silhouette, preserved reading order, and no blank-hole or structural regression.

## Verified evidence

- hidden nodes: `77:175 / PHOTO_TOP_RIBBON`, `77:176 / PHOTO_TOP_COPY`
- native text preserved: `85` nodes
- visible text after change: `49` nodes
- IMAGE-fill inventory unchanged: `14` nodes
- fold guide preserved: `77:288`
- rollback frames preserved: `59:2`, `59:178`

## Reusable principle under test

Before retaining a cover strap, kicker, or banner, identify the unique editorial task it performs. When the masthead, imagery, feature hierarchy, and contents already communicate the same premise, test subtraction before redesigning or adding further decoration.

## Limits

This does not establish that cover straps are always unnecessary. A strap may be justified when it introduces a unique issue theme, urgent fact, edition state, or meaningful reading cue. The decision must be verified at all three scales.

## Adoption status

`VERIFIED FOR V5 CURRENT / NOT YET PROJECT_RULE`

Apply forward as a review question for V6 clean-room concepts rather than an automatic deletion rule.