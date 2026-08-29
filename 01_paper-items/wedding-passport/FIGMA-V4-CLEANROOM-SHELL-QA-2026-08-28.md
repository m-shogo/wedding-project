# WEDDING PASSPORT — Figma V4 clean-room QA

Date: 2026-08-28
State: `V4_CLEANROOM_ACTIVE / REFERENCE_LED / FRONT_REFERENCE_STRUCTURE_CORRECTED / FRONT_THREE_SCALE_PASS / SEATING_PRINT_READABILITY_IMPROVED / SYNTHETIC_LONG_NAME_STRESS_PASS / NOT_PRINT_READY`
Latest main immediately before this write: `e45f5c7f951251cd245eea090354999c750aa230`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Figma authority: `UbK8KmuWJcDeGScsN49Uor`
Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
Reference study: Drive `1ldCXv5kaHqRpSBdbzyLPvYp0FxPE6MvZTwFJACoe8RM / 01_パスポート風｜参考画像ギャラリー・分析`
Primary direction image verified live: Drive `1Dd4cVUaE0lcMPya8Hez40OHGNTReZ6J5 / 01_パスポート風_方向性画像.png`

## Clean-room provenance

V4 was created from blank Figma frames. No old production/V2/V3 frame, old layout group, old decorative asset, old image crop, or old generated production asset was duplicated into the V4 shell. Only verified facts and constraints were re-authored: provisional A5-class working geometry, fixed event date/location, front/back/menu+drink/seating semantic roles, 11 tables with maximum seven guests/table, and native-editable variable copy.

The V4 visual authority is the current Passport reference set. Rurubu-specific composition, palette, density, page recipes and asset grammar are not used as visual authority.

## V4 roots

- `226:2` — `V4 / PASSPORT / FRONT / CLEANROOM / 2026-08-28`
- `226:15` — `V4 / PASSPORT / BACK / CLEANROOM / 2026-08-28`
- `226:26` — `V4 / PASSPORT / MENU + DRINK / CLEANROOM / 2026-08-28`
- `226:71` — `V4 / PASSPORT / SEATING / CLEANROOM / 2026-08-28`

All four roots use the provisional `1480 × 2100` working canvas. Historical/rollback/production frames remain preserved.

## Hybrid authoring split

- variable/factual copy: native Figma text;
- fixed cover identity: editable SVG/vector role at `226:9`, adopted SVG root `243:42`;
- generated/composed raster: none placed in the V4 roots;
- replaceable photography: none required for the current Passport V4 direction;
- IMAGE fills in corrected front: `0`.

The fixed identity SVG contains no variable guest/couple/menu/time/QR data. Names, date and place remain native text.

## Reference-led correction — front cover — 2026-08-28

Fresh comparison against the actual direction image showed that the prior V4 front was visually clean but structurally too close to a modern left-aligned poster. The reference's stronger behavior is a centered passport-book cover: restrained title, central emblem, date/place below, and a quiet physical-document hierarchy.

The highest-value correction therefore changed hierarchy/composition before decoration:

- hid `226:4 / DECOR / TITLE RULE` from the active cover hierarchy;
- repurposed `226:5` as centered native Japanese kicker `ふたりの旅のしおり`, `28 px`;
- re-authored `226:6` as centered native `WEDDING\nPASSPORT`, `DM Serif Display Regular`, `92 px`;
- changed the main title ink to the same muted-gold role used by the date;
- moved the fixed identity field `226:9` to the optical center (`x=270, y=620, 940×650`);
- enlarged the editable identity SVG `243:42` to approximately `918.4 × 596.96` inside that field;
- centered date `226:7` (`54 px`) and place `226:8` (`30 px`) below the emblem;
- centered native couple placeholders `226:13` near the foot;
- preserved hidden rollback placeholders `226:10`, `226:11`, `226:12` and old production history.

This is a structural direction change, not a decorative micro-polish. It moves the V4 cover materially closer to the verified Passport reference while retaining an original identity graphic rather than copying the reference airplane/crest.

## Front screenshot / structure QA

Fresh QA after the correction:

