import { useFilters } from '../../hooks/useFilters';

export function DateRangePicker() {
  const { filters, setFilters } = useFilters();

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-text-muted">From</label>
      <input
        type="date"
        value={filters.dateStart}
        onChange={(e) => setFilters({ dateStart: e.target.value })}
        className="bg-surface-700 border border-border rounded px-2 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent-500"
      />
      <label className="text-xs text-text-muted">To</label>
      <input
        type="date"
        value={filters.dateEnd}
        onChange={(e) => setFilters({ dateEnd: e.target.value })}
        className="bg-surface-700 border border-border rounded px-2 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent-500"
      />
    </div>
  );
}
