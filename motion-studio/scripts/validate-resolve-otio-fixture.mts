import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resolveCanaryInputManifestSchema} from '../src/data/resolveCanaryInputFixtures.ts';
import {otioCurrentReleaseCoordinate, resolveOTIOInterchangeCanary} from '../src/data/resolveOTIOInterchange.ts';

const motionRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const canaryId = resolveOTIOInterchangeCanary.id;
const defaultManifest = join(motionRoot, 'out', 'canary-inputs', 'manifests', `${canaryId}.json`);
const manifestPath = resolve(process.argv[2] ?? defaultManifest);

function fail(message: string): never {
  throw new Error(message);
}

function sha256(path: string) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function fileById(manifest: ReturnType<typeof resolveCanaryInputManifestSchema.parse>, id: string) {
  const entry = manifest.files.find((file) => file.id === id);
  if (!entry) fail(`Manifest is missing required file id: ${id}`);
  return entry;
}

function absoluteFromManifest(path: string) {
  return resolve(motionRoot, path);
}

function collect(node: unknown, predicate: (value: Record<string, unknown>) => boolean): Record<string, unknown>[] {
  const found: Record<string, unknown>[] = [];
  const visit = (value: unknown) => {
    if (Array.isArray(value)) {
      for (const item of value) visit(item);
      return;
    }
    if (!value || typeof value !== 'object') return;
    const record = value as Record<string, unknown>;
    if (predicate(record)) found.push(record);
    for (const child of Object.values(record)) visit(child);
  };
  visit(node);
  return found;
}

function validateTimelineShape(timeline: unknown, label: string, bundleMode: boolean) {
  if (!timeline || typeof timeline !== 'object') fail(`${label}: root is not an object.`);
  const root = timeline as Record<string, unknown>;
  if (root.OTIO_SCHEMA !== 'Timeline.1') fail(`${label}: expected Timeline.1.`);
  if (root.name !== 'OTIO_CANARY_EDITORIAL_CORE') fail(`${label}: unexpected timeline name.`);
  if (JSON.stringify(timeline).includes('Resolve_OTIO')) fail(`${label}: neutral input contains forbidden Resolve_OTIO metadata.`);

  const clips = collect(timeline, (value) => value.OTIO_SCHEMA === 'Clip.2');
  const legacyClips = collect(timeline, (value) => value.OTIO_SCHEMA === 'Clip.1');
  if (legacyClips.length) fail(`${label}: legacy Clip.1 found; stable fixture authority requires Clip.2.`);
  const expectedClipNames = ['OTIO_CLIP_A', 'OTIO_CLIP_B', 'OTIO_CLIP_A_REPEAT', 'OTIO_AUDIO'];
  const clipNames = clips.map((clip) => String(clip.name));
  for (const name of expectedClipNames) {
    if (!clipNames.includes(name)) fail(`${label}: expected clip missing: ${name}`);
  }

  const markers = collect(timeline, (value) => value.OTIO_SCHEMA === 'Marker.2');
  if (!markers.some((marker) => marker.name === 'OTIO_CANARY_MARKER')) fail(`${label}: Marker.2 canary marker missing.`);
  const devMarkers = collect(timeline, (value) => value.OTIO_SCHEMA === 'Marker.3');
  if (devMarkers.length) fail(`${label}: Marker.3 is a dev-main schema and must not enter the v0.18.1 fixture.`);

  const gaps = collect(timeline, (value) => value.OTIO_SCHEMA === 'Gap.1');
  if (!gaps.some((gap) => gap.name === 'OTIO_CANARY_GAP')) fail(`${label}: canary Gap.1 missing.`);
  const transitions = collect(timeline, (value) => value.OTIO_SCHEMA === 'Transition.1');
  const transition = transitions.find((item) => item.name === 'OTIO_CANARY_DISSOLVE');
  if (!transition || transition.transition_type !== 'SMPTE_Dissolve') fail(`${label}: expected SMPTE_Dissolve transition missing.`);

  const tracks = collect(timeline, (value) => value.OTIO_SCHEMA === 'Track.1');
  const trackPairs = tracks.map((track) => `${track.name}:${track.kind}`);
  for (const expected of ['V1_OTIO_CANARY:Video', 'A1_OTIO_CANARY:Audio']) {
    if (!trackPairs.includes(expected)) fail(`${label}: expected track missing: ${expected}`);
  }

  const rationalTimes = collect(timeline, (value) => value.OTIO_SCHEMA === 'RationalTime.1');
  if (!rationalTimes.length) fail(`${label}: no RationalTime objects found.`);
  for (const time of rationalTimes) {
    if (time.rate !== 30) fail(`${label}: RationalTime rate must stay 30 for this fixture.`);
  }

  const externalRefs = collect(timeline, (value) => value.OTIO_SCHEMA === 'ExternalReference.1');
  if (externalRefs.length !== 4) fail(`${label}: expected exactly four ExternalReference objects, got ${externalRefs.length}.`);
  for (const reference of externalRefs) {
    const targetUrl = String(reference.target_url ?? '');
    if (bundleMode) {
      if (!targetUrl.startsWith('media/')) fail(`${label}: OTIOZ content target_url must be bundle-relative media/..., got ${targetUrl}`);
      if (targetUrl.includes('\\')) fail(`${label}: OTIOZ bundle target_url must use forward slashes.`);
    } else if (!targetUrl.startsWith('file:')) {
      fail(`${label}: plain OTIO target_url must identify the exact external local file with file: URL, got ${targetUrl}`);
    }
  }
}

