# Rurubu WEDDING V5 — CM/CN clean-room editorial QA + deterministic Q60 staging

Date: 2026-08-11
Scope: Rurubu WEDDING only

Current outer `77:18` and Current inside `77:290` were re-read before each Figma write and remained untouched.

## Starting question

Would the prior strongest pair, CK outer `813:2` + CC inside `801:2`, be selected from scratch?

Decision: **not yet**.

- CC still read too much like a two-column Q&A/form system below the profile photography.
- CK proved useful wide-hero geometry but used the history derivative for a cover-role composition test, leaving semantic cover provenance unresolved and an overly quiet cream field.

## CM inside — accepted as new inside comparator

Created rollback-safe duplicate:
- frame `818:2`
- name `V5_INSIDE_RURUBU_CLEANROOM_CM_QA_EDITORIAL_HIERARCHY_2026_08_11`

Visible problem:
- Q1/Q2/Q3 were still too equal and too close to a UI/form layout.

Principle tested:
- give one question editorial dominance, demote the others to compact notes, and create rhythm with native Japanese type + short rules rather than cards.

Changes:
- Q1 number enlarged into a primary editorial anchor.
- Q1 answer promoted into a two-line pull quote with a narrow magenta rule.
- Q2/Q3 compressed into smaller right-column notes with cyan/yellow rules.
- redundant QA rule removed.
- common-point treatment reduced to a narrow yellow print accent plus native text.

Regression found and repaired:
- first screenshot exposed `01` wrapping vertically and the pull quote breaking to three lines; resized/reflowed before adoption.
- structure QA then detected Q2 number/title and Q3 number/title intersections; both were repaired before final QA.

Final CM structure evidence:
- visible native text: `54`
- visible IMAGE nodes: `6`
- same-parent text intersections: `0`
- fold: `818:283`, visible, x `792.7`, `2 × 1122.5`
- preserved image hashes:
  - groom `a39dd297eb9de572317a5ce57f0af12e8597b156`
  - bride `2359f635b4926a83e22ca1f9214e75c709291152`
  - history `539c259be8036b481d06b4f76db9a39b407d90e8`
  - memory 01 `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - memory 02 `439a719d73f28e8dd2889f2026cccb15f345ec63`
  - memory 03/current-visible replacement `c09aa82e7b2ac75708707345c6f845452bf67663`

Visual status: whole-spread/reading/actual-size screenshots reviewed; CM is stronger than CC because Q1 now acts as an editorial story anchor instead of an equal form row.

Adoption: **accepted as strongest inside comparator, not Current**.

## CN outer — accepted composition comparator; raster gate still open

Created rollback-safe duplicate:
- frame `819:2`
- front `819:131`
- hero `819:133`
- name `V5_OUTER_RURUBU_CLEANROOM_CN_SEMANTIC_HERO_MASS_2026_08_11`

Visible problem:
- CK used a semantically wrong history image to prove hero geometry and reduced the hero to a short panorama, so the lower cream field still dominated the silhouette.

Principle tested:
- use the correct semantic cover image family even when the currently placed derivative is low-quality, purely as a composition proxy; enlarge photo mass toward the prepared Q60 aspect relationship, then build density through overlapping 01/02/03 photography rather than more containers.

Changes:
- hero `819:133` uses Current V5-01 cover hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912` as a **low-quality semantic proxy only**.
- hero geometry changed to `793.7 × 575`.
- `横浜 / ふたり旅。` remains dominant native typography over the photograph.
- feature 01 retains the largest typographic weight.
- feature 02 photograph overlaps the hero boundary.
- feature 03 photograph expands to `704 × 286` across the lower page.
- no new card system was introduced.

Regression found and repaired:
- structure QA detected one 02 number/title intersection; repaired before final QA.

Final CN structure evidence:
- visible native text: `37`
- visible IMAGE nodes: `7`
- same-parent text intersections: `0`
- fold: `819:184`, visible, x `792.7`, `2 × 1122.5`
- hero node `819:133`, `793.7 × 575`, proxy hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`

Three-scale result:
- thumbnail: stronger photo-led silhouette and clearer 01 >> 02/03 hierarchy than CK.
- whole spread/reading: front and back now share denser editorial rhythm without adding UI modules.
- actual-size: the layout is stronger, but the existing V5-01 raster is visibly pixelated; this is an explicit FAIL for asset quality, not masked by the layout win.

Adoption: **accepted as strongest outer composition comparator, not Current; Q60 raster still required**.

## Exact Q60 source readback

Fresh Google Drive authority:
- file `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- JPEG
- bytes `155,439`
- dimensions `1330 × 1220`
- SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

The materialized JPEG was visually inspected before transport: believable Yokohama/Minato Mirai waterfront at sunset, appropriate cover-role landmark context, usable sky/water text-safe area, no baked editorial copy. It remains the intended higher-quality cover derivative.

## Deterministic binary staging progress

The previously proven hidden transfer node `80:18` is being reused because external upload/DNS paths are already a repeated blocker.

New namespace: `rurubu_q60_20260811`.

Each segment is verified in the same Figma invocation before write and immediately after readback using exact length + FNV-1a.

Verified staged segments this run:
- `c00`: length `12000`, FNV `46fd192d`, starts `/9j/4AAQSkZJ`, ends `FVKtLo8WtyxB`
- `c01`: length `12000`, FNV `f9ed8c47`, starts `bAm5Bm0ZIduC`, ends `rPX57PHO3czW`

This is **partial staging only**. No Q60 image has been created in Figma and no hero fill has been changed to Q60 yet.

Required remaining sequence:
1. continue deterministic chunks from exact Drive-readback bytes;
2. verify complete base64 length `207252`;
3. decode and verify JPEG byte count `155439` plus markers;
4. create Figma image from exact bytes;
5. apply only to rollback-safe CN-derived hero target;
6. verify resulting node/image hash;
7. run thumbnail, reading, and actual-size screenshot QA;
8. update V5 role evidence only after screenshot + structure pass.

## State at end of this run

- new image generation: `0`
- newly accepted generated master: `0`
- Q60 Drive readback + master visual QA: `YES`
- Q60 exact Figma placement: `NO`
- Q60 Figma visual QA: `NO`
- CM placed / visually verified / structure verified: `YES`
- CN placed / visually verified / structure verified: `YES` for composition only
- Current outer/inside changed: `NO`
- V5 PHOTO_ROLE_PASS: remains `9/10`
- dominant-photo pass: remains `2/3`
- V5 complete: `NO`
- V6 production started: `NO`

## Next application

Do not spend the next iteration polishing around the pixelated cover proxy. Finish deterministic Q60 transport first, then judge CN with the intended raster. If Q60 changes the crop hierarchy unfavorably, repair the duplicate non-destructively and re-run all three scales before any promotion.
