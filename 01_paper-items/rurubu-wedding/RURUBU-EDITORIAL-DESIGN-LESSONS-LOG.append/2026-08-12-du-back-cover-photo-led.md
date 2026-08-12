## LESSON-DU — Judge and rebuild the weaker face of a print item, not only the cover

**Date:** 2026-08-12

**Context:** Rurubu V5 outer comparator DU `992:2` vs DT `982:2`.

**Observed opportunity:** DT's front had strong photo-substrate hierarchy, but the back remained a comparatively orderly image-plus-strip composition. The visual quality of the whole outer spread was capped by its weaker face.

**General editorial principle:** For two-sided print items, perform scratch selection on the complete item. If one face is materially weaker, preserve the strong face and clean-room the weak one with unequal photography, controlled overlap, native type, editorial captions, and print rhythm.

**Design change:** DU preserved the DT front, expanded the back hero to `793.7 × 620`, built an unequal two-photo overlap, reused dormant square-corner rectangles as narrow caption strips, and compressed the timeline into staggered editorial beats. No new cards, rounded containers, shadows, or gradients were introduced.

**Rejected state:** Captions initially floated below the photography and weakened the photo-to-timeline transition. They were moved into narrow attached strips and reverified at actual size before adoption.

**Verification:** 500px whole-item thumbnail PASS; whole-reading PASS; natural-size back PASS; `37` visible native text nodes; `7` IMAGE fills; `0` same-parent text intersections; fold `992:184` preserved. Review `993:2`; DT rollback `987:2` hidden and preserved.

**Regression risk:** Deliberate overlap can become scrapbook decoration, and caption strips can become UI labels. Use both only when they strengthen reading order and photographic attachment.

**Asset caution:** Existing Yokohama hero hash `539c259be8036b481d06b4f76db9a39b407d90e8` is visual reuse, not exact Q60 Drive provenance. V5-01 remains open.

**Applies to:** two-sided editorial paper items and later V6 concepts after V5 gate closure.

**Status:** TESTED
