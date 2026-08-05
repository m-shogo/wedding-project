# V5 cover hero shadow subtraction

Date: 2026-08-05
Item/version: Rurubu WEDDING V5
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current outer candidate: `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`
Target: `77:148 / IMG_HERO`

## Visible problem

The dominant cover photograph still used a strong floating drop shadow (`radius 10`, `offset 0,5`, black alpha approximately `22%`). After surrounding cards, stickers, and redundant modules had been reduced, this remaining effect made the main photograph read as a raised UI card rather than the base editorial image plane.

## Tested principle

Attempt subtraction before adding decoration. A dominant magazine photograph should normally derive hierarchy from scale, crop, overlap, caption relation, and adjacent typography rather than a generic elevation effect.

Evidence level before the test: `DISCOVERED / prior related V5 shadow reductions verified on the back cover`.

## Hypothesis

Removing only the hero drop shadow would:

- reduce Web/UI-card appearance;
- make the photograph feel integrated into the printed page;
- preserve the cover hierarchy because the image remains dominant by size;
- avoid changing crop, semantic structure, native text, or rollback history.

Possible regression: the image edge could become insufficiently separated from adjacent content or the cover could lose useful depth.

Adoption evidence required:

- whole-outer screenshot renders successfully after the change;
- no blank area, clipping, masking failure, or text collision;
- exact semantic node, IMAGE fill, crop mode, dimensions, and image hash remain unchanged;
- V4 rollback frames and provisional fold guide remain present.

## Bounded change

Changed only:

- `77:148 / IMG_HERO`
- effects: one visible drop shadow → no effects

Preserved:

- node ID and semantic name;
- size `665 × 610`;
- IMAGE fill;
- scale mode `FILL`;
- image transform `[[1,0,0],[0,1,0]]`;
- image hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`;
- all native text and caption nodes;
- outer/inside V4 rollback nodes `59:2` and `59:178`;
- provisional fold guide `77:288`.

Rollback value retained in this record:

```json
{
  "type": "DROP_SHADOW",
  "visible": true,
  "radius": 10,
  "color": {"r": 0, "g": 0, "b": 0, "a": 0.2199999988},
  "offset": {"x": 0, "y": 5},
  "spread": 0,
  "blendMode": "NORMAL",
  "showShadowBehindNode": true
}
```

## Verification

Post-change screenshot render:

- node: `77:18`
- rendered: `1588 × 1123`
- natural candidate size: approximately `1587 × 1123`
- screenshot transport completed successfully

Post-change structure audit:

- hero remains visible and semantic;
- effects: `[]`;
- image hash and crop mode unchanged;
- outer native text nodes: `88`;
- non-native text replacements introduced: `0`;
- both V4 rollback frames present;
- provisional fold guide present.

## Result

`PROTOTYPED → VERIFIED / ADOPTED FOR V5 CURRENT`

The bounded subtraction removes an unnecessary elevation cue without changing the photograph, crop, text, semantic structure, or rollback evidence. It does not repair the known low-quality/intended-source provenance problem, so `PHOTO_ROLE_PASS`, intended-source counts, and the V6 start gate are unchanged.

## Failure / limitation

The dominant image itself still requires a verified high-quality Drive derivative and closed Drive ID → node ID → image hash evidence. This change must not be misreported as photo-source completion or print readiness.

## Reusable lesson candidate

For dominant editorial photographs, a generic drop shadow should be treated as optional rather than default. Test direct page integration first; retain elevation only when edge separation or intentional physical-object storytelling demonstrably requires it.

Status for project-wide promotion: `VERIFIED ON MULTIPLE V5 PHOTO ROLES / NOT YET AUTOMATIC GLOBAL RULE`.

## Next application

Stop broad decoration subtraction on the cover. Prioritize a binary-safe Batch A image-placement route and evidence closure. Until that path is available, continue only bounded typography, crop, duplicate-source, or structural defects that can be fully verified without changing asset provenance counts.
