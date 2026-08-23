# 2026-08-24 — Rurubu V7 H4 Cafe photo-caption binding

Scope: Rurubu WEDDING only.

Fresh professional research on magazine/DTP information grouping changed the live design decision: instead of further styling the cobalt Cafe title field, the native `11:40 / ひと休み` metadata was moved to its semantic owner, directly below the dominant cafe photograph.

Figma result:

- H4 `2401:2` promoted current;
- caption `2401:6` local `x=40 / y=578`;
- H3 `2311:2` hidden rollback at `x=300000`;
- 500 / 1400 / 1587×1123 DESIGN QA PASS;
- native text `11`, IMAGE fills `5`, text-text intersection `0`, 18px edge risk `0`, Japanese font mismatch `0`, no new text/image intersection;
- V7 current root overlap `0`.

A first candidate exposed yellow-on-cream contrast loss after moving the caption out of cobalt. The correction reused the existing V7 navy. This was deduplicated under existing RSL-122 rather than creating a new fingerprint. H4 separately reinforces RSL-008's binding-function method; neither lesson state is artificially promoted by this run.

Asset truth: generated `0`, Drive write `0`, new master `0`, new hash `0`, final Hawaii photo `0`. Existing photography remains explicitly structural dummy / REAL-CONTENT-BLOCKED.

V6 frozen control and V8 current set were not modified.
