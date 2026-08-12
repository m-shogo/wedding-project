# Rurubu WEDDING — ES → ET clean-room editorial run

Date: 2026-08-13
Scope: Rurubu WEDDING only

## Live authority re-read
- Current outer `77:18` / Current inside `77:290`: untouched.
- Live Best discovered during the run: ES outer `1122:2` / EO inside `1107:285`.
- Review ES snapshot: `1125:2`; EO Review: `1111:188`.
- Start Here before ET promotion: `ES outer / EO inside`.

## Important concurrent-state finding
A newer live ES existed than the previously documented ER baseline. It already contained the verified Drive derivative as an exact Figma image fill:
- exact node: `1122:189 / ES_YOKOHAMA_Q60_DERIVATIVE_EXACT_DRIVE_1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`
- image hash: `644f449c3bf2001a94d4b822d2b55e2614c11042`
- Drive derivative ID: `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`

The dominant hero remained `EP_HERO_Q60_EXACT_PENDING` with existing hash `539c259be8036b481d06b4f76db9a39b407d90e8`, so the exact derivative anchor is verified but the dominant-hero provenance gate remains open.

## Scratch decision
ES would not be selected unchanged from scratch. Its image-led structure was strong, but the large magenta `ふたり旅。` band still read closer to a digital campaign block than a varied Japanese travel-magazine headline system at thumbnail size.

## ET experiment
Source: live ES `1122:2`
Safe duplicate: ET `1132:2`

Visible problem:
- headline color distribution was too dominated by magenta;
- Feature 02 overlap had less scale contrast than the photo-led editorial target;
- back headline still felt slightly poster-like.

Principle tested:
- use a sharp yellow print strap for the second-line headline while keeping the huge native `横浜` type;
- enlarge and rotate Feature 02 so it visibly bridges hero and lower photo fields;
- keep Feature 03 direct on full-bleed photography;
- reduce back-cover headline wording and scale rather than adding new boxes;
- preserve the exact Drive Q60 derivative node and hash without regeneration.

Implementation highlights:
- `ET_MAIN_YELLOW_STRAP`: sharp yellow, no corner radius, no shadow/gradient.
- `ET_SECOND_LINE`: native Japanese text, dark navy.
- Feature 01 number enlarged; Feature 02 photo enlarged to `430×316` with stronger overlap; Feature 02 label retained as a sharp yellow strip.
- Back title changed to `旅の途中で見つけた / 景色と人` with reduced type scale.
- Exact Q60 derivative preserved at ET node `1132:189`, same image hash `644f449c3bf2001a94d4b822d2b55e2614c11042`.

## Regression handling
A separate pre-concurrency alternative created from stale ER was not adopted. After live ES was discovered, it was explicitly hidden and relabeled:
- `1130:18 / REJECTED HIDDEN — PRECONCURRENCY ES ALT — source ER 1118:2`

## Verified ET evidence
- 500px whole-item thumbnail: PASS.
- whole-item reading render: PASS.
- actual-size front: `794×1123`, PASS.
- actual-size back: about `798×1123`, PASS.
- visible native text: `36`.
- visible IMAGE fills: `7`.
- absolute text intersections: `0`.
- bounded 18px safe-area risks: `0`.
- fold: x=`792.7000122070312`, width=`2`.
- exact Q60 derivative hash preserved: `644f449c3bf2001a94d4b822d2b55e2614c11042`.

## Review promotion
- ET Review snapshot: `1133:2 / BEST OUTER — ET — source 1132:2`.
- ES Review `1125:2` preserved as hidden rollback.
- Best Inside remains EO Review `1111:188`.
- Start Here updated to `ET outer / EO inside`.

## Asset lifecycle status
Fresh Drive readback confirmed:
- master `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg` / ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr` / JPEG / 155,439 bytes.
- role derivative `RURUBU_V5_01_COVER_HERO__ROLE_240x220_Q78.jpg` / ID `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`.

A fresh official master upload target was issued for the safe duplicate hero, but runtime DNS resolution for `mcp.figma.com` still failed before byte POST. No erroneous fill was placed. The exact derivative anchor already present in live ES/ET is real and hash-verified, but it must not be misreported as exact dominant-hero replacement.

## Status
- generated: `0`
- new generated asset adopted: `0`
- new external binary placed by this run: `0`
- existing exact Drive derivative preserved and visually verified in ET: `YES`
- ET created / placed / visually verified / structure verified / Review promoted: `YES`
- dominant Q60 hero exact replacement: `NO`
- V5 complete: `NO`
- V6 production started: `NO`

## Next application
Keep ET/EO as the live comparator baseline. The next high-value work is either a materially different binary-safe dominant-hero provenance solution or another screenshot-proven visual defect; do not enlarge a low-quality proxy and do not count transport alone as completion.