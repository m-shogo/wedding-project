# V5 front-cover date-plane subtraction experiment

Date: 2026-08-03
Item/version: Rurubu WEDDING V5
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current front-cover frame: `77:145`

## Authorities read

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- live Rurubu Current Status and asset ledger
- Rurubu editorial knowledge base and lessons
- V5 operating system and postmortem
- V6 research and asset queue
- live Figma before/after screenshots

## Visible problem

After the decorative star badge was removed, the date area still contained a separate blue plane icon immediately beside the native date badge. The badge already communicates travel through its ticket-like silhouette and internal aviation motifs, while the masthead also includes a flight-path line and plane. The additional icon repeated the same signal without adding navigation, date meaning, or page information.

## Anti-anchoring question

Would the separate plane icon be chosen if this cover were being composed today with no access to the existing frame?

Decision before testing: probably not. The date badge and masthead already establish the travel context, so the icon needed to prove a distinct editorial role to remain.

## Principle tested

Attempt subtraction before adding or retaining decorative marks. Repeated thematic signals should be judged cumulatively, not one at a time.

## Expected improvement

- make the date badge read as one coherent issue-information unit
- reduce competition around the masthead/date boundary
- remove one template-like decorative flourish
- preserve the travel identity through the masthead route motif, date badge, issue line, photography, and circular travel snap

## Possible regression

- the upper-right corner could become too static
- removal could weaken the visual connection between the date badge and the travel theme
- the badge could appear visually isolated

## Bounded reversible change

- node: `77:252`
- name: `RURUBU/Icon/plane`
- change: `visible: true → false`
- node was not deleted
- no text, semantic photo node, image fill, crop, frame hierarchy, or rollback candidate was modified

## Verification

### Whole-item / thumbnail scale

The masthead remains the primary identity and the hero remains the dominant visual. The top-right date badge is easier to parse as a single object, and the overall cover loses no immediate travel-guide recognition.

### Reading / page scale

The eye now moves from masthead to date badge to main yellow promise and hero without a small blue detour. The date remains clear and the badge does not feel stranded because its shape, internal motifs, and alignment with the masthead remain sufficient.

### Detail / actual-size risk review

No gap, accidental overlap, broken alignment, missing information, or contrast regression appeared. The hidden frame remains available for immediate rollback. Native text and semantic structure remain unchanged.

## Result

`PROTOTYPED → VERIFIED / ADOPTED_FOR_V5_CURRENT / PROJECT_RULE_NOT_PROMOTED`

The removal improved local hierarchy and reduced redundant travel symbolism. It is adopted for the V5 Current candidate only. This does not establish a global rule that airplane icons are always unnecessary.

## Failure / unresolved work

The dominant cover photograph remains visibly low-quality. This subtraction does not change `PHOTO_ROLE_PASS`, does not advance the V5 dummy-photo gate, and does not permit V6 production to begin.

The high-quality hero derivative still requires a binary-safe Figma placement route. External upload remains network-blocked, while Figma-internal chunk transfer has been proven only with an intentionally low-quality test image. The same failed network method was not retried in this experiment.

## Next application

- keep dominant-photo repair as the highest-priority V5 task
- audit the camera icon over the circular snap separately; it has a stronger semantic relationship and should not be removed automatically
- judge repeated travel motifs as a cluster before retaining each decorative mark
