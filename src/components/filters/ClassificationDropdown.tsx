import { useFilters } from '../../hooks/useFilters';
import type { Classification } from '../../types/partner';

const options: Array<Classification | 'All'> = [
  'All',
  'Core Conflict',
  'Controlled',
  'Open',
];

export function ClassificationDropdown() {
  const { filters, setFilters } = useFilters();

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-text-muted">Classification</label>
      <select
        value={filters.classification}
        onChange={(e) => setFilters({ classification: e.target.value as Classification | 'All' })}
        className="bg-surface-700 border border-border rounded px-2 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
