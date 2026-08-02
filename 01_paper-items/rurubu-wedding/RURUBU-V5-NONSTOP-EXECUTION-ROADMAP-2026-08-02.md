# るるぶWEDDING V5 — Nonstop Execution Roadmap

Date: 2026-08-02
Current authority: live Figma + Drive readback + GitHub `main`

Read first:
- `CURRENT-STATUS.md`
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`

## Operating rule

Continue through the next executable gate without waiting for conversational approval unless one of the following is true:

- a real-person photograph requires owner selection or consent
- a printer template or production specification is missing
- an accepted Current asset would need destructive replacement
- two materially different editorial directions require a human preference
- a connector or permission error makes the next write impossible

A failure in one photograph or section must not stop unrelated sections. Mark the blocked role, continue the remaining roles, and return to the blocked role at the end of the phase.

## Mandatory order

For every generated visual:

`generate → visual QA → Drive save → Drive readback → Figma apply → screenshot QA → structure QA → Git record`

Do not move directly from generation to Figma. Do not claim completion from an IMAGE-fill count alone.

## Verified completed

- [x] re-audit live Figma rather than trusting prior completion claims
- [x] preserve V4 rollback frames
- [x] preserve 13 semantic photo roles
- [x] generate 13 realistic V5 dummy candidates
- [x] save all 13 candidates to Drive
- [x] verify the Drive folder contains all 13 individually named files
- [x] prove a safe inline binary-import path using compressed image bytes
- [x] apply the generated cover hero to `IMG_HERO` node `77:148`
- [x] record the first verified Figma image hash and import evidence in Current status

## Still incomplete — do not mark complete early

- [ ] apply the remaining `12 / 13` generated Drive images through the proven inline path
- [ ] record Drive file ID → semantic node ID → Figma image hash mapping for every role
- [ ] run crop and contrast QA for every applied image
- [ ] run whole outer and inside screenshot QA after all large roles are replaced
- [ ] run page-level and detail-level screenshot QA
- [ ] identify and deeply repair the weakest three visual areas
- [ ] remove at least one unnecessary visual element after final review
- [ ] reduce remaining Web-UI card/badge density where it improves editorial rhythm
- [ ] run final missing-font, geometry, semantic-role, fold, and dummy-label audits
- [ ] update GitHub main with only verified counts and evidence

## Current photo priority

Apply and review in this order:

1. back main memory
2. history main
3. groom profile
4. bride profile
5. cover snap
6. memory spot 1
7. memory spot 2
8. memory spot 3
9. memory spot 4
10. Friends & Family 1
11. Friends & Family 2
12. Friends & Family 3

Large roles must be reviewed before small decorative roles because they determine the page color balance and text contrast.

## Current valid status

`RURUBU_V5_CURRENT_CANDIDATE / REALISTIC_DUMMY_PACK_READY_IN_DRIVE / INLINE_FIGMA_IMAGE_IMPORT_PATH_PROVEN / 1_OF_13_HIGH_RES_DUMMIES_APPLIED / REAL_CONTENT_PENDING / PRINT_TEMPLATE_PENDING / NOT_PRINT_READY`

The following status is not yet valid:

`RURUBU_V5_DUMMY_PHOTO_DESIGN_QA_PASS`

It becomes valid only after all 13 intended generated images are applied, mapped, screenshot-reviewed, structurally audited, and recorded on GitHub main.

## After V5 passes

Do not overwrite V5 with the next direction.

Create V6 as a clean-room Hawaii / tropical-resort editorial version with:
- new research
- new generated images
- a new Drive folder
- a new asset register
- separate Figma working frames/page
- no reuse of V5-generated photographs
- independent screenshot QA and Current-candidate decision

Follow the V6 guardrails in:

`POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`

## Real-content phase after dummy-design pass

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

Next valid transitions:

- `RURUBU_V5_DUMMY_PHOTO_DESIGN_QA_PASS / REAL_CONTENT_PENDING / PRINT_TEMPLATE_PENDING`
- `REAL_PHOTO_PLACEMENT_PASS / COPY_PENDING / PRINT_TEMPLATE_PENDING`
- `REAL_CONTENT_EDITORIAL_QA_PASS / PRINT_TEMPLATE_PENDING`
- `PRINT_TEMPLATE_PREFLIGHT_PASS / PHYSICAL_PROOF_PENDING`
- `PHYSICAL_PROOF_PASS / PRINT_READY`

Never skip directly from partial dummy placement to design QA pass or print-ready.
