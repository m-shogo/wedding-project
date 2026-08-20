# Rurubu V6 GL — Cafe 02 controlled ordinal/photo overlap feedback

Date: 2026-08-20
Scope: Rurubu WEDDING only

## Visible / structural problem

After HA promotion, an all-six-spread structural QA found the only remaining text-text collision in current preferred V6: GK Cafe's native `02` overlapped `景色まで、ごちそう。` by `12×62px`.

At reduced scale the relationship looked nearly intentional, so this was exactly the kind of defect that screenshot-only review can miss.

## Principle tested

Do not automatically push the title column away. Because the cyan `02` already belonged partly to a legitimate, replaceable Yokohama view photograph, test whether moving the ordinal deeper onto the photograph can create clear text separation while strengthening editorial binding.

## Expected improvement

- remove the real collision;
- keep the title/body column strong and compact;
- make the small source-limited photo feel more editorial without enlarging it;
- preserve image hash/geometry and replaceability.

## Regression risk

The number could lose contrast or hide important photo content. The overlap could also become decorative rather than informational if pushed too far.

## Bounded result

GL `2000:2` changed only `TEXT / VIEW_NUM` x `224 → 202`.

- view photo stays `238×218`, same hash;
- title/body/meta/Cafe Check/closing unchanged;
- Table page unchanged;
- number/photo overlap becomes `62px`;
- text collision becomes `0`.

## Evidence

- whole spread ~900px: PASS;
- reading scale: PASS;
- Cafe actual-size `2000:3 / 794×1123`: PASS;
- visible native text: 20;
- collisions: 0;
- 18px safe-area risks: 0;
- image geometry/hash changes: 0.

After GL promotion, all six current preferred V6 spreads were re-audited:

- text collisions: 0 on every preferred page;
- 18px text safe-area risks: 0 on every preferred page;
- production/proof/placeholder visible leaks: 0;
- visible IMAGE roles: 29;
- unique image hashes: 8.

## Decision

`ADOPTED / VERIFIED_LOCAL`.

GL is slightly but clearly better than GK: the `02` reads as intentionally bound to the photograph, while the Japanese title has actual structural clearance.

## Next application

Keep using all-page structural QA after visual improvements. Current next visual ceiling is still photo-pool breadth; waterfront, cafe and dining hashes each appear five times. Do not replace them with semantically false assets merely to reduce repetition.
