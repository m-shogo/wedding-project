import {createHash} from 'node:crypto';
import {existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {applyBgmIntakePlan, buildBgmIntakePlan, writeBgmIntakeReceipt} from './intake-production-bgm.mts';

const root = mkdtempSync(join(tmpdir(), 'wedding-bgm-intake-'));
const openingSource = join(root, 'opening-source.mp3');
const profileSource = join(root, 'profile-source.mp3');
const unsupportedSource = join(root, 'profile-source.wav');
const openingTarget = join(root, 'targets/opening/bgm-main.mp3');
const profileTarget = join(root, 'targets/profile/bgm-main.mp3');
const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

try {
  writeFileSync(openingSource, 'opening-bgm-bytes');
  writeFileSync(profileSource, 'profile-bgm-bytes');
  writeFileSync(unsupportedSource, 'wav-not-auto-transcoded');

  const openingPlan = buildBgmIntakePlan({project: 'opening', sourcePath: openingSource, targetPath: openingTarget});
  if (!openingPlan.readyToApply || openingPlan.sourceExtension !== '.mp3') throw new Error(`Opening BGM plan should be ready: ${JSON.stringify(openingPlan)}`);
  const openingReceipt = applyBgmIntakePlan(openingPlan, '2026-08-28T00:00:00.000Z');
  if (openingReceipt.sha256 !== sha256('opening-bgm-bytes')) throw new Error('Opening BGM receipt SHA mismatch');
  if (!openingReceipt.sourcePreserved || !openingReceipt.copyBytesVerified || !openingReceipt.sourceTargetMatch) throw new Error('Opening BGM receipt provenance flags invalid');
  if (openingReceipt.rightsClearedByIntake || openingReceipt.humanCreativeQaState !== 'NOT_RUN' || openingReceipt.macDaVinciActualState !== 'NOT_RUN' || openingReceipt.productionReady) {
    throw new Error('BGM intake must not fabricate rights/Human/Mac/production readiness');
  }
  if (!existsSync(openingSource) || readFileSync(openingSource, 'utf8') !== 'opening-bgm-bytes') throw new Error('Opening BGM source modified');
  if (readFileSync(openingPlan.targetPath, 'utf8') !== 'opening-bgm-bytes') throw new Error('Opening BGM copied bytes changed');
  const openingReceiptPath = join(root, 'receipts', 'opening-bgm.json');
  writeBgmIntakeReceipt(openingReceipt, openingReceiptPath);
  if (JSON.parse(readFileSync(openingReceiptPath, 'utf8')).sha256 !== openingReceipt.sha256) throw new Error('Opening BGM persisted receipt changed SHA');

  const existingPlan = buildBgmIntakePlan({project: 'opening', sourcePath: openingSource, targetPath: openingTarget});
  if (existingPlan.readyToApply || !existingPlan.blockers.some((item) => item.startsWith('TARGET_EXISTS:'))) throw new Error('Existing Opening BGM target must fail closed without --overwrite');

  const profilePlan = buildBgmIntakePlan({project: 'profile', sourcePath: profileSource, targetPath: profileTarget});
  if (!profilePlan.readyToApply) throw new Error(`Profile BGM plan should be ready: ${JSON.stringify(profilePlan)}`);
  const profileReceipt = applyBgmIntakePlan(profilePlan, '2026-08-28T00:00:01.000Z');
  if (profileReceipt.sha256 !== sha256('profile-bgm-bytes')) throw new Error('Profile BGM receipt SHA mismatch');
  if (!existsSync(profileSource) || readFileSync(profileSource, 'utf8') !== 'profile-bgm-bytes') throw new Error('Profile BGM source modified');
  if (readFileSync(profileTarget, 'utf8') !== 'profile-bgm-bytes') throw new Error('Profile BGM copied bytes changed');

  const unsupportedPlan = buildBgmIntakePlan({project: 'profile', sourcePath: unsupportedSource, targetPath: join(root, 'targets/unsupported/bgm-main.mp3')});
  if (unsupportedPlan.readyToApply || !unsupportedPlan.blockers.some((item) => item.startsWith('UNSUPPORTED_SOURCE_EXTENSION:'))) throw new Error('Non-MP3 BGM must fail closed instead of silent transcoding');

  const missingPlan = buildBgmIntakePlan({project: 'opening', sourcePath: join(root, 'missing.mp3'), targetPath: join(root, 'targets/missing/bgm-main.mp3')});
  if (missingPlan.readyToApply || !missingPlan.blockers.some((item) => item.startsWith('SOURCE_MISSING:'))) throw new Error('Missing BGM source must fail closed');

  console.log('Production BGM intake contracts OK: Opening/Profile MP3 copy is source-preserving and SHA-verified, existing targets and non-MP3 sources fail closed, and intake never clears rights or Human/Mac production gates.');
} finally {
  rmSync(root, {recursive: true, force: true});
}
