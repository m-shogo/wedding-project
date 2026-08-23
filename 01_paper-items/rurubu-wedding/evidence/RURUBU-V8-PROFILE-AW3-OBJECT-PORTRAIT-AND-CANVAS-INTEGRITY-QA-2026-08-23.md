# Rurubu V8 Profile AW3 — Object Portrait + Live Canvas Integrity QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Authority / scope

- V6 control `JC + IX + JB + IZ + IT + JA` preserved unchanged.
- V7 `C5 + K + F2 + G2 + H3 + C6` preserved unchanged.
- No Passport / Boarding Pass / 青春ふたりきっぷ / ADD production state was inspected or edited.
- Shared neutral design-learning feeds were consumed only as allowed by the scope firewall.

## New professional-research hypothesis

Fresh research rotated toward editorial portraiture through lived environments and objects. The project-local hypothesis was:

> If verified real-person photography is unavailable or inappropriate, a restrained Profile page may test one non-person object/environment image as character evidence while keeping identity and facts native. The image must have a semantic owner and must never imply that an invented recognizable person is the real couple.

This is a local hypothesis, not a rule that every Profile needs a photograph.

## Live comparison-board failure discovered before design promotion

Programmatic readback of the six current V8 roots found:

- AV2 `2347:2`: `x=1750 / y=8500`
- AW2 `2329:2`: `x=1800 / y=8500`

Both are `1587.4×1123`, producing an overlap area of approximately `1,726,500 px²`.

Isolated node screenshots for AV2 and AW2 still rendered correctly, so node-only QA did not expose the invalid comparison-board state.

### Corrected method

After a fresh live-state readback:

- AV2 `2347:2` only was moved to `x=0 / y=8500`.
- No AV2 child layout, crop, text, image, color or content changed.
- Parent remained `2052:2` and visibility remained true.

Post-correction current V8 root geometry:

- AV2 `2347:2`: `0 / 8500`
- AW3 `2357:2`: `1800 / 8500`
- AL2 `2332:2`: `3600 / 8500`
- AQ3 `2337:2`: `0 / 9850`
- AS4 `2355:27`: `1800 / 9850`
- AT3 `2342:2`: `3600 / 9850`

Formal pairwise overlap readback after AW3 promotion: `0` overlap pairs.

## AW3 bounded experiment

Baseline: AW2 `2329:2`.

AW2 had a strong typography-led Profile/Q&A structure but no visible image. Its existing image node `2329:6` remained hidden and was not simply revealed.

Rollback-safe candidate:

- root: `2357:2`
- current name: `V8 CLEANROOM AW3 / BOOK EDITION / PROFILE+Q&A / OBJECT-PORTRAIT / CURRENT / VERIFIED_LOCAL_DUMMY_DESIGN / REAL-CONTENT-BLOCKED / 2026-08-23`
- photo role: `2357:35 / PHOTO_DUMMY / PROFILE_OBJECT_PORTRAIT_REPLACEABLE / NOT FINAL`
- photo placement: `x=54 / y=535 / 235×190`
- imageHash: `e3738476f760932bb5b09c9d60f174dd6c84049d`
- source role: existing Rurubu non-person camera/rings/flowers flatlay reused only as STRUCTURAL PHOTO DUMMY
- new generated recognizable people: `0`
- native/factual copy changes: `0`
- new card/pill/badge/shadow/gradient/sticker/decorative-English module: `0`

The object image is deliberately subordinate to the two profile voice beats and does not become a portrait substitute for either named person.

## Three-scale QA

- 500 px whole-item: **PASS / stronger than AW2 within V8**
- 1400 px reading: **PASS**
- native `1587×1123`: **PASS for DESIGN QA**

Structure:

- visible native text: `23`
- visible IMAGE fill: `1`
- text intersections: `0`
- bounded 18px safe risks: `0`
- page parent: `2052:2`

Promotion readback:

- AW3 `2357:2`: `visible=true / x=1800 / y=8500 / parent=2052:2`
- AW2 `2329:2`: `visible=false / x=300000 / y=8500 / parent=2052:2`
- AW2 preserved as `ROLLBACK / V8 AW2 / PROFILE+Q&A / PRE-OBJECT-PORTRAIT / HIDDEN / 2026-08-23`

## Professional critique

### A. Art director
PASS. The page gains a specific lived/object cue without losing the V8 book identity or becoming a photo collage.

### B. Editorial designer
PASS. The image has a semantic character-evidence role and leaves Q&A order untouched.

### C. Book designer
PASS. The Profile no longer becomes a complete visual stop between photographic Outer and later spread roles; the tempo change remains restrained.

### D. Typographer
PASS. Native Japanese copy, identity, factual wording and hierarchy remain unchanged/editable.

### E. Photo editor
`STRUCTURAL PASS / REAL CONTENT BLOCKED`. Current asset proves role and pacing only. It is not adopted legitimate Profile photography.

### F. Print designer
DESIGN QA only. Exact printer template, bleed/trim/fold, final image source/crop/effective PPI, PDF preflight and physical proof remain unverified.

## Failure learning

### RSL-245
Fingerprint: `F-RSL-245-CURRENT-COMPARISON-ROOTS-OVERLAP-WHILE-ISOLATED-NODE-QA-STILL-PASSES`

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Lesson: a current comparison board must be validated at root/page geometry level after promotions/moves. Isolated screenshots can all pass while the live board contains invalid root overlaps.

### RSL-246
Fingerprint: `F-RSL-246-RESTRAINED-PROFILE-WITHHOLDS-NONPERSON-LIVED-EVIDENCE-UNTIL-CHARACTER-PAGE-BECOMES-ABSTRACT`

State: `TESTED_LOCAL`

Lesson: when real-person imagery is unavailable, one role-owned non-person object/environment image may be tested as character/lived evidence. Do not infer a blanket rule to add photos, and never allow an invented recognizable person to inherit a real identity label.

## Asset / truth state

- new image-model generation: `0`
- Drive writes: `0`
- new Drive masters: `0`
- new image hashes: `0`
- adopted legitimate final photography: `0`
- structural dummy role newly added: `1`
- factual/native copy changed: `0`
- V6 changed: NO
- V7 changed: NO
- DESIGN QA: PASS
- REAL CONTENT QA: BLOCKED
- PRINT TEMPLATE/PREFLIGHT: NOT VERIFIED
- PHYSICAL PROOF: NOT VERIFIED
