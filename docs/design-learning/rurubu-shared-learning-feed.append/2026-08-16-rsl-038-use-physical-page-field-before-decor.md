# RSL-038 — Use legitimate page field before filling quiet space with decoration

Source scope/item: Rurubu WEDDING / V6 Profile

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

AV substantially improved AU's Profile photo density, but actual-size review still showed a passive final strip below the lower three-photo memory cluster. The page was no longer structurally sparse, yet it still stopped visually before the physical page did.

## Root-cause hypothesis

When a print page has legitimate replaceable photography and an unused lower field, the first question should be whether the existing photographic hierarchy can intentionally occupy more of the physical page before adding a new decorative object, texture, card or generated support.

The goal is not “fill every gap.” The treatment is valid only when the deeper/larger image composition strengthens the reading endpoint without creating crop, intrinsic-quality, safe-area or text-collision regressions.

## Bounded test

Source: preferred AV `1403:2`.

Rollback-safe candidate: AX `1406:2`.

Profile photo changes only:

- snapshot 1: `380×255 @ y=700` → `410×280 @ y=720`;
- snapshot 2: `292×210 @ y=765` → `340×245 @ y=805`;
- snapshot 3: preserve intrinsic-safe `238×185`, move to `x=520 / y=720`;
- keep native Profile copy unchanged;
- keep Q&A subtree unchanged;
- add no new raster, generated decoration, card, gradient, shadow or native ornament.

Expected improvement: stronger bottom-page closure and a more intentional editorial collage, without adding decorative filler.

Regression risks:

- enlarged sources expose softness;
- overlap becomes clutter rather than hierarchy;
- photos collide with factual text or trim/safe area;
- the lower field becomes visually heavy relative to the hero.

## Three-scale evidence

- 500 px whole spread: AX PASS and stronger lower Profile anchor than AV;
- reading scale: PASS;
- actual Profile `794×1123`: PASS; the three photos read as one deeper collage and the final paper field is used more intentionally.

Structure:

- Profile visible native text `17`;
- replaceable IMAGE roles `4`;
- text/text collision `0`;
- accidental text/image collision `0`;
- 18 px text safe-area risk `0`.

Q&A geometry did not change, so the fresh AV long-answer proof remains directly applicable.

## Evidence

- Figma file `bfM0d4c9dCeBv5pCkJ3TNM`
- AX preferred `1406:2`
- Profile page `1406:3`
- AV hidden rollback `1403:2`
- Start Here `845:27` = `V5 FU/FX · V6 P + AX/AS INSIDE STUDIES · V7 HOLD`
- Drive root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- item evidence `01_paper-items/rurubu-wedding/RURUBU-V6-P-AX-AS-QA-2026-08-16.md`
- item evidence commit `83263d1d2f10d04c8b999d915e2a6dfea50edf20`
- current-state commit `0cbc90993077de06aa9cb81e4d883c7d1dbed176`

## Result / status

AX promoted: `VERIFIED_LOCAL`.

AV retained hidden as rollback evidence.

## What must remain Rurubu-specific

Do not transfer exact photo choices, sizes, angles, overlaps, cream field, title hierarchy, or travel-magazine styling.

## Cross-item applicability hypothesis

For another print artifact with a quiet trailing field, independently compare:

1. current legitimate content stopping early;
2. the same legitimate image/content roles using more of the physical page;
3. a decoration-added alternative only if needed.

Choose the deeper content treatment only when whole/read/actual-size evidence shows stronger closure without functional or quality regression.

Failure fingerprint to watch: `PAGE_FIELD_FILL_BECOMES_CLUTTER_OR_SOURCE_UPSCALE`.
