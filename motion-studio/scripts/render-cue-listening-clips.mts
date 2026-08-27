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

// Phase4 Golden Anchor候補(2026-08-27選定): 曲全体(intro〜final chorus/ending)に
// 分散した10箇所。ユーザー指示のHuman Verification順(「1.Golden Anchor候補→
// 2.60秒以降→3.3-hit→4.Critical Cue→...」)に対応するため、listening-review
// では他の優先度(confidenceScore)より先にこれらを最上位へ表示する。
// 選定根拠: intro/first vocal(P001)、chorus-1の3-hit family2件(P012/P013)、
// chorus-1climax付近60秒境界(P015)、post-60最高confidence(P017)、
// verse-2(P020)、chorus-2の3-hit family2件(P027/P028)、interlude手前(P029)、
// final chorus/ending(P030)。実際にGolden Anchor化されるのは、人間が
// apply-listening-verification.mtsでgoldenAnchor:trueとして確定した後のみ
// (ここではあくまで「優先的に確認すべき候補」の一覧)。
const GOLDEN_ANCHOR_CANDIDATE_CUE_IDS = new Set([
  'P001-ONSET',
  'P012-H01',
  'P013-H01',
  'P015-W01',
  'P017-W01',
  'P020-ONSET',
  'P027-H01',
  'P028-H03',
  'P029-ONSET',
  'P030-W01',
]);

type ClipEntry = {
  cueId: string;
  phraseId: string | null;
  sectionId: string | null;
  kind: string;
  text: string;
  designedSourceMs: number;
  timingSource: string;
  confidence: string | null;
  confidenceScore: number | null;
  analysisMethod: string | null;
  clipFile: string;
  clipStartSec: number;
  cueOffsetInClipSec: number;
  isGoldenAnchorCandidate: boolean;
  isCritical: boolean;
  is60sPlus: boolean;
  isLowConfidence: boolean;
  isUnverified: boolean;
};

// generate-critical-cue-report.mtsの「Critical」定義と揃える(syllable-hit /
// letterCue / confidenceScore<=0.2のphrase-onset)。定義を2箇所へ書くこと自体は
// 許容するが、判定基準がズレないよう同じ閾値・同じkind集合を使う。
const isCriticalEntry = (kind: string, confidenceScore: number | null): boolean =>
  kind === 'syllable-hit' || kind === 'letter-cue' || (kind === 'phrase-onset' && confidenceScore != null && confidenceScore <= 0.2);

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
      confidenceScore: c.confidenceScore,
      analysisMethod: c.analysisMethod,
      isGoldenAnchorCandidate: GOLDEN_ANCHOR_CANDIDATE_CUE_IDS.has(c.cueId),
      isCritical: isCriticalEntry(c.kind, c.confidenceScore),
      is60sPlus: effectiveMs >= 60000,
      isLowConfidence: c.confidenceScore != null && c.confidenceScore < 0.5,
      isUnverified: !c.verifiedByListening,
      ...clip,
    });
  }
}

// 2. StaRt letterCues(冒頭の文字組み立て、5件。LetterCueはconfidenceScoreを
// 持たない簡易schemaのため、beat-snap/estimatedを想定した固定値で代用する
// [聴取優先度の目安であり、VocalCueのconfidenceScoreと同一の算出根拠ではない])
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
      confidenceScore: c.timingSource === 'beat-snap' ? 0.4 : c.timingSource === 'estimated' ? 0.15 : null,
      analysisMethod: null,
      isGoldenAnchorCandidate: GOLDEN_ANCHOR_CANDIDATE_CUE_IDS.has(c.cueId),
      isCritical: isCriticalEntry('letter-cue', null),
      is60sPlus: effectiveMs >= 60000,
      isLowConfidence: c.timingSource === 'estimated',
      isUnverified: !c.verifiedByListening,
      ...clip,
    });
  }
}

// 聴取優先度(Phase10「Human Verification順」対応):
//   1. Golden Anchor候補(曲全体に分散した代表10箇所)を最優先で最上位に出す
//   2. その中でも/その他は、confidenceScoreが低い(=根拠が弱い)cueを上に出す
//   3. 同点は曲順(designedSourceMs)で安定させる
// 限られた聴取時間で「まず全体を代表する箇所→怪しいところ」の順に
// 確認できるようにするための並び順。
entries.sort((a, b) => {
  if (a.isGoldenAnchorCandidate !== b.isGoldenAnchorCandidate) return a.isGoldenAnchorCandidate ? -1 : 1;
  const ca = a.confidenceScore ?? 1;
  const cb = b.confidenceScore ?? 1;
  if (ca !== cb) return ca - cb;
  return a.designedSourceMs - b.designedSourceMs;
});
writeFileSync(manifestPath, JSON.stringify({masterId: master.masterId, masterRevision: master.revision, entries}, null, 2) + '\n');

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// data-*属性はfilterチェックボックス(client-side JS)から参照する。
// サーバサイド計算はここで完結させ、ブラウザ側はtrue/falseの読み取りだけにする
// (フィルタロジックの二重実装を避ける)。
const rowDataAttrs = (e: ClipEntry): string =>
  `data-critical="${e.isCritical}" data-post60="${e.is60sPlus}" data-lowconf="${e.isLowConfidence}" data-unverified="${e.isUnverified}" data-golden="${e.isGoldenAnchorCandidate}"`;
