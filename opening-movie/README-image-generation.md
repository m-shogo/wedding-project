# オープニングムービー画像生成 自動化メモ

## 対象

構成案1: `MEMORY FLIGHT 1024`

```text
成田空港 → 沖縄 → 韓国 → ハワイ → 横浜の挙式
```

## 目的

ChatGPT / OpenAI Images API で、オープニングムービー用の仮背景画像を一括生成する。

最終的には、旅行写真・式場写真に差し替える前提。

---

## ファイル

```text
opening-movie/assets/concept-01-image-prompts.json
opening-movie/scripts/generate-concept-01-images.mjs
opening-movie/generated/concept-01/images/
```

## 使い方

リポジトリ直下で実行する。

```bash
OPENAI_API_KEY=sk-... node opening-movie/scripts/generate-concept-01-images.mjs
```

生成先:

```text
opening-movie/generated/concept-01/images/
```

---

## まずS優先度だけ作る

最初の仮OPに必要な10枚だけ作る。

```bash
ONLY_PRIORITY=S OPENAI_API_KEY=sk-... node opening-movie/scripts/generate-concept-01-images.mjs
```

## A優先度も作る

追加素材まで作る。

```bash
ONLY_PRIORITY=A OPENAI_API_KEY=sk-... node opening-movie/scripts/generate-concept-01-images.mjs
```

## 上書き生成

既に画像がある場合、通常はスキップする。
上書きしたい場合のみ `OVERWRITE=1` を付ける。

```bash
OVERWRITE=1 OPENAI_API_KEY=sk-... node opening-movie/scripts/generate-concept-01-images.mjs
```

## dry run

APIを叩かず、対象確認だけする。

```bash
DRY_RUN=1 node opening-movie/scripts/generate-concept-01-images.mjs
```

---

## モデル・サイズ・品質

デフォルト:

```text
OPENAI_IMAGE_MODEL=gpt-image-1
OPENAI_IMAGE_SIZE=1536x1024
OPENAI_IMAGE_QUALITY=high
```

変更例:

```bash
OPENAI_IMAGE_MODEL=gpt-image-1 OPENAI_IMAGE_SIZE=1536x1024 OPENAI_IMAGE_QUALITY=medium OPENAI_API_KEY=sk-... node opening-movie/scripts/generate-concept-01-images.mjs
```

---

## 注意

画像生成では文字が崩れやすいので、画像内には文字を入れない。

以下はCapCutで後乗せする。

- NOW BOARDING
- MEMORY FLIGHT 1024
- Flight SS1024
- Departure: Narita Airport
- Passenger / Destination / Gate
- Narita / Okinawa / Korea / Hawaii / Yokohama
- パスポートスタンプ風テロップ
- Doors opening in...
- カウントダウン数字

---

## 生成後の流れ

1. S優先度10枚を生成
2. 良い画像だけ採用
3. 画像を生成AI動画に投げて3〜6秒素材にする
4. CapCutで文字・SE・BGM・カウントダウンを後乗せ
5. 沖縄・韓国・ハワイ・式場の実写真に差し替え
