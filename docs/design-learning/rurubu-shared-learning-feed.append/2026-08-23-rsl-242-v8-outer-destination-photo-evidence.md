# RSL-242 — Cover restraint must not substitute abstraction for required place evidence

Date: 2026-08-23
Source scope/item: Rurubu WEDDING / V8 Outer
State: `TESTED_LOCAL`

## Fingerprint

`F-RSL-242-RESTRAINED-OUTER-USES-ABSTRACT-PLACE-PROXY-WHEN-COVER-ROLE-NEEDS-DIRECT-DESTINATION-EVIDENCE`

## Visible problem

V8 Outer AV was coherent and typographically disciplined, but its only front visual was an abstract generated/composed ocean-light field. Common-scale comparison with the frozen V6 Outer and V7 Outer showed that the V8 front still required the reader to infer destination atmosphere instead of receiving direct place evidence.

## Root-cause hypothesis

Book-design restraint had been treated too closely as image restraint. For a cover whose editorial job includes destination identity, an abstract proxy may become absence rather than quiet pacing. One independently replaceable, role-owned photograph may supply the missing place evidence without importing collage grammar or high-energy travel-magazine modules.

## Professional observation used

Fresh research this run separated observation from project learning:

- Studio Yukiko describes `Flaneur` as a formative editorial experiment in working with cities/people and asking what design can add to narrative.
- Tokyo Art Book Fair describes Studio Yukiko's editorial work as weaving a visual narrative layer into books/magazines rather than treating design as neutral scaffolding.
- Gerhard Steidl's Book Award Japan comments argue that format/design/paper/printing/binding should serve the particular story/content, while warning against imitation and encouraging an own language.

These are observations, not project rules.

## Bounded experiment

- before: V8 AV `2273:24`, abstract front image hash `be21a846e961b3a13c24c7476f6a01b12b8d07ff`
- candidate/current: AV2 `2347:2`
- changed role only: `2347:14 / PHOTO_DUMMY / OUTER_DESTINATION_ESSAY_REPLACEABLE / NOT FINAL`
- dummy hash: `539c259be8036b481d06b4f76db9a39b407d90e8`
- placement: `647×386`
- native/factual copy changes: none
- added cards/badges/gradients/collage modules: none
- old AV preserved as hidden rollback `2273:24`

## Expected improvement

Immediate destination recognition and travel desire at thumbnail scale, while preserving V8's book-like calm, one-image front, editable typography and asymmetric front/back pacing.

## Regression risk

- a generic or semantically weak photograph can become stock-tourism decoration;
- a low-resolution dummy can look acceptable at screenshot scale but fail print;
- adding photography repeatedly could erase V8's deliberate quiet tempo and converge toward V6/V7;
- a final image with poor text-safe zones could break native headline contrast.

## Three-scale evidence

- whole-item / 500px: PASS; AV2 stronger than AV within V8.
- reading / 1400px: PASS; destination → headline → deck sequence remains clear.
- actual-size / `1587×1123`: PASS for design structure.
- structural readback: native text `12`; IMAGE `1`; text intersections `0`; bounded 18px safe risks `0`.

## Why state remains TESTED_LOCAL

The image is an explicit structural dummy, not a new legitimate role-specific OUTER-01 source. Known source dimensions are insufficient to establish final print fidelity for this relatively tall crop, and exact printer/template/preflight/physical proof remain unresolved.

The **role/design hypothesis** is supported locally; the **real-content hypothesis** is not yet verified. Do not promote to `VERIFIED_LOCAL` merely because the screenshot improved.

## What must remain Rurubu-specific

Do not transfer:

- the `横浜` masthead scale;
- navy/cream palette;
- exact image box ratio or placement;
- Rurubu cover wording;
- V6/V7 comparison grammar;
- this particular waterfront dummy/hash.

## Cross-item applicability hypothesis

A future materially different publication may test whether a dominant abstract/atmospheric surrogate is withholding visual evidence that its cover's semantic job actually requires. The transferable test is **role evidence vs abstraction**, not “use a photograph on every cover.”

## Next verification

For Rurubu first: generate/select materially different legitimate OUTER-01 candidates, use the established contact-sheet/photo-editor gate, save the selected master to the exact V8 Drive authority, read back its ID, replace `2347:14`, verify hash/crop/effective PPI and repeat three-scale QA. Only then consider stronger local promotion.