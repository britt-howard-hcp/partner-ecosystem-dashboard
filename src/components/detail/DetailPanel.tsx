import { useDetailPanel } from '../../hooks/useDetailPanel';
import { Badge } from '../common/Badge';
import { getCategoryColor } from '../../services';

export function DetailPanel() {
  const { view, isOpen, close } = useDetailPanel();

  if (!isOpen || !view) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={close} />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-[420px] bg-surface-900 border-l border-border z-50 animate-slide-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-text-primary truncate">
            {view.kind === 'partner' ? view.partner.name : view.category}
          </h2>
          <button
            onClick={close}
            className="text-text-muted hover:text-text-primary transition-colors text-lg leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {view.kind === 'partner' ? (
            <PartnerProfile partner={view.partner} />
          ) : (
            <CategoryList category={view.category} partners={view.partners} />
          )}
        </div>
      </div>
    </>
  );
}

import type { Partner, PartnerCategory } from '../../types/partner';

function PartnerProfile({ partner }: { partner: Partner }) {
  const dateStr = new Date(partner.requestDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-text-secondary leading-relaxed">{partner.description}</p>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Stage">
          <Badge label={partner.stage} variant="stage" />
        </Field>
        <Field label="Category">
          <Badge label={partner.category} variant="category" />
        </Field>
        <Field label="Integration Type">
          <span className="text-sm text-text-primary">{partner.integrationType}</span>
        </Field>
        <Field label="Request Date">
          <span className="text-sm text-text-primary">{dateStr}</span>
        </Field>
        <Field label="Customer Base">
          <span className="text-sm text-text-primary">{partner.customerCount.toLocaleString()}</span>
        </Field>
      </div>
    </div>
  );
}

function CategoryList({ category, partners }: { category: PartnerCategory; partners: Partner[] }) {
  const color = getCategoryColor(category);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-sm text-text-secondary">{partners.length} partner{partners.length === 1 ? '' : 's'}</span>
      </div>

      {partners.length === 0 ? (
        <p className="text-sm text-text-muted italic">No partners in this category for current filters.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {partners.map((p) => (
            <div key={p.id} className="bg-surface-800 rounded-lg p-3 border border-border">
              <p className="text-sm font-medium text-text-primary">{p.name}</p>
              <p className="text-xs text-text-muted mt-1">{p.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <Badge label={p.stage} variant="stage" />
                <span className="text-xs text-text-muted">{p.integrationType}</span>
                <span className="text-xs text-text-muted ml-auto">{p.customerCount.toLocaleString()} customers</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-text-muted mb-1">{label}</p>
      {children}
    </div>
  );
}
