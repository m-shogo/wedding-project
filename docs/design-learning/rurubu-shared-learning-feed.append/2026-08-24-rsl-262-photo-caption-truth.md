# RSL-262 — Grounded specific copy must not authenticate an unverified photo

Date: 2026-08-24
Source scope/item: Rurubu WEDDING / V7 Memory+Guide
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Fingerprint:

`F-RSL-262-GROUNDED-SPECIFIC-COPY-ACTS-AS-A-CAPTION-FOR-AN-UNVERIFIED-PHOTO`

## Visible problem

A factual/grounded Hawaii proposal note sat directly below a structural photo dummy whose layer metadata explicitly said it was not final Hawaii photography. At reading scale the text therefore behaved like a conventional photo caption and could make the generic image appear to document the real Hawaii/proposal memory.

## Root-cause hypothesis

Source truth can leak across adjacent editorial roles. Correct native copy does not make an adjacent image correct. Proximity and caption grammar can transfer factual authority from words to an unverified photograph.

## Principle tested

When an image is not verified for the specific place/event/person role, do not let nearby grounded specific copy visually authenticate it as documentary evidence. Verify the image, disclose its role when reader-facing disclosure is appropriate, or separate the grounded copy from photo-caption ownership until legitimate photography exists.

## Bounded change

V7 G8 `2428:2` → G9 `2443:2`:

- moved only the grounded Hawaii/proposal note from directly below the secondary dummy to a standalone narrative position;
- copy, font, font size, images, crops, image hashes, palette and all other content remained unchanged;
- semantic node name changed from photo-caption role to grounded editorial note / not-a-photo-caption.

## Evidence

- 500px whole-item: PASS
- 1400px reading/page: PASS
- 1587×1123 actual-size: DESIGN QA PASS
- visible native text: `20`
- visible IMAGE fills: `6`
- text-text intersections: `0`
- 18px edge risks: `0`
- current G9 parent: `2052:2`
- old G8 preserved hidden at `x=300000`

Detailed evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V7-G9-PHOTO-CAPTION-TRUTH-QA-2026-08-24.md`

## Professional knowledge that changed the decision

Associated Press visual standards explicitly avoid generic/file imagery being mistaken for imagery photographed for a specific story and require image context to remain accurate. NPPA caption guidance likewise requires captions to accurately describe what is actually visible and provide necessary context.

The Rurubu decision extracted from these references is about editorial responsibility, not importing news-photo aesthetics or newsroom rules wholesale.

## Regression risk

Separating copy from an image can weaken image-caption binding or create dead space. The test therefore requires whole-item/page/actual-size comparison rather than automatic caption removal.

## What must remain Rurubu-specific

Do not transfer G9 coordinates, copy, colors, image roles, travel-magazine density or Hawaii story treatment.

## Cross-item applicability hypothesis

Other print artifacts may independently test this whenever a real place/event/person statement visually captions a placeholder, generic stock image, generated scene, archive image, or otherwise unverified visual. The transferable check is semantic ownership + source truth, not a prescribed layout.
