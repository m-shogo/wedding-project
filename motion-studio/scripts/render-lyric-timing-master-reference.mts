// 「歌詞と動画演出が噛み合っているか」「音声と歌詞のズレを文脈込みで判断したい」
// という要望に応えるための、歌詞全文 + 秒数 + 演出 + フレーズ単位の音声
// (直前1秒を含み、次フレーズ開始前で終了) + cue単位の判定UIを1枚にまとめた
// ローカル専用reference。
//
// listening-review.local.html(cue単位の短いクリップ)と役割は重なるが、こちらは
// 「フレーズ全体を通しで聴きながら、その中の各cueを判定する」ための画面。
// 判定状態は同じlocalStorageキーを共有するため、どちらのページで判定しても
// 同じ「まとめ」「保存」に合流する(二重管理にしない)。
//
// 出力はlocal/配下(Git管理外)。歌詞本文・切り出し音声を含むため、コミットしない。
//
// 実行:
//   node --no-warnings scripts/render-lyric-timing-master-reference.mts
// 出力:
//   local/analysis/start-wedding/lyric-phrase-clips/<phraseId>.mp3
//   local/analysis/start-wedding/lyric-timing-master.local.html

import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {TimingMaster} from '../src/data/startWeddingEdit/timingMaster.ts';
import {resolveEffectiveCueTimeMs} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const localDir = join(studioRoot, 'local');
const masterPath = join(localDir, 'start-wedding-timing-master.local.json');
const clipsDir = join(localDir, 'analysis/start-wedding/lyric-phrase-clips');
const outPath = join(localDir, 'analysis/start-wedding/lyric-timing-master.local.html');

if (!existsSync(masterPath)) {
  console.error('❌ masterが無い。');
  process.exit(1);
}
const master = JSON.parse(readFileSync(masterPath, 'utf8')) as TimingMaster;
const audioPath = join(localDir, 'audio', master.audio.fileName);
if (!existsSync(audioPath)) {
  console.error(`❌ 音源が見つからない: local/audio/${master.audio.fileName}`);
  process.exit(1);
}
mkdirSync(clipsDir, {recursive: true});

// ▶再生用のフル音源(render-cue-listening-clips.mtsと同じファイル)。
// このscript単体で実行された場合でも動くよう、ここでも生成する
// (実行順に依存しない)。
const fullSongPath = join(dirname(outPath), 'full-song.local.mp3');
execFileSync('ffmpeg', ['-y', '-i', audioPath, '-ac', '2', '-b:a', '160k', fullSongPath], {stdio: 'pipe'});

// フレーズの前後にこれだけ文脈を足す。「前後もあってどこまでずらすか分からない」
// というフィードバックに対応するため、cue単位クリップ(1.0/1.2秒)より広く取る。
const PHRASE_PAD_BEFORE_SEC = 1.0;
const PHRASE_PAD_AFTER_SEC = 1.0;

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const fmtSec = (ms: number) => (ms / 1000).toFixed(3) + 's';

const phraseClips = master.phrases.map((p, phraseIndex) => {
  const clipStartSec = Math.max(0, p.startMs / 1000 - PHRASE_PAD_BEFORE_SEC);
  const paddedEndSec = p.endMs / 1000 + PHRASE_PAD_AFTER_SEC;
  const nextPhrase = master.phrases[phraseIndex + 1];
  // 次の歌詞が確認クリップへ入ると、現在のphraseの終端と取り違えやすい。
  // 後余白は次phrase開始までに限定し、最低でも現在phraseの宣言endまでは残す。
  const clipEndSec = nextPhrase
    ? Math.max(p.endMs / 1000, Math.min(paddedEndSec, nextPhrase.startMs / 1000))
    : paddedEndSec;
  const clipDurationSec = Math.max(0.1, clipEndSec - clipStartSec);
  const fileName = `${p.phraseId.replace(/[^A-Za-z0-9_-]/g, '_')}.mp3`;
  const outFile = join(clipsDir, fileName);
  execFileSync(
    'ffmpeg',
    ['-y', '-ss', String(clipStartSec), '-t', String(clipDurationSec), '-i', audioPath, '-ac', '2', '-b:a', '192k', outFile],
    {stdio: 'pipe'},
  );
  return {phraseId: p.phraseId, clipFile: fileName, clipStartSec};
});
const phraseClipByPhraseId = new Map(phraseClips.map((c) => [c.phraseId, c]));

