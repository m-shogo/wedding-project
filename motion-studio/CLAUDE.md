# CLAUDE.md — motion-studio AI向け引き継ぎ書

このファイルはAIエージェント(Claude/Codex等)向け。人間向けの操作手順は `MANUAL.md`、
テンプレ一覧は `README.md`、結婚式全体の方針は `../CLAUDE.md` と `../docs/02_style-bible.md`。

## 2026-08-08 production authority

最優先は**基盤追加ではなく、2026-10-24に実上映できるオープニングムービーを完成させること**。
旧方針の「Remotionでは完成動画を作らず短尺素材だけ作る」は、通常テンプレート群については残すが、
オープニング制作では例外として `OpeningV1` を**全尺60秒のrender可能な骨格**として使う。

- `src/index-opening-v1.ts` / `OpeningV1Root.tsx` / `compositions/opening/OpeningV1.tsx` がOpening V1正本
- `src/data/openingV1.ts` が60秒timelineの正本
- `開幕-全体確認` の82秒版はlegacyの順番・尺確認用。Opening V1の正本ではない
- V1は実写真未投入でもplaceholderで最後までrenderする。AI動画待ちで止めない
- 実写真/実動画の差し替えと最終timing/BGM同期はPalmier + Claude Codeが正担当
- CodexはRemotion source、人物なし画像素材、必要なAI shotのfirst/last frameを担当
- CodexとClaude Codeを同時にPalmier timelineへ書き込ませない
- 有料AI生成は明示許可があるまで実行しない

## このアプリは何か

結婚式ムービー用のモーション素材と、Opening V1の全尺骨格をRemotionで作る。
文字・数字・地図・ハンコ・カウントダウンなど「精密さが必要なパーツ」はRemotionが担当し、
Opening V1ではそれらと実写真placeholderを60秒へ統合して、実編集前にテンポと必要素材を確定する。
最終編集の正本はPalmierとし、Remotionはrender可能な構成・テロップ・travel UIの正本を担う。

## 絶対に守るルール(結婚式プロジェクト共通)

- 人物・犬をAI生成しない。写真は実写真(`public/photos/`、Git管理外)
- 文字はRemotionで描く。AI画像/動画に文字を入れない
- 1カット1動作。派手なバウンド・グリッチ・速いカメラ禁止
- 色・フォントは `src/data/theme.ts` / `src/data/fonts.ts` から取る(直書き禁止)
- `out/` の動画と `public/photos/` の実写真はGitに入れない
- AI B-rollは必要性がV1で確認できたshotだけ。いきなりT2Vを大量生成しない
- AI動画は storyboard/first frame → 静止画QA → I2V → start/middle/end QA の順を基本にする

## アーキテクチャ(3層+データ)

```text
src/components/        部品(PhotoCard, RouteLine, PassportStampMark, PaperTexture...)
src/components/parts/  再利用パーツ基盤(text/photo/layout/effects)。下記参照
src/compositions/      シーン。common/opening/profileに分類
src/Root.tsx           既存テンプレComposition登録(手書き。自動生成しない)
src/OpeningV1Root.tsx  60秒Opening V1専用Root
src/index-opening-v1.ts Opening V1専用entry point
src/data/              単一情報源(下記)
```

### 再利用パーツ(src/components/parts/)

新しいテロップ演出は**新テンプレを増やす前に**パーツ化を検討する。
text(実装済み)/photo/layout/effects に分類。`TextPart` でvariant呼び分け。

- パーツ追加の手順: パーツ作成 → `parts/<cat>/index.ts` でexport →
  `src/data/partRegistry.ts` に登録 → 確認用Composition `文字部品-確認`
  (TextPartsPreview)を更新 → `pnpm check:parts`
- 1パーツ1責務。`startFrame`/`durationFrames`で自己完結フェード。色・フォントはtheme/fonts必須
- `status`は`draft`で追加。`approved`昇格は人間確認必須(AIが勝手に上げない)
- ルール詳細: `src/components/parts/README.md`

