# Rurubu V5 — outer footer strip subtraction

Date: 2026-08-07
Status: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_PROMOTED`

## Authorities and live evidence

This run remained subordinate to live Figma, verified Drive evidence, `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`, `CURRENT-STATUS.md`, the project-wide Figma/asset/learning authorities, the quality-over-legacy decision, the Rurubu editorial knowledge base, V5 operating system, postmortem, and V6 clean-room guardrails.

Current outer candidate: `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`

Preserved rollback:
- `59:2 / 01_RURUBU_AUTHENTIC_OUTER`
- `59:178 / 02_RURUBU_AUTHENTIC_INSIDE`

Preserved comparison:
- `355:2 / V5_OUTER_BACK_FOOTER_STRIP_TEST_2026_08_07`

## Visible problem

The outer spread still used two dark navy footer elements as rounded pills. The back-cover footer was especially heavy at `692 × 42` with `12 px` corner radius, while the front-cover issue strip was `722 × 24` with the same pill radius.

At whole-spread scale these elements read closer to interface/status bars than print folios. The back footer also carried substantially more visual mass than the front footer despite both serving the same low-priority issue/identity function.

The quality-over-legacy question was: if these footers did not already exist, would a professional editorial pass choose thick rounded pills for this information? The comparison hypothesis was no.

## Principle tested

Subtraction and hierarchy before decoration:
- reduce containment mass before adding any new element;
- use low-priority folio information as a quiet editorial strip;
- avoid rounded UI geometry where a simple rule/strip performs the same semantic job.

Expected improvement:
- quieter lower edge;
- more consistent front/back folio weight;
- less dashboard/pill language;
- stronger attention on the photographic/editorial hierarchy above.

Possible regression:
- footer identity could become too weak;
- the back page could feel unfinished;
- moving the back strip could reduce bottom breathing room or create alignment imbalance.

Evidence required:
- rollback-safe duplicate;
- whole-spread comparison;
- natural-size screenshot review;
- structure audit proving native text, photo hashes, fold guide, rollback, and comparison evidence were preserved.

## Experiment

Created duplicate:
- `355:2 / V5_OUTER_BACK_FOOTER_STRIP_TEST_2026_08_07`

In the duplicate:
- `BACK_BOTTOM_BAR`: `692 × 42`, radius `12` → `692 × 24`, radius `0`, y `1038 → 1050`
- `BACK_BOTTOM_BAR_TXT`: y `1048 → 1055`
- `BOTTOM_ISSUE_STRIP`: radius `12 → 0`, size remains `722 × 24`

No copy, image, crop, asset state, semantic role, or unrelated geometry changed.

## Three-scale result

### Whole item

The comparison won. The lower edge is calmer and reads as print folio information rather than two pill controls. The back footer no longer outweighs the front footer.

### Reading/page scale

Back-cover reading order remains:
`OUR TRAVEL NOTES → lead memory → FRIENDS & FAMILY → OUR JOURNEY ROUTE → folio`.

Front-cover reading order remains:
`masthead/date → hero/main cover line → feature index → issue folio`.

The footer remains visible but clearly subordinate.

### Detail / natural-size scale

The 24 px strips retain sufficient dark field for the existing white native microcopy. No clipping, text reflow, overlap, or fold conflict was observed.

## Current adoption

Applied to Current `77:18`:
- `77:100 / BACK_BOTTOM_BAR`: height `42 → 24`, y `1038 → 1050`, corner radius `12 → 0`
- `77:101 / BACK_BOTTOM_BAR_TXT`: y `1048 → 1055`
- `77:233 / BOTTOM_ISSUE_STRIP`: corner radius `12 → 0`

Preserved:
- `355:2` comparison frame
- V4 rollback `59:2` / `59:178`
- `77:288 / PROVISIONAL_FOLD_GUIDE`
- native text
- semantic photo nodes
- non-destructive image fills/crops

Post-adoption structure evidence:
- native text nodes: `85`
- visible text nodes: `41`
- IMAGE-fill nodes: `14`
- cover hero `77:148` hash unchanged: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- back main `77:24` hash unchanged: `2cfd19cf1701db58039a4fc645e4279832ec465a`
- friend `77:39` hash unchanged: `2005b91ce26ead7d8128f547c293fe4a510f5d24`
- friend `77:43` hash unchanged: `3abe9ce228d2252b847860ac895f2c178b6b3ddd`

## Failure / limitation

This does not solve the dominant-photo gate. The live cover hero, back main, and history roles still require quality/provenance closure. No `INTENDED_SOURCE_APPLIED`, `PHOTO_ROLE_PASS`, or V5 completion count changed.

This also does not establish that all footer strips must be square. The result is verified for these specific low-priority folio roles and remains below `PROJECT_RULE`.

## Reusable lesson

When front/back folio information has the same semantic priority, compare their visual mass directly. A thick rounded footer can accidentally become an interface/status element; a thin square editorial strip may preserve identity while returning hierarchy to the page content.

## Next application

Return priority to dominant-photo evidence closure using a genuinely changed binary-safe method. While that remains blocked, continue only bounded high-impact V5 typography, crop, fold, hierarchy, and subtraction QA. Do not begin V6 production before the verified V5 dummy-photo design gate.
