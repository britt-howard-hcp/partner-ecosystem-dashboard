import { useFilters } from '../../hooks/useFilters';
import type { IntegrationType } from '../../types/partner';

const options: Array<IntegrationType | 'All'> = [
  'All',
  'API',
  'Webhook',
  'OAuth',
  'Embedded',
  'Data Sync',
  'White Label',
];

export function IntegrationTypeDropdown() {
  const { filters, setFilters } = useFilters();

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-text-muted">Integration</label>
      <select
        value={filters.integrationType}
        onChange={(e) => setFilters({ integrationType: e.target.value as IntegrationType | 'All' })}
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
