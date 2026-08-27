# StaRt Wedding Edit — Opening Production Status(TASK7)

Status: RECORD(この時点のスナップショット。再計測はGitHub/localの実測値を優先する)

## Timing / Sync(既存、変更なし)

```text
PIPELINE_SYNC_READY:       YES
CONTENT_SYNC_READY:        YES
VISUAL_SYNC_READY:         PARTIAL (3-hit familyのみvisual impact peak同期済み)
HUMAN_REVIEW_READY:        YES
VERIFIED:                  NO (人間の聴取確認0件)
FINAL_SYNC_VERIFIED:       NO
```

## Opening Production(新設)

```text
OPENING_MEDIA_SCHEMA_READY:    YES
OPENING_MEDIA_PREFLIGHT_READY: YES
OPENING_REAL_MEDIA_READY:      NO
OPENING_VISUAL_POLISH_READY:   PARTIAL
OPENING_TIMING_FROZEN:         NO
OPENING_FINAL_RENDER_READY:    NO
```

### 根拠

- **OPENING_MEDIA_SCHEMA_READY = YES**: `realMedia.ts`でrole+variantIndex方式の
  real media manifest型(assetId/kind/寸法/duration/orientation/focus/fit/
  status/sourceType/note)を定義済み。TimingMasterとは分離。
- **OPENING_MEDIA_PREFLIGHT_READY = YES**:
  `check-start-wedding-real-media-preflight.mts`が実行可能。manifest 0件でも
  正しく`MEDIA_BLOCKED`を返す(エラーではない)。
- **OPENING_REAL_MEDIA_READY = NO**: 実素材投入0件(`START_WEDDING_REAL_MEDIA`
  配列は空)。`docs/decisions/2026-08-27-real-media-collection-priority-list.md`
  のP0 role(HERO_WIDE/HERO_CLOSE/SEOUL_STREET/HAWAII_WARM)から着手する。
- **OPENING_VISUAL_POLISH_READY = PARTIAL**: 全30 phraseのVisual QA完了
  (`2026-08-27-b-clean-30-30-visual-qa-full.md`)、P017はA/B/C/D比較案まで
  準備済み(Final未選択)、P021はplaceholder資産起因として保留。bespoke
  格上げ候補7箇所の評価も完了(`2026-08-27-b-bespoke-remaining-candidates-
  evaluation.md`)が、実装は実素材投入後に持ち越し。
- **OPENING_TIMING_FROZEN = NO**: Human Review未実施のため。
- **OPENING_FINAL_RENDER_READY = NO**: real media・Timing freeze・P017確定の
  いずれも未完了のため。

## 現在のボトルネック(優先順)

1. **Human Review**(聴取確認、P017 A/B/C/D選択)— 人間にしかできない
2. **実Wedding素材投入**(P0: HERO_WIDE/HERO_CLOSE/SEOUL_STREET/HAWAII_WARM)
   — 人間にしかできない(写真・動画の選定)
3. 上記2つが揃ったら、Timing freeze → B案本制作 → main統合 → final render
   → DaVinci polish → venue delivery、の順に機械側が進められる

## 関連ドキュメント

- `docs/decisions/2026-08-27-start-wedding-real-media-slot-matrix.md`
- `docs/decisions/2026-08-27-real-media-collection-priority-list.md`
- `docs/decisions/2026-08-27-b-bespoke-remaining-candidates-evaluation.md`
- `docs/decisions/2026-08-27-main-conflict-inventory.md`
- `docs/decisions/2026-08-27-b-clean-30-30-visual-qa-full.md`
- `docs/decisions/2026-08-27-cue-count-truth.md`
