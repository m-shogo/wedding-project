# Rurubu V7 G9 — Photo/Caption Truth QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Baseline: G8 `2428:2`
Candidate/adopted: G9 `2443:2`

## New professional research

This run rotated to visual-journalism caption/context integrity rather than repeating grid, pagination, or Japanese line-break research.

Useful high-quality references:

- Associated Press News Values / Telling the Story: generic/file/library imagery must not be presented in a way that can be mistaken for imagery photographed for the specific story; archive imagery is identified as such, and visual context must remain accurate.
- NPPA Best of Photojournalism caption guidance: captions must accurately describe what is actually visible in the photograph and provide necessary context.

Rurubu-specific hypothesis: even when native copy is factually grounded, placing it directly as a caption under an unverified structural photo dummy can falsely transfer that factual authority onto the image. The problem is semantic ownership, not only the correctness of the words.

## Live defect

G8 `2428:2` had grounded native text:

`ハワイ / プロポーズの記憶`
`タンタラスもビーチも雨。`

at `2428:9`, directly under structural photo dummy `2428:8`.

The image layer itself was explicitly named `STRUCTURAL PHOTO DUMMY / V7 MEMORY SECONDARY / NOT FINAL HAWAII`, but the reader cannot see layer metadata. At 1400px the text read visually as a normal photo caption, which could imply that the adjacent generic street image depicted the Hawaii/proposal memory.

## Bounded experiment

Created rollback-safe G9 `2443:2` from G8.

Only the semantic ownership of the grounded note changed:

- node `2443:9`
- copy unchanged
- font unchanged: Noto Sans JP Regular / 14px
- old position: `x=465 / y=852 / w=270`
- new position: `x=40 / y=800 / w=360`
- renamed to `TEXT / V7 MEMORY NOTE / GROUNDED COPY / NOT A PHOTO CAPTION / PHOTO UNVERIFIED`

No image, crop, image hash, palette, title, guide copy, or route fact changed.

## Three-scale QA

- 500px whole-item: PASS. The Hawaii/proposal note reads as editorial narrative rather than as metadata for the street dummy.
- 1400px reading/page: PASS. The note remains subordinate to the main sensory copy while staying visually independent of the secondary photo.
- 1587×1123 actual-size: PASS for DESIGN QA.

Structure readback before promotion:

- parent: `2052:2`
- visible native text: `20`
- visible image fills: `6`
- text-text intersections: `0`
- 18px edge risks: `0`

## Professional critique

- Art director: V7 travel-magazine energy is preserved; the change does not turn the spread into a quieter V8-like system.
- Editorial designer: grounded memory copy now has a clear editorial role independent of uncertain photography.
- Book designer: the left-page sequence remains dominant image → trip summary → grounded memory note → reflection.
- Typographer: copy, typeface, size, line-breaks, and hierarchy are retained.
- Photo editor: the structural dummy no longer receives an implicit specific-event caption. This is the critical improvement.
- Print designer: no final-photo, effective-PPI, printer-template, or print-ready claim is added.

## Promotion / rollback

Promoted:

- G9 `2443:2` → current V7 Memory comparison at `x=10700 / y=13000`, parent `2052:2`.

Preserved rollback:

- G8 `2428:2` → `ROLLBACK / V7 G8 / MEMORY+GUIDE / PRE-PHOTO-CAPTION-TRUTH-SEPARATION / HIDDEN`
- `x=300000 / visible=false`, parent `2052:2`.

## Asset truth

- image generation: `0`
- Drive write: `0`
- new Drive master: `0`
- new image hash: `0`
- final Hawaii/place photography: `0`
- photo/crop change: `0`

G9 remains `REAL-PHOTO-BLOCKED` and is not print-ready.

## Learning state

New fingerprint: **RSL-262**

`F-RSL-262-GROUNDED-SPECIFIC-COPY-ACTS-AS-A-CAPTION-FOR-AN-UNVERIFIED-PHOTO`

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

The transferable principle is not “move captions left.” It is: when an image is unverified, do not let nearby grounded place/event copy visually authenticate that image as documentary evidence. Either verify the image, explicitly disclose its role where appropriate, or separate the copy from photo-caption ownership until legitimate photography exists.
