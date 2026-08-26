# モーション図鑑 v1: 既存36 Motion Kit presetのカタログ化

日付: 2026-08-26(初版 PR #333〜336 / 追記 PR #338, #339, #345, #349, #352, #354, #357, batch5, batch6)
状態: 実装済み・継続更新中
関連: `movie-dashboard/src/data/visualMotionLibrary.ts`, `movie-dashboard/src/data/startMotionKit.ts`, `movie-dashboard/src/data/directorRecipeCatalog.ts`, `motion-studio/src/motion-kit/renderablePresets.ts`

## 背景

`docs/opening-authority.md` / `motion-studio/CLAUDE.md` の最優先はStaRt Extended
Openingの実素材・正規ローカル音源での完成だが、今回は「音源もDaVinci実機も無くても
進められる範囲」として、ユーザーの指示でモーション図鑑(Visual Motion Library)の
カタログ化に一時的にスコープを絞った。

着手前の状態: `visualMotionLibrary.ts`にはMask Reveal 1件しか
`MotionPatternRecord`が存在せず、Phase 3で目標としていた「20〜30件の本当に使える
Motion」にはほど遠かった。

## やったこと

1. **PR #333** — 既存`startMotionKit.ts`の36 preset(`type-mask-slide`は
   `type-mask-reveal`が既にカバー済みのため除外し残り35件)を、新しい効果を
   発明せず`MotionPatternRecord` / `MotionImplementationRecord` /
   `MotionPreviewRecord`へ機械的に正規化した。値はpreset自身の
   `purpose` / `avoidWhen` / `useCases` / `engine`から導出しており、
   `ACTUAL_DAVINCI_RENDER` / `TESTED` / `PRODUCTION_READY`は一切主張していない
   (`humanDecision: "NONE"` / `usageStage: "NEVER"` / `verified: false`のまま)。
   Style Bible(「映画予告編風・冒険アニメOP風をデフォルトにしない」)に沿い、
   `ANIME_ACCENT`系はOpening適合度を既定で下げた。
2. **PR #334** — 36件全カードが同じ「WELCOME」固定文言を表示していたバグを修正し、
   `pattern.commonName` / `pattern.looksLike`をカードごとに表示するようにした。
3. **PR #335** — 35件それぞれに日本語ファースト検索用のエイリアス(擬音・用途表現)
   を追加した。
4. 新規contract `check:motion-zukan-catalog-v1`を`check:movie-coach`へ追加し、
   カバレッジ・honesty invariant(未検証claim禁止)・sample参照整合を機械検証する。

## 現在地(3段階のうちどこまで進んだか)

`docs/start-director-recipe-system-overview.md`と同じ3段階評価をここにも適用する。

1. **Data complete**: 36件全てに日本語名・用途・避ける場面・Opening/Profile適合度
   が入っている。✅
