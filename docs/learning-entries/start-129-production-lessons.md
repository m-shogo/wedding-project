# 学習記録: StaRt 129秒 3案ショーケース

各エントリは `DISCOVERED → PROTOTYPED → VERIFIED → PROJECT_RULE` の段階を分けて記録する。1回試しただけの好みを恒久ルールに昇格させない。

## Entry 1: placeholder role labelと歌詞captionが同じ角で衝突する

- 観察: `StartDemoBackdrop`のAbstractPlaceholderと、A案の`LyricCaption`が両方bottom-leftにテキストを置いていたため、実render still(1サビA, 38秒)で文字が重なった。
- 原因: 「role labelは目立たない場所ならどこでもいい」という設計判断が甘く、各画面要素の占有コーナーを事前に一覧化していなかった。
- 一般化できる原則: 画面上のUI要素(section badge / guide card / caption / placeholder label)は、実装前に4隅+centerの占有マップを作り、同時に出現しうる組み合わせを洗い出す。
- 工程変更: 新しいoverlay要素を追加するときは、既存要素の anchor 一覧(SectionBadge=top-left, MiniGuideCard既定=bottom-left, A案lyric=bottom-left, C案guide=top-right, B案guide=bottom-right)と突き合わせてから配置する。
- 実変更: `StartDemoBackdrop`のplaceholder labelをtop-right・小さいfont・低opacityへ変更(コミット済み)。
- 検証: 修正後のstillを再render・目視し、重なりが解消したことを確認。
- 段階: `VERIFIED`(この1件は実際に問題を再現し、修正後の実renderで確認したため)。ただし「4隅マップを事前に作る」という工程ルールは今回1回しか適用していないため `PROTOTYPED` 止まり。次回複数プロジェクトで機能したら `PROJECT_RULE` へ。

## Entry 2: データ契約チェックとVisual QAは別工程

- 観察: `check-start-129.mts`(データ契約: 129秒合計・歌詞32slot順序・technique/asset重複)は数秒で完走するが、これは「見た目が完成している」ことを何も保証しない。実際、この契約チェックが通った後でもEntry 1のcaption衝突は検出されなかった。
- 一般化できる原則: 既存のDirector Recipe運用(`docs/start-director-recipe-system-overview.md`の「97件登録済み≠97件高品質」原則)は、新しいCatalogやtimelineを作るたびに再発する構造的な罠。データ契約チェックを"Visual QA完了"の代替として報告しない。
- 工程変更: 新しいshowcase/timelineを作るときは、必ず (1) データ契約check → (2) 実render still → (3) 人間目視、の3段階をこの順で踏み、(1)だけで完了報告しない。
- 段階: `PROJECT_RULE`へ昇格可(既存Director Recipeシステムで既に確立済みの原則を、新しいCatalogへ再適用しただけのため)。

## Entry 3: 外部ダウンロードはAPIキー無しでは実行できない

- 観察: 無料素材取得スクリプト(`fetch-start-129-demo-assets.py`)を用意したが、`PEXELS_API_KEY`が本セッション環境に無く、実取得はできなかった。ユーザーからキーを受け取った後、`motion-studio/local/.env`(Git管理外)へ保存して解決した。
- 原則: 「外部素材の自動取得を許可する」というユーザー許可と、「取得に必要な認証情報が環境にある」ことは別条件。前者があっても後者が無ければ実行できない。
- 工程変更: 外部API依存のタスクを引き受ける前に、必要な環境変数/認証情報の有無を最初に確認し、無ければブロッカーとして早期に明示する。認証情報を受け取る場合は、リポジトリ管理外のファイルへ保存し、チャット出力に再表示しない。
- 段階: `PROJECT_RULE`へ昇格(実際にキーを受け取り、`local/`配下(既存gitignore済み領域)への保存で解決するところまで確認できたため)。

## Entry 4: Pexels公式APIのエンドポイントとUser-Agentの落とし穴

- 観察: `fetch-start-129-demo-assets.py`の初版は、写真検索を`https://api.pexels.com/search?...`で叩いていたが、正しくは`https://api.pexels.com/v1/search`(`/v1/`必須)。さらにPythonの`urllib`既定User-Agentは、PexelsのCloudflare WAFに`error code: 1010`でブロックされた(`curl`は素通りしたため気づくのに時間がかかった)。
- 原因: 公式ドキュメントの一次確認をせず、記憶頼りでURLを書いたこと。動作確認を`curl`だけで済ませ、実際に使うPython経路で再現テストしなかったこと。
- 一般化できる原則: 外部APIを叩くコードは、ライブラリ・言語を変えると失敗することがある(User-Agent、TLS、リダイレクト挙動の違い)。「curlで通った」は「実装で通る」の証明にならない。
- 工程変更: 外部APIラッパーを書いたら、必ず実際に使うコードパス(この場合はPythonスクリプトそのもの)で1回テスト呼び出しをしてから、本番ループを回す。
- 実変更: `pexels_search()`のURLを`/v1/search`へ修正、`download()`と検索リクエスト双方に`User-Agent`ヘッダーを追加(コミット済み)。
- 段階: `VERIFIED`(修正後、実際に30ファイルの取得に成功したことを確認)。
