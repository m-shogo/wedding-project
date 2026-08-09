# Rurubu V5 — photo-led clean-room density pass 2

Date: 2026-08-10
Status: `PROTOTYPED / STRONG_INSIDE_DIRECTION_GAIN / STRONGER_COVER_SILHOUETTE / CURRENT_UNCHANGED / HERO_TRANSFER_BLOCKED`
Scope: Rurubu WEDDING only

## Authorities re-read

Project-wide:
- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`

Rurubu-specific:
- `CURRENT-STATUS.md`
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`
- `RURUBU-MAGAZINE-EDITORIAL-DESIGN-KNOWLEDGE-BASE.md`
- `RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`
- `RURUBU-V6-CURRENT-STATUS.md`
- `RURUBU-V6-HAWAII-REFERENCE-ANALYSIS-2026-08-02.md`
- `RURUBU-V6-HAWAII-ASSET-QUEUE-2026-08-02.md`
- live Figma Current and preserved clean-room comparison frames
- Drive Q60 cover derivative readback

No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD design was modified.

## Starting diagnosis

The previous clean-room direction was visibly closer to a Japanese travel magazine than Current, but the inside spread still felt too orderly and template-like. The biggest remaining design weakness was not another badge or microtype defect; it was insufficient photo scale contrast and insufficient editorial overlap on the profile page.

Anti-anchoring answer: the legacy inside composition would not be chosen from scratch for the requested stronger Rurubu-like result. A materially different comparison remained justified.

## Experiment D — photo-led inside clean-room

Frame:
- `596:2 / V5_INSIDE_RURUBU_CLEANROOM_D_PHOTOLED_2026_08_10`
- left page `596:3 / INSIDE_LEFT`
- right page `596:124 / INSIDE_RIGHT`
- fold guide `596:271`

### Visible problem

The prior candidate `594:264` improved density but still separated the two profiles, Q&A, and memory modules too politely. It read like a tidy profile-book template rather than an editor-led travel spread.

### Tested principle

Use stronger photo scale contrast, deliberate overlap, compressed interview rhythm, and one lead + two support hierarchy while retaining an invisible grid and native editable copy.

### Changes

Left page:
- enlarged the groom atmosphere image to roughly `286 × 300`
- enlarged the bride atmosphere crop to roughly `194 × 194` and deliberately overlapped the profile zone
- kept the two profile treatments unequal rather than mirrored
- compressed the three Q&A stories into one editorial reading block
- moved the shared-interest strip and Travel Note into a quieter lower-page sequence
- added only one strong profile crop rule rather than more cards

Right page:
- enlarged the lead Memory Spot image to roughly `430 × 246`
- enlarged both support images to roughly `114 × 114`
- tightened the route relationship between lead and support stops
- retained the large history lead photograph and chronological timeline
- added one blue editorial crop rule rather than another container

### Image-fidelity correction during QA

The first `596:2` screenshot exposed a concrete defect: the cloned comparison carried stale/soft comparison image fills in several semantic roles. The layout direction was stronger, but image softness weakened the judgment.

The candidate was therefore corrected by copying the already verified Current V5 fills into the matching V5 semantic roles. No new asset was generated and no Current node was changed.

Verified Current-to-candidate mapping after the correction:
- `IA_PROFILE_A_PHOTO`: `77:296` → `596:8`, hash `a39dd297eb9de572317a5ce57f0af12e8597b156`
- `IA_PROFILE_B_PHOTO`: `77:302` → `596:14`, hash `2359f635b4926a83e22ca1f9214e75c709291152`
- `IA_HISTORY_MEMORY_PHOTO`: `77:422` → `596:147`, hash `539c259be8036b481d06b4f76db9a39b407d90e8`
- `IA_MEMORY_1_PHOTO`: `77:430` → `596:155`, hash `adbb8e529451a81dd25e4eb29bf068655569ce25`
- `IA_MEMORY_2_PHOTO`: `77:438` → `596:163`, hash `439a719d73f28e8dd2889f2026cccb15f345ec63`
- `IA_MEMORY_4_PHOTO`: `77:454` → `596:179`, hash `c09aa82e7b2ac75708707345c6f845452bf67663`

### Three-scale QA

Whole spread:
- materially stronger photo dominance and profile-page asymmetry than Current and `594:264`
- clearer magazine silhouette without adding card containers
- right page retains the successful large-history-photo → Memory Spots reading path

Reading/page scale:
- left page `596:3`: SHOGO / SHI-CHAN hierarchy remains readable; Q&A reads as one section instead of three detached cards; common points and Travel Note remain legible
- right page `596:124`: timeline remains readable; lead Memory Spot dominates; supports retain distinct secondary weight

Actual-size/detail sweep:
- no obvious text clipping or collision was observed in the natural page screenshots
- identity-safe Current profile images remain identity-safe in the new crop: groom is a back/side atmosphere view; bride crop excludes a recognizable face
- native text remains editable
- fold guide remains present

Structure snapshot after QA:
- `596:2`: 95 text nodes / 57 visible text nodes / 9 IMAGE-fill nodes
- Current `77:290`: 92 text nodes / 57 visible text nodes / 9 IMAGE-fill nodes
- Current inside and rollback `59:178` remain present and untouched

