# Wedding Asset Generation Memory

Date: 2026-08-02
Status: `CURRENT PROJECT MEMORY`
Scope: all generated still images, textures, illustrations, maps, decorative assets, and temporary Figma dummy photography used for the wedding project

## Purpose

This file remembers how assets should be planned, generated, judged, stored, replaced, and reused across wedding items.

The objective is not to generate many images. It is to create the correct asset for a defined editorial role and carry it safely from generation to Drive, Figma, QA, and final replacement.

---

## 1. Fixed project boundaries

Theme:
- travel

Wedding date:
- 2026-10-24

Core visual preferences:
- warm, celebratory, thoughtful, edited by a human
- travel authenticity without copying a real brand
- print-oriented rather than app/dashboard-oriented
- controlled color, strong photography, readable Japanese type

New bride palette preferences that may be used where appropriate:
- mint green
- green
- blue
- silver
- sparkle

Do not force these colors into every item. Each item or version may define its own controlled palette.

---

## 2. Human and identity policy

Final personal imagery should use real photographs or real video for:

- bride and groom
- family
- friends
- the dog
- identifiable personal events and memories

Generated people may appear only as clearly temporary, identity-neutral editorial dummies when needed to judge layout.

Identity-neutral means one or more of:

- back view
- distant figure
- silhouette
- hands or partial body
- face softly obscured
- environment is the main subject

Never present a generated face as the actual bride, groom, family member, friend, or guest.

Every generated-person dummy must be replaced or explicitly approved before final production.

---

## 3. Role-first generation brief

Before generation, record:

- item and version
- semantic role
- target Figma node or planned node name
- intended final size and aspect ratio
- dominant subject
- composition and eye flow
- required negative/text-safe space
- time of day and lighting
- palette relation to neighboring assets
- allowed human presence
- prohibited content
- replacement plan: final real photo, generated final, or decorative asset

Do not begin with a generic prompt such as `beautiful travel wedding image`.

---

## 4. Prompt construction

A production prompt should include:

1. medium and realism level
2. editorial purpose
3. location/environment
4. dominant subject
5. camera position and crop
6. lighting and time of day
7. negative space requirement
8. neighboring-page color relationship
9. prohibited artifacts
10. no baked-in text/logo/watermark rule

Prompt pattern:

```text
Create a [medium/realism] image for [item/version and semantic role].
The editorial purpose is [purpose].
Scene: [environment and subject].
Composition: [camera, crop, direction, negative space].
Light/palette: [light and color relationship].
People: [allowed/absent/back-view/distant].
Avoid: [specific defects].
No readable text, logos, brands, or watermarks.
```

Use role-specific prompts rather than changing only one noun across a batch.

---

## 5. Generation-set coherence

A set should feel edited, not cloned.

Check both consistency and variation:

Consistent:
- overall realism
- color family
- contrast range
- print suitability
- absence of logos/text

Varied:
- camera distance
- image ratio
- time of day where narratively useful
- subject type
- visual direction
- density

Reject a set where every image has:
- the same sunset
- the same orange/teal grade
- the same centered subject
- the same shallow depth of field
- the same generated-person pose

---

## 6. Visual QA before Drive acceptance

Inspect every generation for:

- exact semantic role fit
- correct aspect ratio or safe crop range
- usable text-safe area
- sharpness and detail
- plausible hands, objects, architecture, horizon, reflection, and perspective
- no duplicate or melted objects
- no readable accidental text
- no visible logo or watermark
- no false personal identity
- compatibility with the full page/spread
- distinct purpose versus other accepted assets

A technically attractive image that does not fit the target role is rejected.

---

## 7. Drive naming

Master filename pattern:

```text
<ITEM>_<VERSION>_<ROLE_NUMBER>_<SEMANTIC_ROLE>_MASTER.<ext>
```

Examples:

- `RURUBU_V6_01_COVER_HERO_RESORT_PANORAMA_MASTER.png`
- `ESCORT_V2_03_BOARDING_GATE_BACKGROUND_MASTER.png`
- `PASSPORT_V3_07_MENU_TRAVEL_STILL_LIFE_MASTER.png`

Derivative filename pattern:

```text
<MASTER_STEM>__FIGMA_<WIDTH>x<HEIGHT>_<FORMAT_QUALITY>.<ext>
```

Do not use ambiguous names such as:
- `final2.png`
- `good.png`
- `image_latest.jpg`

---

