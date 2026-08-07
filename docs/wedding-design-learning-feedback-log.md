# Wedding Design Learning / Feedback Log

This file records research, experiments, failures, verified improvements, and feedback that should influence future wedding work.

---

## 2026-08-02 — Initial continuous-learning baseline

### What was researched

Official/current documentation was reviewed for:

- Figma AI responsibilities and limitations
- Figma Design AI feature set
- AI image generation and editing
- AI content replacement
- AI layer renaming
- AI asset/design search
- auto layout behavior
- Japanese editorial layout grids and baseline grids
- W3C Japanese Layout Requirements

### Key findings

1. **AI output remains a candidate, not authority.** Figma's own guidance states that AI results may be inaccurate, incomplete, or misleading and require independent judgment and verification.
2. **Figma AI is strongest for bounded production assistance.** Current tools include image generation/editing, background removal, image expansion, object isolation/erasing, resolution enhancement, text replacement, layer renaming, asset search, and interaction generation.
3. **AI layer renaming must not overwrite semantic project naming.** Figma AI normally preserves manually named layers, which supports the existing semantic-node strategy. Still verify after bulk operations.
4. **Replace Content is useful for realistic-length dummy copy, not final facts.** It can improve text-length stress tests while final names, dates, and personal information remain manually verified native text.
5. **Auto layout must be used selectively in print/editorial work.** It is useful for adaptive caption groups, repeated facts, and text-length testing, but its UI-oriented defaults can reinforce cards, bento layouts, and overly even spacing.
6. **Baseline and layout grids remain central to magazine quality.** Adobe distinguishes text baseline alignment from object/document grids; Japanese layout grids additionally control character size, character spacing, line spacing, line count, and columns.
7. **Japanese typography needs its own QA.** JLREQ covers line composition, page formats, headings, notes, illustrations, tables, and paragraph placement—not just prohibited line-start/line-end characters.
8. **AI image enhancement cannot rescue a wrong editorial image.** Boosting resolution or expanding edges is appropriate only when the source already has the right subject, role, crop potential, rights, and identity treatment.

### Project-level consequences

- The wedding project now has a permanent research → prototype → verify → record → promote/reject loop.
- AI features will be tested on duplicate frames or bounded semantic roles before Current use.
- Placeholder-copy generation will be used for 100%, 130%, and 150% text-length stress tests.
- Auto layout will be evaluated for captions and repeated production modules, not used as a blanket page-construction method.
- AI image tools will be separated by purpose: generate, extend, remove background, erase object, enhance resolution. Each action requires a specific defect and acceptance criterion.
- Semantic layer names and native text remain protected.
- Failures are recorded and promoted into project memory only after they are generalizable.

### Experiments queued

- V5: compare current manually positioned caption groups with a safe duplicate using constrained auto layout for text-length resilience.
- V5: test a higher-quality role-sized image derivative and compare against Figma resolution enhancement; adopt only the sharper editable result.
- V5: test realistic-length Japanese dummy copy without changing final personal facts.
- V5: audit whether AI-assisted layer renaming would leave semantic photo-role names untouched; do not run on Current until proven.
- All items: create a baseline/grid worksheet that maps body leading, captions, margins, fold-safe areas, and repeated alignment edges.
- V6: use AI search/reference analysis for structural inspiration, while generating all production imagery clean-room and keeping published references out of final art.

### Current status

`RESEARCH_RECORDED / EXPERIMENTS_QUEUED / NO_UNVERIFIED_TOOL_RULE_PROMOTED`

---

## 2026-08-02 — V5 Drive-master to Figma transfer experiment

### Visible problem

The V5 cover hero and history lead images remain visibly pixelated in live whole-spread screenshots. The cover hero ledger already marks the current 5,927-byte derivative as `REJECT_LOW_QUALITY_DERIVATIVE`. Small memory roles also show duplicated placeholders instead of their verified Drive masters.

### Source and hypothesis

- Source authority: verified Drive masters and `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`.
- Hypothesis A: the existing Drive master could be fetched directly with a URL through the Figma Plugin API and applied without intermediate payload compression.
- Hypothesis B: a role-sized local derivative could be base64-decoded in `use_figma`, preserving the semantic node and avoiding flattened text/layout.

### Experiments run

1. Fetched the V5-01 cover hero Drive master and verified:
   - filename: `01_COVER_HERO_YOKOHAMA_DUMMY.png`
   - Drive ID: `1rS1QpAL-H4Dvg3tzI3NvmPUw-oAiicpv`
   - bytes: `2,089,658`
   - source dimensions: `1122 × 1402`
