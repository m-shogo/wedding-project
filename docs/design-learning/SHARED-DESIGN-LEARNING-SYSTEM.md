# Shared Wedding Figma Design Learning System

Date opened: 2026-08-15
Scope: all wedding Figma item-improvement work in `m-shogo/wedding-project`

## Purpose

Make each design run improve the next one without allowing one item's visual style, authority, assets, or production state to contaminate another item.

Rurubu WEDDING and non-Rurubu items remain separate production scopes. They may share only evidence-backed, generalizable design/process learning through the neutral project-wide learning surface defined here.

## Scope firewall

- Rurubu runs may edit only Rurubu production authorities/assets/Figma targets.
- Non-Rurubu runs may edit only non-Rurubu production authorities/assets/Figma targets.
- Neither run may use this shared-learning system as permission to inspect or mutate the other scope's item-specific Figma nodes, Drive asset folders, evidence ledgers, or GitHub item paths when its own authority forbids that access.
- Cross-item transfer means transferring a principle, failure fingerprint, QA method, or production capability—not copying a layout, asset, brand treatment, composition, or current-state conclusion.
- A lesson learned in one item never authorizes a direct production edit in another item. The receiving item must prototype it safely and verify it in its own context.

## Canonical operational feeds

To avoid concurrent writes to one shared file, each hourly owner has one append-only feed:

- `docs/design-learning/rurubu-shared-learning-feed.md`
- `docs/design-learning/non-rurubu-shared-learning-feed.md`

Each owner writes only its own feed and may read the neutral shared system plus the other feed. Existing `docs/wedding-design-learning-feedback-log.md` remains the long-lived project learning history, but hourly workers should not fight over that same file merely to record every experiment.

### Append extensions are part of the feed

When replacing a long feed file atomically would create concurrency/truncation risk, the owning scope may append a lesson as a separate immutable file under:

- `docs/design-learning/rurubu-shared-learning-feed.append/`
- `docs/design-learning/non-rurubu-shared-learning-feed.append/`

These sibling directories are **canonical extensions of the corresponding feed**, not secondary notes. At run start, read the base feed plus all newer relevant entries in its `.append/` directory. A receiving scope may read the opposite scope's base feed and opposite `.append/` entries only as neutral learning input under the same scope firewall. Do not require a risky whole-file replacement merely to make a valid lesson discoverable.

If an append entry is later consolidated into the base feed, keep one canonical state and mark the older duplicate as consolidated/superseded rather than allowing conflicting lesson states.

## Learning state machine

Use these states instead of treating every observation as a rule:

1. `OBSERVED` — a visible or operational problem was actually seen.
2. `ROOT_CAUSE_HYPOTHESIS` — a falsifiable cause was identified.
3. `TESTED_LOCAL` — a bounded experiment was run in the source item.
4. `VERIFIED_LOCAL` — screenshot/structure/asset evidence supports the result in that item.
5. `CROSS_ITEM_CANDIDATE` — the principle appears general enough to test elsewhere.
6. `VERIFIED_CROSS_ITEM` — at least one different item independently reproduced the benefit without unacceptable regression.
7. `PROMOTED_PROJECT_RULE` — repeated evidence or explicit project-wide user direction justifies project-wide default behavior.

Terminal/alternate states:

- `REJECTED` — hypothesis or treatment did not improve the intended defect.
- `BLOCKED` — cannot currently test because a real external/tool/authority dependency is missing.
- `SUPERSEDED` — a stronger later explanation or method replaces it.

Do not skip from `OBSERVED` directly to `PROMOTED_PROJECT_RULE` solely because an experiment looked good once.

## Required lesson record

Every meaningful experiment that may teach another item should record:

