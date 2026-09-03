// 回帰テスト: previewLatencyOffsetMs(ブラウザ再生専用)とrenderPipelineOffsetMs
// (verified=trueになるまでrenderへ自動適用しない候補値)が、実際にrender/
// generated.tsへ渡る値の計算経路(TimingMaster定義ファイル自身と、それを
// 読み書きするツール群を除く)へ紛れ込んでいないかを静的に検査する。
//
// 背景: resolveEffectiveCueTimeMs()のdoc-comment(timingMaster.ts)は、
// この2つのoffsetを合成式に含めないことを明記しているが、TypeScriptの
// 型(Pick<...>で該当フィールドを渡さない)による静的防止だけでは、
// 将来別の関数やコンポーネントがaudio.previewLatencyOffsetMs /
// audio.renderPipelineOffsetMsを直接参照して独自に加算する経路を防げない。
// このcheckは「render truthに関わるファイル群」を明示的に列挙し、
// そこに両identifierの参照(コメント内の言及は除く)が一切無いことを
// 検証することで、その経路を塞ぐ。
//
// 許可されているファイル(このcheckの対象外。以下のいずれかに該当):
//   - src/data/startWeddingEdit/timingMaster.ts: 型/フィールド定義そのもの
//   - scripts/migrate-start-wedding-timing-master.mts: 初期candidate値の設定
//   - scripts/apply-av-sync-test-result.mts: 人間のAV同期テスト結果の反映
//   - scripts/check-start-wedding-timing-master.mts: このoffset自体の検証
//   - scripts/sync-start-wedding-timing-master.mts: コメントでの言及のみ
//     (実際にgenerated.tsへ書き出す値の計算には使っていない。値自体は
//     本checkの対象ファイル一覧でも別途検証する)
//
// 実行: node --no-warnings scripts/check-preview-offset-isolation.mts

import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

// render truthに関わる経路として明示的に監視するファイル。
// (このリストに新しいrender consumerを追加した場合は、ここにも追加すること)
const WATCHED_FILES = [
  'src/data/startWeddingEdit/generated.ts',
  'src/data/startWeddingEdit/choreography.ts',
  'src/motion-kit/startWeddingEdit/choreographedMoments.tsx',
  'src/motion-kit/startWeddingEdit/weddingLyricLine.tsx',
];

const FORBIDDEN_IDENTIFIERS = ['previewLatencyOffsetMs', 'renderPipelineOffsetMs'];

const errors: string[] = [];
const checked: string[] = [];

for (const relPath of WATCHED_FILES) {
  const fullPath = join(studioRoot, relPath);
  let source: string;
  try {
    source = readFileSync(fullPath, 'utf8');
  } catch {
    errors.push(`監視対象ファイルが見つからない(リネーム/削除された可能性): ${relPath}`);
    continue;
  }
  checked.push(relPath);
  for (const id of FORBIDDEN_IDENTIFIERS) {
    // コメント行(行頭が`//`または`*`のJSDoc継続行)は言及のみとして許可する。
    const lines = source.split('\n');
    lines.forEach((line, i) => {
      if (!line.includes(id)) return;
      const trimmed = line.trim();
      if (trimmed.startsWith('//') || trimmed.startsWith('*')) return;
      errors.push(`${relPath}:${i + 1}: 禁止identifier "${id}" がコメント外で使用されている(render truthへのpreview/render-pipeline offset混入の可能性): "${trimmed}"`);
    });
  }
}

if (checked.length !== WATCHED_FILES.length) {
  console.error(`❌ 監視対象ファイル${WATCHED_FILES.length}件のうち${checked.length}件しか検査できなかった。`);
  process.exit(1);
}

console.log(`検査対象: render truthファイル ${checked.length}件`);
for (const f of checked) console.log(`  ok(コメント外での参照なし): ${f}`);

if (errors.length > 0) {
  console.error(`\n❌ preview-offset-isolation: FAIL(${errors.length}件)`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('\n✅ preview-offset-isolation OK(previewLatencyOffsetMs/renderPipelineOffsetMsはrender truth経路のコード外に漏れていない)');
console.log('注意: これは静的grepベースの検査。timingMaster.ts自体の型/合成関数(resolveEffectiveCueTimeMs)側の保証と組み合わせて使う。');
