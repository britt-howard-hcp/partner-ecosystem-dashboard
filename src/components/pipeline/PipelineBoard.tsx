import { usePartners } from '../../hooks/usePartners';
import { PipelineColumn } from './PipelineColumn';
import type { PipelineStage } from '../../types/partner';

const stages: PipelineStage[] = ['Evaluating', 'Onboarding', 'Active', 'Declined'];

export function PipelineBoard() {
  const { partnersByStage } = usePartners();

  return (
    <section className="px-6 py-4">
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
        Pipeline
      </h2>
      <div className="flex gap-4">
        {stages.map((stage) => (
          <PipelineColumn key={stage} stage={stage} partners={partnersByStage[stage]} />
        ))}
      </div>
    </section>
  );
}
