# RSL-224 — effective PPI is a final-size property, not a source-pixel badge

Date: 2026-08-22
Scope: Rurubu WEDDING only
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible / production problem

The current V8 Outer still uses the abstract `ocean-light` support image while a destination-specific OUTER-01 photograph is pending. The Drive master counterpart is `1600×1200 px`, but source pixel dimensions alone do not say whether an image is sufficiently resolved for the final printed role.

## New professional evidence

Adobe's current Photoshop print guidance treats `300 ppi` as the standard high-quality print target, subject to the printer's own requirement. Adobe InDesign guidance likewise distinguishes actual resolution from **effective PPI at the final placed size** and recommends checking effective PPI rather than assuming a high source pixel count is enough.

This is used as a **comparison / production-preflight hypothesis**, not as printer authority. Exact printer specifications still override it.

## Local measurement

Working physical spread geometry remains `420×297 mm` for a `1587.4×1123` Figma spread.

Current V8 Outer image role `2273:36` is approximately `647×386` Figma units, equivalent to about `171×102 mm` at the current working physical geometry.

Drive master counterpart:
- Drive ID: `1L5bMXy7IhPWGgIH6yDJ9mzOpveFYTZYB`
- title: `v8_ocean_light_essay_master.png`
- measured pixels: `1600×1200`

If that Drive master were used 1:1 in the current hero footprint, width would be the limiting axis:

`1600 px / (171 mm / 25.4) ≈ 237 ppi`.

A `300 ppi` comparison gate at the same physical width needs about `2025 px` of **usable pixels after crop**. To retain the existing OUTER-01 brief's roughly 15% crop tolerance, the next master target is conservatively set to **long edge >= 2400 px** before a candidate is considered production-comparable.

## Provenance boundary

The existing Drive master and Figma image hash are counterpart provenance facts; exact byte identity has **not** been proven. Therefore `237 ppi` is not asserted as the current Figma node's measured effective PPI. It is a concrete warning derived from the verified Drive counterpart if used at the current role size.

This distinction was explicitly corrected in the Figma print-gate panel after the first wording could be read as stronger provenance than was actually verified.

## Figma evidence

New bounded companion panel:
- page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
- panel: `2277:2 / V8 / PHOTO ART DIRECTION / OUTER-01 / PRINT PHOTO GATE / 2026-08-22`
- status: `TEST_GATE / NOT PRINT READY`
- production spreads changed: `0`

The panel records:
- Drive master counterpart: `1600×1200`
- current role physical estimate: `~171×102 mm`
- conditional counterpart effective resolution: `~237 ppi`
- new OUTER-01 usable-width gate: `>=2025 px`
- crop-reserve master target: `>=2400 px long edge`
- explicit printer-authority boundary
- explicit byte-identity-not-proven boundary

Screenshot QA of the panel passed after the provenance wording correction.

## Failure fingerprint

`F-RSL-224-SOURCE-PIXEL-DIMENSIONS-ARE-TREATED-AS-PRINT-QUALITY-WITHOUT-FINAL-SIZE-OR-PROVENANCE`

Symptoms:
- calling an image 'high resolution' from `1600×1200` or similar dimensions alone;
- no physical placement size in the acceptance criteria;
- no crop reserve in the resolution calculation;
- treating a Drive counterpart and a Figma image hash as byte-identical without proof.

Root cause:
- screen-oriented asset QA replacing print-oriented effective-resolution QA;
- provenance facts being collapsed into one assumed asset identity.

Corrected method:
1. measure / confirm source pixel dimensions;
2. derive physical role size from the working print geometry;
3. calculate effective PPI on the limiting axis;
4. include expected crop reserve;
5. keep printer specification as final authority;
6. keep Drive ID, Figma image hash, and exact-byte proof separate.

## Promotion boundary

The **measurement method** is verified locally and may be useful across print items. The numeric `300 ppi`, `2025 px`, and `2400 px` thresholds are not permanent project rules: they depend on final printer requirements and role geometry.

Do not promote this to `PROMOTED_PROJECT_RULE` until materially different print roles validate the method and printer requirements are known.