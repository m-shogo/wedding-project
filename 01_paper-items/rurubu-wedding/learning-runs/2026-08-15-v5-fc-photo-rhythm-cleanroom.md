# Rurubu V5 FC — photo-rhythm clean-room

Date: 2026-08-15
Scope: Rurubu WEDDING only
Status: ADOPTED / VERIFIED_LOCAL

## Visible problem
FA was stronger than the earlier web-like versions, but its lower front cover still read as a repeated photo grid: Feature 02 used a wide cyan paper field and the same coast image used dominantly on the back also occupied a large lower-right front slot.

## Root-cause hypothesis
Editorial energy was still being simulated partly through containment and repeated/equal photo mass instead of role hierarchy. Repeating the same coast source across both covers also reduced destination variety.

## Bounded clean-room test
- cloned live FA `1168:2` into rollback-safe FC `1180:2`
- widened the old-town/street image to become the lower-page vertical anchor
- kept the tilted Feature 02 image dominant but converted its 84.96px cyan paper into a thin 6px editorial rule
- reduced the lower-right secondary role, then replaced the repeated coast fill with the already verified EO Memory 4 destination image (`c09aa82e7b2ac75708707345c6f845452bf67663`)
- did not add cards, rounded UI, gradients, shadows, generated assets, or external binaries

## Expected improvement
More asymmetric magazine rhythm, less UI-panel reading, less same-image repetition across outer covers, and clearer `01 → 03 vertical anchor → 02 overlap → small destination support` hierarchy.

## Regression risk
Removing containment could reduce caption contrast; shrinking the secondary photo could create dead space. Both were checked in rendered output before promotion.

## Evidence
- thumbnail / whole item: 500px PASS
- reading scale: 1000px spread PASS
- actual-size front: 794×1123 PASS
- final front visible text: 15
- final front visible IMAGE fills: 5
- absolute text intersections: 0
- bounded 18px text safe-area risks: 0
- fold: `1180:193`, x=792.7, width=2, height=1122.5
- exact Q60 secondary preserved: node `1180:189`, hash `644f449c3bf2001a94d4b822d2b55e2614c11042`
- reused verified EO destination: node `1180:133`, source `1107:552`, hash `c09aa82e7b2ac75708707345c6f845452bf67663`
- dominant history derivative remains node `1180:134`, hash `539c259be8036b481d06b4f76db9a39b407d90e8`; it is explicitly NOT the Drive Q60 master.

## Adoption
FC promoted as visible Best outer. FA retained hidden as rollback. EO remains Best inside. Current `77:18 / 77:290` untouched.

## Learning
When a print composition feels card-like, first redistribute photo roles and convert containment to a rule/direct type. If a supporting image repeats a dominant source elsewhere in the same physical item, test a verified alternate asset before generating something new. This is a cross-item hypothesis about role hierarchy, not permission to copy Rurubu geometry.