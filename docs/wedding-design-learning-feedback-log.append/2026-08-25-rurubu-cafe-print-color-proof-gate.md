# Rurubu Cafe/Table — print-color proof gate added before real-photo production

Date: 2026-08-25
Scope: Rurubu WEDDING only

## New knowledge, not yet a rule

This run rotated research from photo-role selection to **print color management and proofing**.

New observation: food/editorial photography cannot be approved solely by an RGB screen. JAGAT separates gamut/profile analysis, print color management and color proofing from ordinary image editing; the final result depends on actual output conditions. SAVEUR's food-first editorial history also reinforces that believable food texture/context matters more than pristine synthetic polish.

## Decision change

Before this pass, H10/AS7 photo authorities mainly gated semantic role, source truth, crop, sequence and effective resolution. They now also explicitly reserve a separate **PRINT COLOR / PROOF** gate.

- V7 `2305:2`: added `2530:31` + `2530:32`; hidden rollback `2530:2`.
- V8 `2527:2`: added row `2530:64` with `2530:65` + `2530:66`; hidden rollback `2530:33`.
- Both authorities passed screenshot + geometry QA after the write.
- H10 `2467:2` and AS7 `2454:25` production were intentionally untouched.

The new decision principle is different for the two systems:

- V7: energetic color must not depend on oversaturation, black crush or clipped food highlights to create appetite.
- V8: restraint must not be confused with muddy, low-contrast reproduction; subtle food/plate/gesture/shadow separation still has to survive paper.

## Learning state

`OBSERVED → ROOT_CAUSE_HYPOTHESIS`

No new RSL is promoted because the project still lacks role-correct Cafe/Table photography and real printer/paper/ICC proof conditions. The method becomes project learning only after a real photo candidate demonstrates that this gate changes an adoption or correction decision.

## Truth

No image was generated, no Drive file was written, no production photo was placed, no current V7/V8 spread was promoted, and V6 stayed frozen.