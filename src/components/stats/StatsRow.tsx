import { usePartners } from '../../hooks/usePartners';
import { StatCard } from './StatCard';

export function StatsRow() {
  const { total, partnersByStatus, coreConflictCount, mutualHcpCustomers } = usePartners();

  return (
    <div className="flex gap-4 px-6 py-4 flex-wrap">
      <StatCard label="Ecosystem Requests" value={total} borderColor="border-accent-500" />
      <StatCard label="In Evaluation" value={partnersByStatus.Evaluating.length} borderColor="border-stage-evaluating" />
      <StatCard label="Live Integrations" value={partnersByStatus.Active.length} borderColor="border-stage-active" />
      <StatCard label="Core Conflicts" value={coreConflictCount} borderColor="border-cls-core-conflict" />
      <StatCard label="Mutual HCP Customers" value={mutualHcpCustomers.toLocaleString()} borderColor="border-accent-400" />
    </div>
  );
}