const rows = master.phrases
  .map((p) => {
    const clip = phraseClipByPhraseId.get(p.phraseId)!;
    const cueRows = p.cues
      .map((c) => {
        const t = resolveEffectiveCueTimeMs(c, p, master.audio);
        const offsetInClipSec = t / 1000 - clip.clipStartSec;
        return `<tr class="cue-row" data-cueid="${escapeAttr(c.cueId)}" data-designoffset="${offsetInClipSec}" data-clipsrc="lyric-phrase-clips/${escapeAttr(clip.clipFile)}" data-text="${escapeAttr(c.text)}" data-designedsec="${(t / 1000).toFixed(3)}">
          <td class="indent">${escapeHtml(c.cueId)}</td>
          <td>${escapeHtml(c.kind)}</td>
          <td>${escapeHtml(c.text)}</td>
          <td>${fmtSec(t)}</td>
          <td class="judge-cell">
            <div class="judge-row nudge-row">
              <button type="button" class="btn btn-nudge btn-nudge-big" data-delta="-300">⏪⏪</button>
              <button type="button" class="btn btn-nudge" data-delta="-50">⏪</button>
              <span class="nudge-current" data-role="current">ズレなし</span>
              <button type="button" class="btn btn-nudge" data-delta="50">⏩</button>
              <button type="button" class="btn btn-nudge btn-nudge-big" data-delta="300">⏩⏩</button>
              <button type="button" class="btn btn-check" data-action="check">▶再生</button>
            </div>
            <div class="judge-row">
              <button type="button" class="btn btn-ok" data-action="ok">👍</button>
              <button type="button" class="btn btn-wrong" data-action="wrong">❌</button>
              <button type="button" class="btn btn-reject" data-action="reject">🤔</button>
              <button type="button" class="btn btn-reset" data-action="reset">↺</button>
            </div>
            <textarea class="note-input" data-role="note" rows="1" placeholder="メモ(任意)"></textarea>
            <div class="judge-status" data-role="status">未確認</div>
          </td>
        </tr>`;
      })
      .join('\n');
    return `<tr class="phrase-row">
      <td colspan="2"><b>${escapeHtml(p.phraseId)}</b><br/><span class="section">${escapeHtml(p.sectionId)}</span></td>
      <td class="phrase-text"><b>${escapeHtml(p.text)}</b></td>
      <td>${fmtSec(p.startMs)} 〜 ${fmtSec(p.endMs)}</td>
      <td class="anim">
        演出: ${p.selectedAnimation ? escapeHtml(p.selectedAnimation) : '(未割当)'}<br/>
        <audio controls preload="none" src="lyric-phrase-clips/${escapeAttr(clip.clipFile)}"></audio>
        <span class="hint">(直前${PHRASE_PAD_BEFORE_SEC}秒を含み、次フレーズ開始前で終了)</span>
      </td>
    </tr>
    ${cueRows}`;
  })
  .join('\n');

const storageKey = `startWeddingListeningDecisions_${master.masterId}_r${master.revision}`;

