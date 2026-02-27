import { useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
import type { Partner, Status } from '../types/partner';

const pipelineStages = new Set([
  'Unexplored',
  'Initial Call',
  'Discovery',
  'Pilot',
  'Signed Agreements',
]);

export function usePartners() {
  const { state } = useDashboard();

  const partnersByStatus = useMemo(() => {
    const map: Record<Status, Partner[]> = {
      Evaluating: [],
      Onboarding: [],
      Active: [],
      Declined: [],
    };
    for (const p of state.filteredPartners) {
      map[p.status].push(p);
    }
    return map;
  }, [state.filteredPartners]);

  const liveCount = useMemo(
    () => state.filteredPartners.filter((p) => p.airtableStatus === 'Live').length,
    [state.filteredPartners],
  );

  const inPipelineCount = useMemo(
    () => state.filteredPartners.filter((p) => pipelineStages.has(p.airtableStatus)).length,
    [state.filteredPartners],
  );

  const categoriesRepresentedCount = useMemo(() => {
    const cats = new Set<string>();
    for (const p of state.filteredPartners) {
      if (p.category && p.category !== 'Uncategorized') {
        cats.add(p.category);
      }
    }
    return cats.size;
  }, [state.filteredPartners]);

  const controlledCount = useMemo(
    () => state.filteredPartners.filter((p) => p.classification === 'Controlled').length,
    [state.filteredPartners],
  );

  const coreConflictCount = useMemo(
    () => state.filteredPartners.filter((p) => p.classification === 'Core Conflict').length,
    [state.filteredPartners],
  );

  const mutualHcpCustomers = useMemo(
    () =>
      state.filteredPartners
        .filter((p) => p.status === 'Active' && p.mutualCustomers)
        .reduce((sum, p) => sum + (p.mutualCustomers ?? 0), 0),
    [state.filteredPartners],
  );

  return {
    partners: state.filteredPartners,
    partnersByStatus,
    loading: state.loading,
    total: state.filteredPartners.length,
    liveCount,
    inPipelineCount,
    categoriesRepresentedCount,
    controlledCount,
    coreConflictCount,
    mutualHcpCustomers,
  };
}
