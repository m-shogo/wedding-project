# 決定ログ: StaRt 129秒 3案ショーケースの方向性

日付: 2026-08-25

## 背景

`docs/opening-authority.md`の現行方針は「実写真11枚投入→Short Candidate完成」を最優先とし、`docs/start-director-recipe-system-overview.md`と`motion-studio/CLAUDE.md`は「新しい基盤/Catalogを増やす前に、既存のStartExtendedOpeningRoughV1を実素材で完成させる」と明記している。

今回のタスクはユーザーから「129秒×3案の高品質研究ショーケースを今すぐ最優先で着手する」という明示指示で発注された。着手前にこの優先順位の衝突をユーザーへ提示し、「今すぐ着手する」との回答を得た。**この決定はプロジェクトの標準優先順位からの一時的な逸脱であり、Extended/Short本番の位置づけを変更するものではない。**

## 採用した3案

- A: 旅の記録映画(documentary / travel film / editorial film) — 本番採用に最も近い基準案
- B: 冒険アニメOP(手描きグラフィック × 3-hit) — StaRtの言葉遊び・再スタート感を最大化する実験案
- C: リズム・タイポMV(kinetic typography × negative space) — 歌詞と音楽構造の理解を優先する実験案

3案は共通の14 section / 129秒 / 歌詞32slotデータモデル(`motion-studio/src/data/start129/sections.ts`)を共有し、演出だけを変える設計にした。これにより「色違いテンプレ3本」になることを防ぐと同時に、後日の比較・A/B/C混成判断を容易にする。

## 無料ダミー素材(2026-08-25 追記)

ユーザーから`PEXELS_API_KEY`の提供を受け、`motion-studio/local/.env`(Git管理外)へ保存した上で、`scripts/fetch-start-129-demo-assets.py`経由でPexels公式APIから15role分の実写真・動画を取得した。

- 取得したファイルは`motion-studio/public/demo/start-129/<ROLE>/`(Git管理外)。出所は同ディレクトリの`_provenance.csv`(Git管理外)に記録。
- 取得候補は必ず目視確認し、動物が写っていた2枚(牛・熊)、読める看板が密集していた街並み1枚、識別可能な顔の寄りportrait 1枚、群衆デモ動画1枚を不採用にして別候補へ差し替えた。「人物・動物・読める文字・ロゴ・看板は不採用」というリポジトリ既存ルールをダミー素材にも適用した。
- 取得スクリプトに実装バグ(Pexels写真検索APIの`/v1/`prefix欠落によるHTTP 403、Cloudflare WAFがPythonデフォルトUser-Agentをブロック)を2件発見・修正済み。
- 最終的に15role中20ファイル(一部roleは2枚、B案のpanel gridに使うSEOUL_STREET/DETAIL_HANDは意図的に2枚ずつ確保)を採用し、`pnpm sync:start-129-demo-assets`で反映、45枚のQA stillを再renderして目視確認済み。

## movie-dashboard比較UI(2026-08-25 追記)

`movie-dashboard/src/pages/Start129Showcases.tsx`(`/movie-coach/start-129`)を追加した。14区間タイムライン、Technique Catalog(showcase別filter)、気に入った/保留/使わないの記録(localStorage、既存`startHumanReview.ts`と同じ設計)、コメント、Claude/Codexへの修正依頼コピー機能を実装し、開発サーバー上でボタン操作・コメント追加・クリップボードコピーの実動作を確認済み。

このページのデータ(`start129Showcases.ts`)はmotion-studio側の実装(`motion-studio/src/data/start129/`)を要約・複製したものであり、単一情報源ではない。演出の追加・変更はmotion-studio側で行い、このファイルへ手動で同期する。

## 来場感謝メッセージ・icon・キラキラ演出(2026-08-25 追記)

ユーザーから「OPムービーに必須なお越しいただきましてありがとうとかは入れて」「svgアイコンとかも使っていい感じに」「無理に作らず素材とかはダウンロードして使ってキラキラエフェクトとかたくさん」との指示を受け、以下を追加した。

- 間奏2B(118-126秒)に「本日はお越しいただき、誠にありがとうございます。」、End(126-129秒)に「ご来場ありがとうございます」相当の一文を、3案それぞれの文法で追加(A: 静止余白+小さいpin icon、B: bold「ようこそ」+plane trail icon、C: baseline scan typography+plane trail icon)。
- 手描き線画のSVG icon(`iconPrimitives.tsx`: PinIcon / HeartOutlineIcon / PlaneTrailIcon)を自作し、strokeDashoffsetでreveal。塗りつぶし無し・1色のみで、Style Bibleの「gold/glowで高級に見せない」方針を保った。
- キラキラ/粒子エフェクトはCG自作ではなく、指示どおりPexels公式APIから実際の動画素材をダウンロードして使用(`SparkleOverlay.tsx`)。3候補(dust=黒背景の白い粒子、sparks=黒背景の火花、gold=金のグリッター山)を取得し、目視確認の上、bokeh候補(人の手がメイン被写体で"オーバーレイ"として不適切)を不採用にした。
- **gold clipは学びの記録として残す**: 密なグリッター質感の動画はscreen blendで全画面に使うと、opacity 0.4はもちろん0.12まで下げても重すぎて写真・文字を覆い隠すことをstill目視で確認した。最終的にdust/sparksへ統一(A/C=dust、B=dust+sparks)。goldクリップ自体は`public/demo/start-129/_overlays/gold_8516377.mp4`に残しているが、現在どのshowcaseからも使用していない。将来的に使うなら、全画面ではなく小さくcropした一部分だけを使うべき。
- 適用箇所と強度: A案End(dust opacity 0.18)、B案3-hit(sparks、intensity連動で最大0.5)、B案Welcome/End(dust 0.14-0.16)、C案Welcome(dust 0.28)、C案End(dust 0.14)。「たくさん」という要望と、Style Bibleの「粒子・glowの重ね過ぎ」を戒める既存方針との間で、使用区間を来場感謝・End・3-hitの一瞬に絞り、常時表示にはしなかった。

## 採用しなかったもの/今回スコープ外

- 97 Director Recipeとの統合・置き換えは行っていない。既存Director Recipe資産とStart129資産は現時点で独立している(意図的。統合は本番candidate選定後の判断とする)。
- 正規のStaRt歌詞・音源はダミー素材とは別物であり、今回のPexels取得では扱っていない(引き続き`motion-studio/local/lyrics.local.json` / `local/audio/start-129.mp3`が必要)。
- movie-dashboardページのデータはmotion-studio側との自動同期機構を持たない(手動複製)。将来、演出を追加・変更したらこのファイルも忘れずに更新する。

## 本番Openingとの関係

この3案は研究・比較用であり、`docs/opening-authority.md`のProduct authority(StaRt Extended Candidate本命 / Opening V1 Short Candidate fallback)を変更しない。3案から得た演出知見は、採用が決まった場合のみ、Extended/Shortの実装へ個別に反映を検討する。
