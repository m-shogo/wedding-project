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

// 🔔確認は、cue単位の短い切り出しクリップだと窓(1.0/1.2秒)を超える大きな
// ズレ(例: 1秒以上)で無音になってしまう(クリック音が窓の外に出るため)。
// これを解消するため、フルの音源をmp3へ変換して1本だけ生成し、🔔確認は
// このフル音源から必要な範囲を都度切り出して再生する(どれだけズラしても
// 曲の長さの範囲内なら必ず鳴る)。
const fullSongPath = join(dirname(htmlPath), 'full-song.local.mp3');
execFileSync('ffmpeg', ['-y', '-i', audioPath, '-ac', '2', '-b:a', '160k', fullSongPath], {stdio: 'pipe'});

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
  `data-cueid="${escapeAttr(e.cueId)}" data-critical="${e.isCritical}" data-post60="${e.is60sPlus}" data-lowconf="${e.isLowConfidence}" data-unverified="${e.isUnverified}" data-golden="${e.isGoldenAnchorCandidate}" data-designoffset="${e.cueOffsetInClipSec}" data-text="${escapeAttr(e.text)}" data-designedsec="${(e.designedSourceMs / 1000).toFixed(3)}"`;
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
      <br/>
      <button type="button" class="btn btn-check" data-action="check">🔔 今の位置で確認</button>
    </td>
    <td class="judge-cell">
      <div class="judge-row nudge-row">
        <button type="button" class="btn btn-nudge btn-nudge-big" data-delta="-300">⏪⏪ うんと早く</button>
        <button type="button" class="btn btn-nudge" data-delta="-50">⏪ 少し早く</button>
        <span class="nudge-current" data-role="current">ズレなし</span>
        <button type="button" class="btn btn-nudge" data-delta="50">少し遅く ⏩</button>
        <button type="button" class="btn btn-nudge btn-nudge-big" data-delta="300">うんと遅く ⏩⏩</button>
      </div>
      <div class="judge-row">
        <button type="button" class="btn btn-ok" data-action="ok">👍 合ってる</button>
        <button type="button" class="btn btn-wrong" data-action="wrong">❌ 合ってない</button>
        <button type="button" class="btn btn-reject" data-action="reject">🤔 わからない</button>
        <button type="button" class="btn btn-reset" data-action="reset">↺ やり直す</button>
      </div>
      ${e.isGoldenAnchorCandidate ? '<div class="judge-row"><label class="golden-toggle"><input type="checkbox" data-role="golden" /> ⭐ 基準点として確定する</label></div>' : ''}
      <div class="judge-row">
        <textarea class="note-input" data-role="note" rows="2" placeholder="気になった点があれば自由にメモ(任意。細かく書いてOK)"></textarea>
      </div>
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
  body { font-family: -apple-system, sans-serif; margin: 24px; padding-bottom: 64px; background: #111; color: #eee; }
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
  .btn-wrong { border-color: #a33; }
  .btn-wrong.active { background: #a33; border-color: #a33; color: #fff; }
  .btn-reject { border-color: #7a3a3a; }
  .btn-reject.active { background: #7a3232; border-color: #7a3232; color: #fff; }
  .btn-nudge { font-size: 12px; padding: 6px 10px; }
  .btn-nudge.active { background: #7a5a1f; border-color: #7a5a1f; color: #fff; }
  .btn-nudge-big { font-weight: 700; border-color: #8a4a2f; }
  .btn-nudge-big.active { background: #8a4a2f; border-color: #8a4a2f; }
  .btn-reset { border-color: #555; font-size: 11px; color: #aaa; }
  .btn-check { border-color: #3a5a7a; margin-top: 4px; font-size: 12px; font-weight: 700; }
  .btn-check:hover { background: #24384a; }
  .nudge-label { font-size: 11px; color: #888; }
  .nudge-row { display: flex; align-items: center; gap: 4px; }
  .nudge-current { display: inline-block; min-width: 150px; text-align: center; font-size: 12px; color: #F4C95D; font-weight: 700; }
  .golden-toggle { font-size: 12px; color: #F4C95D; cursor: pointer; }
  .judge-status { font-size: 12px; color: #888; margin-top: 4px; }
  .judge-status.is-ok { color: #7CF29A; }
  .judge-status.is-adjust { color: #F4C95D; }
  .judge-status.is-reject { color: #f2a53f; }
  .note-input { width: 100%; box-sizing: border-box; background: #0d0d0e; border: 1px solid #444; color: #eee; border-radius: 4px; padding: 5px 7px; font-size: 12px; font-family: inherit; resize: vertical; margin-top: 4px; }
  .note-input:focus { border-color: #F4C95D; outline: none; }

  .summary-box { background: #14201a; border: 1px solid #2f4a3a; border-radius: 8px; padding: 12px 14px; margin-bottom: 14px; }
  .summary-box h2 { font-size: 14px; margin: 0 0 6px; color: #9CF2B0; }
  .summary-box p { font-size: 12px; color: #9ab; margin: 0 0 8px; }
  .summary-box textarea { width: 100%; box-sizing: border-box; min-height: 140px; background: #0d0d0e; border: 1px solid #2f4a3a; color: #dcefe0; border-radius: 6px; padding: 8px 10px; font-size: 12px; font-family: ui-monospace, monospace; line-height: 1.6; }
  .summary-box .summary-actions { margin-top: 8px; display: flex; align-items: center; gap: 10px; }
  .summary-box .copy-btn { background: #2f7a4a; color: #fff; border: none; border-radius: 5px; padding: 6px 12px; font-size: 12px; cursor: pointer; }
  .summary-box .copy-btn:hover { background: #38915a; }
  .summary-box #copyHint { font-size: 12px; color: #7CF29A; }

  /* スクロール位置に関わらず常に見える、下固定の保存/コピーバー。
     上のtoolbar(sticky top:0)と対になり、78行を下まで見た後も
     上まで戻らず保存・コピーできるようにする。 */
  .floating-bar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 10; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; background: #191512; border-top: 1px solid #3a2f1f; padding: 10px 20px; box-shadow: 0 -4px 12px rgba(0,0,0,0.4); }
  .floating-bar .save-btn { background: #F4C95D; color: #1a1508; font-weight: 700; border: none; border-radius: 6px; padding: 8px 16px; font-size: 13px; cursor: pointer; }
  .floating-bar .save-btn:hover { background: #ffd873; }
  .floating-bar .copy-btn { background: #2f7a4a; color: #fff; border: none; border-radius: 5px; padding: 8px 14px; font-size: 13px; cursor: pointer; }
  .floating-bar .copy-btn:hover { background: #38915a; }
  .floating-bar span { font-size: 12px; color: #ccc; }
  #saveHintFloating { color: #7CF29A; }
</style>
</head>
<body>
<h1>StaRt Wedding Edit — Cue聴取確認(masterId=${escapeHtml(master.masterId)} revision=${master.revision})</h1>
<p class="note">これはローカル専用の確認用HTML(Git管理外・著作権音源から切り出したクリップを含む)。</p>

<div class="howto">
  <h2>使い方(むずかしいことは考えなくてOK)</h2>
  <ol>
    <li><b>▶</b>(再生ボタン)を押して聴く。</li>
    <li>
      まず3つのどれかを押して判定する。<br/>
      ぴったり合ってたら <b>👍 合ってる</b>。<br/>
      ズレてる/違うと思ったら <b>❌ 合ってない</b>(押すとオレンジ色になる)。<br/>
      どっちか判断できなければ <b>🤔 わからない</b>(これでOK。無理に判断しなくていい)。
    </li>
    <li>
      <b>❌ 合ってない</b> を押した行は、どれくらいズレてるかを下のボタンで教える。<br/>
      歌詞が音より<b>早く</b>聞こえたら <b>⏪ 少し早く</b>、<b>遅れて</b>聞こえたら <b>少し遅く ⏩</b> を押す。<br/>
      ズレがかなり大きい(「めっちゃズレてる」)時は、まず <b>⏪⏪ うんと早く</b> か <b>うんと遅く ⏩⏩</b> を1〜2回押してから、小さいボタンで微調整する。<br/>
      何回押してもOK。押しすぎたら <b>↺ やり直す</b> で0に戻せる。
    </li>
    <li>
      押したら <b>🔔 今の位置で確認</b> を押す。今押した分だけズラした位置で「ピッ」という音が鳴るので、<b>歌詞の頭と「ピッ」がピッタリ揃うまで、③→🔔確認、を何回でも繰り返す</b>。数字(ms)は見なくて良い。音だけで判断すればOK。揃ったらそのままでOK(自動的に記録されている)。
    </li>
    <li>全部(または途中まで)終わったら、上の<b>「名前」欄に自分の名前</b>を入れて<b>「💾 保存する」</b>を押す。ファイルが1つダウンロードされるので、
      <code>local/analysis/start-wedding/listening-decisions.local.json</code> という名前でそのフォルダに保存する
      (ダウンロードダイアログで保存先を選べる場合はそこで直接指定、選べない場合はダウンロードフォルダから移動する)。</li>
  </ol>
  <p style="font-size:12px;color:#888;margin:10px 0 0;">
    ⭐印(黄色背景)の10行は曲全体を代表する最優先箇所。時間が無い場合は⭐だけでもOK。
    ⭐の行を「👍」にした場合だけ、行の中の「⭐ 基準点として確定する」にもチェックすると、
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

<div class="summary-box">
  <h2>📝 修正まとめ(自動作成・コピーしてClaudeに貼れます)</h2>
  <p>ボタンを押したりメモを書いたりするたびに、下の内容が自動的に更新されます。これをそのままコピーしてClaudeに貼れば、まとめて直せます。</p>
  <textarea id="summaryPromptArea" readonly></textarea>
  <div class="summary-actions">
    <button type="button" class="copy-btn" id="copySummaryBtn">📋 全部コピーする</button>
    <span id="copyHint"></span>
  </div>
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

<!-- スクロールしても常に押せる、下固定の保存/コピーバー(TASK: 上にしか保存が無く
     78行スクロールした後に上まで戻る必要があった、というフィードバックへの対応)。
     ロジックは上のsaveBtn/copySummaryBtnへ委譲し、同じ処理を二重実装しない。 -->
<div class="floating-bar" id="floatingBar">
  <span id="progressCountFloating"></span>
  <button type="button" class="save-btn" id="saveBtnFloating">💾 保存する</button>
  <button type="button" class="copy-btn" id="copySummaryBtnFloating">📋 まとめをコピー</button>
  <span id="saveHintFloating"></span>
</div>

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

  // 「🔔 ズレ確認」: 補正込みの実際の時刻の周辺を、フル音源から直接切り出して
  // 再生し、その位置に短いクリック音を重ねる。cue単位の短い切り出しクリップ
  // (窓1.0/1.2秒)だと、1秒を超えるような大きな補正でクリック音が窓の外へ出て
  // 無音になってしまう(「1秒戻したら確認できない」問題)。フル音源からその場で
  // 必要な範囲を取るため、補正量がどれだけ大きくても曲の長さの範囲内なら必ず
  // 鳴る。数字をやり取りする往復を無くすための機能で、判定ロジックには影響しない。
  var CONFIRM_PREROLL_SEC = 1.0;
  var CONFIRM_POSTROLL_SEC = 1.5;
  var audioCtx = null;
  var fullSongBufferPromise = null;
  function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }
  function loadFullSongBuffer() {
    if (!fullSongBufferPromise) {
      fullSongBufferPromise = fetch('full-song.local.mp3')
        .then(function (r) { return r.arrayBuffer(); })
        .then(function (ab) { return getAudioCtx().decodeAudioData(ab); });
    }
    return fullSongBufferPromise;
  }
  function playWithClick(absoluteTimeSec, btn) {
    var originalLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = '⏳';
    loadFullSongBuffer()
      .then(function (buffer) {
        btn.disabled = false;
        btn.textContent = originalLabel;
        var ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        var sliceStartSec = Math.max(0, absoluteTimeSec - CONFIRM_PREROLL_SEC);
        var actualPreroll = absoluteTimeSec - sliceStartSec; // 曲の先頭に近い場合は前が詰まる
        var sliceDurationSec = Math.min(buffer.duration - sliceStartSec, actualPreroll + CONFIRM_POSTROLL_SEC);
        if (sliceDurationSec <= 0) return;
        var startAt = ctx.currentTime + 0.05;
        var source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(startAt, sliceStartSec, sliceDurationSec);
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = 1800;
        gain.gain.setValueAtTime(0.35, startAt + actualPreroll);
        gain.gain.exponentialRampToValueAtTime(0.001, startAt + actualPreroll + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startAt + actualPreroll);
        osc.stop(startAt + actualPreroll + 0.06);
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = '🔔 読み込み失敗(再試行)';
      });
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // localStorageが使えない環境でも判定操作自体は継続できるようにする(保存だけ効かない)
    }
    updateProgress();
    updateSummary();
  }

  function getEntry(cueId) {
    if (!state[cueId]) state[cueId] = {status: null, deltaMs: 0, golden: false, note: ''};
    if (state[cueId].note == null) state[cueId].note = '';
    return state[cueId];
  }

  // 判定・±ms補正・メモをまとめて1つの文章にする。ここでは判定ロジックを
  // 何も変えず、既にstateにある情報を読みやすい文章へ変換するだけ。
  // このテキストをそのままClaudeに貼れば、cueIdごとの数字を人間が
  // 書き起こす必要なく、まとめて修正依頼できるようにするためのもの。
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
        lines.push(
          '[要調整] ' + cueId + ' 「' + text + '」 (' + sec + '秒付近) — ' +
            Math.abs(entry.deltaMs) + 'ms ' + (entry.deltaMs < 0 ? '早く' : '遅く') +
            (entry.golden ? ' ⭐基準点として確定' : '') +
            (note ? ' / メモ: ' + note : ''),
        );
      } else if (entry.status === 'adjust') {
        lines.push('[合ってない・補正量未入力] ' + cueId + ' 「' + text + '」 (' + sec + '秒付近)' + (note ? ' / メモ: ' + note : ''));
      } else if (note) {
        lines.push('[OK・メモあり] ' + cueId + ' 「' + text + '」 (' + sec + '秒付近)' + (entry.golden ? ' ⭐基準点として確定' : '') + ' / メモ: ' + note);
      }
    });
    var header = 'StaRt Wedding Edit — 聴取確認まとめ(要調整・わからない・メモありのみ ' + lines.length + '件)\\n' + '作成: ' + new Date().toLocaleString('ja-JP') + '\\n\\n';
    if (lines.length === 0) {
      return header + '(まだ「要調整」「わからない」「メモあり」の行はありません。ボタンを押すかメモを書くとここに反映されます。)';
    }
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
    var goldenInput = tr.querySelector('[data-role=golden]');

    okBtn.classList.toggle('active', entry.status === 'ok');
    wrongBtn.classList.toggle('active', entry.status === 'adjust');
    rejectBtn.classList.toggle('active', entry.status === 'reject');
    var designedSec = parseFloat(tr.getAttribute('data-designedsec'));
    var currentSec = designedSec + entry.deltaMs / 1000;
    currentEl.textContent = designedSec.toFixed(3) + 's → ' + currentSec.toFixed(3) + 's' + (entry.deltaMs === 0 ? '(ズレなし)' : ' (' + (entry.deltaMs > 0 ? '+' : '') + entry.deltaMs + 'ms)');
    if (goldenInput) goldenInput.checked = !!entry.golden;
    var noteInput = tr.querySelector('[data-role=note]');
    if (noteInput && document.activeElement !== noteInput) noteInput.value = entry.note || '';

    // status: 'ok'(合ってる) / 'adjust'(合ってない。ズレ量ありなしを問わず)/ 'reject'(わからない) / null(未確認)。
    // 「合ってない」を押しただけでdeltaMsが0のままの行は、実際の補正量が
    // 分からないまま保存されないよう、保存時にreject相当として扱う
    // (この関数はUI表示のみ。保存ロジック側で別途吸収する)。
    if (entry.status === 'adjust' && entry.deltaMs !== 0) {
      statusEl.textContent = '判定: 合ってない → ' + Math.abs(entry.deltaMs) + 'ms ' + (entry.deltaMs < 0 ? '早く' : '遅く') + '補正' + (entry.golden ? ' ⭐基準点' : '');
      statusEl.className = 'judge-status is-adjust';
    } else if (entry.status === 'adjust') {
      statusEl.textContent = '判定: 合ってない(⏪/⏩でどれくらいズレてるか合わせてください)';
      statusEl.className = 'judge-status is-adjust';
    } else if (entry.status === 'ok') {
      statusEl.textContent = '判定: 合ってる' + (entry.golden ? ' ⭐基準点' : '');
      statusEl.className = 'judge-status is-ok';
    } else if (entry.status === 'reject') {
      statusEl.textContent = '判定: わからない';
      statusEl.className = 'judge-status is-reject';
    } else {
      statusEl.textContent = '未確認';
      statusEl.className = 'judge-status';
    }
  }

  function updateProgress() {
    var done = Object.keys(state).filter(function (k) { return state[k].status === 'ok' || state[k].status === 'adjust' || state[k].status === 'reject'; }).length;
    var text = '判定済み: ' + done + ' / ' + rowsAll.length + '件(自動的に保存されています)';
    document.getElementById('progressCount').textContent = text;
    document.getElementById('progressCountFloating').textContent = text;
  }

  var rowsAll = Array.prototype.slice.call(document.querySelectorAll('#cueRows tr'));
  rowsAll.forEach(function (tr) {
    var cueId = tr.getAttribute('data-cueid');

    tr.querySelector('.btn-ok').addEventListener('click', function () {
      var entry = getEntry(cueId);
      // 「合ってる」は無補正の確認。誤って合ってない状態のまま押されないよう、
      // ズレ量は0へ戻す(既に⏪/⏩でズレを追い込んだ後は不要な操作)。
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
        // ズレ補正ボタンを押した時点で「合ってない(補正込み)」扱いへ自動的に進める
        // (別途❌を押す手間を無くす)。わからない状態からでも補正すれば判定済みになる。
        if (entry.status !== 'reject') entry.status = 'adjust';
        renderRow(tr);
        saveState();
        // ボタンを押した瞬間、その場で補正込みの位置を鳴らして確認できるように
        // する(「押したらリアルタイムで直して聴きたい」というフィードバック対応)。
        // 別途🔔を押す手間を無くす。
        var designedSec = parseFloat(tr.getAttribute('data-designedsec'));
        if (checkBtn) playWithClick(designedSec + entry.deltaMs / 1000, checkBtn);
      });
    });
    tr.querySelector('.btn-reset').addEventListener('click', function () {
      var entry = getEntry(cueId);
      entry.deltaMs = 0;
      renderRow(tr);
      saveState();
    });
    var checkBtn = tr.querySelector('.btn-check');
    if (checkBtn) {
      checkBtn.addEventListener('click', function () {
        var entry = getEntry(cueId);
        var designedSec = parseFloat(tr.getAttribute('data-designedsec'));
        var absoluteTimeSec = designedSec + entry.deltaMs / 1000;
        playWithClick(absoluteTimeSec, checkBtn);
      });
    }
    var goldenInput = tr.querySelector('[data-role=golden]');
    if (goldenInput) {
      goldenInput.addEventListener('change', function () {
        var entry = getEntry(cueId);
        entry.golden = goldenInput.checked;
        renderRow(tr);
        saveState();
      });
    }
    var noteInput = tr.querySelector('[data-role=note]');
    if (noteInput) {
      noteInput.addEventListener('input', function () {
        var entry = getEntry(cueId);
        entry.note = noteInput.value;
        saveState(); // renderRowは呼ばない(呼ぶと入力中のtextarea.valueがリセットされカーソルが飛ぶため)
      });
    }
    renderRow(tr);
  });
  updateProgress();
  updateSummary();

  // 保存/コピーの結果メッセージを、上のhintと下固定バーのhint両方へ同時に出す。
  // ロジックを二重実装せず、下固定バーのボタンは常にこのハンドラを共有する。
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
      setHint('copyHint', 'saveHintFloating', '✅ コピーしました。Claudeに貼り付けてください。', false);
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

  // navigator.clipboardが使えない環境(file://で開いた場合等)向けの代替コピー手段。
  function legacyCopy(text, onDone) {
    var ta = document.getElementById('summaryPromptArea');
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      onDone();
    } catch (e) {
      document.getElementById('copyHint').textContent = 'コピーに失敗しました。テキストを選択して手動でコピーしてください。';
    }
  }

  var nameInput = document.getElementById('verifiedByInput');
  try {
    nameInput.value = localStorage.getItem(NAME_KEY) || '';
  } catch (e) {}
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
        // 「❌ 合ってない」を押したが⏪/⏩でズレ量を入力していない行は、
        // 補正値を確定できないため verifiedByListening は上げず reject 相当で保存する。
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
      setHint('saveHint', 'saveHintFloating', '⚠️ まだ判定した行が0件です。行の👍/❌/🤔のどれかを押してから保存してください。', true);
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
    setHint(
      'saveHint',
      'saveHintFloating',
      '✅ ' + decisions.length + '件を書き出しました。ダウンロードされたファイルを local/analysis/start-wedding/listening-decisions.local.json として保存してください。その後ターミナルで pnpm apply:listening-verification → pnpm sync:timing-master を実行すると反映されます。',
      false,
    );
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
