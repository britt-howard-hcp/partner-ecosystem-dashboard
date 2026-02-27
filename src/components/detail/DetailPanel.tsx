import type { ReactNode } from 'react';
import { useDetailPanel } from '../../hooks/useDetailPanel';
import { Badge } from '../common/Badge';
import { getClassificationColor } from '../../services';
import type { Partner, Classification } from '../../types/partner';

export function DetailPanel() {
  const { view, isOpen, close, openPartner } = useDetailPanel();

  if (!isOpen || !view) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={close} />
      <div className="fixed top-0 right-0 h-full w-[420px] bg-surface-900 border-l border-border z-50 animate-slide-in flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-text-primary truncate">
            {view.kind === 'partner' ? view.partner.name : view.kind === 'classification' ? view.classification : view.title}
          </h2>
          <button
            onClick={close}
            className="text-text-muted hover:text-text-primary transition-colors text-lg leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {view.kind === 'partner' ? (
            <PartnerProfile partner={view.partner} />
          ) : view.kind === 'classification' ? (
            <ClassificationList classification={view.classification} partners={view.partners} onSelectPartner={openPartner} />
          ) : (
            <GenericList partners={view.partners} onSelectPartner={openPartner} />
          )}
        </div>
      </div>
    </>
  );
}

// ─── Partner Profile (4 sections, empty fields hidden) ────────────

