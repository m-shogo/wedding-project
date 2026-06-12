# parts — 再利用パーツ基盤

既存テンプレートに**差し込む**ための再利用部品を置く場所。
完成シーン(compositions/)とは役割が違う。ここは「部品」、compositionsは「シーン」。

## カテゴリ

| ディレクトリ | 役割 |
|---|---|
| `text/` | テロップ・章タイトル・字幕・名前表示(実装済み) |
| `photo/` | 写真カード・写真枠・トリミング補助(今後) |
| `layout/` | セーフエリア・中央寄せ・下部配置・2カラム(今後) |
| `effects/` | 光・紙質感・影・マスク(今後) |

## パーツ共通ルール

- パーツは「完成シーン」ではなく「既存テンプレに差し込む部品」
- **1パーツ1責務**。propsを増やしすぎない
- 既存テンプレ固有の文言(MEMORY FLIGHT 1024 など)をパーツ内に埋め込まない
- 色・フォントは `src/data/theme.ts` / `src/data/fonts.ts` から取る。**直書き禁止**
- アニメは Remotion の `useCurrentFrame` / `interpolate` / `spring` で実装する
- **`Math.random` 禁止**(必要なら remotion の `random()`)
- GSAP / anime.js / Three.js は通常使わない
- 派手なバウンド・グリッチ・回転文字・速いカメラは禁止
- 各パーツは `startFrame` / `durationFrames` を持ち、自分でフェードイン/アウトする
  (タイムライン上に置くだけで完結する自己完結パーツにする)

### durationFrames の最小値

各パーツはフェード・reveal・スライドアニメに一定フレームを消費する。
**短すぎると補間レンジが崩れる。** 各パーツのmin値を必ず守ること。

| パーツ | min | 理由 |
|---|---|---|
| FadeUpCaption | **40** | fade=16×2=32 + rise完了分 |
| MaskRevealTitle | **50** | fade=18×2=36 + subtitle遅延(frame 44) |
| ElegantLowerThird | **60** | commentOpacity[30,54] + fade=16 |

短尺シーンに使う場合も **durationFrames を無理に下げない**。
代わりに `startFrame` またはシーン(Composition)側の尺で調整する。

### partRegistry と export の3点セット

パーツを追加したら必ず3つ揃える。`check:parts` が整合を検証する。

1. `parts/<category>/` にパーツを実装(zodスキーマ + 型 + コンポーネント)
2. `parts/<category>/index.ts` からコンポーネントを **export** する
   → これが欠けると `check:parts` がエラーを出す
3. `src/data/partRegistry.ts` に `name` = コンポーネント名で登録する

### approved昇格ルール

- `status: 'approved'` への昇格は **人間(新郎新婦)の確認が必須**
- AIが勝手に `approved` に変更してはならない
- 昇格時は `notes` に承認理由または「確認済み」の旨を残す
  → なければ `check:parts` が warning を出す

## 既存テンプレとの役割分け

- `compositions/common/GenericTitle` = 透過題字/大きいタイトル**素材**(単体で書き出す)
- `parts/text/*` = テンプレに**差し込む**小〜中サイズの再利用文字部品

被っても壊さず共存させる。

## パーツを追加したら(3点セット)

1. `parts/<category>/` にパーツを作る(zodスキーマ + 型 + コンポーネントをexport)
2. `parts/<category>/index.ts` と必要なら `parts/index.ts` でexport
3. `src/data/partRegistry.ts` に登録(id/category/status/allowedIn)
4. 確認用Composition `文字部品-確認`(TextPartsPreview)を更新する
5. `pnpm check:parts` を通す

## 統一入口 TextPart

textパーツは `TextPart` で variant 呼び分けできる。テンプレ側はこれを差すだけ。

```tsx
import {TextPart} from '../../components/parts/text';

<TextPart variant="fade-up" text="..." position="bottom"
  startFrame={20} durationFrames={120} tone="ivory" size="md" />
<TextPart variant="mask-reveal" title="CHAPTER 1" subtitle="Departure"
  startFrame={10} durationFrames={140} align="center" tone="gold" />
<TextPart variant="lower-third" name="COOKIE" role="FAMILY / DOG"
  comment="..." position="right" startFrame={30} durationFrames={150} tone="ivory" />
```