- source scope and item
- visible problem
- evidence before change
- root-cause hypothesis
- principle/capability tested
- exact bounded change
- expected improvement
- regression risk
- whole-item/thumbnail result
- reading/page-scale result
- actual-size/detail result
- Figma node/file evidence where allowed
- Drive ID/provenance/hash evidence where applicable
- GitHub commit/evidence path
- adopted/rejected/blocked status
- what is item-specific and must NOT transfer
- cross-item applicability hypothesis
- next receiving-item experiment

## Failure fingerprint rule

A failure should be remembered by normalized fingerprint, not only prose. Include:

- operation/capability
- environment/tool path
- symptom/error family
- likely cause class
- last known evidence date
- replacement method or stop condition

If the same fingerprint fails twice without a material capability/environment change, stop repeating that method in the current run. Switch method or continue another safe visual target. A later retry is justified only by a material new capability, changed environment, corrected input contract, or new evidence.

## Cross-item transfer rules

### Safe to share early

These can become `CROSS_ITEM_CANDIDATE` quickly when backed by real evidence:

- screenshot QA methods
- Japanese typography/line-break QA
- print/fold/safe-area checks
- editable/native text preservation
- image provenance and derivative-quality gates
- binary-transport failure fingerprints
- candidate/adopted/placed/verified state separation
- clean-room comparison methods
- rollback and semantic-node practices
- failure stop conditions
- conditional raster-to-vector capability and its QA methods, without transferring literal artwork
- hybrid Figma authoring split: native variable text + generated/composed fixed decoration + SVG where valuable + replaceable mask/image roles
- generated text-support backgrounds while the final copy remains native and editable

### Must usually remain item-specific until reproduced

- exact color systems
- photo ratios and hero placement
- card/label geometry
- decorative density
- visual motifs
- headline scale relationships
- crop treatment
- Rurubu-like editorial grammar
- passport/ticket-specific authenticity devices

Do not make all wedding items converge into one style. Shared learning should improve judgment while preserving distinct art direction.

## Project-wide authoring default — AI-assisted Figma Hybrid Authoring

State: `PROMOTED_PROJECT_RULE` by explicit project-wide user direction on 2026-08-15.

Canonical policy:

- `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`

Default responsibility split:

- variable/semantic/factual copy stays native Figma text;
- fixed decoration and visual treatment may be generated/composed rather than recreated as fragile native micro-geometry;
- the decorative background behind editable text may itself be generated/composed for the expected text mass; one line, two-to-three lines, or longer copy are all valid depending on the role, as long as final wording remains native text and the support has a verified text-fit/safe-zone contract;
- logos, wordmarks, icons and suitable reusable silhouettes use SVG/vector where meaningful editability justifies it;
- replaceable photography/images use stable non-destructive mask/crop roles so different source dimensions do not require rebuilding surrounding layout;
- Figma is primarily the assembly, readable hierarchy, text-editing, image-replacement, positioning and final-QA surface, not a requirement to hand-build every visual flourish.

This rule does **not** mean flattening whole pages or baking future-editable information into images. Preserve the controls people are actually likely to change later.

The hybrid split is project-wide; the look is not. Exact generated decoration, layout, motif, palette, visual density and item-specific art direction never transfer automatically between Wedding items.

## Project-wide conditional capability — Raster / Image → Editable SVG → Figma

State: `PROMOTED_PROJECT_RULE` by explicit project-wide user direction on 2026-08-15.

Canonical workflow:

- `docs/design-learning/RASTER-TO-EDITABLE-SVG-FIGMA-WORKFLOW.md`

This is **not** a rule to vectorize all imagery. It is a reusable capability to apply where editability, scale independence, recoloring, shape reuse, or print reuse justify it—especially logos, lettering, icons, pictograms, flat illustrations, map-like linework, stamps/seals, or other graphic silhouettes.

Photography, natural textures, food, skin/hair, painterly imagery, and diffusion-rich continuous-tone images should normally remain strong raster masters unless there is a specific vector reason.

When vectorization is appropriate:

