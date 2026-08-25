# StaRt Director Recipe — Post-Overnight Review Audit

Date: 2026-08-25
Reviewed main: `937921af4d93ef4f49f5e5860e851bf7f57d722c`
Scope: Phase A〜Iの実装・docs・CI方針を、Extended Opening authorityに照らして再レビュー。

## 結論

Phase A〜Iの基盤は有用で、97 recipe / 6 shared engine / 14 section map / Palmier-DaVinci handoff / A/B frameworkは継続利用してよい。

ただし「全部完成」という表現には3つ補足が必要。

1. 97 recipeは **data定義 + engine resolve** が完成したのであって、97種類すべての固有visualが忠実実装されたわけではない。
2. Movie Dashboardは検索・説明・render command導線まで。inlineで動画を見てFavorite/RejectするUXは未完成。
3. Claude/Codex A/Bは正規音源・実写真なし、Codex artifactなしなので、品質比較としては未成立。winner=nullが正しい。

## 良かった点

- 97個の独立Componentを作らず6 shared engineへ寄せた。
- Motion Kit → Recipe → StaRt sectionの参照関係が機械検証されている。
- 14 sectionのprimary/alternate 83 refsがrendererへresolveするcontractがある。
- lyrics本文や正規音源をGitへ入れていない。
- AIがwinner / approvedを勝手に決めないcontractがある。
- Claude/Codex用timelineを分離した。
- Codex render失敗を成功扱いしなかった。

## P0 — Authorityの逆転

`START-EXTENDED-MOTION-HANDOFF-2026-08-24.md` では:

- Extended Candidate = 本命方向
- Opening V1 = Short Candidate / fallback

がauthority。

一方Phase Hのoverview/reportには「Opening V1が本番正本・実写真11枚が最優先」という逆の記述があった。

これは今後agentが60秒版へ戻る原因になるため、current overviewをExtended authorityへ修正する。

## P0 — Generated MP4をGitへcommit

Phase Iで `motion-studio/exports/ab/claude/chorus1_ab.mp4` をforce-addしていた。

repoの既存policy:

- generated videoはGitへ入れない
- `out/` / artifact / local ignored outputを使う

と矛盾。

対応:

- committed MP4をbranchから削除
- A/B persistent comparison stateはartifact-freeへ戻す
- Claude review candidateはGitHub Actionsでrenderし、`start-ab-claude-chorus1` artifactとしてuploadする専用CIへ移す

## P1 — Renderable ≠ Visual Truth

`directorRecipeAdapter.ts` は97/97をresolveできるが、一部を意図的に近似している。

例:

- true 2.5D parallax → restrained push
- halftone / scribble / stamp系の一部 → generic triplet
- native cut → edit point placeholder

したがって今後はrecipeごとにvisual fidelityを明示する。

候補:

- `exact`
- `representative`
- `placeholder`

contractで全97件に付与し、Dashboardで表示する。

## P1 — 「見て選べる」UX

現Dashboardは:

- filter
- description
- section mapping
- render command copy

まで。

ユーザー要望は:

- 動画を見て選ぶ
- Favorite / Maybe / Reject
- 同じ素材で演出だけ比較

なので、次フェーズでpreview review UXを改善する。

## P1 — A/Bの公平性

Phase I Claude candidateはplaceholder映像・無音。
Codex candidateはChromium sandboxでrender失敗。

この状態はagent能力比較の証拠として不十分。

正規音源 + 同一実写真 + 両artifactが揃った後に初めて12軸採点する。

## 次フェーズ

### J1 Review integrity

- generated MP4をGitから撤去
- A/B review artifactをActionsへ
- Extended authorityをoverviewへ反映
- review findingsを正本化

### J2 Visual fidelity audit

- 全97 recipeへ `visualFidelity`
- approximation reason
- missing dedicated visual
- review priority

を付ける。

### J3 Visual implementation upgrade

優先して実物化:

1. true-ish 2.5D demo
2. scribble underline
3. halftone burst
4. distinct passport stamp
5. stamp → line → route dot true 3-hit
6. paired-shot cut / match-cut demo
7. foreground occlusion demo
8. anime impact frame / micro RGBの差別化

個別97 Componentにはしない。shared engine variantを増やす。

### J4 Review UX

- same-source comparison
- preview artifact / studio導線
- Favorite / Maybe / Rejectはhuman-controlled
- exact / representative / placeholder badge

## Final方針

Showcaseでは大量に試す。
Finalでは4〜8 motion familyへ削る。

StaRtの楽しさはeffect量ではなく:

`EXPECTATION → BUILD → HIT → PEAK → RELEASE`

と、Hero写真を読む時間・3-hit・静止との落差で作る。
