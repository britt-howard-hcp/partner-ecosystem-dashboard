import type { Partner } from '../../types/partner';
import { Badge } from '../common/Badge';
import { useDetailPanel } from '../../hooks/useDetailPanel';

export function PartnerCard({ partner }: { partner: Partner }) {
  const { openPartner } = useDetailPanel();

  const dateStr = new Date(partner.requestDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      onClick={() => openPartner(partner)}
      className="rounded-lg bg-surface-800 p-3 border border-border hover:border-accent-500/40 transition-colors cursor-pointer"
    >
      <p className="text-sm font-medium text-text-primary truncate">{partner.name}</p>
      <p className="text-xs text-text-muted mt-1">{partner.integrationType}</p>
      <div className="flex items-center justify-between mt-2">
        <Badge label={partner.category} variant="category" />
        <span className="text-xs text-text-muted">{dateStr}</span>
      </div>
    </div>
  );
}
