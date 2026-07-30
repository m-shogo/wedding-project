# るるぶWEDDING production assets

## Current format authority

**SVG is prohibited for the current るるぶWEDDING production path.**

- production/current fixed decoration format: transparent PNG only
- SVG files in this directory are historical artifacts only
- status for every `.svg` here: `HISTORICAL / NON_PRODUCTION / DO_NOT_USE`
- do not place these SVGs into Figma
- do not promote them to Current/Final
- do not use the existence of an SVG source as evidence that an exported PNG is visually acceptable

## Historical note

Earlier work switched to programmatic SVG after repeated raster transparency failures. That solved alpha/editability problems but produced a visual direction the user did not like. The decision has been reversed.

Current rule:
1. remake needed decorative assets as new transparent PNGs
2. judge each PNG on visual quality first, then alpha QA
3. Drive-verify only accepted PNG candidates
4. keep historical SVGs only for provenance

See `../IMAGE-GENERATION-QUEUE.md` for the current #8–#14 remake state.