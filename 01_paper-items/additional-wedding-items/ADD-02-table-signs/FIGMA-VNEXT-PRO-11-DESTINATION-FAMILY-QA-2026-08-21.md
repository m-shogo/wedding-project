# ADD-02 11卓の国別テーブルサイン — Professional vNext 11-destination family QA

Date: 2026-08-21
State: `VNEXT_PRO / CLEANROOM / 11_OF_11_SELECTED_LOCAL / FAMILY_VISUAL_QA_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / NO_PRODUCTION_PROMOTION`
Start/latest authority SHA before evidence write: `820ecb9e798b591c457269cfa4924907ea51c297`
Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
Figma: `LAZAZ0u3RGqtN4bYFPZ3pU`
Page: `125:2 / VNEXT_PRO / ADD-02 / DESTINATION POSTERS / 2026-08-21`
Drive authority readback: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

## Clean-room authoring

Only factual/non-visual requirements were reused: 11 destination names, 1000×1480 working sign format, table index, date, country-theme semantic placeholder, and print/readability constraints. No retained production frame, prior V2–V14 layout, decorative vector, image crop, generated asset, rail, badge, icon, or prior background composition was used as an authoring source.

This run continued the Professional Design Council vNext method by creating three materially different blank-frame directions for each remaining destination and selecting one only after live visual review.

Selected vNext roots:

- HAWAII `125:3 / ARRIVAL LIGHT`
- ITALY `127:22 / BLUE HOUR`
- FRANCE `129:25 / CHAMPAGNE LIGHT`
- SPAIN `129:36 / SUN FAN`
- TAIWAN `129:85 / TEA MOUNTAIN`
- JAPAN `133:2 / FIRST TRAIN RED SUN`
- HONG KONG `133:35 / HARBOUR NEON`
- SINGAPORE `133:68 / GARDEN EQUATOR`
- BALI `137:2 / VOLCANIC SUNSET`
- KOREA `137:47 / HANJI RHYTHM`
- MALDIVES `137:81 / REEF CURRENT`

The new family QA board is `142:2 / QA / ADD-02 / 11 DESTINATION FAMILY THUMBNAIL / 2026-08-21`.

## Family visual QA

Live whole-family review of `142:2` PASS.

The eleven posters read as one energetic destination family through strong destination titling, oversized table numerals, controlled color contrast and movement, while avoiding one repeated template. Important differences remain visible at thumbnail scale: Hawaii uses a sunrise/spine composition; Italy a blue-hour field; France a champagne editorial field; Spain a split sun/fan composition; Taiwan tea terraces; Japan track-like movement; Hong Kong a harbour/neon signal field; Singapore garden canopy movement; Bali volcanic sunset; Korea layered paper/block rhythm; Maldives reef-current movement.

This is intentionally not a literal airline UI system. No fake gate, flight number, class, barcode, scanner reticle, or transport credential was introduced.

## Long-copy stress and bounded repairs

Realistic long country-theme copy was tested on hidden QA duplicates for FRANCE, SPAIN, TAIWAN, JAPAN, HONG KONG, SINGAPORE, BALI, KOREA and MALDIVES.

The stress pass found real composition defects that were not visible with short placeholders:

- France: lower coral decoration collided with expanded copy; the decorative petal was removed and the copy lane was moved upward.
- Spain: fan strokes entered the right copy field; they were shortened to the left/yellow side and the copy lane moved upward.
- Taiwan: terrace bands crossed the variable-copy column; terraces were bounded to the left and the copy role moved to a dedicated right lane.
- Japan: track gestures crossed the expanded description; tracks were shortened to the left and the copy role moved upward.
- Hong Kong: the gold night line crossed expanded copy; it was reduced to a short left-side accent and the copy role moved upward.
- Singapore: canopy/orchid gestures crossed the right copy field; they were bounded to the left/bottom-left.
- Korea: expanded copy reached the date/footer; the copy role moved upward into the clean cream field.
- Maldives: reef-current strokes entered the expanded copy lane; aqua/coral currents were bounded to the left and the copy role moved upward.

Final structural readback of the nine hidden stress proofs confirms every expanded theme note ends before its date/footer: France bottom 1274 < date 1310; Spain 1260 < 1310; Taiwan 1284 < 1310; Japan 1284 < 1310; Hong Kong 1266 < 1310; Singapore 1284 < 1310; Bali 1294 < 1310; Korea 1224 < 1300; Maldives 1274 < 1310.

## Native-text geometry repair

A structural readback caught the existing shared failure fingerprint `AI_TEXT_RENDER_OK_BUT_BOUNDS_INVALID` again: the nine newly authored selected roots visually rendered correctly but their text nodes had `textAutoResize=NONE` after the authoring helper called `resize()` after setting auto-resize.

The already `VERIFIED_CROSS_ITEM` replacement method from `docs/design-learning/non-rurubu-shared-learning-feed.append/2026-08-21-nrsl-ai-text-geometry-readback.md` was applied only after independent readback confirmed the same fingerprint. Required fonts were loaded and selected/stress text nodes were changed to role-appropriate fixed-width `textAutoResize=HEIGHT`.

Repair count: `126` text layers across the nine selected roots and their nine stress proofs.

Final selected-root structure readback:

- all 11 roots are exactly `1000×1480` and `clipsContent=true`;
- HAWAII/ITALY native text: 6/6 auto-height each;
- each of FRANCE through MALDIVES: 7/7 native text layers auto-height;
- IMAGE fills across all 11 selected roots: `0`;
- variable information remains native editable Figma text;
- no variable copy was baked into raster/SVG;
- long-copy QA duplicates are hidden after verification.

## Hybrid authoring / generated asset decision

This pass used native text plus simple editable Figma geometry. Generated raster assets: `0`. Replaceable IMAGE fills: `0`. Drive writes: `0`.

This is deliberate rather than a missing-production claim: after screenshot diagnosis, the current bottleneck was composition, typography, movement, copy-safe lanes and structural text bounds, not missing photography/illustration. Adding generic destination imagery would have increased stock/AI-template risk without solving the observed defects. The exact Drive authority was nevertheless live-read before Figma writes.

## Three-scale judgment

- Whole/family scale: PASS on `142:2`; 11 items remain recognizable as one suite without template sameness.
- Reading scale: PASS on selected live roots and repaired stress examples; destination, Japanese phrase, table number and variable description maintain clear hierarchy.
- Actual-size/detail/structure: PASS for current working format; all selected text is native and auto-height, IMAGE fills are zero, and realistic expanded country-theme copy clears the footer in every tested destination.

## Decision

`11_OF_11_SELECTED_LOCAL + FAMILY_VISUAL_QA_PASS + LONG_COPY_STRESS_PASS + STRUCTURE_QA_PASS`.

This is not yet production promotion and not `NOT_PRINT_READY` clearance. Retained production remains untouched. The next high-value step is a mature-candidate comparison against retained production plus final professional scoring/print-detail review; only if the vNext family clearly wins should production promotion be considered.