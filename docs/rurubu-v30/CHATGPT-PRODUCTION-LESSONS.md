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

# Promotion queue

Potential shared/common promotions should be reviewed conservatively. Current candidates from this log:

1. page-role fit must be evaluated before standalone asset beauty;
2. decomposition must classify generated/native/shared/photo/deterministic roles before generation;
3. persistent asset-state ledger may be useful as a general production primitive.

Do not edit common authority merely because an item appears here. Promote only when it closes a real systemic gap not already covered by current manifests/policies.
