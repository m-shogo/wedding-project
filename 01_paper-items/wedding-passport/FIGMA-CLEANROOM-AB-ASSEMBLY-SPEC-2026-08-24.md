# WEDDING PASSPORT — Figma Clean-room A/B Assembly Spec / 2026-08-24

State: `READY_FOR_SAFE_FIGMA_ASSEMBLY / NATIVE_COPY_CONTRACT_DEFINED / NOT_PRODUCTION`

This spec exists to make the next writable Figma run execute immediately without reopening retained visual production during construction.

## Allowed inherited facts / constraints only

- canvas: `1480×2100` front and back;
- artifact role: wedding keepsake booklet / passport-inspired paper item, **not** official passport/immigration/airline documentation;
- confirmed date: `2026.10.24`;
- confirmed place: `YOKOHAMA`;
- editable couple-name role: `[新郎新婦名]`;
- editable issue/information role: `[発行情報]` or equivalent semantic placeholder until final wording is authoritative;
- all reader-facing wording stays native Figma text;
- no fake passport number, nationality, class, gate, barcode, QR, scanner, immigration seal or airline credential;
- retained Current must not be opened as a construction reference.

## Verified font capability available from prior structure QA

These families/styles have already been successfully loaded in this Figma file and may be treated as tool-capability constraints, not visual-layout inheritance:

- `Noto Sans JP Bold`
- `Noto Sans JP Medium`
- `Inter Bold`
- `Inter Medium`

If a new font is considered, verify availability before authoring. Do not let fallback glyph rendering masquerade as an intentional Japanese typography choice.

## Common native semantic roles

### Front

Create these roles as independent native text nodes with `textAutoResize=HEIGHT` after width is set:

1. `TEXT / COVER KICKER` — optional reader-facing artifact identity; remove if it has no job.
2. `TEXT / COVER HEADLINE` — `[表紙見出し]` until final copy is authored.
3. `TEXT / COVER INTRO` — `[短い導入文]`.
4. `TEXT / DATE` — `2026.10.24`.
5. `TEXT / PLACE` — `YOKOHAMA`.
6. `TEXT / COUPLE` — `[新郎新婦名]`.
7. `TEXT / ISSUE INFO` — `[発行情報]` only if the final artifact needs it.

### Back

1. `TEXT / BACK KICKER` — optional; no generic English filler.
2. `TEXT / BACK HEADLINE` — `[裏表紙見出し]`.
3. `TEXT / BACK MESSAGE` — `[メッセージ]`.
4. `TEXT / DATE` — `2026.10.24`.
5. `TEXT / PLACE` — `YOKOHAMA`.
6. `TEXT / COUPLE` — `[新郎新婦名]`.
7. `TEXT / ISSUE INFO` — `[発行情報]` only where needed.

The role list is semantic, not a requirement to print every role. A role that does not contribute to the selected concept should be omitted rather than filled with decorative English.

## Direction A — Departure Window assembly zones

Fixed-art pair:
- front: `studies/vnext-2026-08-24/departure-window-fixed-art.svg`
- back: `studies/vnext-2026-08-24/departure-window-return-fixed-art.svg`

### Front layout hypothesis

- primary Japanese text-safe field: left/center cream region, approximately `x=260–830`, `y=250–1080`;
- headline should use 2–4 intentional Japanese lines and avoid mechanically following the curved edge;
- date is a second focal anchor, approximately lower-left/center `x=260–780`, `y=1120–1540`;
- place is subordinate and nearby, not a separate badge;
- couple name / issue information should occupy the calm lower cream/transition zone and must not sit over the busiest coral/lagoon crossing;
- the left stitch-like rhythm may remain only if, after native copy is placed, it still reads as booklet/binding support rather than decorative ladder or passport credential.

Suggested initial type scale ranges for first comparison only:
- Japanese headline: `108–142px / Noto Sans JP Bold`;
- intro: `34–44px / Noto Sans JP Medium`;
- date: `112–160px / Inter Bold`;
- place / facts: `24–34px / Inter Medium`;
- couple: `32–44px / Noto Sans JP Medium` or `Inter Medium` depending final script.