2. **Discoverable/Browsable**: 検索・カード表示・個別previewテキストまで完了。✅
3. **Visual fidelity / Actual verification**: **32/36件が完了**(PR #338, #339, #345,
   #349, #352, #354, #357, batch5, batch6)。これは`engine: 'remotion'`の35 Motion Kit
   preset全件(`type-mask-slide`経由の1件を含む)が完了したことを意味する。
   `motion-studio`の`StaRtMotionReelV1`(33 renderable preset、6 shared engine)を
   実際にローカルRemotion renderし、静止フレーム抽出+ffprobe/signalstats+一部
   Pythonでのpixel計測で目視確認した。DaVinci実機検証は引き続き未実施
   (DaVinci Resolveは無料版をインストール済みだが、外部scripting APIがStudio版
   限定のためRenderer/自動化検証はできない。詳細は
   `docs/decisions/2026-08-26-palmier-davinci-handoff-fidelity-v1.md`の追記を参照)。❌

QAで推測PASSにしなかった実例:
- `accent-stamp-triplet`は最初のサンプルframeでは3-hitの合間に当たりスタンプが
  写っておらず、一度`PENDING`として記録した上で、追加frameを確認してから
  `PASS`へ格上げした。
- `accent-impact-frame`も同様に、最初のサンプルではimpactの瞬間(frame8前後)を
  外していたため、タイミングを合わせた追加確認の上で`PASS`と判定した。

QAで見つかった**既知の実装限界**(隠さず記録):
- ~~`PhotoLayoutEngine`の`contact-sheet`と`panel-grid`が現状どちらもデフォルト
  4列グリッドで、見た目上区別できない。~~ → 追記(2026-08-26): `gridTemplateAreas`で
  panel-gridを大小非対称の4コマレイアウトへ変更し解消(4件以外の枚数は引き続き
  均等gridへfallback)。`motionPreviewEvidence.ts`のevidenceを実render確認の上
  更新済み。
- ~~`type-char-stagger`と`type-tracking-burst`が現状同じ`stagger` modeを共有しており、
  見た目の差別化ができていない。~~ → 追記(2026-08-26): `type-char-stagger`を
  文字単位の個別reveal(真のstagger)、`type-tracking-burst`を新設
  `mode='tracking'`(letterSpacing burst専用)へ分離し解消。実render確認済み。
- ~~`wipe-directional-shape`は「図形(shape)が横切る」という名称に対し、実装は
  図形オブジェクトではなく色面wipeの近似。~~ → 追記(2026-08-26):
  TransitionWipeEngineへ`variant='shape'`(clip-pathによる先端の尖った
  chevron図形)を新規実装し解消。実render確認済み。ただしさらに追記
  (2026-08-26, `wipe-paper-edge`調査時): この実装は「chevronの先端が画面を
  横切ってsweepする」動きではなく、「直線的にsweep-inした後、静止状態で
  chevronのシルエットが現れる」動きだったことが後日判明した(clip-path多角形+
  translateでのsweep方式の一般的な特性)。見た目自体は矩形wipeと明確に区別
  できるため`PASS`判定は維持するが、動きの説明は不正確だったため
  `motionPreviewEvidence.ts`のobservationsで訂正済み。
- `type-triplet`(TypographyRevealEngineへ`mode='triplet'`を新規実装、3-hitの
  scale punch): 実render確認済みだが、目視だけでは変化を確信できないほど
  効果が控えめだったため、Pythonで対象領域の輝度ピクセルのbounding boxを
  計測し、hitタイミングで有意にサイズが大きいことを数値で確認した
  (`motionPreviewEvidence.ts`参照)。強度を上げるかはHuman判断待ち。
- `type-vertical-wipe`(TypographyRevealEngineへ`mode='vertical-wipe'`を新規実装、
  縦方向clip-path reveal): 実render確認済み、既存の横方向`mask`と明確に区別できる。
- `wipe-paper-edge`(TransitionWipeEngineへ`variant='paper'`を新規実装、破れ紙風の
  ギザギザwipe): 最初のサンプルframe(sweep中)ではギザギザが見えず、
  `wipe-directional-shape`と同じ「sweep-inした後の静止状態でシルエットが現れる」
  特性であることが判明。sweep後のframeを追加確認し、ギザギザ自体は実装できて
  いることを確認した。
- `type-type-on-rhythm`(TypographyRevealEngineへ`mode='word-stagger'`を新規実装、
  語単位reveal): 最初の実装ではflexコンテナの`gap`スタイルが効かず、
  「OUR JOURNEY」が「OURJOURNEY」と語間なしで結合して表示されるバグを実render
  確認で発見。各spanへ`marginRight`を明示指定する方式へ変更し解消した。
- `photo-freeze-cutout`(CameraTransformEngineへ`mode='freeze'`を新規実装、
  静止フレーム+cutout枠): 最初の実装ではborderのclip-pathが画面端とほぼ1点でしか
  接しない形状だったため、border全体がほぼクリップされて見えなくなるバグを実render
  確認で発見。四隅だけ小さな三角ノッチを入れる形状へ変更し解消した。
- `accent-cel-shadow-sweep`(GraphicHitEngineへ`variant='cel-shadow'`を新規実装、
  斜めの影shapeが横切る): 最初の実装では影色をnavy系にしたためDemoBackdropの
  navy背景とほぼ同化して見えないバグを実render確認で発見。純黒+高不透明度へ
  変更し解消した。
- `type-counter-scroll`(TypographyRevealEngineへ`mode='counter-scroll'`を新規実装、
  継続的なmarquee的スクロール)/`accent-micro-rgb-split`(GraphicHitEngineへ
  `variant='rgb-split'`を新規実装、短時間のRGB screen blend glitch)は、
  実render確認で初回から見た目上の破綻なく動作した。

これらはengine拡張(新規機能追加)が必要で、今回のカタログ化のスコープ外として
`motionPreviewEvidence.ts`のnotesへ明記した。実装したふりをしていない。

残り3件(`cut-match-shape` / `whip-source-matched` / `type-quiet-caption`)は、
`engine`がそれぞれ`palmier-native` / `davinci-edit` / `davinci-edit`であり、
そもそもRemotionでのrender対象外(既存engineのmode/directionを流用するだけでは
正直に表現できず、Palmier native機能またはDaVinci Fusion/Edit自体の実装が必要)。
これはengine実装が「未着手」なのではなく、モーション図鑑v1のスコープが
「`engine: 'remotion'`のMotion Kit presetをRemotionでrenderable化する」ことに
限定されているための構造的な区別であり、無理にRemotionへ寄せていない。

**「36件がカタログとして存在する」ことと「36件が実際に見て選べる」ことは別**。
`engine: 'remotion'`の35件は全てRemotionで見て選べる段階まで進んだが、
残り3件(palmier-native / davinci-edit)は引き続き文章ベースのカタログ
(`CONCEPT_ONLY`)のままである。これらをPalmier実機やDaVinci実機で検証する
ことは、今回のスコープではなく別途のVertical Slice(`docs/handoff/
MASK-REVEAL-VERTICAL-SLICE.md`のようなPalmier/DaVinci実機確認)が必要。

## Director Recipe Catalog(97件)との関係

意図的に別システムのまま残した。統合していない。

| | Director Recipe Catalog | Visual Motion Library(モーション図鑑) |
|---|---|---|
| 件数 | 97 | 36 |
| 単位 | StaRt楽曲sectionに紐づく演出の「組み合わせ」 | 汎用的な単体Motionの「部品」 |
| 用途 | StaRt Extended本番roughの選定 | Opening/Profile問わず使える演出を検索・発見 |
| 参照元 | `motionPresetIds`経由でMotion Kit presetを参照 | Motion Kit presetそのものをカタログ化 |

97件のレシピは36件のpresetを組み合わせて作られているため、
`directorRecipeCatalog.ts`を書き換えたり36件を97件へ統合したりする必要はない。
同じsource(`startMotionKit.ts`)を、目的の異なる2つの画面がそれぞれの粒度で
参照している状態を意図的な設計として維持する。

## Human Master編集(Scene Composer)との関係

36件のうち、人間が編集できるHuman Master Scene(Duration/Delay/Hold/Position等を
Property単位で修正できる構造)を持つのは引き続き`type-mask-reveal`のみ。
他35件はブラウズ・検索・用途確認ができるカタログ段階であり、
`VisualMotionLibrary.tsx`側でも`MaskRevealEditableWorkspace`を
`type-mask-reveal`だけに限定表示するよう明示的にガードした。

「カタログに載っている」ことを「Sceneとして採用・編集できる」ことと混同しない。

## 次にやるべきこと(優先順位)

1. 残り3件(`cut-match-shape` / `whip-source-matched` / `type-quiet-caption`)は
   Remotionでのrenderable化そのものが目的とずれる(palmier-native /
   davinci-edit)ため、無理にRemotionへ寄せない。Palmier実機・DaVinci実機が
   利用可能になった時に、それぞれのツールで直接検証する。
2. 実写真投入後、`sample-generic-hero-photo-v1` / `sample-generic-multi-photo-v1`
   の`visualBase.assetPath`を実素材へ差し替える。
3. DaVinci Resolveが利用可能な環境が用意されたら、Mask Reveal Vertical Slice
   (`docs/handoff/MASK-REVEAL-VERTICAL-SLICE.md`)を先に完了させ、
   そこで確立したActual Evidence gateの型を他Motionへ展開する。
4. 件数を20〜30へ絞り込む(Phase 3の目標)より先に、実際にOpening/Profile制作で
   使われた実績(`usageStage`が`ROUGH`/`FINAL`になる)を積むことを優先する。
   使われなかったMotionを後から`humanDecision: "REJECT"`で落とす方が、
   最初から絞り込むより安全。
5. `PhotoLayoutEngine`のcontact-sheet/panel-grid差別化、`type-char-stagger`/
   `type-tracking-burst`の差別化は、実際にOpening/Profileで両方使いたい場面が
   出た時に優先して着手する(使われない差別化を先回りして作らない)。
6. `type-counter-scroll`は現状「文字だけが流れる」近似で、`accent-micro-rgb-split`
   は「画面全体のcolor blend」近似。実際に背景動画やAI B-rollと組み合わせて
   使いたい場面が出た時に、より精密な実装(背景と文字の相対速度差、edge-onlyの
   色収差)を検討する。
