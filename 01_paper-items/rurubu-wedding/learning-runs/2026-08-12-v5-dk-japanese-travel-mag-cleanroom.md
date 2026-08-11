# 2026-08-12 — V5 DK Japanese travel-magazine clean-room

Scope: RURUBU WEDDING only. Protected Current `77:18` / `77:290` remained untouched.

## Visible problem
DJ was stronger than the legacy-derived cover, but at thumbnail scale the front still read partly as a polished poster: the main headline relied on a broad magenta block, feature 02 floated as a small module, and feature 03 collided with its support photo at actual size. Concurrent live candidates `939:2` and `942:2` were also re-read before promotion; they increased collage density but weakened headline dominance or returned toward card-like modularity.

## Principle / capability tested
Use the full-bleed verified travel-memory photo as page substrate, then build hierarchy through much larger native Japanese type, a thin slanted accent rule instead of a headline card, unequal factual/support photography, one irregular paper fragment, and direct-on-photo feature typography. Keep the Yokohama proxy explicitly small and factual until the verified Q60 binary can be placed.

## Expected improvement
At 500px the front should read immediately as an energetic Japanese travel-information magazine rather than an AI landing page or poster. At actual size, `横浜 / ふたり旅。` should dominate, feature 01 should behave like a clipped editorial insert, and 02/03 should read as secondary magazine callouts rather than equal cards.

## Regression risk
Direct-on-photo text can lose contrast; enlarging type can cause hidden text-box intersections; tilted secondary photos can collide with feature labels; too many accents can become decorative noise.

## Evidence
- clean-room candidate: DK `945:2`, front `945:131`
- Review snapshot: `946:2`
- previous DJ Review snapshot `936:2` preserved hidden as rollback
- thumbnail 500px: PASS
- whole spread 1024px: PASS
- actual-size front 794x1123: PASS after repair
- actual-size defect found: feature 03 text overlapped the support photo; support photo moved upward and a thin yellow editorial rule separated image/type before promotion
- structure QA: visible native text 39, visible IMAGE fills 7, same-parent text intersections 0
- fold guide: `945:190`, x=792.7000122070312, 2x1122.5
- dominant travel-memory image hash preserved: `adbb8e529451a81dd25e4eb29bf068655569ce25`
- Yokohama factual proxy hash remains unresolved: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- Drive Q60 fresh readback: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155439 bytes
- official Figma upload target was issued this run, but raw-byte POST again failed before upload because `mcp.figma.com` DNS could not resolve; therefore Q60 placed/verified remains NO

## Adopted / rejected
ADOPTED: DK `945:2` as strongest outer comparator; DF `899:2` remains strongest inside comparator. REJECTED as best: live `939:2` and `942:2`; preserved as studies. DJ `933:2` preserved as study and hidden Review rollback.

## Next application
Do not add more modules to DK merely for density. The next high-value change is the exact Q60 destination-anchor replacement when transport becomes available, followed by node/hash readback and three-scale QA. If a future V6 starts from scratch, preserve DK's large-type/direct-photo hierarchy but explore a materially different photo-collage rhythm rather than copying DK geometry.