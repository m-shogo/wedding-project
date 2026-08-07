# 2026-08-08 — V5 history transfer blocker + real-ratio Rurubu cover fidelity study

## Scope

Rurubu WEDDING V5 only. No PASSPORT / BOARDING PASS / 青春ふたりきっぷ / ADD-item changes.

Authorities re-grounded before production work:

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
- V6 status/research files.

## Experiment A — V5-05 history dominant-photo promotion

### Visible problem

Current `77:422 / IA_HISTORY_MEMORY_PHOTO` is still an unverified old placeholder. The ledger requires a quality-passing role-sized derivative and Drive ID → Figma node → image-hash evidence before the role can pass.

### Verified source/derivative

Master:

- `05_HISTORY_WATERFRONT_DUMMY.png`
- Drive ID `1LO9rwdFuWMD2TZvSa6efn-gjbdyRBYt3`
- Current target `77:422`
- target box `678 × 280`

Drive-readback derivative:

- `RURUBU_V5_05_HISTORY__FIGMA_1356x560_Q18_SINGLECALL.jpg`
- Drive ID `1ndvJShFDKPO6OmUD3JeIRvPwpS8V1v8x`
- `1356 × 560` by role contract / filename
- `29,582 bytes`
- exactly `2×` the target box dimensions

Visual readback showed a wide waterfront/sunset composition with no false-person identity issue and a substantially more appropriate banner composition than the existing blurred placeholder.

### Safe comparison target

- frame `383:2 / V5_HISTORY_Q18_DRIVE_DERIVATIVE_TEST_2026_08_08`
- target `383:140 / IA_HISTORY_MEMORY_PHOTO`
- Current `77:422` remained untouched.

### Methods tested and rejected

1. **Single-string Figma runtime base64 decode**
   - expected: decode verified Drive bytes in-plugin, then `figma.createImage(bytes)` on comparison only.
   - result: atomic failure `Invalid base64 string`.
   - adoption: REJECTED for this payload path.

2. **External `upload_assets` submit URL**
   - expected: direct asset placement on `383:140` without large tool payload.
   - result: execution runtime could not resolve `mcp.figma.com`; this matches a previously recorded blocker fingerprint.
   - adoption: REJECTED / DO NOT RETRY until runtime/network capability changes.

3. **Four-chunk guarded base64 transfer**
   - local source base64 length: `39,444` characters.
   - Figma-call concatenated length: `39,443` characters.
   - result: exactly one character was lost in tool-message transport; guarded script failed atomically before decode or mutation.
   - adoption: REJECTED; do not keep shrinking or re-chunking merely to create activity.

4. **Existing-Figma-asset reuse audit**
   - read-only audit searched top-level HISTORY/Q18 comparison frames and descendant IMAGE hashes.
   - `383:140` still has old hash `1bfd7f1fa601206bfed1594a140b40554e85d77a`.
   - no already-imported intended V5-05 Q18 asset was found in the targeted HISTORY/Q18 frames.
   - adoption: no reusable in-file hash available.

### Result

`V5-05` remains **OPEN**. No PHOTO_ROLE_PASS, ROLE_COMPLETE, dominant-pass, or ledger count was incremented. Current Figma was not modified.

### Reusable lesson candidate

When an exact binary payload cannot survive the tool boundary byte-for-byte, a length guard is mandatory and a one-character mismatch is a hard stop. Do not confuse a prepared Drive derivative with a Figma-applied asset. After two failures of the same transport family, switch methods or continue other safe work.

Status: `TESTED / REJECTED TRANSPORT METHODS / ROLE STILL OPEN`.

---

## Experiment B — real-ratio Rurubu Hawaii cover reconstruction study

### Source / research

Current JTB travel-guide references continue to use the standard large size `25.7 × 21 cm`, giving a portrait cover ratio of `21 / 25.7 = 0.81712`. A current Rurubu Hawaii ’26 cover reference was inspected only as research material for hierarchy, proportion, density, and overlap; published photography/logos are not production assets.

### Visible problem

The previous fidelity study `384:2` is `794 × 1122.5` (`0.70735`), much taller/narrower than the real Rurubu standard cover. That distorted masthead-to-photo proportion, lower-photo overlap, promo-badge placement, and overall density before typography was even judged.

### Hypothesis

Reconstructing the cover from a blank frame at the real physical ratio, while keeping every photo/copy replaceable, should teach the editorial proportions more reliably than refining a legacy-shaped wedding frame.

### Prototype

Created from scratch:

- `388:2 / V5_RURUBU_HAWAII26_REAL_RATIO_FIDELITY_STUDY_V4_2026_08_08`
- `840 × 1028`
- ratio `0.8171206`
- Current/rollback frames untouched.

Native/editable structure includes:

- top bonus strip
- three-block vertical series mark study
- `HAWAII` atmospheric type
- multi-lobed white destination title field
- native Japanese destination title
- issue badge
- large replaceable hero image
- direct-on-photo left cover lines
- narrow vertical yellow feature axis
- three independently replaceable lower images with native white framing
- detachable-map circular callout
- diagonal lower teaser
- micro series label / study note

Existing project-owned placeholder IMAGE fills were reused only to study geometry. No reference cover image was copied into production art.

### Mistake / correction

The first construction call referenced `384:19` as the hero source; metadata later proved `384:19` is text and the correct hero is `384:17`. Screenshot QA therefore showed a yellow hero placeholder.

A first correction then targeted `388:17`, but metadata proved that node is the issue text; this temporarily gave the native `’26` text an IMAGE fill inside the study frame. This did **not** touch Current.

Corrective action:

- inspected exact metadata before the next write
- loaded the issue text’s current font before restoring its text fill
- restored `388:17 / REF_ISSUE` to native hot-pink text
- applied source IMAGE hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912` to the correct `388:18 / REF_HERO_REPLACEABLE`
- re-ran screenshot QA

### Screenshot result

The corrected V4 is materially closer to the reference cover at whole-item scale because the physical ratio, title/photo proportions, lower-image overlap, map badge, and vertical-feature axis now occupy comparable zones. It is still a **study**, not a Current candidate and not a claim of exact reproduction: title silhouette, exact typeface/letterform, source photography, starburst geometry, lower promo art, and some micro typography remain intentionally non-identical or replaceable.

### Learning status

- real cover ratio before composition polish: `PROTOTYPED`, strong gain
- exact-node metadata check before semantic image-copy writes: failure reinforced; must be applied forward
- fidelity study itself: `PROTOTYPED`, not yet `VERIFIED` or `PROJECT_RULE`

## Next safe application

1. Keep V5-05 history open until a new non-repeated binary route can produce exact comparison-node hash evidence.
2. Use the real-ratio V4 study as a comparison/reference learner only; do not promote it to Current.
3. Continue measuring real Rurubu cover zones (title field, hero, left copy, vertical axis, lower collage, supplement badge) and translate only verified structural lessons into the wedding design.
4. Preserve `77:18`, `77:290`, `77:422`, V4 rollback frames, and all current ledger truth.
