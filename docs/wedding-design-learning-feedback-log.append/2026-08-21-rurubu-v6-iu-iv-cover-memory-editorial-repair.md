# Rurubu V6 IU / IV visual experiment log — 2026-08-21

## IU Outer

- visible problem: IQ front cover still separated into top/header, large hero, and a comparatively deep cream lower section; it read more like a composed brochure than a continuous travel-magazine cover.
- principle/capability tested: extend an already legitimate dominant destination photograph behind more of the native cover hierarchy, then keep only the minimum closing information field.
- bounded experiment: duplicate IQ `2099:2` to IU `2124:2`; preserve back cover and all current image assets; materially change only front hero/closing proportions and native type placement.
- expected improvement: stronger cover immersion, larger photographic authority, less stacked section reading.
- regression risk: full-bleed crop can expose low-information sky, weaken text contrast, or clip inherited fixed-height typography.
- failed intermediate: hero 1123 px + destination 104 px with inherited 25 px line-height. Rejected after visual QA because the sky became too dominant and `横浜` clipped.
- repair: hero 973 px; cream closing strip 150 px; destination 100 px / line-height 104 px; footer moved 2 px upward after safe-area QA.
- evidence: 500 / 1400 / 1587×1123 visual PASS; 9 front native texts; 3 image fills; 0 text intersections; 0 18px safe risks.
- status: `ADOPTED / VERIFIED_LOCAL`.
- next application: when a future photo-led cover still reads as stacked sections, test continuity only after checking the new crop's information density and inherited type metrics.

## IV Memory Spots

- visible problem: IH right page ended a strong dining-photo beat with six equal small metadata blocks, reintroducing dashboard/grid cadence.
- principle/capability tested: preserve the information but collapse equal utility geometry into one attached native editorial metadata tail.
- bounded experiment: duplicate IH `2077:2` to IV `2127:2`; preserve the left page and all four image hashes; enlarge Spot 04 slightly; reveal existing native two-line metadata copy; hide six legacy utility roles without deleting them.
- expected improvement: denser editorial close with less UI-like repetition, while retaining scanable factual detail.
- regression risk: continuous metadata could become too compressed if final values are materially longer; final copy must receive a fresh realistic stress test.
- evidence: 500 / 1400 / 1587×1123 visual PASS; 27 visible native texts; 4 image fills; 0 text intersections; 0 18px safe risks; six old utility roles preserved hidden.
- status: `ADOPTED / VERIFIED_LOCAL`.
- next application: test the same role-level method only when short secondary facts are genuinely parallel; do not flatten independently actionable content merely to avoid grids.

## Asset decision

Image generation was considered unnecessary because both defects were hierarchy/role problems, not photography-quality problems. Generated `0`; adopted generated `0`; Drive saves `0`; uploads `0`; new hashes `0`.

## Implementation note

One combined promotion/status-write attempt failed atomically because a stale assumed Start Here node ID resolved to a RECTANGLE rather than TEXT. No Figma mutation occurred. Live state was re-read and promotion was retried without the stale node assumption. This failure was not counted as visual progress.