# オープニングムービー CapCutタイムライン手順

motion-studioの素材を使ってCapCutでオープニングを組むための実務手順。
シーン構成の単一情報源は `motion-studio/src/data/openingProject.ts`。
汎用的なCapCut操作は `docs/capcut-operation.md` を見る。

## 役割分担

```text
Remotion (motion-studio)
→ 文字・数字・地図・ハンコ・カウントダウン・窓・雲海・扉の光

AI生成 (ComfyUI)
→ 実写質感の背景候補(空港ロビー等)。Remotion版と比較して良い方を採用

CapCut
→ BGM、SE、間(ま)、トランジション、テロップ微調整、最終書き出し
```

## 素材の置き場

```text
motion-studio/out/opening/   本編素材(MP4) と 透過ハンコ(WebM)
motion-studio/out/common/    透過雲、透過テスト
motion-studio/out/preview/   確認用の軽い書き出し
motion-studio/out/draft/     調整用1080p
```

CapCutへはコピー不要。out/ から直接Importする。
書き出しは `pnpm render <テンプレ名> final` または `pnpm render:xxx`(motion-studio/README.md参照)。

## トラック構成

```text
Track 8: BGM(最初に置く)
Track 7: SE(スタンプ音、ドア音など。任意)
Track 6: CapCutテロップ(Cabin crew... 等の文字微調整)
Track 5: photo_card_xxx.mp4
Track 4: stamp_xxx.webm(透過。ブレンド「乗算」推奨)
Track 3: cloud_overlay.webm(透過。不透明度50-70%)
Track 2: Remotion本編素材(搭乗券/地図/雲海/窓/扉/秒読)
Track 1: AI背景・実写真(必要な場所のみ)
```

## 組み立て手順

1. **BGMを置く**(Track 8)。盛り上がり・転調・サビ頭にマーカーを打つ。
2. **シーンの仮ブロックを置く**。順番と尺は `openingProject.ts` のscenes:

   | # | シーン | 素材 | 尺目安 |
   |---|--------|------|--------|
   | 1 | 搭乗券イントロ | boarding_pass_intro.mp4 | 8秒 |
   | 2 | 離陸・雲海 | cloud_sea.mp4(またはAI版) | 6秒 |
   | 3 | スタンプ連打ダイジェスト | stamp_rush_full_route.mp4 | 22秒 |
   | 4 | Hawaiiの写真解禁 | photo_card_hawaii.mp4 | 10秒 |
   | 5 | 最終区間の地図 | map_hawaii_to_yokohama.mp4 | 8秒 |
   | 6 | 扉の光・余韻 | door_light.mp4(またはAI版) | 12秒 |
   | 7 | 入場前カウントダウン | countdown_10sec.mp4 | 16秒 |

   合計約82秒+CapCutの間(ま)で調整。目標105秒との差はトランジションの余白、
   写真の追加、雲海の延長で吸収する。

3. **BGM合わせの要点**:
   - スタンプの「ポン」(素材再生開始から約0.3秒)をBGMの山に合わせる
   - `countdown_10sec.mp4` の数字は1秒ちょうど刻み。ビートの頭に合わせる
   - シーン3→4(写真解禁)はBGMが温かくなる位置に置く
   - シーン7の後は無音→入場曲。余韻を1-2秒残す
4. **透過素材を重ねる**: ハンコ(乗算)、雲(不透明度を下げる)。
   透過が黒く出る場合は `pnpm render <ID> prores` でMOV版を作って差し替える。
5. **テロップ微調整**(Track 6): 「Cabin crew, prepare for arrival.」等、
   Remotion素材に焼き込んでいない言葉はCapCutで乗せる。白文字・影少し・下中央。
6. **通しで見る**: `docs/10_quality-gates.md` のGate 1/2の観点でチェック。

## 最終書き出し

1. 素材を `pnpm render --all final` で高画質に書き出し直してから差し替える
2. 会場仕様(`docs/templates/venue-specs.csv`)に合わせた解像度・形式で書き出す
3. 出力先は `90_exports/`、命名は `opening-movie_vXXX_用途.mp4`
4. `docs/templates/export-checklist.csv` と `review-notes.csv` を記入
5. 上映版とSNS版は分ける(音源・写真の利用条件を確認)

## 品質チェック

組み込み前にmotion-studio側で:

```sh
pnpm check          # check:motion + check:assets + check:parts
```

- 素材ファイルの存在、シーン構成とテンプレの整合、尺の妥当性を機械チェックできる
- 写真やBGMが揃ったら `assets.ts` のstatusを制作段階に合わせて更新して再実行する
  （`missing → idea → prompt_ready → generated_preview → candidate → approved → final`。
  `candidate` 以上への昇格は人間確認が必須。AIが勝手に上げない）
