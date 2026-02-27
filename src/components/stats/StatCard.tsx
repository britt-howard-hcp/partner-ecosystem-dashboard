interface StatCardProps {
  label: string;
  value: number | string;
  borderColor: string;
  onClick?: () => void;
}

export function StatCard({ label, value, borderColor, onClick }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg bg-surface-800 border-l-4 ${borderColor} px-5 py-4 flex-1 min-w-[140px] transition-colors hover:bg-surface-700 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <p className="text-sm text-text-muted">{label}</p>
      <p className="text-2xl font-bold text-text-primary mt-1">{value}</p>
    </div>
  );
}
