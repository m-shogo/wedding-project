# Rurubu WEDDING V7 — semantic numbering comparison QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
V6 control: preserved `JC + IX + JB + IZ + IT + JA`
V8: preserved

## Fresh professional research used

This pass deliberately tested contradictory editorial-design viewpoints instead of reusing the recent map/folio rules.

- The Guardian redesign described readability and navigability as core design principles, and changed navigation to reflect how readers actually use the publication rather than internal organizational structure.
- Neville Brody's magazine-typography discussion distinguishes practical systems from tradition-for-tradition's-sake: if an element has a valid functional reason it can remain; even page-finding systems need a real finding job, while their exact visual device is open to redesign.
- The same discussion treats rhythm, surprise, image crop and type scale as part of the magazine journey, not decoration independent of content.

Rurubu-specific hypothesis:

> A number should not be removed merely because adjacent words also encode order. Keep or strengthen it when it demonstrably performs scanning/navigation/pacing. Conversely, a large number with no verified referent should be replaced or removed rather than used to simulate magazine structure.

## Experiment A — G3 semantic-time-only Memory/Guide

Source current: G2 `2299:2`.
Candidate: G3 `2378:2`.

Bounded change:

- hide the four large ordinal anchors cloned from G2;
- enlarge only existing semantic time labels `朝 / 昼 / 夕 / 夜`;
- preserve copy, photos, crop, palette, title, page geometry and all factual content.

Candidate nodes:

- hidden ordinals: `2378:16 / 2378:20 / 2378:24 / 2378:27`
- semantic time anchors: `2378:17 / 2378:21 / 2378:25 / 2378:28`

### Result

- 500 px whole-spread: structurally readable, but visibly calmer and weaker as V7 high-energy travel information.
- 1400 px reading: scan stops become less immediate; large empty intervals become more prominent.
- 1587×1123 actual canvas: readable, but the right page loses the strong punctuated rhythm carried by G2's colored ordinal anchors.
- structure: native visible text `16`, IMAGE fills `6`, text intersections `0`, 18 px edge risks `0`, Japanese-font mismatch `0`.

Decision: **REJECT** G3. It is now hidden as `2378:2 / REJECTED / ... / SCAN-RHYTHM-LOSS`.

G2 `2299:2` remains current and unchanged.

Reason: in this specific high-energy guide, the numbers do more than repeat `朝 / 昼 / 夕 / 夜`; they create fast entry points and visual tempo across separated photo/text beats. This is a direct failed transfer test of the quieter V8 ordinal-subtraction idea, not evidence that numbers are always required.

## Experiment B — C7 semantic cover quantity

Source current before test: C5 `2314:2`.
Candidate/current after test: C7 `2379:2`.

Observed defect:

The front cover contained a large `01` at `2314:26` without a verified page, feature, issue or sequence referent. The adjacent headline already states the actual reader-facing quantity: `今すぐ行きたい、ふたりの4つ。`

Bounded change:

- clone C5;
- change only the large front `01` to `4`;
- retain size, position, color role, photography, fixed `ハワイ / 旅するWEDDING` lockup, service list, date and all back-cover 01–04 navigation.

Current node:

- C7 root `2379:2`
- semantic quantity node `2379:26 / TEXT / V7_FRONT_BIG_4 / SEMANTIC QUANTITY`

### Result

- 500 px whole-item: PASS; large number still works as a high-energy image-to-headline bridge and now has a clear referent.
- 1400 px reading: PASS; `4` and `ふたりの4つ。` reinforce the same reader-facing proposition without inventing publication structure.
- 1587×1123 actual canvas: PASS for DESIGN QA.
- structure: native visible text `18`, IMAGE fills `6`, text intersections `0`, bounded 18 px edge risks `0`, Japanese-font mismatch `0`.
- expected one-character display node `4` is intentional, not an accidental Japanese one-character line break.

Decision: **PROMOTE C7 to current V7 Outer comparison**.

C5 `2314:2` is preserved hidden at x=300000 as rollback. Current C7 is `x=0 / y=13000 / visible=true / parent=2052:2`.

## Current-root integrity after promotion

Current V7 roots:

- C7 `2379:2`
- K `2303:2`
- F2 `2351:2`
- G2 `2299:2`
- H3 `2311:2`
- C6 `2316:2`

All are visible on page `2052:2`; pairwise current-root overlap count is `0`.

## Art-director / editorial / typography / photo / print critique

- Art direction: C7 improves editorial honesty without reducing V7's loud newsstand energy. G3 failed because it removed useful rhythm rather than merely redundant ornament.
- Editorial design: G2's numbers function as browse anchors; C5's front `01` had no comparable reader job. The two cases therefore require opposite decisions.
- Book/publication sequence: neither experiment invents pagination; the set remains `UNPAGINATED-STUDY`.
- Typography: existing Noto Sans JP assignments remain intact; no new copy was invented beyond changing the non-authoritative numeral to the already-explicit quantity `4`.
- Photo editing: all current V7 photography remains structural dummy material; no photography quality claim changes.
- Print: DESIGN QA only. Exact printer template, bleed/trim/fold, effective PPI for final photography, preflight and physical proof remain unverified.

## Asset truth

- image-model generation: `0`
- Drive writes: `0`
- new Drive masters: `0`
- new image hashes: `0`
- legitimate final Hawaii photography adopted: `0`
- photo placements/crops changed: `0`
- V6 changes: `0`
- V8 changes: `0`

Drive V7 authority was re-read before Figma writes: `1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x`; the existing seven PNGs remain non-authoritative for legitimate Hawaii photography unless separately verified.

## Learning result

- `RSL-250`: rejected transfer — removing numeric browse anchors can reduce scan rhythm when the number performs a real navigation/pacing job.
- `RSL-251`: verified local — a prominent editorial number should encode a real reader-facing quantity/sequence/finding role rather than simulate magazine structure.

Neither lesson is a blanket keep/remove-number rule.