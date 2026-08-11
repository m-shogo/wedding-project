# DG lesson — photo quality can change hierarchy

- **Visible problem:** DB had stronger typography than earlier candidates but the low-quality Yokohama proxy still occupied too much visual authority.
- **Principle:** treat photo quality as a hierarchy constraint. A weak image should become a supporting factual anchor; a stronger verified image should become the dominant editorial surface.
- **Capability tested:** safe duplicate redesign, in-file IMAGE hash reuse, aggressive crop hierarchy, native Japanese type over photography, screenshot-led subtraction, structure intersection repair.
- **Expected improvement:** stronger travel-magazine recognition at thumbnail scale, better print plausibility at actual size, less UI/card geometry.
- **Regression risk:** destination specificity can weaken if the supporting Yokohama anchor becomes too small; keep native destination copy and a clearly visible destination image.
- **Evidence:** DG `913:190`; actual-size front `913:319`; dominant `913:378`; destination anchor `913:321`; Review snapshot `915:2`; 35 visible native text; 8 visible images; same-parent text intersections 0; fold `913:377` preserved.
- **Status:** adopted as strongest outer comparator, not Current.
- **Next application:** never enlarge a failing hero merely to preserve legacy layout. Reconsider which photograph is allowed to own the page first.
