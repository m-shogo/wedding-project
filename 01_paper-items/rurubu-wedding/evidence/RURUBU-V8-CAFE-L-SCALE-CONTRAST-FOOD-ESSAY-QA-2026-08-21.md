# Rurubu WEDDING V8 — Cafe/Table L Scale-Contrast Food Essay QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current root after promotion: `2183:2`
Previous current / rollback: `2178:2` hidden

## Visible problem

V8 Cafe/Table I was structurally clean but visually too even and too quiet. Both pages relied on medium-size type surrounded by large neutral fields, so the spread read as a competent wireframe/book placeholder rather than a deliberately paced food editorial spread. This was especially weak at thumbnail scale.

The generated TABLE_ESSAY master remained hidden because its abstract circles/blocks did not carry enough food/place/sensory meaning to justify a visible image role.

## New professional research applied

- Eye Magazine's review of Aperture notes that stronger editorial pacing came from deliberately changing picture scale, white space, and article tempo instead of maintaining an even visual flow.
- magCulture's review of The Gourmand #11 highlights an intentionally unfussy text-led page living inside an issue that also contains much more flamboyant photography; quietness works when it is part of a larger pacing system, not when every page has the same visual weight.
- David Lane's The Gourmand interview describes text and imagery as independent editorial ideas and stresses strong size decisions: imagery should be meaningfully big or meaningfully small rather than defaulting to a middling treatment.

Rurubu-specific hypothesis: while new destination/food photography is unavailable, Cafe/Table can still improve by giving its actual reader-facing editorial thesis a much stronger scale role and increasing contrast between headline, sensory notes, closing copy, and the night-side page.

## Bounded Figma test

Created rollback-safe study `2183:2` from current I, without enabling the rejected/weak generated TABLE_ESSAY image.

Changes:

- enlarged the left editorial thesis `食べたものより、食卓を覚えている。` from 48px to 64px with a wider two-line field;
- reduced the sensory list from medium display text to a smaller 26px supporting rhythm;
- extended the functional rule and moved the closing text into a quieter secondary position;
- increased the pale `04` index to a much larger background-scale folio role while keeping it low-opacity;
- enlarged the right-page `料理、皿、手元、店の空気。` from 38px to 52px;
- strengthened the dinner rule width and increased the scale of the concluding `夜の横浜を、ゆっくり味わう。`;
- enlarged the pale `夜` index to create a different, slower lower-page mass;
- added no new cards, shadows, gradients, decorative English, unrelated photos, or generated-image substitutions.

## Three-scale visual QA

- whole spread / 500px: PASS — the spread now has a clear first read and stronger left/right scale contrast; it no longer reads as two equally quiet wireframe pages.
- reading / 1400px: PASS — Japanese headline line breaks remain intentional and the support copy stays subordinate.
- actual size / 1587×1123: PASS — hierarchy survives at native spread size without creating fake-image slots or unreadably small support text.

## Structure QA

- visible native text: `13`
- visible IMAGE roles: `0`
- text intersections: `0`
- 18px safe-area risks: `0`
- whole-page flattening: `0`
- rejected/legacy generated TABLE_ESSAY role remains hidden

## Promotion

Study `2183:2` promoted to current as:

`V8 CLEANROOM L / BOOK EDITION / CAFE+TABLE / SCALE-CONTRAST FOOD ESSAY / CURRENT / 2026-08-21`

Previous I `2178:2` preserved as hidden rollback at a distant canvas position.

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new Figma image placement: `0`
- V6/V7 image reuse: `0`

This run does not claim generation → Drive → Figma closure. No unrelated or semantically weak image was substituted to satisfy an image quota.

## Learning state

`RSL-193 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Fingerprint:

`F-RSL-193-QUIET-PAGE-WITHOUT-SCALE-CONTRAST-READS-AS-WIREFRAME`

Generalizable candidate: a quiet editorial page still needs intentional hierarchy and pacing. When image authority is unavailable, do not fill space with fake-image modules; first test whether meaningful native copy can create a more deliberate hierarchy through strong size contrast, asymmetric mass, and controlled white space.

Do not transfer: exact Rurubu copy, pale index numbers, spacing, color, type sizes, coordinates, or the decision to remain image-less.
