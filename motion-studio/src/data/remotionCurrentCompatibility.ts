export const remotionCurrentReleaseCoordinate = {
  checkedAt: '2026-08-26',
  repoLockedVersion: '4.0.475',
  currentReleaseVersion: '4.0.517',
  currentReleasedAt: '2026-08-25T15:09:07Z',
  source: 'remotion-dev/remotion GitHub releases/latest',
  major: 4,
  v5Status: 'NOT_CURRENT_STABLE_REVALIDATION_REQUIRED',
} as const;

export const remotionWeddingCompatibilityPolicy = {
  sourceOfTruth: 'WEDDING_REPO_CODE_AND_CANONICAL_MOTION_REGISTRY',
  latestCompatibilityState: 'EPHEMERAL_CI_GREEN_RUNTIME_STUDIO_QA_REQUIRED',
  productionDependencyUpgradeState: 'NOT_REQUESTED_YET',
  rules: [
    'LATEST_RELEASE_AVAILABLE != WEDDING_REPO_COMPATIBLE',
    'EPHEMERAL_CI_GREEN != PRODUCTION_LOCKFILE_UPGRADED',
    'CI_RENDER_GREEN != LOCAL_STUDIO_INTERACTION_VERIFIED',
    'STUDIO_INTERACTIVE != SOURCE_OF_TRUTH_MOVED_OUT_OF_CODE',
    'ELEMENT_PREVIEW_MATCH != CLEAN_PROJECT_INSTALL_VERIFIED',
    'ELEMENT_INSTALL_REQUEST_ACCEPTED != INSTALL_CONFIRMED',
    'ELEMENT_SOURCE_PUBLIC != SAFE_FOR_SECRETS_OR_PRIVATE_ASSET_URLS',
    'ELEMENT_DEPENDENCY_DECLARED != DEPENDENCY_POLICY_APPROVED',
    'CUSTOM_EDITOR_FEATURE_NAME != CUSTOM_INSPECTOR_VALUE_EDITOR',
    'REMOTION_V4_LICENSE != REMOTION_V5_LICENSE',
  ],
} as const;

export const remotionCurrentCompatibilityEvidence = {
  canaryRunId: 32973905349,
  candidateVersion: '4.0.517',
  baselineVersion: '4.0.475',
  environment: 'GitHub Actions ubuntu-latest / Node 22 / pnpm 10',
  checks: {
    baselineFrozenInstall: 'PASS',
    baselineTypeScript: 'PASS',
    candidateInstallAllDirectRemotionPackages: 'PASS',
    candidateTypeScript: 'PASS_AFTER_COMPATIBILITY_FIX',
    canonicalMotionContracts: 'PASS',
    compositionDiscovery: 'PASS',
    neutralH264Render1920x1080: 'PASS',
    ffprobeReadback: 'PASS',
  },
  discoveredCompatibilityFixes: [
    {
      fingerprint: 'REMOTION_PATH_SAMPLING_NULLABLE_TYPE',
      files: [
        'src/components/opening/PlaneOnRoute.tsx',
        'src/compositions/opening/StampRushFullRoute.tsx',
      ],
      cause: '@remotion/paths current 4.x types expose the planned v5 null return for out-of-range path sampling.',
      resolution: 'Handle null explicitly with fail-soft rendering/fallback instead of non-null assertions.',
      normalVisualChangeExpected: false,
    },
  ],
  remainingBeforeProductionUpgrade: [
    'Local Remotion Studio launch on the target Mac.',
    'Open representative Wedding compositions and confirm canvas/timeline interaction.',
    'Exercise crop/source-replacement controls that motivate the upgrade.',
    'Run a deliberate package/lock update only after local Studio QA is acceptable.',
  ],
} as const;

