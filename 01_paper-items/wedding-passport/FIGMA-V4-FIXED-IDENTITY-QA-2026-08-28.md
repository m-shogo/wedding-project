# WEDDING PASSPORT V4 — fixed identity QA

Date: 2026-08-28
State: `FIXED_IDENTITY_ROLE_RESOLVED_LOCAL / SVG_ADOPTED / DRIVE_MASTER_SAVED / THREE_SCALE_FRONT_QA_PASS / NOT_PRINT_READY`
Start main: `016d2b4b199993f533e68b4e74d92474c7c225c0`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Figma: `UbK8KmuWJcDeGScsN49Uor`
Front root: `226:2`
Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
Reference study: Drive `1ldCXv5kaHqRpSBdbzyLPvYp0FxPE6MvZTwFJACoe8RM / 01_パスポート風｜参考画像ギャラリー・分析`

## V4 clean-room decision

The prior low-information meridian/orbit placeholder on the V4 cover was not strong enough against the current Passport reference direction. No legacy production emblem, prior generated asset, Rurubu-specific visual rule, fake passport credential, airplane motif, or official-crest-like mark was reused.

Two materially different clean-room editable SVG directions were authored outside production for comparison:

- `243:2 / QA / V4 PASSPORT / IDENTITY CANDIDATE A / ADOPTED / CELESTIAL ATLAS`
  - asset node `243:4 / SVG / CELESTIAL ATLAS / CLEAN EDITABLE`
  - visual role: archival celestial atlas / paired journey routes / restrained passport-booklet identity
  - no text baked into the SVG
- `243:3 / QA / V4 PASSPORT / IDENTITY CANDIDATE B / REJECTED / TWIN ROUTE SEAL`
  - asset node `243:25 / SVG / TWIN ROUTE SEAL / CLEAN EDITABLE`
  - rejected because it read more like an abstract monogram and carried less recognizable booklet/travel-document identity at thumbnail scale

Candidate A was adopted into the clean-room front as:

- `226:9 / ROLE / FIXED IDENTITY FIELD / SVG ADOPTED / CELESTIAL ATLAS`
- `243:42 / SVG / FIXED IDENTITY / CELESTIAL ATLAS / V4`

The former placeholder nodes `226:10` and `226:11` are retained but hidden for rollback evidence.

## Composition correction

Initial adoption at `720 × 468 px` was still too weak at thumbnail scale. The identity role was strengthened and the vertical rhythm tightened:

- identity field y: `900 → 835`
- adopted SVG: `720 × 468 → 820 × 533 px`
- adopted SVG placement inside field: `x=60 / y=45`

This increases the cover's second visual anchor without competing with the native title/date hierarchy.

## Reference-led color / hierarchy

The V4 front remains independent from any Rurubu-specific palette or density system.

- dominant: deep navy
- support/text: warm ivory
- accent: muted gold
- first read: Japanese title / `WEDDING PASSPORT`
- second read: date + Yokohama
- third read: celestial fixed identity
- final read: native couple-name placeholders

The adopted identity uses linework and paired route motion rather than a generic airplane, badge, official crest, or fake credential.

## Hybrid authoring / structure readback

Front structure readback after adoption:

- visible native text nodes: `226:5`, `226:6`, `226:7`, `226:8`, `226:13`
- IMAGE fills in front subtree: `0`
- adopted asset type: editable Figma `FRAME` containing vector descendants
- adopted asset descendant count: `20`
- variable names/date/copy remain native Figma text
- no raster flattening introduced

Therefore effective raster PPI is `N/A` for this fixed identity role. Vector line quality is resolution-independent, but physical line-weight and CMYK proof remain required.

## Drive master

The adopted clean-room SVG master was saved to the Passport production asset library:

- folder: `20_制作素材 / 01_ベクター・アイコン`
- folder ID: `1zs8Y7jVKW7xqng_U9Hr2aKZxyySbbym2`
- file: `V4_passport_celestial_atlas_fixed_identity.svg`
- Drive file ID: `1-N3StXIINwgV-z-qr5Fc83KP2Wm7I0S3`
- MIME: `image/svg+xml`

## Three-scale visual QA

Fresh cover screenshots were reviewed after adoption and after the scale/rhythm correction:

- thumbnail: `maxDimension=500` — title remains first read; identity now survives as a clear second anchor and no longer disappears into the large navy field
- reading: previous `maxDimension=1000/1480` review confirms the atlas geometry remains clean and does not collide with title/date/names
- native geometry: front remains `1480 × 2100` with all guest-facing text in bounds

The identity comparison itself was also rendered at `940 × 650` for both candidates before adoption.

## Print-first QA

Working front geometry is still provisional A5-class `1480 × 2100` (`10 px ≈ 1 mm` working scale only, not vendor authority).

For the adopted SVG:

- raster PPI: `N/A`
- primary print risk: thin muted-gold strokes after CMYK conversion and on the final stock
- required final proof: 100% output check that the lightest internal atlas lines do not disappear or break
- deep navy / muted gold must be checked after actual CMYK/profile conversion rather than approved from Figma RGB alone
- vendor-confirmed bleed / trim / safe-area geometry remains deferred

`DESIGN_COMPLETE != PRINT_READY` remains mandatory. Printer template, color profile, PDF export/preflight, final stock, and 100%/physical proof are still outstanding.

## Result

The previous `FIXED_IDENTITY_ASSET_MISSING` blocker is locally closed for the clean-room V4 front. This does **not** yet grant `SELLABLE_VISUAL_QA_PASS` for the full Passport family.

Next highest-value work:

1. re-audit front/back/menu/seating as one four-face family against the current Passport reference study;
2. test whether the flat interior fields need a subtle fixed paper treatment or whether typography alone is stronger;
3. run final actual-size microtype / line-weight review before deciding Passport V4 sellable visual status;
4. only after the V4 family is independently mature, compare against retained production for promotion.

Learning state for this role: `VERIFIED_LOCAL`.