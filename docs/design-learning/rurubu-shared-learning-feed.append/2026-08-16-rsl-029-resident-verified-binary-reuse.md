# RSL-029 — Reuse an already verified resident binary before reopening blocked transport

Date: 2026-08-16
Source scope: Rurubu WEDDING V6 Outer
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Evidence: `01_paper-items/rurubu-wedding/RURUBU-V6-O-AK-AI-QA-2026-08-16.md`

## Visible problem

Outer M had strong photography and destination hierarchy but a weak magazine-identity entry: only a small native `旅する WEDDING` masthead line.

Rurubu-specific authority also prohibits historical SVG identity assets and requires current fixed identity artwork to remain PNG.

## Root-cause hypothesis

The visual defect did not require a new generation or another binary transport attempt. A current Drive-verified PNG candidate and the same already-verified Figma image hash existed in preserved comparison history.

## Bounded test

- Drive authority: `rurubu_wedding_logo_A_v1.png`
- Drive ID: `1opK9BSoL8rCeoYxuPWUyKZZsu0-Q165b`
- fresh Drive readback: PNG / 629,061 bytes
- existing Figma image hash: `0bdbf47904ea5865c71b1555dc73689b2c7b2126`

A rollback-safe Outer O duplicate was created from M. The existing verified Figma PNG node was cloned to `1370:55`, placed at `330×106.7` with `FIT`, and the tiny native masthead was hidden only in O.

No new generation, Drive write, upload or base64 transport was used.

The first attempt to construct a new image-fill node directly from the hash was blocked before mutation. Instead of repeating it, the already resident verified node was cloned; that materially different method succeeded.

## Expected improvement

Restore a true magazine masthead entry while avoiding known DNS/compression transport fingerprints and preserving exact binary identity.

## Regression risk

A stronger masthead can compete with the destination headline, postcard or hero image, especially at thumbnail scale.

## Evidence

- 500 px whole spread: PASS
- 1400 px whole spread: PASS
- actual-size front `1370:34`, `794×1123`: PASS
- placed node: `1370:55`
- image hash readback: exact match
- no new binary transport
- previous Outer M retained hidden as rollback

## Status

`VERIFIED_LOCAL` in Rurubu. The exact PNG/logo and its placement are strictly Rurubu-specific.

## What may transfer

Only this capability principle may transfer as a `CROSS_ITEM_CANDIDATE`:

> When a quality-preserving binary transport route is already blocked, first check whether the exact authoritative binary is already resident in the target Figma file with verified provenance/hash. Reuse that resident node in a rollback-safe test before reopening transport.

## What must NOT transfer

- the literal Rurubu WEDDING logo artwork;
- Drive ID or Figma hash as another item's asset;
- placement coordinates;
- palette or masthead composition;
- any claim that an old resident binary is authoritative without fresh provenance/readback.
