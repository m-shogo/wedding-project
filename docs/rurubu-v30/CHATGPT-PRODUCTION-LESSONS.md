# Rurubu WEDDING V30 — ChatGPT Production Lessons

Status: `CHATGPT_SPECIFIC_LESSONS / SUPPORTING / PROMOTE_ONLY_WHEN_EXECUTOR_AGNOSTIC`

Purpose: record ChatGPT-specific execution successes, failures, tool constraints and recovery patterns while preserving common V30 production authority separately.

This file is **not** page authority and does not override manifests, Visual Masters, Figma acceptance or true-alpha policy.

## Entry format

Each lesson should record:

- `Date`
- `Scope`
- `Observation`
- `Why it happened`
- `Decision / recovery`
- `Rule for future ChatGPT runs`
- `Common promotion candidate: YES | NO | MAYBE`

Only genuinely executor-agnostic lessons should be promoted into common authority.

---

# 2026-09-04 — P08 ChatGPT Production bootstrap

## Lesson 1 — Persistent ledger is required to avoid duplicate generation

**Scope:** P08 / ImageGen / session continuity

**Observation**

After initial P08 representative-ecology generation, conversation-only tracking was insufficient to guarantee that a later turn would know which role had already been generated, rejected, alpha-checked or placed.

**Why it happened**

ChatGPT image generation is interactive and turn-based. Multiple visually similar iterations can exist without a stable production-state record, which makes accidental duplicate generation likely.

**Decision / recovery**

Create/read a page `production-ledger.json` and treat it as the persistent progress source. Generated assets move through explicit states instead of relying on prose memory.

**Rule for future ChatGPT runs**

Before ImageGen, read the ledger. Never regenerate an asset already at `ART_QUALITY_PASS` or later unless live QA or owner feedback explicitly reopens it.

**Common promotion candidate:** `MAYBE`

The ledger concept is executor-agnostic; the need to read it every ChatGPT turn is ChatGPT-specific.

---

## Lesson 2 — Good standalone art can be wrong page art

**Scope:** P08 / representative center closure ecology

**Observation**

The first central tropical chapel attempts were attractive standalone wedding emblems but too visually heavy for the P08 Visual Master's restrained back-cover closure role. Palm/flower mass and glossy rendering increased saliency beyond the intended hierarchy.

**Why it happened**

ImageGen naturally optimized the requested isolated emblem as a focal standalone graphic. The prompt described subject fidelity more strongly than the page-level role, relative mass and quiet-space behavior.

**Decision / recovery**

Reject the candidate as production art and record a rework reason rather than treating visual attractiveness as `ART_QUALITY_PASS`.

**Rule for future ChatGPT runs**

Prompts for isolated modules must include the **page role and relative saliency**: e.g. `quiet closure`, `secondary`, `small visual mass`, `not hero`. Review the generated asset against its eventual page role before alpha work or upload.

**Common promotion candidate:** `YES`

Page-role fit over standalone beauty is executor-agnostic and is already consistent with common Figma acceptance rules.

---

## Lesson 3 — Do not ImageGen every visible object

**Scope:** P08 / decomposition

**Observation**

P08 contains visually different categories: authored tropical closure art, simple page/meta text, shared publication furniture and an exact barcode/meta area. Treating all of them as ImageGen jobs would increase factual risk and reduce editability.

**Why it happened**

A page-level recreation request can tempt an executor to interpret decomposition as `generate one PNG for every visible thing`.

**Decision / recovery**

Classify before generation:

- authored decorative ecology → ImageGen/prepared art;
- long/variable/simple semantic text → native Figma;
- shared recurring furniture → shared publication component;
- exact barcode/code → deterministic production;
- replaceable photos → independent image/mask role.

**Rule for future ChatGPT runs**

ImageGen begins only after decomposition classification is complete. The asset ledger should contain non-ImageGen jobs too, so `not generated` is not confused with `forgotten`.

**Common promotion candidate:** `YES`

This is a shared production principle and aligns with current V30 display-role classification.

