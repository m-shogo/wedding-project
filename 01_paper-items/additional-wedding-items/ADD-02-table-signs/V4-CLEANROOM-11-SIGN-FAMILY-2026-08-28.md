# ADD-02 — V4 Clean-room 11-sign family

Date: 2026-08-28
Start/main authority before write: `291713ab58097f1f1777e1b3ba88fc70def9c54f`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md` (`VISUAL_REOPENED`)
Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
V4 page: `197:2 / V4_CLEANROOM_ADD02_COUNTRY_SIGNS_2026_08_28`
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`

## Clean-room contract

This V4 family was built from blank `1000 × 1480` frames. Existing production, V2/V3/VNext layouts, vectors, crops, generated assets, rails, badges, icons, and background constructions were not duplicated or used as visual construction references. Only current semantic facts/constraints were carried forward:

- 11 destination table signs;
- destinations: Hawaii / Italy / France / Spain / Taiwan / Japan / Hong Kong / Singapore / Bali / Korea / Maldives;
- each sign is `1000 × 1480` px portrait;
- table number, destination, theme/copy, and date remain editable semantic text roles;
- final copy remains placeholder/deferred where not authoritative.

Existing designs remain untouched for rollback and final comparison only.

## V4 roots and independent art directions

- `197:3` — TABLE 01 / HAWAII — `CUT TIDE`
- `197:4` — TABLE 02 / ITALY — `APERITIVO CLOTH`
- `197:5` — TABLE 03 / FRANCE — `BLUE HOUR BOTANICAL`
- `197:6` — TABLE 04 / SPAIN — `TARDEO RADIAL CUT`
- `198:62` — TABLE 05 / TAIWAN — `PAPER FOLDS`
- `198:63` — TABLE 06 / JAPAN — `INDIGO ECLIPSE`
- `198:64` — TABLE 07 / HONG KONG — `CITY SLIPS`
- `198:115` — TABLE 08 / SINGAPORE — `GARDEN CANOPY`
- `198:116` — TABLE 09 / BALI — `TERRACE WEAVE`
- `198:117` — TABLE 10 / KOREA — `HANJI FOLD`
- `198:118` — TABLE 11 / MALDIVES — `LAGOON ORBIT`

The family deliberately does not repeat one card/grid template. Each sign has a distinct fixed-art premise while retaining a shared editorial level of title strength and factual readability.

## Hybrid authoring split

For every V4 sign:

- variable/factual roles are native Figma text: `TABLE`, destination EN/JP, `[国テーマ]`, `[国テーマ説明]`, `2026.10.24`;
- fixed visual atmosphere is one editable composed SVG group named `DECOR / COMPOSED / ...`;
- no variable name, theme copy, venue, QR, guest identity, or other factual value is baked into fixed art;
- raster/image fills: `0` for all 11 roots;
- no page flattening.

### FINAL MISSING ASSET LIST

At this V4 standalone stage there is **no required missing raster role**. The designs intentionally use editable composed SVG fixed art and native text. The exact Drive folder was live-checked before Figma production; its existing files are legacy comparison/old production assets and were not reused visually. No new raster was generated merely to satisfy an image quota.

If later actual-size/physical-proof QA identifies a specific material/texture/photo role that materially improves a sign, that role must receive a new FINAL MISSING ASSET LIST entry and generation brief before any raster generation.

## Meaningful corrections during the run

- Hawaii: the auto-layout info stack initially inherited a white fill and read as a UI card. The fill was removed, and `TABLE 01` contrast was corrected on the dark field.
- Italy: the first text placement crossed the dark fixed-art wedge. The native stack was moved onto the calm lower-right field; two decorative SVG strokes crossing the copy were hidden rather than shrinking text.
- Spain: long description crossed from yellow into blue; description/date colors were corrected by local background role rather than adding a card.
- Taiwan: date contrast was corrected on the lower cream paper field.
- All 11 descriptions were found fixed-height after initial authoring and were repaired to native `textAutoResize = HEIGHT` before long-copy QA.

## Long-copy stress QA

Hidden QA duplicates were created for all 11 roots with a materially longer Japanese description:

`この卓は、それぞれの旅先から着想した色・空気・食・景色の記憶を重ねたテーマです。ゆっくりと会話を楽しみながら、今日だけの旅の続きをお過ごしください。`

All 11 auto-height descriptions remained inside their `1000 × 1480` physical roots. No text-size reduction was used to force a pass.

Hidden QA clone IDs:

- Hawaii `199:2`
- Italy `199:19`
- France `199:37`
- Spain `199:62`
- Taiwan `199:82`
- Japan `199:99`
- Hong Kong `199:116`
- Singapore `199:135`
- Bali `199:155`
- Korea `199:177`
- Maldives `199:195`

## Structure readback

Final live readback for every production root:

- native text nodes: `6` per sign;
- fixed-height text: `0` per sign;
- visible text outside root: `0` per sign;
- IMAGE fills: `0` per sign;
- editable composed SVG fixed-art role: `1` per sign;
- root placeholder state: false.

## Three-scale visual QA

For each of the 11 production roots, fresh screenshot passes were executed at:

- thumbnail: `0.34×`;
- reading: `0.68×`;
- actual/native: `1×` (`1000 × 1480`).

Visual review checked title dominance, table-number readability, theme/description contrast, date visibility, absence of UI-card containment, intentional asymmetry, and fixed-art/text conflict. The major defects found during these passes were repaired as listed above.

One attempted batched screenshot-byte aggregation used an unsupported screenshot return shape and failed read-only with no mutation. The method was switched to bounded per-root screenshot QA rather than repeating the same failure.

## Print / resolution

Current fixed art is vector/composed SVG, so raster PPI is not the limiting factor in this V4 family draft. Physical proof, holder/stand occlusion, exact vendor bleed/template, and minimum-type/fine-rule verification remain deferred.

## Current state

`V4_CLEANROOM_11_SIGN_FAMILY_CREATED / STANDALONE_VISUAL_QA_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / THREE_SCALE_SCREENSHOT_QA_PASS / LEGACY_NOT_COMPARED_YET / NOT_PROMOTED / NOT_PRINT_READY`

The old Current must not be compared until this V4 family is treated as a mature standalone candidate. Promotion requires the final old-vs-V4 evaluation and a clear V4 win; otherwise V4 must remain candidate/rejected without overwriting legacy production.

## Next safe work

1. Re-read latest main/Current and exact Figma/Drive authority.
2. Perform one family-level 11-up editorial rhythm review using only V4 until no standalone defect remains.
3. Only then reveal/compare old Current as an evaluation target, not a construction reference.
4. If V4 clearly wins, promote; otherwise reject/rebuild the weak destination(s) from blank frames.
5. Continue to ADD-03 after ADD-02 is promoted or safely blocked/deferred.
