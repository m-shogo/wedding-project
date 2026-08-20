# RSL-154 — Major chronology beats can carry more editorial responsibility without adding cards or photography

Source scope/item: Rurubu WEDDING / V6 Outer back chronology
Date: 2026-08-20
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The preferred HB back cover had a strong full-width travel-object photograph, but the lower chronology still read as a sparse production study at whole-item and actual-size scales. Major beats `01 / 03 / 05 / 06` had scale hierarchy, yet most events were only ordinal + short label, so the cream field did not carry the same editorial density as the photographic upper half.

## Evidence before change

- Figma source: HB `2010:2`, back `2010:3`.
- Whole spread and actual-size back screenshots showed the upper photo field as confident and the lower chronology as comparatively empty.
- HB itself was structurally clean: same-parent text collisions `0`, 18px text safe-area risks `0`.
- Drive source root remained `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Root-cause hypothesis

The problem was not missing photography or missing containers. The major milestones had enough semantic importance to carry a short reader-facing native caption and a small binding mark, but were visually under-responsible. Adding another photograph or card would increase repetition/UI containment instead of strengthening editorial reading rhythm.

## Bounded test

A rollback-safe duplicate was created:

- candidate root: HD `2014:2`
- back: `2014:3`
- source HB preserved as rollback

The test changed only the lower back chronology:

- strengthened the native `ふたりの旅年表` heading;
- kept `01 / 03 / 05 / 06` as major beats and `02 / 04` as subordinate beats;
- added short native reader-facing captions only where a major beat could carry them:
  - `ふたりの旅のはじまり。`
  - `景色が増えていく。`
  - `家族として、次の旅へ。`
  - `ここからも、旅はつづく。`
- localized the chronology kicker to `6つの景色 / 01—06`;
- added three short functional color rules under the major 01 / 03 / 05 beats, rather than cards or large color fields;
- preserved confirmed dates `2026.02.11` and `2026.10.24`;
- added no photograph, no generated asset, no raster, no image hash, no card, no shadow, and no gradient.

## Failed local branch / failure fingerprints

### `TEXT_GEOMETRY_DIRECT_ASSIGN_READONLY`

The first Figma write attempted to assign text `width` directly and failed with `node.width: read-only property on TEXT node`. The script was atomic and made no mutation. The method was corrected to use `TextNode.resize()` after readback verified the candidate remained unchanged.

### `DECORATIVE_BACKGROUND_TYPE_COLLIDES_WITH_SEMANTIC_COPY`

A second bounded test added large low-opacity native background typography `旅は、つづく。` (`2015:2`) behind the chronology. It looked energetic but structure QA found 11 overlaps with semantic chronology text. It was rejected and hidden. Minor 02/04 explanatory notes were also removed because they added clutter without enough value.

This is evidence that “more magazine-like energy” is not permission to let background typography collide with editable semantic copy.

## Expected improvement

- reduce the gap in editorial density between the strong photographic top half and cream chronology bottom half;
- make 01 / 03 / 05 / 06 feel like edited story beats rather than isolated labels;
- preserve clear major/minor chronology hierarchy;
- avoid increasing photo repetition or reintroducing UI-like containment.

## Regression risk

- short helper captions can become generic filler if they do not add reader value;
- color rules can become decorative noise if they stop performing a binding function;
- large background typography can collide with variable semantic text;
- type scaling can regress wrapping/collision if text boxes are not resized and revalidated.

## Three-scale evidence

Adopted HD:

- whole-item / 500px: PASS; the lower chronology remains legible as a hierarchy and reads denser than HB;
- reading / 1200px: PASS;
- actual-size back `2014:3 / 794×1123`: PASS;
- actual-size front unchanged from HB and structure-revalidated;
- back visible native text: `26`;
- back same-parent text collisions: `0`;
- back 18px text safe-area risks: `0`;
- front visible native text: `13`;
- front same-parent text collisions: `0`;
- front 18px text safe-area risks: `0`.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted: `2014:2 / PREFERRED / V6_OUTER_HD_DENSER_BACK_CHRONOLOGY_2026_08_20`
- adopted back: `2014:3`
- source/rollback: `2010:2 / ROLLBACK / V6_OUTER_HB_JAPANESE_READER_COPY_MINOR_BEATS_2026_08_20`
- rejected background phrase: `2015:2`, hidden
- functional major-beat rules: `2017:2 / 2017:3 / 2017:4`
- back dominant image hash unchanged: `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- newly generated assets: `0`
- new Drive saves: `0`
- new external binary placements: `0`
- new image hashes: `0`

## Adopted / rejected / blocked status

- HD chronology treatment: `ADOPTED / VERIFIED_LOCAL`.
- large low-opacity background phrase: `REJECTED` because it caused semantic text overlaps.
- direct TEXT width assignment method: `REJECTED / API CONTRACT FAILURE`; replacement method is `resize()`.

## What must remain Rurubu-specific

Do not transfer the exact magenta/cyan/yellow rules, ordinal sizes, chronology coordinates, travel-object photograph, copy, `WEDDING` ending, or Rurubu-like Japanese travel-magazine grammar.

## Cross-item applicability hypothesis

When a print artifact has a correct major/minor information hierarchy but still reads as an unfinished sparse study, another item may independently test whether a few important beats can carry short reader-facing native captions and a minimal functional binding mark before adding cards, repeated photography, or large decorative fields.

The transferable method is **semantic editorial responsibility + collision-safe native hierarchy**, not the Rurubu visual treatment.

## Next receiving-item experiment

On a materially different wedding print artifact, select one repeated-information region that is structurally correct but visually under-responsible. Compare:

1. current major/minor hierarchy;
2. major beats with one short reader-facing native support line and a proven binding mark;

Then evaluate at whole-item, reading, actual-size, long-copy/safe-area where relevant. Reject the treatment if the support copy becomes filler or the binding mark has no function.
