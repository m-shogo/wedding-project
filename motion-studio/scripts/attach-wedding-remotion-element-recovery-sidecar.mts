import {createHash} from 'node:crypto';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(root, '..');
const movieArg = process.argv.find((arg) => arg.startsWith('--movie='))?.split('=')[1];
if (movieArg !== 'opening' && movieArg !== 'profile') {
  console.error('Usage: node --no-warnings scripts/attach-wedding-remotion-element-recovery-sidecar.mts --movie=opening|profile');
  process.exit(1);
}
const movieId = movieArg;
const config = movieId === 'opening'
  ? {
      recovery: 'out/handoff/opening-v1/opening-v1-davinci-production-recovery.json',
      markdown: 'out/handoff/opening-v1/opening-v1-davinci-production-recovery.md',
    }
  : {
      recovery: 'out/handoff/profile-v1/profile-v1-davinci-production-recovery.json',
      markdown: 'out/handoff/profile-v1/profile-v1-davinci-production-recovery.md',
    };

const recoveryPath = join(root, config.recovery);
const markdownPath = join(root, config.markdown);
const dependencySourcePath = join(repoRoot, 'movie-dashboard/src/data/remotionStudioToolingProductionDependency.ts');
const handoffRoot = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff');
const effectiveBundlePath = join(handoffRoot, 'wedding-remotion-element-effective-handoff-bundle.json');
const sidecarPath = join(handoffRoot, 'wedding-remotion-element-davinci-recovery-sidecar.json');
const sha256 = (value: string | Buffer) => createHash('sha256').update(value).digest('hex');
const rel = (path: string) => relative(repoRoot, path).replaceAll('\\', '/');
const shaFile = (path: string) => sha256(readFileSync(path));

if (!existsSync(recoveryPath)) {
  console.error(`Remotion Element recovery attachment blocked: missing ${config.recovery}`);
  process.exit(1);
}
if (!existsSync(dependencySourcePath)) {
  console.error('Remotion Element recovery attachment blocked: production adoption registry missing');
  process.exit(1);
}

let recoveryExport: any;
try {
  recoveryExport = JSON.parse(readFileSync(recoveryPath, 'utf8'));
} catch {
  console.error(`Remotion Element recovery attachment blocked: invalid JSON ${config.recovery}`);
  process.exit(1);
}
if (
  recoveryExport.schemaVersion !== 'wedding-davinci-production-recovery-export/v1' ||
  recoveryExport.authority !== 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY'
) {
  console.error('Remotion Element recovery attachment blocked: canonical recovery contract mismatch');
  process.exit(1);
}
if (recoveryExport.recovery?.actual?.state !== 'NOT_RUN') {
  console.error('Remotion Element recovery attachment blocked: canonical Mac DaVinci Actual must remain NOT_RUN');
  process.exit(1);
}
if (recoveryExport.recovery?.bridge?.macDaVinciActualVerified !== false) {
  console.error('Remotion Element recovery attachment blocked: attachment must not verify Mac DaVinci Actual');
  process.exit(1);
}

const dependencySource = readFileSync(dependencySourcePath, 'utf8');
const adoptionMatch = dependencySource.match(new RegExp(`\\b${movieId}:\\s*\\[([^\\]]*)\\]`));
if (!adoptionMatch) {
  console.error(`Remotion Element recovery attachment blocked: ${movieId} adoption registry entry missing`);
  process.exit(1);
}
const adoptedCandidateIds = [...adoptionMatch[1].matchAll(/["']([^"']+)["']/g)].map((match) => match[1]);
const adopted = adoptedCandidateIds.length > 0;

let state: 'NOT_ADOPTED' | 'CURRENT' | 'MISSING' | 'STALE' = adopted ? 'MISSING' : 'NOT_ADOPTED';
let current = !adopted;
const blockers: string[] = [];
let bundle: any = null;
let sidecar: any = null;
let sourceEffectiveHandoffBundleSha256: string | null = null;
let sourceGateArtifactSha256: string | null = null;
let sidecarSha256: string | null = null;

