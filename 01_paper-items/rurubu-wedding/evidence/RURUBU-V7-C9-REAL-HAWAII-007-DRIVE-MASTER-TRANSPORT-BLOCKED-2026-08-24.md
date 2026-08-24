# RURUBU V7 C9 — Real Hawaii `007.jpg` candidate-master / Figma transport blocker

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Why this matters

The largest current V7/V8 visual gap is legitimate role-specific photography. Instead of generating another plausible Hawaii scene, this run re-used an already-authorized Rurubu real-photo source.

`PHOTO-SHORTLIST-20260730.md` records `007.jpg` from Drive folder `ハワイ写真` as the current real-photo `cover_hero / PRIMARY_CANDIDATE / NOT_FINAL`, selected after same-condition comparison. It is an actual source photograph of the couple in Hawaii, not generated imagery and not a structural placeholder.

## Source / Drive truth

Re-resolved source folder:

- title: `ハワイ写真`
- Drive ID: `1A6cea2UHMv3fiZ43PcCCj3BXxXKK-PyV`

Re-resolved source:

- title: `007.jpg`
- Drive ID: `1_rZYWSiXw_IGmSQR6Sg2YkYeNtLEx9k-`
- MIME: `image/jpeg`
- raw file fetch: PASS
- size: `5,266,253 bytes`
- visual re-inspection: PASS as a legitimate Hawaii/couple source photograph

Candidate master copied to the exact V7 authority folder:

- title: `v7_outer_hawaii_007_realphoto_candidate_master.jpg`
- Drive ID: `1NsFR25Q963Nk847fTMB3elwWy689P8XY`
- destination authority folder: `1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x / RURUBU_V7_HAWAII_PRO_CLEANROOM_2026-08-21`
- copy action: PASS
- exact-title search/readback: PASS

This is a candidate master, not a Final photo promotion.

## Figma bounded setup

Immediate pre-write readback verified current C8 `2381:2` on page `2052:2`, visible at `0 / 13000`, with exactly one current hero:

- `2381:20 / PHOTO / V7_FRONT_HAWAII_HERO_ROLE_DUMMY`
- current dummy hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`

Rollback-safe candidate C9 was created without changing C8:

- candidate root: `2462:2`
- test position: `21600 / 13000`
- target hero: `2462:20`
- target renamed `PHOTO / V7_FRONT_HAWAII_HERO / REAL 007 CANDIDATE / DRIVE 1NsFR25Q963Nk847fTMB3elwWy689P8XY / NOT FINAL`

## Transport failure

Figma `upload_assets` successfully issued a single-use asset upload URL for target `2462:20`, scale mode `FILL`.

Posting the raw verified JPEG to that endpoint failed before Figma mutation with:

`curl: (6) Could not resolve host: mcp.figma.com`

This is not a new failure class. The repository already records the same `mcp.figma.com` DNS/upload transport fingerprint under RSL-005. Per the rule, the same method was not retried.

## Post-failure readback

Before quarantining C9, readback verified its target hero still had the old dummy hash:

`d76eb07d83d042f15044c8bc6bf68d73a73cd77d`

Therefore:

- real 007 placement: **NOT performed**
- C9 visual comparison with the real photo: **NOT performed**
- C9 promotion: **REJECTED/BLOCKED, not attempted as quality promotion**

C9 was quarantined as hidden blocked evidence:

- root: `2462:2`
- name: `BLOCKED / V7 C9 / OUTER REAL 007 CANDIDATE / FIGMA-ASSET-UPLOAD-DNS-BLOCKED / DRIVE MASTER VERIFIED / HIDDEN`
- `visible=false`
- `x=302000`
- parent `2052:2`

C8 `2381:2` remains current/visible and unchanged.

## Failure-learning disposition

Do **not** create a new RSL fingerprint. This is a direct repetition of project rule RSL-005: same failure fingerprint twice without a material environment/capability change requires method switch.

Correct next method:

1. preserve the verified Drive candidate master;
2. do not burn more one-shot upload URLs while DNS capability is unchanged;
3. retry only after a materially different asset-transport environment/capability exists;
4. when upload succeeds, verify new image hash/readback before screenshot QA;
5. then compare C8/C9 at 500 / 1400 / 1587×1123 and re-design crop/area from the real image rather than assuming dummy geometry is final.

## Truth boundary

- legitimate real photo source resolved: YES
- candidate master saved in exact V7 Drive folder: YES
- Drive ID readback: YES
- generated image: NO
- final photo adopted: NO
- Figma placement: NO / BLOCKED
- new Figma image hash: NO
- V6 modified: NO
- V7 current C8 modified: NO
- V8 modified: NO

This is meaningful asset-pipeline progress, not a visual promotion.
