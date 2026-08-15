# RSL-021 — Dense editorial rhythm can come from native type before adding another image

Source scope/item: Rurubu WEDDING / V7 Hawaii clean-room inside spread

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

V7 Inside A `1247:2` had strong profile photography in the upper half and a readable Q&A, but its left page became visually under-edited lower down. `OUR COMMON POINT` sat near the footer as a small isolated module, so the profile → Q&A → shared-travel story did not feel like one continuous magazine reading path.

The obvious reaction would have been to add another photo, sticker, card or decorative field. That would have risked repeating imagery, introducing weak assets, or recreating the same UI-container behavior already rejected in Rurubu research.

## Root-cause hypothesis

The defect was primarily hierarchy and vertical rhythm, not missing decoration. If the lower shared-travel statement became a stronger native-typography anchor and the Q&A cluster was compressed upward, the page could gain a second focal point without adding another raster role or card-like container.

## Bounded test

A rollback-safe clone of Inside A became intermediate Inside C `1258:2`.

C changed only native-text placement:

- moved `3 QUESTIONS` and Q1/Q2/Q3 upward;
- moved `OUR COMMON POINT` upward into the active reading path;
- preserved all imagery, masks, hashes, factual wording and the right page.

C improved spacing but did not create enough editorial payoff, so it was not promoted.

C was then cloned to Inside D `1259:2` and tested with one stronger type intervention:

- `OUR COMMON POINT` remained native text;
- its payoff `旅 × 写真 × HAWAII / 好きが重なるところ。` increased from 23px to 34px and widened to 650px;
- no card, new image, sticker, shadow, gradient or decorative raster was added;
- after structural QA found Q1 answer bounds crossing into the right Q&A column, the Q1 text box width was reduced `500 → 450` while preserving its exact characters, font size and two rendered lines.

## Expected improvement

Create a deliberate lower-page focal point, connect the Q&A to the shared-travel theme, and reduce empty/template-like reading without compensating with another image or UI-like decoration.

## Regression risk

Large native type can become poster-like, crowd the page, or compete with the main page title. Compressing text modules can also create invisible bounding-box collisions even when glyphs look separated. Therefore both three-scale rendered QA and absolute-bound structural QA are required.

## Three-scale evidence

Inside D `1259:2`:

- whole spread / 1200px: PASS; left-page reading path is more continuous than A/C;
- thumbnail / 500px: PASS; the lower shared-travel payoff survives as a recognizable second anchor without overpowering the profile title;
- actual-size left / 794×1123: PASS; Japanese glyph fit and two-line Q1 answer remain intact.

Structural readback after repair:

- native text: `32`;
- replaceable masks: `6`;
- IMAGE roles: `6`;
- left direct-text absolute collision count: `0`;
- non-bleed 18px safe-area risk: `0`;
- intentional full-bleed photo roles remain unchanged;
- all six image hashes match the previous Inside A authority.

## Figma / Drive / GitHub evidence

Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`.

Current V7 preferred study after promotion:

- Outer D `1252:2`;
- Inside D `1259:2`;
- Start Here `845:27`: `V5 FU/FX · V6 M/I · V7 D/D STUDY`;
- previous Inside A `1247:2` hidden as rollback;
- intermediate Inside C `1258:2` hidden as study.

Drive readback before promotion:

- Hawaii root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- generated masters folder `1pkkf4BX3ugKdR1rTkgXdp8xTaNGrQD1p` remains empty;
- no new Drive save and no new binary Figma placement were used for this experiment.

Git evidence:

- `01_paper-items/rurubu-wedding/RURUBU-V7-HAWAII-PREFERRED-D-D-EDITORIAL-STUDY-2026-08-15.json`
- `docs/wedding-design-learning-feedback-log.append/2026-08-15-rurubu-v7-inside-d-type-anchor.md`

## Status

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## What must remain Rurubu-specific

Do not transfer the exact Hawaii wording, pink/navy colors, Noto Sans JP sizes, Q&A positions, photo ratios, Rurubu-like density, or node geometry to another Wedding item.

## Cross-item applicability hypothesis

When a print artifact has an under-edited or empty region, test hierarchy before adding another visual asset. If existing semantic copy can become a meaningful second focal point, a larger native-type anchor plus tighter reading rhythm may improve the artifact while preserving editability and avoiding repeated imagery or UI-like containers. The receiving item must independently verify that the larger text supports its own physical/art-direction semantics rather than merely filling space.
