# Rurubu V6 HK/HN visual QA — 2026-08-20

Scope: Rurubu WEDDING only. V7 untouched / HOLD.

## Authority read before writes

- GitHub main at run start: `5591e2dd124a6bbf2b66fc8411d63b1b724748e5`.
- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`.
- Review board: `845:2 / 00_RURUBU_START_HERE`.
- Drive root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.
- Shared system + Rurubu feed + neutral non-Rurubu feed read before production writes.

## Experiment A — HK Profile photo-led opening

### Visible problem

GZ `2004:2` left Profile page opened with a separate cream title field over a relatively shallow photo. Compared at equal scale with HJ Story and HS 1DAY, Profile still read like `header → image → data` rather than one photo-led editorial page.

### Root-cause hypothesis

Existing Profile hero photography already had enough source resolution and a text-safe map/camera area. The hierarchy gap came from assigning too little page responsibility to that valid image, not from missing assets.

### Bounded change

HK `2027:2`, Profile `2027:3` cloned from GZ:

- hero hash `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- source `944×608`;
- display changed to `793.7×480`, y `0`, rotation `0°`;
- native title / accent / deck moved into the photo-led opening;
- native deck moved to a verified top-right text-safe zone after safe-area QA;
- lower route texture and replaceable snapshots kept independent;
- Q&A geometry and image roles unchanged.

### Three-scale evidence

- whole / 500px: PASS, stronger than GZ;
- reading / 1200px: PASS;
- actual Profile / `794×1123`: PASS.

### Structure/source QA

- Profile native text `26`; collisions `0`; 18px safe risks `0`.
- Q&A native text `29`; collisions `0`; 18px safe risks `0`.
- Profile visible images all intrinsic-safe:
  - hero `793.7×480 / 944×608`;
  - route texture `720×430 / 720×860`;
  - snapshot 1 `410×280 / 1356×560`;
  - snapshot 2 `320×235 / 352×368`.
- new image hash `0`.

Decision: `HK ADOPTED / VERIFIED_LOCAL`.

Rollback: GZ `2004:2` hidden and preserved.

## Experiment B — HN cover repeated-photo subtraction

### Visible problem

HD `2014:2` front already had a dominant Yokohama hero and a large dining support image, while Feature 03 also used the same cafe source already repeated across many V6 pages. That support image carried no unique evidence for `ゲストと楽しむ旅のしおり` and made the lower cover read as another small photo card.

### Root-cause hypothesis

Feature 03 did not require replacement photography. Native typography could carry the role while dining retained photographic mass, reducing repetition without introducing a semantically false alternate photo.

### Bounded change

HN `2029:2`, front `2029:63` cloned from HD:

- hid only the repeated cafe support hash `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- retained dining support and every other cover photo/crop/hash;
- enlarged native `03` and native `ゲストと楽しむ / 旅のしおり` on cream;
- retained one narrow yellow binding rail;
- no new image/card/generated decoration/factual copy.

Initial candidate inherited a white Feature 03 title from its former photo-overlay context. Actual-size review showed weak white-on-cream contrast. That state was rejected; title was switched to the existing cover navy and reverified.

### Three-scale evidence

- whole / 1200px: PASS, stronger than HD;
- actual front / `794×1123`: PASS;
- back inherited HD geometry and revalidated structurally.

### Structure/source QA

- front native text `13`; collisions `0`; 18px safe risks `0`;
- back native text `26`; collisions `0`; 18px safe risks `0`;
- front/back image intrinsic violations `0`;
- new image hash `0`.

Decision: `HN ADOPTED / VERIFIED_LOCAL`.

Rollback: HD `2014:2` hidden and preserved.

## Preferred-set image audit after adoption

Live preferred:

- HN `2029:2`
- HK `2027:2`
- HJ `2024:2`
- GY `2003:2`
- HC `2012:2`
- HS `2019:2`

Audit:

- visible IMAGE roles: `28`;
- unique hashes: `8`;
- waterfront `539c259be8036b481d06b4f76db9a39b407d90e8`: `5` roles;
- dining `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`: `5` roles;
- cafe `c1ada11205bc3978bf426b304d683f1c1566cac2`: `4` roles, reduced from `5`;
- composed route texture `691a6ceed471a5d8efa144052a10564eed177b4f`: `4` roles;
- skyline `644f449c3bf2001a94d4b822d2b55e2614c11042`: `3` roles;
- street `439a719d73f28e8dd2889f2026cccb15f345ec63`: `3` roles;
- flatlay `e3738476f760932bb5b09c9d60f174dd6c84049d`: `3` roles.

The reduction is not treated as a numerical target. Future changes must preserve semantic truth; do not insert unrelated destination imagery only to lower repetition counts.

## Failure fingerprints

### `READ_ONLY_QA_SCRIPT_SCOPE_TYPO`

A structure-only Figma script referenced an undefined local variable and failed atomically. No mutation occurred; the corrected script was used once.

### `PHOTO_LED_TITLE_TEXT_SAFE_AREA_DRIFT`

A photo-led title can look correct in screenshot while a small native deck still breaches the 18px print-safe boundary. Final HK deck was repositioned before adoption.

### `TEXT_ROLE_CONTEXT_COLOR_DRIFT`

When a native text role moves from image-overlay context to cream paper, inherited white fill can become unreadable. HN actual-size QA caught this; existing navy was restored.

## Asset lifecycle declaration

- generated: `0`
- new Drive saved: `0`
- transported: `0`
- new image hash: `0`
- HK adopted/placed/visually verified: YES
- HN adopted/placed/visually verified: YES
- rollback preserved: YES
- native variable text preserved: YES
- replaceable photo roles preserved: YES
- V7 touched: NO

## Completion statement

This is meaningful V6 dummy-design progress, not print readiness. Final legitimate photos/copy, page count/imposition, exact printer template, bleed/trim/fold rules, PDF preflight and physical proof remain open gates.
