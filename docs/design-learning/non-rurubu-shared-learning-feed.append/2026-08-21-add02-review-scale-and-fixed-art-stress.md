# Non-Rurubu Shared Learning — ADD-02 review-scale + fixed-art stress

Date: 2026-08-21
Source scope/item: non-Rurubu / ADD-02 table signs

## NRSL-ADD02-20260821-A — Review clones must be proportionally rescaled, not root-resized

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

### Visible problem

A same-scale five-destination QA board was created by cloning full-size Figma frames and calling `resize()` on each cloned root. The board screenshot looked obviously clipped: descendant typography and artwork retained their original geometry while the root became smaller, producing false visual evidence.

### Root-cause hypothesis

`resize()` changes the selected node's bounds. It is not a safe substitute for proportional whole-subtree scaling when the purpose is visual comparison. A review board can therefore create false hierarchy/crop conclusions even though the source candidates are healthy.

### Bounded test

- rejected board: `156:2` built from frame clones + `resize(300,444)`;
- screenshot showed clipped country names and incorrect apparent layouts;
- rejected board was deleted;
- replacement board: `156:166` built from fresh clones + `rescale(0.30)`;
- same source candidates, order and labels; only clone-scaling method changed.

### Evidence

Replacement board rendered HAWAII/JAPAN/ITALY/SPAIN/TAIWAN V3 and current-production rows proportionally and became valid same-scale evidence.

### Expected improvement

Prevent QA-board construction itself from corrupting the visual comparison being judged.

### Regression risk

`rescale()` is appropriate only for review/evidence clones where proportional whole-subtree scaling is intended. Do not use it blindly on production when physical dimensions, typography, stroke weights or editable role sizes must remain authoritative.

### What must remain item-specific

Do not transfer the ADD-02 countries, layouts, scale factor `0.30`, board dimensions, coordinates or visual treatments.

### Cross-item applicability

When another Figma item needs a thumbnail/family comparison board made from editable clones, use proportional subtree scaling (`rescale`) or raster/exported review references. Reject a board if root-only resizing changes the apparent composition.

### Next receiving-item experiment

Verify on a materially different print artifact's comparison board before promoting this as a project rule.

---

## NRSL-ADD02-20260821-B — Text-only collision metrics do not prove fixed-art long-copy safety

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

### Visible problem

Taiwan V3 `154:20` had `6/6` auto-height native text nodes, no text outside the root, and no text-vs-text collision. The real screenshot still failed because a rotated fixed indigo band visually crossed the expanded long headline.

### Root-cause hypothesis

Long-copy safety is not only a text-node geometry problem. Fixed decoration can enter the glyph reading lane while all text metrics remain numerically healthy.

### Bounded test

- source candidate: `154:20`;
- initial fixed-art band `TW / INDIGO WEAVE y=720` crossed the long headline in screenshot evidence;
- changed only that fixed band to `y=610` in selected/stress roots;
- reran screenshot QA;
- final stress screenshot showed the headline/body lane clear with semantic text unchanged.

### Expected improvement

Prevent false PASS when automated structure checks cover text/text bounds but not text/fixed-art optical interaction.

### Regression risk

Blindly moving every decoration away from long copy can weaken useful overlap, depth or binding. The gate is screenshot-supported optical conflict, not a universal no-overlap rule.

### Three-scale / structure evidence

- selected whole/read/actual-size: PASS;
- stress screenshot before fix: FAIL due to fixed-art intrusion;
- stress screenshot after bounded fix: PASS;
- selected/stress native text: `6/6` auto-height;
- outside text: `0`;
- IMAGE fills: `0`.

### What must remain item-specific

Do not transfer Taiwan's diagonal bands, colors, coordinates, country art direction or exact long-copy strings.

### Cross-item applicability

For long-copy stress on print/editorial Figma artifacts, inspect dynamic native copy against fixed decoration, image masks, folds, rules and physical boundaries in the screenshot. Text/text intersection count alone is insufficient completion evidence.

### Next receiving-item experiment

Independently test on a different item where dynamic copy shares space with fixed decorative or photographic fields. Promote only after reproduced without forcing all overlap to disappear.
