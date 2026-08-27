// Rurubu WEDDING V10 — Figma AI-Look Structural Linter
//
// Execution surface: Figma Plugin API / Figma.use_figma.
// This is intentionally NOT a Node.js script; it expects the `figma` global.
// Read docs/rurubu-v10/RURUBU-V10-AI-LOOK-LINTER-VISUAL-DIFF.md before use.
//
// The script is read-only. It returns a JSON-serializable live structural report.

const page = figma.root.children.find(p => p.id === '2787:2');
if (!page) throw new Error('V10 production page 2787:2 not found');
await figma.setCurrentPageAsync(page);

const FRAME_IDS = [
  '2787:3', '2787:9', '2787:15', '2787:22',
  '2787:28', '2787:35', '2787:42', '2787:49',
];

const ROLES = [
  'COVER', 'PROFILE', 'Q&A', 'STORY',
  'TIMELINE + MEMORY', 'MEMORY SPOTS + GALLERY',
  '1DAY + CAFE TABLE', 'BACK COVER',
];

const IGNORE_NAME = /TRIM|BLEED|SAFE|GUIDE/i;
const round3 = n => Math.round(n * 1000) / 1000;

function hasVisibleImageFill(node) {
  if (!('fills' in node) || !Array.isArray(node.fills)) return false;
  return node.fills.some(p => p && p.type === 'IMAGE' && p.visible !== false);
}

function collectMeaningfulShapes(root) {
  const rb = root.absoluteBoundingBox;
  if (!rb) return [];

  return root.findAll(n => {
    if (!('visible' in n) || n.visible === false) return false;
    if (!['FRAME', 'RECTANGLE', 'ELLIPSE', 'POLYGON', 'STAR'].includes(n.type)) return false;
    if (IGNORE_NAME.test(n.name)) return false;
    const b = n.absoluteBoundingBox;
    if (!b) return false;
    const area = (b.width * b.height) / (rb.width * rb.height);
    return area >= 0.008 && area <= 0.92;
  }).map(n => {
    const b = n.absoluteBoundingBox;
    const radius = ('cornerRadius' in n && typeof n.cornerRadius === 'number')
      ? Math.round(n.cornerRadius)
      : null;

    return {
      id: n.id,
      name: n.name,
      type: n.type,
      x: round3((b.x - rb.x) / rb.width),
      y: round3((b.y - rb.y) / rb.height),
      w: round3(b.width / rb.width),
      h: round3(b.height / rb.height),
      area: round3((b.width * b.height) / (rb.width * rb.height)),
      radius,
      rotation: 'rotation' in n ? Math.round((n.rotation || 0) * 10) / 10 : 0,
    };
  });
}

function signatureDistance(a, b) {
  if (!a.length || !b.length) return 1;
  const used = new Set();
  let cost = 0;
  let matched = 0;

  for (const source of a) {
    let best = Infinity;
    let bestIndex = -1;
    for (let i = 0; i < b.length; i++) {
      if (used.has(i)) continue;
      const target = b[i];
      const distance =
        Math.abs(source.x - target.x) +
        Math.abs(source.y - target.y) +
        Math.abs(source.w - target.w) +
        Math.abs(source.h - target.h);
      if (distance < best) {
        best = distance;
        bestIndex = i;
      }
    }
    if (bestIndex >= 0 && best < 0.32) {
      used.add(bestIndex);
      cost += best;
      matched++;
    }
  }

  const coverage = matched / Math.max(a.length, b.length);
  const mean = matched ? cost / matched : 1;
  return Math.min(1, (1 - coverage) * 0.65 + mean * 0.35);
}

const reports = [];

