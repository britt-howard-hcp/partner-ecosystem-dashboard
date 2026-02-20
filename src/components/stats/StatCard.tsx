interface StatCardProps {
  label: string;
  value: number | string;
  borderColor: string; // Tailwind class e.g. "border-stage-active"
}

export function StatCard({ label, value, borderColor }: StatCardProps) {
  return (
    <div
      className={`rounded-lg bg-surface-800 border-l-4 ${borderColor} px-5 py-4 flex-1 min-w-[140px] transition-colors hover:bg-surface-700`}
    >
      <p className="text-sm text-text-muted">{label}</p>
      <p className="text-2xl font-bold text-text-primary mt-1">{value}</p>
    </div>
  );
}
