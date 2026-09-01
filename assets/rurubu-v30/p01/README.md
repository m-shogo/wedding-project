# V30 P01 production assets

Status: `P01_FIGMA_COMPLETE_MAGAZINE_REBUILD / DUMMY_PHOTOS`

P01 is rebuilt page-by-page from the current V30 rules. Canva, Canva templates, Canva-like layouts, old V30 scrapbook assets, generated people, packed production sheets and flattened editable masters are not used.

## Current page role

- Cover: `るるぶ WEDDING`
- One dominant hero photo and one overlapping support photo
- Native/editable facts: `SHOGO & SHIORI`, `2026.10.24`
- Native/editable cover copy: `ふたりの旅、はじまります`, `旅の思い出`, `ふたりの日常`
- Figma page frame: `3535:7`

## Adopted generated assets

Each independently positionable editorial object is stored and placed as one independent PNG.

1. `V30_P01_BACKGROUND_MAGAZINE_FIELD_PRODUCTION_RGBA.png`
   - opaque page environment/base
   - Drive production ID: `1t9upAIxIhaPPNHibYWHHPoTbxfKmX-Jo`
   - Figma node: `3573:2`
2. `V30_P01_MASTHEAD_CLOUD_*`
   - one text-free masthead backing
   - keyed source Drive ID: `1cXKYWj-wOR1c19xTsIoNGeZAf13odjll`
   - transparent production Drive ID: `1a22gN2uUpOoDkyAJMY61zDXMr-K-gRq-`
   - Figma node: `3573:4`
3. `V30_P01_DATE_BURST_*`
   - one text-free date backing
   - keyed source Drive ID: `1A_dnC75UC9juBDxlxjdB2mhuF8QFGKTP`
   - transparent production Drive ID: `1sHSo12Z5MqPZS1o6saV2f4hj8l0BRGdT`
   - Figma node: `3613:2`

The former scrapbook background, paper photo frames, and names/date paper were removed from Git, Drive, and the live Figma page.

## Replaceable photo slots

- Hero slot: frame `3574:2`, image child `3574:3`
- Support slot: frame `3574:5`, image child `3574:6`
- Both slot frames use `clipsContent = true`.
- Photos remain separate from all generated backings and native text.
- Both slots passed an actual cross-swap test after the magazine rebuild without spill or frame reconstruction.

Dummy/reference photos remain temporary non-person images:

- Hero dummy Drive ID: `1f0N_tkUpV2YAmrLMMjGU8T3p_7eJfY0B`
- Support dummy Drive ID: `1dfmbAlacvhZgdCkFwsnUNyGoI5409dBg`

## Generation and alpha QA

- Isolated production parts were generated as PNG on solid key backgrounds.
- Python removed the edge-connected key background.
- Production parts are true PNG/RGBA and preserve natural aspect ratios.
- Light/dark alpha QA passed: Drive ID `1mIdJjYF7N-kto8SC1X26L9Nq_AnzOyI8`.
- No generated person, friend, couple, or dog is present.

## Visual QA / current best

- Current best: Drive ID `1sHh1JdC3mBLonFVieYbvt02XWS69sncY`
- Final 2x export: `V30_P01_FIGMA_COMPLETE_MAGAZINE_REBUILD_2X.png`
  - Drive ID: `1Dvs0Xl7hLxMutR0AjQiUgVq74uDcea3y`
  - `1118 x 1588`, PNG/RGBA, alpha channel fully opaque
- Grayscale QA: Drive ID `1gxmY0kZUutBCwADN3SQNZT1t2cMvspo6`
- Thumbnail QA: Drive ID `1iyFwZuaw2u6_V8qKdxCgi2VlcyUBMMEr`
- Photo replacement QA: Drive ID `1XrlrJCPBMW3NelJ6I7k3eDntlOwT6xs3`
- Before/after comparison: Drive ID `1OPL_GnLcU2TFlhWWVZg6QsIgN2maQwD1`
- Visible placeholder/stale-marker scan: zero hits.
- Hidden rejected-asset layer scan: zero hits.

## Production boundary

`P01 FIGMA_COMPLETE = YES` with dummy photos. The page frame has square print edges, no outer page-frame stroke, and a verified 2x PNG export setting.

`P01 FINAL_PHOTO_SOURCES_INSTALLED = NO` and `PRINT_READY = NO` until the real couple photographs are supplied, swapped, cropped and rechecked.
