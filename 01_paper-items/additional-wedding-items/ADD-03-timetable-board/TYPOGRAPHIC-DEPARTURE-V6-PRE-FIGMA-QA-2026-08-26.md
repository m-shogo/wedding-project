# ADD-03 Timetable — Typographic Departure V6 Pre-Figma QA

Status: `TESTED_LOCAL / PRE_FIGMA / CURRENT_UNCHANGED`
Date: 2026-08-26
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Why V6 exists

Current production `DAY BROADSHEET` remains structurally strong and readable, but the reopened visual program asks whether the item can carry more travel/wedding energy without falling into route-diagram, modular-card, or generic AI-shape grammar.

Earlier clean-room experiments established two useful failures:

- route-driven directions can over-explain chronology and read as infographic/wayfinding instead of wedding editorial;
- repeated folds/modules can turn the timetable into section UI.

The immediately preceding V5 `DAYLIGHT SWEEP` reduced those problems, but a composition proxy with representative timetable text showed a new risk: the large paired coral/mango waves became the dominant reading before the typography and could be read as generic event-poster decoration rather than item-specific editorial structure.

V6 therefore method-switches away from broad waves and event-by-event graphics. It deliberately gives native typography more authorship.

## External professional-design input used

Only general design principles were consumed; no external layout was copied.

- Pentagram / London Fashion Week SS18: a linking graphic device can carry energy across an event identity, but it should derive from the creative concept rather than become repeated UI modules. Source: https://www.pentagram.com/work/london-fashion-week-ss18
- AIGA Editorial Infographics: information design should transform information into a coherent data-driven story; for this item, that means chronology must remain readable rather than being visually over-explained by a route diagram. Source: https://teachingresource.aiga.org/project/editorial-infographics/
- Pentagram / London Design Festival 2020: one recognisable identity gesture can expand to fill available space; applied here as a single departure gesture rather than many small travel icons. Source: https://www.pentagram.com/work/london-design-festival-2020

## Clean-room facts / constraints used

No production layout, old V2/V3 composition, ornamental vector, crop, badge, icon, or generated asset was reused as a design source.

Only these non-visual requirements were carried forward:

- A2 canvas `1400×1980` for the initial comparison;
- confirmed date/event chronology remains native Figma text during assembly;
- variable schedule copy must remain editable and must survive realistic long-copy stress;
- old Current remains retained for final comparison only.

## V6 direction — `TYPOGRAPHIC DEPARTURE`

Asset:

- `assets/typographic-departure-v6-fixed-art.svg`
- editable SVG `1400×1980`
- no baked names, dates, times, venue facts, QR, guest data, or final copy

Art-direction intent:

1. Native Japanese typography and time hierarchy should be the main event.
2. One upper cut-paper departure gesture provides excitement without encoding individual events.
3. The left binding cue is deliberately short rather than a full-height sidebar, to reduce web/UI reading.
4. A single lower closing counterweight gives page completion without building a route, card stack, or three-section fold system.
5. No airplane, gate, barcode, passport stamp, fake ticket credential, badge, decorative English, gradient, shadow, or repeated rounded card is used.

Palette roles remain limited and functional:

- warm cream paper = primary editorial field;
- coral + mango = celebratory departure energy;
- cobalt = print/binding counterweight;
- turquoise = secondary accent only.

These exact colors are item-specific and must not become a suite template.

## Hybrid authoring split

- confirmed/variable title, date, time, event name, guide copy, closing copy: **Figma native text**;
- V6 fixed departure/binding planes: **editable SVG**;
- replaceable photo/image role: none diagnosed;
- generated/composed raster: not required at this stage;
- IMAGE fill target: `0`.

Image generation is intentionally not used because the present bottleneck is composition and editorial rhythm, not missing photography/illustration/texture.

## Pre-Figma comparison judgement

### V5 `DAYLIGHT SWEEP`

State: `SUPERSEDED_AS_PRIMARY_PRE_FIGMA_CANDIDATE`

Reason:

- it successfully avoids event-by-event route logic;
- however, the paired broad waves occupy too much authorship in the representative composition proxy;
- the result risks a generic festival/event poster where the schedule typography feels placed onto a background rather than designed as the primary editorial system.

V5 remains preserved and is not deleted.

### V6 `TYPOGRAPHIC DEPARTURE`

State: `TESTED_LOCAL / PRE_FIGMA`

Expected improvement:

- stronger editorial hierarchy because fixed art occupies less semantic territory;
- travel/wedding energy concentrated in one gesture rather than scattered motifs;
- lower risk of route-infographic or modular-UI reading;
- more room for optical Japanese typography and long-copy adjustment.

Regression risks:

- upper cut-paper gesture could still look like generic event branding if native typography is too small or too detached;
- short left binding cue could look arbitrary if it does not visually bind title/date at whole-item scale;
- lower cobalt/turquoise counterweight could read as a decorative corner instead of closure if it becomes too prominent;
- a typography-led solution can become falsely “premium” through emptiness if the information density and rhythm are not actively designed.

## Required Figma gate

Do not promote from SVG preview/proxy alone.

When safe Figma authoring is available:

1. create a **blank A2 frame**; do not duplicate Current or an earlier clean-room candidate;
2. place/import V6 fixed art as editable SVG;
3. re-author semantic native text from verified facts/placeholders only;
4. do not look at Current production while composing V6;
5. inspect V6 at:
   - whole-item / ~500 px,
   - reading / ~1000 px,
   - actual `1400×1980`;
6. run realistic long-copy stress after any material copy-position change;
7. verify all semantic text stays native with `textAutoResize=HEIGHT`, no outside text, and no accidental flatten/raster;
8. verify the SVG remains an editable vector tree;
9. reject V6 if the cut-paper gesture reads as generic festival branding, if the left binding cue looks like a UI sidebar, or if typography is not the first/second read at whole scale;
10. only after V6 is mature, compare against retained `DAY BROADSHEET` and promote only if V6 clearly wins the reopened sellable-visual gate.

## Learning state

Visible problem: V5 fixed art can dominate the timetable as generic event-poster atmosphere even after route/module failures were removed.

Root-cause hypothesis: replacing over-explanatory travel graphics with a large non-semantic wave is not enough; the fixed-art gesture must leave enough authorship for typography and chronology to make the artifact specifically a timetable.

Bounded response: create a new blank-origin fixed-art direction with one restrained departure gesture and explicitly typography-led assembly.

State: `TESTED_LOCAL / PRE_FIGMA`.

Do not promote this to a cross-item rule until a real Figma comparison verifies the benefit. Do not transfer V6 geometry, colors, cut-paper planes, or timetable composition to another item.

## Current / Drive / production status

- Current production: unchanged; existing Sellable/Design QA evidence remains authoritative until a mature clean-room candidate actually beats it.
- Drive: no write; V6 is not yet an adopted/serious Figma comparison master.
- Image generation: `0`.
- Rurubu scope: not inspected or modified.
