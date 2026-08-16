# NRSL — Unequal columns should follow variable-copy mass, not equal-grid aesthetics

Source scope/item: non-Rurubu / ADD-14 二次会案内

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A clean-room night-field design initially placed access, fee, and RSVP/contact content into equal-width or visually balanced lower columns. Production dummy copy looked acceptable, but realistic Japanese stress immediately pushed access and RSVP/contact outside trim and created collisions with the time axis.

## Root-cause hypothesis

Equal-width columns were being chosen for visual balance rather than for the expected **semantic copy mass** of each role. Access/notice is naturally much longer than fee. RSVP/contact is medium-to-long. Treating these roles as equal modules creates admin-grid rhythm and silently reduces long-copy tolerance.

## Bounded test

On ADD-14 clean-room V3 only:

1. initial equal lower row failed realistic stress;
2. a nested wide-access + stacked fee/RSVP structure was tested and still failed on A5 RSVP/contact height;
3. final structure used one horizontal row with **unequal widths chosen from expected content mass**:
   - access/notice = widest;
   - fee = compact;
   - RSVP/contact = compact-to-medium;
4. A5 lower value typography was optically reduced only enough to preserve trim clearance;
5. no rounded cards, panels, images, or extra decoration were added.

## Expected improvement

Let the information architecture reflect real copy behavior while keeping a single editorial reading field instead of a dashboard-like equal grid.

## Regression risk

Unequal widths can look arbitrary if the semantic roles actually carry similar content, and overly aggressive compression can hurt readability. The widths must be justified by realistic copy stress and actual-size review, not copied as fixed ratios.

## Three-scale evidence

- whole-item A6/A5: PASS after final repair;
- reading scale: PASS; access/fee/RSVP remain distinguishable without card containment;
- actual-size: PASS;
- realistic Japanese long-copy stress: A6 outside text `0`; A5 outside text `0` after repair.

## Evidence

- Figma file: `IygEr140Yqk12LsGL3TFrT`
- clean-room V3 page: `32:2`
- A6: `32:3`
- A5: `32:29`
- hidden stress A6: `33:2`
- hidden stress A5: `33:28`
- Drive authority: `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`
- item evidence: `01_paper-items/additional-wedding-items/ADD-14-after-party-guide/FIGMA-CLEANROOM-V3-NIGHT-FIELD-QA-2026-08-17.md`
- item commit: `f81b4125a333578ae45244ea45dcdfb8cd6896e3`

## What must remain item-specific

Do not transfer ADD-14's navy/ivory/mint/rust palette, route axis, exact A6/A5 coordinates, exact widths, late-night concept, title scale, or time-node treatment.

## Cross-item applicability hypothesis

When another print item has adjacent variable-copy roles with materially different expected text mass, test **content-mass-weighted unequal columns** before adding cards, shrinking everything uniformly, or forcing equal widths for symmetry.

The receiving item must independently prove benefit with realistic copy and actual-size QA. This is a structure/QA principle, not a layout template.
