# BOARDING PASS — Live Figma Checkpoint — 2026-08-01

Status: `LIVE_REBUILT / DESIGN_QA_PASS / FINAL_CONTENT_PENDING / NOT_PRINT_READY`
Current authority: live Figma + GitHub `main`

Production Figma:
https://www.figma.com/design/P2PtpMyhyZqHYe1ZBBCD13

## Verified starting state

The live file contained the four expected pages:

- `00_README`
- `01_FRONT`
- `02_BACK`
- `99_QA`

However, every page was empty. Earlier completion records were therefore not treated as proof of live content.

## Rebuilt live structure

Created:

- `BOARDING_PASS_CURRENT_README`
- `FRAME_FRONT`
- `FRAME_BACK`
- `QA_BOARDING_PASS`

All variable copy remains native editable Figma text.

## Front direction

Item-specific art direction: operational airline ticket with restrained wedding warmth.

Implemented:

- provisional 1200 × 550 trim-scale frame
- ivory paper base, navy header, muted gold route accents
- semantic main zone and right stub
- perforation cue
- `BOARDING PASS` title
- `S&S WEDDING AIRLINES`
- Current Drive `boarding_plane_v1.svg` imported as editable vector
- long-name stress value: `髙橋 アレクサンダー 様`
- `YOKOHAMA → HAPPINESS` route
- date, gate, boarding time, venue
- dominant table number `07`
- non-scannable decorative barcode
- one restrained `YOKOHAMA / HAPPINESS` stamp

## Back direction

Implemented:

- navy `RETURN JOURNEY` folio band
- native Japanese thank-you copy
- date/location line
- route line with editable plane vector
- one muted thank-you stamp
- `MEMORY CLASS · ONE WAY TO OUR NEXT CHAPTER`

## Screenshot QA

Front and back were reviewed at full 1200 × 550 render size.

Passed:

- no critical clipping
- long guest name remains readable
- table number remains dominant
- main zone and stub are visually separated
- route and factual hierarchy remain clear
- barcode is decorative and visibly non-scannable in intent
- thank-you copy does not collide with the stamp
- no unnecessary extra decoration was added after QA

## Remaining blockers

- replace stress guest name and table assignment from final guest data
- replace venue/copy if final wording changes
- verify exact printer template, bleed, trim, and safe area
- inspect at actual physical size
- produce one physical proof before bulk printing

## Honest declaration

The live composition is now `DESIGN_QA_PASS`, but it is not `PRINT_READY`.
