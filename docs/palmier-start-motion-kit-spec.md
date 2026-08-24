# Palmier / Remotion StaRt Motion Kit

Status: `SPEC / NEXT IMPLEMENTATION UNIT`

## Architecture

Separate the Wedding timeline from reusable motion vocabulary.

`StaRt Extended Timeline -> motionPresetId -> Motion Kit renderer -> Palmier timeline -> DaVinci finish`

### Palmier Pro owns
- actual song timeline context
- clip ordering / trim / split / reorder
- choosing and placing rendered motion assets
- AI-generated abstract/image/video support when useful
- fast variant generation and preview
- agent control through MCP
- NLE XML handoff to DaVinci

### Remotion / motion-studio owns
- deterministic reusable typography motion
- transparent graphic overlays
- parameterized camera/shape/title animation
- preview catalogue / contact sheet
- JSON-driven variants

### DaVinci Resolve owns
- learning and understanding selected techniques
- final trim / keyframe polish
- Fusion recreation only for effects worth mastering
- color consistency
- Fairlight audio finish
- final deliver / venue QA

## Why not Palmier-only

Palmier is the AI-directed orchestration layer. Complex typography needs deterministic parameter control and reuse. Remotion is already available in this repository and is better suited to generate repeatable transparent motion assets from code. Palmier can then arrange those assets against the real song and footage.

## Why not DaVinci-only

DaVinci 21 includes strong AI-assisted tools and advanced Fusion graphics, but the desired workflow is not simply 'use an AI tool'. We want an agent to create dozens of variants, classify them, place them against song structure and keep them reusable. DaVinci remains the professional finishing and learning environment rather than the bulk variant factory.

## Motion preset schema

Each preset should expose:
- `motionId`
- `family`
- `label`
- `engine`: remotion | palmier-native | davinci-edit | davinci-fusion
- `input`: lyric-slot | caption | photo | video | shape
- `energy`: quiet | build | hit | peak | release
- `durationFrames`
- `beatBehavior`: hold | single-hit | triplet | stagger | sweep | release
- `cameraBehavior`
- `textBehavior`
- `safeForStillPhoto`
- `recommendedSections`
- `avoidWhen`
- `davinciLearningSkillIds`
- `previewCompositionId`

## V1 preset families — target 36

### TYPO / 12
1. `type-mask-slide` — maskから横reveal
2. `type-char-stagger` — 文字単位stagger
3. `type-word-punch` — 1語だけscale hit
4. `type-tracking-burst` — trackingが広がって止まる
5. `type-outline-fill` — outline→fill
6. `type-baseline-hop` — baselineを小さく跳ねる
7. `type-vertical-wipe` — 縦組み/縦方向reveal
8. `type-type-on-rhythm` — beat候補に合わせたtype-on
9. `type-triplet` — 3hit phrase
10. `type-counter-scroll` — 背景と逆方向へ小さく流す
11. `type-frame-lock` — 大文字を画面edgeへ固定
12. `type-quiet-caption` — motionなし/最小fade

### PHOTO / CAMERA / 8
13. `photo-static-hero`
14. `photo-small-push`
15. `photo-slow-pull`
16. `photo-directional-pan`
17. `photo-2p5d-parallax`
18. `photo-freeze-cutout`
19. `photo-contact-sheet-snap`
20. `photo-split-panel`

### TRANSITION / 8
21. `cut-hard-accent`
22. `cut-match-shape`
23. `wipe-directional-shape`
24. `wipe-paper-edge`
25. `wipe-route-line`
26. `flash-one-frame-soft`
27. `whip-source-matched`
28. `color-field-release`

### ANIME-OP GRAPHIC ACCENT / 8
29. `accent-speed-lines`
30. `accent-impact-frame`
31. `accent-halftone-burst`
32. `accent-scribble-underline`
33. `accent-stamp-triplet`
34. `accent-panel-grid`
35. `accent-cel-shadow-sweep`
36. `accent-micro-rgb-split`

## Anime-OP grammar, not anime-copy

Use transferable opening grammar:
- anticipation -> burst -> stillness -> graphic montage -> hero -> release
- off-axis typography
- split panels
- speed lines used for 4–12 frames, not persistent decoration
- freeze frame + cutout + label
- graphic color-field changes tied to section changes
- impact frame used sparingly at major peaks
- 2.5D parallax for still-photo depth
- large negative space before a hit
- motion synchronized to phrase rhythm rather than every beat

Do not copy identifiable layouts, logos, characters or title treatments from a specific anime opening.

## Variant generation strategy

For each preset, generate 3 intensity variants:
- `S` subtle
- `M` editorial
- `L` anime-OP peak

Do not expose all variants in the final timeline. The catalogue can contain many; the final Opening should use a coherent subset.

## Palmier agent workflow

1. Read song markers and current real footage/photo inventory.
2. Read phrase slot timing from local timing file.
3. Choose at most one primary motion family per phrase.
4. Render or apply preset.
5. Place on the Palmier timeline.
6. Preview 3 variants at meaningful section boundaries.
7. Record decision: keep / simplify / reject.
8. Export chosen cut to DaVinci via NLE XML.

## Guardrails

- no AI-generated bride/groom/dog
- no effect just because the beat exists
- no more than one full-screen impact device at the same instant
- no speed ramp on still photos
- no whip transition without source direction evidence
- no long kinetic text over an important real photo
- keep a quiet/static phrase after dense animation
- keep final 3–5 seconds readable and calm

## Learning bridge

When a Motion Kit preset is adopted into the final Opening, Movie Coach should map it to a DaVinci practice task.

Examples:
- `photo-small-push` -> Transform + Keyframe + Ease
- `type-mask-slide` -> Fusion Mask + Text+
- `whip-source-matched` -> Transform / motion blur / directional continuity
- `type-triplet` -> Marker + Text + timing
- `color-field-release` -> opacity / graphic layer / rhythm

The goal is: AI creates breadth, DaVinci learning creates understanding.
