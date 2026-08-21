# ADD-02 11卓の国別テーブルサイン — family diversity / place-derived study

Date: 2026-08-21
State: `TESTED_LOCAL / CURRENT_PRODUCTION_RETAINED / NEW_STUDY_REJECTED_FOR_PROMOTION`
Start authority SHA: `55f92ddbec0aaaf0fc7559830e7df181afbe2111`
Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
Drive authority live readback: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

## Why this audit was reopened

The current 11-sign vNext family is already structurally healthy and scored 90/100, but a fresh whole-family screenshot showed a possible second-order template risk: several destinations still use a related vocabulary of oversized circles, diagonal rounded strokes, and large numerals. The risk is not that the signs are identical; it is that destination differentiation may be carried too much by recolor/rotation of one abstract graphic grammar.

The audit therefore tested a stronger hypothesis without touching production:

> Can destination identity be made more ownable by using typography or physical paper structure as the primary differentiator instead of repeated abstract travel shapes?

Only non-visual requirements were carried into the study: `1000×1480`, destination name, Japanese destination label, table number, date, and native `[国テーマ見出し]` / `[国テーマ説明]` roles. Current production nodes, crops, circles, bars, palettes, layouts and generated assets were not duplicated or used as authoring sources.

## External professional learning used

This run reviewed public professional design references before judging the experiment:

- Pentagram / Chateau Engalin: a hospitality identity can unify many moods through one concept tied to place/material rather than by repeating one decorative module everywhere.
- Pentagram / Marina Bay Sands: place identity becomes stronger when typography and graphic language are rooted in a distinctive built/natural context rather than generic travel iconography.
- Kendall Henderson / *For the Love of Tokyo* (It's Nice That): city identity can be distilled into a visual lexicon of typography, colour and shape, but the lexicon must still evoke the specific place rather than becoming generic modernist abstraction.
- Cooper Hewitt / AIGA *How Posters Work*: impact comes from how hierarchy, scale, crop, rhythm and contrast are assembled; there is no universal “poster pop” device.

Transfer to ADD-02: destination differentiation should ideally come from a destination-specific visual lexicon or image/typography role, while the family system supplies discipline. The family should not be “same hero geometry, different colours.”

## Blank-frame study

New Figma page:

- `146:46 / VNEXT_STUDY / ADD-02 / PLACE-DERIVED FAMILY / 2026-08-21`

Four materially different system directions were authored from blank frames using HAWAII and JAPAN as two deliberately different receiving destinations:

### A — TYPE AS LANDSCAPE

- HAWAII `146:47`
- JAPAN `146:57`
- destination name, one edge field and one horizon rule do most of the work;
- no circles, pills, icons, stamps or fake travel data.

Result: `REJECTED_FOR_PROMOTION`.

The direction successfully removes the repeated abstract-shape fingerprint but collapses too far toward quiet modernist poster minimalism. At whole scale it loses the celebratory energy required by `SUNSHINE DEPARTURE`, and the two destinations become differentiated mainly by word length and accent colour.

### B — FOLDED PAPER INDEX

- HAWAII `146:67`
- JAPAN `146:78`
- uses a top paper field, side index and fold-corner geometry rather than floating decoration.

Result: `REJECTED_FOR_PROMOTION`.

It improves tactile paper plausibility, but the same fold/index object becomes the dominant metaphor for both destinations. This reproduces the newer `PHYSICAL_METAPHOR_CONVERGENCE` risk instead of solving destination specificity. It is also calmer and more administrative than the current production family.

### C — EDITORIAL BAND

- HAWAII `146:89`
- JAPAN `146:99`
- uses rectangular editorial bands, large destination name and strong bottom information field.

Result: `REJECTED_FOR_PROMOTION`.

This is the most energetic of A–C and avoids circles/pills, but it drifts toward generic event-signage identity. It changes the geometry without making either destination substantially more place-specific.

### D — TYPOGRAPHIC SOUVENIR

- HAWAII `147:2`
- JAPAN `147:11`
- the destination name itself becomes the main image through oversized crop/scale;
- each destination gets a different field proportion instead of a recolour copy.

Result: `REJECTED_FOR_PROMOTION / USEFUL_DIRECTIONAL_EVIDENCE`.

This is the strongest typography-led study and the cleanest break from repeated blob/capsule geometry. However, live 1000×1480 screenshots show that it still becomes too sparse and gallery-poster-like for the current wedding brief. It improves graphic discipline but reduces warmth, surprise and guest-facing excitement. The destination name is ownable, but the place itself is still under-authored.

## Comparison to current production

Current family review board:

- `142:2 / QA / ADD-02 / 11 DESTINATION FAMILY THUMBNAIL / 2026-08-21`

Current HAWAII actual-size root:

- `2:2`

The mature production family remains stronger in emotional energy, movement and wedding-travel immediacy. Therefore **no production visual node was changed** in this run. Existing 90/100 promotion state remains current.

The test nonetheless confirmed a real ceiling: the next meaningful improvement is unlikely to come from simply removing circles/pills or replacing them with one new shared paper-object metaphor. That method removes one template fingerprint but creates either generic minimalism or a different repeated system.

## Hybrid authoring / asset decision

- variable/factual copy in study: native editable Figma text;
- study geometry: simple native vector/rectangle roles;
- reusable SVG: `0`;
- generated raster: `0`;
- replaceable IMAGE fills: `0`;
- Drive writes: `0`.

Image generation was not falsely claimed. The connected run did not expose an image-generation tool. More importantly, the study clarifies the next legitimate generated-asset role if/when generation is available: **destination-specific non-person atmosphere/texture or editorial illustration**, not generic airplane/tropical decoration.

## Next method — destination visual lexicon before another full-family rebuild

Do not continue cosmetically polishing A/B/C/D. The next bounded method should be materially different:

1. choose two anchor destinations with very different visual character (HAWAII and one non-tropical destination);
2. build a short destination visual-lexicon brief from reliable place/culture/material references before drawing;
3. define one fixed-art role per destination (atmosphere, material texture, editorial illustration, or typographic graphic) with native text kept separate;
4. if generation is available, create 2–4 materially different non-person candidates per anchor role and reject fake text, stock paradise imagery and cultural stereotypes;
5. compare the resulting two destination signs at whole, reading and actual-size scales;
6. only if destination specificity clearly rises without losing family coherence should the method scale to the remaining nine signs.

### Example HAWAII fixed-art role brief for the next test

- role: non-person atmospheric field supporting the destination name, not a hero photo pretending to document a specific venue;
- target: approximately upper/right 35–45% of the 1000×1480 sign, with a clean native-text lane on the left/middle;
- visual character: warm coastal light, ocean-air movement, tactile print/risograph-like or editorial texture, generous and contemporary;
- avoid: palm/hibiscus/ukulele/tiki collage, fake signage/letters, people, wedding moments, airline logos, hyper-gloss diffusion aesthetic, plastic tropical stock look;
- print requirement: preserve detail at actual size without relying on hairline texture or low-contrast microdetail.

## Learning state

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL`.

Observed fingerprint: `DESTINATION_DIFFERENTIATION_BY_SHARED_ABSTRACT_GRAMMAR`.

This is **not** yet a cross-item or project-wide rule. The current production is retained because the new bounded alternatives do not beat it. The useful learning is methodological: destination-specificity must be added from real place-derived lexicon/art direction, not achieved merely by subtracting the existing shapes or swapping them for another shared object template.
