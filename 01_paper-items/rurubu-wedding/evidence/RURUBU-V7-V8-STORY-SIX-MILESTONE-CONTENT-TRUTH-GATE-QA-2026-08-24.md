# Rurubu WEDDING — V7/V8 Story six-milestone content-truth gate QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Main observed immediately before Git branch creation: `b87486021e99a022befc753c97f4162adbb81611`

## Authority defect found

Live V7 F2 `2351:2` and V8 AL2 `2332:2` displayed a plausible four-event chronology using `2019 / 2021 / 2024 / 2026` plus narrative notes.

Current Rurubu content authority says the real history milestones are still missing and requires exactly six first-pass milestones. `DUMMY-CONTENT-PACK.md` provides the approved layout-only chronology payload:

1. `201x` — `はじめて出会う`
2. `201x` — `一緒に出かけるように`
3. `202x` — `初めてのふたり旅`
4. `202x` — `同棲スタート`
5. `2026.02.11` — `入籍`
6. `2026.10.24` — `WEDDING DAY`

The pack explicitly says it is placeholder content, not real-answer authority. `CURRENT-CONTENT-GAPS-20260730.md` independently confirms `GAP-TEXT-04 — history milestones × 6` is still unresolved.

Therefore the old chronology was visually plausible but production-truth unsafe: unknown dates/details looked verified.

## Fresh professional research

This run rotated into editorial fact-checking rather than reusing the recent grid/photo/folio references. The New Yorker's documented fact-checking practice treats names, figures and other assertions as things to verify independently before publication. The useful design principle is not a visual style: **editorial polish must not increase the apparent certainty of unverified facts**.

Project-specific authority is stronger than the external observation: when the project's own intake contract says facts are missing and supplies an explicit dummy payload, the study should use that truth-safe payload rather than plausible invented specifics.

## V7 — F3

Promoted current:
- `2387:2 / V7 PRO STUDY F3 / STORY+CHRONOLOGY / SIX-MILESTONE CONTENT-TRUTH DUMMY / CURRENT...`
- parent `2052:2`
- live position `x=5300 / y=13000`

Rollback:
- F2 `2351:2` → hidden at `x=300000`
- renamed `ROLLBACK / V7 F2 / STORY+CHRONOLOGY / PRE-SIX-MILESTONE-CONTENT-TRUTH-GATE / HIDDEN`

Bounded change:
- chronology kicker becomes `ふたりの年表`;
- four plausible exact-year events are replaced by the six canonical dummy milestones above;
- unverified narrative event notes are removed from chronology responsibility rather than presented as fact;
- existing V7 photo composition, left Story page, fixed display title, palette and structural photo dummies are preserved;
- no new image or raster is introduced.

Three-scale QA:
- 500 px whole-item: PASS
- 1400 px reading: PASS
- `1587×1123` actual-size design review: PASS

Structure QA:
- visible native text: `22`
- visible IMAGE roles: `4` = three structural photo dummies + one fixed title graphic
- text intersections: `0`
- bounded 18 px edge risks: `0`
- Japanese semantic text assigned outside Noto Sans JP: `0`

## V8 — AL3

Promoted current:
- `2388:2 / V8 CLEANROOM AL3 / BOOK EDITION / STORY+CHRONOLOGY / SIX-MILESTONE CONTENT-TRUTH DUMMY / CURRENT...`
- parent `2052:2`
- live position `x=3600 / y=8500`

Rollback:
- AL2 `2332:2` → hidden at `x=300000`
- renamed `ROLLBACK / V8 AL2 / STORY+CHRONOLOGY / PRE-SIX-MILESTONE-CONTENT-TRUTH-GATE / HIDDEN`

Bounded change:
- V8 retains its restrained book/editorial identity rather than copying V7 geometry;
- one dominant opening milestone, two paired middle fields, another paired field, and a strong verified wedding-date close carry the same six canonical dummy milestones;
- unknown years stay visibly `201x / 202x` instead of being silently converted into plausible exact years;
- no image was added; V8 Story remains typography-led.

Three-scale QA:
- 500 px whole-item: PASS
- 1400 px reading: PASS
- `1587×1123` actual-size design review: PASS

Structure QA:
- visible native text: `23`
- IMAGE roles: `0`
- text intersections: `0`
- bounded 18 px edge risks: `0`
- Japanese semantic text assigned outside Noto Sans JP: `0`

## Comparison-board integrity

Final live readback after both promotions:
- V7 current: `C8 2381:2 + K 2303:2 + F3 2387:2 + G2 2299:2 + H3 2311:2 + C6B 2383:2`
- V8 current: `AV2 2347:2 + AW3 2357:2 + AL3 2388:2 + AQ3 2337:2 + AS4 2355:27 + AT3 2342:2`
- all current roots parented to `2052:2`
- current-root pairwise overlap: `0`
- V6 preferred control was not modified.

## Learning

`RSL-253 / F-RSL-253-PLAUSIBLE-DUMMY-CHRONOLOGY-MASQUERADES-AS-VERIFIED-RELATIONSHIP-HISTORY`

State: `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`.

Decision principle:

> In a polished editorial study, unknown dates and biographical milestones must remain explicitly dummy/TBD until content authority verifies them. Do not let typographic polish turn placeholders into apparent facts. Use the canonical dummy contract where one exists, keep variable facts native/editable, and re-run layout QA after real content replacement.

This is not a rule to display `201x` in final work. It is a pre-content truth gate.

## Asset / print truth

- new image generation: `0`
- Drive writes: `0`
- new Drive masters: `0`
- new image hashes: `0`
- final Hawaii photography adopted: `0`
- factual unknown dates invented: `0`
- V6 changes: NO
- print template / preflight / physical proof: NOT VERIFIED
