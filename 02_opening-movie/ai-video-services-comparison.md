# AI動画サービス比較メモ

結婚式オープニングムービー用のAI動画サービス比較。

目的は、20枚前後のAI背景画像を `Image to Video` で3〜6秒の動画素材にし、最終的にCapCut / DaVinci Resolveで編集すること。

> 注意: AI動画サービスの無料枠・料金・クレジット消費・透かし仕様は頻繁に変わる。ここでは「結婚式ムービー制作での実用判断」を優先する。登録後は必ず各サービス画面の Credits / Watermark / Pricing を確認する。

---

## 今の結論

今回のオープニング構成は、空港、飛行機、世界旅行、都市、横浜、チャペル、光背景。

この用途なら、優先順位はこれ。

| 順位 | AI | 使う理由 | 役割 |
|---:|---|---|---|
| 1 | **Kling** | 映画感、カメラ移動、旅行感が強い | 本命。無料で試作、有料なら本番候補 |
| 2 | **PixVerse** | 動きが大きく、オープニング向き | 空港、都市、世界旅行、切り替え演出用 |
| 3 | **Hailuo** | 無料枠が強く、比較・量産に向く | 無料本命候補。透かし確認必須 |
| 4 | **Luma** | 自然で上品。派手さは弱い | チャペル、横浜、光背景など重要カット専用 |

Runway / Pika / Veo / Firefly / Kaiber は、今日は後回しでよい。

---

## 今日やること

目的は、20本を作ることではない。

**課金前に「本命AI」と「捨てるAI」を決めること。**

### 今日の順番

1. Kling
2. PixVerse
3. Hailuo
4. Luma

### 今日使う画像

まずは1枚だけ。

第一候補: **19. チャペル扉**

理由:

- 光
- 奥行き
- 高級感
- 破綻の出やすさ

が分かりやすい。

第二候補: **01. 成田空港ロビー**

理由:

- Kling / PixVerse の映画感とカメラ移動の差が出やすい。

---

## URLと登録後の使い方

## Kling

URL: https://klingai.com/

### 登録後

1. Sign up / Log in
2. **AI Videos**
3. **Image to Video**
4. 画像をアップロード
5. 5秒・低コスト設定で生成
6. 透かし、画質、消費クレジットを確認

### 今日の見るポイント

- 映画っぽいか
- カメラ移動が自然か
- 無料枠が毎日使えそうか
- 透かしが本番で邪魔か

### プロンプト

```text
Slow cinematic dolly-in toward the chapel doors.
Elegant luxury wedding atmosphere.
Soft warm light spilling from behind the doors.
Subtle parallax, stable camera, smooth motion.
No people, no text, no logo, no dramatic distortion.
```

### 判断

- 動きが一番良いなら、有料本命。
- 無料で透かしがある場合は、無料は試作用。本番前に1か月だけStandard課金を検討。

---

## PixVerse

URL: https://pixverse.ai/

### 登録後

1. Sign up / Log in
2. **Create**
3. **Image to Video**
4. 画像をアップロード
5. 5秒で生成
6. 透かし、画質、動きの派手さを確認

### 今日の見るポイント

- 動きが大きくても安っぽくないか
- 世界旅行・都市移動に使えそうか
- 破綻が目立たないか
- 透かしがあるか

### プロンプト

```text
Elegant cinematic camera push-in with slightly dynamic light movement.
Wedding chapel doors glowing softly.
Smooth motion, premium atmosphere, stable architecture.
No people, no text, no logo, no distortion.
```

### 判断

- 良ければ、空港、飛行機、世界旅行、都市、切り替え演出に使う。
- 派手すぎる、安っぽい、破綻が多いなら捨てる。

---

## Hailuo

URL: https://hailuoai.video/

### 登録後

1. Sign up / Log in
2. **Create Video**
3. **Image to Video**
4. 画像をアップロード
5. 5〜6秒で生成
6. 透かし、残クレジット、ダウンロード画質を確認

### 今日の見るポイント

- 無料枠がどれくらいあるか
- 透かしなしで使えるか
- Kling / PixVerse と比べて画質が落ちないか
- 動きが大きすぎないか

### プロンプト

```text
Gentle forward camera movement toward the chapel entrance.
Soft glowing light, romantic but restrained.
Keep the architecture stable and elegant.
Minimal motion, premium wedding film mood.
No people, no text, no logo.
```

### 判断

- 透かしなし、または目立たないなら無料本命候補。
- 画質や安定感が弱ければ、試作用・サブ用途。

---

## Luma Dream Machine

URL: https://lumalabs.ai/dream-machine

