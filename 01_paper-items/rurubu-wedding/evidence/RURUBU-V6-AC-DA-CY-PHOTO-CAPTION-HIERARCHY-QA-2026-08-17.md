# Rurubu WEDDING V6 — AC / DA / CY Photo Caption Hierarchy QA

Date: 2026-08-17
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Starting authority

Fresh live readback before writes:

- Outer AB `1607:2` — preferred at run start;
- Profile/Q&A CZ `1609:2` — preferred at run start;
- Story/Chronology CY `1601:81` — retained;
- Start Here: `V5 FU/FX · V6 AB + CZ/CY INSIDE STUDIES · V7 HOLD`;
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

No non-Rurubu production state was inspected or edited.

## Observation 1 — Profile photo cluster captions were too weak

### Visible problem

CZ already had strong photo scale variation and replaceable image roles, but its three snapshot captions were 9px English metadata. At whole-item and actual-size scales they behaved like implementation notes rather than real magazine micro-editorial copy, so the lower photo cluster still read partly as three placed images.

### Root-cause hypothesis

The remaining template feeling was not missing imagery. The cluster lacked a visible reading sequence that attached each photo to a small editorial meaning. Native caption hierarchy could add that sequence without cards, new decoration, new raster assets, or changing replaceable photo geometry.

### Bounded test

Rollback-safe candidate `1612:2` changed only the three native snapshot captions:

- `01 / 海辺の夕暮れ` — magenta, 12px;
- `02 / 夜の街歩き` — navy, 12px;
- `03 / 次の目的地` — cyan, 12px.

All Profile/Q&A photos, image hashes, Profile facts, Q&A, composed route texture, and photo geometry remained unchanged.

### Failure and correction

The first actual-size placement put the 03 caption near the upper profile-data region. Structural QA detected real text collisions with `チャームポイント` label/value.

That placement was rejected. The caption was moved to the safe lower-right gap beside/below the small third snapshot. Re-run structural QA returned:

- Profile same-parent absolute text collisions: 0;
- 18px text safe-area risks: 0;
- Q&A text collisions: 0;
- Q&A safe-area risks: 0.

### Three-scale evidence

- whole spread 500×354: PASS;
- reading spread 1000×708: PASS;
- Profile actual-size 794×1123: PASS after correction;
- post-promotion whole spread 1588×1123 render: PASS.

### Result

`DA VERIFIED_LOCAL / PREFERRED`.

Figma:

- DA `1612:2` — `PREFERRED / V6_INSIDE_DA_PROFILE_MEMORY_CAPTION_HIERARCHY_2026_08_17`;
- prior CZ `1609:2` — hidden rollback;
- Profile page `1612:3`;
- caption nodes `1612:32 / 1612:33 / 1612:34`.

## Observation 2 — Front postcard caption failed actual-size readability

### Visible problem

Outer AB's small rotated top-right Yokohama postcard was a legitimate support image, but its `YOKOHAMA SNAP / みなとみらい` caption was 9px dark text over the image. At actual size it was barely legible and visually weaker than the rest of the cover's editorial hierarchy.

### Root-cause hypothesis

The image role itself was valid; the defect was contrast and type scale. A small native caption can remain inside the photo if it gains enough contrast and actual-size readability, avoiding another card/label container.

### Bounded test

Rollback-safe Outer AC `1614:2` changed only `V6_A_SKYLINE_CAP`:

- 9px → 10.5px;
- dark fill → white;
- moved slightly inside the lower postcard image area;
- added a restrained dark text shadow for photo contrast.

No image geometry, image hashes, masthead, main hero, feature hierarchy, back cover, timeline, or factual copy changed.

### Three-scale evidence

- whole outer 500×354: PASS;
- reading outer 1000×708: PASS;
- front actual-size 794×1123: PASS;
- front same-parent absolute text collisions: 0;
- front 18px text safe-area risks: 0.

### Result

`AC VERIFIED_LOCAL / PREFERRED`.

Figma:

- AC `1614:2` — `PREFERRED / V6_OUTER_AC_SKYLINE_CAPTION_READABILITY_2026_08_17`;
- front `1614:47`;
- modified caption `1614:58`;
- prior Outer AB `1607:2` — hidden rollback.

## Final live state

- Outer AC `1614:2`;
- Profile/Q&A DA `1612:2`;
- Story/Chronology CY `1601:81` retained unchanged;
- Start Here: `V5 FU/FX · V6 AC + DA/CY INSIDE STUDIES · V7 HOLD`.

V7 was not edited.

## Asset lifecycle truth

- newly generated images: 0;
- generated section assets adopted: 0;
- new Drive saves: 0;
- new external binary placements: 0;
- new raster bytes: 0;
- image hash changes: 0;
- replaceable photo geometry changes: 0;
- native caption edits: YES;
- rollback preserved: YES;
- three-scale screenshot QA: PASS.

## Status

`V6 AC + DA/CY = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_CAPTION_HIERARCHY_VERIFIED / NATIVE_TEXT_EDITABLE / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.
