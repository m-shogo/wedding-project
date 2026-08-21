# Rurubu shared learning append — food image ownership before image mass

Date: 2026-08-21
Owner: Rurubu WEDDING hourly improvement task

## RSL-190 — Food imagery should contribute an editorial idea, not merely occupy an image slot

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Source: Rurubu WEDDING V8 Cafe/Table

### Visible problem

V8 Cafe/Table used a generated TABLE_ESSAY master as the largest left-page visual. At spread scale it read as a schematic plate/menu block and did not carry sufficiently specific food, place, documentary or sensory meaning.

### Evidence before change

Prior root `2164:53` used generated role `2164:57` / Drive `1aqjC7cMXymK7r5MqABiNHjL207OY3XKP`. The surrounding native copy already contained stronger sensory material: cup sound, window light, conversation, dishes, hands, atmosphere and night in Yokohama.

### Root-cause hypothesis

Successful generation/transport had been mistaken for editorial usefulness. A generated image can have valid provenance and still be too generic or schematic to deserve dominant visual mass.

### Principle tested

For food/editorial work, require the dominant image to contribute a specific sensory, documentary, place or conceptual idea. If it cannot, test a materially different native editorial skeleton or a genuinely role-specific image rather than preserving generic image-shaped mass.

### Bounded change

On rollback-safe Cafe I `2178:2`:

- hide the TABLE_ESSAY image;
- preserve all factual/sensory native copy;
- make the left page a sensory type score using existing phrases;
- make the right page a distinct night/dinner score using existing copy;
- use only functional rules/indices;
- reduce decorative English;
- preserve prior root `2164:53` hidden.

### Expected improvement

Lower schematic/AI signal, stronger food-memory idea, less dependence on a generic generated visual, and more deliberate page-to-page pacing.

### Regression risk

A text-led food spread can become too literary or quiet and lose appetite/travel desire. A future strong, role-valid food photograph or illustration may outperform the type-only current version. Do not promote this as an anti-image doctrine.

### Three-scale evidence

- 500px whole spread: PASS.
- 1400px reading scale: PASS.
- 1588×1123 actual size: PASS.
- visible native text: 13.
- IMAGE fill nodes: 0.
- same-parent text intersections: 0.
- 18px safe-area risks: 0.
- visible internal/process-language fingerprints: 0.

### Figma / Drive / GitHub evidence

- current Figma root: `2178:2`
- rollback root: `2164:53`
- previous generated master remains Drive `1aqjC7cMXymK7r5MqABiNHjL207OY3XKP` as historical/rollback provenance only
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-CAFE-I-FOOD-MEMORY-SCORE-QA-2026-08-21.md`

### What must remain Rurubu-specific

Exact food-memory copy, type scale, 04/夜 treatment, page coordinates, palette, book-edition pacing and V8 production state.

### Cross-item applicability

Another print/editorial item may independently test this when an image has provenance but weak semantic/editorial ownership. It must not be used as permission to remove legitimate photography or copy this composition.

### Failure fingerprint

`F-RSL-190-FOOD-IMAGE-AS-SCHEMATIC-PLACEHOLDER-WITHOUT-INDEPENDENT-EDITORIAL-IDEA`

Stop condition: if a new role-specific visual carries a stronger true food/place/sensory idea and passes actual-size QA, compare it fairly against the typographic current version.
