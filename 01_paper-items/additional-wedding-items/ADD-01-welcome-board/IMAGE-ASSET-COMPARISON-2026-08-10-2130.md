# ADD-01 ウェルカムボード — paper texture comparison follow-up

Date: 2026-08-10
Authority at write: latest observed `main` = `bf93af3da1c82809b37c283c3904d348f3f54299`; Current = `docs/automation/non-rurubu-figma-quality-current.md` (`VISUAL_REOPENED`).

## Live targets

- Figma file key: `XyyTGuz6BMf8XRhPZZfdoT`
- production: `1:3 / FRAME_ADD_01_WELCOME_A2_PORTRAIT`
- Drive authority: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg / ADD-01_ウェルカムボード`
- new comparison asset: `1kcfeVRSkykFME5Xx_sSB2UNiPiM7yxBG / ADD-01_WARM_ARCHIVAL_PAPER_MASTER_v2.png`

## Screenshot-supported diagnosis

Fresh production screenshot still confirms that the real couple hero must remain a replaceable real-photo role. The surrounding ivory field is intentionally restrained and does not justify synthetic people or generic travel imagery.

A non-person archival-paper candidate was therefore produced as a bounded comparison: warm ivory, low-contrast grain/fibres, no text, no UI, no people, no variable wedding information. Drive metadata readback confirmed the master in the exact ADD-01 authority folder.

## Figma live readback and decision

Live Plugin API readback showed production already contains `8:2 / IMG_PAPER_TEXTURE_REPLACEABLE` as the bottom child, `IMAGE` fill, opacity ~0.16, blend mode `MULTIPLY`.

Because a production paper texture already exists and the new v2 does not fix a new screenshot-supported defect, it was **not layered or substituted**. Adding another texture would be duplicate decoration rather than a material visual improvement.

Decision: `COMPARISON_CANDIDATE_RETAINED / NOT_ADOPTED / PRODUCTION_UNCHANGED`.

## Image-generation status

`IMAGE_GEN_UNAVAILABLE_THIS_RUN` for model-generated editorial imagery. The comparison master is a procedural raster texture, not an AI-generated photograph/illustration, and is recorded as such.

## Learning

Before producing another background/texture for a reopened item, first inspect the live production child tree for an existing replaceable image role. Do not regenerate or stack paper grain when the current asset already solves the diagnosed defect. Reserve future image work for a materially missing role such as a real-photo crop, destination-specific non-person editorial visual, or another screenshot-supported gap.

No RURUBU/るるぶ file, node, Drive item, or GitHub path was read or written by this follow-up.
