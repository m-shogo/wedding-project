# Claude実行用 — StaRt 129秒・3案を本番比較できる品質へ立て直す統合プロンプト

以下をClaude Codeへ**最初から最後まで一度に貼り付けて実行**してください。

---

あなたはこのリポジトリの映像監督、モーションデザイナー、Remotionエンジニア、素材管理者、QA責任者です。既存の「StaRt 129秒・3案」は技術見本としては動きますが、完成映像として比較・選定できる品質ではありません。今回は小さな継ぎ足しではなく、原因を検証し、3本すべてを「最初から最後まで見て違いが分かる本番比較用デモ」へ立て直してください。

## 0. 絶対条件

- 作業対象は `/Users/m-shogo/Developer/personal/wedding-project`。
- 最初に `git status`、現在branch、最新commit、remote、プロジェクト内の `AGENTS.md` / `CLAUDE.md` / authority文書を確認する。
- ユーザーの未commit変更を消さない。無関係な変更を混ぜない。`git reset --hard`、強制checkout、履歴破壊は禁止。
- 現在の作業branchで進める。勝手にpush、deploy、外部公開しない。
- 新しい依存関係を増やす前に既存実装とlockfileを調べる。package managerを変更しない。
- `.env`、API key、正規歌詞、正規音源、本人写真・個人情報、ダウンロード素材本体はGitへ入れない。秘密値をログや報告へ出さない。
- 素材利用規約を確認し、出典URL、作者、ライセンスURL、取得日、用途、採否理由を記録する。権利不明素材は使わない。
- 正規歌詞と音源はローカル投入が確認できた場合だけ使う。無ければ、32個すべて異なる日本語の仮歌詞ID／仮テキストで動作を証明する。実在曲の歌詞をネットから転載・生成・commitしない。
- 不明点があっても、安全な仮素材・仮データで進められる箇所は止まらず進める。人間の判断が必須な項目だけ最後に明記する。
- 「型チェック成功」「Composition登録」「still数枚確認」を完成扱いしない。3本の129秒フル映像を実際にrenderし、最初から最後まで検証するまで完了報告しない。
- 「完璧」「Final完成」と断言しない。状態は後述の厳格な4段階だけを使う。

## 1. 先に事実確認し、今回の失敗原因を文書化する

実装前に、下記の指摘を実ファイル・render・計測で再確認する。正しければ直し、現在は異なるなら証拠付きで訂正する。推測のまま作業しない。

### 現時点で疑われる重大問題

1. `StartShowcaseA.tsx`、`StartShowcaseB.tsx`、`StartShowcaseC.tsx` が、各sectionの `lyricSlotRange` の先頭だけを参照している。その場合、全32枠のうち最大8枠しか画面へ出ず、残り24枠は未表示になる。
2. `check-start-129.mts` はデータ上のrangeを確認するだけで、実際に32枠すべてが各案でmount/renderされたか検査していない。
3. A/B/Cの129秒フルMP4が存在せず、境界stillだけで完成扱いした可能性がある。
4. B案のchorusが写真を消して黒背景＋固定語を約10秒保持し、短い3-hit以外は実質停止している。
5. DashboardのStart 129画面に、実際の動画player、A/B/C切替、Clean/Guide切替、scrub、区間seek、時刻付きコメント、素材サムネイル、出典・ライセンス、取得失敗一覧がない。
6. Pexels取得処理が `orientation` と `size` を指定せず、16:9役へ縦素材が混入している。動画APIが現行の `/v1/videos/search` でない可能性もある。
7. 左→右と右→左の役に同じ動画を割り当て、実際の移動方向を確認していない可能性がある。
8. `contain` により黒い左右帯が出る場面、縦overlayを無理に全画面coverして主成分が端へ寄る場面、dustが雨に見える場面がある。
9. `SparkleOverlay` が候補の先頭を常に選び、素材ごとのcrop、焦点、blend、opacity、色温度、使用可能区間、禁止条件を持っていない。
10. QA stillがsection境界中心で、演出のentry / peak / settle / hold / exitを見ていない。B案の3-hitなどのピークを検査から落としている。
11. 素材取得失敗をstderrへ出すだけで、後から見られる「未取得・代替候補一覧」を保存していない。
12. Technique Catalogがmotion-studioとDashboardへ手動二重管理され、statusとevidenceが食い違う。placeholder stillしかないのに `VISUALLY_VERIFIED`、32枠を未表示なのに成功と記載している可能性がある。
13. `docs/decisions/start-129-three-showcase-directions.md` のauthority説明が、現行の `docs/opening-authority.md`（Extended本命、60秒Shortはfallback）と矛盾している。
14. 3案が本質的な編集・物語・画面文法ではなく、色、文字、effect量の差に留まっている。

