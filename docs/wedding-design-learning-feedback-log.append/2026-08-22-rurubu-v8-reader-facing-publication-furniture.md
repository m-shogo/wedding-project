# Rurubu V8 — Reader-facing publication furniture experiment

Date: 2026-08-22

## What changed

Four V8 spreads still contained small English production/schema labels even though their main hierarchies had already become Japanese-led and reader-facing. Rollback-safe duplicates were tested and promoted:

- Profile AJ → AK `2238:2`: `01 / PROFILE` → `01 / ふたり`
- Story Q → AL `2238:35`: `02 / STORY` → `02 / 物語`; `CHRONOLOGY / 2019—2026` → `年表 / 2019—2026`; `WEDDING` → `結婚式`
- Memory AD → AM `2238:73`: `03 / MEMORY` → `03 / 記憶`; `GUIDE / INDEX` → `寄り道案内`
- 1DAY AG → AN `2238:106`: `05 / 1DAY` → `05 / 一日旅`

Outer `るるぶ WEDDING` and person identifiers `SHOGO / SHI-CHAN` were deliberately preserved because they have real publication/identity ownership. This was not a blanket English-removal pass.

## Why

Fresh JAGDA/IDEA research reinforced that book/editorial design is an authored publication system and that Japanese editorial work negotiates locality, words, figure and form. The live defect was therefore treated as a publication-voice problem: small schema words were still talking like the production model rather than the finished book.

## QA

Changed roots passed:

- whole item 500px
- reading scale 1400px
- actual size 1587×1123
- text intersections `0`
- 18px safe risk `0`
- generic schema-furniture audit `0`
- native text editability preserved
- correct parent page `2052:2`

Memory `朝 / 昼 / 夕 / 夜` remains intentional one-character semantic labeling, not accidental wrapping.

## Learning

RSL-215 / `F-RSL-215-INTERNAL-SCHEMA-VOCABULARY-LEAKS-INTO-PUBLICATION-FURNITURE`.

The useful rule is not “translate all English.” It is: if a small visible label exists only because the layout/content model calls a section PROFILE/STORY/GUIDE/etc., verify whether the reader actually needs that vocabulary. Brand, identity, data notation and domain-authentic English remain valid when they own a real job.

Detailed evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V8-JAPANESE-READER-FURNITURE-QA-2026-08-22.md`
