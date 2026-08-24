# Rurubu V8 AW7 — Reader-job Profile Note QA

Date: 2026-08-24
Scope: Rurubu WEDDING / V8 Profile+Q&A only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Authority before test

- V6 control remains frozen: `JC + IX + JB + IZ + IT + JA`.
- V7 current remains `C8 + K2 + F4 + G8 + H8 + C6D`.
- V8 Profile current before test: AW5 `2434:2`.
- V8 Drive authority: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`.
- No Drive write or image generation was performed.

## New professional research

This run studied interview/profile art direction rather than reusing recent pagination/section-marker research.

Useful observations:
- Society of Publication Designers' Anna Alexander describes *Interview* as a strict Q&A publication whose editorial art was portraiture, and emphasizes commissioning portraiture that is meaningful on its own rather than requiring explanatory headline/caption support.
- ori.studio's `Da大` lets the conversation dominate and makes typography support that conversation.

Rurubu-specific hypothesis: in a truth-gated Profile/Q&A page, support copy may frame how the reader enters the conversation, but should not invent a personality characterization merely to fill a quiet field.

## Live defect

AW5 `2434:2` already kept unresolved personal answers as native `回答待ち`, but visible note `2434:9 / P_NOTE` read:

`違うテンポで、\n同じ街を楽しむ。`

There is no cited personal-content authority for that characterization. Because the rest of the page is polished, the sentence can be read as a factual description of the real couple.

## Bounded comparison

### AW6 — subtraction test / REJECTED

- root: `2438:2`
- bounded change: hide only cloned `P_NOTE` (`2438:9`)
- image, prompts, `回答待ち`, grid, typography and palette preserved
- 500px result: truth-safe, but lower-left quiet field read as unfinished absence rather than deliberate pacing
- decision: REJECTED
- preserved hidden at `x=302000`

### AW7 — reader-job note / ADOPTED

- root: `2439:2`
- changed only cloned `P_NOTE` (`2439:9`)
- before: `違うテンポで、\n同じ街を楽しむ。`
- after: `答えを重ねて、\nふたりの輪郭をたどる。`
- semantic name: `P_NOTE / READER-FACING EDITORIAL JOB / NOT PERSONAL FACT`
- object portrait remains `PHOTO_DUMMY / PROFILE_OBJECT_PORTRAIT_REPLACEABLE / NOT FINAL`
- no factual answer, quote, personal trait, photo, crop or image hash added

## Three-scale QA

AW7:
- 500px whole-item: PASS; stronger than AW6 because the left page retains intentional closure without inventing personality
- 1400px reading/page: PASS
- 1587×1123 actual-size: DESIGN QA PASS

Structure readback:
- parent: `2052:2`
- visible native text: `20`
- IMAGE fill nodes: `1`
- text-text intersections: `0`
- 18px edge risks: `0`
- Japanese font mismatch: `0`
- current V8 root overlap after promotion: `0`

Final V8 current grid:
- AV3 `2431:2` — `0 / 8500`
- AW7 `2439:2` — `1800 / 8500`
- AL4 `2434:36` — `3600 / 8500`
- AQ5 `2434:74` — `0 / 9850`
- AS6 `2434:109` — `1800 / 9850`
- AT5 `2434:134` — `3600 / 9850`

Rollback/evidence:
- AW5 `2434:2` hidden at `x=300000`
- AW6 `2438:2` hidden rejected at `x=302000`

## Professional critique

- Art director: clear V8 restrained identity remains; no decorative filler was added.
- Editorial designer: support copy now tells the reader how the page works instead of pre-writing the subjects' character.
- Book designer: deletion-only AW6 was too empty; AW7 restores page closure without sacrificing truth.
- Typographer: existing type style, position and line rhythm remain; semantic responsibility changed, not typographic spectacle.
- Photo editor: object portrait is still a non-person structural dummy and does not claim provenance for the real couple.
- Print designer: this changes no pagination, printer-template, effective-resolution or print-ready state.

## Failure / learning

No new RSL ID is created. This is a deduplicated reproduction of **RSL-254**:

`F-RSL-254-PLAUSIBLE-PERSONAL-PROFILE-COPY-MASQUERADES-AS-VERIFIED-IDENTITY-FACTS`

Added local lesson: after removing unsupported personal facts, do not reintroduce an unsupported personality claim as atmospheric closing copy. If the page needs closure before real answers arrive, use clearly editorial reader-job copy or leave the role pending.

Tool failure observed once during promotion:
- attempted `figma.commitUndo()`
- environment returned unsupported API
- Figma call failed atomically; readback confirmed AW5/AW6/AW7 unchanged
- method switched immediately to supported node-property mutations and promotion succeeded
- no new project rule is promoted from this single occurrence

## Promotion

- AW7 `2439:2` → CURRENT / REAL-CONTENT-BLOCKED
- AW5 `2434:2` → hidden rollback
- AW6 `2438:2` → hidden rejected evidence

## Asset truth

- image generation: `0`
- Drive write: `0`
- new Drive master: `0`
- new image hash: `0`
- photo/crop change: `0`
- final photography adopted: `0`
- V6 change: `0`
- V7 production change: `0`

AW7 is DESIGN-QA-passed study evidence only. It remains REAL-CONTENT-BLOCKED and NOT PRINT READY.
