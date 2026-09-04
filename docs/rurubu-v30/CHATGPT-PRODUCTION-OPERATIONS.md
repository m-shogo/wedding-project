# Rurubu WEDDING V30 — ChatGPT Production Operations

Status: `CHATGPT_EXECUTION_GUIDE / SUPPORTING / DOES_NOT_OVERRIDE_COMMON_AUTHORITY`

Purpose: define **how ChatGPT executes** the existing Rurubu V30 production system when working from a Visual Master through ImageGen, alpha preparation, Figma assembly, Drive/Git evidence and review.

This document is intentionally **agent-specific**. It must not duplicate or replace shared design/production authority.

---

## 0. Knowledge boundary — HARD

### Shared/common intellectual property

The following remain agent-agnostic and are authoritative for Codex, ChatGPT and future executors:

- page/root manifests;
- Visual Master authority and review rules;
- reverse omission audit;
- page-role classification;
- grouped ecology rules;
- native/generated/shared/photo/deterministic role classification;
- representative-ecology-first calibration;
- true-alpha policy and alpha gates;
- Figma execution acceptance;
- shared publication components;
- asset fingerprint/reuse intent;
- cross-page style-family QA;
- Git/Drive/Figma production evidence expectations;
- factual/canonical copy safety.

Primary common references include:

1. `assets/rurubu-v30/manifest.json`
2. `assets/rurubu-v30/preproduction-page-gates-manifest.json`
3. `assets/rurubu-v30/visual-polish-manifest.json`
4. `assets/rurubu-v30/ornament-art-direction-manifest.json`
5. target page manifest
6. `docs/rurubu-v30/TRUE-ALPHA-ASSET-GENERATION-POLICY.md`
7. `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`
8. `docs/rurubu-v30/HISTORICAL-LESSON-RECONCILIATION-20260903.md`

This ChatGPT guide **inherits** those rules. It never weakens or overrides them.

### Codex knowledge flow

Codex production experience is a valid input to ChatGPT when it reveals reusable Figma/design-production rules.

Examples already inherited:

- work on the existing production frame; do not create convenience duplicates;
- Visual Master is comparison authority, not an active photo source;
- preserve replaceable photo roles instead of flattening them into authored art;
- group visually interdependent display regions as ecologies rather than assembling clipart fragments;
- treat P01/P02/P03 as rendering-family anchors, not layout templates;
- calibrate one representative ecology before scaling page production;
- inspect live Figma evidence, not only manifest/report labels;
- preserve the rule rather than reusing stale artwork bytes;
- after a known failure pattern, change strategy rather than repeating the same operation.

These are **shared production lessons**, not Codex-only behavior.

### ChatGPT-only knowledge

Keep the following here rather than pushing it into common authority unless later proven executor-agnostic:

- ImageGen call granularity and conversation flow;
- ChatGPT image-result/file-path handling;
- connector-to-connector upload mechanics;
- inability to assume one-call bulk ImageGen production;
- how ChatGPT tracks generated drafts across turns;
- when ChatGPT must request a one-time human file bridge;
- GitHub connector text-vs-binary limitations;
- tool-specific retry/fallback behavior;
- session-continuity recovery for ChatGPT.

---

## 1. ChatGPT run-start protocol

Before any production write:

1. fetch latest remote branch and PR HEAD;
2. confirm exact allowed scope/frame and protected pages;
3. read current common authority and target page manifest;
4. review the actual Visual Master directly;
5. complete reverse omission audit;
6. classify every visible job as one of:
   - shared publication component;
   - replaceable photo;
   - generated authored ecology/display asset;
   - native text/layout;
   - deterministic/fact-critical asset;
7. open/read the page production ledger;
8. **search accepted Git/Figma assets for reusable same-family modules before any ImageGen call; same-file accepted Figma nodes are the cheapest reuse path because they avoid reupload/alpha/transport entirely;**
9. select exactly one representative generated ecology when calibration is still pending;
10. only then call ImageGen.

ChatGPT must not infer `not generated yet` from conversation memory alone. The page ledger is the persistent source for production progress.

---

## 2. Asset Ledger as ChatGPT anti-duplication memory

Each page using ChatGPT production should maintain a machine-readable ledger under that page's production area.

Recommended state flow:

`PLANNED`
→ `REUSE_CHECKED`
→ `GENERATED_DRAFT`
→ `ART_QUALITY_PASS`
→ `TRUE_ALPHA_PREFLIGHT_PASS`
→ `ALPHA_INTERIOR_OPACITY_PASS`
→ `EDGE_ALPHA_QUALITY_PASS`
→ `DRIVE_SAVED`
→ `FIGMA_PLACED`
→ `SCREENSHOT_QA_PASS`
→ `ACCEPTED`

