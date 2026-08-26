// 人間が実際にlistening-review.local.htmlでcueを聴いて確認した結果を、
// TimingMasterへ安全に反映する。
//
// 入力: local/analysis/start-wedding/listening-decisions.local.json
//   {
//     "verifiedBy": "人間の名前 or ハンドル",
//     "decisions": [
//       {"cueId": "P012-H01(パッ1)", "status": "ok"},
//       {"cueId": "P012-H02(パッ2)", "status": "adjust", "deltaMs": -40, "note": "少し早く感じる"},
//       {"cueId": "INTRO-START-S", "status": "reject", "note": "全然違う音を指している"}
//     ]
//   }
//
// 重要な安全設計:
// - decisionsに列挙されていないcueは一切変更しない(全件一律verified化しない)。
// - status="ok"のcueだけverifiedByListening=true, timingSource='verified-vocal'にする。
// - status="adjust"のcueは、そのcueOffsetMsへdeltaMsを加算した上でverified=trueにする
//   (二重適用防止のため、既存cueOffsetMsへの「加算」であって「置換」ではない。
//   resolveEffectiveCueTimeMs()経由でのみ最終的に合成される)。
// - status="reject"のcueはverifiedByListeningをtrueにしない。reviewCommentへ理由を残し、
//   人間の再確認が必要な状態のまま留める。
// - LOCKED/manual/verifiedByListening=true済みのcueへ、このscriptが別の判断を上書きする
//   ことはない(既存のpreserveCueIfBetter()と同じ思想を、apply側でも徹底する:
//   このscript自体は「これから初めてverifyするcue」を対象とする一方向の操作であり、
//   既にverified=trueなcueをこのscriptでunverifyすることはしない)。

import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {TimingMaster, VocalCue} from '../src/data/startWeddingEdit/timingMaster.ts';
import {canonicalMasterPayloadForHash} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const localDir = join(studioRoot, 'local');
const masterPath = join(localDir, 'start-wedding-timing-master.local.json');
const decisionsPath = join(localDir, 'analysis/start-wedding/listening-decisions.local.json');

type Decision = {
  cueId: string;
  status: 'ok' | 'adjust' | 'reject';
  deltaMs?: number;
  note?: string;
};

if (!existsSync(masterPath)) {
  console.error('❌ masterが無い。');
  process.exit(1);
}
if (!existsSync(decisionsPath)) {
  console.error(`❌ ${decisionsPath} が無い。先にlistening-review.local.htmlで聴取確認した結果を作成してください。`);
  process.exit(1);
}

const master = JSON.parse(readFileSync(masterPath, 'utf8')) as TimingMaster;
const input = JSON.parse(readFileSync(decisionsPath, 'utf8')) as {verifiedBy: string; decisions: Decision[]};

if (!input.verifiedBy || typeof input.verifiedBy !== 'string') {
  console.error('❌ verifiedByが無い。誰が確認したか(人間の名前/ハンドル)を必須にする。');
  process.exit(1);
}

const cueIndex = new Map<string, {phrase: TimingMaster['phrases'][number]; cue: VocalCue}>();
for (const p of master.phrases) {
  for (const c of p.cues) cueIndex.set(c.cueId, {phrase: p, cue: c});
}

const applied: string[] = [];
const skipped: string[] = [];
const now = new Date().toISOString();

