import { Component, Suspense, lazy, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";

const MotionPinterestStable = lazy(async () => {
  const module = await import("./MotionPinterestStable");
  return { default: module.MotionPinterest };
});

interface BoundaryState {
  error: Error | null;
}

class MotionPinterestErrorBoundary extends Component<{ children: ReactNode }, BoundaryState> {
  state: BoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[MotionPinterest] render failed", error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="rounded-2xl border border-red-300 bg-red-50 p-5 text-red-900 dark:border-red-900 dark:bg-red-950/20 dark:text-red-100">
          <p className="text-xs font-black tracking-[0.16em]">MOTION PINTEREST ERROR</p>
          <h1 className="mt-2 text-xl font-black">映像Pinterestの読み込みでエラーが出ました</h1>
          <p className="mt-3 text-sm leading-6">
            白画面にはせず、原因をここに表示するよう変更しました。下のエラー内容を確認できます。
          </p>
          <pre className="mt-4 max-h-56 overflow-auto whitespace-pre-wrap rounded-xl bg-black/90 p-3 text-xs leading-5 text-white">
            {this.state.error.message || String(this.state.error)}
          </pre>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full bg-red-900 px-4 py-2 text-xs font-bold text-white"
            >
              再読み込み
            </button>
            <Link
              to="/movie-coach/motion-library"
              className="rounded-full border border-red-300 bg-white px-4 py-2 text-xs font-bold text-red-900 dark:bg-navy-900 dark:text-red-100"
            >
              一覧版を開く
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export function MotionPinterest() {
  return (
    <MotionPinterestErrorBoundary>
      <Suspense
        fallback={(
          <div className="mx-auto max-w-4xl p-6">
            <div className="rounded-2xl border border-sand-200 bg-white p-6 text-sm text-navy-600 shadow-sm dark:border-navy-700 dark:bg-navy-800 dark:text-navy-200">
              映像Pinterestを読み込んでいます…
            </div>
          </div>
        )}
      >
        <MotionPinterestStable />
      </Suspense>
    </MotionPinterestErrorBoundary>
  );
}
