# V5 profile-page isolated heart subtraction

Date: 2026-08-06
Item/version: Rurubu WEDDING V5
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Candidate: `02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE` (`77:290`)
Target: `77:371 / RURUBU/Icon/heart`
Status: `PROTOTYPED -> VERIFIED / ADOPTED / PROJECT_RULE_NOT_PROMOTED`

## Visible problem

A small pink heart floated alone in the large quiet area between the profile introduction and the question section. It did not label content, connect related modules, or contribute to reading order. At whole-spread scale it behaved as arbitrary sticker decoration and weakened the deliberate editorial whitespace.

## Source and hypothesis

Sources: live Figma screenshot, project-wide quality-over-legacy decision, anti-Web-UI review, and subtraction-first rule.

Hypothesis: hiding this isolated non-semantic icon would improve the profile page's quiet-space discipline and strengthen the transition from profile content to `3 QUESTIONS`, without changing factual content, typography, photography, or semantic structure.

## Experiment

- Changed `77:371` from `visible: true` to `visible: false`.
- The node was not deleted, so rollback remains immediate.
- No text, image fill, crop, layout position, profile content, question content, or page frame was modified.

## Expected improvement

- remove one arbitrary decorative interruption;
- make the central whitespace feel intentional rather than unfinished;
- keep attention on profile names, portraits, and the `3 QUESTIONS` hierarchy.

## Possible regression

The page could become too austere or visually empty between sections. Adoption required whole-spread review confirming that the whitespace still reads as intentional and the page retains sufficient wedding warmth through the pink/blue accents, profile ribbons, portraits, and typography.

## Evidence and three-scale QA

### Whole item / spread

The inside spread remains balanced. The left page is calmer and no longer has a small isolated focal point competing with the profile and question modules. The right-page history hierarchy is unchanged.

### Reading / page scale

Reading order remains `OUR PROFILE / ABOUT US -> two profiles -> 3 QUESTIONS -> common points -> TRAVEL NOTE`. The removed icon carried no information and its absence creates no gap in that sequence.

### Detail / actual-size plausibility

No text reflow, collision, clipping, crop change, mask exposure, or missing semantic content was introduced. The hidden node remains available for rollback.

## Result

Adopted for current V5. This is a bounded verification only; it does not establish a project-wide ban on heart motifs. Decorative symbols remain valid when they have a clear semantic or compositional role.

## Failure

None in execution. The experiment specifically avoids claiming progress on image quality or provenance.

## Ledger and gate impact

- `PHOTO_ROLE_PASS`: unchanged.
- Drive ID -> node ID -> image hash evidence: unchanged.
- V5 dummy-photo QA gate: not reached.
- V6 production gate: remains closed.

## Next application

Stop broad decoration subtraction after this bounded fix. Resume the highest-priority incomplete work: quality-passing Batch A image placement and evidence closure through a binary-safe path. Do not repeat the blocked external POST/base64 transport methods without a changed capability.
