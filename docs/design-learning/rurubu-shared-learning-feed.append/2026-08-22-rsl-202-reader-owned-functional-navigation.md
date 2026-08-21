# RSL-202 — Functional navigation should belong to the reader voice, not internal taxonomy

Date: 2026-08-22
Source scope/item: Rurubu WEDDING / V8 Outer U → W
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Outer U's back index was functional and structurally correct, but the labels `PROFILE / STORY / MEMORY / TABLE / 1DAY` read more like production taxonomy or a design-system outline than the voice of the finished Japanese publication. The page also retained a small English back-note and redundant `YOKOHAMA` label that no longer performed a necessary job.

## Root-cause hypothesis

A functional index can still preserve prototype/AI residue when the labels describe the system rather than address the reader. Removing the index would be wrong because it has a binding/navigation function; the better test is whether the same structure can be expressed in article-owned language.

## Principle tested

Before deleting a useful navigation structure or adding decoration, test whether its labels can be rewritten from already-verified semantic roles into the publication's reader-facing voice.

## Bounded test

Rollback-safe Outer W `2209:2`:

- `01 PROFILE / 02 STORY / 03 MEMORY / 04 TABLE / 05 1DAY`
  → `01 ふたり / 02 物語 / 03 記憶 / 04 食卓 / 05 1DAY`;
- small back English note hidden;
- redundant front `YOKOHAMA` hidden because native `横浜` already owns destination identity;
- index rule retained because it still performs binding/navigation work;
- existing abstract ocean-light generated role preserved unchanged;
- no new image, Drive master, V6/V7 asset, card, badge, sticker, shadow or gradient.

## Expected improvement

The index should continue to orient the reader while sounding like part of the publication rather than an internal content model.

## Regression risk

Blindly translating or removing English can flatten legitimate brand voice, destroy useful international labels, or reduce compact navigation clarity. The test applies only when a label is semantically redundant, schema-like, or not owned by the publication voice.

## Three-scale evidence

- 500 px whole item: PASS
- 1000 px reading: PASS
- 1587×1123 actual-size: PASS
- visible native text: `11`
- IMAGE: `1`
- text intersections: `0`
- 18 px safe risks: `0`
- one-character Japanese lines: `0`

## Evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted current: Outer W `2209:2`
- rollback: Outer U `2205:2` hidden
- retained generated master: Drive `1L5bMXy7IhPWGgIH6yDJ9mzOpveFYTZYB`
- detailed QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-OUTER-W-CAFE-X-READER-SEQUENCE-QA-2026-08-22.md`

## Failure fingerprint

`F-RSL-202-FUNCTIONAL-NAVIGATION-READS-AS-INTERNAL-SCHEMA-WHEN-LABELS-DO-NOT-MATCH-READER-VOICE`

Operation/capability: publication navigation / editorial labeling.

Symptom family: a real navigation structure looks like an internal section taxonomy or wireframe legend even after other UI-like decoration is removed.

Likely cause: functional hierarchy was preserved but its language was never promoted from production terminology to finished editorial voice.

Replacement method: keep proven binding/navigation structure, rewrite only labels that can be truthfully mapped to existing semantic roles, then rerun whole/reading/actual-size and Japanese-wrap QA.

## What must remain Rurubu-specific

Do not transfer `ふたり / 物語 / 記憶 / 食卓 / 1DAY`, numbering, navy/cream palette, exact index position, masthead, destination treatment or the decision to hide `YOKOHAMA`.

## Cross-item applicability hypothesis

Another print/editorial item with a genuine index, legend or guide may independently test whether reader-facing language improves authenticity while preserving navigation.

## Next receiving-item experiment

Only test when the existing labels visibly read as implementation/content-model language. Do not convert every English label or every technical term into Japanese by default.