function readOTIOZ(path: string) {
  const python = [
    'import json, sys, zipfile',
    'path = sys.argv[1]',
    "with zipfile.ZipFile(path, 'r') as z:",
    '    names = z.namelist()',
    "    version = z.read('version.txt').decode('utf-8') if 'version.txt' in names else None",
    "    content = z.read('content.otio').decode('utf-8') if 'content.otio' in names else None",
    "    compress = {i.filename: i.compress_type for i in z.infolist()}",
    'print(json.dumps({"names": names, "version": version, "content": content, "compress": compress}))',
  ].join('\n');
  const result = spawnSync('python3', ['-c', python, path], {cwd: motionRoot, encoding: 'utf8'});
  if (result.status !== 0) fail(`Unable to inspect OTIOZ with python zipfile: ${result.stderr || result.stdout}`);
  return JSON.parse(result.stdout) as {
    names: string[];
    version: string | null;
    content: string | null;
    compress: Record<string, number>;
  };
}

try {
  if (!existsSync(manifestPath)) fail(`OTIO manifest not found: ${manifestPath}`);
  const manifest = resolveCanaryInputManifestSchema.parse(JSON.parse(readFileSync(manifestPath, 'utf8')));
  if (manifest.canaryId !== canaryId) fail(`Wrong canaryId: ${manifest.canaryId}`);
  if (manifest.status !== 'PREPARED') fail(`OTIO manifest must be PREPARED, got ${manifest.status}`);

  const requiredIds = [
    'neutral-otio',
    'neutral-otioz',
    'otio-human-master',
    'otio-video-a.mp4',
    'otio-video-b.mp4',
    'otio-tone.wav',
  ];
  for (const id of requiredIds) {
    const entry = fileById(manifest, id);
    const path = absoluteFromManifest(entry.path);
    if (!existsSync(path)) fail(`Manifest file is missing on disk: ${id} -> ${path}`);
    const actualHash = sha256(path);
    if (actualHash !== entry.sha256) fail(`SHA-256 mismatch for ${id}: manifest=${entry.sha256} actual=${actualHash}`);
  }

  const plainEntry = fileById(manifest, 'neutral-otio');
  const plainTimeline = JSON.parse(readFileSync(absoluteFromManifest(plainEntry.path), 'utf8'));
  validateTimelineShape(plainTimeline, 'plain OTIO', false);

  const bundleEntry = fileById(manifest, 'neutral-otioz');
  const bundleInspection = readOTIOZ(absoluteFromManifest(bundleEntry.path));
  const expectedEntries = [
    'version.txt',
    'content.otio',
    'media/otio-video-a.mp4',
    'media/otio-video-b.mp4',
    'media/otio-tone.wav',
  ];
  const sortedActual = [...bundleInspection.names].sort();
  const sortedExpected = [...expectedEntries].sort();
  if (JSON.stringify(sortedActual) !== JSON.stringify(sortedExpected)) {
    fail(`OTIOZ entries mismatch. expected=${sortedExpected.join(',')} actual=${sortedActual.join(',')}`);
  }
  if (bundleInspection.version !== '1.0.0') fail(`OTIOZ version.txt must be 1.0.0, got ${bundleInspection.version}`);
  if (!bundleInspection.content) fail('OTIOZ content.otio is missing or empty.');
  validateTimelineShape(JSON.parse(bundleInspection.content), 'OTIOZ content.otio', true);

  // Python zipfile constants: ZIP_STORED=0, ZIP_DEFLATED=8. Match OTIO v0.18.1 adapter behavior.
  for (const mediaPath of expectedEntries.filter((entry) => entry.startsWith('media/'))) {
    if (bundleInspection.compress[mediaPath] !== 0) fail(`OTIOZ media must be ZIP_STORED: ${mediaPath}`);
  }
  for (const compressedPath of ['version.txt', 'content.otio']) {
    if (bundleInspection.compress[compressedPath] !== 8) fail(`OTIOZ ${compressedPath} must be ZIP_DEFLATED.`);
  }

  const humanEntry = fileById(manifest, 'otio-human-master');
  const humanMaster = JSON.parse(readFileSync(absoluteFromManifest(humanEntry.path), 'utf8')) as Record<string, any>;
  if (humanMaster.schemaVersion !== 'resolve-otio-human-master/v1') fail('Unexpected OTIO Human Master schemaVersion.');
  if (humanMaster.canaryId !== canaryId) fail('OTIO Human Master canaryId mismatch.');
  if (humanMaster.otioReleaseAuthority?.currentReleasedVersion !== otioCurrentReleaseCoordinate.currentReleasedVersion) {
    fail('OTIO Human Master release authority drifted from the machine-readable current release coordinate.');
  }
  if (humanMaster.expectedInventory?.resolveVendorMetadataExpectedInInput !== false) {
    fail('Neutral OTIO Human Master must explicitly expect no Resolve vendor metadata in input.');
  }

  if (JSON.stringify(manifest).includes('Resolve_OTIO')) {
    fail('Prepared neutral manifest unexpectedly contains Resolve_OTIO vendor metadata text.');
  }

  console.log('✅ Resolve OTIO fixture validation passed.');
  console.log(`   canary=${canaryId}`);
  console.log(`   otioReleaseAuthority=${otioCurrentReleaseCoordinate.currentReleasedVersion}`);
  console.log(`   clipSchema=${otioCurrentReleaseCoordinate.fixtureClipSchema}`);
  console.log(`   markerSchema=${otioCurrentReleaseCoordinate.fixtureMarkerSchema}`);
  console.log('   standardsOnlyInput=YES');
  console.log('   otiozBundleLayout=VALID');
  console.log('   resolveRuntimeVerified=NO');
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
