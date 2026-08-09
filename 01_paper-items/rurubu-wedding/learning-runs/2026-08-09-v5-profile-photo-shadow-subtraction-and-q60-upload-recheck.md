# Rurubu V5 — profile photo shadow subtraction + Q60 upload recheck

Date: 2026-08-09
Status: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / COVER_HERO_TRANSFER_STILL_BLOCKED`

## Authorities re-read

Before the live design pass, the run re-read the project-wide production, asset-generation, AI-learning, feedback-log, project-memory, and quality-over-legacy authorities, plus the current Rurubu V5 status. Live Figma remains the highest authority.

## Cover hero transport recheck

Visible blocker remains `V5-01 / 77:148 / IMG_HERO`.

Verified Drive derivative:

- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- filename: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- MIME: `image/jpeg`
- bytes: `155,439`
- geometry from ledger/current status: `1330 × 1220`
- SHA-256 from ledger/current status: `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

Drive raw streaming successfully materialized the real JPEG into the runtime. A new Figma `upload_assets` single-use URL was obtained for rollback-safe staging target `469:132`, but the raw binary POST again failed at DNS resolution for `mcp.figma.com`. This matches the prior blocker fingerprint, so the method was stopped rather than retried.

No Current photo role, image hash, or completion count was changed. Official gate remains `PHOTO_ROLE_PASS 10/11`, `ROLE_COMPLETE 10/11`, `DOMINANT_PHOTO_PASS 2/3`.

## Visible design problem

The live inside-left profile portraits `77:296 / IA_PROFILE_A_PHOTO` and `77:302 / IA_PROFILE_B_PHOTO` still carried the same UI-like drop shadow:

- white 4 px inside stroke
- drop shadow radius 10
- shadow offset y=5
- dark navy at ~16% alpha

The white photo edge had an editorial framing role, but the shadow added depth/card treatment without adding information, hierarchy, crop protection, or print meaning.

## Hypothesis

Keep the 4 px white photo edge and existing crop/corner geometry, but subtract only the drop shadows. Expected gain: flatter printed-photo character and less app/card feel, without weakening portrait separation from the warm paper background.

Possible regression: the portraits could lose too much separation from the background, especially the circular bride portrait.

Adoption evidence required:

1. rollback-safe duplicate comparison,
2. whole-spread review,
3. actual-size portrait detail comparison,
4. unchanged semantic nodes and image hashes,
5. preserved fold/rollback evidence.

## Prototype

Created comparison frame:

- `559:2 / V5_INSIDE_PROFILE_SHADOW_SUBTRACTION_QA_2026_08_09`
- groom comparison node: `559:8`
- bride comparison node: `559:14`

Only `effects=[]` was applied to those two comparison-photo nodes. Strokes, corner radii, image fills, geometry, crops, text, and all other nodes were unchanged.

## Three-scale result

### Whole item / spread

The profile block reads slightly flatter and more editorial. The photos still separate cleanly because the white 4 px edge remains. No hierarchy or balance regression was observed.

### Reading / page

`OUR PROFILE / ABOUT US → portraits/names → 3 QUESTIONS` remains unchanged. Shadow subtraction does not change reading order, grouping, or profile identity.

### Detail / actual-size

Groom and bride portraits retain clean white edges and usable crop boundaries without the artificial hovering effect. The circular bride portrait still separates adequately from the warm paper field.

Decision: **ADOPT**.

## Current promotion

Promoted only the verified effect subtraction to Current:

- `77:296 / IA_PROFILE_A_PHOTO`: drop shadow removed
- `77:302 / IA_PROFILE_B_PHOTO`: drop shadow removed

Preserved styling:

- groom corner radius `14`, white stroke `4 px`
- bride corner radius `999`, white stroke `4 px`

Preserved image hashes:

- groom `a39dd297eb9de572317a5ce57f0af12e8597b156`
- bride `2359f635b4926a83e22ca1f9214e75c709291152`

## Structure QA after promotion

- native text nodes: `92`
- visible text nodes: `57`
- IMAGE-fill nodes: `9`
- fold guide `77:540` preserved
- rollback outer `59:2` preserved
- rollback inside `59:178` preserved
- comparison `559:2` preserved
- history/coast/memory image hashes unchanged

## Learning

Source: live V5 inside screenshot and actual node styling.

Hypothesis: a white editorial photo edge can provide enough separation without an added UI-like drop shadow.

Result: verified for these two profile portraits.

Failure: Q60 raw upload remains blocked at `mcp.figma.com` DNS after binary materialization; do not repeat this transport method without a changed network/tool path.

Adopted/rejected status:

- profile shadow subtraction: `VERIFIED / ADOPTED FOR V5 CURRENT`
- general removal of all photo shadows: `NOT A PROJECT RULE`
- repeated raw POST route for cover Q60: `REJECTED UNTIL TRANSPORT CAPABILITY CHANGES`

Next application: continue bounded subtraction/typography QA while preserving the cover-hero gate; do not start V6 production until V5 reaches verified dummy-photo/design QA.
