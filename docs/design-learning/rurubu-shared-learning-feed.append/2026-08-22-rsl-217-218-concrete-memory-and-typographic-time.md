# Rurubu shared learning — RSL-217 / RSL-218

Date: 2026-08-22
Source scope: Rurubu WEDDING V8

## RSL-217 — concrete sensory memory should outrank a duplicated abstract concept token

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Failure fingerprint:
`F-RSL-217-ABSTRACT-SEMANTIC-ANCHOR-DUPLICATES-MORE-SPECIFIC-ARTICLE-OWNED-MEMORY`

### Observed

V8 Memory AM used a large standalone `温度` while nearby copy already said `その日の温度が戻ってくる。`. The word was no longer a low-opacity ghost, but it still duplicated the same concept and became an easy editorial-looking token.

### Root-cause hypothesis

Once a page already contains concrete sensory detail, repeating a higher-level abstract keyword as separate display mass can make the composition feel concept-driven rather than memory-driven. Travel/editorial specificity is stronger when the largest meaningful text is owned by actual scenes, sensations, places, voices, or actions.

### Bounded test

In AQ `2256:2`, hide the standalone `温度`, enlarge only the existing concrete sensory sequence, retain the reflective sentence as support, and leave the Guide side unchanged.

### Evidence

- 500px: PASS
- 1000px: PASS
- 1587×1123: PASS
- native text 21
- IMAGE 0
- intersections 0
- 18px safe risk 0
- old AM preserved as rollback

### Learning

Before inventing or preserving a large abstract display word, check whether a more concrete article-owned phrase already carries the memory better. Prefer specificity when it produces stronger editorial meaning without harming pacing.

Do NOT transfer the literal `温度` treatment, copy, coordinates, colors, or Rurubu composition.

Cross-item applicability hypothesis: useful for travel, profile, story, food, and other editorial pages where a generic concept word competes with more specific content-owned language.

Fresh research basis used as hypothesis: IDEA No.326's framing of Takashi Kono's book/magazine work through modernity and locality.

## RSL-218 — data-bound spacing can make timeline furniture redundant

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Failure fingerprint:
`F-RSL-218-DATA-SPACING-PLUS-AXIS-MARKERS-DOUBLE-ENCODE-TIME-AS-UI`

### Observed

V8 1DAY AO correctly placed 10:00, 11:40, 15:10, and 18:30 with unequal y-spacing based on elapsed time, but also added a vertical line and circular markers. The extra geometry increasingly read like a timeline component even though the data was already legible through position and native labels.

### Root-cause hypothesis

When position, sequence, and exact labels already encode the data, extra connector/marker geometry may become redundant interface furniture. Removing it can improve editorial tone without reducing correctness if the data relationships remain clear at thumbnail, reading, and actual size.

### Bounded test

In AR `2257:2`, preserve all times/actions/y positions, hide the axis and four markers, and strengthen the native time/action typography only.

### Evidence

- 500px: PASS
- 1000px: PASS
- 1587×1123: PASS
- native text 21
- IMAGE 0
- intersections 0
- 18px safe risk 0
- exact time/action data unchanged
- old AO preserved as rollback

### Learning

Do not assume a timeline needs a visible line or dots. First ask what is actually carrying sequence and interval information. If native position + labels already do the work, compare a no-axis version before keeping UI-like furniture.

Do NOT generalize this into `remove all rules/lines`. A rule that provides binding, navigation, scale, or otherwise non-redundant information may remain necessary.

Cross-item applicability hypothesis: schedules, chronologies, model courses, process diagrams, and other editorial information pages.

Fresh research basis used as hypothesis: magCulture's New York Times Magazine travel issue review, emphasizing clear editorial structure, scale variation, and restraint rather than unnecessary complication when content is strong.
