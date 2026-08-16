# 2026-08-16 — Rurubu V6 BH photo/event chronology experiment

Scope: Rurubu WEDDING only.

## Observation

BE had already removed the old card-grid timeline, but the lower chronology still separated event copy from its three event photographs. At thumbnail scale the reader first saw a text timeline and then a lower photo strip, so the page remained partly infographic-like.

## Hypothesis

The page would feel more like an edited travel feature if the three major milestones shared visual territory with their photographs, while 02/04 remained compact bridge beats. The solution should come from photo/type composition rather than additional Figma decoration.

## Test

BH `1451:2` duplicated BE and changed only the chronology page:

- 01 paired with a larger waterfront photo;
- 02 compressed into a secondary text beat;
- 03 paired with the small Yokohama photo;
- 04 placed as a smaller support beat beside the 03 photo;
- 05 paired with the wide dining/memory photo;
- 06 / WEDDING terminal band retained;
- all facts remain native text and all photos remain replaceable IMAGE fills.

A first-pass 03 photo width of 250px exceeded the registered 240px source width. It was corrected to 238×148 before adoption.

## Three-scale result

- 500px whole spread: BH preferred over BE; text and photography read as one sequence instead of two separate systems.
- 1200px reading spread: event order and major/minor hierarchy remain clear.
- native 794×1123 chronology: PASS; visible native text 31; visible IMAGE roles 6; text/text collision 0; 18px safe-area risk 0.

## Adoption

`VERIFIED_LOCAL`: BH promoted; BE retained hidden as rollback.

Outer U was also tested by strengthening only back-cover year hierarchy. It was visually valid but only marginally different from T at 500/1200px, so it was hidden and T remained preferred. This avoided version churn for a weak improvement.

No generation, Drive write, or external binary placement occurred.

## Next application

Review T + BG/BH as one magazine system. Where repeated facts still feel detached from imagery, test semantic photo/text binding before adding containers. Keep source-intrinsic limits and actual-size QA as hard gates.