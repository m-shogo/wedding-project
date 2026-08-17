# ADD-11 Photo Share / QR Sign — final QR geometry resilience QA

Date: 2026-08-17
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / QR_GEOMETRY_REPLACEMENT_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Start authority SHA: `f2e719e834a8e3b92401709b288ec68ea297afc1`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma: `PWQ5ygJJt0IlOqj5ri5jng`
- production A5: `1:31`, QR role `6:22`, `310×310`
- production A6: `1:45`, QR role `6:52`, `217×217`
- production A4: `3:2`, QR role `6:82`, `360×360`
- Drive authority: `ADD-11_写真共有_QR案内サイン` / `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`

## Why this QA was needed

The current templates intentionally keep a non-scannable semantic QR placeholder until the authoritative sharing destination exists. Before that final input arrives, the independent QR role can still be verified for replacement geometry: a realistic high-density square mark should fit without moving the surrounding caption, title, steps, date or privacy copy.

This test does **not** generate a real QR code or invent a destination URL.

## Rollback-safe Figma test

Three hidden QA sections were created from production duplicates only:

- A5 section `21:2`, duplicate `21:3`, QR role `21:8`
- A6 section `21:71`, duplicate `21:72`, QR role `21:77`
- A4 section `21:140`, duplicate `21:141`, QR role `21:146`

Inside each duplicate QR role, the placeholder copy was hidden and replaced with a deliberately **non-scannable** module-density proxy. The proxy uses no encoded data, no finder-pattern contract and no URL. It exists solely to approximate the visual mass of a future QR while preserving a quiet-zone-like inset.

Approximate proxy insets:

- A5: `37px` inside `310×310`
- A6: `26px` inside `217×217`
- A4: `43px` inside `360×360`

Production nodes were not mutated.

## Screenshot QA

Fresh screenshots were reviewed for A5, A6 and A4.

All three sizes retain the existing editorial hierarchy and QR authority field while accepting a dense square mark in the reserved role. The QR caption remains outside the mark and readable; the surrounding cream/navy composition does not reflow.

The A5, A6 and A4 proxy marks remain visually separate from the native caption `スマートフォンのカメラでQRを読み取ってください` and from the unresolved privacy/share-scope role.

## Structural readback

After the test, production remains unchanged:

- A5 root `875×1240`, QR role `310×310`, outside visible text `0`
- A6 root `620×875`, QR role `217×217`, outside visible text `0`
- A4 root `1240×1754`, QR role `360×360`, outside visible text `0`

All three QA sections were hidden after screenshot verification.

## Decision

`QR_GEOMETRY_REPLACEMENT_PASS`.

The templates do not need layout reconstruction when the final square QR is supplied. Remaining finalization is still correctly blocked on:

- authoritative sharing destination / URL;
- actual final QR generation;
- real-device scan proof at intended print size;
- authoritative privacy/access/public-scope wording;
- final print proof.

Drive write: `0`. The non-scannable proxies are QA-only Figma geometry and are not production assets.