### 根本原因として検証する仮説

- 要件を「機能数・素材数・チェック通過数」に置き換え、観客が129秒をどう感じるかを評価しなかった。
- Compositionが登録されたことを、動画が完成したことと取り違えた。
- 宣言データの整合性だけをテストし、実際の描画coverageをテストしなかった。
- 「1 section = 歌詞1個」「1 role = 素材1個」という浅いモデルにして、時間内の変化を設計しなかった。
- 共通部品を使い回しすぎ、3案の映像文法まで共通化してしまった。
- APIの先頭検索結果を採用し、縦横比、解像度、人物混入、余白、動き方向、loop継ぎ目、画面上の焦点を確認しなかった。
- 目視確認の対象が一部stillだけなのに、ステータス名と完了報告を過大にした。
- 「キラキラを増やす」を、意味のある感情ピークではなくoverlay枚数・opacityの問題として扱った。
- UIをレビュー面ではなく、説明カードとコマンド一覧として作った。
- 要望→実装→成果物→証拠の追跡表と、独立した反証レビューがなかった。

`docs/decisions/` に今回のroot-cause / corrective action記録を日本語で追加する。誰かを責めず、再発防止可能な設計・工程の問題として書く。

## 2. ステータス定義を先に直す

成果物とUIでは次の4状態だけを使用する。

1. `IMPLEMENTED_UNVERIFIED`: 実装したがrender未確認。
2. `RENDER_VERIFIED`: 対象フレーム／対象clipをrenderし証拠がある。
3. `DEMO_PRODUCTION_READY`: 仮歌詞・許諾済み無料素材を使った129秒の比較用デモとして全ゲート通過。
4. `WEDDING_FINAL_BLOCKED` または `WEDDING_FINAL_READY`: 正規歌詞・正規音源・本人素材・会場仕様・本人承認が揃うまでは必ずBLOCKED。すべて揃い最終上映ファイルまで検証した場合だけREADY。

`VISUALLY_VERIFIED` のような曖昧な状態を残すなら、少なくとも evidence artifact path、対象frame/time range、render日時、source commit、hashを必須にし、証拠のない既存statusを降格する。古い成功文言を放置しない。

## 3. まず制作仕様とAcceptance Matrixを作る

コード変更前に、要件、対象ファイル、成果物、機械検証、人間目視、状態を一行で追える `Start 129 Production Acceptance Matrix` を作る。最低限、以下を含める。

- 1920×1080 / 30fps / 3870 frames / 129.0秒。
- A/B/CそれぞれCleanとGuideの6 Composition。
- 32歌詞slotがA/B/C各案で、順番通り、各1回以上、時間内に読める長さで表示される。
- 14区間の開始・終了にgap、意図しない重複、黒落ちがない。
- 3案が同じ素材を使っても、構成、shot selection、motion grammar、typography、transition、感情曲線で明確に識別できる。
- chorusは3案とも写真／動画主体で、画面全体が固定文字だけの長い場面にならない。
- すべての16:9 role素材が横長・必要解像度・意味・焦点位置を検証済み。
- 黒帯、引き伸ばし、人物の顔切れ、主役隠れ、文字の安全領域違反を検査。
- overlayは素材別presetと使用理由があり、雨・砂嵐・汚れに見えない。
- 素材の出典・作者・ライセンス・取得日・採否理由が見られる。
- 取得失敗・権利不明・代替待ちが一覧化される。
- Dashboardで実映像を再生・比較・seek・コメント・修正prompt出力できる。
- full renderとQA artifactが存在し、ffprobe／画像解析／人間目視の証拠を持つ。

このMatrixは最後まで更新し、未達項目が一つでもあれば `DEMO_PRODUCTION_READY` にしない。

## 4. 3本のクリエイティブを「別作品」として再設計する

既存の良い共通基盤（129秒、14区間、32歌詞slot、ローカル音源安全境界、provenance）を活かす。ただし3案の映画文法まで共通部品へ押し込まない。

### A案 — Cinematic Still / 余白と感情

