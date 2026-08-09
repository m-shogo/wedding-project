# Rurubu V5 — clean-room H native-text clipping repair

Date: 2026-08-10
Status: `VERIFIED / COMPARATOR_REPAIRED / CURRENT_UNCHANGED`
Scope: Rurubu WEDDING only

## Authority and safety

Project-wide Figma production, generated-asset memory, continuous-learning, design-feedback, project-memory, quality-over-legacy, Current Status, and latest inside-promotion evidence were read before the write. Live Figma remained the highest authority. No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD item was modified.

## Visible problem

Fresh live inspection of clean-room outer H `613:2 / V5_OUTER_RURUBU_CLEANROOM_H_MAX_EDITORIAL_2026_08_10` found that its bottom feature-navigation text had been created with fixed `10 px` text-box heights even though the native font sizes were `16–18 px`. The candidate therefore had a real actual-size clipping risk despite its stronger magazine composition. The back-main kicker/heading/body also produced two geometric text overlaps in structure QA.

Affected feature nodes before repair:
- `613:145 / CE_FEATURE_1_NO`: h 10, font 18
- `613:146 / CE_FEATURE_1`: h 10, font 16
- `613:147 / CE_FEATURE_2_NO`: h 10, font 18
- `613:148 / CE_FEATURE_2`: h 10, font 16
- `613:149 / CE_FEATURE_3_NO`: h 10, font 18
- `613:150 / CE_FEATURE_3`: h 10, font 16
- `613:152 / CE_FOOTER_TXT`: h 10, font 11
- `613:154 / CE_PICKUP_TXT`: h 10, font 13

## Hypothesis

Keeping the editorial composition but switching bounded native text roles to height-resizing text boxes would preserve the intended width/hierarchy while eliminating fixed-height clipping. The back-main copy could be separated vertically without adding cards or decoration.

Expected gain:
- actual-size legibility and print plausibility
- no change to the clean-room composition concept
- no Current mutation
- no rasterization or semantic loss

Possible regression:
- resized text boxes could collide with neighboring editorial modules.

Evidence required:
- same-call geometry readback
- fresh full-candidate overlap scan
- image-hash/provenance readback
- fold-guide readback
- Current hero hash unchanged

## Prototype and repair

Only comparator `613:2` was edited.

Feature navigation native text was changed to `textAutoResize=HEIGHT`, preserving width and font size. Resulting heights:
- number roles: `10 → 22 px`
- two-line feature roles: `10 → 38 px`
- footer: `10 → 13 px`
- pickup: `10 → 16 px`

Back-main text was then separated:
- `613:13 / BACK_VISUAL_MAIN_NO`: y `390 → 382`
- `613:14 / BACK_VISUAL_MAIN_HEADING`: y remains `410`, `textAutoResize=HEIGHT`, resulting h `52`
- `613:15 / BACK_VISUAL_MAIN_BODY`: y `468 → 482`, `textAutoResize=HEIGHT`, resulting h `39`

No cards, badges, shadows, gradients, or new decorative containers were added.

## Verification

Fresh structure QA after both repairs:
- visible native text nodes: `40`
- detected visible text overlaps: `0`
- fold guide `613:158 / PROVISIONAL_FOLD_GUIDE`: visible, width `2`, height `1122.5`

Verified comparator image hashes remained intact for its accepted supporting assets:
- back main `613:8`: `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Friends cafe `613:23`: `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends dining `613:27`: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- logo `613:135`: `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- date badge `613:136`: `0cbbf09357938365c2550f08928be1db33fa6060`

The comparator still uses `613:130 / CF_HERO_VERIFIED_EXISTING_ALT` with history-image hash `539c259be8036b481d06b4f76db9a39b407d90e8` strictly as a layout-comparison hero. It is **not** the V5-01 cover asset and is not counted as cover completion.

Current outer was not modified. Current cover hero `77:148 / IMG_HERO` remains hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912` and remains below the quality gate.

Fresh structure scan also exposed one pre-existing Current back-title/subtitle bounding-box overlap (`77:22` with `77:23`). This run did not modify Current because the stronger clean-room H comparator is the active redesign direction and Current must not receive incremental legacy polish merely to create activity.

## Learning result

`PROTOTYPED → VERIFIED / COMPARATOR REPAIR ADOPTED`

Principle tested:
- editorial text should not be forced into decorative fixed-height boxes smaller than its actual type size; native height-resizing is appropriate for bounded magazine navigation when width and reading order are intentionally fixed.

Result:
- adopted on clean-room H only.

Failure avoided:
- a visually stronger clean-room candidate could have been falsely judged print-plausible while several feature labels were structurally clipped.

Next application:
- keep H as the strongest outer comparator, but do not promote it until the true V5-01 cover hero is placed through a binary-safe quality-preserving path and the candidate passes whole-item, page/reading, and actual-size visual QA with that real role asset.

## Gate

V5 remains open:
- `PHOTO_ROLE_PASS 9/10`
- `ROLE_COMPLETE 9/10`
- dominant photo `2/3`
- remaining blocker `V5-01 / 77:148 / IMG_HERO`

V6 production remains closed.