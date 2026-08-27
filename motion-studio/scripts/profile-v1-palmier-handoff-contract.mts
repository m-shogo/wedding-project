import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const bundlePath = join(root, 'out/handoff/profile-v1/profile-v1-production-bundle.json');
const timelinePath = join(root, 'out/handoff/profile-v1/profile-v1-palmier-timeline.csv');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const sha = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

const blockers: string[] = [];
let bundle: any = null;
if (!existsSync(bundlePath)) {
  blockers.push('PROFILE_PALMIER_BUNDLE_MISSING');
} else {
  try {
    bundle = JSON.parse(readFileSync(bundlePath, 'utf8'));
  } catch {
    blockers.push('PROFILE_PALMIER_BUNDLE_INVALID_JSON');
  }
}

if (bundle) {
  if (bundle.schemaVersion !== 'profile-v1-production-bundle/v1') blockers.push('PROFILE_PALMIER_BUNDLE_SCHEMA_MISMATCH');
  if (bundle.authority !== 'FINAL_RENDER_BOUND_HANDOFF') blockers.push('PROFILE_PALMIER_BUNDLE_AUTHORITY_MISMATCH');
  if (bundle.palmier?.timelineCsv !== rel(timelinePath)) blockers.push('PROFILE_PALMIER_TIMELINE_PATH_MISMATCH');
  if (bundle.palmier?.generatedAccentAuthority !== 'PROFILE_V1_GENERATED_ACCENT_REGISTRY') blockers.push('PROFILE_PALMIER_ACCENT_AUTHORITY_MISSING');
}
if (!existsSync(timelinePath)) {
  blockers.push('PROFILE_PALMIER_TIMELINE_MISSING');
} else if (bundle && bundle.palmier?.timelineCsvSha256 !== sha(timelinePath)) {
  blockers.push('PROFILE_PALMIER_TIMELINE_SHA_STALE');
}

const report = {
  schemaVersion: 'profile-v1-palmier-handoff/v1',
  authority: 'MOTION_STUDIO_PROFILE_PALMIER_HANDOFF',
  current: blockers.length === 0,
  sourceAuthorities: [
    'src/data/profileV1ProductionPlan.ts#profileV1Chapters',
    'src/data/profileV1GeneratedAccentRegistry.ts#profileV1GeneratedAccentImplementations',
  ],
  artifacts: {
    sceneTimeline: {
      path: rel(timelinePath),
      shaBound: true,
      carries: [
        'chapter_boundary',
        'chapter_role',
        'edit_intent',
        'generated_accent_routes',
        'final_render_sha256',
      ],
    },
  },
  blockers,
  guardrails: [
    'HANDOFF_METADATA_EXPORTED != HANDOFF_ARTIFACTS_CURRENT',
    'PALMIER_TIMELINE_SHA_MATCH != MAC_DAVINCI_ACTUAL_VERIFIED',
    'PALMIER_HANDOFF_CURRENT != PRODUCTION_READY',
  ],
};

if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else console.log(`Profile Palmier handoff: ${report.current ? 'CURRENT' : 'NOT_EXPORTED_OR_STALE'} / blockers=${blockers.length}`);
if (process.argv.includes('--strict') && !report.current) process.exit(1);
