# RURUBU WEDDING V6 — O / AL / AI intrinsic-size reconciliation

Date: 2026-08-16
Scope: Rurubu WEDDING only
GitHub main immediately before this evidence write: `05f08878c64bc9ecf859d1d3e23941675ea12eee`
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Purpose

A fresh active-hash/display-size audit was run before creating the O/AL/AI active asset ledger. The audit intentionally treats a visually acceptable screenshot as insufficient when a registered raster is being enlarged beyond intrinsic dimensions.

## Defects found

The small Yokohama postcard source has registered intrinsic size `240×220` and hash:

`644f449c3bf2001a94d4b822d2b55e2614c11042`

Three current preferred uses exceeded that source before repair:

- AL Q&A support `1373:56`: `190×255` — height exceeded intrinsic
- AI Story support `1363:131`: `260×235` — width and height exceeded intrinsic
- AI Event 03 `1363:150`: `255×165` — width exceeded intrinsic

A second, more serious issue was also found:

- AL Q&A Memories hero `1373:55`
- previous hash `439a719d73f28e8dd2889f2026cccb15f345ec63`
- registered source `352×368`
- previous display `705×545`

This was a substantial upscale and matched the existing Rurubu weak-raster-enlargement failure fingerprint.

## Repairs

### Small postcard roles

The three small postcard uses were reduced without changing semantic roles:

- AL Q&A support `1373:56` → `175×205`
- AI Story support `1363:131` → `235×210`
- AI Event 03 `1363:150` → `235×160`

All now remain at or below `240×220` intrinsic dimensions.

Fresh page structure audit after repair:

- AL Q&A text/text intersections: `0`
- AL Q&A 18 px text safe-area risks: `0`
- AI Story text/text intersections: `0`
- AI Story 18 px text safe-area risks: `0`
- AI chronology text/text intersections: `0`
- AI chronology 18 px text safe-area risks: `0`

Fresh 1400 px screenshots of AL and AI showed no material hierarchy regression.

### Q&A Memories hero

Instead of shrinking the dominant Memories role until it lost editorial impact, the source was reassigned using an already verified resident dining image:

- new hash: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- registered source: `732×498`
- target node: `1373:55 / PHOTO / QA_MEMORY_HERO_REPLACEABLE`
- final display: `705×480`
- scale mode: `FILL`

This is close to the source aspect ratio and below intrinsic dimensions in both axes.

The image fill was copied from the already verified resident Outer O dining node rather than reopening external binary transport.

Q&A support `1373:56` was repositioned to retain controlled overlap with the new wide hero.

Fresh QA:

- 1400 px AL spread: PASS
- actual-size Q&A `1373:30`, `794×1123`: PASS
- Q&A text/text intersections: `0`
- 18 px text safe-area risks: `0`

## Current conclusion

After these repairs, the known registered raster roles in current preferred O + AL/AI are no longer intentionally enlarged beyond their registered intrinsic dimensions.

This conclusion is limited to the registered dummy sources and current display boxes. It does not declare final print resolution or `PRINT_READY`; real-photo substitution and printer-specific effective-DPI/preflight remain later gates.

## Lifecycle truth

- new generation: `0`
- new Drive save: `0`
- new external binary upload: `0`
- existing verified resident image source reused: `YES`
- source-role reassignment visually verified: `YES`
- semantic replaceable IMAGE roles preserved: `YES`
- V7 edited: `NO`

Status: `INTRINSIC_RECONCILIATION_PASS / VERIFIED_LOCAL / V7_HOLD / NOT_PRINT_READY`.
