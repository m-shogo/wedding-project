// 回帰テスト: ChoreographyEvent.timeSecが、TimingMaster由来の値
// (importantWords[].accentSec / threeHitFrameSecs[] / phrase.startSec等)を
// そのまま参照しているか、変数を介した単純な参照か、値が存在しない場合の
// フォールバックであることを静的に検査する。
//
// 目的: choreography.ts(歌詞・カメラ・写真・レイアウトを1つのeventとして
// 束ねる共通データ構造)の層で、TimingMaster/resolveEffectiveCueTimeMs()経由
// で既に確定した実cue値に対し、この層が独自の定数offsetをこっそり
// 足し引きしていないかを検出する(offset architectureのP0要件
// 「二重適用を防止する」の、choreographyレイヤーへの適用漏れを防ぐ)。
//
// 手法: フルにTypeScript/JSXをASTパースする代わりに、このファイルの
// 記述スタイル(`timeSec: <expr>,`という単純な行)を前提とした軽量な
// 静的チェックを行う。`<expr>`が
//   - `<identifier>.accentSec` / `.startSec` / `.endSec` のような単純な
//     プロパティ参照(オプショナルチェイン可)
//   - ループ変数などの単純な識別子(例: `sec`)
//   - 上記を`??`で束ねたフォールバック式(値が存在しない場合の代替であり、
//     実cue値への加算ではないため許可する)
// のいずれかであればOKとし、`accentSec`/`startSec`/`endSec`等の直後に
// 数値定数を`+`/`-`する記述(隠れたoffset加算の兆候)を見つけたらエラーにする。
//
// 実行: node --no-warnings scripts/check-choreography-event-timing-consistency.mts

import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const choreographyPath = join(studioRoot, 'src/data/startWeddingEdit/choreography.ts');
const source = readFileSync(choreographyPath, 'utf8');

const errors: string[] = [];
const checked: string[] = [];

// `timeSec: <expr>,` を1行分だけ抽出する(このファイルの記述スタイルは
// 常に1行で完結しているため、改行/セミコロンをまたいだ誤マッチを防ぐ)。
const timeSecRegex = /timeSec:\s*([^,;\n]+)[,;]/g;
let match: RegExpExecArray | null;
while ((match = timeSecRegex.exec(source)) !== null) {
  const expr = match[1].trim();
  // 型定義側(`timeSec: number;`)はスキップ
  if (expr === 'number') continue;
  checked.push(expr);

  // 「accentSec」「startSec」「endSec」等の直後に数値の加減算がある場合、
  // 隠れたoffset加算とみなしエラーにする。
  // 例: `w.accentSec + 40` や `phrase.startSec - 0.1` を検出する。
  const hiddenOffsetPattern = /\.(accentSec|startSec|endSec|timeMs)\s*[+\-]\s*[\d.]/;
  if (hiddenOffsetPattern.test(expr)) {
    errors.push(`疑わしい記述(隠れたoffset加算の可能性): "timeSec: ${expr}"`);
    continue;
  }

  // `??`で分割し、両辺それぞれをチェックする(左辺=実cue参照、右辺=fallback)。
  const parts = expr.split('??').map((p) => p.trim());
  for (const part of parts) {
    // 単純なプロパティ参照(w.accentSec, finalWord.accentSec, phrase.startSec等)
    const isSimplePropertyAccess = /^[A-Za-z_$][\w$]*(\?\.[A-Za-z_$][\w$]*|\.[A-Za-z_$][\w$]*)*$/.test(part);
    // 単純な識別子(ループ変数等、例: sec)
    const isSimpleIdentifier = /^[A-Za-z_$][\w$]*$/.test(part);
    // fallback側の「フェーズ内の割合位置」計算(例: phrase.startSec + (phrase.endSec - phrase.startSec) * 0.15)。
    // これは「実cueが存在しない場合の推定位置」であり、実cue値への加算ではないため許可する。
    const isPhraseRatioFallback = /^phrase\.startSec\s*\+\s*\(phrase\.endSec\s*-\s*phrase\.startSec\)\s*\*\s*[\d.]+$/.test(part);
    if (!isSimplePropertyAccess && !isSimpleIdentifier && !isPhraseRatioFallback) {
      errors.push(`未知の式パターン(手動確認が必要): "timeSec: ${expr}" の一部 "${part}"`);
    }
  }
}

if (checked.length === 0) {
  console.error('❌ choreography.ts内にtimeSec:記述が1つも見つからなかった。正規表現が壊れているか、ファイルが変更された可能性がある。');
  process.exit(1);
}

console.log(`検査対象: choreography.ts内のtimeSec:記述 ${checked.length}箇所`);
for (const e of checked) console.log(`  ok: timeSec: ${e}`);

if (errors.length > 0) {
  console.error(`\n❌ choreography-event-timing-consistency: FAIL(${errors.length}件)`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('\n✅ choreography-event-timing-consistency OK(全timeSec記述がTimingMaster由来値の単純参照/正当なfallbackのみ。隠れたoffset加算は検出されなかった)');
console.log('注意: これは静的パターンチェックであり、実行時の値そのものを検証していない。実行時検証はrender QA/AVSyncTestで別途行う。');
