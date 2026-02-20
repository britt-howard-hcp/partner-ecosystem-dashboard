import { usePartners } from '../../hooks/usePartners';
import { StatCard } from './StatCard';

export function StatsRow() {
  const { partners, partnersByStage } = usePartners();

  return (
    <div className="flex gap-4 px-6 py-4 flex-wrap">
      <StatCard label="Total Partners" value={partners.length} borderColor="border-accent-500" />
      <StatCard label="Evaluating" value={partnersByStage.Evaluating.length} borderColor="border-stage-evaluating" />
      <StatCard label="Onboarding" value={partnersByStage.Onboarding.length} borderColor="border-stage-onboarding" />
      <StatCard label="Active" value={partnersByStage.Active.length} borderColor="border-stage-active" />
      <StatCard label="Declined" value={partnersByStage.Declined.length} borderColor="border-stage-declined" />
    </div>
  );
}
