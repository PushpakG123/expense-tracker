type StatCardProps = {
  label: string;
  value: string;
  delta?: string;
  accent?: string;
};

const StatCard = ({ label, value, delta, accent = 'from-accent to-accent2' }: StatCardProps) => (
  <div className="card">
    <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
    <div className="mt-2 text-2xl font-bold">{value}</div>
    {delta && <div className="mt-2 text-xs text-slate-400">Trend: {delta}</div>}
    <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${accent}`} />
  </div>
);

export const StatsGrid = ({ stats }: { stats: StatCardProps[] }) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    {stats.map((s) => (
      <StatCard key={s.label} {...s} />
    ))}
  </div>
);