---

## Lesson 4 — ChatGPT must not assume preview checkerboard proves transparency

**Scope:** ImageGen / alpha

**Observation**

Image generation UI may visually present checkerboard transparency, but the actual runtime file must still be inspected before alpha gates can pass.

**Why it happened**

Preview presentation and file-channel truth are different layers. A preview can communicate intended transparency without proving valid RGBA alpha/interior opacity/edge quality.

**Decision / recovery**

Keep `TRUE_ALPHA_PREFLIGHT_PASS`, `ALPHA_INTERIOR_OPACITY_PASS` and `EDGE_ALPHA_QUALITY_PASS` pending until the actual file is validated.

**Rule for future ChatGPT runs**

Do not upload an unverified transparent preview to Figma merely because the checkerboard is visible. When direct alpha clearly fails, switch to flat extraction matte rather than repeating the same call pattern.

**Common promotion candidate:** `NO` for preview/file mechanics; the underlying alpha rule is already common authority.

---

## Lesson 5 — Codex production experience should flow into ChatGPT, not be re-invented

**Scope:** knowledge architecture

**Observation**

Existing Codex P01-P04 work already contains valuable operational evidence: existing-frame editing, representative-ecology calibration, grouped ecology design, live-Figma evidence, fingerprint checks, alpha fallback and stop gates.

**Why it happened**

A separate ChatGPT production experiment can accidentally start as if it has no prior production history, duplicating mistakes already resolved by Codex.

**Decision / recovery**

ChatGPT operations explicitly inherit current shared authority and reusable Codex-derived lessons. Codex-specific tool mechanics are not copied unless they are relevant to ChatGPT execution.

**Rule for future ChatGPT runs**

Before inventing a new workflow, inspect current shared docs plus relevant recent Codex production evidence. Reuse **principles and failure fingerprints**, not stale page-specific artwork or assumptions.

**Common promotion candidate:** `NO`

This is specifically a knowledge-flow rule for ChatGPT.

---

## Lesson 6 — Agent-specific instructions must not contaminate common manifests

**Scope:** documentation architecture

**Observation**

ChatGPT has execution-specific constraints around ImageGen turn granularity, runtime file references, connector upload support and binary Git handling. Putting these details into page/root manifests would make common authority brittle and unnecessarily executor-specific.

**Why it happened**

Production rules and execution mechanics are closely related, so it is easy to combine them into one manifest.

**Decision / recovery**

Separate layers:

- common manifests/policies = design/production intellectual property;
- `CHATGPT-PRODUCTION-OPERATIONS.md` = ChatGPT execution mechanics;
- this lessons file = ChatGPT experiments and recovery evidence.

**Rule for future ChatGPT runs**

Only promote a ChatGPT lesson to common authority if it remains valid independent of ImageGen/connector/session behavior.

**Common promotion candidate:** `NO`

---

## Lesson 7 — Runtime file transfer must be experimentally verified, not assumed

**Scope:** ImageGen → Figma / Drive / Git

**Observation**

ImageGen can expose generated files in the runtime, but whether another connector can consume that same file/reference depends on the connector action schema available in the current session.

**Why it happened**

`file ID`, local runtime path and connector file parameter are related but not interchangeable concepts.

**Decision / recovery**

For each destination, discover its current upload/write schema and test the documented file handoff path once. Record the result in the page ledger/evidence.

**Rule for future ChatGPT runs**

Use this order:

1. generated runtime file/reference;
2. connector-native file upload if supported;
3. alternative documented connector action;
4. one-time human bridge only if necessary.

Do not change canonical filenames/storage architecture just because a connector needs a bridge.

**Common promotion candidate:** `NO`

---

## Lesson 8 — Stop gates protect quality and cost

**Scope:** P08 / representative ecology

**Observation**

Without an explicit stop gate, ChatGPT can continue generating adjacent assets while the representative style direction is still unresolved.

**Why it happened**

Conversational momentum encourages `continue` behavior even when the correct production system requires a calibration pause.

