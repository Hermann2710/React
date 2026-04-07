interface StatCardProps {
  label: string;
  value: string;
  change: string;
}

export function StatCard({ label, value, change }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-2xl font-semibold text-foreground">{value}</p>
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
          {change}
        </span>
      </div>
    </div>
  );
}
