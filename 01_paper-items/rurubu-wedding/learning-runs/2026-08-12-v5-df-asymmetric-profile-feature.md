# Rurubu V5 — DF asymmetric profile feature

Date: 2026-08-12
Scope: `RURUBU WEDDING` only

## Visible problem

The previous inside comparator DE (`894:2`) was already cleaner than Current, but its left page still read too much like a polished profile form: two identity-safe photos above a regular Q&A block, with the editorial hierarchy carried mainly by rules and question numbering. At thumbnail scale it did not exploit the profile photography strongly enough to feel like a Japanese travel-information magazine feature selected from scratch.

## Principle / capability tested

- Treat the two profile photographs as the page architecture rather than as modules inside the architecture.
- Increase asymmetry and intentional overlap before adding decoration.
- Give the Japanese profile headline a dedicated negative-space field beside the dominant photo instead of placing it in a header strip.
- Keep Q1 as the dominant pull-quote while compressing Q2/Q3 into supporting editorial notes.
- Subtract obsolete rules, icon decoration, and a redundant Q1 micro-label instead of adding cards.
- Preserve native text, semantic image roles, existing image hashes, fold geometry, and rollback history.

## Expected improvement

A stronger thumbnail silhouette, faster photo-first reading path, more varied scale, and a left page that feels edited as a travel-magazine profile feature rather than arranged as a web/profile form.

## Regression risk and caught failures

1. First clean-room restructuring enlarged the groom image enough to cover the first characters of `ふたりのプロフィール`. Screenshot QA caught the occlusion; the groom image width was reduced and the native headline was moved into the adjacent cream field and brought forward in layer order.
2. Enlarging `01` caused a collision with the inherited `BU_Q1_B_MICROLABEL`. Structural QA found the overlap; the redundant micro-label was hidden as a subtraction.

Neither failed intermediate state was adopted.

## Verified Figma evidence

- source comparator DE: `894:2`
- clean-room working candidate DF: `899:2`
- DF left page: `899:3`
- DF right page: `899:132`
- Review best-inside snapshot: `904:2`
- previous DE Review snapshot preserved hidden as rollback: `897:2`
- true Current outer/inside remained untouched: `77:18` / `77:290`

Three-scale visual QA:
- thumbnail / whole-item: PASS
- reading / spread: PASS
- actual-size left page: PASS

Final structure QA:
- visible native text: `53`
- same-parent text intersections: `0`
- fold guide: `899:283`, x=`792.7000122070312`, y=`0`, `2 × 1122.5`
- six production-image hashes preserved:
  - profile A `899:7` → `a39dd297eb9de572317a5ce57f0af12e8597b156`
  - profile B `899:12` → `2359f635b4926a83e22ca1f9214e75c709291152`
  - history `899:133` → `539c259be8036b481d06b4f76db9a39b407d90e8`
  - memory 1 `899:267` → `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - memory 2 `899:268` → `439a719d73f28e8dd2889f2026cccb15f345ec63`
  - memory 4 `899:269` → `c09aa82e7b2ac75708707345c6f845452bf67663`

## Adoption decision

**ADOPTED as strongest inside comparator, not Current.**

Review and Start Here were reconciled to `DB outer / DF inside`. Superseded DE was moved non-destructively to Studies as node `894:2`; Working now retains only CU `834:3`, CV `848:2`, DB `881:2`, and DF `899:2` as active candidates.

## Asset classification

- generated this run: `0`
- new generated asset adopted: `0`
- new external binary placed: `0`
- existing asset hashes re-used and verified: YES

The unresolved cover-hero Q60 transport/placement problem is unchanged. V5 remains `PHOTO_ROLE_PASS 9/10`, dominant `2/3`, not complete; V6 remains not started.

## Next application

Use this photo-as-architecture rule in V6 clean-room concepts after the V5 gate closes. Do not respond to weak photography by adding more framing; first strengthen photo scale, crop, overlap, and native Japanese headline placement, then subtract any inherited micro-decoration that competes with the reading path.