function PartnerProfile({ partner }: { partner: Partner }) {
  const isProduct = partner.partnershipType === 'Product Partnership';

  return (
    <div className="flex flex-col gap-6">
      {/* Section 1: Company Overview */}
      <Section title="Company Overview">
        {partner.description && (
          <p className="text-sm text-text-secondary leading-relaxed mb-3">{partner.description}</p>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Classification">
            <Badge label={partner.classification} variant="classification" />
          </Field>
          <Field label="Partnership Type">
            <Badge label={partner.partnershipType} variant="partnership" />
          </Field>
          {partner.category.some((t) => t !== 'Uncategorized') && (
            <Field label="Category">
              <div className="flex flex-wrap gap-1">
                {partner.category.filter((t) => t !== 'Uncategorized').map((tag) => (
                  <span key={tag} className="text-xs bg-surface-700 text-text-secondary rounded px-1.5 py-0.5">{tag}</span>
                ))}
              </div>
            </Field>
          )}
          {partner.website && (
            <Field label="Website">
              <span className="text-sm text-accent-400 truncate block">{partner.website.replace(/^https?:\/\//, '')}</span>
            </Field>
          )}
          {(partner.customerCount ?? 0) > 0 && (
            <Field label="Customer Base">
              <span className="text-sm text-text-primary">{partner.customerCount!.toLocaleString()}</span>
            </Field>
          )}
        </div>
      </Section>

      {/* Section 2: Integration Details */}
      <Section title="Integration Details">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Status">
            <Badge label={partner.status} variant="status" />
          </Field>
          <Field label="Integration Type">
            <span className="text-sm text-text-primary">{partner.integrationType}</span>
          </Field>
          {partner.requestDate && (
            <Field label="Request Date">
              <span className="text-sm text-text-primary">
                {new Date(partner.requestDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </Field>
          )}
        </div>
        {partner.integrationRequest && (
          <div className="mt-3">
            <Field label="Integration Request">
              <p className="text-sm text-text-secondary leading-relaxed">{partner.integrationRequest}</p>
            </Field>
          </div>
        )}
      </Section>

      {/* Section 3: Business Case */}
      {(partner.whyIntegrate || partner.mutualCustomers) && (
        <Section title="Business Case">
          {partner.whyIntegrate && (
            <Field label="Why Integrate">
              <p className="text-sm text-text-secondary leading-relaxed">{partner.whyIntegrate}</p>
            </Field>
          )}
          {partner.mutualCustomers != null && partner.mutualCustomers > 0 && (
            <div className="mt-3">
              <Field label="Mutual HCP Customers">
                <span className="text-sm text-text-primary">{partner.mutualCustomers.toLocaleString()}</span>
              </Field>
            </div>
          )}
        </Section>
      )}

      {/* Section 4: Relationship */}
      {(partner.contactName || partner.contactEmail || partner.notes) && (
        <Section title="Relationship">
          <div className="grid grid-cols-2 gap-3">
            {partner.contactName && (
              <Field label="Contact">
                <span className="text-sm text-text-primary">{partner.contactName}</span>
              </Field>
            )}
            {partner.contactEmail && (
              <Field label="Email">
                <span className="text-sm text-text-primary truncate block">{partner.contactEmail}</span>
              </Field>
            )}
          </div>
          {partner.notes && (
            <div className="mt-3">
              <Field label="Notes">
                <p className="text-sm text-text-secondary leading-relaxed">{partner.notes}</p>
              </Field>
            </div>
          )}
        </Section>
      )}

      {/* Product Partnership indicator */}
      {isProduct && (
        <div className="rounded-lg border border-partnership-product/30 bg-partnership-product/5 px-4 py-3">
          <p className="text-xs font-medium text-partnership-product">
            Strategic Product Partnership — co-developed integration with HCP
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Classification List ──────────────────────────────────────────

function ClassificationList({ classification, partners, onSelectPartner }: { classification: Classification; partners: Partner[]; onSelectPartner: (p: Partner) => void }) {
  const color = getClassificationColor(classification);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-sm text-text-secondary">
          {partners.length} compan{partners.length === 1 ? 'y' : 'ies'}
        </span>
      </div>

      {partners.length === 0 ? (
        <p className="text-sm text-text-muted italic">No companies in this classification for current filters.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {partners.map((p) => (
            <div
              key={p.id}
              className={`bg-surface-800 rounded-lg p-3 border ${
                p.partnershipType === 'Product Partnership'
                  ? 'border-partnership-product/40'
                  : 'border-border'
              }`}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectPartner(p)}
                  className="text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors text-left"
                >
                  {p.name}
                </button>
                {p.partnershipType === 'Product Partnership' && (
                  <span className="text-[10px] font-medium text-partnership-product">Product</span>
                )}
              </div>
              {p.description && <p className="text-xs text-text-muted mt-1">{p.description}</p>}
              <div className="flex items-center gap-3 mt-2">
                <Badge label={p.status} variant="status" />
                <span className="text-xs text-text-muted">{p.integrationType}</span>
                {(p.customerCount ?? 0) > 0 && (
                  <span className="text-xs text-text-muted ml-auto">{p.customerCount!.toLocaleString()} customers</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Generic List (for status/category/KPI drill-downs) ─────────

function GenericList({ partners, onSelectPartner }: { partners: Partner[]; onSelectPartner: (p: Partner) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm text-text-secondary">
        {partners.length} compan{partners.length === 1 ? 'y' : 'ies'}
      </span>

      {partners.length === 0 ? (
        <p className="text-sm text-text-muted italic">No companies match this filter.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {partners.map((p) => (
            <div
              key={p.id}
              className={`bg-surface-800 rounded-lg p-3 border ${
                p.partnershipType === 'Product Partnership'
                  ? 'border-partnership-product/40'
                  : 'border-border'
              }`}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectPartner(p)}
                  className="text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors text-left"
                >
                  {p.name}
                </button>
                {p.partnershipType === 'Product Partnership' && (
                  <span className="text-[10px] font-medium text-partnership-product">Product</span>
                )}
              </div>
              {p.description && <p className="text-xs text-text-muted mt-1">{p.description}</p>}
              <div className="flex items-center gap-3 mt-2">
                <Badge label={p.classification} variant="classification" />
                <span className="text-xs text-text-muted">{p.airtableStatus}</span>
                {p.category.some((t) => t !== 'Uncategorized') && (
                  <span className="text-xs text-text-muted ml-auto">{p.category.filter((t) => t !== 'Uncategorized').join(', ')}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Shared helpers ───────────────────────────────────────────────

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs text-text-muted mb-1">{label}</p>
      {children}
    </div>
  );
}
