import { useState, useMemo, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { useDetailPanel } from '../../hooks/useDetailPanel';
import { Badge } from '../common/Badge';
import { EnrichedBadge } from '../common/EnrichedBadge';
import type { Partner } from '../../types/partner';

const ROWS_PER_PAGE_OPTIONS = [25, 50, 100];

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
  const [sortKey, setSortKey] = useState<SortKey>('requestDate');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [state.filteredPartners]);

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

  const totalPages = Math.max(1, Math.ceil(sorted.length / rowsPerPage));
  const paginatedRows = sorted.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
                paginatedRows.map((p) => (
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
                      <span className="inline-flex items-center">
                        <Badge label={p.classification} variant="classification" />
                        <EnrichedBadge field="classification" enrichedFields={p.enrichedFields} />
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-text-secondary">
                      {p.category.filter((t) => t !== 'Uncategorized').length > 0 ? (
                        <div className="flex flex-wrap gap-1 items-center">
                          {p.category.filter((t) => t !== 'Uncategorized').map((tag) => (
                            <span key={tag} className="text-xs bg-surface-700 rounded px-1.5 py-0.5 whitespace-nowrap">{tag}</span>
                          ))}
                          <EnrichedBadge field="category" enrichedFields={p.enrichedFields} />
                        </div>
                      ) : '\u2014'}
                    </td>
                    <td className="px-3 py-2.5 text-text-secondary whitespace-nowrap">
                      <span className="inline-flex items-center">
                        {p.integrationType}
                        <EnrichedBadge field="integrationType" enrichedFields={p.enrichedFields} />
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex items-center">
                        <Badge label={p.partnershipType} variant="partnership" />
                        <EnrichedBadge field="partnershipType" enrichedFields={p.enrichedFields} />
                      </span>
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
          <div className="px-3 py-2.5 border-t border-border text-xs text-text-muted flex items-center justify-between">
            <span>
              Showing {Math.min((page - 1) * rowsPerPage + 1, sorted.length)}–{Math.min(page * rowsPerPage, sorted.length)} of {sorted.length} {sorted.length === 1 ? 'company' : 'companies'}
            </span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5">
                <span>Rows:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
                  className="bg-surface-700 border border-border rounded px-1.5 py-0.5 text-xs text-text-secondary outline-none"
                >
                  {ROWS_PER_PAGE_OPTIONS.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </label>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-2 py-0.5 rounded border border-border text-text-secondary hover:text-text-primary hover:bg-surface-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-2 text-text-secondary">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="px-2 py-0.5 rounded border border-border text-text-secondary hover:text-text-primary hover:bg-surface-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
