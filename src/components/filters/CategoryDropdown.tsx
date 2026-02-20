import { useFilters } from '../../hooks/useFilters';
import type { PartnerCategory } from '../../types/partner';

const options: Array<PartnerCategory | 'All'> = [
  'All',
  'AI & Automation Tools',
  'Customer Communication Tools',
  'Marketing Platforms',
  'Scheduling & Dispatch Tools',
  'Other Trade-Specific Platforms',
];

export function CategoryDropdown() {
  const { filters, setFilters } = useFilters();

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-text-muted">Category</label>
      <select
        value={filters.category}
        onChange={(e) => setFilters({ category: e.target.value as PartnerCategory | 'All' })}
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
