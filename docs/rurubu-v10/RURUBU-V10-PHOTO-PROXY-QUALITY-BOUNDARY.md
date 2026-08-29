# Rurubu WEDDING V10 — Photo Proxy / Final Graphic Quality Boundary

Status: `V10_CANONICAL_PRODUCTION_BOUNDARY`

Scope: Rurubu WEDDING V10 only.

## User-authoritative production intent

During V10 editorial construction, **people photographs and scenery photographs are replaceable layout sources**. They will be replaced later with final imagery. Therefore, a low-resolution or temporary proxy photo is not a design blocker while the page structure, crop role, mask, hierarchy, and editorial rhythm are being built.

The current high-priority visual-quality target is the **publication graphic system**:

- title artwork and Rurubu/Wedding logos;
- section-heading graphics;
- decorative flourishes and composed accents;
- icons, badges, stamps and travel marks;
- photo-frame artwork and collage-frame graphics;
- fixed background/editorial graphic assets that are expected to survive into the final booklet.

These fixed graphic assets must receive strict visual and resolution QA now because they are not merely temporary photo content.

## Two different quality gates

### A. `REPLACEABLE_PHOTO_PROXY`

Applies to temporary people / couple / guest / scenery / destination photography used only to construct and review the layout before final source replacement.

Rules:

- low source resolution is acceptable during layout construction;
- do not block `ASSET_FIRST_80` solely because a photo proxy is below the final 250/300 ppi thresholds;
- do not repeatedly report proxy-photo PPI as the primary blocker;
- the proxy must still be placed through a stable semantic mask/clip and preserve the intended focal/crop role;
- layer naming should state `REPLACEABLE` and, where useful, `PROXY OK`;
- never claim the proxy itself is final production photography;
- final photography must still receive normal intrinsic-resolution, crop, provenance and print QA after replacement.

This exception applies to replaceable photographic content only. It does **not** waive mask integrity, layout hierarchy, safe area, editability or final-photo QA.

### B. `FINAL_GRAPHIC_ASSET`

Applies to title/logo/decor/icon/badge/frame/background/composed editorial artwork expected to remain in the finished booklet.

Rules:

- inspect actual pixels, not filename alone;
- preferred effective resolution: 300 ppi or higher;
- 250–299 ppi: `RESOLUTION_WARNING`, review actual-size sharpness and whether source/size can be improved;
- below 250 ppi: do not promote as final production graphic at that physical size;
- fine title/logo/linework raster prefers about 300–350 ppi or more; use SVG/vector where meaningful and visually faithful;
- transparent edges, fine strokes, baked lettering, AI artifacts and text correctness must be checked at actual A5 size;
- a low-resolution frame/decor asset must not be excused merely because the photograph underneath it is replaceable.

## Priority during the current V10 passes

1. Put the correct **titles / logos / frames / flourishes / icons / badges / route/map graphics** into their semantic page roles.
2. Build all eight pages toward the Rurubu reference density and hierarchy.
3. Keep people/scenery images replaceable and compositionally useful; do not spend production time optimizing temporary proxy-photo resolution.
4. QA the fixed graphic assets rigorously now.
5. Replace people/scenery sources later, then run the final photo-resolution/crop/provenance pass.

## Reporting rule

During current asset-first work, report resolution warnings primarily for `FINAL_GRAPHIC_ASSET` roles. For a `REPLACEABLE_PHOTO_PROXY`, report resolution only when it prevents meaningful layout/crop review or when the source has been explicitly promoted to final photography.

Use explicit language:

- `PHOTO_PROXY_OK_FOR_LAYOUT / FINAL_PHOTO_QA_DEFERRED`
- `FINAL_GRAPHIC_RESOLUTION_WARNING`
- `FINAL_GRAPHIC_NOT_PRINT_READY`

Do not conflate these states.
