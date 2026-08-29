import {mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {
  applyIntakePlan,
  buildIntakePlan,
  getIntakeSpecs,
  writeIntakeReceipt,
} from './intake-production-media.mts';
import {verifyIntakeReceipt} from './verify-production-media-intake-receipt.mts';

const errors: string[] = [];
const fail = (message: string) => errors.push(message);
const root = mkdtempSync(join(tmpdir(), 'profile-v1-media-intake-'));
const source = join(root, 'source');
const target = join(root, 'target');
const receiptPath = join(root, 'profile-media-intake.json');

try {
  mkdirSync(source, {recursive: true});
  const specs = getIntakeSpecs('profile');
  if (specs.length !== 17) fail(`expected 17 Profile canonical media specs, got ${specs.length}`);

  for (const spec of specs) {
    const ext = spec.kind === 'video' ? '.mp4' : '.jpg';
    writeFileSync(join(source, `${spec.canonicalStem}${ext}`), `profile-real-media-fixture:${spec.id}\n`, 'utf8');
  }

  const dryRunPlan = buildIntakePlan({project: 'profile', sourceDirectory: source, targetDirectory: target});
  if (!dryRunPlan.readyToApply) fail(`canonical 17-slot Profile intake should be safe: ${JSON.stringify(dryRunPlan)}`);
  if (dryRunPlan.resolvedCount !== 17 || dryRunPlan.expectedCount !== 17) fail('Profile intake plan count drifted');
  if (dryRunPlan.copies.some((copy) => !copy.sourcePath.startsWith(source))) fail('Profile intake must preserve source ownership');

  const receipt = applyIntakePlan(dryRunPlan, '2026-08-29T00:00:00.000Z');
  writeIntakeReceipt(receipt, receiptPath);
  if (receipt.humanQaState !== 'NOT_RUN') fail('media intake must not fabricate Human QA');
  if (receipt.macDaVinciActualState !== 'NOT_RUN') fail('media intake must not fabricate Mac DaVinci Actual');
  if (receipt.productionReady !== false) fail('media intake receipt must never declare production readiness');
  if (receipt.copiedCount !== 17 || receipt.copies.some((copy) => !copy.sha256 || copy.sourceTargetMatch !== true)) {
    fail('Profile intake receipt must bind all 17 copied targets by SHA-256');
  }

  const current = verifyIntakeReceipt({project: 'profile', receiptPath, targetDirectory: target});
  if (!current.current || current.verifiedCount !== 17 || current.errors.length !== 0) {
    fail(`fresh Profile receipt must verify CURRENT: ${JSON.stringify(current)}`);
  }

  const changed = receipt.copies.find((copy) => copy.id === 'couple-trip') ?? receipt.copies[0];
  writeFileSync(join(target, changed.targetFile), `${readFileSync(join(target, changed.targetFile), 'utf8')}mutated-after-intake\n`, 'utf8');
  const stale = verifyIntakeReceipt({project: 'profile', receiptPath, targetDirectory: target});
  if (stale.current) fail('post-intake target mutation must invalidate the Profile receipt');
  if (!stale.errors.some((error) => error.startsWith(`TARGET_BYTES_CHANGED: ${changed.id}`) || error.startsWith(`TARGET_SHA_CHANGED: ${changed.id}`))) {
    fail(`expected changed target blocker for ${changed.id}: ${JSON.stringify(stale.errors)}`);
  }

  const wrongKindRoot = join(root, 'wrong-kind');
  mkdirSync(wrongKindRoot, {recursive: true});
  for (const spec of specs) {
    const ext = spec.id === 'groom-childhood' ? '.mp4' : '.jpg';
    writeFileSync(join(wrongKindRoot, `${spec.canonicalStem}${ext}`), `fixture:${spec.id}\n`, 'utf8');
  }
  const wrongKindPlan = buildIntakePlan({project: 'profile', sourceDirectory: wrongKindRoot, targetDirectory: join(root, 'wrong-kind-target')});
  if (wrongKindPlan.readyToApply) fail('photo-only Profile role must reject an incompatible video source');
  if (!wrongKindPlan.incompatible.some((entry) => entry.id === 'groom-childhood')) fail('wrong-kind blocker must identify groom-childhood');

  if (errors.length > 0) {
    console.error(`Profile V1 media intake contract FAILED (${errors.length})`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log('Profile V1 media intake contract OK: 17 canonical real-media slots copy with SHA-bound provenance; fresh receipt=CURRENT; target mutation=STALE; kind mismatch=BLOCKED; Human QA and Mac DaVinci Actual remain NOT_RUN; productionReady remains false.');
} finally {
  rmSync(root, {recursive: true, force: true});
}