## 8. Drive-first acceptance

After visual acceptance:

1. save to the correct `10_GENERATED_MASTERS` folder
2. list/read back the folder
3. record exact Drive file ID
4. record filename and available size/dimensions
5. mark whether the asset is dummy or final
6. only then prepare a Figma derivative

An image visible in the chat or local runtime is not project memory until Drive readback and Git recording are complete.

---

## 9. Master versus derivative

Master:
- highest accepted quality
- stored in Drive
- never overwritten by transfer compression
- source for later print recalculation

Figma derivative:
- resized for target role and transport limits
- stored separately when useful
- sufficiently large for crop flexibility and visual quality
- may use JPEG for photography and PNG for transparency/graphic assets

A derivative that imports but looks pixelated is rejected. Import success proves only the transport path.

---

## 10. Transparent decorative assets

Preferred workflow when transparent PNG is needed:

1. generate on a solid chroma background only when it improves extraction reliability
2. preserve clean internal whites and light colors
3. remove chroma in a controlled local process
4. verify alpha channel
5. verify no visible chroma edge remains
6. inspect against light and dark backgrounds
7. save accepted transparent master to Drive

Do not repeatedly regenerate an already accepted asset because the post-processing step was forgotten.

SVG is not automatically preferable. Use editable Figma vectors for simple native shapes; use transparent PNG for detailed raster decoration when that is the project standard.

---

## 11. Text, numbers, and logos inside generated images

Default rule:
- do not ask the image model to render final Japanese text, dates, names, page numbers, tickets, passport data, or logos

Instead:
- create text natively in Figma
- create simple marks and vector labels natively
- use generation for atmosphere, illustration, texture, or non-text visual content

Exceptions require deliberate QA and must not imitate protected or real transport/brand credentials.

---

## 12. Reference-image boundary

Reference images may be used to analyze:

- hierarchy
- crop
- density
- typography relationships
- map logic
- material and lighting
- palette distribution

Do not:

- use a copyrighted magazine scan as final art
- trace a commercial spread
- copy exact title silhouettes
- copy proprietary maps or illustrations
- upload reference images into a production-assets folder as though they were owned assets

Record source links and extracted principles instead.

---

## 13. Reuse policy

May reuse across items when appropriate:
- project-wide design knowledge
- prompt patterns
- QA rules
- native icon systems
- approved generic texture or vector system when explicitly shared

Do not automatically reuse:
- photographs generated for another version
- image hashes
- crop decisions
- hero composition
- decorative asset just because it already exists

New clean-room versions require new image-generation decisions and normally new masters.

---

## 14. Failure memory

Known failure patterns:

### Generated but workflow stopped

Cause:
- generation treated as the task endpoint

Correction:
- generation is one state in a longer lifecycle
- the task continues through Drive, Figma, screenshot QA, ledger, and Git

### Duplicate generations

Cause:
- accepted-role state not recorded before the next call

Correction:
- consult the register before generating
- generate only missing or explicitly rejected roles

### Low-quality Figma import

Cause:
- derivative compressed for payload rather than visual role

Correction:
- keep high-quality master
- derive to role-appropriate dimensions
- inspect at whole spread and actual-size detail

### Dummy person looks like the real couple

Cause:
- recognizable generated portrait used as layout filler

Correction:
- use identity-neutral framing or non-human atmosphere
- mark and replace before final production

### AI-like visual uniformity

Cause:
- same lighting, crop, color grade, and prompt structure across all images

Correction:
- define distinct semantic roles and controlled variation

### Accidental text/logo artifacts

Cause:
- prompts did not explicitly prohibit them or QA was skipped

Correction:
- prohibit in every prompt and inspect at high zoom

---

## 15. Evidence register

Use:
- `docs/templates/wedding-generated-asset-register.csv`

Minimum evidence per asset:

- role ID
- item/version
- prompt version
- generation date
- acceptance state
- Drive master ID
- derivative details
- Figma target node
- image hash where applicable
- screenshot QA
- final replacement requirement
- rejection reason or lesson

---

## 16. Mandatory pre-generation check

Before every generation call:

- confirm item/version
- read this memory
- read item Current Status and asset register
- confirm the role is actually missing or rejected
- define aspect ratio and target crop
- define human/identity rule
- define negative space
- define prohibited artifacts
- confirm the Drive destination folder
- plan what happens immediately after generation

Generation without a planned next step is not allowed for production work.