- 写真の表情・視線・余白を主役にする。
- ゆっくりしたpush-in、呼吸するhold、控えめなparallax、match cut、光の移ろい。
- close-upで親密さ、wideで場所と旅の広がりを作る。
- 効果は節目だけ。キラキラは感情の到達点へ短く置き、常時表示しない。
- 歌詞は読みやすく、写真の顔と競合させない。文字の出入りに読了時間を確保する。

### B案 — Joyful Anime-OP / 写真主役の高揚

- chorusでも必ず写真・動画が主役。黒背景＋固定単語を長時間保持しない。
- 3-hitは0.3〜1.0秒程度の短いアクセントとして、写真のcut、scale、graphic shape、spark、typeを音に合わせる。hit後は次のショットへ展開する。
- speed line、halftone、panel、sticker的shape、色面は使えるが、顔を隠さず、テンプレ感のある常時点滅にしない。
- 楽しさはeffectの量ではなく、shot rhythm、表情、グループ写真、移動、反復モチーフで作る。

### C案 — Editorial Typography / タイポと写真の対話

- 黒帯の出る `contain` 常用をやめる。横素材はcover、縦素材は設計されたsplit/panel/blurred extensionなど、意図が見えるlayoutにする。
- 歌詞32枠をbaseline、scale、weight、mask、negative spaceで展開する。ただし読めない速度や極端な小ささにしない。
- 写真を背景扱いにせず、文字が写真の視線・余白・被写体位置へ反応する。
- A/Bと違うcut rhythmとgridを持つが、全編が同じテンプレlayoutにならない。

### 全案共通の物語

冒頭の期待 → 二人／旅の紹介 → 関係性の拡張 → chorusの開放 → 来場者への歓迎 → 名前・日付の着地、という感情曲線を作る。SNSの `hook / body / close` はこの長尺会場映像向けに「最初の期待／旅と関係性／歓迎と着地」として翻訳する。TikTokの9:16、UI safe zone、広告CTA、過剰な刺激はコピーしない。会場上映は16:9、遠距離視認、写真主役、上品さを優先する。

各案について、14区間ごとに以下をデータ化する。

- narrative purpose
- primary visual role
- secondary shot / cutaway
- lyric slots and exact timing
- camera/motion grammar
- transition in/out
- overlay/effect and why
- expected emotional intensity 1–5
- QA timecodes（entry / peak / settle / hold / exit）

同じ写真1枚を10秒見せ続けない。素材と意味に応じて1区間内にも複数shotまたは明確な視覚変化を作る。ただし速すぎる切替で写真を認識できなくしない。

## 5. 歌詞32枠を実際に全表示する

- `lyricSlotRange[0]` だけを見る実装を廃止する。
- 各slotに `id`, `startSec`, `endSec`, `text`, `sectionId`, `emphasis`, `safeArea` を持たせる単一timelineを作る。
- sectionの時間内へrange内の全slotを割り当てる。音源／正規timingがない場合は等分を初期値とし、読みやすさによる最小holdを加味する。
- Remotionの名前付き `<Sequence>` を各歌詞slotへ使い、Studio timelineで追えるようにする。必要に応じて `premountFor` を使いseek時のちらつきを防ぐ。
- A/B/Cは同じtiming authorityを参照し、表現だけを変える。
- テストは宣言rangeではなく、各案のrender manifestに32個のslot IDが各1回以上存在することを確認する。
- Guide版には邪魔にならない位置へ現在section、slot ID、技術IDを表示する。Clean版には制作ラベルを一切出さない。

## 6. 無料素材を品質条件付きで再取得・再選定する

### APIと取得条件

- Pexels公式APIの現行endpointを確認し、動画検索は `GET https://api.pexels.com/v1/videos/search` を使う。
- 16:9 roleは `orientation=landscape`、最低 `size=medium` を指定する。写真もroleに合うorientation/sizeを指定する。
- ダウンロード後にAPI metadataを信用せず、`ffprobe` / 画像probeで実寸、fps、duration、codec、aspectを検証する。
- 1920×1080で無理なupscaleを避ける。必要なら別候補へ替える。
- 取得候補は複数見て、先頭1件を自動採用しない。人物の手だけ、商品、ロゴ、ウォーターマーク、意味の違う主被写体がある素材を除外する。
- 右→左／左→右のmovementは動画を実際に確認して記録する。同一fileの使い回しは禁止。mirrorする場合は構図・文字・左右非対称物がなく、変換をmetadataへ明記し、人間が目視承認した場合だけ許可する。

