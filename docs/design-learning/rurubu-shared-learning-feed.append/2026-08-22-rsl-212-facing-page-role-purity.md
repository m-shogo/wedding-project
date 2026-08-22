# RSL-212 — facing pages should own distinct semantic jobs, not duplicate the same vocabulary in different visual systems

Date: 2026-08-22
Source scope: Rurubu WEDDING
Source role: V8 1DAY / Model Course
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The left page of V8 1DAY T already represented experiential pace with uneven Japanese words, while the right page represented exact time spacing. However, the right page also repeated English action labels plus the same experiential Japanese vocabulary. The spread looked differentiated, but semantically still duplicated one layer of meaning.

## Root-cause hypothesis

Facing pages can look different yet still feel like a UI/demo when both pages repeat the same semantic job. Visual contrast alone does not create editorial complementarity.

## Test

In rollback-safe AG `2233:2`:

- keep left experiential pace vocabulary unchanged;
- keep right exact time positions unchanged;
- remove `START / CAFE / WALK / TABLE`;
- replace repeated pace words on the right with concrete Japanese stop/action labels: `海辺 / カフェ / 街歩き / 食卓`;
- refine right-page furniture to explain time-distance semantics;
- add no new decorative modules or images.

## Evidence

- 500px whole spread: PASS
- 1400px reading scale: PASS
- 1587×1123 actual size: PASS
- native text `22`
- IMAGE `0`
- text intersections `0`
- 18px safe risk `0`
- accidental explicit one-character Japanese wraps `0`
- parent page `2052:2`
- previous T `2203:2` preserved hidden rollback

Detailed evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V8-1DAY-AG-TIME-DATA-ROLE-PURITY-QA-2026-08-22.md`

## Failure fingerprint

`F-RSL-212-FACING-PAGES-DIFFERENT-VISUALLY-BUT-STILL-DUPLICATE-SEMANTIC-VOCABULARY`

Before styling adjacent pages differently, ask whether they actually own different reader-facing jobs. If one page is experiential and the other is data/navigation, vocabulary and page furniture should reinforce that division rather than repeat the same concepts in different visual clothes.

## Do not transfer

Do not copy the 1DAY times, labels, composition, typography scale, or Rurubu visual grammar into other wedding items.

## Cross-item hypothesis

Potentially relevant to other multi-page wedding artifacts where one page is emotional/editorial and the facing page is reference/navigation/data. Receiving items must test independently before any promotion.
