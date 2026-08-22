# Rurubu WEDDING V8 AQ / AR editorial QA — 2026-08-22

## Scope

Rurubu WEDDING only. V6 control `JC + IX + JB + IZ + IT + JA` and V7 comparison set remained untouched.

Live Figma authority:
- file `bfM0d4c9dCeBv5pCkJ3TNM`
- page `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

Drive authority re-read before work:
- folder `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo / RURUBU_V8_EDITORIAL_MONOGRAPH_2026-08-21`
- no new master added

## Fresh professional research used as hypotheses

1. IDEA No.326 / Takashi Kono book and magazine design: the work is framed through both modernity and locality. Applied here as a test that travel-memory pages should privilege concrete, place/sensation-owned editorial material over generic abstract design signs.
2. magCulture review of the New York Times Magazine travel issue: strong content is presented in a clear editorial structure with scale variation and careful details; the design does not need redundant furniture when content and hierarchy already carry the structure. Applied here as a test of whether a data-bound schedule still needs explicit timeline markers when time spacing and labels already encode the information.

These sources were used for decision principles only. No literal layouts, palette, typography, assets, or compositions were copied.

## AQ — Memory / Guide

Previous current: AM `2238:73`.

### Observed defect

The left Memory page had already removed fake imagery and low-opacity pseudo-editorial type, but it still duplicated its abstract concept: the sentence `その日の温度が戻ってくる。` and a separate large standalone `温度` both performed the same semantic job. The large anchor had content ownership, but the duplication made the page feel designed around a concept token rather than around the actual remembered scene.

### Bounded test

Rollback-safe duplicate created as AQ `2256:2`.

- hid `MEMORY_SEMANTIC_ANCHOR / 温度`
- promoted the concrete sensory sequence `海辺を歩いた朝。 / 店を探して曲がった角。 / 夕方の光と、食卓の声。` from 28px to 34px with 52px leading
- retained the reflective copy `場所の名前より先に、その日の温度が戻ってくる。` as supporting text
- did not change the Guide page, add imagery, add decorative English, add cards, or copy V6/V7 layout language

### Result

AQ promoted to current. AM preserved as hidden rollback.

QA:
- whole-item / 500px: PASS
- reading / 1000px: PASS
- actual-size / 1587×1123: PASS
- visible native text: 21
- IMAGE: 0
- text intersections: 0
- 18px safe risks: 0
- parent page: `2052:2`
- accidental single-character wrap: 0 observed

Judgment: the page now derives its visual mass from concrete remembered moments instead of repeating an abstract keyword. It remains intentionally quiet and does not claim destination-photography parity with V6.

## AR — 1DAY / Model Course

Previous current: AO `2249:2`.

### Observed defect

The right page correctly encoded the real sequence `10:00 / 11:40 / 15:10 / 18:30` with y-spacing that reflected elapsed time, but also used a vertical axis and four circular markers. Because the spacing and labels already carried the data, the line-and-dot layer behaved increasingly like interface/timeline furniture rather than necessary editorial information.

### Bounded test

Rollback-safe duplicate created as AR `2257:2`.

- preserved all four exact times, actions, and y positions
- hid `TIME_AXIS / 10:00-18:30`
- hid `TIME_MARK_0..3`
- enlarged native time labels to 22px
- strengthened action labels while preserving the original data-bound spacing
- did not invent durations, places, routes, or new data

### Result

AR promoted to current. AO preserved as hidden rollback.

QA:
- whole-item / 500px: PASS
- reading / 1000px: PASS
- actual-size / 1587×1123: PASS
- visible native text: 21
- IMAGE: 0
- text intersections: 0
- 18px safe risks: 0
- parent page: `2052:2`
- exact data retained: `10:00 海辺 / 11:40 カフェ / 15:10 街歩き / 18:30 食卓`

Judgment: exact time spacing remains legible without redundant UI-like marks. The right page now reads more like editorial information design and less like a generic timeline component.

## Asset truth

- new image-model generation: 0
- new Drive masters: 0
- new production Figma image placements: 0
- V6/V7 image reuse: 0
- known unchanged RSL-208 upload-submit failure route was not retried without a material environment change

## Status

`AQ + AR = VERIFIED_LOCAL / THREE_SCALE_QA_PASS / STRUCTURAL_QA_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
