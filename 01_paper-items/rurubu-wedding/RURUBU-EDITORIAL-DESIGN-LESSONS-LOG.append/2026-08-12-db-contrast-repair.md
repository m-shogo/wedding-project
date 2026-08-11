# Rurubu editorial lessons — DB contrast repair

Date: 2026-08-12

- **Actual-size contrast defects deserve local fixes, not a new component system.** DA's destination microcopy failed on the yellow field and the hero subheads failed over a bright skyline. DB fixes only those locations: navy/magenta on yellow and one compact navy caption field over the hero.
- **Layer order is part of visual QA.** The first caption-field pass placed the field above the white copy and was rejected. Reordering the field behind the native text, then reducing its opacity to `0.76`, produced the accepted state.
- **A compact editorial ink field is different from a UI card.** It is rectangular, attached directly to the photograph's contrast problem, carries a real caption hierarchy, and does not repeat as a grid/module system elsewhere on the page.
- **Thumbnail success and actual-size success are separate checks.** DB preserves DA's strong split-field silhouette at 500px while the actual-size `794×1123` front confirms the repaired microcopy and hero-caption readability.
- **Composition/readability adoption is not asset-quality completion.** DB still carries proxy hero hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`; the Q60 cover raster is not placed. V5 remains `9/10`, dominant `2/3`, and V6 remains blocked by the V5 gate.
- **Switch methods after transport boundaries repeat.** The official Figma upload POST failed at DNS and a distinct direct Drive fetch from the plugin runtime also failed. Do not keep burning production time on those routes; preserve Q60 provenance and use only a genuinely different binary-safe path later.

Next use: apply this contrast rule sparingly to photographic captions. Once the real cover raster is placed, re-evaluate whether the DB ink field is still necessary; a stronger image may allow subtraction rather than retention.
