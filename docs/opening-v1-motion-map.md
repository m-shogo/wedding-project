# Opening V1 編集言語 / セクション対応表

Opening V1を「均等な写真カード＋slow zoom＋高級風title card」のWeddingテンプレへ戻さないための正本。

## 基本原則

- **60秒 / 8セクション**を現行正本とする。
- 実写真を使うsceneは53秒。**全体の約88%を写真主役**にする。
- 冒頭に独立title cardを置かない。最初の2秒からHero実写真を出す。
- fake cloud / 生成っぽい抽象背景を「旅行感」の代用品にしない。
- 写真だから動かす、という発想を禁止する。**staticが第一候補**。
- chapter間は原則hard cut。クロスフェードは意味がある場合だけ。
- 写真の並びは均等配置しない。full-bleed / left / right / wideを混ぜる。
- `MEMORY 01`、`OUR JOURNEY`、`WELCOME ABOARD`等の説明的英字ラベルを足さない。
- navy + gold + serifを「高級感の既定値」にしない。現行Opening V1はsans中心。
- AI動画は背景/B-rollのみ。人物・犬・思い出写真の代替には使わない。
- 見た目の目的は「旅行デザイン」ではなく、**二人の旅行記録を短編映画として編集した感覚**。

## 60秒構成

| # | time | セクション | 秒 | 現行編集 | 素材 |
|---|---|---|---:|---|---|
| 1 | 00:00–00:02 | Photo cold open | 2 | Hero 01を即表示。左下に名前＋日付だけ | 実写真Hero 01 |
| 2 | 00:02–00:13 | Okinawa memories | 11 | 3 hard cuts。full → left → wide | 実写真3枚 |
| 3 | 00:13–00:24 | Seoul memories | 11 | 3 hard cuts。right → full → left | 実写真3枚 |
| 4 | 00:24–00:35 | Hawaii memories | 11 | 3 hard cuts。full → wide → right | 実写真3枚 |
| 5 | 00:35–00:44 | Couple hero A | 9 | native比率優先。ごく小さいpushだけ | 実写真1枚 |
| 6 | 00:44–00:53 | Couple hero B | 9 | native比率優先。static | 実写真1枚 |
| 7 | 00:53–00:57 | Arrival / Yokohama route | 4 | HAWAII → YOKOHAMAの線だけ | Remotion route |
| 8 | 00:57–01:00 | Documentary end card | 3 | 左下にYOKOHAMA＋日付だけ | Remotion text |

> Hero 01はcold openとHero Aで再登場する。実写真投入後、同じ写真の反復が弱ければcold openだけHero 02または旅行写真へ差し替える。現時点では写真未投入のため、余計なslotを増やさない。

## 削除済み / 復活禁止寄り

- 5秒の中央揃え `SHOGO & SHIORI` serif title card
- 4秒の `CloudSea` fake-cloud transition
- 大きなWedding風ending title
- 均等3枚カード
- 各章に同じslow zoomを割り当てる設計

Visual QAで「AI高級テンプレ / 生成背景」に見えたため削除した。単に見た目を変えて復活させない。

## 写真差し替え

置き場:

`motion-studio/public/photos/opening/`

canonical filename:

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

通常は手動 `pnpm sync:photos` 不要。

- `pnpm dev:opening-v1`
- `pnpm render:opening-v1:preview`
- `pnpm render:opening-v1`

の前に写真探索が自動実行される。

- previewは不足写真があってもplaceholderで動く。
- final renderは11/11揃っていなければ失敗する。
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
| Cold open / Hero A / B | `contain` | 二人の顔・身体・重要な瞬間をcrop事故から守る |

- `contain`では周囲の余白も編集表現として残す。blur背景で無理に埋めない。
- `cover`で顔が切れる写真だけ、`objectPosition`を上書きする。
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

現行V1は場所順だが、実写真投入後は次のmatchを優先して順番を再評価する。

- horizon → horizon
- gaze → gaze
- hand/detail → hand/detail
- walking direction → walking direction
- blue → blue / warm → warm
- 音が先行するJ-cut
- 余韻を残すL-cut

**地名順より強いvisual/semantic matchがある場合は、場所順を崩してよい。**

## 音

映像transitionよりsound continuityを優先する。

```text
A3  必要な会話/現地音
A2  ambience（海・街・会場room tone）
A1  BGM
```

`openingV1Sound.ts` の現行J-cut:

- Okinawa sea: 1.65s開始 → 2.0sの画より0.35s先行
- Seoul street: 12.55s開始 → 13.0sの画より0.45s先行
- Hawaii ocean: 23.55s開始 → 24.0sの画より0.45s先行
- Arrival room tone: 52.60s開始 → 53.0sの画より0.40s先行

`assets.ts`でcandidate / approved / finalになった音源だけRemotionへ入る。権利未確認・missing素材はcueがあっても再生しない。

fake cloud削除に伴い `air-prelap` はOpening V1 timelineから削除済み。

## Visual QA

Opening変更PRではCIが8枚のstillを実renderしてartifactへ残す。

```text
00.8s  cold open
07.0s  Okinawa
17.0s  Seoul
28.0s  Hawaii
39.0s  Hero A
48.0s  Hero B
55.0s  Arrival
58.5s  Ending
```

placeholder状態でも、Typography / layout / background / route / accidental blank frameを確認する。
実写真投入後はローカルpreviewでcrop・顔・視線・色・順番を別途確認する。

## QA

最低限:

1. `pnpm prepare:opening-v1`
2. `pnpm typecheck`
3. `pnpm check`
4. `pnpm check:opening-sound`
5. `pnpm exec remotion compositions src/index-opening-v1.ts`
6. `pnpm qa:opening-stills`
7. 60秒 / 1920x1080 / 30fpsを確認
8. QA still artifactを目視
9. 実写真投入後は顔crop、視線方向、safe area、native比率を確認
10. 「cinematic」という言葉を使わず、各cutが良い理由を説明できること

## 現在のボトルネック

**実写真11枚の本投入。**

コード側は:

- 写真差し替え自動同期
- final 11/11 gate
- natural fit
- J-cut音レイヤー
- Visual QA still
- 60秒composition contract

まで受けられる状態。

次は新しい仕組みを増やすより、実写真の選定 → preview → crop/focus → cut順 → BGM/現地音の順に詰める。

## 関連

- `motion-studio/src/compositions/opening/OpeningV1.tsx`
- `motion-studio/src/data/openingV1.ts`
- `motion-studio/src/data/openingV1Media.ts`
- `motion-studio/src/data/openingV1Sound.ts`
- `motion-studio/scripts/render-opening-v1-qa-stills.mts`
- `docs/02_style-bible.md`
- `docs/research/2026-08-22-tiktok-wedding-film-trends.md`