**Decision / recovery**

Respect common stop gates: representative ecology → Figma → cross-page QA → PASS/FAIL → stop and write back before scaling.

**Rule for future ChatGPT runs**

Do not interpret `keep going` as permission to bypass a hard quality gate. Continue the current gated workflow until its required stop point, then report the result.

**Common promotion candidate:** `MAYBE`

The gate itself is common; the conversational interpretation note is ChatGPT-specific.

---

## Lesson 9 — Image/runtime file → Google Drive can be fully automatic

**Scope:** P08 / ImageGen → Drive

**Observation**

The accepted ImageGen/runtime PNG was uploaded directly into the existing V30 `02_PRODUCTION_RGBA/P08` Drive hierarchy without asking the user to download/re-upload it. Fetching the uploaded Drive PNG then returned a connector-compatible `file_uri` again.

**Why it mattered**

Before testing, it was unclear whether an ImageGen/runtime file ID, a local path and a Drive connector file parameter would interoperate in the current ChatGPT environment.

**Decision / recovery**

Use the runtime-generated file reference directly with Drive's file upload action, preserve the existing production hierarchy, then store returned Drive IDs in the page ledger.

**Rule for future ChatGPT runs**

Try runtime file/reference → Drive upload before requesting any human file bridge. If successful, treat Drive as a stable persistence/handoff surface for accepted production assets and QA files.

**Common promotion candidate:** `NO`

The storage convention is common; this connector interoperability is ChatGPT-specific.

---

## Lesson 10 — A Figma presigned upload URL may exist but still be unreachable from the ChatGPT runtime

**Scope:** P08 / Figma raster upload

**Observation**

Figma successfully issued presigned asset-upload URLs, but the current ChatGPT container could not resolve/reach the upload host. Repeating the same URL-upload path would not solve the problem.

**Why it happened**

Tool-side Figma API access and container-side outbound network/DNS access are different capabilities.

**Decision / recovery**

Classify the failure as a **transport-path blocker**, not an art or Figma-write blocker. Stop retrying the same presigned-host POST and switch to another Figma-supported write path.

**Rule for future ChatGPT runs**

One clear network/DNS failure fingerprint is enough to change transport strategy. Do not regenerate artwork and do not repeatedly request equivalent presigned URLs expecting the runtime network to change.

**Common promotion candidate:** `NO`

---

## Lesson 11 — A returned `imageHash` does not prove the raster rendered correctly

**Scope:** P08 / Figma Plugin API / verification

**Observation**

Early single-call base64 embedding attempts returned Figma `imageHash` values, yet fresh node/page screenshots remained blank.

**Why it happened**

The large payload had been truncated/corrupted before reconstruction. Figma could still receive bytes and produce a hash even though those bytes were not the intended image content.

**Decision / recovery**

Treat `imageHash` as source identity evidence only. Require a fresh screenshot showing the expected artwork before marking `FIGMA_PLACED` or `SCREENSHOT_QA_PASS`.

**Rule for future ChatGPT runs**

`imageHash != visual success`. Every raster installation requires fresh live visual proof.

**Common promotion candidate:** `MAYBE`

The specific truncation mechanism is ChatGPT-specific. The principle that live visual evidence outranks metadata is already represented by shared Figma acceptance and should not be duplicated unless a real gap is found.

---

## Lesson 12 — Separate the production master from the Figma transport derivative

**Scope:** P08 / raster transport / quality preservation

**Observation**

The accepted production master was 1448×1086 RGBA, while the live Figma role displayed at only about 145×122 px. Sending the high-resolution PNG through a code payload was unnecessary and made the transport path brittle.

**Why it happened**

Canonical asset quality requirements and connector transport requirements are different concerns.

**Decision / recovery**

Keep the high-resolution accepted RGBA as the production master in Drive/Git convention, and create a small RGBA derivative solely for Figma transport. P08 used a 160×133 derivative while the live node remained 145×122.

**Rule for future ChatGPT runs**

