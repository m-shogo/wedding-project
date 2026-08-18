# WEDDING PASSPORT — V3 front stress evidence sync QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_SELECTED_FAMILY_CANDIDATE / FRONT_STRESS_EVIDENCE_SYNC_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-18
Start authority SHA: `7b6da566fadb735ca0c01d23a820cb45cb8629ef`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- selected clean-room V3 front: `144:3` unchanged in this sync
- hidden front long-copy stress: `145:4`
- Drive authority remains `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- retained legacy production remains untouched.

## Problem found

After the selected front had already been polished, a fresh readback of hidden stress `145:4` showed evidence drift:

- `TEXT / BRAND`, `DATE LARGE`, `YEAR`, `JA TITLE` and `SUBTITLE` still used `textAutoResize=NONE` with ~10px fixed-height boxes;
- hidden stress still displayed the old decorative note `ISSUED FOR ONE DAY, KEPT FOR THE JOURNEY.` even though selected production had already removed that filler;
- the long-name stress string was an internal implementation phrase rather than a clean semantic long-name placeholder.

The selected front itself was not visually regressed; the defect was that its hidden QA evidence no longer represented the current production rules.

## Rollback-safe repair

Before mutation, hidden rollback was created:

- `165:2 / ROLLBACK / PASSPORT V3 FRONT STRESS / PRE EVIDENCE SYNC / 2026-08-18`

Stress repair:

- visible semantic/front text roles converted to native auto-height;
- long-name stress changed to `[非常に長い新郎氏名] × [非常に長い新婦氏名]`;
- obsolete decorative note hidden;
- already-hidden pseudo-nav remains hidden;
- selected front `144:3` itself was not changed.

## Visual / structure QA

The repaired stress was temporarily revealed for screenshot QA and then returned to hidden state.

Result:

- root: `1480×2100`;
- visible native text count: `7`;
- visible fixed-height text count: `0`;
- proof/internal stress wording count: `0`;
- visible text outside root: `0`;
- text-to-text collision count: `0`;
- long couple-name role expands to two lines / `120px` high;
- IMAGE fills added: `0`;
- hidden after QA: yes.

500px review confirms that the current title/date/route hierarchy still holds under the longer semantic couple-name stress.

## Asset decision

`IMAGE_GENERATION_NOT_REQUIRED`; no Drive write.

## Decision

`FRONT_STRESS_EVIDENCE_SYNC_PASS`.

WEDDING PASSPORT remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`; both front and back long-copy evidence now align with current selected-production rules instead of retaining stale filler/fixed-height artifacts.
