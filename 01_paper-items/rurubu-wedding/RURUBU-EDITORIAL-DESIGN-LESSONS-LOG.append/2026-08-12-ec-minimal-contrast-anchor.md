# LESSON — Minimal contrast anchors after subtraction

**Date:** 2026-08-12

**Context:** V5 clean-room EC outer, feature 02 on tilted travel photography.

**Observed failure or opportunity:** Removing EB's broad feature-02 paper block made EC more photo-led and less UI-like, but actual-size QA showed dark native title text disappearing against the high-frequency image. Pure subtraction had exceeded the readability limit.

**Root cause:** Container removal was treated as inherently better even when the underlying photograph no longer supplied a stable text-safe zone.

**General editorial principle:** Subtract containment until readability or grouping genuinely requires it, then add back only the smallest contrast anchor necessary. For photo captions, prefer an edge-attached strip sized to the copy over a broad floating card.

**Process change:** After removing a photo-backed field, actual-size QA must explicitly test text contrast. Use the escalation sequence `direct type → rule → thin caption strip → larger field` rather than jumping directly between full card and no containment.

**Design change:** EC reused hidden rectangle `1039:176` as a 310×60 warm strip attached to the lower edge of `1039:153`; native `02` and title remain editable. A first repaired state was rejected after collision QA; final title x=`538` removed the rotated text-box intersection.

**Verification evidence:** 500px thumbnail, 1588×1123 whole spread, and 794×1123 actual-size front passed. Final structure: 36 visible native text, 6 visible IMAGE fills, same-parent text collisions 0, safe-area risks under 18 px 0, fold preserved. Review snapshot `1043:2` promoted; EB `1036:2` preserved hidden.

**Applies to:** V5; candidate for later photo-led editorial layouts under the same contrast conditions.

**Status:** TESTED

**Promoted knowledge-base section:** Not yet promoted; use only when repeated evidence supports the same contrast condition.

**Evidence:** `learning-runs/2026-08-12-v5-ec-caption-strip-visual-promotion.md`
