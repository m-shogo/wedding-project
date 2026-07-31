# WEDDING PASSPORT — Placement Plan

Status: `FIXED_ASSET_SET_READY_FOR_PLACEMENT`

## Format / print intent

- A5-portrait-class booklet, adjusted to venue printer spec at print lock.
- Bleed: 3 mm all sides.
- Safe area: at least 5 mm from trim.
- Cover: deep navy with restrained gold treatment; warm ivory interior.
- Rounded corners only if printer/finishing supports them cleanly.
- Do not imitate a real national passport, coat of arms, MRZ, passport number, security pattern, official seal, or airline identity.

## Figma-native text (do not rasterize)

Keep these editable:

- `WEDDING PASSPORT`
- `2026.10.24`
- `YOKOHAMA`
- `MENU & DRINK`
- all food/drink names and descriptions
- `SEATING CHART`
- bride/groom head-table labels
- guest names / table assignments
- small itinerary / thank-you copy

Menu, drinks, seating data and all variable names remain native text for late corrections and print legibility.

## Fixed asset placement

### Front cover

- `passport_emblem_globe_plane_laurel_v2.png`: Current primary cover emblem. Centered, gold on deep navy. One use only.
- `passport_plane_v1.svg`: optional tiny supporting cue; do not duplicate near the emblem unless needed for balance.
- `passport_compass_v1.svg` / `passport_globe_v1.svg`: small folio or interior section marks, not competing cover identities.

### Interior — MENU & DRINK

- `passport_utensils_v1.svg`: small MENU section mark.
- `passport_wine_v1.svg`: small DRINK section mark.
- `passport_paper_texture_ivory_v1.png`: preferred interior paper texture at subtle strength.
- `passport_route_pattern_v1.svg` or `passport_dot_grid_v1.svg`: very low-opacity supporting ornament only.

### Interior — SEATING CHART

- `passport_table_v1.svg`: small legend / section cue only; the actual seating chart is Figma-native geometry and text.
- `passport_paper_texture_white_v1.png` may be used if the seating page needs a cleaner contrast than ivory.

### Back cover / travel-world accent

- `passport_stamp_yokohama_date_v1.png`: one fictional muted-red travel stamp.
- thin decorative barcode-like line work, separators and itinerary rules stay Figma-native/vector.

## SVG / PNG authority

- `assets/passport-emblem-compass-airplane.svg` is retained only as `FALLBACK / ARCHIVE`: it contains live typography and is no longer the Current primary cover identity.
- The Current cover identity is the transparent raster emblem `passport_emblem_globe_plane_laurel_v2.png` because the main emblem is a high-value decorative asset and the PNG has stronger controlled visual treatment.
- Simple icons and route/grid geometry remain SVG because vector editing is genuinely useful there.

## Readability / quality constraints

- Decoration must not reduce MENU/DRINK or seating-chart readability.
- Keep gold restrained; avoid an all-gold page.
- Use at most one travel stamp as a dominant accent per spread.
- Do not fill the booklet with every available icon.
- Seating names and table labels must be tested at actual print size.
- Final QA must include thin-rule visibility, paper-texture strength, stamp contrast, and cover-emblem edge quality on the chosen stock.

## Fixed-asset gate

The required fixed visual building blocks exist independently in Drive. Remaining work is Figma composition and real-size print QA rather than missing fixed assets.
