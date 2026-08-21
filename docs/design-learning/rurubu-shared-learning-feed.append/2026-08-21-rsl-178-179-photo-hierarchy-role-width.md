# Rurubu shared-learning append — 2026-08-21

## RSL-178 — Unequal photo modules can still read as a dashboard until one role clearly owns the visual field

Source scope/item: Rurubu WEDDING / V6 Yokohama 1DAY IW

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

### Visible problem

IM had already replaced the old route-list treatment with unequal photographs, but its lower right page still read at thumbnail scale as two separate rectangular Stop 03/04 modules. The layout was technically asymmetric yet still retained a mild 2×2 tile cadence.

### Evidence before change

IM `2087:2`, right page `2087:33`:

- Stop 03 street photo: `360×220`;
- Stop 04 dining photo: `366×200`;
- each photo had independent title/copy/meta ownership below it.

The issue was visible in the fresh 500 px common-scale comparison against IU, IP, IR, IV and IT.

### Root-cause hypothesis

Breaking equal dimensions is not sufficient when every photo still behaves as an independent module. Editorial hierarchy strengthens when one image clearly owns the field and another is visibly subordinate/supportive, while semantic numbering or time labels preserve the content sequence.

### Principle / capability tested

`dominant photographic ownership + smaller overlapping support role`, without adding decoration or changing facts.

### Exact bounded change

Rollback-safe duplicate IM → IW `2131:2`:

- Stop 03 street photo `360×220 → 560×292` as the dominant lower beat;
- Stop 04 dining photo `366×200 → 280×176` as an overlapping postcard/support beat;
- Stop 03/04 number, time, title, copy and metadata remained native and were repositioned;
- left page, image sources, hashes and facts were preserved;
- no new card, rail, gradient, shadow or asset was added.

### Expected improvement

Reduce tile/dashboard reading and make the itinerary feel like a photographic travel sequence without sacrificing chronological scanability.

### Regression risk

Overlap can obscure chronological ownership, compress captions, create unsafe trim proximity, or make the support image look decorative rather than informative. It must remain readable at actual size.

### Three-scale evidence

- whole spread / 500 px: PASS; stronger dominant/support hierarchy than IM;
- reading / 1400 px: PASS;
- actual right page / `794×1123`: PASS;
- final visible native text on right: `24`;
- IMAGE-fill nodes on right: `4`;
- text intersections: `0`;
- 18 px safe-area risks: `0` after repairing folio and Stop 04 metadata reserve.

### Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- adopted IW: `2131:2`, right `2131:33`;
- hidden rollback IM: `2087:2`;
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- new image hashes: `0`;
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IW-IX-1DAY-PROFILE-EDITORIAL-HIERARCHY-QA-2026-08-21.md`.

### Failure fingerprint

`F-RSL-178-ASYMMETRIC-TILES-WITHOUT-DOMINANT-FIELD-OWNERSHIP`

When a supposed asymmetric photo layout still reads as a collection of independent modules, do not keep changing each tile's size cosmetically. Test a materially different dominant/support ownership model or switch to another safe target.

### What must remain Rurubu-specific

Do not transfer the four-stop route, Yokohama imagery, stop numbers/times, photo ratios, exact overlap, palette, captions or Rurubu-like editorial treatment.

### Cross-item applicability hypothesis

A materially different print artifact may independently test whether one dominant visual plus one subordinate overlapping/support visual produces clearer hierarchy than several separately owned rectangles. The transferable principle is role ownership, not postcard styling.

---

## RSL-179 — A narrow factual sidebar can create UI reading even without cards; role-width redistribution must revalidate contrast

Source scope/item: Rurubu WEDDING / V6 Profile IX

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

### Visible problem

IP's profile left page had no conventional card grid, but six facts were stacked in a narrow column beside a large camera/travel photograph. At thumbnail scale it still read partly as `content + sidebar`, weakening the magazine-page feeling.

### Evidence before change

IP `2096:2`, left `2096:3`:

- main photo: `520×640`;
- six fact label/value pairs stacked near x=`542` from roughly y=`132–472`;
- facts were native and useful, but their narrow vertical ownership resembled a web sidebar.

### Root-cause hypothesis

UI-like composition can come from role width/orientation and reading ownership, not only boxes, shadows or rounded containers. When factual content is short and parallel, redistributing it across a broader editorial band can preserve information density while removing sidebar logic.

### Principle / capability tested

`full-width photographic lead + compact multi-column fact band + existing lower collage`, with all factual copy kept native.

### Exact bounded change

Rollback-safe duplicate IP → IX `2132:101`:

- main camera/travel image `520×640 → 793.7×500`;
- quote retained on the image field;
- six existing facts regrouped into a `3 columns × 2 rows` native editorial band below the hero;
- existing waterfront/street photos rebalanced as the lower collage;
- `03 次の旅へ。` retained as the closing beat;
- Q&A right page preserved unchanged;
- no new asset/image hash introduced.

### Local failure and correction

Moving `ふたりの旅プロフィール` from an on-photo role to the cream paper field exposed an inherited white text fill, producing poor contrast. The candidate was not adopted in that state. The title was changed to the existing navy text color already present in the same candidate and all three scales were rechecked.

This demonstrates that spatial/role relocation is also a contrast-context change: inherited styling cannot be assumed valid after the background role changes.

### Expected improvement

Replace web-sidebar reading with a stronger photo-led editorial page while keeping six facts immediately scannable and editable.

### Regression risk

A broad fact band can become visually flat, overly tiny, or spreadsheet-like if hierarchy is weak. Moving text between image and paper contexts can also silently break contrast even when typography metrics remain unchanged.

### Three-scale evidence

- whole spread / 500 px: PASS; less sidebar-like than IP;
- reading / 1400 px: PASS;
- actual left page / `794×1123`: PASS;
- final full-spread visible native text: `54`;
- IMAGE-fill nodes: `5`;
- same-parent text intersections: `0`;
- 18 px safe-area risks: `0`.

### Figma / Drive / GitHub evidence

- adopted IX: `2132:101`, left `2132:102`;
- hidden rollback IP: `2096:2`;
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- generated/adopted new assets: `0`;
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IW-IX-1DAY-PROFILE-EDITORIAL-HIERARCHY-QA-2026-08-21.md`.

### Failure fingerprint

`F-RSL-179-TEXT-ROLE-RELOCATED-WITH-INHERITED-CONTRAST`

When native text moves materially between image, colored field and paper/neutral background roles, require fresh rendered contrast review rather than assuming its old fill remains valid.

### What must remain Rurubu-specific

Do not transfer the camera flatlay, exact 3×2 geometry, colors, fact wording, photo collage, 03 destination treatment, coordinates or Rurubu-like visual grammar.

### Cross-item applicability hypothesis

Another print item may independently test whether a short factual sidebar can become a broader typographic information band without losing scanability. Any such role-width redistribution should include fresh background/contrast QA for text that changes visual context.