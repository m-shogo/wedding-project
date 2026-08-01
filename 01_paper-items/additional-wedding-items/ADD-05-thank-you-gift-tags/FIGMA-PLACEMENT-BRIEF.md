# ADD-05 サンキュータグ / プチギフトタグ — FIGMA PLACEMENT BRIEF

Status: `CURRENT / PREPARED_FOR_FIGMA`
Authority: GitHub `main`
Date: 2026-08-02

## Entry condition

Do not begin until Current authority permits Figma work for additional items. Do not modify the four completed core-item files.

## Recommended file/page

Create or use the dedicated additional-items Figma file, then add:

- page: `ADD-05_THANK_YOU_GIFT_TAGS`
- section: `01_SINGLE_MASTERS`
- section: `02_SIZE_COMPARISON`
- section: `90_ACTUAL_SIZE_QA`
- section: `99_IMPOSITION_DERIVATIVES`

The single master is authoritative. Imposition frames are derivatives.

## Build order

1. Create exact 50 × 80 mm front frame.
2. Add provisional 3 mm bleed, 5 mm safe inset and punch-clearance guides.
3. Place hole first; compose typography around the physical attachment point.
4. Build native text hierarchy for gratitude and date.
5. Draw one asymmetric native journey path and one endpoint.
6. Evaluate front-only composition before adding a back.
7. Add optional back only when `Have a safe trip home.` materially improves the object.
8. Create 45 × 70 mm comparison by editorial reflow, not proportional scaling.
9. Capture whole-tag and high-resolution actual-size screenshots.
10. Correct evidence-based defects before documenting QA.
11. Build imposition only after final size and printer are known.

## Primary composition

- hole at upper area, offset only when punching tolerance supports it
- gratitude occupies the upper-middle visual field
- secondary phrase is smaller and wider, not a same-size stacked block
- date sits near the route endpoint
- route enters from one trim edge and terminates inside the page
- one narrow metallic rule may balance the string axis
- preserve a calm lower field; do not fill every corner

## Variant decision

### Front-only

Preferred when:

- gift packaging hides the back;
- cost or duplex registration is risky;
- the tag frequently rotates;
- the safe-trip sentence would duplicate the front.

### Front + back

Use when:

- both sides remain visible;
- duplex registration is verified;
- the back adds a genuine farewell moment;
- optional approved names can be placed without crowding.

## Semantic-node preservation

Use exact semantic names from `SPEC.md`. Guides and QA overlays must remain separate from production artwork. Never flatten text and route into one image.

## Screenshot QA targets

Capture:

1. front whole frame;
2. optional back whole frame;
3. front/back pair;
4. 50 × 80 and 45 × 70 comparison;
5. 100% actual-size preview with punch guide visible;
6. final production view with QA guides hidden.

Inspect:

- punch/text collision;
- route/text collision;
- low-contrast silver lines;
- accidental boarding-pass resemblance;
- excessive symmetry or centered-template feel;
- tiny typography that looks acceptable only when zoomed;
- blank or unusable back when the tag rotates.

## Evidence-driven correction examples

- If the knot hides `Thank you`, move copy—not the hole—unless physical punch testing permits it.
- If the route dominates at actual size, shorten or thin it rather than adding more decoration elsewhere.
- If silver disappears in print proof, increase value contrast or remove it; do not simulate foil with noisy gradients.
- If 45 × 70 loses breathing room, reject that size rather than shrinking all type.
- If the back is rarely visible, remove it and improve the front-only object.

## Completion state after Figma QA

Allowed status:

`DESIGN_QA_PASS / ATTACHMENT_AND_PRINT_PROOF_PENDING / NOT_PRINT_READY`

Do not declare `COMPLETED` or `PRINT_READY` from screenshots alone.
