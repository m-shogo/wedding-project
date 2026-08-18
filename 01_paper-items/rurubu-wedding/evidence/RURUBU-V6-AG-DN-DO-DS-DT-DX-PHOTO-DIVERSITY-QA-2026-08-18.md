# Rurubu V6 — DX 1DAY Plan photo-diversity QA

Date: 2026-08-18
Scope: Rurubu WEDDING only

DV `1701:2` reused waterfront hash `539c259be8036b481d06b4f76db9a39b407d90e8` for both the dominant hero and STOP 01.

Hypothesis: exact adjacent-source repetition weakens editorial plausibility, but a destination-wrong replacement is worse.

## Tests

- DW `1713:2`: STOP 01 swapped to hash `c09aa82e7b2ac75708707345c6f845452bf67663`; screenshot read as tropical resort, so rejected/hidden for Yokohama semantic mismatch.
- DX `1714:2`: STOP 01 swapped to verified Yokohama skyline hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, kept at `238×210`; adopted.

## QA

- whole spread ~1200px PASS;
- right `1714:29` actual 794×1123 PASS;
- left native text 19 / right 21;
- collisions 0 / 18px safe risks 0 / overflow 0;
- five replaceable photo roles preserved.

After DX, preferred-set repetition remains: cafe 7 / skyline 7 / waterfront 6 / dining 6 / travel-object 4 / travel-street 3.

Asset lifecycle: generated 0 / Drive saves 0 / external placements 0 / new hashes 0 / existing verified hash reassigned 1 / screenshot QA PASS / structure QA PASS.

Status: `DX VERIFIED_LOCAL / PREFERRED`.
Rollback DV `1701:2`; rejected DW `1713:2`.
