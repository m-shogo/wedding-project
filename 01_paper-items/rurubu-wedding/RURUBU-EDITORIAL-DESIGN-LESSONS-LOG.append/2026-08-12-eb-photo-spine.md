# RURUBU Editorial Design Lessons — EB append

Date: 2026-08-12
Target log: `RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`
Scope: V5 / V6 transfer judgment
Status: TESTED

## LESSON — Full-bleed photography still needs a continuous editorial spine

**Context:** V5 outer EA `1024:2` → EB `1029:2`.

**Observed failure or opportunity:** EA had already removed several UI-like lower fields, but the visual transition from its hero to the lower feature still felt like stacked sections. The existence of full-bleed images alone did not guarantee magazine continuity.

**Root cause:** The photographic roles were large but were still separated by a change of visual register around the feature bridge. The page hierarchy was being explained by planar fields more than by photography and type.

**General editorial principle:** When adjacent major photographs should read as one magazine story, use the photographs themselves as the page spine. Extend the dominant crop, attach the primary feature directly to it, and let the next photographic field begin at the same seam. Use bounded paper only where it performs a real secondary-note function.

**Process change:** At thumbnail scale, inspect not only image size but also whether the eye encounters a broad neutral interruption between dominant photo roles. If it does, test continuity through crop extension and direct type before adding or polishing another container.

**Design change:** EB extends the front hero to `740px`, places feature 01 directly on photography, retains one tilted photo-note for 02, and begins the full-width street photo at the same `y=740` seam for 03. No new rounded cards, generic shadows, or gradients were introduced.

**Verification evidence:** EB `1029:2`; Review `1036:2`; actual front `794×1123`, actual back `794×1123`, whole-item render PASS; native text `36`; IMAGE fills `7`; same-parent text intersections `0`; bounded safe-area risks `0`. EA Review `1027:2` remains hidden rollback. Current `77:18 / 77:290` unchanged.

**Asset boundary:** The hero hash remains `539c259be8036b481d06b4f76db9a39b407d90e8`. This visual success does not close Q60 Drive provenance; exact Drive→Figma binary placement remains open.

**Applies to:** V5 and V6 clean-room editorial work when a photo-led spread still reads as stacked modules.

**Status:** TESTED. Do not copy EB geometry mechanically into V6; transfer the continuity principle only.