for (const d of input.decisions) {
  const found = cueIndex.get(d.cueId);
  if (!found) {
    // letterCueはphraseに属さないので別途探す
    let letterFound = false;
    for (const b of master.editorialBlocks) {
      const lc = b.letterCues?.find((x) => x.cueId === d.cueId);
      if (lc) {
        if (d.status === 'ok' || d.status === 'adjust') {
          lc.verifiedByListening = true;
          // letterCueはcueOffsetMsを持たない(letterCue専用のtimeMsを直接調整)
          if (d.status === 'adjust' && typeof d.deltaMs === 'number') {
            lc.timeMs = lc.timeMs + d.deltaMs;
          }
          applied.push(d.cueId);
        } else {
          skipped.push(`${d.cueId}(reject: 変更なし)`);
        }
        letterFound = true;
        break;
      }
    }
    if (!letterFound) {
      console.error(`⚠️  cueId未検出のためskip: ${d.cueId}`);
      skipped.push(`${d.cueId}(未検出)`);
    }
    continue;
  }

  const {cue} = found;
  if (cue.timingSource === 'manual' && cue.verifiedByListening) {
    skipped.push(`${d.cueId}(既にmanual+verified、上書きしない)`);
    continue;
  }

  if (d.status === 'ok') {
    cue.verifiedByListening = true;
    cue.timingSource = 'verified-vocal';
    cue.confidenceScore = 1.0; // 人間が実際に聴いて確認したため、機械的confidenceScoreも1.0にする
    cue.reviewComment = d.note ? `[verified-by-listening] ${d.note}` : '[verified-by-listening] OK';
    applied.push(d.cueId);
  } else if (d.status === 'adjust') {
    if (typeof d.deltaMs !== 'number') {
      console.error(`⚠️  ${d.cueId}: status=adjustだがdeltaMsが無い。skip。`);
      skipped.push(`${d.cueId}(deltaMs欠落)`);
      continue;
    }
    cue.cueOffsetMs = cue.cueOffsetMs + d.deltaMs;
    cue.verifiedByListening = true;
    cue.timingSource = 'verified-vocal';
    cue.confidenceScore = 1.0; // 人間が実際に聴いて補正込みで確認したため1.0にする
    cue.reviewComment = `[verified-by-listening, adjusted ${d.deltaMs}ms] ${d.note ?? ''}`.trim();
    applied.push(d.cueId);
  } else if (d.status === 'reject') {
    cue.reviewComment = `[listening-rejected, needs re-review] ${d.note ?? ''}`.trim();
    skipped.push(`${d.cueId}(reject: verified化しない)`);
  }
}

if (applied.length === 0) {
  console.log('反映対象が0件だった(全件skipまたは入力なし)。masterは変更しない。');
  process.exit(0);
}

const candidatePayload = {
  schemaVersion: master.schemaVersion,
  masterId: master.masterId,
  status: master.status,
  audio: master.audio,
  musicGrid: master.musicGrid,
  sections: master.sections,
  phrases: master.phrases,
  musicCues: master.musicCues,
  editorialBlocks: master.editorialBlocks,
  analysisRun: master.analysisRun,
};
const newContentHash = createHash('sha256').update(JSON.stringify(canonicalMasterPayloadForHash(candidatePayload))).digest('hex');
const nextRevision = newContentHash !== master.contentHash ? master.revision + 1 : master.revision;

const totalVocalCues = master.phrases.reduce((n, p) => n + p.cues.length, 0);
const verifiedVocalCues = master.phrases.reduce((n, p) => n + p.cues.filter((c) => c.verifiedByListening).length, 0);
const totalPhrases = master.phrases.length;
const verifiedPhrases = master.phrases.filter((p) => p.cues.length > 0 && p.cues.every((c) => c.verifiedByListening)).length;

const updated: TimingMaster = {
  ...candidatePayload,
  revision: nextRevision,
  contentHash: newContentHash,
  verification: {
    ...master.verification,
    totalPhrases,
    verifiedPhrases,
    totalVocalCues,
    verifiedVocalCues,
    verifiedBy: input.verifiedBy,
    verifiedAt: now,
  },
  provenance: {...master.provenance, updatedAt: now},
};

const backupDir = join(localDir, '_backups');
mkdirSync(backupDir, {recursive: true});
writeFileSync(join(backupDir, `start-wedding-timing-master.${now.replace(/[:.]/g, '-')}.json`), readFileSync(masterPath));
writeFileSync(masterPath, JSON.stringify(updated, null, 2) + '\n');

console.log(`[apply-listening-verification] verifiedBy=${input.verifiedBy}`);
console.log(`[apply-listening-verification] 適用: ${applied.length}件 → ${applied.join(', ')}`);
if (skipped.length > 0) console.log(`[apply-listening-verification] skip: ${skipped.length}件 → ${skipped.join(', ')}`);
console.log(`[apply-listening-verification] verifiedVocalCues=${verifiedVocalCues}/${totalVocalCues} verifiedPhrases=${verifiedPhrases}/${totalPhrases}`);
console.log(`[apply-listening-verification] revision ${master.revision} → ${nextRevision}`);
console.log('[apply-listening-verification] 反映後は pnpm sync:timing-master を実行してgenerated.tsへ反映してください。');