| ファイル | 役割 |
|---|---|
| `openingV1.ts` | 現行Opening V1の60秒timeline正本。写真主役比率とshot責任者を固定 |
| `openingProject.ts` | legacy/既存テンプレ側の新郎新婦・日付・シーン構成。82秒previewのデータ源 |
| `assets.ts` | 素材ID管理。パス直書き禁止。写真をテンプレに渡すときは `photoPublicPath(id)` で変換(`public/photos/`プレフィックスを手で剥がさない) |
| `sceneRegistry.ts` | 既存テンプレのメタデータ(ID/尺/出力先/透過区分) |
| `theme.ts` `fonts.ts` | デザイントークン |
| `routes.ts` `memories.ts` | 地図座標・写真カードデータ |
| `photoLibrary.generated.ts` | `pnpm sync:photos` の自動生成。手で編集しない |
| `aiPromptRegistry.ts` | AI生成のプロンプト履歴。assetIdに紐づけ、生成のたびに1レコード追加 |
| `partRegistry.ts` | 再利用パーツ(parts/)のメタデータ。`pnpm check:parts`が検証 |

## テンプレート追加の手順(既存Studio側)

1. `src/compositions/` にシーンを作る(zodスキーマ+型+コンポーネントをexport)
2. `Root.tsx` に `<Composition>` を追加 — **defaultPropsは必ずオブジェクトリテラル**
3. `src/data/sceneRegistry.ts` にエントリ追加(ID/folder/尺/kind/output)
4. 検証: `pnpm typecheck && pnpm check`

Opening V1だけを直す場合は、不要な既存テンプレ追加を避け、まず `OpeningV1.tsx` と `openingV1.ts` の範囲で解決する。

## ハマりどころ(これまで実際に踏んだもの)

- **Composition IDとFolder名は `/^([a-zA-Z0-9-一-鿿])+$/`**。
  漢字は使えるが**ひらがな・カタカナは使えない**(「扉の光」→`扉-光`にした)
- **Save defaultsの制約**: Studioの「Save defaults」はRoot.tsx内の
  オブジェクトリテラルにしか書き戻せない。defaultPropsを変数参照やspreadにすると壊れる。
  **だからRoot.tsxをregistryから自動生成しない**(check:motionで整合を担保する設計)
- **点線航路のdraw-on**: 点線パターンとevolvePath(描き進み)は両立しないので、
  `RouteLine.tsx` は「実線のevolvePathをマスクにして点線を表示」する技を使っている
- **乱数は `random()`(remotion提供)**。`Math.random()` はフレームごとに変わって壊れる
- **feDisplacementMap(ハンコのにじみ)は一部の埋め込みブラウザで崩れて見える**が、
  書き出し(headless Chrome)では正常。プレビューの見た目だけで判断しない
- **透過の検証**: VP9 alphaはffprobeで `TAG:alpha_mode=1` を確認。デコード確認は
  `-c:v libvpx-vp9` を明示(ネイティブデコーダはアルファを無視する)
- **Mac MPSでFP8不可**(ComfyUI側の話。`../docs/local-video-ai-setup.md`)
- pnpmのbuild許可は `pnpm-workspace.yaml` の `allowBuilds`(esbuildのみ許可済み)
- checkスクリプトは `.mts` でNode 24の型ストリップ実行(`node --no-warnings scripts/x.mts`)
- **AssetStatusは制作段階**: `missing → idea → prompt_ready → generated_preview →
  candidate → approved → final`(+`external`)。旧`generated`/`ready`/`placeholder`は廃止済み。
  - **AIが勝手にcandidate以上へ昇格させるのは禁止**。昇格は人間の確認が必須
  - `generated_preview` = 試作。**final扱い禁止**。`regenerateCommand`か`recoveryNote`どちらかが必須
  - `regenerateCommand` はターミナルで**そのまま実行できるコマンドのみ**(`# コメント`を入れない)
  - 実行コマンドでない復旧手順は `recoveryNote` に書く(AI素材はここに「どこを採点するか」)
  - render素材は `regenerateCommand` 必須。AI素材で再生成コマンドが無い場合は `recoveryNote` 必須
  - approved/finalはファイルが無いとcheckエラー(=本番素材の消失検出)
  - final sceneに未承認素材が混ざるとcheck:assetsがエラーを出す
