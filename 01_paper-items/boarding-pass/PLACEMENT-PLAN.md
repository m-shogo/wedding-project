# BOARDING PASS — Placement Plan

Status: `FIXED_ASSET_SET_READY_FOR_PLACEMENT`

## Canvas / print intent

- Approximate finished size: 55 x 120 mm horizontal.
- Bleed: 3 mm on all sides at print lock.
- Ivory/white matte-paper base with dark navy as primary ink.
- Right-side stub separated by a perforation-style native vector line.
- Do not reproduce a real airline brand, operator logo, real flight number, or scannable QR code.

## Figma-native text (do not rasterize)

Keep these editable and data-replaceable:

- `BOARDING PASS`
- guest name
- `TABLE / SEAT` number
- `2026.10.24`
- `YOKOHAMA`
- destination / wedding-theme copy such as `HAPPINESS`
- venue
- `GATE`
- `BOARDING TIME`
- short thank-you message

Guest name and TABLE number must remain the strongest visual hierarchy.

## Fixed asset placement

### Front

- `boarding_plane_v1.svg`: small travel cue near header/route information; never compete with guest name.
- `boarding_globe_v1.svg` or `boarding_pin_v1.svg`: optional secondary travel cue; use at most one as a supporting mark.
- `boarding_gate_v1.svg` / `boarding_seat_v1.svg`: small semantic icons beside native labels.
- `boarding_decorative_barcode_v1.svg`: decorative non-scannable right-stub accent only.
- `boarding_paper_texture_ivory_v1.png`: preferred subtle paper base; low contrast.
- `boarding_route_pattern_v1.svg` or `boarding_dot_grid_v1.svg`: use at low opacity; not both at full strength.
- `boarding_stamp_yokohama_happiness_v2.png`: primary decorative stamp, one occurrence maximum on the front or back.

### Back

- `boarding_paper_texture_white_v1.png`: optional lighter base.
- native `THANK YOU FOR COMING` heading and message.
- `boarding_stamp_thank_you_v1.png`: secondary decorative mark.
- route/dot pattern may be reused lightly if text contrast remains high.

## Readability / quality constraints

- Variable text stays native and must not overlap decoration.
- No fake readable QR code.
- Decorative barcode is intentionally non-operational.
- Stamps remain secondary to guest identity/table assignment.
- Avoid using every icon merely because it exists; final composition should feel like a real premium invitation object, not an icon catalog.
- Test print at actual size before final lock; inspect thin rules, stamp texture, TABLE number readability, perforation visibility, and paper texture strength.

## Fixed-asset gate

The required fixed visual building blocks now exist independently in Drive. Remaining work is downstream composition / real-size print QA rather than missing fixed assets.
