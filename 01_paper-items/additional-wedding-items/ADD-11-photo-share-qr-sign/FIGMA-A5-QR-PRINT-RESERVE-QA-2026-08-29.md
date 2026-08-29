# ADD-11 A5 QR print reserve QA — 2026-08-29

Start authority SHA: `6dc9d0a48933f5bcdbc0d9af24348cefc2fb740e`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Scope: non-Rurubu `ADD-11 写真共有 / QR案内サイン` only.

## Why this was reopened

The selected V4 `DARKROOM DEVELOPING TRAY` already passed sellable visual, long-copy, A5/A4 independent reflow and structure gates. The new print-first audit found one physical-output risk rather than a visual-style defect: the A5 white QR reserve was only `172×172 px` on an `875×1240` A5 canvas.

Using the authoritative A5 physical size `148×210 mm`, the live canvas is approximately `5.91 px/mm`, so the prior QR reserve was only about `29.1×29.1 mm`. A4 already reserved `220×220 px` on `1240×1754`, about `37.3×37.3 mm` at A4 physical size.

The real QR URL/version is still unresolved, so no QR code, module size or universal scan minimum was fabricated. The goal of this bounded change is only to provide more physical room for a future real QR plus its quiet zone before 100% scan proof.

## Live authority

- Figma file: `PWQ5ygJJt0IlOqj5ri5jng`
- A5 Current: `52:2`
- A5 long-copy stress: `52:18`
- A4 Current: `53:2` — intentionally unchanged
- Drive authority: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb / ADD-11_写真共有_QR案内サイン`
- raster production assets: `0`

## Bounded comparison

Created from the live A5 Current and A5 long-copy proof without changing copy, typography, tray, print sheet, safelight, chemistry edge, date, or any A4 geometry:

- `64:2 / QA / ADD-11 / A5 / QR PRINT RESERVE 200PX / 2026-08-29`
- `64:18 / QA / ADD-11 / A5 / LONG COPY / QR PRINT RESERVE 200PX / 2026-08-29`

Only `QR / PAPER` changed from `172×172` to `200×200 px`, expanding symmetrically around its previous center. The placeholder `[QR]` remained native editable text and was not turned into an image.

Fresh screenshots passed for both normal and realistic long-copy compositions. The larger reserve does not collide with the left information lane or the lower closing copy and does not become the first-read visual object.

## Promotion / rollback

Hidden full-root rollbacks were created immediately before production mutation:

- `67:2 / ROLLBACK / ADD-11 / A5 / PRE-QR-PRINT-RESERVE-200PX / 2026-08-29`
- `67:18 / ROLLBACK / ADD-11 / A5 / LONG COPY / PRE-QR-PRINT-RESERVE-200PX / 2026-08-29`

Promoted live state:

- Current `52:2 / CURRENT / ADD-11 / DARKROOM DEVELOPING TRAY / A5 / QR PRINT RESERVE 200PX`
  - QR paper `52:10`: `200×200 px`, x=`406`, y=`501`
- long-copy `52:18 / QA / ADD-11 / DARKROOM DEVELOPING TRAY / A5 / LONG COPY / QR PRINT RESERVE 200PX`
  - QR paper `52:26`: `200×200 px`, x=`451`, y=`501`
- comparisons `64:2 / 64:18` hidden after verification
- stress root returned hidden after QA
- A4 `53:2` unchanged because its existing ~37.3 mm reserve was not the diagnosed constraint.

## Print-first result

At `148×210 mm`, the new A5 QR reserve is approximately `33.8×33.8 mm` instead of ~`29.1×29.1 mm`.

This is a **reserve field**, not proof that a future QR will scan. Final QR geometry remains dependent on the approved URL, QR version/error correction, module count, actual printed module size and quiet zone. Final adoption still requires 100% physical scan proof on iPhone/Android, including low-light and oblique-angle checks.

Current A5 native text remains physically credible: smallest visible role is `20 px`, approximately `9.6 pt` at the A5 physical scale; information text `22 px` is ~`10.6 pt`; no type was reduced to make room for the QR reserve.

Post-promotion structure readback:

- Current A5 visible native text: `7`
- outside visible text: `0`
- IMAGE fills: `0`
- long-copy outside visible text: `0`
- long-copy IMAGE fills: `0`

Effective raster PPI: `N/A` because the production design contains no raster IMAGE fill. `RESOLUTION_WARNING`: none for this change.

## CMYK / production risk

No RGB raster was introduced. Existing deep-ink, coral and cyan fields still require printer-profile/stock proof because dark fields can gain density and saturated accents can shift under CMYK conversion. The white QR reserve must remain sufficiently neutral/high-contrast after final stock/profile selection.

`DESIGN_COMPLETE != PRINT_READY` remains in force.

Still deferred:

- approved sharing service and final URL;
- real QR generation and quiet-zone verification;
- A5/A4 final installation choice;
- printer template, trim/bleed/safe values and stock;
- CMYK/profile and PDF preflight;
- font embedding, transparency/overprint checks;
- frame/stand occlusion;
- 100% physical print + iPhone/Android scan proof.

## Decision

`ADD-11 A5 / QR_PRINT_RESERVE_HARDENED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`.

This change does not reopen the V4 visual direction and does not claim QR readiness; it removes one avoidable A5 physical-space risk while preserving native editability and the existing sellable composition.