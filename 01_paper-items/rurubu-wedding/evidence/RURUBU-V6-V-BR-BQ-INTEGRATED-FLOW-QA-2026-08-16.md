# Rurubu WEDDING V6 — Outer V + Profile/Q&A BR + Chronology BQ QA

Date: 2026-08-16
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Scope: Rurubu WEDDING only
V7: HOLD

## Starting point

Previous preferred set:

- Outer T `1447:2`
- Profile/Q&A BK `1462:191`
- Story/chronology BQ `1468:2`

Whole-book review showed two remaining presentation defects that could be fixed without new images or micro-decoration:

1. Outer T back cover read as a photography block followed by a detached `みんなとの思い出 / ふたりの旅年表` block.
2. BK Q&A layout was structurally editorial, but the visible answer copy still read `回答をここに。文量に合わせて調整。`, making the preferred frame look like a wireframe/form rather than a finished magazine study.

## Experiment A — Outer V

Rollback-safe duplicate:

- `1477:2 / PREFERRED / V6_OUTER_V_MEMORY_TO_CHRONOLOGY_FLOW_2026_08_16`
- back page `1477:3`

Bounded change:

- reused the existing memory underline node as `DECOR / MEMORY_CAPTION_STRIP` rather than creating a new decorative family;
- moved native `みんなとの思い出` onto that navy strip over the café photograph;
- pulled the native chronology upward;
- increased the existing WEDDING terminal field to `718×110` to close the page more decisively;
- did not change the front cover;
- did not replace, regenerate, flatten, or rasterize any copy or photography.

Visual result:

- photo → memory heading → chronology → WEDDING now reads as one vertical editorial flow;
- the detached beige section-heading break is removed;
- the café photograph carries a clear magazine-style caption/section role;
- chronology remains native/editable and visually subordinate to photography.

Three-scale verification:

- whole-item thumbnail: `500px` PASS;
- reading scale: `1000px` PASS;
- actual-size back page: `1477:3`, `794×1123` PASS.

Structural verification:

- visible native text: `18`;
- visible replaceable IMAGE roles: `3`;
- text/text collisions: `0`;
- 18px text safe-area risks: `0`;
- photo hashes unchanged from Outer T:
  - dominant flatlay `e3738476f760932bb5b09c9d60f174dd6c84049d`, displayed `793.7×490`, registered intrinsic `944×608`;
  - café `c1ada11205bc3978bf426b304d683f1c1566cac2`, `430×270`;
  - skyline `644f449c3bf2001a94d4b822d2b55e2614c11042`, `232×210`.

Rollback:

- Outer T `1447:2` preserved as hidden rollback.

Status: `VERIFIED_LOCAL / ADOPTED`.

## Experiment B — Profile/Q&A BR

Rollback-safe duplicate:

- `1482:2 / PREFERRED / V6_INSIDE_BR_REALISTIC_NATIVE_QA_DUMMY_COPY_2026_08_16`
- Q&A page `1482:33`

Bounded change:

Only the six native answer text nodes changed. Layout, font sizes, questions, images, masks, photo hashes, pullquote, and Q4 feature geometry remain unchanged from BK.

Visible dummy answers now use realistic Japanese sentence lengths, e.g.:

- `話しやすくて、笑顔が印象的でした。`
- `何でも一緒に楽しんでくれるところ。`
- `旅行の計画を立てている時間。`
- `まだ行ったことのない場所を、ふたりで巡りたい。`
- `いつも隣で笑ってくれて、ありがとう。`
- `よく笑って、旅の話が尽きない家庭。`

These are **layout-evaluation dummy sentences**, not final personal facts.

Visual result:

- the page no longer reads like a questionnaire input template;
- Q1–Q6 now have believable editorial text mass at normal viewing size;
- the existing photo-led hierarchy remains intact.

Verification:

- whole spread `1200px` PASS;
- actual-size Q&A page `1482:33 / 794×1123` PASS;
- visible native text: `25`;
- visible replaceable IMAGE roles: `2`;
- text/text collisions: `0`;
- 18px text safe-area risks: `0`;
- image hashes unchanged from BK:
  - Q&A hero `e3738476f760932bb5b09c9d60f174dd6c84049d`;
  - support `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`.

Rollback:

- BK `1462:191` preserved as hidden rollback.

Status: `VERIFIED_LOCAL / ADOPTED`.

## Current preferred set after this run

- Outer V `1477:2`
- Profile/Q&A BR `1482:2`
- Story/chronology BQ `1468:2`

Start Here `845:27`:

`V5 FU/FX · V6 V + BR/BQ INSIDE STUDIES · V7 HOLD`

## Asset lifecycle truth

- newly generated images: `0`
- new Drive saves: `0`
- new external binary placement: `0`
- existing verified image hashes reused: `YES`
- native editable text preserved: `YES`
- replaceable image roles preserved: `YES`
- generated section decoration newly adopted: `NO`
- whole/read/actual-size visual verification: `YES`
- rollback state preserved: `YES`
- V7 touched: `NO`

## Remaining completion boundary

This is not print-ready. Final real copy/photos, exact printer/product template, bleed/trim/fold/safe-area verification, PDF preflight, and physical proof remain required.