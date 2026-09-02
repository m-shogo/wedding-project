# Rurubu WEDDING V30 — Codex P02 Production Handoff

Date: 2026-09-02
Scope: **P02 production only**

Repository: `m-shogo/wedding-project`
Branch: `rurubu/v30-final-production-20260901`
PR: `#878`

Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Figma page: `V30_FINAL_PRODUCTION`
P02 target frame: `3535:9`

P01 `3535:7` is LOCKED. Do not modify it.
Do not touch P03–P08.
Do not create V31.

---

## Mission

Build P02 directly into existing frame `3535:9` as the first real production version, aiming for a near-final result in one pass.

Do not create a duplicate P02 frame.
Do not turn this into a long exploratory/QA loop.

---

## Required read set before writes

Read the latest remote authority first:

1. `docs/RURUBU-CURRENT.md`
2. `assets/rurubu-v30/p02/P02.png`
3. `assets/rurubu-v30/manifest.json`
4. `assets/rurubu-v30/visual-polish-manifest.json`
5. `assets/rurubu-v30/p02/manifest.json`
6. `assets/rurubu-v30/p02/polish-manifest.json`
7. `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`

Newest page-polish authority wins over conflicting older execution details.

---

## P02 visual intent

This is a lively Japanese travel-magazine profile page, not a generic wedding profile card UI.

Three-second read should be:

1. large hot-pink `プロフィール` header/title system;
2. two large portrait prints;
3. SHOGO / SHIORI speech-bubble labels;
4. blue/pink profile sheets;
5. Q1 / Q2 lower editorial modules;
6. PAGE 02 + travel/tropical accents.

Preserve tactile paper, irregular printed edges, local overlap and asymmetry.
Avoid sterile equal cards, SaaS-like shadows, generic gradients and mechanical mirroring.

---

## Hard role locks

- **Left = SHOGO / blue**
- **Right = SHIORI / pink**
- Q1 has the inset couple photo.
- Q2 intentionally has **no inset photo**.
- Do not mirror every flower/icon/offset between left and right.

---

## Fixed authored display modules

Treat short fixed editorial objects as complete authored modules when that gives stronger fidelity than generic native text + shapes.

Primary targets:

- P02 header/title system;
- SHOGO name bubble;
- SHIORI name bubble;
- SHOGO profile-sheet shell;
- SHIORI profile-sheet shell;
- Q1 display shell;
- Q2 display shell;
- PAGE 02 badge.

Keep real/replaceable photos separate from these modules.

---

## Copy safety — do not invent personal facts

Locked:
- `SHOGO`
- `SHIORI`
- `PAGE 02`

Do **not** promote reference-only personal content into factual guest-facing copy without an approved source.

Keep separately controllable / TBD where not explicitly grounded:

- Japanese name readings;
- profile values/answers;
- header subtitle sentence;
- Q1 question/answer if not copy-locked;
- Q2 question/answer if not copy-locked;
- any personal fact.

Do not bake TBD/personal copy into generated raster art.

---

## Photo contracts

Use only clean standalone photo content.

Required replaceable slots:

1. `P02_PHOTO_SHOGO` — one-person male-role portrait/upper body;
2. `P02_PHOTO_SHIORI` — one-person female-role portrait/upper body;
3. `P02_Q1_INSET_COUPLE_PHOTO` — two-person couple photo inside Q1 only.

Hard reject:

- any crop from `P02.png`;
- any page screenshot used as a photo fill;
- any proxy containing title, border, flower, profile sheet, Q shell, icon or other page decoration.

Final owner photos must later replace only the photo fills, without rebuilding surrounding decoration.

---

## P01 lessons to apply from the start

### Alpha

For every opaque paper/profile/Q/badge/ticket-like production asset:

- outside intended cutout = transparent;
- inside intended paper core = alpha `>= 0.95`, preferably `1.00`;
- no large accidental translucent paper interiors;
- no rescue white rectangles to fake broken alpha.

If one same-family white-paper module fails, run one quick sibling sweep and repair asset-side defects immediately.

### Border depth

Airmail border is background-adjacent by default:

`background → border → portraits/photos → authored modules → stickers/foreground accents`

Do not let the border slice across editorial content.

### Fast-fail

If a cheap generated asset is clearly wrong, do not spend time repeatedly diagnosing it.

`one discriminator → regenerate/re-cut → replace → continue`

---

## Figma execution

Build directly in `3535:9`.

- Preserve A5 frame `559 × 794`.
- Make the P02 frame visible for production/QA.
- Keep LIVE current-only.
- Remove superseded/duplicate layers created during this run.
- Do not create a second P02 frame.
- Do not alter P01 `3535:7` or other page frames.

Aim to get the full composition in place before polishing micro-details.

---

## Efficient QA — no P01-style overrun

P02 is a full production page, so use one strong first build and one bounded polish cycle.

Flow:

1. build full P02;
2. capture one full-page screenshot;
3. compare directly to `P02.png` for only the important deltas;
4. fix the visible deltas;
5. capture one final full-page screenshot;
6. run one final A5/readability check if needed;
7. commit/push production assets + authority updates;
8. stop.

Do not produce repeated midpoint screenshots or repeated full-page certification loops unless the final comparison genuinely fails.

---

## Acceptance focus

Before declaring P02 design complete, confirm:

- title/header reads as one authored editorial system;
- SHOGO left/blue and SHIORI right/pink;
- both large portrait slots use clean standalone proxies;
- Q1 inset couple photo exists;
- Q2 has no inset photo;
- left/right are related but not mechanically mirrored;
- profile and Q paper interiors are opaque where intended;
- personal/TBD copy remains separately controllable;
- PAGE 02 is a complete authored badge;
- border is background-adjacent;
- no hidden obsolete or duplicate same-job LIVE layers;
- P01 `3535:7` unchanged;
- final page still reads like the Visual Master at A5 size.

---

## Final report budget

Keep the completion report concise:

1. what was built;
2. main visual/reference-delta result;
3. copy/photo/alpha safety result;
4. commit SHA + remote sync;
5. whether P02 is `FIGMA_DESIGN_COMPLETE` and what remains for final owner-photo QA.

Do not return a 20+ item report unless a real anomaly requires it.
