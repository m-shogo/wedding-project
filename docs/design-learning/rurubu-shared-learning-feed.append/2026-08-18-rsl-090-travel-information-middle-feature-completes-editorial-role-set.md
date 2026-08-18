# RSL-090 — A travel booklet needs an actual destination-information spread, not only profile/history pages

Date: 2026-08-18
Source scope: Rurubu WEDDING V6
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## OBSERVED

At whole-book scale, V6 already had a strong cover, Profile/Q&A, and Story/chronology, but it could still read as a polished wedding profile booklet rather than an unmistakable travel-information magazine because no dedicated destination/spot-guide middle feature existed.

## ROOT_CAUSE_HYPOTHESIS

Travel-guide identity is not produced only by color, masthead, chronology metaphors, or photo density. The editorial role set itself matters. A real destination-information spread — one lead place plus unequal supporting stops, short navigational metadata, and photo-led practical/editorial reading — supplies a genre signal that profile/history pages cannot fully substitute.

## TESTED_LOCAL

Built a rollback-safe clean-room Memory Spots spread using only verified existing Rurubu photo fills:

- one dominant waterfront lead;
- three supporting spots with materially unequal image scale/shape;
- native spot numbers, Japanese headings, short copy, and metadata;
- no card grid;
- no new generated asset or image hash;
- all four image roles remain independently replaceable.

Initial DP was refined to DQ after two concrete defects were found: reader-visible production language in the closing block and one SPOT 03 ordinal/title bounding collision.

## VERIFIED_LOCAL

DQ `1686:2` passed:

- whole spread / 1200px;
- left actual-size `794×1123`;
- right actual-size `794×1123`;
- text collision `0 / 0`;
- 18px text safe-area risks `0 / 0`.

The spread reads materially more like travel editorial because its content function is different from Profile/Q&A and Story/chronology, not because those pages were made to share one literal layout.

## Expected improvement

- stronger immediate travel-information genre recognition;
- less dependence on decorative imitation to create Rurubu-like energy;
- more useful separation between personal-story pages and destination-guide pages;
- clearer future role for final location photography and spot copy.

## Regression risk

- adding extra spreads can conflict with final physical page count/template;
- dummy place labels can be mistaken for final factual content if not replaced;
- repeating the same destination photos elsewhere in the booklet can create asset fatigue;
- a spot guide can regress into a dashboard if every location becomes the same card.

## Rurubu-specific — MUST NOT transfer literally

Do not transfer the Yokohama wording, photo choices, coordinates, color values, four-spot count, labels, or layout geometry.

## Cross-item applicability hypothesis

Candidate principle only: when a publication is trying to evoke a recognizable editorial genre, verify that the required *content/editorial roles* are present before attempting more surface decoration. Genre identity may require a functionally distinct spread, not another styling pass on existing pages.

## Next receiving-item experiment

Only where relevant, test whether an item that still feels genre-ambiguous is missing a functional editorial role. Do not add pages merely to imitate Rurubu or to increase density.