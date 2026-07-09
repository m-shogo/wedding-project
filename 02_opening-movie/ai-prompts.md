# オープニングムービー AI素材プロンプト集

作成日: 2026-06-10
採点基準: 80点以上のみ採用候補

> 注意（2026-06-11目視確認）: 素材1-A-1（`op_11_narita_airport_lobby_ai.png`）と
> 素材1-A-2（`op_01_narita_boarding_gate_ai.png`）は生成静止画に人物が写っており不採用。
> 点数は静止画生成前のショット案としての評価であり、採用状態ではない。
> 最新の採否は `02_opening-movie/asset-status.md` を見る。
> 1-A系のプロンプトは、人物なし版を再生成する際の参考として残している。

## 試作優先順

1. **素材3 雲海** (89点) — 最優先
2. **素材1-B 抽象背景** (88点) — 最優先
3. **素材2-A 飛行機窓・地上** (87点)
4. **素材2-B 飛行機窓・青空** (86点)
5. **素材1-A-1 空港ロビー（朝）** (85点)
6. **素材4-A-1 ハワイの海** (85点)
7. **素材5-B 光の扉** (84点)
8. **素材1-A-2 空港ロビー（夜）** (82点)
9. **素材4-A-2 ハワイの夕暮れ** (81点)

---

## 素材 1-A-1 / 空港ロビーの光（朝）

スコア: **85点** | 章: 1-A | 用途: 出発の気配 カット1 | **現状: 生成静止画op_11は人物入りで不採用・再生成対象**

```
positive:
A cinematic 5-second looping background shot of a modern airport terminal at dawn,
amber runway guidance lights glowing softly along the floor, warm golden light streaming
through floor-to-ceiling windows, long corridor with gentle depth, navy and gold tones,
travel wedding film style, subtle film grain, elegant and emotional, slow smooth dolly
forward movement, clean composition with open sky visible, space for captions at bottom,
no text, no logo, no watermark, no people, no animals, no signage.

negative:
text, logo, watermark, signage, people, animals, crowds, faces, hands, silhouettes,
fast camera movement, shaky camera, distorted objects, neon lights, busy background,
clutter, high contrast, overexposed, dark shadows, ugly artifacts

camera_motion:
Slow dolly forward along the terminal corridor, subtle zoom-in 1.00x to 1.04x over 5 seconds.
```

loop_note: 誘導灯のリズムがカクつきやすい。CapCutでクロスフェード0.5秒でつなぐ。

---

## 素材 1-A-2 / 空港ロビーの光（夜）

スコア: **82点** | 章: 1-A | 用途: 出発の気配 カット2 | 注意: 光量確認必須 | **現状: 生成静止画op_01は人物入りで不採用・再生成対象**

```
positive:
A cinematic 5-second looping background shot of an empty airport departure gate at night,
soft warm overhead lights casting a gentle glow on the floor, dark navy sky visible
through large windows, golden reflections on the polished floor, minimal and serene,
travel wedding film style, navy gold white color palette, subtle film grain,
elegant and emotional, slow smooth pan left to right, clean composition,
space for captions at the bottom third, no text, no logo, no watermark,
no people, no animals, no signage.

negative:
text, logo, watermark, signage, people, animals, crowds, departure boards, clocks,
information screens, neon signs, fast movement, shaky camera, distorted objects,
busy scene, cluttered background, overexposed windows, harsh lighting

camera_motion:
Slow horizontal pan left to right, approximately 15% frame shift over 5 seconds, minimal tilt.
```

loop_note: リバースループが有効。CapCutで複製して逆再生をつなぐと9秒ループになる。

---

## 素材 1-B / 薄い光の抽象背景（テロップ背景）

スコア: **88点** | 章: 1-B | 用途: 搭乗券テロップ背景・ループ | **最優先試作**

