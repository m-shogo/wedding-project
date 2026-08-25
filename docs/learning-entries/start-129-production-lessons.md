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

## Entry 5: 「密なグリッター動画」はscreen blend全画面overlayに向かない

- 観察: Pexelsの"gold glitters on the table"クリップをscreen blend・opacity 0.4でEnd/Welcome全画面へ重ねたところ、写真とテキストがほぼ判読不能なほど重くなった。opacity 0.12まで下げても、画面上半分が金色の塊で覆われる状態は変わらなかった。
- 原因: 「キラキラ動画」と一口に言っても、(a)黒背景に疎らな光点が散る素材(dust/sparks)と、(b)画面いっぱいに敷き詰められた光る質感の素材(gold glitter pile)は、screen blendでの挙動が全く違う。後者はopacityを下げても「明るい面全体」が乗るため、下の写真・文字を覆い隠し続ける。
- 一般化できる原則: オーバーレイ素材を選ぶときは、取得前のサムネイルだけでなく実際に1フレーム抽出して「背景が十分暗く、輝点が疎らか」を確認してから採用する。opacityの微調整で解決しようとする前に、素材の疎密自体を疑う。
- 工程変更: オーバーレイ候補は、フレーム抽出→黒背景比率の目視確認→screen blend実render、の順で評価する。「暗い背景+疎らな光点」型以外は、全画面用途ではなく、cropした一部だけを使う前提で扱う。
- 実変更: gold clipの全画面利用を撤去し、dust/sparksへ統一(`StartShowcaseB.tsx` / `StartShowcaseC.tsx`)。goldファイル自体は`_overlays/`に残し、将来cropして使う可能性のためlogだけ残した。
- 段階: `VERIFIED`(実際にstill render・目視で問題を確認し、置き換え後の再renderでも確認した)。

## Entry 6: 「range先頭だけ参照」は、契約checkを通っても実害を見逃す典型例

- 観察: `StartShowcaseA/B/C.tsx`が`section.lyricSlotRange[0] - 1`でsection内の最初の歌詞slotだけを固定参照していた。結果、32slot中「区間の先頭slotに該当する8slot程度」しか一度も画面へ出ず、残りは永久に非表示だった。`check-start-129.mts`はlyricSlotRangeという**宣言データ**の連続性・網羅性しか見ておらず、この実装バグを検出できていなかった。
- 原因: 「1 section = 1 lyric」という初期の単純化を、range対応(1 section = 複数lyric)へ拡張した際にrenderロジック側を更新し忘れた。データモデル(sections.ts)は正しく複数slotを持てる形になっていたが、消費側(3案のコンポーネント)が追いついていなかった。
- 一般化できる原則: データモデルとrender消費側は別のコードパスであり、片方が正しくても他方が古いままになり得る。「rangeを持つデータ構造がある」ことは「rangeの中身が全部描画される」ことを保証しない。
- 工程変更: 範囲/配列を持つデータを扱うUIコンポーネントを書くときは、必ず「境界(最初/最後)だけでなく中間要素も実際にレンダリングされるか」をrender manifestまたは実stillで確認する。契約checkにも「宣言網羅性」だけでなく「実際に生成されるSequence/Windowの個数と重複有無」を機械検証する項目を持たせる。
- 実変更: `lyricSlotWindowsForSection()`(sections.ts)を追加し、rangeを均等分割した`<Sequence>`をnestする実装へ変更。`check-start-129.mts`に「各slotが1回だけwindowを持つ」検証を追加。
- 段階: `VERIFIED`(修正後、section内の複数timepoint(frame 530/610/700/780)でstillを比較し、実際に4つの異なる歌詞slotが順番に表示されることを確認した)。

## Entry 7: 無料素材APIの検索クエリは、地名・方向を含む語ほどデモ/抗議動画を拾いやすい

- 観察: MOVEMENT_RIGHT_TO_LEFT roleの検索クエリ"walking right to left street"が、2回連続でデモ行進(読める抗議看板+複数の識別可能な人物)を返した。1回目は目視で不採用にしたが、同じクエリで再取得した際にも別の抗議動画2本が返ってきた。
- 原因: ストック素材サイトでは「street」「walking」等の一般語に、報道・ドキュメンタリー系の投稿が多く紐づいている。検索語に地理的・政治的含意のある語("street"の使われ方次第)が入ると、意図しないジャンルへ寄りやすい。
- 一般化できる原則: 同じ検索語で2回連続して不適切な結果が出た場合、opacityや個別候補の差し替えではなく検索語自体を疑う。人物・看板が映り込みやすいテーマ(街頭、集会、公共空間)の検索語は、"pov"、"pedestrian"、"sidewalk"のような一人称視点・無人称の語へ寄せると安全になりやすい。
- 工程変更: 素材検索で同一クエリから2回連続NGが出たら、クエリを変更してから再検索する(同じクエリで3回目を試さない)。
- 実変更: クエリを"pedestrian walking sidewalk pov"へ変更し、POV歩行動画2本を採用。
- 段階: `PROTOTYPED`(今回1回の観察と対処。次回別roleでも同様の現象が起きたら`PROJECT_RULE`へ)。
