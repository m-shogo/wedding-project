# Lesson — Recheck decorative clusters after subtraction

Date: 2026-08-03
Context: Rurubu WEDDING V5 front-cover date-badge area
Status: `TESTED / V5-ADOPTED / NOT-PROMOTED-GLOBALLY`

## Source

Live Figma outer-spread screenshot after the previously verified removal of the decorative plane icon near the date badge.

## Hypothesis

When one decorative element is removed, neighboring marks that formerly belonged to the same visual cluster may lose their purpose. Rechecking the cluster and subtracting newly orphaned residue should improve intentionality more than styling that residue again.

## Result

The remaining `77:285 / AUTH_MICRO_RULE` appeared as a detached blue line beneath the date badge. Hiding it improved the upper-right cover hierarchy without removing information or weakening the travel-magazine identity.

## Failure

The first bounded Figma write included `figma.commitUndo()`, which is unsupported in the current connector runtime. The script failed atomically, so no partial mutation occurred. The unsupported call was removed before the successful write.

## Adopted or rejected

- V5 current change: `ADOPTED`
- blanket removal of micro-rules: `REJECTED`
- reusable candidate principle: `TESTED`, not yet promoted to project-wide authority

## Generalizable candidate principle

Subtraction is not always a single-node decision. After removing an icon, badge, sticker, or image, inspect the former cluster for connector lines, shadows, offsets, labels, or empty containers that have become semantically orphaned.

## Verification evidence

- live node `77:285` changed from visible to hidden
- post-change whole-spread screenshot confirms a calmer date-badge region
- date, masthead, cover hierarchy, semantic image nodes, native text, crop, structure, and rollback capability remain intact

## Next application

Apply only where a neighboring element has demonstrably lost meaning. Do not remove rules that separate content, align captions, indicate routes, or provide legitimate editorial navigation.
