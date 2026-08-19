# Rurubu V6 — EY / EZ visual experiments

Date: 2026-08-19
Scope: Rurubu WEDDING only

## EY — Cafe native closing feature

- Visible problem: Cafe EX lower quarter still read as residual cream/template space after the `02` photo and notes.
- Principle tested: existing native closing copy can carry more editorial responsibility before adding more media.
- Bounded change: enlarged/repositioned `好きな店が、旅の目的地になる。`, moved its existing accent rule, preserved every image/hash and the Table page.
- Expected improvement: stronger page-ending cadence; less underfilled-template feeling.
- Regression risk: quote domination, folio/meta collision, bottom safe-area loss.
- Whole/thumbnail: 500px PASS.
- Reading: 1200px PASS.
- Actual-size: Cafe 794×1123 PASS.
- Structure: 17 native text, collision 0, 18px safe risk 0, overflow 0.
- Status: `VERIFIED_LOCAL / ADOPTED_PREFERRED` as EY `1835:2`.
- Rejected/rollback: EX `1831:2` preserved hidden.
- Rurubu-specific: exact Japanese copy, layout, color, scale, Cafe art direction.
- Cross-item hypothesis: page-end weakness may sometimes be solved with existing native closing cadence rather than another photo/card.

## EZ — Outer selective photo-frame subtraction

- Visible problem: EV front lower photography still read partly as two similarly framed photo cards.
- Principle tested: photo frames should be retained only where they perform separation/binding work.
- Bounded change: removed white frame from the dominant Dining support only; retained Cafe frame; slight source-safe geometry/rotation refinement; all image hashes/copy unchanged.
- Expected improvement: clearer dominant/support photo hierarchy and more magazine-like overlap.
- Regression risk: loss of photo separation, copy/folio collision, source enlargement.
- Whole/thumbnail: 500px PASS.
- Reading: 1200px PASS.
- Actual-size: front 794×1123 PASS.
- Structure: 13 native text, collision 0, 18px safe risk 0, overflow 0.
- Status: `VERIFIED_LOCAL / ADOPTED_PREFERRED` as Outer EZ `1836:2`.
- Rejected/rollback: EV `1821:2` preserved hidden.
- Rurubu-specific: masthead, photos, cover geometry, rotation and color system.
- Cross-item hypothesis: avoid uniform framing; evaluate frame function per image role.

## Asset-state distinction

This run so far:

- newly generated: 0
- generated adopted: 0
- new Drive save: 0
- external binary placement: 0
- new image hash: 0
- image source changes: 0
- native variable text preserved: YES
- replaceable photography preserved: YES
- visually verified: EY YES / EZ YES
- V7 touched: NO
