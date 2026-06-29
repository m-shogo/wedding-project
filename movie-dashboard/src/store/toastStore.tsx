import { createContext, useCallback, useContext, useReducer } from "react";
import type { ReactNode } from "react";

interface ToastItem {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

type Action =
  | { kind: "add"; toast: ToastItem }
  | { kind: "remove"; id: string };

function reducer(state: ToastItem[], action: Action): ToastItem[] {
  switch (action.kind) {
    case "add":
      return [...state, action.toast];
    case "remove":
      return state.filter((t) => t.id !== action.id);
  }
}

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (message: string, type: ToastItem["type"]) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, dispatch] = useReducer(reducer, []);

  const removeToast = useCallback((id: string) => {
    dispatch({ kind: "remove", id });
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastItem["type"]) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      dispatch({ kind: "add", toast: { id, message, type } });
      setTimeout(() => dispatch({ kind: "remove", id }), 3000);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast container */}
      {toasts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
          {toasts.map((t) => {
            const bg =
              t.type === "success"
                ? "bg-emerald-600"
                : t.type === "error"
                  ? "bg-red-600"
                  : "bg-navy-700";
            const icon = t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ";
            return (
              <div
                key={t.id}
                className={`${bg} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[240px] max-w-sm animate-slide-in`}
              >
                <span className="text-sm font-bold shrink-0">{icon}</span>
                <span className="text-sm flex-1">{t.message}</span>
                <button
                  onClick={() => removeToast(t.id)}
                  className="text-white/70 hover:text-white text-lg leading-none shrink-0"
                >
                  &times;
                </button>
              </div>
            );
          })}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
