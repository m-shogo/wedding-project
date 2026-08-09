# V5 Q2/Q3 body microtype readability promotion

Date: 2026-08-09
Item/version: Rurubu WEDDING V5
Live Current frame: `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`
Comparison frame: `550:2 / V5_INSIDE_Q23_MICROTYPE_QA_2026_08_09`
Status: `PROTOTYPED -> VERIFIED / CURRENT_ADOPTED / GLOBAL_RULE_NOT_PROMOTED`

## Authorities re-read before work

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `CURRENT-STATUS.md`
- `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`
- `RURUBU-MAGAZINE-EDITORIAL-DESIGN-KNOWLEDGE-BASE.md`
- `RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`
- `RURUBU-V6-CURRENT-STATUS.md`

## Visible problem

On the inside-left `3 QUESTIONS` module, Question 01 body copy was 14 px while Questions 02 and 03 used 12 px body copy. At whole-spread scale the latter two answers were visibly weaker and approached microcopy rather than readable editorial body text. Their text nodes also used fixed-height `textAutoResize=NONE`, leaving avoidable clipping risk when realistic Japanese copy wraps.

## Tested principle / hypothesis

Source principles:
- Japanese typography is reading infrastructure, not decoration.
- Actual-size legibility must be reviewed separately from thumbnail appearance.
- Prefer a bounded text-role correction over adding a container, badge, shadow, or decorative field.

Hypothesis: raising Q2/Q3 answer copy from 12 px to 13 px and converting the affected text nodes to safe auto-height would improve actual-size readability without changing hierarchy, image assets, or the overall editorial silhouette.

Expected gain:
- stronger parity between Q1 and Q2/Q3 reading comfort;
- lower clipping risk for Japanese wrap;
- no new card/container density.

Possible regression:
- Q3 question wraps to two lines and can collide with its first answer if the existing fixed vertical offsets are preserved.

Adoption evidence required:
- rollback-safe duplicate;
- whole-spread screenshot;
- reading-scale left-page inspection;
- actual-size text geometry check;
- structure/hash/rollback preservation.

## Prototype

Created duplicate:
- `550:2 / V5_INSIDE_Q23_MICROTYPE_QA_2026_08_09`

Initial prototype:
- Q2/Q3 question: 15 -> 16 px
- Q2/Q3 answers: 12 -> 13 px
- all six nodes: `textAutoResize NONE -> HEIGHT`

Initial regression detected:
- `550:39 / IA_QA_3_Q` became 42 px high and ended at y=665;
- `550:40 / IA_QA_3_A` also started at y=665;
- this created a title/body collision boundary.

The first prototype was therefore **REVISED, not promoted**.

## Revised prototype

Kept question size at 15 px while preserving safe auto-height, kept answer size at 13 px, and adjusted only Q3 answer y positions:
- `IA_QA_3_A`: y `665 -> 674`
- `IA_QA_3_B`: y `713 -> 724`

Resulting comparison geometry:
- Q2 title bottom: 642
- Q2 A: 665-703
- Q2 B: 713-751
- Q3 title: 623-661
- Q3 A: 674-712
- Q3 B: 724-762

No overlap or clipping remained.

## Current promotion

Promoted to Current nodes:
- `77:320 / IA_QA_2_Q`: 15 px, `HEIGHT`
- `77:321 / IA_QA_2_A`: 12 -> 13 px, `HEIGHT`
- `77:322 / IA_QA_2_B`: 12 -> 13 px, `HEIGHT`
- `77:327 / IA_QA_3_Q`: 15 px, `HEIGHT`
- `77:328 / IA_QA_3_A`: 12 -> 13 px, y `665 -> 674`, `HEIGHT`
- `77:329 / IA_QA_3_B`: 12 -> 13 px, y `713 -> 724`, `HEIGHT`

No copy, font family, colors, cards, image fills, crops, or unrelated geometry were changed.

## Three-scale QA

### Whole-item / spread
PASS. `3 QUESTIONS` remains subordinate to the profile heading and balanced against `OUR HISTORY`; no extra visual container was introduced.

### Reading / page
PASS. Q2 and Q3 answers now carry more comparable reading weight to Q1 without becoming headlines. Q3 keeps a clear separation between its wrapped question and first answer.

### Detail / actual-size
PASS for V5 dummy-design QA. 13 px answer text is visibly easier to read; auto-height exposes the complete two-line Japanese answers rather than relying on fixed-height clipping behavior.

## Structure QA

Post-promotion Current readback:
- native text nodes: `92`
- visible text nodes: `57`
- IMAGE-fill nodes: `9`
- fold guide `77:540`: preserved and visible
- V4 rollback frames `59:2` and `59:178`: preserved
- comparison `550:2`: preserved

Verified image hashes remained unchanged:
- `77:296`: `a39dd297eb9de572317a5ce57f0af12e8597b156`
- `77:302`: `2359f635b4926a83e22ca1f9214e75c709291152`
- `77:422`: `539c259be8036b481d06b4f76db9a39b407d90e8`
- `77:430`: `adbb8e529451a81dd25e4eb29bf068655569ce25`
- `77:438`: `439a719d73f28e8dd2889f2026cccb15f345ec63`
- `77:446`: `58d7d6f144a4aff9e3cc31caefad88089981ec6a`
- `77:454`: `c09aa82e7b2ac75708707345c6f845452bf67663`

## Asset / V6 gate impact

No photo-role state changed. Official V5 photo counts remain:
- `PHOTO_ROLE_PASS 10/11 active`
- `ROLE_COMPLETE 10/11 active`
- `DOMINANT_PHOTO_PASS 2/3`

The unresolved cover hero `V5-01 / 77:148` remains the sole active photo blocker. The prepared Q60 derivative remains a valid source candidate; this run did not repeat known failed binary-transfer paths and did not regenerate an already acceptable master.

V6 production remains blocked until `RURUBU_V5_DUMMY_PHOTO_DESIGN_QA_PASS` is genuinely verified.

## Lesson

A microtype increase is not safe merely because the new size looks better. Japanese editorial text changes must verify the resulting line count and text-node geometry. In a bounded repeated module, `textAutoResize=HEIGHT` plus explicit vertical separation can improve readability and content-length resilience without adding UI-style containment.

This is a **VERIFIED V5 lesson**, not yet a project-wide rule.

## Next application

Continue V5 only. Do not reopen the known Q60 transfer methods in this runtime. Audit the remaining weakest typography/density/fold-safe detail, or use a newly available binary-safe Figma path if one exists. Keep V6 production closed until the cover hero and final V5 dummy-design gate are verified.
