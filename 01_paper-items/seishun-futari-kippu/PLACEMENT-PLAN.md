# 青春ふたりきっぷ — Placement Plan

Status: `PREPARED / WAITING_FOR_DRIVE_CHILD_ASSET_GATE`

## Scope

This is the placement contract for paper item 4 only. It does not authorize any edit under `01_paper-items/rurubu-wedding/` and does not bypass the Drive one-asset-one-file completion gate in `ASSET-REGISTER.md`.

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

Use fixed assets only for geometry/illustration/texture:
- ticket frame: `assets/seishun_ticket_frame_v1.svg`
- route geometry: `assets/seishun_route_v1.svg`
- retro train line icon: `assets/seishun_train_icon_v1.svg`
- decorative barcode-like mark: `assets/seishun_decorative_barcode_v1.svg` (decorative only; never imply machine-readable validity)
- map pin: `assets/seishun_pin_v1.svg`
- rail mark: `assets/seishun_rail_v1.svg`
- station mark: `assets/seishun_station_v1.svg`
- calendar mark: `assets/seishun_calendar_v1.svg`

The eight vectors remain candidates until each exists independently in Drive and passes post-upload verification.

## Required decorative rebuilds

Legacy stamp SVGs are reference only. Do not place them as production artwork because their flat construction and live Arial/sans-serif text are below the intended print character.

Rebuild as independent transparent PNGs when image generation is available:
1. red celebratory `祝` stamp — slightly uneven ink, clean enough for wedding stationery
2. blue fictional ticket-gate/date stamp — clearly fictional, no real railway company mark
3. optional subtle paper/ink texture accent if the Figma-native background cannot achieve the intended tactile print feel

Each rebuilt decoration must be one asset per file and must pass alpha-edge QA plus Drive existence verification before promotion.

## Figma composition contract

Recommended hierarchy for the provisional 72×25mm face:
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

`FIGMA_PLACEMENT_ALLOWED = false` until all of the following are true:
- selected production fixed assets are independent Drive files, not merely children inside ZIPs or preview sheets
- each selected asset has Drive ID/existence evidence in the asset register
- required red/blue stamp artwork is rebuilt or explicitly replaced by Figma-native treatment
- exact physical label area has been re-measured before print lock

Once the Drive child-asset gate clears, this plan is the authority for assembling the item without revisiting the visual information architecture.