if (adopted) {
  if (!existsSync(effectiveBundlePath)) blockers.push('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE_MISSING');
  if (!existsSync(sidecarPath)) blockers.push('REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_MISSING');

  if (existsSync(effectiveBundlePath)) {
    try { bundle = JSON.parse(readFileSync(effectiveBundlePath, 'utf8')); }
    catch { blockers.push('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE_INVALID'); }
  }
  if (existsSync(sidecarPath)) {
    try { sidecar = JSON.parse(readFileSync(sidecarPath, 'utf8')); }
    catch { blockers.push('REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_INVALID'); }
  }

  if (bundle) {
    if (bundle.schemaVersion !== 'wedding-remotion-element-effective-handoff-bundle/v1') blockers.push('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE_SCHEMA_MISMATCH');
    if (bundle.authority !== 'SHA_BOUND_REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE') blockers.push('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE_AUTHORITY_MISMATCH');
    const project = bundle.projects?.find((item: any) => item.movieId === movieId);
    if (!project) blockers.push(`REMOTION_ELEMENT_EFFECTIVE_HANDOFF_PROJECT_MISSING:${movieId}`);
    else if (JSON.stringify(project.adoptedCandidateIds ?? []) !== JSON.stringify(adoptedCandidateIds)) blockers.push(`REMOTION_ELEMENT_EFFECTIVE_HANDOFF_ADOPTION_STALE:${movieId}`);
    sourceEffectiveHandoffBundleSha256 = bundle.bundleSha256 ?? null;
    sourceGateArtifactSha256 = bundle.sourceGateArtifactSha256 ?? null;
  }

  if (sidecar) {
    if (sidecar.schemaVersion !== 'wedding-remotion-element-davinci-recovery-sidecar/v1') blockers.push('REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_SCHEMA_MISMATCH');
    if (sidecar.authority !== 'SHA_BOUND_REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR') blockers.push('REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_AUTHORITY_MISMATCH');
    const stablePayload = {...sidecar};
    delete stablePayload.sidecarSha256;
    const expectedSelfSha = sha256(JSON.stringify(stablePayload));
    if (sidecar.sidecarSha256 !== expectedSelfSha) blockers.push('REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_SELF_SHA_INVALID');
    sidecarSha256 = sidecar.sidecarSha256 ?? null;
  }

  if (bundle && sidecar) {
    if (sidecar.sourceEffectiveHandoffBundleSha256 !== bundle.bundleSha256) blockers.push('REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_BUNDLE_SHA_STALE');
    if (sidecar.sourceEffectiveHandoffBundleFileSha256 !== shaFile(effectiveBundlePath)) blockers.push('REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_BUNDLE_FILE_SHA_STALE');
    if (sidecar.sourceGateArtifactSha256 !== bundle.sourceGateArtifactSha256) blockers.push('REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_GATE_SHA_STALE');
    const project = sidecar.projects?.find((item: any) => item.movieId === movieId);
    if (!project) blockers.push(`REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_PROJECT_MISSING:${movieId}`);
    else {
      if (JSON.stringify(project.adoptedCandidateIds ?? []) !== JSON.stringify(adoptedCandidateIds)) blockers.push(`REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_ADOPTION_STALE:${movieId}`);
      if (!project.recoveryCurrentAllowed) blockers.push(`REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_NOT_CURRENT:${movieId}`);
      if (project.sourceEffectiveHandoffBundleSha256 !== bundle.bundleSha256) blockers.push(`REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_PROJECT_BUNDLE_SHA_STALE:${movieId}`);
      if (project.sourceGateArtifactSha256 !== bundle.sourceGateArtifactSha256) blockers.push(`REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_PROJECT_GATE_SHA_STALE:${movieId}`);
    }
  }

  current = blockers.length === 0;
  state = current ? 'CURRENT' : (existsSync(sidecarPath) ? 'STALE' : 'MISSING');
}

