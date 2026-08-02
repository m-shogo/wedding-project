# V5 Feature 02 De-card Experiment

Date: 2026-08-03
Scope: `01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE` (`77:18`)
Status: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_YET_PROMOTED`

## Visible problem

The lower feature index on the front cover used a large saturated blue rounded rectangle for Feature 02 while the adjacent supporting features were mostly direct type on the cream field. The blue panel gave Feature 02 disproportionate visual weight, repeated a Web/UI card pattern, and made the bottom index feel more like a dashboard than an editorial contents block.

## Principle tested

Attempt subtraction before adding decoration. Preserve the semantic information and navigation device, but remove containment when alignment, typography, numbering, and a route motif can carry the hierarchy.

## Bounded live change

Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

Mutated nodes:

- `77:213` `FEATURE_BOX_2` — hidden
- `77:215` `FEATURE_NO_TXT_2` — retained and recolored to the established blue accent
- `77:216` `FEATURE_TXT_2` — retained and recolored to navy
- `77:248` `AUTH_FEATURE2_PAGE` — retained and recolored to navy
- `77:244` `AUTH_FEATURE2_ROUTE` — retained and recolored from white to blue
- `77:245`, `77:246`, `77:247` — route dots retained and recolored from white to blue

Native text, semantic IDs, the cream lower field, Feature 02 numbering, route meaning, fold guide, and V4 rollback were preserved.

## Verification

Whole-spread screenshot review after the first subtraction revealed a contrast regression: the white route and dots became nearly invisible on the cream background. This was caught before acceptance and corrected by recoloring the route and dots to the established blue accent.

The final whole-spread screenshot verifies:

- Feature 02 remains clearly identifiable
- route and page-reference navigation remain legible
- the large blue UI-like card is removed
- Feature 01 remains the dominant lead feature
- Feature 02 now behaves as a strong secondary feature instead of a competing card
- no text loss, overlap, flattening, semantic-node damage, or rollback damage is visible

## Failure converted into knowledge

Removing a container changes the contrast assumptions of every child and decorative element that previously relied on that background. A subtraction pass is incomplete until all dependent text, rules, icons, and route marks are re-audited against the newly exposed field.

## Reusable candidate lesson

When de-carding an editorial module, preserve hierarchy with type scale, numbering, alignment, and a meaningful navigation device. Then explicitly re-test every foreground paint that was designed for the removed background. This is a verified V5 technique, but not yet a universal rule for every wedding item.

## Next application

Continue auditing the remaining lower-index modules and cover badges individually. Do not remove containers merely for consistency; remove them only when hierarchy and legibility can be preserved or improved without containment.
