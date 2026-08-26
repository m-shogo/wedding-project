// 人間の聴取確認を実際に可能にするための、cue単位の短い音声クリップ生成。
//
// これまでの実装は「聴取確認が必要」と繰り返し明記してきたが、実際に
// 聴取できる手段(Dashboard UI等)が存在しなかったため、verifiedByListeningは
// ずっと0件のままだった。フルのDashboard波形UIを一度に作るのではなく、
// まず最小限で本当に機能する手段として、各cueの前後を切り出したmp3クリップと、
// それをブラウザでそのまま再生確認できるローカルHTMLを生成する。
//
// 出力先はすべてlocal/配下(Git管理外)。著作権音源から切り出した音声を
// リポジトリへコミットしない(既存方針: 正規音源・派生音声はGit管理外)。
//
// 実行:
//   node --no-warnings scripts/render-cue-listening-clips.mts
// 出力:
//   local/analysis/start-wedding/listening-clips/<cueId>.mp3
//   local/analysis/start-wedding/listening-review.local.html  (ブラウザで開いて聴取)
//   local/analysis/start-wedding/listening-manifest.local.json (apply scriptが読む一覧)

import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {TimingMaster} from '../src/data/startWeddingEdit/timingMaster.ts';
import {resolveEffectiveCueTimeMs} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const localDir = join(studioRoot, 'local');
const masterPath = join(localDir, 'start-wedding-timing-master.local.json');
const outDir = join(localDir, 'analysis/start-wedding/listening-clips');
const htmlPath = join(localDir, 'analysis/start-wedding/listening-review.local.html');
const manifestPath = join(localDir, 'analysis/start-wedding/listening-manifest.local.json');

if (!existsSync(masterPath)) {
  console.error('❌ masterが無い。先に pnpm import:legacy-timing-master:apply を実行してください。');
  process.exit(1);
}
const master = JSON.parse(readFileSync(masterPath, 'utf8')) as TimingMaster;
const audioPath = join(localDir, 'audio', master.audio.fileName);
if (!existsSync(audioPath)) {
  console.error(`❌ 音源が見つからない: local/audio/${master.audio.fileName}`);
  process.exit(1);
}
mkdirSync(outDir, {recursive: true});

const WINDOW_BEFORE_SEC = 1.0;
const WINDOW_AFTER_SEC = 1.2;

type ClipEntry = {
  cueId: string;
  phraseId: string | null;
  sectionId: string | null;
  kind: string;
  text: string;
  designedSourceMs: number;
  timingSource: string;
  confidence: string | null;
  analysisMethod: string | null;
  clipFile: string;
  clipStartSec: number;
  cueOffsetInClipSec: number;
};

const entries: ClipEntry[] = [];

const extractClip = (cueId: string, atMs: number): {clipFile: string; clipStartSec: number; cueOffsetInClipSec: number} => {
  const atSec = atMs / 1000;
  const clipStartSec = Math.max(0, atSec - WINDOW_BEFORE_SEC);
  const clipDurationSec = WINDOW_BEFORE_SEC + WINDOW_AFTER_SEC;
  const fileName = `${cueId.replace(/[^A-Za-z0-9_-]/g, '_')}.mp3`;
  const outPath = join(outDir, fileName);
  execFileSync(
    'ffmpeg',
    ['-y', '-ss', String(clipStartSec), '-t', String(clipDurationSec), '-i', audioPath, '-ac', '2', '-b:a', '192k', outPath],
    {stdio: 'pipe'},
  );
  return {clipFile: fileName, clipStartSec, cueOffsetInClipSec: atSec - clipStartSec};
};

