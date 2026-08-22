# RURUBU V8 — Japanese Reader-Facing Publication Furniture QA

Date: 2026-08-22
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Base main at start: `6768ea195d693aaf6bc9abde1469cdaffe1e4ac7`

## Professional research input

Fresh references were used as hypotheses, not copied visual styles:

- JAGDA, `Graphic Design in Japan 2026` (published 2026-07-15): Book & Editorial Design remains a distinct professional category inside the current Japanese graphic-design field, selected under a broad senior-jury system. https://www.jagda.or.jp/en/news/10423/
- IDEA No.326, Takashi Kono editorial/book work: the publication frames Kono's book and magazine design through the relationship between modernity and locality. https://www.idea-mag.com/en/idea_magazine/326/
- IDEA No.387, `Memorandum of Understanding for the History of Book Design in Japan`: treats Japanese book design as an editorial/design history with explicit boundaries between words, figure and form rather than neutral layout styling. https://www.idea-mag.com/en/idea_magazine/387/

Rurubu hypothesis tested: when small publication furniture still reads like an internal English schema (`PROFILE`, `STORY`, `CHRONOLOGY`, `MEMORY`, `GUIDE`, `1DAY`), the page can regress toward an AI/template prototype even when the main Japanese hierarchy is strong. The reader-facing publication voice should own this furniture unless the English term itself has a real semantic/brand job.

## Live defect before change

Read-only audit of current V8 found remaining schema-like visible furniture:

- Profile AJ `2235:2`: `01 / PROFILE`
- Story Q `2196:2`: `02 / STORY`, `CHRONOLOGY / 2019—2026`, `WEDDING`
- Memory AD `2228:2`: `03 / MEMORY`, `GUIDE / INDEX`
- 1DAY AG `2233:2`: `05 / 1DAY`

Outer AH kept `るるぶ WEDDING` because it is publication identity, and identity labels `SHOGO / SHI-CHAN` remained because they identify the two people rather than simulate editorial structure. Cafe AF contained no comparable schema furniture.

## Rollback-safe tests and promoted roots

1. Profile AK `2238:2`
   - `01 / PROFILE` → `01 / ふたり`
   - existing content-owned hierarchy and Q&A remain unchanged
   - previous AJ `2235:2` hidden rollback
2. Story AL `2238:35`
   - `02 / STORY` → `02 / 物語`
   - `CHRONOLOGY / 2019—2026` → `年表 / 2019—2026`
   - `WEDDING` → `結婚式`
   - chronology weighting and body composition remain unchanged
   - previous Q `2196:2` hidden rollback
3. Memory AM `2238:73`
   - `03 / MEMORY` → `03 / 記憶`
   - `GUIDE / INDEX` → `寄り道案内`
   - essay/guide semantic separation remains unchanged
   - previous AD `2228:2` hidden rollback
4. 1DAY AN `2238:106`
   - `05 / 1DAY` → `05 / 一日旅`
   - left experiential pace and right exact time/action data remain unchanged
   - previous AG `2233:2` hidden rollback

All four new roots remain native/editable and are parented to page `2052:2`.

## Three-scale and structural QA

Screenshots were generated for each changed spread at whole-item 500px, reading scale 1400px, and actual-size 1587×1123. No layout geometry, image role, major headline hierarchy, or copy body was changed beyond the bounded furniture edits.

Final structural readback:

| Role | Current root | Native text | IMAGE | Intersections | 18px safe risk | Generic schema furniture |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Profile/Q&A | AK `2238:2` | 23 | 0 | 0 | 0 | 0 |
| Story/Chronology | AL `2238:35` | 25 | 0 | 0 | 0 | 0 |
| Memory/Guide | AM `2238:73` | 22 | 0 | 0 | 0 | 0 |
| 1DAY/Model Course | AN `2238:106` | 22 | 0 | 0 | 0 | 0 |

The Memory `朝 / 昼 / 夕 / 夜` one-character labels are intentional semantic labels, not accidental one-character wrap tails.

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new Figma image placement: `0`
- V6/V7 image reuse: `0`
- Drive V8 authority folder re-confirmed: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`
- unchanged RSL-208 DNS-blocked upload-submit route was not retried without a material environment change

## Decision

Promote AK / AL / AM / AN locally. The improvement is not "replace all English with Japanese." English remains valid when it owns brand, identity, conventional notation, or specific editorial meaning. The verified local principle is narrower: internal-schema vocabulary should not remain visible merely to make a layout look like a magazine.

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.
