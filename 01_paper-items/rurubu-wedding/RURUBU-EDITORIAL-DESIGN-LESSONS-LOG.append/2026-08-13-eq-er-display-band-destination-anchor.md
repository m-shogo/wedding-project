# 2026-08-13 — EQ / ER: display band + bounded destination anchor

## Lesson

A Japanese travel-magazine cover becomes more convincing when the display headline is treated as editorial geometry rather than as a centered title block. In EQ, splitting `横浜` from `ふたり旅。` and placing the second line on one flat magenta band produced more authentic thumbnail energy than adding badges, shadows, rounded containers, or extra decoration.

The second lesson is about provenance and scale. A visually weaker but destination-specific image can still be useful when it is deliberately **small, secondary, and explicitly non-final**. ER uses the existing Yokohama Current proxy only as a `166×118` destination inset. Its node name states `NOT_Q60_EXACT`, and the dominant hero remains separately identified as non-Q60 evidence. This lets factual destination specificity improve without laundering a proxy into a completed asset role.

## Evidence

- EQ: `1116:2`
- ER: `1118:2`
- ER Review: `1119:2`
- ER inset: `1118:190`
- inset hash: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- ER dominant hero: `1118:134`, hash `539c259be8036b481d06b4f76db9a39b407d90e8`
- 500px thumbnail / whole-item / 794×1123 actual-size front: PASS
- absolute text collisions: `0`
- bounded 18px safe-area risks: `0`
- Current untouched: `77:18 / 77:290`

## Rejected / repaired state

EQ Feature 01 number originally sat at x=16 and failed the bounded 18px print-safe check. It was moved to x=20 before adoption. Do not accept a visually strong display move until actual-size/safe-area geometry is rechecked.

## Reuse rule

- Prefer one decisive flat editorial color field over several decorative badges.
- Treat headline scale, photo overlap, and image area as the primary sources of energy.
- Low-quality or incomplete-provenance photography may be used only in a bounded secondary role when its status is explicit and it still passes actual-size inspection.
- Never count that secondary proxy as completion of the dominant photo role.
- Preserve native text and rollback frames while testing these moves.
