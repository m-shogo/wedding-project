# ADD-13 V5 evidence readback correction — 2026-08-17

Status: `EVIDENCE_CORRECTED / V5_LIVE_FIGMA_NOT_OBSERVED / NO_PRODUCTION_MUTATION`

## Live authority

- Pre-write `main`: `fed5b7512e086f9d022873eb2a5d479960f2a8de`.
- Current: `docs/automation/non-rurubu-figma-quality-current.md`.
- Figma file: `8ad7bEPAc8I88gs1JxsWhe`.
- Existing production roots: front `1:3`, back `1:13`.
- Drive authority remains `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`.

## Correction

A fresh live Figma metadata readback on 2026-08-17 exposed only the `01_PRODUCTION` page and its existing production / QA / rollback nodes through the current remote Figma authority. The previously reported clean-room V5 nodes/page (`22:2`, `22:3`, `22:27`, stress `25:58` / `25:85`) were **not observed in the live file readback**.

Therefore the earlier V5 report must not be treated as live Figma evidence. In particular, do not reuse the claimed V5 structure counts, writing-area percentage, screenshot result, or V5 node IDs as authority unless those nodes are independently observed again in live Figma.

This correction does **not** invalidate the older production evidence in `docs/automation/add-13-message-card-design-qa.md`; it only withdraws the unverified later V5 claim.

## Clean-room consequence

The readback itself exposed legacy production geometry, so this run is contaminated for a new ADD-13 clean-room visual proposal. No V6 is authored in the same run. A future fresh run may use only factual/semantic requirements before authoring a new blank-frame direction, then open production only after the candidate and stress QA are complete.

## Writes

- Figma production mutation: `0`.
- Drive write: `0`.
- Rurubu item-specific read/write: `0`.
- Image generation: not applicable to this evidence correction.

## Next safe progression

Do not repeat an ADD-13 design in this contaminated run. Continue only with a target whose old visual has not been exposed in the current run, or wait for a fresh run before creating the next ADD-13 clean-room candidate.
