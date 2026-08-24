# StaRt section ⇄ Director Recipe Catalog mapping（Phase E）

日付: 2026-08-25
状態: 記録（研究トラック。Opening V1の正本ではない）

## 背景

Phase A (`movie-dashboard/src/data/directorRecipeCatalog.ts`) は97件の演出レシピを持ち、各レシピが
`recommendedStaRtSections` で14 sectionのどれかへ緩く紐づいている。この紐づけは「使えそうな候補群」までで、
実際に編集する時に「このsectionは何を最初に使い、何を避けるべきか」までは決めていなかった。

Phase B/CでMotion Kit presetとRemotion renderer、Phase Dでmovie-dashboard側の閲覧UIまでは揃ったが、
「section単位の設計図」が無いまま97件だけが並んでいる状態は、実制作で毎回97件を読み直すコストが高い。

## 決めたこと

`movie-dashboard/src/data/startSectionRecipeMap.ts` を新設し、14 section全てに対して以下を定義した。

- `primaryRecipeIds`（2〜4件）: そのsectionでまず使うレシピ
- `alternateRecipeIds`（1〜3件）: primaryが実写真/実素材に合わなかった時の代替
- `avoidRecipeIds`（理由付き）: 隣接sectionの`recommendedStaRtSections`には載っているが、
  そのsection単体では避けるべきレシピ。energy/densityのミスマッチ、他sectionとの反復回避、
  既存`startExtendedSections[].avoid`との整合を理由として明記した
- `energy` / `density`: `startExtendedSections`のenergy/densityをそのまま踏襲（二重管理を避けるため
  値を変えていない）
- `photoHoldSeconds`: 95BPM half-time grid基準（`startExtendedSongFacts.normalPhotoHold` / `heroPhotoHold`）
- `graphicDensityPolicy`: 190BPM micro accentをどの程度使うか
- `typographyLevel`: none〜title-lockの7段階
- `threeHitPolicy`: chorus-1-b / chorus-2-bの2sectionだけ非null。3-hitはHero写真を維持したまま
  stamp/line/route-dotで表現する既存方針をそのまま踏襲し、2回目(chorus-2-b)は「1回目より10〜20%だけ強く」
  という`startExtendedRhythmMap.ts`のLYRIC_029コメントを直接反映した
- `notes`: `startExtendedSections[].musicalRead` / `weddingDirection` との対応を明記

### avoidの設計方針

「何でも避けろ」ではなく、次の3パターンに絞って理由を書いた。

1. **energy/densityのミスマッチ**: 例) `rhythm-three-hit`はpeak専用アクセントなので、quiet/build/release系の
   section（opening-pickup, intro, verse-1-a, interlude-1, post-chorus-interlude-a/b, end-before-c-section）
   では全て avoid とした。
2. **同一文法の反復回避**: 例) verse-2-aでは`start-1a-photo-read` / `cam-restrained-push` /
   `photo-sequence-trio`をavoidにした。これは`startExtendedSections`の
   `weddingDirection`が「1番のコピーではなく、少し違う表情で戻る」「画面文法を更新」と明記しているため。
3. **既存avoid文言との直接抵触**: 例) chorus-1-aの`cut-source-whip`は`startExtendedSections`の
   `avoid: "サビ頭をtransitionの派手さで潰す"`と同じ失敗パターン。

## primary選定の考え方

各sectionの`musicalRead`と`weddingDirection`を起点に、`START_SPECIFIC`カテゴリのsection専用レシピ
（例: `start-chorus-hero-lift`, `start-triple-hit`）を必ずprimaryへ含め、そこに
`CINEMATIC_CAMERA` / `PHOTO_PRESENTATION` / `TRAVEL` / `WEDDING_EMOTION`から1〜2件を組み合わせた。
`recommendedStaRtSections`に載っていない組み合わせは作らず、Phase Aのタグ付けの範囲内で選んだ。

## やらなかったこと

- `directorRecipeCatalog.ts`の`status`フィールドは一切変更していない。全レシピ`status: "planned"`のまま。
- このファイル自体にstatus/approved相当の概念を持たせていない。primary/alternateに載ることと
  「採用確定」は別。実際の採用は人間が実写真previewを見て`directorRecipeCatalog.ts`側のstatusを
  個別に動かすことでのみ確定する。
- Palmier/DaVinci handoffファイルの自動生成（Phase F）は作っていない。
- Claude/Codex A/Bフレームワーク（Phase G）は作っていない。
- 歌詞全文、著作権音源、実在人物のAI生成は一切扱っていない。

## 検証

`movie-dashboard/scripts/verify-start-section-recipe-map-contracts.mjs` を新設し、以下を機械的に検証する。

- 14 section全てにmappingが存在する
- primary(1〜4件)・alternate(0〜3件)・avoidが参照するrecipeIdが`directorRecipeCatalog.ts`の実在97件に解決する
- primary/alternate/avoid間でIDが重複していない
- chorus-1-b / chorus-2-bだけ`threeHitPolicy`が非null、他は`null`
- energy/density/photoHoldSeconds/graphicDensityPolicy/typographyLevel/notesが全section分埋まっている
- このファイルがapproved/reviewedのようなstatus相当の値を持たない

`movie-dashboard`の`pnpm check:movie-coach`（CIの`movie-dashboard-ci.yml`が実行するチェーン）に
`check:start-section-recipe-map`として組み込んだ。

## UI

新規ページは作らず、Phase Dで追加済みの`movie-coach/director-recipes`画面（`DirectorRecipeCatalog.tsx`）に
「CATALOG」「SECTION MAP」の2タブを追加した。SECTION MAPタブでは14 sectionをアコーディオンで並べ、
primary/alternate/avoid（理由付き）・photo hold・graphic density・three-hit policy・notesを表示する。
既存のcatalogブラウジングUI（フィルタ・詳細パネル・render command copy）はそのまま残している。

## Phase Fへの引き継ぎ

- Palmier/DaVinci handoff生成を作る場合、`startSectionRecipeMap.ts`の`primaryRecipeIds`を
  そのままhandoff対象の初期候補として使える設計にしてある（`getSectionRecipeMapping(sectionId)`で
  1 section分のmappingを取得できる）。
- ただし「primaryに載っている=採用確定」ではない点を、Phase Fの実装でも引き続き守ること。
  `directorRecipeCatalog.ts`側のstatus昇格は人間確認が必須というPhase Aの原則を変えていない。
