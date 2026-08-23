# RSL-239 — restraint can become absence when a role requires photographic evidence

Date: 2026-08-23
Source scope: Rurubu WEDDING / V8 Memory+Guide
State: `TESTED_LOCAL`

Failure fingerprint:
`F-RSL-239-RESTRAINED-SPREAD-WITHHOLDS-ROLE-NECESSARY-PHOTOGRAPHY-UNTIL-WHITESPACE-BECOMES-ABSENCE`

## Visible problem

V8 AQ2 `2335:2` improved the guide semantics and removed step/UI residue, but common-scale comparison against V6 IZ `2138:2` and V7 G2 `2299:2` exposed a larger role-level weakness: Memory/Guide is inherently place-memory oriented, while AQ2 remained entirely text-only. At thumbnail scale some of its quiet space read as missing evidence rather than deliberate pacing.

## Root-cause hypothesis

Editorial restraint is not the same as withholding every image. When a page role depends on place, atmosphere, object or moment recognition, a small number of semantically owned photographs may be necessary to make whitespace function as pacing. Without those anchors, quiet space can become absence and the publication can lose destination desire.

## Bounded test

AQ3 `2337:2` cloned current AQ2 and retained its exact native text, non-linear `朝 / 昼 / 夕 / 夜` navigation and typographic hierarchy. It added only two independent replaceable structural-photo roles using already existing verified Rurubu image hashes:

- `2337:35 / PHOTO_DUMMY / MEMORY_WATERFRONT_ESSAY_REPLACEABLE / NOT FINAL`
  - hash `539c259be8036b481d06b4f76db9a39b407d90e8`
  - editorial job: setting/closing horizon for the left sensory-memory page.
- `2337:36 / PHOTO_DUMMY / NIGHT_TABLE_ESSAY_REPLACEABLE / NOT FINAL`
  - hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
  - editorial job: visual close for `夜 / 食卓で終える`.

No V6/V7 composition, crop hierarchy, collage geometry or numbering system was copied. The existing bytes are explicit STRUCTURAL PHOTO DUMMIES, not final V8 assets.

## Evidence

Three-scale DESIGN QA:

- 500px whole-item: PASS; stronger than AQ2 within V8 because setting and closing beats are visible without becoming collage/UI.
- 1400px reading: PASS; type remains primary and the two images have different editorial jobs.
- 1587×1123 actual-size: PASS for design structure.

Structure/source readback:

- visible native text `17`
- IMAGE fills `2`
- text intersections `0`
- bounded 18px safe risks `0`
- waterfront intrinsic `1356×560`, placed `650×150`
- dining intrinsic `732×498`, placed `305×260`

Under the current unverified `420×297 mm` physical assumption, the rough limiting effective resolution is only about `200 ppi` for the waterfront role and `184 ppi` for the dining role. This prevents a print-photo approval.

AQ3 `2337:2` was promoted as `CURRENT / VERIFIED_LOCAL_DUMMY_DESIGN / REAL-CONTENT-BLOCKED`; AQ2 `2335:2` remains hidden rollback.

## Why state remains TESTED_LOCAL

The composition benefit is verified with structural dummies, but legitimate role-specific photography has not been generated/selected/saved/placed/verified, and exact print behavior is unresolved. Therefore this must not become a generalized project rule yet.

## Candidate principle to test later

When a restrained editorial spread looks empty, do not automatically add decoration or imagery. First identify whether the page role requires visual evidence of place, object, person, atmosphere or sequence. If it does, test a **small number of semantically distinct photographic anchors** while preserving hierarchy and rollback safety.

Promotion beyond local testing requires real content and actual-size/print evidence.

## Do not transfer

Do not transfer AQ3's two-photo count, exact source hashes, crop ratios, coordinates, cream/navy/rust palette, V8 typography or Memory/Guide composition.

This is not a blanket `quiet pages need photos` rule.
