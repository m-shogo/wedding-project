# Rurubu WEDDING V6 — DZ Cafe Typographic Field QA

Date: 2026-08-18
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Source problem

Preferred DY `1717:2` had already removed one repeated cafe photograph by converting that role to composed travel texture + native text, but the left Cafe page still read too weakly at whole-item and actual-size scales: the 565×430 texture field was visually passive, `休日のカフェ時間。` was modest, and the page still felt like an under-filled template rather than a Japanese travel-magazine feature.

## Root-cause hypothesis

The role did not need another repeated or semantically false photograph. It needed stronger editorial hierarchy inside the existing non-photo field. A bounded composed texture can support a much stronger native Japanese headline, while the remaining Yokohama photograph stays independently replaceable.

## Bounded experiment

Created rollback-safe duplicate DZ `1719:2` from DY and changed only Cafe/Table editorial treatment:

- expanded existing composed travel texture `691a6ceed471a5d8efa144052a10564eed177b4f` from 565×430 to 720×430 and reduced opacity to 0.20;
- changed native Cafe feature headline to `甘いものと、\n窓ぎわの席。` at 50px;
- enlarged native `01` to 92px;
- changed the small support label to native `CAFE NOTE / 01`;
- preserved Cafe body copy and metadata as native text;
- kept Yokohama view photo hash `644f449c3bf2001a94d4b822d2b55e2614c11042` as an independently replaceable role;
- on the right Table page, enlarged the existing travel-object support photo to 320×235 and rotated it −2.5° to reduce rectangular-module rhythm without changing its hash.

No new cards, shadows, gradients, generated images, Drive saves, or image hashes were introduced.

## Expected improvement

Increase the Cafe page's travel-magazine energy and thumbnail hierarchy without reintroducing photo repetition or sacrificing editability. The Table support image should read as an intentionally overlapped editorial beat rather than a static card.

## Regression risks

- oversized type could become poster-like rather than editorial;
- texture could become a fake background panel if too opaque;
- rotated support photography could collide with copy or safe area;
- enlarging raster roles could exceed source fidelity.

## Three-scale / rendered evidence

- previous DY whole spread 1200px: visually weaker Cafe field;
- DZ whole spread 1200px: PASS and stronger first-read hierarchy;
- DZ Cafe actual-size `1719:3` 794×1123: PASS;
- final left page: 14 visible native text nodes, 2 visible IMAGE roles (1 composed texture + 1 replaceable photo), absolute text collisions 0, 18px text safe risks 0;
- final right page: 19 visible native text nodes, 2 replaceable IMAGE roles, absolute text collisions 0, 18px text safe risks 0;
- right support photo remains hash `e3738476f760932bb5b09c9d60f174dd6c84049d` at 320×235 with −2.5° rotation;
- Table hero remains hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`.

## Promotion / rollback

- adopted: DZ `1719:2 / PREFERRED / V6_INSIDE_DZ_CAFE_TYPOGRAPHIC_FIELD_2026_08_18`;
- rollback: DY `1717:2 / ROLLBACK_HIDDEN / V6_INSIDE_DY_PRE_DZ_CAFE_TYPOGRAPHIC_FIELD_2026_08_18`;
- Start Here `845:27`: `V5 FU/FX · V6 AH + DN/DO + DS MEMORY SPOTS + DZ CAFE & TABLE + DX 1DAY PLAN · V7 HOLD`;
- V7 touched: NO.

## Asset lifecycle truth

- newly generated assets: 0;
- adopted generated assets: 0;
- new Drive saves: 0;
- new external binary placements: 0;
- new image hashes: 0;
- existing verified composed texture reused: YES;
- existing verified photos preserved as replaceable roles: YES;
- native variable/semantic text preserved: YES;
- screenshot verified: YES;
- structure verified: YES.

## Status

`VERIFIED_LOCAL / ADOPTED_DZ / ROLLBACK_SAFE / NOT_PRINT_READY`

## What remains Rurubu-specific

Exact wording, 50/92px scale relationship, magenta/cyan/yellow/navy palette, travel texture, photo choice, rotation, and Cafe/Table composition.

## Cross-item applicability hypothesis

When a print page correctly removes a repeated photo but becomes too visually quiet, do not automatically restore photography. Independently test whether stronger native typography inside a bounded composed decoration can carry the role. This is a hierarchy/editability method, not a visual template.
