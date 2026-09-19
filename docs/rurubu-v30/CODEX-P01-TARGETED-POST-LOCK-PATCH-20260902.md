# Rurubu WEDDING V30 — Codex P01 Targeted Post-Lock Patch Handoff

Date: 2026-09-02

Scope: **P01 targeted patch only**

Repository: `m-shogo/wedding-project`

Branch: `rurubu/v30-final-production-20260901`

PR: `#878`

Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

Figma page: `V30_FINAL_PRODUCTION`

P01 CURRENT: `3535:7`

P02 REAL / MUST NOT TOUCH: `3535:9`

---

## Mission

Close the currently reopened P01 targeted post-lock patch **without rebuilding P01** and without regressing the already accepted baseline.

Do not create V31.

Do not create another P01 frame.

Do not start P02 production.

Production ImageGen / alpha preparation / Figma writes / cleanup / screenshots / exports / Drive+Git evidence are Codex-owned for this run.

---

## 0. Canonical-first preflight — mandatory before writes

Re-fetch the current branch/PR HEAD first. Do not assume the HEAD recorded in this handoff is still current.

Then read in this order:

1. `docs/RURUBU-CURRENT.md`
2. actual Visual Master: `assets/rurubu-v30/p01/P01.png`
3. `assets/rurubu-v30/manifest.json`
4. `assets/rurubu-v30/visual-polish-manifest.json`
5. `assets/rurubu-v30/p01/manifest.json`
6. `assets/rurubu-v30/p01/polish-manifest.json`
7. `docs/rurubu-v30/VISUAL-MASTER-LOCK-AUDIT.md`
8. `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`
9. `assets/rurubu-v30/p01/README.md`
10. current PR #878 body

### Authority precedence — important stale traps

`assets/rurubu-v30/p01/polish-manifest.json` is newer and overrides conflicting P01 execution/copy details in the older P01 main manifest.

Therefore DO NOT revive these stale older values if you encounter them in `p01/manifest.json`:

- `SAT.` → **SUPERSEDED**. Current exact visible copy is `SAT`.
- `家族と友達` → **SUPERSEDED / REJECTED**.
- bare `友達` → **REJECTED as final P01 Feature 3 heading**.
- current exact Feature 3 visible heading is **`友達との思い出`**.
- old foreground-like airmail-border z-index behavior is stale. Current rule is background-adjacent border depth.
- TEMP `3708:2` is already deleted; do not look for it as an active cleanup target and never repurpose P02 `3535:9`.

Canonical project facts still come from Root authority.

---

## 1. Preserve accepted baseline — HARD DO NOT REGRESS

P01 CURRENT `3535:7` already has an accepted baseline. Preserve all of this:

- clean standalone Hero photo proxy;
- clean standalone Feature 1 proxy;
- clean standalone Feature 2 proxy;
- clean standalone Feature 3 friends/group proxy;
- Feature 1 opaque-paper correction;
- Feature 2 opaque-paper correction;
- Feature 3 opaque-paper correction;
- Feature 1–3 left safe-area correction;
- top-left gold wedding rings;
- visible diamond;
- yellow sparkles;
- `るるぶ`;
- `WEDDING`;
- `Shogo & Shiori`;
- `2026`;
- Bottom Story;
- `OUR JOURNEY`;
- current asymmetric editorial rhythm;
- hidden obsolete layers remain 0 after cleanup;
- duplicate same-job LIVE layers remain 0 after cleanup.

Do not use P01 Visual Master crops/page screenshots as active photo fills.

---

## 2. Targeted issue A — Date module inside opacity

Figma target:

`P01_WEDDING_DATE_2026_10_24_SAT / FINAL_REWORK_COMPLETE_MODULE`

Exact visible copy:

- `WEDDING DATE`
- `2026.10.24`
- `SAT`

Expected material behavior:

- outside region intended as cutout = transparent;
- white/cream ticket paper core = opaque printed paper;
- representative interior alpha `>= 0.95`, preferably `1.00`;
- narrow anti-aliased edge transitions are allowed;
- no large unexplained translucent interior.

Execution:

1. Run **one quick asset-vs-Figma discriminator**.
2. If source RGBA/cutout fails, **regenerate or re-cut immediately**.
3. Do not spend repeated diagnosis cycles on a cheap asset-side defect.
4. Do not use a rescue white rectangle or Figma opacity trick.
5. Replace only the affected module.
6. Once replacement is visually verified, delete the superseded LIVE node.

---

## 3. Targeted issue B — PAGE 01 module inside opacity

Figma target:

`P01_PAGE_01 / FINAL_REWORK_COMPLETE_MODULE`

Exact visible copy:

- `PAGE`
- `01`

Expected material behavior:

- outside cutout transparent;
- white badge/paper core reads as opaque print;
- representative interior alpha `>= 0.95`, preferably `1.00`.

Use the same fast-fail workflow as the Date module.

Do not hide a broken source alpha with a background rectangle.

---

## 4. ONE white-paper sibling sweep — required once

Because P01 has a same-family inside-opacity failure, run **one quick sibling sweep** before closing `ALPHA_INTEGRITY_PASS`.

Sweep set:

1. Date
2. Feature 1
3. Feature 2
4. Feature 3
5. Bottom Story
6. PAGE 01

For each, distinguish:

- outside transparency;
- intended paper/vessel interior opacity.

Only repair modules that actually fail.

Do not regenerate the entire page.

Do not repeat the same sweep multiple times unless the final integrated QA fails.