Do not preserve these numbers if the 500px whole-item read becomes poster-like. The artifact-role gate outranks scale bravado.

### Back layout hypothesis

- the cream opening should carry the emotional message rather than becoming an empty luxury field;
- place factual cluster away from the upper sun anchor and away from the lower coral/lagoon crossing;
- use the dark field for one strong closing/factual role only if contrast and reading order stay immediate;
- opposite-edge stitch rhythm must be tested as a real front/back booklet cue; hide it if it reads as a decorative rail.

## Direction B — Island Field Guide assembly zones

Fixed-art pair:
- front: `studies/vnext-2026-08-24/island-field-guide-fixed-art.svg`
- back: `studies/vnext-2026-08-24/island-field-guide-return-fixed-art.svg`

### Front layout hypothesis

- Japanese headline should live in the broad cream discovery field, approximately `x=100–930`, `y=330–860`;
- do not place headline inside the dark top bar by default; the bar is a publication field, not a required title container;
- the three wind/tide lines are fixed atmosphere, not text rules; native copy must not align mechanically to each line;
- date/place should form one compact factual index, approximately `x=90–620`, `y=1550–1900`, only if it does not become a UI card;
- right-side coral/mango light field should remain mostly free of authoritative text so it reads as destination atmosphere rather than a colored panel.

Suggested initial type scale ranges:
- Japanese headline: `100–136px / Noto Sans JP Bold`;
- intro/message: `34–46px / Noto Sans JP Medium`;
- date: `86–120px / Inter Bold`;
- place/facts: `24–34px / Inter Medium`;
- couple: `34–46px / Noto Sans JP Medium`.

The first 500px review must reject any result that feels like a museum/gallery poster. If necessary, increase one Japanese typographic gesture or crop one fixed-art movement more aggressively before adding more decoration.

### Back layout hypothesis

- use the large cream opening as a generous message field;
- allow the wind/tide lines to cross the composition as atmosphere but never through dense Japanese copy;
- lower cream factual support field is optional; if it becomes a form-like box, remove it and use direct type on the stable background instead;
- preserve asymmetry between front and back: the pair should share rhythm and material, not mirror composition.

## Long-copy stress contract

Before Current comparison, create hidden QA duplicates for both A and B.

Stress at minimum:

- couple name: two native lines, approximately 18–24 Japanese/Latin characters total;
- cover intro: 2–3 Japanese lines;
- back message: 3–4 Japanese lines;
- issue information: 2 native lines;
- headline: test one natural extra line without reducing below the chosen actual-size readable range.

Required structure:

- all variable text `textAutoResize=HEIGHT`;
- set width/resize **before** final `textAutoResize=HEIGHT` assignment;
- visible text outside root: `0`;
- no fixed-art line/shape crossing a semantic phrase in the screenshot even when bounding-box collision is technically `0`;
- no Japanese particles/endings isolated by mechanical line breaks;
- factual microtype must be judged at physical/actual-size scale, not only Figma px.

## First comparison gate

Do not compare to FIELD JOURNAL yet.

1. build A front/back from blank frames;
2. build B front/back from blank frames;
3. render both pairs at ~500px;
4. reject any direction that fails one of these immediately:
   - booklet specificity;
   - travel anticipation;
   - Japanese first read;
   - no fake travel administration;
   - no UI/card/container impression;
   - no family-scale return to repeated generic bright sweeps;
5. mature only winner(s) to reading + actual size + stress;
6. only then compare against retained `181:52 / 181:80`.

## Current limitation

This spec is executable, but the current connector still lacks a readable approved `figma-use` skill resource required by the Figma write action. Do not bypass that contract. When the guidance becomes available, the next write should start directly from this spec and the five clean-room SVG studies rather than repeating research or reopening Current for visual construction.
