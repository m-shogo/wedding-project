# Opening V1 編集言語 / セクション対応表

Opening V1を「均等な写真カード＋slow zoomのWeddingテンプレ」に戻さないための正本。

## 基本原則

- 60秒 / 9セクションという骨格は維持する。
- 実写真43秒（72%）を主役にする。
- 写真だから動かす、という発想を禁止する。**staticが第一候補**。
- chapter間は原則hard cut。クロスフェードは意味がある場合だけ。
- 写真の並びは均等配置しない。full-bleed / left / right / wideを混ぜる。
- `MEMORY 01`、`OUR JOURNEY`、`WELCOME ABOARD`等の説明的英字ラベルを足さない。
- navy + gold + serifを「高級感の既定値」にしない。
- AI動画は背景/B-rollのみ。人物・犬・思い出写真の代替には使わない。
- 見た目の目的は「旅行デザイン」ではなく、**二人の旅行記録を短編映画として編集した感覚**。

## 60秒構成

| # | セクション | 秒 | 現行編集 | 素材 |
|---|---|---:|---|---|
| 1 | Departure title | 5 | 静かなtitle。名前＋日付＋横浜のみ | Remotion text |
| 2 | Air / cloud transition | 4 | 雲海のみ。説明テロップなし | `CloudSea` / 実写雲海候補 |
| 3 | Okinawa memories | 9 | 約2.6s / 2.7s / 3.7sのhard cut。full → left → wide | 実写真3枚 |
| 4 | Seoul memories | 9 | 約2.6s / 2.7s / 3.7sのhard cut。right → full → left | 実写真3枚 |
| 5 | Hawaii memories | 9 | 約2.6s / 2.7s / 3.7sのhard cut。full → wide → right | 実写真3枚 |
| 6 | Couple hero A | 8 | 1枚をnative比率優先で大きく表示。ごく小さいpushのみ | 実写真1枚 |
| 7 | Couple hero B | 8 | 1枚をnative比率優先で大きく表示。static | 実写真1枚 |
| 8 | Arrival / Yokohama route | 3 | HAWAII → YOKOHAMAの線だけ。説明ラベルなし | Remotion route |
| 9 | Ending title | 5 | 名前＋日付＋横浜。短いfadeのみ | Remotion text |

## 写真差し替え

置き場:

`motion-studio/public/photos/opening/`

推奨ファイル名:

```text
okinawa-01.jpg
okinawa-02.jpg
okinawa-03.jpg
seoul-01.jpg
seoul-02.jpg
seoul-03.jpg
hawaii-01.jpg
hawaii-02.jpg
hawaii-03.jpg
hero-01.jpg
hero-02.jpg
```

`pnpm sync:photos` で `photoLibrary.generated.ts` を更新すると、`openingV1Media.ts` が自動解決する。

- semantic filename matchを最優先。
- `opening/` に11枚以上ある場合だけ並び順fallbackを許可。
- sample画像が1〜10枚だけ存在する状態では勝手に本番slotへ入れない。

## 写真fitの規則

写真をすべて16:9へ切るのは禁止。差し替えだけで事故りにくい初期値を次のように固定する。

| 表示 | fit | 理由 |
|---|---|---|
| `full` | `cover` | 画面全体を使う風景・瞬間の強さを優先 |
| `left` / `right` | `cover` | 非対称レイアウトとして面を作る |
| `wide` | `contain` | 縦写真・4:3・スマホ写真の元構図を残す |
| Hero A / B | `contain` | 二人の顔・身体・重要な瞬間をcrop事故から守る |

- `contain`では周囲の余白も編集表現として残す。blur背景で無理に埋めない。
- `cover`で顔が切れる写真だけ、既存の`objectPosition`を上書きする。
- 実写真が無い段階で顔認識・自動cropエンジンを増築しない。実写真投入後に必要性を判断する。

## motionの考え方

### static

最も重要。顔、感情、決定的瞬間、構図が強い写真は動かさない。

### push

奥行きがあり、視線を中央へ導ける写真だけ。最大約2.4%程度。

### drift

横長風景や街・海で、構図を壊さない範囲のみ。現在は約20px以内。

### 禁止寄り

- 全写真にKen Burns
- 全章同じeasing
- 写真をカード化して等間隔配置
- 1秒ごとの派手なtransition
- zoom transition / whip / glow / film burnの常用
- 意味のない英字kicker
- 縦写真をblur背景で無理に16:9化すること

## cutの考え方

現在は場所順を保ったV1だが、実写真投入後のV2候補では場所だけでなく次も評価する。

- horizon → horizon
- gaze → gaze
- hand/detail → hand/detail
- walking direction → walking direction
- blue → blue / warm → warm
- 音が先行するJ-cut
- 余韻を残すL-cut

**地名順より強いvisual/semantic matchがある場合は、場所順を崩すことを許可する。**

## 音

映像transitionよりsound continuityを優先する。

```text
A3  必要な会話/現地音
A2  ambience（空港・海・街）
A1  BGM
```

`openingV1Sound.ts` にJ-cut用cueを定義し、`assets.ts`でcandidate / approved / finalになった音源だけRemotionへ入る。権利未確認・missing素材はcueがあっても再生しない。

次の画の環境音を数フレーム〜数十フレーム先行させる。whooshを全cutへ付けない。

## QA

最低限:

1. `pnpm typecheck`
2. `pnpm check`
3. sound cue contract
4. `pnpm exec remotion compositions src/index-opening-v1.ts`
5. 60秒 / 1920x1080 / 30fpsを確認
6. 主要frameを目視
7. 実写真投入後は顔crop、視線方向、safe area、native比率を確認
8. 「cinematic」という言葉を使わず、各cutが良い理由を説明できること

## 現在のボトルネック

実写真11枚の本投入。コード側は写真差し替え・自然なfit・J-cut音レイヤーを受けられる状態。

素材を増やすより、11枚の選定・crop・順番・音設計を先に詰める。

## 関連

- `motion-studio/src/compositions/opening/OpeningV1.tsx`
- `motion-studio/src/data/openingV1Media.ts`
- `motion-studio/src/data/openingV1Sound.ts`
- `docs/02_style-bible.md`
- `docs/research/2026-08-22-tiktok-wedding-film-trends.md`
- `docs/reference-recipes.md`
