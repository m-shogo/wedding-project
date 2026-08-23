# RSL-237 — Prose divider must prove a binding function

Date: 2026-08-23
Source scope/item: Rurubu WEDDING / V8 Story+Chronology AL→AL2
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

V8 Story AL `2238:35` used a visible vertical `L_STORY_DIVIDER / 2238:69` between the main story body and a secondary reflection. The two voices were already differentiated by column position, width, type scale and copy length. At whole-item scale the rule read as residual layout scaffolding and slightly pushed the spread toward template/form grammar.

## Root-cause hypothesis

A rule that no longer binds otherwise ambiguous regions can become decorative structure. In restrained editorial design, hierarchy/alignment may already perform the grouping job.

Failure fingerprint:

`F-RSL-237-PROSE-DIVIDER-REPEATS-GROUPING-ALREADY-CARRIED-BY-TYPE-AND-SPATIAL-HIERARCHY`

## Professional observation used

Fresh sources were `idea No.391`, `idea No.381`, and Pentagram `OfficeUS Atlas`. The useful principle was not a surface style: editorial structure can remain strong even when visible scaffolding is reduced, and chronology need not be expressed by the simplest repeated structure.

The experiment also consumed the neutral non-Rurubu `NRSL-002` method: a line/field should prove a real binding function at whole-item scale. That cross-scope evidence was treated as a method, not copied art direction.

## Bounded experiment

- clone AL to `2332:2`;
- change only cloned divider `2332:36` from visible to hidden;
- preserve all native copy, typography, coordinates, hierarchy, page field and chronology data;
- compare AL vs AL2 at 500px whole-item, 1400px reading, and 1587×1123 actual-size.

## Three-scale result

- 500px: PASS — less template partitioning, story voices remain distinct.
- 1400px: PASS — the secondary reflection remains attached by spatial/type hierarchy without a visible separator.
- actual-size 1587×1123: PASS — no clipping, overlap, accidental wrap or microtype regression.
- structural: visible native text `25`; IMAGE `0`; intersections `0`; bounded safe risks `0`; Japanese font mismatch `0`; accidental explicit one-character lines `0`.

## Decision

Promoted AL2 `2332:2` as current V8 Story/Chronology. Previous AL `2238:35` is hidden rollback at `x=300000`.

## Transferable candidate principle

Before retaining a divider between editorial text roles, ask what reader-facing or physical job it performs. If type, spacing and alignment already make the relationship unambiguous, test subtraction rollback-safely at whole-item scale.

This is **not** a `remove dividers` rule. A rule that binds image/caption, chronology, trim/fold, navigation, or otherwise ambiguous information should remain when evidence supports that function.

## What must not transfer

Do not transfer V8 coordinates, cream paper field, navy/rust palette, exact type sizes, chronology layout, prose content, or the specific no-divider treatment.

## Evidence

- Figma current: `2332:2`
- hidden rollback: `2238:35`
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-AL2-STORY-DIVIDER-SUBTRACTION-QA-2026-08-23.md`
- Drive write: `0`
