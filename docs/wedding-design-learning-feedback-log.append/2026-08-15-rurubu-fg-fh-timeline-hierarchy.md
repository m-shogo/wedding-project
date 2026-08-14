# Rurubu FG/FH learning feedback — 2026-08-15

Source: Rurubu WEDDING V5 outer.

- Visible problem: FE back timeline was too small/quiet at whole-item scale; a separate Feature 02 subtraction experiment risked turning a framed clipping into a pasted floating image.
- Root-cause hypothesis: small metadata-like timeline type was not contributing enough visual mass, while border/rule subtraction can destroy the physical relationship between a photo clipping and its caption.
- Bounded tests: FG tested border/rule subtraction and a narrower photo crop; both were rejected. FH preserved the front composition and increased the 3×2 back timeline's type hierarchy and purposeful color rails.
- Expected improvement: stronger editorial closure on the back cover without adding cards/assets; preserve collage coherence when a border/rule has a real binding function.
- Regression risks checked: bottom safe area, footer collision, title/date collisions, excessive decorative color.
- Evidence: 500px whole PASS, 1000px spread PASS, actual-size back `1190:195` PASS, actual-size front `1190:324` PASS, 35 visible native text nodes, 7 visible image fills, 0 same-parent absolute text intersections, 0 18px text safe-area risks.
- Status: FH `VERIFIED_LOCAL_ADOPTED`; FG `REJECTED`; FE retained hidden rollback.
- Cross-item lesson: do not assume 'less container = better'. When a frame/rule provides a real physical/editorial binding function, test removal at thumbnail before adopting. Dense print timelines should be evaluated as visual mass, not only for technical legibility.
- Do not transfer: Rurubu's exact colors, 3×2 geometry, title scale, photo choices, or travel-magazine treatment.
- Next receiving-item test: if another print item has a small date/timeline/metadata module, independently test whether moderate type-scale increase improves whole-item balance, then re-run dynamic-copy/footer safety before promotion.