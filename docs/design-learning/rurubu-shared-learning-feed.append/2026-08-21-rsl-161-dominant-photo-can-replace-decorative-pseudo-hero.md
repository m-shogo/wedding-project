# RSL-161 — A legitimate dominant photo can replace a decorative pseudo-hero field

Source scope/item: Rurubu WEDDING / V6 Gourmet-Cafe IE
Date: 2026-08-21
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The then-preferred Gourmet/Cafe HC `2012:2` passed structural QA, but its left page was the weakest preferred V6 page in the common 500px comparison. A large pale composed raster/texture occupied the middle of the page while the only visible destination photograph was small. Hierarchy was therefore carried by decorative background mass and empty cream space rather than by photography and native editorial type.

The right-page dining hero was already strong and was not part of the defect.

## Evidence before change

- preferred HC: `2012:2`;
- left page: `2012:3`;
- composed pseudo-hero: `2012:10 / DECOR / GOURMET_CAFE_TRAVEL_TEXTURE_COMPOSED_RASTER`;
- visible small waterfront role: `2012:18`;
- whole-spread 500px comparison against ID + HU/HT + GY + HS identified HC left as the weakest photo/editorial hierarchy.

## Root-cause hypothesis

When a print page has enough factual/editorial content but still feels sparse, the problem may be that a decorative/background field is impersonating a hero without providing photographic narrative weight. Before adding more decoration or generating another asset, test whether an already legitimate, semantically plausible photograph can take the dominant role and allow native type to cluster directly around it.

## Principle / capability tested

`decorative pseudo-hero subtraction → legitimate photo-role promotion → direct native-type clustering → three-scale correction gate`

This is a hierarchy method, not a rule to make every print page photo-heavy.

## Exact bounded test

1. Create rollback-safe IE `2061:2` from HC; keep HC untouched during comparison.
2. Hide the left composed texture role.
3. Reuse verified Rurubu café/dessert source `2003:15`, image hash `c1ada11205bc3978bf426b304d683f1c1566cac2`, as the dominant café lead.
4. Preserve the former waterfront fill as one smaller supporting role.
5. Keep the entire right page inherited from HC because its dining hero was already strong.
6. Re-cluster existing native Feature 01/02 copy without adding cards, rounded containers, shadows or gradients.
7. Reject the first geometry as incomplete when readback found two unintended text intersections; correct them before promotion.
8. Widen Feature 02 again after thumbnail review showed that the collision-free version had become too narrow/timid.

## Expected improvement

- a stronger photo-led first read;
- clearer asymmetric magazine hierarchy;
- less brochure/web-section reading;
- more useful scale contrast between dominant photo, `01`, and compact `02` support cluster;
- preservation of native text/editability and the already-successful right page.

## Regression risk

- enlarging a source can expose insufficient raster fidelity;
- aggressive number/headline scale can create collisions even when it looks energetic at thumbnail scale;
- solving collision by over-narrowing type can produce a technically safe but visually weak result;
- reusing an existing image can create repetition or semantic mismatch if adjacent image roles are not reviewed as a narrative set;
- placeholder/editorial photography must not be mistaken for verified real-person/final venue authority.

## Three-scale evidence

### Whole-item / thumbnail

500px: PASS after final correction. IE reads more immediately as a travel/gourmet magazine spread than HC. The left page now has a genuine dominant café photograph, while the right dining hero remains a second strong anchor.

### Reading / page scale

1400px: PASS after two corrective loops. The first reading-scale render exposed Feature 01 crowding; the later thumbnail exposed an over-narrow Feature 02. Final geometry preserves readable Feature 01 and a wider `景色まで、ごちそう。` cluster without colliding with the support photo.

### Actual-size / detail

Left `2061:3 / 794×1123`: PASS. Café/table/flower/camera detail remains useful, native Japanese hierarchy remains readable, and the closing quote retains bottom reserve.

## Structure evidence

Final IE:

- left native visible text: `20`;
- left visible IMAGE fills: `2`;
- left absolute text intersections: `0`;
- left 18px text safe-area risks: `0`;
- right native visible text: `22`;
- right visible IMAGE fills: `1`;
- right absolute text intersections: `0`;
- right 18px text safe-area risks: `0`;
- whole-page flattening: NO;
- replaceable photo roles preserved: YES.

## Figma / Drive / GitHub evidence

- adopted preferred IE: `2061:2`;
- actual-size left page: `2061:3`;
- hidden HC rollback: `2012:2`;
- reused source: `2003:15`;
- reused image hash: `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- Drive V6 root re-read: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- newly generated assets: `0`;
- new Drive saves: `0`;
- new binary uploads: `0`;
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IE-GOURMET-CLEANROOM-PHOTO-LED-QA-2026-08-21.md`;
- evidence commit: `b0fda291ed7bb72813664fd3d9d3183b54764fed`;
- current-status promotion commit: `f692bb9c6cfdc53b14de875bb085b0be2bc71861`.

## Adopted / rejected / corrected status

- IE final: `ADOPTED / VERIFIED_LOCAL`.
- HC preferred state: `SUPERSEDED`, retained hidden as rollback.
- initial IE intersection geometry: `REJECTED / CORRECTED` before promotion.
- collision-free but over-narrow Feature 02 geometry: `SUPERSEDED` by wider verified cluster.

## What must remain Rurubu-specific

Do not transfer:

- café/dessert photograph;
- waterfront support photograph;
- giant `01/02` geometry;
- exact photo dimensions/rotation;
- yellow/cyan/magenta/navy palette;
- Gourmet/Cafe copy;
- Rurubu-like Japanese travel-magazine grammar.

## Cross-item applicability hypothesis

On another print artifact, when a large decorative/background field is doing most of the visual work while legitimate imagery remains small, independently test:

`remove or demote pseudo-hero field → promote one legitimate role-appropriate photo → cluster native type around the new anchor → verify thumbnail/read/detail → explicitly check collisions and source fidelity`.

The transferable lesson is not “make images bigger.” It is to diagnose whether visual hierarchy is being carried by a low-information decorative field when a stronger legitimate content role already exists.

## Next receiving-item experiment

Only test this in another item when a comparable pseudo-hero/background field is actually visible. Preserve that item's own physical role and visual language; do not import IE composition or Rurubu treatment.