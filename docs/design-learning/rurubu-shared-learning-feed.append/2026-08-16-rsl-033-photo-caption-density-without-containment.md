# RSL-033 — Native photo captions can add editorial density without recreating decoration geometry

Date: 2026-08-16
Source scope/item: Rurubu WEDDING / V6 AQ Story + chronology
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

V6 AP had already removed the old grid/card chronology and used strong photos, but the inside spread still read slightly too clean/minimal relative to the requested Japanese travel-information-magazine energy. The Story lower field also still felt partly like unused template space.

## Root-cause hypothesis

The missing density did not require more boxes, shadows, stickers, gradients, or native Figma ornament construction. Existing photography could carry more editorial meaning if small native captions, scene labels, route metadata, and hierarchy cues were attached directly to the image-reading path.

## Bounded test

Rollback-safe duplicate AQ `1387:2` from AP `1384:2`:

- preserved all variable/factual copy as native text;
- preserved existing verified replaceable image hashes;
- slightly increased/overlapped two Story support-photo roles within registered intrinsic bounds;
- added small native photo captions such as destination/scene metadata;
- added a compact native Story travel-note list in the remaining lower field;
- added native chronology `01 — 06 / JOURNEY`, feature-photo note, and scene labels;
- hid the chronology top rule after the typography itself proved sufficient;
- added no new raster decoration, card, badge, shadow, gradient, sticker, or decorative native geometry.

An early vertical side-mark collided with the main story anchor and was hidden rather than kept for activity. An early chronology route position also collided with the title and was moved before promotion.

## Expected improvement

- more magazine-like informational density;
- photography reads as editorial content rather than isolated placeholders;
- less empty-template feeling;
- no return to UI-like containment;
- later text edits remain straightforward.

## Regression risk

Micro-captions can become visual noise, collide with photo subjects, or falsely imply facts if they are treated as final copy. They must remain subordinate, native/editable, semantically appropriate, and revalidated when real photography/copy arrives.

## Three-scale evidence

- whole spread / 1200 px: PASS and preferred over AP;
- reading spread / 1200 px: PASS;
- Story actual size `794×1123`: PASS;
- chronology actual size `794×1123`: PASS.

Final structure:

- Story: native text `12`, IMAGE roles `3`, text collisions `0`, 18px safe-area risk `0`, outside visible nodes `0`;
- chronology: native text `32`, IMAGE roles `6`, text collisions `0`, 18px safe-area risk `0`, outside visible nodes `0`.

## Figma / Drive / GitHub evidence

Figma:

- AQ preferred `1387:2`;
- Story `1387:3`;
- chronology `1387:14`;
- AP rollback `1384:2` hidden;
- Start Here `845:27` = `V5 FU/FX · V6 O + AM/AQ INSIDE STUDIES · V7 HOLD`.

Drive:

- V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- Timeline generated master remains `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8`, verified present but not adopted.

GitHub:

- QA: `01_paper-items/rurubu-wedding/RURUBU-V6-O-AM-AQ-QA-2026-08-16.md`;
- active asset reconciliation: `01_paper-items/rurubu-wedding/RURUBU-V6-O-AM-AQ-ACTIVE-ASSET-RECONCILIATION-2026-08-16.json`.

## Adopted / rejected / blocked status

`VERIFIED_LOCAL`: AQ promoted over AP.

No image generation or new binary transport was required in this bounded test. Known Figma submit transport failure was not retried because the environment capability did not materially change.

## What must remain Rurubu-specific

Do not transfer:

- exact Japanese headline sizes;
- scene labels;
- photo positions/angles;
- red/cyan/yellow accents;
- chronology composition;
- travel-magazine grammar;
- exact microcopy.

## Cross-item applicability hypothesis

When another print artifact already has strong imagery but still feels under-designed, independently test whether **small native captions/metadata attached to image roles** can add useful editorial density before introducing more visible containers or decomposed decoration geometry.

This does not mean every image needs a caption. The caption must add a real reading function at whole-item scale.