2. Created local role-crop derivatives against the `665 × 610` cover box rather than compressing the full portrait image blindly.
3. Tried `figma.createImageAsync()` with the Drive download URL.
4. Requested a Figma upload URL for direct asset placement and attempted a multipart upload from the execution container.
5. Fetched the V5-07 old-town master, created a `352 × 368` derivative for the `88 × 92` semantic node, and attempted inline base64 import.

### Results

- Direct URL import: **REJECTED / API UNSUPPORTED**. `createImageAsync` is not supported in the current `use_figma` runtime.
- Upload URL path: **BLOCKED BY EXECUTION NETWORK DNS**. The connector created a valid single-use upload endpoint, but the local execution container could not resolve `mcp.figma.com`.
- Inline base64 test: **REJECTED / PAYLOAD INTEGRITY FAILURE**. The manually transferred encoded string failed Figma base64 validation. The failed Figma scripts were atomic; no live nodes were mutated.
- Live V5 state therefore remains unchanged and no role was falsely marked complete.

### Root cause

The design defect is not lack of a good source master. The immediate blocker is reliable binary transport from the verified Drive/local file into Figma without lossy manual transcription. Text-based transfer is fragile and should not be used for long image payloads.

### Reusable principle

**Binary assets must travel through binary-safe tooling.** Do not copy large base64 strings through model-visible text or treat a low-byte inline import as an acceptable image pipeline. A quality-preserving workflow requires one of:

- connector-supported direct file upload from a mounted file reference;
- a network-capable uploader posting to the Figma single-use URL;
- a verified short payload only for genuinely small assets;
- an official Figma image-edit/replace operation run inside the editor.

### Process change

- Stop attempting long manual base64 transfers.
- Preserve the current rejected image as transport evidence until a binary-safe path is available.
- On the next run, prioritize either a connector-native file-parameter route or a live Figma editor image-replacement capability.
- Continue other safe editorial work rather than repeating the same failed transport method.

### Verification

- Whole-spread screenshots taken before the experiment confirm the quality defect.
- Figma error responses confirm that failed scripts were atomic.
- No ledger counts or Current Status declarations were changed.

### Status

`PROTOTYPED / TRANSFER_METHOD_REJECTED / LIVE_DESIGN_UNCHANGED / LESSON_RECORDED`

---

## 2026-08-03 — V5 hero-caption card-to-editorial-strip refinement

### Visible problem

The cover hero photograph still carried a floating white rounded caption panel in its lower-right area. The module was legible, but its white card shape and corner radius repeated a Web/UI containment pattern and covered more of the already-limited dominant photograph than necessary.

### Source and hypothesis

- Source: live V5 whole-spread screenshot and the project rule to attempt subtraction or structural simplification before adding decoration.
- Hypothesis: converting the module into a compact, flush, square-corner editorial strip would preserve contrast and native text while reducing UI-card feel and returning more visual authority to the photograph.

### Experiment

Bounded live nodes only:

- panel `77:205`
- kicker `77:206`
- main caption `77:207`

Changes:

- replaced the near-opaque white rounded panel with an 88%-opaque navy strip
- removed corner radius, strokes, and effects
- reduced the panel height from 66 to 58
- reduced kicker size from 12 to 10 and kept it as a pink editorial eyebrow
- changed the main caption to white and reduced it from 17 to 16
- preserved the text as native `Noto Sans JP` and retained all semantic node IDs

### Result

**VERIFIED / ADOPTED FOR CURRENT V5.**

The post-change whole-spread screenshot shows:

- clearer integration with the lower edge of the photograph
- less resemblance to a floating interface card
- preserved readability over the image
- slightly more visible photograph area
- no text loss, overlap, structural flattening, or rollback damage

### Failure or regression check

The strip remains a contained caption device, so this does not prove that every image caption should use a dark strip. The treatment is adopted only for this high-contrast cover-photo context. It must not become an automatic global component without further evidence.

### Reusable lesson

When a caption requires guaranteed contrast over a variable photograph, a compact flush editorial strip can outperform a floating rounded card. The improvement comes from edge alignment, lower height, square geometry, and typographic hierarchy—not from merely changing the color.

### Next application

Audit remaining V5 photo overlays and labels individually. Prefer direct type or a minimal rule where contrast permits; use a strip only where the image genuinely requires containment.

### Status

`PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_YET_PROMOTED`

---

## 2026-08-06 — V5 Friends photo-tab tape subtraction

### Visible problem

The two Friends & Family images already had colored native-text tabs, but each tab was backed by a second translucent tape strip. The extra strip added a double-layer sticker silhouette without new information, contrast, navigation, or provenance value.

### Source and hypothesis

