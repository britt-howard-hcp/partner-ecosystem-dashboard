import type { Partner } from '../../types/partner';

interface Props {
  partner: Partner;
  onClick: (partner: Partner) => void;
}

function daysSince(iso?: string): number | null {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (isNaN(then)) return null;
  const ms = Date.now() - then;
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function agingColor(days: number | null): string {
  if (days == null) return 'bg-surface-700 text-text-muted';
  if (days <= 30) return 'bg-emerald-900/40 text-emerald-300';
  if (days <= 90) return 'bg-amber-900/40 text-amber-300';
  return 'bg-rose-900/40 text-rose-300';
}

function agingLabel(days: number | null): string {
  if (days == null) return 'No touch data';
  if (days === 0) return 'Today';
  if (days === 1) return '1d ago';
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function tierStyle(tier?: number): { label: string; classes: string } | null {
  if (!tier) return null;
  if (tier === 1) return { label: 'T1', classes: 'bg-yellow-900/40 text-yellow-300 border border-yellow-700/50' };
  if (tier === 2) return { label: 'T2', classes: 'bg-slate-700/60 text-slate-200 border border-slate-500/50' };
  return { label: `T${tier}`, classes: 'bg-orange-900/30 text-orange-300 border border-orange-700/40' };
}

export function FunnelPartnerCard({ partner, onClick }: Props) {
  const days = daysSince(partner.lastTouch);
  const tier = tierStyle(partner.strategicTier);
  const isProduct = partner.partnershipType === 'Product Partnership';

  return (
    <button
      type="button"
      onClick={() => onClick(partner)}
      className={`w-full text-left bg-surface-800 rounded-md p-3 border transition-colors hover:bg-surface-700 ${
        isProduct ? 'border-amber-700/60' : 'border-border'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="font-medium text-text-primary text-sm truncate flex-1">
          {partner.name}
        </div>
        {tier && (
          <span className={`text-[10px] font-semibold rounded px-1.5 py-0.5 ${tier.classes}`}>
            {tier.label}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 text-[11px]">
        <span className={`rounded px-1.5 py-0.5 ${agingColor(days)}`}>
          {agingLabel(days)}
        </span>
        {partner.owner && (
          <span className="text-text-muted truncate">{partner.owner}</span>
        )}
      </div>
    </button>
  );
}
