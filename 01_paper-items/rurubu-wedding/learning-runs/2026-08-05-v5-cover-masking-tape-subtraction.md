# V5 cover masking-tape subtraction

Date: 2026-08-05
Item/version: Rurubu WEDDING V5
Live candidate: `01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE` (`77:18`)
Target: `77:165 / DECOR_MASKING_TAPE_01`
Decision: `PROTOTYPED → VERIFIED / ADOPTED FOR V5 CURRENT`

## Visible problem

The pink diagonal masking-tape texture above the cover hero repeated the scrapbook motif after other redundant snapshot and kicker modules had already been removed. At whole-cover scale it added decorative noise between the masthead, yellow feature ribbon, and dominant photograph without carrying editorial meaning.

## Principle tested

Attempt subtraction before adding or polishing decoration. A dominant travel-magazine cover should rely on masthead, photography, headline hierarchy, and controlled color fields before non-semantic tape effects.

## Expected improvement

- cleaner transition from masthead to hero image
- less template/AI/scrapbook decoration feel
- stronger authority for the yellow feature ribbon and dominant photograph
- no loss of factual content, navigation, or semantic structure

## Possible regression

The cover could become too restrained and lose the lively Rurubu character if the tape was providing necessary visual energy or edge definition.

## Change

- `77:165 / DECOR_MASKING_TAPE_01`: `visible: true → false`
- node retained for immediate rollback
- no geometry, crop, text, image fill, or frame hierarchy changes

## Verification evidence

Three-scale review:

1. Whole outer spread (`77:18`): the cover remains visually lively through the masthead, date badge, yellow ribbon, three colored cover lines, hero image, feature index, and folio. No blank hole or imbalance appeared.
2. Front cover page (`77:145`, natural `794 × 1123`): the masthead-to-photo transition is cleaner; the tape removal does not expose masks, clipping defects, or unintended background.
3. Actual-size/detail review: no text collision, crop change, image-edge defect, or loss of contrast was introduced.

Structure QA:

- hidden node: `77:165 / DECOR_MASKING_TAPE_01`
- semantic hero: `77:148 / IMG_HERO`
- hero size: `665 × 610`
- hero image hash preserved: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- hero scale mode preserved: `FILL`
- front-cover native text nodes: `42`
- non-native text replacements: `0`
- rollback frames preserved: `59:2`, `59:178`
- provisional fold guide preserved: `77:288`

## Result

Adopted. The subtraction improves hierarchy and reduces decorative redundancy while preserving Rurubu energy, editability, semantic roles, and rollback safety.

This is not a photo-source quality repair. `PHOTO_ROLE_PASS` counts and the V6 start gate remain unchanged.

## Next application

Stop broad decoration removal on the cover unless a specific remaining element fails the same three-scale test. Return priority to Batch A dominant-image replacement and verified Drive ID → node ID → image hash closure.
