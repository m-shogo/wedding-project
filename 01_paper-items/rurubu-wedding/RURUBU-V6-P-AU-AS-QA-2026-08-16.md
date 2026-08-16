# Rurubu WEDDING V6 — P + AU/AS QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
State: `VERIFIED_LOCAL_DUMMY_DESIGN_STUDY / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`

## Authority / live state read before work

Read and re-read before writes:

- `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md`
- `docs/design-learning/rurubu-shared-learning-feed.md` plus latest canonical append entries
- `docs/design-learning/non-rurubu-shared-learning-feed.md` as the only neutral cross-scope surface
- `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-CURRENT-STATUS.md`
- live Figma, Drive V6 authority, and GitHub main before each write.

No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, ADD-item Figma/Drive/assets/ledgers/item paths were inspected or mutated.

Neutral hypothesis consumed: `NRSL-004 — Destination specificity does not substitute for art direction`. The transferable question used here was whether a change improves hierarchy/editorial selection, not whether it merely adds more destination imagery. No non-Rurubu literal layout, asset, palette, or current-state conclusion transferred.

## Before

Preferred at run start:

- Outer O `1370:2`
- Profile/Q&A AT `1392:95`
- Story/chronology AS `1392:2`
- Start Here `845:27`: `V5 FU/FX · V6 O + AT/AS INSIDE STUDIES · V7 HOLD`

Whole-system screenshot review showed two remaining defects:

1. AT Q&A still read as a mostly vertical questionnaire rail with a tall photo beside it and too much passive cream field below.
2. Outer O back chronology still used six nearly equal 3×2 entries, which reintroduced the same list/grid reading already reduced in the inside chronology.

## Experiment 1 — AU Profile / Q&A

### Visible problem

AT profile was retained, but the Q&A page had weak editorial image authority and a one-column 01–06 reading that felt closer to a formatted questionnaire than a travel-magazine interview.

### Root-cause hypothesis

Repeated Q&A does not need one continuous vertical rail. Keeping all questions/answers native while giving one legitimate replaceable photo a larger editorial field, one question a stronger middle-page beat, and the final two questions a two-column cadence should reduce form/grid reading without adding cards or raster decoration.

### Rollback-safe test

Duplicate AT → AU `1394:2`.

Q&A only:

- preserve all six native number/question/answer roles;
- preserve both existing replaceable IMAGE roles;
- enlarge the verified dining photo to `430×420` as the upper-right visual anchor;
- keep 01–03 as a compact left reading sequence;
- promote 04 into a larger mid-page beat;
- place 05/06 as a lower two-column cadence;
- move the closing pullquote to lower-left and the support waterfront image to lower-right;
- add no new raster, generated decoration, card, rounded rectangle, shadow or gradient.

Profile page geometry remains the AT profile geometry.

### Visual evidence

AU was reviewed at:

- thumbnail / 500 px whole spread: PASS and stronger than AT;
- reading / 900 px whole spread: PASS;
- actual Q&A / native `794×1123`: PASS.

The page now reads as `01–03 interview → large memory image → 04 feature question → 05/06 → closing thought + photo`, rather than one long questionnaire rail.

### Structure / image fidelity

Profile page:

- native text `21`;
- replaceable IMAGE roles `4`;
- text collision `0`;
- 18 px text safe-area risk `0`;
- all active images at or below verified intrinsic dimensions.

Q&A page:

- native text `24`;
- replaceable IMAGE roles `2`;
- text collision `0`;
- 18 px text safe-area risk `0`;
- dining hero hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`, intrinsic `732×498`, displayed `430×420`;
- support hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, intrinsic `240×220`, displayed `220×200`.

### Fresh long-answer stress

Old AM long-answer proof was not reused because AU materially changed Q&A geometry.

Dedicated proof:

- `1397:2 / QA_EVIDENCE / V6_AU_LONG_ANSWER_STRESS_PASS_2026_08_16`
- all six answer roles replaced with realistic longer Japanese copy;
- answer nodes tested as auto-height native text;
- actual-size screenshot PASS;
- text collision `0`;
- 18 px safe-area risk `0`;
- outside-page text `0`.

The proof is hidden after verification.

### Decision

`AU VERIFIED_LOCAL / ADOPTED AS PREFERRED`.

- AU `1394:2` renamed `PREFERRED / V6_INSIDE_AU_QA_PHOTO_INTERVIEW_2026_08_16`.
- AT `1392:95` preserved as hidden rollback.

## Experiment 2 — Outer P back chronology

### Visible problem

Outer O back cover had visually strong photography and title treatment, but the lower six-date chronology was a regular 3×2 set of equal entries. Next to AU/AS, the repeated grid weakened book-level coherence.

### Root-cause hypothesis

The back cover can keep all six native chronology facts while staggering the first five and making the wedding date a dominant endpoint band. This should improve hierarchy and echo the inside chronology's strong endpoint without copying its exact geometry.

### Rollback-safe test

Duplicate O → P `1397:64`.

Back cover only:

- retain all photography, masthead, titles and six native chronology facts;
- stagger the first five event groups instead of a 3×2 equal grid;
- reuse the sixth event's existing rail role as one dark-navy endpoint band;
- place `2026.10.24` and `WEDDING` as native white text inside that endpoint;
- add no new image or binary asset;
- front-cover geometry remains unchanged from O.

### Visual / structure evidence

Reviewed at:

- thumbnail / 500 px whole outer: PASS and stronger hierarchy than O;
- reading / 900 px whole outer: PASS;
- actual back cover / `794×1123`: PASS.

Back cover structure:

- native text `18`;
- text collision `0`;
- 18 px text safe-area risk `0`;
- all three active images at or below intrinsic dimensions:
  - travel flatlay `620×422` from `944×608`;
  - cafe `400×272` from `810×552`;
  - skyline `240×220` from `240×220`.

### Decision

`P VERIFIED_LOCAL / ADOPTED AS PREFERRED`.

- P `1397:64` renamed `PREFERRED / V6_OUTER_P_ASYMMETRIC_BACK_CHRONOLOGY_2026_08_16`.
- O `1370:2` preserved as hidden rollback.

## Live Figma after promotion

Start Here `845:27`:

`V5 FU/FX · V6 P + AU/AS INSIDE STUDIES · V7 HOLD`

Preferred:

- Outer P `1397:64`
- Profile/Q&A AU `1394:2`
- Story/chronology AS `1392:2` unchanged

Rollback / QA evidence:

- Outer O `1370:2` hidden rollback;
- Profile/Q&A AT `1392:95` hidden rollback;
- AU long-answer stress `1397:2` hidden QA evidence;
- earlier AS rollback chain remains preserved.

## Drive / asset lifecycle truth

Fresh Drive authority readback:

- V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- existing generated Profile/Q&A/Timeline/Memories masters remain present and not adopted in this run.

This run:

- generated images: `0`;
- new Drive masters: `0`;
- new external binary Figma placement: `0`;
- existing verified replaceable photos recomposed: `YES`;
- native factual/variable text preserved: `YES`;
- generated section decoration adopted: `NO`;
- whole/read/actual-size visual QA: `YES`;
- AU long-copy stress: `PASS`;
- structure/safe-area/intrinsic QA: `PASS`;
- rollback history: `PRESERVED`;
- V7 touched: `NO`.

## Completion boundary

P + AU/AS are stronger dummy-design studies, not print-ready output. Final real photography/copy, exact printer/product template, bleed/trim/fold/page order, PDF preflight and physical proof remain required before V6 completion.
