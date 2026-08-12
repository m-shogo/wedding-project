# V5 Outer EP — high-energy type hierarchy + Q60 transport switch

Date: 2026-08-13
Scope: Rurubu WEDDING only

## Visible problem
EM was the strongest outer comparator, but the front cover still read slightly too clean and brochure-like at thumbnail scale: the feature-number hierarchy was timid, the 02 photo overlap could carry more editorial energy, and 03 lacked enough reading strength against the lower full-bleed photo.

The active V5-01 cover-hero gate also remained open. Drive contained the verified Q60 master, but the Figma hero still used the existing proxy hash.

## Principle / capability tested
Use scale contrast and photo/type overlap rather than adding containers: enlarge the native Japanese masthead and feature numerals, deepen the slanted 02 photo overlap, and strengthen 03 while preserving existing image fills, native editable text, semantic nodes, fold guide, and rollback source EM.

For Q60, stop repeating a transport method after failure. Try the official upload target once with exact Drive bytes; if that fails at the environment boundary, switch to a materially different bounded route once, then return to safe visual work.

## Experiment
- Source outer: EM `1094:2`.
- Safe duplicate: EP `1108:2`.
- EP hero target: `1108:134` / `EP_HERO_Q60_EXACT_PENDING`.
- Q60 master Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`; JPEG; 1330×1220; 155,439 bytes; SHA-256 authority `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`.
- Verified small derivative Drive ID: `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`; JPEG; 240×220; 10,284 bytes.
- Official Figma `upload_assets` produced a single-use target for `1108:134`, but the exact-byte POST could not resolve `mcp.figma.com`; no Figma binary placement occurred.
- Switched route: direct Plugin API `figma.createImage` with the verified 240×220 JPEG bytes. Figma rejected the image as unsupported and the script failed atomically; no node mutation occurred.
- Q60 attempts therefore remain transport evidence only, not asset adoption or placement evidence.

## Visual changes adopted in EP
- `旅するWEDDING` masthead enlarged and tightened against the top edge while retaining native text.
- `思い出スポット 大特集` promoted in scale; support copy kept compact.
- Feature 01 number raised to an approximately 84px display role, with the Japanese heading enlarged beside it.
- Feature 02 restaurant photo enlarged to `430×306`, moved deeper across the hero/lower-photo boundary, rotation approximately `-4.5°`.
- Feature 03 number/title strengthened without adding a card or shadow.
- All six visible image fills remained existing accepted Figma hashes; no new/generated imagery was adopted.

## Rejected / repaired states
1. Vertical issue/season anchors pushed outside the print-safe bound. Rejected; restored to compact horizontal anchors.
2. Masthead and kicker created an absolute text-box overlap. Rejected; kicker/masthead positions repaired.
3. Feature 03 was structurally non-colliding but looked too cramped at actual-size render. Repaired by reducing/repositioning the 03 numeral and increasing separation from its title.

## Evidence
- thumbnail / whole-item render: EP clearly increases `横浜 → ふたり旅。 → 01/02/03` scale rhythm over EM.
- natural whole-spread render: `1587×1123`; each page is approximately actual-size `794×1123`; final render PASS.
- final structure QA on `1108:2`: visible native text `36`; visible IMAGE fills `6`; absolute text intersections `0`; bounded 18px safe-area risks `0`; fold x `792.7000122070312`.
- final visible image hashes preserved:
  - back coast `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - friends cafe `c1ada11205bc3978bf426b304d683f1c1566cac2`
  - friends dining / feature 02 `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
  - hero proxy `539c259be8036b481d06b4f76db9a39b407d90e8`
  - feature 03 old town `439a719d73f28e8dd2889f2026cccb15f345ec63`
- hero proxy hash is explicitly **not** Q60 provenance; exact Q60 placement remains OPEN.

## Promotion / reconciliation
- EP promoted to Review snapshot `1111:2` / `BEST OUTER — EP — source 1108:2`.
- EO reconciled as the inside authority in Review: `1111:188` / `BEST INSIDE — EO — source 1107:285`.
- former Review EM `1096:2` and EN `1106:2` retained hidden as rollback evidence.
- Start Here reconciled to `EP outer / EO inside`.
- Current `77:18 / 77:290` remained untouched.

## Decision
ADOPT EP as best outer comparator. Keep EO as best inside comparator.

## Regression risk
EP deliberately increases editorial density. Do not enlarge the 02 overlap or 01/03 display type further without actual-size QA; the next increment can quickly turn into collision/noise rather than travel-magazine energy.

## Next application
The next highest-value V5 gate remains exact Q60 Drive → Figma binary/image-hash provenance. Do not retry the same DNS upload or direct-JPEG `createImage` route in an unchanged runtime. While that bridge is unavailable, continue only safe visual targets that materially outperform EP/EO, and keep the V5 completion gate OPEN.
