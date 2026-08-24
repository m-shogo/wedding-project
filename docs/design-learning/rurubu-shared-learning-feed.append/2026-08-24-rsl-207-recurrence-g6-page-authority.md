# RSL-207 recurrence — V7 G6 current root drifted to reset page context

Date: 2026-08-24
Source scope: Rurubu WEDDING / V7 Memory G6 `2421:2`
Existing fingerprint: `F-RSL-207-PAGE-CONTEXT-RESET-CAUSES-CURRENT-ROOT-PARENT-AUTHORITY-DRIFT`
State: existing `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; recurrence recorded, no new ID.

## Recurrence observed

A fresh direct-node authority audit found current G6 `2421:2` under `845:2 / 00_RURUBU_START_HERE` while every other current V7/V8 root belonged to canonical study page `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`.

The design still rendered correctly when screenshotted in isolation, so isolated visual QA had not exposed the production-authority defect.

## Corrected method used immediately

Because this fingerprint already existed, the run did **not** repeat the page-implicit clone/move method and did not create a duplicate failure lesson.

The correction followed RSL-207 exactly:

1. resolve exact authority page `2052:2`;
2. explicit `await figma.setCurrentPageAsync(authorityPage)`;
3. move the existing root with `authorityPage.appendChild(g6)`;
4. restore intended comparison coordinates;
5. read back `parent.id`, x/y and visibility.

G6 then read back parent `2052:2`.

After G7 promotion, final page-level QA confirmed all 12 current V7/V8 roots are visible under `2052:2` and pairwise current-root overlap is `0`.

## Strengthened operational gate

For every future page-level current promotion in Rurubu:

- do not infer authority from node name, screenshot or previous invocation;
- resolve the exact page in the same write invocation;
- explicitly switch once to that authority page;
- perform clone/create/move;
- require immediate parent readback before calling the mutation complete;
- include all current roots in final page-level parent/overlap QA when a comparison board is involved.

This recurrence demonstrates that merely documenting a known fingerprint does not prevent it. The prevention check must be executed as part of the write protocol.

## What does not transfer

Do not transfer page IDs, coordinates, V7/V8 grid geometry or Rurubu study organization. The transferable part is the explicit page-authority readback gate for page-level Figma automation.
