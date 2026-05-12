import type { Partner } from '../../types/partner';
import { FunnelPartnerCard } from './FunnelPartnerCard';

interface Props {
  stage: string;
  partners: Partner[];
  onCardClick: (partner: Partner) => void;
}

const SHORT_LABELS: Record<string, string> = {
  'Not Moving Forward': 'Not Moving Fwd',
  'Deactivated Partner': 'Deactivated',
  'Signed Agreements': 'Signed',
  'Hidden Partner': 'Hidden',
};

export function FunnelColumn({ stage, partners, onCardClick }: Props) {
  const label = SHORT_LABELS[stage] ?? stage;

  return (
    <div className="flex-shrink-0 w-64 bg-surface-900/60 rounded-lg border border-border flex flex-col max-h-[600px]">
      <div className="px-3 py-2 border-b border-border flex items-center justify-between">
        <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          {label}
        </span>
        <span className="text-xs text-text-muted">{partners.length}</span>
      </div>
      <div className="p-2 space-y-2 overflow-y-auto flex-1">
        {partners.length === 0 ? (
          <p className="text-xs text-text-muted italic px-1 py-2">No partners</p>
        ) : (
          partners.map((p) => (
            <FunnelPartnerCard key={p.id} partner={p} onClick={onCardClick} />
          ))
        )}
      </div>
    </div>
  );
}
