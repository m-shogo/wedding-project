import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function SectionCard({ title, children, className = "" }: SectionCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-sand-200 shadow-sm dark:bg-navy-800 dark:border-navy-600 ${className}`}>
      <div className="px-6 py-4 border-b border-sand-100 dark:border-navy-600">
        <h2 className="text-lg font-bold text-navy-800 dark:text-sand-100">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
