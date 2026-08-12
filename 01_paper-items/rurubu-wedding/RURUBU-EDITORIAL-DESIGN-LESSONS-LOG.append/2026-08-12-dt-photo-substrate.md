## LESSON-DT — A dominant photograph can be the page substrate, not a module

**Date:** 2026-08-12

**Context:** V5 outer clean-room comparator DT `982:2` vs DS `977:2`.

**Observed failure or opportunity:** DS had a strong Yokohama hero but still separated the page into an upper image and lower feature modules. At thumbnail scale this retained a web/content-stack silhouette.

**Root cause:** The photograph was treated as one component in the layout instead of the surface that establishes the cover's primary rhythm.

**General editorial principle:** When a destination photograph has sufficient crop flexibility and text-safe structure, test letting it carry a large continuous portion of the page. Build the rest from native headline scale, asymmetric support-photo overlap, direct type, and thin rules before adding containers.

**Process change:** During clean-room cover comparison, explicitly test `photo as module` against `photo as substrate` at thumbnail, reading, and actual-size scales. Reject intermediate states that only increase overlap without improving reading order.

**Design change:** DT extended the Yokohama hero to 650px, strengthened the native 82px headline, crossed a support image over the hero boundary, rebuilt 01 as a direct-type spine, compressed 02, and used a large asymmetric photograph for 03. No new cards, shadows, rounded rectangles, or gradients were added.

**Verification evidence:** DT won the 500px whole-item comparison against DS and passed whole-reading plus actual-size front QA. Structure readback: 37 visible native text nodes, 7 visible IMAGE fills, 0 same-parent text intersections, fold guide `982:184` at `x=792.7000122070312`, `2 × 1122.5`. Review snapshot `987:2`; DS rollback `979:2` hidden and preserved.

**Regression risk:** This treatment can become poster-like or scrapbook-like if headline contrast, crop plausibility, or support-photo rotation is not controlled. It must not be applied mechanically.

**Asset caution:** Figma visual reuse of the Yokohama image is not equivalent to exact Q60 Drive asset lifecycle completion. The exact Q60 Drive→Figma node/hash chain remains open.

**Applies to:** V5 comparator work; candidate for V6 and later editorial covers only after repeated evidence.

**Status:** TESTED

**Promoted knowledge-base section:** Not yet promoted; retain as a tested lesson until a second independent cover confirms the pattern.