export const remotionCurrentFeatureDelta = [
  {
    id: 'studio-crop',
    introducedBy: '4.0.500',
    weddingValue: 'HIGH',
    expectedUse: 'Human-friendly crop/source replacement workflow inside Studio for visual elements.',
    adoption: 'EVALUATE_AFTER_COMPATIBILITY',
  },
  {
    id: 'studio-code-editor-integration',
    introducedBy: '4.0.503',
    weddingValue: 'MEDIUM',
    expectedUse: 'Open compositions/sequences/errors in VS Code/Cursor/etc. Config.setDefaultEditor() also supports custom executable definitions.',
    adoption: 'INSTRUCTION_RELIABILITY_CANDIDATE',
    correction: 'The release phrase “custom editors” refers to choosing/configuring the external code editor, not custom Inspector property widgets.',
  },
  {
    id: 'studio-3d-transform-controls',
    introducedBy: '4.0.508',
    weddingValue: 'MEDIUM',
    expectedUse: 'Potentially reduce code-only friction for simple perspective/3D adjustments.',
    adoption: 'EVALUATE_ONLY_WHEN_WEDDING_RECIPE_NEEDS_3D',
  },
  {
    id: 'zod-description-tooltips',
    introducedBy: '4.0.508',
    weddingValue: 'HIGH',
    expectedUse: 'Expose Human Master guidance directly in Studio prop editor via zod .describe() text.',
    adoption: 'HUMAN_ADJUSTABILITY_CANDIDATE',
  },
  {
    id: 'agent-skills-and-context',
    introducedBy: '4.0.503-4.0.516+',
    weddingValue: 'HIGH',
    expectedUse: 'Reduce Codex/Claude instruction ambiguity by keeping Remotion-specific agent guidance current and copying focused context from Studio surfaces.',
    adoption: 'INSTRUCTION_RELIABILITY_CANDIDATE',
  },
  {
    id: 'elements-studio-protocol',
    introducedBy: '4.0.5xx-current',
    weddingValue: 'VERY_HIGH',
    expectedUse: 'Reuse one self-contained component implementation for Player preview and source-copyable Studio insertion instead of maintaining a separate gallery implementation.',
    adoption: 'REUSE_BEFORE_BUILD_CANDIDATE',
  },
  {
    id: 'studio-library-browser',
    introducedBy: '4.0.517',
    weddingValue: 'VERY_HIGH',
    expectedUse: 'Browse Elements/external libraries inside Studio, potentially making Motion Zukan recipes directly discoverable in the editing surface.',
    adoption: 'REUSE_BEFORE_BUILD_CANDIDATE',
  },
  {
    id: 'renderer-fast-start',
    introducedBy: '4.0.517',
    weddingValue: 'MEDIUM',
    expectedUse: 'More robust container-aware Fast Start publishing behavior for rendered media.',
    adoption: 'COMPATIBILITY_BENEFIT',
  },
  {
    id: 'gsap-package',
    introducedBy: '4.0.517',
    weddingValue: 'LOW_UNTIL_NEEDED',
    expectedUse: 'Alternative animation integration only where existing Remotion primitives cannot express the Human Master cleanly.',
    adoption: 'DO_NOT_ADD_BY_DEFAULT',
  },
] as const;

export const remotionStudioProtocolBoundary = {
  officialBehavior: [
    'An Element carries component source code plus insertion metadata.',
    'Studio writes installed source to an .element.tsx file.',
    'Only dependencies declared by the Element payload are installed.',
    'The same component implementation can back Player preview and installed Element source.',
    'createElementPayload() validates the payload before install/drag delivery.',
    'installInStudio() and drag delivery require confirmation in Studio.',
    'Before confirmation Studio shows destination, source code and declared dependencies.',
    'Element source and package lifecycle scripts execute with project file/network access after confirmation.',
  ],
  createElementPayloadV1Limits: {
    maxPayloadCharactersExclusive: 250000,
    maxSourceCodeCharactersExclusive: 200000,
    maxDependencies: 100,
    durationInFrames: {min: 1, max: 100000000},
    sourceComponentRule: 'EXACTLY_ONE_EXPORTED_NAMED_REACT_COMPONENT',
    slugRule: 'SAFE_LOWERCASE_ELEMENT_SLUG',
    installationModes: ['wrapped', 'component-owned-sequence'],
    authority: 'remotion-dev/remotion v4.0.517 packages/studio-protocol/src/element-payload.ts',
  },
  weddingPolicy: [
    'Motion Zukan canonical metadata remains the semantic source of truth.',
    'Element source should reference or derive from canonical recipe values rather than becoming a second independent master.',
    'Use official createElementPayload() instead of reimplementing payload validation.',
    'Do not embed secrets, private wedding asset URLs, paid-template source, API keys or personal tokens in Element source/payload.',
    'Keep dependencies minimal and allowlisted; dependency installation is a security boundary, not a convenience-only step.',
    'Clean-project installation and preview-vs-installed visual comparison are required before TRUSTED reuse.',
  ],
} as const;

export const remotionLicenseCoordinate = {
  version: '4.0.517',
  checkedAt: '2026-08-26',
  source: 'remotion-dev/remotion v4.0.517 LICENSE.md',
  freeEligibilitySummary: ['individual', 'for-profit organization up to 3 employees', 'non-profit/not-for-profit', 'evaluation'],
  v5ChangeAnnounced: true,
  guardrail: 'REMOTION_V4_LICENSE != REMOTION_V5_LICENSE',
} as const;
