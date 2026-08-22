# NRSL — Promote actual-size factual/required microtype QA to project rule

Date: 2026-08-22
Owner: non-Rurubu Figma quality-improvement task
State: `PROMOTED_PROJECT_RULE`
Failure fingerprint: `FACTUAL_MICROTYPE_LOOKS_FINE_ON_SCREEN_BUT_IS_TOO_SMALL_AT_PHYSICAL_SCALE`

## Promotion basis

The physical-unit QA method is now independently verified in three materially different non-Rurubu print artifacts:

1. ADD-12 新郎新婦クイズカード — A6 portrait factual date repaired from ≈5.76pt to ≈7.68pt.
2. ADD-13 メッセージカード — A6 landscape factual dates repaired from ≈5.69–5.99pt to ≈7.79pt.
3. ADD-05 サンキュータグ — tiny 50×80 / 45×70 confirmed body/date roles independently reproduced the same failure class and were repaired without art-direction regression.

The third verification is materially different from the first two because the object is a small attached gift tag, not an A6 card, and its semantic copy must remain readable while the item may rotate, sit under venue lighting, and use a real punch/attachment.

## ADD-05 receiving-item verification

Current Figma:

- file `kAdkOMuAMcFQtTSP8NtWil`
- 50×80 front `31:2`
- 45×70 front `31:10`
- optional 50×80 back `31:18`
- rollback `34:2 / 34:10 / 34:18`

Before repair under the verified `10 px = 1 mm` mapping:

- 50×80 body: `20px ≈ 5.67pt`
- 50×80 date: `22px ≈ 6.24pt`
- 45×70 body: `18px ≈ 5.10pt`
- 45×70 date: `20px ≈ 5.67pt`
- optional back date: `22px ≈ 6.24pt`

Bounded repair:

- 50×80 body `24px ≈ 6.80pt`
- 50×80 date `26px ≈ 7.37pt`
- 45×70 body `22px ≈ 6.24pt`
- 45×70 date `24px ≈ 6.80pt`
- optional back date `26px ≈ 7.37pt`

Fresh native screenshots preserve the selected `RIBBON FOLD` hierarchy and physical punch/ribbon/fold reading. Structure readback across all three Current variants: fixed-height text `0`, outside-root text `0`, text-text collision `0`, IMAGE fills `0`.

Drive authority was live-confirmed at `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`; Drive writes `0`; generated assets `0`.

Item evidence:

- `01_paper-items/additional-wedding-items/ADD-05-thank-you-gift-tags/FIGMA-ACTUAL-SIZE-CONFIRMED-COPY-LEGIBILITY-QA-2026-08-22.md`

## Promoted rule

For reader-facing **factual, confirmed, required, instructional or variable semantic microcopy** on a physical print artifact, Figma pixel size alone is not sufficient evidence of legibility.

Before calling actual-size/detail QA PASS:

1. confirm the intended physical paper/object dimensions when known;
2. derive the Figma canvas-to-physical scale;
3. convert suspicious semantic microtype to physical mm/pt;
4. distinguish required/reader-facing copy from optional decorative microtype;
5. judge robustness in context: typeface, weight, contrast, paper, print process, viewing distance, lighting, attachment/rotation and semantic importance;
6. if the role is unnecessarily fragile, make a bounded repair that preserves the art direction rather than globally scaling typography;
7. re-check native actual-size screenshot, semantic line breaks, dynamic/stress content where relevant, outside-root bounds, collision, trim/fold/punch/attachment interaction and hierarchy.

## Explicit non-rule

This is **not** a universal `8pt minimum`, and it does not authorize indiscriminate enlargement of all small copy. Tiny decorative English, folios, marks or optional metadata can legitimately differ when they are not required for comprehension and remain credible in the actual print context.

Exact pixel sizes, coordinates, palettes, typefaces and object geometry remain item-specific.

## Regression risk

Blindly enlarging microcopy can flatten hierarchy, cause wrapping, invade safe areas, collide with physical holes/folds, or make a small artifact feel clumsy. The promoted rule is therefore a **physical-unit audit and bounded-repair method**, not a fixed-size prescription.

## Next receiving behavior

Apply this rule during normal actual-size QA only when a live Current contains suspicious reader-facing microtype. Do not reopen stable items merely to manufacture a reproduction. Preserve prior structural/visual PASS evidence, but do not let screen zoom substitute for physical print judgment.
