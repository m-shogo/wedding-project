# Rurubu WEDDING V7 — Six-role Study Completion QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
V6 control: `JC + IX + JB + IZ + IT + JA` unchanged
Decision: `6_OF_6_STUDY_COMPLETE / NOT_PREFERRED / NOT_PRINT_READY`

## Six comparable roles now exist

| Role | Root | Native text | IMAGE | Text intersections | 18 px safe risks | Visual decision |
|---|---|---:|---:|---:|---:|---|
| Outer/Cover | `2153:38` | 21 | 3 | 0 | 0 | NOT_PREFERRED |
| Profile+Q&A | `2153:67` | 25 | 2 | 0 | 0 | NOT_PREFERRED |
| Story+Chronology | `2155:23` | 31 | 1 | 0 | 0 | CONTINUE_DIRECTION |
| Memory Spots/Guide | `2156:54` | 22 | 1 | 0 | 0 | NOT_PREFERRED |
| Cafe+Table/Food | `2156:84` | 20 | 1 | 0 | 0 | NOT_PREFERRED |
| 1DAY Plan/Model Course | `2156:112` | 25 | 1 | 0 | 0 | CONTINUE_DIRECTION |

All roots were built from blank frames; no V6 frame was duplicated.

## Method switch after the first generated-asset failure

The first asset family (lagoon/flatlay/beach) successfully reached Figma through the verified in-file raster transport fallback but looked too much like simplified clip-art.

The remaining three spreads therefore did **not** repeat the same faux-photographic geometry. They switched to explicit information/illustration roles:

- Memory: semantic guide map hash `745fa63d004af783f76f82ffd9ce16bb7d2ee37e`;
- Cafe/Food: field-note / menu-object composition hash `86735a04b23550bbdf69a0a490522f3aede5f259`;
- 1DAY: route/timetable diagram hash `93288eca978aaf004c167b6012a2e282a8cd1d41`.

This is a real design-method change caused by prior failure learning, not a cosmetic retry.

## Screenshot QA

### 500 px whole spread

All six spreads preserve primary headline/number hierarchy at thumbnail-family scale. The six pages no longer look like copies of one repeated card template.

### Reading scale

The first three core studies were inspected at 1400 px. The remaining three were inspected at 500 px and actual-size representatives; their typographic hierarchy and generated illustration roles remain legible.

### Actual-size representative pages

- Front cover `2153:40` — `794×1123`: headline and lower editorial band remain legible; visual hero craft remains too synthetic.
- Q&A `2153:69` — `794×1123`: Japanese line breaks and numeral/text separation PASS after collision repair.
- Story `2155:24` — `794×1123`: semantic route-map role reads clearly; still visually schematic.
- Memory `2156:55` — `794×1123`: map markers and native labels read, but the page is too sparse for final travel-guide density.
- Cafe `2156:85` — `794×1123`: material/field-note idea reads, but illustration detail is below professional food-magazine standard.
- 1DAY `2156:113` — `794×1123`: route diagram is clear and functionally justified; still lacks destination-specific richness.

## Professional six-view critique

### Art director

PASS as a coherent art-direction prototype: V7 has a clear high-energy typographic voice and a real idea. FAIL for finished image craft.

### Editorial designer

PASS for page-role differentiation and reading order. The set demonstrates theme + variation rather than one repeated template.

### Book designer

PARTIAL PASS: sequence now alternates cover/profile/story/guide/food/route roles, but the overall pacing remains more prototype-like than publication-finished.

### Typographer

PASS structurally at current dummy-copy level: Japanese hierarchy, line breaks and actual-size readability survive. Real-content stress remains a future gate.

### Photo/illustration editor

FAIL for preferred promotion. The runtime-generated art is not yet specific, rich or photographic enough. Semantic diagrams are better justified than faux photography but cannot replace final art direction by themselves.

### Print designer

PASS only for current structural safe-area readback. No printer template, bleed/trim/fold contract, PDF preflight or physical proof has been verified.

## Anti-AI verdict

Avoided:

- repeated equal cards;
- generic dashboard grid as publication grammar;
- fake UI controls;
- decorative English without a role;
- V6 layout/image copying.

Still present as a risk:

- geometric simplification can look like generated placeholder art;
- sparse semantic diagrams can drift toward wireframe/prototype appearance;
- a strong type system cannot compensate indefinitely for weak art/photography.

## Drive evidence

V7 root: `1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x`.

Additional master counterparts saved for the method-switched roles:

- guide map `1h4YCWgddoymmAl7tc2_PxmvrRyF7VxVp`;
- food field note `13lhDTUgOADqLFgKq25ZqLkZbRhiSWON6`;
- 1DAY route `1Mdo5oZF29VIH7ybc5lfLcOSkNzZ_cXI0`.

As with the first four masters, exact byte identity with Figma in-file raster exports is not claimed.

## Decision

V7 now satisfies the **six comparable role-study requirement**, so future work may begin a materially different V8. V7 is not promoted as the winner and must remain available as comparison evidence.