// 1. 歌詞ボーカルcue(phrase-onset/word-accent/syllable-hit)全73件
for (const p of master.phrases) {
  for (const c of p.cues) {
    const effectiveMs = resolveEffectiveCueTimeMs(c, p, master.audio);
    const clip = extractClip(c.cueId, effectiveMs);
    entries.push({
      cueId: c.cueId,
      phraseId: p.phraseId,
      sectionId: p.sectionId,
      kind: c.kind,
      text: c.text,
      designedSourceMs: effectiveMs,
      timingSource: c.timingSource,
      confidence: c.confidence,
      analysisMethod: c.analysisMethod,
      ...clip,
    });
  }
}

// 2. StaRt letterCues(冒頭の文字組み立て、5件)
for (const b of master.editorialBlocks) {
  for (const c of b.letterCues ?? []) {
    const effectiveMs = c.timeMs + master.audio.globalContentOffsetMs;
    const clip = extractClip(c.cueId, effectiveMs);
    entries.push({
      cueId: c.cueId,
      phraseId: null,
      sectionId: null,
      kind: 'letter-cue',
      text: c.text,
      designedSourceMs: effectiveMs,
      timingSource: c.timingSource,
      confidence: null,
      analysisMethod: null,
      ...clip,
    });
  }
}

entries.sort((a, b) => a.designedSourceMs - b.designedSourceMs);
writeFileSync(manifestPath, JSON.stringify({masterId: master.masterId, masterRevision: master.revision, entries}, null, 2) + '\n');

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rows = entries
  .map(
    (e) => `
  <tr>
    <td>${escapeHtml(e.cueId)}</td>
    <td>${(e.designedSourceMs / 1000).toFixed(3)}s</td>
    <td>${escapeHtml(e.kind)}</td>
    <td>${escapeHtml(e.text)}</td>
    <td>${escapeHtml(e.timingSource)}</td>
    <td>${e.confidence ?? ''}</td>
    <td>
      <audio controls preload="none" src="listening-clips/${e.clipFile}"></audio>
      <span style="color:#888;font-size:12px">(クリップ内 ${e.cueOffsetInClipSec.toFixed(2)}s地点が設計時刻)</span>
    </td>
  </tr>`,
  )
  .join('\n');

writeFileSync(
  htmlPath,
  `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<title>StaRt Wedding Edit — Cue聴取確認(local専用)</title>
<style>
  body { font-family: -apple-system, sans-serif; margin: 24px; background: #111; color: #eee; }
  table { border-collapse: collapse; width: 100%; }
  td, th { border-bottom: 1px solid #333; padding: 6px 10px; text-align: left; vertical-align: middle; font-size: 13px; }
  th { position: sticky; top: 0; background: #111; }
  audio { height: 30px; vertical-align: middle; }
  h1 { font-size: 18px; }
  p.note { color: #f2a53f; }
</style>
</head>
<body>
<h1>StaRt Wedding Edit — Cue聴取確認(masterId=${escapeHtml(master.masterId)} revision=${master.revision})</h1>
<p class="note">これはローカル専用の確認用HTML(Git管理外・著作権音源から切り出したクリップを含む)。
各行の音声を実際に聴いて、「設計時刻(クリップ内の再生位置)」がボーカル/アクセントと合っているか確認する。
ズレている場合は、cueIdと感じたズレ(ms、+は遅らせる/-は早める)を控えておき、
apply-listening-verification.mtsで反映する。</p>
<table>
<thead><tr><th>cueId</th><th>設計秒</th><th>種別</th><th>text</th><th>timingSource</th><th>confidence</th><th>再生</th></tr></thead>
<tbody>
${rows}
</tbody>
</table>
</body>
</html>
`,
);

console.log(`[render-cue-listening-clips] クリップ${entries.length}件を ${outDir} に生成。`);
console.log(`[render-cue-listening-clips] ブラウザで開いて聴取確認: ${htmlPath}`);
console.log('[render-cue-listening-clips] 聴取結果はcueId毎にlocal/analysis/start-wedding/listening-decisions.local.jsonへ記録し、');
console.log('  node --no-warnings scripts/apply-listening-verification.mts で反映する(未記載cueは一切変更しない)。');
