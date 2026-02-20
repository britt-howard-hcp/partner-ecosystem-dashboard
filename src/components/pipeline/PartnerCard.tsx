import type { Partner } from '../../types/partner';
import { Badge } from '../common/Badge';
import { useDetailPanel } from '../../hooks/useDetailPanel';

export function PartnerCard({ partner }: { partner: Partner }) {
  const { openPartner } = useDetailPanel();
  const isProduct = partner.partnershipType === 'Product Partnership';

  const dateStr = new Date(partner.requestDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      onClick={() => openPartner(partner)}
      className={`rounded-lg bg-surface-800 p-3 border transition-colors cursor-pointer ${
        isProduct
          ? 'border-partnership-product/40 hover:border-partnership-product/70'
          : 'border-border hover:border-accent-500/40'
      }`}
    >
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-text-primary truncate">{partner.name}</p>
        {isProduct && (
          <span className="text-[10px] font-medium text-partnership-product shrink-0">Product</span>
        )}
      </div>
      <p className="text-xs text-text-muted mt-1">{partner.integrationType}</p>
      <div className="flex items-center justify-between mt-2">
        <Badge label={partner.classification} variant="classification" />
        <span className="text-xs text-text-muted">{dateStr}</span>
      </div>
    </div>
  );
}
