# Rurubu V8 Profile/Q&A P — Asymmetric Voice Rhythm QA

Date: 2026-08-22
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current candidate: `2194:2`
Rollback source: `2177:2`
Scope: Rurubu WEDDING only

## Problem observed

Profile/Q&A H was structurally valid but still read as a polished wireframe at whole-spread scale:

- the left profile page treated the two people as two nearly equal information columns;
- the right Q&A page used three equal-height question rows with two equal divider rules;
- removing images had reduced false-photo semantics, but the remaining equal-module rhythm still carried UI/template behavior.

## New professional input

This run deliberately sought adjacent editorial viewpoints rather than rereading the prior V8 sources.

- Gail Bichler / *The New York Times Magazine*: strong magazine design responds to the material and tells stories through image/type rather than imposing one neutral page template.
- Mainstudio / Mark Magazine: a small number of structural constraints can support a dynamic grid, while content remains instrumental to each page decision.
- Revue Maison: publication pacing benefits from alternating moments of intensity and breathing space rather than giving every contribution the same visual tempo.

These were used as decision principles only; no layout, palette, typeface, or branded treatment was copied.

## Hypothesis

If a type-led spread has valid content but still looks templated, removing cards is not enough. The semantic roles themselves need different visual weights. The two people can read as a typographic dialogue, while Q1/Q2/Q3 can function as entry / support / close instead of three equal rows.

## Bounded change

Created rollback-safe Profile/Q&A P `2194:2` from H.

Left page:

- preserved all native factual/profile copy;
- enlarged `SHOGO` and `SHI-CHAN` into intentionally unequal, staggered typographic portrait beats;
- moved supporting descriptors with their owners;
- removed the nonessential horizontal profile rule;
- retained the large native `01` and folio system.

Right page:

- removed the two equal row dividers;
- promoted Q1 to the primary reading entry;
- kept Q2 as a smaller middle beat;
- indented and enlarged Q3 as a closing beat;
- preserved all question and answer wording as native text.

No image, gradient, card, badge, shadow, decorative English, or generated asset was added.

## Rejected / avoided behavior

No attempt was made to fill the quiet right-page lower field with arbitrary shapes, fake photography, oversized decorative letters, or an invented fourth Q&A item. The breathing space is accepted only because the three questions now have materially different roles and the spread has a strong left-page counterweight.

## Three-scale QA

- 1000px whole spread: PASS; materially less equal-module / wireframe reading than H.
- 1587×1123 actual-size: PASS; name scale remains legible and Q&A reading order is unambiguous.
- structure QA: PASS.

Structure readback:

- visible native text: `25`
- IMAGE roles: `0`
- text intersections: `0`
- 18px safe-area risks: `0`
- variable/factual copy remains native text
- H `2177:2` preserved as hidden rollback

Japanese semantic-wrap check: PASS. The only intentional multiline profile note breaks at a sentence boundary (`歩く人と、食べる人。` / `違うテンポで、同じ街を楽しむ。`); no orphaned inflection, one-character tail, or machine-looking clause break was introduced.

## Promotion

P `2194:2` promoted to live Current.
H `2177:2` renamed/hidden as rollback.

## Concurrent live-authority reconciliation

Before promotion, live Figma also showed Cafe/Table O `2191:2` as visible Current while GitHub still named Cafe L `2183:2` Current. This run did not author Cafe O. It re-read O before writing and verified:

- visible: true
- native text: `16`
- IMAGE: `0`
- text intersections: `0`
- 18px safe-area risks: `0`

The durable Current status is reconciled to the live Cafe O root without claiming authorship of that concurrent change.

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new Figma image placement: `0`
- V6/V7 image reuse: `0`

Drive V8 authority folder was re-read: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo / RURUBU_V8_EDITORIAL_MONOGRAPH_2026-08-21`.

## Decision

`VERIFIED_LOCAL / PROFILE_P_CURRENT / NOT_GLOBAL_WINNER / NOT_PRINT_READY`

The remaining V8 weakness is still destination-specific photographic desire. This Profile improvement should not be generalized into a type-only rule for every spread.