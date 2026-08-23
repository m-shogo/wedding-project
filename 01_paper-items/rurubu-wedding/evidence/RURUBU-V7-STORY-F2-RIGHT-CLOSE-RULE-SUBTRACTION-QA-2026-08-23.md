# Rurubu V7 Story F2 — Right Close Rule Subtraction QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Authority and control

- V6 frozen control `JC + IX + JB + IZ + IT + JA`: untouched.
- V7 previous Story/Chronology current: `2290:4 / F`.
- New current comparison: `2351:2 / F2`.
- Previous F is preserved as hidden rollback at `x=300000`.
- V7 photography remains structural dummy material only.

## New professional research used

This run deliberately rotated away from recent photo-selection, cover, food and book-grid references and focused on Japanese composition and page architecture.

Primary/high-quality references:

- W3C, *Requirements for Japanese Text Layout (JLREQ)* — Japanese composition is organized from a `kihon-hanmen` / basic page area and explicit rules for headings, illustrations, tables, punctuation and line composition rather than arbitrary decorative separators.
- JAGAT / Toshi Kobayashi, *基本版面の設定と文字の配置* — the basic page area is a designed framework for text and illustrations; its structure should carry page organization.

Rurubu-specific hypothesis:

> On a two-page Story + Chronology spread, if both pages already have different content hierarchy and spatial rhythm, repeating the same heavy close-rule furniture on both sides can become a template signature. Test whether the chronology can close through year/event/type/space alone while retaining the rule only where it still has a real editorial cadence job.

This is an inference tested locally; it is not a claim that JLREQ or JAGAT says to remove divider rules.

## Before

Current F `2290:4` used two analogous close devices:

- left Story: `ACCENT / V7 STORY CLOSE RULE` before `出会いから、今日まで。`
- right Chronology: `2290:31 / ACCENT / V7 CHRON CLOSE RULE` before `時間の長さより、今も覚えていることを残しておく。`

The two pages have different editorial jobs, but the duplicated 7 px close-rule grammar made the spread more component-like than necessary.

## Bounded experiment

Rollback-safe clone created:

- candidate/current root: `2351:2`
- only right chronology close rule hidden: `2351:29 / visible=false`
- right chronology close text moved `y=978 → 946`: `2351:30`
- left Story close rule retained unchanged
- factual/native copy changed: `0`
- photo roles/crops changed: `0`
- fixed display title changed: `0`
- color/palette changed: `0`

## Three-scale QA

Screenshots were rendered directly from live Figma at:

- whole-item / 500 px: PASS
- reading / 1400 px: PASS
- actual-size canvas / `1587×1123`: PASS for DESIGN QA

Editorial result:

- Story page retains a deliberate accent cadence before its concluding statement.
- Chronology page now closes from `2026` → event/note → final reflection without a second matching bar.
- Left/right role difference is stronger without introducing a new decorative device.
- No information was removed.

## Structure QA

Post-candidate readback for `2351:2`:

- parent: `2052:2`
- visible native text: `24`
- visible IMAGE-fill nodes: `4`
- text intersections: `0`
- bounded 18 px edge risks: `0`
- accidental one-character explicit lines: `0`
- kinsoku start/end probe findings: `0`
- Japanese font mismatch findings: `0`

Image roles remain explicitly named as structural/not-final dummies. No legitimate Hawaii photo claim is made.

## Professional critique

- Art director: PASS — the spread retains a clear high-energy publication personality while reducing repeated furniture.
- Editorial designer: PASS — Story and Chronology now close differently because they perform different reader jobs.
- Book designer: PASS — theme + variation is stronger than mirrored component grammar.
- Typographer: PASS — Japanese copy, line breaks, sizes and native editability were preserved; no new kinsoku issue was introduced.
- Photo editor: unchanged / still REAL-CONTENT-BLOCKED on legitimate role-specific Hawaii photography.
- Print designer: DESIGN QA only. Exact printer template, bleed/trim/fold, effective image resolution and physical proof remain unverified.

## Promotion

`2351:2 / F2` promoted to:

`CURRENT V7 STORY COMPARISON / VERIFIED_LOCAL / STRUCTURAL PHOTO DUMMIES`

Old F `2290:4` renamed:

`ROLLBACK / V7 F / STORY+CHRONOLOGY / PRE-RIGHT-CLOSE-RULE-SUBTRACTION / HIDDEN`

## Learning

`RSL-243 / F-RSL-243-MIRRORED-CLOSE-RULES-EQUALIZE-DIFFERENT-EDITORIAL-PAGE-JOBS`

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Transferable hypothesis:

> When adjacent pages have materially different editorial jobs, repeated separator/close furniture should prove a role on each page. If type, spatial hierarchy and content sequence already close one side, test subtraction there rather than preserving symmetry by default.

Do not transfer V7's exact 7 px rule, coral/cobalt palette, coordinates, Story/Chronology composition or Hawaii travel-magazine art direction.

## Asset / truth state

- new image-model generation: `0`
- Drive writes: `0`
- new image hashes: `0`
- final photo adoption: `0`
- native/factual copy changes: `0`
- V6 changes: `0`
- V8 changes: `0`
- print-ready claim: NO
