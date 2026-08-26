import {z} from 'zod';

export const resolveDrfxDependencySchema = z.object({
  fonts: z.array(z.string()),
  luts: z.array(z.string()),
  ofx: z.array(z.string()),
  plugins: z.array(z.string()),
  externalAssets: z.array(z.string()),
});

export const resolveDrfxExposedControlSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  kind: z.enum(['COLOR_GROUP', 'NUMBER', 'POINT', 'TEXT', 'CHOICE', 'OTHER']),
  sourceOp: z.string().min(1),
  source: z.string().min(1),
  defaultValue: z.number().nullable(),
  humanPurpose: z.string().min(1),
});

export const resolveDrfxFixtureSpecSchema = z.object({
  schemaVersion: z.literal('resolve-drfx-fixture-spec/v1'),
  canaryId: z.literal('DV21-DRFX-FREE-01'),
  fixtureId: z.literal('wedding-neutral-solid-generator-v1'),
  displayName: z.literal('Wedding Neutral Solid'),
  category: z.literal('Edit/Generators'),
  settingSourcePath: z.string().min(1),
  archiveSettingPath: z.literal('Edit/Generators/WeddingNeutralSolid/WeddingNeutralSolid.setting'),
  outputPath: z.literal('out/canary-inputs/drfx/WeddingNeutralSolid.drfx'),
  target: z.object({
    resolveMajor: z.literal(21),
    editions: z.array(z.enum(['FREE', 'STUDIO'])).min(1),
    platforms: z.array(z.enum(['MACOS', 'WINDOWS', 'LINUX'])).min(1),
  }),
  dependencies: resolveDrfxDependencySchema,
  exposedControls: z.array(resolveDrfxExposedControlSchema).min(1).max(8),
  expectedHumanAdjustability: z.literal('EASY_INSPECTOR'),
  runtimeState: z.literal('PENDING_RUNTIME'),
  guardrails: z.array(z.string().min(1)).min(1),
});

export const resolveDrfxFixtureManifestSchema = z.object({
  schemaVersion: z.literal('resolve-drfx-fixture-manifest/v1'),
  generatedAt: z.string().datetime(),
  fixtureId: z.literal('wedding-neutral-solid-generator-v1'),
  canaryId: z.literal('DV21-DRFX-FREE-01'),
  category: z.literal('Edit/Generators'),
  drfxPath: z.string().min(1),
  drfxSha256: z.string().regex(/^[a-f0-9]{64}$/),
  settingSourcePath: z.string().min(1),
  settingSourceSha256: z.string().regex(/^[a-f0-9]{64}$/),
  archiveEntries: z.array(z.object({
    path: z.string().min(1),
    sha256: z.string().regex(/^[a-f0-9]{64}$/),
    byteLength: z.number().int().positive(),
    timestampPolicy: z.literal('FIXED_1980_01_01_00_00_00'),
  })).min(1),
  dependencies: resolveDrfxDependencySchema,
  exposedControls: z.array(resolveDrfxExposedControlSchema).min(1).max(8),
  packagingVerification: z.object({
    zipReadable: z.literal(true),
    expectedHierarchyOnly: z.literal(true),
    noPathTraversal: z.literal(true),
    deterministicArchiveExpected: z.literal(true),
  }),
  runtimeState: z.literal('PENDING_RUNTIME'),
  guardrails: z.array(z.string().min(1)).min(1),
});

export type ResolveDrfxFixtureSpec = z.infer<typeof resolveDrfxFixtureSpecSchema>;
export type ResolveDrfxFixtureManifest = z.infer<typeof resolveDrfxFixtureManifestSchema>;
