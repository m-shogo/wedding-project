# るるぶWEDDING V5 — Editorial Reduction Pass

Date: 2026-08-02
Live Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM
Outer frame: `77:18`
Inside frame: `77:290`
Status: `VERIFIED_INCREMENTAL_IMPROVEMENT / PHOTO_GATE_UNCHANGED`

## Purpose

Apply the magazine-editorial principle that hierarchy, typography, photography, alignment, and white space should carry supporting information before full cards and decorative containers are added.

This pass does not claim V5 completion. The dominant-photo quality gate remains open.

## Outer spread changes

### Friends & Family captions

Removed the visible surfaces, borders, and effects from:

- `77:37` — `BACK_VISUAL_FRIEND_1_CAP_BG`
- `77:41` — `BACK_VISUAL_FRIEND_2_CAP_BG`
- `77:45` — `BACK_VISUAL_FRIEND_3_CAP_BG`

Preserved native caption text:

- `77:38`
- `77:42`
- `77:46`

Result:
- captions now read as editorial captions associated with photographs
- three repeated note-card surfaces no longer create a dashboard/grid impression
- the photographic rhythm is clearer

### Front-cover lower feature area

Removed two secondary full background boxes:

- `77:217` — `FEATURE_BOX_3`
- `77:221` — `FEATURE_BOX_4`

Preserved:

- number markers `77:218`, `77:219`, `77:222`, `77:223`
- feature text `77:220`, `77:224`

Adjusted `77:224` to dark navy text because its orange background was removed.

Result:
- features 03 and 04 become secondary to the dominant feature modules 01 and 02
- the lower area has unequal hierarchy rather than four similarly loud cards
- the front cover remains abundant without using a full container for every feature

## Inside spread changes

Removed the large Q&A panel surface from:

- `77:307` — `IA_QA_PANEL`

Preserved:

- Q&A headings and body text
- number circles
- editorial color rules
- the primary-question left/base rules
- the secondary-question top rules

Removed one redundant decorative heart:

- `77:362` — `AUTH_QA_HEART`

Result:
- the Q&A reads as an article/interview area rather than a large app card
- the existing rule system is now more visible as the organizing device
- the page has more breathing room while retaining section identity

## Verification

Whole-spread screenshots were captured after both writes.

Outer verification:
- captions remain readable
- feature 03/04 labels remain readable
- number markers remain aligned
- no text or semantic nodes were flattened or deleted
- V4 rollback remains untouched

Inside verification:
- all three Q&A groups remain readable
- the colored rule hierarchy is intact
- removal of the outer panel does not cause overlap
- profile and memory sections remain unchanged
- V4 rollback remains untouched

## Failure and correction during execution

First write attempt failed atomically because the shared plugin-data namespace contained a hyphen.

Observed error:
- namespace accepts only alphanumeric characters, `_`, or `.`

Correction:
- do not use hyphens in shared-plugin-data namespaces
- failed atomic calls are not counted as progress
- corrected call omitted nonessential metadata and applied only the visual changes

This operational lesson has been promoted into:
- `docs/wedding-figma-production-system.md`

## Editorial assessment

Improved:
- reduced repeated card surfaces
- clearer primary/secondary hierarchy
- more direct photo-caption relationship
- less Web-UI/Canva-template character
- better use of existing rules and white space

Still weak:
- cover, back-cover, and history dominant photographs remain visibly low-resolution
- several visual motifs still compete on the front cover
- final Japanese typography and actual-size QA remain incomplete
- real copy and real photographs remain pending
- print template and physical proof remain pending

## Current truth

This pass is a verified design improvement, not a completion gate.

Unchanged critical status:
- high-quality intended photo derivatives: incomplete
- `PHOTO_ROLE_PASS`: `0 / 13`
- `NOT_PRINT_READY`

## Project-wide promotion

The following lessons now apply to all wedding Figma items:

- remove unnecessary containers before adding decoration
- preserve native text and semantic roles
- verify each incremental change with screenshots
- record exact node IDs
- treat plugin success and visual success as separate states
- preserve rollback before structural work

Project-wide authorities:
- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
