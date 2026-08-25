# Rurubu V7 G10 Memory — asymmetric verified-photo evidence QA

Date: 2026-08-25
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
V6 control: frozen `JC + IX + JB + IZ + IT + JA`

## Why this pass existed

V7 G9 `2443:2` carried grounded native copy for `沖縄 → 韓国 → ハワイ → 横浜`, but its visual coverage still used unrelated structural dummies for multiple place roles. The page had already separated the grounded proposal note from one unverified photo, yet at whole-spread scale the one-image-per-place feeling could still imply documentary evidence that did not exist.

New professional input this run focused on travel-photo storytelling / picture editing: a travel story does not need the principal subject or a photograph for every beat; scene, people, detail and transition images should be selected for the specific story job. The Rurubu hypothesis was therefore not “remove photos,” but “do not simulate equal photographic evidence when source authority is asymmetric.”

## Bounded experiment

Rollback-safe G10 was created from G9, with all variable/grounded copy left native and unchanged.

Current after promotion:

- **G10 `2563:35`** — `CURRENT V7 MEMORY COMPARISON / VERIFIED_LOCAL_DESIGN / HIRES-PHOTO-BLOCKED`
- position: `x=10700 / y=13000`
- parent: `2052:2`
- visible: `true`

Rollback:

- **G9 `2443:2`** — `ROLLBACK / ... / PRE-ASYMMETRIC VERIFIED-PHOTO EVIDENCE / HIDDEN`
- `x=300000 / visible=false`

### Image-role changes

1. Opening Memory image `2563:39`
   - replaced generic structural dummy with verified real-couple Hawaii `036.jpg` screen derivative;
   - imageHash `c80602f1881db70f3a005651f982a0f38b294a9d`;
   - role explicitly states `NOT PROPOSAL-SPECIFIC / NOT FINAL PRINT`;
   - Figma intrinsic `350×233`, displayed `650×370`.

2. Guide Hawaii image `2563:56`
   - replaced generic structural dummy with verified real-couple Hawaii `004.jpg` screen derivative;
   - imageHash `b77012f2eb0a832acfe6fecd883775832ba029c6`;
   - role explicitly states `NOT PROPOSAL-SPECIFIC / NOT FINAL PRINT`;
   - Figma intrinsic `350×233`, displayed `420×250`.

3. Unverified secondary / Okinawa / Yokohama structural place dummies
   - withheld rather than letting unrelated images imply place evidence.

4. Fixed Memory display title remains unchanged and high-resolution enough for its current role:
   - imageHash `f310f1b1cd9521f6752f2f0b6d1792358c127921`;
   - intrinsic `2480×600`, displayed `620×150`.

### Composition change

The right page no longer forces image parity across all four places. `01 沖縄`, `02 韓国`, and `04 横浜` are allowed to remain typographic travel-guide beats. `03 ハワイ` receives the only verified place-related photo evidence in the guide rail. The large opening real-couple Hawaii photo gives the spread human/destination truth without claiming the photo documents the proposal itself.

No new card, pill, badge, gradient, shadow, fake map, invented place image, or factual copy was added.

## QA

### Whole item / thumbnail

- 500px: **PASS**
- G10 remains clearly V7 / high-energy Japanese travel-information editorial.
- Compared with G9, the spread has less “four places = four documentary photos” implication and less repeated-dummy/template feel.

### Reading scale

- 1400px: **PASS**
- 01–04 scan anchors remain strong.
- Korea / Hawaii / Yokohama form intentionally unequal beats rather than empty missing-photo slots.
- grounded proposal copy remains separate from photo-caption ownership.

### Actual-size/detail

- 1587×1123: **DESIGN COMPOSITION PASS / HIRES PHOTO QA BLOCKED**
- the 004/036 Figma derivatives are only `350×233`; softness is visible at detail scale.
- therefore G10 is not high-resolution photo approved and not print-ready.

### Structure

- visible native text: `20`
- text intersections: `0`
- 18px edge risks: `0`
- visible IMAGE roles: `3` including the fixed title; only two are photographic
- parent: `2052:2`

## Professional critique

- Art director: PASS — source-truth asymmetry becomes part of the idea instead of being hidden by filler photos.
- Editorial designer: PASS — scan rhythm survives without one photo per place.
- Book/publication sequence: PASS for V7 role — the Memory spread now differs more honestly from photo-saturated Outer/Profile beats.
- Typographer: PASS — native copy and 01–04 hierarchy remain intact.
- Photo editor: DESIGN PASS / HIRES BLOCKED — the two visible photos are verified Hawaii couple images but are not proposal-specific evidence and are low-resolution Figma derivatives.
- Print designer: BLOCKED — final role-sized high-resolution placement, printer template, preflight and physical proof remain required.

## Failure during production

The first G10 creation script used `structuredClone`, which is not available in this Plugin API runtime. The call failed atomically and made no canvas changes. Live state was re-read before retry. The method switched to explicit paint-object copying; the same unsupported method was not repeated.

## Adoption / truth state

`VERIFIED_LOCAL_DESIGN / HIRES-PHOTO-BLOCKED`

G10 is current V7 Memory design evidence, but neither `004` nor `036` is final print placement. No claim is made that either image depicts Okinawa, Korea, Yokohama, or the proposal event. Final legitimate place/event photography can still change crop, area and sequence.
