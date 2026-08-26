# ADD-03 Timetable — Offset Day Sheet V7 Pre-Figma QA

Status: `TESTED_LOCAL / PRE_FIGMA / CURRENT_UNCHANGED`
Date: 2026-08-26
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority recheck

- run-start latest `main`: `eb6beedf129d2c49c8f96538ddf0e0be33cb6b53`
- latest `main` immediately before this evidence write: `217b919d29b4898d564dbad9710cb2d5fa90cf81`
- exact Figma file key: `woFUHUqZcvNkih8o42xeH4`
- retained Current A2: `14:2 / DAY BROADSHEET`
- exact Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`
- Rurubu item-specific scope was not searched, read, written, or used as a visual source.

## Why another method switch was justified

The latest retained Current was re-rendered live at whole-item scale (~500 px). It remains readable and structurally strong, but the full-height cobalt left field plus three evenly separated event rows still reads more like a formal timetable/broadside than a joyful physical wedding-day artifact.

V6 `TYPOGRAPHIC DEPARTURE` had already method-switched away from route diagrams and modular event cards. Before opening Figma, a representative local composition proxy was created from the V6 fixed art plus factual/semantic timetable text mass only. That proxy exposed a different weakness: the upper coral/mango gesture and lower cobalt/turquoise counterweight still leave a very large neutral center and can read as generic event branding placed around the timetable rather than a specific physical-paper idea.

Per the clean-room rule, V7 was therefore started from a blank 1400×1980 canvas using only factual/physical constraints. It did not copy Current, V5, V6, old rails, old event geometry, old SVG paths, or previous decorative assets.

## V7 direction — `OFFSET DAY SHEET`

Asset:

- `assets/offset-day-sheet-v7-fixed-art.svg`
- editable SVG `1400×1980`
- no baked names, dates, times, venue facts, guest data, QR, directions, or reader-facing wording

Art-direction idea:

**Treat the timetable as one physical day-sheet carried through the wedding, not as a route diagram and not as a stack of event modules.**

The fixed art contains only:

1. one deep-cobalt backing sheet;
2. one offset lagoon backing sheet;
3. one large warm-cream primary day sheet with intentionally skewed edges;
4. one coral + mango folded corner for celebratory energy;
5. one short print-registration accent;
6. one small coral lower fold as a closing counterweight.

There are no event nodes, route lines, repeated cards, rounded modules, fake flight data, plane icons, passport stamps, badge labels, decorative English, gradients, shadows, or generated raster imagery.

## Hybrid authoring split

- title / date / time / event names / guide copy / closing copy: **Figma native text**;
- offset sheets / folded corner / one registration accent: **editable SVG fixed art**;
- replaceable photography: none diagnosed;
- generated/composed raster: not required;
- target IMAGE fills: `0`.

The typography must carry chronology. The fixed art only establishes physical-paper ownership and emotional tone.

## Representative proxy judgement

A local non-production proxy was built from the new V7 fixed art plus representative native-text-sized masses. The proxy is not treated as Figma evidence or a production artifact; it was used only to decide whether V7 deserves the next real Figma gate.

Observed strengths:

- the artifact reads more clearly as one physical paper object than V6;
- the navy/lagoon layers create travel-like movement without explaining the chronology;
- there is no full-height UI/sidebar element inside the primary cream sheet;
- the upper folded corner supplies pop/celebration without a repeated suite-wide circle/capsule language;
- staggered time positions can be authored natively without fixed-art event boxes.

Observed risks:

- if the backing sheets dominate at 500 px, the design could become a generic layered-paper poster;
- the tilted primary sheet must not reduce trim/safe-area credibility;
- the small registration accent must be removed if it reads as an unexplained internal print mark rather than an intentional editorial cue;
- the composition still needs active native Japanese typography; empty space alone must not be mistaken for premium quality;
- V7 must not inherit the proxy text positions mechanically. Figma typography must be freshly composed on the blank V7 frame.

Decision: `SERIOUS_PRE_FIGMA_CANDIDATE`, not promoted.

## Required Figma gate

When safe authoring is available:

1. create a **blank A2 1400×1980 frame**; do not duplicate Current/V5/V6;
2. import `offset-day-sheet-v7-fixed-art.svg` as editable vectors;
3. re-enter only verified timetable facts and semantic placeholders as native text;
4. do not visually reference Current while composing V7;
5. make Japanese headline + time hierarchy the first/second read;
6. inspect at ~500 px, ~1000 px, and native 1400×1980;
7. run realistic long-copy and 14:40–15:00 placeholder stress;
8. verify all semantic text is native and auto-height, no outside text, no accidental rasterization, and SVG vectors remain editable;
9. reject V7 if it reads as layered-paper fashion branding, if the backing layers dominate the information, if the short registration accent looks meaningless, or if actual-size print/safe-area credibility is worse than Current;
10. only after V7 is mature, compare against retained `DAY BROADSHEET`; promote only if V7 clearly wins the reopened sellable gate.

## Learning state

Visible problem: after route/module failures were removed, a restrained fixed-art solution can still become generic event branding or false-premium emptiness around otherwise correct schedule typography.

Root-cause hypothesis: the fixed art needs an item-specific **physical artifact role**, not just less decoration. For a timetable, one physical day-sheet can provide identity while leaving chronology to native type.

Bounded test: replace route/wave/module metaphors with a single offset physical sheet system and keep all event semantics native.

Status: `TESTED_LOCAL / PRE_FIGMA`.

Do not promote this to a cross-item rule until a real Figma three-scale comparison verifies the improvement. Do not transfer the exact offset-sheet geometry, palette, folded corner, or timetable composition to another item.

## Production / Drive / image status

- Current production: unchanged and retained as the authoritative live production until V7 proves stronger in Figma.
- Drive: live authority verified; write `0` because V7 is still pre-Figma.
- Image generation: `0`; the diagnosed bottleneck is editorial composition/physical-paper identity, not missing photography or illustration.
- Figma production mutation: `0`; the required `figma-use` guidance resource was not readable in this connector environment, so the write contract was not bypassed.
