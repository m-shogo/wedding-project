# Mask Reveal Vertical Slice — Palmier → DaVinci Local Verification

Status: ACTIVE / NOT PRODUCTION READY
Scope: Movie only
Pattern: `type-mask-reveal`
Implementation: `impl-type-mask-reveal-davinci-text-plus`
Sample asset set: `sample-typography-welcome-v1`

## Purpose

Mask Reveal 1件を、Visual Motion Libraryで選ぶところからActual DaVinci Previewまで本当に通すための最小handoff。

この手順が完了するまで、次のMotion Patternをproduction migrationしない。

## Authority split

- Visual Motion Library: 選択・入力・Prompt/Manifestの正本
- Palmier: Rough timing / placement / timeline ordering
- Palmier NLE XML: timelineの正本
- Motion Handoff Manifest JSON: Fusion/Text+などXMLだけでは保持しにくい演出意図の正本
- DaVinci Resolve: Final motion / render / visual QA
- Remotion: Concept preview補助のみ。DaVinci実装の証拠にはしない

## Step 1 — Visual Motion Library

`/movie-coach/motion-library` を開く。

Mask Revealで次を入力する。

- text: `WELCOME`
- section: `OPENING_INTRO`
- intensity: `S`
- duration: `0.8 sec`
- media: 共通Hero Photo、または比較用ニュートラル背景

生成するもの:

1. Palmier Instruction
2. DaVinci Finish Manifest
3. Machine JSON
4. Motion Handoff Manifest JSON

Motion Handoff Manifestのmarkerは `VML_MASK_REVEAL_OPENING_INTRO` とする。

## Step 2 — Palmier Rough

Palmier側ではExact Mask Revealを無理に再現しない。

やること:

- `WELCOME` のrough title placement
- 約0.8秒の演出領域を確保
- `VML_MASK_REVEAL_OPENING_INTRO` と同じ意味のmarker/識別子を保持
- 使用する背景素材を配置
- 前後カットの順序と尺を決める

やらないこと:

- 別の派手なtitle effectへの勝手な置換
- glow / bounce / shake追加
- DaVinciで未検証の実装を「完成」と扱う

## Step 3 — Palmier export

Palmierの実timelineからDaVinci互換NLE XMLを書き出す。

推奨ファイル名:

`palmier-mask-reveal-timeline.xml`

Visual Motion Libraryから書き出したsidecar:

`mask-reveal-motion-handoff.json`

この2ファイルをセットでDaVinciへ渡す。

アプリ側で独自XMLを生成しない。timeline truthはPalmier exportを使う。

## Step 4 — DaVinci import

1. NLE XMLをDaVinci Resolveへimport
2. marker/対象clip/タイトル位置を確認
3. `type-mask-reveal` の対象区間を特定
4. Text+を使用
5. rectangular maskまたは同等の標準Fusion手法でreveal
6. keyframe easingを調整
7. 写真と文字の可読性を優先

禁止:

- bounce
- excessive glow
- excessive motion blur
- face covering
- effect-for-effect

## Step 5 — Local verification evidence

次の5項目を全て満たすまでImplementationを`PRODUCTION_READY`へ上げない。

- `opened-in-davinci`
- `implementation-applied`
- `render-tested`
- `visual-QA`
- `resolve-version-recorded`

ローカルで確認したResolve versionを必ずRegistryへ記録する。Web上の最新版を代入しない。

## Step 6 — Actual Preview

共通sampleを使用し、3〜8秒 / 30fps / muted / loop向けでrenderする。

推奨名:

`mask-reveal-welcome-davinci-v1.mp4`

登録時に更新するもの:

- preview sourceType → `ACTUAL_DAVINCI_RENDER`
- preview status → `ACTUAL`、QA後に`VERIFIED`
- implementation status → evidenceに応じて`TESTED` / `PRODUCTION_READY`
- resolveVersion
- generatedAt
- assetPath / posterPath

Concept previewを消す必要はない。比較・履歴として残し、Actualと明確に区別する。

## Visual QA

通常速度と0.5xの両方で確認する。

確認点:

- 文字が境界から自然に現れる
- acceleration / decelerationが不自然でない
- settle時に不要なbounceがない
- mask edgeが見えない
- titleが写真の主役を邪魔しない
- 0.8秒で読める文字量になっている
- PreviewとDaVinci implementationが同じ動きを示す

## Completion gate

このVertical Sliceの完了条件:

`Visual Motion Library → Palmier Rough → NLE XML + Motion Handoff Manifest → DaVinci Text+/Fusion → Actual Render → Visual QA → Registry verification`

ここまで通った後に、`photo-hero-still`へ横展開する。
