# Rurubu shared learning append — information marks require information binding

Date: 2026-08-21
Owner: Rurubu WEDDING hourly improvement task

## RSL-191 — If marks look like data, bind them to actual data

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Source: Rurubu WEDDING V8 1DAY / Model Course

### Visible problem

The prior 1DAY right page contained a generated foldout with repeated bars/dots that looked like an infographic but did not visibly encode the existing schedule. The left page also used different bar lengths without an explicit readable meaning.

### Root-cause hypothesis

Pseudo-information design creates artificial rigor: visual variables imply scale, duration, ranking or route logic without actually carrying those facts. This can feel especially AI/template-like because the graphic resembles a data component while remaining semantically empty.

### Principle tested

When marks look like a timeline, scale, ranking, route or data system, bind at least one visible property—position, distance, size, order or connection—to actual information. Otherwise use an explicitly non-data illustration instead of pseudo-data grammar.

### Bounded change

On rollback-safe 1DAY J `2179:2`:

- hide generated DAY_FOLDOUT;
- hide arbitrary left bar lengths;
- preserve existing schedule facts and close copy;
- create a native right-page time axis;
- position 10:00 / 11:40 / 15:10 / 18:30 markers according to elapsed time;
- keep activity/description text native and editable;
- preserve prior 1DAY F `2164:67` hidden.

### Expected improvement

The right page should become real information design: marker spacing communicates the day's pace rather than merely resembling an infographic.

### Regression risk

Strict data binding can become cold, over-explanatory or visually generic. Preserve narrative/editorial hierarchy; not every decorative mark needs to become data.

### Three-scale evidence

- 500px whole spread: PASS.
- 1400px reading scale: PASS.
- 1588×1123 actual size: PASS.
- visible native text: 34.
- IMAGE fill nodes: 0.
- same-parent text intersections: 0.
- 18px safe-area risks: 0.
- visible internal/process-language fingerprints: 0.

### Figma / Drive / GitHub evidence

- current Figma root: `2179:2`
- rollback root: `2164:67`
- previous generated master remains Drive `1KxMoNigZn6yKVu8e1MP9xt7Z-MaQzn-q` as historical/rollback provenance only
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-1DAY-J-TIME-SCALED-INFO-QA-2026-08-21.md`

### What must remain Rurubu-specific

Exact schedule times, labels, descriptions, axis geometry, palette, typography, coordinates, book-edition styling and V8 production state.

### Cross-item applicability

Another print/editorial item may independently test this when a graphic visually claims data/timeline meaning. It must not copy this layout or turn decorative/non-data art into data by force.

### Failure fingerprint

`F-RSL-191-INFOGRAPHIC-MARKS-WITHOUT-DATA-BINDING`

Stop condition: if an explicitly illustrative, non-data visual is stronger and honest about its role, compare it fairly rather than enforcing a data chart everywhere.
