# Rurubu WEDDING V6 — Z + CV/CQ visual feedback

Date: 2026-08-17
Status: `VERIFIED_LOCAL / CV PROMOTED / V7 HOLD`

## Observation

Fresh live-state reconciliation found GitHub's `Y + CP/CQ` declaration stale. Figma already had Outer Z and Profile/Q&A CU as visible preferred, while Y and CP were hidden rollback. Work therefore continued from live Z + CU/CQ rather than the stale Git declaration.

## Experiment

Visible problem: Q04–06 in CU still read slightly like independently placed form items because Q04 began above the lower support photograph, leaving a large cream gap.

Principle tested: bind an existing legitimate support photo and a meaningful secondary question into one photo-led editorial beat before adding any new card or ornament.

Bounded change on CV `1585:2`:

- existing support photo enlarged/repositioned from roughly `430×300 @ y725` to `455×370 @ y610`;
- Q04 aligned beside the photograph;
- Q05/Q06 reflowed below;
- native copy, top hero, route texture, image hashes and Profile page preserved;
- no generated image, Drive write, binary placement, new raster, shadow, gradient or new container.

Expected improvement: reduce template-like dead space and strengthen the reading path.

Regression risks: photo softness, page becoming bottom-heavy, collisions, and long-copy overflow.

## Evidence

Visual:

- 500px whole-item: PASS;
- 1200px reading spread: PASS;
- 794×1123 Q&A actual-size: PASS;
- realistic Q04–Q06 long-copy proof actual-size: PASS.

Structure:

- native text `26`;
- text collisions `0`;
- 18px text safe-area risks `0`;
- support photo `455×370` ≤ `732×498` source;
- image hashes changed `0`.

## Adoption

- CV `1585:2`: `ADOPTED / PREFERRED`;
- CU `1580:2`: `ROLLBACK / HIDDEN`;
- long-copy proof `1586:2`: `HIDDEN` after evidence;
- Start Here: `V5 FU/FX · V6 Z + CV/CQ INSIDE STUDIES · V7 HOLD`.

## Next application

Continue judging Z + CV/CQ as one magazine. Target the next region that still reads as a template, but prefer photo/type hierarchy, semantic binding and subtraction before new containers or decorative micro-geometry.

This does not make V6 complete or print-ready. Final legitimate photography/copy, exact printer template, PDF preflight and physical proof remain separate gates.
