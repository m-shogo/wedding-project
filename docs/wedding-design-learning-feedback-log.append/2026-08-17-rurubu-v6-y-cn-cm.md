# 2026-08-17 — Rurubu V6 Y + CN/CM visual feedback

Scope: Rurubu WEDDING only. V7 remained HOLD.

## Chronology — CJ → CM

Visible problem:
- CJ preserved major/minor hierarchy but Event 2 / 4 became too quiet, leaving the center-left field looking unfinished.

Root-cause hypothesis:
- minor beats needed a small native ordinal/navigation cue, not a return to equal cards.

Bounded test:
- rollback-safe clone;
- re-enabled 02 / 04 existing native numbers at 14px;
- removed redundant small rule bars;
- increased minor titles 17→22px;
- enlarged Event 3 photo 285×210→310×230, still below intrinsic 352×368.

Expected improvement:
- more intentional page density and clearer scan order without flattening hierarchy.

Regression risk:
- six events becoming equal again;
- collision/noise;
- over-enlargement.

Three-scale evidence:
- whole spread ~1200px: PASS;
- reading/page: PASS;
- actual-size chronology 794×1123: PASS.

Structure evidence:
- native text 30;
- text collision 0;
- 18px safe-area risk 0;
- image intrinsic violation 0;
- image hash change 0;
- intentional top-hero bleed only.

Decision:
- ADOPTED as CM `1559:2`;
- CJ retained hidden rollback.

## Profile — CL → CN

Visible problem:
- the three lower snapshots still read partly as a placed-photo collage.

Root-cause hypothesis:
- the already-existing native caption roles could make each photo an editorial scene without adding containers or decoration.

Bounded test 1:
- activated caption roles over photos.

Result:
- REJECTED: low contrast and inconsistent readability at actual size.

Bounded test 2:
- moved the same captions immediately outside the photo borders onto the cream page.

Expected improvement:
- stronger magazine-reading cues with no new visual container and no loss of editability.

Regression risk:
- micro-caption clutter;
- caption/photo or folio collision;
- dummy caption wording mistaken for final facts.

Three-scale evidence:
- whole Profile/Q&A spread ~1200px: PASS;
- Profile page context: PASS;
- actual-size Profile 794×1123: PASS.

Structure evidence:
- visible Profile native text 22;
- collision 0;
- 18px safe-area risk 0;
- overflow 0;
- all four Profile image roles intrinsic-safe;
- image hash change 0;
- Q&A unchanged from verified CL.

Decision:
- ADOPTED as CN `1562:2`;
- CL retained hidden rollback.

## Current live preferred set

- Outer Y `1542:2`;
- Profile/Q&A CN `1562:2`;
- Story/Chronology CM `1559:2`;
- Start Here `V5 FU/FX · V6 Y + CN/CM INSIDE STUDIES · V7 HOLD`.

## Asset lifecycle

- newly generated: 0;
- newly saved to Drive: 0;
- new binary placement: 0;
- new raster bytes: 0;
- image hash changes: 0;
- native text preserved: yes;
- replaceable photos preserved: yes.

## Next application

Continue comparing Y + CN/CM as one magazine. Prefer semantic typography/photo-role improvements over adding cards or generic decoration. Final photography, final personal copy, exact print template, PDF preflight and physical proof remain separate gates.