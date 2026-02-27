import { useState, useMemo } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { useDetailPanel } from '../../hooks/useDetailPanel';
import { Badge } from '../common/Badge';
import type { Partner } from '../../types/partner';

type SortKey =
  | 'name'
  | 'airtableStatus'
  | 'classification'
  | 'category'
  | 'integrationType'
  | 'partnershipType'
  | 'customerCount'
  | 'mutualCustomers'
  | 'requestDate';

type SortDir = 'asc' | 'desc';

const columns: { key: SortKey; label: string; className?: string }[] = [
  { key: 'name', label: 'Company Name' },
  { key: 'airtableStatus', label: 'Status' },
  { key: 'classification', label: 'Classification' },
  { key: 'category', label: 'Category' },
  { key: 'integrationType', label: 'Integration' },
  { key: 'partnershipType', label: 'Partnership' },
  { key: 'customerCount', label: 'Customers', className: 'text-right' },
  { key: 'mutualCustomers', label: 'Mutual', className: 'text-right' },
  { key: 'requestDate', label: 'Request Date' },
];

function getSortValue(p: Partner, key: SortKey): string | number {
  switch (key) {
    case 'name':
      return p.name.toLowerCase();
    case 'airtableStatus':
      return p.airtableStatus.toLowerCase();
    case 'classification':
      return p.classification.toLowerCase();
    case 'category':
      return (p.category[0] ?? '').toLowerCase();
    case 'integrationType':
      return p.integrationType.toLowerCase();
    case 'partnershipType':
      return p.partnershipType.toLowerCase();
    case 'customerCount':
      return p.customerCount ?? 0;
    case 'mutualCustomers':
      return p.mutualCustomers ?? 0;
    case 'requestDate':
      return p.requestDate ?? '';
  }
}

function formatDate(date?: string): string {
  if (!date) return '\u2014';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatNumber(n?: number): string {
  if (n == null || n === 0) return '\u2014';
  return n.toLocaleString();
}

export function PartnerTable() {
  const { state } = useDashboard();
  const { openPartner } = useDetailPanel();
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const sorted = useMemo(() => {
    const list = [...state.filteredPartners];
    list.sort((a, b) => {
      const va = getSortValue(a, sortKey);
      const vb = getSortValue(b, sortKey);
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [state.filteredPartners, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  return (
    <section className="px-6 py-4">
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
        Ecosystem Directory
      </h2>
      <div className="bg-surface-800 rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className={`px-3 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider cursor-pointer hover:text-text-secondary transition-colors select-none whitespace-nowrap ${col.className ?? 'text-left'}`}
                  >
                    {col.label}
                    {sortKey === col.key && (
                      <span className="ml-1">{sortDir === 'asc' ? '\u25B2' : '\u25BC'}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-3 py-8 text-center text-text-muted italic">
                    No companies match the current filters.
                  </td>
                </tr>
              ) : (
                sorted.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => openPartner(p)}
                    className={`border-b border-border/50 cursor-pointer transition-colors ${
                      p.partnershipType === 'Product Partnership'
                        ? 'bg-partnership-product/5 hover:bg-partnership-product/10'
                        : 'hover:bg-surface-700'
                    }`}
                  >
                    <td className="px-3 py-2.5 font-medium text-text-primary whitespace-nowrap">
                      {p.name || '\u2014'}
                      {p.partnershipType === 'Product Partnership' && (
                        <span className="ml-2 text-[10px] font-medium text-partnership-product">Product</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-text-secondary whitespace-nowrap">
                      {p.airtableStatus || '\u2014'}
                    </td>
                    <td className="px-3 py-2.5">
                      <Badge label={p.classification} variant="classification" />
                    </td>
                    <td className="px-3 py-2.5 text-text-secondary">
                      {p.category.filter((t) => t !== 'Uncategorized').length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {p.category.filter((t) => t !== 'Uncategorized').map((tag) => (
                            <span key={tag} className="text-xs bg-surface-700 rounded px-1.5 py-0.5 whitespace-nowrap">{tag}</span>
                          ))}
                        </div>
                      ) : '\u2014'}
                    </td>
                    <td className="px-3 py-2.5 text-text-secondary whitespace-nowrap">
                      {p.integrationType}
                    </td>
                    <td className="px-3 py-2.5">
                      <Badge label={p.partnershipType} variant="partnership" />
                    </td>
                    <td className="px-3 py-2.5 text-text-secondary text-right tabular-nums">
                      {formatNumber(p.customerCount)}
                    </td>
                    <td className="px-3 py-2.5 text-text-secondary text-right tabular-nums">
                      {formatNumber(p.mutualCustomers)}
                    </td>
                    <td className="px-3 py-2.5 text-text-secondary whitespace-nowrap">
                      {formatDate(p.requestDate)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {sorted.length > 0 && (
          <div className="px-3 py-2 border-t border-border text-xs text-text-muted">
            {sorted.length} {sorted.length === 1 ? 'company' : 'companies'}
          </div>
        )}
      </div>
    </section>
  );
}
