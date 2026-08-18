# ADD-11 写真共有 / QR案内 — QR quiet-zone visibility polish

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-19
Start authority SHA: `255a51259c5729d66160c56af4423c2db8c76a08`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `PWQ5ygJJt0IlOqj5ri5jng`
- selected A5/A4: `18:19 / 19:34`
- hidden long-copy A5/A4: `19:4 / 19:56`
- retained legacy: `1:31 / 1:45 / 3:2` — unchanged
- Drive authority: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`

## Visible problem

After the hard QR frame and residual orbit were removed, the QR role still showed the `QR_QUIET_ZONE_RESERVE` itself as a dashed rectangle. The reserve is structurally important, but its dashed stroke is not a scanning requirement and read as a proof/layout box on the guest-facing paper.

The native `QR [共有リンク]` placeholder already identifies the future QR location, so the reserve can remain as Figma geometry without printing its construction boundary.

## Bounded comparison

Comparison roots:

- A5: `33:2 / QA / ADD11 / A5 / QUIET_ZONE_NO_VISIBLE_STROKE / 2026-08-19`;
- A4: `33:32 / QA / ADD11 / A4 / QUIET_ZONE_NO_VISIBLE_STROKE / 2026-08-19`.

Only `QR_QUIET_ZONE_RESERVE.strokes` was changed to an empty stroke list. Dimensions and placement remained exact:

- A5 quiet zone: `230×230` inside QR role `290×290`;
- A4 quiet zone: `332×332` inside QR role `420×420`.

The no-stroke candidates were stronger at whole/native scale: the QR placeholder remains obvious while the page no longer prints a layout-guide rectangle.

## Adoption / rollback

Pre-change hidden rollbacks:

- A5 selected/stress: `34:2 / 34:32`;
- A4 selected/stress: `34:62 / 34:84`.

Adopted changes:

- selected A5 `18:27 / QR_QUIET_ZONE_RESERVE`: geometry preserved, visible stroke `0`;
- stress A5 `19:12`: same;
- selected A4 `19:42 / QR_QUIET_ZONE_RESERVE`: geometry preserved, visible stroke `0`;
- stress A4 `19:64`: same.

Comparison roots were hidden after adoption. Legacy production was untouched.

## Three-scale / structure QA

Selected A5 `18:19`:

- native `875×1240`: PASS;
- native text `13`;
- QR `290×290` unchanged;
- quiet zone `230×230`, stroke count `0`;
- decorative orbit `0`;
- outside visible text `0`;
- IMAGE fills `0`.

Selected A4 `19:34`:

- native `1240×1754`: PASS;
- native text `13`;
- QR `420×420` unchanged;
- quiet zone `332×332`, stroke count `0`;
- decorative orbit `0`;
- outside visible text `0`;
- IMAGE fills `0`.

The earlier post-orbit realistic A4 stress remained structurally valid; this change alters only the reserve stroke and does not reduce copy capacity or QR geometry.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`. This was a guest-facing construction-guide leak, not an imagery problem. Exact Drive metadata was read immediately before mutation. Drive writes: `0`.

## Learning state

`VERIFIED_LOCAL`, consistent with the already cross-item-verified quiet-zone principle: functional geometry can remain in Figma without printing a UI/proof border. This does not authorize deleting real QR quiet space; the invisible geometric reserve must remain and must be validated again with the final real QR and physical/device scan proof.

## Deferred finalization

Authoritative URL/service, privacy/access policy, hashtag, expiry, real QR generation, device scan proof, physical print proof, and final export remain unresolved. No final QR destination was fabricated.