### 素材選定ルール

- 役名を英語だけにせず、日本語名、用途、良い構図、避ける構図、推奨向き、最低解像度、候補サムネイルをUIへ出す。
- Heroは顔・表情が読み取れ、文字用余白があり、会場画面で小さくなりすぎない横写真を優先。
- 旅はwideだけでなく、移動、手元、標識、足元、到着などを混ぜる。ただし人物が二人の代役に見えるstock coupleは避ける。
- 家族友人は集合の熱量、会場は歓迎の文脈、Endは名前と日付を置ける余白を優先。
- 仮素材は完成写真の代替ではなく、画角・密度・動きの検証用であることを表示する。
- 各案で最低限、全編が同じ数枚の反復に見えないだけのunique shotを用意する。数合わせはしない。採用数・重複率・1shotの最大連続表示時間を計測して報告する。

### キラキラ・光素材

無理にCSSで偽物を量産せず、許諾済みの実素材を取得する。ただし「多い」は常時全面ではなく、種類と役割を持つことと解釈する。

- sparse warm dust：暗め背景の静かな感情peak
- small star glints：指輪、名前、笑顔など限定点のaccent
- warm defocused bokeh：人物・手・商品を含まない背景光
- directional sparks：B案の強いhitだけ
- soft prism / light leak：場面転換の短いbridge
- paper confetti：歓喜の一箇所だけ。安っぽければ不採用

素材ごとに `crop`, `anchor`, `objectFit`, `blendMode`, `opacityRange`, `colorTemperature`, `allowedSections`, `maxDuration`, `rejectedReason` を持つpreset catalogを作る。候補先頭固定をやめ、techniqueとsectionが明示的に素材を選ぶ。雨、ノイズ、画面汚れ、金粉の山、主役を覆う密度に見えるものは不採用。採用・不採用のcontact sheetを残す。

### 取得できない場合

- 例外をconsoleへ出すだけで終えない。
- 取得失敗、API制限、権利不明、品質不足、代替待ちを、role、検索語、日本語用途、必要条件、試したURL、失敗理由、次候補とともにJSON/CSVへ保存する。
- secretや個人情報を含まないschema/exampleはcommitし、実行時reportは既存方針に従ってlocal/ignoredへ置く。
- Dashboardの「未取得・代替待ち」欄で初心者にも分かる日本語で表示する。空の場合も「未取得なし」と表示する。

## 7. 技術Catalogを単一source of truthへする

- motion-studioとmovie-dashboardの手動二重定義を廃止する。共有JSON/TSから生成するか、一方向のgenerated fileにする。
- drift検出testを追加し、差分があればbuildを失敗させる。
- 各techniqueは日本語名、目的、向く場面、避ける場面、component、案、対象section/timecode、素材ID、status、evidence artifactを持つ。
- 「使っている技術」はGuide表示とDashboardのtimecodeから実映像の該当箇所へseekできるようにする。
- placeholderで確認しただけの項目を本番確認済みにしない。
- 古い誤ったevidenceや「32枠成功」文言を全検索して修正する。

## 8. Dashboardを本当の比較・修正画面にする

`/movie-coach/start-selection` または適切なStart 129画面を、初心者が次の操作を迷わず行える一本道にする。

1. 「まず3本を見る」：A/B/Cの大きなカードと実動画サムネイル。
2. Clean / Guide切替。
3. 同期A/B比較：同じtimecodeを保ったまま案を切り替える。可能なら左右比較、重い場合は即時切替でもよい。
4. 14区間timeline：クリックで動画をseek。
5. その時刻の「使っている演出」「使っている素材」「この演出の狙い」を日本語で表示。
6. コメント：現在timecode、案、section、techniqueへ紐づけて「ここを長く」「文字を小さく」などを保存。`general` 固定にしない。
7. 素材ボード：サムネイル、日本語role、縦横、解像度、出典、作者、license、採用案／区間、使いやすい写真の助言。
8. 不足診断：Hero不足、横素材不足、End余白不足、右→左移動未確認、音源未投入、正規歌詞未投入などを自動表示。
9. 修正prompt生成：全コメントを案、timecode、優先度、要望、保護事項へまとめ、Claude/Codexへ一度に貼れる日本語promptをコピー／保存。
10. 「次にすること」：未達ゲートから一つだけ最優先actionを大きく表示。

