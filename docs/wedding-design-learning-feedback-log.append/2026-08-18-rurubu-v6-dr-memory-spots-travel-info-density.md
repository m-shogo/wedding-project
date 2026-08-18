# 2026-08-18 — Rurubu V6 DR Memory Spots travel-info density

Scope: Rurubu WEDDING only. V7 untouched.

## Visible problem

DQ solved the missing destination-feature problem, but the right-page closing area still read as one large dark closing card rather than compact travel-guide information.

## Hypothesis / bounded change

Test whether the same editorial information works better as native practical metadata with a thin rule and one purposeful CHECK marker. Preserve all photo roles, hashes, spot copy, geometry and rollback.

## Result

DR `1689:2` adopted over DQ `1686:2`.

Changed only the right-page closing role:

- large navy field → thin navy rule;
- generic closing prose → compact native travel-guide metadata;
- one small yellow CHECK label added;
- no new photos, generated assets, Drive saves, external binary placements or image hashes.

## Three-scale / structure evidence

- whole spread 1200px: PASS;
- right page actual size 794×1123: PASS;
- left/right text collisions: 0 / 0;
- left/right 18px text safe-area risks: 0 / 0.

A low-dimension remote screenshot path intermittently dropped raster fills and was not accepted as design evidence.

## Status

`VERIFIED_LOCAL / ADOPTED`

- preferred: DR `1689:2`;
- rollback: DQ `1686:2` hidden;
- Start Here: `V5 FU/FX · V6 AG + DN/DO + DR MEMORY SPOTS · V7 HOLD`.

## Next application

Review AG + DN/DO + DR as one publication. Prefer another concrete editorial-role or readability defect over cosmetic version churn. Final photo/copy/printer gates remain separate.