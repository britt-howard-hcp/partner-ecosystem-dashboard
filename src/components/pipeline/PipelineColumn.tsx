import type { Partner, Status } from '../../types/partner';
import { PartnerCard } from './PartnerCard';

const headerColors: Record<Status, string> = {
  Evaluating: 'bg-stage-evaluating',
  Onboarding: 'bg-stage-onboarding',
  Active: 'bg-stage-active',
  Declined: 'bg-stage-declined',
};

interface Props {
  status: Status;
  partners: Partner[];
}

export function PipelineColumn({ status, partners }: Props) {
  return (
    <div className="flex-1 min-w-[220px] flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span className={`w-2.5 h-2.5 rounded-full ${headerColors[status]}`} />
        <h3 className="text-sm font-semibold text-text-primary">{status}</h3>
        <span className="text-xs text-text-muted ml-auto">{partners.length}</span>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[340px] pr-1">
        {partners.length === 0 ? (
          <p className="text-xs text-text-muted italic py-4 text-center">No partners</p>
        ) : (
          partners.map((p) => <PartnerCard key={p.id} partner={p} />)
        )}
      </div>
    </div>
  );
}
