# Rurubu WEDDING — Figma Placement Contract

Status: `CANONICAL_EXECUTION_CONTRACT`

Figma must execute authored page manuals. It must not invent the composition from a vague stylistic request.

## Required input before any page write

A page may be touched only when these exist:
1. approved page job;
2. content truth list;
3. zone map;
4. photo manifest;
5. parts manifest;
6. overlap/z-order map;
7. density map;
8. editability contract;
9. page-specific anti-patterns;
10. fallback rules.

If any are missing, stop design execution and complete the manual instead.

---

# Instruction grammar

Every Figma instruction should use concrete operations.

Good:
`Place HERO_COUPLE in the center-lower hero zone, width about 62% of trim width, preserve replaceable mask, crop for two-person silhouette, rotate 0°, allow the upper silhouette to overlap the lower edge of TITLE_WEDDING.`

Bad:
`Make the cover look more like Rurubu.`

Good:
`Place three support snapshots along the lower third with widths roughly 23%, 19%, and 25%; use two different frame families; rotate -4°, +2°, -2°; stagger vertical baselines; do not form an equal row.`

Bad:
`Add some cute photos at the bottom.`

---

# Coordinate precision model

Use two levels:

## Level 1 — editorial zone
Percentage/mm range that preserves compositional flexibility.

Example:
`x 8–72 mm, y 58–132 mm`.

## Level 2 — committed placement
After live screenshot review, record the chosen x/y/w/h/rotation for the specific Figma frame.

Do not prematurely freeze exact coordinates before real text/photo behavior is visible.

---

# Figma layer rules

Top-level page frame:
`P01_COVER`, etc.

Children should use semantic names:
- `TITLE/...`
- `TEXT/...`
- `PHOTO_MASK/.../REPLACEABLE`
- `PHOTO_SOURCE/...`
- `FRAME/...`
- `LABEL/...`
- `DECOR/...`
- `ROUTE/...`
- `MAP/...`
- `REFERENCE_ONLY/...`

No production-ready page should remain dominated by `Rectangle 123`, `Group 45`, `Image 2` names.

---

# Auto Layout policy

Use Auto Layout for:
- factual rows;
- repeated schedule items;
- structured profile facts;
- text stacks where content length changes;
- small internal label systems.

Do not use global Auto Layout for:
- whole magazine page;
- hero/photo composition;
- overlapping editorial clusters;
- edge decoration;
- tilted photo collage;
- title-photo interaction.

The goal is controlled editability without web-layout gravity.

---

# Photo replacement contract

For each replaceable photo:
- stable mask/clip;
- source layer independent of frame art;
- crop overscan reserved;
- focal point documented;
- replacement should not require rebuilding nearby text;
- proxy state explicitly named;
- final PPI/provenance checked later.

---

# Display asset contract

Hero logos/titles/stamps/decor can be image/vector assets when stronger than native Figma drawing.

But:
- long copy is not embedded;
- changing facts are not embedded;
- Japanese generated text must be manually verified;
- transparent assets require edge/alpha QA;
- raster asset physical size/resolution must be known before print approval.

---

# Execution order per page

1. background/paper field;
2. hero/title skeleton;
3. main photo hierarchy;
4. body/utility content fields;
5. support photo clusters;
6. semantic labels;
7. overlap and edge framing;
8. micro-discovery parts;
9. actual-size typography correction;
10. screenshot QA;
11. only then micro-spacing polish.

Never begin with stickers/decorations.

---

# Post-write evidence

After every meaningful page batch, record:
- screenshot;
- page state;
- first/second/third read;
- largest mismatch to canonical reference behavior;
- what was corrected;
- remaining content/asset gaps;
- any low-res/proxy warning;
- any editability break.

A vague statement such as `looks better` is not sufficient QA evidence.
