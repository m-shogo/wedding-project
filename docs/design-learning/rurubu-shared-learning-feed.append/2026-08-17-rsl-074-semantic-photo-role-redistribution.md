# RSL-074 — Redistribute verified photo roles by semantic fit before generating another asset

Date: 2026-08-17
Source scope: Rurubu WEDDING V6
Source item/state: Profile/Q&A CV → CW
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The V6 book had strong individual pages, but several major roles reused the same waterfront and travel-flatlay images. This reduced book-level variation. The Profile hero also used a place photograph while its overlay label still read `GROOM / BRIDE`, weakening semantic fit.

## Root-cause hypothesis

The next improvement did not necessarily require another generated or transported image. Existing verified, replaceable Rurubu image hashes could be redistributed to roles where their subject matter better supports the surrounding native copy.

## Bounded test

On rollback-safe CW `1593:2`:

- Profile main: waterfront → travel flatlay;
- Profile snapshot 1: cafe → waterfront;
- Q&A memory hero: travel flatlay → cafe;
- Q&A support remained dining;
- old-town and skyline profile snapshots remained unchanged;
- Profile overlay label changed as native text from `GROOM / BRIDE` to `TRAVEL PROFILE`;
- no new generation, Drive save, binary placement, image hash, card, shadow, gradient, or raster byte.

Expected improvement: reduce repeated dominant-photo fatigue and make each photograph's semantic role clearer while keeping all relevant images independently replaceable.

Regression risks: weaker image/copy fit, lower visual impact, raster softness, or contrast loss after role reassignment.

## Three-scale evidence

Figma:

- source CV `1585:2`;
- preferred CW `1593:2`;
- Profile `1593:3`;
- Q&A `1593:42`.

Visual QA:

- whole spread `500×354`: PASS;
- reading spread `1200×849`: PASS;
- Profile actual-size `794×1123`: PASS;
- Q&A actual-size `794×1123`: PASS.

Structure / raster QA:

- Profile native text `23`, collision `0`, 18px safe-area risk `0`;
- Q&A native text `26`, collision `0`, 18px safe-area risk `0`;
- flatlay Profile hero `793.7×328` ≤ source `944×608`;
- waterfront Profile snapshot `410×280` ≤ source `1356×560`;
- cafe Q&A hero `478×330` ≤ source `810×552`;
- dining Q&A support `455×370` ≤ source `732×498`.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AA-CW-CQ-PHOTO-LED-COVER-AND-ROLE-DIVERSITY-QA-2026-08-17.md`;
- `01_paper-items/rurubu-wedding/RURUBU-V6-AA-CW-CQ-ACTIVE-ASSET-RECONCILIATION-2026-08-17.json`.

## Result

`VERIFIED_LOCAL` in Rurubu: when a book already contains several legitimate, quality-passing, replaceable photographs, reassigning them by semantic fit can improve book-level variation and copy/image coherence before another generation or transport attempt is justified.

## What must remain Rurubu-specific

Do not transfer:

- the exact image hashes or photographs;
- `TRAVEL PROFILE` wording;
- exact photo roles, dimensions, crops, or positions;
- Rurubu palette, typography, or travel-magazine art direction.

## Cross-item applicability hypothesis

Potentially test only the general principle: **before generating another image to solve visual repetition, audit whether existing verified replaceable images can be redistributed to more semantically appropriate roles without compromising provenance, fidelity, or editability.**

Receiving items must test independently. This is not `VERIFIED_CROSS_ITEM` and not a promoted project-wide visual rule.