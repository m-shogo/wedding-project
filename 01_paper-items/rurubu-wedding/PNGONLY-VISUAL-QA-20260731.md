# るるぶWEDDING — PNG-only Visual QA 2026-07-31

Current authority: GitHub `main`
Status: `PNG_ONLY_DECORATION_REWORK_ACCEPTED / FIGMA_PLACEMENT_PENDING`

## Scope

Second-pass visual review of the Current raster-native decoration set after SVG prohibition.

Reviewed Current assets:
- #8 `rurubu_08_scrapbook_photo_frame_pngonly_v1.png`
- #9 `rurubu_09_masking_tape_pngonly_v2.png`
- #10 `rurubu_10_travel_route_airplane_heart_pngonly_v1.png`
- #11 `rurubu_11_map_pin_pngonly_v2.png`
- #12 `rurubu_12_small_travel_icons_pngonly_v2.png`
- #13 `rurubu_13_photo_caption_ornament_pngonly_v1.png`
- #14a `rurubu_14a_feature_stamp_star_pngonly_v1.png`
- #14b `rurubu_14b_feature_stamp_airplane_pngonly_v1.png`
- #14c `rurubu_14c_feature_stamp_heart_pngonly_v1.png`

Historical SVG-derived files were not used as design authority.

## Visual QA result

PASS for all Current PNG-only assets.

Observed strengths:
- #8 / #13 / #14 now share a coherent torn-paper / handmade scrapbook language.
- #9 has believable semi-transparent washi behavior; full opacity is not required for this asset.
- #10 keeps route, airplane and heart readable as one light editorial accent rather than a heavy badge.
- #11 is a clean single map-pin silhouette with a central heart marker.
- #12 is intentionally a six-icon set and now carries enough paper texture/shadow to avoid the earlier clean vector-like look.
- the palette remains consistent with the existing wedding direction: pink / yellow / blue / mint / warm cream.
- no readable text or people are embedded in #8–#14.

No additional rework was opened from this visual pass.

## Mechanical alpha readback

All reviewed files are RGBA and contain real transparency.

Notable exception by design:
- #9 tape alpha max is 251 rather than 255 because the tape body is intentionally semi-transparent like washi. This is accepted and is not a transparency defect.

## Drive evidence

Contact sheet:
- `QA_rurubu_pngonly_08_14_visual_review_20260731.png`
- Drive ID: `1YjHeXxp8sVdKbt8K3vTu5yU4V1v8aQMl`
- parent: `16CwLDy1JSpxqytZYUGhtm-0LE7wLhP6z`

## Duplicate protection

A separate locally rendered #8 candidate created during this review was deleted from Drive after the latest `main` revealed that #8–#14 had already been completed by another current workflow. It was not promoted and did not replace Current authority.

## Boundary

The fixed-decoration phase is complete again. Do not generate additional fixed decorative assets unless a concrete production-Figma layout problem requires one.

Next production work remains:
1. production Figma same-condition placement/comparison when MCP quota is available;
2. real-photo fit;
3. vendor-specific bleed / trim-safe / fold-safe / export confirmation;
4. final visual and print-scale QA.
