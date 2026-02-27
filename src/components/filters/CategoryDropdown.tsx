import { useMemo } from 'react';
import { useFilters } from '../../hooks/useFilters';
import { useDashboard } from '../../context/DashboardContext';

export function CategoryDropdown() {
  const { filters, setFilters } = useFilters();
  const { state } = useDashboard();

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of state.allPartners) {
      set.add(p.category || 'Uncategorized');
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [state.allPartners]);

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-text-muted">Category</label>
      <select
        value={filters.category}
        onChange={(e) => setFilters({ category: e.target.value })}
        className="bg-surface-700 border border-border rounded px-2 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent-500"
      >
        <option value="All">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
