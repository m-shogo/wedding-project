# Rurubu WEDDING — EQ / ER travel-magazine hierarchy feedback

Date: 2026-08-13
Item: Rurubu WEDDING only

## Visible problem

EP had already reduced card/UI behavior, but its cover hierarchy was still too polite at thumbnail scale. The dominant hero also could not truthfully provide exact Q60 destination provenance, so the cover needed stronger editorial identity without pretending that transport was complete.

## Capability / principle tested

Two related clean-room tests were run:

1. **EQ — native Japanese display type + flat print color field**
   - split `横浜` and `ふたり旅。` into materially different display roles;
   - use one sharp-edged magenta band as a magazine headline device;
   - avoid rounded rectangles, shadows, generic overlays, and new decorative modules.

2. **ER — provenance-contained destination anchor**
   - reuse the already-known Yokohama Current proxy only at `166×118` as a small photo inset;
   - label and name it explicitly as not Q60 exact;
   - keep the larger visual hierarchy carried by existing accepted imagery and native type.

## Expected improvement

- faster `横浜 → ふたり旅。 → 01 / 02 / 03` recognition at 500px thumbnail scale;
- stronger Japanese travel-information-magazine energy;
- more factual destination specificity without turning a low-quality proxy into the main photograph;
- less dependence on generic wedding-brochure composition.

## Regression risk and rejected state

EQ initially placed the large Feature 01 number at x=16, inside the bounded 18px print-safe threshold. That state was rejected and repaired to x=20 before promotion.

ER risk was different: enlarging the low-quality Yokohama proxy would expose compression and create false confidence about Q60. It was therefore constrained to a small editorial inset and explicitly named `ER_YOKOHAMA_PROXY_ANCHOR_NOT_Q60_EXACT`.

## Verified evidence

- previous outer: EP `1108:2`
- EQ working: `1116:2`
- EQ Review rollback: `1117:2` hidden after supersession
- adopted ER working: `1118:2`
- adopted ER Review: `1119:2`
- retained inside: EO `1107:285`
- retained inside Review: `1111:188`
- ER Yokohama inset: `1118:190`, hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`, `166×118`
- ER main hero: `1118:134`, hash `539c259be8036b481d06b4f76db9a39b407d90e8`, still not Q60 exact
- 500px thumbnail: PASS
- whole-item reading render: PASS
- actual-size front `794×1123`: PASS
- visible native text: `36`
- visible IMAGE fills: `7`
- absolute text intersections: `0`
- bounded 18px safe-area risks: `0`
- fold x: `792.7000122070312`
- Current `77:18 / 77:290`: untouched

## Asset lifecycle truth

Q60 master remains Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`. No previously failed transport mechanism was repeated. No new external binary was placed.

Classification:
- generated: `0`
- newly adopted generated assets: `0`
- new external binary placed: `0`
- reused existing proxy as small destination anchor: `1`
- Q60 exact placed: `NO`
- Q60 visually verified in Figma: `NO`

## Adopted status

ER is adopted as Best Outer; EO remains Best Inside. V5 is still incomplete and V6 production remains blocked.

## Next application

A strong travel-magazine cover does not require every factual cue to be the dominant photograph. When provenance is incomplete, keep the dominant image visually strong, constrain weaker factual imagery to a deliberately small editorial role, and label its evidence status explicitly. Never let a useful proxy silently become completion evidence.