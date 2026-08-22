# Rurubu V8 — Outer AH reader-facing publication furniture QA

Date: 2026-08-22
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Canonical page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Previous Current: AB `2218:2`
New Current: AH `2234:2`

## Visible problem

Outer AB had a strong destination hierarchy and functional back-cover reading gateway, but still carried generic English page furniture that added little reader value:

- `RURUBU WEDDING / YOKOHAMA`
- `TRAVEL BOOK / 2026`
- `Yokohama / Wedding Edition`

The publication masthead `るるぶ WEDDING` itself remains intentional and was preserved.

## Fresh professional learning used as a hypothesis

- The 2026 New York Times Magazine redesign treats captions, rules and page furniture as a reader-orientation system rather than free decoration.
- Byline's creative direction describes a publication as a brand whose product is stories and a way of thinking/feeling; image and headline language are part of that brand system.
- Mainstudio's Mark Magazine redesign strips illustrative layers that distract from content and uses a restrained, recognisable system so photography/content can carry the issue.

Rurubu hypothesis: small cover/back-cover furniture should either orient the reader or state real publication information. Generic English that merely signals “magazine” should be removed or translated when the Japanese wording carries the role more clearly.

## Bounded change

Created rollback-safe AH from AB and changed only three native text nodes:

- back kicker → `るるぶ WEDDING / 横浜`
- front series → `ふたり旅の記録 / 2026`
- front caption → `横浜 / 結婚記念号`

Preserved:

- `るるぶ WEDDING` masthead
- dominant `横浜`
- all body copy
- back-cover contents gateway
- existing ocean-light generated master and image hash
- crop and hierarchy

No new image, badge, card, sticker, shadow, gradient, or invented destination claim was added.

## Three-scale QA

- 500px whole item: PASS
- 1400px reading scale: PASS
- 1587×1123 actual size: PASS

## Structural QA

- Current root: AH `2234:2`
- parent page: `2052:2`
- visible native text: `12`
- IMAGE fills: `1`
- text intersections: `0`
- 18px safe-area risk: `0`
- accidental explicit one-character Japanese wrap candidates: `0`
- existing ocean-light image role retained
- old AB `2218:2` preserved hidden rollback

## Result

AH is promoted locally over AB because its small publication furniture now has a clearer reader-facing/editorial job instead of relying on generic English magazine-signalling.

State: `RSL-213 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Failure fingerprint:

`F-RSL-213-GENERIC-ENGLISH-PAGE-FURNITURE-SIGNALS-MAGAZINE-WITHOUT-ADDING-READER-VALUE`

Do not transfer the exact Japanese labels, Rurubu masthead, cover composition, typography scale, or colors. The transferable question is whether a small label/caption/folio genuinely orients the reader or communicates publication information rather than merely imitating editorial style.