const attachment = {
  authority: 'CANONICAL_DAVINCI_RECOVERY_REMOTION_ELEMENT_GATE_ATTACHMENT',
  movieId,
  adopted,
  adoptedCandidateIds,
  requiredForCurrentness: adopted,
  state,
  current,
  effectiveDavinciRecoveryCurrentAllowed: current,
  sidecarPath: rel(sidecarPath),
  sidecarSha256,
  sourceEffectiveHandoffBundlePath: rel(effectiveBundlePath),
  sourceEffectiveHandoffBundleSha256,
  sourceGateArtifactSha256,
  blockerCodes: [...new Set(blockers)].sort(),
  macRemotionStudioGuiActual: 'NOT_RUN',
  macDaVinciGuiActual: 'NOT_RUN',
  finalDeliveryApprovedByThisAttachment: false,
  guardrails: [
    'UNADOPTED_REMOTION_ELEMENT_GATE_SIDECAR_IS_NON_BLOCKING',
    'ADOPTED_REMOTION_ELEMENT_REQUIRES_CURRENT_GATE_SIDECAR',
    'REMOTION_ELEMENT_GATE_SIDECAR_CURRENT != MAC_REMOTION_STUDIO_GUI_ACTUAL_VERIFIED',
    'REMOTION_ELEMENT_GATE_SIDECAR_CURRENT != MAC_DAVINCI_GUI_ACTUAL_VERIFIED',
    'REMOTION_ELEMENT_GATE_SIDECAR_ATTACHMENT != FINAL_DELIVERY_APPROVED',
  ],
};

recoveryExport.remotionElementGateSidecar = attachment;
const jsonText = `${JSON.stringify(recoveryExport, null, 2)}\n`;
writeFileSync(recoveryPath, jsonText);

const markdown = [
  '# DaVinci Wedding Production Recovery Attachment',
  '',
  `movie: ${movieId}`,
  `canonical-recovery: ${config.recovery}`,
  `remotion-element-adopted: ${adopted ? 'yes' : 'no'}`,
  `remotion-element-candidates: ${adoptedCandidateIds.length > 0 ? adoptedCandidateIds.join(', ') : 'none'}`,
  `remotion-element-gate-sidecar-state: ${state}`,
  `remotion-element-gate-sidecar-current: ${current ? 'yes' : 'no'}`,
  `remotion-element-gate-sidecar: ${rel(sidecarPath)}`,
  `remotion-element-gate-sidecar-sha256: ${sidecarSha256 ?? 'not-exported'}`,
  `source-effective-handoff-bundle-sha256: ${sourceEffectiveHandoffBundleSha256 ?? 'not-exported'}`,
  `source-gate-artifact-sha256: ${sourceGateArtifactSha256 ?? 'not-exported'}`,
  `blocker-codes: ${attachment.blockerCodes.length > 0 ? attachment.blockerCodes.join(', ') : 'none'}`,
  'mac-remotion-studio-gui-actual: NOT_RUN',
  'mac-davinci-gui-actual: NOT_RUN',
  'final-delivery-approved-by-attachment: no',
  '',
  '## Guardrails',
  ...attachment.guardrails.map((guardrail) => `- ${guardrail}`),
  '',
].join('\n');
writeFileSync(markdownPath, markdown);

console.log(`Remotion Element recovery attachment: ${state}`);
console.log(`canonicalRecovery=${config.recovery}`);
console.log(`markdown=${config.markdown}`);
console.log(`remotionElementGateSidecarCurrent=${current ? 'YES' : 'NO'}`);
console.log('macRemotionStudioGuiActual=NOT_RUN');
console.log('macDaVinciGuiActual=NOT_RUN');
for (const blocker of attachment.blockerCodes) console.error(`BLOCK / ${blocker}`);
if (adopted && !current) process.exit(1);
