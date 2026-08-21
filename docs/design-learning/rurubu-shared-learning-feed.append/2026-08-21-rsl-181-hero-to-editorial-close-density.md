# RSL-181 — Hero-to-editorial-close density rebalance

Date: 2026-08-21
Source scope: Rurubu WEDDING V6 / Yokohama 1DAY Plan
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

IW `2131:2` had a strong dominant waterfront hero and an improved asymmetric route page, but the left page dropped into a sparse two-column cream field after the hero. At whole-item scale the page read as `large photo → utility footer → dead lower reserve` rather than one continuous magazine page.

## Evidence before change

Fresh common-scale review of `IU + IX + IR + IZ + IT + IW` selected IW left as the next macro defect. Existing photo quality and provenance were sufficient; the hierarchy break occurred after the photo rather than inside it.

## Root-cause hypothesis

The problem was unequal editorial role mass: the hero carried too much of the page while the useful closing information was spatially underweighted. Adding cards or another image would treat density as missing decoration instead of rebalancing the existing content.

## Principle / capability tested

Before adding new assets to a photo-led print page with a weak post-hero footer, test whether:

1. the already-legitimate hero can extend farther without crop/detail regression; and
2. existing native information can be consolidated into a tighter, intentionally weighted editorial close.

This is not a blanket rule to enlarge photographs. Crop quality, safe-area, contrast, physical readability and information ownership must remain sound.

## Bounded test

Rollback-safe JA `2141:2` duplicated IW. Right page was preserved. On JA left `2141:3` only:

- hero height increased `650 → 720`;
- existing start label/time/title/copy moved with the photo;
- existing lower cyan rule was widened and moved to bind the closing beat;
- existing `旅のコツ + 01 + 寄り道、歓迎。` and `横浜1DAYメモ + closing quote` were compacted into a stronger lower editorial field;
- no new image, text, card, badge, shadow, gradient or generated decoration was introduced.

## Expected improvement

Stronger vertical continuity, less dashboard/footer reading, and denser-but-readable travel-magazine rhythm using only existing legitimate content.

## Regression risk

- enlarged hero exposes weak crop/detail;
- lower copy becomes cramped;
- the compact closing field becomes a rigid two-column UI;
- safe-area or text collisions emerge after movement;
- future longer final copy may exceed the current dummy-content allowance.

## Three-scale evidence

- whole spread / 500 px: PASS; JA stronger than IW;
- reading / 1400 px: PASS;
- actual left page / `794×1123`: PASS;
- visible native text on JA left: `19`;
- IMAGE fills on JA left: `1`;
- same-parent text intersections: `0`;
- 18 px text safe-area risks: `0`.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- JA root: `2141:2`;
- JA left: `2141:3`;
- hidden IW rollback: `2131:2`;
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`;
- no new asset generation/save/derivative/upload/hash;
- detailed QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-JA-1DAY-DENSE-EDITORIAL-CLOSE-QA-2026-08-21.md`.

## Adopted / rejected / blocked status

JA treatment: `ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

No rejected generation or transport candidate occurred in this test because image quality was not the diagnosed bottleneck.

## What must remain Rurubu-specific

Do not transfer the waterfront photograph, crop, palette, Japanese headline scale, `01` treatment, exact line geometry, exact copy, coordinates, route-page layout, or Rurubu-like brand/editorial grammar.

## Cross-item applicability hypothesis

Other print wedding artifacts may independently test this only when they exhibit the same normalized problem: a legitimate dominant image followed by a visibly underweighted utility-like closing field. The receiving item must prove the benefit in its own rollback-safe candidate and must not imitate this Rurubu composition.

Normalized failure/problem fingerprint: `PRINT_HERO_STRONG__POST_HERO_FIELD_UNDERWEIGHTED__UTILITY_FOOTER_READ`.

Next receiving-item experiment: when independently observed elsewhere, compare (a) current composition against (b) extended legitimate visual field + recomposed existing information at thumbnail, reading and actual-size scales before adding new decoration.
