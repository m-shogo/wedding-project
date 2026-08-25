# RSL-273 — Adjacent spreads repeat the same opening image role and flatten publication pacing

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Fingerprint: `F-RSL-273-ADJACENT-SPREADS-REPEAT-SAME-OPENING-IMAGE-ROLE-AND-FLATTEN-PUBLICATION-PACING`

## Visible problem

V7 Outer C8 and Profile K5 independently passed design QA, but both opened with the exact same flower/camera still-life hash `e3738476f760932bb5b09c9d60f174dd6c84049d` in a large first-read role. In sequence, Profile therefore echoed the preceding Outer instead of creating a new page-turn beat.

## Root-cause hypothesis

A strong image can become a template signature when repeated immediately in the same editorial job. Whole-publication pacing needs **theme + variation**: adjacent roles may share identity, palette and type voice while deliberately changing which medium carries the opening beat.

This is not a blanket ban on image reuse. Repetition can be valid for callbacks, motifs, documentary continuity or intentional sequences. The failure is repeated source + repeated scale/role without a reader-facing sequencing job.

## Bounded test

K6 removed the repeated opening image and converted the Profile opening into a full coral type-led field, retaining one small verified-couple screen snapshot as support. K6 was rejected because image subtraction alone produced an insufficiently strong beat.

K7 kept the image-role subtraction but strengthened the existing native typography. It did not restore the repeated image, add decoration, generate assets or invent copy.

## Evidence

- current adopted candidate: K7 `2541:50`;
- rollback: K5 `2516:2` hidden;
- rejected: K6 `2541:2` hidden;
- 500 px: PASS;
- 1400 px: PASS;
- actual-size 1587×1123: DESIGN QA PASS;
- text intersections: `0`;
- 18 px edge risks: `0`;
- Japanese→Inter mismatches: `0`;
- repeated C8 opening hash visible in K7: `false`.

The resulting sequence reads C8 photo-heavy → K7 type/color-led → F4 story/time-led, creating a deliberate change of pace while retaining one coherent V7 identity.

## What changed because of new professional knowledge

Fresh research on book/magazine sequence, rhythm and pacing changed the decision from 'polish the Profile image treatment' to 'evaluate whether the image should perform the same opening job on the next spread at all.'

K6 also proved that subtraction alone is not enough: a new pace must still have a defensible editorial beat.

## Regression risk

- overcorrecting image repetition can make a page visually empty or anti-photographic;
- changing pace without publication identity can make a sequence feel unrelated;
- replacing a repeated photo with generic decorative typography can merely trade one template for another;
- a repeated image may be correct when it carries an intentional narrative callback.

## Transfer hypothesis

On another materially different print publication, audit adjacent spreads for **same source + same scale + same editorial opening role**. If repetition has no sequence/narrative job, test a rollback-safe change of medium or hierarchy and compare the neighboring pages together, not only the candidate in isolation.

Do not transfer V7 coral, exact type sizes, couple snapshots, positions, Japanese travel-magazine grammar or K7 geometry.