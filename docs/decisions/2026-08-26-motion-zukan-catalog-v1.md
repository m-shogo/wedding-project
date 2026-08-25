# モーション図鑑 v1: 既存36 Motion Kit presetのカタログ化

日付: 2026-08-26
状態: 実装済み(PR #333, #334, #335)
関連: `movie-dashboard/src/data/visualMotionLibrary.ts`, `movie-dashboard/src/data/startMotionKit.ts`, `movie-dashboard/src/data/directorRecipeCatalog.ts`

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
3. **Visual fidelity / Actual verification**: 未着手。全て`CONCEPT`
   (実Render無し)、DaVinci実機検証も未実施(この開発環境にDaVinci Resolveは
   インストールされていない)。❌

**「36件がカタログとして存在する」ことと「36件が実際に見て選べる」ことは別**。
次のフェーズで優先すべきは、件数を増やすことではなく、代表的なMotionから実際に
`motion-studio`でRemotion renderして`REPO_GENERATED`のConcept Evidence
(既存`motionPreviewEvidence.ts`のMask Reveal例と同じ形式)を積み上げることである。

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

1. 代表的な数件(sharedEngineごとに1〜2件)を実際に`motion-studio`で
   Remotion renderし、`motionPreviewEvidence.ts`と同じ形式でConcept Evidence
   を記録する。全36件を一度にrenderする必要はない。
2. 実写真投入後、`sample-generic-hero-photo-v1` / `sample-generic-multi-photo-v1`
   の`visualBase.assetPath`を実素材へ差し替える。
3. DaVinci Resolveが利用可能な環境が用意されたら、Mask Reveal Vertical Slice
   (`docs/handoff/MASK-REVEAL-VERTICAL-SLICE.md`)を先に完了させ、
   そこで確立したActual Evidence gateの型を他Motionへ展開する。
4. 件数を20〜30へ絞り込む(Phase 3の目標)より先に、実際にOpening/Profile制作で
   使われた実績(`usageStage`が`ROUGH`/`FINAL`になる)を積むことを優先する。
   使われなかったMotionを後から`humanDecision: "REJECT"`で落とす方が、
   最初から絞り込むより安全。
