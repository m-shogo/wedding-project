# Rurubu V5 — inside footer folio comparison

Date: 2026-08-07
Status: `PROTOTYPED → VERIFIED / THIN_STRIP_ADOPTED / DIRECT_TYPE_REJECTED_FOR_CURRENT`
Scope: Rurubu WEDDING V5 only
Live Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Current inside candidate: `77:290`

## Authorities and live state reviewed

Before the experiment, the current project-wide production system, asset-generation memory, continuous-learning system, feedback log, project memory, quality-over-legacy decision, Rurubu Current Status, V5 asset evidence ledger, editorial knowledge base, lessons log, V5 production operating system, postmortem, V6 Current Status, V6 Hawaii reference analysis, and V6 asset queue were re-read from GitHub `main`. The V5 Drive folder was also re-read and the live Figma outer/inside candidates were screenshot-reviewed.

The asset ledger remains authoritative: active Current photo roles `12`, retired preserved role `1`, `PHOTO_ROLE_PASS 0`. This experiment does not change any photo-role lifecycle state.

## Visible problem

The inside-right page still ended with `77:486 / PAGE_BOTTOM_BAR`, a `700 × 28` dark-navy rounded rectangle with `cornerRadius 14`, carrying `77:487 / PAGE_BOTTOM_BAR_TXT`.

After the outer front/back folios had already been reduced to square editorial strips, this remaining rounded inside footer read more like a persistent UI/status bar than magazine micro-navigation. It also visually over-weighted a low-priority folio compared with the history and memory content above it.

## Legacy challenge

Question: would the rounded `700 × 28` footer still be chosen if it did not already exist?

Answer: no. The content is useful as issue/section micro-navigation, but the rounded container is not required for meaning.

## Hypothesis and alternatives

Two rollback-safe alternatives were created from Current without touching Current first.

### Candidate A — thin square folio strip

Frame:
- `356:2 / V5_INSIDE_FOOTER_THIN_STRIP_TEST_2026_08_07`

Changes in duplicate:
- footer bar: `700 × 28 / radius 14` → `700 × 20 / radius 0`
- bar Y: `1068 → 1076`
- text Y: `1074 → 1080`
- native text content unchanged

Expected improvement:
- retain strong microtext contrast and folio function
- reduce UI/status-bar silhouette
- align the inside ending with print-editorial strip behavior

Possible regression:
- could still be more container than necessary
- thinner bar could become visually weak at actual size

### Candidate B — clean-room direct microtype

Frame:
- `356:262 / V5_INSIDE_FOOTER_DIRECT_TYPE_TEST_2026_08_07`

Changes in duplicate:
- dark footer field hidden
- existing native folio text retained and changed to dark navy directly on the pale-blue page
- text moved to the lower baseline region

Expected improvement:
- maximum subtraction
- no full-width container
- quiet editorial finish

Possible regression:
- microtype could become too weak at actual print size
- page ending could lose a deliberate issue/folio anchor

## Three-scale comparison

### Thumbnail / whole spread

Candidate A improved the page ending substantially versus Current: the lower edge became quieter without disappearing. The strip remains visually subordinate to `OUR HISTORY`, the history image, and `MEMORY SPOTS`.

Candidate B was the quietest, but at whole-spread scale the folio almost disappeared. The bottom-right page then felt slightly under-anchored relative to the more structured left-page ending.

Decision at this scale: A preferred.

### Reading / page scale

Candidate A preserves a clear close after the memory-spots body and provides useful section identity without creating a rounded UI pill.

Candidate B preserves information, but the microtype is easy to skip entirely and loses the deliberate printed-folio relationship.

Decision at this scale: A preferred.

### Detail / actual-size check

The direct-type text renders at approximately `284 × 10` natural pixels in its isolated screenshot. It remains technically legible, but removing the dark contrast field makes the already-small folio less robust for real-size print reading. Candidate A keeps the same native text while retaining stronger contrast in a thinner, square field.

Decision at this scale: A preferred; B rejected for Current.

## Current adoption

Applied to live Current only after comparison:

- `77:486 / PAGE_BOTTOM_BAR`
  - before: `700 × 28`, `y 1068`, `cornerRadius 14`
  - after: `700 × 20`, `y 1076`, `cornerRadius 0`
- `77:487 / PAGE_BOTTOM_BAR_TXT`
  - native text preserved
  - content unchanged: `RURUBU WEDDING  •  PROFILE / HISTORY / MEMORY SPOTS`
  - `y 1074 → 1080`

Preserved comparison evidence:
- `356:2` thin-strip candidate
- `356:262` direct-type clean-room candidate

Preserved rollback evidence:
- `59:2` outer V4
- `59:178` inside V4

## Structure verification

Post-adoption live audit:
- native text nodes: `92`
- visible text nodes: `57`
- IMAGE-fill nodes: `9`
- fold guide `77:540`: preserved and visible
- history hash `77:422`: `1bfd7f1fa601206bfed1594a140b40554e85d77a`
- groom hash `77:296`: `bef2164a2fc70e882f31f735bf66773299b1a62e`
- bride hash `77:302`: `1c6a3d54817e2ca8e25a3d9b700e7ab9cb4ff4fd`

No image, crop, photo role, semantic photo node, or asset provenance was changed.

## Result

`DISCOVERED → PROTOTYPED → VERIFIED / CANDIDATE_A_ADOPTED / CANDIDATE_B_REJECTED_FOR_CURRENT`

This is a V5-specific verified gain. It is not promoted directly to `PROJECT_RULE`.

## Failure / rejection lesson

Subtraction is not automatically superior merely because it removes more material. The direct-type option removed the UI container completely, but the folio became too weak at whole-spread and actual-size scales. The correct reduction preserved the semantic job and contrast while removing only the unnecessary height and rounded geometry.

## Next application

Return priority to the unresolved V5 dominant-photo lifecycle. The Drive folder still contains quality-passing role-sized hero/history/back derivatives, but the previously repeated runtime-to-`mcp.figma.com` upload path remains a loop-break fingerprint. Do not retry that same transport path unchanged. Continue only with a genuinely changed binary-safe method or another bounded high-impact V5 QA step while keeping `PHOTO_ROLE_PASS` unchanged.