ローカル動画を安全にpreviewする既存sync方式を調べて再利用する。ブラウザから任意ファイルpathを読ませない。動画が無い場合は壊れたplayerを出さず、「renderする」ボタン相当のcommandと不足理由を日本語で出す。

## 9. 本番ゲートとQAを実装する

### 機械検証

- typecheck / lint / existing checks / build。
- 6 Compositionが1920×1080、30fps、3870 framesで登録される。
- A/B/C各案で32 lyric IDすべてを一度以上render manifestへ記録し、欠落・順序逆転・section外表示を失敗させる。
- 14区間にgap、意図しないoverlap、NaN、負durationがない。
- 全mediaの実寸、aspect、duration、codecをprobeし、role契約違反を失敗させる。
- 16:9画面の恒常的pillarbox/letterbox、長い黒frame、ほぼ同一frameの異常継続、動画duration超過、壊れたfileを検出する。
- CleanへGuideラベルが混ざらない。
- status/evidence/catalog driftを検出する。
- provenance欠落と未処理download failureを検出する。

### render成果物

- A/B/CのClean 129秒MP4を必ずrenderする。
- A/B/CのGuide 129秒previewもrenderする。容量が大きい場合はpreview scale/bitrateを下げてよいが、durationと全timelineを省略しない。
- `ffprobe` で全6本のduration、resolution、fps、audio stream有無を記録する。
- 仮音源しかない／無音の場合はGuideとUIへ明記し、音同期を検証済みにしない。

### visual QA

- 14区間それぞれで、少なくともentry、mid/peak、exit直前をA/B/Cでrenderする。
- 主要animationはentry / peak / settle / hold / exitのlifecycle別にstillを取る。
- B案の3-hit、各歌詞切替、transition、Welcome、End、sparkleは効果が最大になるframeを必ず含める。
- CleanとGuideのcontact sheetを作る。
- contact sheetだけでなく、3本のフルMP4を最初から最後まで再生し、timecode付きreview logを残す。
- 目視項目：顔切れ、黒帯、読めない文字、文字と顔の競合、stock人物の誤解、effectの安っぽさ、雨に見えるdust、過剰点滅、同じ絵の停滞、急な終端、音の途切れ、3案の類似。
- 文字は背景とのcontrastを確保し、通常文字は原則4.5:1、大きい文字は3:1を目安にする。背景が変動する場合はshadow、scrim、maskなどで全区間を確認する。
- 1秒に3回を超えるflashを避け、歌詞を読む時間を確保する。

### 独立した反証レビュー

実装者視点の確認後に、別passで「失敗を探す」レビューを行う。次の問いへYes/Noと証拠で答える。

- これはエフェクト図鑑ではなく、129秒の一本の映画に見えるか。
- 無音で見ても物語が分かり、音を入れると編集理由が増すか。
- どの10秒を切り取っても写真／映像が主役か。
- A/B/Cを色を消しても区別できるか。
- 32歌詞枠が本当に全て表示されたか。
- 初心者がDashboardだけで「見る→選ぶ→コメント→prompt出力→次の作業」まで進めるか。
- 報告の全主張に、file、command output、artifact、timecodeのいずれかがあるか。

一つでもNoなら直して再renderする。回避理由を書いて未達を成功扱いしない。

## 10. 外部知見の採用方針

実装時点の公式情報を再確認し、必要なら追加調査する。SNS投稿や作例はアイデア源に留め、権利・仕様・事実の根拠は公式／一次資料を優先する。

- Remotion公式：`Sequence`のtime shift、named timeline、`premountFor`、audio、TransitionSeries、performanceを正しく使う。
  - https://www.remotion.dev/docs/sequence
  - https://www.remotion.dev/docs/audio
  - https://www.remotion.dev/docs/transitions/transitionseries
  - https://www.remotion.dev/docs/performance
- Pexels公式API：orientation/size filterと現行video endpointを使う。
  - https://www.pexels.com/api/documentation/
- Blackmagic Design公式training：編集、color、sound design/mix、deliveryを別工程として確認する。effect追加だけを仕上げと呼ばない。
  - https://www.blackmagicdesign.com/jp/products/davinciresolve/training/
