import {createHash} from 'node:crypto';
import {copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {basename, dirname, extname, join, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  palmierFcpxmlSyntheticSceneSpec,
  resolveCanaryInputManifestSchema,
  type ResolveCanaryInputManifest,
} from '../src/data/resolveCanaryInputFixtures.ts';
import {
  palmierCanaryHumanMasterSchema,
  palmierExportFreshnessSchema,
  palmierRealExportAttachmentSchema,
  palmierRealExportInspectionSchema,
} from '../src/data/palmierRealExportAttachment.schema.ts';

const motionRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const canaryId = 'DV21-PALMIER-FCPXML-01';
const palmierDir = join(motionRoot, 'out', 'canary-inputs', 'palmier');
const attachedDir = join(palmierDir, 'attached');
const sceneSpecPath = join(palmierDir, 'palmier-fcpxml-synthetic-scene-spec.json');
const manifestPath = join(motionRoot, 'out', 'canary-inputs', 'manifests', `${canaryId}.json`);
const freshnessToleranceMs = 2000;

function usage() {
  console.log('Attach a real Palmier FCPXML to DV21-PALMIER-FCPXML-01');
  console.log('');
  console.log('Inspect only (never changes manifests):');
  console.log('  node --no-warnings scripts/attach-palmier-real-export.mts --fcpxml <FILE.fcpxml> --inspect-only');
  console.log('');
  console.log('Freshness check only (never claims Palmier provenance and never changes manifests):');
  console.log('  node --no-warnings scripts/attach-palmier-real-export.mts \\');
  console.log('    --fcpxml <FILE.fcpxml> \\');
  console.log('    --export-started-at <ISO8601> \\');
  console.log('    --check-freshness-only');
  console.log('');
  console.log('Attach after creating/exporting the neutral scene in Palmier:');
  console.log('  node --no-warnings scripts/attach-palmier-real-export.mts \\');
  console.log('    --fcpxml <FILE.fcpxml> \\');
  console.log('    --export-started-at <ISO8601> \\');
  console.log('    --attest-real-palmier-export');
  console.log('');
  console.log('Record --export-started-at immediately before starting the Palmier export.');
  console.log('If a PREPARED Palmier attachment already exists, add --replace-attached-export explicitly.');
}

function valueFor(flag: string) {
  const index = args.indexOf(flag);
  if (index < 0) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${flag} requires a value.`);
  return value;
}

function sha256(path: string) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function writeJson(path: string, value: unknown) {
  mkdirSync(dirname(path), {recursive: true});
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function toMotionRelative(path: string) {
  return relative(motionRoot, path).replaceAll('\\', '/');
}

function inspectFcpxml(path: string) {
  const buffer = readFileSync(path);
  const text = buffer.toString('utf8').replace(/^\uFEFF/, '');
  const rootMatch = text.match(/<fcpxml\b[^>]*\bversion\s*=\s*["']([^"']+)["'][^>]*>/i);
  return palmierRealExportInspectionSchema.parse({
    schemaVersion: 'palmier-fcpxml-inspection/v1',
    fcpxmlRootDetected: Boolean(rootMatch),
    fcpxmlVersion: rootMatch?.[1] ?? null,
    sequenceDetected: /<sequence\b/i.test(text),
    spineDetected: /<spine\b/i.test(text),
    byteLength: buffer.byteLength,
    provenance: 'UNVERIFIED_BY_STRUCTURE',
    guardrails: [
      'FCPXML_STRUCTURE_VALID != REAL_PALMIER_PROVENANCE',
      'FCPXML_PARSEABLE != RESOLVE_TIMELINE_FIDELITY',
    ],
  });
}

function assertTimelineShapedFcpxml(inspection: ReturnType<typeof inspectFcpxml>) {
  if (!inspection.fcpxmlRootDetected || !inspection.fcpxmlVersion) {
    throw new Error('Input is not a recognizable FCPXML document with an fcpxml version attribute.');
  }
  if (!inspection.sequenceDetected || !inspection.spineDetected) {
    throw new Error('FCPXML does not contain both sequence and spine elements required for this timeline canary.');
  }
}

function verifyFreshness(path: string, rawExportStartedAt: string | undefined) {
  if (!rawExportStartedAt) {
    throw new Error('Full attachment/freshness checking requires --export-started-at <ISO8601> recorded immediately before the Palmier export started.');
  }
  const exportStartedAtMs = Date.parse(rawExportStartedAt);
  if (!Number.isFinite(exportStartedAtMs)) {
    throw new Error(`--export-started-at is not a valid ISO-8601 timestamp: ${rawExportStartedAt}`);
  }
  if (exportStartedAtMs > Date.now() + freshnessToleranceMs) {
    throw new Error('--export-started-at is in the future beyond the allowed filesystem timestamp tolerance.');
  }

  const stats = statSync(path);
  const sourceModifiedAtMs = stats.mtimeMs;
  if (sourceModifiedAtMs + freshnessToleranceMs < exportStartedAtMs) {
    throw new Error(
      `FCPXML is stale relative to this export attempt: sourceModifiedAt=${new Date(sourceModifiedAtMs).toISOString()} exportStartedAt=${new Date(exportStartedAtMs).toISOString()}. Refusing to attach an older artifact.`,
    );
  }

  return palmierExportFreshnessSchema.parse({
    exportStartedAt: new Date(exportStartedAtMs).toISOString(),
    sourceModifiedAt: new Date(sourceModifiedAtMs).toISOString(),
    sourceModifiedAtMs,
    exportStartedAtMs,
    toleranceMs: freshnessToleranceMs,
    freshAfterExportStart: true,
  });
}

try {
  if (args.includes('--help')) {
    usage();
    process.exit(0);
  }

  const rawFcpxml = valueFor('--fcpxml');
  if (!rawFcpxml) {
    usage();
    throw new Error('--fcpxml is required.');
  }
  const fcpxmlPath = resolve(process.cwd(), rawFcpxml);
  if (!existsSync(fcpxmlPath)) throw new Error(`FCPXML file does not exist: ${fcpxmlPath}`);
  if (extname(fcpxmlPath).toLowerCase() !== '.fcpxml') {
    throw new Error('Palmier canary attachment requires a .fcpxml file. Rename-by-guessing from XML is not allowed.');
  }

  const inspection = inspectFcpxml(fcpxmlPath);
  assertTimelineShapedFcpxml(inspection);

  if (args.includes('--inspect-only')) {
    console.log(JSON.stringify(inspection, null, 2));
    process.exit(0);
  }

  const freshness = verifyFreshness(fcpxmlPath, valueFor('--export-started-at'));
  if (args.includes('--check-freshness-only')) {
    console.log(JSON.stringify({
      freshness,
      provenance: 'UNVERIFIED_BY_FRESHNESS',
      guardrails: [
        'FRESH_ARTIFACT != REAL_PALMIER_PROVENANCE',
        'FRESH_ARTIFACT != RESOLVE_IMPORT_VERIFIED',
      ],
    }, null, 2));
    process.exit(0);
  }

  if (!args.includes('--attest-real-palmier-export')) {
    throw new Error('Full attachment requires --attest-real-palmier-export. Structure/freshness inspection alone cannot prove Palmier provenance.');
  }

  if (!existsSync(sceneSpecPath)) {
    throw new Error('Palmier synthetic scene spec is missing. Run: node --no-warnings scripts/prepare-resolve-canary-inputs.mts palmier');
  }

  if (existsSync(manifestPath)) {
    const current = resolveCanaryInputManifestSchema.parse(JSON.parse(readFileSync(manifestPath, 'utf8')));
    if (current.canaryId !== canaryId) throw new Error(`Unexpected manifest at ${toMotionRelative(manifestPath)}.`);
    if (current.status === 'PREPARED' && !args.includes('--replace-attached-export')) {
      throw new Error('A PREPARED Palmier attachment already exists. Refusing to replace it without --replace-attached-export.');
    }
  }

  const fcpxmlHash = sha256(fcpxmlPath);
  const sceneSpecHash = sha256(sceneSpecPath);
  const prefix = fcpxmlHash.slice(0, 16);
  mkdirSync(attachedDir, {recursive: true});

  const copiedFcpxmlPath = join(attachedDir, `${prefix}-palmier-export.fcpxml`);
  if (resolve(fcpxmlPath) !== resolve(copiedFcpxmlPath)) copyFileSync(fcpxmlPath, copiedFcpxmlPath);

  const generatedAt = new Date().toISOString();
  const humanMaster = palmierCanaryHumanMasterSchema.parse({
    schemaVersion: 'palmier-resolve-canary-human-master/v1',
    canaryId,
    fixtureId: palmierFcpxmlSyntheticSceneSpec.fixtureId,
    generatedAt,
    generatedFromSceneSpecSha256: sceneSpecHash,
    actualExport: {
      fcpxmlSha256: fcpxmlHash,
      fcpxmlVersion: inspection.fcpxmlVersion,
      provenanceLevel: 'OPERATOR_ATTESTED_REAL_PALMIER_EXPORT',
      freshness,
    },
    timeline: palmierFcpxmlSyntheticSceneSpec.timeline,
    expectedElements: palmierFcpxmlSyntheticSceneSpec.requiredElements,
    expectedTransport: palmierFcpxmlSyntheticSceneSpec.expectedTransport,
    guardrails: [
      ...palmierFcpxmlSyntheticSceneSpec.guardrails,
      'HUMAN_MASTER_EXPECTATION != RESOLVE_OBSERVED_RESULT',
      'OPERATOR_ATTESTATION != CRYPTOGRAPHIC_PROVENANCE',
      'FILE_EXISTS != FRESH_EXPORT',
    ],
  });
  const humanMasterPath = join(attachedDir, `${prefix}-human-master.json`);
  writeJson(humanMasterPath, humanMaster);
  const humanMasterHash = sha256(humanMasterPath);

  const attachmentPath = join(attachedDir, `${prefix}-attachment.json`);
  const attachment = palmierRealExportAttachmentSchema.parse({
    schemaVersion: 'palmier-real-export-attachment/v1',
    canaryId,
    attachedAt: generatedAt,
    sourceBasename: basename(fcpxmlPath),
    copiedFcpxmlPath: toMotionRelative(copiedFcpxmlPath),
    fcpxmlSha256: fcpxmlHash,
    fcpxmlVersion: inspection.fcpxmlVersion,
    byteLength: statSync(copiedFcpxmlPath).size,
    freshness,
    sceneSpecSha256: sceneSpecHash,
    humanMasterPath: toMotionRelative(humanMasterPath),
    humanMasterSha256: humanMasterHash,
    operatorAttestation: {
      realPalmierExport: true,
      statement: 'I confirm this FCPXML was exported by Palmier using its DaVinci/Resolve export path from the neutral canary scene.',
    },
    provenanceLevel: 'OPERATOR_ATTESTED_REAL_PALMIER_EXPORT',
    guardrails: [
      'OPERATOR_ATTESTATION != CRYPTOGRAPHIC_PROVENANCE',
      'FCPXML_STRUCTURE_VALID != REAL_PALMIER_PROVENANCE',
      'FILE_EXISTS != FRESH_EXPORT',
      'FRESH_ARTIFACT != REAL_PALMIER_PROVENANCE',
      'PREPARED_INPUT != RESOLVE_IMPORT_VERIFIED',
      'PARSE_SUCCESS != TIMELINE_FIDELITY',
    ],
  });
  writeJson(attachmentPath, attachment);

  const manifest: ResolveCanaryInputManifest = resolveCanaryInputManifestSchema.parse({
    schemaVersion: 'resolve-canary-input-manifest/v1',
    canaryId,
    generatedAt,
    status: 'PREPARED',
    generator: {
      script: 'motion-studio/scripts/attach-palmier-real-export.mts',
      mode: 'palmier-real-attach',
    },
    files: [
      {
        id: 'palmier-real-fcpxml',
        role: 'Operator-attested fresh real Palmier DaVinci/Resolve FCPXML export',
        path: toMotionRelative(copiedFcpxmlPath),
        sha256: fcpxmlHash,
        metadata: {
          inspection,
          freshness,
          provenanceLevel: attachment.provenanceLevel,
          sourceBasename: attachment.sourceBasename,
        },
      },
      {
        id: 'human-master-sidecar',
        role: 'Expected synthetic-scene inventory and known transport/loss targets',
        path: toMotionRelative(humanMasterPath),
        sha256: humanMasterHash,
        metadata: {
          schemaVersion: humanMaster.schemaVersion,
          generatedFromSceneSpecSha256: sceneSpecHash,
        },
      },
      {
        id: 'palmier-scene-spec',
        role: 'Build specification used before the real Palmier export; support artifact only',
        path: toMotionRelative(sceneSpecPath),
        sha256: sceneSpecHash,
        metadata: {schemaVersion: palmierFcpxmlSyntheticSceneSpec.schemaVersion},
      },
      {
        id: 'palmier-export-attachment',
        role: 'Operator attestation + freshness + immutable export/sidecar hashes; support artifact only',
        path: toMotionRelative(attachmentPath),
        sha256: sha256(attachmentPath),
        metadata: {schemaVersion: attachment.schemaVersion, provenanceLevel: attachment.provenanceLevel, freshness},
      },
    ],
    humanMaster,
    expectedInventory: palmierFcpxmlSyntheticSceneSpec,
    nextAction: 'Prepare DV21-PALMIER-FCPXML-01 with --reuse-existing so the fresh attached PREPARED manifest is preserved, then execute the clean Resolve 21 import canary.',
    guardrails: Array.from(new Set([
      ...palmierFcpxmlSyntheticSceneSpec.guardrails,
      ...attachment.guardrails,
      'REAL_EXPORT_ATTACHMENT != RESOLVE_RUNTIME_EVIDENCE',
    ])),
  });
  writeJson(manifestPath, manifest);

  console.log(`✅ Attached fresh operator-attested Palmier export: ${toMotionRelative(copiedFcpxmlPath)}`);
  console.log(`   fcpxmlVersion=${inspection.fcpxmlVersion}`);
  console.log(`   fcpxmlSha256=${fcpxmlHash}`);
  console.log(`   exportStartedAt=${freshness.exportStartedAt}`);
  console.log(`   sourceModifiedAt=${freshness.sourceModifiedAt}`);
  console.log(`   humanMaster=${toMotionRelative(humanMasterPath)}`);
  console.log(`   manifest=${toMotionRelative(manifestPath)}`);
  console.log('   provenance=OPERATOR_ATTESTED_REAL_PALMIER_EXPORT');
  console.log('   freshnessVerified=YES');
  console.log('   runtimeVerified=NO');
  console.log('Next: node --no-warnings scripts/prepare-resolve-canary-session.mts DV21-PALMIER-FCPXML-01 --execution-id <ID> --reuse-existing');
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
