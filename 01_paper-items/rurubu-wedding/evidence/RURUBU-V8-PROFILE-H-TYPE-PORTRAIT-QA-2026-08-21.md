# Rurubu WEDDING V8 — Profile H Type Portrait QA

Date: 2026-08-21
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current candidate: `2177:2`
Previous rollback: `2164:2`
Scope: Rurubu WEDDING only

## Visible problem

The prior V8 Profile/Q&A used generated role `2164:6` / Drive `1MsisJ-qed1vYjGbMFiylN2DI6Lim_1Ko`. At reading scale it presented as an abstract block/contact-proof construction rather than a legitimate portrait, destination photograph, documentary fragment or useful information image. It therefore increased synthetic/AI-prototype feeling while the actual identity information already lived in native text.

No verified real-person portrait authority is available for this role, and generated recognizable people must not impersonate the real couple.

## New professional research used

- The Gentlewoman profile practice gives portrait photography visual priority over oversized subject naming when legitimate portraits exist; the creative team also describes reconsidering details issue by issue rather than freezing a mechanical template.
- Veronica Ditting describes an editorially driven process as a dialogue between form, photography and language, not isolated styling.
- Neutral shared learning from `NRSL — DESTINATION FAMILY DIVERSITY REQUIRES SKELETON AND ENERGY VARIATION` was consumed only as a hypothesis: changing palette/material alone does not remove templating when the underlying mass distribution repeats. No non-Rurubu layout, palette, asset or production state was copied.

## Root-cause hypothesis

The defect was not simply that the generated image was unattractive. The deeper problem was **image-shaped visual mass without portrait authority or editorial ownership**. Because the profile facts were already sufficient to express a two-person contrast, preserving a large synthetic image block created a false expectation that the image itself contained identity evidence.

## Bounded test

1. Duplicate current Profile/Q&A `2164:2` to rollback-safe candidate `2177:2`.
2. Preserve the entire right Q&A page.
3. Hide only the generated contact-proof image and its obsolete combined fact block.
4. Rebuild the left page as native editable type:
   - `歩く / 01` → `SHOGO` → `旅先でまず歩く人。`
   - `食べる / 02` → `SHI-CHAN` → `旅先でまず食べる人。`
   - existing shared line `歩く人と、食べる人。違うテンポで、同じ街を楽しむ。`
5. Keep page furniture restrained: one functional rule, section index, existing folio/caption.
6. Reject decorative English microcopy that did not add reader meaning.
7. Preserve the old Profile as hidden rollback at `x=7200 / y=3200`; promote H to the live comparison position `x=3600 / y=3200`.

## Three-scale QA

### Whole-item / thumbnail — 500px

PASS.

The left page reads immediately as two distinct people/tempos rather than a synthetic image grid. The profile idea remains legible without depending on tiny copy.

### Reading scale — 1400px

PASS.

The paired names, semantic micro-labels and central line establish hierarchy. The right Q&A still provides the conversational counterpart. No added card/dashboard grammar is introduced.

### Actual size — 1588×1123

PASS.

The two-person type portrait remains controlled; small captions and folios remain readable; no headline or body text is forced into an image contrast problem.

## Structural readback

- visible native text: `25`
- visible IMAGE fill nodes: `0`
- same-parent text intersections: `0`
- 18px safe-area risks: `0`
- visible internal/process-language fingerprints: `0`
- whole-page flattening: `0`

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new Figma image placement: `0`
- V6/V7 image reuse: `0`
- previous V8 generated contact-proof master: preserved only in hidden rollback, not claimed by current Profile H

This pass does **not** claim generation → Drive → Figma closure. Image-dependent roles remain queued for genuine role-specific generation. This profile role instead verifies that synthetic image mass should be removed when it actively reduces authenticity and no legitimate image authority exists.

## Result

`2177:2` promoted to current V8 Profile/Q&A.

State: `DESIGN_QA_PASS / VERIFIED_LOCAL / NOT_GLOBAL_WINNER / NOT_PRINT_READY`.

## Learning

`RSL-189 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Failure fingerprint: `F-RSL-189-SYNTHETIC-PROFILE-VISUAL-WITHOUT-PORTRAIT-AUTHORITY`

Transferable hypothesis: when identity facts are native and no verified portrait exists, a synthetic image-shaped placeholder may be less authentic than a purpose-built typographic portrait. Test whether typography can carry the identity contrast before adding/generated imagery with no documentary or semantic owner.

Must remain Rurubu-specific: exact names/copy, 01/02 composition, type scale, colors, page coordinates, book-edition styling and current V8 production state.
