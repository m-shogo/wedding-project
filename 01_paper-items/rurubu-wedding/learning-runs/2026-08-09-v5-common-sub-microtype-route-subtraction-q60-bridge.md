# Rurubu V5 learning run — common-sub microtype / FEATURE2 subtraction / Q60 bridge

Date: 2026-08-09
Scope: Rurubu WEDDING V5 only
Authority read before execution: project-wide Figma production system, asset-generation memory, AI continuous-learning system, design-learning feedback log, project memory, quality-over-legacy decision, CURRENT-STATUS, V5 asset ledger, editorial knowledge base, editorial lessons log, Production Operating System V2, postmortem/V6 guardrails, V6 current status, and V6 clean-room asset queue.

## 1. VERIFIED / ADOPTED — `AUTH_COMMON_SUB` actual-size readability

### Source / visible problem
Live Current inside frame `77:290` showed `77:355 / AUTH_COMMON_SUB` (`好きが重なるところを3つだけ。`) at 11 px, fixed 220 × 20, `textAutoResize=NONE`. It is semantic explanatory copy beneath `ふたりの共通点`, not decorative microcopy. Natural-size node screenshot made it visibly weaker than adjacent reading text.

### Hypothesis / tested principle
Japanese composition is reading infrastructure. Raising only this supporting sentence from 11 px to 12 px, while preserving its content, width, position, hierarchy, and native-text status, should improve actual-size readability without adding density or changing the spread grammar.

Expected improvement: clearer natural-size reading and more coherent supporting-copy scale.
Possible regression: the sentence could become too assertive relative to the `ふたりの共通点` label or wrap/collide with the three keywords beneath it.
Evidence required: rollback-safe duplicate, whole-spread screenshot, actual-size text screenshot, live structure readback, rollback preservation, and unchanged image hashes.

### Prototype
Comparison frame: `565:2 / V5_INSIDE_COMMON_SUB_MICROTYPE_QA_2026_08_09`
Comparison target: `565:67 / AUTH_COMMON_SUB`
Prototype change:
- font size: 11 → 12 px
- width: 220 px unchanged
- `textAutoResize`: `NONE` → `HEIGHT`
- resulting height: 14 px

### Result
PASS at whole-spread, reading/page, and actual-size detail scales. No wrap, collision, hierarchy inversion, fold issue, or added container/decorative density was observed.

### Current promotion
Promoted to Current `77:355 / AUTH_COMMON_SUB`:
- font size: 12 px
- width: 220 px
- height: 14 px
- `textAutoResize=HEIGHT`

Post-promotion structure readback:
- inside native text: 92
- inside visible text: 57
- inside IMAGE-fill nodes: 9
- fold guide `77:540`: visible
- rollback frames `59:2` and `59:178`: preserved
- comparison `565:2`: preserved

