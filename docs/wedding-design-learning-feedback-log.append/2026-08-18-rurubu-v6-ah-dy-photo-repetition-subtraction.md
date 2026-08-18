# 2026-08-18 — Rurubu V6 AH / DY photo-repetition subtraction

Scope: Rurubu WEDDING only.

## Observation

Preferred V6 had become editorially stronger, but the same small set of cafe / skyline / waterfront / dining photos repeated across many pages. The repeated-photo feeling was now more visible than many remaining layout defects.

## Hypothesis

A repeated image does not always need a new image replacement. When a repeated role is decorative/supportive rather than evidentiary, changing the role to bounded composed decoration + native text can reduce repetition while preserving truth and editability.

## Test 1 — Cafe & Table

DT `1695:2` → DY `1717:2`.

- Removed one repeated cafe hero role.
- Reused existing verified travel texture as fixed decoration.
- Rebuilt the Cafe hero area with stronger native Japanese typography and useful metadata.
- Kept the smaller Yokohama view photo replaceable.

Expected: lower repetition and less synthetic stock-photo cycling without weakening the gourmet-page role.

Result: adopted. 500px / 1200px / left actual 794×1123 PASS; text collisions 0; 18px safe risk 0.

## Test 2 — Outer

AG `1676:2` → AH `1717:55`.

- Removed the second use of the same Yokohama skyline inside the outer spread.
- Converted only the front postcard role into a native-editable issue panel over the existing verified travel texture.
- Preserved the back skyline photo.

Initial result: one native text collision with the cover deck; not adopted.

Correction: moved issue-panel copy lower inside the fixed panel.

Final result: adopted. 500px / 1200px / front actual 794×1123 PASS; collision 0; 18px safe risk 0.

## Preferred-set effect

After AH + DY:

- cafe: 7 → 6 roles;
- Yokohama skyline: 7 → 6 roles;
- waterfront: 6;
- dining: 6.

This does not solve the small photo pool. It removes two exact repeated-photo roles without introducing false destination imagery.

## Asset / editability state

- generated: 0;
- adopted generated: 0;
- Drive save: 0;
- external placement: 0;
- new image hash: 0;
- existing composed texture reuse: yes;
- native text: preserved;
- remaining photos: independently replaceable;
- rollbacks: preserved;
- V7: untouched.

## Next application

Continue auditing repetition by semantic role. Do not remove destination-evidence photography merely to improve counts. Prefer final legitimate distinct Yokohama photography when available; otherwise only convert roles whose real job can be fulfilled by native text / composed decoration without reducing travel-guide credibility.