- Source: live V5 outer screenshot and nodes `77:92–77:95`, `77:104`, and `77:105`.
- Hypothesis: hiding only the redundant tape strips would make the module quieter while preserving the labels, photo relationship, captions, editability, and rollback state.

### Experiment

- `77:104 / AUTH_FRIEND_TAPE_2`: `visible true → false`
- `77:105 / AUTH_FRIEND_TAPE_3`: `visible true → false`
- no deletion, text edit, crop edit, image replacement, or geometry change

### Result

**VERIFIED / ADOPTED FOR CURRENT V5.**

Whole-item, reading-scale, and actual-size/structure checks confirmed:

- the Friends tabs remain legible and attached to the correct photos
- the photo module no longer has a redundant translucent layer
- no empty gap, collision, clipping, text reflow, or hierarchy loss
- photo hashes, fold guide, native text, semantic roles, and V4 rollback nodes remain unchanged

### Failure or regression check

This does not justify removing all tape effects. Tape can remain where it is the only attachment cue or where it resolves an otherwise ambiguous overlap. It was rejected here because the colored tab already carried the complete semantic and visual role.

### Reusable lesson

When a photo tab already provides label, contrast, and attachment geometry, test removing any secondary tape layer before redesigning or adding decoration.

### Next application

Audit the remaining V5 stickers, shadows, badges, and tape combinations only for real semantic duplication. Keep unique content and necessary contrast devices.

### Status

`PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_YET_PROMOTED`

---

## 2026-08-06 — V5 history photo-kicker subtraction

### Visible problem

The inside-right history page already contained `OUR HISTORY`, a six-point chronological timeline, dates, event labels, and a dominant history photograph. A yellow bar partly covering that photograph repeated the same section meaning with `6つの出来事でたどる ふたり年表`, adding another wide color field without unique navigation or factual value.

### Source and hypothesis

- Source: live V5 inside frame `77:290`, kicker nodes `77:466` and `77:467`, and history image `77:422`.
- Hypothesis: hiding only the redundant kicker pair would improve continuity from timeline to dominant image while preserving chronology, captioning, native text, semantic structure, crop, image hashes, fold safety, and rollback.

### Experiment

- `77:466 / HISTORY_PHOTO_KICKER`: `visible true → false`
- `77:467 / HISTORY_PHOTO_KICKER_TXT`: `visible true → false`
- no deletion, text rewrite, geometry change, image replacement, or crop edit

### Result

**VERIFIED / ADOPTED FOR CURRENT V5.**

Whole-item, reading-scale, and actual-size/structure review confirmed:

- the page now reads directly from `OUR HISTORY` and the timeline into the dominant photograph
- chronology remains explicit through the timeline, dates, and labels
- no empty hole, collision, clipping, text reflow, mask exposure, or hierarchy loss
- native text nodes: `92`; visible text nodes: `62`; IMAGE-fill nodes: `9`
- history image hash `1bfd7f1fa601206bfed1594a140b40554e85d77a` unchanged
- fold guide `77:288` and rollback frames `59:2`, `59:178` preserved

### Failure or regression check

This does not justify removing every photo kicker. A kicker can remain when it contributes unique context, necessary contrast, or navigation not already provided by the page heading, chronology, caption, or module structure.

### Reusable lesson

When a page heading and a complete timeline already establish chronology, test removing any photo-overlapping kicker that merely restates that function. The dominant photograph should not lose authority to redundant labeling.

### Next application

Return priority to unresolved dominant-photo provenance and quality evidence. Continue subtraction only for demonstrable semantic duplication.

### Status

`PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_YET_PROMOTED`

---

## 2026-08-07 — V5 Travel Note full-card to editorial-rule subtraction

### Visible problem

The inside-left page ended with a useful `TRAVEL NOTE`, but it was contained in a `702 × 102` dark rounded card. The large container visually outweighed the importance of the closing note and reintroduced a dashboard/footer-card silhouette after other V5 card-density reductions.

### Source and hypothesis

- Source: live Figma inside-spread and left-page screenshots, plus the project-wide reduction order `direct type → alignment/white space → rule → minimal field → full card`.
- Hypothesis: preserving the text but replacing the full dark card with a thin editorial rule and direct native type would keep grouping and legibility while improving print-magazine rhythm.

### Experiment

Bounded semantic nodes only:

- `77:330 / IA_TRAVEL_NOTE_BG`: `702 × 102` navy rounded field → `702 × 4` square pink rule
- `77:331 / IA_TRAVEL_NOTE_LABEL`: native text preserved; yellow → pink
- `77:332 / IA_TRAVEL_NOTE`: native text preserved; white → navy

No copy rewrite, node deletion, image replacement, crop edit, hierarchy flattening, or unrelated geometry change.