Relevant Current image hashes remained unchanged:
- `77:296`: `a39dd297eb9de572317a5ce57f0af12e8597b156`
- `77:302`: `2359f635b4926a83e22ca1f9214e75c709291152`
- `77:422`: `539c259be8036b481d06b4f76db9a39b407d90e8`
- `77:430`: `adbb8e529451a81dd25e4eb29bf068655569ce25`
- `77:438`: `439a719d73f28e8dd2889f2026cccb15f345ec63`
- `77:446`: `58d7d6f144a4aff9e3cc31caefad88089981ec6a`
- `77:454`: `c09aa82e7b2ac75708707345c6f845452bf67663`
- `77:24`: `e3738476f760932bb5b09c9d60f174dd6c84049d`
- `77:39`: `c1ada11205bc3978bf426b304d683f1c1566cac2`
- `77:43`: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- cover hero `77:148`: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912` (still the known rejected low-quality source)

Status: **VERIFIED / ADOPTED for this node only**. Do not promote a global 12 px minimum rule from this isolated test.
Next application: use actual-size evidence to distinguish semantic supporting copy from intentionally subordinate folio/English microcopy before changing size.

## 2. PROTOTYPED / REJECTED — FEATURE2 route/dot subtraction

### Source / visible problem
Current cover uses `77:244 / AUTH_FEATURE2_ROUTE` plus dots `77:245`, `77:246`, `77:247` beneath feature 02 and above `77:248 / P.04–05 LOVE HISTORY`. Because the project requires subtraction before additions, this cluster was tested as a possible nonessential decorative route.

### Hypothesis
Removing the line and three dots while retaining the factual page-reference text might reduce decorative noise and strengthen direct typographic hierarchy.

Possible regression: feature 02 could lose its travel-guide navigation cue and leave the page reference visually unanchored.

### Prototype
Comparison frame: `564:2 / V5_OUTER_FEATURE2_ROUTE_SUBTRACTION_QA_2026_08_09`
Hidden only in the comparison:
- `564:228 / AUTH_FEATURE2_ROUTE`
- `564:229 / AUTH_FEATURE2_DOT_A`
- `564:230 / AUTH_FEATURE2_DOT_B`
- `564:231 / AUTH_FEATURE2_DOT_C`

### Result
REJECTED. The whole-cover comparison showed that the route/dot cluster is not merely decorative clutter in this composition: it visually anchors `P.04–05 LOVE HISTORY`, differentiates feature 02 from the other index entries, and supplies a restrained travel-guide/navigation cue. Without it, the page reference floats in an under-articulated empty area.

Current therefore remains unchanged:
- `77:244`, `77:245`, `77:246`, `77:247` all remain visible.
- comparison `564:2` is preserved as evidence.

Status: **PROTOTYPED / REJECTED**.
Next application: subtraction must judge semantic/reading function, not only decorative appearance. Travel-route devices may stay when they organize navigation rather than merely decorate blank space.

## 3. PROTOTYPED / REJECTED — larger shared-plugin-data Q60 bridge chunk

### Source / blocker
V5-01 remains the only active photo-role blocker. Q60 Drive derivative is still authoritative and healthy:
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- filename: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- MIME: `image/jpeg`
- bytes: 155,439
- dimensions: 1330 × 1220
- SHA-256: `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`
- staging: `469:2`, target `469:132`

Known external upload route through `mcp.figma.com` has already repeated the same DNS blocker and was not retried.

### Hypothesis
Previously verified shared-plugin-data chunk reconstruction works for smaller V5 derivatives. A larger guarded chunk could reduce the number of calls required for the 155,439-byte Q60 derivative without touching Current.

### Test / failure
A rollback-safe staging-only test wrote `rurubu_v5_q60 / part00` to `469:132` and immediately round-tripped the stored value. The intended test payload was larger, but the execution request itself carried only 16,900 characters. This made the experiment unsuitable as proof of an end-to-end Q60 bridge; continuing would risk assembling a source whose request-boundary integrity had not been proven.

The partial shared-plugin-data key was immediately cleared:
- before cleanup: 16,900 characters
- after cleanup: 0
- visible image fill remained unchanged throughout
- Current was never mutated

Status: **PROTOTYPED / REJECTED METHOD FOR THIS LARGE PAYLOAD**.
Next application: do not scale the manual large-literal route. Use a binary-safe channel that can prove exact complete payload identity before any Figma image mutation, or continue other safe V5 work. A transport attempt is never counted as photo progress.

## Gate truth after this run

No photo-role count changed:
- active Current photo roles: 11
- PHOTO_ROLE_PASS: 10/11
- ROLE_COMPLETE: 10/11
- dominant-photo pass: 2/3
- only active blocker: `V5-01 / 77:148 / IMG_HERO`

V6 production remains closed until the V5 dummy-photo/design gate is genuinely verified. V6 research and Drive preparation remain separate and untouched.

## Canonical-log synchronization note

This run contains the concrete source, hypothesis, expected gain, regression risk, evidence, result, adopted/rejected state, and next application required by the project learning contract. The currently exposed GitHub write action replaces complete files rather than atomically appending; because the canonical design-learning and Rurubu lessons files are large and the connector does not expose a lossless append primitive, this run does not risk destructive full-file replacement. This learning-run file is the lossless synchronization source for those canonical logs when a safe append path is available.