# ADD-11 Photo Share / QR Sign — guest-copy cleanup

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / GUEST_FACING_PLACEHOLDER_CLEANUP_PASS / SEAM_SUBTRACTION_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `304bb83d83535210100a5a21cfdca2f0451098f1`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- existing visual authority: `QA.md`
- neutral lexical method: `NRSL-004`, verified inline implementation-suffix removal, RSL-065 support
- Figma: `PWQ5ygJJt0IlOqj5ri5jng`
- production A5 `1:31`, A6 `1:45`, A4 `3:2`
- Drive: `ADD-11_写真共有_QR案内サイン` / `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`

## Visible defect

Fresh A5 screenshot showed valid unresolved QR/privacy roles still carrying implementation wording:

- `［確定リンク待ち · LAYOUT DUMMY］`
- `［共有先・公開範囲の案内文 · LAYOUT DUMMY］`

The QR must remain non-scannable until an authoritative destination exists, and privacy/public-scope copy is still unresolved. However, `LAYOUT DUMMY` and workflow wording do not belong in the guest-facing sign.

## Rollback-safe bounded change

Hidden pre-change rollbacks were created:

- A5 `20:2`
- A6 `20:18`
- A4 `20:34`

Only the two unresolved native roles on each size were changed:

- QR placeholder → `［共有リンク］`
- privacy/scope placeholder → `［共有先・公開範囲］`

No real URL, QR modules, service/account, privacy policy, retention period, or permission scope was invented. QR remains a deliberately non-scannable placeholder role.

## QA

Fresh A5 screenshot: PASS; title/body/steps remain the primary cream-field hierarchy and the navy QR authority field remains intact without proof-sheet suffixes.

Structural readback after the change:

- A5 `1:31`: native visible text `10`, IMAGE fills `0`, visible text outside root `0`;
- A6 `1:45`: native visible text `10`, IMAGE fills `0`, visible text outside root `0`;
- A4 `3:2`: native visible text `10`, IMAGE fills `0`, visible text outside root `0`;
- all three read back exactly `［共有リンク］` and `［共有先・公開範囲］`.

No geometry, QR reserved area, typography scale, date, steps, seam state, or image structure changed. Existing long-copy and three-scale evidence therefore remains structurally applicable.

## Assets / Drive

Image generation: not required. The observed defect was lexical/proof-language leakage.
Drive write: `0`.

## Result

ADD-11 retains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. Final QR generation/scan proof, authoritative sharing destination and privacy/access policy remain blocked/deferred; `NOT_PRINT_READY` remains correct.
