# Rurubu WEDDING V30 — P06 Asset Ownership Guardrails

Status: CANONICAL / HARD
Scope: P06 `3535:17` only
Incident date: 2026-09-09 JST

## Why this file exists

P06 was incorrectly rebuilt as `P06_EDITORIAL_NATIVE_V1` with Figma rectangles, native title text, emoji-like decorative text and native Q5/Q6 panel shells. This violated the already-existing P06 HQ raster guardrail: **do not rebuild the owner's title, Q5, Q6, icons, photo frames or editorial art with native primitive substitutes**.

The failure mode was procedural: the automation optimized for "make the page visibly complete" and treated missing raster transport as permission to recreate the visual system natively. That permission never existed. A visually non-empty page is not a valid completion signal when asset ownership is wrong.

## Canonical visual source

- Owner master: `P06_OWNER_VISUAL_MASTER_HQ_UNCOMPRESSED_20260906.png`
- Drive ID: `1mm14Nr1RqlhERZG97Z-9Oz_y-D2lpfWU`
- Dimensions: `1055 x 1491`
- SHA-256: `13bed2e07d66803d67cd6a117a57bc67dbdd9677b9ba54f4b9dd634910747103`
- The user-provided 2026-09-09 P06 reference is byte-identical to this owner master.

## HARD asset ownership matrix

### IMAGE / RASTER OWNED — Figma native substitutes are forbidden

The following must come from the owner master or approved production RGBA/PNG raster assets. Do not redraw them with Figma rectangles, strokes, vectors, emoji, or native display text.

- main title artwork `ふたりの日常と / 好きなもの`
- `Shogo & Shiori` ribbon and its floral/coffee/music/heart decoration
- intro speech-bubble artwork and surrounding tropical/wave decoration
- Q5 panel shell, Q5 badge, heading decoration, name tags/arrows, doodles and border treatment
- main-photo caption label artwork
- food / pets / travel caption label artwork
- Q6 panel shell, Q6 badge, heading artwork, stamp, camera, route lines, floral/tropical decoration
- decorative icons, stickers, tape, flowers, hearts, sparkles and editorial embellishments
- photo-frame border/art treatment around the replaceable images

A simpler native approximation is always `REJECTED`, even when it is neat or editable.

### FIGMA NATIVE TEXT — explicit allowlist only

Only the editable question/answer content is allowed to remain as Figma native text:

- Q5 answer body: Shogo -> Shiori
- Q5 answer body: Shiori -> Shogo
- Q6 three answer/bullet lines

The decorative Q5/Q6 headings, badges, labels and shells are **not** native-text ownership.

Current native text allowlist while migrating from the incorrect build:

- `4669:74` — Q5 body 1
- `4669:78` — Q5 body 2
- `4669:92` — Q6 answer lines

These IDs may change after cleanup; the semantic allowlist above is authoritative. Final QA must prove there are no other visible nodes from `P06_EDITORIAL_NATIVE_V1` acting as title/frame/decorative substitutes.

### Replaceable photo ownership

Keep the four photo masks independent and replaceable:

- `4000:52` main
- `4000:55` food
- `4000:58` pets
- `4000:61` travel

Raster editorial art must sit around/above these windows without flattening the photos into the page art.

## Approved shell assets with native-text slots

Created from the canonical owner raster, preserving raster decoration while removing only the editable answer text areas:

- `P06_FULL_PAGE_ART_SHELL_NATIVE_TEXT_SLOTS_HQ_1055x1491.png`
  - Drive ID: `14nHhLhXs7KGtifSI9BuJeqCM76vCmv1J`
- `P06_Q5_EDITORIAL_SHELL_NATIVE_TEXT_SLOTS_RGBA.png`
  - Drive ID: `1dPdMdLLx621BNywwEJ3DG0e9hJesQ7hZ`
- `P06_Q6_BOTTOM_SHELL_NATIVE_TEXT_SLOTS_RGBA.png`
  - Drive ID: `15nlU8HqfDbIjzBvWBGEYVnf7AVC5Ziit`

These are raster-owned production candidates. They do not authorize native recreation of the surrounding art.

## Required migration order

1. Read the V30 manifest and this authority before any P06 write.
2. Inspect a fresh P06 screenshot and the live node tree.
3. Confirm the four replaceable photo masks still exist.
4. Transfer the approved raster shell/art into Figma losslessly.
5. Keep only the native Q5/Q6 answer text allowlist above the raster shell.
6. Hide/remove `P06_EDITORIAL_NATIVE_V1` decorative substitutes only after the raster replacement is visibly verified.
7. Perform fresh high-resolution screenshot QA against the canonical owner master.
8. Inspect the node tree again: no visible native title/frame/decorative substitutes may remain.
9. Only then mark P06 complete.

## Completion gate

`P06 DESIGN_COMPLETE = YES` is forbidden unless all are true:

- title artwork is raster-owned and visually matches the owner master
- Q5/Q6 shells and decoration are raster-owned
- caption frames/art are raster-owned
- only Q5/Q6 answer content remains native text
- four photo masks remain independently replaceable
- no obvious seams, duplicates, blank regions or fallback native art remain
- fresh live Figma screenshot passes visual QA
- final node inventory passes the native-text allowlist check

## Automation rule

Hourly automation must never choose "visible native fallback" over correct asset ownership. If raster transport is blocked, continue supported lossless transfer work and report the blocker; do **not** recreate the artwork natively.
