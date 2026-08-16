# RSL-036 — Break repeated Q&A out of one form rail before adding decoration

Source scope/item: Rurubu WEDDING / V6 Profile-Q&A

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The preferred V6 AT Q&A page preserved native editable text and replaceable imagery, but six questions still read primarily as one vertical questionnaire rail. A tall image beside that rail did not fully solve the form-like reading, and the lower cream field remained passive.

The problem was not missing destination detail. It was editorial hierarchy and page rhythm.

## Root-cause hypothesis

Repeated semantic units such as Q&A can become visually form-like even without cards when every unit follows the same single reading rail. Before adding decorative boxes, generated atmosphere or literal destination imagery, test whether the repeated units can be grouped into unequal editorial beats around one strong legitimate image anchor while keeping all copy native and changeable.

## Bounded test

Source preferred: AT `1392:95`.

Rollback-safe duplicate: AU `1394:2`.

Q&A changes only:

- preserve six native number/question/answer groups;
- preserve both existing replaceable IMAGE roles;
- enlarge the verified dining image to a `430×420` upper-right editorial anchor;
- keep 01–03 as a compact left interview sequence;
- make 04 a larger mid-page beat;
- put 05/06 into a lower two-column cadence;
- place the closing pullquote lower-left and support photo lower-right;
- add no new raster, generated decoration, card, rounded rectangle, shadow or gradient.

A fresh long-answer proof was created because AU materially changed Q&A geometry:

- `1397:2 / QA_EVIDENCE / V6_AU_LONG_ANSWER_STRESS_PASS_2026_08_16`;
- all six answers replaced with realistic longer Japanese copy;
- native answers tested with auto-height behavior.

## Expected improvement

- reduce questionnaire/form reading;
- increase editorial photo authority;
- create unequal but understandable reading beats;
- keep all factual/variable copy directly editable;
- keep photos replaceable;
- preserve long-copy resilience without new UI-like geometry.

## Regression risk

Breaking a repeated list into asymmetric groups can make reading order ambiguous or create decorative chaos. A larger photo can also consume the space needed by real answers. Therefore the treatment is valid only when sequence remains obvious at reading scale and realistic long-copy stress still passes.

## Three-scale evidence

- thumbnail / 500 px whole spread: AU reads more like an interview spread than AT and the image/text hierarchy is clearer;
- reading / 900 px whole spread: `01–03 → memory image → 04 → 05/06 → closing thought` remains legible;
- actual Q&A / `794×1123`: PASS, with no text collision or 18 px text safe-area risk;
- long-answer actual-size proof: PASS with six realistic Japanese answers, collision `0`, safe risk `0`, outside-page text `0`.

Structure after adoption:

- Q&A native text `24`;
- replaceable IMAGE roles `2`;
- dining hero displayed `430×420` from intrinsic `732×498`;
- support displayed `220×200` from intrinsic `240×220`.

## Result / status

`VERIFIED_LOCAL`.

AU was promoted:

- `1394:2 / PREFERRED / V6_INSIDE_AU_QA_PHOTO_INTERVIEW_2026_08_16`.

AT remains hidden rollback:

- `1392:95 / ROLLBACK / V6_INSIDE_AT_PROFILE_OVERLAP_EDITORIAL_2026_08_16`.

The stress proof remains hidden evidence after verification.

## Evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- item evidence: `01_paper-items/rurubu-wedding/RURUBU-V6-P-AU-AS-QA-2026-08-16.md`
- item evidence commit: `5f3e5ef1d7d57e174f6130a1cec56e550bfa5246`
- current-state commit before this lesson: `169f4b4b1c001ca056d91cd3f8d4247cee1096cd`

## Shared-learning input used

Neutral non-Rurubu `NRSL-004` was consumed only as a hypothesis: stronger destination specificity is not automatically stronger design. AU therefore solved hierarchy with existing legitimate photos and native typography instead of adding destination-literal imagery merely to make the page feel more travel-like.

No non-Rurubu literal asset, layout, palette, node geometry or production conclusion transferred.

## What must remain Rurubu-specific

Do not transfer:

- the coral/cyan/gold numbering palette;
- exact `430×420` / `220×200` image geometry;
- exact question grouping `01–03 / 04 / 05–06`;
- Japanese title/copy;
- Hawaii/Yokohama photo choices;
- page proportions or closing-quote position.

Those are Rurubu art-direction decisions.

## Cross-item applicability hypothesis

For another print artifact containing repeated semantic items, test a photo/type-led asymmetric grouping before adding cards or decorative containers. The transferable principle is:

> repeated editable information does not have to remain one uniform rail; preserve semantic order, create unequal editorial beats, and verify the new grouping with real-length copy.

The receiving item must reproduce the benefit independently before treating the pattern as verified there.

## Next receiving-item experiment

On a materially different print artifact with repeated editable copy, compare:

1. a uniform rail/list baseline;
2. an asymmetric semantic grouping with one legitimate visual anchor.

Judge thumbnail hierarchy, reading order, actual-size copy fit and long-copy stress before adoption.

Failure fingerprint to watch: `ASYMMETRIC_GROUPING_BREAKS_SEMANTIC_ORDER_OR_COPY_FIT`.