Failure states:

- `ART_REWORK_REQUIRED`
- `ALPHA_REWORK_REQUIRED`
- `FIGMA_REWORK_REQUIRED`
- `BLOCKED`
- `REJECTED_SUPERSEDED`

### Regeneration guard

ChatGPT must not regenerate an asset whose ledger state is `ART_QUALITY_PASS` or later unless:

1. live page QA explicitly reopens it; or
2. owner feedback explicitly requests revision; or
3. factual/canonical validation fails.

For a `GENERATED_DRAFT`, inspect the existing candidate before generating another one.

Every rejected draft should record a concise reason so later turns do not repeat the same visual mistake.

---

## 3. ImageGen operating model

### Do not bulk-generate an uncalibrated page

ChatGPT should assume image production is an iterative art-direction process, not a single bulk request.

Preferred sequence:

`one representative ecology → inspect → art gate → alpha gate → Figma → cross-page comparison → STOP/PASS`

Only after the representative direction passes may remaining page assets scale out.

### Generate complete authored ecology when dependency is high

If title, flowers, ribbon, route, badge and local lettering read as one authored object in the Visual Master, generate them as one ecology rather than independent clipart pieces.

Do not include:

- replaceable photos;
- long/TBD/personal copy;
- unrelated page furniture;
- fact-critical codes that are safer deterministically.

### Exact text caution

ImageGen can be used for short locked display lettering only when common/page authority permits it.

Canonical exact values must still exist outside the image and be QA checked after generation.

Use native/deterministic production for fact-critical data when generated text adds unnecessary risk.

---

## 4. Visual review immediately after every generation

ChatGPT must visually inspect each generated candidate before upload or alpha work.

Minimum checks:

- does the asset preserve the Visual Master's role and relative visual mass?
- has it accidentally become a Hero when it should be secondary/closure furniture?
- is saturation compatible with current V30 anchors?
- are outline/keyline/shadow characteristics in the same publication family?
- does it look like authored Japanese travel-magazine editorial art rather than standalone AI art?
- did it drift to watercolor, painterly, vintage, muted wedding editorial, generic Canva/SVG or glossy stock-sticker aesthetics?
- is asymmetry/quiet space preserved where intentional?
- does fixed text match canonical facts?

A technically impressive standalone illustration is not automatically `ART_QUALITY_PASS`.

---

## 5. Transparent output handling

ChatGPT must treat a model preview's checkerboard as **visual evidence only**, not proof of an alpha channel.

Preferred strategy:

1. request transparent output once when appropriate;
2. inspect actual file alpha when the runtime file is accessible;
3. if the direct-alpha path clearly produces baked checkerboard/opaque RGB, do not repeat the same method;
4. switch to the common-policy flat extraction matte route;
5. convert matte to RGBA;
6. decontaminate edge RGB;
7. test light / mid-gray / dark composites and actual intended Figma size;
8. only then mark alpha gates passed.

ChatGPT-specific lesson inherited from P04 recovery: a known direct-alpha failure is a **strategy-switch trigger**, not a reason to abandon all alpha production.

---

## 6. Runtime file and connector handoff protocol

ImageGen may expose one or more of:

- generated image preview;
- runtime local path;
- file ID/reference;
- connector-compatible file parameter.

ChatGPT must record whichever stable identifier is actually available.

### Preferred handoff order

1. `ImageGen → runtime file/reference`
2. direct upload to the destination connector if that connector accepts a file parameter/reference;
3. preserve destination ID/hash/path in ledger/evidence;
4. upload the same accepted source/final asset to the existing Drive structure when available;
5. record Git metadata/evidence.

### Human bridge fallback

Request a one-time user file bridge only when the actual connector path cannot consume the generated runtime file/reference.

If a human bridge is required:

- keep the canonical production filename unchanged;
- do not invent a P08-only storage model;
- resume the same Git/Drive/Figma evidence structure after the bridge;
- record `HUMAN_FILE_BRIDGE_REQUIRED = YES` and why.

---

## 7. Figma execution protocol for ChatGPT

ChatGPT must first discover/read the available Figma actions before assuming upload/write capabilities.

When write capability exists:

