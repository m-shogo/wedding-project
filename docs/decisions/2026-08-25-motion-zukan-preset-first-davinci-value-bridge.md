# モーション図鑑 Preset-first UI / DaVinci Value Bridge

Status: ACTIVE / MUTABLE  
Date: 2026-08-25  
Scope: `wedding-project` Movie only  
Parent authorities:
- `docs/contracts/human-readable-editable-movie-contract.md`
- `docs/contracts/visual-scene-composer-design-rules.md`
- `docs/decisions/2026-08-25-motion-zukan-product-principles.md`
- `docs/decisions/2026-08-25-motion-zukan-future-update-backlog.md`

## Purpose

モーション図鑑 / Scene Composerでは、UIを簡単にするだけでなく、その裏側の値がDaVinci Resolveへ破綻なく渡せることを必須とする。

最重要原則:

> **普段は言葉で選ぶ。数値は隠す。必要な時だけ詳細を開いて微調整する。**

> **人間向けPreset → 正規化された内部値 → DaVinci実装値** の3段構造を維持する。

> **Scene Composerで演出意図を決め、DaVinciで実映像を見ながら最終精密調整する。**

---

## 1. Easy UIはラジオボタン中心

例えばText Layer Delayは通常UIで:

```text
文字を出すタイミング

○ すぐ
● 少し待ってから
○ 写真をしっかり見せてから

詳細設定 ＞
```

ユーザーは通常、秒数を直接意識しなくてよい。

同じPreset labelでもOpening / Profile / Scene roleにより内部defaultは変えられる。

例:

```text
「少し待ってから」
Opening → 0.6 sec
Profile → 0.9 sec
```

ただし既存のHUMAN_SELECTED / LOCKED値をPreset更新で上書きしない。

---

## 2. 詳細設定はアコーディオン

Easyのラジオボタンと、詳細内の数値候補ラジオを二重にしない。

詳細設定を開いた時は、現在Presetが解決した実数値をそのまま見せる。

```text
▼ 詳細設定

表示開始
[ 0.6 ] 秒
```

必要なら直接変更できる。

```text
0.6 → 0.75 sec
```

手動変更したらEasy側は `カスタム` 状態として扱う。

```text
○ すぐ
○ 少し待ってから
○ 写真をしっかり見せてから
● カスタム
```

この構造はDelayだけでなく、Position / Distance / Scale / Duration / Intensity等にも適用する。

---

## 3. Positionも同じUX

通常UI:

```text
位置

○ 左下
○ 中央
● 右下

詳細設定 ＞
```

内部ではPresetを正規化値へ解決する。

例:

```text
RIGHT_BOTTOM
normalizedX = 0.78
normalizedY = 0.78
```

詳細設定では必要な時だけ:

```text
X: 78%
Y: 78%
Offset X: +2%
Offset Y: -4%
```

を編集できる。

Scene Composerで毎回DaVinci固有のTransform数値を直接入力させない。

---

## 4. DaVinciへ渡すための3段構造

### A. Human UI value

人間が選ぶ値。

```text
位置: 右下
文字を出す: 少し待ってから
動き: 下から少し
強さ: 弱
```

### B. Canonical normalized value

アプリ内部の正本。

```text
positionPreset: RIGHT_BOTTOM
xNormalized: 0.78
yNormalized: 0.78
layerDelaySeconds: 0.6
direction: UP
distanceNormalized: 0.03
intensity: S
```

これはUIや解像度に依存しないhuman-editable production authority。

### C. DaVinci implementation value

Resolveの実Project / Timeline / Fusion構造へ適用する時に変換した値。

例:

```text
Timeline FPS: 30
Layer Delay 0.6 sec → 18 frames
Direction UP → Rectangle Mask / Transform animation direction
Position normalized → current output resolutionに応じたResolve/Fusion座標
Distance normalized → implementation-specific mask/transform distance
```

DaVinci固有値はCanonical valueから導出し、逆転させない。

---

## 5. 秒とFrameを両方扱う

人間向けの正本は原則 `seconds`。

DaVinci実装時はProject FPSからframeへ変換する。

例:

```text
Delay = 0.6 sec
FPS = 30
→ 18 frames
```

FPSが変わっても、人間の意味である `0.6 sec` を正本として保持する。

frame数だけを正本にしない。

必要ならDaVinci handoffに:

```text
seconds: 0.6
resolvedFrames: 18
fps: 30
```

を併記する。

---

## 6. JSONはHuman Master / sidecarとして使う

JSONはモーション図鑑のSceneInstance / Motion Handoffを保存・受け渡すHuman Master側の形式として適している。

ただし、JSONそのものをDaVinci timeline importの唯一の媒体と決めつけない。

Production handoffは概念的に:

```text
Timeline interchange
+
Motion sidecar JSON
```

とする。

現在の実装方針では:

```text
Palmier real NLE XML
+
motion-zukan Scene / Motion Handoff JSON
```

を維持する。

将来、OTIO等を採用する場合もHuman Master JSONの意味・authorityは変えない。

`.drt` はDaVinci native timeline exchange候補だが、アプリ側が中身を推測して独自生成する前提にしない。

---

## 7. Scene ComposerとDaVinciの境界

Scene Composerで決める:

- Motion choice
- Position preset
- X/Y / Offset（必要時）
- Layer Delay
- Motion Delay
- Motion Duration
- Hold
- Direction
- Distance
- Scale
- Intensity
- Crop / Focus intent
- Text / Media

DaVinciで最終調整する:

- exact keyframe frame
- Spline curve
- easing handle
- mask pixel-level refinement
- Motion Blur
- detailed Text+ Inspector values
- visually judged sub-frame / frame-level timing polish
- final typography / crop / color / audio finish

判断基準:

> **人間が演出として意味を理解できる値まではScene Composer。**

> **映像を見ながら実装を追い込む値はDaVinci。**

Scene ComposerをDaVinci Inspectorのコピーにしない。

---

## 8. Conversion must be explicit and testable

PresetからDaVinciへ変換する際、magic numberを散らさない。

概念的には:

```text
Preset
↓
Canonical Resolver
↓
Project Context (fps / resolution / aspect ratio)
↓
Implementation Adapter
↓
DaVinci value
```

とする。

例えば:

```text
resolveDelayPreset("PHOTO_FIRST", project="opening")
→ 0.6 sec

secondsToFrames(0.6, fps=30)
→ 18
```

```text
resolvePositionPreset("BOTTOM_RIGHT")
→ x=0.78, y=0.78

mapNormalizedPositionToDavinci(...)
→ implementation-specific position
```

Preset labelからDaVinci値へ直接飛ばさない。

---

## 9. UI/UX quality rule

値が正確でも、操作が重ければ失敗。

以下を優先する。

1. まずラジオボタン等で意味を選ぶ
2. 数字を見なくてもSceneを成立させる
3. 必要ならアコーディオンを開く
4. 開いたら現在の実数値が分かる
5. 直接数値変更できる
6. 変更後はCustomとして明示する
7. DaVinciへ渡す時に正確な実装値へ変換する
8. DaVinciでは最後の微調整だけにする

この流れのスムーズさを、単なる機能数より優先する。

---

## 10. Core UX definition

> **選ぶだけで成立し、必要なら数字まで降りられ、その数字はDaVinciで使える実装値へ正確に変換される。**

> **Preset First → Accordion Detail → DaVinci Final Precision.**
