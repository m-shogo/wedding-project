# RSL-073 — Pair a secondary editorial question with an existing photo before adding decoration

Date: 2026-08-17
Source scope: Rurubu WEDDING V6
Source item/state: Q&A CU → CV
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The Q&A page already had a strong top photo and a meaningful Q04 feature, but Q04 started well above the lower support photograph. The central cream area therefore still read partly as a form/template with independently placed question modules.

## Root-cause hypothesis

The page did not lack decoration. A legitimate existing support photograph and a meaningful secondary question were semantically related but spatially detached.

## Bounded test

On rollback-safe CV:

- keep all native wording and semantic question roles;
- keep the same replaceable photo image hash;
- enlarge/reposition the existing support photograph within its verified source dimensions;
- align Q04 beside that photograph as one horizontal editorial beat;
- reflow Q05/Q06 beneath it;
- add no new card, shadow, gradient, generated image, external asset, or raster byte.

Expected improvement: stronger photo-led hierarchy and less form/template feeling.

Regression risks: image softness, Q04–06 collisions, long-copy overflow, and bottom-heavy thumbnail balance.

## Evidence

Figma:

- source CU `1580:2`;
- preferred CV `1585:2`;
- Q&A page `1585:42`;
- hidden realistic-copy proof `1586:2` / `1586:42`.

Visual QA:

- whole-item `500×354`: PASS;
- reading spread `1200×849`: PASS;
- actual-size Q&A `794×1123`: PASS;
- realistic Q04–Q06 long-copy actual-size: PASS.

Structure QA:

- visible native text `26`;
- text collisions `0`;
- 18px text safe-area risks `0`;
- support photo `455×370` ≤ source `732×498`;
- image hash unchanged.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Z-CV-CQ-Q04-PHOTO-PAIR-QA-2026-08-17.md`.

## Result

`VERIFIED_LOCAL` in Rurubu: when a repeated-information page already contains a valid secondary photograph, an important secondary text beat can sometimes be made more editorial by pairing the two spatially before introducing another container or decorative layer.

## What must remain Rurubu-specific

Do **not** transfer:

- exact Q&A wording;
- Q04 selection;
- exact photo;
- exact dimensions/positions;
- coral/cyan/yellow palette;
- Rurubu travel-magazine art direction.

## Cross-item applicability hypothesis

Potentially test only the general principle: **before adding a new card or ornament to repair a detached repeated-information module, test whether an already-legitimate image and a meaningful text beat can be bound into one stronger editorial unit while keeping both independently editable.**

Receiving items must test this independently. This is not `VERIFIED_CROSS_ITEM` and not a project-wide visual rule.
