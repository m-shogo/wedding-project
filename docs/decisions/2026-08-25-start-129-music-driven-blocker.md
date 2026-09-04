# StaRt 129秒: 音楽主導リメイクの着手記録とAUDIO_REQUIRED / LYRICS_REQUIRED

日付: 2026-08-25

## 状態

**`AUDIO_REQUIRED` / `LYRICS_REQUIRED`**

音楽主導(文字が音に吸い付く、パン・パン・パンの3-hit、歌詞の意味に合わせた演出)の129秒A/B/Cを作るには、実際の音源と正規歌詞が要る。今回のセッション開始時点で確認したところ、どちらも存在しなかった。

```text
motion-studio/local/audio/   … 空(start-129.mp3等が無い)
motion-studio/local/lyrics.local.json … 存在しない
```

## この文書を書いた理由

ユーザーの指示(section 0)は以下を明確に禁止している。

- 無音でrenderする
- 「歌詞スロット01〜32」を表示する
- 歌詞をsection内で機械的に均等分割する

また section 2 は「音源が見つからない場合: 無音版をまた作らない。AUDIO_REQUIREDとして止める」「正規歌詞が見つからない場合: LYRICS_REQUIREDとして止める」と明記している。

前回までのセッションは、まさにこの「無音のまま129秒を再renderし、歌詞placeholderを表示する」という、ユーザーが禁止した状態を繰り返していた。今回はそれを繰り返さない。

したがって、**今回は129秒フルのA/B/C音楽主導版を完成させていない。** これは手を抜いたのではなく、ユーザー自身が定めた停止条件に従った結果であることをここに明記する。

## 今回実際に行ったこと(音源に依存しない範囲)

1. 公式MVを視覚研究した(`docs/research/start-official-mv-visual-study.md`)。ただし**音声は聴いていない**(ブラウザ操作に音声聴取手段が無いため)。「音に反応した変化」は画面の動きからの推測であり、実測ではないと明記した。
2. 歌詞・音源の有無を確認し、無いことを確定した。
3. 音楽主導の演出を実装するための**再利用可能な技術部品**(歌詞animation family: Character Build / Word Hit / Three-Hit Build / Held Note Stretch / Whisper Reveal / Impact Word 等)を、実際のtimingが来た時にすぐ接続できる形で用意した(下記参照)。これは「歌詞が入った」ことを意味しない。timing関数への入力(どの文字が何秒に来るか)が無いため、**現時点ではまだ動かせない**。
4. 冒頭title-build sequenceの仕組み(1文字ずつ、別々のgraphic要素として、3段階で組み上がる)をA/B/C別に実装した。ただし表示する言葉は歌詞ではなく、日付・名前・「ようこそ」等、Gitに置いてよい定型文言に限定した。これも**timingは未確定の値**で、実音源が来たら合わせ直す前提。

## 必要なファイル(このいずれかが揃うまで先へ進めない)

```text
1. motion-studio/local/audio/start-129.mp3  (または .wav / .m4a / .aac)
   権利確認済みのStaRt音源。129秒(または129秒を切り出せる長さ)。

2. motion-studio/local/lyrics.local.json
   schema: motion-studio/src/data/start129/localLyrics.ts の LocalLyricsFileSchema
   32フレーズぶんの本文 + 各フレーズの startSec/endSec。

3. (あれば) 既存の歌詞timing資料。無ければ2の投入後、目と耳での簡易マーカー
   付けから始める(完璧なbeat detectionは不要、との指示どおり)。
```

置き場所は既存ルール(`docs/opening-authority.md`, `motion-studio/CLAUDE.md`)と同じ。Gitへは入れない。

## 次にすること

1. 上記ファイルをローカルへ配置する
2. `pnpm sync:start-129-local` を実行
3. Claude/Codexへ「音源と歌詞を投入したので、beat-map.local.json / phrase-map.local.json 等の簡易markerを目と耳で作り、A/B/C 129秒を音楽主導で完成させて」と依頼する

## 関連

- `docs/research/start-official-mv-visual-study.md`
- `docs/decisions/2026-08-25-start-129-rebuild-root-cause.md`
- `motion-studio/src/data/start129/localLyrics.ts`
- `motion-studio/src/data/start129/localRights.ts`