### Result

**VERIFIED / ADOPTED FOR CURRENT V5.**

Three-scale review confirmed:

- whole spread: the left page no longer ends in a heavy dark UI-like card; the closing note remains clearly subordinate
- reading/page: reading order remains `OUR PROFILE / ABOUT US → profiles → 3 QUESTIONS → shared interests → TRAVEL NOTE`
- actual-size/detail: pink label and navy body copy remain legible on the warm paper background; no clipping or text reflow was observed

Structural verification after the change:

- native text nodes: `92`
- visible text nodes: `59`
- IMAGE-fill nodes: `9`
- semantic nodes `77:330`–`77:332` preserved
- provisional fold guide `77:540` preserved
- rollback frames `59:2` and `59:178` preserved
- history image `77:422` hash remains `1bfd7f1fa601206bfed1594a140b40554e85d77a`
- no asset-role state or photo-role count changed

### Failure or regression check

This does not establish that full dark editorial cards are always wrong. They may still be appropriate where an image or dense background requires containment and contrast. Here the paper background already provided sufficient contrast, so the container had no necessary semantic job.

The change also does not resolve the dominant-photo provenance/quality blockers. V5 cannot reach the dummy-photo design gate until all intended Drive assets are proven through Drive ID → node ID → image hash plus screenshot and structure QA.

### Evidence

Detailed run record:
- `01_paper-items/rurubu-wedding/learning-runs/2026-08-07-v5-travel-note-card-to-rule.md`

### Next application

Return priority to dominant-photo evidence closure. If the known binary-transport method remains blocked, continue only bounded high-impact editorial work rather than repeating the same failed mechanism.

### Status

`PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_PROMOTED`

---

## 2026-08-07 — V5 profile role-ribbon subtraction

### Visible problem

The inside-left profile area already established the two people through `OUR PROFILE / ABOUT US`, large native names, separate photographs, metadata, and pink/blue vertical rules. Rotated `新郎 PROFILE` and `新婦 PROFILE` ribbons repeated the same identity role while adding another sticker/tape layer.

### Source and hypothesis

- Source: live Figma inside-spread and left-page review, nodes `77:335`–`77:338`.
- Hypothesis: hiding the redundant ribbons would strengthen the direct path from section heading to names/photos and reduce template-like decoration without weakening identity distinction.

Expected improvement:
- quieter top profile zone;
- less Canva/Web-UI/sticker feel;
- clearer emphasis on the people rather than their labels.

Possible regression:
- bride/groom distinction could become ambiguous;
- the profile area could appear unfinished.

Evidence required:
- whole-spread and page screenshot comparison;
- detail/structure audit;
- no loss of names, profile text, native editability, fold guide, rollback, or image structure.

### Experiment

Hidden only; no deletion:

- `77:335 / PROFILE_RIBBON_A`: `visible true → false`
- `77:336 / PROFILE_RIBBON_A_TXT`: `visible true → false`
- `77:337 / PROFILE_RIBBON_B`: `visible true → false`
- `77:338 / PROFILE_RIBBON_B_TXT`: `visible true → false`

No copy, image, crop, geometry, profile name, or asset-role change.

### Result

**VERIFIED / ADOPTED FOR CURRENT V5.**

Three-scale review confirmed:

- whole spread: profile opening is calmer and the eye moves directly from the section heading to SHOGO / SHI-CHAN;
- reading/page: identity remains clear through names, photographs, metadata, position, and colored rules; the reading order remains unchanged;
- detail/structure: no collision, clipping, reflow, image loss, or semantic-node deletion was observed.

Structural verification:

- native text nodes: `92`
- visible text nodes: `57`
- IMAGE-fill nodes: `9`
- fold guide `77:540` preserved and visible
- rollback frames `59:2` and `59:178` preserved
- history image `77:422` remains visible with hash `1bfd7f1fa601206bfed1594a140b40554e85d77a`
- all four ribbon nodes remain present and immediately rollback-safe
- no asset-role count or photo-role status changed

### Failure or regression check

The subtraction is context-specific. Role labels can remain useful when names, layout, or surrounding content do not make identity obvious. This result does not justify removing all profile labels globally.

The dominant-photo provenance/quality blocker also remains unresolved. V5 therefore remains below the dummy-photo design gate and V6 production remains gated.

### Evidence

Detailed run record:
- `01_paper-items/rurubu-wedding/learning-runs/2026-08-07-v5-profile-ribbon-subtraction.md`

### Next application

Return priority to dominant-photo Drive ID → semantic node → image-hash evidence closure. Do not retry already rejected binary-transfer mechanisms without a changed transport method.

### Status

`PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_PROMOTED`
