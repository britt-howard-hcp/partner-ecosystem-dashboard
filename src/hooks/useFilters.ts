import { useCallback } from 'react';
import { useDashboard } from '../context/DashboardContext';
import type { FilterState } from '../types/filters';

export function useFilters() {
  const { state, dispatch } = useDashboard();

  const setFilters = useCallback(
    (updates: Partial<FilterState>) => {
      dispatch({ type: 'SET_FILTER', filters: updates });
    },
    [dispatch],
  );

  return { filters: state.filters, setFilters };
}