```
positive:
A cinematic looping abstract background of soft bokeh light particles and gentle
lens flare drifting slowly across a deep navy background, warm golden and white
light orbs, atmospheric haze, subtle shimmer, travel wedding film style,
navy gold white color palette, elegant and emotional, very slow drifting motion,
minimal and clean composition, generous space for text overlay in the center,
subtle film grain, no text, no logo, no watermark, no people, no animals,
no signage, no distorted objects.

negative:
text, logo, watermark, people, animals, signage, realistic objects, buildings,
sharp edges, fast movement, strobe effect, neon colors, saturated colors,
geometric patterns, busy composition, crowded bokeh, harsh light

camera_motion:
No camera movement. Subject (bokeh particles) drift slowly upward and slightly right.
Camera is static.
```

loop_note: 粒子が画面端で発生・消失するよう設定するとシームレスループになる。

---

## 素材 2-A / 飛行機窓・地上の遠景

スコア: **87点** | 章: 2-A | 用途: 搭乗・機内 | 注意: 窓外の看板確認必須

```
positive:
A cinematic 5-second looping background shot looking out of an airplane window,
view of the airport tarmac and distant city below at golden hour, warm amber light
reflecting off the wing tip, soft cloud wisps at the horizon, navy sky above,
travel wedding film style, navy gold white color palette, subtle film grain,
elegant and emotional, very slow zoom out revealing the ground below,
clean composition with window frame as foreground element, space for captions,
no text, no logo, no watermark, no people, no animals, no signage.

negative:
text, logo, watermark, signage, people, animals, faces, hands, other aircraft visible,
airport signs, terminal buildings with readable text, fast movement, shaky camera,
distorted window frame, overexposed sky, harsh shadows, aircraft markings, engine logos

camera_motion:
Very slow zoom out from 1.05x to 1.00x over 5 seconds, simulating settling into the seat view.
```

loop_note: 窓枠を固定アンカーにする。地上の流れを低速指定でループしやすくする。

---

## 素材 2-B / 飛行機窓・青空と雲

スコア: **86点** | 章: 2-B | 用途: 上昇

```
positive:
A cinematic 5-second looping background shot looking out of an airplane window
during ascent, brilliant soft blue sky filling the upper frame, white fluffy clouds
drifting slowly past below, pale golden sunlight on the clouds, clean and serene,
travel wedding film style, navy gold white color palette, subtle film grain,
elegant and emotional, slow smooth upward drift as if clouds are passing by,
window frame as foreground, clean composition, space for captions at lower third,
no text, no logo, no watermark, no people, no animals, no signage.

negative:
text, logo, watermark, signage, people, animals, other aircraft, turbulence effects,
dramatic storm clouds, dark clouds, overexposed glare, fast movement, shaky camera,
distorted window, ugly artifacts, multiple windows

camera_motion:
Slow upward drift of clouds from center-bottom to slightly above center over 5 seconds,
simulating gentle ascent. Camera static, subject moves.
```

loop_note: CapCutで複製して逆再生をつなぐと10秒素材になる。

---

## 素材 3 / 雲海（上から見下ろし）

スコア: **89点** | 章: 3 | 用途: 離陸の山・章の頂点 | **最優先試作**

```
positive:
A cinematic 5-second looping background shot of a vast cloudscape seen from above,
dense white and pale golden clouds stretching to the horizon like an ocean of mist,
warm morning sunlight casting long soft shadows across the cloud tops, deep navy sky
above fading to pale blue at the horizon, travel wedding film style,
navy gold white color palette, subtle film grain, elegant and emotional,
slow smooth horizontal pan revealing the endless cloudscape,
clean composition with horizon in upper third, space for captions at bottom,
no text, no logo, no watermark, no people, no animals, no signage.

negative:
text, logo, watermark, signage, people, animals, aircraft, ground visible,
dramatic storm, dark threatening clouds, lightning, harsh shadows, overexposed,
fast camera movement, shaky, distorted, busy texture

camera_motion:
Slow horizontal pan right to left at approximately 10% frame width over 5 seconds,
revealing the cloud ocean gradually. Camera slightly above the cloud layer.
```

loop_note: リバースループ有効。ループ点にクロスフェード0.8秒。

---

## 素材 4-A-1 / ハワイの海・ゴールドの光

