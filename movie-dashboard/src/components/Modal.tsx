import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}

export function Modal({ open, onClose, title, children, wide }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-xl shadow-xl mx-4 max-h-[90vh] overflow-auto dark:bg-navy-800 dark:border dark:border-navy-600 ${
          wide ? "w-full max-w-3xl" : "w-full max-w-lg"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-sand-100 flex items-center justify-between dark:border-navy-600">
          <h2 className="text-lg font-bold text-navy-800 dark:text-sand-100">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-navy-400 hover:text-navy-700 text-xl leading-none dark:text-navy-300 dark:hover:text-white"
          >
            &times;
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
