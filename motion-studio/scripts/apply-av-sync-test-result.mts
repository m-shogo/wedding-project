// local/analysis/start-wedding/av-sync-test-result.local.json(AVSyncTest
// compositionのrender→再解析結果)をTimingMasterへ記録する。
//
// renderPipelineOffsetMsはcandidateとして保存するだけで、
// renderPipelineOffsetVerified=trueにはしない(人間が実際に最終MP4を
// 試聴して妥当性を確認するまでrenderへ自動適用しない)。

import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {TimingMaster} from '../src/data/startWeddingEdit/timingMaster.ts';
import {canonicalMasterPayloadForHash} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const localDir = join(studioRoot, 'local');
const masterPath = join(localDir, 'start-wedding-timing-master.local.json');
const resultPath = join(localDir, 'analysis/start-wedding/av-sync-test-result.local.json');

if (!existsSync(masterPath)) {
  console.error('❌ masterが無い。先にmigrateを実行してください。');
  process.exit(1);
}
if (!existsSync(resultPath)) {
  console.error('❌ av-sync-test-result.local.jsonが無い。先にAVSyncTestをrender+解析してください。');
  process.exit(1);
}

const master = JSON.parse(readFileSync(masterPath, 'utf8')) as TimingMaster;
const result = JSON.parse(readFileSync(resultPath, 'utf8')) as {audioDeltaMeanMs: number | null; audioDeltaMaxAbsMs: number | null; driftRegression: {slopeMsPerSec: number} | null};

if (result.audioDeltaMeanMs == null) {
  console.error('❌ av-sync-test-resultにaudioDeltaMeanMsが無い。');
  process.exit(1);
}

const updatedAudio = {
  ...master.audio,
  renderPipelineOffsetMs: result.audioDeltaMeanMs,
  renderPipelineOffsetVerified: false, // 人間の試聴確認前は常にfalse
};

const candidatePayload = {
  schemaVersion: master.schemaVersion,
  masterId: master.masterId,
  status: master.status,
  audio: updatedAudio,
  musicGrid: master.musicGrid,
  sections: master.sections,
  phrases: master.phrases,
  musicCues: master.musicCues,
  editorialBlocks: master.editorialBlocks,
  analysisRun: master.analysisRun,
};
const newContentHash = createHash('sha256').update(JSON.stringify(canonicalMasterPayloadForHash(candidatePayload))).digest('hex');
const contentChanged = newContentHash !== master.contentHash;
const nextRevision = contentChanged ? master.revision + 1 : master.revision;

const now = new Date().toISOString();
const updated: TimingMaster = {
  ...candidatePayload,
  revision: nextRevision,
  contentHash: newContentHash,
  verification: master.verification,
  provenance: {...master.provenance, updatedAt: contentChanged ? now : master.provenance.updatedAt},
};

const backupDir = join(localDir, '_backups');
mkdirSync(backupDir, {recursive: true});
writeFileSync(join(backupDir, `start-wedding-timing-master.${now.replace(/[:.]/g, '-')}.json`), readFileSync(masterPath));
writeFileSync(masterPath, JSON.stringify(updated, null, 2) + '\n');
console.log(
  `[apply-av-sync-test-result] renderPipelineOffsetMs=${result.audioDeltaMeanMs}ms(maxAbs=${result.audioDeltaMaxAbsMs}ms, slope=${result.driftRegression?.slopeMsPerSec ?? 'N/A'}) verified=false へ記録。revision ${master.revision} → ${nextRevision}`,
);
