# 2026-08-19 — Rurubu V6 EX Cafe density experiment

- Scope: Rurubu WEDDING only; V7 untouched.
- Observed problem: ER Cafe left page remained quieter and more template-like than the photo-led Table page because the right half of the middle travel-texture field carried little reader-facing information.
- Hypothesis: the issue was not missing photography; the existing composed texture and native type were not sharing the page field strongly enough.
- Test: rollback-safe EX from ER. Expanded/strengthened the existing composed texture, strengthened native `01`, and redistributed existing Cafe metadata into the right side. No new cards, photos, image hashes, generated assets, Drive writes, or external binary placement.
- Rejected intermediate: four-line micro metadata looked production-note-like. Second arrangement also caused one real title/metadata collision.
- Final: two-line reader-facing metadata placed below the title; collision 0; 18px safe risk 0; 1200px whole PASS; Cafe 794×1123 actual-size PASS.
- Adopted: EX `1831:2`, Cafe `1831:3`.
- Rollback: ER `1805:134` hidden.
- Next use: continue same-scale six-spread review; do not generalize the exact texture/palette/layout outside Rurubu.
