import type {GeneratedAssetProvenance} from './generatedAsset.schema.ts';

const lineList = (items: string[]) => (items.length ? items.map((item) => `- ${item}`).join('\n') : '- none');

/**
 * Converts the canonical generated-asset provenance/intent record into a bounded execution brief.
 * This does not call a generator. It prevents a provider-specific agent from silently changing
 * references, model surface or high-impact creative intent when a generation is retried.
 */
export function buildGeneratedAssetInstruction(asset: GeneratedAssetProvenance): string {
  const references = asset.references.length
    ? asset.references
        .map((reference) => `- ${reference.role}: ${reference.pathOrId}${reference.note ? ` (${reference.note})` : ''}`)
        .join('\n')
    : '- none';

  const parameters = Object.entries(asset.parameters).length
    ? Object.entries(asset.parameters)
        .map(([key, value]) => `- ${key}: ${String(value)}`)
        .join('\n')
    : '- none recorded';

  return [
    `Target provider: ${asset.provider}`,
    `Host product: ${asset.hostProduct}`,
    `Model: ${asset.model}${asset.modelVersion ? ` / ${asset.modelVersion}` : ''}`,
    `Availability: ${asset.availability} (checked ${asset.availabilityCheckedAt})`,
    `Asset kind: ${asset.kind}`,
    `Rebuild class: ${asset.rebuildClass}`,
    '',
    'Purpose:',
    asset.humanIntent.purpose,
    '',
    'Prompt:',
    asset.prompt,
    asset.negativePrompt ? `\nNegative prompt:\n${asset.negativePrompt}` : '',
    '',
    'Reference assets (do not silently substitute missing references):',
    references,
    '',
    'Generation parameters:',
    parameters,
    '',
    'Must preserve:',
    lineList(asset.humanIntent.mustPreserve),
    '',
    'May vary:',
    lineList(asset.humanIntent.mayVary),
    '',
    'Forbidden changes:',
    lineList(asset.humanIntent.forbiddenChanges),
    '',
    'Execution guardrails:',
    '- Abort if the requested provider/host/model surface is unavailable instead of silently switching models.',
    '- Abort if a required reference asset is missing.',
    '- Do not infer or replace an important real person/photo/copy/scene decision from prompt ambiguity.',
    '- Preserve the generated source output as an authoritative artifact unless deterministic regeneration has been reproduced.',
    '- Record the actual provider/host/model/version/settings used if the execution surface differs from this brief.',
    '',
    'Post-generation verification:',
    '- Save the output file and SHA-256 when available.',
    '- Record observed C2PA/content-credential/watermark state separately from expected state.',
    '- Human-review the must-preserve and forbidden-change constraints.',
    '- Do not promote REBUILD_INTENT to exact reproducibility from one successful retry.',
  ]
    .filter((line) => line !== '')
    .join('\n');
}