1. preserve `Original Raster`;
2. create `High Fidelity SVG` as visual truth;
3. create a separate `Clean Editable SVG` as working master;
4. compare with Overlay Diff;
5. verify large + ~320px + ~180px and smaller real-use scales when needed;
6. verify Light/Dark polarity when relevant;
7. perform actual anchor/Bezier/recolor editability QA in Figma;
8. refine a Final Candidate from the clean working copy toward the high-fidelity reference;
9. verify SVG export/re-import behavior when downstream reuse matters.

Do not optimize for minimum node count. Protect negative spaces, sharp terminals, asymmetry, characteristic curvature, thin/thick transitions, spacing and center of gravity.

Use destructive Figma vector operations only on a rollback-safe Working copy. In particular, Simplify, Flatten, Outline Stroke, Shape Builder edits, and text-to-vector conversion can destroy editability/history. Preserve native text whenever text semantics still matter.

Imported SVG should be treated as complete only when it is actually an editable vector node tree—not because a PNG or rendered preview was transported successfully. Connected Figma `upload_assets` with `image/svg+xml` is a preferred route when available; `figma.createNodeFromSvg(svgString)` is an appropriate Plugin API fallback where that environment is available.

Cross-item transfer includes the method, QA gates, rollback discipline and failure fingerprints only. Exact silhouettes, lettering, brand motifs, colors and item production state remain item-specific.

## Receiving-item protocol

At the beginning of each hourly visual run:

1. Re-read its own current authority and live GitHub/Figma/Drive state first.
2. Read this shared system and the opposite scope's base shared-learning feed plus relevant newer `.append/` entries only as neutral learning input.
3. Read `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md` for Figma-based design work; read the editable-SVG workflow only when vectorization is relevant.
4. Select only the lessons relevant to the current visible defect.
5. Treat transferred lessons as hypotheses unless already `PROMOTED_PROJECT_RULE`.
6. Test on a rollback-safe duplicate or bounded semantic role.
7. Review at whole-item, reading/page, and actual-size/detail scales.
8. Record success or failure in the receiving scope's own base feed or canonical `.append/` extension.

This makes cross-item learning bidirectional: Rurubu can teach typography, hierarchy, crop, editorial-density and print lessons; non-Rurubu items can teach physical-artifact realism, restrained motif usage, information hierarchy, editability, or asset-production lessons back to Rurubu—only after local verification.

## Promotion gate

Promote to a project rule only when one or more of these are true:

- independently verified in at least two materially different wedding items;
- repeatedly verified in the same capability under different compositions/assets;
- directly required by a project-wide user instruction;
- required for correctness/provenance/safety rather than taste.

For visual taste, cross-item reproduction is preferred before promotion.

## Hourly operating behavior

Learning is part of production, not a separate documentation exercise. Each run should:

- consume relevant prior lessons before choosing a method;
- do real visual/asset work first when safe work exists;
- record only meaningful experiments or failures;
- publish a cross-item lesson only when it can change future decisions;
- never create filler lessons merely to consume runtime;
- keep production progress and learning evidence distinguishable;
- use waiting time for comparison, root-cause analysis, failure deduplication, typography/crop QA, or evidence reconciliation.

## Source-of-truth roles

- **GitHub:** canonical durable learning states, failure fingerprints, evidence references, and cross-item feeds.
- **Figma:** actual visual experiments, safe comparison frames, node/structure evidence, and screenshot truth.
- **Google Drive:** adopted/comparison asset masters, provenance, file IDs, readback evidence, and binary asset lifecycle.

Do not duplicate the canonical learning text into Drive just for symmetry. Drive should support evidence and assets unless a specific production authority requires a Drive document.

## Reporting

Do not notify the user for routine learning-log writes. Notify only when learning produced meaningful verified visual progress, discovered a real blocker requiring a decision, or materially changed a project-wide rule. Reports must distinguish observation, hypothesis, local verification, cross-item verification, and promoted rule.