for (let index = 0; index < FRAME_IDS.length; index++) {
  const root = await figma.getNodeByIdAsync(FRAME_IDS[index]);
  if (!root || root.type !== 'FRAME') continue;

  const shapes = collectMeaningfulShapes(root);
  const descendants = root.findAll(n => 'visible' in n && n.visible !== false);
  const texts = descendants.filter(n => n.type === 'TEXT');
  const imageNodes = descendants.filter(hasVisibleImageFill);

  const rotatedShapeCount = shapes.filter(s => Math.abs(s.rotation) >= 0.5).length;
  const edgeShapeCount = shapes.filter(s =>
    s.x < 0.03 || s.y < 0.03 || s.x + s.w > 0.97 || s.y + s.h > 0.97
  ).length;

  const sizeGroups = {};
  const radiusGroups = {};
  for (const shape of shapes) {
    const sizeKey = `${Math.round(shape.w * 100)}x${Math.round(shape.h * 100)}`;
    sizeGroups[sizeKey] = (sizeGroups[sizeKey] || 0) + 1;
    if (shape.radius != null) radiusGroups[shape.radius] = (radiusGroups[shape.radius] || 0) + 1;
  }

  const repeatedSizeMax = Math.max(0, ...Object.values(sizeGroups));
  const repeatedRadiusMax = Math.max(0, ...Object.values(radiusGroups));
  const sortedAreas = shapes.map(s => s.area).sort((a, b) => b - a);
  const dominance = sortedAreas.length > 1
    ? sortedAreas[0] / Math.max(sortedAreas[1], 0.001)
    : (sortedAreas.length ? 99 : 0);

  // Canonical docs define PRODUCTION_CANDIDATE as having meaningful copy/editorial
  // structure AND rendered visual content. One native text node alone must not promote
  // a transport/mask skeleton into scored production mode.
  const hasMeaningfulText = texts.length >= 2;
  const hasMeaningfulImage = imageNodes.length >= 1;
  const productionCandidate = hasMeaningfulText && hasMeaningfulImage;
  const mode = productionCandidate ? 'PRODUCTION_CANDIDATE' : 'PREPROD_SKELETON';
  const fatal = [];
  const warnings = [];

  const equalModuleGrid = repeatedSizeMax >= 4;
  const uniformCornerRadius =
    shapes.length >= 4 &&
    repeatedRadiusMax / Math.max(shapes.length, 1) >= 0.6;

  if (!productionCandidate) {
    if (!hasMeaningfulText && !hasMeaningfulImage) {
      warnings.push('PREPROD_SKELETON_NO_TEXT_OR_IMAGE');
    } else if (!hasMeaningfulImage) {
      warnings.push('PREPROD_SKELETON_NO_RENDERED_IMAGE');
    } else {
      warnings.push('PREPROD_SKELETON_INSUFFICIENT_EDITORIAL_TEXT');
    }
  }
  if (equalModuleGrid) fatal.push('EQUAL_MODULE_GRID');
  if (uniformCornerRadius) fatal.push('UNIFORM_CORNER_RADIUS');
  if (shapes.length >= 4 && dominance < 1.25) warnings.push('WEAK_DOMINANT_GESTURE');
  if (shapes.length >= 5 && rotatedShapeCount === 0) warnings.push('ZERO_CONTROLLED_IMPERFECTION');
  if (shapes.length >= 5 && edgeShapeCount === 0) warnings.push('NO_EDGE_TENSION');

  if (texts.length > 0) {
    const centeredText = texts.filter(t => t.textAlignHorizontal === 'CENTER').length;
    if (centeredText / texts.length >= 0.8) fatal.push('CENTERED_EVERYTHING_TEXT');
  }

  reports.push({
    page: `P0${index + 1}`,
    frameId: root.id,
    role: ROLES[index],
    mode,
    contentReadiness: {
      hasMeaningfulText,
      hasMeaningfulImage,
    },
    shapeCount: shapes.length,
    textCount: texts.length,
    imageFillCount: imageNodes.length,
    repeatedSizeMax,
    repeatedRadiusMax,
    dominance: round3(dominance),
    edgeShapeCount,
    rotatedShapeCount,
    fatal,
    warnings,
    shapes,
  });
}

const pairwise = [];
for (let i = 0; i < reports.length; i++) {
  for (let j = i + 1; j < reports.length; j++) {
    const distance = signatureDistance(reports[i].shapes, reports[j].shapes);
    const similarityPct = Math.round((1 - distance) * 100);
    if (similarityPct >= 55) {
      pairwise.push({
        a: reports[i].page,
        b: reports[j].page,
        similarityPct,
        severity:
          similarityPct >= 85 ? 'HIGH_RISK' :
          similarityPct >= 70 ? 'REVIEW' :
          'INFORMATIONAL',
      });
    }
  }
}

pairwise.sort((a, b) => b.similarityPct - a.similarityPct);

return {
  schemaVersion: 'rurubu-v10-ai-look-linter-report-v1',
  status: 'LIVE_READ_ONLY',
  pageId: page.id,
  pageName: page.name,
  reports,
  pairwiseHighSimilarity: pairwise,
  summary: {
    skeletonPages: reports.filter(p => p.mode === 'PREPROD_SKELETON').map(p => p.page),
    productionCandidatePages: reports.filter(p => p.mode === 'PRODUCTION_CANDIDATE').map(p => p.page),
    pagesWithFatalTell: reports.filter(p => p.fatal.length).map(p => ({page: p.page, fatal: p.fatal})),
    mostSimilarPairs: pairwise.slice(0, 8),
  },
};
