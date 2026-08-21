# Rurubu shared-learning append — 2026-08-21

## RSL-176 — Full-bleed expansion must revalidate both photographic tension and inherited text metrics

Source scope/item: Rurubu WEDDING / V6 Outer IU

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

### Visible problem

IQ was already photo-led, but the front still read as a header/photo/lower-field stack. A clean-room full-bleed expansion was tested to make the destination photograph carry the cover continuously.

### Root-cause hypothesis

Making a photograph larger is not intrinsically more editorial. A materially changed image aspect can over-expose low-information sky/ground, and typography resized for the new composition can silently inherit fixed line-height or text-frame metrics from the old role. The result can be a larger but weaker photo plus clipped display type.

### Bounded test

- duplicate IQ `2099:2` → IU `2124:2`;
- first pass expanded the Yokohama hero to full 1123 px height and enlarged `横浜`;
- first visual pass rejected: sky field became too dominant and destination text clipped because inherited line-height remained 25 px;
- repaired pass used hero height 973 px, a 150 px closing strip, destination 100 px / 104 px line-height, and retained the overlapping support photo.

### Expected improvement

A more continuous magazine-cover reading without mistaking geometric enlargement for stronger composition.

### Regression risk

Blind full-bleed conversion can weaken focal density, remove useful closing information space, produce unreadable text-on-image zones, or clip type through inherited fixed metrics.

### Three-scale evidence

- whole spread / 500 px: PASS
- reading / 1400 px: PASS
- actual / 1587×1123: PASS
- front native text: 9
- front IMAGE-fill nodes: 3
- text intersections: 0
- 18 px safe risks: 0

### Figma / Drive / GitHub evidence

- Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted IU: `2124:2`
- hidden rollback IQ: `2099:2`
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IU-IV-OUTER-MEMORY-EDITORIAL-QA-2026-08-21.md`

### Failure fingerprint

`F-RSL-176-FULL-BLEED-WITHOUT-CROP-TYPE-METRIC-REVALIDATION`

If another experiment enlarges a dominant image and display type together, require fresh crop/focal-density review and fresh actual-size text-metric review. Do not retry by merely enlarging again.

### What must remain Rurubu-specific

Do not transfer the Yokohama photograph, るるぶ-like masthead treatment, exact cream strip, pink/yellow/cyan palette, cover copy, coordinates, crop, or feature-number treatment.

### Cross-item applicability hypothesis

On another print artifact, when converting a bounded hero into a materially larger photo field, independently revalidate both the new photographic information distribution and any inherited fixed line-height/text-frame metrics. This is a QA method, not a full-bleed style rule.

---

## RSL-177 — Dense metadata can remain useful without being split into equal utility cells

Source scope/item: Rurubu WEDDING / V6 Memory Spots IV

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

### Visible problem

IH's right-page closing photograph was strong, but the page ended with six equal small information blocks in a 3×2 arrangement. The facts were useful; their equal geometric treatment made the ending read like a dashboard immediately after a photo-led editorial beat.

### Root-cause hypothesis

The UI-like impression came from repeated equal role geometry, not from the facts themselves. When metadata is short, parallel and secondary, it may work better as one compact typeset tail attached to the dominant content rather than six individually addressed modules.

### Bounded test

- duplicate IH `2077:2` → IV `2127:2`;
- enlarge Spot 04 from 750×490 to 750×515;
- keep the existing yellow guide cue attached to the image edge;
- reveal the existing native two-line `BEST TIME / MOOD / PHOTO / CAFE / SUNSET / TABLE` copy;
- hide, not delete, the six equal `GUIDE_INFO_1…6` blocks.

### Expected improvement

Preserve editorial density and factual usefulness while removing the visual cadence of six equal utility cells.

### Regression risk

Flattening metadata into one line can hurt scanability when values are long, heterogeneous, interactive, or independently actionable. The method should be rejected if comprehension worsens at reading scale.

### Three-scale evidence

- whole spread / 500 px: PASS
- reading / 1400 px: PASS
- actual / 1587×1123: PASS
- whole-spread native text: 27
- IMAGE-fill nodes: 4
- text intersections: 0
- 18 px safe risks: 0

### Figma / Drive / GitHub evidence

- adopted IV: `2127:2`
- hidden rollback IH: `2077:2`
- image hashes unchanged
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IU-IV-OUTER-MEMORY-EDITORIAL-QA-2026-08-21.md`

### Failure fingerprint

`F-RSL-177-SECONDARY-METADATA-AS-EQUAL-UTILITY-GRID`

When short secondary facts create a dashboard/grid ending after a strong editorial beat, test one attached continuous metadata tail before adding more boxes, badges or separators.

### What must remain Rurubu-specific

Do not transfer the 03/04 numbering, dining photograph, Spot labels, exact metadata vocabulary, dimensions, colors or right-page composition.

### Cross-item applicability hypothesis

Another print item may test whether short parallel secondary facts can be grouped into one typeset information tail while preserving scanability. Equal cells remain valid when they carry genuinely independent or interactive roles; this is not a blanket anti-grid rule.