# Rurubu WEDDING V8 — Outer U / Profile V QA

Date: 2026-08-22
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
V6 control: preserved `JC + IX + JB + IZ + IT + JA`
V7: preserved six-role comparison set

## Professional research converted into hypotheses

Fresh professional references used in this run:

- Nippon Design Center / `GQ Japan` (2024): the redesign treated localization as a complete system spanning research, typeface selection, grid design and paper choice rather than a superficial regional skin. Rurubu hypothesis: if V8 feels generically editorial, increase destination ownership through the publication system before adding decorative destination motifs.
- Nippon Design Center / `SUBKAMITURE`: paper and page-turning are treated as sensory/editorial experiences, and experimental graphics are driven by the publication stance rather than by a fixed serious template. Rurubu hypothesis: use content-owned words and pace to carry page identity instead of decorative pseudo-editorial residue.
- Nippon Design Center / Yoshiaki Irobe profile: graphic design can be applied with an editorial perspective across dimensions. Rurubu use: judge typography and visual fields as publication roles, not isolated decoration.

No source layout, palette, typeface combination or composition was copied.

## 1. Outer G → U

### Problem

Outer G `2174:2` was structurally clean but its only visible generated master (`OCEAN_LIGHT_ESSAY`) occupied the dominant front-cover field while remaining visually generic. `横浜 / YOKOHAMA` was only 22 px, so the cover's destination identity was weaker than the abstract atmosphere field.

### Hypothesis

When a technically valid but low-specificity generated image dominates a travel-book cover, the destination can regain ownership by making the article-owned place name the primary visual mass and demoting the weak image to a supporting field. This should be tested before adding another destination sticker, map motif, palm/flower decoration or unrelated photo.

### Bounded change

Rollback-safe U was created from G and changed only the front cover:

- `FRONT_DEST` changed from `横浜 / YOKOHAMA` at 22 px to native `横浜` at 112 px / 122 px leading.
- A small native `YOKOHAMA` roman label was added as secondary place metadata.
- Existing `OCEAN_LIGHT_ESSAY` remains the same verified generated role and image object but is demoted from `647×520` to `647×326` and moved lower.
- Existing native cover headline remains on the generated field.
- No V6/V7 image, no new generated image, no new Drive master, no new decorative card, shadow or gradient.

### Result

Promoted current: Outer U `2205:2`.
Previous G `2174:2`: hidden rollback.

Three-scale QA:

- 500 px whole-item: PASS; `横浜` is readable as the cover's immediate destination anchor and the generated field no longer dominates the issue identity.
- 1000 px reading scale: PASS; masthead → destination → supporting visual → deck is clear.
- 1587×1123 actual size: PASS; headline/caption remain readable and the cover does not depend on low-opacity pseudo-type.

Structure readback:

- visible native text: `13`
- visible IMAGE roles: `1`
- text intersections: `0`
- 18 px text safe risks: `0`
- generated master remains Drive `1L5bMXy7IhPWGgIH6yDJ9mzOpveFYTZYB`; no new byte-identity claim

Professional critique:

- Art director: stronger issue idea because the place itself owns the cover before the atmospheric image.
- Editorial designer: clearer hierarchy without adding a module.
- Book designer: still restrained and distinct from V7; the image now acts as a plate rather than a generic hero.
- Typographer: Japanese destination word remains native, full-opacity and width-safe.
- Photo editor: current visual remains semantically weak as destination photography; it is deliberately demoted rather than falsely upgraded.
- Print designer: no new trim/fold/safe risk observed; final printer/preflight remains separate.

Status: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## 2. Profile P → V

### Problem

Profile P `2194:2` had already differentiated SHOGO / SHI-CHAN and Q1/Q2/Q3, but the lower-left page still used a large low-opacity `01` (`P_SECTION_INDEX`) as pseudo-editorial mass. It also repeated substantially similar meaning across `同じ街を、違う速さで。` and the existing close `歩く人と、食べる人。違うテンポで、同じ街を楽しむ。`.

### Hypothesis

After a page's main semantic roles are already differentiated, decorative section numerals can preserve an AI/editorial-template residue. Removing the unowned display mass and promoting the stronger article-owned close should produce a more defensible page than replacing it with another decorative device.

### Bounded change

Rollback-safe V was created from P:

- low-opacity `P_SECTION_INDEX / 01` hidden, not deleted;
- redundant marginalia `同じ街を、違う速さで。` hidden, not deleted;
- existing native close `歩く人と、食べる人。違うテンポで、同じ街を楽しむ。` promoted to a 28 px / 44 px-leading closing beat;
- existing caption moved below that close;
- SHOGO / SHI-CHAN and Q&A hierarchy preserved;
- no image, card, decorative English, shadow, gradient or new fact added.

### Result

Promoted current: Profile V `2207:2`.
Previous P `2194:2`: hidden rollback.

Three-scale QA:

- 500 px whole-item: PASS; left-page closing now reads as content rather than a decorative index marker.
- 1000 px reading scale: PASS; SHOGO → SHI-CHAN → article-owned close is a coherent page sequence.
- 1587×1123 actual size: PASS; closing copy is readable without collision or arbitrary accent treatment.

Structure readback:

- visible native text: `23`
- visible IMAGE roles: `0`
- text intersections: `0`
- 18 px text safe risks: `0`

This independently reinforces the existing RSL-198 family inside a third Rurubu editorial role: low-opacity display type should not be retained merely to simulate editorial mass when article-owned content can perform the job.

Status: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new Figma image upload/placement: `0`
- V6/V7 image reuse: `0`
- existing Outer generated master preserved and demoted, not relabeled as destination photography

The current autonomous environment still has no approval-free image-generation route. Weave remains approval/credit-gated per run, so generation was not fabricated and unrelated imagery was not substituted.

## Before/after learning check

The new professional research changed two concrete decisions:

1. `GQ Japan` localization research shifted Outer from generic editorial atmosphere toward destination-owned cover identity without copying a local motif.
2. `SUBKAMITURE` / editorial-stance research plus existing RSL-198 changed Profile from decorative index mass to content-owned closing mass.

This is learning progress because the decision method changed, not merely because another candidate was produced.

## Current limit

V8 still does not beat V6 on destination-specific photographic desire. U improves cover specificity but does not turn the abstract generated field into legitimate Yokohama photography. No global winner and no print-ready claim.