# V5 cover direct-lines promotion and Q60 transport boundary

Date: 2026-08-09
Scope: `01_RURUBU_WEDDING` / V5 only
Authority read before work: live Figma, verified Drive readback, V5 asset ledger, project-wide production/asset/learning/quality-over-legacy authorities, Rurubu editorial knowledge base, lessons log, V5 operating system/postmortem, and V6 gate files.

## Visible problem

The live V5 front cover still had two separate weaknesses:

1. `77:148 / IMG_HERO` remains visibly soft because Current still uses the rejected low-quality derivative.
2. The Current cover was structurally clean but under-editorialized compared with a Japanese travel-guide cover: the hero carried only one direct cover line while the bottom six-item navigation carried most of the information density.

The quality-over-legacy question was therefore: **if this cover did not already exist, would a professional editor keep only one hero-side cover line, or would a small amount of direct native type improve the travel-magazine hierarchy without reintroducing cards and decorative noise?**

## Sources and candidates

Compared live Figma candidates at whole-item, page/reading, and natural-size front-cover scales:

- Current outer: `77:18`
- Current front: `77:145`
- Dense clean-room comparison: `413:2`, clean-room front `415:2`
- Hybrid direct-coverline comparison: `524:2`, front `524:129`

The dense clean-room candidate gives the strongest immediate Rurubu signal, but its full hot-pink field, large rounded white title cloud, yellow vertical hook, stacked `る/る/ぶ` blocks, and issue burst pull too much visual authority from the wedding identity and sit too close to a commercial-guide cover mechanism. It remains useful comparison evidence, but was **rejected for Current promotion in this pass**.

The pre-change Current was calm and coherent, but comparatively sparse. The hybrid candidate increased editorial density using only three native-text lines and no new cards, badges, shadows, gradients, stickers, image crops, or generated assets.

## Tested principle / hypothesis

**Hypothesis:** promoting the hybrid candidate's three direct cover lines into Current will improve magazine hierarchy and scanning value while preserving the existing wedding masthead, hero, semantic structure, editability, fold safety, and rollback state.

Expected improvement:

- stronger `masthead → issue promise → supporting cover lines → contents` reading sequence
- more authentic travel-magazine density without Web/UI containment
- better use of the hero's calm left-side sky/water area

Possible regression:

- overfilling the hero and reducing photographic breathing room
- insufficient text contrast over the sunset
- introducing style drift between the comparison frame and Current hidden legacy nodes

Evidence required:

- whole outer screenshot
- front-cover reading screenshot
- natural-size text/detail inspection
- exact live-node visibility/fill readback
- unchanged hero image hash
- preserved fold guide, comparison frames, native text, and rollback evidence

## Implemented bounded change

Promoted only these pre-existing native text nodes in Current:

- `77:176 / PHOTO_TOP_COPY` → visible
  - `ふたりの旅をまるごと大特集！`
  - `18 px`
- `77:199 / SIDE_HEADLINE_2` → visible
  - `出会いから今日まで\nLOVE HISTORY`
  - `16 px`
- `77:201 / SIDE_HEADLINE_3` → visible
  - `思い出スポット MAP`
  - `16 px`

No text was flattened or converted to raster. No extra container was enabled. No image/crop/geometry change was made.

## Regression caught and corrected

The first Current promotion exposed an important style-drift defect: `77:199` had been hidden with a **white** fill even though the verified hybrid comparison `524:183` used dark navy. The whole-item screenshot immediately showed poor contrast on the bright sunset sky.

This first visual state was **rejected** rather than counted as a gain.

Correction:

- copied only the verified hybrid text fills into the corresponding Current nodes
- `77:199` changed from white to navy (`r≈0.02, g≈0.07, b≈0.16`)
- `77:176` and `77:201` were already navy and remained so
- geometry and text content remained unchanged

Post-correction front-cover screenshot confirmed all three direct cover lines read cleanly over the image.

## Verified result

Status: **PROTOTYPED → VERIFIED / ADOPTED FOR V5 CURRENT STRUCTURE**.

Three-scale assessment:

### Whole item

The outer spread keeps the calm back-cover / lively front-cover contrast. The front now has more travel-magazine information density without adding colored fields or card geometry. The new type does not disturb the fold or the back cover.

