# るるぶWEDDING V5 — Nonstop Execution Roadmap

Date: 2026-08-02

## Operating rule

Continue through the next executable gate without waiting for conversational approval unless one of the following is true:

- a real-person photograph requires owner selection or consent
- a printer template or production specification is missing
- an accepted Current asset would need destructive replacement
- two materially different editorial directions require a human preference
- a connector or permission error makes the next write impossible

A failure in one photograph or section must not stop unrelated sections. Mark the blocked role, continue the remaining roles, and return to the blocked role at the end of the phase.

## Completed in this checkpoint

- [x] re-audit live Figma rather than trusting prior completion claims
- [x] preserve V4 rollback frames
- [x] assign 13 semantic photo roles
- [x] generate and save 13 dummy candidate images to Drive
- [x] replace 13 gradient-only semantic photo placeholders with image fills
- [x] reduce repeated card / chip / pill styling
- [x] reduce repeated shadows and excessive corner radii
- [x] remove redundant micro badges where present
- [x] raise undersized editorial text where required
- [x] run outer and inside screenshot QA
- [x] fix the three weakest areas
- [x] run screenshot re-QA
- [x] run missing-font, geometry, semantic-role and fold-safety audits
- [x] record the live state on GitHub main

## Next autonomous phase: real content intake

### Gate A — final photograph collection

Required from the couple:

- cover hero candidate photographs
- cover inset photograph
- groom and bride profile photographs
- one history photograph
- four memory-spot photographs
- one back-cover main photograph
- three Friends & Family photographs

For each role:

- preserve the semantic node name
- record source and approval status
- verify crop flexibility
- avoid putting key faces on fold or trim zones
- confirm the person may appear in the printed booklet

### Gate B — final copy

Required content:

- profile facts and introductions
- Q&A answers at realistic final length
- relationship history dates and descriptions
- four memory-spot names and captions
- Friends & Family captions
- route labels and back-cover closing copy

After insertion:

- fix Japanese line breaks and prohibited-start/end characters
- recheck body size, line height and paragraph spacing
- remove dummy-language labels from the printed area
- retain an internal layer-level dummy/final status marker

### Gate C — printer specification

Required:

- printer name
- final finished size
- spread / page order
- bleed
- trim
- fold position and tolerance
- color mode and PDF preset
- minimum image resolution
- binding / folding method

Do not declare `PRINT_READY` before this gate is complete.

## Final production QA sequence

1. whole outer spread screenshot
2. whole inside spread screenshot
3. cover page detail
4. back cover detail
5. profile and Q&A detail
6. history and memory detail
7. logo, date and photo-title contrast
8. small captions and folios
9. fold, trim and safe-area check
10. exported PDF preflight
11. full-size paper proof
12. physical proofreading by at least two people

## Status transition rules

Current:

`RURUBU_V5_DUMMY_PHOTO_DESIGN_QA_PASS / REAL_CONTENT_PENDING / PRINT_TEMPLATE_PENDING / NOT_PRINT_READY`

Next valid transitions:

- `REAL_PHOTO_PLACEMENT_PASS / COPY_PENDING / PRINT_TEMPLATE_PENDING`
- `REAL_CONTENT_EDITORIAL_QA_PASS / PRINT_TEMPLATE_PENDING`
- `PRINT_TEMPLATE_PREFLIGHT_PASS / PHYSICAL_PROOF_PENDING`
- `PHYSICAL_PROOF_PASS / PRINT_READY`

Never skip directly from dummy-photo design QA to print-ready.
