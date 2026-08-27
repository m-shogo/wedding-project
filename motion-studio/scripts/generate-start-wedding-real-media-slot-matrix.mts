// Real Media Slot Matrix生成(TASK2、2026-08-27)。
//
// B案(variant='B')のstoryboardを解析し、全shotについて何を撮る/探すべきかが
// 分かる一覧を作る。単なるasset一覧ではなく、role別のpurpose/aspect/尺を
// 明示することで、実素材収集の指示書として使えるようにする。
//
// 歌詞本文は一切参照しない(sectionId/roleのみ使用)。
//
// 実行: node --no-warnings scripts/generate-start-wedding-real-media-slot-matrix.mts

import {writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {start129AssetRoleSpec} from '../src/data/start129/assetRoles.ts';
import {weddingSectionDesign, weddingSections} from '../src/data/startWeddingEdit/storyboard.ts';
import {resolveDemoAsset} from '../src/data/start129/resolveDemoAsset.ts';
import {summarizeRealMediaStatus} from '../src/data/startWeddingEdit/realMedia.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outPath = join(studioRoot, '../docs/decisions/2026-08-27-start-wedding-real-media-slot-matrix.md');

const VARIANT = 'B' as const;

type Row = {
  sectionId: string;
  sectionLabelJa: string;
  shotIndex: number;
  role: string;
  variantIndex: number;
  kind: string;
  requiredSec: number;
  aspectHint: string;
  purposeJa: string;
  movementHint: string;
  currentPlaceholder: string;
  realAssetStatus: string;
};

const movementHintFor = (role: string): string => {
  if (role === 'MOVEMENT_LEFT_TO_RIGHT') return '左→右へ進む被写体(方向match用)';
  if (role === 'MOVEMENT_RIGHT_TO_LEFT') return '右→左へ進む被写体(対比・戻り用)';
  if (role === 'BROLL_WALK') return '歩行方向は問わないが安定した動き';
  return '-';
};

const rows: Row[] = [];
for (const section of weddingSections) {
  if (section.id === 'intro') continue; // introはStaRt文字組み立て専用、role/variantIndex方式ではない
  const design = weddingSectionDesign(VARIANT, section.id);
  design.shots.forEach((shot, i) => {
    const spec = start129AssetRoleSpec(shot.role);
    const demo = resolveDemoAsset(shot.role, shot.variantIndex);
    rows.push({
      sectionId: section.id,
      sectionLabelJa: section.labelJa,
      shotIndex: i,
      role: shot.role,
      variantIndex: shot.variantIndex,
      kind: spec.kind,
      requiredSec: shot.sec,
      aspectHint: spec.aspectHint,
      purposeJa: spec.purposeJa,
      movementHint: movementHintFor(shot.role),
      currentPlaceholder: demo.path ?? '(abstract placeholder)',
      realAssetStatus: 'missing', // real manifestが空の間は全件missing。real media追加後に自動でapproved等へ反映される設計にはまだしていない(TASK8以降)
    });
  });
}

const realSummary = summarizeRealMediaStatus();

const header = `| section | shot# | role | kind | 必要秒数 | aspect | 用途 | 移動方向 | 現状placeholder | real asset |
|---|---:|---|---|---:|---|---|---|---|---|`;
const body = rows
  .map(
    (r) =>
      `| ${r.sectionLabelJa}(${r.sectionId}) | ${r.shotIndex} | ${r.role} | ${r.kind} | ${r.requiredSec.toFixed(1)}s | ${r.aspectHint} | ${r.purposeJa} | ${r.movementHint} | ${r.currentPlaceholder} | ${r.realAssetStatus} |`,
  )
  .join('\n');

// role別サマリ(何種類・何秒必要か)
const byRole = new Map<string, {count: number; totalSec: number; kind: string; purposeJa: string; aspectHint: string}>();
for (const r of rows) {
  const cur = byRole.get(r.role) ?? {count: 0, totalSec: 0, kind: r.kind, purposeJa: r.purposeJa, aspectHint: r.aspectHint};
  cur.count++;
  cur.totalSec += r.requiredSec;
  byRole.set(r.role, cur);
}
const roleSummaryHeader = `| role | 使用回数 | 合計必要秒数 | kind | aspect | 用途 |\n|---|---:|---:|---|---|---|`;
const roleSummaryBody = Array.from(byRole.entries())
  .sort((a, b) => b[1].totalSec - a[1].totalSec)
  .map(([role, v]) => `| ${role} | ${v.count} | ${v.totalSec.toFixed(1)}s | ${v.kind} | ${v.aspectHint} | ${v.purposeJa} |`)
  .join('\n');

const md = `# StaRt Wedding Edit — Real Media Slot Matrix(B案、機械生成)

Status: GENERATED(再生成: \`node --no-warnings scripts/generate-start-wedding-real-media-slot-matrix.mts\`)
Scope: \`motion-studio/src/data/startWeddingEdit/storyboard.ts\` の variant='B'

歌詞本文は含まない(sectionId / role / phraseIdのみで参照)。TimingMasterとは独立
(このmatrixを変更してもphrase/cue timingは一切変わらない)。

## role別サマリ

${roleSummaryHeader}
${roleSummaryBody}

## 全shot一覧(B案、intro除く)

${header}
${body}

## Real Media Authority現状

\`\`\`text
manifest total entries: ${realSummary.totalEntries}
  missing:   ${realSummary.byStatus.missing}
  candidate: ${realSummary.byStatus.candidate}
  approved:  ${realSummary.byStatus.approved}
  final:     ${realSummary.byStatus.final}
role(s) with usable real media: ${realSummary.rolesWithRealMedia.length > 0 ? realSummary.rolesWithRealMedia.join(', ') : '(none yet)'}
\`\`\`

real media追加手順: \`src/data/startWeddingEdit/realMedia.ts\` の
\`START_WEDDING_REAL_MEDIA\` 配列へエントリを追加し(実ファイルは
\`public/real/start-wedding/<ROLE>/<file>\`へ配置、Git管理外)、
statusを\`approved\`または\`final\`にする。これにより
\`resolveWeddingMediaAsset()\`がdemo assetより先にreal assetを解決するように
なる(role/variantIndexの対応関係は変えない)。

## 既知の統合ギャップ

現時点でreal media解決(\`WeddingRealOrDemoBackdrop\`)は、
\`choreographedMoments.tsx\`(bespoke全画面takeoverの6 phrase)と
\`IntroNarrativeB.tsx\`(冒頭)にのみ配線済み。

**上記matrixの大半を占める通常shot(\`shotEngine.tsx\`の\`ShotRenderer\`経由、
Start129/Director Recipeとも共有される部品)にはまだreal media解決を
配線していない。** 理由: \`shotEngine.tsx\`はStart129/Director Recipe
研究表示とも共有されており、無関係な既存機能を壊すリスクがある大きめの
refactorになるため、今回は見送った。

次のステップ候補(実装はTASK8以降、今回は見送り):
\`ShotRenderer\`/\`shotEngine.tsx\`内の\`StartDemoBackdrop\`呼び出し箇所へ、
既定値が既存の\`resolveDemoAsset\`のままである\`assetResolver\`引数を追加し、
Wedding Edit側の呼び出し元だけ\`resolveWeddingMediaAsset\`を渡す、という
後方互換な拡張が安全に見える。
`;

writeFileSync(outPath, md);
console.log(`[generate-start-wedding-real-media-slot-matrix] ${rows.length}行を書き出し: ${outPath}`);
