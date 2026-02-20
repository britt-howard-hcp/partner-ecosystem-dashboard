import { usePartners } from '../../hooks/usePartners';
import { StatCard } from '../stats/StatCard';

export function Header() {
  const { partners, partnersByStage } = usePartners();

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
          <p className="text-sm text-text-muted mt-0.5">Ecosystem overview &amp; market intelligence</p>
        </div>
        <time className="text-sm text-text-secondary">{today}</time>
      </div>
      <div className="flex gap-4 flex-wrap">
        <StatCard label="Total Partners" value={partners.length} borderColor="border-accent-500" />
        <StatCard label="Evaluating" value={partnersByStage.Evaluating.length} borderColor="border-stage-evaluating" />
        <StatCard label="Onboarding" value={partnersByStage.Onboarding.length} borderColor="border-stage-onboarding" />
        <StatCard label="Active" value={partnersByStage.Active.length} borderColor="border-stage-active" />
        <StatCard label="Declined" value={partnersByStage.Declined.length} borderColor="border-stage-declined" />
      </div>
    </header>
  );
}
