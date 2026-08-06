# V5 Back Main Kicker Subtraction

Date: 2026-08-06
Scope: Rurubu WEDDING V5 only
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Outer candidate: `77:18`

## Source

- live whole-spread screenshot before change
- project-wide quality-over-legacy and subtraction-first authorities
- current V5 semantic structure and rollback state

## Visible problem

The yellow `旅の途中で見つけた BEST MOMENT` bar sat directly above the back-cover dominant photograph. The page already establishes the same editorial idea through `OUR TRAVEL NOTES`, its Japanese deck, `MEMORY 01`, and the adjacent headline `旅の途中で見つけた一枚`. The bar therefore repeated meaning, added another loud color field, and visually competed with the photograph rather than improving navigation.

## Hypothesis

Removing the redundant kicker rectangle and text should create a quieter transition from the page introduction into the dominant photograph, reduce badge/card density, and strengthen the photo-headline relationship without altering content, crop, image hash, native text, or semantic hierarchy.

## Bounded experiment

Reversibly set these existing nodes to `visible = false`:

- `77:72 / MAIN_PHOTO_KICKER`
- `77:73 / MAIN_PHOTO_KICKER_TXT`

The nodes were not deleted. No image, text content, crop, frame hierarchy, fold guide, or rollback frame was changed.

## Result

`PROTOTYPED → VERIFIED / ADOPTED`

### Whole-item / thumbnail scale

The back cover reads more calmly. The dominant photograph begins without a separate yellow UI-like tab, while overall left/right spread balance remains intact.

### Reading / page scale

The reading sequence remains clear:

`OUR TRAVEL NOTES → Japanese deck → dominant photograph → MEMORY 01 / headline → FRIENDS & FAMILY → OUR JOURNEY ROUTE → footer`.

The removed bar did not carry unique factual information or navigation required elsewhere.

### Detail / actual-size scale

No text reflow, collision, clipping, mask exposure, crop regression, or unintended blank hole was visible in the post-change screenshot. The photograph frame and adjacent native text remain unchanged.

## Possible regression checked

Risk: removing the bar could make the photograph feel detached from the introductory copy.

Observed: the close vertical spacing, photo border, `MEMORY 01`, and adjacent headline preserve the editorial relationship. The result reads as intentional quiet space rather than a missing module.

## Failure

None in the bounded change. This does not close any photo provenance or image-quality gate.

## Adoption status

Adopted for the current V5 candidate. The lesson remains item-specific and is not promoted directly to a project-wide rule.

## Next application

Return priority to Batch A dominant-image evidence closure: verified role-sized derivative placement and `Drive ID → node ID → image hash → screenshot QA → structure QA` for cover hero, back main, and history. Do not raise `INTENDED_SOURCE_APPLIED`, `PHOTO_ROLE_PASS`, V5 completion, or V6 start gates from this editorial subtraction.
