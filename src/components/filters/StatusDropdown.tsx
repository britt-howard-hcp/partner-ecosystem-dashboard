import { useFilters } from '../../hooks/useFilters';

const stages = [
  'All',
  'Unexplored',
  'Initial Call',
  'Discovery',
  'Pilot',
  'Signed Agreements',
  'Live',
  'Not Moving Forward',
  'Deactivated Partner',
  'Hidden Partner',
];

export function StatusDropdown() {
  const { filters, setFilters } = useFilters();

  // Display the friendly label for the pipeline group
  const displayValue = filters.airtableStatus === '__pipeline__' ? '__pipeline__' : filters.airtableStatus;

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-text-muted">Status</label>
      <select
        value={displayValue}
        onChange={(e) => setFilters({ airtableStatus: e.target.value })}
        className="bg-surface-700 border border-border rounded px-2 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent-500"
      >
        {stages.map((stage) => (
          <option key={stage} value={stage}>
            {stage}
          </option>
        ))}
        {displayValue === '__pipeline__' && (
          <option value="__pipeline__">In Pipeline</option>
        )}
      </select>
    </div>
  );
}
