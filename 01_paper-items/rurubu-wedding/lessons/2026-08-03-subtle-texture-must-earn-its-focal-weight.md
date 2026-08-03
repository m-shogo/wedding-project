# Lesson — Subtle texture must still earn its focal weight

Date: 2026-08-03
Status: `TESTED / NOT YET PROMOTED TO PROJECT RULE`
Applies to: Rurubu V5, candidate for later editorial work

## Context

The V5 inside-profile area used a small halftone texture beside the bride profile. The texture was visually modest, but it sat inside an already active cluster containing profile photography, ribbons, rules, microcopy, icons, and strong type.

## Observation

A decorative element does not become harmless merely because it is faint or small. In a dense editorial cluster, even low-contrast texture consumes focal attention and can reduce the breathing room around the actual content.

## General principle

Judge decoration cumulatively at whole-page scale. A texture should remain only when it strengthens one of:

- hierarchy
- atmosphere specific to the item
- directional flow
- separation between content regions
- a meaningful editorial motif

Existing implementation effort and subtle opacity are not sufficient reasons to keep it.

## Process change

During subtraction passes, include faint raster textures, dots, halftones, and background marks in the same semantic audit as badges and stickers. Hide rather than delete first, compare the whole page, and retain rollback.

## Evidence

Hiding `77:373 / AUTH_HALFTONE_TEXTURE` on the live V5 inside spread produced a calmer bride-profile area without reducing travel-magazine identity or damaging structure, text, photos, or neighboring content.

## Boundary

This is not a universal ban on halftone or texture. Promotion requires repeated evidence across more than one context or strong print-proof confirmation.
