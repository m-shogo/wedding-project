// 「歌詞と動画演出が噛み合っているか」を人間が確認するための、
// 歌詞全文 + 秒数 + 各cueの検証状態 + 割り当てられたanimation familyを
// 1つの表にまとめたローカル専用referenceを作る。
//
// 出力はlocal/配下(Git管理外)。歌詞本文を含むため、コミットしない。
//
// 実行:
//   node --no-warnings scripts/render-lyric-timing-master-reference.mts
// 出力:
//   local/analysis/start-wedding/lyric-timing-master.local.html

import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {TimingMaster} from '../src/data/startWeddingEdit/timingMaster.ts';
import {resolveEffectiveCueTimeMs} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const localDir = join(studioRoot, 'local');
const masterPath = join(localDir, 'start-wedding-timing-master.local.json');
const outPath = join(localDir, 'analysis/start-wedding/lyric-timing-master.local.html');

if (!existsSync(masterPath)) {
  console.error('❌ masterが無い。');
  process.exit(1);
}
const master = JSON.parse(readFileSync(masterPath, 'utf8')) as TimingMaster;

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fmtSec = (ms: number) => (ms / 1000).toFixed(3) + 's';

const rows = master.phrases
  .map((p) => {
    const cueRows = p.cues
      .map((c) => {
        const t = resolveEffectiveCueTimeMs(c, p, master.audio);
        return `<tr class="cue-row ${c.verifiedByListening ? 'verified' : 'unverified'}">
          <td class="indent">${escapeHtml(c.cueId)}</td>
          <td>${escapeHtml(c.kind)}</td>
          <td>${escapeHtml(c.text)}</td>
          <td>${fmtSec(t)}</td>
          <td>${c.verifiedByListening ? '✅確認済み' : '未確認'}</td>
          <td>${c.cueOffsetMs !== 0 ? (c.cueOffsetMs > 0 ? '+' : '') + c.cueOffsetMs + 'ms補正' : ''}</td>
        </tr>`;
      })
      .join('\n');
    return `<tr class="phrase-row">
      <td colspan="2"><b>${escapeHtml(p.phraseId)}</b><br/><span class="section">${escapeHtml(p.sectionId)}</span></td>
      <td class="phrase-text"><b>${escapeHtml(p.text)}</b></td>
      <td>${fmtSec(p.startMs)} 〜 ${fmtSec(p.endMs)}</td>
      <td colspan="2" class="anim">演出: ${p.selectedAnimation ? escapeHtml(p.selectedAnimation) : '(未割当)'}</td>
    </tr>
    ${cueRows}`;
  })
  .join('\n');

mkdirSync(dirname(outPath), {recursive: true});
writeFileSync(
  outPath,
  `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<title>StaRt Wedding Edit — 歌詞×秒数×演出 マスター表(local専用)</title>
<style>
  body { font-family: -apple-system, sans-serif; margin: 24px; background: #111; color: #eee; }
  table { border-collapse: collapse; width: 100%; }
  td { border-bottom: 1px solid #2a2a2a; padding: 5px 10px; font-size: 13px; vertical-align: top; }
  .phrase-row td { background: #1d1d1f; padding-top: 10px; border-top: 2px solid #3a3a3a; }
  .phrase-text { font-size: 15px; }
  .section { color: #888; font-size: 11px; }
  .anim { color: #F4C95D; }
  .cue-row.verified td { color: #7CF29A; }
  .cue-row.unverified td { color: #999; }
  .indent { padding-left: 24px; }
  h1 { font-size: 18px; }
  p.note { color: #f2a53f; font-size: 13px; }
</style>
</head>
<body>
<h1>StaRt Wedding Edit — 歌詞×秒数×演出 マスター表</h1>
<p class="note">
  これはローカル専用の確認用HTML(Git管理外・歌詞本文を含む)。
  「歌詞の内容」と「その時刻に割り当てられた演出(animation)」が噛み合っているかを
  確認するための一覧。各フレーズの下に、実際の歌詞タイミングcueの詳細(緑=確認済み/灰=未確認)を並べている。
</p>
<table>
<thead><tr><th>phraseId</th><th></th><th>歌詞/内容</th><th>秒数</th><th></th><th></th></tr></thead>
<tbody>
${rows}
</tbody>
</table>
</body>
</html>
`,
);

console.log(`[render-lyric-timing-master-reference] 生成: ${outPath}`);
console.log(`[render-lyric-timing-master-reference] open ${outPath}`);
