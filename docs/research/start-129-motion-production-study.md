# StaRt 129秒 3案ショーケース 制作研究ログ

作成日: 2026-08-25。関連: [start-129-three-showcase-directions](../decisions/start-129-three-showcase-directions.md)

## 目的

Mrs. GREEN APPLE「StaRt」曲頭〜129秒を、方向性の異なる3案(A: 旅の記録映画 / B: 冒険アニメOP / C: リズム・タイポMV)として実装するにあたり、実装前に確認した一次情報と、そこから採用した原則を分けて記録する。

## 確認した公式情報

| 日付 | source | 確認方法 | 観察 |
|---|---|---|---|
| 2026-08-25 | https://www.remotion.dev/docs/sequence | WebFetch | `Sequence`は`from`/`durationInFrames`で子要素の表示区間を時間シフトする。ネストしたSequenceは加算される。`premountFor`はシークバック時のちらつき防止用 |
| 2026-08-25 | https://www.remotion.dev/docs/audio | WebFetch | `<Audio src={staticFile(...)}>`が標準パターン。volumeはframe基準でinterpolateできる |

Blackmagic Design公式トレーニング、W3C contrast/av accessibility、Pexels/Unsplash/Pixabayの各licenseページは、今回のセッションでは実際にWebFetchしていない。**未確認のまま原則化していない**(下記の一般原則はrepo内の既存Style Bible/失敗パターンからの流用であることを明記する)。

## 一般原則(既存repo資料からの流用。今回新規に一次確認したものではない)

- `docs/02_style-bible.md`: 全写真Ken Burns禁止、静止が第一候補、hard cut優先、AIっぽさQAチェックリスト
- `docs/failure-patterns.md`: 過剰演出・完璧すぎるカメラ・指示過多の失敗パターン
- `docs/free-sample-sources.md`: 無料素材は公式APIのみ、AI学習利用を禁じる素材(Coverr等)を混同しない

## 今回の実験と結果

| 実験 | 結果 |
|---|---|
| 14 section共有データモデル(`sections.ts`)を3案で共有し、演出だけ変える | 動作。`check-start-129.mts`で区間連続性・129秒合計・歌詞32slot順序を機械検証済み |
| 実素材0でも構成を確認できるplaceholder(`StartDemoBackdrop`) | 動作。ただしplaceholderのrole labelと歌詞captionが同じ角に重なるバグを目視QAで発見・修正済み(bottom-left→top-right) |
| A案: 静止優先+抑制pushの実装 | `pnpm exec remotion still`で1サビA(38s)をrender・目視。想定通りcontrast/layoutで破綻なし |
| B案: 手描きunderline + speed line + panel grid | render・目視。"StaRt!"/"再スタート"のword hitとunderlineが意図通り表示 |
| C案: ベースライン走査 + 漢字かな階層 | render・目視。placeholder歌詞でも階層(漢字やや大きく/太く)が視認できた |
| 解説付き(Guide)モードのミニガイド | 3案ともrender確認。ただしcontrast比の自動計測(4.5:1/3:1目標)は未実装。目視で可読とだけ確認 |

## 未実施・既知の制約

- 正規ローカル音源・歌詞・実写真は未投入(`docs/opening-authority.md`の`AUDIO_BLOCKED`/`MEDIA_BLOCKED`と同じ制約)
- 無料ダミー素材は取得スクリプト(`scripts/fetch-start-129-demo-assets.py`)のみ実装。`PEXELS_API_KEY`未設定のため実取得は未実行
- movie-dashboardの比較UI画面は未実装
- Technique Catalogの大半は`ISOLATED`/`CONTEXT_TESTED`止まりで、`PRODUCTION_READY`まで昇格したものは無い
- contrast比・点滅回数の機械的な自動測定は未実装(目視確認のみ)
