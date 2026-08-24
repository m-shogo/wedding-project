# RURUBU V7 C12 — Real Hawaii 007 Environmental-Portrait Crop Screen QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## New professional research

This pass rotated to editorial environmental portrait / cover photography rather than repeating prior numbering, folio, or microcopy work. Society of Publication Designers case material was used as a professional reference for the principle that a portrait can carry both the people and the environment/story, rather than reducing the photograph to a face crop or generic place background.

Rurubu hypothesis: for the V7 Outer real Hawaii photo, the cover should not optimize only for larger people or only for more destination scenery. The crop should preserve enough couple scale to read immediately as WEDDING while retaining enough beach/island context to create travel desire.

## Source truth

Legitimate real source/master:
- source `007.jpg`: Drive `1_rZYWSiXw_IGmSQR6Sg2YkYeNtLEx9k-`
- V7 master `v7_outer_hawaii_007_realphoto_candidate_master.jpg`: Drive `1NsFR25Q963Nk847fTMB3elwWy689P8XY`
- verified master: JPEG, `4500×3000`, 5,266,253 bytes

Current Figma comparison derivative remains only `350×233`, imageHash `e9c5d4b516f723b16994a92d0b96a46aaf7619f8`. It is valid for screen composition testing only, not print-resolution approval.

## Same-condition crop comparison

C10 `2483:2` — tight people-first crop:
- transform `[[0.72,0,0.20],[0,0.72,0.20]]`
- stronger couple recognition than C9
- comparison showed destination/environment context reduced more than necessary once C11/C12 existed
- final state: `SUPERSEDED`, hidden, not current

C11 `2486:2` — environment-heavy crop:
- transform `[[0.84,0,0.08],[0,0.84,0.10]]`
- beach/island context reads strongly
- couple becomes too small relative to the wedding-cover job
- final state: `REJECTED`, hidden, not current

C12 `2486:33` — intermediate people+place crop:
- hero `2486:51`
- transform `[[0.78,0,0.14],[0,0.78,0.14]]`
- same real-photo derivative and same page layout; only crop changed
- retains visible island/sea while keeping the couple clearly legible as the wedding subject
- final state: `PREFERRED SCREEN-COMPOSITION EVIDENCE`, hidden, not current

## QA

C12:
- 500/thumbnail-equivalent: PASS; stronger balance of wedding identity + Hawaii destination than C10/C11
- 1400 reading/page: PASS for screen composition
- actual-size/detail: BLOCKED because source in Figma is only `350×233`
- native visible text: `17`
- visible IMAGE-fill descendants: `6`
- text-text intersections: `0`
- 18px edge risks: `0`
- parent: `2052:2`

C8 `2381:2` remains current until a sufficiently high-resolution real-photo derivative/master is actually placed and actual-size/detail QA passes.

## Professional critique

- Art director: PASS for a clearer combined idea — WEDDING subject plus Hawaii destination, rather than one winning at the expense of the other.
- Editorial designer: PASS at screen scale; cover read is immediate and unchanged typography remains coherent.
- Book designer: not decisive for whole-publication sequencing; this is an Outer-only test.
- Typographer: no change.
- Photo editor: C12 is preferred among the three screen crops because it preserves environmental evidence while maintaining subject presence.
- Print designer: BLOCKED; the Figma derivative is too small to approve actual-size/print quality.

## Learning boundary

State: `TESTED_LOCAL / HIRES-PLACEMENT-BLOCKED`.

Do not promote a numeric crop transform. Transfer only the decision principle: when a cover photograph is an environmental portrait, test subject recognition and place/story evidence together; do not maximize one blindly. High-resolution placement and print proof remain separate gates.
