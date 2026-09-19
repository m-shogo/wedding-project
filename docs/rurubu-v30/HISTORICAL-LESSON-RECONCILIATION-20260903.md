# Rurubu WEDDING V30 — Historical Lesson Reconciliation

Status: `RECOVERED_LEARNING / SUPPORTING_EVIDENCE / 2026-09-03`

Purpose: preserve older Rurubu/Figma lessons that materially explain the P02 2026-09-03 feedback, so future work does not rediscover or accidentally reverse them.

This is **supporting evidence**, not a replacement for current V30 authority. Current execution remains governed by `docs/RURUBU-CURRENT.md` and its required-read set.

## 1. Display typography was already known to be an authored visual role

Historical authority:
- `docs/rurubu-v10/RURUBU-V10-REFERENCE-FINGERPRINT-ANTI-AI-GATE.md`
- `docs/rurubu-v10/RURUBU-V10-PAGE-RECIPES.md`

Recovered lessons:
- strong Rurubu-style display typography has a **silhouette**; it is not merely a bold native font at large size;
- hero display art may be generated/composed when that materially improves quality;
- V10 P02 explicitly expected `TITLE_PROFILE_* × 1` as a primary profile-page asset role;
- long body copy and factual/variable content remain editable/native.

V30 resolution:
- do not classify by `contains text => NATIVE_TEXT`;
- short, locked, high-saliency page-identity lettering may be `GENERATED_DISPLAY_ASSET` when current page authority explicitly chooses it;
- canonical exact wording remains recorded outside the generated asset;
- variable/TBD/personal/long copy remains native.

## 2. The project-wide Hybrid Authoring Policy was a default, not an item-specific ban

Historical authority:
- `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`

Useful original lesson:
- variable semantic copy stays native;
- fixed decoration may be generated/composed when that materially improves design quality;
- Figma is the assembly/editability/QA surface, not necessarily the place where every visual flourish is reconstructed.

Failure introduced later:
- the old examples listing names/headings as native were interpreted too literally in V30, even when owner/page authority wanted high-saliency authored display art.

V30 resolution:
- generic policy supplies the default;
- latest item/page authority controls explicit high-saliency display exceptions;
- neither `all text native` nor `all fixed text generated` is allowed as a blanket rule.

## 3. Asset-first production existed before V30

Historical Drive authority:
- `00_Figma本番前_Current Authority・制作ルール`

Recovered lessons from the 2026-07-29 / 2026-07-31 updates:
- unchanged logos, emblems, stamps, backgrounds and decoration were intended to be completed as assets before Figma;
- photos/body/guest data remained the editable/replacement surface;
- when the same method repeatedly fails, use `Observe → Classify → Change Method → Prototype Small → Compare → Promote/Reject → Git record` rather than cosmetically repeating it.

V30 resolution:
- this asset-first capability remains valid, but production now classifies display/shared/ornament/photo roles before generation and runs true-alpha/live-implementation QA.

## 4. V20 already contained generated editorial parts for P02

Historical Drive folder:
- `RURUBU_V20_EDITORIAL_PARTS_PNG_CURRENT_2026-08-31`

Recovered example:
- `V20_P02_PROFILE_BADGE_GEN_A.png`

Meaning:
- generated editorial display parts on a profile page were not a new concept introduced on 2026-09-03;
- V30 should preserve the useful capability while improving family consistency, alpha QA, copy lock and page-role fit.

Do not directly reuse V20 art as V30 production unless current authority explicitly requalifies it. Historical presence is evidence of workflow capability, not current visual approval.

## 5. Exact cloning had already been identified as an anti-pattern

Historical authority:
- `docs/rurubu-v10/RURUBU-V10-REFERENCE-FINGERPRINT-ANTI-AI-GATE.md`

Recovered rule:
- **reuse motifs with variation rather than exact cloning**.

2026-09-03 live evidence:
- P01 `P01_LEFT_TROPICAL_CLUSTER / PRODUCTION_RGBA`
- P02 `P02_BOTTOM_LEFT_TROPICAL_CLUSTER / REQUALIFIED_CARRYOVER`
- both used Figma imageHash `c4300f9b1f5bf8607ec72da41aa064c2bf52e155`.

The prior `REQUALIFIED_CARRYOVER` label therefore hid literal source reuse.

V30 resolution:
- page-specific major ornaments now require `PAGE_SPECIFIC_ASSET_FINGERPRINT_PASS`;
- compare source SHA-256 when available and Figma `imageHash` when applicable;
- exact reuse across distinct page-specific roles fails unless it is explicitly declared shared/recurring material;
- different hashes still require visual near-duplicate review.

## 6. Functional shared furniture must be designed as a system

Historical related lesson:
- `01_paper-items/rurubu-wedding/lessons/2026-08-03-functional-badge-vs-decorative-stamp.md`

Recovered principle:
- badges/stamps should survive because they have a concrete editorial job such as navigation, category, date or page reference, not merely because they look acceptable in isolation.

2026-09-03 V30 application:
- PAGE 01 / PAGE 02 / ... is navigation/publication furniture;
- therefore it belongs to `SHARED_PUBLICATION_COMPONENT`, not independent page ornament generation.

Implementation rule:
- build one `PAGE_BADGE_SHARED_MASTER`;
- control the page number as variable content/property;
- use the same master/source architecture across P01 onward;
- P09+ extends the same system rather than inventing a new badge.

## 7. Current systemic gates created from this reconciliation

The following current V30 gates exist specifically to prevent recurrence:

- `DISPLAY_ROLE_CLASSIFICATION_PASS`
- `LIVE_ROLE_IMPLEMENTATION_PASS`
- `SHARED_PUBLICATION_COMPONENT_PASS`
- `ORNAMENT_FAMILY_COHERENCE_PASS`
- `PAGE_SPECIFIC_ASSET_FINGERPRINT_PASS`
- `REUSE_INTENT_PASS`
- `DISPLAY_ART_QUALITY_PASS`
- `TRUE_ALPHA_PREFLIGHT_PASS`

A page must not reach `FIGMA_DESIGN_COMPLETE = YES` from manifests/reports alone when live Figma evidence contradicts one of these gates.

## Final recovered principle

**Preserve the rule, not the old artwork.**

Reuse:
- editorial grammar;
- family logic;
- authoring split;
- QA method;
- shared-component architecture;
- failure fingerprints.

Do not blindly reuse:
- old PNG bytes;
- stale page-specific ornaments;
- old P01/P02 compositions;
- historical PASS labels.
