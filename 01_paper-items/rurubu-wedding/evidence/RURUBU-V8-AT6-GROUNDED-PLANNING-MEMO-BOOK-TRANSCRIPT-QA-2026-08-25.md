# RURUBU V8 AT6 — Grounded Planning Memo / Book Transcript QA

Date: 2026-08-25
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Candidate/current: `2510:2`
Rollback: `2434:134 / AT5`

## Why this experiment existed

V7 C6E had already moved its 1DAY role from generic dayparts to an identified 2025 Hawaii planning source. V8 AT5 remained `朝 / 海辺 → 昼 / カフェ → 午後 / 街歩き → 夜 / 食卓`, so V7/V8 were no longer being compared under the same content condition.

The goal was **not** to copy C6E's composition into V8. The goal was to test whether the same source truth could be translated through a materially different book-design philosophy.

## Professional research observation

Fresh research rotated to sequence-as-record.

- MoMA: Edward Ruscha, *Every Building on the Sunset Strip* (1966) — an accordion artist's book whose continuous form follows a systematically photographed stretch of Sunset Boulevard: https://www.moma.org/collection/works/146931
- Getty Research Institute: *Streets of Los Angeles Archive* — preserves the contact sheets and production archive behind Ruscha's systematic street documentation: https://www.getty.edu/research/special_collections/notable/ruscha.html

Research state: `OBSERVED` only. The visual appearance of Ruscha's book is **not** copied into Rurubu.

Rurubu-specific hypothesis:

> When an identified plan sequence exists, V8 can let the source's actual date/time progression determine page cadence without drawing a UI timeline or inheriting V7's dense travel-magazine modules.

## Source truth

Google Drive source:
- title: `ハワイ🌺`
- ID: `1tuFgCN63Z9Fnadr7qKy6enDZ0fAfTEmRiG2tKLE4UYg`
- current document read on 2026-08-25

Relevant plan entries:
- `2日目 11/08`
- `5:00-5:15 ホテルもしくは指定の集合場所へお迎え`
- `6:00 ダイヤモンドヘッドへ到着 登山スタート`
- `7:40 KCCファーマーズマーケット到着 自由行動`
- `9:00 ホテルもしくは指定の集合場所へ到着`
- planned event: `2025年11月8日(土) 16:00〜22:00 / ワイキキ・カラカウア通り`

Truth boundary:
- these are **planning-source facts**;
- they do not prove that the couple actually followed the itinerary;
- schedule/booking/opening/event conditions are update-sensitive and require fresh confirmation before final publication.

## AT5 before

AT5 `2434:134`:
- current before experiment
- generic dayparts and activities
- one `PHOTO_DUMMY / 1DAY_WATERFRONT_OBSERVATION_REPLACEABLE / NOT FINAL`
- structurally sound but content-condition weaker than V7 C6E.

## AT6 bounded change

AT6 `2510:2` was cloned rollback-safe from AT5 and kept the restrained cream/navy V8 system.

Reader-facing content:
- `2025.11.08`
- `旅行計画メモ / 2日目`
- `一日を、三つの時刻で残す。`
- `5:00–5:15 ホテル迎え予定 / 9:00 ホテル帰着予定`
- `ハワイ / 一日の計画`
- `早朝の山から、夕方の街へ。`
- `6:00 ダイヤモンドヘッド`
- `7:40 KCCファーマーズマーケット`
- `16:00 カラカウア通り`
- `2025年の旅行計画メモをもとに構成。予約・開催・時刻は出発前に再確認。`

Withheld:
- generic fourth daypart row
- structural waterfront photo
- route-map simulation
- any claim that the plan was completed as written.

No card, pill, badge, shadow, gradient, sticker, fake map or decorative English was added.

## Failure / correction inside the experiment

First AT6 pass withheld the unverified photo but left too much empty lower-left field. At 500px it risked reading as `quiet = large empty area`, one of the project's anti-AI failure signals.

The response was **not** to restore dummy photography or add decoration. The source was re-read, and two grounded logistics lines (`5:00–5:15` pickup and `9:00` hotel return) were placed as a small secondary note. This gave the quiet field a functional editorial job while preserving V8 restraint.

No new normalized failure fingerprint was added because the issue is better represented as a design correction within RSL-268's source-driven editorial test rather than a reusable production/tool failure.

## Three-scale QA

### Whole-item / 500px

PASS.

- clear distinction from V7 C6E;
- date-led left page reads immediately;
- right page has three strong source-owned beats instead of four equal modules;
- logistics note prevents empty-space-as-luxury without competing with the title.

### Reading / 1400px

PASS.

- `6:00 / 7:40 / 16:00` are easy to scan;
- unequal vertical spacing is intentional and reads as temporal cadence rather than a UI component stack;
- KCC line remains readable without Japanese semantic break failure;
- source-state footer is legible.

### Actual size / 1587×1123

DESIGN QA PASS.

- small source/logistics copy remains legible;
- no text or image is used as false documentary proof;
- final printer-template, imposition, bleed/trim/binding, PDF preflight and physical proof are not verified.

## Structure QA

Final AT6 readback:
- parent: `2052:2`
- position after promotion: `x=3600 / y=9850`
- visible native text: `15`
- visible IMAGE fills: `0`
- text intersections: `0`
- 18px edge risks: `0`
- Japanese→Inter mismatch: `0`
- current V7/V8 pairwise root overlap: `0`

Rollback:
- AT5 `2434:134`
- name: `ROLLBACK / V8 AT5 / 1DAY / PRE-GROUNDED-PLAN-TRANSCRIPT / HIDDEN`
- `x=300000 / visible=false`
- parent remains `2052:2`.

## Professional critique

A. Art director — PASS: a clear `plan transcript as book page` idea, not a generic quiet template.

B. Editorial designer — PASS: reading order and source state are explicit; three stops and logistics have unequal jobs.

C. Book designer — PASS: large date field + quiet source note + temporally spaced right page create a deliberate sequence distinct from V7.

D. Typographer — PASS: Japanese line breaks, hierarchy and optical spacing are intentional at all three scales.

E. Photo editor — PASS for source truth: unverified place photo is withheld rather than allowed to become fake documentary evidence.

F. Print designer — DESIGN QA PASS only; print authority remains blocked.

## Before/after learning check

YES.

Without the new sequence-as-record research, the obvious route would have been either:
1. keep AT5's generic daypart system, or
2. port V7 C6E's dense module structure into V8.

Instead, the same source was translated as a restrained transcript whose date and temporal cadence carry the page. New knowledge materially changed the design decision.

## Learning promotion

RSL-268 is strengthened from single-system evidence to:

`VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`

Verified within Rurubu:
- V7 C6E — dense high-energy travel-information system
- V8 AT6 — restrained editorial-monograph system

The transferable principle is **source-state discipline + content-owned sequence**. Do not transfer V7/V8 coordinates, palette, type scale, spacing or composition.

## Completion truth

- generated assets: `0`
- Drive writes: `0`
- Figma images added: `0`
- new image hashes: `0`
- final photography: `0`
- V6 changes: `0`
- V7 production changes: `0`

AT6 is `DESIGN QA PASS / REAL-CONTENT-PARTIAL / NOT PRINT READY`.
