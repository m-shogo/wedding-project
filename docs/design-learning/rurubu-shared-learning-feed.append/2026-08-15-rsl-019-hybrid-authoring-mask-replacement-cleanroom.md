# RSL-019 — Hybrid authoring can increase design freedom when replaceable image roles are verified, not merely named

Date: 2026-08-15
Source scope/item: Rurubu WEDDING / V7 Hawaii clean-room
State: `VERIFIED_LOCAL`
Related project rule: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md` is already `PROMOTED_PROJECT_RULE` by explicit user direction.

## Source problem

Earlier Rurubu work often made Figma itself responsible for too much visual construction. That encouraged mechanically tidy geometry and made “editable” synonymous with many small native layers, even when those layers did not improve future editing.

For V7, the user explicitly requires a different responsibility split:

- wording/data that may change stays native text;
- replaceable photography uses stable mask/crop roles;
- reusable logos/marks may be SVG;
- fixed decorative visual language should be composed/generated when useful rather than rebuilt as Figma micro-geometry.

The open question was whether this simpler Figma structure could still support an energetic, materially different clean-room travel-magazine concept and survive real image replacement.

## Root-cause hypothesis

If visual hierarchy is carried primarily by image scale/crop, typography and art-directed asset composition, Figma does not need dozens of decorative primitives to produce a strong layout. The structure remains useful only if the named image roles actually survive a materially different source swap without surrounding layout reconstruction.

## Bounded test

### Outer A

`1244:2 / V7_HAWAII_CLEANROOM_OUTER_A_STRUCTURE_2026_08_15`

Created from scratch using:

- two semantic page background fields;
- native editable text;
- six named clipped `MASK / ...` photo roles;
- existing verified Rurubu rasters as temporary composition sources;
- no rounded cards, shadows, decorative micro-lines, stickers or generated fake text.

Result: directionally correct Hawaii color energy, but composition remained too even and poster/landing-page-like.

### Outer B

`1245:2 / V7_HAWAII_CLEANROOM_OUTER_B_PREFERRED_STUDY_2026_08_15`

Changed the **relationships**, not the layer ideology:

- Japanese headline became the dominant read;
- support photography became unequal in scale;
- photo masks were rotated/overlapped asymmetrically;
- front/back reading rhythms diverged intentionally;
- all copy stayed native;
- all photo roles stayed named clipped masks.

Result: materially more Japanese travel-editorial energy than A without adding Figma ornament layers.

### Inside A

`1247:2 / V7_HAWAII_CLEANROOM_INSIDE_A_PREFERRED_STUDY_2026_08_15`

Created separately rather than recoloring V6 I. Profile/history/next-trip content remains native text, while six photography roles remain masks.

### Replacement stress

`1246:2 / QA / V7_B_FRONT_HERO_REPLACEMENT_STRESS_WIDE_SOURCE`

The V7 front hero mask stayed exactly `793.7×420`. Its source was changed from the `796×428` coast family to the materially wider `1356×560` Yokohama-waterfront family.

No title, support-photo, footer or page geometry was rebuilt. Only the crop inside the same role changed. Screenshot QA passed, and the stress frame was hidden after evidence capture.

## Expected improvement

- stronger clean-room exploration without forcing AI to manipulate hundreds of small Figma ornaments;
- easier human understanding of what is editable versus replaceable;
- image replacement that does not destroy surrounding layout;
- visual iteration driven by hierarchy/crop/typography rather than card-box accumulation;
- clearer future asset briefs because each photograph has an explicit semantic role.

## Regression risk

- oversimplifying Figma structure can become an excuse for a flat poster instead of a rich editorial spread;
- a named “mask” is not proof of replacement resilience;
- composed/generated decoration can conflict visually with native text if no text-safe zone exists;
- a structurally valid placeholder can still be semantically wrong for the destination;
- background color alone is not a substitute for genuine art direction.

## Three-scale evidence

Outer B:

- whole spread: `1588×1123` PASS;
- front actual-size `794×1123`: PASS;
- back actual-size `794×1123`: PASS;
- native text: `20`;
- named replaceable masks: `6`;
- 18px safe-area text risks: `0`;
- all known rasters at/below intrinsic display dimensions: PASS.

Inside A:

- whole spread: `1588×1123` PASS;
- left actual-size `794×1123`: initial profile-title fit concern corrected, then PASS;
- right actual-size `794×1123`: PASS;
- native text: `32`;
- named replaceable masks: `6`;
- 18px safe-area text risks: `0`;
- all known rasters at/below intrinsic display dimensions: PASS.

## Figma evidence

- superseded Outer A `1244:2` — hidden;
- preferred Outer B `1245:2` — visible study;
- preferred Inside A `1247:2` — visible study;
- hero replacement proof `1246:2` — hidden after PASS;
- Start Here `845:27` = `V5 FU/FX · V6 M/I · V7 B/A STUDY`;
- V6 M/I remains the selected verified comparator and was not overwritten.

## Drive / asset evidence

No new Drive binary was created this experiment. Existing verified Rurubu assets were used to prove layout/mask behavior. The final Hawaii-specific hero remains intentionally unresolved rather than misrepresented.

The V7 front coast role is structurally verified but **not** a verified Hawaii destination master.

## GitHub evidence

- `01_paper-items/rurubu-wedding/RURUBU-V7-HAWAII-CLEANROOM-A-B-STUDY-2026-08-15.json`
- `01_paper-items/rurubu-wedding/RURUBU-V7-HAWAII-PREFERRED-B-A-STUDY-2026-08-15.json`

## Status

- project-wide hybrid-authoring policy: already `PROMOTED_PROJECT_RULE`;
- this Rurubu implementation: `VERIFIED_LOCAL`;
- V7 B/A design: preferred clean-room study, **not final V7** because Hawaii hero semantic fidelity is not yet satisfied.

## What must remain Rurubu-specific

Do not transfer:

- pink/aqua palette;
- Hawaii mood concept;
- exact Japanese headlines;
- image rotations/positions;
- travel-magazine density;
- Yokohama/Hawaii narrative;
- photo selections.

## Cross-item applicability

The transferable capability is narrower:

1. keep genuinely variable copy native;
2. put replaceable images in stable semantic masks;
3. prove replacement resilience with a materially different source ratio/size;
4. let visual hierarchy come from art direction rather than unnecessary native ornament geometry;
5. do not confuse structural replaceability with semantic asset correctness.

Because the method is already a project-wide rule, this entry is local implementation evidence rather than a new visual-style rule.