スコア: **85点** | 章: 4-A | 用途: ハワイ到着・開放感 カット1 | 注意: 波の破綻確認

```
positive:
A cinematic 5-second looping background shot of gentle turquoise ocean waves
at a Hawaiian beach at golden hour, warm golden sunlight shimmering on the water
surface, soft white foam at the shore, shallow foreground water with light reflections,
distant horizon merging with pale blue sky, travel wedding film style,
navy gold white color palette with turquoise accent, subtle film grain,
elegant and emotional, slow smooth pan right revealing the coastline,
clean composition, space for captions at upper and lower third,
no text, no logo, no watermark, no people, no animals, no signage.

negative:
text, logo, watermark, signage, people, animals, crowds, beach umbrellas, boats,
surf boards, towels, trash, buildings visible, fast waves, dramatic surf,
overexposed highlights, shaky camera, fast movement, distorted water

camera_motion:
Slow pan right approximately 12% frame width over 5 seconds, slightly above water level.
```

loop_note: パンを止めて波だけ動かす構成にするとループが簡単。クロスフェード0.5秒で処理。

---

## 素材 4-A-2 / ハワイの海・夕暮れ

スコア: **81点** | 章: 4-A | 用途: カット2・夕暮れの余韻 | 設計: ワンショット前提

```
positive:
A cinematic 5-second looping background shot of a calm Hawaiian ocean at sunset,
horizon glowing in warm orange and gold, soft rippling water catching the fading light,
deep navy sky above with the first hint of evening, travel wedding film style,
navy gold white color palette with warm orange sunset accent, subtle film grain,
elegant and emotional, very slow smooth zoom in toward the glowing horizon,
clean minimal composition with horizon at center, wide open space for captions,
no text, no logo, no watermark, no people, no animals, no signage.

negative:
text, logo, watermark, signage, people, animals, boats, surfboards, beach accessories,
dramatic storm, dark sky, overexposed sun disk, lens flare overload, shaky camera,
fast movement, distorted water, busy foreground

camera_motion:
Very slow zoom in from 1.00x to 1.03x toward the horizon over 5 seconds. Camera at water level.
```

loop_note: ループ不可。黒フェードイン/アウトのワンショットとして使う。

---

## 素材 5-B / 光が差す扉

スコア: **84点** | 章: 5-B | 用途: 余韻・入場へ | 設計: ワンショット前提

```
positive:
A cinematic 5-second looping background shot of light streaming through a tall elegant
doorway, warm golden backlight flooding through the open door frame, soft haze and
atmospheric mist in the light, dark navy interior framing the luminous entrance,
depth created by the contrast between shadow and light beyond the threshold,
travel wedding film style, navy gold white color palette, subtle film grain,
elegant and emotional, very slow smooth dolly forward toward the light,
clean composition with the door centered, generous space for captions above and below,
no text, no logo, no watermark, no people, no animals, no signage, no shadows of people.

negative:
text, logo, watermark, signage, people, animals, human silhouettes, shadows of people,
handles with readable text, door with visible writing, fast movement, shaky camera,
multiple doors, cluttered hallway, overexposed blowout, harsh light, distorted geometry

camera_motion:
Very slow dolly forward from distance toward the doorway, approximately 8% zoom equivalent
over 5 seconds.
```

loop_note: ワンショット前提。黒フェードで入場曲へつなぐ。

---

## ComfyUI共通設定（試作時）

- 解像度: 512x288（16:9）で試作 → 採用後に1920x1080
- フレーム数: 25フレーム（5秒 / 24fps）から始める
- ステップ数: 20ステップから → 採用後に30以上
- Image-to-Video推奨: 先に静止画で構図固め → 動画生成

## ループ設計パターン

| パターン | 対象素材 | CapCutでの処理 |
|---------|---------|--------------|
| シームレスループ | 1-B（粒子・光） | 素材をそのままループ設定 |
| リバースループ | 1-A-2、2-B、3 | 複製して逆再生をつなぐ |
| ワンショット | 4-A-2、5-B | 黒フェードイン/アウトで使い切る |
