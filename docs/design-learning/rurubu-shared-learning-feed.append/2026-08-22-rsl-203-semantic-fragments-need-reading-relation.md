# RSL-203 — Semantic fragments need a reading relation, not only spatial variation

Date: 2026-08-22
Source scope/item: Rurubu WEDDING / V8 Cafe S → X
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Cafe S right page used four relevant words — `料理 / 皿 / 手元 / 店の空気` — at different sizes and positions. The content was truthful, but the visual relation between the words was mainly spatial scatter. At whole-page scale the result could read as a poster exercise or pseudo-art-direction rather than a designed editorial sequence.

## Root-cause hypothesis

Semantic relevance alone does not justify arbitrary visual distribution. When several related words have no explicit reading order, grouping, contrast logic or information relation, changing size and position can simulate design activity without improving editorial meaning.

## Principle tested

Before adding more spatial variation to a type-led page, test whether the same article-owned words can form a deliberate reading relation first; then use scale/space to support that relation.

## Bounded test

Rollback-safe Cafe X `2212:2`:

- `料理 / 皿 / 手元 / 店の空気` retained as the same semantic content;
- combined into `料理、皿、\n手元、店の空気。` in one native text role;
- three now-duplicate semantic word nodes hidden, not deleted;
- existing `一皿ずつ分け合いながら。` retained as support;
- existing `夜の横浜を、ゆっくり味わう。` retained as close;
- top rule retained after binding-function check;
- no new image, card, decorative English, shadow, gradient or invented factual copy.

## Expected improvement

The right page should read as `semantic opening → supporting sentence → closing beat`, rather than a collection of related nouns placed for visual effect.

## Regression risk

Over-consolidation can become a plain text block and erase useful visual rhythm. Some fragments genuinely need spatial separation when they encode data, geography, sequence, contrast or multiple voices. This is not a rule to collapse all editorial type.

## Three-scale evidence

- 500 px whole spread: PASS
- 1000 px reading: PASS
- 1587×1123 actual-size: PASS
- visible native text: `11`
- IMAGE: `0`
- text intersections: `0`
- 18 px safe risks: `0`
- one-character Japanese lines: `0`

## Evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted current: Cafe X `2212:2`
- rollback: Cafe S `2201:2` hidden
- historical TABLE_ESSAY Drive `1aqjC7cMXymK7r5MqABiNHjL207OY3XKP` remains provenance only
- detailed QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-OUTER-W-CAFE-X-READER-SEQUENCE-QA-2026-08-22.md`

## Failure fingerprint

`F-RSL-203-SPATIALLY-SCATTERED-SEMANTIC-FRAGMENTS-SIMULATE-ART-DIRECTION-WITHOUT-A-READING-RELATION`

Operation/capability: typography-led editorial composition.

Symptom family: relevant nouns/phrases are scattered and resized, making the page look intentionally designed but leaving the reader without a clear relation or sequence.

Likely cause: visual difference was treated as the editorial idea instead of supporting an editorial idea.

Replacement method: preserve article-owned language, create a meaningful reading/grouping relation, then use scale and whitespace to reinforce it; compare against the scattered version at whole-item scale.

## What must remain Rurubu-specific

Do not transfer the food words, punctuation, exact line break, 52 px scale, right-page geometry, cream/navy palette or the decision to retain this particular rule.

## Cross-item applicability hypothesis

Another editorial item with scattered labels/keywords may independently test whether a content-owned reading relation improves authenticity without losing hierarchy.

## Next receiving-item experiment

Only test when fragments are semantically related but visually scattered without data, navigation, geography, multiple-speaker or other proven structure. Do not flatten legitimate diagrams or indexes into prose.