### Reading / page scale

The front-cover sequence is now clearer:

1. `るるぶWEDDING` masthead + date badge
2. `ふたりの旅をまるごと大特集！`
3. `横浜で叶える / 最高のWEDDING DAY`
4. `出会いから今日まで / LOVE HISTORY`
5. `思い出スポット MAP`
6. hero caption and six numbered contents items

The direct type is materially more editorial than adding another ribbon/card/badge.

### Actual-size detail

The added lines are 16–18 px native `Noto Sans JP` text and remain readable at the natural front-cover render. After fill correction, no low-contrast white text remains in the new group.

## Structure QA

Post-change live readback:

- Current outer: `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`
- native text nodes in Current outer: `85`
- visible text nodes: `44` (previously `41`)
- IMAGE-fill nodes: `14`
- `77:176`, `77:199`, `77:201`: all native `TEXT`, all `visible=true`
- cover hero `77:148`: still `665 × 610`
- hero image hash unchanged: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- provisional fold guide `77:288`: preserved and visible
- hybrid comparison `524:2`: preserved
- dense clean-room comparison `413:2`: preserved
- rollback refs `59:2` and `59:178`: preserved

This change therefore improves cover structure but does **not** close the photo gate.

## Q60 transport boundary re-verified

The intended Q60 derivative was re-read from Drive before transport work:

- file: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- dimensions: `1330 × 1220`
- bytes: `155,439`
- SHA-256: `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

The source remains visibly sharper and role-appropriate.

A new single-use Figma upload URL for `469:132` was issued successfully, but POSTing the raw JPEG again hit the already-known execution-network blocker: `Could not resolve host: mcp.figma.com`. Per the twice-repeated blocker rule, that method was stopped immediately.

A different route was also tested: fetching the Drive file from inside the Figma plugin runtime. That runtime has no `fetch` global (`ReferenceError: 'fetch' is not defined`), so the route is unavailable and caused no mutation.

A locally tested heavy-compression fallback (including a Q15 JPEG) showed visible banding/posterization and was **rejected** for this dominant role. We will not lower the cover quality bar merely to reach `11/11`.

## Completion state after this run

No photo-role count changes are allowed from the typography/hierarchy improvement alone:

- intended source applied: `11 / 11 active`
- PHOTO_ROLE_PASS: `10 / 11 active`
- ROLE_COMPLETE: `10 / 11 active`
- dominant-photo pass: `2 / 3`
- V5-01 cover hero: still OPEN
- V6 production gate: still CLOSED

## Learning status

### Adopted for Current

Direct native cover lines can add authentic editorial density when they occupy a genuine text-safe region and do not require additional containers. The gain comes from hierarchy and scanning value, not decoration.

### Rejected

- full dense clean-room `415:2` as the Current cover in this pass: too commercially imitative / visually dominating despite strong Rurubu signal
- first Current direct-line promotion with inherited white `77:199`: insufficient contrast
- raw-upload retry loop: repeated DNS fingerprint
- Figma-runtime Drive fetch: unsupported runtime capability
- destructive low-quality hero compression: visible dominant-image regression

### Next application

1. Keep the newly verified direct-coverline hierarchy in Current.
2. Do not retry the known `mcp.figma.com` network path from the same execution environment.
3. Continue looking for a file-reference/binary-safe transfer route that does not expose the JPEG as model-visible text and does not lower Q60 quality.
4. Once Q60 is genuinely present in `469:132`, repeat whole-item / front-cover / actual-size comparison with Current and the preserved clean-room candidates before promoting the hero to `77:148`.
5. Only after `PHOTO_ROLE_PASS 11/11` and dominant `3/3`, run final weakest-three, Japanese typography, fold/safe-area, print-plausibility, and structure QA; then and only then may the V6 production gate open.

## Canonical-log append note

This run is recorded here immediately because it contains both a rejected intermediate state and an adopted Current change. The connected GitHub writer available in this runtime replaces existing UTF-8 files as whole blobs and does not provide an atomic append operation. The two long canonical logs (`docs/wedding-design-learning-feedback-log.md` and `RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`) were therefore **not destructively rewritten from a truncated transport view**. This learning-run is the safe Git record for the evidence; canonical-log synchronization remains required when a lossless full-file update path is available.