- W3C WAI：overlay textの可読性、情報処理時間、flash制限を品質gateへ反映する。
  - https://www.w3.org/WAI/media/av/av-content/
  - https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum
- TikTok公式Creative Codes：hook/body/close、音、safe zone、継続的比較の考えだけを参考にする。9:16広告仕様やCTAは会場映像へ持ち込まない。
  - https://ads.tiktok.com/business/en/creative-codes
  - https://ads.tiktok.com/help/article/creative-best-practices
- Vimeoの編集／storytelling解説：continuity、pacing、story、sound、purpose、close-up/wideの役割、感情の余韻を参考にする。
  - https://vimeo.com/blog/post/video-storytelling
  - https://vimeo.com/blog/post/video-editing-tips

調査で見つけた流行演出を無批判に増やさない。「この二人の写真とStaRtの感情曲線に必要か」「会場の遠距離視聴で読めるか」「数年後にも安っぽくないか」で採否を決める。

## 11. ドキュメントと再発防止

- `docs/opening-authority.md` をauthorityとし、古い「Short最優先」記述を修正する。Extended本命、60秒Short fallback、今回の129秒3案は比較研究から本番候補選定へ繋ぐ位置づけを矛盾なく記述する。
- 素材の置き場所、音源の置き場所、歌詞の置き場所、ダウンロード方法、render command、Dashboard起動command、レビュー方法、選定後の次工程を初心者向け日本語で一本道にする。
- 「素材を入れたらどんな写真が良いか」の助言をrole別に書く。英語だけのrole名は禁止。
- 既存のlearning logへ、今回の失敗と再発防止を追記する。
- 本番ゲートをCIまたは既存check commandへ統合する。ただしlocal-only素材が必要なcheckは、未投入時に理由付きBLOCKEDとなるようにし、偽のpassを出さない。
- 重要なstatusは証拠artifactが無ければ上げられない型／schemaにする。

## 12. 実行順

1. repository/authority/status/既存artifactの監査。
2. Acceptance Matrixとroot-cause記録。
3. lyric timelineと32枠coverage修正。
4. A/B/Cのstoryboard・motion grammar再設計。
5. 素材取得pipeline、orientation/size/probe、失敗一覧、overlay preset修正。
6. A/B/Cを全区間実装。
7. Technique Catalog単一化。
8. Dashboard player、比較、seek、timecode comment、素材／不足／修正prompt UI。
9. 機械検証。
10. 6本full render、probe、lifecycle still、contact sheet。
11. フル視聴レビューと反証レビュー。問題があれば修正して再render。
12. docs更新、最終check、scopedな日本語commit。pushはしない。

大量変更を一度に壊さないよう、小さなbatchごとに実装→確認する。ただし最終ゴールを途中の「基盤だけ」「stillだけ」で終わらせない。

## 13. 完了報告フォーマット

最後は日本語で、誇張せず次の順に報告する。

1. `結論`: 現在の4段階status。なぜそのstatusか。
2. `修正した重大問題`: 問題→原因→修正→証拠。
3. `3案の違い`: 各案の物語、映像文法、代表timecode。
4. `成果物`: 6本の絶対path、duration/resolution/fps/audio有無、contact sheets、review log。
5. `素材`: 採用数、重複率、出典、縦横比検証、採用／不採用overlay、未取得一覧。
6. `検証`: 実行したcommandと成功／失敗。32歌詞coverage、14区間、黒帯、黒frame、freeze、contrast、flash、catalog drift。
7. `Dashboardの使い方`: 起動command、URL、見る→選ぶ→コメント→prompt生成の手順。
8. `未完了`: 正規歌詞、正規音源、本人写真、会場仕様、人間承認など。未確認を完了欄へ入れない。
9. `次にユーザーがすること`: 一度に1〜3個だけ、初心者向けに具体的に。
10. `Git`: branch、commit hash、push未実施。

「全チェック通過」と書く場合は対象checkを列挙する。「目視済み」と書く場合は見たartifactとtime rangeを列挙する。「本番レベル」と書く場合は `DEMO_PRODUCTION_READY` か `WEDDING_FINAL_READY` のどちらかを必ず明記する。

この指示の目的は、エフェクトやファイル数を増やすことではありません。写真・歌詞・音・動きが129秒を通して一つの感情としてつながり、A/B/Cを実際に見て選べ、選んだ後の修正まで迷わず進められる状態を、検証可能な証拠とともに作ることです。

---
