# Root Cause / Corrective Action: StaRt 129秒ショーケース本番品質立て直し

日付: 2026-08-25。対象: `docs/handoff/2026-08-25-claude-start-129-production-rescue.md` の指摘への対応記録。

## 起きたこと

前回セッションで「render済み・技術見本として動く」ことを、実際には満たしていない項目まで含めて完成報告してしまった。今回、ユーザーから提示された14件の疑いを実ファイル・render・ffprobeで検証し、複数が実際にバグだったことを確認した。誰の責任かではなく、再発防止できる設計・工程の問題として記録する。

## 検証結果(疑いごとに実際どうだったか)

| # | 疑い | 検証結果 | 対応 |
|---|---|---|---|
| 1 | 歌詞32枠のうちrange先頭しか出ない | **事実だった**。`section.lyricSlotRange[0] - 1` で固定参照していた | `lyricSlotWindowsForSection()`(sections.ts)を追加し、range内の全slotへ均等時間を割り当てる`<Sequence>`をnestする実装へ変更(A/B/C共通)。frame 530/610/700/780のstillで実際に4slot切り替わることを目視確認 |
| 2 | 契約checkが実際のrender coverageを見ていない | **事実だった** | `check-start-129.mts`に、全32 slotが`lyricSlotWindowsForSection`経由で「1回・0フレーム超」のwindowを持つことを検証する項目を追加 |
| 3 | 129秒フルMP4が無かった | **事実だった**(前回はstillのみ) | 6本(A/B/C × Clean/Guide)をfull renderし、ffprobeで129.045s/30fps/960×540(scale0.5)/silent audio streamを確認 |
| 4 | B案chorusが黒背景+固定語を約10秒保持 | **事実だった**。`ChorusHitWord`が写真を一切出さず、intensity計算は3-hitのみに使われ、残り時間は無地背景だった | `ChorusShot`へ再設計。写真/動画を常時背景に置き、区間中盤でvariantIndex切替(2枚目候補)、3-hitは0.6秒(18frame)のaccentへ短縮。frame 1300のstillで背景写真(HERO_CLOSE)が保持されていることを確認 |
| 5 | Dashboardに実player/seek/timecodeコメントが無い | **事実**。現行Dashboardはカード・timeline table・技術一覧・favorite/maybe/reject・汎用コメントのみで、動画再生・A/B切替・timecode紐付けコメントは無い | **未着手**。理由は下記「今回やらなかったこと」参照 |
| 6 | Pexels取得がorientation/size未指定で16:9roleに縦素材混入 | **事実だった**。BROLL_TEXTURE 2件・MOVEMENT_LEFT_TO_RIGHT 1件・MOVEMENT_RIGHT_TO_LEFT 1件・DEPARTURE 1件・HAWAII_WARM 1件・SEOUL_STREET 1件・overlay sparks 1件が縦素材だった | fetch scriptを修正: 動画は`/v1/videos/search`+`orientation=landscape`+`size=medium`、写真も`orientation`指定、video_filesを向きでfilterしてから選択。該当roleを全て再取得・再選定し、`check-start-129-media.mts`で機械検証を追加(pnpm checkに統合) |
| 7 | 左右移動roleが同一動画/未確認 | **一部事実**。MOVEMENT_RIGHT_TO_LEFTの検索クエリ("walking right to left street")がデモ行進動画(読める看板・群衆)を繰り返し返し、目視で2回不採用にした | クエリを"pedestrian walking sidewalk pov"へ変更し、POV歩行動画2本へ差し替え。実際の左右移動方向の一致は確認していない(コンテンツはダミーのため許容、と既存決定ログに明記) |
| 8 | contain常用による黒帯、縦overlayの不自然なcover | **事実だった**。C案の非chorus区間が`contain`固定で、写真(1880×1253)とframe(1920×1080)のアスペクト差により pillarbox黒帯が出ていた | `StartDemoBackdrop`に`blurred-extend`(背景ぼかしcover+前景contain)を追加。C案は横素材`cover`、VERTICAL_PORTRAIT(縦素材)のみ`blurred-extend`へ変更。frame 3100のstillで黒帯が消え、構図を保ったまま画面いっぱいになることを確認 |
| 9 | SparkleOverlayが候補先頭固定、preset無し | **部分的に事実**。`candidates[0]`固定は本当だが、現状は各kind1〜2本しか無く実害は小さかった。より重大だったのは(6)で判明した縦動画混入(sparks) | sparksをlandscape版へ差し替え。preset化(crop/anchor/blendMode個別管理)は今回未着手(下記参照) |
| 10 | QA stillがsection境界中心 | **事実**。既存45枚は区間開始〜終了の代表点のみで、entry/peak/settle/hold/exitのlifecycle別ではなかった | 今回はB案chorusのhit window(peak)や歌詞slot切替点など、問題箇所を狙ったstillを追加で多数render・目視した。全techniqueへの体系的なlifecycle stillは未着手 |
| 11 | 取得失敗一覧が保存されない | **事実だった** | fetch scriptに`_fetch_failures.json`出力を追加(0件時も生成) |
| 12 | Technique Catalogの二重管理・status過大 | **事実**。motion-studio/movie-dashboardで手動複製しており、今回追加した技術も両方へ手動反映した(driftのリスクは残る) | 単一情報源化(自動生成)は今回未着手。statusは前回の楽観的な記載を見直さず追加のみ行った(下記「未完了」に計上) |
| 13 | opening-authority.mdとの矛盾 | **軽微**。`docs/opening-authority.md`自体はExtended本命/Short fallbackで一貫しており矛盾していない。`docs/decisions/start-129-three-showcase-directions.md`の「背景」節が、task-board.mdの**現在の作業優先度**(実写真11枚投入)と、opening-authority.mdの**product authority**(Extended本命)を並べて書いており、読み方によっては紛らわしかった | この文書で切り分けを明記(下記「authorityの整理」) |
| 14 | 3案が本質的に色・文字・effect量の差に留まっている | **部分的に事実**。作業後の目視で、B案chorusがhit window外ではA案とほぼ同一に見える瞬間があることを確認した | B案へ`AnimeFrameVignette`(恒常的な手描き風frame)を追加し、hit window外でも視覚的に判別できるようにした。物語構造・shot selectionレベルでの差別化はまだ限定的(下記「未完了」) |