writeFileSync(
  outPath,
  `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<title>StaRt Wedding Edit — 歌詞×秒数×演出 マスター表(local専用)</title>
<style>
  body { font-family: -apple-system, sans-serif; margin: 24px; padding-bottom: 64px; background: #111; color: #eee; }
  table { border-collapse: collapse; width: 100%; }
  td { border-bottom: 1px solid #2a2a2a; padding: 5px 10px; font-size: 13px; vertical-align: top; }
  .phrase-row td { background: #1d1d1f; padding-top: 10px; border-top: 2px solid #3a3a3a; }
  .phrase-text { font-size: 15px; }
  .section { color: #888; font-size: 11px; }
  .anim { color: #F4C95D; min-width: 240px; }
  .anim audio { height: 28px; vertical-align: middle; }
  .anim .hint { display: block; color: #888; font-size: 11px; }
  .indent { padding-left: 24px; }
  h1 { font-size: 18px; }
  p.note { color: #f2a53f; font-size: 13px; }

  .howto { background: #1a1a1c; border: 1px solid #333; border-radius: 8px; padding: 14px 18px; margin: 16px 0 20px; font-size: 13px; line-height: 1.8; }
  .howto b { color: #F4C95D; }

  .toolbar { position: sticky; top: 0; z-index: 3; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; background: #191512; border: 1px solid #3a2f1f; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; }
  .toolbar input[type=text] { background: #0d0d0e; border: 1px solid #444; color: #eee; border-radius: 4px; padding: 5px 8px; font-size: 13px; }
  .toolbar .save-btn { background: #F4C95D; color: #1a1508; font-weight: 700; border: none; border-radius: 6px; padding: 8px 16px; font-size: 13px; cursor: pointer; }
  #progressCount { font-size: 13px; color: #ccc; }
  #saveHint { font-size: 12px; color: #888; width: 100%; }

  .judge-cell { min-width: 220px; }
  .judge-row { margin-bottom: 3px; display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
  .btn { border: 1px solid #444; background: #232323; color: #eee; border-radius: 5px; padding: 3px 8px; font-size: 12px; cursor: pointer; }
  .btn:hover { background: #333; }
  .btn-ok { border-color: #3a7a4a; }
  .btn-ok.active { background: #2f7a3f; border-color: #2f7a3f; color: #fff; }
  .btn-wrong { border-color: #a33; }
  .btn-wrong.active { background: #a33; border-color: #a33; color: #fff; }
  .btn-reject { border-color: #7a3a3a; }
  .btn-reject.active { background: #7a3232; border-color: #7a3232; color: #fff; }
  .btn-nudge.active { background: #7a5a1f; border-color: #7a5a1f; color: #fff; }
  .btn-nudge-big { font-weight: 700; border-color: #8a4a2f; }
  .btn-nudge-big.active { background: #8a4a2f; border-color: #8a4a2f; }
  .btn-reset { border-color: #555; color: #aaa; }
  .btn-check { border-color: #3a5a7a; font-weight: 700; }
  .nudge-current { min-width: 140px; text-align: center; font-size: 11px; color: #F4C95D; font-weight: 700; }
  .note-input { width: 100%; box-sizing: border-box; background: #0d0d0e; border: 1px solid #444; color: #eee; border-radius: 4px; padding: 3px 6px; font-size: 12px; font-family: inherit; margin-top: 3px; }
  .judge-status { font-size: 11px; color: #888; margin-top: 3px; }
  .judge-status.is-ok { color: #7CF29A; }
  .judge-status.is-adjust { color: #F4C95D; }
  .judge-status.is-reject { color: #f2a53f; }

  .summary-box { background: #14201a; border: 1px solid #2f4a3a; border-radius: 8px; padding: 12px 14px; margin-bottom: 14px; }
  .summary-box h2 { font-size: 14px; margin: 0 0 6px; color: #9CF2B0; }
  .summary-box textarea { width: 100%; box-sizing: border-box; min-height: 120px; background: #0d0d0e; border: 1px solid #2f4a3a; color: #dcefe0; border-radius: 6px; padding: 8px 10px; font-size: 12px; font-family: ui-monospace, monospace; line-height: 1.6; }
  .summary-box .summary-actions { margin-top: 8px; display: flex; align-items: center; gap: 10px; }
  .summary-box .copy-btn { background: #2f7a4a; color: #fff; border: none; border-radius: 5px; padding: 6px 12px; font-size: 12px; cursor: pointer; }
  .summary-box #copyHint { font-size: 12px; color: #7CF29A; }

  .floating-bar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 10; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; background: #191512; border-top: 1px solid #3a2f1f; padding: 10px 20px; box-shadow: 0 -4px 12px rgba(0,0,0,0.4); }
  .floating-bar .save-btn { background: #F4C95D; color: #1a1508; font-weight: 700; border: none; border-radius: 6px; padding: 8px 16px; font-size: 13px; cursor: pointer; }
  .floating-bar .copy-btn { background: #2f7a4a; color: #fff; border: none; border-radius: 5px; padding: 8px 14px; font-size: 13px; cursor: pointer; }
  .floating-bar span { font-size: 12px; color: #ccc; }
  #saveHintFloating { color: #7CF29A; }
</style>
</head>
<body>
<h1>StaRt Wedding Edit — 歌詞×秒数×演出 マスター表</h1>
<p class="note">
  これはローカル専用の確認用HTML(Git管理外・歌詞本文と切り出し音声を含む)。
</p>

<div class="howto">
  <b>使い方:</b> 各フレーズの音声(直前${PHRASE_PAD_BEFORE_SEC}秒を含み、次フレーズ開始前で終了)を▶で聴きながら、
  その中の各cue行を判定する。判定は<b>listening-review.local.htmlと共通</b>なので、
  どちらのページでやっても同じ「まとめ」「保存」に合流する。<br/>
  行ごとに: ⏪⏪/⏪/⏩/⏩⏩でズレを合わせて▶再生 → 👍(合ってる)/❌(合ってない)/🤔(わからない)。
</div>

<div class="toolbar">
  <label style="font-size:13px;">名前: <input type="text" id="verifiedByInput" placeholder="例: しょうご" /></label>
  <button type="button" class="save-btn" id="saveBtn">💾 保存する(ダウンロード)</button>
  <span id="progressCount"></span>
  <span id="saveHint"></span>
</div>

<div class="summary-box">
  <h2>📝 修正まとめ(自動作成・コピーしてClaudeに貼れます)</h2>
  <textarea id="summaryPromptArea" readonly></textarea>
  <div class="summary-actions">
    <button type="button" class="copy-btn" id="copySummaryBtn">📋 全部コピーする</button>
    <span id="copyHint"></span>
  </div>
</div>

<table>
<thead><tr><th>phraseId</th><th></th><th>歌詞/内容</th><th>秒数</th><th>判定</th></tr></thead>
<tbody id="cueRows">
${rows}
</tbody>
</table>

<div class="floating-bar" id="floatingBar">
  <span id="progressCountFloating"></span>
  <button type="button" class="save-btn" id="saveBtnFloating">💾 保存する</button>
  <button type="button" class="copy-btn" id="copySummaryBtnFloating">📋 まとめをコピー</button>
  <span id="saveHintFloating"></span>
</div>

<script>
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
  var state = loadState();

  // 補正込みの実際の時刻から、フル音源をそのまま再生する(クリック音方式は
  // 「歌がその分ズレて聞こえない」という指摘を受けて廃止)。
  // file://で直接開いた場合、fetch()でのローカルファイル読み込みはブラウザの
  // セキュリティ制限でエラーになることがある(「読み込み失敗」の原因)。
  // 通常の<audio>要素でフル音源を1つだけ読み込み、currentTimeを動かして
  // 再生する方式にする(fetch/Web Audioデコード不要)。
  var PLAY_PREROLL_SEC = 0.4;
  var PLAY_POSTROLL_SEC = 2.0;
  var sharedAudioEl = null;
  var sharedAudioReady = null;
  var sharedAudioStopTimer = null;
  function getSharedAudio() {
    if (!sharedAudioEl) {
      sharedAudioEl = new Audio('full-song.local.mp3');
      sharedAudioEl.preload = 'auto';
      sharedAudioReady = new Promise(function (resolve, reject) {
        sharedAudioEl.addEventListener('loadedmetadata', function () { resolve(); }, {once: true});
        sharedAudioEl.addEventListener('error', function () { reject(new Error('audio load error')); }, {once: true});
      });
    }
    return {audio: sharedAudioEl, ready: sharedAudioReady};
  }
  function playAtShiftedPosition(absoluteTimeSec, btn) {
    var original = btn.textContent;
    btn.disabled = true;
    btn.textContent = '⏳';
    var ref = getSharedAudio();
    ref.ready
      .then(function () {
        btn.disabled = false;
        btn.textContent = original;
        if (sharedAudioStopTimer) clearTimeout(sharedAudioStopTimer);
        ref.audio.pause();
        ref.audio.currentTime = Math.max(0, absoluteTimeSec - PLAY_PREROLL_SEC);
        var playPromise = ref.audio.play();
        if (playPromise && playPromise.catch) playPromise.catch(function () {});
        sharedAudioStopTimer = setTimeout(function () { ref.audio.pause(); }, (PLAY_PREROLL_SEC + PLAY_POSTROLL_SEC) * 1000);
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = '⚠️';
      });
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
    updateProgress();
    updateSummary();
  }

  function getEntry(cueId) {
    if (!state[cueId]) state[cueId] = {status: null, deltaMs: 0, golden: false, note: ''};
    if (state[cueId].note == null) state[cueId].note = '';
    return state[cueId];
  }

  function buildSummaryPrompt() {
    var lines = [];
    rowsAll.forEach(function (tr) {
      var cueId = tr.getAttribute('data-cueid');
      var entry = state[cueId];
      if (!entry || !entry.status) return;
      var text = tr.getAttribute('data-text');
      var sec = tr.getAttribute('data-designedsec');
      var note = (entry.note || '').trim();
      if (entry.status === 'reject') {
        lines.push('[わからない] ' + cueId + ' 「' + text + '」 (' + sec + '秒付近)' + (note ? ' / メモ: ' + note : ''));
      } else if (entry.status === 'adjust' && entry.deltaMs !== 0) {
        lines.push('[要調整] ' + cueId + ' 「' + text + '」 (' + sec + '秒付近) — ' + Math.abs(entry.deltaMs) + 'ms ' + (entry.deltaMs < 0 ? '早く' : '遅く') + (entry.golden ? ' ⭐基準点として確定' : '') + (note ? ' / メモ: ' + note : ''));
      } else if (entry.status === 'adjust') {
        lines.push('[合ってない・補正量未入力] ' + cueId + ' 「' + text + '」 (' + sec + '秒付近)' + (note ? ' / メモ: ' + note : ''));
      } else if (note) {
        lines.push('[OK・メモあり] ' + cueId + ' 「' + text + '」 (' + sec + '秒付近)' + (note ? ' / メモ: ' + note : ''));
      }
    });
    var header = 'StaRt Wedding Edit — 聴取確認まとめ(要調整・わからない・メモありのみ ' + lines.length + '件)\\n' + '作成: ' + new Date().toLocaleString('ja-JP') + '\\n\\n';
    if (lines.length === 0) return header + '(まだ「要調整」「わからない」「メモあり」の行はありません。)';
    return header + lines.join('\\n');
  }

  function updateSummary() {
    var area = document.getElementById('summaryPromptArea');
    if (area) area.value = buildSummaryPrompt();
  }

  function renderRow(tr) {
    var cueId = tr.getAttribute('data-cueid');
    var entry = getEntry(cueId);
    var okBtn = tr.querySelector('.btn-ok');
    var wrongBtn = tr.querySelector('.btn-wrong');
    var rejectBtn = tr.querySelector('.btn-reject');
    var currentEl = tr.querySelector('[data-role=current]');
    var statusEl = tr.querySelector('[data-role=status]');
    var noteInput = tr.querySelector('[data-role=note]');

    okBtn.classList.toggle('active', entry.status === 'ok');
    wrongBtn.classList.toggle('active', entry.status === 'adjust');
    rejectBtn.classList.toggle('active', entry.status === 'reject');
    var designedSec = parseFloat(tr.getAttribute('data-designedsec'));
    var currentSec = designedSec + entry.deltaMs / 1000;
    currentEl.textContent = designedSec.toFixed(3) + 's → ' + currentSec.toFixed(3) + 's' + (entry.deltaMs === 0 ? '(ズレなし)' : ' (' + (entry.deltaMs > 0 ? '+' : '') + entry.deltaMs + 'ms)');
    if (noteInput && document.activeElement !== noteInput) noteInput.value = entry.note || '';

    if (entry.status === 'adjust' && entry.deltaMs !== 0) {
      statusEl.textContent = '合ってない → ' + Math.abs(entry.deltaMs) + 'ms ' + (entry.deltaMs < 0 ? '早く' : '遅く') + '補正';
      statusEl.className = 'judge-status is-adjust';
    } else if (entry.status === 'adjust') {
      statusEl.textContent = '合ってない(⏪/⏩で合わせて)';
      statusEl.className = 'judge-status is-adjust';
    } else if (entry.status === 'ok') {
      statusEl.textContent = '合ってる';
      statusEl.className = 'judge-status is-ok';
    } else if (entry.status === 'reject') {
      statusEl.textContent = 'わからない';
      statusEl.className = 'judge-status is-reject';
    } else {
      statusEl.textContent = '未確認';
      statusEl.className = 'judge-status';
    }
  }

  function updateProgress() {
    var done = Object.keys(state).filter(function (k) { return state[k].status === 'ok' || state[k].status === 'adjust' || state[k].status === 'reject'; }).length;
    var text = '判定済み: ' + done + '件(自動的に保存されています)';
    document.getElementById('progressCount').textContent = text;
    document.getElementById('progressCountFloating').textContent = text;
  }

  var rowsAll = Array.prototype.slice.call(document.querySelectorAll('#cueRows tr.cue-row'));
  rowsAll.forEach(function (tr) {
    var cueId = tr.getAttribute('data-cueid');

    tr.querySelector('.btn-ok').addEventListener('click', function () {
      var entry = getEntry(cueId);
      entry.status = entry.status === 'ok' ? null : 'ok';
      if (entry.status === 'ok') entry.deltaMs = 0;
      renderRow(tr);
      saveState();
    });
    tr.querySelector('.btn-wrong').addEventListener('click', function () {
      var entry = getEntry(cueId);
      entry.status = entry.status === 'adjust' ? null : 'adjust';
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
        if (entry.status !== 'reject') entry.status = 'adjust';
        renderRow(tr);
        saveState();
        var designedSec = parseFloat(tr.getAttribute('data-designedsec'));
        if (checkBtn) playAtShiftedPosition(designedSec + entry.deltaMs / 1000, checkBtn);
      });
    });
    tr.querySelector('.btn-reset').addEventListener('click', function () {
      var entry = getEntry(cueId);
      entry.deltaMs = 0;
      renderRow(tr);
      saveState();
    });
    var checkBtn = tr.querySelector('.btn-check');
    checkBtn.addEventListener('click', function () {
      var entry = getEntry(cueId);
      var designedSec = parseFloat(tr.getAttribute('data-designedsec'));
      var absoluteTimeSec = designedSec + entry.deltaMs / 1000;
      playAtShiftedPosition(absoluteTimeSec, checkBtn);
    });
    var noteInput = tr.querySelector('[data-role=note]');
    noteInput.addEventListener('input', function () {
      var entry = getEntry(cueId);
      entry.note = noteInput.value;
      saveState();
    });
    renderRow(tr);
  });
  updateProgress();
  updateSummary();

  function setHint(topId, floatingId, text, isError) {
    [topId, floatingId].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.textContent = text;
      el.style.color = isError ? '#f2a53f' : '#7CF29A';
    });
  }

  document.getElementById('copySummaryBtn').addEventListener('click', function () {
    var text = document.getElementById('summaryPromptArea').value;
    function showCopied() {
      setHint('copyHint', 'saveHintFloating', '✅ コピーしました。', false);
      setTimeout(function () {
        document.getElementById('copyHint').textContent = '';
        document.getElementById('saveHintFloating').textContent = '';
      }, 3000);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showCopied).catch(function () { legacyCopy(text, showCopied); });
    } else {
      legacyCopy(text, showCopied);
    }
  });
  document.getElementById('copySummaryBtnFloating').addEventListener('click', function () {
    document.getElementById('copySummaryBtn').click();
  });

  function legacyCopy(text, onDone) {
    var ta = document.getElementById('summaryPromptArea');
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); onDone(); } catch (e) {
      document.getElementById('copyHint').textContent = 'コピー失敗。手動で選択してください。';
    }
  }

  var nameInput = document.getElementById('verifiedByInput');
  try { nameInput.value = localStorage.getItem(NAME_KEY) || ''; } catch (e) {}
  nameInput.addEventListener('input', function () {
    try { localStorage.setItem(NAME_KEY, nameInput.value); } catch (e) {}
  });

  document.getElementById('saveBtnFloating').addEventListener('click', function () {
    document.getElementById('saveBtn').click();
  });

  document.getElementById('saveBtn').addEventListener('click', function () {
    var verifiedBy = nameInput.value.trim();
    if (!verifiedBy) {
      setHint('saveHint', 'saveHintFloating', '⚠️ 「名前」を入力してから保存してください。', true);
      nameInput.focus();
      return;
    }
    var decisions = [];
    Object.keys(state).forEach(function (cueId) {
      var e = state[cueId];
      var note = (e.note || '').trim();
      if (e.status === 'ok') {
        var d = {cueId: cueId, status: 'ok'};
        if (e.golden) d.goldenAnchor = true;
        if (note) d.note = note;
        decisions.push(d);
      } else if (e.status === 'adjust' && e.deltaMs !== 0) {
        var ad = {cueId: cueId, status: 'adjust', deltaMs: e.deltaMs};
        if (e.golden) ad.goldenAnchor = true;
        if (note) ad.note = note;
        decisions.push(ad);
      } else if (e.status === 'adjust') {
        var wd = {cueId: cueId, status: 'reject'};
        wd.note = (note ? note + ' ' : '') + '(合ってないと判定されたが補正量が未入力)';
        decisions.push(wd);
      } else if (e.status === 'reject') {
        var rd = {cueId: cueId, status: 'reject'};
        if (note) rd.note = note;
        decisions.push(rd);
      }
    });
    if (decisions.length === 0) {
      setHint('saveHint', 'saveHintFloating', '⚠️ まだ判定した行が0件です。', true);
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
    setHint('saveHint', 'saveHintFloating', '✅ ' + decisions.length + '件を書き出しました。listening-decisions.local.jsonとして保存後、pnpm apply:listening-verification → pnpm sync:timing-master。', false);
  });
})();
</script>
</body>
</html>
`,
);

console.log(`[render-lyric-timing-master-reference] phraseクリップ${phraseClips.length}件を ${clipsDir} に生成。`);
console.log(`[render-lyric-timing-master-reference] 生成: ${outPath}`);
console.log(`[render-lyric-timing-master-reference] open ${outPath}`);
