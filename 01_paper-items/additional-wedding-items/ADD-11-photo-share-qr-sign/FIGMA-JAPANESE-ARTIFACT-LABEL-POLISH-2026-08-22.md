# ADD-11 — Japanese artifact-label polish QA

Date: 2026-08-22
Start main: `927c6b9797e1f56ad84e269c6c4b0aa5c5d189a6`
State: `CURRENT_RETAINED / BOUNDED_TYPOGRAPHY_REPAIR / PASS`

## Live authority

- Figma file: `PWQ5ygJJt0IlOqj5ri5jng`
- Current A5: `52:2 / CURRENT / ADD-11 / DARKROOM DEVELOPING TRAY / A5`
- Current A4: `53:2 / CURRENT / ADD-11 / DARKROOM DEVELOPING TRAY / A4`
- long-copy proofs: `52:18 / 53:18`
- exact Drive authority: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb / ADD-11_写真共有_QR案内サイン`

## Visible problem

At actual-size review the small reader-facing label `DARKROOM / SHARE 01` behaved like an internal concept name / generic English design label rather than useful guest-facing information. The physical darkroom metaphor was already communicated by the tray, safelight edge and developing print; repeating the internal concept in English added no functional meaning and weakened the Japanese-first editorial hierarchy.

The rest of DARKROOM DEVELOPING TRAY remained strong and did not warrant a clean-room redesign.

## Bounded repair

Before the edit, complete A5/A4 Current roots were cloned to hidden rollback copies.

Only `TEXT / ARTIFACT` changed across selected and realistic long-copy proofs:

- A5 `52:7 / 52:23`: `DARKROOM / SHARE 01` → `写真共有`
- A4 `53:7 / 53:23`: `DARKROOM / SHARE 01` → `写真共有`
- font role changed from Inter Bold to Noto Sans JP Bold at the existing 20px / 28px sizes.

Position, width, headline, lead, info, QR geometry, process rule, closing copy, date, tray geometry and color fields remain unchanged. The label remains native/editable and `textAutoResize=HEIGHT`.

## QA

Fresh A5 screenshot after repair: PASS.

- `写真共有` reads as a functional artifact label without competing with the emotional headline;
- the physical darkroom/developing-print concept remains visible through form rather than explanatory English filler;
- no new crowding or UI regression was introduced;
- A5/A4 selected and stress labels remain native auto-height;
- existing selected/stress structure gates remain intact; IMAGE fills remain `0`.

Image generation: `0`.
Drive writes: `0`.

## Decision

`PASS / CURRENT_RETAINED`.

This is a bounded Japanese editorial-language repair. DARKROOM DEVELOPING TRAY remains the selected Professional vNext direction and remains `NOT_PRINT_READY` pending the existing QR/privacy/physical-print gates.