- thumbnail: `500 px` long edge — first read is `WEDDING PASSPORT → identity emblem → 2026.10.24 / YOKOHAMA → couple names`;
- reading scale: `1000 px` long edge — centered hierarchy remains stable and the muted-gold title no longer reads like a web/marketing hero;
- actual-size geometry render: native `1480 × 2100` successfully produced;
- visible native text nodes in `226:2`: all in bounds;
- visible out-of-bounds nodes: `0`;
- IMAGE fills: `0`.

Visible native text readback:

- `226:5` kicker: `28 px`, centered;
- `226:6` main title: `92 px`, centered;
- `226:7` date: `54 px`, centered;
- `226:8` place: `30 px`, centered;
- `226:13` couple placeholder: `42 px`, centered.

The previous internal authoring note `226:14` remains hidden and cannot print accidentally.

## Existing seating print correction retained

The seating root `226:71` retains the prior print-first correction:

- 11 tables retained;
- maximum seven guest placeholders/table retained;
- center decorative panel hidden;
- two guest columns widened to `560 px`;
- guest names `25 px / 30 px` (about `7.1 pt` nominal at the provisional `10 px = 1 mm` working scale);
- synthetic long-name width stress passed for Japanese, mixed Japanese/Katakana and Latin samples.

Real authoritative guest names and 100%/physical proof are still required before final promotion.

## Four-face visual audit

Fresh live renders were reviewed for all four roots.

### Front

Now materially closer to the verified reference: deep navy field, centered book-title hierarchy, strong central fixed identity, muted-gold ink, restrained variable names. The previous left-aligned poster behavior is removed.

### Back

Warm-ivory asymmetric closing page remains structurally valid but still has a large calm field. It is not being filled with arbitrary stickers or generic travel motifs. It remains a future comparison point against the reference's more tactile physical-paper character.

### Menu + drink

Native information remains clear and unequal in weight. It avoids rounded-card/UI grammar, but its flat ivory paper field is still visually cleaner and less tactile than the verified reference interior.

### Seating

Lookup utility remains stronger after the print-readability reallocation. The current two-column table structure prioritizes actual names over decoration.

## Reference gap still open

The largest remaining family-level gap is **paper tactility / interior physicality**, not cover hierarchy. The live direction image uses aged/printed paper, subtle corner ornament and restrained stamp-like physical cues. Current V4 interiors are intentionally flatter and cleaner.

Do not solve this by adding arbitrary badge/sticker clutter. Before any new fixed background/texture asset is made, create a `FINAL MISSING ASSET LIST` role with exact final mm, crop/bleed allowance, PPI/source pixels, text-safe area, opacity/contrast constraints and a print-noise rejection rule. Existing legacy paper textures are not automatically reusable under the V4 clean-room rule.

## Drive / generated asset status this run

- Drive writes: `0`.
- New generated raster assets: `0`.
- New adopted raster PPI: `N/A`.
- Reference image verified live: `1Dd4cVUaE0lcMPya8Hez40OHGNTReZ6J5`.
- Search for a V4 celestial-atlas Drive master did not return a matching result in this run, so no Drive-master claim is made here. The live Figma editable SVG remains the verified production instance.

## Print-first status

`NOT_PRINT_READY` remains mandatory.

Current working canvas is provisional A5-class `1480 × 2100`; exact printer authority is still deferred. Do not silently convert provisional bleed/safe values into production truth.

Still deferred:

- exact printer template;
- vendor-confirmed bleed / trim / safe geometry;
- final imposition;
- CMYK/profile conversion and proof of deep navy + muted gold;
- minimum printable gold hairline proof at 100%;
- final menu/drink copy and realistic long-copy stress;
- real guest names and actual-data verification;
- PDF export/preflight;
- effective-PPI QA if/when raster assets are placed;
- 100% or physical proof.

`DESIGN_COMPLETE != PRINT_READY` remains the active rule.

## Next exact task

1. Preserve the corrected front and all old history.
2. Treat the front reference-structure correction as the new V4 control.
3. Audit the interior against the verified direction image specifically for paper tactility and physical print cues.
4. If that gap is material, define the exact interior fixed-paper role in `FINAL MISSING ASSET LIST` before creating any texture/ornament asset.
5. Do not add generic airplane/stamp/badge decoration merely to imitate the reference.
6. After the interior correction is mature, re-run four-face thumbnail / reading / actual-size review before considering `SELLABLE_VISUAL_QA_PASS`.