Never downgrade/replace the canonical production master just to satisfy a connector. Create a clearly non-authoritative transport derivative near actual live display size when a payload-limited fallback requires it.

**Common promotion candidate:** `MAYBE`

Master-vs-derivative separation is broadly useful, but this particular use is driven by ChatGPT transport constraints.

---

## Lesson 13 — Chunked hidden-node persistence is a working ChatGPT → Figma raster fallback

**Scope:** P08 / direct Figma placement

**Observation**

A compact 160×133 RGBA derivative was successfully transferred to Figma without a human bridge by splitting its base64 representation into small chunks across multiple `use_figma` calls, storing those chunks temporarily in hidden Figma node names, then reconstructing the bytes inside Figma.

**Validated P08 evidence**

- base64 length: `24208`
- decoded PNG bytes: `18155`
- expected PNG signature validated before `figma.createImage`
- live node: `3852:26`
- accepted imageHash: `a8066ca887a956282ce794a640e56ef364103b91`
- temporary transport container deleted after success
- fresh screenshot visibly showed the correct chapel ecology

**Why it worked**

Small tool calls avoided long-payload truncation. Persistence in hidden temporary Figma nodes let later calls reconstruct the complete data without relying on conversational/tool-call payload continuity.

**Decision / recovery**

Use sortable chunk IDs, verify stored lengths, reconstruct in one final call, assert exact joined/base64 and decoded byte lengths, validate file signature, create the image, then remove all temporary transport nodes.

**Rule for future ChatGPT runs**

Use native Figma upload first. When its upload host is inaccessible and the raster is small enough for a compact derivative, the chunked reconstruction method is the validated fallback. Always clean up transport nodes.

**Common promotion candidate:** `NO`

This is intentionally ChatGPT/Figma execution mechanics.

---

## Lesson 14 — Never regenerate owner-accepted artwork to fix transport

**Scope:** P08 / art-state vs transport-state

**Observation**

After the user accepted the transparent chapel artwork, an unnecessary attempt was made to alter/regenerate the artwork while the real unresolved problem was file placement.

**Why it happened**

Conversational production can blur the boundary between `art failed` and `transport failed` unless those states are tracked independently.

**Decision / recovery**

Freeze the owner-accepted art. Reopen only the transport/placement state and solve Figma ingestion independently.

**Rule for future ChatGPT runs**

Once owner feedback or art QA marks a candidate accepted, upload/connector failures must not reopen ImageGen. Only visual/factual defects can reopen art.

**Common promotion candidate:** `YES`

This is executor-agnostic state-discipline and is now also reflected in the P08 ledger. Promote only if shared authority lacks an equivalent rule.

---

## Lesson 15 — Validate transport at chunk granularity instead of restarting the asset

**Scope:** P08 / chunk transport integrity

**Observation**

During chunk persistence, one intended 1000-character base64 chunk was stored one character short. The length check detected this before final reconstruction.

**Why it mattered**

A single missing character can corrupt all subsequent decoded bytes while appearing superficially close to complete.

**Decision / recovery**

Delete only the damaged chunk and replace it with two smaller verified 500-character subchunks. Continue from the existing accepted art and existing good transport chunks.

**Rule for future ChatGPT runs**

Record/verify expected per-chunk length. If one chunk fails integrity, repair only that transport unit; do not restart ImageGen or the entire Figma build.

**Common promotion candidate:** `NO`

---

## Lesson 16 — GitHub text writes and binary production bytes are separate capabilities

**Scope:** P08 / Git evidence

**Observation**

The current GitHub connector can directly maintain manifests, ledgers and Markdown evidence, but its available file create/update actions are UTF-8 text-oriented rather than a general binary PNG commit path.

**Decision / recovery**

Keep the canonical P08 PNG persisted in Drive and live Figma, record its exact SHA-256 and intended Git production role in textual authority, and defer only the binary Git copy to a binary-capable bridge later.

**Rule for future ChatGPT runs**

A binary Git transport limitation must not fork naming/storage conventions and must not block Figma/Drive production. Record `binary pending` explicitly and preserve the expected canonical Git path for later completion.

