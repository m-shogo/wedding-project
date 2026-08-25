# WEDDING PASSPORT — Date-clear fixed-art fallback / PRE-FIGMA / 2026-08-25

State: `PRE_FIGMA_FALLBACK_CANDIDATE / CURRENT_VISUAL_REOPENED / PRODUCTION_UNCHANGED`
Scope: non-Rurubu only
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- run-start latest `main`: `cf7b22e51b456528bcfeaafa21ad9e44ad9849a4`
- post-asset latest `main`: `884dd8732d0e1c5b7877d4dab4cc99eddb6ba44b`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- Current front: `205:3`
- Current back: `205:21`
- exact Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- Drive folder live readback: PASS
- production Figma mutation: `0`
- Drive write: `0`
- image generation: `0`

No Rurubu item-specific Figma/Drive/GitHub/asset scope was inspected or modified.

## Why this fallback exists

The promoted Current remains visually reopened because live reading/native screenshots still show three material defects:

1. front intro splits `記録` mid-word;
2. back `RETURN NOTE` loses contrast outside the cream aperture;
3. the subordinate turquoise fixed-art sweep crosses the authoritative `2026.10.24` date lane.

The canonical first repair remains the bounded native-text / factual-group plan in `BOUNDARY-REPAIR-CANDIDATE-SPEC-2026-08-25.md`. This new SVG is **not** a replacement for that first test and is **not adoption evidence**.

It exists only as the prepared second method if moving the entire date/place/couple factual group into the stable navy lane fails visually.

## Live screenshot / geometry evidence rechecked in this run

Fresh reading render of Current front `205:3` again shows the semantic break in `記録`.

Fresh reading render of Current back `205:21` again shows:

- `RETURN NOTE` only partly legible at the cream/navy boundary;
- date `2026.10.24` crossed by the turquoise sweep.

Live metadata re-read:

- back date `205:36`: x `760`, y `1660`, w `560`, h `84`;
- place `205:37`: x `764`, y `1758`, w `340`, h `36`;
- couple `205:38`: x `760`, y `1855`, w `520`, h `48`;
- coral fixed-art `205:30`: begins around y `1384.5`;
- turquoise fixed-art `205:31`: spans around y `1540.5 → 1888`.

The defect remains a Hybrid Authoring geometry problem, not an image-quality problem.

## New fallback asset

Path:

`studies/vnext-2026-08-25/departure-window-v2-return-fixed-art-date-clear-fallback.svg`

Asset commit:

`884dd8732d0e1c5b7877d4dab4cc99eddb6ba44b`

The fallback keeps the existing fixed-art system intact except for one bounded change:

- page-spanning coral gesture remains unchanged;
- subordinate turquoise gesture is shortened and terminates in the left/middle field before the right factual lane;
- all native/authoritative copy remains outside the SVG;
- no new badge, tab, icon, gradient, UI field, fake credential or decorative English is introduced.

This is intentionally a conservative fallback. It avoids introducing a local vector kink around the date and avoids pushing the turquoise line below the couple-name lane where a second collision could occur.

## Hybrid authoring split

- front intro / back kicker / date / place / couple: Figma native text;
- aperture / sun / coral gesture / turquoise gesture / binding edge: editable SVG fixed art;
- IMAGE fills: `0` intended;
- generated raster: `0`;
- variable copy baked into SVG: `0`.

## Required test order when Figma authoring guidance is readable

Do **not** promote this asset directly.

1. preserve Current `205:3 / 205:21` as hidden rollback;
2. test the front semantic line-break candidate independently;
3. test the `RETURN NOTE` stable-cream-lane move independently;
4. test the preferred factual-group move first (`date/place/couple` together, approximately `-430px` vertically);
5. only if step 4 is visually rejected, import this fallback SVG into a rollback-safe comparison while leaving factual nodes at their Current coordinates;
6. inspect whole-item / ~500px;
7. inspect reading / ~1000px;
8. inspect native `1480×2100`;
9. run fresh long-copy stress because fixed-art/native-copy relationships changed;
10. structure-readback native text, fixed-height count, outside count, IMAGE fills and vector editability.

## Acceptance criteria for this fallback

The asset can advance only if all are true:

- date/place/couple are unobstructed at native scale;
- the shortened turquoise gesture still reads as a subordinate travel movement, not an arbitrary stub;
- the coral gesture remains the dominant lower-page movement;
- no new dead zone or unbalanced left-heavy lower field appears at thumbnail scale;
- native text remains authoritative and fully editable;
- no new fixed-art/text optical collision is introduced.

## Rejection criteria

Reject and retain the factual-group-move method if the shortened turquoise gesture looks amputated, decorative, or weakens the front/back family rhythm. Do not keep iterating the same shortened-line method cosmetically.

## Learning state

`ROOT_CAUSE_HYPOTHESIS → PRE_FIGMA_SECOND_METHOD_PREPARED`

Failure fingerprint remains item-local:

`PROMOTED_CURRENT_FIXED_ART_TEXT_OPTICAL_COLLISION_AND_SEMANTIC_BREAK`

This does not change the project-wide visual rule set. The reusable method is only: after a promoted Current reveals a fixed-art/native-copy collision, prepare a second bounded repair method without rasterizing authoritative copy, but test the lower-risk semantic/text-group repair first.
