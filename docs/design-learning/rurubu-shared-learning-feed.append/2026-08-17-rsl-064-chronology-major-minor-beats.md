# RSL-064 — Chronology sequence can stay native while visual emphasis becomes unequal

Source scope/item: Rurubu WEDDING / V6 chronology

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

CI had already removed large number containers, but 01—06 still carried too much equal visual weight. At whole-page scale the chronology continued to read as a designed timeline first and a travel-magazine photo story second.

## Root-cause hypothesis

Sequence and emphasis are different jobs. Native dates/titles can preserve order while visual emphasis is concentrated on only the events that deserve major photographic treatment. Secondary events do not need equal numeric markers.

## Bounded test

Rollback-safe CJ `1554:97` duplicated CI. On its chronology page `1554:122`:

- Event 2 / 4 numeric markers were hidden;
- Event 1 / 3 / 5 / 6 markers became small colored metadata rather than dominant display numbers;
- Event 1 / 3 / 5 retained stronger native titles and photo beats;
- 2 / 4 stayed native text bridge events;
- WEDDING remained the terminal beat;
- no image source/hash, provenance, replaceable-photo contract, Story layout, or V7 state changed.

## Expected improvement

Reduce timeline/UI reading and make the page feel like a travel feature where chronology is discovered through photographs and varied editorial hierarchy.

## Regression risk

Over-subtraction can make event order ambiguous; aggressive title scale can collide with dates/copy or consume safe area; color can become decoration if applied to every item.

## Evidence

Initial CJ failed with four text collisions and was not promoted until fixed.

Final CJ:

- 500px whole spread: PASS;
- 1200px reading: PASS;
- actual-size chronology 794×1123: PASS;
- visible native text 28;
- visible IMAGE fills 5 (4 replaceable photos + 1 bounded composed texture);
- text collision 0;
- 18px safe-area risk 0;
- text outside page 0;
- new generated assets 0;
- new Drive saves 0;
- image hash changes 0.

Figma evidence: preferred CJ `1554:97`, chronology `1554:122`; CI `1551:2` retained as hidden rollback.

Drive evidence: V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` re-read live.

GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CK-CJ-CHRONOLOGY-MAGAZINE-BEATS-QA-2026-08-17.md`.

## What must remain Rurubu-specific

Exact event numbering, title wording, magenta/cyan/yellow accents, photo placement, Hawaii/travel-magazine grammar, typography scale, and WEDDING terminal treatment.

## Cross-item applicability hypothesis

For another print artifact with an ordered sequence, independently test whether native order can remain explicit while major/minor visual emphasis becomes unequal. Do not transfer the Rurubu layout or colors. Preserve all repeated markers when they perform a real navigation, physical, or scanning function.
