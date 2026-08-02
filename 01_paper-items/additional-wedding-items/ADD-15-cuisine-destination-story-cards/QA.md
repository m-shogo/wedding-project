# ADD-15 — QA CONTRACT

Status: `CURRENT / READY`
Authority: GitHub `main`

## 1. Truth QA

- [ ] Model A / Model B / NOT_REQUIRED が正式決定されている
- [ ] 料理名・目的地名が正本と一致する
- [ ] 食材・産地・調理法を推測していない
- [ ] 国と料理の関係を誤認させない
- [ ] 二人の旅行歴・思い出を捏造していない
- [ ] 「本場」「伝統」「名物」などの断定に根拠がある

## 2. Allergen and safety QA

- [ ] アレルゲン表記の責任主体が明確
- [ ] 会場または提供元の正式表記と文字単位で照合した
- [ ] 独自の除外・要約・アイコン化をしていない
- [ ] カードが医療上の安全保証に見えない
- [ ] 詳細確認先が必要な場合、その案内が正式情報と一致する

## 3. Editorial QA

- [ ] 主見出し、短い本文、補助情報の順に自然に読める
- [ ] 本文を縮小してテンプレートへ押し込んでいない
- [ ] 1枚に複数の物語を詰め込みすぎていない
- [ ] 国旗・観光アイコン・旅行ステッカーの羅列になっていない
- [ ] 料理写真がない場合も余白と文字だけで成立する
- [ ] 11枚展開時、機械的な色違いコピーになっていない

## 4. Photography QA

- [ ] 写真の被写体・出典・利用許可が確認済み
- [ ] 実際に提供される料理を偽装するAI画像ではない
- [ ] 最終トリミングで必要解像度を満たす
- [ ] 料理名や本文を画像へ焼き込んでいない
- [ ] 明暗の強い写真でも文字コントラストが確保される
- [ ] 印刷色で料理が不自然に見えない

## 5. Print QA

- [ ] bleed 3 mm または印刷会社指定値
- [ ] safe area 5 mm 以上
- [ ] 100%実寸で本文と補助情報が読める
- [ ] 細線が印刷会社の最低線幅を満たす
- [ ] スタンド・ホルダーで重要情報が隠れない
- [ ] テーブル上で皿、グラス、装花、キャンドルの邪魔にならない
- [ ] 光沢紙・アクリル反射環境でも読める

## 6. Semantic and export QA

- [ ] semantic node名を維持している
- [ ] textはnative text、写真はreplaceable image fill
- [ ] `GROUP_PLACEHOLDER_NOT_FOR_EXPORT` が書き出し対象外
- [ ] TBD、仮文、ダミー料理名、仮アレルゲンが最終PDFに存在しない
- [ ] trim size、frame ID、export dateをevidenceへ記録
- [ ] screenshot QAの指摘と修正結果を記録

## Required screenshots

Figma実制作が許可された後に取得する。

1. card full frame at high resolution
2. 100% type/detail crop
3. bright-photo case or no-photo case
4. dark-photo case if photography is used
5. multiple-card family comparison
6. stand/holder obstruction simulation

## Completion rule

次のすべてが揃うまで`COMPLETED`としない。

- official copy lock
- screenshot QA
- evidence-driven correction pass
- actual-size proof
- Drive export/readback
- GitHub evidence record

Current result: `QA_CONTRACT_READY / EXECUTION_NOT_STARTED`
