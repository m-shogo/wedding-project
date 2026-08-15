# 2026-08-15 — Rurubu V7 Inside D native-type anchor experiment

Scope: Rurubu WEDDING only

State: `VERIFIED_LOCAL / PREFERRED_STUDY_PROMOTED / CROSS_ITEM_CANDIDATE`

## Visible problem

V7 Inside A was readable and structurally clean, but the left page still looked under-edited in its lower half. Photography and identity content were concentrated above, the Q&A occupied the middle, and `OUR COMMON POINT` was too small and isolated to close the page with magazine-like intent.

## Root-cause hypothesis

The defect was editorial hierarchy rather than missing decoration or imagery. Adding another photo/card/sticker risked repeated imagery, weak assets, or UI-like containment. A stronger native-text payoff plus tighter Q&A rhythm could produce the missing second focal point while retaining editability.

## Bounded test and iteration

1. Duplicated preferred Inside A `1247:2` into rollback-safe Inside C `1258:2`.
2. Moved `3 QUESTIONS`, Q1/Q2/Q3 and `OUR COMMON POINT` upward to reduce disconnected empty rhythm.
3. Reviewed C at whole-spread scale. It improved spacing but did not create enough lower-page editorial payoff, so C was not promoted.
4. Duplicated C into Inside D `1259:2`.
5. Kept every image/mask/hash and all factual wording unchanged.
6. Increased only the native `OUR COMMON POINT` payoff from 23px to 34px and widened the text role to 650px, creating a deliberate second type focal point without a card or new raster.
7. Structural QA found the Q1 answer text box crossing the right Q&A column by 42px even though glyphs did not visibly collide. Reduced that text box width from 500px to 450px while preserving its characters, 28px type size, and two rendered lines.

## Expected improvement

- make profile → Q&A → shared travel interest read as one continuous editorial story;
- reduce the template-like empty lower-page feeling;
- preserve native text and image replacement structure;
- avoid adding weak imagery or Web/UI-like decorative containers.

## Regression risk

- oversized copy could become poster-like or compete with the main profile headline;
- tightened Q&A bounds could introduce Japanese line-break regressions;
- visual non-overlap could hide actual text-box collisions.

## Three-scale evidence

Inside D `1259:2` after repair:

- whole spread / 1200px: PASS;
- thumbnail / 500px: PASS;
- actual-size left page / 794×1123: PASS;
- Q1 answer remains two rendered lines;
- lower `旅 × 写真 × HAWAII` payoff survives thumbnail scale as a secondary anchor without overtaking the page title.

## Structure / asset evidence

- native text nodes: 32;
- replaceable masks: 6;
- image nodes: 6;
- left direct-text absolute collisions: 0 after repair;
- non-bleed 18px safe-area risks: 0;
- intentional top full-bleed photo roles preserved;
- six image hashes unchanged from previous Inside A authority;
- new image generation: 0;
- new Drive saves: 0;
- new Figma binary placements: 0.

Drive readback confirmed the Rurubu Hawaii generated-master folder `1pkkf4BX3ugKdR1rTkgXdp8xTaNGrQD1p` is still empty, so no unsupported Hawaii master claim was introduced.

## Promotion

- Outer remains preferred D `1252:2`;
- Inside D `1259:2` promoted to preferred study;
- previous Inside A `1247:2` hidden as rollback;
- intermediate C `1258:2` hidden as study;
- Start Here `845:27` updated to `V5 FU/FX · V6 M/I · V7 D/D STUDY`.

Git authority:

- `01_paper-items/rurubu-wedding/RURUBU-V7-HAWAII-PREFERRED-D-D-EDITORIAL-STUDY-2026-08-15.json`
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-15-rsl-021-type-anchor-vs-empty-lower-page.md`

## Adopt / reject decision

- Inside C: `SUPERSEDED` — spacing improved but editorial payoff remained weak.
- Inside D: `VERIFIED_LOCAL / ADOPTED_AS_PREFERRED_STUDY`.

## Rurubu-specific boundary

The Hawaii wording, palette, exact type sizes, Q&A geometry, photography ratios and Rurubu-like magazine grammar remain Rurubu-specific and must not be copied into another Wedding item.

## Cross-item applicability

Candidate principle only: before filling an empty print region with another image/card/sticker, test whether existing semantic native text can become a stronger second editorial anchor. The receiving item must verify its own reading order, line breaks, physical semantics and actual-size detail independently.
