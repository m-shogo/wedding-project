# 2026-08-20 Rurubu V6 GT/GS — factual precision cleanup

## Source scope

Rurubu WEDDING only.

## What changed

### GS Story / chronology

Visible problem: events 01–04 still showed `20XX.XX`, which looked like unfinished factual data after the layout itself had matured.

Bounded test: duplicate preferred GP and hide only the four unresolved native date nodes. Keep event order, event labels, photos, image hashes and the verified dates `2026.02.11` / `2026.10.24` unchanged.

Expected improvement: remove fake precision without weakening chronology readability.

Regression risk: events could lose time-order comprehension if number/hierarchy were insufficient.

Evidence: 1200px spread PASS; 794×1123 chronology PASS; text collision 0; 18px safe-area risk 0; stray text 0.

Decision: `ADOPTED / VERIFIED_LOCAL` as GS `1981:2`. Former GP remains hidden rollback.

This is another local confirmation of RSL-142 rather than a new separate rule.

### GT Profile / Q&A

Visible problem: `1991.XX.XX` under `誕生日` looked unfinished and implied precision that is not available in current authority.

Bounded test: duplicate GR and change only native `TEXT / PROFILE_VALUE_2` to `1991年`, preserving every other profile/Q&A text role, photo, mask, crop and image hash.

Expected improvement: reader-facing factual copy looks finished while remaining truthful to the known portion.

Regression risk: later availability of full birthday requires replacing the native text, not treating `1991年` as a permanently complete birthday.

Evidence: 1200px spread PASS; 794×1123 Profile PASS; Profile/Q&A collision 0; safe-area risk 0; stray text 0.

Decision: `ADOPTED / VERIFIED_LOCAL` as GT `1981:111`. Former GR remains hidden rollback.

## Asset state

Generated 0 / adopted generated 0 / Drive write 0 / binary placement 0 / new image hash 0.

## Scope / learning note

The neutral non-Rurubu feed was consumed only as method input. No non-Rurubu item-specific production surface was inspected or edited.
