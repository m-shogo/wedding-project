# CLAUDE.md — motion-studio AI向け引き継ぎ書

このファイルはAIエージェント(Claude/Codex等)向け。人間向けの操作手順は `MANUAL.md`、
テンプレ一覧は `README.md`、結婚式全体の方針は `../CLAUDE.md` と `../docs/02_style-bible.md`。

## このアプリは何か

結婚式ムービー用の短尺モーション素材をRemotionで作り、CapCutで最終編集する。
**Remotionで完成動画を作らない。** 文字・数字・地図・ハンコ・カウントダウンなど
「精密さが必要なパーツ」だけを担当し、間(ま)とBGM合わせはCapCutでやる。

## 絶対に守るルール(結婚式プロジェクト共通)

- 人物・犬をAI生成しない。写真は実写真(`public/photos/`、Git管理外)
- 文字はRemotionで描く。AI画像/動画に文字を入れない
- 1カット1動作。派手なバウンド・グリッチ・速いカメラ禁止
- 色・フォントは `src/data/theme.ts` / `src/data/fonts.ts` から取る(直書き禁止)
- `out/` の動画と `public/photos/` の実写真はGitに入れない

## アーキテクチャ(3層+データ)

```text
src/components/   再利用部品(PhotoCard, RouteLine, PassportStampMark, PaperTexture...)
src/compositions/ シーン。common/opening/profileに分類
src/Root.tsx      Composition登録(手書き。自動生成しない)
src/data/         単一情報源(下記)
```

| ファイル | 役割 |
|---|---|
| `openingProject.ts` | 新郎新婦・日付・トーン・シーン構成。文言はここから引く。`capcutTargetSec`=上映目標尺、Remotion素材合計は`remotionBaseSec()`で導出 |
| `assets.ts` | 素材ID管理。パス直書き禁止。写真をテンプレに渡すときは `photoPublicPath(id)` で変換(`public/photos/`プレフィックスを手で剥がさない) |
| `sceneRegistry.ts` | 全テンプレのメタデータ(ID/尺/出力先/透過区分) |
| `theme.ts` `fonts.ts` | デザイントークン |
| `routes.ts` `memories.ts` | 地図座標・写真カードデータ |
| `photoLibrary.generated.ts` | `pnpm sync:photos` の自動生成。手で編集しない |
| `aiPromptRegistry.ts` | AI生成のプロンプト履歴。assetIdに紐づけ、生成のたびに1レコード追加 |

## テンプレート追加の手順(必ず3点セット)

1. `src/compositions/` にシーンを作る(zodスキーマ+型+コンポーネントをexport)
2. `Root.tsx` に `<Composition>` を追加 — **defaultPropsは必ずオブジェクトリテラル**
3. `src/data/sceneRegistry.ts` にエントリ追加(ID/folder/尺/kind/output)
4. 検証: `pnpm typecheck && pnpm check`

## ハマりどころ(このセッションで実際に踏んだもの)

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
- chechスクリプトは `.mts` でNode 24の型ストリップ実行(`node --no-warnings scripts/x.mts`)
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
- **`開幕-全体確認`は順番・尺の確認専用**。完成見た目チェック用ではない。
  propsは代表値でRoot.tsxのdefaultPropsを完全反映しない。
  見た目の最終確認は個別テンプレのstill/renderで行う

## コマンド

```sh
pnpm dev                          # Remotion Studio
pnpm typecheck                    # tsc
pnpm check                        # check:motion + check:assets(コミット前に必ず)
pnpm render <テンプレID> <preset>  # preview / draft / final / prores
pnpm render --all final           # 一括書き出し
pnpm sync:photos                  # public/photos/ → photoLibrary.generated.ts
pnpm export                       # CapCut作業表CSV/MD + 素材不足表 + review.html
pnpm exec remotion compositions src/index.ts   # 全Compositionの健全性確認
pnpm exec remotion still <ID> /tmp/x.png --frame=N  # 静止画で見た目確認
```

## 検証のやり方

コード変更後は最低限:
1. `pnpm typecheck && pnpm check`
2. 影響したテンプレを `remotion still` でキーフレーム書き出して目視
3. 透過素材を触ったらffprobeでalpha確認

## 未決事項・人間待ち(2026-06-12時点)

- CapCutでのVP9透過WebM読み込み実機確認(`out/common/stamp_test_vp9.webm`)
- A案(82秒・スタンプ連打)/B案(全区間フル)の決断 — BGM決定待ち
- Hawaii実写真3枚(`assets.ts`でmissing)、BGM、会場仕様(画角・形式)
- 判断ログは `../docs/decisions/`、特に `2026-06-11-motion-studio.md`

## 文体・コミット

- ドキュメント・コミットメッセージは日本語
- ユーザーは審査役。見た目の判断(高級感・Style Bible適合)は必ずユーザーに確認する
