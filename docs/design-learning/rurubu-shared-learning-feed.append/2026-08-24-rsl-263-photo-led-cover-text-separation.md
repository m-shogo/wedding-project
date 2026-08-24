# RSL-263 — Cover photo is forced into text-background role without testing an independent image read

Date: 2026-08-24
Source scope/item: Rurubu WEDDING / V8 Outer
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Fingerprint: `F-RSL-263-COVER-PHOTO-IS-FORCED-INTO-TEXT-BACKGROUND-ROLE-WITHOUT-TESTING-INDEPENDENT-IMAGE-READ`

## Professional research observation

New reference rotation focused on magazine-cover art direction. Useful principle observed: photography and display type do not have to occupy the same layer. When a photograph is meant to carry the visual argument, professional editorial practice may allow the picture to read independently; when an overlay is conceptually necessary, it remains valid. The transferable decision principle is therefore to test the editorial job, not copy the surface style.

This observation was not promoted directly. It was tested locally in live Rurubu V8 first.

## Visible problem

V8 AV3 `2431:2` retained one large destination-photo essay role, but `FRONT_HEAD` sat directly on the continuous-tone image. The photo therefore had two simultaneous obligations:

1. carry destination / travel-desire evidence;
2. provide a high-contrast text-safe zone for a large white display headline.

That second obligation can distort future photo selection and cropping, especially when the legitimate final photograph has strong detail, faces, architecture or tonal variation where the overlay needs to sit.

## Root-cause hypothesis

The layout inherited an assumption that a magazine/book cover photo should double as a text background. That is not automatically an editorial requirement. If the photograph's semantic job is strong enough, separating display typography may improve photographic responsibility and reduce text-safe-zone constraints without sacrificing whole-item impact.

## Bounded experiment

AV5 `2456:2` cloned AV3 and changed only the image/type relationship:

- photograph, crop and hash unchanged;
- existing `FRONT_HEAD` moved below the photograph and recolored from white to existing V8 navy;
- existing `FRONT_DECK` and `FRONT_CAPTION` moved downward with it;
- all character strings unchanged;
- no new graphics, cards, labels, shadows or images.

Earlier photo-free AV4A/AV4B experiments remained rejected evidence, so this test explicitly retained photography.

## Three-scale evidence

- whole-item / 500px: PASS; destination recognition and travel desire retained, image reads more independently;
- reading / 1400px: PASS; hierarchy reads `横浜 → photo → display line → deck`;
- actual-size / 1587×1123: DESIGN QA PASS;
- structure: native text `11`, IMAGE `1`, text intersections `0`, 18px edge risk `0`;
- current V7/V8 root overlap after promotion: `0`.

## Corrected method

When a photo-led print role uses large overlay text, do not automatically refine overlay contrast or demand an artificial safe zone from future photography. First run one rollback-safe comparison where the image reads independently and the supporting display type moves to its own field. Promote only if the whole-item/page/actual-size comparison remains stronger.

## Regression risk / limits

This is **not** a rule to ban text over photography.

Overlay type can be the correct concept when:

- the image was art-directed with intentional negative space;
- type/image collision is the editorial idea;
- a cover line must function at newsstand distance;
- removing the overlay weakens identity, navigation or impact.

A no-overlay treatment can also turn into a timid photo block or empty luxury whitespace. The comparison must be role-specific.

## What remains V8-specific

Do not transfer:

- AV5 coordinates;
- navy/cream palette;
- current type sizes;
- `横浜` masthead/destination treatment;
- exact photo dimensions;
- exact below-image spacing.

Only the QA question transfers.

## Truth boundary

The AV5 photograph remains a STRUCTURAL PHOTO DUMMY. This test verifies image/type responsibility only; it does not verify destination source truth, final crop, effective PPI or print readiness.

## Evidence

- Figma current: `2456:2 / V8 AV5`
- hidden rollback: `2431:2 / AV3`
- authority page: `2052:2`
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-AV5-PHOTO-LED-TEXT-SEPARATION-QA-2026-08-24.md`
- Drive V8 authority: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`

## Next receiving experiment

Before cross-item promotion, test the method on a materially different photo-led print role where the current overlay genuinely constrains image choice. A receiving item should be free to conclude the opposite — that overlay type is necessary — if whole-item evidence supports it.
