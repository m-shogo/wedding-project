# Rurubu V5 — Friends label direct-type subtraction

Date: 2026-08-07
Status: `DISCOVERED → PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_PROMOTED`

## Scope

Rurubu WEDDING V5 only. No Passport, Boarding Pass, 青春ふたりきっぷ, ADD item, V6 production, photo source, crop, or asset-ledger state was modified.

## Authorities read before action

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `01_paper-items/rurubu-wedding/RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`
- Rurubu editorial knowledge/lessons, operating-system, postmortem, and V6 planning authorities already governing this run

## Visible problem

The Current back-cover `FRIENDS & FAMILY` module had already been simplified to a verified two-photo composition and its redundant translucent tape layers had been removed. However, each remaining photo still carried a solid colored rounded tab (`FRIENDS 01`, `FRIENDS 02`). At whole-item scale these tabs continued to read as small UI/sticker controls rather than necessary editorial structure.

The labels themselves remain useful because they connect each caption to the correct photo. The question was therefore not whether to remove the labels, but whether the colored tab containers still earned their visual weight.

## Legacy challenge

Asked: if this module were designed today without seeing the legacy frame, would solid rounded tab rectangles be required to identify the two Friends photographs?

Answer tested: probably not. The section heading, two-photo geometry, captions, and label proximity already provide grouping. Native direct type may preserve the semantic label while removing redundant containment.

## Hypothesis

Hide only the two tab rectangles and retain the native label text as small colored editorial microtype.

Expected improvement:

- less sticker/Web-UI vocabulary;
- more emphasis on the two photographs and captions;
- quieter transition from the lead memory article into `FRIENDS & FAMILY` and then `OUR JOURNEY ROUTE`;
- no loss of semantic identification.

Possible regression:

- labels could become too weak or detached from their photos;
- the second ochre label could lose contrast against the warm paper;
- the module could look unfinished at actual size.

Evidence required:

- rollback-safe duplicate before Current mutation;
- whole-item comparison;
- reading-scale relation of labels to photographs/captions;
- actual-size legibility check;
- structure audit proving native text, photos, image hashes, fold guide, rollback frames, and comparison frame remain intact.

## Safe prototype

Created comparison frame:

- `358:2 / V5_BACK_FRIEND_LABEL_DIRECT_TYPE_TEST_2026_08_07`

Only in the duplicate:

- hid cloned `FRIEND_TAB_FRIENDS 02` rectangle;
- preserved cloned `FRIEND_TAB_TXT_FRIENDS 02` native text and changed it to the existing section blue;
- hid cloned `FRIEND_TAB_FRIENDS 03` rectangle;
- preserved cloned `FRIEND_TAB_TXT_FRIENDS 03` native text and changed it to a darker ochre selected for paper-background contrast;
- changed no text content, photo, caption, crop, image hash, geometry, fold guide, or asset role.

## Three-scale comparison

### Thumbnail / whole-item

PASS for the direct-type candidate. The Friends area becomes visibly quieter. The two photographs read first, while the labels remain available as micro-information. The previous solid blue/yellow tabs no longer create two extra high-contrast sticker shapes.

### Reading / page scale

PASS. `FRIENDS 01` and `FRIENDS 02` remain immediately adjacent to the correct photographs, and the captions below the photographs retain the reading order. No new ambiguity was introduced.

### Detail / actual-size

PASS. High-resolution Current review after adoption kept the small direct labels readable against the warm paper. The blue label retains strong contrast; the second label uses dark ochre rather than the former bright yellow fill so it does not disappear into the paper tone.

## Current adoption

Applied the winning duplicate treatment to Current:

- `77:92 / FRIEND_TAB_FRIENDS 02`: `visible true → false`
- `77:93 / FRIEND_TAB_TXT_FRIENDS 02`: native text preserved; fill → section blue
- `77:94 / FRIEND_TAB_FRIENDS 03`: `visible true → false`
- `77:95 / FRIEND_TAB_TXT_FRIENDS 03`: native text preserved; fill → dark ochre

No nodes were deleted.

## Post-adoption structure evidence

Live Figma audit after Current adoption:

- Current outer: `77:18`
- native text nodes: `85`
- visible text nodes: `41`
- IMAGE-fill nodes: `14`
- fold guide: `77:288`, visible
- rollback frames preserved: `59:2`, `59:178`
- comparison frame preserved: `358:2`

Target labels:

- `77:92`: present, hidden
- `77:93`: present, visible native text
- `77:94`: present, hidden
- `77:95`: present, visible native text

Relevant photo hashes remained unchanged:

- `77:24 / BACK_VISUAL_MAIN_MEMORY_PHOTO`: `2cfd19cf1701db58039a4fc645e4279832ec465a`
- `77:39 / BACK_VISUAL_FRIEND_2_PHOTO`: `2005b91ce26ead7d8128f547c293fe4a510f5d24`
- `77:43 / BACK_VISUAL_FRIEND_3_PHOTO`: `3abe9ce228d2252b847860ac895f2c178b6b3ddd`
- `77:148 / IMG_HERO`: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`

## Failure / regression check

This does **not** establish that all photo tabs should be removed. A tab can remain when it provides necessary contrast, attachment, navigation, or grouping that direct type cannot provide. Here the two-photo composition and label proximity already supplied those functions.

The dominant-photo problem remains unresolved. This visual refinement does not advance `INTENDED_SOURCE_APPLIED`, `PHOTO_ROLE_PASS`, `ROLE_COMPLETE`, the V5 dummy-design gate, or the V6 production gate.

## Dominant-photo transport note

The Drive-verified back-main Q70 derivative remains:

- `RURUBU_V5_10_BACK_MAIN_TRAVEL_FLATLAY__FIGMA_944x608_Q70_TRANSPORT.jpg`
- Drive ID `1L-SQiPuNHrCMuTbb_yaf9FNPg5iuf8uN`
- `944 × 608`
- `95,542 bytes`

It was read back again during this run. The known `mcp.figma.com` DNS path still does not resolve from the execution container, so the previously failed upload mechanism was not repeated. A local 944×608 WebP transport experiment was prepared only as a possible changed method; it was not counted as Figma application or role completion.

## Reusable lesson

When a photo label remains semantically useful but its colored container contributes no necessary contrast or grouping, test preserving the native label as direct microtype before redesigning the tab. The improvement is the removal of redundant containment, not the removal of information.

Status remains V5-specific and `VERIFIED`; it is not promoted directly to `PROJECT_RULE`.

## Next application

Return priority to dominant-photo evidence closure through a genuinely changed binary-safe method. If transport remains blocked, continue only bounded high-impact V5 typography/crop/fold/hierarchy QA rather than repeating failed network uploads or adding decoration.
