# Rurubu shared-learning append — 2026-08-21

## RSL-180 — Secondary-photo boundary overlap can repair false section ownership

Source scope/item: Rurubu WEDDING / V6 Memory Spots

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

### Visible problem

A print page had two legitimate photographs and readable native copy, but the dominant image ended cleanly before the secondary image began. At thumbnail scale the page therefore read as `hero section → lower module`, even though there were no cards or rounded UI containers.

### Evidence before change

Memory Spots IV `2127:2` used a `840×560` destination hero followed by a separate Spot 02 cafe photograph at `x=326 y=600 443×371`. The lower image did not participate in the hero boundary, so the transition was calmer and more web-section-like than the stronger V6 editorial pages.

### Root-cause hypothesis

Section ownership can be created by image boundaries alone. If a secondary photograph has a legitimate narrative relationship with the page, moving it across the dominant-image/paper boundary can connect those editorial beats without introducing another container or decorative object.

### Principle/capability tested

Use overlap as a structural reading device, not decoration: a secondary photo may bridge two fields when copy width and z-order are rebalanced to keep the content roles unambiguous.

### Exact bounded change

Rollback-safe IZ `2138:2` preserved the entire right page and all image sources. On the left page only:

- Spot 02 cafe photo moved/resized `326,600,443×371 → 344,520,425×390`;
- Spot 01 copy column narrowed so the photo could cross the hero boundary without collision;
- Spot 02 native number/title/pullquote and its existing caption treatment were repositioned around the new image role;
- no new asset, copy, card, shadow, gradient, or decorative motif was added.

### Expected improvement

Continuous photo-led rhythm, stronger asymmetry, and less `header/hero/body module` reading while retaining native text, replaceable photography, and meaningful information density.

### Regression risk

An overlap can become gratuitous, cover essential copy, create unclear z-order, or enlarge a weak raster beyond credible print detail. It can also erase useful quiet space if applied mechanically.

### Three-scale evidence

- whole-item / 500 px: PASS and stronger than IV
- reading / 1400 px: PASS
- actual-size left / `794×1123`: PASS
- visible native text: `27`
- IMAGE fills: `4`
- same-parent text intersections: `0`
- 18 px safe-area risks: `0`

### Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted preferred: IZ `2138:2`
- hidden rollback: IV `2127:2`
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IZ-MEMORY-SPOTS-OVERLAP-POSTCARD-QA-2026-08-21.md`

### Adopted status

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

### What must remain Rurubu-specific

Do not transfer the Yokohama/cafe photography, overlap coordinates, cyan/magenta/yellow accents, giant numbers, Japanese travel-magazine styling, photo ratios, captions, or Memory Spots composition.

### Cross-item applicability hypothesis

When another print artifact has a false section break created primarily by two sequential image fields, it may independently test whether a legitimate secondary image can bridge the boundary before adding a new background shape or container.

### Next receiving-item experiment

Only test on a materially different artifact where the secondary image has a real semantic role and the current boundary is screenshot-visible. Reject the method if it worsens copy readability, physical credibility, source fidelity, or role clarity.