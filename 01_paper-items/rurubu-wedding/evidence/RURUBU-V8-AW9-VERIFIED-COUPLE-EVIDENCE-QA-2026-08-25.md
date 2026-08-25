# Rurubu V8 AW9 — Verified Couple Evidence QA

Date: 2026-08-25
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Problem observed

V8 AW8 `2459:2` was already truth-gated for unanswered profile/Q&A copy, but the only visible visual evidence on the profile page was still a generic object still-life:

- node `2459:35`
- name `PHOTO_DUMMY / PROFILE_OBJECT_PORTRAIT_REPLACEABLE / NOT FINAL`
- imageHash `e3738476f760932bb5b09c9d60f174dd6c84049d`

This was safe from identity fabrication, but it kept the character/profile spread abstract even though verified real-couple Hawaii photography had already become available elsewhere in the same Rurubu source authority.

## New professional research used

- Society of Publication Designers / Anna Alexander on *Interview*: Q&A stories were built around portraiture, and meaningful editorial portraits should carry meaning independently rather than function as generic filler.
- Society of Publication Designers / *Southern Women* behind-the-scenes: portrait-heavy books require chapter pacing, varied scale/angles and images that show subjects in their world rather than repeating a generic profile formula.
- Aperture / Stuart Smith: picture edit and sequence decisions are foundational to book design; use images that strengthen the book concept and remove images that do not contribute.

Sources:
- https://www.spd.org/first-love/2018/2/anna-alexander-director-of-photography-at-wired
- https://www.spd.org/behind-the-scenes
- https://aperture.org/editorial/design-photobook/

## Rurubu-specific hypothesis

For the restrained V8 Profile, replacing the generic object portrait with one small verified shared-couple image may make the page more human without importing V7's composition, photo density or magazine grammar.

This is not a rule that every profile needs a portrait. The test is whether the verified subject evidence improves the profile role while preserving V8's quiet sequence and truth boundaries.

## Bounded test

Created AW9 `2550:2` from live AW8 `2459:2`.

Changed only one replaceable image role:

- candidate image role `2550:35`
- source hash `c80602f1881db70f3a005651f982a0f38b294a9d`
- source meaning: verified real-couple Hawaii `036.jpg` screen derivative
- role: shared-couple evidence only; NOT bride-only, groom-only or answer-specific evidence
- visible geometry remains `235×190`
- no copy, type, Q&A hierarchy, color, grid or page geometry change

The image is a Figma screen derivative, not the high-resolution Drive master. Intrinsic Figma size read back as `350×233`.

## Before / after

### AW8

- object still-life was visually coherent but generic;
- did not fabricate identity;
- did not provide direct human evidence for a page titled `ふたりの輪郭。`;
- page remained more abstract than necessary after verified couple imagery became available.

### AW9

- the small image now shows the actual couple together;
- the photo remains subordinate to typography rather than becoming a V7-style hero;
- the page still reads as a restrained book profile;
- unanswered copy remains explicitly `回答待ち`;
- no person-specific claim is inferred from the image.

## Three-scale design QA

- whole-item / 500px: PASS; AW9 reads more immediately as a profile of the actual couple while retaining V8 restraint.
- reading / 1400px: PASS; typography remains primary and the image acts as one human evidence beat.
- actual-size / 1587×1123: DESIGN QA PASS; print-photo quality NOT approved because the Figma source is only `350×233`.

Structure readback:

- current root after promotion: `2550:2`
- parent: `2052:2`
- visible native text: `20`
- visible IMAGE roles: `1`
- image node: `2550:35`
- imageHash: `c80602f1881db70f3a005651f982a0f38b294a9d`
- Figma intrinsic image size: `350×233`
- text intersections: `0`
- 18px text edge risks: `0`
- Japanese text using Inter: `0`

## Professional critique

- Art director: PASS — page idea becomes more specific to the actual couple without changing V8's identity.
- Editorial designer: PASS — reading order and Q&A hierarchy remain unchanged; the image supports the profile job rather than becoming a new module.
- Book designer: PASS — the profile now introduces human evidence while later V8 spreads can remain more text-led, improving sequence variation.
- Typographer: PASS — no type change or new line-break defect.
- Photo editor: DESIGN PASS / HIRES BLOCKED — semantic role is correct, but high-resolution source placement is not yet verified.
- Print designer: BLOCKED for photo detail — printer template and high-resolution placement remain unresolved.

## Promotion

AW9 promoted:

- `2550:2 / V8 CLEANROOM AW9 / ... / CURRENT / ... / HIRES-PHOTO-BLOCKED`
- position `x=1800 / y=8500`
- visible `true`

AW8 preserved as rollback:

- `2459:2 / ROLLBACK / V8 AW8 / PROFILE+Q&A / PRE-VERIFIED-COUPLE-PORTRAIT-EVIDENCE / HIDDEN`
- `x=300000`
- visible `false`

## Learning state

Reproduction of RSL-269 in a materially different Rurubu system.

`RSL-269 / F-RSL-269-TRUTH-SAFE-PROFILE-REMAINS-ABSTRACT-DESPITE-AVAILABLE-VERIFIED-COUPLE-IMAGERY`

State strengthened to:

`VERIFIED_LOCAL_MULTI-SYSTEM / HIRES-ASSET-BLOCKED → CROSS_ITEM_CANDIDATE`

Do NOT transfer V7/V8 photo geometry, crop, styling or exact imagery to other Wedding items. Transfer only the decision principle: after verified subject imagery exists, re-audit generic/abstract visual evidence and test whether truth-safe subject evidence improves the live editorial role without inventing identity claims.

## Completion truth

AW9 is a current **DESIGN** candidate, not print-ready.

- real-couple semantic evidence: verified
- high-resolution Figma placement: blocked
- final Q&A answers: blocked
- printer template / preflight: blocked
- physical proof: blocked
