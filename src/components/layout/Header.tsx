import { usePartners } from '../../hooks/usePartners';
import { StatCard } from '../stats/StatCard';

export function Header() {
  const { total, liveCount, inPipelineCount, categoriesRepresentedCount, controlledCount } = usePartners();

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
        <StatCard label="Live Integrations" value={liveCount} borderColor="border-stage-active" />
        <StatCard label="In Pipeline" value={inPipelineCount} borderColor="border-stage-evaluating" />
        <StatCard label="Categories Represented" value={categoriesRepresentedCount} borderColor="border-accent-400" />
        <StatCard label="Controlled Requests" value={controlledCount} borderColor="border-cls-controlled" />
      </div>
    </header>
  );
}
