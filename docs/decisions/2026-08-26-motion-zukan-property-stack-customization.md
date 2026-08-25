# モーション図鑑 Property Stack / Customization Boundary

Status: ACTIVE / MUTABLE  
Date: 2026-08-26  
Scope: `wedding-project` Movie only

## Decision

モーション図鑑 / Scene Composerでは、Motionごとに完成度の高いPresetを基本とし、ユーザーが必要な部分だけ上書きできる構造にする。

> **普段はPresetで完成。こだわる時だけ部分編集。さらに細かい追い込みはDaVinci。**

## 1. Property units

Motionの編集可能要素は、少なくとも以下の独立Propertyとして扱える構造にする。

- Transform
- Opacity
- Blur
- Crop
- Mask
- Perspective

将来追加できる拡張構造を維持する。

## 2. Dynamic Inspector

Figmaの右サイドバーのように、選択中Motionが実際に使っているPropertyだけ表示する。

例:

```text
Fade + Slide
- Transform
- Opacity
```

```text
Mask Reveal
- Transform
- Mask
```

```text
Blur In
- Blur
- Opacity
```

全Propertyを常時表示する万能Inspectorは現段階では作らない。

## 3. Property stack

Transform等は1個固定ではなく、同一Layerへ複数区間を持てる構造にする。

例:

```text
Transform 1: 登場
Transform 2: 表示中のゆっくり移動
Transform 3: 退場
```

Opacity等も将来的に複数区間を持てる。

```text
Opacity 1: 0 → 100%
Opacity 2: 100 → 40%
Opacity 3: 40 → 0%
```

ただしEasy UIではStackそのものを常時見せず、必要な時だけ詳細へ降りる。

## 4. Transform scope

Transformは少なくとも次の概念を扱える構造にする。

- Position X
- Position Y
- Position Z（3D Motion等で必要な場合のみUI表示）
- Scale
- Scale X / Y（必要時）
- Rotation
- Rotation X / Y / Z（必要時）
- Anchor / Pivot
- Duration
- Easing

通常の2D MotionではZをEasy UIへ出さない。

通常の「寄る」はZではなくScaleを優先する。

## 5. Start / End values

Transformは開始値と終了値を持てる。

例:

```text
Start
X -30%
Y -200%

End
X 50%
Y 20%

Duration
0.8 sec

Easing
自然に止まる
```

X/Yは0〜100%へ制限しない。
画面外からの登場等を表現するため、負値・100%超を許容する。

## 6. Easing

Easy UIでは人間に分かる名称を優先する。

例:

- 自然に止まる
- 自然に動き出す
- ゆっくり始まってゆっくり止まる
- 一定速度
- キレよく止まる

内部ではCanonical easing intentとして保持し、DaVinci export時に実装方式へ変換する。

Splineのハンドルや細かなBezier調整はDaVinci側の最終精密調整に任せる。

## 7. Preset owns the default motion

Motion Preset側で、基本の見た目が成立する値を持つ。

例:

```text
上からシュッと登場

Duration: 0.7 sec
Opacity: 0 → 100%
Transform: Y -200% → 20%
Easing: 自然に止まる
```

通常ユーザーはこれらを毎回設定しない。

Easy UIで優先して触らせるのは、見た目への影響が大きく理解しやすい項目。

例:

- 登場方向
- 登場位置
- 終了位置
- 強さ
- 大まかな時間

## 8. Partial override

ユーザーが1項目だけ変更した場合、他のPreset値までCustom化しない。

例:

```text
Transform: PRESET
Easing: PRESET
Opacity: HUMAN_SELECTED
```

Property-local overrideを維持する。

Preset更新やAI提案でHUMAN_SELECTED / LOCKEDを黙って上書きしない。

## 9. Customization boundary

3段階で扱う。

### 普段
Presetを選ぶだけで完成する。

### 少しこだわる
右Inspector / Accordionで必要なPropertyだけ上書きする。

### かなりこだわる
DaVinciでSpline、Keyframe、Mask形状、Motion Blur、細かなTransform/Opacity区間等を直接仕上げる。

Scene Composerを万能アニメーション編集ソフトへしない。

## Core rule

> **Motionごとに良いPresetを持ち、そのMotionで使っているPropertyだけを必要時に部分編集できるようにする。**

> **Preset First → Property-local Override → DaVinci Final Precision.**
