# Rurubu V6 — GY / GZ reader-facing hierarchy feedback

Date: 2026-08-20
Scope: Rurubu WEDDING only

## GY Memory Spots — ADOPTED

Visible problem:
- SPOT 03 remained too weak and module-like beside the stronger SPOT 04;
- ordinary English semantic microcopy read like residual template styling on a Japanese-first travel-guide page.

Principle / capability tested:
- actual-size audit of meaningful secondary reader copy;
- Japanese-first semantic labels when English has no distinct authenticity/navigation function;
- increase editorial responsibility of existing native text before adding imagery or containers.

Expected improvement:
- stronger small-feature hierarchy;
- less AI/template tone;
- no change to replaceable photography.

Regression risk:
- larger ordinal/title could collide with deck;
- Japanese wording could wrap differently;
- over-strengthening SPOT 03 could flatten hierarchy against SPOT 04.

Evidence:
- initial candidate found real `GUIDE_DECK ↔ SPOT03_NUM` overlap ≈ `104×6px`; repaired before adoption;
- 1200px whole: PASS;
- actual-size right 794×1123: PASS;
- final collision 0 / 18px safe risk 0;
- all four image hashes unchanged.

Decision: `ADOPTED / VERIFIED_LOCAL`.

Next application:
- continue actual-size audit of reader-facing microcopy in V6;
- preserve intentional English masthead/category language where it has a real identity/navigation role.

## GZ Profile / Q&A — ADOPTED

Visible problem:
- several meaningful secondary Q&A roles were physically fragile at 9–10.5px despite a strong thumbnail composition.

Principle / capability tested:
- actual-size secondary-copy readability;
- type hardening only on meaningful reader-facing roles;
- fresh long-copy stress after type-size change.

Expected improvement:
- readable support captions/kickers and Q5 answer without weakening the large Q&A beats.

Regression risk:
- longer Q5 answer could consume bottom closing reserve.

Evidence:
- production GZ actual-size right 794×1123: PASS;
- first long-copy proof failed by 4px against bottom closing;
- closing y `995 → 1010` repaired the reserve;
- long-copy proof after repair: collision 0 / safe risk 0;
- all image roles/hashes unchanged.

Decision: `ADOPTED / VERIFIED_LOCAL`.

Next application:
- do not blindly enlarge folios/decorative metadata;
- keep actual-size audit focused on meaningful reader-facing copy.

## GX Outer texture reuse — REJECTED

Visible problem targeted:
- back chronology still reads quieter than the dominant upper photo.

Bounded test:
- reused the existing Rurubu Cafe composed travel texture behind only the chronology at low opacity.

Expected improvement:
- print-native depth without new cards or photos.

Observed regression:
- fixed decoration felt generic across unrelated sections;
- did not materially improve chronology hierarchy;
- risked making Rurubu sections visually identical.

Decision: `REJECTED`; candidate hidden, GU retained.

Next application:
- if chronology truly needs generated/composed support later, use a chronology-specific role brief rather than cosmetic cross-section texture reuse.

## Final run readback

Preferred:
- GU Outer `1975:2`
- GZ Profile/Q&A `2004:2`
- GW Story/chronology `1987:2`
- GY Memory Spots `2003:2`
- GL Cafe/Table `2000:2`
- GQ 1DAY Plan `1968:71`

All 12 physical preferred pages:
- visible text collisions: 0
- 18px text safe risks: 0
- visible implementation/proof/placeholder leakage: 0

Assets:
- generated 0
- adopted generated 0
- Drive new save 0
- binary placement 0
- new image hash 0
- replaceable photos preserved
- native variable text preserved

V7 remained HOLD.
