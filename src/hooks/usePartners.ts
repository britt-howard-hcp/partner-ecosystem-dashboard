import { useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
import type { Partner, PipelineStage } from '../types/partner';

export function usePartners() {
  const { state } = useDashboard();

  const partnersByStage = useMemo(() => {
    const map: Record<PipelineStage, Partner[]> = {
      Evaluating: [],
      Onboarding: [],
      Active: [],
      Declined: [],
    };
    for (const p of state.filteredPartners) {
      map[p.stage].push(p);
    }
    return map;
  }, [state.filteredPartners]);

  return {
    partners: state.filteredPartners,
    partnersByStage,
    loading: state.loading,
    total: state.filteredPartners.length,
  };
}
