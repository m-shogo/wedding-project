type FindingLevel = 'info' | 'warn' | 'error';

type Finding = {
  nodeId: string;
  nodeName: string;
  level: FindingLevel;
  rule: string;
  message: string;
};

type ScanOptions = {
  minFontSize: number;
  longTextChars: number;
};

figma.showUI(__html__, { width: 420, height: 560, themeColors: true });

function walk(node: BaseNode, output: TextNode[]) {
  if (node.type === 'TEXT') output.push(node);
  if ('children' in node) {
    for (const child of node.children) walk(child, output);
  }
}

function selectedScopeTextNodes(): TextNode[] {
  const output: TextNode[] = [];
  const roots = figma.currentPage.selection.length
    ? figma.currentPage.selection
    : figma.currentPage.children;
  for (const root of roots) walk(root, output);
  return output;
}

function scanText(nodes: TextNode[], options: ScanOptions): Finding[] {
  const findings: Finding[] = [];

  for (const node of nodes) {
    if (node.hasMissingFont) {
      findings.push({
        nodeId: node.id,
        nodeName: node.name,
        level: 'error',
        rule: 'missing-font',
        message: 'Missing fontがあります。印刷前にfont解決が必要です。',
      });
    }

    const sizes = node
      .getStyledTextSegments(['fontSize'])
      .map((segment) => segment.fontSize)
      .filter((value): value is number => typeof value === 'number');

    if (sizes.length) {
      const min = Math.min(...sizes);
      if (min < options.minFontSize) {
        findings.push({
          nodeId: node.id,
          nodeName: node.name,
          level: 'warn',
          rule: 'small-font',
          message: `最小font size ${min.toFixed(1)} が暫定閾値 ${options.minFontSize} 未満です。原寸試し刷りで確認してください。`,
        });
      }
    }

    if (node.textAutoResize === 'NONE' && node.characters.trim().length > 0) {
      findings.push({
        nodeId: node.id,
        nodeName: node.name,
        level: 'info',
        rule: 'fixed-text-box',
        message: '固定サイズText boxです。実データ差し替え時のoverflow候補として確認してください。',
      });
    }

    if (node.characters.length > options.longTextChars) {
      findings.push({
        nodeId: node.id,
        nodeName: node.name,
        level: 'info',
        rule: 'long-copy',
        message: `文字数 ${node.characters.length}。長文stress test対象です。`,
      });
    }
  }

  return findings;
}

figma.ui.onmessage = async (message) => {
  if (message?.type === 'scan') {
    const options: ScanOptions = {
      minFontSize: Number(message.minFontSize) || 8,
      longTextChars: Number(message.longTextChars) || 120,
    };
    const nodes = selectedScopeTextNodes();
    const findings = scanText(nodes, options);
    figma.ui.postMessage({
      type: 'scan-result',
      scannedTextNodes: nodes.length,
      findings,
      scope: figma.currentPage.selection.length ? 'selection' : 'page',
    });
  }

  if (message?.type === 'select-node' && typeof message.nodeId === 'string') {
    const node = await figma.getNodeByIdAsync(message.nodeId);
    if (node && 'visible' in node) {
      figma.currentPage.selection = [node as SceneNode];
      figma.viewport.scrollAndZoomIntoView([node as SceneNode]);
    }
  }
};