---

## 5. Targeted issue C — Feature 3 copy sync

Semantic role:

Friends / group

Photo role:

friends/group, `3+` people preferred.

Current approved exact visible module copy:

- `3`
- `友達との思い出`

Hard rejects:

- `家族と友達`
- `友達`
- any active P01 Feature 3 copy containing `家族`

Replace/regenerate the Feature 3 display module as needed while preserving:

- existing clean standalone group/friends photo proxy;
- photo remains separate/replaceable;
- accepted left-safe-area behavior;
- intended white/green paper-vessel opacity;
- current editorial rhythm.

After successful replacement:

- active `家族と友達` count = 0;
- active bare-heading `友達` count = 0;
- active Feature 3 current module count = 1;
- hidden superseded same-job layer count = 0.

---

## 6. Targeted issue D — AIRMAIL BORDER z-order

Figma target:

`P01_AIRMAIL_BORDER / PRODUCTION_RGBA`

Required layer-depth model:

`background field → AIRMAIL BORDER → Hero/photos → authored display modules → major stickers/badges/foreground accents`

Actions:

- keep the border;
- do not flatten it into the background;
- do not regenerate it merely to solve depth;
- move only its layer depth unless a direct Visual Master comparison proves a local foreground overlap is intentional;
- make sure the frame does not visually slice through Date / Feature modules / Bottom Story / PAGE 01 / major photography.

---

## 7. LIVE cleanup — current-only

For every replaced module:

1. place new asset/module;
2. compare visually in CURRENT `3535:7`;
3. confirm new module is correct;
4. delete the superseded LIVE node;
5. inspect for hidden old sibling;
6. confirm one active same-job layer remains.

History belongs in Git / Drive evidence, not active Figma LIVE.

Final cleanup target:

- hidden obsolete layers = 0;
- duplicate same-job layers = 0.

---

## 8. Final integrated QA — one pass after fixes

Capture fresh evidence from actual CURRENT `3535:7`:

- one fresh full-page screenshot;
- one fresh A5-size screenshot/review;
- relevant asset alpha evidence for repaired modules when practical.

Then run gates in this order:

1. `ALPHA_INTEGRITY_PASS`
2. `COPY_SYNC_PASS`
3. `BORDER_Z_ORDER_PASS`
4. `REFERENCE_DELTA_PASS`
5. A5 readability / grayscale-thumbnail sanity check
6. stale/duplicate LIVE cleanup check
7. P02 untouched check

Reference Delta must use the **current Figma screenshot**, not layer names or prior reports.

Compare against the actual P01 Visual Master for:

- 3-second cover impression;
- title/Hero ratio;
- asymmetric editorial silhouette;
- material opacity;
- Feature 3 wording;
- border depth;
- carry-over coherence;
- edge safety;
- no regression of accepted ring/Feature improvements.

---

## 9. Repository / Drive sync

If this patch creates any new production PNG/RGBA binaries or QA evidence that belongs in production history:

- put production/QA evidence in the established P01 Drive locations;
- commit/push required production binaries to the existing branch;
- verify each expected remote Git path actually exists after push;
- do not claim Git sync from local-only files;
- do not replace or rewrite unrelated P01/P02 assets.

If no binary changed for an item (for example border z-order only), do not create pointless replacement binaries.

---

## 10. P02 safety — HARD

P02 real frame is:

`3535:9`

It must remain untouched.

Do not:

- delete it;
- move it;
- rename/repurpose it;
- overwrite it;
- use it as temporary working space;
- begin P02 production.

At the end explicitly verify P02 `3535:9` is unchanged.

---

## 11. Completion gate

Only when all are true:

- `ALPHA_INTEGRITY_PASS = PASS`
- `COPY_SYNC_PASS = PASS`
- `BORDER_Z_ORDER_PASS = PASS`
- `REFERENCE_DELTA_PASS = PASS_AFTER_TARGETED_PATCH`
- Date exact visible copy uses `SAT`, not `SAT.`
- Feature 3 exact visible heading is `友達との思い出`
- active `家族と友達` = 0
- active bare Feature 3 `友達` heading = 0
- white-paper sibling sweep completed once
- Date and PAGE 01 intended paper cores are opaque
- AIRMAIL BORDER is background-adjacent
- hidden obsolete layers = 0
- duplicate same-job layers = 0
- P02 `3535:9` untouched
- any new required production binaries are committed/pushed and remote paths verified

then and only then restore:

`FIGMA_DESIGN_COMPLETE = YES`

Keep:

`FINAL_PHOTO_QA_PENDING = YES`

`PRINT_READY = NO`

P01 may then be formally locked and P02 may be unblocked for the next separate run.

---

## 12. Final report format

Keep the report concise. Do not send repeated midpoint status unless blocked or regeneration repeatedly fails.

Report:

1. branch HEAD before work and final pushed HEAD;
2. exact Figma node edited;
3. Date result: cause / replacement if any / alpha result;
4. PAGE 01 result: cause / replacement if any / alpha result;
5. sibling sweep results for all six modules;
6. Feature 3 final visible copy and old-copy active count;
7. AIRMAIL BORDER final depth relationship;
8. hidden obsolete / duplicate counts;
9. full-page + A5 screenshot evidence locations;
10. Drive evidence locations if written;
11. Git binary paths + commit SHA if written;
12. P02 `3535:9` untouched confirmation;
13. final gate values;
14. whether P01 is formally LOCKED and P02 is unblocked.

Do not report completion if any required gate is still open.
