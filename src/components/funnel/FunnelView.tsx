import { useMemo, useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { useDetailPanel } from '../../hooks/useDetailPanel';
import { FunnelColumn } from './FunnelColumn';

const STAGE_ORDER = [
  'Unexplored',
  'Initial Call',
  'Discovery',
  'Pilot',
  'Signed Agreements',
  'Live',
  'Not Moving Forward',
  'Deactivated Partner',
  'Hidden Partner',
];

function lastTouchTime(iso?: string): number {
  if (!iso) return 0;
  const t = new Date(iso).getTime();
  return isNaN(t) ? 0 : t;
}

export function FunnelView() {
  const { state } = useDashboard();
  const { openPartner } = useDetailPanel();
  const [open, setOpen] = useState(false);

  const partnersByStage = useMemo(() => {
    const map = new Map<string, typeof state.filteredPartners>();
    for (const stage of STAGE_ORDER) {
      map.set(stage, []);
    }
    for (const p of state.filteredPartners) {
      const bucket = map.get(p.airtableStatus);
      if (bucket) {
        bucket.push(p);
      }
    }
    // Sort each bucket: oldest last-touch first (most-aging surfaces on top).
    // Partners with no Last Touch sink to the bottom.
    for (const [stage, list] of map) {
      list.sort((a, b) => {
        const ta = lastTouchTime(a.lastTouch);
        const tb = lastTouchTime(b.lastTouch);
        if (ta === 0 && tb === 0) return a.name.localeCompare(b.name);
        if (ta === 0) return 1;
        if (tb === 0) return -1;
        return ta - tb;
      });
      map.set(stage, list);
    }
    return map;
  }, [state.filteredPartners]);

  const total = state.filteredPartners.length;

  return (
    <section className="px-6 py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between mb-3 group"
      >
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
          Funnel View
          <span className="ml-2 text-text-muted normal-case font-normal tracking-normal">
            {total} partners across {STAGE_ORDER.length} stages
          </span>
        </h2>
        <span className="text-xs text-text-muted group-hover:text-text-secondary">
          {open ? 'Hide ▴' : 'Show ▾'}
        </span>
      </button>

      {open && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {STAGE_ORDER.map((stage) => (
            <FunnelColumn
              key={stage}
              stage={stage}
              partners={partnersByStage.get(stage) ?? []}
              onCardClick={openPartner}
            />
          ))}
        </div>
      )}
    </section>
  );
}