**Common promotion candidate:** `NO`

---

## Lesson 17 — Same-file accepted Figma nodes are the cheapest reuse path

**Scope:** P08 / Figma reuse / no-new-ImageGen

**Observation**

The P08 upper-left brand ecology did not require a new generated asset. Accepted P01 nodes for the Rurubu masthead (`3681:104`), WEDDING title (`3681:94`) and tropical cluster (`3681:95`) already provided the correct V30 rendering family.

**Why it mattered**

Generating a new near-duplicate would spend time, create style drift risk, require another alpha/upload path and add redundant production binaries.

**Decision / recovery**

Clone the accepted Figma nodes inside the same file, resize/rotate/recompose them for P08's page-specific geometry, and preserve the original P01 nodes unchanged.

**Rule for future ChatGPT runs**

Before ImageGen, search both Git production assets and live accepted Figma nodes. When the same authored visual vocabulary already exists in the same Figma file, prefer clone/recompose over download/re-upload or regeneration.

**Common promotion candidate:** `YES`

The reuse-first principle is executor-agnostic; the same-file clone mechanism is Figma execution detail.

---

## Lesson 18 — Figma rotation geometry must be verified visually, not inferred from pre-rotation x/y

**Scope:** P08 / Figma rotation / screenshot correction

**Observation**

The first reused vertical WEDDING placement used sensible pre-rotation coordinates but rendered far outside the intended upper-left ecology. Metadata showed a -90° rotated 103×34 source becoming a 34×103 visual box whose left bound shifted relative to its stored x.

**Why it happened**

Figma node x/y and the visible axis-aligned bounds after rotation are not intuitive enough to treat as simple unrotated geometry.

**Decision / recovery**

Keep the accepted WEDDING art, inspect live metadata/design context, correct only transform coordinates (`rotation=-90`, `x=45`, `y=34` inside the P08 brand frame), then verify with a fresh page screenshot.

**Rule for future ChatGPT runs**

When a rotated reuse looks wrong, debug transform/bounds first. Do not regenerate or recut the source art to solve a rotation-placement defect.

**Common promotion candidate:** `NO`

This is practical Figma/ChatGPT execution knowledge.

---

## Lesson 19 — Fact-critical decorative modules should be deterministic even when the reference looks raster-like

**Scope:** P08 / barcode / exact canonical facts

**Observation**

The Visual Master contains barcode-like bars with visible digits `2026102400000`. Treating this as ImageGen or forcing a standards-compliant EAN-13 encoder could alter the final visible digit through checksum logic.

**Decision / recovery**

Build the barcode/meta module natively in Figma: exact editable issue text, pink heart, deterministic bar pattern derived from all canonical digits, and visible digits exactly `2026102400000`. Treat the bars as editorial barcode artwork rather than silently substituting a checksum-valid EAN number.

**Rule for future ChatGPT runs**

When a fact-critical code must display an exact canonical string, factual fidelity outranks making it conform to an unrelated encoding standard. Use a deterministic representation and separately QA the visible canonical value.

**Common promotion candidate:** `YES`

The exact implementation may vary, but the factual-safety principle is executor-agnostic and already aligns with common deterministic/fact-critical classification.

---

# Promotion queue

Potential shared/common promotions should be reviewed conservatively. Current candidates from this log:

1. page-role fit must be evaluated before standalone asset beauty;
2. decomposition must classify generated/native/shared/photo/deterministic roles before generation;
3. persistent asset-state ledger may be useful as a general production primitive;
4. owner-accepted art must not be reopened merely because a transport/upload layer failed;
5. canonical production master and executor-specific transport derivative should remain distinct when a derivative is necessary;
6. accepted same-family assets should be reused before generating near-duplicates;
7. fact-critical decorative modules should preserve canonical visible values even when a visual encoding standard would rewrite them.

Do not edit common authority merely because an item appears here. Promote only when it closes a real systemic gap not already covered by current manifests/policies.
