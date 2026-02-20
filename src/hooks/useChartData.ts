import { useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { buildVolumeData, buildCategoryData, buildCategoryVolumeData } from '../services';

export function useChartData() {
  const { state } = useDashboard();

  const volumeData = useMemo(() => buildVolumeData(state.filteredPartners), [state.filteredPartners]);
  const categoryData = useMemo(() => buildCategoryData(state.filteredPartners), [state.filteredPartners]);
  const categoryVolumeData = useMemo(() => buildCategoryVolumeData(state.filteredPartners), [state.filteredPartners]);

  return { volumeData, categoryData, categoryVolumeData };
}
