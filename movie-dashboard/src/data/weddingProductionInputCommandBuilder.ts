export type WeddingProductionInputProject = "opening" | "profile";

export type WeddingProductionInputCommandRequest = {
  project: WeddingProductionInputProject;
  mediaSource: string;
  bgmSource?: string;
};

export type WeddingProductionInputCommandPreview = {
  state: "READY" | "INPUT_REQUIRED";
  command: string | null;
  errors: string[];
};

function isPlaceholder(value: string) {
  return /\/ABS(?:OLUTE)?\/PATH\/TO\//i.test(value) || /<[^>]+>/.test(value);
}

function validateMacAbsolutePath(label: string, rawValue: string, required: boolean) {
  const value = rawValue.trim();
  if (!value) return required ? `${label} is required` : null;
  if (!value.startsWith("/")) return `${label} must be an absolute macOS path beginning with /`;
  if (isPlaceholder(value)) return `${label} must be a real path, not a placeholder`;
  return null;
}

function shellQuote(value: string) {
  return `'${value.split("'").join(`'\\''`)}'`;
}

export function buildWeddingProductionInputGeneratorCommand(
  request: WeddingProductionInputCommandRequest,
): WeddingProductionInputCommandPreview {
  const mediaSource = request.mediaSource.trim();
  const bgmSource = request.bgmSource?.trim() ?? "";
  const errors = [
    validateMacAbsolutePath("mediaSource", mediaSource, true),
    validateMacAbsolutePath("bgmSource", bgmSource, false),
  ].filter((error): error is string => Boolean(error));

  if (errors.length > 0) return {state: "INPUT_REQUIRED", command: null, errors};

  const args = [
    "node --no-warnings scripts/wedding-production-input-plan.mts",
    `--movie=${request.project}`,
    `--media-source=${shellQuote(mediaSource)}`,
  ];
  if (bgmSource) args.push(`--bgm-source=${shellQuote(bgmSource)}`);

  return {
    state: "READY",
    command: `cd motion-studio && ${args.join(" ")}`,
    errors: [],
  };
}
