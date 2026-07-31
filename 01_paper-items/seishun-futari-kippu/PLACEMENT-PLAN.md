# 青春ふたりきっぷ — Placement Plan

Status: `FIXED_ASSET_SET_READY_FOR_PLACEMENT / FIGMA_PLACEMENT_ALLOWED`
Current authority: GitHub `main`

## Scope

This is the placement contract for paper item 4 only. It does not authorize any edit under `01_paper-items/rurubu-wedding/`.

The Drive one-asset-one-file completion gate is already satisfied. See `ASSET-REGISTER.md` for Current production IDs and `FIGMA-PLACEMENT-PREP.md` for the exact Figma restart/build procedure.

## Current design authority

Drive direction document `04_青春ふたりきっぷ風_デザイン言語化・再現プロンプト.md` fixes the concept as a front-only MINTIA gift label inspired by nostalgic long-distance tickets without copying a real railway ticket.

Fixed content:
- title: `青春ふたりきっぷ`
- subtitle: `WEDDING JOURNEY TICKET`
- route: `新郎駅 → 新婦駅 → 未来行き`
- date: `2026.10.24`
- issue number: `No.1024`
- phrase: `旅のはじまりは、あなたと。`
- palette: pale sage green / warm off-white / black; red and blue only for stamp accents
- texture: lightly aged clean paper, fine guilloche-like pattern, thin ornamental frame
- format: front only; provisional flat label area around `72×25mm`, requiring physical re-measurement before print lock

## Native text vs fixed assets

Keep these as Figma native text so copy, tracking and print-size legibility remain editable:
- `青春ふたりきっぷ`
- `WEDDING JOURNEY TICKET`
- `新郎駅 → 新婦駅 → 未来行き`
- `2026.10.24`
- `No.1024`
- `旅のはじまりは、あなたと。`

Completed vector-native production assets:
- ticket frame: `assets/seishun_ticket_frame_v1.svg`
- route geometry: `assets/seishun_route_v1.svg`
- retro train line icon: `assets/seishun_train_icon_v1.svg`
- decorative barcode-like mark: `assets/seishun_decorative_barcode_v1.svg` (decorative only; never imply machine-readable validity)
- map pin: `assets/seishun_pin_v1.svg`
- rail mark: `assets/seishun_rail_v1.svg`
- station mark: `assets/seishun_station_v1.svg`
- calendar mark: `assets/seishun_calendar_v1.svg`

All eight exist independently in Drive and are `COMPLETED`.

## Completed decorative PNG assets

Legacy stamp SVGs remain reference-only. Current production uses:

1. `seishun_stamp_shuku_red_v2_centered.png`
   - centered red `祝`
   - green-background source -> chroma-key transparency
   - RGBA / transparent exterior / visible green 0
   - Drive ID: `18IfyAhcrnW16shx-rYrSMPWnYfStZfqz`
2. `seishun_stamp_gate_blue_v1.png`
   - fictional blue ticket-gate/date stamp
   - no real railway company mark
   - RGBA / transparent exterior / visible green 0
   - Drive ID: `1TkdqzYldyQc8kB6nxl4os8NGF28i_GM9`

No further decorative rebuild is required before the first Figma placement pass.

## Figma composition contract

Recommended hierarchy for the provisional `72×25mm` face:
1. primary title occupies the strongest visual band; do not rasterize it
2. route line sits immediately below or adjacent as the second information layer
3. date and `No.1024` form compact factual anchors
4. retro train line icon is the principal fixed illustration, kept small enough not to compete with the title
5. red `祝` and blue fictional gate stamp provide the only strong accent colors
6. fine rail/route/calendar/station geometry may be used as low-density supporting marks; avoid icon clutter
7. bottom phrase is optional at final size if legibility drops below comfortable print reading

## Print and legal-similarity guardrails

- no JR logo, company name, or exact real-ticket layout reproduction
- no real fare, validity period, train conditions or other text that could make it usable as a ticket
- do not imitate the MINTIA official logo as a dominant mark
- avoid heavy distressing, tears or dirty brown aging
- prioritize legibility over microtext density
- final dimensions remain provisional until the exact MINTIA case is physically measured
- prefer matte/water-resistant label stock and require one physical test application before mass printing

## Placement gate

`FIGMA_PLACEMENT_ALLOWED = true`

The fixed-asset gate is complete. Remaining gates are downstream only:

- build the semantic Figma layout according to `FIGMA-PLACEMENT-PREP.md`
- physically re-measure the exact label application area before print lock
- run actual-size readability and test-application QA

No asset-generation blocker remains.
