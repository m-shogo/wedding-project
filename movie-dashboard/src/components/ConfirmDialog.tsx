import { Modal } from "./Modal";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  danger,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className="text-sm text-navy-600 mb-6 dark:text-navy-200">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm rounded-lg border border-sand-200 text-navy-600 hover:bg-sand-50"
        >
          キャンセル
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`px-4 py-2 text-sm rounded-lg text-white ${
            danger
              ? "bg-red-600 hover:bg-red-700"
              : "bg-navy-700 hover:bg-navy-800"
          }`}
        >
          実行
        </button>
      </div>
    </Modal>
  );
}
