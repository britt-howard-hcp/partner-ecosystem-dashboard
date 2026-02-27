import { usePartners } from '../../hooks/usePartners';
import { useFilters } from '../../hooks/useFilters';
import { useDetailPanel } from '../../hooks/useDetailPanel';
import { useDashboard } from '../../context/DashboardContext';
import { StatCard } from '../stats/StatCard';

export function Header() {
  const { total, liveCount, inPipelineCount, categoriesRepresentedCount, controlledCount } = usePartners();
  const { setFilters } = useFilters();
  const { openList } = useDetailPanel();
  const { state } = useDashboard();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="px-6 py-4 border-b border-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">Partner Intelligence Dashboard</h1>
          <p className="text-sm text-text-muted mt-0.5">HCP Ecosystem Overview &amp; Market Intelligence</p>
        </div>
        <time className="text-sm text-text-secondary">{today}</time>
      </div>
      <div className="flex gap-4 flex-wrap">
        <StatCard
          label="Ecosystem Requests"
          value={total}
          borderColor="border-accent-500"
          onClick={() => setFilters({ airtableStatus: 'All', classification: 'All', category: 'All', integrationType: 'All', searchQuery: '', dateStart: '', dateEnd: '' })}
        />
        <StatCard
          label="Live Integrations"
          value={liveCount}
          borderColor="border-stage-active"
          onClick={() => setFilters({ airtableStatus: 'Live' })}
        />
        <StatCard
          label="In Pipeline"
          value={inPipelineCount}
          borderColor="border-stage-evaluating"
          onClick={() => setFilters({ airtableStatus: '__pipeline__' })}
        />
        <StatCard
          label="Categories Represented"
          value={categoriesRepresentedCount}
          borderColor="border-accent-400"
          onClick={() => {
            openList(
              `${categoriesRepresentedCount} Categories`,
              state.filteredPartners.filter((p) => p.category && p.category !== 'Uncategorized'),
            );
          }}
        />
        <StatCard
          label="Controlled Requests"
          value={controlledCount}
          borderColor="border-cls-controlled"
          onClick={() => setFilters({ classification: 'Controlled' })}
        />
      </div>
    </header>
  );
}
