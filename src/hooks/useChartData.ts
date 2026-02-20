import { useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { buildVolumeData, buildClassificationData, buildClassificationVolumeData } from '../services';

export function useChartData() {
  const { state } = useDashboard();

  const volumeData = useMemo(() => buildVolumeData(state.filteredPartners), [state.filteredPartners]);
  const classificationData = useMemo(() => buildClassificationData(state.filteredPartners), [state.filteredPartners]);
  const classificationVolumeData = useMemo(() => buildClassificationVolumeData(state.filteredPartners), [state.filteredPartners]);

  return { volumeData, classificationData, classificationVolumeData };
}
