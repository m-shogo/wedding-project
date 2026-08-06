# V5 Cover Top Ribbon Subtraction

Date: 2026-08-06
Scope: Rurubu WEDDING V5 only
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Outer candidate: `77:18`

## Source

- live whole-spread screenshot before and after the change
- project-wide quality-over-legacy and subtraction-first authorities
- current V5 semantic structure and rollback state

## Visible problem

The yellow strap `ふたりの旅をまるごと大特集！` sat between the masthead and dominant cover photograph. The masthead, issue label, three feature headlines over the photograph, and six-item contents block already establish that the booklet is a wedding/travel special. The strap added no unique fact or navigation and introduced another loud horizontal color field before the hero image.

## Hypothesis

Reversibly hiding the strap background and its native text should reduce decorative density, create a cleaner masthead-to-photo transition, and strengthen the dominant photograph without changing content-bearing modules, crop, image hashes, or semantic structure.

## Bounded experiment

Set these existing nodes to `visible = false`:

- `77:175 / PHOTO_TOP_RIBBON`
- `77:176 / PHOTO_TOP_COPY`

The nodes were not deleted. No photograph, crop, image fill, text content elsewhere, frame hierarchy, fold guide, or rollback frame was changed.

## Result

`PROTOTYPED → VERIFIED / ADOPTED`

### Whole-item / thumbnail scale

The front cover has a cleaner silhouette and less stacked color-strip density. The masthead now leads directly into the hero photograph while the left/right outer-spread balance remains stable.

### Reading / page scale

The cover reading order remains clear:

`issue label → masthead/date → dominant photograph → three feature headlines → image caption → six-item contents → footer`.

The removed strap did not contain unique factual information.

### Detail / actual-size scale

Post-change screenshot QA found no text reflow, collision, clipping, mask exposure, crop regression, or accidental blank hole. The masthead’s dotted underline and the photograph’s white frame provide a deliberate transition.

## Structure QA

- native text nodes: `85`
- visible text nodes after subtraction: `49`
- IMAGE-fill nodes: `14`
- fold guide preserved: `77:288 / PROVISIONAL_FOLD_GUIDE`
- rollback frames preserved: `59:2`, `59:178`
- hidden nodes remain present for immediate rollback

## Possible regression checked

Risk: removing the strap could detach the masthead from the cover story or leave excessive empty space.

Observed: the masthead underline, photo frame, feature headlines, and compact vertical gap retain continuity. The result reads as intentional breathing room rather than a missing module.

## Failure

None in the bounded change. This does not close photo provenance, derivative quality, or intended-source gates.

## Adoption status

Adopted for the current V5 candidate. The lesson remains item-specific and is not promoted directly to a project-wide rule.

## Next application

Return priority to Batch A dominant-image evidence closure: role-sized derivative placement and `Drive ID → node ID → image hash → screenshot QA → structure QA` for cover hero, back main, and history. Do not raise `INTENDED_SOURCE_APPLIED`, `PHOTO_ROLE_PASS`, V5 completion, or V6 start gates from this editorial subtraction.