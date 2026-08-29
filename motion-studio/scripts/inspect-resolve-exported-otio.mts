import {createHash} from 'node:crypto';
import {readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const args = process.argv.slice(2);
const inputArg = args[0];
const outputIndex = args.indexOf('--output');
const outputArg = outputIndex >= 0 ? args[outputIndex + 1] : undefined;

if (!inputArg || inputArg.startsWith('--')) {
  console.error('Usage: node --no-warnings scripts/inspect-resolve-exported-otio.mts <resolve-export.otio> [--output report.json]');
  process.exit(1);
}

function sha256(buffer: Buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function walk(value: unknown, path: string, visit: (record: Record<string, unknown>, path: string) => void) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${path}[${index}]`, visit));
    return;
  }
  if (!value || typeof value !== 'object') return;
  const record = value as Record<string, unknown>;
  visit(record, path);
  for (const [key, child] of Object.entries(record)) walk(child, path ? `${path}.${key}` : key, visit);
}

try {
  const inputPath = resolve(process.cwd(), inputArg);
  const raw = readFileSync(inputPath);
  const parsed = JSON.parse(raw.toString('utf8')) as unknown;

  const schemaCounts: Record<string, number> = {};
  const tracks: Array<{name: string; kind: unknown}> = [];
  const clips: Array<{name: string; schema: string; sourceRange: unknown}> = [];
  const gaps: Array<{name: string; sourceRange: unknown}> = [];
  const transitions: Array<{name: string; transitionType: unknown; inOffset: unknown; outOffset: unknown}> = [];
  const markers: Array<{name: string; schema: string; markedRange: unknown}> = [];
  const effects: Array<{name: string; effectName: unknown; path: string; hasResolveMetadata: boolean}> = [];
  const resolveMetadata: Array<{path: string; keys: string[]}> = [];

  walk(parsed, '', (record, path) => {
    const schema = typeof record.OTIO_SCHEMA === 'string' ? record.OTIO_SCHEMA : null;
    if (schema) schemaCounts[schema] = (schemaCounts[schema] ?? 0) + 1;

    if (schema === 'Track.1') tracks.push({name: String(record.name ?? ''), kind: record.kind ?? null});
    if (schema === 'Clip.1' || schema === 'Clip.2') {
      clips.push({name: String(record.name ?? ''), schema, sourceRange: record.source_range ?? null});
    }
    if (schema === 'Gap.1') gaps.push({name: String(record.name ?? ''), sourceRange: record.source_range ?? null});
    if (schema === 'Transition.1') {
      transitions.push({
        name: String(record.name ?? ''),
        transitionType: record.transition_type ?? null,
        inOffset: record.in_offset ?? null,
        outOffset: record.out_offset ?? null,
      });
    }
    if (schema?.startsWith('Marker.')) {
      markers.push({name: String(record.name ?? ''), schema, markedRange: record.marked_range ?? null});
    }
    if (schema === 'Effect.1') {
      const metadata = record.metadata && typeof record.metadata === 'object' ? record.metadata as Record<string, unknown> : {};
      effects.push({
        name: String(record.name ?? ''),
        effectName: record.effect_name ?? null,
        path,
        hasResolveMetadata: Object.prototype.hasOwnProperty.call(metadata, 'Resolve_OTIO'),
      });
    }

    const metadata = record.metadata;
    if (metadata && typeof metadata === 'object' && !Array.isArray(metadata)) {
      const metadataRecord = metadata as Record<string, unknown>;
      if (Object.prototype.hasOwnProperty.call(metadataRecord, 'Resolve_OTIO')) {
        const resolveValue = metadataRecord.Resolve_OTIO;
        const keys = resolveValue && typeof resolveValue === 'object' && !Array.isArray(resolveValue)
          ? Object.keys(resolveValue as Record<string, unknown>).sort()
          : [];
        resolveMetadata.push({path: path ? `${path}.metadata.Resolve_OTIO` : 'metadata.Resolve_OTIO', keys});
      }
    }
  });

  const report = {
    schemaVersion: 'resolve-exported-otio-inspection/v1',
    inspectedAt: new Date().toISOString(),
    inputPath,
    sha256: sha256(raw),
    rootSchema: parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>).OTIO_SCHEMA ?? null
      : null,
    schemaCounts,
    editorialCore: {tracks, clips, gaps, transitions, markers},
    effects,
    resolveVendorMetadata: {
      present: resolveMetadata.length > 0,
      occurrences: resolveMetadata,
    },
    guardrails: [
      'RESOLVE_OTIO_METADATA_PRESENT != CROSS_NLE_EFFECT_SEMANTICS',
      'RESOLVE_NATIVE_EFFECT_SERIALIZED != STANDARD_OTIO_EFFECT_PORTABILITY',
      'OTIO_EFFECT_RECORD != OPENFX_EFFECT_ROUNDTRIP',
      'INSPECTION_REPORT != CLEAN_REIMPORT_PROOF',
    ],
  };

  const output = `${JSON.stringify(report, null, 2)}\n`;
  if (outputArg) writeFileSync(resolve(process.cwd(), outputArg), output, 'utf8');
  process.stdout.write(output);
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
