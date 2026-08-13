# ADD-11 写真共有 / QR案内 — Placeholder Hierarchy Readback — 2026-08-13

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PLACEHOLDER_HIERARCHY_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- GitHub `main` immediately before this evidence write: `86552ecfb0537a593f5e5b81daf2e3fb21bbe3cd`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `PWQ5ygJJt0IlOqj5ri5jng`
- production: A5 `1:31`, A6 `1:45`, A4 `3:2`
- Drive folder: `ADD-11_写真共有_QR案内サイン` / `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`
- Drive metadata readback confirmed the exact folder ID and parent `1iJGIzmNSlzwqrcv7P6UsNbstwBki1523`.

## Fresh production readback

All three production formats were re-read live after the prior proof-metadata hierarchy polish.

A5 `1:31`:

- `QR_PLACEHOLDER_NOTE` keeps the semantic field and renders only `LAYOUT DUMMY` at `7 px`, muted warm-gray, opacity about `0.76`.
- `PRIVACY_NOTE` renders only `LAYOUT DUMMY` at `8 px`, same muted proof-only treatment.
- frame remains `875 × 1240`, `clipsContent=true`, native editable text.

A6 `1:45`:

- QR token: `6 px`, muted warm-gray, opacity about `0.76`.
- privacy token: `6 px`, muted warm-gray, opacity about `0.76`.
- frame remains `620 × 875`, `clipsContent=true`.

A4 `3:2`:

- QR token: `7 px`, muted warm-gray, opacity about `0.76`.
- privacy token: `9 px`, muted warm-gray, opacity about `0.76`.
- frame remains `1240 × 1754`, `clipsContent=true`.

The QR remains deliberately non-scannable and no URL, guest identity, sharing destination or privacy fact was fabricated. The Japanese title, QR authority field, vertical sharing flow and prior Japanese line-break repairs remain intact.

## Asset decision

`IMAGE_GENERATION_NOT_REQUIRED`. The current live hierarchy is typographically resolved and generated imagery would compete with the eventual real QR. Drive writes: `0`.

## Result

ADD-11 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PLACEHOLDER_HIERARCHY_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`. Final QR destination, privacy/public-scope copy, printer proof and physical placement remain deferred.
