# RSL-222 / RSL-223 — Outer destination language + Figma text-width failure

Date: 2026-08-22
Source: Rurubu WEDDING V8 Outer

## RSL-222 — direct TEXT.width assignment failure

State: `VERIFIED_LOCAL`.

Fingerprint: `F-RSL-222-FIGMA-TEXT-WIDTH-DIRECT-ASSIGNMENT-READONLY-IN-PLUGIN-PATH`.

Operation: rollback-safe clone of current Outer plus native-text mutation.
Symptom: `TypeError: node.width: read-only property on TEXT node`.
Root-cause hypothesis: this Plugin API execution path exposes text width as read-only; direct assignment is unsupported.
Corrected method: preserve existing text-box geometry and fit revised copy within it; use supported resize/layout methods only when geometry must change.
Verification: failed operation left no surviving AV candidate; corrected clone/write succeeded and subsequent structural QA passed.
Applies to: Figma Plugin text mutations in this execution path.
Does not imply: all Figma text resizing is impossible.

## RSL-223 — cover language should be owned by destination/content

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Fresh professional observation: strong editorial-cover processes derive visual/language decisions from the issue/story/theme rather than adding generic magazine treatment. This was treated as a hypothesis, not a permanent rule.

Observed local defect: V8 AP's cover hierarchy was destination-led visually (`横浜`) but its deck remained a generic keep-book promise that could fit many unrelated publications.

Test: replace only the deck with content-owned destination language: `海辺、街歩き、好きな店、夜の食卓。 / 横浜の一日を、ページに残す。`

Result: AV `2273:24` passed 500px / 1400px / 1587×1123 review and structural QA with native text 12, IMAGE 1, intersections 0, 18px safe risk 0. AP was retained as hidden rollback.

Transfer hypothesis: when a cover already has a clear publication identity, generic promise copy can weaken specificity; prefer language that names the actual editorial experience when facts support it.

Do not transfer: exact Yokohama wording, scale, palette, ocean-light asset, or Rurubu composition.
