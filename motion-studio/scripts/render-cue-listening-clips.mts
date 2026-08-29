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
const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
// data-*属性はfilterチェックボックス(client-side JS)から参照する。
// サーバサイド計算はここで完結させ、ブラウザ側はtrue/falseの読み取りだけにする
// (フィルタロジックの二重実装を避ける)。
const rowDataAttrs = (e: ClipEntry): string =>
  `data-cueid="${escapeAttr(e.cueId)}" data-critical="${e.isCritical}" data-post60="${e.is60sPlus}" data-lowconf="${e.isLowConfidence}" data-unverified="${e.isUnverified}" data-golden="${e.isGoldenAnchorCandidate}"`;
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
    <td class="judge-cell">
      <div class="judge-row">
        <button type="button" class="btn btn-ok" data-action="ok">👍 合ってる</button>
        <button type="button" class="btn btn-reject" data-action="reject">🤔 わからない</button>
      </div>
      <div class="judge-row">
        <span class="nudge-label">ズレてる場合、この行だけ↓を押す(押した分だけ足し引きされる)</span>
      </div>
      <div class="judge-row nudge-row">
        <button type="button" class="btn btn-nudge" data-delta="-50">-50</button>
        <button type="button" class="btn btn-nudge" data-delta="-25">-25</button>
        <button type="button" class="btn btn-nudge" data-delta="-10">-10</button>
        <span class="nudge-current" data-role="current">0ms</span>
        <button type="button" class="btn btn-nudge" data-delta="10">+10</button>
        <button type="button" class="btn btn-nudge" data-delta="25">+25</button>
        <button type="button" class="btn btn-nudge" data-delta="50">+50</button>
      </div>
      ${e.isGoldenAnchorCandidate ? '<div class="judge-row"><label class="golden-toggle"><input type="checkbox" data-role="golden" /> ⭐ 基準点として確定する</label></div>' : ''}
      <div class="judge-status" data-role="status">未確認</div>
    </td>
  </tr>`,
  )
  .join('\n');

const storageKey = `startWeddingListeningDecisions_${master.masterId}_r${master.revision}`;

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
  th { position: sticky; top: 0; background: #111; z-index: 2; }
  audio { height: 30px; vertical-align: middle; }
  h1 { font-size: 18px; }
  p.note { color: #f2a53f; }
  .filters { display: flex; gap: 16px; flex-wrap: wrap; margin: 12px 0 16px; padding: 10px 12px; background: #1a1a1c; border-radius: 6px; }
  .filters label { font-size: 13px; cursor: pointer; user-select: none; }
  .filters input { margin-right: 4px; }
  #filterCount { color: #888; font-size: 12px; margin-left: 8px; }
  tr.hidden-by-filter { display: none; }

  .howto { background: #1a1a1c; border: 1px solid #333; border-radius: 8px; padding: 16px 20px; margin: 16px 0 20px; }
  .howto h2 { font-size: 15px; margin: 0 0 8px; color: #fff; }
  .howto ol { margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.9; }
  .howto b { color: #F4C95D; }

  .toolbar { position: sticky; top: 0; z-index: 3; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; background: #191512; border: 1px solid #3a2f1f; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; }
  .toolbar input[type=text] { background: #0d0d0e; border: 1px solid #444; color: #eee; border-radius: 4px; padding: 5px 8px; font-size: 13px; }
  .toolbar .save-btn { background: #F4C95D; color: #1a1508; font-weight: 700; border: none; border-radius: 6px; padding: 8px 16px; font-size: 13px; cursor: pointer; }
  .toolbar .save-btn:hover { background: #ffd873; }
  #progressCount { font-size: 13px; color: #ccc; }
  #saveHint { font-size: 12px; color: #888; width: 100%; }

  .judge-cell { min-width: 260px; }
  .judge-row { margin-bottom: 4px; }
  .btn { border: 1px solid #444; background: #232323; color: #eee; border-radius: 5px; padding: 4px 9px; font-size: 12px; cursor: pointer; }
  .btn:hover { background: #333; }
  .btn-ok { border-color: #3a7a4a; }
  .btn-ok.active { background: #2f7a3f; border-color: #2f7a3f; color: #fff; }
  .btn-reject { border-color: #7a3a3a; }
  .btn-reject.active { background: #7a3232; border-color: #7a3232; color: #fff; }
  .btn-nudge.active { background: #7a5a1f; border-color: #7a5a1f; color: #fff; }
  .nudge-label { font-size: 11px; color: #888; }
  .nudge-row { display: flex; align-items: center; gap: 4px; }
  .nudge-current { display: inline-block; min-width: 44px; text-align: center; font-size: 12px; color: #F4C95D; font-weight: 700; }
  .golden-toggle { font-size: 12px; color: #F4C95D; cursor: pointer; }
  .judge-status { font-size: 12px; color: #888; margin-top: 4px; }
  .judge-status.is-ok { color: #7CF29A; }
  .judge-status.is-adjust { color: #F4C95D; }
  .judge-status.is-reject { color: #f2a53f; }
</style>
</head>
<body>
<h1>StaRt Wedding Edit — Cue聴取確認(masterId=${escapeHtml(master.masterId)} revision=${master.revision})</h1>
<p class="note">これはローカル専用の確認用HTML(Git管理外・著作権音源から切り出したクリップを含む)。</p>

<div class="howto">
  <h2>使い方(3ステップ)</h2>
  <ol>
    <li>各行の▶を押して聴く。クリップの<b>${WINDOW_BEFORE_SEC}秒後</b>あたりが「設計時刻」(歌詞・アクセントが来るはずの瞬間)。</li>
    <li>
      合っていたら <b>👍 合ってる</b>。<br/>
      ズレていたら、感じた分だけ <b>-50/-25/-10/+10/+25/+50</b> のボタンを押す(複数回押すと積み重なる。マイナス=もっと早く鳴ってほしい、プラス=もっと遅く鳴ってほしい)。<br/>
      よく分からない/違う音を指している場合は <b>🤔 わからない</b>。
    </li>
    <li>一通り終わったら、上の<b>「名前」欄に自分の名前</b>を入れて<b>「💾 保存する」</b>を押す。ファイルが1つダウンロードされるので、
      <code>local/analysis/start-wedding/listening-decisions.local.json</code> という名前でそのフォルダに保存する
      (ダウンロードダイアログで保存先を選べる場合はそこで直接指定、選べない場合はダウンロードフォルダから移動する)。</li>
  </ol>
  <p style="font-size:12px;color:#888;margin:10px 0 0;">
    ⭐印(黄色背景)の10行は曲全体を代表する最優先箇所。時間が無い場合は⭐だけでもOK。
    ⭐の行を「👍 合ってる」にした場合だけ、行の中の「⭐ 基準点として確定する」にもチェックすると、
    以後AIが上書きしない基準点(Golden Anchor)として確定する。<br/>
    全部を1回で終わらせる必要はない。保存を何度でも繰り返せる(前回チェックした分は自動的に覚えている)。
  </p>
</div>

<div class="toolbar">
  <label style="font-size:13px;">名前: <input type="text" id="verifiedByInput" placeholder="例: しょうご" /></label>
  <button type="button" class="save-btn" id="saveBtn">💾 保存する(ダウンロード)</button>
  <span id="progressCount"></span>
  <span id="saveHint"></span>
</div>

<div class="filters">
  <label><input type="checkbox" data-filter="critical" /> Critical(3-hit/letterCue/低confidence onset)</label>
  <label><input type="checkbox" data-filter="post60" /> 60s+</label>
  <label><input type="checkbox" data-filter="lowconf" /> Low Confidence(&lt;0.5)</label>
  <label><input type="checkbox" data-filter="unverified" /> Unverified</label>
  <label><input type="checkbox" data-filter="golden" /> Golden Anchor Candidate</label>
  <span id="filterCount"></span>
</div>
<table>
<thead><tr><th>cueId</th><th>設計秒</th><th>種別</th><th>text</th><th>timingSource</th><th>confidenceScore</th><th>再生</th><th>判定</th></tr></thead>
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

// 判定(OK/わからない/ズレ量/Golden Anchor)の記録。
// - localStorageへ常時保存するので、ページを閉じてもここまでの入力は消えない。
// - 「保存する」を押した時だけ、apply-listening-verification.mtsが読める
//   decisions.local.json形式のファイルをダウンロードする。
// - 何も押していない行は一切ファイルに含めない
//   (apply script側の「列挙されていないcueは変更しない」という安全設計と対応させる)。
(function () {
  var STORAGE_KEY = ${JSON.stringify(storageKey)};
  var NAME_KEY = 'startWeddingListeningVerifiedByName';

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }
  var state = loadState(); // cueId -> {status: 'ok'|'reject', deltaMs: number, golden: boolean}

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // localStorageが使えない環境でも判定操作自体は継続できるようにする(保存だけ効かない)
    }
    updateProgress();
  }

  function getEntry(cueId) {
    if (!state[cueId]) state[cueId] = {status: null, deltaMs: 0, golden: false};
    return state[cueId];
  }

  function renderRow(tr) {
    var cueId = tr.getAttribute('data-cueid');
    var entry = getEntry(cueId);
    var okBtn = tr.querySelector('.btn-ok');
    var rejectBtn = tr.querySelector('.btn-reject');
    var currentEl = tr.querySelector('[data-role=current]');
    var statusEl = tr.querySelector('[data-role=status]');
    var goldenInput = tr.querySelector('[data-role=golden]');

    okBtn.classList.toggle('active', entry.status === 'ok');
    rejectBtn.classList.toggle('active', entry.status === 'reject');
    currentEl.textContent = (entry.deltaMs > 0 ? '+' : '') + entry.deltaMs + 'ms';
    if (goldenInput) goldenInput.checked = !!entry.golden;

    if (entry.status === 'ok' && entry.deltaMs !== 0) {
      statusEl.textContent = '判定: 合ってる(' + (entry.deltaMs > 0 ? '+' : '') + entry.deltaMs + 'ms補正)' + (entry.golden ? ' ⭐基準点' : '');
      statusEl.className = 'judge-status is-adjust';
    } else if (entry.status === 'ok') {
      statusEl.textContent = '判定: 合ってる' + (entry.golden ? ' ⭐基準点' : '');
      statusEl.className = 'judge-status is-ok';
    } else if (entry.status === 'reject') {
      statusEl.textContent = '判定: わからない/違う';
      statusEl.className = 'judge-status is-reject';
    } else {
      statusEl.textContent = '未確認';
      statusEl.className = 'judge-status';
    }
  }

  function updateProgress() {
    var done = Object.keys(state).filter(function (k) { return state[k].status === 'ok' || state[k].status === 'reject'; }).length;
    document.getElementById('progressCount').textContent = '判定済み: ' + done + ' / ' + rowsAll.length + '件(自動的に保存されています)';
  }

  var rowsAll = Array.prototype.slice.call(document.querySelectorAll('#cueRows tr'));
  rowsAll.forEach(function (tr) {
    var cueId = tr.getAttribute('data-cueid');

    tr.querySelector('.btn-ok').addEventListener('click', function () {
      var entry = getEntry(cueId);
      entry.status = entry.status === 'ok' ? null : 'ok';
      renderRow(tr);
      saveState();
    });
    tr.querySelector('.btn-reject').addEventListener('click', function () {
      var entry = getEntry(cueId);
      entry.status = entry.status === 'reject' ? null : 'reject';
      renderRow(tr);
      saveState();
    });
    Array.prototype.slice.call(tr.querySelectorAll('.btn-nudge')).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var entry = getEntry(cueId);
        entry.deltaMs += parseInt(btn.getAttribute('data-delta'), 10);
        // ズレ補正ボタンを押した時点で「合ってる(補正込み)」扱いへ自動的に進める
        // (別途OKを押す手間を無くす)。わからない状態からでも補正すれば判定済みになる。
        if (entry.status !== 'reject') entry.status = 'ok';
        renderRow(tr);
        saveState();
      });
    });
    var goldenInput = tr.querySelector('[data-role=golden]');
    if (goldenInput) {
      goldenInput.addEventListener('change', function () {
        var entry = getEntry(cueId);
        entry.golden = goldenInput.checked;
        renderRow(tr);
        saveState();
      });
    }
    renderRow(tr);
  });
  updateProgress();

  var nameInput = document.getElementById('verifiedByInput');
  try {
    nameInput.value = localStorage.getItem(NAME_KEY) || '';
  } catch (e) {}
  nameInput.addEventListener('input', function () {
    try { localStorage.setItem(NAME_KEY, nameInput.value); } catch (e) {}
  });

  document.getElementById('saveBtn').addEventListener('click', function () {
    var verifiedBy = nameInput.value.trim();
    var hintEl = document.getElementById('saveHint');
    if (!verifiedBy) {
      hintEl.textContent = '⚠️ 「名前」を入力してから保存してください。';
      hintEl.style.color = '#f2a53f';
      nameInput.focus();
      return;
    }
    var decisions = [];
    Object.keys(state).forEach(function (cueId) {
      var e = state[cueId];
      if (e.status === 'ok') {
        var d = {cueId: cueId, status: e.deltaMs !== 0 ? 'adjust' : 'ok'};
        if (e.deltaMs !== 0) d.deltaMs = e.deltaMs;
        if (e.golden) d.goldenAnchor = true;
        decisions.push(d);
      } else if (e.status === 'reject') {
        decisions.push({cueId: cueId, status: 'reject'});
      }
    });
    if (decisions.length === 0) {
      hintEl.textContent = '⚠️ まだ判定した行が0件です。行の👍か🤔を押してから保存してください。';
      hintEl.style.color = '#f2a53f';
      return;
    }
    var payload = {verifiedBy: verifiedBy, decisions: decisions};
    var blob = new Blob([JSON.stringify(payload, null, 2) + '\\n'], {type: 'application/json'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'listening-decisions.local.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    hintEl.style.color = '#7CF29A';
    hintEl.textContent = '✅ ' + decisions.length + '件を書き出しました。ダウンロードされたファイルを local/analysis/start-wedding/listening-decisions.local.json として保存してください。その後ターミナルで pnpm apply:listening-verification → pnpm sync:timing-master を実行すると反映されます。';
  });
})();
</script>
</body>
</html>
`,
);

console.log(`[render-cue-listening-clips] クリップ${entries.length}件を ${outDir} に生成。`);
console.log(`[render-cue-listening-clips] ブラウザで開いて聴取確認: ${htmlPath}`);
console.log('[render-cue-listening-clips] ページ内の👍/🤔/±msボタンで判定 → 「保存する」でJSONをダウンロード。');
console.log('[render-cue-listening-clips] ダウンロードしたファイルを local/analysis/start-wedding/listening-decisions.local.json として保存後、');
console.log('  pnpm apply:listening-verification → pnpm sync:timing-master の順で反映する。');
