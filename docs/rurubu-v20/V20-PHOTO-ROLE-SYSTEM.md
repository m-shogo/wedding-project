# V20 Photo Role System

Status: `CANONICAL_BEFORE_FIGMA_PHOTO_PLACEMENT`

V20 does not select photos by old page number or old frame geometry. Photos are first classified by editorial job, then assigned to a page.

## Core roles

- `HERO` — strongest page/spread anchor; readable at thumbnail scale.
- `EMOTION` — expression, intimacy, laughter, proposal, human moment.
- `PLACE` — clearly communicates destination/environment.
- `ACTION` — eating, walking, playing, activity, movement.
- `DETAIL` — food, ticket, object, signage, hands, small memory.
- `COMEDY` — casual/funny/off-guard image used to humanize the book.
- `PORTRAIT` — person-first image for profile/identity.
- `CUTOUT_CANDIDATE` — subject separates cleanly from background and can cross layout boundaries.
- `TRANSITION` — image used to bridge two zones/spreads rather than dominate.

## Selection metadata for every candidate

Record:
- Drive file ID and source filename;
- real / generated / dummy / reference classification;
- people present;
- place/event;
- portrait/landscape/square tendency;
- focal point position;
- crop tolerance: high / medium / low;
- cutout potential: high / medium / low;
- emotional strength: 1–5;
- environmental strength: 1–5;
- uniqueness vs other selected photos;
- possible page/spread roles.

## Hard rules

1. Filename/page prefix is never layout authority.
2. One spread should not be filled with near-identical couple poses.
3. A strong travel spread normally mixes people + place + action/detail.
4. HERO is not automatically the highest-resolution file; it must also support the page job and crop.
5. Do not force a portrait photo into a wide hero simply because a wide frame already exists.
6. Frame geometry follows the strongest source photo, not vice versa.
7. Real couple/travel photography has priority over generated substitute imagery for autobiographical content.
8. `DUMMY` and `REFERENCE` are never promoted to final autobiographical truth.

## Diversity gate

For each photo-heavy spread, verify variation across at least four axes:
- shot distance;
- orientation;
- people vs environment;
- activity vs posed;
- color/lighting;
- crop treatment;
- emotional tone.

If all selected images perform the same role, redesign the selection before decorating.
