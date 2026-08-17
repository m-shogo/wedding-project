# Rurubu WEDDING V6 — AD + DK/DE Q&A asymmetric closing QA

Date: 2026-08-18
Scope: Rurubu WEDDING V6 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Live preferred state after experiment

- Outer AD `1626:99` — unchanged preferred.
- Profile / Q&A DK `1650:87` — `PREFERRED / V6_INSIDE_DK_QA_ASYMMETRIC_CLOSING_FEATURE_2026_08_18`.
- Story / chronology DE `1624:18` — unchanged preferred.
- Start Here: `V5 FU/FX · V6 AD + DK/DE INSIDE STUDIES · V7 HOLD`.
- Previous DJ `1640:2` is preserved hidden as rollback.

## Visible problem

DJ had already established Q01 as a photo-bound feature, retained the contrast-critical Q02/Q03 binding strip and promoted Q04 into a native editorial feature. The final Q05/Q06 region still ended the page with two similarly weighted prompt modules. At thumbnail and reading scales, that symmetry retained a small amount of questionnaire/form rhythm at the point where the spread should close editorially.

## Bounded treatment

DK was created from a rollback-safe clone of DJ.

- Q05 was reduced to a quieter support beat.
- Q06 was promoted into the final closing feature using native typography only.
- Added one small native kicker: `OUR NEXT CHAPTER`.
- No card, rounded panel, shadow, gradient, generated decoration or new raster was introduced.
- Q01–Q04, both replaceable Q&A photos, image hashes and established photo geometry remained unchanged.
- Variable Q05/Q06 question/answer copy remained native editable text.

## Variable-copy structure and failure evidence

The first realistic-copy proof exposed one real defect: Q05 used fixed-Y question/answer placement and collided when the question wrapped. Q06 had already been moved into a native vertical auto-layout stack and remained stable.

Failed proof retained hidden:

- `1650:174` — `FAILED_PROOF / V6_INSIDE_DK_QA_CLOSING_LONG_COPY_Q5_FIXED_Y_COLLISION_2026_08_18`.

The preferred DK was then corrected:

- Q05 → `STACK / QA_Q5_SUPPORT_COPY` `1650:261`, vertical Auto Layout, auto-height native text.
- Q06 → `STACK / QA_Q6_CLOSING_COPY` `1650:173`, vertical Auto Layout, auto-height native text.

Second long-copy proof retained hidden after PASS:

- `1650:262` — `PROOF_PASS / V6_INSIDE_DK_QA_CLOSING_LONG_COPY_2_2026_08_18`.

Stress copy included materially longer Japanese prompts and answers for both Q05 and Q06. Final proof readback:

- Q05 stack bottom: 1005px;
- Q06 stack bottom: 1002px;
- text collisions: 0;
- 18px text safe-area risks: 0;
- page overflow: 0.

Normalized failure family: `PHOTO_BOUND_NATIVE_COPY_FIXED_Y_COLLISION` / repeated-variable-copy fixed-Y placement. Resolution: do not cosmetically retry fixed-Y; use native auto-height stacks and rerun realistic-copy proof.

## Three-scale / structural QA

Preferred DK was visually inspected at:

- whole spread / thumbnail: PASS;
- reading scale: PASS;
- Q&A actual-size `1650:127`, 794×1123: PASS.

Final normal-copy structural readback:

- Q&A visible native text: 27;
- Q&A visible IMAGE roles: 3;
- text collisions: 0;
- 18px text safe-area risks: 0;
- page overflow: 0.

Profile retained one existing intentional edge-led hero bleed. A direct geometry comparison between source DJ and DK confirmed the Profile hero is identical (`x=0`, `y=140`, `w≈794`, `h=328` relative to the Profile page), so this was not introduced by DK.

## Asset lifecycle truth

- newly image-generated assets: 0;
- newly adopted generated assets: 0;
- new Drive saves: 0;
- new external binary placements: 0;
- new raster bytes: 0;
- image hashes changed: 0;
- replaceable Q&A photo roles preserved: YES;
- variable copy remains native: YES;
- rollback preserved: YES;
- V7 touched: NO.

Fresh Drive readback confirmed V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02` remains live. Existing generated Profile/Q&A/Timeline/Memories masters remain stored and unadopted; no Drive write occurred.

## Result

`DK VERIFIED_LOCAL / PREFERRED`

The final page ending is now intentionally asymmetric: Q05 works as a quiet bridge while Q06 provides a stronger native editorial close. Exact Q05/Q06 wording, sizes, coordinates, colors and the Rurubu layout remain Rurubu-specific.