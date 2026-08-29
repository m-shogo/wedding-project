import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {basename, dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {resolveCanaryInputManifestSchema} from '../src/data/resolveCanaryInputFixtures.ts';
import {otioCurrentReleaseCoordinate, resolveOTIOInterchangeCanary} from '../src/data/resolveOTIOInterchange.ts';

const motionRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outRoot = join(motionRoot, 'out', 'canary-inputs', 'otio');
const mediaDir = join(outRoot, 'media');
const manifestDir = join(motionRoot, 'out', 'canary-inputs', 'manifests');
const dryRun = process.argv.slice(2).includes('--dry-run');
const canaryId = resolveOTIOInterchangeCanary.id;
const rate = 30;

function toMotionRelative(path: string) {
  return relative(motionRoot, path).replaceAll('\\', '/');
}

function ensureDir(path: string) {
  if (!dryRun) mkdirSync(path, {recursive: true});
}

function sha256(path: string) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function run(command: string, args: string[]) {
  console.log(`▶ ${command} ${args.join(' ')}`);
  if (dryRun) return;
  const result = spawnSync(command, args, {cwd: motionRoot, stdio: 'inherit'});
  if (result.status !== 0) throw new Error(`${command} failed (${result.status ?? 'unknown'}).`);
}

function rt(value: number) {
  return {OTIO_SCHEMA: 'RationalTime.1', rate, value};
}

function timeRange(start: number, duration: number) {
  return {OTIO_SCHEMA: 'TimeRange.1', duration: rt(duration), start_time: rt(start)};
}

function externalReference(name: string, targetUrl: string, durationFrames: number) {
  return {
    OTIO_SCHEMA: 'ExternalReference.1',
    metadata: {},
    name,
    available_range: timeRange(0, durationFrames),
    available_image_bounds: null,
    target_url: targetUrl,
  };
}

function clip(name: string, mediaName: string, targetUrl: string, sourceStart: number, duration: number, available: number) {
  return {
    OTIO_SCHEMA: 'Clip.2',
    metadata: {},
    name,
    source_range: timeRange(sourceStart, duration),
    markers: [],
    enabled: true,
    effects: [],
    color: null,
    active_media_reference_key: 'DEFAULT_MEDIA',
    media_references: {
      DEFAULT_MEDIA: externalReference(mediaName, targetUrl, available),
    },
  };
}

function gap(name: string, duration: number) {
  return {
    OTIO_SCHEMA: 'Gap.1',
    metadata: {},
    name,
    source_range: timeRange(0, duration),
    markers: [],
    enabled: true,
    effects: [],
    color: null,
  };
}

function marker(name: string, frame: number) {
  return {
    OTIO_SCHEMA: 'Marker.2',
    metadata: {},
    name,
    color: 'RED',
    comment: 'Neutral OTIO interchange marker',
    marked_range: timeRange(frame, 1),
  };
}

function transition(name: string, handles: number) {
  return {
    OTIO_SCHEMA: 'Transition.1',
    metadata: {},
    name,
    in_offset: rt(handles),
    out_offset: rt(handles),
    transition_type: 'SMPTE_Dissolve',
  };
}

function buildTimeline(targets: {videoA: string; videoB: string; audio: string}) {
  return {
    OTIO_SCHEMA: 'Timeline.1',
    metadata: {
      weddingProjectCanary: {
        id: canaryId,
        fixtureSchemaAuthority: otioCurrentReleaseCoordinate.fixtureSchemaAuthority,
        standardsOnlyInput: true,
      },
    },
    name: 'OTIO_CANARY_EDITORIAL_CORE',
    global_start_time: rt(0),
    tracks: {
      OTIO_SCHEMA: 'Stack.1',
      metadata: {},
      name: 'tracks',
      source_range: null,
      effects: [],
      markers: [],
      enabled: true,
      children: [
        {
          OTIO_SCHEMA: 'Track.1',
          metadata: {},
          name: 'V1_OTIO_CANARY',
          source_range: null,
          effects: [],
          markers: [marker('OTIO_CANARY_MARKER', 120)],
          enabled: true,
          kind: 'Video',
          children: [
            clip('OTIO_CLIP_A', 'otio-video-a.mp4', targets.videoA, 0, 60, 120),
            transition('OTIO_CANARY_DISSOLVE', 15),
            clip('OTIO_CLIP_B', 'otio-video-b.mp4', targets.videoB, 30, 60, 120),
            gap('OTIO_CANARY_GAP', 30),
            clip('OTIO_CLIP_A_REPEAT', 'otio-video-a.mp4', targets.videoA, 60, 30, 120),
          ],
        },
        {
          OTIO_SCHEMA: 'Track.1',
          metadata: {},
          name: 'A1_OTIO_CANARY',
          source_range: null,
          effects: [],
          markers: [],
          enabled: true,
          kind: 'Audio',
          children: [
            clip('OTIO_AUDIO', 'otio-tone.wav', targets.audio, 0, 180, 180),
          ],
        },
      ],
    },
  };
}

function writeJson(path: string, value: unknown) {
  console.log(`→ ${toMotionRelative(path)}`);
  if (!dryRun) writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function zipOTIOZ(output: string, contentPath: string, mediaPaths: string[]) {
  const python = [
    'import sys, zipfile',
    'out, content, *media = sys.argv[1:]',
    "with zipfile.ZipFile(out, 'w') as z:",
    "    z.writestr('version.txt', '1.0.0', compress_type=zipfile.ZIP_DEFLATED)",
    "    z.write(content, 'content.otio', compress_type=zipfile.ZIP_DEFLATED)",
    "    for path in media:",
    "        z.write(path, 'media/' + path.split('/')[-1], compress_type=zipfile.ZIP_STORED)",
  ].join('\n');
  run('python3', ['-c', python, output, contentPath, ...mediaPaths]);
}

try {
  ensureDir(outRoot);
  ensureDir(mediaDir);
  ensureDir(manifestDir);

  const videoA = join(mediaDir, 'otio-video-a.mp4');
  const videoB = join(mediaDir, 'otio-video-b.mp4');
  const audio = join(mediaDir, 'otio-tone.wav');
  const plainPath = join(outRoot, 'neutral-editorial-core.otio');
  const bundleContentPath = join(outRoot, 'neutral-editorial-core-bundle-content.otio');
  const otiozPath = join(outRoot, 'neutral-editorial-core.otioz');
  const humanMasterPath = join(outRoot, 'otio-human-master.json');
  const manifestPath = join(manifestDir, `${canaryId}.json`);

  run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-f', 'lavfi', '-i', 'testsrc2=size=320x180:rate=30:duration=4', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-an', '-y', videoA]);
  run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-f', 'lavfi', '-i', 'smptebars=size=320x180:rate=30', '-t', '4', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-an', '-y', videoB]);
  run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-f', 'lavfi', '-i', 'sine=frequency=660:duration=6:sample_rate=48000', '-ac', '2', '-c:a', 'pcm_s24le', '-y', audio]);

  const absoluteTargets = {
    videoA: pathToFileURL(videoA).href,
    videoB: pathToFileURL(videoB).href,
    audio: pathToFileURL(audio).href,
  };
  const bundleTargets = {
    videoA: 'media/otio-video-a.mp4',
    videoB: 'media/otio-video-b.mp4',
    audio: 'media/otio-tone.wav',
  };

  const plainTimeline = buildTimeline(absoluteTargets);
  const bundleTimeline = buildTimeline(bundleTargets);

  if (JSON.stringify(plainTimeline).includes('Resolve_OTIO') || JSON.stringify(bundleTimeline).includes('Resolve_OTIO')) {
    throw new Error('Neutral OTIO fixture must not contain Resolve_OTIO vendor metadata.');
  }

  writeJson(plainPath, plainTimeline);
  writeJson(bundleContentPath, bundleTimeline);

  if (dryRun) {
    console.log(`DRY RUN: would package ${toMotionRelative(otiozPath)} with version.txt, content.otio and three unique media basenames.`);
    console.log('DRY RUN: no fixture files or manifests were written.');
    process.exit(0);
  }

  for (const path of [videoA, videoB, audio, plainPath, bundleContentPath]) {
    if (!existsSync(path)) throw new Error(`Expected OTIO fixture input missing: ${path}`);
  }
  const basenames = [videoA, videoB, audio].map((path) => basename(path));
  if (new Set(basenames).size !== basenames.length) throw new Error('OTIOZ media basenames must be unique.');

  zipOTIOZ(otiozPath, bundleContentPath, [videoA, videoB, audio]);
  if (!existsSync(otiozPath)) throw new Error('OTIOZ package was not created.');

  const expectedInventory = {
    fps: rate,
    timelineName: 'OTIO_CANARY_EDITORIAL_CORE',
    tracks: [
      {name: 'V1_OTIO_CANARY', kind: 'Video'},
      {name: 'A1_OTIO_CANARY', kind: 'Audio'},
    ],
    clips: [
      {name: 'OTIO_CLIP_A', sourceStartFrames: 0, durationFrames: 60, media: 'otio-video-a.mp4'},
      {name: 'OTIO_CLIP_B', sourceStartFrames: 30, durationFrames: 60, media: 'otio-video-b.mp4'},
      {name: 'OTIO_CLIP_A_REPEAT', sourceStartFrames: 60, durationFrames: 30, media: 'otio-video-a.mp4'},
      {name: 'OTIO_AUDIO', sourceStartFrames: 0, durationFrames: 180, media: 'otio-tone.wav'},
    ],
    gap: {name: 'OTIO_CANARY_GAP', durationFrames: 30},
    transition: {name: 'OTIO_CANARY_DISSOLVE', type: 'SMPTE_Dissolve', inFrames: 15, outFrames: 15},
    marker: {name: 'OTIO_CANARY_MARKER', frame: 120, durationFrames: 1},
    standardsOnlyInput: true,
    resolveVendorMetadataExpectedInInput: false,
  };

  const humanMaster = {
    schemaVersion: 'resolve-otio-human-master/v1',
    canaryId,
    generatedAt: new Date().toISOString(),
    otioReleaseAuthority: otioCurrentReleaseCoordinate,
    expectedInventory,
    boundaries: {
      plainOtio: 'EDITORIAL_METADATA_PLUS_EXTERNAL_MEDIA_REFERENCES',
      otioz: 'EDITORIAL_METADATA_PLUS_REFERENCED_MEDIA_BUNDLE',
      resolveVendorMetadata: 'OBSERVE_ON_RESOLVE_EXPORT_SEPARATELY',
    },
    guardrails: [
      'OTIO_IMPORT_SUCCESS != EFFECT_FIDELITY',
      'OTIO_FILE != MEDIA_PACKAGE',
      'OTIOZ_MEDIA_BUNDLED != DEPENDENCY_COMPLETE',
      'RESOLVE_OTIO_METADATA_PRESENT != CROSS_NLE_EFFECT_SEMANTICS',
      'LATEST_DOCS_DEV_VERSION != CURRENT_RELEASE_VERSION',
    ],
  };
  writeJson(humanMasterPath, humanMaster);

  const mediaFiles = [videoA, videoB, audio].map((path) => ({
    id: basename(path),
    role: 'Synthetic referenced media',
    path: toMotionRelative(path),
    sha256: sha256(path),
    metadata: {copyrightedContent: false},
  }));

  const manifest = resolveCanaryInputManifestSchema.parse({
    schemaVersion: 'resolve-canary-input-manifest/v1',
    canaryId,
    generatedAt: new Date().toISOString(),
    status: 'PREPARED',
    generator: {
      script: 'motion-studio/scripts/prepare-resolve-otio-fixture.mts',
      mode: 'otio',
    },
    files: [
      {
        id: 'neutral-otio',
        role: 'Standards-only plain OTIO with external media references',
        path: toMotionRelative(plainPath),
        sha256: sha256(plainPath),
        metadata: {otioSchemaAuthority: 'v0.18.1', containsResolveVendorMetadata: false},
      },
      {
        id: 'neutral-otioz',
        role: 'OTIOZ bundle with content.otio, version.txt and referenced synthetic media',
        path: toMotionRelative(otiozPath),
        sha256: sha256(otiozPath),
        metadata: {bundleVersion: '1.0.0', mediaBasenames: basenames},
      },
      {
        id: 'otio-human-master',
        role: 'Expected editorial inventory and interchange boundaries; not Resolve runtime evidence',
        path: toMotionRelative(humanMasterPath),
        sha256: sha256(humanMasterPath),
        metadata: {schemaVersion: humanMaster.schemaVersion},
      },
      ...mediaFiles,
    ],
    humanMaster,
    expectedInventory,
    nextAction: 'Validate the neutral fixture, then execute DV21-OTIO-INTERCHANGE-01 in disposable Resolve 21 contexts. Compare plain OTIO, OTIOZ, Resolve-exported OTIO and clean reimport separately.',
    guardrails: humanMaster.guardrails,
  });
  writeJson(manifestPath, manifest);

  console.log(`\n✅ Neutral OTIO interchange fixture prepared: ${toMotionRelative(manifestPath)}`);
  console.log(`   otio=${toMotionRelative(plainPath)} sha256=${sha256(plainPath)}`);
  console.log(`   otioz=${toMotionRelative(otiozPath)} sha256=${sha256(otiozPath)}`);
  console.log(`   schemaAuthority=${otioCurrentReleaseCoordinate.fixtureSchemaAuthority}`);
  console.log('   standardsOnlyInput=YES');
  console.log('   resolveRuntimeVerified=NO');
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
