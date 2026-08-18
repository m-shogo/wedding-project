# Rurubu V6 — ES / ET design feedback

Date: 2026-08-19
Scope: Rurubu WEDDING only

## ES — adopted

Visible problem: Outer EO had a strong photo-led upper back cover but the lower chronology was too evenly small and looked less edited than the inner magazine pages.

Test: rollback-safe EO duplicate; preserve front/photo assets; make 01/03/05 major native beats, 02/04 minor bridges, keep WEDDING as closure, add only short functional color rules.

Result: adopted as ES `1815:2`. The first structure pass found five text contacts and was not adopted; after corrections final back `1815:3` passed 500px whole, 1200px reading and 794×1123 actual-size with collision 0, safe risk 0 and overflow 0.

Regression risk: large milestone numerals can collide with dates/titles; re-run structure QA after scale changes.

Next application: keep chronology order native and complete, but do not make every event visually equal by default.

## ET — adopted

Visible problem: Profile EK lower-right text-only `03 / NEXT DESTINATION` was too weak and could look like a missing third snapshot.

Test: preserve the two existing replaceable photos and all hashes; make `03 / NEXT DESTINATION / 次の目的地へ。` an intentional native text-only closing feature.

Result: adopted as ET `1817:2`. First attempt rejected because `03` wrapped vertically and an extra note crowded the photo cluster. Structure QA later caught two text contacts; final Profile `1817:3` passed 1200px whole and 794×1123 actual-size with collision 0, safe risk 0 and overflow 0. No third photo was added.

Regression risk: text-only roles must be strong enough to read as intentional, but large native numbers still need width/collision QA.

Next application: when photo repetition is already high, test whether a semantic transition/closing role can be native typography instead of another image.

## Asset/state declaration

Generated: 0. Adopted generated: 0. New Drive saves: 0. New binary placements: 0. New image hashes: 0. Native variable text preserved. Replaceable photos preserved. V7 untouched.
