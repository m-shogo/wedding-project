# Rurubu WEDDING V20 — Current Acceptance Gate

Status: `HIGHEST_CURRENT_ACCEPTANCE_AUTHORITY / P05_FRIENDS_ONLY_2026-09-01`

This file defines **current** V20 acceptance criteria.

`V20-ACCEPTANCE-EVIDENCE.md` contains historical live-production evidence from obsolete page roles and must not be used to recover old P05/P07/P08 design authority. Historical evidence may still be useful for provenance, source hashes or lessons learned, but current acceptance is governed by this file plus:

1. `V20-CURRENT-PAGE-ARCHITECTURE.md`
2. `V20-PAGE-BY-PAGE-DESIGN-SPEC.md`
3. `V20-QUALITY-GATES.md`

If historical evidence conflicts with current page roles, current roles win.

## Global acceptance

V20 must satisfy:
- A5 portrait / 8 pages
- wedding date `2026.10.24`
- P08 barcode digits exactly `2026102400000`
- `RURUBU FEEL = 100%`
- information density calibrated to about 75% of previous maximum-clutter tests
- factual/personal text native/editable
- real photos independently replaceable
- final master not flattened
- no fabricated personal facts, memories, friend identities, relationships or anecdotes

## P01

Pass when:
- `るるぶ WEDDING` is the first read
- couple photography is strong and recognizable
- date/names remain readable
- cover hooks are limited rather than overloaded

## P02

Pass when:
- SHOGO and SHIORI are understood quickly
- 3–5 grounded facts per person fit comfortably
- exactly Q1/Q2 are present when copy is supplied
- page does not absorb story/travel/friends content

## P03

Pass when:
- relationship story order is understandable without forced dates
- 3–4 grounded chapters are enough
- exactly Q3/Q4 are present when supplied
- proposal meaning is handled here without duplicating a long travel story on P04

## P04

Pass when:
- it is the strongest interior travel-magazine page
- verified travel memories are photo-led
- one travel hero + unequal supports are readable at A5
- captions are personal/grounded, not generic tourism facts

## P05 — FRIENDS ONLY

This is a hard acceptance gate.

Pass only when:
- page title clearly means friends memories
- `SHOGO FRIENDS` is an unmistakable cluster
- `SHIORI FRIENDS` is an unmistakable cluster
- final photo target is roughly 3–4 per cluster / 6–8 total when source quality supports it
- **no single giant page-wide hero/anchor photo exists**
- one locally stronger photo per cluster is allowed, but neither dominates the full page
- friend faces remain reasonably recognizable at A5
- photo arrangement feels editorial and layered, not two rigid UI cards
- captions are short and grounded
- enough calm space remains to understand the two clusters immediately

Automatic P05 fail:
- family content or `FAMILY` label appears
- P05 returns to `Family & Friends`
- one giant people photo dominates the page
- old Hawaii/proposal/arrival structure returns
- old P05 Hawaii title/proposal vessels determine current composition
- identities, relationships or anecdotes are inferred from faces
- friend photos become a tiny contact sheet

## P06

Pass when:
- page clearly reads as real life / favorites / best shots
- exactly Q5/Q6 are integrated when supplied
- real-life content remains distinct from P04 travel memories

## P07

Pass when:
- page visibly decelerates
- one strong calm photo + short thank-you message is sufficient
- old timetable/travel-guide/11-destinations/discovery content is absent

## P08

Pass when:
- it looks like a restrained magazine back cover
- information is minimal
- barcode human-readable digits are exactly `2026102400000`
- no long thank-you, collage, fake publisher/price/ISBN/JAN claim

## Spread acceptance

- P02–P03 = `WHO → STORY`
- P04–P05 = `PLACES WE REMEMBER → FRIENDS WE REMEMBER`
  - P04 may have a strong travel hero
  - P05 must use split SHOGO/SHIORI friends clusters and no giant hero
- P06–P07 = `REAL LIFE → THANK YOU`
- P08 stands alone

## Three-scale evidence

For every page/spread review:
1. thumbnail / 3-second scan
2. normal reading scale
3. A5 actual-size equivalent

P05 specifically must prove cluster recognition and face readability at A5.

## Print acceptance

`DESIGN_COMPLETE != PRINT_READY`.

Before print-ready claim verify:
- source provenance and final/proxy state
- effective PPI
- bleed / trim / safe
- center-fold risk
- exported PDF dimensions
- printer profile / CMYK / preflight
- physical proof where possible

`CURRENT ACCEPTANCE AUTHORITY OVERRIDES HISTORICAL P05 HAWAII/PROPOSAL EVIDENCE.`
