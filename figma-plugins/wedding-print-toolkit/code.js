const MIN_FONT_DEFAULT = 8;

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}

function findAllTextNodes(root) {
  const out = [];
  if (!root) return out;
  if (root.type === 'TEXT') out.push(root);
  if ('children' in root) {
    for (const child of root.children) out.push(...findAllTextNodes(child));
  }
  return out;
}

function numericFontSizes(node) {
  if (typeof node.fontSize === 'number') return [node.fontSize];
  const sizes = [];
  for (let i = 0; i < node.characters.length; i += 1) {
    const value = node.getRangeFontSize(i, i + 1);
    if (typeof value === 'number') sizes.push(value);
  }
  return sizes;
}

function makeIssue(node, type, severity, message, detail = '') {
  return {
    nodeId: node.id,
    nodeName: node.name,
    type,
    severity,
    message,
    detail,
  };
}

async function runTypographyQa(minFontSize) {
  const roots = figma.currentPage.selection.length > 0
    ? figma.currentPage.selection
    : [figma.currentPage];
  const textNodes = roots.flatMap(findAllTextNodes);
  const issues = [];

  for (const node of textNodes) {
    if (node.hasMissingFont) {
      issues.push(makeIssue(node, 'missing-font', 'error', 'Missing font', 'このテキストは編集・再レイアウト時に崩れる可能性があります。'));
      continue;
    }

    const sizes = numericFontSizes(node);
    if (sizes.length > 0) {
      const min = Math.min(...sizes);
      if (min < minFontSize) {
        issues.push(makeIssue(node, 'small-text', 'warning', `Small text: ${min.toFixed(1)}`, `設定閾値 ${minFontSize} 未満です。原寸印刷で確認してください。`));
      }
    }

    if (node.characters.trim().length === 0) {
      issues.push(makeIssue(node, 'empty-text', 'info', 'Empty text layer', '不要レイヤーまたは未入力プレースホルダーの可能性があります。'));
    }

    if (node.characters.includes('TODO') || node.characters.includes('PLACEHOLDER') || node.characters.includes('仮')) {
      issues.push(makeIssue(node, 'placeholder', 'warning', 'Possible placeholder text', 'TODO / PLACEHOLDER / 仮 の文字列を検出しました。'));
    }
  }

  return { scanned: textNodes.length, issues };
}

async function ensureTokens() {
  const collectionName = 'Wedding Print Tokens';
  const current = await figma.variables.getLocalVariableCollectionsAsync();
  let collection = current.find((c) => c.name === collectionName);
  if (!collection) collection = figma.variables.createVariableCollection(collectionName);
  const modeId = collection.modes[0].modeId;

  const colors = {
    'Common/Navy': '#152B46',
    'Common/Ivory': '#FAF7EF',
    'Common/MutedRed': '#B65B52',
    'Common/Sage': '#C8D7C8',
    'Common/Sky': '#62B7E8',
    'Common/Yellow': '#FFD83D',
    'Common/Gold': '#B99A5B',
    'Rurubu/Blue': '#1E5DA8',
    'Rurubu/Red': '#EF5247',
    'Passport/Navy': '#12233D',
    'Ticket/Ink': '#24382F',
  };

  const existing = await figma.variables.getLocalVariablesAsync('COLOR');
  const made = [];
  const updated = [];

  for (const [name, hex] of Object.entries(colors)) {
    let variable = existing.find((v) => v.variableCollectionId === collection.id && v.name === name);
    if (!variable) {
      variable = figma.variables.createVariable(name, collection, 'COLOR');
      made.push(name);
    } else {
      updated.push(name);
    }
    const rgb = hexToRgb(hex);
    variable.setValueForMode(modeId, { ...rgb, a: 1 });
    variable.description = `Wedding paper items token ${hex}`;
  }

  return { collection: collection.name, made, updated };
}

async function selectNode(nodeId) {
  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node || node.removed) return false;
  figma.currentPage.selection = [node];
  figma.viewport.scrollAndZoomIntoView([node]);
  return true;
}

if (figma.command === 'bootstrap-tokens') {
  ensureTokens()
    .then((result) => figma.closePlugin(`Tokens ready: ${result.made.length} created, ${result.updated.length} updated`))
    .catch((error) => figma.closePlugin(`Token bootstrap failed: ${String(error)}`));
} else {
  figma.showUI(__html__, { width: 420, height: 560, themeColors: true });
  figma.ui.onmessage = async (msg) => {
    try {
      if (msg.type === 'run-qa') {
        const threshold = Number.isFinite(msg.minFontSize) ? msg.minFontSize : MIN_FONT_DEFAULT;
        const result = await runTypographyQa(threshold);
        figma.ui.postMessage({ type: 'qa-result', ...result, threshold });
      } else if (msg.type === 'select-node') {
        const ok = await selectNode(msg.nodeId);
        figma.ui.postMessage({ type: 'select-result', ok });
      } else if (msg.type === 'close') {
        figma.closePlugin();
      }
    } catch (error) {
      figma.ui.postMessage({ type: 'error', message: String(error) });
    }
  };
}