Decision:
- `PROTOTYPED / STRONG DIRECTION GAIN / NOT YET CURRENT`

Reason not promoted yet:
- the candidate clearly improves the requested magazine energy, but promotion would change Current node mappings and requires a deliberate ledger/status reconciliation rather than silently moving the Current pointer
- final print/fold and long-copy stress evidence is still required before a Current declaration

## Experiment C2 — safer full-bleed cover clean-room

Frame:
- `598:2 / V5_OUTER_RURUBU_CLEANROOM_C2_FULLBLEED_SAFE_2026_08_10`
- fold guide `598:274`
- replaceable hero `598:278`

### Visible problem

`591:2` had gained Rurubu-like color, title scale, and small-photo collage, but the cover photograph still did not own enough of the page and the lower composition retained too much static pink field.

### Tested principle

Increase the dominant-image area, overlap the three support photographs across the title/hero seam, compress the masthead, and use a single vertical edge hook plus a dense bottom feature band.

### Changes

- expanded the clean-room hero to approximately `766 × 780`
- compressed the masthead/title zone
- enlarged the three supporting photo teasers to about `146 × 92` with small controlled rotations
- tightened sell-lines directly over the hero
- strengthened the single yellow vertical hook
- tightened the hero interview strip
- retained three unequal bottom feature groups rather than equal cards
- added one cyan + yellow baseline pair as navigation accents

Whole-item screenshot QA shows a stronger travel-guide silhouette than `591:2`: the image occupies more of the cover and the gallery/title/photo relationship is more energetic.

However, this candidate is not promotable yet because its hero still uses the known rejected low-quality hash:
- `598:278 / CR_HERO_REPLACEABLE`
- hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`

Verified support-photo hashes remain existing V5 comparison assets:
- cafe `c1ada11205bc3978bf426b304d683f1c1566cac2`
- dining `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- memory/back-main `e3738476f760932bb5b09c9d60f174dd6c84049d`

Decision:
- `PROTOTYPED / COVER SILHOUETTE GAIN / HERO QUALITY BLOCKS ADOPTION`

## Rejected structural experiment and cleanup

An intermediate cover frame `597:2 / V5_OUTER_RURUBU_CLEANROOM_C_FULLBLEED_2026_08_10` was used to test reparenting collage overlays into the semantic front-cover frame.

Failure:
- reparenting exposed a coordinate/frame-geometry interaction that distorted the front-cover frame and made the cover visibly unusable
- the failure remained isolated to the duplicate; Current and rollback frames were never changed

Action:
- the broken `597:2` frame was removed after evidence capture
- the cover was rebuilt from untouched `591:2` as `598:2` rather than trying to repair a corrupted experiment

Lesson state:
- `PROTOTYPED → REJECTED`
- do not reparent already-positioned editorial overlay groups into a different frame without proving local-coordinate behavior in a bounded sample first

## Q60 cover derivative transport check

Fresh Drive binary readback:
- `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME `image/jpeg`
- bytes `155,439`

The file materialized successfully as a binary runtime file. A fresh Figma single-use upload endpoint was obtained for the clean-room hero target, but the runtime again failed DNS resolution for `mcp.figma.com` before bytes reached Figma.

This confirms the same transport blocker. The route is now treated as hard-closed for this runtime; it must not be retried again without a genuinely different network/file-transfer capability.

No Current hero hash changed.

## Current safety readback

After all experiments:
- Current outer `77:18` still exists
- Current inside `77:290` still exists
- rollback outer `59:2` still exists
- rollback inside `59:178` still exists
- Current outer hero remains `77:148`, hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- Current inside remains 92 text nodes / 57 visible text nodes / 9 IMAGE-fill nodes
- Current outer remains 85 text nodes / 44 visible text nodes / 14 IMAGE-fill nodes

No V5 completion count was changed. The active photo gate remains `9/10`, and dominant-photo gate remains `2/3` until the cover hero is genuinely replaced and visually verified.

## Learning / adoption state

### Verified for the next V5 design decision

- stronger profile-image scale and controlled overlap produce a much larger magazine-authenticity gain than another micro-decoration pass
- reusing already verified V5 role images inside a V5 clean-room comparison is preferable to judging a strong layout through stale low-quality candidate fills
- full-bleed cover photography plus a small overlapping teaser gallery is a stronger direction than leaving a large inactive framing field
- structural cleanup must not sacrifice local-coordinate safety; a visually good experiment should be rebuilt from a clean source if its frame structure becomes corrupted

### Not promoted to PROJECT_RULE

These are item-specific verified/prototyped results. They do not yet establish universal wedding-project rules.

## Next safe work

1. Treat `596:2` as the leading inside clean-room candidate and run long-copy / Japanese line-break / fold-safety stress before any Current promotion.
2. Treat `598:2` as the stronger cover silhouette candidate, but do not promote while the hero remains the rejected hash.
3. Do not retry the same `mcp.figma.com` upload route; use a genuinely different binary-safe bridge if one becomes available.
4. Continue editorial comparison work that does not depend on hero transport rather than returning to micro-polish of legacy Current.
5. Keep V6 production gate closed until V5 dummy-photo/design QA is genuinely verified.