# Rurubu DM — photo-cluster editorial feedback

Date: 2026-08-12
Scope: RURUBU WEDDING only

## Visible problem

A single full-bleed photograph plus one large paper fragment can still read like a poster or landing-page hero even when the photograph is large. The missing quality was not more decoration; it was magazine-like editorial density created by unequal photography, controlled overlap, and scale contrast.

## Principle tested

Use **photo density before UI density**. Keep one strong headline system, compress the large paper field, and create a staggered cluster from already-verified photography with deliberately different dimensions and rotations. Do not add cards, rounded modules, generic shadows, or new gradient fields.

## Expected improvement

- stronger Japanese travel-magazine recognition at thumbnail scale;
- more energetic reading path without sacrificing legibility;
- less poster/web composition;
- more useful negative space because it is shaped by photographs and typography rather than empty padding.

## Regression risk

Photo clusters easily become scrapbook noise. Any added image must have a distinct visual role and scale. Actual-size QA is mandatory because overlap that looks intentional at thumbnail scale can create text-box collisions or weak micro-spacing at print scale.

## Evidence

Adopted outer comparator DM: Figma `955:2`; Best Review `956:2`; inside remains DF `899:2`.

Three-scale visual QA passed. Initial structure QA found one 01 numeral/headline intersection; the headline was shifted and final same-parent visible text intersections returned to zero. Final DM: 39 visible native text nodes, 8 visible IMAGE fills, fold `955:190` at x=792.7.

## Asset learning

The Yokohama Q60 master and role derivatives are visually valid in Drive, but neither Drive save nor transport preparation is adoption. The exact Figma image hash remains the older proxy, so the role remains incomplete. Do not promote a transport attempt to design progress.

## Adopted lesson

For Rurubu-like work, a large photograph is necessary but not sufficient. **Varied photographic scale + overlap + direct Japanese typography + subtraction of panel mass** produces a stronger editorial silhouette than adding more badges or cards.

## Next application

Keep the DM cluster grammar while replacing the small factual Yokohama proxy only when a verified exact binary can be placed and read back. Until then, improve only defects that remain meaningful at thumbnail, reading, and actual-size scales.
