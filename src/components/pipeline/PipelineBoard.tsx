import { usePartners } from '../../hooks/usePartners';
import { PipelineColumn } from './PipelineColumn';
import type { Status } from '../../types/partner';

const statuses: Status[] = ['Evaluating', 'Onboarding', 'Active', 'Declined'];

export function PipelineBoard() {
  const { partnersByStatus } = usePartners();

  return (
    <section className="px-6 py-4">
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
        Pipeline
      </h2>
      <div className="flex gap-4">
        {statuses.map((status) => (
          <PipelineColumn key={status} status={status} partners={partnersByStatus[status]} />
        ))}
      </div>
    </section>
  );
}
