# 2026-08-12 — Rurubu DF photo-as-architecture profile feature

Scope: Rurubu WEDDING only.

## Observation

Even after card reduction, an inside profile page can still feel like a form when the photographs merely sit above a regular question grid. In DE, the Q&A hierarchy was improved, but at thumbnail scale the profile photography still did not define the page strongly enough.

## Reusable principle

When identity-safe profile photography is already visually useful, let the photographs become the composition: one large edge-to-edge crop, one materially different overlapping crop, and native Japanese headline typography placed into intentional negative space created by those crops. Use rules and accent colors as reading anchors, not containers.

For lower-page Q&A, one dominant pull-quote plus two compressed side notes creates more editorial rhythm than three equal modules. When a number is enlarged, remove inherited micro-labels that become redundant before adding anything new.

## Experiment and evidence

DF `899:2` was created as a rollback-safe duplicate of DE `894:2`. The first restructuring caused the groom photo to occlude the start of `ふたりのプロフィール`; screenshot QA rejected that intermediate state. The groom crop was narrowed, the headline was moved into the cream text-safe field, and z-order was corrected. Structural QA then found the enlarged Q1 numeral colliding with the inherited `BU_Q1_B_MICROLABEL`; that micro-label was removed from effective visibility.

Final DF evidence:
- Review snapshot `904:2`
- visible native text `53`
- same-parent text intersections `0`
- fold guide `899:283` = `2 × 1122.5` at x `792.7000122070312`
- six production image hashes unchanged
- thumbnail / reading / actual-size QA all passed
- Current `77:18 / 77:290` untouched

## Adoption

ADOPTED as the strongest inside comparator. DE remains preserved as rollback/study evidence. Start/Review navigation now points to `DB outer / DF inside`.

## Next use

Apply the same hierarchy logic to future magazine/profile spreads: photograph → Japanese display type → pull quote → support notes. Do not preserve legacy header strips, tiny icon decoration, or equal-module geometry unless they still improve the reading path after the photographs are given proper scale.
