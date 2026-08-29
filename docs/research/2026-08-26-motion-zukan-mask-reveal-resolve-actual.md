# Motion Zukan Mask Reveal — Resolve Actual

Date: 2026-08-26
Handoff closure: 2026-08-27
Scope: `type-mask-reveal` / adopted Scene `mz-scene-1f5568a2-e89a-4c63-95e7-bce4862e30c7`

## Result

DaVinci Resolve Free 21.0.4.5 の native Fusion Composition で、Text+ / Rectangle Mask / XYPath / Merge / Background だけを使う Mask Reveal を構築し、Actual MP4 を書き出した。

- Asset: `movie-dashboard/public/motion-previews/type-mask-reveal/davinci-actual-v1.mp4`
- Poster: `movie-dashboard/public/motion-previews/type-mask-reveal/davinci-actual-v1-poster.png`
- MP4 SHA-256: `32d5e1b39b2b8d381ae7521f4c6c3bcc30fe72b1dacb0fc7153b87e8bcf23592`
- Render: H.264 / 1280×720 / 30fps / 120 frames / 4.000000 sec / muted
- Resolve project: `MotionZukan_MaskReveal_Handoff_20260827_U`
- Imported timeline: `VML_MASK_REVEAL_OPENING_INTRO_MZ_SCENE_1F5568A2_E89A_4C63_95E7_BCE4862E30C7`
- Applied timeline: `VML_MASK_REVEAL_OPENING_INTRO_MZ_SCENE_1F5568A2_E89A_4C63_95E7_BCE4862E30C7__DAVINCI_ACTUAL`

## Palmier → Resolve handoff closure

- Palmierの実timelineを1280×720 / 30fps / 120framesで作成し、`WELCOME`をframe 18–119へ配置した。
- Scene sidecar SHA-256: `bed8c21e71b35a4949bf203d18574d963ab100e7cf284452f246cd42ee54531b`
- Palmier FCPXML SHA-256: `fd019269393277e477c22f059ea9721cc25a2524cd223f65c8bcb7389d4b48e5`
- scratch Resolve importでtimeline markerの完全一致、Basic Title（Resolve上の表示名は`テキスト`）、import前duration 120framesを読戻した。
- imported rough titleを無効化し、同一project内の派生Actual timelineへnative Fusion Compositionを構築した。
- Resolve readback SHA-256: `32c87131f5f16d545a303bbbc328f0a92259c87d9c3712617a5ac1a4d2e83131`

## Applied/readback

- Text: `WELCOME`
- Rectangle Mask connection: true
- Layer Delay: 18 frames
- Motion Delay: 0 frames
- Enter: 18 frames
- Hold: 84 frames
- Exit: 0 frames
- Position: `(0.80, 0.90)` → `(0.80, 0.78)` in top-origin Motion Library coordinates
- Direction / Distance: `UP` / `0.12`
- Scale: `1.0` → `1.0`
- Fusion tools: 11

Fusion uses bottom-origin Y while the Motion Library uses top-origin Y. The implementation converts `fusionY = 1 - libraryY`, and converts readback back to top-origin values before comparison.

## Visual QA

- frame 0 / 17 / 18: WELCOME is outside the reveal mask; only the lower-right accent line is visible.
- frame 24 / 30: WELCOME enters upward through the lower mask boundary.
- frame 36: WELCOME settles at bottom-right.
- frame 60 / 119: final position and scale remain static.
- Normal-speed and ffmpeg-generated 0.5× playback were both reviewed.

## Independent rendered-pixel oracle

`movie-dashboard/scripts/verify-mask-reveal-rendered-pixel-oracle.mjs`は実装コードやScene resolverをimportせず、永続MP4をffprobe/ffmpegで独立decodeする。

- frame 0 / 17 / 18: bottom-right ROIのwhite text pixelが0
- frame 24 < 30 < 36: white text pixelが段階的に増加
- frame 36: white text pixelが10,000超で着地
- frame 36 / 60 / 119: white text pixel差が20以内でhold
- frame 0 / 17 / 18 / 24 / 30 / 36 / 60 / 119: warm accent pixelが各500超
- SHA-256、1280×720、30fps、120frames、4秒も同じ独立checkで固定

## Failures caught before the final result

1. Adding Fusion to a neutral carrier clip produced correct node readback but rendered the original carrier. A native Fusion Composition item replaced that route.
2. A point input cannot be driven by a scalar BezierSpline. `XYPath` generated the required X/Y splines.
3. Mask tools expose `Mask`, not `Output`; `ConnectInput("EffectMask", rectangle.Mask)` is required.
4. `endFrame=119` produced 119 frames. The final render uses an explicit 120-frame MarkIn/MarkOut range.
5. Passing top-origin Y directly to Fusion placed the title at top-right and reversed vertical intent. Coordinate conversion fixed the actual picture.

## Final status

The adopted-Scene → Palmier real timeline → marker付きFCPXML → scratch Resolve import → marker/title/duration readback → Actual render → independent rendered-pixel oracle chain is complete. `type-mask-reveal` is `PRODUCTION_READY`. The rendered MP4 is implementation evidence; editable Human Master Scene values remain the source of truth.
