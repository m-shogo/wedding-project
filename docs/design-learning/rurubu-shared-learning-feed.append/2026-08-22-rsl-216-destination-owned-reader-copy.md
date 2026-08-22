# RSL-216 — travel pages should not explain their own design method to the reader

Source scope/item: `Rurubu WEDDING / V8 1DAY AO`

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Date: 2026-08-22

## Visible problem

V8 1DAY AN was structurally correct and had a genuinely data-bound time axis, but its right-page language still spoke partly in the voice of the design process: `時間を読む。余白も読む。`, `時刻の距離が、そのまま一日のリズムになる。`, and especially `時刻差を実寸の間隔として配置。`.

At screenshot scale the page looked disciplined, yet the text made the artifact read like an information-design demonstration instead of a finished Yokohama travel publication.

## Fresh professional hypothesis

D&DEPARTMENT's `d design travel` editorial policy was used as a new professional reference, without copying its layouts or visual language. Relevant principle: the value of a travel guide comes from what is genuinely specific to the place and from an honest reader-facing editorial voice, rather than exaggerated or generic travel signalling.

Neutral shared input also consumed: the non-Rurubu lesson `travel energy must not erase artifact-role specificity`. Only the principle was consumed; no Passport item-specific Figma, Drive, assets, layout, palette, or production state was inspected or copied.

## Root-cause hypothesis

A final editorial page can remain AI/prototype-like even after cards, fake UI and decorative English are removed if prominent reader copy still names the designer's technique rather than the subject of the article.

For travel content, the dominant semantic layer should normally be owned by the destination, event, people, action or lived experience. Implementation rationale belongs in evidence/QA, not in reader furniture, unless the process itself is genuinely the editorial subject.

## Bounded test

Rollback-safe duplicate of AN:

- source Current: `2238:106 / V8 AN`
- test/adopted: `2249:2 / V8 AO`

Only right-page copy was changed:

- `一日の時刻 / 4つの停留点` → `横浜 / 一日の流れ`
- `時間を読む。 / 余白も読む。` → `海辺から、 / 夜の食卓まで。`
- technique explanation → verified time range + Yokohama walking context
- `時刻差を実寸の間隔として配置。` hidden from reader view

Exact times and the physical positions of all time marks remained unchanged.

## Expected improvement

Make the right page read as a Yokohama day journey first, while preserving the valid information-design system and left/right role separation.

## Regression risk

Blindly forcing destination names into every heading can become tourism-brand wallpaper. The treatment is valid only when place/experience language is already supported by the content and more accurately owns the page's semantic job than the design-method wording.

## Three-scale evidence

- whole-item 500px: PASS; destination/journey reads before visualization concept
- reading 1400px: PASS; exact time hierarchy remains clear
- actual-size 1587×1123: PASS; no accidental Japanese wrap or process-language leakage

## Structure evidence

AO `2249:2`:

- parent `2052:2`: PASS
- visible native text `21`
- IMAGE fills `0`
- text intersections `0`
- 18px safe risk `0`
- visible process/schema leakage `0`
- native editability preserved

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- page: `2052:2`
- adopted AO: `2249:2`
- hidden rollback AN: `2238:106`
- Drive V8 authority: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`
- Drive writes: `0`
- generated assets: `0`
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-1DAY-AO-DESTINATION-OWNED-READER-COPY-QA-2026-08-22.md`

## Failure fingerprint

`F-RSL-216-DESIGN-METHOD-COPY-OUTRANKS-DESTINATION-EXPERIENCE-ON-TRAVEL-PAGE`

Operation/context: final travel/editorial copy after information-design refinement.

Symptom: visible copy describes grid/spacing/scale/visualization method or a design metaphor more strongly than the actual destination/experience.

Likely cause: design rationale escaped from internal QA into publication voice.

Replacement method: keep valid factual/structural system; replace only the reader-facing semantic layer with article-owned language; hide process evidence; re-run three-scale and structure QA.

Stop condition: do not force local place names if they are not the true subject or if the result becomes generic tourism branding.

## What must remain Rurubu-specific

Do not transfer:

- Yokohama wording;
- the 10:00–18:30 route;
- `海辺 / カフェ / 街歩き / 食卓`;
- time-axis geometry;
- page coordinates;
- V8 palette/type scale;
- Rurubu book/editorial art direction.

## Cross-item applicability hypothesis

On another materially different editorial/print item, if a reader-facing sentence explains the design device instead of the content, test a rollback-safe content-owned wording change without altering the valid structure. Promote beyond candidate only after independent evidence.