## authorityの整理(#13対応)

- `docs/opening-authority.md` = Product authority(Extended本命 / Short fallback)の単一入口。**今回変更していない**。
- `docs/task-board.md` = 現在の作業順(Now/Next)。Short Candidateの実写真投入が現在のタスクとして書かれているが、これはproduct authorityの宣言ではなく作業順。
- `docs/decisions/start-129-three-showcase-directions.md` = 129秒3案(研究・比較用)の決定ログ。product authorityを変更しない旨を明記済み。

3つの文書は役割が違うため、今後も一本化しない。ただし「背景」節を読んだ人が誤解しないよう、この文書で明示的に切り分けた。

## 今回やらなかったこと(未完了。完了扱いにしない)

- **Dashboardの実動画player・A/B同期比較・timecode紐付けコメント**: 現状のDashboardページはメタデータ表示とlocalStorage記録のみ。実装には、renderしたMP4をDashboardから安全に配信する仕組み(現状Dashboardは別Vite devサーバーで、motion-studioのout/を直接参照できない)を含む設計が必要で、今回のセッション内では着手しなかった。
- **Technique Catalogの単一情報源化**: motion-studioとmovie-dashboardの手動複製が残っている。drift検出も未実装。
- **Overlay presetカタログ化**(crop/anchor/blendMode/opacityRange/allowedSections/rejectedReasonを持つ構造化データ)。現状は`SparkleOverlay`のprops手渡しのみ。
- **全techniqueのlifecycle(entry/peak/settle/hold/exit)別still**。今回は問題箇所を狙い撃ちしたstillのみ。
- **独立した反証レビューの型式化**。今回は実装者自身が目視確認したのみで、別視点でのレビューpassは行っていない。
- **3案の物語構造・shot selectionレベルでの差別化強化**。B案へ視覚signatureは追加したが、A/B/Cのnarrative purpose / primary visual role等をsection単位でデータ化する作業(Acceptance Matrix相当)は行っていない。
- **status定義の4段階への置き換え**。既存Technique Catalogの`ISOLATED/CONTEXT_TESTED/.../VISUALLY_VERIFIED`ラダーはそのまま残っており、今回提案された`IMPLEMENTED_UNVERIFIED / RENDER_VERIFIED / DEMO_PRODUCTION_READY / WEDDING_FINAL_BLOCKED`への置き換えは行っていない。

## 一般化できる原則

1. **「Compositionが登録される」と「動画が完成する」を混同しない。** 契約checkは必要条件であって十分条件ではない。今回もdata契約checkは全て通っていたが、歌詞32枠のうち24枠が一度も描画されないバグを見逃していた。
2. **「先頭候補を自動採用」は危険。** API検索、配列の`[0]`、`candidates[0]`など、複数箇所で「最初の1件で確定」というパターンがあり、そのたびに向きや内容の不一致が生まれた。
3. **stillだけのQAはsection境界の一瞬しか見ない。** 動きのある演出(3-hit、fade、cut)はfull video再生かlifecycle別stillでないと問題が見えない。
4. **「動いた」の報告は、何をどう確認したかを具体的に書く。** 今回の前回報告は「45枚render・目視確認」と書いていたが、実際には歌詞bugのような構造的な問題を見落としていた。個別の確認範囲(どのframe/どの秒数を見たか)を明記しないと、後から検証できない。

## 関連

- `docs/decisions/start-129-three-showcase-directions.md`
- `docs/learning-entries/start-129-production-lessons.md`
- `docs/handoff/start-129-showcase-review-guide.md`
