# RSL-262 reproduction — V8 Memory / AQ7

Date: 2026-08-24

## Existing fingerprint

`RSL-262 / F-RSL-262-GROUNDED-SPECIFIC-COPY-ACTS-AS-A-CAPTION-FOR-AN-UNVERIFIED-PHOTO`

No new failure ID is created. The V8 Memory role reproduces the same root cause previously verified in V7 G9.

## Reproduction

AQ5 `2434:74` used grounded copy for Hawaii/proposal and Yokohama/current destination while two nearby image layers were explicitly `NOT VERIFIED PLACE IMAGE / NOT FINAL`. Live geometry audit measured copy-to-dummy distances as low as 20 px. Readers cannot see Figma layer names, so the proximity gave unverified photography documentary authority.

## Tested correction

AQ6 simply withheld the two dummies but was rejected because the resulting lower whitespace read as missing content.

AQ7 `2449:2` keeps the dummies hidden and repositions only existing grounded closing text so the whitespace becomes a content-owned cadence rather than a vacant image slot. 500 / 1400 / actual-size QA passed with zero text collision, zero 18px edge risk, zero Japanese/Inter mismatch, and zero current-root overlap.

## Learning state

RSL-262 strengthens from `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE` to **`VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`** because the same source-truth defect and correction principle now reproduce in materially different V7 high-energy travel-magazine and V8 restrained book-editorial systems within Rurubu WEDDING.

This is still not `VERIFIED_CROSS_ITEM`: both tests are inside the same Rurubu WEDDING item.

## Strengthened principle

When grounded specific copy is paired with an unverified image, the layout relationship itself can create a false documentary claim. Fixing source truth may require withholding the image. If removal makes the page feel unfinished, do not re-add the unverified image or add decorative filler merely for balance; rebuild pacing from grounded content until legitimate role-specific photography exists.

Do not generalize AQ7 coordinates or a photo-free Memory spread as a project-wide style rule.
