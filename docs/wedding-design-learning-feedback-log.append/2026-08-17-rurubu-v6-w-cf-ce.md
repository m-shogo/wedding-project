# 2026-08-17 — Rurubu V6 W + CF/CE

Scope: Rurubu WEDDING only. V7 remained HOLD.

## Observation

After CD/CE folio promotion, a full preferred-spread native typography audit found exactly two Japanese nodes still assigned to Inter: the Q&A closing pullquote and its note. Every other visible Japanese native-text node across Outer W + CD/CE used Noto Sans JP.

## Hypothesis

The mixed family was not serving an intentional editorial role. Even if fallback glyphs render, isolated Japanese copy in a Latin-family assignment weakens the typography system and can make future edits/wrapping less predictable.

## Bounded test

CF `1538:2` duplicated CD and changed only:

- Q&A closing pullquote → Noto Sans JP Bold;
- Q&A closing note → Noto Sans JP Regular.

No characters, sizes, text boxes, positions, images, crops, hashes, decoration or folios changed.

## Evidence

- whole CF 1000px: hierarchy visually unchanged;
- Q&A actual size `1538:39` 794×1123: PASS;
- pullquote remains two lines;
- text collision 0;
- 18px safe-area risk 0;
- post-promotion audit: Japanese non-Noto visible nodes = 0 across W + CF/CE.

## Adoption

- CF `1538:2` promoted to preferred Profile/Q&A;
- CD `1535:2` retained hidden rollback;
- CE `1535:78` unchanged preferred;
- Start Here: `V5 FU/FX · V6 W + CF/CE INSIDE STUDIES · V7 HOLD`.

## Asset lifecycle

Generated 0; Drive save 0; external binary placement 0; image hash change 0. This pass changed native font-family metadata on two Japanese text nodes only.

## Learning

RSL-058: audit font-family assignments, not only screenshots. Japanese copy can look acceptable through fallback while remaining typographically inconsistent. Any font-family correction must be revalidated at actual size because glyph metrics can alter wraps and collisions.