# ADD-11 写真共有 / QR案内サイン — Professional vNext DARKROOM DEVELOPING TRAY QA

Date: 2026-08-22
State: `CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_IMPROVED / A5_A4_REFLOW_PASS / LONG_COPY_STRESS_PASS / JAPANESE_SEMANTIC_LINEBREAK_PASS / AUTO_HEIGHT_PASS / PRIOR_CURRENT_PRESERVED / NOT_PRINT_READY`

## Live authority

- start/latest observed `main` before evidence write: `9a658635de38bd4603c21f365e0f7e5b62e0a647`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- promoted Japanese semantic line-break QA consumed as a project-wide method only
- Figma file: `PWQ5ygJJt0IlOqj5ri5jng`
- exact Drive authority re-read live: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb / ADD-11_写真共有_QR案内サイン`
- Drive writes: `0`

## Why ADD-11 reopened again

The existing `PHOTO LAB ENVELOPE` remained a legitimate `92/100` current design, but its own council record held only `3/5` for family fit without template sameness. After later suite work, several unrelated items had become letter/envelope/paper-insert artifacts. ADD-11 therefore still had one important ceiling: the photo-sharing sign should be recognizably photographic at first glance, without converging on the wider suite's envelope/letter metaphor.

This pass did not invalidate the prior structure, long-copy or QR-role evidence. It reopened only the family-fit / item-specific physical-artifact ceiling.

The previous Current was used only for final mature comparison. No old node, layout, film edge, QR field, color field, group, crop or asset was duplicated into the new clean-room construction.

## Clean-room inputs

Only verified non-visual requirements were carried forward:

- A5 `875×1240` and A4 `1240×1754` roles;
- photo-sharing / QR guidance purpose;
- native semantic placeholders for sharing method, access/privacy scope, retention/expiry and hashtag/notice;
- confirmed date `2026.10.24`;
- real sharing URL / privacy wording / expiry / hashtag remain unresolved;
- real QR remains future replaceable content, not baked decoration.

## Three blank-frame directions

New study page:

`51:2 / VNEXT_STUDY / ADD-11 / PHOTO SHARE / PHYSICAL SPECIFICITY / 2026-08-22`

1. `51:3 / CONTINUOUS PROOF STRIP`
   - black film edge + single proof-sheet field;
   - rejected: first screenshot exposed both a mechanical Japanese split (`持ち寄ろ / う。`) and lead/headline collision.
2. `51:32 / DARKROOM DEVELOPING TRAY`
   - darkroom tray + one developing print + safelight / chemistry-edge cues;
   - selected for mature development because the physical metaphor is specific to photographic processing rather than a generic envelope, card or poster.
3. `51:44 / PRINT ARCHIVE TAPE`
   - archive label / paper field treatment;
   - rejected: too close to system/UI information-panel grammar despite being clean.

This preserved the rule that a new direction is not promoted merely because it differs from the old one.

## Mature selected direction

Dedicated Current page:

`53:34 / CURRENT_SELECTED / ADD-11 / DARKROOM DEVELOPING TRAY / 2026-08-22`

- A5: `52:2 / CURRENT / ADD-11 / DARKROOM DEVELOPING TRAY / A5`
- A4: `53:2 / CURRENT / ADD-11 / DARKROOM DEVELOPING TRAY / A4`
- hidden long-copy stress: `52:18 / 53:18`

A4 was built as an independent reflow rather than a scaled clone of A5.

Visual concept:

- deep ink outer field as the darkroom environment;
- black physical developing tray;
- one slightly rotated warm print sheet as the dominant object;
- coral safelight edge and narrow cyan chemistry/process edge;
- native Japanese headline `今日の写真を、みんなで現像しよう。`;
- QR as a separate white paper role inside the developing print, with no fake URL or fake code;
- yellow A5/A4 tray-index tab and date outside the print as physical production labels;
- no camera icon, scanner orbit, contact-sheet card grid, fake film metadata, gradient, shadow, stock wedding photograph, or generated person imagery.

Compared with `PHOTO LAB ENVELOPE`, the new dominant physical metaphor is processing/developing rather than envelope/insert. This improves suite diversity while remaining photo-specific.

## Hybrid authoring split

- variable/factual/emotional copy: native Figma text;
- QR placeholder: native semantic text on an independent replaceable white paper role;
- darkroom tray / print / safelight / chemistry edge / index tab: simple native geometry with explicit physical meaning;
- SVG: `0`;
- generated/composed raster: `0`;
- IMAGE fills: `0`;
- variable text baked into image/SVG: `0`.

Image generation was intentionally not used. The screenshot-supported defect was physical-metaphor convergence / family fit, not missing photography. Decorative generated wedding imagery would reduce QR trust and risk fake-documentary/stock treatment.

## Screenshot QA

### A5 selected

Native `875×1240`: PASS.

The developing tray and rotated print read as one physical photographic object. The headline is the first read; sharing method, access/retention/hashtag roles and QR remain clearly subordinate. Removing the visible QR border after comparison improved the paper/quiet-zone reading and reduced widget-like containment.

### A4 selected

Native `1240×1754` / reading render: PASS.

A4 is a separate reflow with a wider print, larger QR role and longer horizontal rhythm. It does not read as a scaled A5 UI.

### Long-copy stress

A5 `52:18` and A4 `53:18` were tested with longer headline, lead, access/retention/notice placeholders and closing copy.

The first stress screenshots caught a new application of the promoted Japanese semantic-linebreak rule: artificially long bracket labels produced bad splits such as `案 / 内` and `注意事 / 項`, despite structural overflow being zero. The stress contract was corrected to realistic semantic placeholders without inventing facts:

- `[公開範囲に関する案内文]`
- `[保存・削除時期に関する案内文]`
- `[写真共有時の注意事項]`

The copy lanes were widened where needed, preserving type size. Final A5/A4 stress screenshots: PASS with natural Japanese wrapping and no fake facts.

This is a QA correction, not a production-copy decision: final wording remains blocked until authoritative.

## Structure readback

A5 selected `52:2`:

- native visible text: `8`;
- fixed-height text: `0`;
- visible text outside role/root: `0`;
- IMAGE fills: `0`.

A4 selected `53:2`:

- native visible text: `8`;
- fixed-height text: `0`;
- visible text outside role/root: `0`;
- IMAGE fills: `0`.

A5/A4 stress `52:18 / 53:18`:

- native visible text: `8 / 8`;
- fixed-height text: `0 / 0`;
- visible text outside role/root: `0 / 0`;
- IMAGE fills: `0 / 0`;
- returned hidden after proof review.

All visible native text uses real auto-height geometry.

## QR containment decision

The mature candidate initially used a thin dark border around the white QR paper. A bounded application of the already-verified quiet-zone/container-subtraction method removed only that visible stroke while preserving the white physical paper and its geometry. The result remained immediately understandable but read less like a UI widget.

No real QR has been inserted. Real-code quiet-zone and scan proof remain deferred.

## Mature comparison / council

Only after the new A5/A4 candidate passed selected screenshots, long-copy screenshots and structure readback was the prior `49:39 / 49:74 PHOTO LAB ENVELOPE` reopened for final comparison.

PHOTO LAB ENVELOPE remains a strong, rollback-safe 92/100 design. The new DARKROOM DEVELOPING TRAY is preferred under the current family-scale brief because it keeps photo-specific physicality while avoiding the envelope/letter convergence now present elsewhere in the suite.

Professional Design Council:

- Concept clarity / ownability: `15/15`
- Emotional excitement / pick-up appeal: `13/15`
- Japanese editorial typography: `14/15`
- Composition / hierarchy / rhythm: `14/15`
- Travel / memory integration without cliché: `8/10`
- Item-specific photo-share functionality / QR trust: `10/10`
- Physical print credibility: `9/10`
- Editability / realistic-content resilience: `5/5`
- Family fit without template sameness: `5/5`

Total: `93/100 / PASS / NO VETO`.

Executive Creative Director: no veto — one developing-tray concept controls the object.
Japanese Editorial Designer: no veto after semantic-wrap stress correction.
Print Production Director: no veto for the digital master; real QR / stock / vendor / physical proof remain deferred.

## Preservation

- prior Current PHOTO LAB ENVELOPE `49:39 / 49:74` remains untouched in its original page as rollback/history;
- prior NIGHT ALBUM, earlier V2 and legacy remain preserved;
- rejected clean-room studies remain study evidence and are not production sources;
- no Drive asset was changed.

## Deferred finalization

Still unresolved and not fabricated:

- sharing service / URL and account ownership;
- access scope / permissions / privacy wording;
- retention / expiration;
- hashtag decision;
- final installation size A5/A4 and whether A6 is required;
- real QR generated from approved URL;
- iPhone/Android + low-light/oblique physical scan proof;
- printer template/profile, bleed/safe area, stock, frame/stand interference, export and physical print proof.

## Result

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROFESSIONAL_VNEXT_DARKROOM_DEVELOPING_TRAY_SELECTED / FAMILY_DIVERSITY_IMPROVED / A5_A4_REFLOW_PASS / LONG_COPY_STRESS_PASS / JAPANESE_SEMANTIC_LINEBREAK_PASS / STRUCTURE_READBACK_PASS / PRIOR_CURRENT_PRESERVED / NOT_PRINT_READY`.
