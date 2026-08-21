# るるぶWEDDING V8 — Memory/Guide R article-owned type mass QA

Date: 2026-08-22
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Previous current: Memory N `2189:2`
Candidate/adopted current: Memory R `2199:2`

## Visible problem

Memory N had already removed weak generated abstract imagery and equal-row guide rhythm, but its left page still depended on a very large `温度` set at roughly 7% opacity as a pale watermark. At thumbnail and reading scale this produced two problems:

1. the article-owned prose remained visually subordinate even though it carried the actual memory content;
2. the pale oversized word risked reading as a generic luxury/editorial watermark rather than a defended editorial voice.

The page therefore still had a trace of AI/template behavior: large empty field + low-opacity display word used to manufacture sophistication.

## New professional research used

This run deliberately used sources not used for the immediately preceding Profile/Story changes.

- Eye on Design / AIGA, `Making Rules, Breaking Rules: The Art of Magazine Typography`: magazine typography can carry structural and image-like editorial force, but it needs a coherent underlying system and content relationship rather than decoration for its own sake.
- magCulture, `Avaunt #1`: a clear underlying grid and hierarchy can coexist with deliberate shifts in pace, including image-heavy and quieter sections.
- magCulture, Chris Clarke / The Guardian Saturday: flatplanning, breathing space and density should be designed together so quiet pages are not simply empty pages.

These remain research observations, not project rules and not copied layouts.

## Local hypothesis

When an image-light editorial page needs visual mass, article-owned native text should be tested as the primary visual material before relying on a low-opacity oversized keyword or decorative placeholder.

## Bounded test

A rollback-safe duplicate of Memory N was created as Memory R.

Changed only the left Memory essay field:

- original `M_CAP2` body was preserved but hidden in the candidate;
- the existing first three sensory lines were promoted into a larger native `M_SENSORY_SCORE` (`28 px`, `44 px` leading):
  - `海辺を歩いた朝。`
  - `店を探して曲がった角。`
  - `夕方の光と、食卓の声。`
- the existing reflective close became a separate smaller native `M_REFLECTION` (`17 px`, `31 px` leading):
  - `場所の名前より先に、`
  - `その日の温度が戻ってくる。`
- `MEMORY_SEMANTIC_ANCHOR / 温度` changed from `128 px / opacity ≈0.07` to `76 px / opacity 1.0` and became a real rust-colored editorial anchor rather than a watermark;
- redundant `MEMORY_SEMANTIC_NOTE` was hidden;
- right Guide/Index page was unchanged;
- no new image, card, badge, shadow, gradient, decorative English, invented fact or V6/V7 asset was added.

## Figma evidence

- Memory R current root: `2199:2`
- new `M_SENSORY_SCORE`: `2199:33`
- new `M_REFLECTION`: `2199:34`
- active semantic anchor: `2199:31`
- hidden original body: `2199:9`
- hidden redundant semantic note: `2199:32`
- previous Memory N `2189:2`: hidden rollback after promotion

## Three-scale visual QA

- whole spread / 500 px: PASS — sensory copy becomes the first secondary read after the headline; the left page no longer depends on a faded watermark for visual interest.
- reading / 1400 px: PASS — the three sensory lines read as a deliberate editorial block, reflection remains clearly subordinate, and `温度` is an explicit close rather than a ghosted background effect.
- actual size / 1587×1123: PASS — line endings remain natural, hierarchy is legible, fold relationship remains clear and no element becomes visually muddy.

## Structural QA

- visible native text: `22`
- IMAGE fill nodes: `0`
- text intersections: `0`
- 18 px safe-area risks: `0`
- whole-page flattening: `0`
- new V6/V7 image reuse: `0`

## Professional critique

- Art director: PASS — Memory now has a clearer editorial idea: memory is carried by remembered sensory fragments, not by a generic image placeholder or pale typographic effect.
- Editorial designer: PASS — headline → waterfront note → sensory score → reflection → semantic close creates differentiated reading roles.
- Book designer: PASS — the spread remains intentionally quiet, but the left page has enough internal scale contrast to avoid wireframe emptiness.
- Typographer: PASS — article-owned Japanese copy carries the visual mass; semantic line breaks remain natural at all three scales.
- Photo editor: NOT_APPLICABLE for Current — no image role is claimed rather than inserting unrelated imagery.
- Print designer: PASS for dummy-design scale/safe-area only; this does not replace final printer-template/preflight/physical-proof gates.

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new Figma IMAGE placement: `0`
- V6/V7 image reuse: `0`
- V8 Drive authority re-read: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo / RURUBU_V8_EDITORIAL_MONOGRAPH_2026-08-21`

This run does not claim generation → Drive → Figma closure. No approval-free image-generation path was available, and the design was not padded with unrelated imagery merely to satisfy an image quota.

## Learning outcome

`RSL-198 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Fingerprint:
`F-RSL-198-LOW-OPACITY-DISPLAY-TYPE-SIMULATES-EDITORIAL-MASS-WITHOUT-CARRYING-CONTENT`

Transferable hypothesis: on image-light print/editorial pages, test whether article-owned native text can create the required visual mass and pacing before adding a low-opacity giant keyword, watermark, decorative English or fake image field.

Must remain Rurubu-specific: exact `温度` word, rust/navy palette, Memory content, coordinates, type sizes and Guide/Index layout.

## Status

`MEMORY_R_CURRENT / THREE_SCALE_QA_PASS / STRUCTURE_QA_PASS / ARTICLE_OWNED_TYPE_MASS_VERIFIED_LOCAL / N_HIDDEN_ROLLBACK / NOT_GLOBAL_WINNER / NOT_PRINT_READY`
