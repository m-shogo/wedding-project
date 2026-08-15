# Wedding Design Learning Feedback — Rurubu V6 O + AM/AI

Date: 2026-08-16
Scope: Rurubu WEDDING only
State: `VERIFIED_LOCAL_DUMMY_DESIGN_STUDY / V7_HOLD / NOT_PRINT_READY`

## Observation

The current AL Q&A page was structurally safe but still visually weak: six editable question/answer groups floated as separate modules while one large memories image occupied the lower field. The page remained readable, but the repeated spatial islands made it feel more like manually arranged Figma content than a decisive Japanese travel-magazine interview page.

## Hypothesis

The page needed a stronger reading path, not more decoration. Repeated Q&A units could be treated as one interview sequence, while the existing photography could become one independent visual anchor.

## Bounded experiment

Created AM `1380:18` from AL `1373:2` and changed only the Q&A page.

Subtracted three decorative separator rules. Reflowed all six native Q&A blocks into one left vertical interview column. Kept `01` and `04` as feature-scale numbers. Reused the existing verified dining and skyline images as a dominant right photo plus overlapping support image. Added an editable closing pull quote and note.

No generated asset, new Drive file, new upload, card, badge, gradient or shadow was added.

## Rejected intermediate state

The first AM screenshot exposed vertically wrapping number boxes and programmatic text-bounding overlaps. That state was rejected. Number boxes and question/answer x positions were corrected until collision count reached zero.

## Verified result

Promoted AM:

- root `1380:18`
- Q&A `1380:46`
- hero `1380:71` — `340×460`, hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- support `1380:72` — `185×215`, hash `644f449c3bf2001a94d4b822d2b55e2614c11042`

Visual QA:

- 500 px whole spread: PASS
- 1400 px whole spread: PASS
- 794×1123 actual Q&A: PASS

Structure QA:

- visible native text: `24`
- replaceable IMAGE roles: `2`
- text/text collisions: `0`
- 18 px text safe-area risks: `0`

Rollback:

- AL `1373:2` hidden and retained

Start Here:

`V5 FU/FX · V6 O + AM/AI INSIDE STUDIES · V7 HOLD`

## Design conclusion

This pass improves the Q&A page primarily by **turning repeated copy into a reading sequence** rather than by adding more visual objects. The stronger result comes from editorial hierarchy and photo role separation.

The lesson does not justify copying this exact layout to other wedding items. Rurubu colors, question geometry, photo choices and magazine grammar remain Rurubu-specific.

## Next Rurubu move

Review O + AM/AI together as one magazine system. The next change should address only a defect visible at thumbnail, reading or actual size. Generated section masters remain unadopted until quality-preserving binary transport materially changes.