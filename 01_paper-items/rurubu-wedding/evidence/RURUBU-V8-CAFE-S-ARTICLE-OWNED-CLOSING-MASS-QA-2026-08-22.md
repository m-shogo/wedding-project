# るるぶWEDDING V8 — Cafe/Table S article-owned closing mass QA

Date: 2026-08-22
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Previous current: Cafe O `2191:2`
Adopted current: Cafe S `2201:2`

## Visible problem

Immediately after Memory R verified `RSL-198`, a read-only review of Cafe O found the same normalized fingerprint in a materially different editorial role:

- left lower field used giant `11:40` at `128 px / opacity ≈0.07`;
- right lower field used giant `夜` at `132 px / opacity ≈0.06`;
- both were decorative ghost indexes, while the actual sensory and closing copy remained at medium scale.

The spread was structurally clean, but the ghost words acted as pseudo-editorial mass and made the quiet layout feel artificially “designed”.

## Bounded test

Cafe S `2201:2` was created from Cafe O as a rollback-safe duplicate.

- ghost `C_INDEX` and `F_INDEX` are hidden, not deleted;
- existing `C_SENSORY_CLOSE` becomes a stronger article-owned closing beat at `28 px / 42 px` leading;
- existing `F_META` becomes a stronger right-page close at `40 px / 54 px` leading;
- existing `C_FUNCTIONAL_RULE` is retained and moved only to bind the primary sensory block to the close; it is not removed blindly because the project-wide binding-function QA requires evidence before subtraction;
- top right semantic words `料理 / 皿 / 手元 / 店の空気` remain unchanged;
- no generated image, card, badge, shadow, gradient, decorative English, invented fact or V6/V7 asset is added.

## Three-scale QA

- 500 px whole spread: PASS — ghost words no longer simulate sophistication; the two real closing sentences remain visible at thumbnail scale.
- 1400 px reading scale: PASS — left page reads headline → sensory details → functional rule → close; right page reads semantic table words → body → final travel/food close.
- 1587×1123 actual size: PASS — Japanese line breaks remain natural and the stronger closing copy does not collide with folios or fold.

## Structural QA

- visible native text: `14`
- IMAGE fill nodes: `0`
- text intersections: `0`
- 18 px safe-area risks: `0`
- whole-page flattening: `0`
- V6/V7 image reuse: `0`

## Learning result

This is a **second independent V8 role verification** of the already-recorded `RSL-198` fingerprint, not a new project rule and not cross-item verification.

`RSL-198` remains: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Fingerprint reproduced:
`F-RSL-198-LOW-OPACITY-DISPLAY-TYPE-SIMULATES-EDITORIAL-MASS-WITHOUT-CARRYING-CONTENT`

The stronger evidence is that the fingerprint was not unique to Memory: Cafe independently improved when article-owned closing copy replaced low-opacity pseudo-mass, while its own content hierarchy and functional binding rule were preserved.

## Figma evidence

- Cafe S current: `2201:2`
- previous Cafe O: `2191:2` hidden rollback
- stronger left close: `2201:16`
- stronger right close: `2201:14`
- hidden ghost roles: cloned `C_INDEX` / `F_INDEX` under Cafe S

## Asset truth

- new image generation: `0`
- new Drive master: `0`
- new Figma image placement: `0`
- V6/V7 image reuse: `0`
- V8 Drive authority already re-read this run: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`

No generation → Drive → Figma closure is claimed.

## Status

`CAFE_S_CURRENT / RSL_198_SECOND_V8_ROLE_VERIFIED / THREE_SCALE_QA_PASS / STRUCTURE_QA_PASS / O_HIDDEN_ROLLBACK / NOT_GLOBAL_WINNER / NOT_PRINT_READY`
