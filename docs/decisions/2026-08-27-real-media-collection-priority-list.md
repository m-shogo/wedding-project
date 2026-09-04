# StaRt Wedding Edit — 実素材収集優先リスト(TASK13)

Status: RECORD
Source: `docs/decisions/2026-08-27-start-wedding-real-media-slot-matrix.md`(role別サマリ)

同じ良い写真を意味のあるrepriseとして複数箇所で使うのはOK。単なる使い回し感に
なる場合はNG。素材数を必要以上に増やさない(role別に2〜4枚程度で十分)。

## P0 MUST(使用秒数が長い/使用回数が多いrole。これが無いと本編が成立しない)

| role | 用途 | 使用回数 | 合計必要秒数 | 推奨枚数目安 |
|---|---|---:|---:|---:|
| HERO_WIDE | 二人の代替。横長Hero、余白あり、後ろ姿・遠景中心 | 9 | 42.4s | 3〜4枚 |
| HERO_CLOSE | 表情・手元の寄り | 6 | 20.9s | 2〜3枚 |
| SEOUL_STREET | 都市の移動・夜景・横方向の流れ | 4 | 14.5s | 2枚 |
| HAWAII_WARM | 夕景・海辺・暖色の逆光 | 6 | 13.1s | 2枚 |

## P1 SHOULD(章の切り替わり・余白を作る役割)

| role | 用途 | 使用回数 | 合計必要秒数 | 推奨枚数目安 |
|---|---|---:|---:|---:|
| NEGATIVE_SPACE | 歌詞・日付を置ける安全な余白 | 4 | 11.0s | 2枚 |
| ARRIVAL_YOKOHAMA | 港・街・会場到着を連想させるwide | 2 | 8.0s | 1〜2枚 |
| DEPARTURE | 空港・駅・スーツケース・歩き出す足元 | 2 | 4.8s | 1〜2枚 |
| OKINAWA_WIDE | 海・水平線・風。match cut可能な水平線 | 2 | 4.8s | 1〜2枚 |

## P2 OPTIONAL(接続・質感素材。実写真が揃わなければplaceholder継続でも成立する)

| role | 用途 | 使用回数 | 合計必要秒数 | kind |
|---|---|---:|---:|---|
| BROLL_TEXTURE | 水面・紙・光と影の短い接続素材 | 2 | 4.4s | video |
| BROLL_WALK | 3〜5秒の歩行・移動の接続素材 | 2 | 3.8s | video |
| END_BREATH | 3秒静止でも成立する最終写真 | 1 | 3.6s | photo |
| DETAIL_HAND | 手・切符・地図・カメラ等のdetail | 1 | 1.8s | photo |
| MOVEMENT_LEFT_TO_RIGHT / MOVEMENT_RIGHT_TO_LEFT / VERTICAL_PORTRAIT | 現行B案storyboardでは未使用(0回)だが、role定義自体は存在 | 0 | 0s | - |

## AI生成素材について

このリストのP0/P1 roleは、原則実写真・実動画で埋める(Wedding OPは写真が
主役、effectは主役にしない、というプロジェクト全体方針に沿う)。

AI生成を検討してよいのはP2の`BROLL_TEXTURE`/`BROLL_WALK`のような
environment B-roll/abstract transitionのみで、かつ実素材previewを見て
弱いcutが確定した場合に限る。人物・犬のAI化は禁止(既存ルールのまま)。
現時点でAI動画量産は行っていない。

## 次のアクション

1. P0の4 role(HERO_WIDE/HERO_CLOSE/SEOUL_STREET/HAWAII_WARM)を最優先で収集
2. 収集後、`src/data/startWeddingEdit/realMedia.ts`の
   `START_WEDDING_REAL_MEDIA`へ`status: 'candidate'`として登録
3. `pnpm check:start-wedding-real-media-preflight`でcrop/focus/aspect QAを実行
4. 問題なければ人間が`status: 'approved'`へ昇格(AIは自動昇格させない)
