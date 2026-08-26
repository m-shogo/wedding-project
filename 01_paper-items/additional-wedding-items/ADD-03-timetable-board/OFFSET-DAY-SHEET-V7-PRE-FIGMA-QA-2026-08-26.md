# ADD-03 Timetable — Offset Day Sheet V7 Pre-Figma QA

Status: `SUPERSEDED / REJECTED_PRE_FIGMA / CURRENT_UNCHANGED`
Date: 2026-08-26
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

> **Superseded on 2026-08-26:** A later proxy-vs-live-Current review rejected V7 before Figma assembly because the offset backing sheets/folded corners read as a generic layered stationery/poster object and weakened timetable chronology at thumbnail scale. Canonical rejection evidence: `OFFSET-DAY-SHEET-V7-PROXY-VS-CURRENT-REJECTION-2026-08-26.md`. Retained Current `DAY BROADSHEET` remains authoritative.

## Live authority recheck

- original run-start latest `main`: `eb6beedf129d2c49c8f96538ddf0e0be33cb6b53`
- original latest `main` immediately before this evidence write: `217b919d29b4898d564dbad9710cb2d5fa90cf81`
- exact Figma file key: `woFUHUqZcvNkih8o42xeH4`
- retained Current A2: `14:2 / DAY BROADSHEET`
- exact Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`
- Rurubu item-specific scope was not searched, read, written, or used as a visual source.

## Why another method switch was justified

The retained Current was re-rendered live at whole-item scale (~500 px). It remains readable and structurally strong, but the full-height cobalt left field plus three evenly separated event rows still reads more like a formal timetable/broadside than a joyful physical wedding-day artifact.

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

The typography was intended to carry chronology. The fixed art only established physical-paper ownership and emotional tone.

## Original representative proxy judgement

A local non-production proxy was built from the new V7 fixed art plus representative native-text-sized masses. The proxy was not treated as Figma evidence or a production artifact; it was used only to decide whether V7 deserved the next real Figma gate.

Originally observed strengths:

- the artifact read more clearly as one physical paper object than V6;
- the navy/lagoon layers created travel-like movement without explaining the chronology;
- there was no full-height UI/sidebar element inside the primary cream sheet;
- the upper folded corner supplied pop/celebration without a repeated suite-wide circle/capsule language;
- staggered time positions could be authored natively without fixed-art event boxes.

Originally observed risks:

- if the backing sheets dominated at 500 px, the design could become a generic layered-paper poster;
- the tilted primary sheet could reduce trim/safe-area credibility;
- the small registration accent could read as an unexplained internal print mark rather than an intentional editorial cue;
- the composition still needed active native Japanese typography; empty space alone could not be mistaken for premium quality;
- V7 could not inherit proxy text positions mechanically.

The original decision was `SERIOUS_PRE_FIGMA_CANDIDATE`.

## Superseding proxy-vs-Current result

A later run re-rendered live Current `14:2 / DAY BROADSHEET` and compared it against a new local V7 composition proxy using only verified timetable facts and semantic placeholders.

That comparison confirmed the risk above rather than resolving it:

- at whole-item scale the cobalt/lagoon backing sheets and folded corners dominated the silhouette;
- the object read as generic layered stationery/poster branding before it read as an item-specific timetable;
- large time/event hierarchy became weaker than Current at thumbnail scale;
- the physical-paper metaphor added style, but not enough timetable-specific semantic value to compensate for lost chronology authority.

Therefore V7 was rejected **before** Figma assembly. No production mutation, Drive write, or asset adoption occurred.

Canonical rejection evidence:

- `OFFSET-DAY-SHEET-V7-PROXY-VS-CURRENT-REJECTION-2026-08-26.md`
- rejection commit: `d23dd6b5b9bc9bbbd10136e27d90c8853e3f5926`

## Learning state

Original hypothesis: a single offset physical sheet could provide item identity while native typography carried chronology.

Final state: `TESTED_LOCAL_PRE_FIGMA → REJECTED / SUPERSEDED`.

Reason: the fixed-art physical metaphor was legitimate but too generic; it carried more visual identity than the timetable semantics and did not beat the retained Current.

Do not promote this to a cross-item rule. Do not transfer the exact offset-sheet geometry, palette, folded corner, or timetable composition to another item.

## Production / Drive / image status

- Current production: unchanged; `DAY BROADSHEET` remains authoritative and retains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`;
- V7 SVG: retained only as rejected study/history;
- Drive write: `0`;
- image generation: `0`;
- Figma production mutation: `0`;
- do not create another cosmetic V7/V8 layered-paper variation without materially different evidence or capability.
