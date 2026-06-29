interface StatCardProps {
  label: string;
  value: number | string;
  icon: string;
  accent?: string;
}

export function StatCard({ label, value, icon, accent = "text-navy-700 dark:text-sand-100" }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-sand-200 p-5 flex items-center gap-4 shadow-sm dark:bg-navy-800 dark:border-navy-600">
      <div className="text-2xl">{icon}</div>
      <div>
        <p className={`text-2xl font-bold ${accent}`}>{value}</p>
        <p className="text-sm text-navy-500 dark:text-navy-300">{label}</p>
      </div>
    </div>
  );
}
