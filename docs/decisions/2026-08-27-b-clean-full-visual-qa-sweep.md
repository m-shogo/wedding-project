# StaRt Wedding Edit B-clean — 全曲frame visual QA sweep

Status: RECORD
Scope: `motion-studio/out/start-wedding-edit-b-final-v2/start_wedding_edit_b_clean.mp4`(1080p final render)

## 目的

Safety Gate(P0-A〜D)完了後、実際に完成しているanimation family実装が
「6件のbespoke moment(CHOREOGRAPHED_PHRASE_IDS)以外は未実装」なのか、
それとも既に全12 familyそれぞれに専用の視覚表現があるのかを、実render frame
で確認する。事前のコード調査(`weddingLyricLine.tsx`)では、選ばれていない
18/30フレーズも含め、animationFamilyごとに専用component
(`RepetitionEcho`/`CallAndResponseLayout`/`QuestionPause`/`TypeMaskText`/
`ForegroundReveal`/`WordHit`/`BaselineTravel`/`BouncyLaLa`等)が既に実装
されていることが分かったため、それを実frameで裏取りした。

## サンプリングしたphrase(11件、多様なfamilyを優先)

P001(baseline-travel) / P002(call-and-response-layout) / P004(held-note-stretch,
bespoke ArmorCreationMoment) / P006(whisper-reveal, BouncyLaLa亜種) /
P010(question-pause) / P017(repetition-echo) / P018(lyric-to-transition) /
P019(split-conflict) / P021(question-pause) / P025(held-note-stretch) /
P029(type-mask, プロジェクト全体でフラグシップ扱いのMask Reveal相当)

## 結果

**timing/renderの機能的バグは0件。** 全サンプルでクラッシュ・空白フレーム・
文字欠落・崩壊は無かった。P002の呼びかけ/応答2段構成、P029のTypeMaskText
写真マスク、P010/P021のQuestionPauseタイプライター、P004のArmorCreation
3panel衝突は、いずれも意図通りの視覚表現として機能していた。

## 気になった点(バグ確定ではなく、視覚QA/資産差し替え時の確認事項として記録)

1. **P017(repetition-echo)の視覚密度**: `RepetitionEcho`(反復語のfade echo、
   occurrences=[0,8,16])と`CharacterBuild`(残り文字列)が縦に近接して重なって
   見え、やや読みにくい。family名の意図(こだま/反復)通りの意図的な効果では
   あるが、実際の完パケでは可読性を人間が確認した方がよい。
2. **P021周辺のplaceholder動画アスペクト**: 画面右端に非対称な黒帯が出る
   フレームがあった。現時点の素材は全てdummy/placeholder(`DemoBackdrop`)
   であり、実際のwedding素材投入後に自然に解消される可能性が高いため、
   Timing/render pipelineのバグとしては扱わない。実素材投入時に再確認する。

## 結論

「B案6/13(または13箇所中6箇所)」という進捗フレーミングは、bespoke全画面
takeoverコンポーネント(`ChoreographedMomentRenderer`)の話であり、それ以外の
24フレーズが「未着手」という意味ではない。実際には**全30フレーズが何らかの
専用animation表現を持ち、B-cleanとして通し視聴可能な状態**にある。

残っているのは主に:

- 人間の聴取確認(音の同期が正しいか、本当に「気持ちいい」か)
- 実際のwedding写真/動画への差し替え(現在は全てplaceholder)
- 上記2点の気になる箇所の人間による最終視覚判断

であり、コードとして「作られていない演出」が大量に残っているわけではない。
