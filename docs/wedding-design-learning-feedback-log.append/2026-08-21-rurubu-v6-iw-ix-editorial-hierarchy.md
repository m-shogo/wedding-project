# Wedding design learning feedback — Rurubu V6 IW / IX

Date: 2026-08-21
Scope: Rurubu WEDDING only

## Experiment 1 — IW 1DAY dominant-photo ownership

Visible problem: IM's lower Stop 03/04 region remained tile-like at whole-spread scale even though image sizes were already unequal.

Principle/capability tested: make one existing photo clearly own the lower field and demote the other to an overlapping support/postcard role while retaining native stop numbering, times and copy.

Expected improvement: stronger Japanese travel-magazine photo hierarchy and less dashboard/module reading without adding assets or decoration.

Regression risk: overlap could confuse stop ownership, squeeze captions or create trim/safe-area problems.

Bounded Figma test: IM `2087:2` → IW `2131:2`; right `2131:33`; left page unchanged; existing image hashes only.

Evidence:
- 500 px whole-spread PASS;
- 1400 px reading PASS;
- 794×1123 actual right PASS;
- initial safe-area findings repaired before promotion;
- final visible native text 24, IMAGE fills 4, text intersections 0, 18 px safe risks 0.

Decision: ADOPTED / `VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

Next application: do not assume unequal cards/tiles are already editorial. On future Rurubu pages, compare whether one visual actually owns the field before adding more modules.

## Experiment 2 — IX profile role-width redistribution

Visible problem: IP left profile still read as a web-like `large image + narrow fact sidebar` even after previous card/UI subtraction.

Principle/capability tested: widen the photographic lead and redistribute the same short native facts into a broad two-row editorial information band; preserve the lower photo collage and right Q&A.

Expected improvement: stronger print-magazine reading path while keeping six facts native, scannable and replaceable.

Regression risk: the fact band could become flat/spreadsheet-like; relocating text from image to paper could invalidate inherited contrast styling.

Bounded Figma test: IP `2096:2` → IX `2132:101`; left `2132:102`; Q&A right preserved.

Failure/correction: `ふたりの旅プロフィール` inherited white from its previous on-image role and failed contrast on cream. Candidate was held, title changed to the existing navy text color, then all scales were rechecked. A separate first script used the wrong exact child-frame name and failed atomically before mutation; live readback corrected the target name before retry.

Evidence:
- 500 px whole-spread PASS;
- 1400 px reading PASS;
- 794×1123 actual left PASS;
- final visible native text 54, IMAGE fills 5, same-parent intersections 0, 18 px safe risks 0.

Decision: ADOPTED / `VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

Next application: treat role-width/orientation as part of UI-vs-editorial diagnosis. Any text moved between photographic and paper/color contexts requires fresh rendered contrast QA.

## Asset lifecycle

Photography/asset fidelity was not the bottleneck in either experiment. Generated assets 0; adopted generated assets 0; new Drive saves 0; new derivatives 0; new Figma image hashes 0. Existing verified Rurubu replaceable fills remained intact.

Durable evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IW-IX-1DAY-PROFILE-EDITORIAL-HIERARCHY-QA-2026-08-21.md`.
Shared learning: RSL-178 / RSL-179 in the Rurubu append feed.