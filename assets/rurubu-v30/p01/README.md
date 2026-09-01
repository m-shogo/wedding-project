# V30 P01 production assets

Status: `P01_DESIGN_COMPLETE_WITH_DUMMY_PHOTOS / FINAL_PHOTO_REPLACEMENT_PENDING`

P01 was rebuilt page-by-page from the current V30 rules. Canva, Canva templates, Canva-like geometry, V20 assets, generated people, generated autobiographical photos, packed production sheets and flattened page masters are not used.

## Current page role

- Cover: `るるぶ WEDDING`
- One hero photo and one support photo
- Native/editable facts: `SHOGO & SHIORI`, `2026.10.24`
- Native/editable hooks: `OUR JOURNEY`, `REAL LIFE`
- Figma page frame: `3535:7`

## Adopted generated assets

Each independently positionable editorial object is stored and placed as one independent image.

1. `V30_P01_BACKGROUND_ENVIRONMENT_PRODUCTION_RGBA.png`
   - one opaque page environment/base
   - Drive production ID: `1cIgR9LfM1tLDo2_6Z6kQvYmYVrvejStn`
   - Figma node: `3573:2`
2. `V30_P01_MASTHEAD_SECTION_*`
   - one inseparable, text-free masthead backing
   - Drive source ID: `18Z95uXSuzYdid2vHOYQsGIUDlX3GE5G2`
   - Drive production ID: `1-LxAd2bDyzx1t5mXiTKws87fYcxJmzUX`
   - Figma node: `3573:4`
3. `V30_P01_HERO_FRAME_*`
   - one hero-photo frame/backing object
   - Drive source ID: `1gfP0jqaobVsgkg6lVQ_REGsOxZmNo1tS`
   - Drive production ID: `1SqdVGdFUrZVXE8VgTUju9SgwIxwzAxs2`
   - Figma node: `3596:2`
4. `V30_P01_SUPPORT_FRAME_*`
   - one support-photo frame/backing object
   - Drive source ID: `1ESbeW0n4Gj3ghfpK2sA8UgjhsExK9oKw`
   - Drive production ID: `1IximTV40tE1hAyywNHfu6QOae0gdhBSF`
   - Figma node: `3596:3`
5. `V30_P01_NAMES_DATE_PAPER_*`
   - one names/date paper vessel; factual text remains native
   - Drive source ID: `1dAwcD7nwDQhlT5odhTtWH2YvjtCaJboQ`
   - Drive production ID: `1vHhquq135Gq0U1AOw9xupGIYwi7PPwcI`
   - Figma node: `3596:4`

## Replaceable photo slots

- Hero slot: frame `3574:2`, image child `3574:3`
- Support slot: frame `3574:5`, image child `3574:6`
- Both slot frames use `clipsContent = true`.
- Photos remain separate from the generated frames/backings.
- Replacing a photo requires only swapping the image fill and adjusting its crop.
- Both slots passed an actual cross-orientation swap test without spill, gaps or frame rebuilding.

Dummy/reference photos are temporary non-person images and are not autobiographical facts:

- Hero dummy Drive ID: `1f0N_tkUpV2YAmrLMMjGU8T3p_7eJfY0B`
- Support dummy Drive ID: `1dfmbAlacvhZgdCkFwsnUNyGoI5409dBg`

## Generation and alpha QA

- Isolated production parts were generated on solid green or magenta key backgrounds.
- Python removed the key background and the intentional inner photo-window key regions.
- Production files are true PNG/RGBA and preserve natural aspect ratios.
- Light/dark alpha QA passed: Drive ID `1rh8VCx-AE97cS0rJFdeYUuqiIlOgOxEm`.
- The former packed photo-backing and bottom-info PNGs were removed from Git candidates, Drive production folders and live Figma.

## Visual QA / current best

- P01 CURRENT BEST: Drive ID `1GbFIs99JhyiMXuPDzwio0wJr8XWUHTQU`
- Grayscale print-reality QA: Drive ID `1RgCLGti8jUyyD3igJ4kgxQaKVDBXEZ_i`
- Thumbnail / three-second scan QA: Drive ID `1VlT4McRVWIYiJkc0vJsQkgN3X8t9FjLJ`
- Temporary replacement-test proof: Drive ID `1twXmGjoBYPLK0BgKq7SsE5Pb_sGnuF9r`
- Visible placeholder/stale-marker scan: zero hits.
- Live P01 contains no hidden rejected-asset graveyard.
- A5-equivalent hierarchy passes with title first, photo cluster second, names/date third.

## Remaining production boundary

`P01 DESIGN_COMPLETE = YES` with dummy photos.

`P01 FINAL_PHOTO_SOURCES_INSTALLED = NO` and `PRINT_READY = NO` until the real couple photographs are supplied, swapped, cropped and rechecked at A5/spread/contact-sheet level.
