import {AbsoluteFill, staticFile} from 'remotion';
import {PhotoLayoutEngine} from '../../motion-kit/engines';

const STOCK_PHOTOS = [
  staticFile('demo-assets/stock-photos/pexels-17630524-1280x720.jpg'),
  staticFile('demo-assets/stock-photos/pexels-18858568-1280x720.jpg'),
  staticFile('demo-assets/stock-photos/pexels-27687897-1280x720.jpg'),
  staticFile('demo-assets/stock-photos/pexels-33741754-1280x720.jpg'),
];

function StockLayout({variant, label}: {variant: 'contact-sheet' | 'split-panel' | 'panel-grid'; label: string}) {
  return (
    <AbsoluteFill style={{backgroundColor: '#0d2035'}}>
      <PhotoLayoutEngine variant={variant} count={variant === 'split-panel' ? 2 : 4} intensity="M" mediaSources={STOCK_PHOTOS} />
      <div style={{position: 'absolute', left: 28, bottom: 24, padding: '8px 12px', background: 'rgba(5,18,31,0.76)', color: '#fff', fontFamily: 'Arial, sans-serif', fontSize: 15, letterSpacing: '0.12em'}}>
        {label} · STOCK DEMO / NOT USER MEDIA
      </div>
    </AbsoluteFill>
  );
}

export function VisualMotionContactSheetStockV1() {
  return <StockLayout variant="contact-sheet" label="CONTACT SHEET" />;
}

export function VisualMotionSplitPanelStockV1() {
  return <StockLayout variant="split-panel" label="SPLIT PANEL" />;
}

export function VisualMotionPanelGridStockV1() {
  return <StockLayout variant="panel-grid" label="PANEL GRID" />;
}
