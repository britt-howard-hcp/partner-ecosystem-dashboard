import { usePartners } from '../../hooks/usePartners';
import { StatCard } from '../stats/StatCard';

export function Header() {
  const { total, partnersByStatus, coreConflictCount, mutualHcpCustomers } = usePartners();

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
        <StatCard label="Ecosystem Requests" value={total} borderColor="border-accent-500" />
        <StatCard label="In Evaluation" value={partnersByStatus.Evaluating.length} borderColor="border-stage-evaluating" />
        <StatCard label="Live Integrations" value={partnersByStatus.Active.length} borderColor="border-stage-active" />
        <StatCard label="Core Conflicts" value={coreConflictCount} borderColor="border-cls-core-conflict" />
        <StatCard label="Mutual HCP Customers" value={mutualHcpCustomers.toLocaleString()} borderColor="border-accent-400" />
      </div>
    </header>
  );
}