const rows = entries
  .map(
    (e) => `
  <tr ${rowDataAttrs(e)} style="${e.isGoldenAnchorCandidate ? 'background:rgba(244,201,93,0.12);' : ''}">
    <td>${e.isGoldenAnchorCandidate ? '⭐ ' : ''}${escapeHtml(e.cueId)}</td>
    <td>${(e.designedSourceMs / 1000).toFixed(3)}s</td>
    <td>${escapeHtml(e.kind)}</td>
    <td>${escapeHtml(e.text)}</td>
    <td>${escapeHtml(e.timingSource)}</td>
    <td style="color:${e.confidenceScore != null && e.confidenceScore < 0.5 ? '#f2a53f' : '#eee'}">${e.confidenceScore != null ? e.confidenceScore.toFixed(2) : ''}</td>
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
  .filters { display: flex; gap: 16px; flex-wrap: wrap; margin: 12px 0 16px; padding: 10px 12px; background: #1a1a1c; border-radius: 6px; }
  .filters label { font-size: 13px; cursor: pointer; user-select: none; }
  .filters input { margin-right: 4px; }
  #filterCount { color: #888; font-size: 12px; margin-left: 8px; }
  tr.hidden-by-filter { display: none; }
</style>
</head>
<body>
<h1>StaRt Wedding Edit — Cue聴取確認(masterId=${escapeHtml(master.masterId)} revision=${master.revision})</h1>
<p class="note">これはローカル専用の確認用HTML(Git管理外・著作権音源から切り出したクリップを含む)。
各行の音声を実際に聴いて、「設計時刻(クリップ内の再生位置)」がボーカル/アクセントと合っているか確認する。
ズレている場合は、cueIdと感じたズレ(ms、+は遅らせる/-は早める)を控えておき、
apply-listening-verification.mtsで反映する。<b>⭐印(黄色背景)の10行はGolden Anchor候補
(曲全体に分散した代表箇所)で最優先。それ以外はconfidenceScoreが低い行(オレンジ文字、
0.5未満)ほど根拠が弱いため上に並べている。時間が無い場合は⭐→オレンジの順で確認する。
⭐の行を確認してOKだった場合は、apply-listening-verification.mtsのdecisionへ
"goldenAnchor": trueを追加するとGolden Anchor(以後上書きされない基準点)として確定する。</b></p>
<div class="filters">
  <label><input type="checkbox" data-filter="critical" /> Critical(3-hit/letterCue/低confidence onset)</label>
  <label><input type="checkbox" data-filter="post60" /> 60s+</label>
  <label><input type="checkbox" data-filter="lowconf" /> Low Confidence(&lt;0.5)</label>
  <label><input type="checkbox" data-filter="unverified" /> Unverified</label>
  <label><input type="checkbox" data-filter="golden" /> Golden Anchor Candidate</label>
  <span id="filterCount"></span>
</div>
<table>
<thead><tr><th>cueId</th><th>設計秒</th><th>種別</th><th>text</th><th>timingSource</th><th>confidenceScore</th><th>再生</th></tr></thead>
<tbody id="cueRows">
${rows}
</tbody>
</table>
<script>
// フィルタは「チェックが1つも無ければ全行表示、1つ以上チェックされたら
// OR条件で該当行だけ表示」という単純な仕組み(複雑なquery builderは作らない)。
// 行データはサーバサイド(render-cue-listening-clips.mts)で計算済みのdata-*
// 属性をそのまま読むだけで、ここでフィルタ判定ロジックを再実装しない。
(function () {
  var checkboxes = Array.prototype.slice.call(document.querySelectorAll('.filters input[type=checkbox]'));
  var rows = Array.prototype.slice.call(document.querySelectorAll('#cueRows tr'));
  var countEl = document.getElementById('filterCount');
  function apply() {
    var active = checkboxes.filter(function (cb) { return cb.checked; }).map(function (cb) { return cb.getAttribute('data-filter'); });
    var shown = 0;
    rows.forEach(function (tr) {
      var visible = active.length === 0 || active.some(function (key) { return tr.getAttribute('data-' + key) === 'true'; });
      tr.classList.toggle('hidden-by-filter', !visible);
      if (visible) shown++;
    });
    countEl.textContent = shown + ' / ' + rows.length + ' 行表示中';
  }
  checkboxes.forEach(function (cb) { cb.addEventListener('change', apply); });
  apply();
})();
</script>
</body>
</html>
`,
);

console.log(`[render-cue-listening-clips] クリップ${entries.length}件を ${outDir} に生成。`);
console.log(`[render-cue-listening-clips] ブラウザで開いて聴取確認: ${htmlPath}`);
console.log('[render-cue-listening-clips] 聴取結果はcueId毎にlocal/analysis/start-wedding/listening-decisions.local.jsonへ記録し、');
console.log('  node --no-warnings scripts/apply-listening-verification.mts で反映する(未記載cueは一切変更しない)。');