- **fresh clone耐性**: `out/`と`public/photos/`はGit外。そこの成果物は
  `generated_preview`(+regenerateCommand)にすればfresh cloneでもcheckが通る
- **legacy `開幕-全体確認`は順番・尺の確認専用**。Opening V1の正本ではない。

## コマンド

```sh
pnpm dev                          # 既存Remotion Studio
pnpm dev:opening-v1               # 60秒Opening V1だけをStudioで確認
pnpm typecheck                    # tsc
pnpm check                        # check:motion + check:assets + check:parts(コミット前に必ず)
pnpm render:opening-v1:preview    # 60秒V1を軽量MP4へrender
pnpm render:opening-v1            # 60秒V1を1080p MP4へrender
pnpm render <テンプレID> <preset>  # preview / draft / final / prores
pnpm render --all final           # 既存素材を一括書き出し
pnpm sync:photos                  # public/photos/ → photoLibrary.generated.ts
pnpm export                       # CapCut作業表CSV/MD + 素材不足表 + review.html + 制作コックピット(exports/index.html)
pnpm export:stills                # 主要Compositionのstill(サムネイル)生成。重いのでexportに含めない
pnpm exec remotion compositions src/index.ts
pnpm exec remotion compositions src/index-opening-v1.ts
```

## 検証のやり方

Opening V1変更後は最低限:
1. `pnpm typecheck && pnpm check`
2. `pnpm exec remotion compositions src/index-opening-v1.ts` で60秒/1920x1080/30fpsを確認
3. `pnpm render:opening-v1:preview` を最後までrender
4. 冒頭・写真区間・終端を目視。人物生成/読めないAI文字/過剰flare等はV1でも禁止
5. MP4はGitへ入れない。pathと確認結果だけGitへ残す

既存テンプレ変更時は従来どおり:
1. `pnpm typecheck && pnpm check`
2. 影響したテンプレを `remotion still` でキーフレーム書き出して目視
3. 透過素材を触ったらffprobeでalpha確認
4. 必要なら `pnpm export` / `pnpm export:stills`

## ツール責任分界

### このチャット / ChatGPT

- GitHub正本の確認・PR/CI/merge判断
- 制作優先順位、shot削減、AIを使う/使わない判断
- Codex / Claude Codeへ渡す次プロンプトの作成
- 有料生成の承認境界を管理

### Codex

- `OpeningV1` のRemotion実装・render・still QA
- 人物なしstoryboard/first frame/last frame
- 必要shotだけAI動画promptへ落とす
- 大容量MP4はGitへcommitしない

### Claude Code

- Palmier MCPのtimeline正担当
- Remotion MP4、実写真/実動画、BGM、採用AI B-rollを配置
- trim/split/reorder/timing/BGM同期
- Palmier timelineへの書込みはClaude Codeだけ

## 未決事項・人間待ち(2026-08-08時点)

- Opening V1へ差し込む2人の実写真選定(現状placeholderでrender可能)
- BGM候補と会場上映の利用条件
- 会場の推奨納品形式/解像度/音声仕様
- V1を見て初めて、AI B-rollが本当に必要なshotを確定する
- Palmier Free timelineへ60秒V1をimportし、BGMと実写真差し替えを進める

## 文体・コミット

- ドキュメント・コミットメッセージは日本語
- ユーザーは審査役。見た目の最終採用(candidate以上)は必ずユーザー確認を通す
- 基盤追加そのものを成果としない。毎回「完成ムービーが何秒/何shot前進したか」を優先して報告する