### 登録後

1. Sign up / Log in
2. **Dream Machine**
3. Image input / Image to Video を確認
4. 画像をアップロード
5. 短尺で生成
6. 透かし、画質、自然さを確認

### 今日の見るポイント

- チャペルが上品に見えるか
- 横浜・海・光背景に使えそうか
- 派手さではなく自然さがあるか
- 無料枠が少なすぎないか

### プロンプト

```text
A calm, realistic camera push toward the chapel doors.
Natural light movement, soft reflections, elegant and quiet atmosphere.
Keep all objects stable.
No people, no text, no logo.
```

### 判断

- チャペルや横浜が一番上品なら、重要カット専用。
- 量産には使わない。

---

## 今日の判定表

| AI | 合格条件 | 不合格条件 |
|---|---|---|
| Kling | 映画感とカメラ移動が一番良い | 透かしが邪魔、本番無料利用は厳しい |
| PixVerse | 動きが大きく、オープニングとして映える | 派手すぎる、安っぽい、破綻が多い |
| Hailuo | 無料で十分な画質、透かしが問題ない | 品質が不安定、動きが雑 |
| Luma | チャペル・横浜が上品 | 無料枠が少ない、地味すぎる |

---

## サービス別の向き不向き

| シーン | 第一候補 | 第二候補 | メモ |
|---|---|---|---|
| 成田空港ロビー | Kling | PixVerse | 映画的な前進、奥行き |
| 飛行機 | Kling | PixVerse | 動きが欲しいのでLumaよりPixVerse |
| 世界旅行 | PixVerse | Kling | テンポと切り替え重視 |
| 都市・海外 | Kling | PixVerse | カメラ移動が強い方を採用 |
| 横浜の海と街 | Luma | Kling | 上品さ重視。動きが欲しければKling |
| チャペル扉 | Luma | Kling | 自然さならLuma、ドラマ性ならKling |
| 光背景 | Hailuo | Luma | 粒子・光の動きならHailuo |
| カウントダウン背景 | Hailuo | PixVerse | 少し動きがある方がよい |

---

## 有料判断

### 有料を1つだけ選ぶなら

**Kling Standardを1か月だけ課金**が現実的。

理由:

- 20シーンに一番広く対応できる
- 空港、飛行機、都市、横浜、チャペルまで守備範囲が広い
- 無料で試作してから、有料で透かしなし本番生成ができる
- Runway / Veo より量産コスパが良い

### 課金するタイミング

まだ早い。

先にやること:

1. 20枚の画像を確定
2. 各シーンの動画化価値を決める
3. 無料でKling / PixVerse / Hailuo / Lumaを比較
4. 採用AIを決める
5. 本番に必要な分だけ課金

---

## 20シーン全部を動画化しない

20シーン全部をAI動画化すると、逆に安っぽくなる可能性がある。

おすすめはこれ。

- 動画化: 8〜12シーン
- 静止画 + CapCut演出: 残り

AI動画に向いているもの:

- 空間の奥行きがある
- 光が動く
- 雲や海がある
- カメラ移動で気持ちよく見える
- 破綻しても目立ちにくい背景

AI動画に向かないもの:

- 人物
- 文字
- ロゴ
- 実在建物を正確に見せたいもの
- 細かい装飾が多いもの

---

## 動きの方針

結婚式本番では、派手さより破綻しないことが重要。

使いやすい動き:

- slow dolly in
- slow camera push
- gentle pan
- subtle parallax
- soft light movement
- floating particles
- clouds slowly moving
- calm cinematic movement

避ける動き:

- 高速カメラ移動
- 大きすぎる回転
- 人物を歩かせる
- 顔を動かす
- 扉を大きく開ける
- 文字生成
- ロゴ生成

---

## 今日の最終ゴール

4本作ったら、次を決める。

| 結果 | 次の判断 |
|---|---|
| Kling圧勝 | Kling無料で試作継続。本番前にStandard検討 |
| PixVerseが良い | 世界旅行・都市・切替演出で採用 |
| Hailuoが透かしなしで十分 | 無料本命として量産候補 |
| Lumaがチャペルだけ強い | チャペル・横浜だけLuma |
| 全部微妙 | 画像側かプロンプト側を修正。課金しない |

---

## 重要メモ

動画AI選びより大事なのは、以下。

- どのシーンを動画化するか
- どのシーンを静止画で見せるか
- BGMの山場と合っているか
- 透かしがないか
- 破綻していないか
- CapCut上で高級感が残るか

AI動画は素材作り。
完成度は最終編集で決まる。
