# Rurubu V6 GD — 1DAY native closing caption feedback

Date: 2026-08-20

- Visible problem: final yellow `END / TABLE & TALK` treatment read as a UI/status tag rather than an editorial magazine closing.
- Principle tested: when a mature photo beat already has sufficient hierarchy, remove a redundant container and bind short reader-facing native copy directly to the photo only if contrast is safe.
- Bounded candidate: GD `1938:2`, duplicated from FM `1879:71`.
- Change: hide `LABEL / END`; replace English status copy with native `一日の終わりは、食卓で。`; preserve all photography and stop content.
- QA discovery: inherited 3px contacts remained between `02`/`12:30` and `04`/`19:00`; moved the two time nodes to x=116 before adoption.
- Expected improvement: less UI/module feeling and cleaner Stop 04 closure.
- Regression risk: direct-on-photo copy depends on actual image/crop contrast.
- Whole-item evidence: 1200px PASS and visually cleaner than FM.
- Reading/page evidence: PASS.
- Actual-size/detail evidence: right-page native text 25; collision 0; 18px safe-area risk 0; stray page nodes 0.
- Asset evidence: no generation, Drive save, binary placement, image-hash change or photo geometry change.
- Status: ADOPTED / VERIFIED_LOCAL.
- Next application: continue checking the six-spread review board for residual UI/status-like tags whose real binding function has disappeared; do not remove functional labels blindly.
