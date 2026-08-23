# 2026-08-23 — Rurubu V8 AS2 content-owned grid variation

Scope: Rurubu WEDDING only

## Before

V8 Cafe AS `2261:2` was structurally clean but its three daytime sensory fragments sat on one repeated left axis. At thumbnail scale the result risked reading as `quiet book design = large empty field + stacked text`, despite the phrases having different editorial roles.

## New professional knowledge that changed the decision

Fresh Walker Art Center research on the *Lifelike* catalogue described a master grid with large content-specific variations for essays, plates and object lessons. MoMA's documentation of Irma Boom's *SHV Think Book* reinforced that book identity can be carried by relationships among typography, layout, materials, printing and navigation rather than by repeating one page grammar.

This changed the live design decision: instead of filling whitespace with a schematic image or keeping the stack merely because it looked clean, the test changed relationships among existing true copy.

## Tested change

AS2 `2325:2` preserved all copy/type/right-page facts and repositioned only the daytime sensory sequence:

- `カップの音。` + `窓の光。` become two quick observational beats across one field;
- `次の店を決める会話。` returns wider below as the social beat;
- the functional rule/reflection close were moved only enough to preserve the new sequence.

## Verified result

- 500px whole-item: PASS
- 1400px reading: PASS
- 1587×1123 actual-size: PASS
- native text 13
- IMAGE fills 0
- text intersections 0
- bounded 18px safe risks 0
- accidental one-character lines 0
- Japanese semantic font mismatches 0

AS2 `2325:2` is current. AS `2261:2` is hidden rollback.

## Learning

`RSL-235 / F-RSL-235-QUIET-SPREAD-EQUALIZES-SENSORY-BEATS-INTO-ONE-AXIS-TEMPLATE`

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

The lesson is not to make pages asymmetric. It is to test whether a restrained master system is mechanically equalizing content whose semantic jobs differ, then vary the grid only when the content earns the difference.

No image generation, Drive write or photo placement was involved. V6 and V7 were untouched.
