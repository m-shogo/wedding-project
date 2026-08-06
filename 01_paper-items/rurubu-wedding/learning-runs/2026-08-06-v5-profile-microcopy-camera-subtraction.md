# Rurubu V5 — profile microcopy and camera subtraction

Date: 2026-08-06
State: `VERIFIED / ADOPTED`
Scope: Rurubu WEDDING V5 inside candidate only

## Source and authority read

Before the change, the live Figma candidate and current project authorities were reviewed, including the project-wide production system, generated-asset memory, continuous-learning system, project memory, and the Rurubu Current Status. The live Figma state remained the highest authority.

## Visible problem

At the top of the left profile page, the native heading `OUR PROFILE / ABOUT US`, its Japanese deck, the two profile modules, and the `新郎 PROFILE` / `新婦 PROFILE` labels already established the section meaning and reading order. The additional blue microcopy `旅の好みが見えるプロフィール` and small camera icon created a second decorative header cluster without adding factual or navigational value.

Legacy challenge: if these elements did not already exist, they would not be selected for the current editorial composition.

## Hypothesis

Subtracting the redundant microcopy and camera icon should:

- reduce decorative density in the upper profile area;
- strengthen the direct hierarchy from section heading to the two profiles;
- remove a small UI/badge-like cluster;
- preserve all factual content, native text, semantic profile nodes, image fills, crop decisions, fold safety, and rollback history.

Possible regression: the upper-right part of the profile area could feel too empty or lose playful travel character.

Evidence required for adoption:

- whole-spread screenshot remains balanced;
- page reading order remains obvious;
- no awkward hole, collision, reflow, clipping, or crop regression appears;
- both nodes remain available for rollback;
- semantic profile and photo nodes remain unchanged.

## Live Figma change

File: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `01_RURUBU_WEDDING`
Candidate: `02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE` (`77:290`)

Changed only:

- `77:366 / RURUBU/Icon/camera` — `visible: true → false`
- `77:398 / AUTH_PROFILE_MICRO` — `visible: true → false`

No nodes were deleted. Both remain immediately rollback-safe.

## Three-scale QA

### Thumbnail / whole spread

PASS. The left-page upper profile zone became quieter, while the strong magenta/blue profile accents still balance the right-page timeline and photo modules. No visible composition hole appeared.

### Reading / page scale

PASS. Reading order remains:

`OUR PROFILE / ABOUT US → Japanese deck → groom and bride profiles → 3 QUESTIONS → common points → TRAVEL NOTE`.

The removed elements did not carry unique factual content.

### Detail / actual-size plausibility

PASS for this bounded subtraction. No text reflow, clipping, overlap, mask exposure, image-crop change, or fold/safe-area regression was observed. Native profile text and semantic image nodes were untouched.

## Result

Decision: `ADOPTED / VERIFIED`.

Failure/regression: none observed. The feared empty-space regression did not materialize; the quiet area improves editorial breathing room.

Reusable lesson status: `VERIFIED`, not automatically promoted to `PROJECT_RULE`. In magazine-like wedding layouts, small decorative microcopy/icon clusters should be removed when the heading, deck, and content modules already communicate the section purpose.

## Gate impact

This is an editorial-density improvement only. It does not close any photo provenance or high-quality derivative role.

Unchanged:

- `INTENDED_SOURCE_APPLIED`
- `PHOTO_ROLE_PASS`
- V5 dummy-design completion gate
- V6 production start gate

## Next application

Continue with the highest-impact incomplete V5 work: dominant-photo derivative placement and Drive ID → Figma node ID → image hash → screenshot QA evidence. Avoid further low-value decoration polishing when it would outrank the dominant-image gate.
