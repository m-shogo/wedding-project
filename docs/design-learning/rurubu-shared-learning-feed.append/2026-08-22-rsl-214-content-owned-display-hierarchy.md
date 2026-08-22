# RSL-214 — content-owned display hierarchy

Date: 2026-08-22
Source scope: Rurubu WEDDING / V8 Profile+Q&A
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A minimal editorial page can still read like an AI/type-template when the largest typography belongs to an easy identifier (for example a Latin name) while the actual editorial idea remains small.

In V8 Profile Z, large `SHOGO / SHI-CHAN` names owned most of the left-page mass even though the meaningful contrast was already present in native content: one person walks first, the other eats first.

## Research hypothesis

Fresh professional references used as hypotheses:

- IDEA No.339 describes Takeo Nakano's book design as editorial and grounded in fundamental structure, and Yuri Suyama's practice as including the relationship between designer/publication and reader.
- IDEA DOCUMENT Letter and Typography includes Japanese/Latin mixed typesetting as an explicit design problem rather than neutral decoration.
- IDEA No.381 includes the proposition `Hardcore of Editing = Design`.

Hypothesis: display scale should be assigned by editorial/content ownership, not simply by whichever identifier is easiest to enlarge.

## Bounded test

Profile candidate AJ `2235:2`:

- preserve the right Q&A page;
- demote `SHOGO / SHI-CHAN` to small identity furniture;
- promote existing Japanese personality content to the display role:
  - `旅先では、まず歩く。`
  - `旅先では、まず食べる。`
- keep final copy native/editable;
- add no image, card, decorative English, gradient, shadow or invented claim.

## Failure and correction

Initial structural QA found a 4px overlap between the shared closing copy and the small caption. Move the closing copy upward and rerun QA. Final intersections: `0`.

## Evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- page: `2052:2`
- current after promotion: `2235:2 / V8 Profile AJ`
- rollback: `2215:2 / V8 Profile Z`, hidden
- ~500px: PASS
- ~1000px: PASS
- 1587×1123: PASS
- native text: `23`
- visible IMAGE fills: `0`
- text intersections: `0`
- 18px safe-area risk: `0`
- Japanese accidental one-character tail observed: `0`

Detailed evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V8-PROFILE-AJ-CONTENT-OWNED-JAPANESE-HIERARCHY-QA-2026-08-22.md`

## Failure fingerprint

`F-RSL-214-LATIN-NAME-DISPLAY-MASS-OUTWEIGHS-THE-ACTUAL-EDITORIAL-PERSONALITY-DIFFERENCE`

## What must remain item-specific

Do not transfer:

- the `歩く / 食べる` copy;
- SHOGO / SHI-CHAN names;
- type sizes/coordinates;
- V8 cream/navy/rust palette;
- quiet V8 page tempo.

## Cross-item applicability hypothesis

Candidate principle only: before enlarging a name, number, date, English label or keyword into the dominant visual mass, ask whether it owns the reader-facing editorial idea. If not, test transferring display weight to the content that actually carries meaning.

Receiving items must reproduce the benefit independently before any promotion beyond `CROSS_ITEM_CANDIDATE`.
