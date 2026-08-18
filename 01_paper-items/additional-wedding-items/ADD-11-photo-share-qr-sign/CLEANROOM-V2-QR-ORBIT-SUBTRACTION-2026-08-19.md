# ADD-11 写真共有 / QR案内 — Clean-room V2 QR-orbit subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-19
Start authority SHA: `e7577f6bec697cd03cea39133546ae41d5592d09`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `PWQ5ygJJt0IlOqj5ri5jng`
- selected A5: `18:19`
- selected A4: `19:34`
- hidden long-copy A5/A4: `19:4 / 19:56`
- retained legacy: `1:31 / 1:45 / 3:2` — unchanged
- Drive authority: `ADD-11_写真共有_QR案内サイン / 1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`

## Visible problem

Earlier QR-field hardening removed the hard QR box and redundant travel-route layer, but a large decorative orbit still surrounded the unresolved QR role on both selected sizes:

- A5: `DECOR_MEMORY_ORBIT_INNER`;
- A4: `DECOR_QR_ORBIT`.

Fresh whole/native review showed that the QR role and its dashed quiet-zone reserve were already immediately legible. The remaining orbit therefore read more like a scanner/widget target than a physical print requirement and competed with the Japanese editorial hierarchy.

## Bounded comparison

Rollback-safe comparison roots:

- A5: `31:2 / QA / ADD11 / NO_QR_ORBIT / 2026-08-19`;
- A4: `31:32 / QA / ADD11 / NO_QR_ORBIT / 2026-08-19`.

Only the remaining decorative orbit was hidden. The exact QR role, quiet-zone reserve, headline, three steps, privacy/hashtag/expiry placeholders, paper fields and typography were unchanged.

The no-orbit candidates were stronger at both sizes: the QR remains discoverable, but reads as a reserved print role rather than a scan-control graphic.

## Adoption / rollback

Before selected mutation, hidden rollbacks were saved:

- A5 selected: `32:2`;
- A5 stress: `32:32`;
- A4 selected: `32:62`;
- A4 stress: `32:84`.

Adopted visibility changes:

- selected A5 `18:25 / DECOR_MEMORY_ORBIT_INNER`: hidden;
- stress A5 corresponding orbit `19:10`: hidden;
- selected A4 `19:40 / DECOR_QR_ORBIT`: hidden;
- stress A4 corresponding orbit `19:62`: hidden.

Comparison roots were hidden after adoption. Legacy production was not changed.

## Three-scale / structure QA

### A5 `18:19`

- native size `875×1240`: PASS;
- visible native text: `13`;
- QR role: `290×290` unchanged;
- quiet-zone reserve: `230×230` unchanged;
- visible decorative orbit: `0`;
- outside visible text: `0`;
- IMAGE fills: `0`.

### A4 `19:34`

- native size `1240×1754`: PASS;
- visible native text: `13`;
- QR role: `420×420` unchanged;
- quiet-zone reserve: `332×332` unchanged;
- visible decorative orbit: `0`;
- outside visible text: `0`;
- IMAGE fills: `0`.

A4 realistic long-copy stress `19:56` was temporarily revealed after adoption and passed at native size with long guidance, three long step instructions, long privacy copy, hashtag and expiry placeholder. The stress was returned to hidden QA state after review.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`. The defect was residual scanner/widget decoration, not missing imagery. Exact Drive metadata was live-read before Figma mutation. Drive writes: `0`.

## Learning state

`VERIFIED_LOCAL`. This independently supports the existing quiet-zone principle: preserve the functional QR reserve but do not assume a visible orbit/box is needed. It does not imply that every circle around a QR should be removed; a shape should remain when it has a verified physical, scanning, binding, or reader-facing role.

## Finalization boundary

Authoritative sharing service/URL, privacy scope, hashtag, expiry, real QR generation, device scan proof, physical print proof and printer/export details remain deferred. No final URL or QR destination was fabricated.
