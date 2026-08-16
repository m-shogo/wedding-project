# RURUBU V6 W + BZ/BY — Secondary Photo Anchor QA

Date: 2026-08-17
Scope: Rurubu WEDDING only. V7 remains HOLD.

## Live preferred
- Outer W: `1491:2` unchanged.
- Profile/Q&A BZ: `1514:2` (`PREFERRED / V6_INSIDE_BZ_QA_BOTTOM_PHOTO_FEATURE_2026_08_17`).
- Story/Chronology BY: `1510:2` (`PREFERRED / V6_INSIDE_BY_STORY_FEATURE_COLUMN_2026_08_17`).
- Start Here: `V5 FU/FX · V6 W + BZ/BY INSIDE STUDIES · V7 HOLD`.

## Story BY
Visible defect in BX: Story remained quieter and more template-like than chronology; lower support photography and cream field did not form a strong second editorial beat.

Bounded test: preserve chronology and all image hashes, promote the existing second Story photo to `515×350`, keep support-1 at intrinsic-safe `238×216`, and compress native Japanese copy into a narrow right editorial column over the existing composed texture.

QA:
- whole spread 500px: PASS
- whole spread 1200px: PASS
- Story actual-size 794×1123: PASS
- native text: 11
- replaceable IMAGE roles: 3
- text collision: 0
- 18px text safe-area risk: 0
- support-1 display/source: `238×216 / 240×220` PASS
- support-2 display/source: `515×350 / 810×552` PASS

Repair before adoption: first support-1 enlargement exceeded intrinsic width (`246 > 240`) and one anchor/anchor text collision was detected. Both were corrected before promotion.

Rollback: BX `1508:2` remains hidden as `ROLLBACK / V6_INSIDE_BX_PRE_BY_2026_08_16`.

## Q&A BZ
Visible defect in BW after BY promotion: Q&A lower half still read as floating questions plus a small support image.

Bounded test: add no new decoration or assets; promote the existing lower support photograph to a stronger page-level anchor (`430×330`) while leaving Q05/Q06 as native text in the complementary left field.

QA:
- whole spread 500px: PASS
- whole spread 1200px: PASS
- Q&A actual-size 794×1123: PASS
- native text: 25
- replaceable IMAGE roles: 2
- text collision: 0
- 18px text safe-area risk: 0
- hero display/source: `465×480 / 944×608` PASS
- support display/source: `430×330 / 732×498` PASS

Rollback: BW `1502:2` remains hidden as `ROLLBACK / V6_INSIDE_BW_PRE_BZ_2026_08_16`.

## Asset lifecycle truth
- newly generated images: 0
- new Drive saves: 0
- external binary placements: 0
- new raster bytes: 0
- existing verified replaceable photos recomposed: YES
- native editable text preserved: YES
- V7 touched: NO

## Result
`W + BZ/BY = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / NOT_PRINT_READY`.

Final photography, final personal copy, exact printer template, PDF preflight and physical proof remain outside this pass.