1. use the existing production frame;
2. never duplicate the target page merely for convenience unless explicit authority says so;
3. **before raster transport, check whether an accepted node in the same Figma file can simply be cloned/recomposed; clone/reuse avoids a second binary transfer and should win when the Visual Master permits it;**
4. install only assets whose applicable gates passed;
5. retain replaceable photos as independent masks/images;
6. keep variable/TBD copy separately editable;
7. use authored grouped ecologies where the Visual Master shows high dependency;
8. tune scale/position/overlap/quiet-zone relationships after live placement;
9. for rotated nodes, inspect post-rotation bounds/metadata and fresh screenshots rather than trusting intuitive pre-rotation x/y;
10. capture a fresh screenshot after meaningful placement changes;
11. compare live page against Visual Master and style anchors;
12. record node ID, imageHash/source identity and screenshot evidence.

A manifest classification alone never proves the live Figma role is correct.

---

## 8. Drive and Git behavior

### Drive

Use the existing V30/page folder hierarchy. Do not create a parallel ChatGPT folder tree merely because ChatGPT performed the work.

Accepted production should preserve the same conceptual set used elsewhere:

- source/keyed or extraction-matte source when applicable;
- final production RGBA;
- QA composites/screenshots;
- cross-page comparison evidence;
- production metadata/evidence.

### Git

Git paths and naming remain the common production convention, e.g.:

- `V30_PXX_<MODULE>_SOURCE_KEYED.png`
- `V30_PXX_<MODULE>_PRODUCTION_RGBA.png`

If the GitHub execution surface cannot commit binary PNG bytes directly:

1. do not change the production convention;
2. complete Figma/Drive work where possible;
3. store textual manifest/ledger/evidence immediately;
4. record expected binary path, SHA-256 and bridge status;
5. use a later binary-capable bridge without changing canonical filenames.

Text-connector limitations are execution constraints, not reasons to fork the asset model.

---

## 9. Tool failure / retry discipline

Do not repeatedly execute a method after its failure fingerprint is known.

Control flow:

`Observe → Classify → Change Method → Prototype Small → Compare → Promote/Reject → Record`

Examples:

- direct transparent ImageGen returns baked checkerboard → use separable flat matte;
- generated ecology is aesthetically wrong → regenerate the whole ecology, not five micro patches;
- connector cannot accept runtime file ref → test documented alternative upload action, then human bridge if necessary;
- same genuinely distinct strategy blocks twice → report blocker.

Avoid repeated narration and repeated speculative calls.

---

## 10. Cross-page calibration protocol

For V30 later pages, after representative ecology placement, compare fresh screenshots against current rendering anchors specified by common authority.

Judge:

- saturation;
- outline character;
- keyline behavior;
- shadow/depth;
- sticker/cutout feel;
- rendering quality;
- paper/print feel;
- cute/pop temperature;
- target page's own layout/role preservation.

Do not continue page-scale generation while `CROSS_PAGE_STYLE_FAMILY_PASS` is unresolved.

---

## 11. Session continuity

At the beginning of a later ChatGPT turn/chat:

1. fetch latest remote HEAD again;
2. read page manifest;
3. read page production ledger;
4. inspect accepted/rework states;
5. inspect latest Figma/Drive/Git evidence if accessible;
6. resume from the first incomplete state rather than restarting generation.

Conversation memory is supportive only. Persistent authority/ledger wins.

---

## 12. Knowledge promotion rule

New ChatGPT lessons begin in:

`docs/rurubu-v30/CHATGPT-PRODUCTION-LESSONS.md`

Promote a lesson into shared/common authority only when it is clearly executor-agnostic and improves the production system for Codex/ChatGPT/future executors.

Examples suitable for promotion:

- a better ecology classification rule;
- a better alpha-quality gate;
- a better Figma replacement/mask architecture;
- a systemic failure fingerprint independent of tool vendor.

Examples that should remain ChatGPT-specific:

- a particular ImageGen response/file-path behavior;
- a connector-specific upload limitation;
- ChatGPT turn/session recovery mechanics;
- a ChatGPT-only retry sequence.

This prevents agent-specific implementation details from contaminating common production intellectual property.

---

## 13. Current P08 experimental purpose

P08 is the first explicit ChatGPT-led validation of this operating guide.

Its success criteria are not only page quality but measurement of:

- Visual Master analysis by ChatGPT;
- manifest/ledger synchronization;
- ImageGen art direction;
- alpha recovery;
- runtime-file → Figma handoff;
- runtime-file → Drive handoff;
- Figma live placement and screenshot QA;
- Git text evidence;
- Git binary feasibility;
- exact location where a human bridge is or is not required.

P08 findings must be recorded without changing the common storage/quality model solely for ChatGPT convenience.
