# 2026-08-17 — Rurubu V6 W + CD/CE

Scope: Rurubu WEDDING only. V7 remained HOLD.

## Observation

Live Figma was ahead of GitHub status: BZ had already become hidden rollback and CB was the active Profile/Q&A preferred. CA remained active for Story/chronology.

The four interior pages were individually coherent but still felt more like separate layouts than pages from one travel magazine.

## Hypothesis

A recurring native folio/page slug could create publication-level continuity without adding cards, stickers, gradients, shadows, or new raster decoration.

## Tests

### CC — rejected

Added three tiny native snapshot captions to the profile photo cluster.

Result: technically clean but visually too weak and slightly applied-after-the-fact. Hidden as rejected.

### CD/CE — adopted

Added only recurring native folios:

- 02 PROFILE / FAVORITES
- 03 Q&A / MEMORIES
- 04 OUR STORY / JOURNEY
- 05 TRAVEL TIMELINE

The initial page-05 navy folio disappeared against the navy WEDDING ending band, so the folio polarity was changed to light cream and rechecked before promotion.

## Evidence

- whole-spread visual review: CD PASS / CE PASS;
- actual Profile `1535:3` 794×1123 PASS;
- actual Timeline `1535:102` 794×1123 PASS after polarity fix;
- all four pages: text collision 0 / 18px text safe-area risk 0;
- no raster, crop, image hash, replaceable-image role or fold guide changed.

## Adoption

- CD `1535:2` promoted to preferred Profile/Q&A;
- CE `1535:78` promoted to preferred Story/chronology;
- CB `1527:2` and CA `1517:2` retained hidden as rollback;
- Start Here updated to `V5 FU/FX · V6 W + CD/CE INSIDE STUDIES · V7 HOLD`.

## Asset lifecycle

Generated: 0.
Drive save: 0.
External placement: 0.
New raster bytes: 0.
Native editable text added: folios only.
Existing replaceable photos preserved: yes.

## Learning

Adopt `RSL-057` as `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`: recurring native folios can improve book-level cohesion without reintroducing UI-like containers, but their contrast/polarity must be verified against each local page field.

Rurubu-specific page numbers, slugs, placement, colors, photography and editorial grammar must not transfer literally.