# StaRt Wedding Edit (start-129) — post-merge Visual QA

Date: 2026-09-03
Scope: `feature/start-129-three-showcases` マージ後の動作確認。Extended/Shortの正本には影響しない研究branch(`docs/task-board.md` の「StaRt Wedding Edit」節)。

## やったこと

1. マージ後に `pnpm prepare:start-129 && pnpm qa:start-129`（`motion-studio/scripts/render-start-129-qa-stills.mts`）を実行し、A/B/C 3案 × 各14 section境界 = 45枚のstillを `out/qa/start-129/` へ再render。
2. スクリプト自身が要求する「必ず目視してから完成と判断する(CI GREENだけで承認しない)」を実施。A/B/C各variantから序盤・中盤・終盤を抜き取り9枚を目視。
3. `A-038s-f1140.png`（1サビA境界）と `A-108s-f3240.png`（間奏2A境界）が共に真っ黒だったため、これが壊れたrenderかplaceholder焼き付きかを切り分けるため追加調査した。
   - `out/start-129-full/start129_A_clean.mp4`（8/25の古いexport）でも同時刻を確認したが、これは現行composition(`Start129-A-Guide`)と別物で比較材料にならなかった（歌詞スロット番号がQA stillと一致しない）。
   - 代わりに現行composition `src/index-start-129.ts` の `Start129-A-Guide` から、1140フレーム前後を1フレーム刻みでnode直renderし直した(`--frame=1128,1134,1140,1146,1152,1158`)。
   - ファイルサイズ比較で境界フレームだけ突出して小さい(17KB vs 前後470〜550KB)ことを確認し、実際に画像を目視した結果:
     - f1134(37.8s, section "1B"): 駅の実写ストック(`ESTACIÓN FRANCIA`)
     - f1140(38.0s): ほぼ純黒
     - f1146(38.2s, section "1サビA", 歌詞スロット09): 夕焼けビーチで肩を組むカップルのシルエット実写ストック
   - 前後のcontentは正常で、境界1フレームだけが黒 → **意図されたdip-to-black transitionであり、壊れたrenderではない**と判断した。Style Bible(`docs/02_style-bible.md`)が許容する「dip to black（意味がある場合）」に該当し、1サビ入りという意味のある境界に置かれている。

## 結論

- start-129のA/B/C 3案は、マージ後も正しくrenderされている。
- section境界の黒フレームは仕様(crossfade-through-black)であり、bugではない。
- 目視した範囲内(9/45 stills + 境界の追加6フレーム)で、compositing崩れ・文字化け・DEMO表記の欠落・アスペクト比異常は見つからなかった。
- 使用素材はPexels等のストック実写(デモ用、`DEMO / 正規歌詞・音源 未投入`のウォーターマーク付き)。人物が映っているが、これは新郎新婦ではなく汎用ストック素材であり、`docs/task-board.md` 記載の通りまだ本番承認素材ではない。

## 未確認のまま残っているもの

- 45枚全部の目視はしていない(9枚 + 追加6フレームのサンプリング)。
- 音声込みでの通し視聴によるhumanReviewRequired解消は未実施(このタスクはAIの範囲外。耳で聴く確認は人間のみ可能)。
- 歌詞30 phrase中、残り19 phraseの`verifiedByListening`確認も未実施(`/lyric-timing` Lyric Timing Studioで人間が行う)。

## 関連

- `docs/task-board.md` の「StaRt Wedding Edit」節
- `docs/decisions/2026-08-25-start-wedding-edit-scope-change.md`
- `motion-studio/scripts/render-start-129-qa-stills.mts`
- `motion-studio/src/index-start-129.ts`
